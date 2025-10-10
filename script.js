// URLs de los iframes de Looker Studio
const IFRAME_URLS = {
    landscape: 'https://lookerstudio.google.com/embed/reporting/0d7bab96-b8a8-4390-9037-054ab4452114/page/p_so7gf6u0wd',
    portrait: 'https://lookerstudio.google.com/embed/reporting/33a2ab98-7514-4c54-80a0-ebdc2dc35bd5/page/W1IbF'
};

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
    const landscapeIframe = document.getElementById('landscapeIframe');
    const portraitIframe = document.getElementById('portraitIframe');

    if (isPortrait) {
        // Mostrar iframe vertical
        landscapeIframe.classList.remove('active');
        portraitIframe.classList.add('active');
    } else {
        // Mostrar iframe horizontal
        portraitIframe.classList.remove('active');
        landscapeIframe.classList.add('active');
    }
}

// Verificar orientación al cargar
function checkOrientation() {
    const overlay = document.getElementById('orientationOverlay');
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    const isMobile = window.innerWidth <= 768;

    // Mostrar overlay solo si es móvil en vertical y no se ha ocultado antes
    if (isPortrait && isMobile && !sessionStorage.getItem('orientationDismissed')) {
        overlay.classList.add('show');
    } else {
        overlay.classList.remove('show');
    }
}

function hideOverlay() {
    const overlay = document.getElementById('orientationOverlay');
    overlay.classList.remove('show');
    sessionStorage.setItem('orientationDismissed', 'true');
}

// Inicializar cuando la página cargue
window.addEventListener('DOMContentLoaded', function() {
    adjustViewportHeight();
    checkOrientation();
    checkOrientationAndUpdateIframe();
});

// Verificar cuando cambia la orientación
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        adjustViewportHeight();
        checkOrientation();
        checkOrientationAndUpdateIframe();
    }, 100);
});

// También verificar al redimensionar (para navegadores que no soportan orientationchange)
window.addEventListener('resize', () => {
    adjustViewportHeight();
    checkOrientation();
    checkOrientationAndUpdateIframe();
});

// Ajustar cuando aparece/desaparece la barra del navegador
window.addEventListener('scroll', adjustViewportHeight);
