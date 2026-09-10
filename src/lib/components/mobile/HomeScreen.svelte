<script>
	import { sections } from '$lib/content.js';
	import { ui } from '$lib/stores.svelte.js';
	import AppIcon from '../shared/AppIcon.svelte';
	import StatusClock from '../shared/StatusClock.svelte';

	const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const now = new Date();

	function open(id, e) {
		const r = e.currentTarget.getBoundingClientRect();
		ui.openOrigin = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
		ui.openApp = id;
	}
</script>

<div class="widget">
	<div class="widget-time"><StatusClock variant="time" /></div>
	<div class="widget-date">{DAYS[now.getDay()]}, {now.getDate()} {MONTHS[now.getMonth()]}</div>
</div>

<div class="home-grid">
	{#each sections as s}
		<button class="micon" onclick={(e) => open(s.id, e)}>
			<AppIcon icon={s.icon} badgeClass="badge-{s.id}" size={58} />
			<span>{s.label}</span>
		</button>
	{/each}
</div>

<style>
	.widget {
		text-align: center;
		padding: 6px 0 26px;
		flex: none;
	}
	.widget-time :global(.time-only) {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 48px;
		letter-spacing: -0.02em;
		color: var(--ink);
	}
	.widget-date {
		font-size: 13px;
		color: var(--sub);
		margin-top: 4px;
	}

	.home-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 22px 8px;
		padding: 0 18px;
		flex: 1;
		align-content: start;
		width: 100%;
		max-width: 440px;
		margin: 0 auto;
	}
	.micon {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 7px;
		background: none;
		border: none;
		color: var(--ink);
		cursor: pointer;
		padding: 4px;
	}
	.micon:active {
		transform: scale(0.93);
	}
	.micon:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
		border-radius: 10px;
	}
	.micon span {
		font-size: 11.5px;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
	}
</style>
