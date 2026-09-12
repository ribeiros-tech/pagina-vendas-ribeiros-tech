(() => {
  'use strict';

  // ========================================
  // HEADER — SCROLL STATE
  // ========================================
  const header = document.getElementById('header');

  const onScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // ========================================
  // MOBILE MENU
  // ========================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

  const openMenu = () => {
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.classList.add('is-active');
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('is-active');
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.getAttribute('aria-hidden') === 'false';
    isOpen ? closeMenu() : openMenu();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ========================================
  // SMOOTH SCROLL
  // ========================================
  const scrollTo = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const offset = header.offsetHeight + 16;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const href = a.getAttribute('href');
      if (href && href !== '#') scrollTo(href);
    });
  });

  // ========================================
  // ACTIVE NAV LINK ON SCROLL
  // ========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__nav-link');

  const updateActiveLink = () => {
    const pos = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop - header.offsetHeight;
      const h = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (pos >= top && pos < top + h) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // ========================================
  // INTERSECTION OBSERVER — FADE-UP
  // ========================================
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const runAnimations = () => {
    const els = document.querySelectorAll('[data-animate]');
    if (reducedMotion.matches) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.delay || '0', 10);
        setTimeout(() => entry.target.classList.add('is-visible'), delay);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => io.observe(el));
  };

  runAnimations();

  // ========================================
  // FAQ ACCORDION
  // ========================================
  document.querySelectorAll('.faq__item').forEach(item => {
    const btn = item.querySelector('.faq__question');

    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('is-open');

      // close all
      document.querySelectorAll('.faq__item').forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq__answer').setAttribute('aria-hidden', 'true');
      });

      // toggle current
      if (!wasOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        item.querySelector('.faq__answer').setAttribute('aria-hidden', 'false');
      }
    });
  });

  // ========================================
  // CHECKOUT — PREPARADO PARA CAKTO
  // ========================================
  const CHECKOUT_URL = '#'; // Substituir pelo link do checkout da Cakto

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', e => {
      e.preventDefault();
      if (CHECKOUT_URL !== '#') {
        window.open(CHECKOUT_URL, '_blank', 'noopener,noreferrer');
      } else {
        scrollTo('#contratar');
      }
    });
  }

   // ========================================
  // CHECKOUT — PREPARADO PARA CAKTO
  // ========================================
  const CHECKOUT_URL = '#';

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', e => {
      e.preventDefault();
      if (CHECKOUT_URL !== '#') {
        window.open(CHECKOUT_URL, '_blank', 'noopener,noreferrer');
      } else {
        scrollTo('#planos');
      }
    });
  }

})();
