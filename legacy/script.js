// ============================================
// Anshad K Portfolio — Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
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
    initGallery();
});

// --- Premium Loader — Image Slideshow ---
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    // Pool of 30 robotics/tech images
    const imagePool = [
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&q=80',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80',
        'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=1920&q=80',
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80',
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1920&q=80',
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920&q=80',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80',
        'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&q=80',
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80',
        'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1920&q=80',
        'https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=1920&q=80',
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1920&q=80',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80',
        'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1920&q=80',
        'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1920&q=80',
        'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1920&q=80',
        'https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=1920&q=80',
        'https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=1920&q=80',
        'https://images.unsplash.com/photo-1562408590-e32931084e23?w=1920&q=80',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80',
        'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=1920&q=80',
        'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1920&q=80',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&q=80',
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1920&q=80',
        'https://images.unsplash.com/photo-1509475826633-fed577a2c71b?w=1920&q=80',
        'https://images.unsplash.com/photo-1511376777868-611b54f68947?w=1920&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
        'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1920&q=80',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80',
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&q=80'
    ];

    // Randomly select 6 images
    const shuffled = imagePool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 6);

    // Inject selected images into the DOM
    const container = document.getElementById('loaderImages');
    selected.forEach(url => {
        const div = document.createElement('div');
        div.className = 'loader-img';
        div.style.backgroundImage = `url('${url}')`;
        container.appendChild(div);
    });

    const images = container.querySelectorAll('.loader-img');
    const bar = document.getElementById('loaderBar');
    const nameFirst = loader.querySelector('.loader-name-first');
    const nameLast = loader.querySelector('.loader-name-last');

    // Lock scroll
    document.body.classList.add('loading');

    const tl = gsap.timeline({
        onComplete: () => {
            document.body.classList.remove('loading');
            loader.remove();
        }
    });

    // 1. Fade in the name
    tl.to(nameFirst, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
    })
        .to(nameLast, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out'
        }, '-=0.3');

    // 2. Loading bar fills over 3 seconds
    tl.to(bar, {
        width: '100%',
        duration: 3,
        ease: 'power1.inOut'
    }, 0);

    // 3. Cycle through 6 images — each with a unique entrance animation
    const entranceEffects = [
        // Zoom in from center
        { scale: 1.3, x: 0, y: 0, rotation: 0, filter: 'blur(0px)' },
        // Slide from left
        { scale: 1, x: -100, y: 0, rotation: 0, filter: 'blur(0px)' },
        // Slide from right
        { scale: 1, x: 100, y: 0, rotation: 0, filter: 'blur(0px)' },
        // Slide from bottom
        { scale: 1, x: 0, y: 80, rotation: 0, filter: 'blur(0px)' },
        // Rotate + scale
        { scale: 1.2, x: 0, y: 0, rotation: 3, filter: 'blur(0px)' },
        // Blur reveal
        { scale: 1.05, x: 0, y: 0, rotation: 0, filter: 'blur(12px)' }
    ];

    images.forEach((img, i) => {
        const startTime = 0.5 * i;
        const fx = entranceEffects[i % entranceEffects.length];

        // Set initial state based on entrance effect
        gsap.set(img, {
            scale: fx.scale,
            x: fx.x,
            y: fx.y,
            rotation: fx.rotation,
            filter: fx.filter
        });

        // Animate in
        tl.to(img, {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotation: 0,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'power2.out'
        }, startTime);

        // Animate out (except last image)
        if (i < images.length - 1) {
            tl.to(img, {
                opacity: 0,
                scale: i % 2 === 0 ? 0.95 : 1.05,
                duration: 0.2,
                ease: 'power1.in'
            }, startTime + 0.4);
        }
    });

    // 4. After 3s — fade out name and slide loader away
    tl.to([nameFirst, nameLast], {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in'
    }, 3.2);

    tl.to(loader, {
        yPercent: -100,
        duration: 0.7,
        ease: 'power4.inOut'
    }, 3.4);
}

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
            this.opacity = Math.random() * 0.15 + 0.05;
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
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.02 * (1 - dist / 150)})`;
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

    // Gallery items
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none reverse' },
            scale: 0.9, opacity: 0, duration: 0.6, delay: i * 0.08, ease: 'power3.out'
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

// --- Gallery Lightbox ---
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImage = document.querySelector('.gallery-modal-image');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const galleryImages = Array.from(galleryItems).map(item => item.querySelector('img').src);

    // Open modal
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Navigation
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        showImage(currentIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            showImage(currentIndex);
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            showImage(currentIndex);
        } else if (e.key === 'Escape') {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    function showImage(index) {
        modalImage.src = galleryImages[index];
        modalImage.style.opacity = '0';
        setTimeout(() => {
            modalImage.style.transition = 'opacity 0.3s ease';
            modalImage.style.opacity = '1';
        }, 50);
    }
}
