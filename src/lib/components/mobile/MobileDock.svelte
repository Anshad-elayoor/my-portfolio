<script>
	import { dockLinks } from '$lib/content.js';
	import AppIcon from '../shared/AppIcon.svelte';
</script>

<div class="mdock glass">
	{#each dockLinks as link}
		<a
			href={link.href}
			target={link.id === 'email' ? undefined : '_blank'}
			rel={link.id === 'email' ? undefined : 'noopener'}
			aria-label={link.label}
		>
			<AppIcon icon={link.id} badgeClass="badge-{link.id}" size={54} dock />
			<span>{link.label}</span>
		</a>
	{/each}
</div>

<style>
	.mdock {
		flex: none;
		display: flex;
		justify-content: space-evenly;
		align-items: flex-start;
		gap: 6px;
		width: 100%;
		max-width: 360px;
		margin: 10px auto 8px;
		padding: 10px 14px;
		border-radius: 26px;
	}
	.mdock a {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		text-decoration: none;
	}
	.mdock a span {
		font-size: 10.5px;
		color: var(--ink);
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
	}
	.mdock a:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
		border-radius: 15px;
	}
</style>
