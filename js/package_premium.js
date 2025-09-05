// =====================================================
// WHAT?studio - Package Premium JavaScript
// Gestione specifica per la pagina pacchetto premium
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    initPremiumForm();
    initTimelineAnimation();
    initComparisonTableInteraction();
    initPricingCalculator();
    initPremiumBenefitsAnimation();
    initUpgradeInteraction();
    initScrollProgress();
    
    console.log('Package Premium page loaded successfully!');
});

// ========== Premium Form ==========
function initPremiumForm() {
    const form = document.getElementById('contactFormPremium');
    if (!form) return;
    
    // Inizializza EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("ffXv-XufHFQoQvyd3");
    }
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('.submit-button');
        const buttonText = submitButton.querySelector('.button-text');
        const buttonLoading = submitButton.querySelector('.button-loading');
        
        // Mostra loading con effetto premium
        submitButton.disabled = true;
        submitButton.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
        if (buttonText) buttonText.style.display = 'none';
        if (buttonLoading) buttonLoading.style.display = 'inline-block';
        
        // Raccogli dati
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // Invia email con template premium
            if (typeof emailjs !== 'undefined') {
                await emailjs.send(
                    "service_tbtgcwg",
                    "template_5gmjb9o",
                    {
                        from_name: data.name,
                        from_email: data.email,
                        phone: data.phone,
                        package: "Pacchetto Premium (9.000€)",
                        message: data.message || "Nessun messaggio aggiuntivo",
                        service_type: "Premium Package",
                        priority: "HIGH",
                        discount: "10% sconto su servizi extra incluso"
                    }
                );
            }
            
            // Successo con animazione premium
            showPremiumSuccess();
            form.reset();
            
            // Analytics per Premium
            if (typeof gtag !== 'undefined') {
                gtag('event', 'premium_form_submit', {
                    event_category: 'Premium Package',
                    event_label: 'Premium Consultation Request',
                    value: 9000
                });
            }
            
            // Effetti speciali premium
            createPremiumEffects(submitButton);
            
        } catch (error) {
            showNotification('Errore durante l\'invio. Il nostro team ti contatterà comunque entro 24h.', 'error');
            console.error('Premium form error:', error);
        } finally {
            // Ripristina bottone
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.style.background = 'var(--red)';
                if (buttonText) buttonText.style.display = 'inline-block';
                if (buttonLoading) buttonLoading.style.display = 'none';
            }, 2000);
        }
    });
    
    // Validazione premium in tempo reale
    setupPremiumValidation(form);
}

// ========== Timeline Animation ==========
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timeline = document.querySelector('.timeline');
    
    if (timelineItems.length === 0) return;
    
    // Intersection Observer per timeline
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(timelineItems).indexOf(entry.target);
                
                // Anima timeline line progressiva
                animateTimelineLine(index, timelineItems.length);
                
                // Anima content con stagger
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    
                    // Effetto typewriter per il contenuto
                    const content = entry.target.querySelector('.timeline-content');
                    if (content) {
                        content.style.opacity = '0';
                        content.style.transform = 'translateX(50px)';
                        
                        setTimeout(() => {
                            content.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            content.style.opacity = '1';
                            content.style.transform = 'translateX(0)';
                        }, 200);
                    }
                    
                    // Pulsa il marker
                    const marker = entry.target.querySelector('.timeline-marker');
                    if (marker) {
                        marker.style.animation = 'pulse 1s ease-in-out 3';
                        marker.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.6)';
                    }
                }, index * 300);
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-50px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// ========== Comparison Table Interaction ==========
function initComparisonTableInteraction() {
    const comparisonTable = document.querySelector('.comparison-table');
    if (!comparisonTable) return;
    
    const rows = comparisonTable.querySelectorAll('tbody tr');
    
    rows.forEach((row, index) => {
        row.addEventListener('mouseenter', function() {
            // Highlight della riga
            this.style.background = 'rgba(255, 0, 0, 0.1)';
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
            
            // Effetto su celle premium
            const premiumCell = this.querySelector('.highlight');
            if (premiumCell) {
                premiumCell.style.background = 'rgba(255, 0, 0, 0.2)';
                premiumCell.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.3)';
            }
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.transform = 'scale(1)';
            
            const premiumCell = this.querySelector('.highlight');
            if (premiumCell) {
                premiumCell.style.background = 'rgba(255, 0, 0, 0.1)';
                premiumCell.style.boxShadow = 'none';
            }
        });
        
        // Animazione di entrata staggered
        setTimeout(() => {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                row.style.transition = 'all 0.6s ease';
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            }, 100);
        }, index * 100);
    });
    
    // Effetto hover su icone check/times
    const icons = comparisonTable.querySelectorAll('i');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3) rotate(360deg)';
            this.style.transition = 'all 0.4s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// ========== Pricing Calculator ==========
function initPricingCalculator() {
    const premiumPrice = 9000;
    const discountPercentage = 10;
    
    // Calcola risparmi su servizi extra
    const addonItems = document.querySelectorAll('.addon-item');
    
    addonItems.forEach(item => {
        const originalPrice = item.querySelector('.original-price');
        const discountedPrice = item.querySelector('.discounted-price');
        
        if (originalPrice && discountedPrice) {
            // Anima il calcolo del risparmio
            const originalValue = parseInt(originalPrice.textContent.replace(/[^\d]/g, ''));
            const discountedValue = Math.round(originalValue * (1 - discountPercentage / 100));
            
            animateNumber(discountedPrice, 0, discountedValue, 2000, '€');
            
            // Calcola risparmio totale
            const savings = originalValue - discountedValue;
            if (savings > 0) {
                showSavingsIndicator(item, savings);
            }
        }
    });
    
    // Calcola ROI del premium
    calculatePremiumROI();
}

// ========== Premium Benefits Animation ==========
function initPremiumBenefitsAnimation() {
    const benefitTags = document.querySelectorAll('.benefit-tag');
    
    benefitTags.forEach((tag, index) => {
        // Animazione di entrata ritardata
        setTimeout(() => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                tag.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, 50);
        }, index * 200);
        
        // Effetto hover potenziato
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(76, 175, 80, 0.3)';
            
            // Effetto sparkle
            createSparkleEffect(this);
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Special premium card animation
    const specialPremiumCard = document.querySelector('.special-premium');
    if (specialPremiumCard) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSpecialPremiumCard(specialPremiumCard);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(specialPremiumCard);
    }
}

// ========== Upgrade Interaction ==========
function initUpgradeInteraction() {
    const upgradeBox = document.querySelector('.upgrade-box');
    const addonItems = document.querySelectorAll('.addon-item');
    
    if (!upgradeBox) return;
    
    // Calcola valore totale risparmiato
    let totalSavings = 0;
    
    addonItems.forEach(item => {
        const discountBadge = item.querySelector('.discount-badge');
        if (discountBadge) {
            const savings = 100; // Base savings per item
            totalSavings += savings;
            
            // Aggiungi counter animato al hover
            item.addEventListener('mouseenter', function() {
                showSavingsTooltip(this, savings);
            });
        }
    });
    
    // Mostra risparmio totale
    if (totalSavings > 0) {
        addTotalSavingsIndicator(upgradeBox, totalSavings);
    }
}

// ========== Scroll Progress ==========
function initScrollProgress() {
    const progressBar = createProgressBar();
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        
        progressBar.style.width = scrolled + '%';
        
        // Cambia colore basato sulla sezione
        if (scrolled > 80) {
            progressBar.style.background = '#4CAF50'; // Verde per call-to-action
        } else if (scrolled > 50) {
            progressBar.style.background = '#FF9800'; // Arancione per confronto
        } else {
            progressBar.style.background = 'var(--red)'; // Rosso per intro
        }
    });
}

// ========== Utility Functions ==========

// Validazione premium
function setupPremiumValidation(form) {
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validatePremiumField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validatePremiumField(this);
            }
        });
    });
}

function validatePremiumField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Rimuovi errori precedenti
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Validazioni specifiche per premium
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Richiesto per consulenza premium';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Email richiesta per comunicazioni premium';
        }
    } else if (field.name === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Descrivi brevemente i tuoi obiettivi premium';
    }
    
    if (!isValid) {
        field.classList.add('error');
        field.style.borderColor = '#f44336';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.cssText = `
            color: #f44336;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            animation: slideInUp 0.3s ease;
            font-weight: 600;
        `;
        field.parentNode.appendChild(errorDiv);
    } else {
        field.style.borderColor = '#4CAF50';
    }
    
    return isValid;
}

// Anima timeline line
function animateTimelineLine(currentIndex, totalItems) {
    const timelineLine = document.querySelector('.timeline::before');
    if (timelineLine) {
        const percentage = ((currentIndex + 1) / totalItems) * 100;
        // L'animazione viene gestita via CSS con custom properties
        document.documentElement.style.setProperty('--timeline-progress', percentage + '%');
    }
}

// Anima numeri
function animateNumber(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutCubic)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easedProgress);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Calcola ROI Premium
function calculatePremiumROI() {
    // Simula calcolo ROI basato su engagement medio
    const baseEngagement = 100; // follower/mese
    const premiumMultiplier = 3.5;
    const projectedGrowth = Math.round(baseEngagement * premiumMultiplier * 6); // 6 mesi
    
    // Mostra ROI nel DOM se esiste un elemento dedicato
    const roiElement = document.querySelector('.roi-display');
    if (roiElement) {
        animateNumber(roiElement, 0, projectedGrowth, 3000, ' follower');
    }
}

// Crea progress bar
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--red);
        z-index: 9999;
        transition: width 0.3s ease, background 0.3s ease;
        width: 0%;
    `;
    document.body.appendChild(progressBar);
    return progressBar;
}

// Effetto sparkle
function createSparkleEffect(element) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #FFD700;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = element.getBoundingClientRect();
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        document.body.appendChild(sparkle);
        
        sparkle.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 1 },
            { transform: 'scale(1) rotate(180deg)', opacity: 1 },
            { transform: 'scale(0) rotate(360deg)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => sparkle.remove();
    }
}

// Effetti premium per form success
function createPremiumEffects(button) {
    // Golden particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #FFD700, #FFA500);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            box-shadow: 0 0 10px #FFD700;
        `;
        
        const rect = button.getBoundingClientRect();
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        
        document.body.appendChild(particle);
        
        const angle = (i * 18) * Math.PI / 180;
        const distance = 60 + Math.random() * 40;
        
        particle.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
            { 
                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1)`,
                opacity: 1 
            },
            {
                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance * 2}px, ${Math.sin(angle) * distance * 2}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

// Success message premium
function showPremiumSuccess() {
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <i class="fas fa-crown" style="color: #FFD700; font-size: 2rem;"></i>
            <div>
                <h4 style="margin: 0; color: #4CAF50;">Premium Request Received! 👑</h4>
                <p style="margin: 0.5rem 0 0; opacity: 0.9;">Il nostro team premium ti contatterà entro 2 ore lavorative</p>
            </div>
        </div>
    `;
    
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        color: white;
        z-index: 9999;
        max-width: 400px;
        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        box-shadow: 0 20px 40px rgba(76, 175, 80, 0.3);
        border: 2px solid #FFD700;
        animation: slideInLeft 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => successDiv.remove(), 500);
    }, 8000);
}

// Anima special premium card
function animateSpecialPremiumCard(card) {
    const perks = card.querySelectorAll('.premium-perks li');
    
    perks.forEach((perk, index) => {
        setTimeout(() => {
            perk.style.opacity = '0';
            perk.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                perk.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                perk.style.opacity = '1';
                perk.style.transform = 'translateX(0)';
                
                // Effetto emoji bounce
                const emoji = perk.querySelector('.perk-icon');
                if (emoji) {
                    emoji.style.animation = 'bounce 0.6s ease';
                }
            }, 100);
        }, index * 150);
    });
}

// Export per testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initPremiumForm,
        initTimelineAnimation,
        initComparisonTableInteraction,
        validatePremiumField,
        animateNumber
    };
}