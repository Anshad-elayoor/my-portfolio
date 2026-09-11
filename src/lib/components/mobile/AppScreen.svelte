<script>
	import { spring } from 'svelte/motion';
	import { ui } from '$lib/stores.svelte.js';
	import { sections } from '$lib/content.js';
	import { ICONS } from '$lib/icons.js';
	import { APP_COMPONENTS } from '../apps/registry.js';

	let displayed = $state(/** @type {string | null} */ (null));
	let backBtn = $state(/** @type {HTMLButtonElement | undefined} */ (undefined));
	$effect(() => {
		if (ui.openApp) {
			displayed = ui.openApp;
			backBtn?.focus();
		}
	});

	const section = $derived(sections.find((s) => s.id === displayed));
	const Comp = $derived(displayed ? APP_COMPONENTS[displayed] : null);
	const origin = $derived(ui.openOrigin ?? { x: 0, y: 0 });

	function close() {
		ui.openApp = null;
		dragY.set(0, { hard: true });
	}

	// swipe-down-to-dismiss
	const dragY = spring(0, { stiffness: 0.3, damping: 0.75 });
	let dragging = $state(false);
	let startY = 0;

	function onPointerDown(e) {
		dragging = true;
		startY = e.clientY;
		e.currentTarget.setPointerCapture?.(e.pointerId);
	}
	function onPointerMove(e) {
		if (!dragging) return;
		dragY.set(Math.max(0, e.clientY - startY));
	}
	function onPointerUp() {
		if (!dragging) return;
		dragging = false;
		if ($dragY > 100) {
			close();
		} else {
			dragY.set(0);
		}
	}

	function onKey(e) {
		if (e.key === 'Escape' && ui.openApp) close();
	}
</script>

<svelte:window onkeydown={onKey} />

<div
	class="appscreen"
	class:open={!!ui.openApp}
	role="dialog"
	aria-modal="true"
	aria-label={section?.title ?? 'App'}
	style="transform-origin: {origin.x}px {origin.y}px; --drag: {$dragY}px;"
>
	<!-- pointer handlers here are a decorative swipe-down-to-dismiss bonus gesture;
	     the actual dismiss control is the real, keyboard-focusable "Home" button below -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="nav"
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
	>
		<button class="back" bind:this={backBtn} onclick={close}>
			<svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" /></svg>
			Home
		</button>
		{#if section}
			<div class="title">
				<svg viewBox="0 0 24 24">{@html ICONS[section.icon]}</svg>
				{section.title}
			</div>
		{/if}
	</div>
	<div class="body">
		{#if Comp}
			<Comp />
		{/if}
	</div>
	<div class="home-indicator" aria-hidden="true"></div>
</div>

<style>
	.appscreen {
		position: absolute;
		inset: 0;
		z-index: 9;
		background: linear-gradient(180deg, rgba(18, 23, 27, 0.92), rgba(10, 14, 17, 0.96));
		backdrop-filter: blur(30px) saturate(1.5);
		-webkit-backdrop-filter: blur(30px) saturate(1.5);
		display: flex;
		flex-direction: column;
		transform: scale(0.14) translateY(var(--drag, 0px));
		opacity: 0;
		pointer-events: none;
		transition:
			transform 0.42s var(--spring),
			opacity 0.22s var(--ease);
	}
	.appscreen.open {
		transform: scale(1) translateY(var(--drag, 0px));
		opacity: 1;
		pointer-events: auto;
	}
	.nav {
		flex: none;
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 16px 16px 12px;
		touch-action: none;
	}
	.back {
		display: flex;
		align-items: center;
		gap: 2px;
		background: none;
		border: none;
		color: var(--accent);
		font-size: 15px;
		font-family: var(--font-body);
		font-weight: 500;
		cursor: pointer;
		padding: 4px 4px 4px 0;
	}
	.back svg {
		width: 20px;
		height: 20px;
		stroke: var(--accent);
		fill: none;
		stroke-width: 2.2;
	}
	.title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		font-weight: 600;
		color: var(--sub);
	}
	.title svg {
		width: 14px;
		height: 14px;
		stroke: var(--sub);
		fill: none;
		stroke-width: 1.8;
	}
	.body {
		flex: 1;
		overflow-y: auto;
		padding: 6px 20px 30px;
	}
	.home-indicator {
		flex: none;
		width: 120px;
		height: 5px;
		border-radius: 3px;
		background: var(--sub);
		opacity: 0.6;
		margin: 8px auto 10px;
	}

	@media (prefers-reduced-motion: reduce) {
		.appscreen {
			transition: none !important;
		}
	}
</style>
