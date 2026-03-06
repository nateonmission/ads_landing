/* ============================================================
   Allen Data Services — app.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll-based nav shadow ──────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 40
      ? 'rgba(13, 15, 20, 0.98)'
      : 'rgba(13, 15, 20, 0.85)';
  }, { passive: true });

  // ── Fade-up on scroll ────────────────────────────────────
  const fadeEls = document.querySelectorAll(
    '.service-card, .why-item, .contact-card, .about-text p, .cert-badge, .about-links'
  );

  fadeEls.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings in same parent
        const siblings = [...entry.target.parentElement.querySelectorAll('.fade-up')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => observer.observe(el));

  // ── Smooth anchor scroll ─────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Terminal typewriter effect ───────────────────────────
  const terminalLines = document.querySelectorAll('.t-line');
  const terminalWrap = document.querySelector('.why-terminal');

  if (terminalWrap) {
    let terminalAnimated = false;

    const terminalObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !terminalAnimated) {
        terminalAnimated = true;
        terminalLines.forEach((line, i) => {
          line.style.opacity = '0';
          setTimeout(() => {
            line.style.transition = 'opacity 0.3s ease';
            line.style.opacity = '1';
          }, i * 220);
        });
      }
    }, { threshold: 0.3 });

    terminalObserver.observe(terminalWrap);
    // Hide lines initially
    terminalLines.forEach(l => l.style.opacity = '0');
  }

  // ── Active nav link highlight ────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${current}`
        ? 'var(--text)'
        : '';
    });
  }, { passive: true });

});
