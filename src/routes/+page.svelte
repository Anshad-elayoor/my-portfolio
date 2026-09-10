<script>
	import { ui } from '$lib/stores.svelte.js';
	import DesktopShell from '$lib/components/desktop/DesktopShell.svelte';
	import MobileShell from '$lib/components/mobile/MobileShell.svelte';
</script>

{#if ui.mobile}
	<MobileShell />
{:else}
	<DesktopShell />
{/if}
