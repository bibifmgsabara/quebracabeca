// JAVASCRIPT PARA PÁGINAS DE DETALHES DOS JOGOS

// EXECUTAR QUANDO O DOM ESTIVER CARREGADO
document.addEventListener('DOMContentLoaded', function() {
    // INICIALIZAR FUNCIONALIDADES
    initializeScrollAnimations();
    initializeNavbarEffects();
    initializeImageEffects();
    initializeTooltips();
    
    console.log('Página de detalhes do jogo carregada com sucesso!');
});

// FUNÇÃO PARA ANIMAÇÕES AO SCROLL
function initializeScrollAnimations() {
    // CONFIGURAÇÕES DO INTERSECTION OBSERVER
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // CRIAR OBSERVER PARA ANIMAÇÕES
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ADICIONAR CLASSE DE ANIMAÇÃO
                entry.target.classList.add('animate-in');
                
                // APLICAR ANIMAÇÃO ESPECÍFICA BASEADA NO ELEMENTO
                if (entry.target.classList.contains('content-section')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                if (entry.target.classList.contains('rule-item')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
                
                if (entry.target.classList.contains('tip-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            }
        });
    }, observerOptions);
    
    // OBSERVAR ELEMENTOS PARA ANIMAÇÃO
    const elementsToAnimate = document.querySelectorAll('.content-section, .rule-item, .tip-card');
    elementsToAnimate.forEach((element, index) => {
        // CONFIGURAR ESTADO INICIAL
        element.style.opacity = '0';
        
        if (element.classList.contains('content-section')) {
            element.style.transform = 'translateY(30px)';
            element.style.transition = `all 0.8s ease ${index * 0.1}s`;
        }
        
        if (element.classList.contains('rule-item')) {
            element.style.transform = 'translateX(-30px)';
            element.style.transition = `all 0.6s ease ${index * 0.15}s`;
        }
        
        if (element.classList.contains('tip-card')) {
            element.style.transform = 'translateY(20px) scale(0.95)';
            element.style.transition = `all 0.7s ease ${index * 0.1}s`;
        }
        
        // OBSERVAR ELEMENTO
        observer.observe(element);
    });
}

// FUNÇÃO PARA EFEITOS DA NAVBAR
function initializeNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        // EFEITO DE SCROLL NA NAVBAR
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-scrolled');
                navbar.style.background = 'rgba(33, 37, 41, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.classList.remove('navbar-scrolled');
                navbar.style.background = '#212529';
                navbar.style.backdropFilter = 'none';
            }
        });
        
        // SMOOTH SCROLL PARA LINKS INTERNOS
        const navLinks = navbar.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// FUNÇÃO PARA EFEITOS NAS IMAGENS
function initializeImageEffects() {
    const gameImages = document.querySelectorAll('.game-image img');
    
    gameImages.forEach(img => {
        // EFEITO DE HOVER NAS IMAGENS
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        
        // LAZY LOADING PARA IMAGENS
        if ('loading' in HTMLImageElement.prototype) {
            img.loading = 'lazy';
        }
    });
}

// FUNÇÃO PARA INICIALIZAR TOOLTIPS
function initializeTooltips() {
    // ADICIONAR TOOLTIPS PARA ÍCONES E ELEMENTOS INTERATIVOS
    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    
    if (tooltipElements.length > 0 && typeof bootstrap !== 'undefined') {
        tooltipElements.forEach(element => {
            new bootstrap.Tooltip(element);
        });
    }
    
    // TOOLTIPS CUSTOMIZADOS PARA ÍCONES DAS DICAS
    const tipIcons = document.querySelectorAll('.tip-icon');
    tipIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            // CRIAR TOOLTIP CUSTOMIZADO SE NECESSÁRIO
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// FUNÇÃO PARA ADICIONAR EFEITOS VISUAIS EXTRAS
function addVisualEnhancements() {
    // EFEITO PARALLAX SUTIL NO CABEÇALHO
    const gameHeader = document.querySelector('.game-header');
    
    if (gameHeader) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            gameHeader.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // CONTADOR ANIMADO PARA NÚMEROS (SE HOUVER)
    const numbers = document.querySelectorAll('.animated-number');
    numbers.forEach(number => {
        const finalNumber = parseInt(number.textContent);
        let currentNumber = 0;
        const increment = finalNumber / 50;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
            }
            number.textContent = Math.floor(currentNumber);
        }, 50);
    });
}

// FUNÇÃO PARA OTIMIZAÇÃO DE PERFORMANCE
function optimizePerformance() {
    // DEBOUNCE PARA EVENTOS DE SCROLL
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 10);
    };
    
    // PRELOAD DE IMAGENS IMPORTANTES
    const importantImages = document.querySelectorAll('.game-image img');
    importantImages.forEach(img => {
        const imagePreload = new Image();
        imagePreload.src = img.src;
    });
}

// FUNÇÃO PARA ACESSIBILIDADE
function enhanceAccessibility() {
    // ADICIONAR ATRIBUTOS ARIA PARA ELEMENTOS INTERATIVOS
    const interactiveElements = document.querySelectorAll('.rule-item, .tip-card');
    interactiveElements.forEach((element, index) => {
        element.setAttribute('role', 'article');
        element.setAttribute('aria-label', `Item ${index + 1}`);
    });
    
    // MELHORAR NAVEGAÇÃO POR TECLADO
    const focusableElements = document.querySelectorAll('a, button, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// EXECUTAR MELHORIAS QUANDO A PÁGINA CARREGAR COMPLETAMENTE
window.addEventListener('load', function() {
    addVisualEnhancements();
    optimizePerformance();
    enhanceAccessibility();
});

// FUNÇÃO PARA COMPARTILHAMENTO (SE NECESSÁRIO)
function initializeSharing() {
    const shareButton = document.querySelector('.share-button');
    
    if (shareButton && navigator.share) {
        shareButton.addEventListener('click', async function() {
            try {
                await navigator.share({
                    title: document.title,
                    text: document.querySelector('meta[name="description"]').content,
                    url: window.location.href
                });
            } catch (error) {
                console.log('Erro ao compartilhar:', error);
            }
        });
    }
}

// FUNÇÃO PARA MODO ESCURO (OPCIONAL)
function initializeDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // SALVAR PREFERÊNCIA NO LOCALSTORAGE
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });
        
        // CARREGAR PREFERÊNCIA SALVA
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

// INICIALIZAR FUNCIONALIDADES EXTRAS
document.addEventListener('DOMContentLoaded', function() {
    initializeSharing();
    initializeDarkMode();
});

