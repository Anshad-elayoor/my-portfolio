<script>
	import { projects } from '$lib/content.js';
</script>

<div class="app-content">
	<h2>Projects</h2>
	{#each projects as p}
		<div class="row">
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
		</div>
	{/each}
</div>
