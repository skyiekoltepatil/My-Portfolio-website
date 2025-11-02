// Smooth Scrolling
const navLinks = document.querySelectorAll('.nav-link, .mobile-link, .footer-links a');
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
const body = document.body;

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



// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm.querySelectorAll('.form-input');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    const errorMessage = field.parentElement.querySelector('.error-message');
    
    if (value === '') {
        field.classList.add('error');
        errorMessage.textContent = 'This field is required';
        errorMessage.classList.add('show');
        return false;
    }
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            errorMessage.textContent = 'Please enter a valid email';
            errorMessage.classList.add('show');
            return false;
        }
    }
    
    field.classList.remove('error');
    errorMessage.classList.remove('show');
    return true;
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        }, 2000);
    }
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

// 3D Profile Card - Mouse Tracking & Tilt Effect
const profileCard3D = document.getElementById('profileCard3D');

if (profileCard3D && window.innerWidth > 1024) {
    let isHovering = false;
    let animationFrame = null;
    
    // Smooth animation values
    const smoothness = 0.15;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentPointerX = 50;
    let currentPointerY = 50;
    let targetPointerX = 50;
    let targetPointerY = 50;
    
    function updateCardTransform() {
        // Smoothly interpolate values
        currentRotateX += (targetRotateX - currentRotateX) * smoothness;
        currentRotateY += (targetRotateY - currentRotateY) * smoothness;
        currentPointerX += (targetPointerX - currentPointerX) * smoothness;
        currentPointerY += (targetPointerY - currentPointerY) * smoothness;
        
        // Apply transforms
        profileCard3D.style.setProperty('--rotate-x', `${currentRotateX}deg`);
        profileCard3D.style.setProperty('--rotate-y', `${currentRotateY}deg`);
        profileCard3D.style.setProperty('--pointer-x', `${currentPointerX}%`);
        profileCard3D.style.setProperty('--pointer-y', `${currentPointerY}%`);
        
        // Calculate opacity based on distance from center
        const distanceFromCenter = Math.sqrt(
            Math.pow(currentPointerX - 50, 2) + Math.pow(currentPointerY - 50, 2)
        );
        const opacity = Math.min(distanceFromCenter / 50, 1);
        profileCard3D.style.setProperty('--card-opacity', opacity);
        
        // Continue animation loop while hovering
        if (isHovering) {
            animationFrame = requestAnimationFrame(updateCardTransform);
        }
    }
    
    profileCard3D.addEventListener('mouseenter', () => {
        isHovering = true;
        profileCard3D.classList.add('active');
        updateCardTransform();
    });
    
    profileCard3D.addEventListener('mouseleave', () => {
        isHovering = false;
        profileCard3D.classList.remove('active');
        
        // Reset to center
        targetRotateX = 0;
        targetRotateY = 0;
        targetPointerX = 50;
        targetPointerY = 50;
        profileCard3D.style.setProperty('--card-opacity', '0');
        
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    });
    
    profileCard3D.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        
        const rect = profileCard3D.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate percentage position
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        
        // Calculate rotation (inverted for natural feel)
        const rotateY = ((percentX - 50) / 50) * 5; // -5 to 5 degrees
        const rotateX = ((percentY - 50) / 50) * -5; // -5 to 5 degrees
        
        // Update target values
        targetRotateX = rotateX;
        targetRotateY = rotateY;
        targetPointerX = percentX;
        targetPointerY = percentY;
    });
    
    // Initial animation on page load
    setTimeout(() => {
        profileCard3D.style.setProperty('--card-opacity', '0');
    }, 100);
}

// Disable 3D effects on mobile/tablet
if (window.innerWidth <= 1024 && profileCard3D) {
    profileCard3D.style.setProperty('--card-opacity', '0');
}