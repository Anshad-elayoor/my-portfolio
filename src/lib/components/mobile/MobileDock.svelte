<script>
	import { dockLinks } from '$lib/content.js';
	import AppIcon from '../shared/AppIcon.svelte';
</script>

<div class="mdock">
	{#each dockLinks as link}
		<a
			href={link.href}
			target={link.id === 'email' ? undefined : '_blank'}
			rel={link.id === 'email' ? undefined : 'noopener'}
			aria-label={link.label}
		>
			<AppIcon icon={link.id} badgeClass="badge-{link.id}" size={54} dock />
		</a>
	{/each}
</div>

<style>
	.mdock {
		flex: none;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		gap: 6px;
		width: 100%;
		max-width: 360px;
		margin: 10px auto 8px;
		padding: 10px 14px;
		background: rgba(22, 28, 32, 0.62);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 22px;
		backdrop-filter: blur(18px) saturate(1.4);
		box-shadow:
			0 18px 40px -14px rgba(0, 0, 0, 0.55),
			inset 0 1px 0 rgba(255, 255, 255, 0.07);
	}
	.mdock a {
		display: flex;
	}
	.mdock a:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
		border-radius: 15px;
	}
</style>
