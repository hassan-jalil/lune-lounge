// ==========================================
// PAGE TRANSITION & INITIAL LOAD ANIMATIONS
// ==========================================

// Add animation delay to hero content on page load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ==========================================
// SMOOTH SCROLL FUNCTION
// ==========================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==========================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ==========================================

const observerConfig = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: Stop observing after animation
            scrollAnimationObserver.unobserve(entry.target);
        }
    });
}, observerConfig);

// Observe all elements with fade-in classes
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in').forEach(element => {
    scrollAnimationObserver.observe(element);
});

// Observe card elements with staggered timing
const cardElements = document.querySelectorAll('.menu-item, .service, .gallery-item, .info-card');
cardElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
    scrollAnimationObserver.observe(element);
});

// ==========================================
// PARALLAX EFFECT
// ==========================================

window.addEventListener('scroll', (e) => {
    const scrollPosition = window.pageYOffset;
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
    
    // Parallax effect for hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && scrollPosition < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }
});

// ==========================================
// NAVBAR SCROLL EFFECTS
// ==========================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > scrollThreshold) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==========================================
// TEXT ANIMATION ON HOVER
// ==========================================

document.querySelectorAll('h1, h2, h3').forEach(heading => {
    heading.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'textSlide 0.5s ease-out';
        }, 10);
    });
});

// ==========================================
// INTERACTIVE BUTTON EFFECTS
// ==========================================

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    // Ripple effect
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = 'translate(-50%, -50%)';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        const animation = ripple.animate([
            { width: '0px', height: '0px', opacity: 1 },
            { width: '300px', height: '300px', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => ripple.remove();
    });
});

// ==========================================
// FORM SUBMISSION
// ==========================================

const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]')?.value;
        const email = contactForm.querySelector('input[type="email"]')?.value;
        const message = contactForm.querySelector('textarea')?.value;
        
        if (name && email && message) {
            // Add success animation
            const successMessage = document.createElement('div');
            successMessage.textContent = `Thank you for your message, ${name}! We'll get back to you soon.`;
            successMessage.style.cssText = `
                background: #4CAF50;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                margin-top: 1rem;
                animation: slideIn 0.5s ease-out;
            `;
            contactForm.appendChild(successMessage);
            contactForm.reset();
            
            setTimeout(() => {
                successMessage.style.animation = 'slideOut 0.5s ease-out forwards';
                setTimeout(() => successMessage.remove(), 500);
            }, 3000);
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// ==========================================
// ACTIVE NAVIGATION LINK HIGHLIGHT
// ==========================================

const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.style.color = 'var(--secondary-color)';
        } else {
            item.style.color = '#fff';
        }
    });
});

// ==========================================
// CLOSE MOBILE MENU ON SCROLL
// ==========================================

window.addEventListener('scroll', () => {
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
});

// ==========================================
// IMAGE LAZY LOADING WITH ANIMATION
// ==========================================

const images = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.animation = 'fadeIn 0.6s ease-out';
            observer.unobserve(img);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

images.forEach(img => {
    imageObserver.observe(img);
});

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--secondary-color, #d4a574);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: none;
    font-size: 1.2rem;
    z-index: 998;
    animation: slideUp 0.3s ease-out;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
        scrollToTopBtn.style.alignItems = 'center';
        scrollToTopBtn.style.justifyContent = 'center';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) rotate(180deg)';
    this.style.background = 'var(--primary-color, #2c1810)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) rotate(0deg)';
    this.style.background = 'var(--secondary-color, #d4a574)';
});

// ==========================================
// COFFEE ANIMATION - REMOVED
// ==========================================