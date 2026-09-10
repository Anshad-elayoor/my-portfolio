<script>
	import { sections } from '$lib/content.js';
	import { ui } from '$lib/stores.svelte.js';
	import AppIcon from '../shared/AppIcon.svelte';

	function matches(label) {
		const q = ui.searchQuery.trim().toLowerCase();
		return q.length === 0 || label.toLowerCase().includes(q);
	}
</script>

<div class="icon-grid">
	{#each sections as s}
		<button
			class="dicon"
			class:hidden-match={!matches(s.label)}
			onclick={() => (ui.openApp = s.id)}
		>
			<AppIcon icon={s.icon} badgeClass="badge-{s.id}" />
			<span>{s.label}</span>
		</button>
	{/each}
</div>

<style>
	.icon-grid {
		position: absolute;
		top: 28px;
		left: 22px;
		bottom: 150px;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-content: flex-start;
		gap: 2px 4px;
	}
	.dicon {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 9px;
		width: 96px;
		padding: 12px 6px 10px;
		border-radius: 10px;
		border: 1px solid transparent;
		background: transparent;
		color: var(--ink);
		cursor: pointer;
		text-align: center;
		font-family: var(--font-body);
		transition:
			background 0.15s var(--ease),
			transform 0.15s var(--spring);
	}
	.dicon:hover {
		background: rgba(255, 255, 255, 0.055);
		border-color: rgba(255, 255, 255, 0.06);
	}
	.dicon:active {
		transform: scale(0.94);
	}
	.dicon:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
	}
	.dicon.hidden-match {
		opacity: 0.15;
		pointer-events: none;
	}
	.dicon span {
		font-size: 12.5px;
		line-height: 1.25;
		color: var(--ink);
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
		font-weight: 500;
	}

	@media (max-width: 640px) {
		.icon-grid {
			bottom: 150px;
			flex-wrap: wrap;
			height: auto;
		}
		.dicon {
			width: 78px;
		}
	}
</style>
