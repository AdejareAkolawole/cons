// Smooth Scrolling for Navigation
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

// Tab Switcher for Use Cases
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    document.querySelector(`button[onclick="showTab('${tabId}')"]`).classList.add('active');
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', function () {
    const heroSection = document.querySelector('.hero-section');
    const scrolled = window.pageYOffset;
    heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Sticky Header Effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll to Top Button and Floating CTA
const scrollToTopBtn = document.getElementById('scrollToTop');
const floatingCta = document.getElementById('floatingCta');
window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
        floatingCta.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
        floatingCta.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Typewriter Effect for Hero Headline
const typewriterElement = document.getElementById('typewriter');
const text = "People, Payroll and Payments Simplified";
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typewriterElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

window.addEventListener('load', typeWriter);

// Fetch Live USD/NGN Exchange Rate
async function fetchExchangeRate() {
    try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/acbd73a9340c6cb441af209a/latest/USD');
        const data = await response.json();
        const rate = data.conversion_rates.NGN;
        document.getElementById('exchangeRate').innerText = `₦${rate.toFixed(2)}`;
    } catch (error) {
        document.getElementById('exchangeRate').innerText = 'Unavailable';
        console.error('Error fetching exchange rate:', error);
    }
}

window.addEventListener('load', fetchExchangeRate);

// Initialize Particle.js
particlesJS('particles-js', {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: ['#facc15', '#2dd4bf'] },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#facc15', opacity: 0.2, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// 3D Globe Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globeCanvas').appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(5, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x2dd4bf, wireframe: true });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

camera.position.z = 10;

const animateGlobe = () => {
    requestAnimationFrame(animateGlobe);
    globe.rotation.y += 0.005;
    renderer.render(scene, camera);
};

animateGlobe();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Transaction Demo Animation
const startTransactionBtn = document.getElementById('startTransaction');
const transactionStatus = document.getElementById('transactionStatus');
const progressCircle = document.getElementById('progressCircle');

startTransactionBtn.addEventListener('click', () => {
    transactionStatus.innerText = 'Initiating Payment...';
    progressCircle.style.strokeDashoffset = '251';

    setTimeout(() => {
        transactionStatus.innerText = 'Processing Payment...';
        progressCircle.style.strokeDashoffset = '125';
    }, 1000);

    setTimeout(() => {
        transactionStatus.innerText = 'Payment Successful! 🎉';
        progressCircle.style.strokeDashoffset = '0';
    }, 3000);
});

// Voice-Activated Demo Mode
const voiceBtn = document.getElementById('voiceDemo');
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

voiceBtn.addEventListener('click', () => {
    recognition.start();
    voiceBtn.style.color = '#facc15';
});

recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    if (command.includes('show use cases')) {
        document.getElementById('usecases').scrollIntoView({ behavior: 'smooth' });
    } else if (command.includes('show testimonials')) {
        document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' });
    } else if (command.includes('show features')) {
        document.getElementById('mvp').scrollIntoView({ behavior: 'smooth' });
    }
    voiceBtn.style.color = '#fff';
};

recognition.onend = () => {
    voiceBtn.style.color = '#fff';
};

// Gamified Onboarding Pop-Up
const onboardingPopup = document.getElementById('onboardingPopup');
const skipPopupBtn = document.getElementById('skipPopup');
const taskText = document.getElementById('taskText');
const progressBar = document.getElementById('progress');
let taskIndex = 0;

const tasks = [
    { text: 'Task 1: Scroll to the Use Cases section', check: () => document.getElementById('usecases').getBoundingClientRect().top < window.innerHeight / 2 },
    { text: 'Task 2: Start a Mock Transaction', check: () => transactionStatus.innerText === 'Payment Successful! 🎉' },
    { text: 'Task 3: Toggle Dark Mode', check: () => document.body.classList.contains('dark-mode') }
];

window.addEventListener('load', () => {
    onboardingPopup.classList.add('active');
    taskText.innerText = tasks[taskIndex].text;
});

skipPopupBtn.addEventListener('click', () => {
    onboardingPopup.classList.remove('active');
});

window.addEventListener('scroll', checkTasks);
startTransactionBtn.addEventListener('click', checkTasks);
document.getElementById('themeToggle').addEventListener('click', checkTasks);

function checkTasks() {
    if (tasks[taskIndex].check()) {
        taskIndex++;
        progressBar.style.width = `${(taskIndex / tasks.length) * 100}%`;
        if (taskIndex < tasks.length) {
            taskText.innerText = tasks[taskIndex].text;
        } else {
            taskText.innerText = 'Congrats! Use code CONS5OFF for 5% off your first transaction (mock)!';
            setTimeout(() => onboardingPopup.classList.remove('active'), 3000);
        }
    }
}

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Intersection Observer for Fade-In Animations and Animated Underlines
const sections = document.querySelectorAll('.usecase-item, .testimonial-card, .mvp-card');
const headings = document.querySelectorAll('.usecases-section h2, .testimonials-section h2, .mvp-section h2, .transaction-section h2');

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            if (entry.target.tagName === 'H2') {
                entry.target.classList.add('visible');
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

headings.forEach(heading => {
    observer.observe(heading);
});