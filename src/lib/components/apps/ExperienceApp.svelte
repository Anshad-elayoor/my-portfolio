<script>
	import { experience, education } from '$lib/content.js';
</script>

<div class="app-content">
	<h2>Experience</h2>
	{#each experience as e}
		<div class="tl">
			<div class="dotm"></div>
			<div>
				<span class="when">{e.when}</span>
				<b>{e.role}</b>
				{#if e.where}<p style="margin: 2px 0 0; color: var(--sub); font-size: 12.5px;">{e.where}</p>{/if}
				{#if e.body}<p>{e.body}</p>{/if}
			</div>
		</div>
	{/each}

	<h2 style="margin-top: 32px;">Education</h2>
	{#each education as e}
		<div class="tl">
			<div class="dotm"></div>
			<div>
				<span class="when">{e.when}</span>
				<b>{e.role} — {e.where}</b>
				<p>{e.body}</p>
			</div>
		</div>
	{/each}
</div>
