// INVTI site: language switch (KO/EN) + full-screen mobile menu
(function () {
  var KEY = "invti-lang";
  var root = document.documentElement;

  function setLang(lang, save) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    var title = root.getAttribute("data-title-" + lang);
    if (title) document.title = title;
    document.querySelectorAll(".lang-code").forEach(function (el) {
      el.textContent = lang.toUpperCase();
    });
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === lang));
    });
    if (save) {
      try { localStorage.setItem(KEY, lang); } catch (e) {}
    }
  }

  setLang(root.getAttribute("data-lang") || "ko", false);

  document.querySelectorAll(".lang-pill").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(root.getAttribute("data-lang") === "ko" ? "en" : "ko", true);
    });
  });
  document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-set-lang"), true);
    });
  });

  var menu = document.getElementById("mobile-menu");
  var openBtn = document.querySelector(".menu-btn");
  if (menu && openBtn) {
    var closeBtn = menu.querySelector(".mm-close");
    function open() {
      menu.classList.add("open");
      document.body.classList.add("menu-open");
      openBtn.setAttribute("aria-expanded", "true");
      closeBtn.focus();
    }
    function close() {
      menu.classList.remove("open");
      document.body.classList.remove("menu-open");
      openBtn.setAttribute("aria-expanded", "false");
      openBtn.focus();
    }
    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) close();
    });
  }
})();
