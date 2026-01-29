(function () {
  const root = document.documentElement;
  const button = document.getElementById("theme-toggle");

  if (!button) return;

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function getTheme() {
    return localStorage.getItem("theme") || getSystemTheme();
  }

  function setTheme(mode) {
    if (mode === "dark") {
      root.setAttribute("data-theme", "dark");
      button.textContent = "☀";
    } else {
      root.removeAttribute("data-theme");
      button.textContent = "🌙";
    }

    localStorage.setItem("theme", mode);

    // Broadcast theme change for integrations (Mermaid, Prism, etc.)
    window.dispatchEvent(new CustomEvent("docsify-theme-change", { detail: { theme: mode } }));
  }

  button.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setTheme(current === "dark" ? "light" : "dark");
  });

  setTheme(getTheme());
})();
