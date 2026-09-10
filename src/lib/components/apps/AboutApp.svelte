<script>
	import { about } from '$lib/content.js';
</script>

<div class="app-content">
	<h2>About</h2>
	{#each about.paragraphs as para}
		<p>{para}</p>
	{/each}
</div>
