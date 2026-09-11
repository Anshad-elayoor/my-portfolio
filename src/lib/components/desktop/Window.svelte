<script>
	import { ui, closeWindow, frontmostWindowId } from '$lib/stores.svelte.js';
	import DesktopWindow from './DesktopWindow.svelte';

	function onKey(e) {
		if (e.key !== 'Escape') return;
		const id = frontmostWindowId();
		if (id) closeWindow(id);
	}
</script>

<svelte:window onkeydown={onKey} />

<div class="winlayer">
	{#each ui.desktopWindows as w (w.id)}
		<DesktopWindow {w} />
	{/each}
</div>

<style>
	.winlayer {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 9;
	}
</style>
