// Configuration object for easy asset swapping
const siteConfig = {
    brandName: 'Demo Brand',
    tagline: 'Premium Nail Salon',
    contact: {
        address: '123 Beauty Street\nSalon City, SC 12345',
        phone: '(555) 123-4567',
        email: 'info@demobrand.com',
        hours: 'Mon-Fri: 9AM-7PM\nSat: 9AM-6PM\nSun: 10AM-5PM'
    },
    services: [
        {
            name: 'Classic Manicure',
            description: 'Professional nail care with classic polish application',
            price: '$35',
            image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop'
        },
        {
            name: 'Gel Nails',
            description: 'Long-lasting gel manicure that stays perfect for weeks',
            price: '$45',
            image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=300&fit=crop'
        },
        {
            name: 'Custom Nail Art',
            description: 'Unique handcrafted designs tailored to your style',
            price: '$55',
            image: 'https://images.unsplash.com/photo-1556227834-09f1de7b9771?w=400&h=300&fit=crop'
        },
        {
            name: 'Acrylic Extensions',
            description: 'Durable acrylic nails for length and strength',
            price: '$50',
            image: 'https://images.unsplash.com/photo-1521649415036-659258dc424f?w=400&h=300&fit=crop'
        }
    ],
    heroSlides: [
        {
            title: 'Premium Nail Art',
            description: 'Professional nail services with luxurious handcrafted designs',
            buttonText: 'Book Now',
            image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop'
        },
        {
            title: 'Summer Collection',
            description: 'Bold, vibrant designs perfect for any occasion',
            buttonText: 'Explore',
            image: 'https://images.unsplash.com/photo-1599948113225-9b5d9c0b6de6?w=800&h=600&fit=crop'
        }
    ],
    galleryImages: [
        'https://images.unsplash.com/photo-1610992015762-45dca7a9d2d2?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1602165832549-1b2d7d529f8d?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1609075909503-eeb20b6e9d7e?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1599948113225-9b5d9c0b6de6?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=400&fit=crop'
    ]
};

// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentSlide = 0;

// Mobile navigation toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Hero slider functionality
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Slider controls
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Auto-play slider
setInterval(nextSlide, 5000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    this.reset();
});

// Gallery lightbox functionality
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${this.src}" alt="${this.alt}">
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Add lightbox styles
        const style = document.createElement('style');
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
            }
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            .lightbox-content img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 30px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
        
        // Close lightbox
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.className === 'lightbox-close') {
                document.body.removeChild(lightbox);
                document.head.removeChild(style);
            }
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .gallery-item, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize the site with config
function initSite() {
    // Update brand name
    document.querySelector('.logo h1').textContent = siteConfig.brandName;
    document.title = `${siteConfig.brandName} - ${siteConfig.tagline}`;
    
    // This function can be extended to dynamically update content
    // based on the siteConfig object for easy customization
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initSite);