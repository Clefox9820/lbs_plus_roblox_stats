// Configuration file example for Looker Studio reports
// Copy this file to config.js and update with your actual report URLs
// IMPORTANT: Keep config.js private and do not commit sensitive URLs to public repositories

const CONFIG = {
    // Looker Studio report URLs
    reports: {
        landscape: {
            url: 'https://lookerstudio.google.com/embed/reporting/YOUR_LANDSCAPE_REPORT_ID/page/YOUR_PAGE_ID',
            description: 'Horizontal orientation report'
        },
        portrait: {
            url: 'https://lookerstudio.google.com/embed/reporting/YOUR_PORTRAIT_REPORT_ID/page/YOUR_PAGE_ID',
            description: 'Vertical orientation report'
        }
    },

    // Tutorial URLs
    tutorials: {
        landscape: {
            url: 'https://scribehow.com/embed/YOUR_LANDSCAPE_TUTORIAL_ID?skipIntro=true',
            description: 'Tutorial for horizontal orientation'
        },
        portrait: {
            url: 'https://scribehow.com/embed/YOUR_PORTRAIT_TUTORIAL_ID?skipIntro=true',
            description: 'Tutorial for vertical orientation'
        }
    },

    // Loading screen settings
    loadingScreen: {
        duration: 4000, // milliseconds
        logoPath: 'logo.png'
    },

    // UI settings
    ui: {
        tutorialButton: {
            visible: true,
            position: { bottom: '120px', right: '30px' }
        }
    }
};

// Helper function to get configuration values
function getConfig(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], CONFIG);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
