(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     Sticky header
  --------------------------------------------------------------------- */
  var header = document.getElementById('siteHeader');
  var onScroll = function () {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------------
     Hero logo — al pasar el raton por encima del simbolo: un latido y una
     onda expansiva que cruza todo el hero. Cada hover lanza una onda
     nueva aunque la anterior siga en curso (maximo 2 a la vez, para no
     sobrecargar el render: la onda es grande y va muy difuminada).
  --------------------------------------------------------------------- */
  var heroLogoImg = document.querySelector('.hero__logo-ghost');
  var heroLogoZone = document.querySelector('.hero__logo-zone');
  var heroSection = document.querySelector('.hero');
  if (heroLogoImg && heroLogoZone && heroSection) {
    var MAX_WAVES = 2;
    heroLogoImg.addEventListener('mouseenter', function () {
      if (heroLogoZone.querySelectorAll('.hero__pulse-ring').length >= MAX_WAVES) return;
      heroLogoImg.classList.remove('is-beating');
      void heroLogoImg.offsetWidth; // reinicia la animacion del latido
      heroLogoImg.classList.add('is-beating');

      // Tamano final del rombo para que contenga la esquina mas lejana del
      // hero: un cuadrado girado 45deg de lado L cubre |dx|+|dy| <= L/sqrt2.
      var hero = heroSection.getBoundingClientRect();
      var zone = heroLogoZone.getBoundingClientRect();
      var cx = zone.left + zone.width / 2;
      var cy = zone.top + zone.height / 2;
      var dx = Math.max(cx - hero.left, hero.right - cx);
      var dy = Math.max(cy - hero.top, hero.bottom - cy);
      var end = Math.ceil((dx + dy) * Math.SQRT2 + 200);

      var ring = document.createElement('span');
      ring.className = 'hero__pulse-ring';
      ring.setAttribute('aria-hidden', 'true');
      ring.style.setProperty('--wave-end', end + 'px');
      heroLogoZone.appendChild(ring);
      ring.addEventListener('animationend', function () {
        ring.remove();
      });
    });
    heroLogoImg.addEventListener('animationend', function () {
      heroLogoImg.classList.remove('is-beating');
    });
  }

  /* ---------------------------------------------------------------------
     Cobertura 360 — carrusel 3D de iconos orbitando alrededor del titulo.
     Reutiliza los iconos de las tarjetas de servicio y anade algunos
     genericos. Se pausa cuando la seccion no esta en pantalla.
  --------------------------------------------------------------------- */
  var orbit = document.querySelector('.services__orbit');
  if (orbit) {
    var stroke = ' stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
    var extraIcons = [
      '<path d="M8 32V8"' + stroke + '/><path d="M8 32h24"' + stroke + '/><path d="M14 26v-6M20 26V14M26 26v-9"' + stroke + '/>',
      '<circle cx="15" cy="14" r="4"' + stroke + '/><path d="M7 30c0-5 3.5-8 8-8s8 3 8 8"' + stroke + '/><circle cx="27" cy="16" r="3"' + stroke + '/><path d="M25 22c4 0 7 2.5 7 7"' + stroke + '/>',
      '<circle cx="20" cy="20" r="12"' + stroke + '/><circle cx="20" cy="20" r="7"' + stroke + '/><circle cx="20" cy="20" r="2"' + stroke + '/>',
      '<rect x="8" y="14" width="24" height="17" rx="2"' + stroke + '/><path d="M16 14v-3h8v3M8 21h24"' + stroke + '/>',
      '<path d="M27 12a9 9 0 1 0 0 16"' + stroke + '/><path d="M9 18h13M9 23h13"' + stroke + '/>',
      '<circle cx="20" cy="20" r="4"' + stroke + '/><path d="M20 8v4M20 28v4M8 20h4M28 20h4M11.5 11.5l2.8 2.8M25.7 25.7l2.8 2.8M11.5 28.5l2.8-2.8M25.7 14.3l2.8-2.8"' + stroke + '/>'
    ];
    var icons = [];
    document.querySelectorAll('.services .service-card__icon').forEach(function (svg) {
      icons.push(svg.innerHTML);
    });
    icons = icons.concat(extraIcons);

    var items = icons.map(function (markup) {
      var el = document.createElement('span');
      el.className = 'services__orbit-item';
      el.innerHTML = '<svg viewBox="0 0 40 40" fill="none">' + markup + '</svg>';
      orbit.appendChild(el);
      return el;
    });

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ORBIT_PERIOD = 40000; // ms por vuelta completa
    var orbitAngle = 0;
    var orbitRunning = false;
    var lastTs = null;
    var rx, ry, cx, cy;

    var measureOrbit = function () {
      var w = orbit.clientWidth;
      var h = orbit.clientHeight;
      cx = w / 2;
      cy = h / 2;
      rx = Math.min(w * 0.46, 560);
      ry = h / 2 - 30;
    };

    var renderOrbit = function () {
      var n = items.length;
      for (var i = 0; i < n; i++) {
        var a = orbitAngle + (i / n) * Math.PI * 2;
        var depth = (Math.sin(a) + 1) / 2; // 0 = detras (arriba), 1 = delante (abajo)
        var x = cx + Math.cos(a) * rx;
        var y = cy + Math.sin(a) * ry;
        var scale = 0.55 + depth * 0.6;
        var el = items[i];
        el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) scale(' + scale.toFixed(3) + ')';
        el.style.filter = 'blur(' + ((1 - depth) * 4).toFixed(2) + 'px)';
        el.style.opacity = (0.25 + depth * 0.75).toFixed(3);
      }
    };

    var tickOrbit = function (ts) {
      if (!orbitRunning) return;
      if (lastTs !== null) orbitAngle += ((ts - lastTs) / ORBIT_PERIOD) * Math.PI * 2;
      lastTs = ts;
      renderOrbit();
      requestAnimationFrame(tickOrbit);
    };

    measureOrbit();
    renderOrbit();
    window.addEventListener('resize', function () { measureOrbit(); renderOrbit(); });

    if (!reduceMotion && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !orbitRunning) {
          orbitRunning = true;
          lastTs = null;
          requestAnimationFrame(tickOrbit);
        } else if (!visible) {
          orbitRunning = false;
        }
      }).observe(orbit);
    }
  }

  /* ---------------------------------------------------------------------
     Mobile nav
  --------------------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', function () {
    var open = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------------------------------------------------------------
     Language toggle (ES / EN)
  --------------------------------------------------------------------- */
  var langToggle = document.getElementById('langToggle');
  var STORAGE_KEY = 'kron-lang';

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-' + lang + ']').forEach(function (el) {
      var value = el.getAttribute('data-' + lang);
      if (value !== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.setAttribute('placeholder', value);
        } else {
          el.innerHTML = value;
        }
      }
    });
    langToggle.querySelectorAll('.lang-toggle__opt').forEach(function (opt) {
      opt.classList.toggle('is-active', opt.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  langToggle.addEventListener('click', function () {
    var current = document.documentElement.lang === 'en' ? 'en' : 'es';
    applyLang(current === 'es' ? 'en' : 'es');
  });

  (function initLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    var browserLang = (navigator.language || 'es').slice(0, 2);
    var initial = saved || (browserLang === 'en' ? 'en' : 'es');
    if (initial === 'en') applyLang('en');
  })();

  /* ---------------------------------------------------------------------
     Scroll reveal
  --------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------------------------
     Stat counters
  --------------------------------------------------------------------- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var duration = 1200;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && counters.length) {
    var counterIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { counterIo.observe(el); });
  }

  /* ---------------------------------------------------------------------
     Lead form — envio a Netlify Forms via AJAX (sin recargar la pagina).
     Requiere que el sitio este desplegado en Netlify con data-netlify="true"
     presente en el <form> (ver index.html). En local/otros hosts sin Netlify
     el fetch fallara silenciosamente y se mostrara igualmente el mensaje de
     confirmacion; conectar entonces a otro backend (Formspree, EmailJS, etc.).
  --------------------------------------------------------------------- */
  var form = document.getElementById('leadForm');
  var formNote = document.getElementById('formNote');

  function encodeFormData(data) {
    return Object.keys(data)
      .map(function (key) { return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]); })
      .join('&');
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var lang = document.documentElement.lang === 'en' ? 'en' : 'es';
      var messages = {
        ok: {
          es: 'Gracias. Hemos recibido tu solicitud y te contactaremos en menos de 48h laborables.',
          en: 'Thank you. We have received your request and will contact you within 48 business hours.'
        },
        error: {
          es: 'No se pudo enviar el formulario. Escríbenos directamente a kronsolutions.contacto@gmail.com.',
          en: 'The form could not be sent. Please email us directly at kronsolutions.contacto@gmail.com.'
        }
      };

      var data = {};
      new FormData(form).forEach(function (value, key) { data[key] = value; });

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData(data)
      })
        .then(function () {
          formNote.textContent = messages.ok[lang];
          formNote.style.color = 'var(--forest-700)';
          formNote.style.fontWeight = '600';
          form.reset();
        })
        .catch(function () {
          formNote.textContent = messages.error[lang];
          formNote.style.color = '#a3443a';
          formNote.style.fontWeight = '600';
        });
    });
  }

  /* ---------------------------------------------------------------------
     Footer year
  --------------------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
