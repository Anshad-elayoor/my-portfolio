<script>
	import { ui } from '$lib/stores.svelte.js';
	import { sections } from '$lib/content.js';
	import { ICONS } from '$lib/icons.js';
	import { APP_COMPONENTS } from '../apps/registry.js';

	// Keep showing the last-opened app while the window slides/fades out, so the
	// body isn't empty mid-close-transition — only `ui.openApp` drives visibility.
	let displayed = $state(/** @type {string | null} */ (null));
	$effect(() => {
		if (ui.openApp) displayed = ui.openApp;
	});

	const section = $derived(sections.find((s) => s.id === displayed));
	const Comp = $derived(displayed ? APP_COMPONENTS[displayed] : null);

	function close() {
		ui.openApp = null;
	}

	function onKey(e) {
		if (e.key === 'Escape') close();
	}
</script>

<svelte:window onkeydown={onKey} />

<div class="winlayer" class:open={!!ui.openApp}>
	<button class="scrim" onclick={close} aria-label="Close window"></button>
	<div class="win">
		<div class="win-head">
			<div class="dots">
				<button class="dot red" onclick={close} aria-label="Close window"></button>
				<span class="dot yellow" aria-hidden="true"></span>
				<span class="dot green" aria-hidden="true"></span>
			</div>
			{#if section}
				<div class="win-title">
					<svg viewBox="0 0 24 24">{@html ICONS[section.icon]}</svg>
					{section.title}
				</div>
			{/if}
		</div>
		<div class="win-body">
			{#if Comp}
				<Comp />
			{/if}
		</div>
	</div>
</div>

<style>
	.scrim {
		position: absolute;
		inset: 0;
		background: rgba(5, 7, 8, 0.35);
		backdrop-filter: blur(3px);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.28s var(--ease);
		z-index: 8;
		border: none;
		padding: 0;
		cursor: default;
	}
	.winlayer.open .scrim {
		opacity: 1;
		pointer-events: auto;
	}
	.winlayer {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 46px;
		pointer-events: none;
		z-index: 9;
	}
	.win {
		pointer-events: auto;
		width: min(900px, 92vw);
		height: min(650px, 82vh);
		background: var(--panel);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 14px 14px 0 0;
		box-shadow:
			0 40px 80px -24px rgba(0, 0, 0, 0.6),
			0 14px 30px -10px rgba(0, 0, 0, 0.45),
			inset 0 1px 0 rgba(255, 255, 255, 0.06);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		transform: translateY(26px) scale(0.97);
		opacity: 0;
		transition:
			transform 0.4s var(--spring),
			opacity 0.25s var(--ease);
	}
	.winlayer.open .win {
		transform: translateY(0) scale(1);
		opacity: 1;
	}
	.win-head {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 15px;
		background: rgba(28, 35, 41, 0.85);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		flex: none;
	}
	.dots {
		display: flex;
		gap: 8px;
	}
	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: none;
		padding: 0;
		cursor: default;
	}
	.dot.red {
		background: radial-gradient(circle at 35% 30%, #ff8a83, var(--red));
		cursor: pointer;
	}
	.dot.yellow {
		background: radial-gradient(circle at 35% 30%, #ffd479, var(--yellow));
	}
	.dot.green {
		background: radial-gradient(circle at 35% 30%, #63e06f, var(--green));
	}
	.win-title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		font-weight: 600;
		color: var(--ink);
	}
	.win-title svg {
		width: 15px;
		height: 15px;
		stroke: var(--accent);
		fill: none;
		stroke-width: 1.8;
	}
	.win-body {
		overflow-y: auto;
		padding: 30px clamp(20px, 4vw, 46px) 46px;
		flex: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.win,
		.scrim {
			transition: none !important;
		}
	}
	@media (max-width: 640px) {
		.win {
			width: 100%;
			height: 88vh;
			border-radius: 10px 10px 0 0;
		}
	}
</style>
