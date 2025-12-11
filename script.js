// ================ GSAP ANIMATIONS ================
// Wait for GSAP and DOM to be ready
function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    setTimeout(initAnimations, 50);
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAnimations);
  } else {
    setupAnimations();
  }
}

function setupAnimations() {
  // ================ HEADER ANIMATION ================
  // Ensure header is visible first, then animate
  const header = document.querySelector('.header');
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
  let lastScroll = 0;
  const header = document.getElementById('header') || document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // ================ MOBILE MENU ================
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isActive = mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('.nav-link, .nav-cta');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ================ HERO ANIMATIONS ================
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroButton = document.querySelector('.hero-section .btn');
  
  if (heroTitle) {
    gsap.from(heroTitle, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2
    });
  }
  
  if (heroSubtitle) {
    gsap.from(heroSubtitle, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.4
    });
  }
  
  if (heroButton) {
    gsap.from(heroButton, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.6
    });
  }

  // ================ SECTION FADE-INS ON SCROLL ================
  const sections = document.querySelectorAll('.section, .cta-section');
  
  sections.forEach((section, index) => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ================ SERVICE CARDS ANIMATION ================
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
      delay: index * 0.1,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ================ WORK CARDS ANIMATION ================
  const workCards = document.querySelectorAll('.work-card');
  
  workCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
      delay: index * 0.1,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ================ TESTIMONIAL CARDS ANIMATION ================
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  
  testimonialCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
      delay: index * 0.15,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ================ TWO COLUMN ANIMATIONS ================
  const textContent = document.querySelector('.text-content');
  const imageContent = document.querySelector('.image-content');
  
  if (textContent) {
    gsap.from(textContent, {
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: textContent,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }
  
  if (imageContent) {
    gsap.from(imageContent, {
      opacity: 0,
      x: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: imageContent,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }

  // ================ BUTTON HOVER MICRO-INTERACTIONS ================
  const buttons = document.querySelectorAll('.btn');
  
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
