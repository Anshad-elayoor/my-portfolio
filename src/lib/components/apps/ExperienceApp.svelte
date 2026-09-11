<script>
	import { experience, education } from '$lib/content.js';
	import FileBrowser from '../shared/FileBrowser.svelte';

	const workItems = experience.map((e, i) => ({ id: String(i), name: e.role, meta: e.when, data: e }));
	const eduItems = education.map((e, i) => ({ id: String(i), name: e.role, meta: e.when, data: e }));
</script>

<div class="app-content">
	<h2>Experience</h2>
	<FileBrowser items={workItems} tint="#0e7d6f">
		{#snippet detail(item)}
			{@const e = item.data}
			<span class="when">{e.when}</span>
			<b>{e.role}</b>
			{#if e.where}<p style="margin: 2px 0 0; color: var(--sub); font-size: 12.5px;">{e.where}</p>{/if}
			{#if e.body}<p>{e.body}</p>{/if}
		{/snippet}
	</FileBrowser>

	<h2 style="margin-top: 32px;">Education</h2>
	<FileBrowser items={eduItems} tint="#0e7d6f">
		{#snippet detail(item)}
			{@const e = item.data}
			<span class="when">{e.when}</span>
			<b>{e.role} — {e.where}</b>
			<p>{e.body}</p>
		{/snippet}
	</FileBrowser>
</div>
