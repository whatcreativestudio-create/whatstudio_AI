// =====================================================
// WHAT?studio - Package Smart JavaScript
// Gestione specifica per la pagina pacchetto smart
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    initSmartForm();
    initCalendarInteraction();
    initSmartProcessAnimation();
    initOptimizationCards();
    initSmartBenefits();
    initUpgradePathway();
    initSmartCalculator();
    initResourceOptimizer();
    
    console.log('Package Smart page loaded successfully!');
});

// ========== Smart Form ==========
function initSmartForm() {
    const form = document.getElementById('contactFormSmart');
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
        
        // Mostra loading con colori smart
        submitButton.disabled = true;
        submitButton.style.background = 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
        if (buttonText) buttonText.style.display = 'none';
        if (buttonLoading) buttonLoading.style.display = 'inline-block';
        
        // Raccogli dati
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // Invia email con template smart
            if (typeof emailjs !== 'undefined') {
                await emailjs.send(
                    "service_tbtgcwg",
                    "template_5gmjb9o",
                    {
                        from_name: data.name,
                        from_email: data.email,
                        phone: data.phone,
                        package: "Pacchetto Smart (6.000€)",
                        message: data.message || "Nessun messaggio aggiuntivo",
                        service_type: "Smart Package",
                        priority: "MEDIUM",
                        optimization: "Instagram + Facebook focus"
                    }
                );
            }
            
            // Successo con animazione smart
            showSmartSuccess();
            form.reset();
            
            // Analytics per Smart
            if (typeof gtag !== 'undefined') {
                gtag('event', 'smart_form_submit', {
                    event_category: 'Smart Package',
                    event_label: 'Smart Consultation Request',
                    value: 6000
                });
            }
            
            // Effetti smart blu/azzurri
            createSmartEffects(submitButton);
            
        } catch (error) {
            showNotification('Errore durante l\'invio. Ti ricontatteremo entro 24h.', 'error');
            console.error('Smart form error:', error);
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
    
    // Validazione smart
    setupSmartValidation(form);
}

// ========== Calendar Interaction ==========
function initCalendarInteraction() {
    const dayCards = document.querySelectorAll('.day-card');
    const calendarNote = document.querySelector('.calendar-note');
    
    if (dayCards.length === 0) return;
    
    dayCards.forEach((card, index) => {
        // Animazione di entrata staggered
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.9)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 50);
        }, index * 150);
        
        // Effetto hover migliorato
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            
            // Anima il tag
            const tag = this.querySelector('.tag');
            if (tag) {
                tag.style.transform = 'scale(1.1)';
                tag.style.animation = 'pulse 0.6s ease';
            }
            
            // Effetto glow per il giorno
            const dayTitle = this.querySelector('h4');
            if (dayTitle) {
                dayTitle.style.textShadow = '0 0 10px rgba(33, 150, 243, 0.5)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            
            const tag = this.querySelector('.tag');
            if (tag) {
                tag.style.transform = 'scale(1)';
                tag.style.animation = 'none';
            }
            
            const dayTitle = this.querySelector('h4');
            if (dayTitle) {
                dayTitle.style.textShadow = 'none';
            }
        });
        
        // Click per mostrare dettagli
        card.addEventListener('click', function() {
            showDayDetails(this, index);
        });
    });
    
    // Anima la nota informativa
    if (calendarNote) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.8s ease';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(calendarNote);
    }
}

// ========== Smart Process Animation ==========
function initSmartProcessAnimation() {
    const optCards = document.querySelectorAll('.opt-card');
    
    optCards.forEach((card, index) => {
        // Intersection observer per animazioni
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateOptCard(entry.target, index);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(card);
        
        // Effetti hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 25px 50px rgba(33, 150, 243, 0.2)';
            
            // Anima il numero
            const number = this.querySelector('.opt-number');
            if (number) {
                number.style.transform = 'scale(1.2) rotate(5deg)';
                number.style.color = '#2196F3';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            
            const number = this.querySelector('.opt-number');
            if (number) {
                number.style.transform = 'scale(1) rotate(0deg)';
                number.style.color = 'var(--red)';
            }
        });
    });
}

// ========== Optimization Cards ==========
function initOptimizationCards() {
    const cards = document.querySelectorAll('.opt-card');
    
    // Crea connessioni visive tra le carte
    createCardConnections(cards);
    
    // Sequenza di attivazione automatica
    let currentActive = 0;
    
    function highlightSequence() {
        cards.forEach((card, index) => {
            card.classList.remove('sequence-active');
            if (index === currentActive) {
                card.classList.add('sequence-active');
                
                // Effetto pulse per la carta attiva
                card.style.animation = 'pulse 1s ease-in-out';
                setTimeout(() => {
                    card.style.animation = '';
                }, 1000);
            }
        });
        
        currentActive = (currentActive + 1) % cards.length;
    }
    
    // Avvia sequenza ogni 3 secondi
    const sequenceInterval = setInterval(highlightSequence, 3000);
    
    // Ferma sequenza al hover
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            clearInterval(sequenceInterval);
            cards.forEach(c => c.classList.remove('sequence-active'));
        });
    });
}

// ========== Smart Benefits ==========
function initSmartBenefits() {
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    benefitItems.forEach((item, index) => {
        // Animazione di entrata con delay
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(40px) rotateX(45deg)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) rotateX(0deg)';
            }, 100);
        }, index * 200);
        
        // Effetto hover con rotazione 3D
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(-5deg) rotateY(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(33, 150, 243, 0.2)';
            
            // Anima l'icona
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotateY(360deg)';
                icon.style.color = '#2196F3';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotateY(0deg)';
                icon.style.color = 'var(--red)';
            }
        });
    });
}

// ========== Upgrade Pathway ==========
function initUpgradePathway() {
    const upgradeBox = document.querySelector('.upgrade-box');
    const upgradeButton = upgradeBox?.querySelector('.cta-button');
    
    if (!upgradeBox) return;
    
    // Calcola vantaggi upgrade
    const smartPrice = 6000;
    const premiumPrice = 9000;
    const upgradeDiscount = smartPrice * 0.5; // 50% scalato
    const effectiveUpgradePrice = premiumPrice - upgradeDiscount;
    
    // Mostra calcolo upgrade
    showUpgradeCalculation(upgradeBox, effectiveUpgradePrice);
    
    // Effetto hover sul bottone upgrade
    if (upgradeButton) {
        upgradeButton.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(76, 175, 80, 0.3)';
            
            // Aggiungi icona upgrade
            if (!this.querySelector('.upgrade-icon')) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-arrow-up upgrade-icon';
                icon.style.marginLeft = '0.5rem';
                this.appendChild(icon);
            }
        });
        
        upgradeButton.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
            
            const icon = this.querySelector('.upgrade-icon');
            if (icon) icon.remove();
        });
    }
}

// ========== Smart Calculator ==========
function initSmartCalculator() {
    // Calcola efficienza Smart
    const smartMetrics = {
        postsPerWeek: 5,
        totalWeeks: 26, // 6 mesi
        totalImages: 80,
        totalVideos: 3,
        platforms: 2, // Instagram + Facebook
        efficiency: 0.92 // 92% di efficienza nella distribuzione
    };
    
    // Mostra metriche animate
    displaySmartMetrics(smartMetrics);
    
    // Calcola ROI Smart
    const projectedGrowth = calculateSmartROI(smartMetrics);
    showROIProjection(projectedGrowth);
}

// ========== Resource Optimizer ==========
function initResourceOptimizer() {
    // Mostra come Smart ottimizza le risorse
    const resourceData = {
        images: { total: 80, distribution: '3-4 per prodotto', efficiency: '95%' },
        videos: { total: 3, timing: 'Mesi 2, 4, 6', impact: 'Alto engagement' },
        repost: { strategy: 'Smart repost', coverage: '100%', freshness: '85%' }
    };
    
    createResourceVisualization(resourceData);
}

// ========== Utility Functions ==========

// Validazione smart
function setupSmartValidation(form) {
    const fields = form.querySelectorAll('input, textarea, select');
    
    fields.forEach(field => {
        field.addEventListener('blur', function() {
            validateSmartField(this);
        });
        
        // Auto-suggerimenti per obiettivi comuni
        if (field.name === 'message') {
            addSmartSuggestions(field);
        }
    });
}

function validateSmartField(field) {
    const value = field.value.trim();
    let isValid = true;
    let suggestion = '';
    
    // Rimuovi validazioni precedenti
    field.classList.remove('error', 'success');
    removeFieldMessage(field);
    
    // Validazioni specifiche Smart
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        suggestion = 'Campo necessario per la strategia Smart';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            suggestion = 'Email necessaria per reports mensili';
        } else {
            suggestion = 'Perfetto! Qui riceverai i reports Smart';
        }
    } else if (field.name === 'message') {
        if (value.length > 5) {
            suggestion = 'Ottimo! Più dettagli = strategia più mirata';
        } else if (value.length > 0) {
            suggestion = 'Puoi essere più specifico sui tuoi obiettivi';
        }
    }
    
    // Applica stili
    if (!isValid) {
        field.classList.add('error');
        showFieldMessage(field, suggestion, 'error');
    } else if (suggestion && value) {
        field.classList.add('success');
        showFieldMessage(field, suggestion, 'success');
    }
    
    return isValid;
}

// Anima optimization card
function animateOptCard(card, index) {
    // Effetto di ingresso con stagger
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) scale(0.8)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
        
        // Anima il numero con conteggio
        const numberEl = card.querySelector('.opt-number');
        if (numberEl) {
            const finalNumber = numberEl.textContent;
            animateSmartNumber(numberEl, finalNumber);
        }
    }, index * 200);
}

// Anima numeri Smart
function animateSmartNumber(element, finalValue) {
    const isPercent = finalValue.includes('%');
    const isRatio = finalValue.includes('/');
    
    if (isPercent) {
        const num = parseInt(finalValue);
        animateNumber(element, 0, num, 1500, '%');
    } else if (isRatio) {
        // Per ratio come "5/7"
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.transition = 'opacity 0.5s ease';
            element.style.opacity = '1';
            element.textContent = finalValue;
        }, 500);
    } else {
        const num = parseInt(finalValue) || 100;
        animateNumber(element, 0, num, 1200);
    }
}

// Mostra dettagli giorno
function showDayDetails(dayCard, index) {
    const dayName = dayCard.querySelector('h4').textContent;
    const dayType = dayCard.querySelector('.tag').textContent;
    const dayDesc = dayCard.querySelector('p').textContent;
    
    const details = {
        'Lunedì': {
            content: 'Riutilizziamo la storia con più engagement della settimana precedente',
            timing: '9:00 - 18:00',
            performance: 'Engagement medio: +15%'
        },
        'Martedì': {
            content: 'Nuovo post con immagine AI generata ad-hoc per il prodotto',
            timing: '10:00 - 19:00',
            performance: 'Reach medio: +25%'
        },
        'Mercoledì': {
            content: 'Storia originale esclusiva o carosello prodotto',
            timing: '11:00 - 20:00',
            performance: 'Story views: +30%'
        },
        'Giovedì': {
            content: 'Post lifestyle o collezione con focus emotional',
            timing: '10:00 - 19:00',
            performance: 'Saves: +40%'
        },
        'Venerdì': {
            content: 'Storia weekend con call-to-action per engagement',
            timing: '9:00 - 21:00',
            performance: 'Comments: +20%'
        }
    };
    
    const dayDetail = details[dayName];
    if (dayDetail) {
        showDayDetailModal(dayName, dayDetail);
    }
}

// Modal dettagli giorno
function showDayDetailModal(dayName, detail) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div class="day-modal-content">
            <div class="modal-header">
                <h3>${dayName} - Strategia Smart</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="detail-section">
                    <h4>📝 Contenuto</h4>
                    <p>${detail.content}</p>
                </div>
                <div class="detail-section">
                    <h4>⏰ Orario pubblicazione</h4>
                    <p>${detail.timing}</p>
                </div>
                <div class="detail-section">
                    <h4>📊 Performance attesa</h4>
                    <p>${detail.performance}</p>
                </div>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = modal.querySelector('.day-modal-content');
    content.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        margin: 2rem;
        animation: slideInUp 0.3s ease;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(modal);
    
    // Chiusura modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });
}

// Crea connessioni tra carte
function createCardConnections(cards) {
    if (cards.length < 2) return;
    
    const connections = document.createElement('svg');
    connections.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    
    // Aggiungi al container delle carte
    const container = cards[0].parentElement;
    container.style.position = 'relative';
    container.appendChild(connections);
    
    // Disegna linee di connessione (versione semplificata)
    for (let i = 0; i < cards.length - 1; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('stroke', 'rgba(33, 150, 243, 0.2)');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('stroke-dasharray', '5,5');
        connections.appendChild(line);
    }
}

// Effetti smart blu
function createSmartEffects(button) {
    const colors = ['#2196F3', '#03A9F4', '#00BCD4', '#4CAF50'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            box-shadow: 0 0 10px currentColor;
        `;
        
        const rect = button.getBoundingClientRect();
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        
        document.body.appendChild(particle);
        
        const angle = (i * 24) * Math.PI / 180;
        const distance = 40 + Math.random() * 30;
        
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
            duration: 1500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

// Success Smart
function showSmartSuccess() {
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <i class="fas fa-rocket" style="color: #2196F3; font-size: 2rem;"></i>
            <div>
                <h4 style="margin: 0; color: #4CAF50;">Smart Request Received! 🚀</h4>
                <p style="margin: 0.5rem 0 0; opacity: 0.9;">Strategia Smart in preparazione - risposta entro 4 ore</p>
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
        background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
        box-shadow: 0 20px 40px rgba(33, 150, 243, 0.3);
        border: 2px solid #03A9F4;
        animation: slideInLeft 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => successDiv.remove(), 500);
    }, 7000);
}

// Helper functions
function animateNumber(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easedProgress);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function showFieldMessage(field, message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'field-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        color: ${type === 'error' ? '#f44336' : '#4CAF50'};
        font-size: 0.8rem;
        margin-top: 0.5rem;
        animation: slideInUp 0.3s ease;
    `;
    field.parentNode.appendChild(messageDiv);
}

function removeFieldMessage(field) {
    const existing = field.parentNode.querySelector('.field-message');
    if (existing) existing.remove();
}

// Additional utility functions...
function displaySmartMetrics(metrics) {
    // Implementazione display metriche
    console.log('Smart metrics:', metrics);
}

function calculateSmartROI(metrics) {
    return metrics.totalImages * metrics.efficiency * 0.8;
}

function showROIProjection(growth) {
    console.log('Projected growth:', growth);
}

function createResourceVisualization(data) {
    console.log('Resource visualization:', data);
}

function showUpgradeCalculation(box, price) {
    console.log('Upgrade price:', price);
}

function addSmartSuggestions(field) {
    // Suggerimenti per obiettivi Smart
    const suggestions = [
        'Voglio aumentare i follower su Instagram',
        'Focus su engagement e interazioni',
        'Obiettivo: vendite attraverso i social',
        'Brand awareness per nuovo prodotto'
    ];
    
    // Implementazione suggerimenti (placeholder)
    field.setAttribute('placeholder', 'Es: ' + suggestions[Math.floor(Math.random() * suggestions.length)]);
}

// Export per testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSmartForm,
        initCalendarInteraction,
        initSmartProcessAnimation,
        validateSmartField
    };
}