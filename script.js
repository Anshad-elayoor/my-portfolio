// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observe all section content
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
        section.classList.add('scroll-trigger');
        observer.observe(section);
    });
});

// Custom cursor with gear rotation
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let lastX = 0;
let lastY = 0;
let isMoving = false;
let moveTimeout;

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';

    // Check if mouse is moving
    const currentX = e.clientX;
    const currentY = e.clientY;
    const hasMovement = currentX !== lastX || currentY !== lastY;

    if (hasMovement && !isMoving) {
        isMoving = true;
        cursor.classList.add('moving');
        cursorFollower.classList.add('moving');
    }

    // Reset the timeout on each movement
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
        isMoving = false;
        cursor.classList.remove('moving');
        cursorFollower.classList.remove('moving');
    }, 100);

    lastX = currentX;
    lastY = currentY;
});

// Hide cursor when leaving the window
document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
});

document.addEventListener('mouseenter', () => {
    cursor.style.display = 'flex';
    cursorFollower.style.display = 'flex';
});

// Animated text rotation
const textRotate = () => {
    const secText = document.querySelector('.sec-text');
    if (!secText) return; // Guard clause to prevent errors if element doesn't exist
    
    const texts = ["Mechatronics Engineer", "Innovator", "Tech Enthusiast"];
    let currentIndex = 0;
    
    const textLoad = () => {
        secText.textContent = texts[currentIndex];
        currentIndex = (currentIndex + 1) % texts.length;
    }
    
    textLoad(); // Initial load
    const interval = setInterval(textLoad, 4000);
    
    // Cleanup interval when navigating away
    return () => clearInterval(interval);
}

// GSAP Animations
const initAnimations = () => {
    // Hero section animations
    gsap.from('.hero-text', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power4.out'
    });

    // Scroll animations
    gsap.registerPlugin(ScrollTrigger);

    // About section
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about-image',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.5,
        x: -100,
        opacity: 0,
        ease: 'power4.out'
    });

    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.5,
        x: 100,
        opacity: 0,
        ease: 'power4.out'
    });

    // Work items
    gsap.utils.toArray('.work-item').forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power4.out'
        });
    });

    // Contact section
    gsap.from('.contact-text', {
        scrollTrigger: {
            trigger: '.contact-text',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power4.out'
    });

    gsap.from('.company-info', {
        scrollTrigger: {
            trigger: '.company-info',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power4.out'
    });
}

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navItems = document.querySelector('.nav-items');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navItems.classList.toggle('active');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        if (menuBtn.classList.contains('active')) {
            menuBtn.classList.remove('active');
            navItems.classList.remove('active');
        }
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cleanup = textRotate();
    initAnimations();
    
    // Cleanup on page unload
    window.addEventListener('unload', () => {
        if (cleanup) cleanup();
    });
}); 