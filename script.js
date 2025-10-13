// Configuration is now loaded from config.js
// URLs are accessed via CONFIG.reports.landscape.url and CONFIG.reports.portrait.url

// Funciones para el modal del tutorial
function openTutorial() {
    const modal = document.getElementById('tutorialModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeTutorial() {
    const modal = document.getElementById('tutorialModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function closeTutorialOnOutside(event) {
    if (event.target.id === 'tutorialModal') {
        closeTutorial();
    }
}

// Cerrar con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeTutorial();
    }
});

// Ajustar altura del viewport dinámicamente
function adjustViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Función para verificar si el dispositivo está en orientación horizontal o vertical
function checkOrientationAndUpdateIframe() {
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    // Iframes de Looker Studio
    const landscapeIframe = document.getElementById('landscapeIframe');
    const portraitIframe = document.getElementById('portraitIframe');

    // Iframes de tutoriales
    const tutorialLandscape = document.getElementById('tutorialLandscape');
    const tutorialPortrait = document.getElementById('tutorialPortrait');

    if (isPortrait) {
        // Mostrar iframes verticales
        landscapeIframe.classList.remove('active');
        portraitIframe.classList.add('active');

        if (tutorialLandscape && tutorialPortrait) {
            tutorialLandscape.classList.remove('active');
            tutorialPortrait.classList.add('active');
        }
    } else {
        // Mostrar iframes horizontales
        portraitIframe.classList.remove('active');
        landscapeIframe.classList.add('active');

        if (tutorialLandscape && tutorialPortrait) {
            tutorialPortrait.classList.remove('active');
            tutorialLandscape.classList.add('active');
        }
    }
}

// Función para ocultar el botón del tutorial (temporalmente, se restaura al recargar)
function hideTutorialButton(event) {
    event.stopPropagation(); // Evitar que se abra el tutorial al cerrar
    const button = document.getElementById('tutorialButton');
    button.classList.add('hidden');
}

// Ocultar pantalla de carga
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hide');

        // Eliminar del DOM después de la transición
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Función para actualizar las URLs de los iframes dinámicamente
function updateIframeSources() {
    // Verificar que CONFIG esté disponible
    if (typeof CONFIG === 'undefined') {
        console.error('CONFIG not loaded. Make sure config.js is included before script.js');
        return;
    }

    // Actualizar iframes de Looker Studio
    const landscapeIframe = document.getElementById('landscapeIframe');
    const portraitIframe = document.getElementById('portraitIframe');

    if (landscapeIframe && CONFIG.reports.landscape) {
        landscapeIframe.src = CONFIG.reports.landscape.url;
    }

    if (portraitIframe && CONFIG.reports.portrait) {
        portraitIframe.src = CONFIG.reports.portrait.url;
    }

    // Actualizar iframes de tutorial
    const tutorialLandscape = document.getElementById('tutorialLandscape');
    const tutorialPortrait = document.getElementById('tutorialPortrait');

    if (tutorialLandscape && CONFIG.tutorials.landscape) {
        tutorialLandscape.src = CONFIG.tutorials.landscape.url;
    }

    if (tutorialPortrait && CONFIG.tutorials.portrait) {
        tutorialPortrait.src = CONFIG.tutorials.portrait.url;
    }
}

// Inicializar cuando la página cargue
window.addEventListener('DOMContentLoaded', function() {
    // Actualizar las URLs de los iframes desde la configuración
    updateIframeSources();

    adjustViewportHeight();
    checkOrientationAndUpdateIframe();

    // Ocultar pantalla de carga después de 4 segundos
    // Looker Studio tiene su propia pantalla de carga interna
    const loadingDuration = (typeof CONFIG !== 'undefined' && CONFIG.loadingScreen)
        ? CONFIG.loadingScreen.duration
        : 4000;
    setTimeout(hideLoadingScreen, loadingDuration);
});

// Verificar cuando cambia la orientación
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        adjustViewportHeight();
        checkOrientationAndUpdateIframe();
    }, 100);
});

// También verificar al redimensionar (para navegadores que no soportan orientationchange)
window.addEventListener('resize', () => {
    adjustViewportHeight();
    checkOrientationAndUpdateIframe();
});

// Ajustar cuando aparece/desaparece la barra del navegador
window.addEventListener('scroll', adjustViewportHeight);
