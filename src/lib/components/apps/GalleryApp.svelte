<script>
	import { base } from '$app/paths';
	import { gallery } from '$lib/content.js';
	import FileBrowser from '../shared/FileBrowser.svelte';

	const items = gallery.map((g, i) => ({ id: String(i), name: `Photo ${i + 1}`, data: g }));
</script>

<div class="app-content">
	<h2>Gallery</h2>
	<FileBrowser {items}>
		{#snippet icon(item)}
			<img src="{base}/gallery/{item.data.file}" alt="" loading="lazy" class="thumb" />
		{/snippet}
		{#snippet detail(item)}
			<div class="gtile-full">
				<img src="{base}/gallery/{item.data.file}" alt={item.data.alt} loading="lazy" />
			</div>
			<p>{item.data.alt}</p>
		{/snippet}
	</FileBrowser>
</div>

<style>
	.thumb {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 8px;
		box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.14);
	}
	.gtile-full {
		max-width: 480px;
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid var(--line);
		margin-bottom: 14px;
	}
	.gtile-full img {
		width: 100%;
		display: block;
	}
</style>
