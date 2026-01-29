(function () {
  function getTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function mermaidThemeConfig(theme) {
    if (theme === "dark") {
      return {
        theme: "dark",
        securityLevel: "loose"
      };
    }

    return {
      theme: "default",
      securityLevel: "loose"
    };
  }

  async function renderMermaid() {
    const mermaid = window.mermaid;
    if (!mermaid) return;

    const theme = getTheme();
    const cfg = mermaidThemeConfig(theme);

    // Mermaid site-wide config
    mermaid.initialize({
      startOnLoad: false,
      ...cfg
    });

    // Re-run rendering on existing blocks
    const nodes = document.querySelectorAll(".mermaid");
    if (!nodes.length) return;

    try {
      // Mermaid v10+ provides mermaid.run with Promise behavior
      await mermaid.run({ nodes: Array.from(nodes) });
    } catch (err) {
      // Avoid breaking docs rendering if Mermaid errors on one diagram
      console.error("Mermaid render failed:", err);
    }
  }

  // Re-render after Docsify finishes each page
  window.$docsify = window.$docsify || {};
  const prevPlugins = window.$docsify.plugins || [];
  window.$docsify.plugins = [].concat(prevPlugins, function (hook) {
    hook.doneEach(function () {
      // let DOM settle
      setTimeout(renderMermaid, 0);
    });
  });

  // Re-render on explicit theme changes
  window.addEventListener("docsify-theme-change", () => {
    // ensure CSS applied first
    setTimeout(renderMermaid, 0);
  });
})();
