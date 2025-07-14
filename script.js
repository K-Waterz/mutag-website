// Enhanced Scroll and Navigation Scripts
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Scroll to top on page load (with smooth behavior)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Highlight current nav link with better matching
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
      try {
        const linkUrl = new URL(link.href, window.location.href);
        const linkPath = linkUrl.pathname;
        
        const normalizedCurrent = currentPath.replace(/\/$/, '');
        const normalizedLink = linkPath.replace(/\/$/, '');
        
        if (normalizedCurrent === normalizedLink || 
            (normalizedCurrent === '' && normalizedLink === '/') ||
            (normalizedCurrent.endsWith('index') && normalizedLink === '/')) {
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
        link.parentElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      });
    });

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