<script>
	import { ICONS, DOCK_ICONS } from '$lib/icons.js';

	/** @type {{ icon: string, badgeClass: string, size?: number, dock?: boolean }} */
	let { icon, badgeClass, size = 52, dock = false } = $props();

	const glyph = $derived((dock ? DOCK_ICONS : ICONS)[icon] ?? '');
</script>

<!-- Continuous-corner "squircle" badge (superellipse, not a plain rounded rect) so it
     reads as a real application icon rather than a generic rounded square. The shadow
     lives on the outer wrapper via filter: drop-shadow, which follows the clipped
     silhouette — a plain box-shadow would be cut off by the clip-path on .shape. -->
<span class="badge" style="--size: {size}px;">
	<span class="shape {badgeClass}">
		<svg viewBox="0 0 24 24">{@html glyph}</svg>
	</span>
</span>

<style>
	.badge {
		width: var(--size);
		height: var(--size);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex: none;
		filter:
			drop-shadow(0 10px 16px var(--sh, rgba(0, 0, 0, 0.45)))
			drop-shadow(0 2px 5px rgba(0, 0, 0, 0.35));
	}
	.shape {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		clip-path: polygon(
			100% 50%, 99.89% 67.81%, 99.57% 74.18%, 99.03% 78.86%, 98.27% 82.63%, 97.28% 85.79%,
			96.06% 88.51%, 94.59% 90.84%, 92.86% 92.86%, 90.84% 94.59%, 88.51% 96.06%, 85.79% 97.28%,
			82.63% 98.27%, 78.86% 99.03%, 74.18% 99.57%, 67.81% 99.89%, 50% 100%, 32.19% 99.89%,
			25.82% 99.57%, 21.14% 99.03%, 17.37% 98.27%, 14.21% 97.28%, 11.49% 96.06%, 9.16% 94.59%,
			7.14% 92.86%, 5.41% 90.84%, 3.94% 88.51%, 2.72% 85.79%, 1.73% 82.63%, 0.97% 78.86%,
			0.43% 74.18%, 0.11% 67.81%, 0% 50%, 0.11% 32.19%, 0.43% 25.82%, 0.97% 21.14%,
			1.73% 17.37%, 2.72% 14.21%, 3.94% 11.49%, 5.41% 9.16%, 7.14% 7.14%, 9.16% 5.41%,
			11.49% 3.94%, 14.21% 2.72%, 17.37% 1.73%, 21.14% 0.97%, 25.82% 0.43%, 32.19% 0.11%,
			50% 0%, 67.81% 0.11%, 74.18% 0.43%, 78.86% 0.97%, 82.63% 1.73%, 85.79% 2.72%,
			88.51% 3.94%, 90.84% 5.41%, 92.86% 7.14%, 94.59% 9.16%, 96.06% 11.49%, 97.28% 14.21%,
			98.27% 17.37%, 99.03% 21.14%, 99.57% 25.82%, 99.89% 32.19%
		);
		background: var(
			--badge-bg,
			linear-gradient(
				160deg,
				color-mix(in srgb, var(--tint) 92%, white 8%),
				var(--tint) 42%,
				var(--tint-2) 100%
			)
		);
		backdrop-filter: blur(14px) saturate(1.8);
		-webkit-backdrop-filter: blur(14px) saturate(1.8);
	}
	/* top specular highlight, like light glancing off a convex glossy surface */
	.shape::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background:
			radial-gradient(120% 80% at 30% 0%, rgba(255, 255, 255, 0.55), transparent 55%),
			linear-gradient(rgba(255, 255, 255, 0.16), transparent 40%);
	}
	/* bottom ambient occlusion + inner rim, sells the icon as a solid rounded object */
	.shape::after {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		box-shadow:
			inset 0 -10px 16px -6px rgba(0, 0, 0, 0.35),
			inset 0 1px 1px rgba(255, 255, 255, 0.5),
			inset 0 0 0 1px rgba(255, 255, 255, 0.14);
	}
	.badge svg {
		width: calc(var(--size) * 0.52);
		height: calc(var(--size) * 0.52);
		fill: currentColor;
		color: #fff;
		stroke: none;
		position: relative;
		z-index: 1;
		filter: drop-shadow(0 1px 1.5px rgba(0, 0, 0, 0.35));
	}
</style>
