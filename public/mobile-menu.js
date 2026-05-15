/**
 * Shared mobile nav toggle for .mobile-menu-toggle + .nav-menu.
 * Runs once per page; safe if included multiple times.
 */
(function () {
  'use strict';

  if (window.__mhMobileMenuBound) {
    return;
  }

  function closeMenu(toggleBtn, menu) {
    if (!toggleBtn || !menu) {
      return;
    }
    toggleBtn.classList.remove('active');
    menu.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function tryBind() {
    var toggleBtn =
      document.getElementById('mobile-menu-toggle') || document.querySelector('.mobile-menu-toggle');
    var menu = document.querySelector('.nav-menu');
    if (!toggleBtn || !menu) {
      return false;
    }

    window.__mhMobileMenuBound = true;

    function toggleMenu(e) {
      if (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      }
      var isOpen = menu.classList.contains('active');
      if (isOpen) {
        closeMenu(toggleBtn, menu);
      } else {
        toggleBtn.classList.add('active');
        menu.classList.add('active');
        toggleBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
      return false;
    }

    var newToggle = toggleBtn.cloneNode(true);
    toggleBtn.parentNode.replaceChild(newToggle, toggleBtn);
    toggleBtn = newToggle;

    toggleBtn.onclick = toggleMenu;
    toggleBtn.ontouchend = function (ev) {
      if (ev.preventDefault) ev.preventDefault();
      toggleMenu(ev);
      return false;
    };

    try {
      toggleBtn.addEventListener('click', toggleMenu, { capture: true, passive: false });
      toggleBtn.addEventListener('touchend', toggleMenu, { capture: true, passive: false });
    } catch (err) {
      /* ignore */
    }

    toggleBtn.style.pointerEvents = 'auto';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.position = 'relative';
    toggleBtn.style.zIndex = '1001';

    var links = menu.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        closeMenu(toggleBtn, menu);
      });
    }

    document.addEventListener('click', function (e) {
      if (
        menu.classList.contains('active') &&
        !menu.contains(e.target) &&
        !toggleBtn.contains(e.target)
      ) {
        closeMenu(toggleBtn, menu);
      }
    });

    return true;
  }

  function schedule() {
    if (tryBind()) {
      return;
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function onReady() {
        document.removeEventListener('DOMContentLoaded', onReady);
        if (!tryBind()) {
          requestAnimationFrame(function () {
            if (!tryBind()) {
              setTimeout(tryBind, 120);
            }
          });
        }
      });
    } else {
      requestAnimationFrame(function () {
        if (!tryBind()) {
          setTimeout(tryBind, 120);
        }
      });
    }
  }

  schedule();
})();
