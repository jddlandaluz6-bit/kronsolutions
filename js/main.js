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
  var STORAGE_KEY = 'cronos-lang';

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
          es: 'No se pudo enviar el formulario. Escríbenos directamente a hola@cronossolutions.es.',
          en: 'The form could not be sent. Please email us directly at hola@cronossolutions.es.'
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
