<script>
	import LockScreen from '../shared/LockScreen.svelte';
	import StatusBar from './StatusBar.svelte';
	import HomeScreen from './HomeScreen.svelte';
	import MobileDock from './MobileDock.svelte';
	import AppScreen from './AppScreen.svelte';
	import { ui } from '$lib/stores.svelte.js';
</script>

<div class="stage">
	<div class="home">
		<div class="glow g1"></div>
		<div class="glow g2"></div>
		<StatusBar />
		<HomeScreen />
		<MobileDock />
	</div>

	<AppScreen />

	{#if ui.locked}
		<LockScreen variant="mobile" />
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
	.home {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		background: var(--desk);
		overflow: hidden;
	}
	.glow {
		position: absolute;
		border-radius: 50%;
		filter: blur(70px);
		opacity: 0.5;
		pointer-events: none;
	}
	.glow.g1 {
		width: 420px;
		height: 420px;
		background: radial-gradient(circle, rgba(75, 232, 206, 0.16), transparent 70%);
		top: -140px;
		right: -120px;
	}
	.glow.g2 {
		width: 360px;
		height: 360px;
		background: radial-gradient(circle, rgba(245, 165, 36, 0.1), transparent 70%);
		bottom: -100px;
		left: -60px;
	}
</style>
