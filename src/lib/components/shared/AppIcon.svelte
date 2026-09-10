<script>
	import { ICONS, DOCK_ICONS } from '$lib/icons.js';

	/** @type {{ icon: string, badgeClass: string, size?: number, dock?: boolean }} */
	let { icon, badgeClass, size = 52, dock = false } = $props();

	const glyph = $derived((dock ? DOCK_ICONS : ICONS)[icon] ?? '');
</script>

<span class="badge {badgeClass}" style="--size: {size}px;">
	<svg viewBox="0 0 24 24">{@html glyph}</svg>
</span>

<style>
	.badge {
		width: var(--size);
		height: var(--size);
		border-radius: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex: none;
		box-shadow:
			0 10px 20px -8px var(--sh, rgba(0, 0, 0, 0.5)),
			0 2px 5px rgba(0, 0, 0, 0.35),
			inset 0 1px 0 rgba(255, 255, 255, 0.28),
			inset 0 -6px 10px -4px rgba(0, 0, 0, 0.18);
	}
	.badge::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.22), transparent 45%);
		pointer-events: none;
	}
	.badge svg {
		width: calc(var(--size) * 0.46);
		height: calc(var(--size) * 0.46);
		stroke: #fff;
		fill: none;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		position: relative;
		z-index: 1;
		filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.25));
	}
</style>
