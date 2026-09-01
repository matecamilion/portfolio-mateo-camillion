/* ============================================================
   i18n — ES / EN
   Se carga de forma síncrona al final del <body>: para cuando
   corre, el DOM ya está parseado y el intercambio ocurre antes
   del primer paint, así que no hay flash en el idioma incorrecto.
   ============================================================ */
window.I18N = (function () {
  "use strict";

  var STORAGE_KEY = "portfolio-lang";
  var DEFAULT_LANG = "es";

  var translations = {

    es: {
      "nav.skip": "Saltar a proyectos",
      "nav.sections": "Secciones del sitio",
      "nav.projects": "Proyectos",
      "nav.about": "Quién soy",
      "nav.stack": "Stack",
      "nav.contact": "Contacto",

      "lang.aria": "Idioma",
      "lang.changed": "Idioma cambiado a español.",

      "hero.eyebrow": "FULL STACK DEV · FOUNDER · MAR DEL PLATA, ARGENTINA",
      "hero.headline": "Construyo el software que corre por detrás de inmobiliarias reales.",
      "hero.sub": "Full stack developer y founder de dos productos SaaS en producción, con clientes pagando. Técnico Universitario en Programación (UTN), recibido en 2026.",
      "hero.portraitAlt": "Retrato de Mateo Camilión",

      "legend.aria": "Filtrar proyectos por estado",
      "legend.label": "ESTADO",
      "legend.all": "Todos",

      "status.produccion": "En producción",
      "status.entregado": "Entregado",
      "status.revision": "En revisión",

      "projects.title": "Proyectos",
      "projects.note": "Cinco productos, cada uno en su estado real.",

      "proj.signa.eyebrow": "PRODUCTO PROPIO · SAAS",
      "proj.signa.desc": "Sistema multi-tenant de gestión de reservas para inmobiliarias. Clientes activos pagando, incluyendo Century 21 Mar del Plata y VQL Inmobiliaria.",
      "proj.signa.extra": "Suma carga rápida de reservas por voz (Whisper + GPT-4o-mini) y export de reportes a PDF con html2canvas y jsPDF.",
      "proj.signa.shotAlt": "Captura de pantalla del dashboard de Signa",

      "proj.leadera.eyebrow": "PRODUCTO PROPIO · CRM",
      "proj.leadera.desc": "CRM inmobiliario que separa leads de operaciones como entidades distintas, con automatizaciones en n8n para seguimiento diario y reclasificación de leads.",
      "proj.leadera.shotAlt": "Captura de pantalla del CRM Leadera",

      "proj.utnutri.eyebrow": "PROYECTO ACADÉMICO · SISTEMA DE GESTIÓN",
      "proj.utnutri.desc": "Sistema de gestión de pacientes para nutricionistas, con aislamiento multi-tenant entre profesionales. Trabajo final integrador de la Tecnicatura Universitaria en Programación (UTN).",
      "proj.utnutri.shotAlt": "Captura de pantalla del sistema de gestión UTNutri",

      "proj.swapstyle.eyebrow": "FREELANCE · E-COMMERCE",
      "proj.swapstyle.desc": "Sistema de gestión para una tienda de ropa en consignación, con agente de IA integrado vía n8n para atención al cliente.",
      "proj.swapstyle.link": "Repo privado",
      "proj.swapstyle.shotAlt": "Captura de pantalla del sistema de gestión de Swapstyle",

      "proj.miga.eyebrow": "FREELANCE · LANDING PAGE",
      "proj.miga.desc": "Landing page para un negocio de sanguches.",
      "proj.miga.note": "Pendiente de entrega final al cliente.",
      "proj.miga.shotAlt": "Captura de pantalla de la landing de Miga",

      "about.title": "Quién soy",
      "about.p1": "Soy Técnico Universitario en Programación (UTN Mar del Plata) — promedio 9.06. En paralelo a la carrera, construí y sostengo dos productos SaaS con clientes reales pagando: no son proyectos de facultad, son sistemas en producción.",
      "about.p2": "Antes de programar, pasé dos temporadas en hospitality en resorts de Park City, Utah (Westgate Resorts, Vail Resorts). De ahí viene mi inglés — no de un curso, sino de meses resolviendo problemas en equipos internacionales todos los días.",

      "stack.title": "Stack",
      "stack.frontend.name": "FRONTEND",
      "stack.frontend.note": "Interfaces de producción, no demos: los mismos componentes que corren en Signa hoy.",
      "stack.backend.name": "BACKEND",
      "stack.backend.note": "Desde APIs REST con auth hasta modelado de datos multi-tenant.",
      "stack.ai.name": "AUTOMATIZACIÓN & IA",
      "stack.ai.note": "Automatizo flujos de negocio reales (seguimiento de leads, carga por voz), no solo prompts sueltos.",

      "contact.title": "Contacto",
      "contact.note": "Disponible para hablar de trabajo, freelance o producto.",
      "contact.location": "UBICACIÓN",

      "footer.meta": "Escrito a mano en HTML, CSS y JS",

      "a11y.showingAll": "Mostrando los {n} proyectos.",
      "a11y.showingFiltered": "Mostrando {n} de {total} proyectos: {label}."
    },

    en: {
      "nav.skip": "Skip to projects",
      "nav.sections": "Site sections",
      "nav.projects": "Projects",
      "nav.about": "About me",
      "nav.stack": "Stack",
      "nav.contact": "Contact",

      "lang.aria": "Language",
      "lang.changed": "Language changed to English.",

      "hero.eyebrow": "FULL STACK DEV · FOUNDER · MAR DEL PLATA, ARGENTINA",
      "hero.headline": "I build the software real estate agencies actually run on.",
      "hero.sub": "Full stack developer and founder of two SaaS products in production, with paying clients. University Technical Degree in Programming (UTN), graduated in 2026.",
      "hero.portraitAlt": "Portrait of Mateo Camilión",

      "legend.aria": "Filter projects by status",
      "legend.label": "STATUS",
      "legend.all": "All",

      "status.produccion": "In production",
      "status.entregado": "Shipped",
      "status.revision": "In review",

      "projects.title": "Projects",
      "projects.note": "Five products, each in its real state.",

      "proj.signa.eyebrow": "OWN PRODUCT · SAAS",
      "proj.signa.desc": "Multi-tenant booking management system for real estate agencies. Active paying clients, including Century 21 Mar del Plata and VQL Inmobiliaria.",
      "proj.signa.extra": "Adds quick voice entry for bookings (Whisper + GPT-4o-mini) and PDF report export with html2canvas and jsPDF.",
      "proj.signa.shotAlt": "Screenshot of Signa's dashboard",

      "proj.leadera.eyebrow": "OWN PRODUCT · CRM",
      "proj.leadera.desc": "Real estate CRM that separates leads from operations as distinct entities, with n8n automations for daily follow-ups and lead reclassification.",
      "proj.leadera.shotAlt": "Screenshot of the Leadera CRM",

      "proj.utnutri.eyebrow": "ACADEMIC PROJECT · MANAGEMENT SYSTEM",
      "proj.utnutri.desc": "Patient management system for nutritionists, with multi-tenant isolation between practitioners. Final capstone project for the University Technical Degree in Programming (UTN).",
      "proj.utnutri.shotAlt": "Screenshot of the UTNutri management system",

      "proj.swapstyle.eyebrow": "FREELANCE · E-COMMERCE",
      "proj.swapstyle.desc": "Management system for a clothing consignment store, with an AI agent built with n8n for customer support.",
      "proj.swapstyle.link": "Private repo",
      "proj.swapstyle.shotAlt": "Screenshot of the Swapstyle management system",

      "proj.miga.eyebrow": "FREELANCE · LANDING PAGE",
      "proj.miga.desc": "Landing page for a local sandwich shop.",
      "proj.miga.note": "Pending final delivery to the client.",
      "proj.miga.shotAlt": "Screenshot of the Miga landing page",

      "about.title": "About me",
      "about.p1": "I hold a University Technical Degree in Programming (UTN Mar del Plata) — 9.06 GPA. Alongside the degree, I built and maintain two SaaS products with real, paying clients: not school projects, systems in production.",
      "about.p2": "Before I started coding, I spent two seasons in hospitality at resorts in Park City, Utah (Westgate Resorts, Vail Resorts). That's where my English comes from — not a course, but months solving problems on international teams, every day.",

      "stack.title": "Stack",
      "stack.frontend.name": "FRONTEND",
      "stack.frontend.note": "Production interfaces, not demos: the same components running in Signa today.",
      "stack.backend.name": "BACKEND",
      "stack.backend.note": "From REST APIs with auth to multi-tenant data modelling.",
      "stack.ai.name": "AUTOMATION & AI",
      "stack.ai.note": "I automate real business flows (lead follow-ups, voice entry), not just one-off prompts.",

      "contact.title": "Contact",
      "contact.note": "Open to talk about jobs, freelance or product.",
      "contact.location": "LOCATION",

      "footer.meta": "Handwritten in HTML, CSS and JS",

      "a11y.showingAll": "Showing all {n} projects.",
      "a11y.showingFiltered": "Showing {n} of {total} projects: {label}."
    }
  };

  var current = DEFAULT_LANG;

  var read = function () {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      return translations[saved] ? saved : DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  };

  var save = function (lang) {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* modo privado */ }
  };

  /* t("clave") o t("clave", { n: 3 }) — devuelve la clave si falta la traducción */
  var t = function (key, vars) {
    var dict = translations[current] || translations[DEFAULT_LANG];
    var value = dict[key];
    if (value === undefined) return key;
    if (!vars) return value;
    return value.replace(/\{(\w+)\}/g, function (match, name) {
      return vars[name] !== undefined ? vars[name] : match;
    });
  };

  var apply = function (lang, announce) {
    current = translations[lang] ? lang : DEFAULT_LANG;
    document.documentElement.setAttribute("lang", current);

    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      node.textContent = t(node.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (node) {
      node.setAttribute("alt", t(node.getAttribute("data-i18n-alt")));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (node) {
      node.setAttribute("aria-label", t(node.getAttribute("data-i18n-aria")));
    });

    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      var on = btn.getAttribute("data-lang") === current;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });

    save(current);

    if (announce) {
      var status = document.querySelector("[data-lang-status]");
      if (status) status.textContent = t("lang.changed");
    }

    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: current } }));
  };

  document.querySelectorAll("[data-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      apply(btn.getAttribute("data-lang"), true);
    });
  });

  apply(read(), false);

  return {
    t: t,
    apply: apply,
    get lang() { return current; },
    keys: function (lang) { return Object.keys(translations[lang] || {}); }
  };
})();
