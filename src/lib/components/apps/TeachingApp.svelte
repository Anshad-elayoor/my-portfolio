<script>
	import { teaching } from '$lib/content.js';
</script>

<div class="app-content">
	<h2>Teaching &amp; talks</h2>
	<p>I enjoy working with students and professionals, and teaching is a regular part of my work.</p>
	{#each teaching as t}
		<div class="row">
			<div class="row-h">
				<strong>{t.what}</strong>
				<span class="status">{t.when}</span>
			</div>
			<p>{t.where}</p>
		</div>
	{/each}
</div>
