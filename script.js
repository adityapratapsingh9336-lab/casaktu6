/**
 * Centre for Advanced Studies
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. Theme Toggle Logic ---
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle i');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.classList.remove('ph-moon');
            themeIcon.classList.add('ph-sun');
        } else {
            themeIcon.classList.remove('ph-sun');
            themeIcon.classList.add('ph-moon');
        }
    }
    
    // --- 1. Cursor Glow Effect ---
    const cursorGlow = document.getElementById('cursor-glow');
    
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            // Use requestAnimationFrame for smoother performance
            requestAnimationFrame(() => {
                cursorGlow.style.left = `${e.clientX}px`;
                cursorGlow.style.top = `${e.clientY}px`;
            });
        });
        
        // Hide cursor glow when leaving the window
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursorGlow.style.opacity = '1';
        });
    }

    // --- 2. Sticky Navbar ---
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- 3. Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon between bars and times (assuming fontawesome or similar is used)
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('ph-list');
                    icon.classList.add('ph-x');
                } else {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            }
        });
    }

    // --- 4. Hero Slider (Home Page) ---
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        // Change slide every 4 seconds
        setInterval(nextSlide, 4000);
    }

    // --- 5. Simple Filtering Logic (Research/Events pages) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');
    
    if (filterBtns.length > 0 && filterItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                filterItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // Small timeout to allow display block to apply before animating opacity
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300); // Wait for transition
                    }
                });
            });
        });
    }

    // --- 6. Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-up, .timeline-container');
    
    if (revealElements.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    
                    if (target.classList.contains('timeline-container')) {
                        // Animate timeline line
                        const line = target.querySelector('.timeline-line');
                        if (line) line.style.height = '100%';
                        
                        // Animate timeline items sequentially
                        const items = target.querySelectorAll('.timeline-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('active');
                            }, index * 400 + 300); // 300ms initial delay, 400ms between items
                        });
                        
                        // Stop observing the timeline container once animated
                        observer.unobserve(target);
                    } else {
                        // Standard reveal-up elements
                        target.classList.add('active');
                        observer.unobserve(target);
                    }
                }
            });
        }, observerOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    }

});
