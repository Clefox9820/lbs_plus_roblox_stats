# LBS+ Roblox Stats Dashboard

Dashboard web para visualizar estadísticas de Roblox usando Looker Studio con soporte para orientación responsive.

## 🚀 Configuración Inicial

### 1. Configurar las URLs de los reportes

1. Copia el archivo de configuración de ejemplo:
   ```bash
   cp config.example.js config.js
   ```

2. Edita `config.js` y reemplaza las URLs de ejemplo con tus URLs reales de Looker Studio:
   ```javascript
   const CONFIG = {
       reports: {
           landscape: {
               url: 'TU_URL_DE_LOOKER_STUDIO_HORIZONTAL'
           },
           portrait: {
               url: 'TU_URL_DE_LOOKER_STUDIO_VERTICAL'
           }
       },
       tutorials: {
           landscape: {
               url: 'TU_URL_DE_TUTORIAL_HORIZONTAL'
           },
           portrait: {
               url: 'TU_URL_DE_TUTORIAL_VERTICAL'
           }
       }
   };
   ```

### 2. Archivo de configuración

⚠️ **IMPORTANTE**: El archivo `config.js` contiene las URLs de tus reportes.

- Si los reportes son **privados**, agrega `config.js` al `.gitignore` para no exponerlos
- Si los reportes son **públicos**, puedes commitear `config.js` al repositorio

Para proyectos privados, agrega esta línea a `.gitignore`:
```
config.js
```

## 📁 Estructura del Proyecto

```
.
├── index.html          # Página principal
├── script.js           # Lógica de la aplicación
├── styles.css          # Estilos
├── config.js           # Configuración (URLs de reportes) - NO COMMITEAR si es privado
├── config.example.js   # Ejemplo de configuración
├── logo.png           # Logo de la pantalla de carga
└── README.md          # Esta documentación
```

## 🎯 Características

- ✅ Dashboard responsive con soporte para orientación horizontal y vertical
- ✅ Iframes de Looker Studio embebidos
- ✅ Tutoriales interactivos con ScribeHow
- ✅ Pantalla de carga personalizada
- ✅ Botón flotante para acceder a tutoriales
- ✅ Configuración centralizada en archivo externo

## 🔧 Personalización

### Cambiar la duración de la pantalla de carga

Edita `config.js`:
```javascript
loadingScreen: {
    duration: 5000, // Cambia a 5 segundos
    logoPath: 'logo.png'
}
```

### Ocultar el botón de tutorial

Edita `config.js`:
```javascript
ui: {
    tutorialButton: {
        visible: false
    }
}
```

## 🌐 Despliegue

### GitHub Pages

1. Asegúrate de que `config.js` esté configurado correctamente
2. Sube los archivos a tu repositorio
3. Habilita GitHub Pages en Settings > Pages
4. Selecciona la rama y carpeta raíz

### Servidor Local

Puedes usar cualquier servidor web estático:

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

## 🔒 Seguridad

- Las URLs de los reportes están separadas en un archivo de configuración
- Los iframes usan atributos `sandbox` para seguridad
- Todos los recursos externos usan HTTPS
- Se recomienda implementar Content Security Policy (CSP) en producción

## 📝 Notas de Desarrollo

- El proyecto usa JavaScript vanilla (sin frameworks)
- Compatible con navegadores modernos
- Responsive design con media queries
- Optimizado para móviles y tablets

## 🐛 Solución de Problemas

### Los iframes no se muestran

1. Verifica que `config.js` existe y tiene las URLs correctas
2. Abre la consola del navegador (F12) y busca errores
3. Asegúrate de que las URLs de Looker Studio son accesibles

### El tutorial no se abre

1. Verifica que las URLs de ScribeHow están configuradas
2. Revisa que el modal no esté siendo bloqueado por CSS

### Pantalla de carga no desaparece

1. Verifica que `logo.png` existe
2. Ajusta `loadingScreen.duration` en `config.js`
3. Revisa la consola del navegador para errores

## 📄 Licencia

Este proyecto es de uso interno para LBS+.

## 👥 Contribuir

Para contribuir al proyecto:

1. No commites archivos sensibles (`config.js` con URLs privadas)
2. Usa `config.example.js` como referencia
3. Documenta cualquier cambio significativo

---

**Creado con ❤️ para LBS+**
