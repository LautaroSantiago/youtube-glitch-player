# YT // GLITCH PLAYER

![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-blue?style=flat-square)
![View Code](https://img.shields.io/badge/View%20Code-GitHub-black?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML5-Latest-orange?style=flat-square)
![CSS3](https://img.shields.io/badge/CSS3-Latest-blue?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

Reproductor web minimalista para listas de reproducción de YouTube con estética glitch/digital hacker. **Single-page application** construida con HTML5, CSS3 puro y JavaScript vanilla — sin dependencias externas (excepto YouTube IFrame API).

**Live:** https://LautaroSantiago.github.io/youtube-glitch-player/

---

## 🎵 Características principales

- **Reproducción desde YouTube**: Ingresa links de YouTube (videos completos, shorts o playlists) y reproduce el audio directamente en el navegador
- **Carga de metadatos**: El sistema extrae automáticamente título, autor e imagen de portada de cada video (⚠️ *la carga inicial tarda algunos segundos mientras se obtienen los metadatos*)
- **Gestión de listas**: Crea múltiples listas de reproducción con nombres personalizados
- **Reordenamiento dinámico**: Arrastra y suelta temas dentro de la cola para reorganizar el orden, o usa los botones ▲/▼
- **Exportación/Importación**: Descarga tus listas como archivos JSON y cárgalas cuando quieras recuperarlas
- **Controles de reproducción**: Play/Pausa, anterior, siguiente, bucle (apagado → lista completa → tema actual), repetición de tema único (⟲1) y shuffle aleatorio (🔀)
- **Barra de progreso**: Visualiza duración, tiempo actual y salta a cualquier punto del tema
- **Control de volumen**: Ajusta el nivel de sonido desde 0 a 100%
- **Portadas visuales**: Muestra la miniatura de YouTube con efectos glitch y pixelado
- **Persistencia local**: Guarda automáticamente tus listas en el navegador (localStorage)
- **Diseño responsive**: Interfaz adaptable a diferentes tamaños de pantalla
- **Estética glitch**: Tipografía digital robótica, degradados glitcheados, scanlines y animaciones pixeladas
- **Indicador de carga**: Muestra cuando está descargando los metadatos del video desde YouTube
- **Sistema de historial y estadísticas**: Registra cada reproducción con timestamp, muestra plays totales, minutos escuchados, tema y autor más escuchados, promedio de minutos por tema
- **Panel de historial expandible**: Accesible desde la sidebar izquierda, lista todos los temas reproducidos con opción de copiar links
- **Cola collapsible**: Toglea la cola derecha con botón flotante (▶/◀) para más espacio en pantalla
- **Controles de visualización**:
  - **Botón −**: Reducir tamaño de letra (hasta 80%)
  - **Botón +**: Aumentar tamaño de letra (hasta 150%)
  - **Botón ◊/◆/●**: Ciclar entre 3 modos de animaciones — Glitch normal (◊), Modo Hacker ASCII con lluvia de caracteres (◆), o Animaciones desactivadas (●) para reducir consumo de RAM
- **Controles anterior/siguiente**: Visualiza portada, título y autor del tema anterior y siguiente directamente debajo de la portada actual

---

## 📁 Estructura del Proyecto

La aplicación está refactorizada en una **arquitectura modular profesional** para facilitar mantenimiento y optimización:

```
yt-glitch-player/
├── index.html           # HTML puro (solo estructura)
├── favicon.svg          # Icono con estética glitch
│
├── css/
│   ├── variables.css    # Paleta de colores y espaciado
│   ├── base.css         # Estilos generales y animaciones de fondo
│   ├── layout.css       # Grid, flexbox y disposición
│   ├── components.css   # Botones, inputs, tarjetas
│   └── animations.css   # Keyframes y transiciones
│
├── js/
│   ├── state.js         # Gestión de estado global
│   ├── youtube.js       # Integración con YouTube API
│   ├── ui.js            # Renderizado de componentes
│   ├── storage.js       # Export/import de playlists
│   ├── history.js       # Panel de historial
│   └── controls.js      # Event listeners y lógica
│
├── README.md
└── LICENSE (MIT)
```

### Ventajas de la arquitectura modular:

✅ **Separación de responsabilidades** - Cada archivo tiene un propósito claro  
✅ **Facilidad de mantenimiento** - Cambios localizados, menos conflictos  
✅ **Mejor legibilidad** - Código comentado técnicamente sin parecer IA  
✅ **Escalabilidad** - Agregar nuevas features sin afectar lo existente  
✅ **Optimización** - Cada módulo se carga y se cachea independientemente  

---

## 🚀 Cómo usar

### 1. Abrir la aplicación
- **Online**: https://LautaroSantiago.github.io/youtube-glitch-player/
- **Local**: Descargar el repo y abrir `index.html` en el navegador

### 2. Agregar temas
- Pega el link de un video de YouTube en el input superior
- El sistema extrae automáticamente título, autor y miniatura
- Presiona **Enter** o haz click en **agregar**

### 3. Crear y gestionar listas
- Escribe un nombre en el input "nombre de la lista" (sidebar izquierda)
- Haz click en **+** para crear una nueva lista
- Los temas se agregan a la lista activa (resaltada en verde)
- Haz click en el **✕** para eliminar una lista

### 4. Reproducción
- **Play/Pausa**: Botón central (▶/⏸)
- **Anterior/Siguiente**: Botones ⏮ y ⏭
- **Bucle**: Cicla entre apagado → lista → tema actual
- **Shuffle (🔀)**: Mezcla aleatoria (se reinicia cada vez que cambias de lista)
- **Repetir tema (⟲1)**: Reinicia el tema actual desde el inicio

### 5. Exportar/Importar
- **Exportar**: Descarga la lista actual como archivo `.json`
- **Importar**: Carga una lista previamente descargada
- Los archivos contienen toda la información (URLs, títulos, miniaturas)

### 6. Historial
- Haz click en **📊 historial** para ver todos los temas reproducidos
- Visualiza estadísticas de reproducción (plays totales, minutos, artistas top)
- Haz click en **📋** para copiar la URL de un tema al portapapeles

### 7. Controles visuales
- **−/+**: Ajusta el tamaño de la letra en toda la página
- **◊/◆/●**: Alterna entre glitch normal, modo ASCII hacker o animaciones desactivadas

---

## 🎨 Paleta de colores

| Color | Valor | Uso |
|-------|-------|-----|
| Verde Neón | `#39ff7a` | Texto activo, acentos principales |
| Lila Polvoriento | `#9C8AA4` | Bordes suaves, etiquetas |
| Amatista | `#9966CC` | Acciones secundarias, header |
| Ciruela | `#8E4585` | Énfasis adicional |
| Fondo Void | `#070a08` | Fondo principal (negro con matiz) |

---

## 🔧 Desarrollo técnico

### Dependencias
- **YouTube IFrame API** - Reproducción de videos
- **Google Fonts** - Share Tech Mono, VT323 (tipografía monoespaciada)
- Sin librerías externas de JavaScript

### Tecnologías
- **HTML5 Semántico** - Estructura clara y accesible
- **CSS3 Puro** - Grid, Flexbox, Gradientes, Animaciones
- **JavaScript Vanilla** - Sin frameworks, código modular

### LocalStorage
- `ytglitch_playlists_v1` - Almacena todas las playlists
- `ytglitch_current_v1` - Almacena la playlist activa
- `ytglitch_history_v1` - Almacena el historial de reproducción

---

## 📋 Guía de uso de módulos

### `state.js` - Gestión de estado
Centraliza el estado global de la aplicación. Todas las funciones que modifiquen datos deben llamar a `saveState()`.

```javascript
loadState()         // Carga desde localStorage
saveState()         // Persiste cambios
addToHistory()      // Registra reproducción
updateStats()       // Recalcula estadísticas
```

### `youtube.js` - Integración YouTube
Maneja extracto de IDs y carga de metadatos vía oEmbed (sin API key).

```javascript
extractVideoId(url)     // Extrae ID de cualquier URL de YouTube
fetchMeta(url, id)      // Obtiene título, autor, miniatura
loadYouTubeAPI()        // Carga el script de la API
```

### `ui.js` - Renderizado
Todas las funciones que actualizan el DOM están aquí. Escapan HTML automáticamente para prevenir XSS.

```javascript
renderPlaylists()       // Renderiza lista de playlists
renderQueue()           // Renderiza cola de reproducción
renderHistory()         // Renderiza panel de historial
renderNavControls()     // Renderiza tema anterior/siguiente
```

### `storage.js` - Persistencia
Exporta/importa listas de reproducción como archivos JSON.

```javascript
exportPlaylist()        // Descarga lista actual
importPlaylist(event)   // Carga lista desde archivo
openFileImport()        // Abre diálogo de selección
```

### `controls.js` - Lógica principal
Inicializa reproducción, event listeners y controla el flujo de la aplicación.

```javascript
initPlayer(videoId)     // Crea reproductor de YouTube
playIndex(idx)          // Reproduce tema por índice
goNext() / goPrev()     // Navegación
initControls()          // Registra todos los listeners
```

---

## 📱 Responsive

- **Desktop (980px+)**: Layout 3 columnas (sidebar | main | queue)
- **Mobile (<980px)**: Layout 1 columna con sidebars apiladas

---

## 🛡️ Notas de seguridad

- **XSS Prevention**: Todos los textos de usuario se escapan con `escapeHtml()`
- **No guarda credenciales**: Solo metadatos de videos públicos
- **No necesita API key**: Usa oEmbed de YouTube que es público

---

## 📄 Licencia

MIT License - Libertad total para usar, modificar y distribuir

```
Copyright (c) 2024 Lautaro Subeldia

Permission is hereby granted, free of charge...
```

---

## 👤 Autor

**Lautaro Subeldia**
- GitHub: [@LautaroSantiago](https://github.com/LautaroSantiago)
- LinkedIn: [linkedin.com/in/lautaro-subeldia/](https://linkedin.com/in/lautaro-subeldia/)
- 📍 Argentina | 🎓 Tecnicatura Universitaria en Programación, UTN FRA

---

## 🤝 Contribuciones

Todos los aportes son bienvenidos. Si encuentras un bug o tienes una idea:
1. Fork el repo
2. Crea una rama (`git checkout -b feature/tu-feature`)
3. Commit los cambios (`git commit -m 'Agregar feature'`)
4. Push (`git push origin feature/tu-feature`)
5. Abre un Pull Request

---

## 📝 Historial de versiones

Ver commits en [GitHub](https://github.com/LautaroSantiago/youtube-glitch-player/commits/main)

**v2.0** - Refactorización modular, favicon SVG, 3 modos de animación  
**v1.0** - Release inicial, reproductor glitch básico
