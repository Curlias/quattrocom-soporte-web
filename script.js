// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const navLinks = document.querySelectorAll('.nav-link');
const actionCards = document.querySelectorAll('.action-card');
const faqItems = document.querySelectorAll('.faq-item');
const reportForm = document.getElementById('report-form');
const searchInput = document.getElementById('search-input');
const troubleshootCards = document.querySelectorAll('.troubleshoot-card');

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.activeSection = 'home';
        this.init();
    }

    init() {
        // Mobile menu toggle
        menuToggle.addEventListener('click', () => this.toggleMobileMenu());

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Action cards navigation
        actionCards.forEach(card => {
            card.addEventListener('click', () => this.handleActionCardClick(card));
        });

        // Smooth scrolling observer
        this.setupScrollObserver();

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }

    toggleMobileMenu() {
        navMenu.classList.toggle('show');
        menuToggle.classList.toggle('active');
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetSection = e.target.getAttribute('href').substring(1);
        this.navigateToSection(targetSection);
        
        // Close mobile menu
        navMenu.classList.remove('show');
        menuToggle.classList.remove('active');
    }

    handleActionCardClick(card) {
        const targetSection = card.getAttribute('data-section');
        if (targetSection) {
            this.navigateToSection(targetSection);
        }
    }

    navigateToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    setupScrollObserver() {
        const sections = document.querySelectorAll('.section');
        const options = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveNavLink(entry.target.id);
                }
            });
        }, options);

        sections.forEach(section => observer.observe(section));
    }

    updateActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
        this.activeSection = sectionId;
    }

    handleOutsideClick(e) {
        if (!e.target.closest('.nav') && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            menuToggle.classList.remove('active');
        }
    }
}

// FAQ Management
class FAQManager {
    constructor() {
        this.init();
    }

    init() {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => this.toggleFAQ(item));
        });
    }

    toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Toggle current FAQ if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// Search Functionality
class SearchManager {
    constructor() {
        this.init();
    }

    init() {
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        // Search button
        const searchBtn = document.querySelector('.search-btn');
        searchBtn.addEventListener('click', () => this.performSearch());
    }

    handleSearch(query) {
        this.debounce(() => this.filterCards(query), 300)();
    }

    filterCards(query) {
        const searchTerm = query.toLowerCase().trim();
        
        troubleshootCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const keywords = card.getAttribute('data-keywords') || '';
            
            const matchesSearch = searchTerm === '' || 
                                title.includes(searchTerm) || 
                                description.includes(searchTerm) ||
                                keywords.toLowerCase().includes(searchTerm);
            
            if (matchesSearch) {
                card.style.display = 'block';
                card.classList.add('animate-fade-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('animate-fade-in');
            }
        });
    }

    performSearch() {
        this.filterCards(searchInput.value);
    }

    debounce(func, wait) {
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
}

// Form Validation and Submission
class FormManager {
    constructor() {
        this.init();
    }

    init() {
        if (reportForm) {
            reportForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
            
            // Real-time validation
            const inputs = reportForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.submitForm();
        }
    }

    validateForm() {
        const requiredFields = reportForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        let isValid = true;
        let errorMessage = '';
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'Este campo es obligatorio';
            isValid = false;
        }
        // Email validation
        else if (fieldType === 'email' && value && !this.isValidEmail(value)) {
            errorMessage = 'Ingrese un email válido';
            isValid = false;
        }
        // Phone validation
        else if (fieldType === 'tel' && value && !this.isValidPhone(value)) {
            errorMessage = 'Ingrese un teléfono válido';
            isValid = false;
        }
        // File validation
        else if (fieldType === 'file' && field.files.length > 0) {
            const file = field.files[0];
            if (!this.isValidFileType(file)) {
                errorMessage = 'Formato de archivo no válido';
                isValid = false;
            } else if (!this.isValidFileSize(file)) {
                errorMessage = 'El archivo es demasiado grande (máx. 5MB)';
                isValid = false;
            }
        }
        
        this.showFieldError(field, errorMessage);
        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        if (message) {
            field.classList.add('error');
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            field.parentNode.appendChild(errorElement);
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    isValidFileType(file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        return allowedTypes.includes(file.type);
    }

    isValidFileSize(file) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        return file.size <= maxSize;
    }

    async submitForm() {
        const submitBtn = reportForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';
        submitBtn.disabled = true;
        reportForm.classList.add('loading');
        
        try {
            // Simulate API call
            await this.simulateFormSubmission();
            
            // Show success message
            this.showSuccessMessage();
            reportForm.reset();
            
        } catch (error) {
            this.showErrorMessage();
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            reportForm.classList.remove('loading');
        }
    }

    simulateFormSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000); // Simulate 2 second delay
        });
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'form-message success';
        message.innerHTML = `
            <div class="message-icon">✅</div>
            <div class="message-content">
                <h4>¡Reporte enviado exitosamente!</h4>
                <p>Hemos recibido tu reporte. Nuestro equipo técnico se pondrá en contacto contigo pronto.</p>
            </div>
        `;
        
        reportForm.parentNode.insertBefore(message, reportForm);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
        
        // Scroll to message
        message.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    showErrorMessage() {
        const message = document.createElement('div');
        message.className = 'form-message error';
        message.innerHTML = `
            <div class="message-icon">❌</div>
            <div class="message-content">
                <h4>Error al enviar el reporte</h4>
                <p>Hubo un problema al procesar tu solicitud. Por favor, inténtalo nuevamente o contacta soporte directamente.</p>
            </div>
        `;
        
        reportForm.parentNode.insertBefore(message, reportForm);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
}

// Network Status Manager
class NetworkStatusManager {
    constructor() {
        this.statusData = {
            overall: 'operational', // operational, degraded, maintenance, incident
            services: [
                { name: 'Internet Residencial', status: 'operational' },
                { name: 'Internet Empresarial', status: 'operational' },
                { name: 'Soporte Técnico', status: 'operational' },
                { name: 'Portal de Cliente', status: 'operational' }
            ],
            lastUpdated: new Date()
        };
        
        this.init();
    }

    init() {
        this.updateStatusDisplay();
        
        // Update status every 2 minutes
        setInterval(() => {
            this.checkNetworkStatus();
        }, 120000);
    }

    async checkNetworkStatus() {
        try {
            // Simulate network status check
            await this.simulateStatusCheck();
            this.statusData.lastUpdated = new Date();
            this.updateStatusDisplay();
        } catch (error) {
            console.error('Error checking network status:', error);
        }
    }

    simulateStatusCheck() {
        return new Promise((resolve) => {
            // Simulate random status changes (mainly operational)
            const statuses = ['operational', 'operational', 'operational', 'degraded'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            
            this.statusData.overall = randomStatus;
            
            setTimeout(resolve, 1000);
        });
    }

    updateStatusDisplay() {
        // Update hero status indicator
        const heroStatusDot = document.querySelector('.hero .status-dot');
        const heroStatusText = document.querySelector('.hero .status-indicator span');
        
        if (heroStatusDot && heroStatusText) {
            heroStatusDot.className = `status-dot ${this.statusData.overall}`;
            heroStatusText.textContent = this.getStatusText(this.statusData.overall);
        }

        // Update status page
        this.updateStatusPage();
    }

    updateStatusPage() {
        const statusCard = document.querySelector('.status-overview .status-card');
        const serviceItems = document.querySelectorAll('.service-item');
        const lastUpdatedElement = document.querySelector('.last-updated');
        
        if (statusCard) {
            statusCard.className = `status-card ${this.statusData.overall}`;
            const statusTitle = statusCard.querySelector('h3');
            const statusDescription = statusCard.querySelector('p');
            
            if (statusTitle) {
                statusTitle.textContent = this.getStatusText(this.statusData.overall);
            }
            
            if (statusDescription) {
                statusDescription.textContent = this.getStatusDescription(this.statusData.overall);
            }
        }
        
        // Update service status
        serviceItems.forEach((item, index) => {
            if (this.statusData.services[index]) {
                const serviceDot = item.querySelector('.service-dot');
                const serviceStatusText = item.querySelector('.service-status-text');
                
                if (serviceDot) {
                    serviceDot.className = `service-dot ${this.statusData.services[index].status}`;
                }
                
                if (serviceStatusText) {
                    serviceStatusText.textContent = this.getStatusText(this.statusData.services[index].status);
                }
            }
        });
        
        // Update last updated time
        if (lastUpdatedElement) {
            lastUpdatedElement.textContent = `Última actualización: ${this.getTimeAgo(this.statusData.lastUpdated)}`;
        }
    }

    getStatusText(status) {
        const statusTexts = {
            operational: 'Servicio Operacional',
            degraded: 'Servicio Degradado',
            maintenance: 'Mantenimiento',
            incident: 'Incidencia'
        };
        
        return statusTexts[status] || 'Estado Desconocido';
    }

    getStatusDescription(status) {
        const descriptions = {
            operational: 'Todos los servicios funcionan normalmente',
            degraded: 'Algunos servicios pueden experimentar lentitud',
            maintenance: 'Mantenimiento programado en curso',
            incident: 'Investigando problemas reportados'
        };
        
        return descriptions[status] || 'Verificando estado de los servicios';
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / 60000);
        
        if (diffInMinutes < 1) {
            return 'Hace menos de 1 minuto';
        } else if (diffInMinutes < 60) {
            return `Hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`;
        } else {
            const hours = Math.floor(diffInMinutes / 60);
            return `Hace ${hours} hora${hours !== 1 ? 's' : ''}`;
        }
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupCardHoverEffects();
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.action-card, .troubleshoot-card, .contact-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.action-card, .troubleshoot-card, .contact-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCardHover(card, false);
            });
        });
    }

    animateCardHover(card, isHover) {
        if (isHover) {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
        }
    }
}

// Utility Functions
class Utils {
    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            backgroundColor: type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3',
            color: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    static smoothScrollTo(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    static debounce(func, wait) {
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
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    const themeManager = new ThemeManager();
    const navigationManager = new NavigationManager();
    const faqManager = new FAQManager();
    const searchManager = new SearchManager();
    const formManager = new FormManager();
    const networkStatusManager = new NetworkStatusManager();
    const animationManager = new AnimationManager();
    
    // Add additional event listeners
    setupAdditionalFeatures();
    
    console.log('Quattrocom Support Portal initialized successfully');
});

function setupAdditionalFeatures() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const menuToggle = document.getElementById('menu-toggle');
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                menuToggle.classList.remove('active');
            }
            
            // Close any open FAQs
            document.querySelectorAll('.faq-item.active').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    // Print functionality
    const printButtons = document.querySelectorAll('[data-print]');
    printButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.print();
        });
    });
    
    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const textToCopy = button.getAttribute('data-copy');
            try {
                await navigator.clipboard.writeText(textToCopy);
                Utils.showNotification('Copiado al portapapeles', 'success');
            } catch (error) {
                Utils.showNotification('Error al copiar', 'error');
            }
        });
    });
    
    // External link handling
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // Form auto-save (optional)
    const formInputs = document.querySelectorAll('#report-form input, #report-form select, #report-form textarea');
    formInputs.forEach(input => {
        // Load saved data
        const savedValue = localStorage.getItem(`form_${input.name}`);
        if (savedValue && input.type !== 'file') {
            input.value = savedValue;
        }
        
        // Save data on change
        input.addEventListener('input', Utils.debounce(() => {
            if (input.type !== 'file') {
                localStorage.setItem(`form_${input.name}`, input.value);
            }
        }, 500));
    });
    
    // Clear form data when form is successfully submitted
    document.addEventListener('formSubmitSuccess', () => {
        formInputs.forEach(input => {
            localStorage.removeItem(`form_${input.name}`);
        });
    });
}

// Add CSS for error states and notifications
const additionalCSS = `
    .field-error {
        color: #f44336;
        font-size: 0.75rem;
        margin-top: 0.25rem;
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #f44336;
    }
    
    .form-message {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        animation: slideIn 0.3s ease;
    }
    
    .form-message.success {
        background: #e8f5e8;
        border: 1px solid #4caf50;
        color: #2e7d32;
    }
    
    .form-message.error {
        background: #ffebee;
        border: 1px solid #f44336;
        color: #c62828;
    }
    
    .message-icon {
        font-size: 1.5rem;
    }
    
    .message-content h4 {
        margin-bottom: 0.25rem;
        font-size: 1rem;
    }
    
    .message-content p {
        margin: 0;
        font-size: 0.875rem;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);