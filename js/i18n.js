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
      "nav.skip": "Saltar al contenido",
      "nav.sections": "Secciones del sitio",
      "nav.story": "Historia",
      "nav.work": "Trabajo",
      "nav.contact": "Contacto",

      "lang.aria": "Idioma",
      "lang.changed": "Idioma cambiado a español.",

      "hero.statement": "Desarrollador full stack. Diseño, construyo y mantengo software que empresas usan —y pagan— todos los días.",
      "hero.now": "Ahora mismo",
      "hero.available": "Abierto a propuestas",
      "proof.utn": "Promedio 9.17 en la UTN y un 10 en el trabajo final",
      "proof.clients": "Century 21 Mar del Plata y VQL usan Signa",
      "proof.english": "Inglés fluido, después de dos temporadas en Park City",
      "proof.stack": "Java y Spring Boot, React y Angular, n8n e IA",
      "hero.ctaWork": "Ver mi trabajo",
      "hero.ctaContact": "Escribime",
      "hero.portraitAlt": "Retrato de Mateo Camilión",

      "story.title": "Cómo llegué hasta acá",
      "story.intro": "Antes de escribir código aprendí a resolver problemas de gente real. Todo lo que construyo sale de ahí.",

      "ch1.title": "Atender antes que programar",
      "ch1.body": "Dos temporadas en hospitality en resorts de Park City (Westgate Resorts, Vail Resorts). Huéspedes con problemas que había que resolver en el momento, en inglés y con equipos de todo el mundo. Ahí aprendí que el trabajo empieza por entender qué necesita la otra persona.",
      "ch1.fact": "Inglés fluido, aprendido trabajando",

      "ch2.title": "La base técnica",
      "ch2.body": "Me recibí de Técnico Universitario en Programación en la UTN. Mi trabajo final integrador fue UTNutri, un sistema de gestión para nutricionistas hecho con Spring Boot y Angular.",
      "ch2.fact": "Promedio 9.17 y un 10 en el trabajo final",

      "ch3.title": "El primer cliente que paga",
      "ch3.body": "En paralelo a la carrera, convertí un problema concreto de las inmobiliarias en un SaaS multi-tenant de gestión de reservas. Lo diseñé, lo construí, lo llevé a producción y lo sigo manteniendo.",
      "ch3.fact": "Hoy lo usan Century 21 Mar del Plata y VQL",

      "ch4.place": "Leadera, freelance e IA",
      "ch4.title": "Otros problemas, otras industrias",
      "ch4.body": "Después vino Leadera, un CRM con automatizaciones en n8n. Y proyectos para otros rubros: un sistema para una tienda de ropa en consignación con un agente de IA para atención al cliente, y una landing para un local gastronómico.",
      "ch4.fact": "Cinco productos, cuatro industrias",

      "ch5.place": "Hoy",
      "ch5.title": "Busco un equipo",
      "ch5.body": "Quiero sumarme a un equipo de producto donde aportar código y también criterio: entender al usuario, priorizar y llevar las cosas a producción. Mientras tanto, sigo sosteniendo Signa y Leadera.",
      "ch5.cta": "Hablemos",

      "work.title": "Trabajo",
      "work.note": "Productos reales, cada uno en su estado real.",

      "status.produccion": "En producción",
      "status.entregado": "Entregado",
      "status.revision": "En revisión",

      "case.what": "Qué resuelve",
      "case.built": "Qué construí",
      "case.now": "Hoy",

      "signa.type": "Producto propio, SaaS",
      "signa.what": "Gestión de reservas para inmobiliarias con varios agentes y equipos, donde cada persona ve lo que le corresponde según su rol.",
      "signa.built": "Arquitectura multi-tenant sobre Supabase y PostgreSQL, Edge Functions en Deno y una PWA en React. Carga de reservas por voz con Whisper y GPT-4o-mini, y reportes exportables a PDF.",
      "signa.now": "En producción con clientes pagando, entre ellos Century 21 Mar del Plata y VQL Inmobiliaria.",
      "signa.shotAlt": "Captura de pantalla del listado de reservas de Signa",

      "leadera.type": "Producto propio, CRM",
      "leadera.what": "Un CRM inmobiliario que trata leads y operaciones como entidades distintas, cada una con su propio flujo de seguimiento.",
      "leadera.built": "Una API en Java con Spring Boot, Spring Security y JWT, y el frontend en Angular. Automatizaciones en n8n para el seguimiento diario y la reclasificación de leads.",
      "leadera.now": "En producción en leadera.com.ar.",
      "leadera.shotAlt": "Captura de pantalla del CRM Leadera",

      "others.title": "Otros proyectos",
      "utnutri.type": "Proyecto académico.",
      "utnutri.desc": "Gestión de pacientes para nutricionistas, multi-tenant. Mi trabajo final de la UTN, calificado con 10.",
      "swapstyle.type": "Freelance.",
      "swapstyle.desc": "Sistema de gestión para una tienda de ropa en consignación, con un agente de IA vía n8n para atención al cliente.",
      "miga.type": "Freelance.",
      "miga.desc": "Landing page para un local de sanguches, pendiente de entrega final.",
      "link.private": "Repo privado",

      "how.title": "Cómo trabajo",
      "how.note": "Lo que puedo aportar a un equipo desde el primer día.",
      "how.product.title": "De punta a punta",
      "how.product.body": "Del problema del usuario al deploy: modelo de datos, API, interfaz y la conversación con quien lo va a usar.",
      "how.backend.title": "Backend que aguanta",
      "how.backend.body": "APIs REST con autenticación, modelado multi-tenant y bases relacionales que crecen con el producto.",
      "how.frontend.title": "Interfaces de producción",
      "how.frontend.body": "Pantallas que la gente usa todos los días, no demos: rápidas, claras y fáciles de mantener.",
      "how.ai.title": "Automatización e IA",
      "how.ai.body": "Automatizo flujos de negocio reales, como el seguimiento de leads o la carga por voz, no solo prompts sueltos.",

      "contact.title": "Hablemos.",
      "contact.note": "Busco sumarme a un equipo de producto. También tomo proyectos freelance.",
      "contact.copy": "Copiar",
      "contact.copied": "Copiado",
      "contact.copiedStatus": "Email copiado al portapapeles.",

      "footer.meta": "Hecho a mano en HTML, CSS y JS"
    },

    en: {
      "nav.skip": "Skip to content",
      "nav.sections": "Site sections",
      "nav.story": "Story",
      "nav.work": "Work",
      "nav.contact": "Contact",

      "lang.aria": "Language",
      "lang.changed": "Language changed to English.",

      "hero.statement": "Full stack developer. I design, build and maintain software that businesses use —and pay for— every day.",
      "hero.now": "Right now",
      "hero.available": "Open to opportunities",
      "proof.utn": "9.17 GPA at UTN and a perfect 10 on my capstone",
      "proof.clients": "Century 21 Mar del Plata and VQL run on Signa",
      "proof.english": "Fluent English, after two seasons in Park City",
      "proof.stack": "Java and Spring Boot, React and Angular, n8n and AI",
      "hero.ctaWork": "See my work",
      "hero.ctaContact": "Get in touch",
      "hero.portraitAlt": "Portrait of Mateo Camilión",

      "story.title": "How I got here",
      "story.intro": "Before I wrote any code, I learned to solve real people's problems. Everything I build comes from there.",

      "ch1.title": "Serving before coding",
      "ch1.body": "Two seasons in hospitality at Park City resorts (Westgate Resorts, Vail Resorts). Guests with problems that had to be solved on the spot, in English, alongside teams from all over the world. That's where I learned the job starts with understanding what the other person needs.",
      "ch1.fact": "Fluent English, learned on the job",

      "ch2.title": "The technical foundation",
      "ch2.body": "I graduated with a University Technical Degree in Programming from UTN. My capstone was UTNutri, a management system for nutritionists built with Spring Boot and Angular.",
      "ch2.fact": "9.17 GPA and a perfect 10 on the capstone",

      "ch3.title": "The first paying customer",
      "ch3.body": "Alongside my degree, I turned a concrete problem real estate agencies had into a multi-tenant booking management SaaS. I designed it, built it, shipped it, and I still maintain it.",
      "ch3.fact": "Used today by Century 21 Mar del Plata and VQL",

      "ch4.place": "Leadera, freelance and AI",
      "ch4.title": "New problems, new industries",
      "ch4.body": "Then came Leadera, a CRM with n8n automations. And projects in other fields: a system for a consignment clothing store with an AI customer support agent, and a landing page for a local restaurant.",
      "ch4.fact": "Five products, four industries",

      "ch5.place": "Today",
      "ch5.title": "Looking for a team",
      "ch5.body": "I want to join a product team where I can bring code and judgement: understanding users, prioritizing, and getting things to production. Meanwhile, I keep running Signa and Leadera.",
      "ch5.cta": "Let's talk",

      "work.title": "Work",
      "work.note": "Real products, each in its real state.",

      "status.produccion": "In production",
      "status.entregado": "Shipped",
      "status.revision": "In review",

      "case.what": "What it solves",
      "case.built": "What I built",
      "case.now": "Today",

      "signa.type": "Own product, SaaS",
      "signa.what": "Booking management for real estate agencies with multiple agents and teams, where everyone sees what their role allows.",
      "signa.built": "Multi-tenant architecture on Supabase and PostgreSQL, Deno Edge Functions and a React PWA. Voice entry for bookings with Whisper and GPT-4o-mini, plus PDF report export.",
      "signa.now": "In production with paying clients, including Century 21 Mar del Plata and VQL Inmobiliaria.",
      "signa.shotAlt": "Screenshot of Signa's booking list",

      "leadera.type": "Own product, CRM",
      "leadera.what": "A real estate CRM that treats leads and deals as separate entities, each with its own follow-up flow.",
      "leadera.built": "A Java API with Spring Boot, Spring Security and JWT, and an Angular frontend. n8n automations for daily follow-ups and lead reclassification.",
      "leadera.now": "In production at leadera.com.ar.",
      "leadera.shotAlt": "Screenshot of the Leadera CRM",

      "others.title": "Other projects",
      "utnutri.type": "Academic project.",
      "utnutri.desc": "Multi-tenant patient management for nutritionists. My UTN capstone, graded 10/10.",
      "swapstyle.type": "Freelance.",
      "swapstyle.desc": "Management system for a consignment clothing store, with an n8n AI agent for customer support.",
      "miga.type": "Freelance.",
      "miga.desc": "Landing page for a local sandwich shop, pending final delivery.",
      "link.private": "Private repo",

      "how.title": "How I work",
      "how.note": "What I can bring to a team from day one.",
      "how.product.title": "End to end",
      "how.product.body": "From the user's problem to deploy: data model, API, interface, and the conversation with whoever will use it.",
      "how.backend.title": "Backends that hold up",
      "how.backend.body": "REST APIs with authentication, multi-tenant modelling and relational databases that grow with the product.",
      "how.frontend.title": "Production interfaces",
      "how.frontend.body": "Screens people use every day, not demos: fast, clear and easy to maintain.",
      "how.ai.title": "Automation and AI",
      "how.ai.body": "I automate real business flows, like lead follow-ups or voice entry, not just one-off prompts.",

      "contact.title": "Let's talk.",
      "contact.note": "I'm looking to join a product team. I also take on freelance projects.",
      "contact.copy": "Copy",
      "contact.copied": "Copied",
      "contact.copiedStatus": "Email copied to clipboard.",

      "footer.meta": "Handmade in HTML, CSS and JS"
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
