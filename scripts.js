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

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        function toggleMenu() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Add slide animation
            if (navMenu.classList.contains('active')) {
                navMenu.style.display = 'block';
                // Force reflow
                navMenu.offsetHeight;
                navMenu.style.transform = 'translateY(0)';
                navMenu.style.opacity = '1';
            } else {
                navMenu.style.transform = 'translateY(-10px)';
                navMenu.style.opacity = '0';
                // Hide after animation
                setTimeout(() => {
                    if (!navMenu.classList.contains('active')) {
                        navMenu.style.display = 'none';
                    }
                }, 300);
            }
        }

        // Toggle menu when hamburger is clicked
        hamburger.addEventListener('click', toggleMenu);

        // Close menu when a nav link is clicked - only on mobile
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Only close menu if we're in mobile view (hamburger is visible)
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    navMenu.style.transform = 'translateY(-10px)';
                    navMenu.style.opacity = '0';
                    setTimeout(() => {
                        navMenu.style.display = 'none';
                    }, 300);
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }
});

// Active navigation highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements
document.addEventListener('DOMContentLoaded', function() {
    // Add initial styles for animation
    const animatedElements = document.querySelectorAll('.tour-card, .service-card, .blog-card, .other-service-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Tour card hover effects
document.querySelectorAll('.tour-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card click effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        // Add a pulse effect
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Blog card click handlers
document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', function() {
        // In a real application, this would navigate to the full blog post
        console.log('Navigate to blog post:', this.querySelector('h3').textContent);
    });
});

// Mobile menu toggle (for future mobile menu implementation)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Search functionality (placeholder for future implementation)
function initializeSearch() {
    // This would implement search functionality
    console.log('Search functionality initialized');
}

// Form validation (for future contact forms)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Nest Africa website loaded successfully!');
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize blog slider
    initBlogSlider();
});

// Blog Slider Functionality with Touch Support
document.addEventListener('DOMContentLoaded', function() {
    const blogTrack = document.getElementById('blogTrack');
    const prevBtn = document.getElementById('prevBlog');
    const nextBtn = document.getElementById('nextBlog');
    const dots = document.querySelectorAll('.dot');
    
    if (!blogTrack) return;

    let currentIndex = 0;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isDragging = false;
    let animationID = 0;
    const slideWidth = window.innerWidth * 0.8; // 80% of viewport width
    const totalSlides = document.querySelectorAll('.blog-card').length;

    // Touch events
    blogTrack.addEventListener('touchstart', touchStart);
    blogTrack.addEventListener('touchmove', touchMove);
    blogTrack.addEventListener('touchend', touchEnd);

    // Mouse events
    blogTrack.addEventListener('mousedown', touchStart);
    blogTrack.addEventListener('mousemove', touchMove);
    blogTrack.addEventListener('mouseup', touchEnd);
    blogTrack.addEventListener('mouseleave', touchEnd);

    // Button events
    prevBtn.addEventListener('click', () => moveSlide('prev'));
    nextBtn.addEventListener('click', () => moveSlide('next'));

    // Dot events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function touchStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        blogTrack.style.cursor = 'grabbing';
    }

    function touchMove(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        blogTrack.style.cursor = 'grab';

        const movedBy = currentTranslate - prevTranslate;
        
        // Determine if slide should change based on movement
        if (Math.abs(movedBy) > slideWidth / 3) {
            if (movedBy < 0) {
                moveSlide('next');
            } else {
                moveSlide('prev');
            }
        } else {
            goToSlide(currentIndex);
        }
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        blogTrack.style.transform = `translateX(${currentTranslate}px)`;
    }

    function moveSlide(direction) {
        if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        } else if (direction === 'next' && currentIndex < totalSlides - 1) {
            currentIndex++;
        }
        goToSlide(currentIndex);
    }

    function goToSlide(index) {
        currentIndex = index;
        prevTranslate = currentTranslate = -index * slideWidth;
        setSliderPosition();
        updateDots();
        updateButtons();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;
        
        // Update visual state
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex === totalSlides - 1 ? '0.5' : '1';
    }

    // Initialize first slide
    goToSlide(0);

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate dimensions and reposition slides
            goToSlide(currentIndex);
        }, 250);
    });
});

function readMore(blogIndex) {
    const blogTitles = [
        "Ultimate Guide to Rwanda Wildlife Safaris",
        "Conquering Mount Karisimbi: A Hiker's Paradise", 
        "Rwanda's Rich Cultural Heritage: A Journey Through Time",
        "Kigali: Africa's Cleanest Capital City",
        "Lake Kivu: Rwanda's Hidden Gem",
        "Nyungwe Forest: Canopy Walk and Primate Tracking"
    ];
    
    // In a real application, this would navigate to the full blog post
    alert(`Opening full article: "${blogTitles[blogIndex]}"\n\nThis would normally navigate to the complete blog post page.`);
    console.log(`Navigate to blog post ${blogIndex}:`, blogTitles[blogIndex]);
}

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !phone || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // Real-time form validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
});

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    
    // Remove previous error styling
    field.classList.remove('error');
    
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                showFieldError(field, 'Name must be at least 2 characters');
                return false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters');
                return false;
            }
            break;
    }
    
    // If we get here, field is valid
    field.style.borderColor = '#28a745';
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = '#dc3545';
    
    // You could also add a small error message below the field
    // For now, we'll just use the border color change
}

// New Contact Form Handling (for the updated contact section)
document.addEventListener('DOMContentLoaded', function() {
    // Handle new contact form with firstName, lastName, etc.
    const newContactForms = document.querySelectorAll('.contact-form');
    
    newContactForms.forEach(form => {
        // Skip if this is the old contact form (already handled above)
        if (form.id === 'contactForm') return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements for the new form structure
            const firstName = form.querySelector('input[name="firstName"]');
            const lastName = form.querySelector('input[name="lastName"]');
            const email = form.querySelector('input[name="email"]');
            const subject = form.querySelector('input[name="subject"]');
            const message = form.querySelector('textarea[name="message"]');
            
            // Basic validation
            let isValid = true;
            let errorMessage = '';
            
            if (firstName && !firstName.value.trim()) {
                isValid = false;
                errorMessage += 'First name is required.\n';
                firstName.style.borderColor = '#dc3545';
            } else if (firstName) {
                firstName.style.borderColor = '#28a745';
            }
            
            if (lastName && !lastName.value.trim()) {
                isValid = false;
                errorMessage += 'Last name is required.\n';
                lastName.style.borderColor = '#dc3545';
            } else if (lastName) {
                lastName.style.borderColor = '#28a745';
            }
            
            if (email && !email.value.trim()) {
                isValid = false;
                errorMessage += 'Email is required.\n';
                email.style.borderColor = '#dc3545';
            } else if (email && !isValidEmail(email.value)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
                email.style.borderColor = '#dc3545';
            } else if (email) {
                email.style.borderColor = '#28a745';
            }
            
            if (subject && !subject.value.trim()) {
                isValid = false;
                errorMessage += 'Subject is required.\n';
                subject.style.borderColor = '#dc3545';
            } else if (subject) {
                subject.style.borderColor = '#28a745';
            }
            
            if (message && !message.value.trim()) {
                isValid = false;
                errorMessage += 'Message is required.\n';
                message.style.borderColor = '#dc3545';
            } else if (message && message.value.trim().length < 10) {
                isValid = false;
                errorMessage += 'Message must be at least 10 characters.\n';
                message.style.borderColor = '#dc3545';
            } else if (message) {
                message.style.borderColor = '#28a745';
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = form.querySelector('.contact-submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'SENDING...';
                submitBtn.disabled = true;
                
                // Prepare form data for email sending
                const formData = {
                    firstName: firstName.value.trim(),
                    lastName: lastName.value.trim(),
                    email: email.value.trim(),
                    subject: subject.value.trim(),
                    message: message.value.trim()
                };
                
                // Send email using EmailJS (requires setup)
                sendEmailWithEmailJS(formData)
                    .then(() => {
                        alert('Thank you for your message! We will get back to you soon.');
                        form.reset();
                        
                        // Reset field colors
                        form.querySelectorAll('input, textarea').forEach(field => {
                            field.style.borderColor = '#e1e8ed';
                        });
                    })
                    .catch(() => {
                        // Fallback: Open default email client
                        openEmailClient(formData);
                        alert('Email client opened. Please send the message manually or try again later.');
                        form.reset();
                        
                        // Reset field colors
                        form.querySelectorAll('input, textarea').forEach(field => {
                            field.style.borderColor = '#e1e8ed';
                        });
                    })
                    .finally(() => {
                        // Reset button
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    });
            } else {
                // Show error message
                alert(errorMessage);
            }
        });
        
        // Real-time validation for new form fields
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                // Reset border color on input
                this.style.borderColor = '#e1e8ed';
            });
            
            input.addEventListener('blur', function() {
                const value = this.value.trim();
                const name = this.getAttribute('name');
                
                switch(name) {
                    case 'firstName':
                    case 'lastName':
                        if (value.length < 2) {
                            this.style.borderColor = '#dc3545';
                        } else {
                            this.style.borderColor = '#28a745';
                        }
                        break;
                        
                    case 'email':
                        if (!value || !isValidEmail(value)) {
                            this.style.borderColor = '#dc3545';
                        } else {
                            this.style.borderColor = '#28a745';
                        }
                        break;
                        
                    case 'subject':
                        if (value.length < 3) {
                            this.style.borderColor = '#dc3545';
                        } else {
                            this.style.borderColor = '#28a745';
                        }
                        break;
                        
                    case 'message':
                        if (value.length < 10) {
                            this.style.borderColor = '#dc3545';
                        } else {
                            this.style.borderColor = '#28a745';
                        }
                        break;
                }
            });
        });
    });
    
    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            
            if (!emailInput.value.trim()) {
                alert('Please enter your email address.');
                emailInput.style.borderColor = '#dc3545';
                return;
            }
            
            if (!isValidEmail(emailInput.value)) {
                alert('Please enter a valid email address.');
                emailInput.style.borderColor = '#dc3545';
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.newsletter-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'SUBSCRIBING...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
                emailInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
        
        // Newsletter email validation
        const newsletterInput = newsletterForm.querySelector('.newsletter-input');
        if (newsletterInput) {
            newsletterInput.addEventListener('input', function() {
                this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            });
            
            newsletterInput.addEventListener('blur', function() {
                if (this.value.trim() && !isValidEmail(this.value)) {
                    this.style.borderColor = '#dc3545';
                } else if (this.value.trim() && isValidEmail(this.value)) {
                    this.style.borderColor = '#d4af37';
                }
            });
        }
    }
    
    // Helper function for email validation (reusable)
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Function to send email using EmailJS
    function sendEmailWithEmailJS(formData) {
        return new Promise((resolve, reject) => {
            // Check if EmailJS is loaded
            if (typeof emailjs === 'undefined') {
                reject('EmailJS not loaded');
                return;
            }
            
            // EmailJS template parameters
            const templateParams = {
                from_name: `${formData.firstName} ${formData.lastName}`,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: 'festusbigirimana002@gmail.com'
            };
            
            // Send email using EmailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(resolve)
                .catch(reject);
        });
    }
    
    // Fallback function to open email client
    function openEmailClient(formData) {
        const subject = encodeURIComponent(formData.subject);
        const body = encodeURIComponent(
            `Name: ${formData.firstName} ${formData.lastName}\n` +
            `Email: ${formData.email}\n\n` +
            `Message:\n${formData.message}`
        );
        
        const mailtoLink = `mailto:festusbigirimana002@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    }
});

// Contact Card Functions
function makePhoneCall() {
    const phoneNumber = "+250795988798";
    window.location.href = `tel:${phoneNumber}`;
}

function openWhatsApp() {
    const phoneNumber = "250795988798"; // WhatsApp format without + and spaces
    const message = encodeURIComponent("Hello! I'm interested in your tour packages from Nest Africa Travels Ltd. Could you please provide more information?");
    
    // Try to open WhatsApp app first (mobile), then web version
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // For mobile devices - opens WhatsApp app directly
        const whatsappApp = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
        window.location.href = whatsappApp;
        
        // Fallback to web version if app is not installed
        setTimeout(() => {
            const whatsappWeb = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(whatsappWeb, '_blank');
        }, 1000);
    } else {
        // For desktop - opens WhatsApp Web directly
        const whatsappWeb = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappWeb, '_blank');
    }
}

function sendEmail() {
    const email = "nestafricatravels@gmail.com";
    const subject = encodeURIComponent("Tour Inquiry - Nest Africa Travels Ltd");
    const body = encodeURIComponent("Hello,\n\nI'm interested in your tour packages from Nest Africa Travels Ltd and would like to get more information about:\n\n- Available tour destinations\n- Pricing and packages\n- Booking process\n- Available dates\n\nThank you for your time!\n\nBest regards");
    
    // Create mailto link to open default email client
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
}

// Footer Newsletter Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const footerNewsletterForm = document.querySelector('.footer-newsletter-form');
    
    if (footerNewsletterForm) {
        footerNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.footer-newsletter-input');
            
            if (!emailInput.value.trim()) {
                alert('Please enter your email address.');
                emailInput.focus();
                return;
            }
            
            if (!isValidEmail(emailInput.value)) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.footer-newsletter-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for subscribing to our newsletter! You will receive updates about our latest tours and offers.');
                emailInput.value = '';
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Social media icons have been removed

// WhatsApp Button Detection and Fix
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    // Find the WhatsApp floating button
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        console.log('WhatsApp button detected');
        
        // Apply enhanced visibility styles
        whatsappButton.style.visibility = 'visible';
        whatsappButton.style.opacity = '1';
        whatsappButton.style.transform = 'translateZ(0)';
        whatsappButton.style.webkitTransform = 'translateZ(0)';
        whatsappButton.style.willChange = 'transform';
        whatsappButton.style.zIndex = '9999';
        
        // Log device detection
        console.log('Device detection - Mobile:', isMobile, 'Android:', isAndroid);
        
        if (isAndroid) {
            console.log('Applying Android-specific fixes');
            // Apply additional Android-specific styles
            whatsappButton.style.position = 'fixed';
            whatsappButton.style.display = 'block';
            whatsappButton.style.webkitBackfaceVisibility = 'hidden';
            whatsappButton.style.backfaceVisibility = 'hidden';
        }
        
        // Check for visibility after a delay
        setTimeout(function() {
            const computedStyle = window.getComputedStyle(whatsappButton);
            console.log('WhatsApp button computed style - Display:', computedStyle.display, 'Visibility:', computedStyle.visibility);
            
            if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
                console.log('WhatsApp button was hidden, forcing display...');
                
                // Force display
                whatsappButton.style.display = 'block';
                whatsappButton.style.visibility = 'visible';
                whatsappButton.style.opacity = '1';
                
                // Move in DOM to ensure it's on top
                document.body.appendChild(whatsappButton);
            }
        }, 500);
    } else {
        console.log('WhatsApp float button not found on this page');
    }
});
