<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Anshad K | Mechatronics Engineer</title>
	<meta name="description" content="Anshad K is a mechatronics engineer in Kerala, India — robotics, IoT and VLSI projects, the TechCon26 event platform, research and teaching." />
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
