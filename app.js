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


/* =========================================
   SKYIE AI CHATBOT LOGIC
   ========================================= */

const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWidget = document.getElementById('chatbot-widget');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatSuggestions = document.getElementById('chat-suggestions');

// Toggle Chatbot
chatbotToggle.addEventListener('click', () => {
    chatbotWidget.classList.toggle('active');
    chatbotToggle.classList.toggle('active');
    
    // Check for mobile to hide toggle button
    if (window.innerWidth <= 480 && chatbotWidget.classList.contains('active')) {
        chatbotToggle.classList.add('hidden-mobile');
    } else {
        chatbotToggle.classList.remove('hidden-mobile');
    }

    if (chatbotWidget.classList.contains('active')) {
        setTimeout(() => chatbotInput.focus(), 300);
    }
});

// Close Chatbot
chatbotClose.addEventListener('click', () => {
    chatbotWidget.classList.remove('active');
    chatbotToggle.classList.remove('active');
    chatbotToggle.classList.remove('hidden-mobile');
});

// Send Message Logic
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Function to handle suggestions click
window.sendSuggestion = function(text) {
    chatbotInput.value = text;
    sendMessage();
}

function sendMessage() {
    const text = chatbotInput.value.trim();
    if (text === '') return;

    // Add User Message
    addMessage(text, 'user');
    chatbotInput.value = '';
    
    // Hide suggestions after first interaction
    if (chatSuggestions) {
        chatSuggestions.style.display = 'none';
    }

    // Simulate Bot Typing
    showTypingIndicator();

    // Generate Response (Simulated AI)
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateResponse(text);
        addMessage(response, 'bot');
    }, 1500); // 1.5s delay for realism
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender, 'fade-in-msg');
    
    let avatarHTML = '';
    if (sender === 'bot') {
        avatarHTML = '<div class="chat-avatar">@</div>';
    }

    messageDiv.innerHTML = `
        ${avatarHTML}
        <div class="chat-bubble">
            <div class="chat-text">${text}</div>
        </div>
    `;
    
    // Insert before suggestions if they exist and are visible, otherwise append
    if (chatSuggestions && chatSuggestions.parentNode === chatbotMessages && chatSuggestions.style.display !== 'none') {
        chatbotMessages.insertBefore(messageDiv, chatSuggestions);
    } else {
        chatbotMessages.appendChild(messageDiv);
    }
    
    scrollToBottom();
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('chat-message', 'bot', 'typing-indicator-msg');
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="chat-avatar">@</div>
        <div class="chat-bubble">
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    if (chatSuggestions && chatSuggestions.parentNode === chatbotMessages && chatSuggestions.style.display !== 'none') {
        chatbotMessages.insertBefore(typingDiv, chatSuggestions);
    } else {
        chatbotMessages.appendChild(typingDiv);
    }
    scrollToBottom();
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Simple "AI" Logic - Keyword Matching
function generateResponse(input) {
    input = input.toLowerCase();

    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
        return "Hello there! 👋 I'm Skyie's AI assistant. How can I help you today?";
    }
    
    if (input.includes('project') || input.includes('work') || input.includes('portfolio')) {
        return "Skyie has worked on some amazing projects! 🚀 From Tech Startup Promos to Sales Forecasting Dashboards. Check out the 'Work' section to see them all!";
    }

    if (input.includes('video') || input.includes('edit') || input.includes('premiere')) {
        return "Video editing is one of Skyie's core skills! 🎬 Expert in Premiere Pro, After Effects, and DaVinci Resolve. Need a promo or documentary edited? Skyie is your guy!";
    }

    if (input.includes('data') || input.includes('science') || input.includes('python') || input.includes('analysis')) {
        return "Skyie is passionate about Data Science! 📊 proficient in Python, Pandas, Plotly, and Machine Learning. He's built tools for sentiment analysis and sales forecasting.";
    }

    if (input.includes('contact') || input.includes('email') || input.includes('reach') || input.includes('hire')) {
        return "You can reach Skyie at 📧 thatskyie7@gmail.com. He is always open to discussing new projects and opportunities!";
    }
    
    if (input.includes('skill') || input.includes('stack') || input.includes('technologies')) {
        return "Skyie's tech stack includes Python, JavaScript, HTML/CSS for code, and the Adobe Suite (Premiere, AE) + DaVinci for video. A perfect blend of logic and creativity! 🎨💻";
    }

    if (input.includes('about') || input.includes('who')) {
        return "Skyie is a 17-year-old Video Editor & Data Science student at Alard University, Pune. He loves cricket, gaming, and exploring AI technology.";
    }

    // Default response
    return "That's an interesting question! While I'm just a bot, I'd suggest contacting Skyie directly at thatskyie7@gmail.com for more specific details. 😊";
}

/* =========================================
   3D PROFILE CARD HOVER LOGIC
   ========================================= */

const profileCard = document.getElementById('profileCard3D');
if (profileCard) {
    const cardInner = profileCard.querySelector('.card-inner');

    profileCard.addEventListener('mousemove', (e) => {
        // Force the card to stay in "active" mode by removing transition
        cardInner.classList.remove('reset-transition');

        const rect = profileCard.getBoundingClientRect();
        
        // Calculate mouse position relative to center of card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate rotation (max +/- 15 degrees)
        // RotateY: Mouse Left -> Rotate Negative (Left goes back? No, standard 3D is other way)
        // Let's implement standard "Follow Mouse" tilt
        
        // Horizontal tilt (RotateY):
        // If mouse is on left (x < width/2), we want left side to push BACK (rotateY negative) or come FRONT (rotateY positive)?
        // "Look at mouse" effect: Mouse Left -> Left side tilts back (away). This is standard CSS rotateY negative.
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / centerX) * 15; // Max 15deg
        
        // Vertical tilt (RotateX):
        // Mouse Top -> Top pushes back. (rotateX positive)
        const rotateX = -((y - centerY) / centerY) * 15; // Max 15deg (inverted because positive rotateX tilts top BACK)

        cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    profileCard.addEventListener('mouseleave', () => {
        // Add transition back for smooth reset
        cardInner.classList.add('reset-transition');
        cardInner.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });

    profileCard.addEventListener('mouseenter', () => {
        cardInner.classList.remove('reset-transition');
    });
}