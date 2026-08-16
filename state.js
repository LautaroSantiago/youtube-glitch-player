/**
 * YT // GLITCH PLAYER - State Management
 * 
 * Gestiona el estado global de la aplicación:
 * - Playlists (listas de reproducción)
 * - Índice actual de reproducción
 * - Modo de bucle
 * - Estadísticas de reproducción
 * - Historial de temas
 * 
 * El estado se persiste en localStorage para recuperarse entre sesiones.
 */

const LS_KEY = 'ytglitch_playlists_v1';
const LS_CUR = 'ytglitch_current_v1';
const LS_HISTORY = 'ytglitch_history_v1';

// Estado global de la aplicación
const state = {
  playlists: {},      // { nombre: [ {videoId, url, title, author, thumb} ] }
  current: null,       // nombre de lista activa
  index: -1,            // índice del tema sonando en la lista actual
  loop: 'none',         // 'none' | 'all' | 'one'
  shuffled: false,      // si está en modo shuffle
  shuffleOrder: [],     // orden aleatorio (no se guarda)
  history: [],          // [ {videoId, title, author, url, thumb, plays: [{timestamp, duration}]} ]
  stats: {
    totalPlays: 0,
    totalMinutes: 0,
    topTrack: null,
    topArtist: null,
    lastPlayed: null
  }
};

/**
 * Carga el estado desde localStorage
 * Recupera playlists, lista activa e historial
 */
function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) state.playlists = JSON.parse(raw);
  } catch (e) {
    console.error('Error cargando playlists:', e);
  }

  try {
    const hist = localStorage.getItem(LS_HISTORY);
    if (hist) state.history = JSON.parse(hist);
  } catch (e) {
    console.error('Error cargando historial:', e);
  }

  // Crear lista por defecto si no hay ninguna
  if (Object.keys(state.playlists).length === 0) {
    state.playlists['My Playlist'] = [];
  }

  // Recuperar lista activa o asignar la primera
  state.current = localStorage.getItem(LS_CUR) || Object.keys(state.playlists)[0];
  if (!state.playlists[state.current]) {
    state.current = Object.keys(state.playlists)[0];
  }

  updateStats();
}

/**
 * Persiste el estado en localStorage
 * Se llama después de cada cambio importante
 */
function saveState() {
  localStorage.setItem(LS_KEY, JSON.stringify(state.playlists));
  localStorage.setItem(LS_CUR, state.current);
  localStorage.setItem(LS_HISTORY, JSON.stringify(state.history));
}

/**
 * Agrega un tema al historial o incrementa su contador
 * Registra el timestamp y duración de cada reproducción
 * 
 * @param {string} videoId - ID del video de YouTube
 * @param {string} title - Título del tema
 * @param {string} author - Autor/canal
 * @param {string} url - URL del video
 * @param {string} thumb - URL de la miniatura
 * @param {number} duration - Duración en segundos
 */
function addToHistory(videoId, title, author, url, thumb, duration) {
  let entry = state.history.find(h => h.videoId === videoId);
  if (!entry) {
    entry = { videoId, title, author, url, thumb, plays: [] };
    state.history.push(entry);
  }

  entry.plays.push({
    timestamp: new Date().toISOString(),
    duration: duration || 0
  });

  updateStats();
  saveState();
}

/**
 * Recalcula todas las estadísticas basado en el historial
 * - Total de plays
 * - Total de minutos
 * - Tema más escuchado
 * - Autor más escuchado
 * - Promedio de minutos por tema
 * - Última reproducción
 */
function updateStats() {
  // Total de plays y minutos
  const totalPlays = state.history.reduce((sum, h) => sum + h.plays.length, 0);
  const totalMinutes = state.history.reduce(
    (sum, h) => sum + h.plays.reduce((s, p) => s + (p.duration || 0), 0),
    0
  );

  state.stats.totalPlays = totalPlays;
  state.stats.totalMinutes = Math.floor(totalMinutes);

  // Tema más escuchado
  if (state.history.length > 0) {
    const topTrack = state.history.reduce((prev, curr) =>
      curr.plays.length > prev.plays.length ? curr : prev
    );
    state.stats.topTrack = { title: topTrack.title, plays: topTrack.plays.length };
  }

  // Autor más escuchado
  const authorStats = {};
  state.history.forEach(h => {
    if (!authorStats[h.author]) authorStats[h.author] = 0;
    authorStats[h.author] += h.plays.length;
  });

  if (Object.keys(authorStats).length > 0) {
    const topAut = Object.entries(authorStats).reduce((a, b) =>
      a[1] > b[1] ? a : b
    );
    state.stats.topArtist = { name: topAut[0], plays: topAut[1] };
  }

  // Última reproducción
  if (state.history.length > 0) {
    const allPlays = state.history.flatMap(h =>
      h.plays.map(p => ({ ...p, title: h.title, author: h.author }))
    );
    if (allPlays.length > 0) {
      const last = allPlays.reduce((a, b) =>
        new Date(a.timestamp) > new Date(b.timestamp) ? a : b
      );
      state.stats.lastPlayed = last;
    }
  }
}

/**
 * Calcula el promedio de minutos escuchados por tema
 * Usado en las estadísticas del historial
 * 
 * @returns {string} Promedio formateado a 1 decimal
 */
function getAverageMinutes() {
  if (state.history.length === 0) return '0';
  const totalMin = state.history.reduce(
    (sum, h) => sum + h.plays.reduce((s, p) => s + (p.duration || 0), 0),
    0
  );
  return (totalMin / state.history.length).toFixed(1);
}
