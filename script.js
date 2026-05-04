// ====== LOADER ======
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => loader.classList.add('hidden'), 500);
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
// Close nav on link click
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
        // rotate chevron
        const chevron = dropdownToggle.querySelector('.fa-chevron-down');
        if (chevron) chevron.style.transform = dropdownMenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
    });
    // Close when clicking a CV item
    dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            dropdownMenu.classList.remove('open');
            const chevron = dropdownToggle.querySelector('.fa-chevron-down');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
        });
    });
    // Close when clicking anywhere else
    document.addEventListener('click', () => {
        dropdownMenu.classList.remove('open');
        const chevron = dropdownToggle.querySelector('.fa-chevron-down');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
    });
}

// ====== HEADER SCROLL ======
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    highlightActiveNav();
});

// ====== ACTIVE NAV HIGHLIGHT ======
function highlightActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

// ====== SCROLL REVEAL ANIMATIONS ======
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in, .fade-up, .slide-left, .slide-right').forEach(el => {
    revealObserver.observe(el);
});

// ====== TYPING ANIMATION ======
const typedEl = document.getElementById('typed-text');
const words = ['Web Security', 'Penetration Testing', 'React Development', 'Backend APIs'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typedEl) return;
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typedEl.textContent = currentWord.slice(0, --charIndex);
    } else {
        typedEl.textContent = currentWord.slice(0, ++charIndex);
    }

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1600; // pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 300;
    }

    setTimeout(type, speed);
}
type();

// ====== COUNTER ANIMATION ======
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.target >= 100 ? '+' : (target > 1 ? '+' : '+');
    const duration = 1800;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current) + '+';
        }
    }, stepTime);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

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

        // "read" point = 55% down the viewport
        const viewportRead = window.innerHeight * 0.55;
        // how far the read point has traveled into the timeline from its top
        const traveled = viewportRead - rect.top;
        // clamp between 0 and the full height of the timeline
        const clamped = Math.max(0, Math.min(totalHeight, traveled));

        ball.style.top = clamped + 'px';
    });
}

window.addEventListener('scroll', updateTimelineBalls, { passive: true });
updateTimelineBalls(); // run once on page load
