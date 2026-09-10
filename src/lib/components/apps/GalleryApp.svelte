<script>
	import { base } from '$app/paths';
	import { gallery } from '$lib/content.js';
</script>

<div class="app-content">
	<h2>Gallery</h2>
	<div class="gallery-grid">
		{#each gallery as g}
			<div class="gtile">
				<img src="{base}/gallery/{g.file}" alt={g.alt} loading="lazy" />
			</div>
		{/each}
	</div>
</div>
