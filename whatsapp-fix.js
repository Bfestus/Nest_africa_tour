// WhatsApp Button Fix for Android and iOS
document.addEventListener('DOMContentLoaded', function() {
    // Force hardware acceleration for the WhatsApp float button
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Apply styles programmatically to ensure maximum compatibility
        whatsappButton.style.visibility = 'visible';
        whatsappButton.style.opacity = '1';
        whatsappButton.style.transform = 'translateZ(0)';
        whatsappButton.style.webkitTransform = 'translateZ(0)';
        whatsappButton.style.willChange = 'transform';
        whatsappButton.style.zIndex = '9999';
        
        // Check if the device is running Android
        const isAndroid = /Android/i.test(navigator.userAgent);
        
        if (isAndroid) {
            // Apply additional Android-specific fixes
            whatsappButton.style.position = 'fixed';
            whatsappButton.style.display = 'block !important';
            whatsappButton.style.webkitBackfaceVisibility = 'hidden';
            whatsappButton.style.backfaceVisibility = 'hidden';
            
            // Add a "click me" animation to make it more noticeable
            whatsappButton.classList.add('pulse-animation');
        }
        
        // Check for proper initialization after a short delay
        setTimeout(function() {
            if (window.getComputedStyle(whatsappButton).display === 'none' || 
                window.getComputedStyle(whatsappButton).visibility === 'hidden') {
                
                console.log('WhatsApp button is hidden, forcing display...');
                
                // Force display if hidden
                whatsappButton.style.display = 'block';
                whatsappButton.style.visibility = 'visible';
                whatsappButton.style.opacity = '1';
                
                // Move in DOM to ensure it's not hidden by other elements
                document.body.appendChild(whatsappButton);
            }
        }, 1000);
        
        // Ensure the button is clickable
        whatsappButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const phoneNumber = "250795988798";
            const message = encodeURIComponent("Hello! I'm interested in your tour packages from Nest Africa Travels Ltd. Could you please provide more information?");
            
            // Try to open WhatsApp app first (mobile), then web version
            if (isAndroid) {
                // For Android - opens WhatsApp app directly
                window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
                
                // Fallback to web version if app is not installed
                setTimeout(() => {
                    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                }, 1000);
            } else {
                // For other devices
                window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
            }
        });
    }
});

// Add a CSS class for the pulse animation
document.addEventListener('DOMContentLoaded', function() {
    // Create style element
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
            }
            
            70% {
                transform: scale(1.05);
                box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
            }
            
            100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
            }
        }
        
        .pulse-animation {
            animation: pulse 2s infinite;
        }
    `;
    
    // Add style to document head
    document.head.appendChild(style);
});
