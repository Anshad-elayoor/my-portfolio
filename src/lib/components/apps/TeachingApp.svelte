<script>
	import { teaching } from '$lib/content.js';
	import FileBrowser from '../shared/FileBrowser.svelte';

	const items = teaching.map((t, i) => ({ id: String(i), name: t.what, meta: t.when, data: t }));
</script>

<div class="app-content">
	<h2>Teaching &amp; talks</h2>
	<p>I enjoy working with students and professionals, and teaching is a regular part of my work.</p>
	<FileBrowser {items} tint="#128a3e">
		{#snippet detail(item)}
			{@const t = item.data}
			<div class="row-h">
				<strong>{t.what}</strong>
				<span class="status">{t.when}</span>
			</div>
			<p>{t.where}</p>
		{/snippet}
	</FileBrowser>
</div>
