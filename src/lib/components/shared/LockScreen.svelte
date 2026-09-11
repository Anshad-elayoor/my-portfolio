<script>
	import { spring } from 'svelte/motion';
	import { base } from '$app/paths';
	import { chime } from '$lib/audio.js';
	import { person } from '$lib/content.js';
	import { ui } from '$lib/stores.svelte.js';
	import { enterFullscreen } from '$lib/fullscreen.js';
	import StatusClock from './StatusClock.svelte';
	import Wallpaper from './Wallpaper.svelte';

	/** @type {{ variant?: 'desktop' | 'mobile' }} */
	let { variant = 'desktop' } = $props();

	let lockEl = $state(/** @type {HTMLDivElement | undefined} */ (undefined));
	let animating = $state(false);

	function reveal() {
		if (animating) return;
		animating = true;
		const delay = ui.reducedMotion ? 0 : 680;
		setTimeout(() => {
			ui.locked = false;
		}, delay);
	}

	// Desktop: circular "iris" reveal expanding from the button that was clicked.
	function onDesktopUnlock(e) {
		if (animating) return;
		chime();
		enterFullscreen();
		if (ui.reducedMotion || !lockEl) {
			ui.locked = false;
			return;
		}
		const r = e.currentTarget.getBoundingClientRect();
		const x = r.left + r.width / 2;
		const y = r.top + r.height / 2;
		animating = true;
		lockEl.style.clipPath = `circle(150% at ${x}px ${y}px)`;
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				if (lockEl) lockEl.style.clipPath = `circle(0% at ${x}px ${y}px)`;
			});
		});
		setTimeout(() => {
			ui.locked = false;
		}, 700);
	}

	// Mobile: swipe up from the handle to unlock, with spring-back if released early.
	const dragY = spring(0, { stiffness: 0.28, damping: 0.72 });
	let dragging = $state(false);
	let startY = 0;
	const THRESHOLD = -110;

	function onPointerDown(e) {
		if (animating) return;
		dragging = true;
		startY = e.clientY;
		e.currentTarget.setPointerCapture?.(e.pointerId);
	}
	function onPointerMove(e) {
		if (!dragging) return;
		dragY.set(Math.min(0, e.clientY - startY));
	}
	function onPointerUp() {
		if (!dragging) return;
		dragging = false;
		if ($dragY < THRESHOLD) {
			dragY.set(-900);
			chime();
			enterFullscreen();
			reveal();
		} else {
			dragY.set(0);
		}
	}
	// Tap-to-unlock fallback for keyboard/switch/assistive input — the pill is a
	// real button, the drag surface around it is a decorative pointer-only bonus.
	function onMobileButtonUnlock() {
		chime();
		enterFullscreen();
		reveal();
	}

	const dateShort = $derived(
		new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
	);
</script>

<div
	class="lock"
	class:mobile-variant={variant === 'mobile'}
	class:animating
	bind:this={lockEl}
	style={variant === 'mobile' ? `transform: translateY(${$dragY}px)` : undefined}
>
	<Wallpaper image="{base}/{variant === 'mobile' ? 'lock-mobile.png' : 'lock-desktop.png'}" />

	<!-- Thin info strip, not a panel — carries a little system-status flavor
	     without ever covering enough of the photo to matter. -->
	<div class="lock-topbar">
		<span class="lt-tag">anshad-os</span>
		<span class="lt-date">{dateShort}</span>
		<div class="lt-glyphs" aria-hidden="true">
			<svg viewBox="0 0 20 12" class="signal"><rect x="0" y="7" width="3" height="5" rx="0.5" /><rect x="5.5" y="5" width="3" height="7" rx="0.5" /><rect x="11" y="3" width="3" height="9" rx="0.5" /><rect x="16.5" y="0" width="3" height="12" rx="0.5" /></svg>
			<svg viewBox="0 0 20 15" class="wifi"><path d="M1 5.5a14 14 0 0 1 18 0M4 9a9 9 0 0 1 12 0M7.3 12.4a4.2 4.2 0 0 1 5.4 0" /><circle cx="10" cy="14.2" r="1" fill="currentColor" stroke="none" /></svg>
			<svg viewBox="0 0 26 13" class="battery"><rect x="0.5" y="0.5" width="21" height="12" rx="2.5" /><rect x="23" y="4" width="2" height="5" rx="1" fill="currentColor" stroke="none" /><rect x="2" y="2" width="16" height="9" rx="1" fill="currentColor" stroke="none" /></svg>
		</div>
	</div>

	<div class="face-label face-label-left" aria-hidden="true">
		<span>Mechatronics</span>
		<span>Robotics</span>
	</div>
	<div class="face-label face-label-right" aria-hidden="true">
		<span>VLSI</span>
		<span>Silicon</span>
	</div>

	<div class="clock-wrap">
		<StatusClock variant="lock" />
	</div>

	<div class="lock-bottom">
		{#if variant === 'desktop'}
			<div class="lock-id">
				<div class="lock-name">{person.name}</div>
				<div class="lock-role">{person.role}</div>
			</div>
			<!-- svelte-ignore a11y_autofocus -->
			<button class="unlock-fab" autofocus onclick={onDesktopUnlock} aria-label="Unlock">
				<svg viewBox="0 0 24 24"><path d="M6 15l6-6 6 6" /></svg>
			</button>
			<div class="lock-hint">click, or press Enter</div>
		{/if}
	</div>

	{#if variant === 'mobile'}
		<!-- Pointer handlers here are a decorative drag-to-unlock bonus; the real
		     button below provides full keyboard/assistive-tech access. -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="swipe-handle"
			onpointerdown={onPointerDown}
			onpointermove={onPointerMove}
			onpointerup={onPointerUp}
			onpointercancel={onPointerUp}
		>
			<button class="swipe-pill-btn" onclick={onMobileButtonUnlock} aria-label="Unlock">
				<span class="swipe-pill"></span>
			</button>
			<div class="swipe-label" aria-hidden="true">swipe up to unlock</div>
		</div>
	{/if}
</div>

<style>
	.lock {
		position: absolute;
		inset: 0;
		z-index: 20;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: var(--void);
		clip-path: circle(150% at 50% 42%);
		touch-action: none;
	}
	.lock.animating {
		transition: clip-path 0.68s var(--ease);
	}
	.lock.mobile-variant {
		clip-path: none;
		transition: transform 0.6s var(--ease);
	}
	/* .wallpaper is position:absolute (a "positioned" box), which paints after
	   plain in-flow siblings in CSS stacking order regardless of DOM order — so
	   without their own stacking context, the bars below would render behind it. */
	.lock-topbar,
	.clock-wrap,
	.lock-bottom {
		position: relative;
		z-index: 1;
	}

	.lock-topbar {
		width: 100%;
		flex: none;
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 16px 20px;
		box-sizing: border-box;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.04em;
		color: rgba(255, 255, 255, 0.75);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
	}
	.lt-tag {
		text-transform: uppercase;
		font-weight: 700;
	}
	.lt-date {
		opacity: 0.75;
	}
	.face-label {
		position: absolute;
		top: 35%;
		transform: translateY(-50%);
		z-index: 1;
		display: flex;
		flex-direction: column;
		font-family: var(--font-display);
		font-weight: 800;
		text-transform: uppercase;
		font-size: clamp(22px, 3.6vw, 58px);
		line-height: 0.94;
		letter-spacing: -0.01em;
		color: rgba(255, 255, 255, 0.95);
		text-shadow: 0 4px 18px rgba(0, 0, 0, 0.4);
		pointer-events: none;
	}
	.face-label-left {
		right: 70%;
		align-items: flex-end;
		text-align: right;
	}
	.face-label-right {
		left: 70%;
		align-items: flex-start;
		text-align: left;
	}
	/* The mobile photo crops in tight around the face — there's no clear side
	   margin at eye level like the desktop frame has. The flat band above the
	   hair is wide open on every phone aspect ratio, so mobile moves the same
	   full labels up there instead of squeezing them beside the face. */
	.lock.mobile-variant .face-label {
		top: 16%;
		font-size: clamp(22px, 5vw, 44px);
	}
	.lock.mobile-variant .face-label-left {
		right: auto;
		left: 6%;
		align-items: flex-start;
		text-align: left;
	}
	.lock.mobile-variant .face-label-right {
		left: auto;
		right: 6%;
		align-items: flex-end;
		text-align: right;
	}
	.lt-glyphs {
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: 6px;
		color: rgba(255, 255, 255, 0.85);
	}
	.lt-glyphs svg {
		fill: none;
		stroke: currentColor;
		stroke-width: 1;
		filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5));
	}
	.lt-glyphs .signal {
		width: 15px;
		height: 9px;
	}
	.lt-glyphs .signal rect {
		fill: currentColor;
		stroke: none;
	}
	.lt-glyphs .wifi {
		width: 15px;
		height: 11px;
		stroke-width: 1.4;
		stroke-linecap: round;
	}
	.lt-glyphs .battery {
		width: 20px;
		height: 10px;
	}

	.clock-wrap {
		flex: none;
		margin-top: auto;
		margin-bottom: 18px;
		text-align: center;
	}

	.lock-bottom {
		flex: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		padding-bottom: 40px;
		min-height: 20px;
	}
	.lock-id {
		text-align: center;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.55);
	}
	.lock-name {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 16px;
		margin-bottom: 2px;
	}
	.lock-role {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.7);
	}
	.unlock-fab {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.35);
		background: rgba(20, 24, 28, 0.4);
		backdrop-filter: blur(16px) saturate(1.6);
		-webkit-backdrop-filter: blur(16px) saturate(1.6);
		box-shadow:
			0 10px 22px -8px rgba(0, 0, 0, 0.55),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.15s var(--spring), background 0.15s;
	}
	.unlock-fab:hover {
		transform: translateY(-2px);
		background: rgba(30, 35, 40, 0.5);
	}
	.unlock-fab:active {
		transform: scale(0.94);
	}
	.unlock-fab:focus-visible {
		outline: 2px solid #fff;
		outline-offset: 2px;
	}
	.unlock-fab svg {
		width: 20px;
		height: 20px;
		stroke: #fff;
		fill: none;
		stroke-width: 2.4;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.lock-hint {
		font-family: var(--font-mono);
		font-size: 11px;
		color: rgba(255, 255, 255, 0.65);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
	}

	.swipe-handle {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 30%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		gap: 10px;
		padding-bottom: 22px;
		z-index: 1;
	}
	.swipe-pill-btn {
		background: none;
		border: none;
		padding: 14px 32px;
		margin: 0;
		cursor: grab;
		-webkit-tap-highlight-color: transparent;
	}
	.swipe-pill-btn:active {
		cursor: grabbing;
	}
	.swipe-pill-btn:focus-visible {
		outline: 2px solid #fff;
		outline-offset: 4px;
		border-radius: 6px;
	}
	.swipe-pill {
		display: block;
		width: 44px;
		height: 5px;
		border-radius: 3px;
		background: rgba(255, 255, 255, 0.75);
		opacity: 0.85;
	}
	.swipe-label {
		font-family: var(--font-mono);
		font-size: 11px;
		color: rgba(255, 255, 255, 0.65);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
	}

	@media (prefers-reduced-motion: reduce) {
		.lock,
		.lock.animating,
		.lock.mobile-variant {
			transition: none !important;
		}
	}
</style>
