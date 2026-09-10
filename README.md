# Anshad OS

Anshad K's personal portfolio — built as a desktop/mobile OS shell rather than a scrolling page. SvelteKit + `adapter-static`, deployed to GitHub Pages.

Live at: https://anshad-elayoor.github.io/my-portfolio/

## Developing

```sh
npm install
npm run dev -- --open
```

## Building

```sh
npm run build      # outputs to build/
npm run preview    # serve the production build locally
```

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it via GitHub Pages (Settings → Pages → Source → "GitHub Actions").

## Structure

- `src/lib/content.js` — every section's copy, single source of truth for both shells
- `src/lib/components/desktop/` — Windows/macOS-style shell (lock screen, desktop, dock, taskbar, windows)
- `src/lib/components/mobile/` — iOS/Android-style shell (status bar, home screen, dock, app screens)
- `src/lib/components/apps/` — shared content components used by both shells
- `legacy/` — the previous vanilla HTML/CSS/JS site, kept for reference
