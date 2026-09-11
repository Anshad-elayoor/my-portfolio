<script>
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import {
		ui,
		closeWindow,
		minimizeWindow,
		toggleMaximizeWindow,
		focusWindow,
		moveWindow
	} from '$lib/stores.svelte.js';
	import { sections } from '$lib/content.js';
	import { ICONS } from '$lib/icons.js';
	import { APP_COMPONENTS } from '../apps/registry.js';

	/** @type {{ w: import('$lib/stores.svelte.js').DesktopWindow }} */
	let { w } = $props();

	const section = $derived(sections.find((s) => s.id === w.id));
	const Comp = $derived(APP_COMPONENTS[w.id]);

	let frameEl = $state(/** @type {HTMLDivElement | undefined} */ (undefined));
	let closeBtn = $state(/** @type {HTMLButtonElement | undefined} */ (undefined));
	$effect(() => {
		if (!w.minimized) closeBtn?.focus();
	});

	let dragging = false;
	let dragStartPointer = { x: 0, y: 0 };
	let dragStartPos = { x: 0, y: 0 };

	function onHeadPointerDown(e) {
		if (e.target.closest('.dot') || w.maximized) return;
		dragging = true;
		dragStartPointer = { x: e.clientX, y: e.clientY };
		dragStartPos = { x: w.x, y: w.y };
		e.currentTarget.setPointerCapture?.(e.pointerId);
	}
	function onHeadPointerMove(e) {
		if (!dragging) return;
		const dx = e.clientX - dragStartPointer.x;
		const dy = e.clientY - dragStartPointer.y;
		const rect = frameEl?.getBoundingClientRect();
		const fw = rect?.width ?? 900;
		const fh = rect?.height ?? 650;
		const maxX = Math.max(4, window.innerWidth - fw - 4);
		const maxY = Math.max(4, window.innerHeight - fh - 56);
		moveWindow(w.id, Math.min(Math.max(4, dragStartPos.x + dx), maxX), Math.min(Math.max(4, dragStartPos.y + dy), maxY));
	}
	function onHeadPointerUp() {
		dragging = false;
	}

	const transitionOpts = $derived(ui.reducedMotion ? { duration: 0 } : { start: 0.93, duration: 240, easing: quintOut });
</script>

{#if !w.minimized}
	<!-- pointerdown here only brings the window to front (z-order), the same way
	     clicking any real OS window does — the actual interactive surface is
	     everything inside, so this stays a plain, non-interactive wrapper. -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="win-frame"
		class:maximized={w.maximized}
		bind:this={frameEl}
		style:left={w.maximized ? undefined : `${w.x}px`}
		style:top={w.maximized ? undefined : `${w.y}px`}
		style:z-index={w.z}
		onpointerdown={() => focusWindow(w.id)}
		transition:scale={transitionOpts}
	>
		<div class="win glass-deep" role="dialog" aria-modal="false" aria-label={section?.title ?? 'Window'}>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="win-head"
				onpointerdown={onHeadPointerDown}
				onpointermove={onHeadPointerMove}
				onpointerup={onHeadPointerUp}
				onpointercancel={onHeadPointerUp}
			>
				<div class="dots">
					<button class="dot red" bind:this={closeBtn} onclick={() => closeWindow(w.id)} aria-label="Close window"></button>
					<button class="dot yellow" onclick={() => minimizeWindow(w.id)} aria-label="Minimize window"></button>
					<button class="dot green" onclick={() => toggleMaximizeWindow(w.id)} aria-label={w.maximized ? 'Restore window' : 'Maximize window'}></button>
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
{/if}

<style>
	.win-frame {
		position: absolute;
		width: min(900px, 92vw);
		height: min(650px, 82vh);
		pointer-events: auto;
	}
	.win-frame.maximized {
		left: 12px !important;
		top: 12px !important;
		width: calc(100vw - 24px);
		height: calc(100vh - 76px);
	}
	.win {
		width: 100%;
		height: 100%;
		border-radius: 14px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.win-head {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 15px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		flex: none;
		cursor: grab;
		touch-action: none;
	}
	.win-frame.maximized .win-head {
		cursor: default;
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
		cursor: pointer;
	}
	.dot.red {
		background: radial-gradient(circle at 35% 30%, #ff8a83, var(--red));
	}
	.dot.yellow {
		background: radial-gradient(circle at 35% 30%, #ffd479, var(--yellow));
	}
	.dot.green {
		background: radial-gradient(circle at 35% 30%, #63e06f, var(--green));
	}
	.dot:focus-visible {
		outline: 2px solid #fff;
		outline-offset: 2px;
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
		.win-frame {
			transition: none !important;
		}
	}
</style>
