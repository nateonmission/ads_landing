/* ============================================================
   HOME I.T. CONCIERGE — app.js
   ============================================================ */

(function () {

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {

    /* ── Scroll-based nav shadow ── */
    var nav = document.getElementById('nav');
    if (nav) {
      window.addEventListener('scroll', function () {
        nav.style.background = window.scrollY > 40
          ? 'rgba(13,15,20,0.98)'
          : 'rgba(13,15,20,0.85)';
      }, { passive: true });
    }

    /* ── Smooth anchor scroll ── */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = anchor.getAttribute('href');
        if (!href || href.length < 2) return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var top = target.getBoundingClientRect().top + window.pageYOffset - 72;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });

    /* ── Fade-up on scroll ── */
    var fadeEls = document.querySelectorAll(
      '.service-card, .why-item, .contact-card, .about-text p, .cert-badge, .about-links'
    );
    fadeEls.forEach(function (el) { el.classList.add('fade-up'); });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var siblings = Array.from(entry.target.parentElement.querySelectorAll('.fade-up'));
            var idx = siblings.indexOf(entry.target);
            setTimeout(function () {
              entry.target.classList.add('visible');
            }, idx * 80);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      fadeEls.forEach(function (el) { observer.observe(el); });
    } else {
      fadeEls.forEach(function (el) { el.classList.add('visible'); });
    }

    /* ── Terminal typewriter ── */
    var terminalWrap = document.querySelector('.why-terminal');
    if (terminalWrap && 'IntersectionObserver' in window) {
      var tLines = terminalWrap.querySelectorAll('.t-line');
      var fired = false;
      tLines.forEach(function (l) { l.style.opacity = '0'; });
      var tObs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !fired) {
          fired = true;
          tLines.forEach(function (line, i) {
            setTimeout(function () {
              line.style.transition = 'opacity 0.3s ease';
              line.style.opacity = '1';
            }, i * 220);
          });
        }
      }, { threshold: 0.3 });
      tObs.observe(terminalWrap);
    }

    /* ── Active nav highlight ── */
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    window.addEventListener('scroll', function () {
      var current = '';
      sections.forEach(function (s) {
        if (window.pageYOffset >= s.offsetTop - 100) current = s.id;
      });
      navLinks.forEach(function (link) {
        link.style.color = link.getAttribute('href') === '#' + current ? 'var(--text)' : '';
      });
    }, { passive: true });

    /* ════════════════════════════════════════
       MODE TOGGLE
    ════════════════════════════════════════ */
    var isBusiness = false;

    function setMode(toBusiness) {
      isBusiness = toBusiness;

      document.documentElement.classList.toggle('biz-mode', toBusiness);

      var track = document.querySelector('.toggle-track');
      if (track) track.classList.toggle('business-mode', toBusiness);

      var lR = document.querySelector('.tl-r');
      var lB = document.querySelector('.tl-b');
      if (lR) lR.classList.toggle('active', !toBusiness);
      if (lB) lB.classList.toggle('active', toBusiness);

      document.querySelectorAll('.mode-r').forEach(function (el) {
        el.classList.toggle('hidden', toBusiness);
      });
      document.querySelectorAll('.mode-b').forEach(function (el) {
        el.classList.toggle('hidden', !toBusiness);
      });

      try { sessionStorage.setItem('siteMode', toBusiness ? 'business' : 'residential'); } catch (e) {}
    }

    window._setMode = setMode;

    var lR0 = document.querySelector('.tl-r');
    if (lR0) lR0.classList.add('active');

    var toggleEl = document.getElementById('modeToggle');
    if (toggleEl) {
      toggleEl.addEventListener('click', function (e) {
        e.stopPropagation();
        setMode(!isBusiness);
      });
    }

    var crosslink = document.getElementById('switchToBusiness');
    if (crosslink) {
      crosslink.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        setMode(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    try {
      if (sessionStorage.getItem('siteMode') === 'business') setMode(true);
    } catch (e) {}

  });

}());
