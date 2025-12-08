// Enhanced Scroll and Navigation Scripts
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Enhanced device theme detection - Works with existing theme system
    function detectAndSetTheme() {
      const STORAGE_KEY = 'mh-theme';
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const saved = localStorage.getItem(STORAGE_KEY);
      const html = document.documentElement;
      
      // Only set device preference if no manual override exists
      if (!saved) {
        if (prefersDark) {
          html.removeAttribute('data-theme'); // Dark is default
        } else {
          html.setAttribute('data-theme', 'light');
        }
      }
      
      // Listen for system theme changes (only update if no manual preference set)
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
    
    // Initialize theme detection
    detectAndSetTheme();

    // Enhanced mobile video autoplay handling for elevate video
    function ensureVideoAutoplay() {
      const videos = document.querySelectorAll('.elevate-video');
      videos.forEach(video => {
        if (video) {
          // Force play on mobile devices
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log('Auto-play prevented, attempting fallback:', error);
              // Fallback: try to play when user interacts
              document.addEventListener('touchstart', () => {
                video.play().catch(() => {});
              }, { once: true });
            });
          }
          
          // Ensure video is muted for autoplay compliance
          video.muted = true;
          
          // Add error handling
          video.addEventListener('error', (e) => {
            console.log('Video error:', e);
          });
        }
      });
    }

    // Initialize video autoplay
    ensureVideoAutoplay();

    // Scroll to top on page load (with smooth behavior)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (isActive) {
          document.body.classList.add('menu-open');
          document.body.style.overflow = 'hidden';
          document.body.style.position = 'fixed';
          document.body.style.width = '100%';
        } else {
          document.body.classList.remove('menu-open');
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
        }
      });
      
      // Close menu when clicking on a nav link
      const navLinks = navMenu.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
          document.body.classList.remove('menu-open');
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
        });
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
          document.body.classList.remove('menu-open');
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
        }
      });
      
      // Close menu on window resize if it's open
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
          document.body.classList.remove('menu-open');
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
        }
      });
    }

    // Highlight current nav link with better matching
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-menu a, nav a");

    navLinks.forEach(link => {
      try {
        const linkUrl = new URL(link.href, window.location.href);
        const linkPath = linkUrl.pathname;
        
        const normalizedCurrent = currentPath.replace(/\/$/, '');
        const normalizedLink = linkPath.replace(/\/$/, '');
        
        if (normalizedCurrent === normalizedLink || 
            (normalizedCurrent === '' && normalizedLink === '/') ||
            (normalizedCurrent.endsWith('index') && normalizedLink === '/') ||
            (normalizedCurrent === '/index.html' && normalizedLink === '/')) {
          link.classList.add("active");
        }
      } catch (e) {
        console.warn("Invalid link URL:", link.href);
      }
    });

    // Enhanced smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        
        const target = document.querySelector(targetId);
        if (target) {
          // Calculate header height for proper offset
          const header = document.querySelector("header");
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
          
          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, targetId);
          } else {
            window.location.hash = targetId;
          }
        }
      });
    });

    // Enhanced navbar shrink on scroll with requestAnimationFrame
    let lastScrollPosition = 0;
    let ticking = false;
    const header = document.querySelector("header");
    
    if (header) {
      window.addEventListener("scroll", () => {
        lastScrollPosition = window.scrollY;
        
        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (lastScrollPosition > 60) {
              header.classList.add("scrolled", "header-scrolled");
            } else {
              header.classList.remove("scrolled", "header-scrolled");
            }
            ticking = false;
          });
          ticking = true;
        }
      });

      // Initialize header state
      if (window.scrollY > 60) {
        header.classList.add("scrolled", "header-scrolled");
      }
    }

    // Add focus styles for keyboard navigation
    navLinks.forEach(link => {
      link.addEventListener("focus", () => {
        if (link.parentElement) {
          link.parentElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest'
          });
        }
      });
    });
    
    // 3D Scene Parallax Effect
    const hero3d = document.querySelector('.hero-3d');
    if (hero3d) {
      window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 20;
        const y = (clientY / innerHeight - 0.5) * 20;
        hero3d.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
      });
    }

  } catch (error) {
    console.error("Initialization error:", error);
  }
});

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatableElements = document.querySelectorAll(".animate-on-scroll");
  animatableElements.forEach(section => {
    observer.observe(section);
  });
}

// Initialize when DOM is fully loaded
if (document.readyState === 'complete') {
  initScrollAnimations();
} else {
  window.addEventListener("load", initScrollAnimations);
}