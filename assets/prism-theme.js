(function () {
  const prismLink = document.getElementById("prism-theme");
  if (!prismLink) return;

  const PRISM_LIGHT = "https://cdn.jsdelivr.net/npm/prismjs/themes/prism.css";
  const PRISM_DARK = "https://cdn.jsdelivr.net/npm/prismjs/themes/prism-okaidia.css";

  function apply(theme) {
    prismLink.href = theme === "dark" ? PRISM_DARK : PRISM_LIGHT;
  }

  window.addEventListener("docsify-theme-change", (e) => apply(e.detail.theme));

  // initial
  const initial = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  apply(initial);
})();
