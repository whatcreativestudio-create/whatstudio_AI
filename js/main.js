// =====================================================
// WHAT?studio - AI Social Management Landing Page
// JavaScript principale - VERSION 4.0 OTTIMIZZATA
// =====================================================

// Array di immagini demo per il carosello AI Magic
const demoImages = [
    {
        slot1: { src: 'images/demo/ai-urban.webp', style: 'Urban' },
        slot2: { src: 'images/demo/ai-elegant.webp', style: 'Elegant' }
    },
    {
        slot1: { src: 'images/demo/ai-sport.webp', style: 'Sport' },
        slot2: { src: 'images/demo/ai-luxury.webp', style: 'Luxury' }
    },
    {
        slot1: { src: 'images/demo/ai-casual.webp', style: 'Casual' },
        slot2: { src: 'images/demo/ai-business.webp', style: 'Business' }
    },
    {
        slot1: { src: 'images/demo/ai-vintage.webp', style: 'Vintage' },
        slot2: { src: 'images/demo/ai-modern.webp', style: 'Modern' }
    },
    {
        slot1: { src: 'images/demo/ai-minimalist.webp', style: 'Minimalist' },
        slot2: { src: 'images/demo/ai-bold.webp', style: 'Bold' }
    }
];

let currentImageSet = 0;
let currentBrandIndex = 0;

// Attendi il caricamento del DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Inizializzazione Funzioni ==========
    initSmoothScrolling();
    initMobileMenu();
    initScrollReveal();
    initGalleryFilter();
    initLightbox();
    initContactForm();
    initAIMagicCarousel();
    initParallax();
    initNavbarScroll();
    initGalleryShowMore();
    initLazyLoading();
    initBrandsCarousel();
    initDurationSwitch();
    
    // ========== NUOVO: Prevenzione overflow ==========
    preventOverflow();
    
    console.log('WHAT?studio - Sito caricato correttamente!');
});

// ========== NUOVO: Prevenzione Overflow ==========
function preventOverflow() {
    // Assicura che nessun elemento sfori dalla viewport
    const body = document.body;
    const html = document.documentElement;
    
    // Forza overflow-x hidden
    body.style.overflowX = 'hidden';
    html.style.overflowX = 'hidden';
    
    // Monitora e correggi elementi che potrebbero sforare
    const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
            const element = entry.target;
            if (element.scrollWidth > window.innerWidth) {
                element.style.maxWidth = '100%';
                element.style.boxSizing = 'border-box';
            }
        }
    });
    
    // Osserva tutti i container principali
    document.querySelectorAll('.container, .demo-container-new, .brands-track').forEach(el => {
        observer.observe(el);
    });
}

// ========== Smooth Scrolling ==========
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Compenso per navbar fissa
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== Scroll Reveal Animation ==========
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Una volta animato, non osservare piÃ¹
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Osserva tutti gli elementi con classe scroll-reveal
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// ========== NUOVO: Brands Carousel OTTIMIZZATO ==========
function initBrandsCarousel() {
    const track = document.querySelector('.brands-track');
    const prevBtn = document.getElementById('brandsPrev');
    const nextBtn = document.getElementById('brandsNext');
    const brandLogos = document.querySelectorAll('.brand-logo');
    
    if (!track || !prevBtn || !nextBtn || brandLogos.length === 0) return;
    
    const totalBrands = brandLogos.length;
    let itemsPerView = getItemsPerView();
    let maxIndex = Math.max(0, totalBrands - itemsPerView);
    
    function getItemsPerView() {
        const width = window.innerWidth;
        if (width >= 1200) return 5;
        if (width >= 992) return 4;
        if (width >= 768) return 3;
        if (width >= 480) return 2;
        return 1;
    }
    
    function updateCarousel() {
        const logoWidth = 200; // min-width del brand-logo
        const gap = 32; // 2rem in px
        const offset = currentBrandIndex * (logoWidth + gap);
        
        // FIXATO: Assicura che il transform non causi overflow
        track.style.transform = `translateX(-${Math.min(offset, track.scrollWidth - track.parentElement.clientWidth)}px)`;
        
        // Aggiorna stato dei bottoni
        prevBtn.disabled = currentBrandIndex === 0;
        nextBtn.disabled = currentBrandIndex >= maxIndex;
        
        // Stile per bottoni disabilitati
        if (prevBtn.disabled) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }
        
        if (nextBtn.disabled) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentBrandIndex > 0) {
            currentBrandIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentBrandIndex < maxIndex) {
            currentBrandIndex++;
            updateCarousel();
        }
    });
    
    // Auto-scroll ottimizzato
    let autoScrollInterval;
    let isHovering = false;
    
    function startAutoScroll() {
        if (isHovering) return;
        
        autoScrollInterval = setInterval(() => {
            if (currentBrandIndex >= maxIndex) {
                currentBrandIndex = 0;
            } else {
                currentBrandIndex++;
            }
            updateCarousel();
        }, 3000);
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Gestione hover per fermare auto-scroll
    const carouselContainer = document.querySelector('.brands-carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            isHovering = true;
            stopAutoScroll();
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            isHovering = false;
            startAutoScroll();
        });
    }
    
    // Gestione resize OTTIMIZZATA
    window.addEventListener('resize', debounce(() => {
        itemsPerView = getItemsPerView();
        maxIndex = Math.max(0, totalBrands - itemsPerView);
        if (currentBrandIndex > maxIndex) {
            currentBrandIndex = maxIndex;
        }
        updateCarousel();
    }, 250));
    
    // Inizializza
    updateCarousel();
    startAutoScroll();
    
    // Touch support per mobile MIGLIORATO
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (track) {
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoScroll();
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoScroll();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentBrandIndex < maxIndex) {
                // Swipe left - next
                currentBrandIndex++;
                updateCarousel();
            } else if (diff < 0 && currentBrandIndex > 0) {
                // Swipe right - prev
                currentBrandIndex--;
                updateCarousel();
            }
        }
    }
}

// ========== AI Magic Carousel OTTIMIZZATO ==========
function initAIMagicCarousel() {
    const magicBtn = document.getElementById('aiMagicBtn');
    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    
    if (!magicBtn || !slot1 || !slot2) return;
    
    magicBtn.addEventListener('click', function() {
        // Disabilita il bottone temporaneamente
        magicBtn.disabled = true;
        
        // Aggiungi effetto loading
        magicBtn.style.transform = 'scale(0.9)';
        magicBtn.style.opacity = '0.7';
        
        // Animazione di fade out delle immagini attuali
        slot1.style.transform = 'scale(0.8)';
        slot1.style.opacity = '0';
        slot2.style.transform = 'scale(0.8)';
        slot2.style.opacity = '0';
        
        setTimeout(() => {
            // Passa al prossimo set di immagini
            currentImageSet = (currentImageSet + 1) % demoImages.length;
            const newImages = demoImages[currentImageSet];
            
            // Cambia le immagini
            const img1 = slot1.querySelector('img');
            const img2 = slot2.querySelector('img');
            
            if (img1 && img2) {
                // OTTIMIZZATO: Preload delle nuove immagini
                const preloadImg1 = new Image();
                const preloadImg2 = new Image();
                
                preloadImg1.onload = () => {
                    img1.src = newImages.slot1.src;
                    img1.alt = `Risultato AI`;
                };
                
                preloadImg2.onload = () => {
                    img2.src = newImages.slot2.src;
                    img2.alt = `Risultato AI`;
                };
                
                preloadImg1.src = newImages.slot1.src;
                preloadImg2.src = newImages.slot2.src;
            }
            
            // Animazione di fade in
            setTimeout(() => {
                slot1.style.transform = 'scale(1)';
                slot1.style.opacity = '1';
                slot2.style.transform = 'scale(1)';
                slot2.style.opacity = '1';
                
                // Ripristina il bottone
                magicBtn.style.transform = 'scale(1)';
                magicBtn.style.opacity = '1';
                magicBtn.disabled = false;
            }, 100);
            
        }, 300);
        
        // Aggiungi effetto particelle
        createMagicParticles(magicBtn);
    });
}

// ========== Effetto Particelle Magic OTTIMIZZATO ==========
function createMagicParticles(button) {
    const particleCount = window.innerWidth < 768 ? 8 : 12; // Meno particelle su mobile
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#fff';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.8)';
        
        const rect = button.getBoundingClientRect();
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        
        document.body.appendChild(particle);
        
        // Animazione particella OTTIMIZZATA
        const angle = (i * 30) * Math.PI / 180;
        const distance = 50 + Math.random() * 40;
        const duration = 800 + Math.random() * 600;
        
        const animation = particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => particle.remove();
    }
}

// ========== Gallery Filter ==========
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Rimuovi active da tutti i bottoni
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            galleryItems.forEach((item, index) => {
                if (filter === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, index * 50);
                } else {
                    if (item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, index * 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// ========== Lightbox OTTIMIZZATO ==========
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const aiPhotoSlots = document.querySelectorAll('.ai-photo-slot');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    if (!lightbox) return;
    
    // Gestisci click gallery
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img && img.complete) showLightboxImage(img);
        });
    });
    
    // Gestisci click AI photo slots
    aiPhotoSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img && img.complete) showLightboxImage(img);
        });
    });
    
    // Funzione per mostrare immagine nel lightbox OTTIMIZZATA
    function showLightboxImage(img) {
        // Preload immagine per lightbox
        const preloadImg = new Image();
        preloadImg.onload = () => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Aggiungi animazione di entrata
            lightboxImage.style.opacity = '0';
            lightboxImage.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                lightboxImage.style.transition = 'all 0.3s ease';
                lightboxImage.style.opacity = '1';
                lightboxImage.style.transform = 'scale(1)';
            }, 10);
        };
        preloadImg.src = img.src;
    }
    
    // Chiudi lightbox
    const closeLightboxHandler = () => {
        lightboxImage.style.opacity = '0';
        lightboxImage.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    };
    
    if (closeLightbox) {
        closeLightbox.addEventListener('click', closeLightboxHandler);
    }
    
    // Chiudi cliccando fuori dall'immagine
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxHandler();
        }
    });
    
    // Chiudi con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightboxHandler();
        }
    });
}

// ========== Contact Form OTTIMIZZATO ==========
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Inizializza EmailJS con la Public Key
    if (typeof emailjs !== 'undefined') {
        emailjs.init("ffXv-XufHFQoQvyd3");
    }
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('.submit-button');
        const buttonText = submitButton.querySelector('.button-text');
        const buttonLoading = submitButton.querySelector('.button-loading');
        
        // Mostra stato di loading
        submitButton.disabled = true;
        if (buttonText) buttonText.style.display = 'none';
        if (buttonLoading) buttonLoading.style.display = 'inline-block';
        
        // Raccogli i dati del form
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // Invia email con EmailJS se disponibile
            if (typeof emailjs !== 'undefined') {
                await emailjs.send(
                    "service_tbtgcwg",      // Service ID
                    "template_5gmjb9o",     // Template ID
                    {
                        from_name: data.name,
                        from_email: data.email,
                        phone: data.phone,
                        package: data.package,
                        message: data.message || "Nessun messaggio aggiuntivo"
                    }
                );
            }
            
            // Successo
            showNotification('Grazie per la tua richiesta! Ti contatteremo presto.', 'success');
            form.reset();
            
            // Google Analytics event (se disponibile)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'Contact',
                    event_label: data.package || 'General'
                });
            }
            
        } catch (error) {
            // Errore
            showNotification('Si Ã¨ verificato un errore. Riprova piÃ¹ tardi.', 'error');
            console.error('Errore invio email:', error);
        } finally {
            // Ripristina bottone
            submitButton.disabled = false;
            if (buttonText) buttonText.style.display = 'inline-block';
            if (buttonLoading) buttonLoading.style.display = 'none';
        }
    });
}

// ========== Parallax Effect OTTIMIZZATO ==========
function initParallax() {
    const floatElements = document.querySelectorAll('.float-element');
    let ticking = false;
    
    function updateParallax(e) {
        if (!ticking) {
            requestAnimationFrame(() => {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                
                floatElements.forEach((el, index) => {
                    const speed = (index + 1) * 10; // Ridotto per performance
                    el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    document.addEventListener('mousemove', updateParallax);
}

// ========== Navbar Scroll Effect OTTIMIZZATO ==========
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    let ticking = false;
    
    function updateNavbar() {
        const currentScroll = window.pageYOffset;
        
        // Aggiungi ombra quando si scrolla
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        }
        
        // Nascondi/mostra navbar basato sulla direzione dello scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
}

// ========== Lazy Loading per Gallery OTTIMIZZATO ==========
function initLazyLoading() {
    const images = document.querySelectorAll('.gallery-item img, .brand-logo img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Se hai immagini con data-src per lazy loading
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        images.forEach(img => {
            img.classList.add('loading');
            imageObserver.observe(img);
        });
    }
}

// ========== Gallery Show More OTTIMIZZATO ==========
function initGalleryShowMore() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const hiddenItems = document.querySelectorAll('.gallery-hidden');
    const btnText = showMoreBtn?.querySelector('.btn-text');
    const btnCount = showMoreBtn?.querySelector('.btn-count');
    const btnIcon = showMoreBtn?.querySelector('.fas');
    
    if (!showMoreBtn || hiddenItems.length === 0) return;
    
    let isExpanded = false;
    
    showMoreBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        
        hiddenItems.forEach((item, index) => {
            if (isExpanded) {
                // Mostra con animazione staggered
                setTimeout(() => {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    item.classList.remove('gallery-hidden');
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                }, index * 100);
            } else {
                // Nascondi con animazione
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                    item.classList.add('gallery-hidden');
                }, 300);
            }
        });
        
        // Aggiorna il bottone
        if (isExpanded) {
            if (btnText) btnText.textContent = 'Mostra Meno';
            if (btnCount) btnCount.style.display = 'none';
            if (btnIcon) btnIcon.style.transform = 'rotate(180deg)';
            showMoreBtn.classList.add('expanded');
        } else {
            if (btnText) btnText.textContent = 'Mostra Altri Progetti';
            if (btnCount) btnCount.style.display = 'inline-block';
            if (btnIcon) btnIcon.style.transform = 'rotate(0deg)';
            showMoreBtn.classList.remove('expanded');
        }
        
        // Scroll smooth verso la galleria se si sta chiudendo
        if (!isExpanded) {
            setTimeout(() => {
                const gallery = document.querySelector('#gallery');
                if (gallery) {
                    gallery.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 500);
        }
    });
    
    // Update counter basato su quante foto sono nascoste
    if (btnCount) {
        btnCount.textContent = `(+${hiddenItems.length})`;
    }
}

// ========== Mostra notifica OTTIMIZZATO ==========
function showNotification(message, type = 'info') {
    // Rimuovi notifiche esistenti
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Stili inline per la notifica
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '600',
        zIndex: '9999',
        animation: 'slideInLeft 0.3s ease',
        backgroundColor: type === 'success' ? '#4CAF50' : '#f44336',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    document.body.appendChild(notification);
    
    // Rimuovi dopo 5 secondi
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Click per chiudere
    notification.addEventListener('click', () => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// ========== Utility Functions OTTIMIZZATE ==========

// Debounce per performance
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

// Check se elemento Ã¨ in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element
function scrollToElement(element, offset = 80) {
    if (element) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// ========== Performance Monitoring OTTIMIZZATO ==========
if ('performance' in window) {
    window.addEventListener('load', () => {
        // Usa setTimeout per non bloccare il rendering
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
            
            // Google Analytics event (se disponibile)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_load_time', {
                    event_category: 'Performance',
                    value: Math.round(pageLoadTime)
                });
            }
        }, 100);
    });
}

// ========== Error Handling MIGLIORATO ==========
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Google Analytics event (se disponibile)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'javascript_error', {
            event_category: 'Error',
            event_label: e.error?.message || 'Unknown error'
        });
    }
}, { passive: true });

// ========== Mobile Menu - NUOVO ==========
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    let mobileOverlay = document.querySelector('.mobile-overlay');
    
    if (!mobileToggle || !navLinks) return;
    
    // Crea overlay se non esiste
    if (!mobileOverlay) {
        mobileOverlay = document.createElement('div');
        mobileOverlay.className = 'mobile-overlay';
        document.body.appendChild(mobileOverlay);
    }
    
    // Toggle menu al click hamburger
    mobileToggle.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        
        this.classList.toggle('active');
        navLinks.classList.toggle('mobile-active');
        mobileOverlay.classList.toggle('active');
        
        // Previeni scroll quando menu aperto
        document.body.style.overflow = isActive ? '' : 'hidden';
    });
    
    // Chiudi menu cliccando sui link
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('mobile-active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Chiudi menu cliccando sull'overlay
    mobileOverlay.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('mobile-active');
        this.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Chiudi menu con tasto ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('mobile-active')) {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('mobile-active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// RICORDATI: Aggiungi anche initMobileMenu(); nella sezione DOMContentLoaded all'inizio del file

// ========== Mobile Menu - NUOVO ==========
function initMobileMenu() {
    // ... tutto il codice del mobile menu ...
}

// RICORDATI: Aggiungi anche initMobileMenu(); nella sezione DOMContentLoaded all'inizio del file

// ========== Switch 6/12 Mesi per Pacchetti - VERSIONE DEFINITIVA ==========
function initDurationSwitch() {
    const toggle = document.getElementById('durationToggle');
    if (!toggle) return;
    
    const packages = document.querySelectorAll('.package[data-duration]');
    
    toggle.addEventListener('change', function() {
        const is12Months = this.checked;
        
        packages.forEach(pkg => {
            const duration = pkg.getAttribute('data-duration');
            
            if (duration === '6' && is12Months) {
                // Nascondi pacchetti 6 mesi
                pkg.style.opacity = '0';
                pkg.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    pkg.style.display = 'none';
                }, 300);
            } else if (duration === '12' && is12Months) {
                // Mostra pacchetti 12 mesi
                pkg.style.display = 'flex';
                pkg.style.flexDirection = 'column';
                pkg.style.opacity = '0';
                pkg.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    pkg.style.opacity = '1';
                    pkg.style.transform = 'scale(1)';
                }, 50);
            } else if (duration === '6' && !is12Months) {
                // Mostra pacchetti 6 mesi
                pkg.style.display = 'flex';
                pkg.style.flexDirection = 'column';
                pkg.style.opacity = '0';
                pkg.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    pkg.style.opacity = '1';
                    pkg.style.transform = 'scale(1)';
                }, 50);
            } else if (duration === '12' && !is12Months) {
                // Nascondi pacchetti 12 mesi
                pkg.style.opacity = '0';
                pkg.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    pkg.style.display = 'none';
                }, 300);
            }
        });
    });
}

// ========== Export per testing (se necessario) ==========
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSmoothScrolling,
        initScrollReveal,
        initGalleryFilter,
        showNotification,
        debounce,
        isInViewport
    };
}