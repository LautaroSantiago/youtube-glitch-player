/**
 * YT // GLITCH PLAYER - Storage Management
 * 
 * Maneja exportación e importación de playlists como archivos JSON
 * Permite descargar y cargar listas de reproducción completas
 * con toda la información de los temas (URL, título, autor, miniatura)
 */

/**
 * Descarga la playlist activa como archivo JSON
 * El nombre del archivo usa la fecha y nombre de la lista
 * 
 * Formato del JSON:
 * {
 *   "name": "Mi Playlist",
 *   "tracks": [
 *     {
 *       "url": "https://youtube.com/watch?v=...",
 *       "videoId": "...",
 *       "title": "Título",
 *       "author": "Artista",
 *       "thumb": "https://..."
 *     }
 *   ]
 * }
 */
function exportPlaylist() {
  if (!state.current || !state.playlists[state.current]) {
    alert('No hay lista para exportar');
    return;
  }

  const data = {
    name: state.current,
    tracks: state.playlists[state.current]
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // Crear link de descarga temporal
  const a = document.createElement('a');
  a.href = url;

  // Nombre del archivo: fecha + nombre de lista
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  a.download = `${dateStr}_${state.current}.json`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

/**
 * Importa una playlist desde un archivo JSON
 * El archivo debe estar en el formato correcto
 * Se ejecuta después de seleccionar un archivo vía input
 * 
 * @param {Event} event - Evento del input file
 */
function importPlaylist(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);

      // Validar estructura básica
      if (!data.name || !Array.isArray(data.tracks)) {
        alert('Formato de archivo inválido');
        return;
      }

      // Agregar a playlists con nombre único
      let name = data.name;
      let counter = 1;
      while (state.playlists[name]) {
        name = `${data.name} (${counter++})`;
      }

      state.playlists[name] = data.tracks;
      state.current = name;
      state.index = -1;
      state.shuffleOrder = [];

      saveState();
      renderPlaylists();
      renderQueue();

      alert(`Playlist "${name}" importada con ${data.tracks.length} temas`);
    } catch (err) {
      console.error('Error importando:', err);
      alert('Error al importar el archivo');
    }
  };

  reader.readAsText(file);

  // Limpiar el input para permitir importar el mismo archivo nuevamente
  event.target.value = '';
}

/**
 * Abre el diálogo de selección de archivo
 * Usado por el botón "Importar"
 */
function openFileImport() {
  document.getElementById('fileImport').click();
}
