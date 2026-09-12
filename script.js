(() => {
  'use strict';

  // ========================================
  // HEADER — SCROLL STATE
  // ========================================
  const header = document.getElementById('header');

  if (header) {
    const onScroll = () => {
      header.classList.toggle('header--scrolled', window.scrollY > 40);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ========================================
  // MOBILE MENU
  // ========================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll(
      '.mobile-menu__link, .mobile-menu__cta'
    );

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
  }

  // ========================================
  // SMOOTH SCROLL
  // ========================================
  const scrollTo = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return;

    const offset = header ? header.offsetHeight + 16 : 16;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  };

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');

      if (href && href !== '#') {
        event.preventDefault();
        scrollTo(href);
      }
    });
  });

  // ========================================
  // ACTIVE NAV LINK
  // ========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__nav-link');

  const updateActiveLink = () => {
    const headerHeight = header ? header.offsetHeight : 0;
    const pos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop - headerHeight;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (pos >= top && pos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // ========================================
  // INTERSECTION OBSERVER — FADE UP
  // ========================================
  const elements = document.querySelectorAll('[data-animate]');
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  if (reducedMotion.matches) {
    elements.forEach(element => {
      element.classList.add('is-visible');
    });
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const delay = parseInt(
          entry.target.dataset.delay || '0',
          10
        );

        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);

        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(element => observer.observe(element));
  } else {
    elements.forEach(element => {
      element.classList.add('is-visible');
    });
  }

  // ========================================
  // FAQ ACCORDION
  // ========================================
  document.querySelectorAll('.faq__item').forEach(item => {
    const button = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    if (!button || !answer) return;

    button.addEventListener('click', () => {
      const wasOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq__item').forEach(other => {
        other.classList.remove('is-open');

        const otherButton = other.querySelector('.faq__question');
        const otherAnswer = other.querySelector('.faq__answer');

        if (otherButton) {
          otherButton.setAttribute('aria-expanded', 'false');
        }

        if (otherAnswer) {
          otherAnswer.setAttribute('aria-hidden', 'true');
        }
      });

      if (!wasOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
        answer.setAttribute('aria-hidden', 'false');
      }
    });
  });

})();
