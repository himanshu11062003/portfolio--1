/* ====================================================
   GSAP + Lenis powered portfolio script
   ==================================================== */

// ====== LENIS SMOOTH SCROLL ======
const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
});

// Tick Lenis with GSAP
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// ====== NAV SMOOTH SCROLL (Lenis) ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -72, duration: 1.6 });
        }
    });
});

// ====== REGISTER SCROLLTRIGGER ======
gsap.registerPlugin(ScrollTrigger);

// Keep ScrollTrigger in sync with Lenis
lenis.on('scroll', ScrollTrigger.update);

// ====== LOADER ======
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    gsap.to(loader, {
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
        ease: 'power2.out',
        onComplete: () => { loader.style.display = 'none'; }
    });

    // Hero entrance animation
    const tl = gsap.timeline({ delay: 0.6 });
    tl.from('.greeting',      { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' })
      .from('.hero-title',    { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .from('.typing-wrapper',{ y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .from('.hero-socials',  { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .from('.dropdown',      { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .from('.hero-img',      { x: 60, opacity: 0, duration: 1,   ease: 'power3.out' }, '-=0.9');
});

// ====== MOBILE TOGGLE ======
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');
mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// ====== CV DROPDOWN CLICK TOGGLE ======
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('open');
        const chevron = dropdownToggle.querySelector('.fa-chevron-down');
        if (chevron) chevron.style.transform = dropdownMenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
    });
    dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            dropdownMenu.classList.remove('open');
            const chevron = dropdownToggle.querySelector('.fa-chevron-down');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
        });
    });
    document.addEventListener('click', () => {
        dropdownMenu.classList.remove('open');
        const chevron = dropdownToggle.querySelector('.fa-chevron-down');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
    });
}

// ====== HEADER SCROLL ======
const header = document.querySelector('header');
ScrollTrigger.create({
    start: 'top -50',
    onUpdate: (self) => {
        header.classList.toggle('scrolled', self.scroll() > 50);
    }
});

// ====== ACTIVE NAV HIGHLIGHT ======
document.querySelectorAll('section[id]').forEach(section => {
    ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: ()    => setActiveLink(section.id),
        onEnterBack: ()=> setActiveLink(section.id),
    });
});
function setActiveLink(id) {
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) link.classList.add('active');
}

// ====== GSAP SCROLL REVEAL ANIMATIONS ======

// Section titles
gsap.utils.toArray('.section-title').forEach(el => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
    });
});

// About glass card
gsap.from('.about-glass', {
    scrollTrigger: { trigger: '.about-glass', start: 'top 85%', toggleActions: 'play none none none' },
    x: 60, opacity: 0, duration: 1, ease: 'power3.out'
});

// Skill cards — stagger
gsap.from('.skill-card', {
    scrollTrigger: { trigger: '.skills-grid', start: 'top 85%', toggleActions: 'play none none none' },
    y: 50, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
});

// Timeline items
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    const fromX = item.classList.contains('left') ? -60 : 60;
    gsap.from(item.querySelector('.timeline-content'), {
        scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' },
        x: fromX, opacity: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out'
    });
});

// Project cards — stagger
gsap.from('.project-card', {
    scrollTrigger: { trigger: '.projects-grid', start: 'top 85%', toggleActions: 'play none none none' },
    y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
});

// Achievement cards — stagger
gsap.from('.achievement-card', {
    scrollTrigger: { trigger: '.achievements-grid', start: 'top 85%', toggleActions: 'play none none none' },
    scale: 0.85, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)'
});

// Cert cards — stagger
gsap.from('.cert-card', {
    scrollTrigger: { trigger: '.certs-grid', start: 'top 85%', toggleActions: 'play none none none' },
    y: 40, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'power2.out'
});

// Contact section
gsap.from('.contact-info', {
    scrollTrigger: { trigger: '.contact-container', start: 'top 85%', toggleActions: 'play none none none' },
    x: -60, opacity: 0, duration: 0.9, ease: 'power3.out'
});
gsap.from('.contact-form', {
    scrollTrigger: { trigger: '.contact-container', start: 'top 85%', toggleActions: 'play none none none' },
    x: 60, opacity: 0, duration: 0.9, ease: 'power3.out'
});

// ====== TYPING ANIMATION ======
const typedEl = document.getElementById('typed-text');
const words = ['Web Security', 'Penetration Testing', 'React Development', 'Backend APIs'];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    if (!typedEl) return;
    const currentWord = words[wordIndex];
    typedEl.textContent = isDeleting
        ? currentWord.slice(0, --charIndex)
        : currentWord.slice(0, ++charIndex);

    let speed = isDeleting ? 60 : 100;
    if (!isDeleting && charIndex === currentWord.length) { speed = 1600; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; speed = 300; }
    setTimeout(type, speed);
}
type();

// ====== COUNTER ANIMATION (GSAP) ======
document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target);
    ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.to({ val: 0 }, {
                val: target,
                duration: 2,
                ease: 'power2.out',
                onUpdate: function () {
                    el.textContent = Math.round(this.targets()[0].val) + '+';
                }
            });
        }
    });
});

// ====== TIMELINE SCROLL BALL ======
function updateTimelineBalls() {
    const pairs = [
        { timeline: document.getElementById('exp-timeline'), ball: document.getElementById('exp-ball') },
        { timeline: document.getElementById('edu-timeline'), ball: document.getElementById('edu-ball') }
    ];
    pairs.forEach(({ timeline, ball }) => {
        if (!timeline || !ball) return;
        const rect = timeline.getBoundingClientRect();
        const totalHeight = timeline.offsetHeight;
        const viewportRead = window.innerHeight * 0.55;
        const traveled = viewportRead - rect.top;
        const clamped = Math.max(0, Math.min(totalHeight, traveled));
        ball.style.top = clamped + 'px';
    });
}
lenis.on('scroll', updateTimelineBalls);
updateTimelineBalls();

// ====== CONTACT FORM (Netlify AJAX) ======
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        btn.disabled = true;
        btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        const formData = new FormData(form);
        try {
            await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString(),
            });
            form.reset();
            const toast = document.getElementById('toast-notification');
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 5000);
        } catch (err) {
            alert('Something went wrong. Please try again.');
        } finally {
            btn.disabled = false;
            btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        }
    });
}
