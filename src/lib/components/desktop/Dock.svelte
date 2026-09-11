<script>
	import { dockLinks } from '$lib/content.js';
	import { ui } from '$lib/stores.svelte.js';
	import AppIcon from '../shared/AppIcon.svelte';

	let dockEl = $state(/** @type {HTMLDivElement | undefined} */ (undefined));
	let transforms = $state(/** @type {Record<string, string>} */ ({}));

	function onMove(e) {
		if (ui.reducedMotion || !dockEl) return;
		const icons = dockEl.querySelectorAll('.dockicon');
		const next = {};
		icons.forEach((el) => {
			const r = el.getBoundingClientRect();
			const cx = r.left + r.width / 2;
			const dist = Math.abs(e.clientX - cx);
			const scale = 1 + Math.max(0, 1 - dist / 110) * 0.55;
			const lift = Math.max(0, 1 - dist / 110) * -8;
			next[el.dataset.id] = `translateY(${lift}px) scale(${scale})`;
		});
		transforms = next;
	}
	function onLeave() {
		transforms = {};
	}
</script>

<div class="dock-wrap">
	<!-- mousemove/mouseleave here are a purely decorative hover effect; every actual
	     control inside is a real, keyboard-focusable <a> — nothing loses accessibility -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="dock glass" bind:this={dockEl} onmousemove={onMove} onmouseleave={onLeave} role="toolbar" tabindex="-1" aria-label="Quick links">
		{#each dockLinks as link}
			<a
				class="dockicon"
				data-id={link.id}
				href={link.href}
				target={link.id === 'email' ? undefined : '_blank'}
				rel={link.id === 'email' ? undefined : 'noopener'}
				aria-label={link.label}
				style={transforms[link.id] ? `transform: ${transforms[link.id]}` : undefined}
			>
				<span class="dock-tip">{link.label}</span>
				<AppIcon icon={link.id} badgeClass="badge-{link.id}" size={48} dock />
			</a>
		{/each}
	</div>
</div>

<style>
	.dock-wrap {
		position: absolute;
		left: 50%;
		bottom: 66px;
		transform: translateX(-50%);
		z-index: 5;
	}
	.dock {
		display: flex;
		align-items: flex-end;
		gap: 9px;
		padding: 10px 12px;
		border-radius: 22px;
	}
	.dockicon {
		display: flex;
		position: relative;
		flex: none;
		transform-origin: bottom center;
		will-change: transform;
		transition: transform 0.16s var(--ease);
		text-decoration: none;
	}
	.dockicon:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
		border-radius: 13px;
	}
	.dock-tip {
		position: absolute;
		bottom: calc(100% + 14px);
		left: 50%;
		transform: translateX(-50%);
		background: #12171a;
		border: 1px solid var(--line-solid);
		color: var(--ink);
		font-size: 11.5px;
		padding: 5px 10px;
		border-radius: 6px;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.12s;
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
	}
	.dockicon:hover .dock-tip,
	.dockicon:focus-visible .dock-tip {
		opacity: 1;
	}
</style>
