/**
 * YT // GLITCH PLAYER - YouTube Integration
 * 
 * Maneja la extracción de IDs de video desde URLs de YouTube
 * y obtiene metadatos (título, autor, miniatura) mediante la API oEmbed.
 * 
 * Soporta:
 * - youtube.com (videos estándar)
 * - youtu.be (URLs cortas)
 * - youtube.com/shorts (Shorts)
 */

/**
 * Extrae el videoId de una URL de YouTube
 * Maneja múltiples formatos de URL
 * 
 * @param {string} url - URL del video de YouTube
 * @returns {string|null} - videoId si es válido, null si no
 * 
 * Ejemplo:
 * - https://youtube.com/watch?v=abc123 → 'abc123'
 * - https://youtu.be/abc123 → 'abc123'
 * - https://youtube.com/shorts/abc123 → 'abc123'
 */
function extractVideoId(url) {
  if (!url) return null;

  // Patrón 1: youtube.com/watch?v=ID
  const match1 = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  if (match1) return match1[1];

  // Patrón 2: youtube.com/shorts/ID
  const match2 = url.match(/youtube\.com\/shorts\/([^&\n?#]+)/);
  if (match2) return match2[1];

  // Patrón 3: youtube.com/embed/ID
  const match3 = url.match(/youtube\.com\/embed\/([^&\n?#]+)/);
  if (match3) return match3[1];

  return null;
}

/**
 * Obtiene metadatos de un video de YouTube usando oEmbed
 * La API oEmbed de YouTube no requiere API key
 * 
 * @param {string} url - URL del video
 * @param {string} videoId - ID del video (si ya se extrajo)
 * @returns {Promise<Object>} - {title, author, thumbnail}
 * 
 * El indicador de carga (.loading) se activa mientras se cargan
 * los datos, mostrando feedback al usuario.
 */
async function fetchMeta(url, videoId) {
  const indicator = document.getElementById('loadingInd');
  if (indicator) indicator.classList.add('active');

  try {
    // Usar videoId si ya existe, si no extraerlo de la URL
    const id = videoId || extractVideoId(url);
    if (!id) {
      throw new Error('ID de video no encontrado');
    }

    // URL de la API oEmbed de YouTube (sin necesidad de API key)
    const oembedUrl = `https://www.youtube.com/oembed?url=https://youtube.com/watch?v=${id}&format=json`;

    const response = await fetch(oembedUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    // Extraer información relevante del JSON de oEmbed
    return {
      title: data.title || 'Sin título',
      author: data.author_name || 'Canal desconocido',
      thumbnail: data.thumbnail_url || null
    };
  } catch (error) {
    console.warn('Error cargando metadatos:', error);

    // Retornar valores por defecto en caso de error
    return {
      title: 'Error cargando título',
      author: 'Desconocido',
      thumbnail: null
    };
  } finally {
    if (indicator) indicator.classList.remove('active');
  }
}

/**
 * Inicializa el reproductor de YouTube embebido
 * Se ejecuta cuando el script de YouTube IFrame API está listo
 * 
 * La variable global `player` se configura aquí para controlar
 * reproducción, volumen, tiempo de reproducción, etc.
 */
function onYouTubeIframeAPIReady() {
  // El reproductor se inicializa en UI cuando se carga la primera pista
  // Este callback indica que la API está lista
  console.log('YouTube IFrame API ready');
}

/**
 * Carga dinámicamente el script de YouTube IFrame API
 * Se ejecuta solo una vez al cargar la página
 */
function loadYouTubeAPI() {
  if (window.YT) return; // Ya está cargado

  const script = document.createElement('script');
  script.src = 'https://www.youtube.com/iframe_api';
  document.body.appendChild(script);
}
