<script>
	import { base } from '$app/paths';
	import LockScreen from '../shared/LockScreen.svelte';
	import Wallpaper from '../shared/Wallpaper.svelte';
	import StatusBar from './StatusBar.svelte';
	import HomeScreen from './HomeScreen.svelte';
	import MobileDock from './MobileDock.svelte';
	import AppScreen from './AppScreen.svelte';
	import { ui } from '$lib/stores.svelte.js';
</script>

<div class="stage">
	<div class="home">
		<Wallpaper image="{base}/home-mobile.png" />
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
</style>
