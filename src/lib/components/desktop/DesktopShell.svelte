<script>
	import LockScreen from '../shared/LockScreen.svelte';
	import IconGrid from './IconGrid.svelte';
	import Dock from './Dock.svelte';
	import Taskbar from './Taskbar.svelte';
	import Window from './Window.svelte';
	import { ui } from '$lib/stores.svelte.js';
</script>

<div class="stage">
	<div class="desktop">
		<div class="glow g1"></div>
		<div class="glow g2"></div>
		<div class="glow g3"></div>
		<svg class="grain" width="100%" height="100%" aria-hidden="true">
			<filter id="dgrain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /></filter>
			<rect width="100%" height="100%" filter="url(#dgrain)" />
		</svg>
		<IconGrid />
	</div>

	<Window />
	<Dock />
	<Taskbar />

	{#if ui.locked}
		<LockScreen variant="desktop" />
	{/if}
</div>

<style>
	.stage {
		position: relative;
		width: 100%;
		height: 100vh;
		min-height: 580px;
		overflow: hidden;
	}
	.desktop {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background: var(--desk);
	}
	.glow {
		position: absolute;
		border-radius: 50%;
		filter: blur(70px);
		opacity: 0.5;
		pointer-events: none;
	}
	.glow.g1 {
		width: 520px;
		height: 520px;
		background: radial-gradient(circle, rgba(75, 232, 206, 0.16), transparent 70%);
		top: -160px;
		right: -100px;
	}
	.glow.g2 {
		width: 460px;
		height: 460px;
		background: radial-gradient(circle, rgba(245, 165, 36, 0.1), transparent 70%);
		bottom: -140px;
		left: 8%;
	}
	.glow.g3 {
		width: 380px;
		height: 380px;
		background: radial-gradient(circle, rgba(139, 124, 246, 0.08), transparent 70%);
		bottom: 20%;
		right: 18%;
	}
	.desktop::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.4;
		background-image:
			linear-gradient(rgba(75, 232, 206, 0.05) 1px, transparent 1px),
			linear-gradient(90deg, rgba(75, 232, 206, 0.05) 1px, transparent 1px);
		background-size: 36px 36px;
		mask-image: radial-gradient(1300px 850px at 68% 15%, #000 0%, transparent 72%);
	}
	.grain {
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.05;
		mix-blend-mode: overlay;
	}
</style>
