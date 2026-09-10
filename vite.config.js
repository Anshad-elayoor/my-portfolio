import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Served from https://anshad-elayoor.github.io/my-portfolio/ (a GitHub project page),
// so every asset/link needs this prefix in production; local dev stays at the root.
const base = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// GitHub Pages has no server-side routing, so any unmatched path (a typo,
			// an old bookmark) falls back to this file — GH Pages serves 404.html
			// automatically for unknown paths, and it's just this same single-page app.
			adapter: adapter({ fallback: '404.html' }),
			paths: { base }
		})
	]
});
