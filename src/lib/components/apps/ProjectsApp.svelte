<script>
	import { projects } from '$lib/content.js';
	import FileBrowser from '../shared/FileBrowser.svelte';

	const items = projects.map((p, i) => ({ id: String(i), name: p.title, meta: p.status, data: p }));
</script>

<div class="app-content">
	<h2>Projects</h2>
	<FileBrowser {items} tint="#5c3adb">
		{#snippet detail(item)}
			{@const p = item.data}
			<div class="row-h">
				<strong>{p.title}</strong>
				<span class="status" class:hold={p.status === 'on hold'}>{p.status}</span>
			</div>
			<p style="max-width: 60ch;">{p.summary}</p>
			{#if p.context || p.builtWith || p.link}
				<dl class="specs">
					{#if p.builtWith}
						<dt>built with</dt>
						<dd>{p.builtWith}</dd>
					{/if}
					{#if p.context}
						<dt>context</dt>
						<dd>{p.context}</dd>
					{/if}
					{#if p.link}
						<dt>link</dt>
						<dd><a href={p.link.href} target="_blank" rel="noopener">{p.link.label}</a></dd>
					{/if}
				</dl>
			{/if}
		{/snippet}
	</FileBrowser>
</div>
