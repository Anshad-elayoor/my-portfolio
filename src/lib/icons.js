// Inline SVG glyph paths (viewBox 0 0 24 24), shared by desktop and mobile icon badges.
// Each glyph is modeled on a real iOS/macOS app icon (or, for the dock, the actual
// brand mark) rather than a generic pictogram, so badges read as recognizable
// applications at a glance. Colors are mostly hardcoded per-glyph (not currentColor)
// because the real icons they mimic are multi-tone, not a flat white mark on a tint.
export const ICONS = {
	// About -> Contacts app: dark bust on a warm card.
	user: '<circle cx="12" cy="9.3" r="4" fill="#4a3826"/><path d="M4 20.4c.9-5 4.3-7.9 8-7.9s7.1 2.9 8 7.9a1 1 0 0 1-1 1.2H5a1 1 0 0 1-1-1.2Z" fill="#4a3826"/>',
	// Work -> Safari app: red/white compass needle on a globe.
	compass: '<circle cx="12" cy="12" r="9.6" fill="none" stroke="#fff" stroke-width="1.6" opacity=".9"/><path d="M15.6 8.4 13 13l-4.6 2.6L11 11l4.6-2.6Z" fill="#fff"/><path d="M15.6 8.4 13 13l-2-2 4.6-2.6Z" fill="#ff3b30"/><circle cx="12" cy="12" r="1.3" fill="#fff"/>',
	// Projects -> isometric cube, like a CAD/3D-modeling app icon.
	cube: '<path d="M12 2.4 20.5 7v10L12 21.6 3.5 17V7L12 2.4Z" opacity=".28"/><path d="M12 2.4 20.5 7 12 11.6 3.5 7 12 2.4Z"/><path d="M3.5 7 12 11.6v10L3.5 17V7Z" opacity=".6"/><path d="M20.5 7v10L12 21.6v-10L20.5 7Z" opacity=".82"/>',
	// Experience -> Calendar app: red banner + bold date over a white face.
	calendar: '<rect x="3" y="3" width="18" height="18" rx="4" fill="#fff"/><path d="M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2H3Z" fill="#fc3d39"/><text x="12" y="18.5" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="10" font-weight="700" fill="#1c1c1e">17</text>',
	// Research -> Notes app: ruled yellow legal pad with a folded corner.
	doc: '<path d="M5.5 2.6h9.2L19.5 8v13.4H5.5Z" fill="#3a3020" opacity=".08"/><path d="M5.5 2.6h9.2L19.5 8v13.4H5.5Z" fill="none"/><path d="M14.7 2.6 19.5 8h-4.8Z" fill="#3a3020" opacity=".18"/><rect x="7.6" y="11.4" width="9.4" height="1.7" rx=".85" fill="#3a3020" opacity=".55"/><rect x="7.6" y="15" width="9.4" height="1.7" rx=".85" fill="#3a3020" opacity=".55"/><rect x="7.6" y="18.6" width="6" height="1.7" rx=".85" fill="#3a3020" opacity=".55"/>',
	// Teaching -> Slides/Keynote-style board: white screen with an orange growth chart.
	board: '<rect x="2.3" y="3.6" width="19.4" height="13.6" rx="2.4" fill="#fff"/><path d="M5.4 14.2 9 10l3 2.6 4-4.8 2.6 2.4" stroke="#ff9f0a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M9 20.4h6M12 17.2v3.2" stroke="#128a3e" stroke-width="2" stroke-linecap="round" fill="none"/>',
	// Skills -> Settings app: white gear on a graphite disc.
	gear: '<path fill="#fff" d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.3 7.3 0 0 0-1.62-.94L14.4 2.81a.49.49 0 0 0-.48-.41h-3.84a.49.49 0 0 0-.47.41L9.25 5.35c-.59.24-1.13.56-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87a.49.49 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61Z"/><circle cx="12" cy="12" r="3.6" fill="#5b6067"/>',
	// Elmentrix -> Shortcuts-style swirl mark.
	spark: '<path d="M12 1.5c.7 4.2 2 6.9 4 8.9s4.7 3.3 8.9 4c-4.2.7-6.9 2-8.9 4s-3.3 4.7-4 8.9c-.7-4.2-2-6.9-4-8.9s-4.7-3.3-8.9-4c4.2-.7 6.9-2 8.9-4s3.3-4.7 4-8.9Z"/>',
	// Gallery -> Photos app: six-petal color wheel on a white disc.
	pinwheel: '<circle cx="12" cy="6.6" r="3.1" fill="#ffd60a"/><circle cx="16.8" cy="9.3" r="3.1" fill="#ff9500"/><circle cx="16.8" cy="14.7" r="3.1" fill="#ff3b30"/><circle cx="12" cy="17.4" r="3.1" fill="#af52de"/><circle cx="7.2" cy="14.7" r="3.1" fill="#007aff"/><circle cx="7.2" cy="9.3" r="3.1" fill="#34c759"/>',
	// Contact -> Phone app: classic white handset.
	phone: '<path fill="#fff" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"/>'
};

export const DOCK_ICONS = {
	// Real Apple Mail icon: white envelope with a subtle fold line, on Mail's own blue.
	email: '<rect x="2.6" y="5.3" width="18.8" height="13.4" rx="2.6" fill="#fff"/><path d="M2.9 6.4 12 13.1l9.1-6.7" stroke="#0a6fe0" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
	// Real LinkedIn mark: solid brand blue with the white lowercase "in".
	li: '<rect x="6.4" y="9.6" width="2.9" height="8.4" fill="#fff"/><circle cx="7.85" cy="6.3" r="1.75" fill="#fff"/><path d="M11.8 9.6h2.8v1.4c.6-.9 1.6-1.6 3.2-1.6 2.5 0 3.6 1.6 3.6 4.4V18h-2.9v-3.8c0-1.3-.5-2.1-1.6-2.1-1.2 0-1.8.8-1.8 2.1V18h-2.9V9.6Z" fill="#fff"/>',
	// Real Octocat mark, white on near-black.
	gh: '<path d="M12 1.6a10.6 10.6 0 0 0-3.4 20.6c.5.1.7-.2.7-.5v-1.9c-3 .6-3.6-1.3-3.6-1.3-.5-1.2-1.1-1.6-1.1-1.6-1-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.4-.3-5-1.2-5-5.3 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10 10 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.1-2.6 5-5 5.3.4.4.8 1.1.8 2.3v3.3c0 .3.2.6.7.5A10.6 10.6 0 0 0 12 1.6Z" fill="#fff"/>',
	// Real Instagram glyph: camera ring + lens + viewfinder dot, white on the brand gradient.
	ig: '<rect x="2.5" y="2.5" width="19" height="19" rx="6" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="12" cy="12" r="4.6" fill="none" stroke="#fff" stroke-width="1.9"/><circle cx="17.35" cy="6.65" r="1.15" fill="#fff"/>'
};
