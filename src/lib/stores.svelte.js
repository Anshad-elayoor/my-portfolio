import { browser } from '$app/environment';

let mobile = $state(false);
let openApp = $state(/** @type {string | null} */ (null));
let locked = $state(true);
let reducedMotion = $state(false);
let searchQuery = $state('');
let fullscreen = $state(false);
let openOrigin = $state(/** @type {{ x: number, y: number } | null} */ (null));

// Desktop multi-window state. Mobile deliberately keeps the simpler single-`openApp`
// model above — real phone OSes don't overlap home-screen apps either, so there's
// nothing to port; this array only drives the desktop window layer.
/** @typedef {{ id: string, x: number, y: number, z: number, minimized: boolean, maximized: boolean }} DesktopWindow */
let desktopWindows = $state(/** @type {DesktopWindow[]} */ ([]));
let zCounter = 10;

function frontZ() {
	zCounter += 1;
	return zCounter;
}

/** Open an app's window, or bring it to front (and unminimize it) if already open. */
export function openWindow(id) {
	const existing = desktopWindows.find((w) => w.id === id);
	if (existing) {
		existing.minimized = false;
		existing.z = frontZ();
		return;
	}
	const n = desktopWindows.length;
	const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
	const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
	const w = Math.min(900, vw * 0.92);
	const h = Math.min(650, vh * 0.82);
	desktopWindows.push({
		id,
		x: Math.max(24, (vw - w) / 2 + (n % 6) * 30),
		y: Math.max(24, (vh - h) / 2 + (n % 6) * 26),
		z: frontZ(),
		minimized: false,
		maximized: false
	});
}

export function closeWindow(id) {
	desktopWindows = desktopWindows.filter((w) => w.id !== id);
}

export function closeAllWindows() {
	desktopWindows = [];
}

export function minimizeWindow(id) {
	const w = desktopWindows.find((w) => w.id === id);
	if (w) w.minimized = true;
}

export function toggleMaximizeWindow(id) {
	const w = desktopWindows.find((w) => w.id === id);
	if (w) w.maximized = !w.maximized;
}

/** Bring a window to front and unminimize it (used by taskbar/dock clicks). */
export function focusWindow(id) {
	const w = desktopWindows.find((w) => w.id === id);
	if (!w) return;
	w.minimized = false;
	w.z = frontZ();
}

export function moveWindow(id, x, y) {
	const w = desktopWindows.find((w) => w.id === id);
	if (w) {
		w.x = x;
		w.y = y;
	}
}

export function frontmostWindowId() {
	const open = desktopWindows.filter((w) => !w.minimized);
	if (!open.length) return null;
	return open.reduce((a, b) => (a.z > b.z ? a : b)).id;
}

// Call once from the root layout's onMount — matchMedia only exists in the browser,
// and SSR/prerendering needs a safe default (desktop shell, motion on) until then.
export function initMedia() {
	if (!browser) return;

	const mq = window.matchMedia('(max-width: 859px)');
	mobile = mq.matches;
	mq.addEventListener('change', (e) => {
		mobile = e.matches;
	});

	const rq = window.matchMedia('(prefers-reduced-motion: reduce)');
	reducedMotion = rq.matches;
	rq.addEventListener('change', (e) => {
		reducedMotion = e.matches;
	});

	const onFsChange = () => {
		fullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
	};
	document.addEventListener('fullscreenchange', onFsChange);
	document.addEventListener('webkitfullscreenchange', onFsChange);
}

export const ui = {
	get mobile() {
		return mobile;
	},
	get openApp() {
		return openApp;
	},
	set openApp(id) {
		openApp = id;
	},
	get locked() {
		return locked;
	},
	set locked(v) {
		locked = v;
	},
	get reducedMotion() {
		return reducedMotion;
	},
	get searchQuery() {
		return searchQuery;
	},
	set searchQuery(v) {
		searchQuery = v;
	},
	get openOrigin() {
		return openOrigin;
	},
	set openOrigin(v) {
		openOrigin = v;
	},
	get desktopWindows() {
		return desktopWindows;
	},
	get fullscreen() {
		return fullscreen;
	}
};
