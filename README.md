# YT // GLITCH PLAYER

Reproductor web de listas de reproducción de YouTube con interfaz digital glitch. Crea, organiza y exporta tus listas de música directamente desde el navegador sin dependencias externas.

---

## 🎵 Características principales

- **Reproducción desde YouTube**: Ingresa links de YouTube (videos completos, shorts o playlists) y reproduce el audio directamente en el navegador
- **Gestión de listas**: Crea múltiples listas de reproducción con nombres personalizados
- **Reordenamiento dinámico**: Arrastra y suelta temas dentro de la cola para reorganizar el orden
- **Exportación/Importación**: Descarga tus listas como archivos JSON y cárgalas cuando quieras recuperarlas
- **Controles de reproducción**: Play/Pausa, anterior, siguiente, bucle (apagado → lista completa → tema actual)
- **Barra de progreso**: Visualiza duración, tiempo actual y salta a cualquier punto del tema
- **Control de volumen**: Ajusta el nivel de sonido desde 0 a 100%
- **Metadatos automáticos**: Extrae título, autor e imagen de portada desde cada link
- **Portadas visuales**: Muestra la miniatura de YouTube con efectos glitch y pixelado
- **Persistencia local**: Guarda automáticamente tus listas en el navegador (localStorage)
- **Diseño responsive**: Interfaz adaptable a diferentes tamaños de pantalla
- **Estética glitch**: Tipografía digital robótica, degradados glitcheados y animaciones pixeladas

---

## 🚀 Cómo usar

### Acceso rápido
Abre `index.html` directamente en tu navegador. No requiere instalación ni servidor.

### Flujo de trabajo

1. **Agregar temas**
   - Copia un link de YouTube en el campo superior
   - Presiona Enter o haz clic en "agregar"
   - El sistema extrae automáticamente título, autor y portada

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


