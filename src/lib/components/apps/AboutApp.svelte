<script>
	import { base } from '$app/paths';
	import { about, person } from '$lib/content.js';
</script>

<div class="app-content">
	<div class="about-header">
		<img class="about-portrait" src="{base}/profile.jpg" alt={person.name} />
		<div>
			<h2>{person.name}</h2>
			<div class="about-role">{person.role}</div>
		</div>
	</div>
	{#each about.paragraphs as para}
		<p>{para}</p>
	{/each}
</div>

<style>
	.about-header {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 18px;
	}
	.about-header h2 {
		margin: 0 0 2px;
	}
	.about-portrait {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		object-fit: cover;
		flex: none;
		border: 2px solid rgba(255, 255, 255, 0.14);
		box-shadow: 0 10px 22px -10px rgba(0, 0, 0, 0.6);
	}
	.about-role {
		font-size: 13px;
		color: var(--sub);
	}
</style>
