<script>
	import { work } from '$lib/content.js';
</script>

<div class="app-content">
	<h2>TechCon26 event platform</h2>
	<p>{work.summary}</p>
	<p>{work.context}</p>
	<p>{work.problem}</p>
	<p>
		What started as a simple website became ten production systems, written, deployed and run by
		me:
	</p>
	<ul style="color: var(--sub); font-size: 14px; line-height: 1.8; margin: 0 0 18px; padding-left: 18px;">
		{#each work.built as item}
			<li>{item}</li>
		{/each}
	</ul>
	<div class="stats">
		{#each work.stats as s}
			<div class="stat"><b>{s.value}</b><span>{s.label}</span></div>
		{/each}
	</div>
	<p>{work.closing} {work.stack}</p>
	<p>
		<a href={work.link.href} target="_blank" rel="noopener">{work.link.label} &rarr;</a>
		<span style="opacity: 0.5;">(opens in a new tab)</span>
	</p>
</div>
