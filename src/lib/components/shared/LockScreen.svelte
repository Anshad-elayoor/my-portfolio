<script>
	import { spring } from 'svelte/motion';
	import { chime } from '$lib/audio.js';
	import { person } from '$lib/content.js';
	import { ui } from '$lib/stores.svelte.js';
	import StatusClock from './StatusClock.svelte';

	/** @type {{ variant?: 'desktop' | 'mobile' }} */
	let { variant = 'desktop' } = $props();

	let lockEl = $state(/** @type {HTMLDivElement | undefined} */ (undefined));
	let animating = $state(false);
	let initials = person.name
		.split(' ')
		.map((w) => w[0])
		.join('')
		.slice(0, 2);

	function reveal() {
		animating = true;
		const delay = ui.reducedMotion ? 0 : 680;
		setTimeout(() => {
			ui.locked = false;
		}, delay);
	}

	// Desktop: circular "iris" reveal expanding from the button that was clicked.
	function onDesktopUnlock(e) {
		chime();
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
			reveal();
		} else {
			dragY.set(0);
		}
	}
	function onMobileButtonUnlock() {
		chime();
		reveal();
	}
</script>

<div
	class="lock"
	class:mobile-variant={variant === 'mobile'}
	class:animating
	bind:this={lockEl}
	style={variant === 'mobile' ? `transform: translateY(${$dragY}px)` : undefined}
>
	<div class="lock-bg"></div>

	<StatusClock variant="lock" />

	<div class="lock-card">
		<div class="lock-avatar">{initials}</div>
		<div class="lock-name">{person.name}</div>
		<div class="lock-role">{person.role}</div>

		{#if variant === 'desktop'}
			<button class="unlock-btn" autofocus onclick={onDesktopUnlock}>
				Unlock
				<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
			</button>
			<div class="lock-hint">click, or press Enter</div>
		{:else}
			<button class="unlock-btn" onclick={onMobileButtonUnlock}>
				Unlock
				<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
			</button>
			<div class="lock-hint">or swipe up from below</div>
		{/if}
	</div>

	{#if variant === 'mobile'}
		<!-- Decorative gesture surface only — the real Unlock button above is the
		     accessible control, so this stays out of the tab order entirely rather
		     than being a focusable "button" that keyboard/switch input can't operate. -->
		<div
			class="swipe-handle"
			aria-hidden="true"
			onpointerdown={onPointerDown}
			onpointermove={onPointerMove}
			onpointerup={onPointerUp}
			onpointercancel={onPointerUp}
		>
			<div class="swipe-pill"></div>
			<div class="swipe-label">swipe up to unlock</div>
		</div>
	{/if}

	<div class="lock-build">anshad-os &middot; build 2026.09</div>
</div>

<style>
	.lock {
		position: absolute;
		inset: 0;
		z-index: 20;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 24px;
		background:
			radial-gradient(1500px 950px at 50% -8%, rgba(75, 232, 206, 0.11), transparent 55%),
			radial-gradient(700px 500px at 12% 92%, rgba(245, 165, 36, 0.07), transparent 60%),
			linear-gradient(180deg, #0b1013, #080b0d);
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
	.lock-bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.55;
		background-image:
			linear-gradient(rgba(75, 232, 206, 0.05) 1px, transparent 1px),
			linear-gradient(90deg, rgba(75, 232, 206, 0.05) 1px, transparent 1px);
		background-size: 40px 40px;
		mask-image: radial-gradient(950px 750px at 50% 36%, #000 0%, transparent 72%);
	}
	.lock-card {
		position: relative;
		width: min(320px, 86vw);
		background: rgba(22, 28, 32, 0.68);
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 16px;
		padding: 28px 24px 24px;
		text-align: center;
		backdrop-filter: blur(16px) saturate(1.3);
		box-shadow:
			0 30px 60px -20px rgba(0, 0, 0, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.08);
	}
	.lock-avatar {
		width: 58px;
		height: 58px;
		border-radius: 16px;
		margin: 0 auto 16px;
		background: linear-gradient(155deg, var(--accent), #0f8e7c);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-weight: 800;
		color: var(--accent-ink);
		font-size: 21px;
		box-shadow:
			0 12px 24px -8px rgba(75, 232, 206, 0.45),
			inset 0 1px 0 rgba(255, 255, 255, 0.35);
	}
	.lock-name {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 18.5px;
		margin-bottom: 3px;
	}
	.lock-role {
		font-size: 12.5px;
		color: var(--sub);
		margin-bottom: 20px;
	}
	.unlock-btn {
		width: 100%;
		background: linear-gradient(155deg, #5eecd6, var(--accent-2));
		color: var(--accent-ink);
		border: none;
		border-radius: 9px;
		padding: 13px;
		font-weight: 700;
		font-size: 14px;
		font-family: var(--font-body);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		box-shadow:
			0 10px 22px -8px rgba(75, 232, 206, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
		transition: transform 0.15s var(--spring);
	}
	.unlock-btn:hover {
		transform: translateY(-1px);
	}
	.unlock-btn:active {
		transform: scale(0.97);
	}
	.unlock-btn:focus-visible {
		outline: 2px solid #fff;
		outline-offset: 2px;
	}
	.unlock-btn svg {
		width: 15px;
		height: 15px;
		stroke: var(--accent-ink);
		fill: none;
		stroke-width: 2.2;
	}
	.lock-build {
		position: absolute;
		left: 18px;
		bottom: 16px;
		font-family: var(--font-mono);
		font-size: 10.5px;
		color: var(--faint);
	}
	.lock-hint {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--faint);
		margin-top: 3px;
	}

	.swipe-handle {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 40%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		gap: 10px;
		padding-bottom: 26px;
		cursor: grab;
	}
	.swipe-pill {
		width: 44px;
		height: 5px;
		border-radius: 3px;
		background: var(--sub);
		opacity: 0.7;
	}
	.swipe-label {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--faint);
	}

	@media (prefers-reduced-motion: reduce) {
		.lock,
		.lock.animating,
		.lock.mobile-variant {
			transition: none !important;
		}
	}
</style>
