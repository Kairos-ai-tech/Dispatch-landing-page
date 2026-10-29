# Dispatch landing page

Static site, one dependency-free build step.

| File | Role |
|---|---|
| `index.html` | English source. `data-i18n*` attributes mark translatable text. |
| `translations.json` | `key: [zh-TW, es, ja, ko]` for every `data-i18n` key. |
| `scripts/build.mjs` | Writes `dist/`: one pre-rendered page per language (`/`, `/zh-tw/`, `/es/`, `/ja/`, `/ko/`) with canonical, hreflang and JSON-LD (`SoftwareApplication`, `FAQPage`), plus `robots.txt`, `sitemap.txt`, `llms.txt`. |
| `llms.txt` | Template for the GEO summary; `{{SITE}}` is replaced at build time. |
| `styles.css`, `hero.js`, `i18n.js` | Styles, hero canvas, language switcher. |

## Preview

    node scripts/build.mjs
    cd dist && python3 -m http.server 8765

`SITE_URL` sets the absolute URLs used in canonical, hreflang, sitemap and robots. Default is `https://dispatch.kairosaitech.com`.

## Deploy on GitHub Pages

Repo Settings → Pages → Source: **GitHub Actions**. Every push to `main` runs `.github/workflows/pages.yml`,
builds with `SITE_URL=https://dispatch.kairosaitech.com` (set in the workflow), and publishes `dist/`.

## Custom domain

The site is served at `https://dispatch.kairosaitech.com`. `CNAME` is copied into `dist/`, so the domain is served from the root and
`robots.txt` and `sitemap.txt` sit where crawlers look for them.

One-time setup:
1. DNS: `CNAME` record `dispatch` -> `kairos-ai-tech.github.io` (use the `<org>.github.io` host, not the repo URL).
2. Repo Settings -> Pages -> Custom domain: `dispatch.kairosaitech.com`, then tick **Enforce HTTPS** once the certificate is issued.
3. Submit `https://dispatch.kairosaitech.com/sitemap.txt` in Google Search Console and Bing Webmaster Tools.

## Editing copy

Change the English text in `index.html`, then update that key in `translations.json`. A key missing from
`translations.json` falls back to English.

## Competitor data

The comparison table uses each vendor's public pricing page, checked October 2026. Re-check before each release.
