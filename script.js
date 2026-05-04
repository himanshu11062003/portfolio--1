document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileToggle) {
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 3. Sticky Navbar & Active Link Update on Scroll
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // 4. Typing Effect for Hero Subtitle
    const typeTarget = document.querySelector('.type-text');
    if (typeTarget) {
        const role = 'Cyber Security Analyst & Full Stack Developer';
        let charIndex = 0;
        let typingDelay = 100;

        function type() {
            typeTarget.textContent = role.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex < role.length) {
                setTimeout(type, typingDelay);
            }
        }

        setTimeout(type, 2000); // Start typing after loader
    }

    // 5. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Uncomment to animate only once
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // 6. Netlify Form AJAX Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

            const formData = new FormData(contactForm);

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
            .then(() => {
                btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                contactForm.reset();
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 3000);
            })
            .catch((error) => {
                btn.innerHTML = 'Error! Try Again <i class="fas fa-times"></i>';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 3000);
            });
        });
    }
});
