# Repository Guidelines

## Project Structure & Module Organization
- Root catalog: `index.html`, `catalog.css`, `catalog.js`.
- Catalog source of truth: `reports/manifest.json` (cards, slugs, publish dates, external links).
- Public report routes: `informes/<slug>/index.html`.
- Shared report engine: `pages/app-reports.js` + per-report datasets in `pages/data-*.js`.
- Legacy Paradoja implementation: `app.js` + `data.js` (keep compatible unless migrating intentionally).
- Static/media inputs: `assets/`, `source_pdfs/`, `extracted_text/`, and `docs/`.

## Build, Test, and Development Commands
This project is static (no build pipeline).

- `python3 -m http.server 4173`  
  Run the site locally at `http://localhost:4173`.
- `node --check pages/app-reports.js`  
  Syntax-check the shared renderer.
- `node --check pages/data-*.js`  
  Syntax-check report data files after edits.
- `rg "pattern" pages/`  
  Fast code search (preferred over slower alternatives).

Useful when recreating visuals from PDFs:
- `pdftotext -layout <file.pdf> <out.txt>`
- `pdftoppm -png -r 180 <file.pdf> pages/page`

## Coding Style & Naming Conventions
- Use 2-space indentation and keep existing JS style (IIFE/object-literal configuration).
- Use ASCII unless a file already requires accents/Unicode.
- Report slugs and route folders use `kebab-case`.
- Chart IDs should remain stable and grouped by report (`i01`, `f01`, etc.).
- Preserve visual system consistency (theme colors, spacing, card/chapter layout).

## Testing Guidelines
- There is no formal unit test suite yet; validation is syntax + visual QA.
- Mandatory checks before merge:
  - No JS syntax errors.
  - No label/axis overlap in desktop or mobile.
  - Chart type and order match the original PDF (1:1 fidelity).
  - Source links and PNG export actions work.

## Commit & Pull Request Guidelines
- Follow concise, imperative commit subjects (as in history), e.g.:
  - `Improve insostenibilidad chart fidelity`
  - `fix: add slug route for paradoja-inmobiliaria`
- Keep commits scoped (renderer changes separate from dataset changes when possible).
- PRs should include:
  - Summary of affected report slugs.
  - Before/after screenshots for visual changes.
  - Notes on fidelity decisions (exact vs reconstructed).
  - Confirmation that local and GitHub Pages paths render correctly.
