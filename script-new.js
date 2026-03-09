// Modular Navigation and Content Loading System
class ModularSiteManager {
    constructor() {
        this.currentSection = 'home';
        this.sections = ['home', 'speedtest', 'articles', 'troubleshooting', 'contact', 'status'];
        this.cache = new Map();
        this.themeManager = new ThemeManager();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handleInitialRoute();
    }

    setupEventListeners() {
        // Navigation links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="/"], a[href^="#"]')) {
                e.preventDefault();
                const href = e.target.getAttribute('href');
                
                if (href.startsWith('/')) {
                    this.navigateToSection(href.substring(1));
                } else if (href.startsWith('#')) {
                    this.scrollToElement(href.substring(1));
                }
            }
        });

        // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('show');
                menuToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav') && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    menuToggle.classList.remove('active');
                }
            });
        }

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handleInitialRoute();
        });
    }

    handleInitialRoute() {
        const path = window.location.pathname;
        const section = path === '/' ? 'home' : path.substring(1);
        
        if (this.sections.includes(section)) {
            this.loadSection(section);
        } else {
            this.loadSection('home');
        }
    }

    async navigateToSection(sectionName) {
        if (!this.sections.includes(sectionName)) {
            console.warn(`Section ${sectionName} not found`);
            return;
        }

        if (sectionName === this.currentSection) return;

        // Update URL without reload
        window.history.pushState({}, '', sectionName === 'home' ? '/' : `/${sectionName}`);
        
        await this.loadSection(sectionName);
    }

    async loadSection(sectionName) {
        try {
            // Show loading state
            this.showLoadingState();
            
            // Load section content
            const content = await this.fetchSectionContent(sectionName);
            
            // Update main content
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.innerHTML = content;
                
                // Initialize section-specific functionality
                this.initSectionFeatures(sectionName);
                
                // Update navigation
                this.updateActiveNavLink(sectionName);
                
                this.currentSection = sectionName;
            }
            
            // Update page title
            this.updatePageTitle(sectionName);
            
        } catch (error) {
            console.error('Error loading section:', error);
            this.showErrorState();
        }
    }

    async fetchSectionContent(sectionName) {
        // Check cache first
        if (this.cache.has(sectionName)) {
            return this.cache.get(sectionName);
        }

        const response = await fetch(`/sections/${sectionName}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load section: ${sectionName}`);
        }
        
        const content = await response.text();
        this.cache.set(sectionName, content);
        return content;
    }

    initSectionFeatures(sectionName) {
        switch (sectionName) {
            case 'home':
                this.initHomeSection();
                break;
            case 'speedtest':
                this.initSpeedTestSection();
                break;
            case 'articles':
                this.initArticlesSection();
                break;
            case 'troubleshooting':
                this.initTroubleshootingSection();
                break;
            case 'contact':
                this.initContactSection();
                break;
            case 'status':
                this.initStatusSection();
                break;
        }
    }

    initHomeSection() {
        // Initialize action cards
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', () => {
                const targetSection = card.getAttribute('data-section');
                if (targetSection) {
                    this.navigateToSection(targetSection);
                }
            });
        });
    }

    initSpeedTestSection() {
        // Speed test functionality is handled by embedded tools
        console.log('Speed test section initialized');
    }

    initArticlesSection() {
        // Initialize copy functionality for commands
        const copyBtns = document.querySelectorAll('.copy-btn');
        copyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const command = btn.getAttribute('data-command');
                this.copyToClipboard(command, btn);
            });
        });

        // Initialize article navigation
        const articleCards = document.querySelectorAll('.article-card');
        articleCards.forEach(card => {
            card.addEventListener('click', () => {
                const articleId = card.getAttribute('data-article');
                this.showArticleDetail(articleId);
            });
        });
    }

    initTroubleshootingSection() {
        // Initialize FAQ functionality
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => this.toggleFAQ(item));
            }
        });

        // Initialize search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.debounce(() => this.filterTroubleshootCards(e.target.value), 300)();
            });
        }

        // Initialize troubleshoot cards
        const troubleshootCards = document.querySelectorAll('.troubleshoot-card');
        troubleshootCards.forEach(card => {
            card.addEventListener('click', () => {
                const solution = card.querySelector('.solution-steps');
                if (solution) {
                    solution.style.display = solution.style.display === 'block' ? 'none' : 'block';
                }
            });
        });
    }

    initContactSection() {
        // Contact buttons functionality
        const contactBtns = document.querySelectorAll('.contact-btn');
        contactBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Add click tracking or analytics here if needed
                console.log('Contact method used:', btn.textContent);
            });
        });
    }

    initStatusSection() {
        // Update timestamp
        const lastUpdate = document.getElementById('lastUpdate');
        if (lastUpdate) {
            const now = new Date();
            const timestamp = now.toLocaleDateString('es-MX') + ' ' + 
                            now.toLocaleTimeString('es-MX', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            });
            lastUpdate.textContent = timestamp;
        }
    }

    // Utility Methods
    scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = 'Copiado!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Error copying to clipboard:', err);
        });
    }

    showArticleDetail(articleId) {
        const article = document.querySelector(`[data-article-id="${articleId}"]`);
        if (article) {
            article.scrollIntoView({ behavior: 'smooth' });
        }
    }

    toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('active'));
        
        // Toggle current FAQ if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }

    filterTroubleshootCards(query) {
        const searchTerm = query.toLowerCase().trim();
        const troubleshootCards = document.querySelectorAll('.troubleshoot-card');
        
        troubleshootCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const keywords = card.getAttribute('data-keywords') || '';
            
            const matchesSearch = searchTerm === '' || 
                                title.includes(searchTerm) || 
                                description.includes(searchTerm) ||
                                keywords.toLowerCase().includes(searchTerm);
            
            card.style.display = matchesSearch ? 'block' : 'none';
        });
    }

    updateActiveNavLink(sectionName) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if ((sectionName === 'home' && href === '/') || 
                (href === `/${sectionName}`)) {
                link.classList.add('active');
            }
        });
    }

    updatePageTitle(sectionName) {
        const titles = {
            home: 'Soporte Técnico - Quattrocom',
            speedtest: 'Test de Velocidad - Quattrocom',
            articles: 'Artículos Técnicos - Quattrocom',
            troubleshooting: 'Solución de Problemas - Quattrocom',
            contact: 'Contactar Soporte - Quattrocom',
            status: 'Estado del Servicio - Quattrocom'
        };
        
        document.title = titles[sectionName] || 'Quattrocom Soporte';
    }

    showLoadingState() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = '<div class="loading-spinner">Cargando...</div>';
        }
    }

    showErrorState() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="error-state">
                    <h2>Error al cargar el contenido</h2>
                    <p>Por favor, intente nuevamente.</p>
                    <button onclick="location.reload()">Recargar página</button>
                </div>
            `;
        }
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

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        }
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

// WhatsApp Floating Button
class WhatsAppManager {
    constructor() {
        this.init();
    }

    init() {
        const whatsappBtn = document.getElementById('whatsapp-float');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                window.open('https://wa.me/5214422810816', '_blank');
            });
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new ModularSiteManager();
    new WhatsAppManager();
});