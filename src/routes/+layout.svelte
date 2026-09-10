<script>
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { initMedia } from '$lib/stores.svelte.js';
	import '$lib/styles/tokens.css';
	import '$lib/styles/app-content.css';

	let { children } = $props();

	onMount(() => {
		initMedia();
	});
</script>

<svelte:head>
	<title>Anshad K | Mechatronics Engineer</title>
	<meta
		name="description"
		content="Anshad K is a mechatronics engineer in Kerala, India — robotics, IoT and VLSI projects, the TechCon26 event platform, research and teaching."
	/>
	<meta name="theme-color" content="#0a0d10" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
	/>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(html, body) {
		height: 100%;
		margin: 0;
	}
	:global(body) {
		background: var(--void);
		color: var(--ink);
		font-family: var(--font-body);
		overflow: hidden;
		-webkit-font-smoothing: antialiased;
	}
	:global(button) {
		font: inherit;
	}
	:global(::selection) {
		background: var(--accent);
		color: var(--accent-ink);
	}
</style>
