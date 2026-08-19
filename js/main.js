/* ============================================================
   Mateo Camilión — portfolio
   Sin dependencias. Todo degrada bien si falla el JS.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- año del footer ---------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- reveal al scroll, con stagger corto ---------- */
  var revealables = document.querySelectorAll(".reveal");

  var pending = Array.prototype.slice.call(revealables);

  if (reduceMotion) {
    pending.forEach(function (el) { el.classList.add("is-in"); });
    pending = [];
  }

  /* Barrido por geometría en vez de IntersectionObserver: el contenido nunca
     puede quedar invisible aunque el navegador limite el render de la pestaña. */
  var sweep = function () {
    if (!pending.length) return;
    var limit = window.innerHeight * 0.92;
    var shown = 0;

    pending = pending.filter(function (el) {
      var box = el.getBoundingClientRect();
      var visible = box.top < limit && box.bottom > 0;
      if (!visible) return true;
      el.style.transitionDelay = (shown * 70) + "ms";
      el.classList.add("is-in");
      shown++;
      return false;
    });
  };

  var queued = false;
  var scheduleSweep = function () {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(function () { queued = false; sweep(); });
  };

  sweep();
  window.addEventListener("scroll", scheduleSweep, { passive: true });
  window.addEventListener("resize", scheduleSweep, { passive: true });
  window.addEventListener("load", scheduleSweep);

  /* ---------- nav: se oculta al bajar, vuelve al subir ---------- */
  var nav = document.querySelector("[data-nav]");
  if (nav) {
    var lastY = window.scrollY;
    var ticking = false;

    var onScroll = function () {
      var y = Math.max(window.scrollY, 0);
      nav.classList.toggle("is-stuck", y > 8);

      if (y > 140 && y > lastY + 6) {
        nav.classList.add("is-hidden");
      } else if (y < lastY - 6 || y <= 140) {
        nav.classList.remove("is-hidden");
      }
      lastY = y;
      ticking = false;
    };

    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }, { passive: true });

    // si el foco entra al nav por teclado, siempre visible
    nav.addEventListener("focusin", function () { nav.classList.remove("is-hidden"); });
  }

  /* ---------- leyenda de estados = filtro del board ----------
     La leyenda no es decoración: filtra los proyectos por estado,
     igual que el tablero de reservas de Signa.                  */
  var legend = document.querySelector("[data-legend]");
  var board = document.querySelector("[data-board]");
  var live = document.querySelector("[data-live]");

  if (legend && board) {
    var cards = Array.prototype.slice.call(board.querySelectorAll(".card"));
    var buttons = Array.prototype.slice.call(legend.querySelectorAll(".legend__btn"));

    var currentFilter = "all";
    var announced = false;

    // contadores reales, leídos del DOM
    legend.querySelectorAll("[data-count]").forEach(function (node) {
      var key = node.getAttribute("data-count");
      var total = key === "all"
        ? cards.length
        : cards.filter(function (c) { return c.dataset.status === key; }).length;
      node.textContent = String(total);
    });

    var t = function (key, vars) {
      return window.I18N ? window.I18N.t(key, vars) : key;
    };

    var announce = function (filter, matches) {
      if (!live) return;
      live.textContent = filter === "all"
        ? t("a11y.showingAll", { n: cards.length })
        : t("a11y.showingFiltered", {
            n: matches,
            total: cards.length,
            label: t("status." + filter)
          });
    };

    var apply = function (filter) {
      var matches = 0;
      currentFilter = filter;

      cards.forEach(function (card) {
        var hit = filter === "all" || card.dataset.status === filter;
        card.classList.toggle("is-match", hit);
        if (hit) matches++;
      });

      board.classList.toggle("is-filtered", filter !== "all");

      buttons.forEach(function (btn) {
        var on = btn.dataset.filter === filter;
        btn.classList.toggle("is-on", on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });

      // el estado inicial no se anuncia: sería ruido al cargar la página
      if (announced) announce(filter, matches);
      announced = true;
    };

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = btn.classList.contains("is-on") ? "all" : btn.dataset.filter;
        apply(next);
      });
    });

    apply("all");

    // al cambiar de idioma, el board vuelve a su estado sin texto viejo colgado
    document.addEventListener("langchange", function () {
      if (live) live.textContent = "";
      apply(currentFilter);
    });
  }

  /* ---------- previews: si falta el screenshot, cae al placeholder ----------
     Los archivos de assets/projects/ los completa Mateo a mano; hasta
     entonces cada frame muestra el punto de estado del proyecto.          */
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
})();
