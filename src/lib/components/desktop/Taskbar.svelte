<script>
	import { ui } from '$lib/stores.svelte.js';
	import StatusClock from '../shared/StatusClock.svelte';

	function relock() {
		ui.locked = true;
		ui.openApp = null;
	}
</script>

<div class="taskbar">
	<div class="tb-search">
		<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
		<input
			placeholder="Search sections…"
			autocomplete="off"
			bind:value={ui.searchQuery}
			aria-label="Search sections"
		/>
	</div>
	<div class="tb-spacer"></div>
	<button class="tb-icon" onclick={relock} aria-label="Lock screen" title="Lock screen">
		<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
	</button>
	<StatusClock variant="taskbar" />
</div>

<style>
	.taskbar {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 48px;
		z-index: 6;
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 0 16px;
		background: rgba(13, 18, 21, 0.72);
		border-top: 1px solid rgba(255, 255, 255, 0.07);
		backdrop-filter: blur(20px) saturate(1.3);
	}
	.tb-search {
		display: flex;
		align-items: center;
		gap: 8px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		padding: 0 10px;
		height: 30px;
		width: 230px;
		max-width: 38vw;
		transition: border-color 0.15s;
	}
	.tb-search:focus-within {
		border-color: var(--accent);
	}
	.tb-search svg {
		width: 14px;
		height: 14px;
		stroke: var(--sub);
		fill: none;
		stroke-width: 1.8;
		flex: none;
	}
	.tb-search input {
		background: none;
		border: none;
		outline: none;
		color: var(--ink);
		font-size: 13px;
		width: 100%;
		font-family: var(--font-body);
	}
	.tb-search input::placeholder {
		color: var(--faint);
	}
	.tb-spacer {
		flex: 1;
	}
	.tb-icon {
		width: 30px;
		height: 30px;
		border-radius: 7px;
		border: none;
		background: transparent;
		color: var(--sub);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition:
			background 0.12s,
			color 0.12s;
	}
	.tb-icon:hover {
		background: rgba(255, 255, 255, 0.07);
		color: var(--ink);
	}
	.tb-icon:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
	}
	.tb-icon svg {
		width: 16px;
		height: 16px;
		stroke: currentColor;
		fill: none;
		stroke-width: 1.8;
		stroke-linecap: round;
	}
</style>
