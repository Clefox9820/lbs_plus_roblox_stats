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

        // Cargar el src solo si no está cargado
        if (!portraitIframe.src) {
            portraitIframe.src = IFRAME_URLS.portrait;
        }

        if (tutorialLandscape && tutorialPortrait) {
            tutorialLandscape.classList.remove('active');
            tutorialPortrait.classList.add('active');
        }
    } else {
        // Mostrar iframes horizontales
        portraitIframe.classList.remove('active');
        landscapeIframe.classList.add('active');

        // Cargar el src solo si no está cargado
        if (!landscapeIframe.src) {
            landscapeIframe.src = IFRAME_URLS.landscape;
        }

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
    loadingScreen.classList.add('hide');

    // Eliminar del DOM después de la transición
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
}

// Inicializar cuando la página cargue
window.addEventListener('DOMContentLoaded', function() {
    adjustViewportHeight();
    checkOrientationAndUpdateIframe();

    // Ocultar pantalla de carga después de 4 segundos
    // Looker Studio tiene su propia pantalla de carga interna
    setTimeout(hideLoadingScreen, 4000);
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
