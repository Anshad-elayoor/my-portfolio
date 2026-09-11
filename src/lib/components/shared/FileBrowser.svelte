<script>
	/**
	 * A Finder-style icon-grid browser: each item renders as a file (a generic
	 * document icon by default, or a custom thumbnail via the `icon` snippet),
	 * labeled with its name. Clicking a file swaps the grid for the `detail`
	 * snippet's full view of that item, with a back control to return.
	 * @type {{
	 *   items: Array<{ id: string, name: string, meta?: string }>,
	 *   tint?: string,
	 *   icon?: import('svelte').Snippet<[any]>,
	 *   detail: import('svelte').Snippet<[any]>
	 * }}
	 */
	let { items, tint = '#8f9aa2', icon, detail } = $props();

	let openedId = $state(/** @type {string | null} */ (null));
	const opened = $derived(items.find((i) => i.id === openedId) ?? null);
</script>

{#if opened}
	<button class="fb-back" onclick={() => (openedId = null)}>
		<svg viewBox="0 0 24 24">
			<path d="M15 4 7 12l8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
		Back
	</button>
	<div class="fb-detail">
		{@render detail(opened)}
	</div>
{:else}
	<div class="fb-grid">
		{#each items as item (item.id)}
			<button class="fb-file" onclick={() => (openedId = item.id)}>
				<span class="fb-icon">
					{#if icon}
						{@render icon(item)}
					{:else}
						<svg viewBox="0 0 24 24">
							<path d="M5 2.4h9.4L19.5 7.5V21.6H5Z" fill="#eef1f3" />
							<path d="M14.4 2.4V7.5h5.1Z" fill="#c7ccd1" />
							<rect x="7.3" y="11.6" width="9.4" height="1.6" rx=".8" fill={tint} opacity=".55" />
							<rect x="7.3" y="15" width="9.4" height="1.6" rx=".8" fill={tint} opacity=".38" />
							<rect x="7.3" y="18.4" width="6" height="1.6" rx=".8" fill={tint} opacity=".38" />
						</svg>
					{/if}
				</span>
				<span class="fb-name">{item.name}</span>
				{#if item.meta}<span class="fb-meta">{item.meta}</span>{/if}
			</button>
		{/each}
	</div>
{/if}

<style>
	.fb-back {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		background: none;
		border: none;
		color: var(--accent);
		font-size: 13.5px;
		font-family: var(--font-body);
		cursor: pointer;
		padding: 0 0 18px;
		margin: 0;
	}
	.fb-back svg {
		width: 16px;
		height: 16px;
	}
	.fb-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
		gap: 6px 4px;
		margin-top: 4px;
	}
	.fb-file {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		background: none;
		border: none;
		border-radius: 10px;
		padding: 12px 6px;
		cursor: pointer;
		font-family: var(--font-body);
		transition: background-color 0.12s;
	}
	.fb-file:hover,
	.fb-file:focus-visible {
		background: rgba(255, 255, 255, 0.06);
		outline: none;
	}
	.fb-icon {
		width: 52px;
		height: 52px;
		flex: none;
		filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.35));
	}
	.fb-icon :global(svg),
	.fb-icon :global(img) {
		width: 100%;
		height: 100%;
	}
	.fb-name {
		font-size: 12px;
		color: var(--ink);
		text-align: center;
		line-height: 1.35;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.fb-meta {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--faint);
		margin-top: -4px;
	}
	.fb-detail {
		animation: fb-in 0.16s var(--ease, ease-out);
	}
	@keyframes fb-in {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.fb-detail {
			animation: none;
		}
	}
</style>
