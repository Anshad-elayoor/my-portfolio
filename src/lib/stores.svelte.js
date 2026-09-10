import { browser } from '$app/environment';

let mobile = $state(false);
let openApp = $state(/** @type {string | null} */ (null));
let locked = $state(true);
let reducedMotion = $state(false);
let searchQuery = $state('');
let openOrigin = $state(/** @type {{ x: number, y: number } | null} */ (null));

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
	}
};
