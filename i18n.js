(() => {
  const root = document.documentElement;
  const select = document.getElementById("lang");
  const base = root.dataset.root || "";
  const PATH = { en: "", "zh-TW": "zh-tw/", es: "es/", ja: "ja/", ko: "ko/" };
  const here = root.lang;

  const match = (code) => {
    const c = (code || "").toLowerCase();
    if (c.startsWith("zh")) return "zh-TW";
    if (c.startsWith("es")) return "es";
    if (c.startsWith("ja")) return "ja";
    if (c.startsWith("ko")) return "ko";
    if (c.startsWith("en")) return "en";
    return null;
  };

  const go = (lang) => location.assign(base + PATH[lang] + location.hash);

  if (select) {
    select.value = here;
    select.addEventListener("change", () => {
      try { localStorage.setItem("lang", select.value); } catch (e) { void e; }
      go(select.value);
    });
  }

  if (here !== "en") return;
  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) { saved = null; }
  const q = new URLSearchParams(location.search).get("lang");
  const wanted = [q, saved].concat(navigator.languages || [navigator.language]).map(match).find(Boolean);
  if (wanted && wanted !== "en") location.replace(base + PATH[wanted] + location.hash);
})();
