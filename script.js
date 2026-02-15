// ============================================
// Anshad K Portfolio — Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initNavbar();
    initMobileMenu();
    initHeroCanvas();
    initTypingEffect();
    initTimelineTabs();
    initStatCounter();
    initGSAPAnimations();
    initSmoothScroll();
    initActiveNavOnScroll();
});

// --- Custom Cursor ---
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    if (!cursor || !follower) return;

    // Check for touch device
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .btn, .project-card, .skill-chip, .tab-btn, .social-card, .feature-card');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
            follower.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
            follower.classList.remove('hovering');
        });
    });

    // Hide on leave
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });
}

// --- Navbar scroll effect ---
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const onScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// --- Mobile Menu ---
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const navItems = document.getElementById('navItems');
    const overlay = document.getElementById('mobileOverlay');
    if (!menuBtn || !navItems) return;

    function toggleMenu() {
        menuBtn.classList.toggle('active');
        navItems.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        document.body.style.overflow = navItems.classList.contains('active') ? 'hidden' : '';
    }

    menuBtn.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // Close menu on link click
    navItems.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navItems.classList.contains('active')) toggleMenu();
        });
    });
}

// --- Global Particle Canvas ---
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    let animFrame;
    const PARTICLE_COUNT = 90;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.6;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        animFrame = requestAnimationFrame(animate);
    }
    animate();
}

// --- Typing Effect ---
function initTypingEffect() {
    const roleText = document.getElementById('roleText');
    if (!roleText) return;

    const roles = [
        'Robotics Engineer',
        'Mechatronics Innovator',
        'VLSI Researcher',
        'EdTech Founder',
        'AI Enthusiast'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const current = roles[roleIndex];

        if (isDeleting) {
            roleText.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            roleText.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            typingSpeed = 2000; // pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

// --- Timeline Tabs ---
function initTimelineTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const timelines = document.querySelectorAll('.timeline');
    if (tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const target = tab.getAttribute('data-tab');
            timelines.forEach(tl => {
                tl.classList.remove('active');
                if (tl.id === 'timeline-' + target) {
                    tl.classList.add('active');
                }
            });
        });
    });
}

// --- Stat Counter Animation ---
function initStatCounter() {
    const stats = document.querySelectorAll('.stat-number[data-target]');
    if (stats.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                animateCount(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateCount(el, target) {
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 40);
}

// --- GSAP Animations ---
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    const heroTl = gsap.timeline({ delay: 0.3 });
    heroTl
        .fromTo('.hero-badge', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', clearProps: 'all' })
        .fromTo('.hero-name .line-reveal', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', clearProps: 'all' }, '-=0.3')
        .fromTo('.hero-roles', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', clearProps: 'all' }, '-=0.3')
        .fromTo('.hero-tagline', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', clearProps: 'all' }, '-=0.2')
        .fromTo('.hero-cta .btn', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power3.out', clearProps: 'all' }, '-=0.2')
        .fromTo('.hero-socials a', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.08, ease: 'power3.out', clearProps: 'all' }, '-=0.2')
        .fromTo('.scroll-indicator', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', clearProps: 'all' }, '-=0.1');

    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out'
        });
    });

    // About
    gsap.from('.about-image-wrapper', {
        scrollTrigger: { trigger: '.about-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
        x: -50, opacity: 0, duration: 0.8, ease: 'power3.out'
    });

    gsap.from('.about-text', {
        scrollTrigger: { trigger: '.about-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
        x: 50, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out'
    });

    gsap.from('.stat', {
        scrollTrigger: { trigger: '.about-stats', start: 'top 90%', toggleActions: 'play none none reverse' },
        y: 30, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out'
    });

    // Timeline cards
    gsap.utils.toArray('.timeline-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
            x: -30, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out'
        });
    });

    // Project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
            y: 40, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out'
        });
    });

    // Skill categories
    gsap.utils.toArray('.skill-category').forEach((cat, i) => {
        gsap.from(cat, {
            scrollTrigger: { trigger: cat, start: 'top 85%', toggleActions: 'play none none reverse' },
            y: 30, opacity: 0, duration: 0.5, delay: i * 0.08, ease: 'power3.out'
        });
    });

    // Publication cards
    gsap.utils.toArray('.publication-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
            y: 30, opacity: 0, duration: 0.6, delay: i * 0.12, ease: 'power3.out'
        });
    });

    // Elmentrix
    gsap.from('.elmentrix-hero', {
        scrollTrigger: { trigger: '.elmentrix-hero', start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out'
    });

    gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
            y: 30, opacity: 0, duration: 0.5, delay: i * 0.1, ease: 'power3.out'
        });
    });

    // Contact
    gsap.from('.contact-text', {
        scrollTrigger: { trigger: '.contact-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
        x: -40, opacity: 0, duration: 0.7, ease: 'power3.out'
    });

    gsap.from('.contact-elmentrix', {
        scrollTrigger: { trigger: '.contact-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
        x: 40, opacity: 0, duration: 0.7, delay: 0.2, ease: 'power3.out'
    });
}

// --- Smooth Scroll ---
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// --- Active Nav Link on Scroll ---
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

    sections.forEach(section => observer.observe(section));
}
