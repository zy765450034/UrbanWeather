(() => {
  const root = document.documentElement;
  const buttons = document.querySelectorAll("[data-language]");
  const preferred = localStorage.getItem("tianqi-language");
  const initial = preferred || (navigator.language.toLowerCase().startsWith("zh") ? "zh-CN" : "en");

  function setLanguage(language) {
    const next = language === "zh-CN" ? "zh-CN" : "en";
    root.dataset.language = next;
    root.lang = next;
    localStorage.setItem("tianqi-language", next);
    buttons.forEach((button) => {
      const selected = button.dataset.language === next;
      button.setAttribute("aria-pressed", String(selected));
    });
    const title = document.querySelector(`[data-title-${next === "zh-CN" ? "zh" : "en"}]`);
    if (title) document.title = title.dataset[next === "zh-CN" ? "titleZh" : "titleEn"];
  }

  buttons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.language)));
  setLanguage(initial);

  document.querySelectorAll(".brand-mark").forEach((mark) => {
    const icon = new Image();
    icon.alt = "";
    icon.addEventListener("load", () => mark.prepend(icon));
    icon.src = "assets/icon.png";
  });

  document.querySelectorAll("[data-src]").forEach((frame) => {
    const image = new Image();
    image.alt = frame.dataset.alt || "";
    image.decoding = "async";
    image.loading = "lazy";
    image.addEventListener("load", () => {
      frame.classList.add("has-image");
      frame.prepend(image);
    });
    image.src = frame.dataset.src;
  });
})();
