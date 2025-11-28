// Initialize EmailJS
(function() {
    emailjs.init("YOUR_EMAILJS_USER_ID"); // Sostituisci con il tuo User ID di EmailJS
})();

// Form submission handler
document.getElementById('contactFormTest').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const submitButton = this.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoading = submitButton.querySelector('.button-loading');
    
    // Show loading state
    buttonText.style.display = 'none';
    buttonLoading.style.display = 'inline-block';
    submitButton.disabled = true;
    
    // Send email
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function() {
            // Success
            alert('Grazie per il tuo interesse! Ti contatteremo presto per la consulenza gratuita.');
            document.getElementById('contactFormTest').reset();
            
            // Reset button
            buttonText.style.display = 'inline-block';
            buttonLoading.style.display = 'none';
            submitButton.disabled = false;
        }, function(error) {
            // Error
            console.error('FAILED...', error);
            alert('Si è verificato un errore. Riprova o contattaci direttamente via email.');
            
            // Reset button
            buttonText.style.display = 'inline-block';
            buttonLoading.style.display = 'none';
            submitButton.disabled = false;
        });
});

// Mobile menu toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
    this.classList.toggle('active');
});

// Scroll reveal animation
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

document.querySelectorAll('.feature-card, .opt-card, .benefit-item, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});