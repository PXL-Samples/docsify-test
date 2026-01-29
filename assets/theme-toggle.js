const root = document.documentElement;
const button = document.getElementById("theme-toggle");

const stored = localStorage.getItem("theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const initial = stored || (systemDark ? "dark" : "light");

function applyTheme(mode) {
  if (mode === "dark") {
    root.setAttribute("data-theme", "dark");
    button.textContent = "☀";
  } else {
    root.removeAttribute("data-theme");
    button.textContent = "🌙";
  }

  localStorage.setItem("theme", mode);
}

button.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  applyTheme(current === "light" ? "dark" : "light");
});

applyTheme(initial);
