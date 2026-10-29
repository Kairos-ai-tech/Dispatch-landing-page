import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "dist");
const SITE = (process.env.SITE_URL || "https://dispatch.kairosaitech.com").replace(/\/+$/, "");
const DEFAULT_SITE = "https://dispatch.kairosaitech.com";

const LANGS = [
  { code: "en", dir: "", locale: "en_US" },
  { code: "zh-TW", dir: "zh-tw/", locale: "zh_TW" },
  { code: "es", dir: "es/", locale: "es_ES" },
  { code: "ja", dir: "ja/", locale: "ja_JP" },
  { code: "ko", dir: "ko/", locale: "ko_KR" },
];
const FONTS = {
  "zh-TW": "Noto+Serif+TC:wght@500&family=Noto+Sans+TC:wght@400;500;600",
  ja: "Noto+Serif+JP:wght@500&family=Noto+Sans+JP:wght@400;500;600",
  ko: "Noto+Serif+KR:wght@500&family=Noto+Sans+KR:wght@400;500;600",
};
const AI_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot",
  "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "CCBot",
];

const source = fs.readFileSync(path.join(root, "index.html"), "utf8");
const dict = JSON.parse(fs.readFileSync(path.join(root, "translations.json"), "utf8"));

const escText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const strip = (s) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

const CONTENT = /<(\w+)(\s[^>]*?\bdata-i18n(-html)?="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g;
const english = {};
for (const m of source.matchAll(CONTENT)) english[m[4]] = strip(m[5]);
for (const m of source.matchAll(/<meta name="description" content="([^"]*)"/g)) english["meta.desc"] = m[1];
english["meta.title"] = source.match(/<title>([^<]*)<\/title>/)[1];
english["meta.ogdesc"] = source.match(/property="og:description" content="([^"]*)"/)[1];

function pick(key, i) {
  const v = i >= 0 && dict[key] ? dict[key][i] : undefined;
  return v ?? null;
}

const pageUrl = (l) => `${SITE}/${l.dir}`;

function jsonLd(lang, i) {
  const t = (k) => pick(k, i) ?? english[k];
  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Dispatch",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: strip(t("meta.desc")),
    url: pageUrl(lang),
    inLanguage: lang.code,
    publisher: { "@type": "Organization", name: "Kairos AI Tech" },
    offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
      {
        "@type": "Offer",
        name: "Pro",
        price: "19",
        priceCurrency: "USD",
        priceSpecification: { "@type": "UnitPriceSpecification", price: "19", priceCurrency: "USD", unitText: "MONTH" },
      },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang.code,
    mainEntity: [1, 2, 3, 4, 5, 6].map((n) => ({
      "@type": "Question",
      name: strip(t(`faq.q${n}`)),
      acceptedAnswer: { "@type": "Answer", text: strip(t(`faq.a${n}`)) },
    })),
  };
  return [app, faq].map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`).join("\n  ");
}

function render(lang) {
  const i = LANGS.findIndex((l) => l.code === lang.code) - 1;
  const prefix = lang.dir ? "../" : "";
  let html = source;

  html = html.replace(CONTENT, (full, tag, attrs, isHtml, key) => {
    const v = pick(key, i);
    if (v === null) return full;
    return `<${tag}${attrs}>${isHtml ? v : escText(v)}</${tag}>`;
  });
  html = html.replace(/<[a-z][^>]*\bdata-i18n-(alt|aria)="([^"]+)"[^>]*>/g, (tagText, kind, key) => {
    const v = pick(key, i);
    if (v === null) return tagText;
    const attr = kind === "alt" ? "alt" : "aria-label";
    return tagText.replace(new RegExp(`\\b${attr}="[^"]*"`), `${attr}="${escAttr(v)}"`);
  });

  const title = pick("meta.title", i) ?? english["meta.title"];
  const desc = pick("meta.desc", i) ?? english["meta.desc"];
  const ogdesc = pick("meta.ogdesc", i) ?? english["meta.ogdesc"];
  html = html
    .replace(/<html lang="en">/, `<html lang="${lang.code}" data-root="${prefix}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escText(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${escAttr(desc)}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${escAttr(title)}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${escAttr(ogdesc)}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${pageUrl(lang)}"`)
    .split(DEFAULT_SITE).join(SITE);

  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${l.code}" href="${pageUrl(l)}">`);
  alternates.push(`<link rel="alternate" hreflang="x-default" href="${pageUrl(LANGS[0])}">`);
  const seo = [
    `<link rel="canonical" href="${pageUrl(lang)}">`,
    ...alternates,
    `<meta property="og:locale" content="${lang.locale}">`,
    FONTS[lang.code] ? `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${FONTS[lang.code]}&display=swap">` : "",
    jsonLd(lang, i),
  ].filter(Boolean).join("\n  ");
  html = html.replace("<!--SEO-->", seo);

  if (prefix) {
    html = html
      .replace(/(href|src)="(assets\/|styles\.css|hero\.js|i18n\.js)/g, `$1="${prefix}$2`);
  }

  const ofLang = new RegExp(`(<option value="${lang.code}")`);
  html = html.replace(ofLang, "$1 selected");
  return html;
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const lang of LANGS) {
  const dir = path.join(out, lang.dir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), render(lang));
}
for (const f of ["styles.css", "hero.js", "i18n.js", ".nojekyll", "CNAME"]) fs.copyFileSync(path.join(root, f), path.join(out, f));
fs.cpSync(path.join(root, "assets"), path.join(out, "assets"), { recursive: true });

fs.writeFileSync(path.join(out, "sitemap.txt"), LANGS.map(pageUrl).join("\n") + "\n");

const robots = [
  "User-agent: *",
  "Allow: /",
  "",
  ...AI_BOTS.flatMap((b) => [`User-agent: ${b}`, "Allow: /", ""]),
  `Sitemap: ${SITE}/sitemap.txt`,
  "",
].join("\n");
fs.writeFileSync(path.join(out, "robots.txt"), robots);

const llms = fs.readFileSync(path.join(root, "llms.txt"), "utf8").split("{{SITE}}").join(SITE);
fs.writeFileSync(path.join(out, "llms.txt"), llms);

console.log(`built ${LANGS.length} pages for ${SITE} -> ${path.relative(process.cwd(), out) || "."}`);
