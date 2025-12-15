// Portfolio JavaScript - Moussa Terap Ali

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Vanta.js network background
    initVantaBackground();
    
    // Initialize typed text animation
    initTypedText();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Initialize form handling
    initContactForm();
    
    // Initialize mobile menu
    initMobileMenu();
});

// Vanta.js Network Background
function initVantaBackground() {
    if (typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x00d4ff,
            backgroundColor: 0x0a0a0a,
            points: 10.00,
            maxDistance: 25.00,
            spacing: 18.00
        });
    }
}

// Typed Text Animation
function initTypedText() {
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'Développeur Full Stack',
                'Spécialiste Cybersécurité',
                'Expert Systèmes Embarqués',
                'Étudiant Ingénieur'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: false
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const width = bar.style.width || bar.classList[1]?.replace('w-', '') + 'px';
                bar.style.width = '0px';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    };

    // Animate on scroll
    window.addEventListener('scroll', animateSkillBars);
    // Animate on load
    setTimeout(animateSkillBars, 500);
}

// Contact Form Handling
function initContactForm() {
    const form = document.querySelector('#contact form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.nom || !data.email || !data.sujet || !data.message) {
                showNotification('Veuillez remplir tous les champs', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Veuillez entrer une adresse email valide', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message envoyé avec succès !', 'success');
            form.reset();
        });
    }
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-6 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span class="text-white font-medium">${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuButton = document.querySelector('nav button');
    const nav = document.querySelector('nav');
    
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            // Toggle mobile menu (simple implementation)
            const isOpen = nav.classList.contains('mobile-open');
            if (isOpen) {
                nav.classList.remove('mobile-open');
            } else {
                nav.classList.add('mobile-open');
            }
        });
    }
}

// Parallax Effect for Hero Section
function initParallax() {
    const hero = document.querySelector('#home');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Add parallax on load
window.addEventListener('load', initParallax);

// Dynamic Theme Switcher (Bonus Feature)
function initThemeSwitcher() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'fixed bottom-6 right-6 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-xl hover:bg-gray-700 transition-colors z-50';
    themeToggle.title = 'Toggle Theme';
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        themeToggle.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    });
    
    document.body.appendChild(themeToggle);
}

// Initialize theme switcher
// initThemeSwitcher(); // Uncomment to enable theme switching

// Loading Animation
function initLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'fixed inset-0 bg-black z-50 flex items-center justify-center';
    loader.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-white font-mono">Chargement...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }, 1000);
    });
}

// Initialize loading animation
// initLoadingAnimation(); // Uncomment to enable loading screen

// Performance Optimization
function initPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Scroll-based animations here
        }, 16); // ~60fps
    });
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize performance optimizations
initPerformanceOptimizations();

// Console Easter Egg
console.log(`
%c🚀 Portfolio de Moussa Terap Ali
%cDéveloppeur Full Stack • Cybersécurité • Systèmes Embarqués

Contact: almot10@ulaval.ca | 438-995-1010
LinkedIn: https://www.linkedin.com/in/moussa-terap-ali-a50239174/

%cCode avec ❤️ en 2025`, 
'color: #00d4ff; font-size: 18px; font-weight: bold;',
'color: #ffffff; font-size: 14px;',
'color: #888888; font-size: 12px;'
);