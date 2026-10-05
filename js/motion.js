/* ============================================================
   Movimiento: GSAP + ScrollTrigger + Lenis (por CDN).
   Solo se activa si las librerías cargaron y el usuario no pidió
   movimiento reducido. Sin esto, la página es una lectura vertical
   completa: nada depende de que este archivo corra.

   El hilo conductor es el eje de ancho de Archivo (--w, de 62 a 125):
   los títulos llegan comprimidos y se abren a medida que entran.
   ============================================================ */
(function () {
  "use strict";

  var root = document.documentElement;
  var release = function () { root.classList.remove("motion-pending"); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !window.gsap || !window.ScrollTrigger) {
    release();
    return;
  }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  var NARROW = 62;
  var WIDE = 125;

  /* ---------- scroll suave ---------- */
  var lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // los anclas internas pasan por Lenis para no cortar el scroll suave;
    // el skip-link queda nativo porque además tiene que mover el foco
    document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { duration: 1.4 });
      });
    });
  }

  /* ---------- hero: el nombre se abre letra por letra ---------- */
  document.querySelectorAll("[data-split]").forEach(function (line) {
    var text = line.textContent;
    line.textContent = "";
    Array.prototype.forEach.call(text, function (char) {
      var span = document.createElement("span");
      span.className = "ch";
      span.textContent = char;
      line.appendChild(span);
    });
  });

  var chars = gsap.utils.toArray(".hero__name .ch");
  var portrait = document.querySelector("[data-hero-portrait]");
  var heroBody = document.querySelectorAll("[data-hero-body] > *");

  // al terminar, cada línea vuelve a ser texto plano: sin costuras entre letras
  var unsplit = function () {
    document.querySelectorAll("[data-split]").forEach(function (line) {
      line.textContent = line.textContent;
    });
  };

  var intro = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: unsplit });
  intro
    .fromTo(chars,
      { "--w": NARROW, opacity: 0, yPercent: 35 },
      { "--w": WIDE, opacity: 1, yPercent: 0, duration: 1.6, stagger: 0.04, clearProps: "--w" })
    .fromTo(portrait,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" }, 0.35)
    .fromTo(portrait ? portrait.querySelector("img") : [],
      { scale: 1.25 },
      { scale: 1, duration: 1.8 }, 0.35)
    .fromTo(heroBody,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1.1, stagger: 0.09 }, 0.7)
    // el tablero se "enciende" fila por fila, como un estado que se actualiza
    .fromTo("[data-board-row]",
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.12 }, 1.1)
    .fromTo("[data-proof] > li",
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.08 }, 1.2);

  release();

  // al irse del hero, el nombre se vuelve a comprimir
  gsap.fromTo(".hero__line",
    { "--w": WIDE },
    {
      "--w": 100,
      ease: "none",
      scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true }
    });

  /* ---------- títulos que se abren al entrar ---------- */
  var widen = function (el, trigger, start, end) {
    if (!el) return;
    gsap.fromTo(el,
      { "--w": NARROW },
      {
        "--w": WIDE,
        ease: "none",
        scrollTrigger: { trigger: trigger || el, start: start || "top 90%", end: end || "top 45%", scrub: true }
      });
  };

  widen(document.querySelector(".work__title"));
  widen(document.querySelector(".how__title"));
  widen(document.querySelector("[data-contact-title]"), null, "top 95%", "top 50%");

  /* ---------- historia ---------- */
  var story = document.querySelector("[data-story]");
  var pin = document.querySelector("[data-story-pin]");
  var track = document.querySelector("[data-story-track]");
  var bar = document.querySelector("[data-story-bar]");
  var chapters = gsap.utils.toArray("[data-chapter]");

  var mm = gsap.matchMedia();

  // escritorio: recorrido horizontal fijado al scroll
  mm.add("(min-width: 900px) and (min-height: 560px)", function () {
    root.classList.add("has-story-pin");

    var distance = function () { return Math.max(track.scrollWidth - window.innerWidth, 0); };

    var ride = gsap.to(track, {
      x: function () { return -distance(); },
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: function () { return "+=" + distance(); },
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    gsap.fromTo(bar, { scaleX: 0 }, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: function () { return "+=" + distance(); },
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    widen(document.querySelector(".story__title"), story, "top 85%", "top top");

    chapters.forEach(function (chapter) {
      gsap.fromTo(chapter.querySelector(".chapter__title"),
        { "--w": NARROW, opacity: 0.3 },
        {
          "--w": WIDE,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: chapter,
            containerAnimation: ride,
            start: "left 92%",
            end: "left 45%",
            scrub: true
          }
        });

      // el número viaja un poco más lento que el texto
      gsap.fromTo(chapter.querySelector(".chapter__num"),
        { xPercent: 60 },
        {
          xPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: chapter,
            containerAnimation: ride,
            start: "left right",
            end: "right left",
            scrub: true
          }
        });
    });

    return function () { root.classList.remove("has-story-pin"); };
  });

  // mobile: lectura vertical, cada capítulo se abre al entrar
  mm.add("(max-width: 899px), (max-height: 559px)", function () {
    widen(document.querySelector(".story__title"));
    chapters.forEach(function (chapter) {
      widen(chapter.querySelector(".chapter__title"), chapter, "top 88%", "top 50%");
    });
  });

  /* ---------- trabajo: el panel oscuro se expande hasta los bordes ---------- */
  var work = document.querySelector("[data-work]");
  var panel = document.querySelector("[data-work-panel]");

  if (work && panel) {
    gsap.fromTo(panel,
      { clipPath: "inset(0% 4% 0% 4% round 28px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        ease: "none",
        scrollTrigger: { trigger: work, start: "top bottom", end: "top 15%", scrub: true }
      });
  }

  // capturas con un parallax leve dentro de su marco
  gsap.utils.toArray("[data-parallax]").forEach(function (img) {
    gsap.fromTo(img,
      { yPercent: 0 },
      {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: img.closest(".shot"), start: "top bottom", end: "bottom top", scrub: true }
      });
  });

  /* ---------- recalcular cuando cambian las medidas ---------- */
  var refresh = function () { ScrollTrigger.refresh(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  window.addEventListener("load", refresh);
  // otro idioma = otros largos de texto = otro ancho del recorrido
  document.addEventListener("langchange", refresh);
})();
