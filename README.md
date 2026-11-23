# Visvanathan D · Founder of Branzia

Personal site and portfolio. React 19, Vite 6, Tailwind CSS 4, styled with the Branzia brand (palette, Sora / Instrument Sans fonts, logo).

## Commands

- `npm run dev`: local preview with hot reload.
- `npm run build`: type-checks and writes the static site to `dist/`.
- `npm run lint`: ESLint.

## Editing content

All text lives in `src/data/`, so most changes need no component edits:

- `profile.json`: name, contact details, social links, hero stats.
- `work.json`: portfolio projects. `slug` is the folder in `public/work/`, `images` is how many screenshots it has (`1.webp` … `N.webp`), `kind` drives the filter (`app`, `site`, `store`), `featured` makes the card wide.
- `experience.json`: timeline, newest first.
- `skills.json`: toolkit groups. The first group is shown as the large teal card.

## Adding a project

1. Put the original screenshots in `assets-src/work/<slug>/` (`1.png`, `2.png`, …). These are kept out of the deployed site.
2. Convert them to `public/work/<slug>/N.webp` (max 1600px wide) and make a `thumb.webp` card cover (960px wide, top 4200px) from the best screen.
3. Add an entry to `src/data/work.json`.

## Structure

```
src/
  components/   Nav, Hero, Story, Work (+ Lightbox), Branzia, Experience, Principles, Toolkit, Contact, Footer
  data/         editable content (JSON)
  hooks/        useReveal: scroll-in animation
  styles/       index.css: design tokens, light/dark colours, shared classes
404.html        "Page not found", served by the host for unknown addresses
offline.html    shown by the service worker when there's no connection
public/         fonts, images, optimised screenshots, plus:
  sw.js           service worker: home page opens offline, other pages fall back to offline.html
  site.webmanifest, robots.txt, sitemap.xml
assets-src/     original full-size screenshots and photos (not deployed)
```
