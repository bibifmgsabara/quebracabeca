// FUNÇÃO PRINCIPAL EXECUTADA QUANDO O DOM ESTÁ CARREGADO
document.addEventListener('DOMContentLoaded', function() {
    // INICIALIZAR ANIMAÇÕES E EVENTOS
    initializeAnimations();
    initializeSmoothScroll();
    initializeGameCards();
    
    console.log('Site de Jogos de Quebra-Cabeça carregado com sucesso!');
});

// FUNÇÃO PARA INICIALIZAR ANIMAÇÕES
function initializeAnimations() {
    // OBSERVER PARA ANIMAÇÕES AO SCROLL
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
    
    // OBSERVAR CARDS DOS JOGOS PARA ANIMAÇÃO
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        // APLICAR DELAY ESCALONADO PARA EFEITO CASCATA
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// FUNÇÃO PARA SCROLL SUAVE
function initializeSmoothScroll() {
    // SCROLL SUAVE PARA LINKS INTERNOS
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// FUNÇÃO PARA INICIALIZAR INTERATIVIDADE DOS CARDS
function initializeGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        // EFEITO DE HOVER APRIMORADO
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // EFEITO DE CLIQUE
        card.addEventListener('click', function() {
            const el = this;
            
            // ANIMAÇÃO DE CLIQUE
            el.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                el.style.transform = 'translateY(-10px) scale(1.02)';
            }, 150);

            // Pegar o game ID do data-attribute ou do onclick
            let gameId = el.dataset.gameId;
            
            // Se não tiver data-game-id, tenta pegar do onclick
            if (!gameId && el.hasAttribute('onclick')) {
                const onclickAttr = el.getAttribute('onclick');
                const match = onclickAttr.match(/openGameDetails\(['"]([^'"]+)['"]\)/);
                if (match) {
                    gameId = match[1];
                }
            }

            if (gameId) {
                setTimeout(() => openGameDetails(gameId), 200);
            }
        });
    });
}

// FUNÇÃO PARA ABRIR DETALHES DO JOGO
function openGameDetails(gameId) {
    // Mapeamento de IDs para nomes de arquivo
    const pageMap = {
        'quixo': 'quixo.html',
        'kendama': 'kendama.html',
        'argola-prisioneira': 'argola-prisioneira.html',
        'tetris-3d': 'tetris-3d.html',
        'senhoritas-chinesas': 'senhoritas-chinesas.html',
        'travas-do-herois': 'travas-do-herois.html',
        'tetris-3d-torre': 'tetris-3d-torre.html',
        'a-caixa-de-pandora': 'a-caixa-de-pandora.html',
        'a-gaiola': 'a-gaiola.html',
        'bola-prisioneira': 'bola-prisioneira.html',
        'estrela-magica': 'estrela-magica.html',
        'o-carrossel': 'o-carrossel.html'
    };

    // MOSTRAR LOADING
    showLoading();
    
    // SIMULAR CARREGAMENTO E REDIRECIONAR
    setTimeout(() => {
        const targetPage = pageMap[gameId] || `${gameId}.html`;
        window.location.href = `pages/${targetPage}`;
    }, 500);
}

// FUNÇÃO PARA MOSTRAR LOADING
function showLoading() {
    // CRIAR OVERLAY DE LOADING
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <i class="fas fa-puzzle-piece fa-spin"></i>
            <p>Carregando jogo...</p>
        </div>
    `;
    
    // ADICIONAR ESTILOS INLINE PARA O LOADING
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const spinner = loadingOverlay.querySelector('.loading-spinner');
    spinner.style.cssText = `
        text-align: center;
        color: white;
    `;
    
    const icon = spinner.querySelector('i');
    icon.style.cssText = `
        font-size: 3rem;
        color: #f59e0b;
        margin-bottom: 1rem;
        display: block;
    `;
    
    const text = spinner.querySelector('p');
    text.style.cssText = `
        font-size: 1.2rem;
        margin: 0;
    `;
    
    document.body.appendChild(loadingOverlay);
    
    // FADE IN DO LOADING
    setTimeout(() => {
        loadingOverlay.style.opacity = '1';
    }, 10);
}

// FUNÇÃO PARA ADICIONAR EFEITOS VISUAIS EXTRAS
function addVisualEffects() {
    // EFEITO DE PARTÍCULAS NO BACKGROUND (OPCIONAL)
    const hero = document.querySelector('.hero-section');
    if (hero) {
        // CRIAR PARTÍCULAS FLUTUANTES
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(55, 196, 42, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: floatParticle ${Math.random() * 3 + 2}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
        }
    }
}

// FUNÇÃO PARA DETECTAR DISPOSITIVO MÓVEL
function isMobileDevice() {
    return window.innerWidth <= 768;
}

// FUNÇÃO PARA OTIMIZAR PERFORMANCE EM MOBILE
function optimizeForMobile() {
    if (isMobileDevice()) {
        // REDUZIR ANIMAÇÕES EM DISPOSITIVOS MÓVEIS
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            card.style.transition = 'all 0.2s ease';
        });
        
        // DESABILITAR EFEITOS PESADOS
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach(shape => {
            shape.style.display = 'none';
        });
    }
}

// EXECUTAR OTIMIZAÇÕES
window.addEventListener('load', function() {
    optimizeForMobile();
    addVisualEffects();
});

// REOTIMIZAR AO REDIMENSIONAR A JANELA
window.addEventListener('resize', function() {
    optimizeForMobile();
});

// ANIMAÇÃO CSS ADICIONAL PARA PARTÍCULAS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

