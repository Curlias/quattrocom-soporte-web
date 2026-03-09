# Centro de Soporte Quattrocom

Un portal web moderno y responsive para el soporte técnico de clientes del proveedor de servicios de internet Quattrocom.

## 🚀 Características

### Funcionalidades Principales
- **Portal de Soporte 24/7** - Centro de ayuda completo para clientes residenciales y PYME
- **Navegación Intuitiva** - Diseño limpio con navegación suave entre secciones
- **Búsqueda Inteligente** - Sistema de búsqueda en tiempo real para guías de solución
- **Formulario de Reportes** - Sistema de tickets con validación avanzada
- **Estado de Red en Tiempo Real** - Monitor de servicios con actualizaciones automáticas
- **Base de Conocimientos** - FAQ expandible con soluciones paso a paso
- **Múltiples Canales de Contacto** - WhatsApp, teléfono y email

### Tecnologías
- **HTML5** - Estructura semántica moderna
- **CSS3** - Diseño responsive con variables CSS y animaciones
- **JavaScript Vanilla** - Funcionalidad interactiva sin dependencias
- **Google Fonts** - Tipografía Inter para mejor legibilidad

### Características Técnicas
- ✅ **Completamente Responsive** - Optimizado para móvil, tablet y desktop
- ✅ **Modo Oscuro/Claro** - Alternancia de temas con persistencia local
- ✅ **Progressive Web App Ready** - Estructura optimizada para PWA
- ✅ **Accesibilidad** - Navegación por teclado y lectores de pantalla
- ✅ **SEO Optimizado** - Meta tags y estructura semántica
- ✅ **Carga Rápida** - CSS optimizado y JavaScript eficiente

## 📋 Páginas y Secciones

### 1. Página Principal (Home)
- Mensaje de bienvenida
- Indicador de estado del servicio
- Accesos rápidos a funciones principales
- Introducción a los servicios de soporte

### 2. Guías de Solución (Troubleshooting)
- Buscador de problemas en tiempo real
- Guías paso a paso para problemas comunes:
  - Internet lento
  - Sin conexión a internet
  - Problemas de WiFi
  - Reiniciar router
  - Mejorar cobertura WiFi

### 3. Test de Velocidad
- Instrucciones detalladas para realizar tests precisos
- Integración con WiFiMan.com
- Guía para envío de resultados a soporte

### 4. Reportar Problema
- Formulario completo con validación
- Campos: nombre, teléfono, email, ID cliente, dirección, tipo de problema
- Subida de capturas de pantalla
- Validación en tiempo real

### 5. Base de Conocimientos
- FAQ expandible con búsqueda
- Artículos organizados por categorías
- Respuestas detalladas a consultas frecuentes

### 6. Contactar Soporte
- WhatsApp Business
- Soporte telefónico 24/7
- Email con tiempo de respuesta garantizado
- Horarios de atención

### 7. Estado de la Red
- Monitor en tiempo real de servicios
- Estado de internet residencial y empresarial
- Cronograma de mantenimientos
- Historial de incidencias

## 🎨 Diseño y Colores

### Paleta de Colores
- **Primario**: `#d32f2f` (Rojo Quattrocom)
- **Secundario**: `#ffffff` (Blanco)
- **Acento**: `#f5f5f5` (Gris claro)
- **Texto**: `#333333` (Gris oscuro)

### Estados de Servicios
- **Operacional**: `#4caf50` (Verde)
- **Degradado**: `#ff9800` (Naranja)  
- **Mantenimiento**: `#2196f3` (Azul)
- **Incidencia**: `#f44336` (Rojo)

## 📱 Funcionalidades Móviles

### Navegación Móvil
- Menú hamburguesa con animación
- Navegación por gestos
- Touch-friendly con áreas de toque optimizadas

### Características Específicas
- Botón flotante de WhatsApp con animación pulse
- Formularios optimizados para móviles
- Cards adaptables con scroll suave
- Typography responsive

## 🔧 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web (Apache, Nginx, IIS) o servir archivos estáticos

### Instalación Local
1. Clona o descarga los archivos del proyecto
2. Coloca los archivos en tu directorio web
3. Abre `index.html` en tu navegador

### Estructura de Archivos
```
quattrocom-soporte-web/
├── index.html          # Página principal HTML
├── style.css           # Estilos CSS principales
├── script.js           # Funcionalidad JavaScript
├── README.md          # Documentación del proyecto
└── promp.md           # Especificaciones originales
```

### Configuración
Para personalizar el sitio:

1. **Colores**: Modifica las variables CSS en `:root` en `style.css`
2. **Contacto**: Actualiza números de teléfono y emails en `index.html`
3. **WhatsApp**: Cambia el número en los enlaces de WhatsApp
4. **Estado de Red**: Modifica los servicios en `NetworkStatusManager` en `script.js`

## 🛠 Funcionalidades JavaScript

### Gestores Principales
- **ThemeManager**: Manejo de temas claro/oscuro
- **NavigationManager**: Navegación suave y menú móvil
- **FAQManager**: Sistema de acordeón para preguntas frecuentes
- **SearchManager**: Búsqueda con debounce y filtrado
- **FormManager**: Validación avanzada y envío de formularios
- **NetworkStatusManager**: Monitor de estado de servicios
- **AnimationManager**: Animaciones on-scroll y hover effects

### Características Avanzadas
- Persistencia local de preferencias
- Validación de formularios en tiempo real
- Auto-guardado de datos de formulario
- Notificaciones toast personalizadas
- Navegación por teclado
- Detección de clics fuera de elementos

## 📊 Optimización de Rendimiento

### CSS Optimizado
- Variables CSS para consistencia
- Metodología BEM parcial
- Media queries mobile-first
- Animaciones con GPU acceleration

### JavaScript Eficiente
- Event delegation donde apropiado
- Debouncing para búsquedas
- Lazy loading de funcionalidades
- Gestión de memoria optimizada

### Buenas Prácticas
- Código comentado y documentado
- Estructura modular con clases
- Separación de responsabilidades
- Manejo de errores robusto

## 🌐 Compatibilidad

### Navegadores Soportados
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### Dispositivos
- **Desktop**: 1200px+ (óptimo)
- **Tablet**: 768px - 1199px
- **Móvil**: 320px - 767px

## 📞 Configuración de Contacto

Para personalizar la información de contacto:

1. **WhatsApp**: Actualiza `+15551234567` por tu número real
2. **Teléfono**: Cambia `+15559876543` por tu línea de soporte
3. **Email**: Modifica `soporte@quattrocom.com` por tu email real
4. **Horarios**: Ajusta los horarios de atención según tu operación

## 🚀 Despliegue

### Producción
1. Sube los archivos a tu servidor web
2. Configura SSL/HTTPS para seguridad
3. Apunta el subdominio `soporte.quattrocom.com`
4. Configura analytics si es necesario

### Consideraciones
- Asegúrate de que los enlaces de WhatsApp apunten a números reales
- Configura un backend real para el envío de formularios
- Implementa un API real para el estado de la red
- Añade Google Analytics o similar para métricas

## 📈 Futuras Mejoras

### Posibles Expansiones
- Chat en vivo integrado
- Sistema de tickets completo
- Portal de cliente con login
- Notificaciones push
- APP móvil nativa
- Integración con CRM
- Multi-idioma
- Analytics de soporte

## 📄 Licencia

Este proyecto fue desarrollado para Quattrocom y contiene código original. Todos los derechos reservados.

---

**Desarrollado con ❤️ para Quattrocom**  
*Centro de Soporte Técnico - 2026*