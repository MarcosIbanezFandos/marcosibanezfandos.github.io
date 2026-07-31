# marcosibanezfandos.github.io

Personal site of **Marcos Ibáñez** — Telecommunications Engineer working where
technology meets business: transaction pricing, data and applied AI.

**Live:** https://marcosibanezfandos.github.io

## What it is

A bilingual (EN/ES), light/dark portfolio built as a single-page React app. Each
section carries its own motion design, and every employer gets bespoke artwork
drawn in SVG — BMW's M stripes with a sweeping tachometer, a ceramic tile mosaic
for Pamesa, an animated ETL pipeline for ETRA — plus live miniatures of what each
project actually does.

Motion is deliberate, not decorative: everything animates only while on screen,
nothing shifts layout, and the whole thing collapses to a static page for anyone
browsing with `prefers-reduced-motion`.

## Stack

React 18 · Vite · Tailwind CSS · Framer Motion · lucide-react

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the built site
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages. The repository's Pages source must be set
to **GitHub Actions**.

Static documents (résumé and papers) live in `public/` and keep their original
URLs, so existing links stay valid.

## Structure

```
index.html              # app shell
src/
  App.jsx               # layout, sections, navigation
  content.js            # all copy, EN + ES (single source of truth)
  components/UI.jsx     # reveals, cards, background, scroll progress
  components/Art.jsx    # per-company and per-project SVG animations
public/                 # résumé + publications (PDF)
```
