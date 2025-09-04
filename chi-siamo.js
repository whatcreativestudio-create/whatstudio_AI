// =====================================================
// WHAT?studio - Chi Siamo JavaScript - FIXED VERSION
// Fixed animations and centered interactions
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
    initFixedFloatingWords();
    initFoundersInteraction();
    initStatsAnimation();
    initServicesInteraction();
    preventOverflow();
    initResponsiveAdjustments();
    
    console.log('Chi Siamo page - FIXED VERSION loaded successfully!');
});

// ========== Prevent Overflow Issues ==========
function preventOverflow() {
    const body = document.body;
    const html = document.documentElement;
    
    body.style.overflowX = 'hidden';
    html.style.overflowX = 'hidden';
    
    // Monitor problematic elements
    const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
            const element = entry.target;
            if (element.scrollWidth > window.innerWidth) {
                element.style.maxWidth = '100%';
                element.style.boxSizing = 'border-box';
            }
        }
    });
    
    // Observe main containers
    document.querySelectorAll('.hero-content-about, .story-grid, .founders-grid, .services-showcase').forEach(el => {
        if (el) observer.observe(el);
    });
}

// ========== Fixed Scroll Reveal ==========
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// ========== FIXED Floating Words ==========
function initFixedFloatingWords() {
    const floatingWords = document.querySelectorAll('.floating-word');
    
    if (floatingWords.length === 0) return;
    
    // Initialize positioning
    floatingWords.forEach((word, index) => {
        // Set initial state
        word.style.opacity = '0.6';
        word.style.color = 'rgba(255, 0, 0, 0.6)';
        word.style.transform = word.classList.contains('center-word') ? 
            'translateY(-50%) translateX(-50%)' : 'translateY(-50%)';
        
        // Enhanced hover effects
        word.addEventListener('mouseenter', function() {
            // Pause CSS animation
            this.style.animationPlayState = 'paused';
            
            // Apply hover effects
            this.style.color = '#ff0000';
            this.style.opacity = '1';
            this.style.textShadow = '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.4)';
            this.style.zIndex = '10';
            
            // Transform based on position
            if (index === 2) { // Center word
                this.style.transform = 'translateY(-70%) translateX(-50%) scale(1.2)';
            } else {
                this.style.transform = 'translateY(-70%) scale(1.2)';
            }
            
            // Create hover particles
            createWordParticles(this);
        });
        
        word.addEventListener('mouseleave', function() {
            // Resume CSS animation
            this.style.animationPlayState = 'running';
            
            // Reset to normal state
            this.style.color = 'rgba(255, 0, 0, 0.6)';
            this.style.opacity = '0.6';
            this.style.textShadow = 'none';
            this.style.zIndex = '1';
            
            // Reset transform
            if (index === 2) { // Center word
                this.style.transform = 'translateY(-50%) translateX(-50%) scale(1)';
            } else {
                this.style.transform = 'translateY(-50%) scale(1)';
            }
        });
        
        // Click effects
        word.addEventListener('click', function() {
            this.style.transform = index === 2 ? 
                'translateY(-80%) translateX(-50%) scale(1.3)' : 
                'translateY(-80%) scale(1.3)';
            
            setTimeout(() => {
                this.style.transform = index === 2 ? 
                    'translateY(-50%) translateX(-50%) scale(1)' : 
                    'translateY(-50%) scale(1)';
            }, 300);
            
            // Create click ripple
            createClickRipple(this);
        });
        
        // Stagger the entrance animation
        setTimeout(() => {
            word.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            word.style.opacity = '0.6';
        }, index * 200);
    });
    
    // Sequential highlight animation
    let currentHighlight = 0;
    let highlightInterval;
    
    function startSequentialHighlight() {
        highlightInterval = setInterval(() => {
            // Reset all words
            floatingWords.forEach(word => {
                if (!word.matches(':hover')) {
                    word.style.opacity = '0.6';
                    word.style.color = 'rgba(255, 0, 0, 0.6)';
                    word.style.textShadow = 'none';
                }
            });
            
            // Highlight current word if not hovered
            if (floatingWords[currentHighlight] && !floatingWords[currentHighlight].matches(':hover')) {
                const current = floatingWords[currentHighlight];
                current.style.opacity = '1';
                current.style.color = '#ff0000';
                current.style.textShadow = '0 0 15px rgba(255, 0, 0, 0.6)';
                
                setTimeout(() => {
                    if (!current.matches(':hover')) {
                        current.style.opacity = '0.6';
                        current.style.color = 'rgba(255, 0, 0, 0.6)';
                        current.style.textShadow = 'none';
                    }
                }, 1500);
            }
            
            currentHighlight = (currentHighlight + 1) % floatingWords.length;
        }, 2500);
    }
    
    // Start the sequence after initial load
    setTimeout(startSequentialHighlight, 2000);
    
    // Pause sequence when any word is hovered
    floatingWords.forEach(word => {
        word.addEventListener('mouseenter', () => {
            clearInterval(highlightInterval);
        });
        
        word.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (!Array.from(floatingWords).some(w => w.matches(':hover'))) {
                    startSequentialHighlight();
                }
            }, 500);
        });
    });
}

// ========== Enhanced Founders Interaction ==========
function initFoundersInteraction() {
    const founderCards = document.querySelectorAll('.founder-card');
    
    founderCards.forEach((card, index) => {
        // Staggered entrance animation
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.9)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 100);
        }, index * 300);
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            const skillTags = this.querySelectorAll('.skill-tag');
            const avatar = this.querySelector('.avatar-placeholder');
            
            // Animate skill tags with stagger
            skillTags.forEach((tag, tagIndex) => {
                setTimeout(() => {
                    tag.style.background = 'var(--red)';
                    tag.style.color = 'var(--white)';
                    tag.style.transform = 'translateY(-3px) scale(1.05)';
                    tag.style.boxShadow = '0 8px 20px rgba(255, 0, 0, 0.3)';
                }, tagIndex * 100);
            });
            
            // Avatar animation
            if (avatar) {
                avatar.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const skillTags = this.querySelectorAll('.skill-tag');
            const avatar = this.querySelector('.avatar-placeholder');
            
            // Reset skill tags
            skillTags.forEach(tag => {
                tag.style.background = 'rgba(255, 0, 0, 0.1)';
                tag.style.color = 'var(--red)';
                tag.style.transform = 'translateY(0) scale(1)';
                tag.style.boxShadow = 'none';
            });
            
            // Reset avatar
            if (avatar) {
                avatar.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// ========== Enhanced Stats Animation ==========
function initStatsAnimation() {
    const statBoxes = document.querySelectorAll('.stat-box');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animateStatBox(entry.target);
                }, index * 300);
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    statBoxes.forEach(box => {
        statsObserver.observe(box);
        
        // Enhanced hover effects
        box.addEventListener('mouseenter', function() {
            const statNumber = this.querySelector('.stat-number');
            if (statNumber) {
                statNumber.style.transform = 'scale(1.1) rotateY(5deg)';
                statNumber.style.color = '#ff0000';
            }
            
            // Add glow effect
            this.style.boxShadow = '0 30px 60px rgba(255, 0, 0, 0.2), 0 0 30px rgba(255, 0, 0, 0.1)';
        });
        
        box.addEventListener('mouseleave', function() {
            const statNumber = this.querySelector('.stat-number');
            if (statNumber) {
                statNumber.style.transform = 'scale(1) rotateY(0deg)';
                statNumber.style.color = 'var(--red)';
            }
            
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
        });
    });
}

// ========== Enhanced Services Interaction ==========
function initServicesInteraction() {
    const serviceBoxes = document.querySelectorAll('.service-box');
    
    serviceBoxes.forEach((box, index) => {
        // Staggered entrance animation
        setTimeout(() => {
            box.style.opacity = '0';
            box.style.transform = 'translateY(40px) rotateX(15deg)';
            
            setTimeout(() => {
                box.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                box.style.opacity = '1';
                box.style.transform = 'translateY(0) rotateX(0deg)';
            }, 100);
        }, index * 200);
        
        // Enhanced hover with 3D effects
        box.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            const iconElement = this.querySelector('.service-icon i');
            
            if (icon) {
                icon.style.transform = 'scale(1.15) translateZ(20px)';
                
                if (iconElement) {
                    iconElement.style.transform = 'scale(1.2) rotateY(360deg)';
                }
            }
            
            // Add perspective effect
            this.style.transform = 'translateY(-20px) rotateX(-2deg) rotateY(2deg) scale(1.02)';
        });
        
        box.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            const iconElement = this.querySelector('.service-icon i');
            
            if (icon) {
                icon.style.transform = 'scale(1) translateZ(0px)';
                
                if (iconElement) {
                    iconElement.style.transform = 'scale(1) rotateY(0deg)';
                }
            }
            
            this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

// ========== Responsive Adjustments ==========
function initResponsiveAdjustments() {
    function adjustForScreenSize() {
        const screenWidth = window.innerWidth;
        const floatingWords = document.querySelectorAll('.floating-word');
        
        floatingWords.forEach((word, index) => {
            if (screenWidth < 480) {
                // Extra small screens - tighter spacing
                word.style.fontSize = '0.7rem';
                word.style.letterSpacing = '1px';
            } else if (screenWidth < 768) {
                // Mobile - normal mobile sizing
                word.style.fontSize = '0.8rem';
                word.style.letterSpacing = '1px';
            } else {
                // Desktop - full sizing
                word.style.fontSize = 'clamp(0.9rem, 2vw, 1.2rem)';
                word.style.letterSpacing = '2px';
            }
        });
    }
    
    // Initial adjustment
    adjustForScreenSize();
    
    // Adjust on resize with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(adjustForScreenSize, 250);
    });
}

// ========== Utility Functions ==========

// Animate stat box with enhanced effects
function animateStatBox(box) {
    const statNumber = box.querySelector('.stat-number');
    const originalText = statNumber.textContent;
    const number = box.getAttribute('data-number');
    const special = box.getAttribute('data-special');
    
    // Enhanced box entrance animation
    box.style.transform = 'translateY(-10px) scale(1.02)';
    box.style.boxShadow = '0 20px 50px rgba(255, 0, 0, 0.15)';
    
    setTimeout(() => {
        box.style.transform = 'translateY(0) scale(1)';
        box.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
    }, 600);
    
    if (number && !isNaN(parseInt(number))) {
        // Enhanced number counting
        animateNumberCount(statNumber, 0, parseInt(number), 2000, originalText.includes('+') ? '+' : '');
    } else if (special === 'infinity') {
        // Enhanced infinity animation
        const symbols = ['∞', '∪', '∩', '∞', '◊', '∞'];
        let currentSymbol = 0;
        
        const interval = setInterval(() => {
            statNumber.textContent = symbols[currentSymbol];
            statNumber.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                statNumber.style.transform = 'scale(1)';
            }, 200);
            
            currentSymbol = (currentSymbol + 1) % symbols.length;
            
            if (currentSymbol === 0) {
                setTimeout(() => {
                    clearInterval(interval);
                    statNumber.textContent = '∞';
                }, 1000);
            }
        }, 300);
    } else if (special === 'time') {
        // Enhanced time animation
        const times = ['8:00', '12:00', '18:00', '24/7'];
        let currentTime = 0;
        
        const interval = setInterval(() => {
            statNumber.style.transform = 'rotateX(90deg)';
            
            setTimeout(() => {
                statNumber.textContent = times[currentTime];
                statNumber.style.transform = 'rotateX(0deg)';
                currentTime++;
                
                if (currentTime >= times.length) {
                    clearInterval(interval);
                }
            }, 200);
        }, 400);
    }
}

// Enhanced number counter
function animateNumberCount(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Enhanced easing function
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + (end - start) * easedProgress);
        
        element.textContent = current + suffix;
        
        // Add color transition during counting
        const colorProgress = progress;
        const red = Math.round(255 * colorProgress);
        element.style.color = `rgb(${red}, 0, 0)`;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.style.color = 'var(--red)';
        }
    }
    
    requestAnimationFrame(update);
}

// Create word particles on hover
function createWordParticles(word) {
    const particleCount = window.innerWidth < 768 ? 3 : 5;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #ff0000;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            box-shadow: 0 0 8px rgba(255, 0, 0, 0.8);
        `;
        
        const rect = word.getBoundingClientRect();
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        
        document.body.appendChild(particle);
        
        const angle = (i * 72) * Math.PI / 180; // 72 degrees apart
        const distance = 20 + Math.random() * 20;
        
        particle.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
            { 
                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1)`,
                opacity: 0.8
            },
            {
                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance * 1.5}px, ${Math.sin(angle) * distance * 1.5}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

// Create click ripple effect
function createClickRipple(word) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 0, 0, 0.3);
        transform: scale(0);
        pointer-events: none;
        z-index: 999;
    `;
    
    const rect = word.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.left + rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.top + rect.height / 2 - size / 2) + 'px';
    
    document.body.appendChild(ripple);
    
    ripple.animate([
        { transform: 'scale(0)', opacity: 0.6 },
        { transform: 'scale(2)', opacity: 0 }
    ], {
        duration: 600,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => ripple.remove();
}

// Enhanced notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 15px;
        color: white;
        font-weight: 600;
        z-index: 9999;
        max-width: 300px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        animation: slideInLeft 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 4500);
    
    notification.addEventListener('click', () => {
        notification.style.animation = 'fadeOut 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    });
}

// Optimized debounce function
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

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('Chi Siamo JS Error:', e.error);
    
    // Try to recover floating words if they break
    if (e.error && e.error.message && e.error.message.includes('floating')) {
        console.log('Attempting to recover floating words...');
        setTimeout(() => {
            initFixedFloatingWords();
        }, 1000);
    }
}, { passive: true });

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Chi Siamo page load time: ${pageLoadTime}ms`);
        }, 100);
    });
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    // Clear any running intervals/timeouts
    const highestId = setTimeout(() => {});
    for (let i = 0; i < highestId; i++) {
        clearTimeout(i);
        clearInterval(i);
    }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initFixedFloatingWords,
        initFoundersInteraction,
        initStatsAnimation,
        animateNumberCount
    };
}