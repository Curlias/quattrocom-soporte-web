# Quattrocom - Portal de Soporte Técnico v2.0

Portal web modular y responsive para el soporte técnico de Quattrocom ISP. Versión completamente reorganizada con arquitectura modular para mejor mantenimiento y escalabilidad.

## ✨ Características Principales

- **🏗️ Arquitectura Modular** - Código organizado en secciones independientes
- **📱 Diseño Responsive** - Optimizado para todos los dispositivos
- **🎯 Navegación SPA** - Carga dinámica de contenido sin recargas
- **🌓 Modo Oscuro/Claro** - Tema adaptable con persistencia local
- **📞 Contacto Integrado** - WhatsApp, teléfono y email con horarios actualizados
- **📊 Test de Velocidad** - Múltiples herramientas integradas (WiFiMan + Fast.com)
- **📚 Artículos Técnicos** - Guías detalladas de ping, traceroute y diagnósticos
- **🔧 Solución de Problemas** - FAQ dinámico con búsqueda en tiempo real
- **📈 Estado del Servicio** - Dashboard en tiempo real con métricas y historial

## 🚀 Instalación y Ejecución

### Método 1: Servidor Node.js (Recomendado)

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm start

# O con recarga automática
npm run dev
```

El sitio estará disponible en http://localhost:3000

### Método 2: Servidor Python (Alternativo)

```bash
# Python 3
npm run serve

# Python 2
npm run static
```

## 📁 Estructura del Proyecto

```
quattrocom-soporte-web/
├── sections/                    # Secciones modulares
│   ├── home.html               # Página principal
│   ├── speedtest.html          # Test de velocidad
│   ├── articles.html           # Artículos técnicos
│   ├── troubleshooting.html    # Solución de problemas
│   ├── contact.html            # Información de contacto
│   └── status.html             # Estado del servicio
├── assets/                     # Recursos estáticos
├── index-new.html              # Estructura principal modular
├── script-new.js               # Sistema de navegación modular
├── style.css                   # Estilos CSS completos
├── server.js                   # Servidor Express
└── package.json                # Configuración del proyecto
```

## 🔧 Información de Contacto

### Soporte Técnico
- **WhatsApp**: +52 1 442 281 0816
- **Teléfono**: 442 153 3000, opción 2
- **Email**: soporte.tecnico@quattrocom.mx
- **Horarios**: 8:00 AM - 8:00 PM (todos los días, incluidos festivos excepto 25 dic y 1 ene)

### Otras Consultas
- **Conmutador**: 442 153 3000
- **Pagos**: opción 4 o pagos@quattrocom.mx
- **Ventas**: Seleccionar opción correspondiente

## 📋 Funcionalidades por Sección

### 🏠 Home
- Cards de navegación rápida
- Indicador de estado del servicio
- Accesos directos a funcionalidades principales

### ⚡ Speed Test
- Integración con WiFiMan app
- Test con Fast.com de Netflix
- Guías para interpretación de resultados

### 📚 Artículos Técnicos
- **Ping**: Guía completa con ejemplos de comandos
- **Traceroute**: Diagnóstico de rutas de red
- **Diagnósticos**: Herramientas avanzadas de troubleshooting
- Botones de copia para comandos CLI

### 🔧 Troubleshooting
- FAQ interactivo con búsqueda
- Soluciones paso a paso
- Filtrado dinámico por palabras clave
- Guías visuales con iconos SVG

### 📞 Contact
- Información de contacto actualizada
- Horarios de atención específicos
- Proceso de reconexión por suspensión
- Diferenciación entre soporte técnico y otras consultas

### 📊 Status
- Estado en tiempo real de servicios
- Métricas de rendimiento
- Historial de 30 días
- Indicadores de incidentes y mantenimiento

## 🎨 Características Técnicas

### Responsive Design
- Breakpoints optimizados para móvil, tablet y desktop
- Grid CSS para layouts flexibles
- Iconos SVG escalables

### Navegación SPA
- Carga asíncrona de secciones
- URLs amigables (/speedtest, /articles, etc.)
- Historial del navegador
- Cache inteligente de contenido

### Accesibilidad
- Contraste optimizado para ambos temas
- Navegación por teclado
- Semántica HTML5 correcta
- ARIA labels donde corresponde

## 🛠️ Desarrollo

### Scripts Disponibles
- `npm start`: Servidor de producción
- `npm run dev`: Desarrollo con recarga automática
- `npm run serve`: Servidor Python alternativo
- `npm run static`: Servidor Python estático

### Agregar Nueva Sección
1. Crear archivo HTML en `/sections/`
2. Agregar ruta en `script-new.js`
3. Incluir en array `validSections` del servidor
4. Implementar función `initSectionName()` si necesita lógica específica

## 📈 Versión 2.0 - Changelog

### ✅ Completado
- ✅ Reorganización completa a arquitectura modular
- ✅ Eliminación de formulario de reportes
- ✅ Actualización de horarios WhatsApp (8AM-8PM)
- ✅ Artículos técnicos con comandos ping/traceroute
- ✅ Información real de contacto mexicano
- ✅ Iconos SVG profesionales (sin emojis)
- ✅ Sistema de navegación SPA
- ✅ Tooltip informativo en botón WhatsApp
- ✅ Servidor Express para desarrollo

### 🔄 Mejoras v2.0
- Código mantenible y escalable
- Separación clara de responsabilidades
- Mejor experiencia de usuario
- Navegación más fluida
- Información de contacto precisa
- Horarios realistas de atención

## 📄 Licencia

Código propietario de Quattrocom. Todos los derechos reservados.