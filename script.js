// ================ GSAP ANIMATIONS ================
const MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function prefersReducedMotion() {
  return window.matchMedia(MOTION_QUERY).matches;
}

function shouldSkipScrollAnimation(element) {
  return element.hasAttribute('data-aos') || Boolean(element.closest('[data-aos]'));
}

function markRevealTarget(element) {
  if (element) {
    element.classList.add('scroll-reveal-target');
  }
}

function revealOnScroll(selector, options = {}) {
  if (prefersReducedMotion()) {
    return;
  }

  const { scrollTrigger: scrollTriggerOptions = {}, ...animationOptions } = options;
  const targets = gsap.utils.toArray(selector).filter((element) => !shouldSkipScrollAnimation(element));

  targets.forEach((element) => {
    markRevealTarget(element);

    gsap.from(element, {
      opacity: 0,
      y: 40,
      scale: 0.985,
      filter: 'blur(10px)',
      duration: 0.9,
      ease: 'power3.out',
      immediateRender: false,
      ...animationOptions,
      scrollTrigger: {
        trigger: element,
        start: 'top 86%',
        toggleActions: 'play none none none',
        once: true,
        ...scrollTriggerOptions
      },
      onComplete: function() {
        element.classList.add('is-revealed');
      }
    });
  });
}

function setupScrollReveals() {
  if (prefersReducedMotion()) {
    return;
  }

  revealOnScroll('.section-title, .section-subtitle, .cta-title, .cta-text, .about-hero h1, .about-hero .subheading, .services-hero h1, .services-hero .subheading, .portfolio-hero h1, .portfolio-hero .subheading', {
    y: 36
  });

  revealOnScroll('.text-content, .image-content', {
    y: 44
  });

  revealOnScroll('.about-section, .services-details, .contact-cta, .cta-section', {
    y: 48
  });

  const batchSelectors = [
    '.service-card',
    '.work-card',
    '.testimonial-card',
    '.portfolio-item',
    '.process-step',
    '.about-section .card',
    '.footer-content > div'
  ].join(', ');

  ScrollTrigger.batch(batchSelectors, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => {
      const targets = batch.filter((element) => !shouldSkipScrollAnimation(element));
      if (!targets.length) {
        return;
      }

      targets.forEach(markRevealTarget);

      gsap.from(targets, {
        opacity: 0,
        y: 36,
        scale: 0.985,
        filter: 'blur(8px)',
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        immediateRender: false,
        onComplete: function() {
          this.targets().forEach((target) => target.classList.add('is-revealed'));
        }
      });
    }
  });

  gsap.utils.toArray('.image-content img, .portfolio-media img, .about-section .image img').forEach((image) => {
    if (shouldSkipScrollAnimation(image)) {
      return;
    }

    gsap.to(image, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: image,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

function initAOS() {
  if (!document.querySelector('[data-aos]')) {
    return;
  }

  if (typeof AOS === 'undefined') {
    initAOS._tries = (initAOS._tries || 0) + 1;
    if (initAOS._tries > 120) {
      return;
    }
    setTimeout(initAOS, 100);
    return;
  }

  if (window.__mhAosInitialized) {
    if (typeof AOS.refresh === 'function') {
      AOS.refresh();
    }
    return;
  }

  window.__mhAosInitialized = true;

  // Match portfolio.html: do not use AOS.disable() here — Windows "Animations" off maps to
  // prefers-reduced-motion; we neutralize motion in style.css instead so scroll reveals still run.
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    mirror: false,
    anchorPlacement: 'top-bottom'
  });

  requestAnimationFrame(() => {
    if (typeof AOS !== 'undefined' && typeof AOS.refresh === 'function') {
      AOS.refresh();
    }
  });
}

// Wait for GSAP and DOM to be ready
let animationInitAttempts = 0;
const MAX_ANIMATION_INIT_ATTEMPTS = 80;

function initAnimations() {
  const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  if (!hasGsap) {
    animationInitAttempts += 1;

    if (animationInitAttempts < MAX_ANIMATION_INIT_ATTEMPTS) {
      setTimeout(initAnimations, 50);
      return;
    }

    if (document.querySelector('[data-aos]')) {
      initAOS();
    }

    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAnimations);
  } else {
    setupAnimations();
  }
}

function setupAnimations() {
  document.documentElement.classList.add('motion-ready');

  if (document.querySelector('[data-aos]')) {
    initAOS();
  }

  // ================ HEADER ANIMATION ================
  // Ensure header is visible first, then animate
  const header = document.getElementById('header') || document.querySelector('.header');
  if (header) {
    header.style.transform = 'translateY(0)';
    header.style.visibility = 'visible';
    header.style.opacity = '1';
    
    // Only animate if GSAP is available
    if (typeof gsap !== 'undefined') {
      gsap.from('.header', {
        y: -100,
        duration: 0.6,
        ease: 'power3.out',
        onComplete: function() {
          // Ensure header stays visible after animation
          if (header) {
            header.style.transform = 'translateY(0)';
          }
        }
      });
    }
  }

  // Header scroll effect
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ================ MOBILE MENU ================
  // Mobile menu is handled via inline script in HTML for maximum compatibility

  // ================ HERO ANIMATIONS ================
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroButton = document.querySelector('.hero-section .btn');

  if (!prefersReducedMotion()) {
    if (heroTitle) {
      markRevealTarget(heroTitle);
      gsap.from(heroTitle, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
        immediateRender: false
      });
    }

    if (heroSubtitle) {
      markRevealTarget(heroSubtitle);
      gsap.from(heroSubtitle, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4,
        immediateRender: false
      });
    }

    if (heroButton) {
      markRevealTarget(heroButton);
      gsap.from(heroButton, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.6,
        immediateRender: false
      });
    }
  }

  setupScrollReveals();

  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined' && typeof AOS.refresh === 'function') {
      AOS.refresh();
    }
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  });

  // ================ BUTTON HOVER MICRO-INTERACTIONS ================
  const buttons = document.querySelectorAll('.btn');

  if (!prefersReducedMotion()) {
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.02,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      });
    });
  }

  // ================ NAV LINK ACTIVE STATE ================
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '/' && linkPath === '/')) {
      link.classList.add('active');
    }
  });

  // ================ SMOOTH SCROLLING FOR ANCHOR LINKS ================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = header.offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ================ SET CURRENT YEAR ================
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ================ IMAGE LAZY LOADING ENHANCEMENT ================
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  // ================ FORM VALIDATION (if contact form exists) ================
  const contactForm = document.querySelector('form');
  if (contactForm && contactForm.action) {
    contactForm.addEventListener('submit', (e) => {
      const requiredFields = contactForm.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#ef4444';
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (!isValid) {
        e.preventDefault();
      }
    });
  }

  // ================ PERFORMANCE: Cleanup on page unload ================
  window.addEventListener('beforeunload', () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  });
}

// Initialize animations
initAnimations();

// ================ SAFETY: Ensure all content is visible even if GSAP fails ================
// This runs after a short delay to ensure content is visible even if GSAP doesn't load
setTimeout(() => {
  const animatedElements = document.querySelectorAll(
    '.hero-title, .hero-subtitle, .section, .cta-section, .service-card, .work-card, .testimonial-card, .text-content, .image-content, .services-details, .about-section, .portfolio-item, .process-step, .scroll-reveal-target'
  );

  animatedElements.forEach(el => {
    if (el && window.getComputedStyle(el).opacity === '0') {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      el.style.transform = 'none';
      el.style.filter = 'none';
    }
  });

  if (typeof gsap === 'undefined') {
    document.documentElement.classList.remove('motion-ready');
    console.warn('GSAP not loaded - ensuring all content is visible');
  }
}, 1000);

// ================ THEME DETECTION (if needed) ================
function detectAndSetTheme() {
  const STORAGE_KEY = 'mh-theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem(STORAGE_KEY);
  const html = document.documentElement;
  
  if (!saved) {
    if (prefersDark) {
      html.removeAttribute('data-theme');
    } else {
      html.setAttribute('data-theme', 'light');
    }
  }
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const currentSaved = localStorage.getItem(STORAGE_KEY);
    if (!currentSaved) {
      if (e.matches) {
        html.removeAttribute('data-theme');
      } else {
        html.setAttribute('data-theme', 'light');
      }
    }
  });
}

detectAndSetTheme();
