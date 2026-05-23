// Tarun SM — Portfolio script.js
// Replaces original script.js in portfolio-website repo

document.addEventListener('DOMContentLoaded', () => {

  // ── Dark / Light Mode ─────────────────────
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');

  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  themeIcon.className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeIcon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  });

  // ── Mobile Navigation ─────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const spans     = hamburger.querySelectorAll('span');

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    spans[0].style.transform  = open ? 'rotate(45deg) translate(5px, 5px)'  : '';
    spans[1].style.opacity    = open ? '0' : '';
    spans[2].style.transform  = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  // ── Smooth Scroll ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 68;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });

  // ── Scroll: header shadow + back-to-top ───
  const header    = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    const y = window.scrollY;
    header.style.boxShadow = y > 40
      ? '0 1px 0 var(--border)'
      : 'none';
    backToTop.classList.toggle('visible', y > 450);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Active nav link on scroll ─────────────
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a');

  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navAs.forEach(a => {
        const match = a.getAttribute('href') === `#${id}`;
        a.classList.toggle('active', match);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(s => sectionObs.observe(s));

  // ── Scroll-reveal animation ────────────────
  const revealTargets = document.querySelectorAll(
    '.project-item, .exp-card, .cert-item, .skill-block, ' +
    '.about-text, .about-sidebar, .info-card, ' +
    '.contact-left, .contact-right, .hero-numbers'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      // stagger siblings slightly
      const delay = (i % 4) * 70;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  revealTargets.forEach(el => revealObs.observe(el));

});
