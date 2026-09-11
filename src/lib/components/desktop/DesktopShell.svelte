<script>
	import { base } from '$app/paths';
	import LockScreen from '../shared/LockScreen.svelte';
	import Wallpaper from '../shared/Wallpaper.svelte';
	import IconGrid from './IconGrid.svelte';
	import Dock from './Dock.svelte';
	import Taskbar from './Taskbar.svelte';
	import Window from './Window.svelte';
	import { ui } from '$lib/stores.svelte.js';
</script>

<div class="stage">
	<div class="desktop">
		<Wallpaper image="{base}/home-desktop.png" />
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
</style>
