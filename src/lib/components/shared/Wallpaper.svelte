<!-- Shared OS wallpaper — the same backdrop behind the desktop, mobile home screen,
     and lock screen. Pass `image` for a photo wallpaper (lock screen, and now the
     desktop/mobile home screens); omit it for the gradient mesh fallback, which
     tiles cleanly at any viewport and gives the glass panels real color to
     refract — the faint circuit trace is a small nod to the owner's field rather
     than a generic blob wallpaper. -->
<script>
	/** @type {{ image?: string }} */
	let { image = '' } = $props();
</script>

<div class="wallpaper" aria-hidden="true">
	{#if image}
		<div class="photo" style="background-image: url('{image}')"></div>
		<div class="scrim"></div>
	{:else}
		<div class="mesh"></div>
		<svg class="traces" width="100%" height="100%" preserveAspectRatio="none">
			<defs>
				<pattern id="pcb" width="140" height="140" patternUnits="userSpaceOnUse">
					<path
						d="M0 40H40V90H100V140 M140 30H90V0 M60 140V110H140 M0 100H20V60H70"
						fill="none"
						stroke="currentColor"
						stroke-width="1"
					/>
					<circle cx="40" cy="40" r="2.4" fill="currentColor" />
					<circle cx="100" cy="90" r="2.4" fill="currentColor" />
					<circle cx="90" cy="30" r="2.4" fill="currentColor" />
					<circle cx="60" cy="110" r="2.4" fill="currentColor" />
					<circle cx="20" cy="60" r="2.4" fill="currentColor" />
				</pattern>
				<radialGradient id="pcb-fade" cx="70%" cy="22%" r="65%">
					<stop offset="0%" stop-color="#fff" stop-opacity="0.55" />
					<stop offset="70%" stop-color="#fff" stop-opacity="0.12" />
					<stop offset="100%" stop-color="#fff" stop-opacity="0" />
				</radialGradient>
				<mask id="pcb-mask">
					<rect width="100%" height="100%" fill="url(#pcb-fade)" />
				</mask>
			</defs>
			<rect width="100%" height="100%" fill="url(#pcb)" mask="url(#pcb-mask)" />
		</svg>
	{/if}
	<div class="grain"></div>
</div>

<style>
	.wallpaper {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background: linear-gradient(175deg, #0d1216 0%, #0a0d10 58%, #080b0d 100%);
	}
	.photo {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center 18%;
	}
	.scrim {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(to bottom, rgba(5, 6, 8, 0.15) 0%, rgba(5, 6, 8, 0.35) 55%, rgba(4, 5, 6, 0.72) 100%),
			radial-gradient(120% 70% at 50% 8%, rgba(0, 0, 0, 0.35), transparent 60%);
	}
	.mesh {
		position: absolute;
		inset: -10%;
		background:
			radial-gradient(38% 32% at 78% 14%, rgba(75, 232, 206, 0.32), transparent 70%),
			radial-gradient(30% 26% at 8% 18%, rgba(139, 124, 246, 0.24), transparent 72%),
			radial-gradient(34% 30% at 20% 82%, rgba(245, 165, 36, 0.2), transparent 70%),
			radial-gradient(26% 24% at 88% 78%, rgba(255, 111, 165, 0.18), transparent 70%),
			radial-gradient(45% 40% at 50% 46%, rgba(77, 140, 255, 0.1), transparent 75%);
		filter: blur(6px);
	}
	.traces {
		position: absolute;
		inset: 0;
		color: var(--accent);
		opacity: 0.16;
	}
	.grain {
		position: absolute;
		inset: 0;
		opacity: 0.05;
		mix-blend-mode: overlay;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
	}
</style>
