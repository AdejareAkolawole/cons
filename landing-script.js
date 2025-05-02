document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeButton = document.querySelector('.mobile-menu-close');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    const sectionHeaders = document.querySelectorAll('section h2');

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    // Close mobile menu
    closeButton.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Close menu when clicking a menu item
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Section header animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sectionHeaders.forEach(header => {
        observer.observe(header);
    });
});