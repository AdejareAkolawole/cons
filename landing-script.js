document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const companyMenu = document.querySelector('.company-menu');
    const submenu = document.querySelector('.submenu');

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (!navLinks.classList.contains('active')) {
            companyMenu.classList.remove('active');
            submenu.classList.remove('active');
        }
    });

    // Company submenu toggle for mobile
    companyMenu.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            companyMenu.classList.toggle('active');
            submenu.classList.toggle('active');
        }
    });

    // Close mobile menu and submenu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                companyMenu.classList.remove('active');
                submenu.classList.remove('active');
            }
        });
    });

    // Close submenu when clicking non-Company links
    navLinks.querySelectorAll('li:not(.company-menu) a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                companyMenu.classList.remove('active');
                submenu.classList.remove('active');
            }
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
    const sectionHeaders = document.querySelectorAll('section h2');
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sectionHeaders.forEach(header => {
        observer.observe(header);
    });
});