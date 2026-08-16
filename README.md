# YT // GLITCH PLAYER

Reproductor web de listas de reproducción de YouTube con interfaz digital glitch. Crea, organiza y exporta tus listas de música directamente desde el navegador sin dependencias externas.

[![Live Demo](https://img.shields.io/badge/🎵_play_now-39ff7a?style=for-the-badge&labelColor=070a08)](https://LautaroSantiago.github.io/youtube-glitch-player/)
[![View Code](https://img.shields.io/badge/view_code-github-39ff7a?style=for-the-badge&logo=github)](https://github.com/LautaroSantiago/youtube-glitch-player/blob/master/index.html)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-9966CC?style=for-the-badge)](LICENSE)

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

---

## 🚀 Cómo usar

### Acceso rápido
Abre `index.html` directamente en tu navegador. No requiere instalación ni servidor.

### Flujo de trabajo

1. **Agregar temas**
   - Copia un link de YouTube en el campo superior
   - Presiona Enter o haz clic en "agregar"
   - El sistema extrae automáticamente título, autor y portada (*esto tarda unos segundos mientras se descargan los metadatos*)
   - Verás un indicador de carga en la esquina superior derecha del header mientras se procesa

2. **Crear listas**
   - Ingresa el nombre en la barra izquierda
   - Haz clic en "+" para crear una nueva lista
   - Cambia entre listas seleccionándolas en la barra lateral

3. **Organizar**
   - Arrastra temas en la cola derecha para reordenarlos
   - Elimina temas con el botón "✕"
   - Los cambios se guardan automáticamente

4. **Controlar reproducción**
   - **▶ / ⏸**: Inicia o pausa reproducción
   - **⏮**: Salta al tema anterior
   - **⏭**: Salta al siguiente tema
   - **⟲**: Activa bucle (cicla la lista completa o tema actual)
   - Barra de progreso: haz clic para saltar a cualquier punto

5. **Guardar y compartir**
   - **Exportar**: Descarga la lista actual como archivo `.json`
   - **Importar**: Carga un archivo `.json` previamente exportado
   - El archivo contiene nombre, orden y todos los temas

---

## 📋 Requisitos

- Navegador moderno con soporte para:
  - Reproducción de IFrame API de YouTube
  - localStorage
  - ES6 JavaScript
  - Drag and Drop API

**Navegadores compatibles:**
- Chrome/Chromium 60+
- Firefox 55+
- Safari 11+
- Edge 79+

---

## 🎨 Tecnología

- **Lenguaje**: HTML5, CSS3, JavaScript Vanilla
- **API externa**: YouTube IFrame Player API
- **Almacenamiento**: localStorage del navegador
- **Paleta de color**:
  - Verde principal: `#39ff7a`
  - Lila polvoriento: `#9C8AA4`
  - Amatista: `#9966CC`
  - Ciruela: `#8E4585`
- **Tipografía**: Share Tech Mono, VT323

---

## 📁 Estructura

```
yt-glitch-player/
├── index.html          # Aplicación completa (HTML + CSS + JS)
└── README.md          # Este archivo
```

---

## ⚙️ Notas técnicas

### Extracción de metadatos
El reproductor utiliza la API oEmbed de YouTube para obtener automáticamente:
- Título del video
- Nombre del canal/autor
- Miniatura en alta resolución

### Almacenamiento persistente
Las listas se guardan en dos claves localStorage:
- `ytglitch_playlists_v1`: Contiene todas las listas y temas
- `ytglitch_current_v1`: Almacena el nombre de la lista activa

Cada tema incluye: `videoId`, `url`, `title`, `author`, `thumb`

### Limitaciones conocidas
- La reproducción depende de la disponibilidad de YouTube
- Videos restringidos por región pueden no reproducirse
- El almacenamiento está limitado a ~5-10MB por navegador (localStorage)
- Los datos se pierden si se limpia el almacén local del navegador

---

## 🔧 Desarrollo

Para servir localmente con un servidor:

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server

# Ruby
ruby -run -ehttpd . -p8000
```

Luego accede a `http://localhost:8000`

---

## 📄 Licencia

Este proyecto está disponible bajo licencia MIT. Eres libre de usarlo, modificarlo y distribuirlo.

---

## 👨‍💻 Autor

**Lautaro Subeldia**

- **GitHub**: [@LautaroSantiago](https://github.com/LautaroSantiago)
- **LinkedIn**: [Lautaro Subeldia](https://linkedin.com/in/lautaro-subeldia/)
- **Ubicación**: Argentina
- **Educación**: Tecnicatura Universitaria en Programación, Universidad Tecnológica Nacional (UTN FRA)


