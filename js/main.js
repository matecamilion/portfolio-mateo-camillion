/* ============================================================
   Mateo Camilión — portfolio
   Comportamiento base, sin dependencias. Las animaciones con
   GSAP viven en motion.js; si esas librerías no cargan, todo
   lo de acá sigue funcionando.
   ============================================================ */
(function () {
  "use strict";

  var t = function (key) {
    return window.I18N ? window.I18N.t(key) : key;
  };

  /* ---------- año del footer ---------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- nav: se oculta al bajar, vuelve al subir,
     y se invierte cuando pasa por encima del panel oscuro ---------- */
  var nav = document.querySelector("[data-nav]");
  var darkPanel = document.querySelector("[data-work-panel]");

  if (nav) {
    var lastY = window.scrollY;
    var ticking = false;

    var onScroll = function () {
      var y = Math.max(window.scrollY, 0);
      nav.classList.toggle("is-stuck", y > 8);

      if (y > 160 && y > lastY + 6) {
        nav.classList.add("is-hidden");
      } else if (y < lastY - 6 || y <= 160) {
        nav.classList.remove("is-hidden");
      }
      lastY = y;

      if (darkPanel) {
        var box = darkPanel.getBoundingClientRect();
        var mid = nav.offsetHeight / 2;
        nav.classList.toggle("is-dark", box.top <= mid && box.bottom >= mid);
      }
      ticking = false;
    };

    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }, { passive: true });

    // si el foco entra al nav por teclado, siempre visible
    nav.addEventListener("focusin", function () { nav.classList.remove("is-hidden"); });
    onScroll();
  }

  /* ---------- screenshots: si falta el archivo, cae al placeholder ---------- */
  document.querySelectorAll("[data-shot]").forEach(function (shot) {
    var img = shot.querySelector("img");
    if (!img) return;

    var miss = function () { shot.classList.add("is-missing"); };
    var hit = function () { shot.classList.remove("is-missing"); };

    img.addEventListener("error", miss);
    img.addEventListener("load", hit);

    // la imagen puede haber fallado antes de que corriera este script
    if (img.complete && img.naturalWidth === 0) miss();
  });

  /* ---------- copiar email ---------- */
  var copyBtn = document.querySelector("[data-copy]");
  var copyStatus = document.querySelector("[data-copy-status]");

  if (copyBtn && navigator.clipboard) {
    var resetTimer;

    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(copyBtn.getAttribute("data-copy")).then(function () {
        copyBtn.textContent = t("contact.copied");
        copyBtn.classList.add("is-done");
        if (copyStatus) copyStatus.textContent = t("contact.copiedStatus");

        clearTimeout(resetTimer);
        resetTimer = setTimeout(function () {
          copyBtn.textContent = t("contact.copy");
          copyBtn.classList.remove("is-done");
          if (copyStatus) copyStatus.textContent = "";
        }, 2200);
      });
    });
  } else if (copyBtn) {
    // sin API de portapapeles, el link mailto alcanza
    copyBtn.hidden = true;
  }

  /* ---------- otros proyectos: preview que sigue al cursor ----------
     Solo con mouse y pantallas anchas. Si la captura no existe, no se muestra. */
  var peek = document.querySelector("[data-peek]");
  var peekImg = document.querySelector("[data-peek-img]");
  var list = document.querySelector("[data-others]");
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 960px)");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (peek && peekImg && list) {
    var available = {};
    var x = 0, y = 0, px = 0, py = 0, raf = 0, active = false;

    // precarga: solo se usan las capturas que existen
    list.querySelectorAll("[data-preview]").forEach(function (row) {
      var src = row.getAttribute("data-preview");
      var probe = new Image();
      probe.onload = function () { available[src] = true; };
      probe.src = src;
    });

    var follow = function () {
      px += (x - px) * (reduceMotion ? 1 : .18);
      py += (y - py) * (reduceMotion ? 1 : .18);
      peek.style.transform = "translate3d(" + (px + 28) + "px," + (py - 110) + "px,0)";
      raf = active ? window.requestAnimationFrame(follow) : 0;
    };

    list.addEventListener("pointermove", function (e) {
      if (!canHover.matches) return;
      x = e.clientX; y = e.clientY;
      if (!active) { px = x; py = y; }

      var row = e.target.closest("[data-preview]");
      var src = row && row.getAttribute("data-preview");

      if (src && available[src]) {
        if (peekImg.getAttribute("src") !== src) peekImg.setAttribute("src", src);
        peek.classList.add("is-on");
        if (!active) { active = true; raf = window.requestAnimationFrame(follow); }
      } else {
        peek.classList.remove("is-on");
      }
    });

    list.addEventListener("pointerleave", function () {
      peek.classList.remove("is-on");
      active = false;
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
    });
  }

  /* al cambiar de idioma, el botón de copiar vuelve a su texto */
  document.addEventListener("langchange", function () {
    if (copyBtn) copyBtn.classList.remove("is-done");
  });
})();
