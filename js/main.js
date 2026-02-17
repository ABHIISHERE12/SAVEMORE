/* SaveMore - Platform Logic & Interactions */

document.addEventListener('DOMContentLoaded', () => {
    /* 1. Auth State Management Simulation */
    const authGroups = document.querySelectorAll('.auth-group');
    const logoutBtn = document.getElementById('logout-btn');
    const nav = document.querySelector('.nav');

    const updateAuthStateUI = () => {
        const isLoggedIn = localStorage.getItem('savemore_isLoggedIn') === 'true';
        
        authGroups.forEach(group => {
            const state = group.getAttribute('data-auth-state');
            if (isLoggedIn) {
                if (state === 'logged-in') {
                    group.style.display = group.classList.contains('cta-glass-card') ? 'block' : 'flex';
                } else {
                    group.style.display = 'none';
                }
            } else {
                if (state === 'logged-out') {
                    group.style.display = group.classList.contains('cta-glass-card') ? 'block' : 'flex';
                } else {
                    group.style.display = 'none';
                }
            }
        });
    };

    // Footer Cursor Glow
    const footer = document.querySelector('.footer');
    const footerGlow = document.createElement('div');
    footerGlow.className = 'footer-glow';
    if (footer) {
        footer.appendChild(footerGlow);
        footer.addEventListener('mousemove', (e) => {
            const rect = footer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            footerGlow.style.left = `${x}px`;
            footerGlow.style.top = `${y}px`;
        });
    }

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('savemore_isLoggedIn');
            window.location.href = 'index.html';
        });
    }

    // Initial UI Update
    updateAuthStateUI();

    /* 2. Hero Interactive Mockup - Multi-Layer Parallax */
    const heroContainer = document.getElementById('hero-parallax-container');
    const layers = document.querySelectorAll('.parallax-layer');
    
    if (heroContainer) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPercent = (clientX / innerWidth - 0.5);
            const yPercent = (clientY / innerHeight - 0.5);
            
            layers.forEach(layer => {
                let speed = 20; // default
                if (layer.classList.contains('layer-main')) speed = 15;
                if (layer.classList.contains('layer-goal')) speed = 40;
                if (layer.classList.contains('layer-streak')) speed = 30;
                if (layer.classList.contains('layer-blob-1')) speed = 10;
                if (layer.classList.contains('layer-blob-2')) speed = 12;

                const xMove = xPercent * speed;
                const yMove = yPercent * speed;
                
                // Add slight rotation to main card
                if (layer.classList.contains('layer-main')) {
                    const xRot = yPercent * -10;
                    const yRot = xPercent * 10;
                    layer.style.transform = `translate3d(${xMove}px, ${yMove}px, 0) rotateX(${xRot}deg) rotateY(${yRot}deg)`;
                } else {
                    layer.style.transform = `translate3d(${xMove}px, ${yMove}px, 0)`;
                }
            });
        });
    }

    /* 3. Scroll Reveal Animation */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    /* 4. Smooth Anchor Scrolling */
    /* 5. Testimonial Carousel Logic */
    const carouselSection = document.querySelector('.testimonial-carousel');
    if (carouselSection) {
        const slides = Array.from(carouselSection.querySelectorAll('.testimonial-slide'));
        const indicators = Array.from(carouselSection.querySelectorAll('.carousel-indicator'));
        let currentSlideIndex = 0;
        let slideInterval;

        const updateCarousel = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));
            
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
            currentSlideIndex = index;
        };

        const nextSlide = () => {
            let nextIndex = (currentSlideIndex + 1) % slides.length;
            updateCarousel(nextIndex);
        };

        const startAutoPlay = () => {
            slideInterval = setInterval(nextSlide, 5000); // Change every 5 seconds
        };

        const stopAutoPlay = () => {
            clearInterval(slideInterval);
        };

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                updateCarousel(index);
                stopAutoPlay();
                startAutoPlay(); // Restart timer on manual click
            });
        });

        carouselSection.addEventListener('mouseenter', stopAutoPlay);
        carouselSection.addEventListener('mouseleave', startAutoPlay);

        // Initial Start
        startAutoPlay();
    }
});
