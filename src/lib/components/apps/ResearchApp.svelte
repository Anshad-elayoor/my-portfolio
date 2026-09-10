<script>
	import { research } from '$lib/content.js';
</script>

<div class="app-content">
	<h2>Research</h2>
	<p>Two journal publications and one conference presentation.</p>
	{#each research as r}
		<div class="row">
			<strong>{r.title}</strong>
			<p>
				{r.authors} &middot; {r.venue}
				{#if r.link}
					&middot; <a href={r.link.href} target="_blank" rel="noopener">{r.link.label}</a>
				{/if}
			</p>
		</div>
	{/each}
</div>
