<script>
	import { ui, closeAllWindows, focusWindow, minimizeWindow, frontmostWindowId } from '$lib/stores.svelte.js';
	import { sections } from '$lib/content.js';
	import { ICONS } from '$lib/icons.js';
	import { toggleFullscreen } from '$lib/fullscreen.js';
	import StatusClock from '../shared/StatusClock.svelte';

	function relock() {
		ui.locked = true;
		closeAllWindows();
	}

	function toggleApp(id) {
		if (frontmostWindowId() === id) {
			minimizeWindow(id);
		} else {
			focusWindow(id);
		}
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

	{#if ui.desktopWindows.length}
		<div class="tb-apps" role="toolbar" aria-label="Open windows">
			{#each ui.desktopWindows as w (w.id)}
				{@const section = sections.find((s) => s.id === w.id)}
				<button
					class="tb-app"
					class:active={frontmostWindowId() === w.id}
					class:minimized={w.minimized}
					onclick={() => toggleApp(w.id)}
					aria-label="{section?.title ?? w.id} — {w.minimized ? 'minimized' : 'open'}"
					title={section?.title ?? w.id}
				>
					<svg viewBox="0 0 24 24">{@html ICONS[section?.icon]}</svg>
					<span>{section?.label ?? w.id}</span>
				</button>
			{/each}
		</div>
	{/if}

	<div class="tb-spacer"></div>
	<button
		class="tb-icon"
		onclick={toggleFullscreen}
		aria-label={ui.fullscreen ? 'Exit full screen' : 'Enter full screen'}
		title={ui.fullscreen ? 'Exit full screen' : 'Enter full screen'}
	>
		{#if ui.fullscreen}
			<svg viewBox="0 0 24 24" style="fill: currentColor; stroke: none;">
				<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
			</svg>
		{:else}
			<svg viewBox="0 0 24 24" style="fill: currentColor; stroke: none;">
				<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
			</svg>
		{/if}
	</button>
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
		background: linear-gradient(180deg, rgba(20, 26, 30, 0.55), rgba(12, 16, 19, 0.68));
		border-top: 1px solid rgba(255, 255, 255, 0.14);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(26px) saturate(1.7);
		-webkit-backdrop-filter: blur(26px) saturate(1.7);
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
	.tb-apps {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.tb-app {
		display: flex;
		align-items: center;
		gap: 6px;
		height: 32px;
		padding: 0 10px;
		border-radius: 7px;
		border: none;
		background: transparent;
		color: var(--sub);
		font-family: var(--font-body);
		font-size: 12px;
		cursor: pointer;
		position: relative;
		transition:
			background 0.12s,
			color 0.12s;
	}
	.tb-app svg {
		width: 14px;
		height: 14px;
		stroke: currentColor;
		fill: none;
		stroke-width: 1.8;
		flex: none;
	}
	.tb-app span {
		max-width: 90px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.tb-app:hover {
		background: rgba(255, 255, 255, 0.07);
		color: var(--ink);
	}
	.tb-app::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 1px;
		transform: translateX(-50%);
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--accent);
		opacity: 0;
	}
	.tb-app.active {
		color: var(--ink);
		background: rgba(255, 255, 255, 0.09);
	}
	.tb-app.active::after {
		opacity: 1;
	}
	.tb-app.minimized {
		color: var(--faint);
	}
	.tb-app:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
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
