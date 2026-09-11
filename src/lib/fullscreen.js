// Thin cross-browser wrapper around the Fullscreen API. requestFullscreen() only
// succeeds when called from within a real user-gesture handler (click/keyup/pointerup),
// so callers must invoke enterFullscreen() directly from one — never from onMount.

function fsElement() {
	return document.fullscreenElement || document.webkitFullscreenElement || null;
}

// requestFullscreen()/exitFullscreen() can reject *or* throw synchronously (disabled
// permissions policy, no transient activation, unsupported browser) — callers here
// must never be interrupted by a fullscreen request that didn't pan out.
export function enterFullscreen(el = document.documentElement) {
	if (fsElement()) return;
	try {
		const req = el.requestFullscreen || el.webkitRequestFullscreen;
		req?.call(el)?.catch?.(() => {});
	} catch {
		// Fullscreen is a nice-to-have here, not a requirement for the site to work.
	}
}

export function exitFullscreen() {
	if (!fsElement()) return;
	try {
		const exit = document.exitFullscreen || document.webkitExitFullscreen;
		exit?.call(document)?.catch?.(() => {});
	} catch {
		// Same as above.
	}
}

export function toggleFullscreen() {
	if (fsElement()) {
		exitFullscreen();
	} else {
		enterFullscreen();
	}
}
