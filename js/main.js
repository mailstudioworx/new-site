/* ============================================
   African Photos & Videos - Main JavaScript
   Responsive Navigation & Accessibility
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initDropdowns();
    initAccessibility();
});

/* ============================================
   Mobile Navigation Toggle
   ============================================ */

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', navToggle.classList.contains('active'));
        });
    }

    // Close menu when a link is clicked
    const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', false);
        });
    });
}

/* ============================================
   Mobile Dropdown Menus
   ============================================ */

function initDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const dropdownMenu = this.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                dropdownMenu.classList.toggle('active');
                this.setAttribute('aria-expanded', dropdownMenu.classList.contains('active'));
            }
        });
    });

    // Close dropdowns when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.has-dropdown')) {
            dropdownToggles.forEach(toggle => {
                toggle.nextElementSibling?.classList.remove('active');
                toggle.setAttribute('aria-expanded', false);
            });
        }
    });

    // Keyboard navigation for dropdowns
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const dropdownMenu = this.nextElementSibling;
                if (dropdownMenu) {
                    dropdownMenu.classList.remove('active');
                    this.setAttribute('aria-expanded', false);
                }
            }
        });
    });
}

/* ============================================
   Accessibility Enhancements
   ============================================ */

function initAccessibility() {
    // Ensure all interactive elements are keyboard accessible
    const interactiveElements = document.querySelectorAll('a, button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (this.tagName === 'A' && !this.href.includes('#')) {
                    // Links handle themselves
                    return;
                }
                if (this.tagName === 'BUTTON') {
                    this.click();
                }
            }
        });
    });

    // Skip to main content link
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const main = document.querySelector('main');
            if (main) {
                main.focus();
                main.scrollIntoView();
            }
        });
    }
}

/* ============================================
   Lazy Loading Images (Future Enhancement)
   ============================================ */

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/* ============================================
   Utility: Close Mobile Menu on Resize
   ============================================ */

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', false);
        }
    }
});

/* ============================================
   Smooth Scroll Enhancement (Fallback)
   ============================================ */

if (!CSS.supports('scroll-behavior', 'smooth')) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
