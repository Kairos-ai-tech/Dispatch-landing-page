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

`SITE_URL` sets the absolute URLs used in canonical, hreflang, sitemap and robots. Default is the GitHub Pages project URL.

## Deploy on GitHub Pages

Repo Settings → Pages → Source: **GitHub Actions**. Every push to `main` runs `.github/workflows/pages.yml`,
builds with the Pages `base_url` as `SITE_URL`, and publishes `dist/`.

## robots.txt and sitemap on a project page

Crawlers read `robots.txt` only at the host root. On `https://<org>.github.io/<repo>/` the generated
`/<repo>/robots.txt` is ignored, including its `Sitemap:` line. It takes effect on a custom domain (add a `CNAME`
file to the repo root, copy it in `build.mjs`, and set the domain in Pages settings), or by putting the same
file in the `<org>.github.io` repo. Submit `sitemap.txt` in Google Search Console and Bing Webmaster Tools either way.

## Editing copy

Change the English text in `index.html`, then update that key in `translations.json`. A key missing from
`translations.json` falls back to English.

## Competitor data

The comparison table uses each vendor's public pricing page, checked October 2026. Re-check before each release.
