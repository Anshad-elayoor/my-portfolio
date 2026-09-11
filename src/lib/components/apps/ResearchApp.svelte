<script>
	import { research } from '$lib/content.js';
	import FileBrowser from '../shared/FileBrowser.svelte';

	const items = research.map((r, i) => ({ id: String(i), name: r.title, data: r }));
</script>

<div class="app-content">
	<h2>Research</h2>
	<p>Two journal publications and one conference presentation.</p>
	<FileBrowser {items} tint="#ffb300">
		{#snippet detail(item)}
			{@const r = item.data}
			<strong>{r.title}</strong>
			<p>
				{r.authors} &middot; {r.venue}
				{#if r.link}
					&middot; <a href={r.link.href} target="_blank" rel="noopener">{r.link.label}</a>
				{/if}
			</p>
		{/snippet}
	</FileBrowser>
</div>
