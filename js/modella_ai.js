// =====================================================
// WHAT?studio - Modella AI JavaScript
// Gestione specifica per la pagina modella AI
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    initFaceStyleInteraction();
    initVersatilityGallery();
    initGalleryCategoryFilter();
    initFaqAccordion();
    initModellaAIForm();
    initFloatingFaces();
    
    console.log('Modella AI page loaded successfully!');
});

// ========== Face Style Interaction ==========
function initFaceStyleInteraction() {
    const mainShowcase = document.getElementById('mainShowcase');
    const faceStyleItems = document.querySelectorAll('.face-style-item');
    
    if (!mainShowcase || faceStyleItems.length === 0) return;
    
    faceStyleItems.forEach(item => {
        item.addEventListener('click', function() {
            // Rimuovi active da tutti gli items
            faceStyleItems.forEach(i => i.classList.remove('active'));
            
            // Aggiungi active al clickato
            this.classList.add('active');
            
            // Cambia immagine principale con animazione smooth
            const newMainSrc = this.getAttribute('data-main');
            const mainImg = mainShowcase.querySelector('img');
            
            if (newMainSrc && mainImg) {
                // Animazione di fade out
                mainImg.style.opacity = '0';
                mainImg.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    mainImg.src = newMainSrc;
                    // Animazione di fade in
                    mainImg.style.opacity = '1';
                    mainImg.style.transform = 'scale(1)';
                }, 300);
                
                // Aggiungi effetto pulse al main showcase
                mainShowcase.style.boxShadow = '0 0 40px rgba(255, 0, 0, 0.4)';
                setTimeout(() => {
                    mainShowcase.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.5)';
                }, 600);
            }
            
            // Aggiungi particelle di successo
            createSuccessParticles(this);
        });
    });
}

// ========== Versatility Gallery ==========
function initVersatilityGallery() {
    const toggleBtn = document.getElementById('galleryToggleBtn');
    const gallery = document.getElementById('versatilityGallery');
    const btnIcon = toggleBtn?.querySelector('i:last-child');
    const btnSpan = toggleBtn?.querySelector('span');
    
    if (!toggleBtn || !gallery) return;
    
    let isOpen = false;
    
    toggleBtn.addEventListener('click', function() {
        isOpen = !isOpen;
        
        if (isOpen) {
            // Mostra gallery
            gallery.style.display = 'block';
            gallery.style.opacity = '0';
            gallery.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                gallery.style.transition = 'all 0.5s ease';
                gallery.style.opacity = '1';
                gallery.style.transform = 'translateY(0)';
            }, 10);
            
            // Aggiorna bottone
            this.classList.add('active');
            if (btnSpan) btnSpan.textContent = 'Chiudi Gallery';
            if (btnIcon) btnIcon.style.transform = 'rotate(180deg)';
            
            // Anima i gallery items con stagger
            const galleryItems = gallery.querySelectorAll('.gallery-item-new');
            galleryItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 50);
            });
            
        } else {
            // Nascondi gallery
            gallery.style.opacity = '0';
            gallery.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                gallery.style.display = 'none';
            }, 500);
            
            // Aggiorna bottone
            this.classList.remove('active');
            if (btnSpan) btnSpan.textContent = 'Esplora Gallery Completa';
            if (btnIcon) btnIcon.style.transform = 'rotate(0deg)';
        }
    });
}

// ========== Gallery Category Filter ==========
function initGalleryCategoryFilter() {
    const categoryBtns = document.querySelectorAll('.cat-btn');
    const galleryItems = document.querySelectorAll('.gallery-item-new');
    
    if (categoryBtns.length === 0) return;
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Aggiorna bottoni attivi
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filtra items con animazione
            galleryItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    // Mostra item
                    item.style.transition = 'all 0.4s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    item.classList.remove('hidden');
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, index * 50);
                } else {
                    // Nascondi item
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 400);
                }
            });
            
            // Aggiungi feedback visivo al bottone
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// ========== FAQ Accordion ==========
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        if (!question || !answer) return;
        
        // Inizializza stato chiuso
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'all 0.4s ease';
        answer.style.paddingTop = '0';
        answer.style.paddingBottom = '0';
        answer.style.opacity = '0';
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Chiudi tutti gli altri FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('p');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.paddingTop = '0';
                        otherAnswer.style.paddingBottom = '0';
                        otherAnswer.style.opacity = '0';
                    }
                }
            });
            
            if (isActive) {
                // Chiudi questo FAQ
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                answer.style.paddingTop = '0';
                answer.style.paddingBottom = '0';
                answer.style.opacity = '0';
            } else {
                // Apri questo FAQ
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.paddingTop = '1rem';
                answer.style.paddingBottom = '0';
                answer.style.opacity = '1';
            }
            
            // Effetto hover sul question
            question.style.transform = 'scale(0.98)';
            setTimeout(() => {
                question.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Aggiungi hover effect
        question.style.cursor = 'pointer';
        question.addEventListener('mouseenter', function() {
            this.style.color = '#ff4444';
            this.style.transition = 'color 0.3s ease';
        });
        
        question.addEventListener('mouseleave', function() {
            this.style.color = 'var(--red)';
        });
    });
}

// ========== Modella AI Form ==========
function initModellaAIForm() {
    const form = document.getElementById('contactFormModella');
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
        
        // Mostra loading
        submitButton.disabled = true;
        if (buttonText) buttonText.style.display = 'none';
        if (buttonLoading) buttonLoading.style.display = 'inline-block';
        
        // Raccogli dati
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // Invia email
            if (typeof emailjs !== 'undefined') {
                await emailjs.send(
                    "service_tbtgcwg",
                    "template_5gmjb9o",
                    {
                        from_name: data.name,
                        from_email: data.email,
                        phone: data.phone,
                        brand: data.brand,
                        package: data.package,
                        vision: data.vision || "Nessuna descrizione fornita",
                        service_type: "Modella AI Esclusiva"
                    }
                );
            }
            
            // Successo
            showNotification('Richiesta inviata! Ti contatteremo per definire la tua modella AI.', 'success');
            form.reset();
            
            // Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'modella_ai_form_submit', {
                    event_category: 'Modella AI',
                    event_label: data.brand || 'No brand specified'
                });
            }
            
            // Confetti effect
            createConfettiEffect();
            
        } catch (error) {
            showNotification('Errore durante l\'invio. Riprova o contattaci direttamente.', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Ripristina bottone
            submitButton.disabled = false;
            if (buttonText) buttonText.style.display = 'inline-block';
            if (buttonLoading) buttonLoading.style.display = 'none';
        }
    });
    
    // Aggiungi validazione in tempo reale
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// ========== Floating Faces Animation ==========
function initFloatingFaces() {
    const faceCards = document.querySelectorAll('.face-card');
    
    faceCards.forEach((card, index) => {
        // Aggiungi movimento più fluido
        let mouseX = 0;
        let mouseY = 0;
        let cardX = 0;
        let cardY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth - 0.5;
            mouseY = e.clientY / window.innerHeight - 0.5;
        });
        
        // Animazione smooth con lerp
        function animateCard() {
            cardX += (mouseX * 20 - cardX) * 0.1;
            cardY += (mouseY * 20 - cardY) * 0.1;
            
            card.style.transform = `
                translate(${cardX}px, ${cardY}px) 
                rotate(${(index % 2 ? -1 : 1) * (5 + cardX * 0.1)}deg)
            `;
            
            requestAnimationFrame(animateCard);
        }
        
        animateCard();
        
        // Effetto hover speciale
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.style.transform += ' scale(1.1)';
            this.style.zIndex = '100';
            this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.4s ease';
            this.style.zIndex = '1';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
    });
}

// ========== Utility Functions ==========

// Validazione campi
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Rimuovi errori precedenti
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Questo campo è obbligatorio';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Inserisci un email valida';
        }
    } else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Inserisci un numero di telefono valido';
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.cssText = `
            color: #f44336;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            animation: slideInUp 0.3s ease;
        `;
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

// Particelle di successo
function createSuccessParticles(element) {
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: #4CAF50;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = element.getBoundingClientRect();
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        
        document.body.appendChild(particle);
        
        const angle = (i * 45) * Math.PI / 180;
        const distance = 30 + Math.random() * 20;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: 600 + Math.random() * 400,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

// Effetto confetti per form submission
function createConfettiEffect() {
    const colors = ['#FF0000', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: 50%;
            left: 50%;
            pointer-events: none;
            z-index: 10000;
            border-radius: 50%;
        `;
        
        document.body.appendChild(confetti);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 200 + Math.random() * 300;
        const gravity = 980;
        const life = 2000 + Math.random() * 1000;
        
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 200;
        
        confetti.animate([
            { 
                transform: 'translate(-50%, -50%) translate(0px, 0px) rotate(0deg)',
                opacity: 1
            },
            { 
                transform: `translate(-50%, -50%) translate(${vx * life / 1000}px, ${vy * life / 1000 + 0.5 * gravity * (life / 1000) ** 2}px) rotate(720deg)`,
                opacity: 0
            }
        ], {
            duration: life,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
    }
}

// Show notification (usa la funzione globale se disponibile)
function showNotification(message, type = 'info') {
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
        return;
    }
    
    // Fallback locale
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 9999;
        max-width: 300px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideInLeft 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Export per testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initFaceStyleInteraction,
        initVersatilityGallery,
        initGalleryCategoryFilter,
        initFaqAccordion,
        validateField
    };
}