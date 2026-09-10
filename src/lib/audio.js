// Synthesized two-note unlock chime — no external audio file needed.
// Triggered only from a user's own click/gesture, so browser autoplay restrictions don't apply.
export function chime() {
	try {
		const Ctx = window.AudioContext || window.webkitAudioContext;
		const ctx = new Ctx();
		[523.25, 783.99].forEach((freq, i) => {
			const o = ctx.createOscillator();
			const g = ctx.createGain();
			o.type = 'sine';
			o.frequency.value = freq;
			const t0 = ctx.currentTime + i * 0.11;
			g.gain.setValueAtTime(0, t0);
			g.gain.linearRampToValueAtTime(0.18, t0 + 0.02);
			g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.35);
			o.connect(g);
			g.connect(ctx.destination);
			o.start(t0);
			o.stop(t0 + 0.4);
		});
	} catch (e) {
		// Web Audio unavailable — unlocking still works, just silently.
	}
}
