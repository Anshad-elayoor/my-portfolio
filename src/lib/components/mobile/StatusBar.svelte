<script>
	import StatusClock from '../shared/StatusClock.svelte';
</script>

<div class="status-bar">
	<StatusClock variant="time" />
	<div class="glyphs" aria-hidden="true">
		<svg viewBox="0 0 20 12" class="signal"><rect x="0" y="7" width="3" height="5" rx="0.5" /><rect x="5.5" y="5" width="3" height="7" rx="0.5" /><rect x="11" y="3" width="3" height="9" rx="0.5" /><rect x="16.5" y="0" width="3" height="12" rx="0.5" /></svg>
		<svg viewBox="0 0 20 15" class="wifi"><path d="M1 5.5a14 14 0 0 1 18 0M4 9a9 9 0 0 1 12 0M7.3 12.4a4.2 4.2 0 0 1 5.4 0" /><circle cx="10" cy="14.2" r="1" fill="currentColor" stroke="none" /></svg>
		<svg viewBox="0 0 26 13" class="battery"><rect x="0.5" y="0.5" width="21" height="12" rx="2.5" /><rect x="23" y="4" width="2" height="5" rx="1" fill="currentColor" stroke="none" /><rect x="2" y="2" width="16" height="9" rx="1" fill="currentColor" stroke="none" /></svg>
	</div>
</div>

<style>
	.status-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 22px 6px;
		font-size: 14px;
		font-weight: 600;
		color: var(--ink);
		flex: none;
		/* Wallpaper is position:absolute, which paints after plain in-flow
		   siblings regardless of DOM order — without its own stacking
		   context this bar would render invisibly behind it. */
		position: relative;
		z-index: 1;
	}
	.glyphs {
		display: flex;
		align-items: center;
		gap: 6px;
		color: var(--ink);
	}
	.glyphs svg {
		fill: none;
		stroke: currentColor;
		stroke-width: 1;
	}
	.signal {
		width: 16px;
		height: 10px;
	}
	.signal rect {
		fill: currentColor;
		stroke: none;
	}
	.wifi {
		width: 16px;
		height: 12px;
		stroke-width: 1.4;
		stroke-linecap: round;
	}
	.battery {
		width: 22px;
		height: 11px;
	}
</style>
