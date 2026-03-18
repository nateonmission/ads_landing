# ADS Landing Page

Static landing page for **Allen Data Services / Home I.T. Concierge** — a dual-mode site that presents two distinct service offerings from the same person under one URL.

## Overview

The page uses a **Residential / Business mode toggle** to switch between:

- **Home I.T. Concierge** — on-site home tech support serving Mobile & Baldwin Counties, AL (green terminal theme)
- **Allen Data Services** — Python backend development, ETL pipelines, LLM integration, and AWS consulting (amber 1980s-display theme)

Toggling the mode swaps all content sections, applies a CSS class (`biz-mode`) to `<html>` that re-maps the full color palette via custom properties, and persists the selection in `sessionStorage`.

## File Structure

```
landing_page/
├── index.html      # Single-page markup; all sections present, mode classes control visibility
├── style.css       # All styles; CSS custom properties drive both color themes
├── app.js          # All interactivity: mode toggle, scroll effects, fade-in, nav highlight
├── robots.txt      # SEO directives
└── archive/        # Previous versions of index, style, and app files
```

## Features

- **Dual-mode UI** — single HTML file, two full identities, zero page reloads
- **Amber business theme** — `html.biz-mode` overrides all `--accent` / `--accent2` / surface variables to an 1980s amber-display palette
- **Scroll fade-in** — `IntersectionObserver`-driven staggered reveal on cards, list items, and cert badges
- **Terminal typewriter** — `.why-terminal` lines animate in sequentially on scroll
- **Active nav highlight** — current section tracked on scroll
- **Smooth anchor scrolling** — offset-corrected for the fixed nav bar
- **Session persistence** — mode choice survives same-tab navigation via `sessionStorage`

## Development

No build step. Open `index.html` directly in a browser or serve from any static host.

```bash
# Serve locally with Python
python -m http.server 8000
```

```bash
# Or with Node
npx serve .
```

## Deployment

Drop the three files (`index.html`, `style.css`, `app.js`) plus `robots.txt` onto any static host (Netlify, S3, GitHub Pages, etc.). No dependencies, no framework, no bundler required.

## Author

Nathan Allen — [allendataservices.com](https://www.allendataservices.com)
