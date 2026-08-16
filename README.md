# YT // GLITCH PLAYER

![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-00ff00?style=for-the-badge&logo=github)
![View Code](https://img.shields.io/badge/View%20Code-GitHub-000?style=for-the-badge&logo=github)
![HTML5](https://img.shields.io/badge/HTML5-Latest-E34C26?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-Latest-563D7C?style=for-the-badge&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Reproductor web minimalista para listas de reproducción de YouTube con estética glitch/digital hacker. **Single-page application** construida con HTML5, CSS3 puro y JavaScript vanilla — sin dependencias externas (excepto YouTube IFrame API).

---

## 🎵 [ABRIR LA APP](https://LautaroSantiago.github.io/youtube-glitch-player/)

---

## ✨ Características principales

- **Reproducción desde YouTube**: Ingresa links de YouTube (videos completos, shorts o playlists) y reproduce el audio directamente en el navegador
- **Carga de metadatos automática**: El sistema extrae título, autor e imagen de portada de cada video (⚠️ *la carga inicial tarda algunos segundos*)
- **Gestión de múltiples listas**: Crea y organiza playlists con nombres personalizados
- **Reordenamiento dinámico**: Arrastra y suelta temas o usa botones ▲/▼ para reorganizar
- **Exportación/Importación**: Descarga tus listas como archivos JSON para llevarlas a cualquier lado
- **Controles completos**: Play/Pausa, anterior, siguiente, bucle inteligente (apagado → lista completa → tema actual)
- **Barra de progreso interactiva**: Salta a cualquier punto del tema
- **Control de volumen**: Ajusta de 0 a 100%
- **Portadas visuales**: Miniaturas de YouTube con efectos glitch y pixelado
- **Persistencia local**: Tus listas se guardan automáticamente en el navegador
- **Diseño responsive**: Funciona en desktop, tablet y mobile
- **Estética glitch profesional**: Tipografía robótica, degradados glitcheados, scanlines y animaciones
- **Sistema de historial**: Registra cada reproducción con timestamps y estadísticas
- **Panel de historial expandible**: Accede desde la sidebar, visualiza plays totales, minutos escuchados, artistas top
- **Cola collapsible**: Toglea la cola derecha para más espacio en pantalla
- **Controles de visualización**:
  - **−/+**: Ajusta tamaño de letra (80% - 150%)
  - **◊/◆/●**: Cicla entre glitch normal, modo ASCII hacker con lluvia de caracteres, o animaciones desactivadas
- **Controles anterior/siguiente**: Visualiza portada, título y autor del tema anterior y siguiente

---

## 📁 Arquitectura modular

La aplicación está refactorizada profesionalmente para máxima mantenibilidad:

```
files/
├── index.html           # Estructura HTML limpia
├── favicon.svg          # Icono con nota musical ♪
├── README.md            # Documentación completa
│
├── css/
│   ├── variables.css    # Paleta de colores (verde neón, lila, amatista)
│   ├── base.css         # Reset, body, animaciones de fondo
│   ├── layout.css       # Grid principal, flexbox
│   ├── components.css   # Botones, inputs, cards
│   └── animations.css   # Keyframes y transiciones
│
└── js/
    ├── state.js         # Gestión de estado global
    ├── youtube.js       # Integración YouTube API
    ├── ui.js            # Renderizado de componentes
    ├── storage.js       # Export/import de playlists
    ├── history.js       # Panel de historial
    └── controls.js      # Event listeners y lógica
```

### Ventajas:
✅ Separación clara de responsabilidades  
✅ Código comentado técnicamente  
✅ Fácil de mantener y optimizar  
✅ Escalable para nuevas features  
✅ Carga modular y eficiente  

---

## 🚀 Cómo usar

### 1. Abrir la aplicación
- **Online**: [https://LautaroSantiago.github.io/youtube-glitch-player/](https://LautaroSantiago.github.io/youtube-glitch-player/)
- **Local**: Descarga el repo y abre `files/index.html` en tu navegador

### 2. Agregar temas
```
Pega link de YouTube → el sistema extrae metadatos automáticamente → Presiona Enter o click en "agregar"
```

### 3. Crear listas
```
Escribe nombre → Click en "+" → Los temas se agregan a la lista activa (resaltada en verde)
```

### 4. Reproducir
- **▶/⏸**: Play/Pausa
- **⏮/⏭**: Anterior/Siguiente
- **⟲**: Cicla entre apagado → lista completa → tema actual
- **🔀**: Shuffle aleatorio (se reinicia al cambiar de lista)
- **⟲1**: Reinicia tema desde el inicio

### 5. Exportar/Importar
- **↓ exportar**: Descarga la lista como `.json`
- **↑ importar**: Carga una lista previamente guardada

### 6. Historial
- **📊 historial**: Ver todos los temas reproducidos + estadísticas
- **📋**: Copiar URL de un tema al portapapeles

### 7. Controles visuales
- **−/+**: Ajusta tamaño de letra
- **◊/◆/●**: Alterna entre glitch normal, ASCII hacker o sin animaciones

---

## 🎨 Paleta de colores

| Color | Valor | Uso |
|-------|-------|-----|
| Verde Neón | `#39ff7a` | Texto activo, acentos |
| Lila Polvoriento | `#9C8AA4` | Bordes, etiquetas |
| Amatista | `#9966CC` | Acciones secundarias |
| Ciruela | `#8E4585` | Énfasis adicional |
| Fondo Void | `#070a08` | Fondo principal |

---

## 🔧 Stack técnico

- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **API**: YouTube IFrame API (sin API key requerida)
- **Tipografía**: Share Tech Mono, VT323 (Google Fonts)
- **Persistencia**: localStorage
- **Hosting**: GitHub Pages

**Cero dependencias externas** — todo funciona con estándares web puros.

---

## 📊 Funciones clave

### `state.js` - Gestión de estado
```javascript
loadState()         // Carga desde localStorage
saveState()         // Persiste cambios
addToHistory()      // Registra reproducción
updateStats()       // Recalcula estadísticas
```

### `youtube.js` - Integración YouTube
```javascript
extractVideoId(url)     // Extrae ID de cualquier formato
fetchMeta(url, id)      // Obtiene título, autor, miniatura
loadYouTubeAPI()        // Carga el script de la API
```

### `ui.js` - Renderizado
```javascript
renderPlaylists()       // Renderiza lista de playlists
renderQueue()           // Renderiza cola (con drag & drop)
renderHistory()         // Renderiza panel de historial
renderNavControls()     // Renderiza tema anterior/siguiente
```

### `controls.js` - Lógica principal
```javascript
playIndex(idx)          // Reproduce tema por índice
goNext() / goPrev()     // Navegación inteligente
initControls()          // Registra todos los listeners
```

---

## 💾 LocalStorage

- `ytglitch_playlists_v1` — Todas tus playlists
- `ytglitch_current_v1` — Playlist activa
- `ytglitch_history_v1` — Historial de reproducción

---

## 📄 Licencia

MIT License — Libertad total para usar, modificar y distribuir

```
Copyright (c) 2024 Lautaro Subeldia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🤝 Contribuciones

¿Encontraste un bug o tienes una idea? Las contribuciones son bienvenidas:

1. Fork el repo
2. Crea una rama: `git checkout -b feature/tu-feature`
3. Commit: `git commit -m 'Agregar feature'`
4. Push: `git push origin feature/tu-feature`
5. Abre un Pull Request

---

## 📈 Roadmap

- [ ] Soporte para playlists de YouTube directas
- [ ] Búsqueda integrada de canciones
- [ ] Sincronización con cuentas
- [ ] Temas personalizables
- [ ] API REST para compartir playlists

---

## ⭐ ¿Te gustó? Dale una star en GitHub

```
https://github.com/LautaroSantiago/youtube-glitch-player
```

---

<br>

## 👤 Autor

**Lautaro Subeldia**

- 🎓 **Tecnicatura Universitaria en Programación** @ UTN FRA (Facultad Regional Avellaneda)
- 💻 **GitHub**: [@LautaroSantiago](https://github.com/LautaroSantiago)
- 🔗 **LinkedIn**: [linkedin.com/in/lautaro-subeldia/](https://linkedin.com/in/lautaro-subeldia/)
- 📍 **Ubicación**: Buenos Aires, Argentina
- 🖥️ **Entorno**: Linux Mint MATE + Terminal (Bash, Git, Vim)
- 🛠️ **Stack**: HTML5 • CSS3 • JavaScript Vanilla • YouTube API

**Hecho con 💚 y glitch aesthetic**

---

*Última actualización: Agosto 2024*
