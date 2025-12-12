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
  // Mobile menu is handled via inline script in HTML for maximum compatibility

  // ================ HERO ANIMATIONS ================
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroButton = document.querySelector('.hero-section .btn');
  
  // Ensure elements are visible first
  if (heroTitle) {
    heroTitle.style.opacity = '1';
    heroTitle.style.visibility = 'visible';
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
    heroSubtitle.style.opacity = '1';
    heroSubtitle.style.visibility = 'visible';
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
    heroButton.style.opacity = '1';
    heroButton.style.visibility = 'visible';
    gsap.from(heroButton, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.6,
      immediateRender: false
    });
  }

  // ================ SECTION FADE-INS ON SCROLL ================
  const sections = document.querySelectorAll('.section, .cta-section');
  
  sections.forEach((section, index) => {
    // Ensure section is visible first
    section.style.opacity = '1';
    section.style.visibility = 'visible';
    
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
        onEnter: () => {
          section.style.opacity = '1';
          section.style.visibility = 'visible';
        }
      }
    });
  });

  // ================ SERVICE CARDS ANIMATION ================
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach((card, index) => {
    // Ensure card is visible first
    card.style.opacity = '1';
    card.style.visibility = 'visible';
    
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
      delay: index * 0.1,
      immediateRender: false,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
        onEnter: () => {
          card.style.opacity = '1';
          card.style.visibility = 'visible';
        }
      }
    });
  });

  // ================ WORK CARDS ANIMATION ================
  const workCards = document.querySelectorAll('.work-card');
  
  workCards.forEach((card, index) => {
    // Ensure card is visible first
    card.style.opacity = '1';
    card.style.visibility = 'visible';
    
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
      delay: index * 0.1,
      immediateRender: false,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
        onEnter: () => {
          card.style.opacity = '1';
          card.style.visibility = 'visible';
        }
      }
    });
  });

  // ================ TESTIMONIAL CARDS ANIMATION ================
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  
  testimonialCards.forEach((card, index) => {
    // Ensure card is visible first
    card.style.opacity = '1';
    card.style.visibility = 'visible';
    
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
      delay: index * 0.15,
      immediateRender: false,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
        onEnter: () => {
          card.style.opacity = '1';
          card.style.visibility = 'visible';
        }
      }
    });
  });

  // ================ TWO COLUMN ANIMATIONS ================
  const textContent = document.querySelector('.text-content');
  const imageContent = document.querySelector('.image-content');
  
  if (textContent) {
    textContent.style.opacity = '1';
    textContent.style.visibility = 'visible';
    gsap.from(textContent, {
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: textContent,
        start: 'top 80%',
        toggleActions: 'play none none none',
        onEnter: () => {
          textContent.style.opacity = '1';
          textContent.style.visibility = 'visible';
        }
      }
    });
  }
  
  if (imageContent) {
    imageContent.style.opacity = '1';
    imageContent.style.visibility = 'visible';
    gsap.from(imageContent, {
      opacity: 0,
      x: 30,
      duration: 0.8,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: imageContent,
        start: 'top 80%',
        toggleActions: 'play none none none',
        onEnter: () => {
          imageContent.style.opacity = '1';
          imageContent.style.visibility = 'visible';
        }
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

// ================ SAFETY: Ensure all content is visible even if GSAP fails ================
// This runs after a short delay to ensure content is visible even if GSAP doesn't load
setTimeout(() => {
  // Make sure all potentially animated elements are visible
  const animatedElements = document.querySelectorAll(
    '.hero-title, .hero-subtitle, .section, .cta-section, .service-card, .work-card, .testimonial-card, .text-content, .image-content, .services-details, .about-section'
  );
  
  animatedElements.forEach(el => {
    if (el && window.getComputedStyle(el).opacity === '0') {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
    }
  });
  
  // Check if GSAP loaded, if not, ensure all content is visible
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded - ensuring all content is visible');
    document.querySelectorAll('*').forEach(el => {
      const computed = window.getComputedStyle(el);
      if (computed.opacity === '0' && !el.classList.contains('hidden') && !el.hasAttribute('hidden')) {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      }
    });
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
