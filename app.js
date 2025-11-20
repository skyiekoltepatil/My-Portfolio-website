// Smooth Scrolling
const navLinks = document.querySelectorAll('.nav-link, .mobile-link, .footer-links a');
const body = document.body;

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                const hamburger = document.getElementById('hamburger');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    body.style.overflow = '';
                    // Scroll after menu animation completes
                    setTimeout(() => {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }, 320);
                } else {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });
});

// Mobile Menu Toggle with Staggered Animation
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.contains('active');
    
    if (!isActive) {
        // Opening menu
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        body.style.overflow = 'hidden';
    } else {
        // Closing menu
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
        
        // Reset animations for next open
        const menuLinks = mobileMenu.querySelectorAll('.mobile-link');
        const menuNumbers = mobileMenu.querySelectorAll('.mobile-link-number');
        const socialLinks = mobileMenu.querySelector('.mobile-social-links');
        
        menuLinks.forEach(link => {
            link.style.animation = 'none';
        });
        menuNumbers.forEach(number => {
            number.style.animation = 'none';
        });
        if (socialLinks) {
            socialLinks.style.animation = 'none';
        }
        
        // Reapply animations after a brief delay
        setTimeout(() => {
            menuLinks.forEach(link => {
                link.style.animation = '';
            });
            menuNumbers.forEach(number => {
                number.style.animation = '';
            });
            if (socialLinks) {
                socialLinks.style.animation = '';
            }
        }, 50);
    }
});

// Close mobile menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
    }
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.classList.remove('hidden');
                // Stagger animation
                setTimeout(() => {
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 10);
                }, index * 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Project Details Toggle
const viewDetailsButtons = document.querySelectorAll('.view-details');
viewDetailsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.project-card');
        const details = card.querySelector('.project-details');
        
        details.classList.toggle('expanded');
        
        if (details.classList.contains('expanded')) {
            button.textContent = 'Hide Details';
        } else {
            button.textContent = 'View Details';
        }
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hero Buttons Smooth Scroll
const heroButtons = document.querySelectorAll('.hero-buttons a');
heroButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Typing Animation for Hero Subtitle
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let charIndex = 0;
    
    function typeCharacter() {
        if (charIndex < text.length) {
            typingText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeCharacter, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeCharacter, 500);
}

// Add stagger animation to project cards on page load
window.addEventListener('load', () => {
    const visibleCards = document.querySelectorAll('.project-card:not(.hidden)');
    visibleCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});


// --- PARTICLE ANIMATION (Cosmos/Starry Night) ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particlesArray;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mouse Interaction Object
let mouse = {
    x: null,
    y: null,
    radius: 150 // Interaction radius
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Reset mouse position when it leaves the window
window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});

// Handle resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Create Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // INCREASED SIZE: Random size between 1px and 5px
        this.size = Math.random() * 4 + 1; 
        this.speedX = (Math.random() * 1) - 0.5; // Slightly faster movement
        this.speedY = (Math.random() * 1) - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2; 
        this.density = (Math.random() * 30) + 1; // Density defines how heavy/reactive the particle is
    }
    update() {
        // MOUSE INTERACTION LOGIC
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.radius;
            const force = (maxDistance - distance) / maxDistance;
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;
            
            // Move away from mouse
            this.x -= directionX;
            this.y -= directionY;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    const numberOfParticles = 150; // Adjust for density
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

// Start animation
init();
animate();