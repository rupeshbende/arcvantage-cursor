// Main JavaScript for ArcVantage Design Studios

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScrolling();
    initializeProjectGallery();
    initializeContactForm();
    initializeScrollEffects();
    initializeLazyLoading();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Project Gallery functionality
function initializeProjectGallery() {
    const projectsGrid = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.project-modal .modal-close');
    const modalBody = document.querySelector('.project-modal .modal-body');

    // Load projects data
    loadProjects();

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filter);
        });
    });

    // Modal close functionality
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            projectModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });
}

// Load projects from JSON file
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback to sample projects if JSON file doesn't exist
        displaySampleProjects();
    }
}

// Display projects in the grid
function displayProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);
    
    card.innerHTML = `
        <div class="project-image">
            <img src="images/projects/${project.images[0]}" alt="${project.title}" loading="lazy">
        </div>
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <span class="project-category">${project.category}</span>
        </div>
    `;
    
    // Add click event to open modal
    card.addEventListener('click', function() {
        openProjectModal(project);
    });
    
    return card;
}

// Filter projects
function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-in';
        } else {
            card.style.display = 'none';
        }
    });
}

// Open project modal
function openProjectModal(project) {
    const projectModal = document.getElementById('project-modal');
    const modalBody = document.querySelector('.project-modal .modal-body');
    
    modalBody.innerHTML = `
        <div class="project-modal-content">
            <div class="project-modal-images">
                ${project.images.map(img => `
                    <img src="images/projects/${img}" alt="${project.title}" loading="lazy">
                `).join('')}
            </div>
            <div class="project-modal-info">
                <h2>${project.title}</h2>
                <p class="project-location">${project.location}</p>
                <p class="project-description">${project.fullDescription}</p>
                <div class="project-features">
                    <h4>Key Features:</h4>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="project-meta">
                    <span class="project-category">${project.category}</span>
                    <span class="project-date">Completed: ${new Date(project.completionDate).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    `;
    
    projectModal.style.display = 'block';
}

// Sample projects for fallback
function displaySampleProjects() {
    const sampleProjects = [
        {
            id: '1',
            title: 'Serenity Heights Residence',
            category: 'residential',
            description: 'A modern home featuring innovative arc-based design elements that create flowing, harmonious living spaces.',
            fullDescription: 'This stunning residential project showcases our expertise in arc-based design. The home features curved walls, arched doorways, and circular elements that create natural flow and movement throughout the space. The design emphasizes serenity and comfort while maintaining modern aesthetics.',
            images: ['project-1.jpg', 'project-1-2.jpg', 'project-1-3.jpg'],
            completionDate: '2024-01-15',
            location: 'San Francisco, CA',
            features: ['Arc integration', 'Natural lighting', 'Open spaces', 'Custom curved walls']
        },
        {
            id: '2',
            title: 'Urban Arc Office Complex',
            category: 'commercial',
            description: 'A contemporary office building that demonstrates how arc elements can enhance workplace environments.',
            fullDescription: 'This commercial project redefines modern office design through the strategic use of arc elements. The building features curved conference rooms, flowing corridors, and circular gathering spaces that promote collaboration and creativity.',
            images: ['project-2.jpg', 'project-2-2.jpg', 'project-2-3.jpg'],
            completionDate: '2023-11-20',
            location: 'Los Angeles, CA',
            features: ['Collaborative spaces', 'Arc-based meeting rooms', 'Modern aesthetics', 'Energy efficient']
        },
        {
            id: '3',
            title: 'Heritage Arc Renovation',
            category: 'renovation',
            description: 'A historic building renovation that preserves character while introducing modern arc-based design elements.',
            fullDescription: 'This renovation project successfully blends historic architecture with contemporary arc-based design. We preserved the building\'s original character while introducing modern curved elements that enhance functionality and visual appeal.',
            images: ['project-3.jpg', 'project-3-2.jpg', 'project-3-3.jpg'],
            completionDate: '2023-09-10',
            location: 'Boston, MA',
            features: ['Historic preservation', 'Modern arc integration', 'Structural updates', 'Timeless design']
        }
    ];
    
    displayProjects(sampleProjects);
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                submitForm(this);
            }
        });
    }
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Clear previous error messages
    clearFormErrors(form);
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            showFieldError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    // Phone validation (if provided)
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value.trim()) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phoneField.value.replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(phoneField, 'Please enter a valid phone number');
            isValid = false;
        }
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e53e3e';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

// Clear form errors
function clearFormErrors(form) {
    const errorMessages = form.querySelectorAll('.error-message');
    const errorFields = form.querySelectorAll('.error');
    
    errorMessages.forEach(msg => msg.remove());
    errorFields.forEach(field => field.classList.remove('error'));
}

// Submit form
function submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Send email using EmailJS or similar service
    sendEmail(formObject, form, submitButton, originalText);
}

// Send email function
function sendEmail(formData, form, submitButton, originalText) {
    // Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual EmailJS public key
    
    // EmailJS template parameters
    const templateParams = {
        to_email: "arcvantagedesignstudios@gmail.com",
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone || 'Not provided',
        project_type: formData.projectType || 'Not specified',
        message: formData.message,
        reply_to: formData.email
    };
    
    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showSuccessMessage(form);
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, function(error) {
            console.log('FAILED...', error);
            showErrorMessage(form, 'Failed to send email. Please try again or contact us directly at arcvantagedesignstudios@gmail.com');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
}

// Show success message
function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="background-color: #48bb78; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center;">
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            Thank you! Your message has been sent successfully to arcvantagedesignstudios@gmail.com. We'll get back to you soon.
        </div>
    `;
    
    form.appendChild(successDiv);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Show error message
function showErrorMessage(form, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div style="background-color: #e53e3e; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center;">
            <i class="fas fa-exclamation-circle" style="margin-right: 0.5rem;"></i>
            ${message}
        </div>
    `;
    
    form.appendChild(errorDiv);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Scroll effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .project-card, .blog-card, .contact-item');
    animateElements.forEach(el => observer.observe(el));
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization: Debounced scroll handler
const debouncedScrollHandler = debounce(function() {
    // Any scroll-based functionality can be added here
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-in {
        animation: fadeIn 0.6s ease-out;
    }
    
    .error {
        border-color: #e53e3e !important;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style); 