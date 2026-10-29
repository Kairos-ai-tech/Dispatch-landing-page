# Dispatch landing page

Static site: `index.html`, `styles.css`, `hero.js`, `i18n.js`, `assets/`. No build step.

## Preview

    python3 -m http.server 8765

## Deploy on GitHub Pages

Repo Settings → Pages → Source: **GitHub Actions**. Every push to `main` runs `.github/workflows/pages.yml`
and publishes to `https://<user>.github.io/<repo>/`. All asset paths are relative, so project pages
and custom domains both work. For a custom domain, add a `CNAME` file and copy it in the workflow's stage step.
