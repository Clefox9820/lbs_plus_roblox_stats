# 🔒 Security Documentation

## Content Security Policy (CSP)

Este proyecto implementa una Content Security Policy (CSP) estricta para proteger contra ataques comunes.

### CSP Implementado

```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self';
    style-src 'self' 'unsafe-inline';
    frame-src https://lookerstudio.google.com https://scribehow.com;
    img-src 'self' data: https:;
    connect-src 'self';
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
">
```

### Explicación de Directivas

| Directiva | Valor | Propósito |
|-----------|-------|-----------|
| `default-src` | `'self'` | Por defecto, solo permite recursos del mismo origen |
| `script-src` | `'self'` | ✅ Solo permite scripts del mismo origen (sin inline) |
| `style-src` | `'self' 'unsafe-inline'` | Permite estilos propios e inline |
| `frame-src` | `https://lookerstudio.google.com https://scribehow.com` | Solo permite iframes de Looker Studio y ScribeHow |
| `img-src` | `'self' data: https:` | Permite imágenes propias, data URIs y HTTPS |
| `connect-src` | `'self'` | Solo permite conexiones al mismo origen |
| `font-src` | `'self'` | Solo permite fuentes del mismo origen |
| `object-src` | `'none'` | Bloquea todos los plugins (Flash, etc.) |
| `base-uri` | `'self'` | Previene inyección de etiquetas `<base>` |
| `form-action` | `'self'` | Solo permite envío de formularios al mismo origen |
| `frame-ancestors` | `'none'` | Previene que el sitio sea embebido en iframes (clickjacking) |
| `upgrade-insecure-requests` | - | Actualiza automáticamente HTTP a HTTPS |

### ✅ Mejoras de Seguridad Implementadas

**Scripts inline eliminados**: Todos los atributos `onclick` han sido removidos del HTML y reemplazados con event listeners en JavaScript.

**Nota sobre 'unsafe-inline' en styles**: Se mantiene `'unsafe-inline'` para estilos (CSS) debido a:
- Estilos inline necesarios para algunos elementos dinámicos
- No representa un riesgo de seguridad significativo

**CSP de máxima seguridad**: `script-src 'self'` sin `'unsafe-inline'` proporciona la máxima protección contra XSS.

## Cabeceras de Seguridad Adicionales

### X-Frame-Options
```html
<meta http-equiv="X-Frame-Options" content="DENY">
```
- **Propósito**: Previene ataques de clickjacking
- **Efecto**: El sitio no puede ser embebido en iframes de otros sitios

### X-Content-Type-Options
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
```
- **Propósito**: Previene MIME type sniffing
- **Efecto**: El navegador debe respetar los Content-Types declarados

### Referrer-Policy
```html
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
```
- **Propósito**: Controla qué información de referrer se envía
- **Efecto**: Solo envía el origen en peticiones cross-origin

### Permissions-Policy
```html
<meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()">
```
- **Propósito**: Deshabilita APIs del navegador no necesarias
- **Efecto**: Bloquea acceso a geolocalización, micrófono y cámara

## Protecciones Implementadas

### ✅ Protección contra XSS (Cross-Site Scripting)
- CSP restringe la ejecución de scripts no autorizados
- Solo se permiten scripts del mismo origen
- Los iframes solo pueden cargar desde dominios específicos

### ✅ Protección contra Clickjacking
- `frame-ancestors 'none'` previene que el sitio sea embebido
- `X-Frame-Options: DENY` como capa adicional de protección

### ✅ Protección contra MIME Sniffing
- `X-Content-Type-Options: nosniff` fuerza tipos MIME correctos
- Previene que archivos maliciosos se ejecuten como scripts

### ✅ Upgrade a HTTPS
- `upgrade-insecure-requests` actualiza automáticamente HTTP a HTTPS
- Protege contra ataques man-in-the-middle

### ✅ Restricción de Recursos
- Solo se permiten iframes de Looker Studio y ScribeHow
- Imágenes solo desde fuentes confiables
- No se permiten plugins (Flash, Java, etc.)

## Sandbox de iFrames

Los iframes usan atributos `sandbox` restrictivos:

```html
sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
```

**Permisos permitidos**:
- `allow-scripts` - Necesario para que Looker Studio funcione
- `allow-same-origin` - Permite acceso al almacenamiento de Looker Studio
- `allow-popups` - Permite popups dentro del iframe
- `allow-storage-access-by-user-activation` - Acceso al almacenamiento con interacción del usuario

⚠️ **Nota**: `allow-popups-to-escape-sandbox` permite que popups escapen del sandbox. Considerar removerlo si no es estrictamente necesario.

## Verificación de CSP

Para verificar que el CSP está funcionando correctamente:

1. Abre el sitio en un navegador
2. Abre las Developer Tools (F12)
3. Ve a la pestaña "Console"
4. Busca errores de CSP (aparecerán si algo está bloqueado)

### Ejemplo de error CSP bloqueado:
```
Refused to load the script 'https://malicious-site.com/script.js' because it violates the following Content Security Policy directive: "script-src 'self'"
```

## Testing de Seguridad

### Herramientas Recomendadas

1. **Mozilla Observatory**
   - URL: https://observatory.mozilla.org
   - Analiza las cabeceras de seguridad del sitio
   - Proporciona una calificación de seguridad

2. **CSP Evaluator**
   - URL: https://csp-evaluator.withgoogle.com
   - Evalúa la efectividad de tu CSP
   - Identifica posibles bypasses

3. **Security Headers**
   - URL: https://securityheaders.com
   - Verifica todas las cabeceras de seguridad
   - Compara con las mejores prácticas

### Testing Manual

#### Test 1: Verificar que iframes externos están bloqueados
```javascript
// En la consola del navegador, intenta cargar un iframe malicioso
const iframe = document.createElement('iframe');
iframe.src = 'https://evil.com';
document.body.appendChild(iframe);
// Debería ser bloqueado por CSP
```

#### Test 2: Verificar que scripts externos están bloqueados
```javascript
// En la consola, intenta cargar un script externo
const script = document.createElement('script');
script.src = 'https://cdn.evil.com/malicious.js';
document.body.appendChild(script);
// Debería ser bloqueado por CSP
```

## Mejoras Futuras Recomendadas

### 🔴 Alta Prioridad
1. **Remover `'unsafe-inline'` de script-src**
   - Eliminar todos los `onclick`, `onload`, etc. del HTML
   - Migrar a event listeners en JavaScript

2. **Implementar nonces para scripts inline**
   ```html
   <meta http-equiv="Content-Security-Policy" content="script-src 'nonce-{random}'">
   <script nonce="{random}">...</script>
   ```

### 🟡 Media Prioridad
3. **CSP Report-Only para monitoreo**
   - Implementar CSP en modo report-only primero
   - Monitorear violaciones antes de aplicar

4. **Subresource Integrity (SRI)**
   ```html
   <script src="script.js" integrity="sha384-..." crossorigin="anonymous"></script>
   ```

### 🟢 Baja Prioridad
5. **Revisar sandbox de iframes**
   - Evaluar si `allow-popups-to-escape-sandbox` es necesario
   - Documentar por qué se necesita cada permiso

## Compliance

### OWASP Top 10 2021

| Vulnerabilidad | Estado | Mitigación |
|----------------|--------|------------|
| A01: Broken Access Control | ✅ Mitigado | frame-ancestors, X-Frame-Options |
| A02: Cryptographic Failures | ✅ Mitigado | upgrade-insecure-requests, HTTPS |
| A03: Injection | ⚠️ Parcial | CSP implementado, pero con unsafe-inline |
| A04: Insecure Design | ✅ Mitigado | Diseño defensivo |
| A05: Security Misconfiguration | ✅ Mitigado | CSP y cabeceras de seguridad |
| A08: Software Integrity Failures | ⚠️ Pendiente | Falta SRI para assets |

## Contacto de Seguridad

Si descubres una vulnerabilidad de seguridad en este proyecto:

1. **NO** abras un issue público
2. Contacta al equipo de desarrollo directamente
3. Proporciona detalles de la vulnerabilidad
4. Espera a que se implemente un fix antes de divulgar

---

**Última actualización**: 13 de octubre de 2025
**Próxima revisión**: 13 de enero de 2026
