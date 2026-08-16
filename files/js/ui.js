/**
 * YT // GLITCH PLAYER - UI Rendering
 * 
 * Maneja todo el renderizado visual:
 * - Lista de playlists
 * - Cola de reproducción
 * - Información del tema
 * - Historial y estadísticas
 * - Controles anterior/siguiente
 * 
 * Cada función de render actualiza el DOM sin recargar la página.
 */

/**
 * Renderiza la lista de playlists en la sidebar
 * Muestra nombre de cada lista y cantidad de temas
 * El click cambia la lista activa
 */
function renderPlaylists() {
  const plList = document.getElementById('plList');
  if (!plList) return;

  plList.innerHTML = '';

  Object.keys(state.playlists).forEach(name => {
    const count = state.playlists[name].length;
    const li = document.createElement('li');
    li.className = state.current === name ? 'active' : '';
    li.innerHTML = `
      <span>${name} <span class="count">${count}</span></span>
      <span class="del" data-name="${name}">✕</span>
    `;

    // Click en el nombre cambia la lista activa
    li.addEventListener('click', () => {
      state.current = name;
      state.index = -1;
      state.shuffleOrder = [];
      saveState();
      renderPlaylists();
      renderQueue();
    });

    // Click en la X elimina la lista
    li.querySelector('.del').addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`¿Eliminar "${name}"?`)) {
        delete state.playlists[name];
        if (state.current === name) {
          state.current = Object.keys(state.playlists)[0] || 'My Playlist';
          if (!state.playlists[state.current]) {
            state.playlists[state.current] = [];
          }
        }
        saveState();
        renderPlaylists();
        renderQueue();
      }
    });

    plList.appendChild(li);
  });
}

/**
 * Renderiza la cola de reproducción
 * Muestra miniatura, título y autor de cada tema
 * Soporta drag & drop para reordenar
 */
function renderQueue() {
  const qList = document.getElementById('queueList');
  if (!qList || !state.current) return;

  const tracks = state.playlists[state.current] || [];
  qList.innerHTML = '';

  tracks.forEach((track, idx) => {
    const li = document.createElement('li');
    li.draggable = true;
    li.className = idx === state.index ? 'playing' : '';
    li.dataset.index = idx;

    // Mostrar miniatura si existe, si no emoji
    const img = track.thumb
      ? `<img src="${track.thumb}" alt="thumbnail">`
      : '<img src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23121a13%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%22 y=%2260%22 font-size=%2240%22 fill=%22%231e7a42%22 text-anchor=%22middle%22%3E♪%3C/text%3E%3C/svg%3E" alt="default">';

    li.innerHTML = `
      ${img}
      <div class="meta">
        <div class="t">${escapeHtml(track.title)}</div>
        <div class="a">${escapeHtml(track.author)}</div>
      </div>
      <div class="action">
        <button class="up">▲</button>
        <button class="dn">▼</button>
      </div>
      <span class="rm">✕</span>
    `;

    // Mover arriba
    li.querySelector('.up').addEventListener('click', () => {
      if (idx > 0) {
        [tracks[idx - 1], tracks[idx]] = [tracks[idx], tracks[idx - 1]];
        if (state.index === idx) state.index--;
        else if (state.index === idx - 1) state.index++;
        saveState();
        renderQueue();
      }
    });

    // Mover abajo
    li.querySelector('.dn').addEventListener('click', () => {
      if (idx < tracks.length - 1) {
        [tracks[idx], tracks[idx + 1]] = [tracks[idx + 1], tracks[idx]];
        if (state.index === idx) state.index++;
        else if (state.index === idx + 1) state.index--;
        saveState();
        renderQueue();
      }
    });

    // Eliminar
    li.querySelector('.rm').addEventListener('click', () => {
      tracks.splice(idx, 1);
      if (state.index >= tracks.length && state.index > 0) state.index--;
      saveState();
      renderQueue();
    });

    // Click para reproducir
    li.addEventListener('click', () => {
      playIndex(idx);
    });

    // Drag & drop
    li.addEventListener('dragstart', () => {
      li.style.opacity = '0.5';
    });

    li.addEventListener('dragend', () => {
      li.style.opacity = '1';
    });

    li.addEventListener('dragover', (e) => {
      e.preventDefault();
      li.classList.add('dragover');
    });

    li.addEventListener('dragleave', () => {
      li.classList.remove('dragover');
    });

    li.addEventListener('drop', (e) => {
      e.preventDefault();
      li.classList.remove('dragover');

      // Buscar el elemento que se está arrastrando
      const dragging = document.querySelector('[draggable="true"][style*="opacity: 0.5"]');
      if (dragging && dragging !== li) {
        const fromIdx = parseInt(dragging.dataset.index);
        const toIdx = idx;
        [tracks[fromIdx], tracks[toIdx]] = [tracks[toIdx], tracks[fromIdx]];

        if (state.index === fromIdx) state.index = toIdx;
        else if (state.index === toIdx) state.index = fromIdx;

        saveState();
        renderQueue();
      }
    });

    qList.appendChild(li);
  });
}

/**
 * Renderiza el historial de reproducción
 * Muestra todos los temas reproducidos con estadísticas
 * Permite copiar URLs al portapapeles
 */
function renderHistory() {
  const cont = document.getElementById('historyContainer');
  if (!cont) return;

  let html = '<div class="history-stats">';
  html += `<div class="stat-item"><span>Plays totales:</span> <strong>${state.stats.totalPlays}</strong></div>`;
  html += `<div class="stat-item"><span>Minutos:</span> <strong>${state.stats.totalMinutes}</strong></div>`;

  if (state.stats.topTrack) {
    html += `<div class="stat-item"><span>Top tema:</span> <strong>${escapeHtml(state.stats.topTrack.title)}</strong> (${state.stats.topTrack.plays})</div>`;
  }

  if (state.stats.topArtist) {
    html += `<div class="stat-item"><span>Top artista:</span> <strong>${escapeHtml(state.stats.topArtist.name)}</strong> (${state.stats.topArtist.plays})</div>`;
  }

  html += `<div class="stat-item"><span>Promedio:</span> <strong>${getAverageMinutes()}</strong> min/tema</div>`;
  html += '</div>';

  html += '<div class="history-list">';
  state.history.forEach(h => {
    html += `
      <div class="history-item">
        <div class="history-item-img"><img src="${escapeHtml(h.thumb || '')}" alt="thumb" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23121a13%22 width=%22100%22 height=%22100%22/%3E%3C/svg%3E'"></div>
        <div class="history-item-info">
          <div class="history-item-title">${escapeHtml(h.title)}</div>
          <div class="history-item-author">${escapeHtml(h.author)}</div>
          <div class="history-item-plays">${h.plays.length} plays</div>
        </div>
        <button class="history-copy" data-url="${escapeHtml(h.url)}" title="Copiar URL">📋</button>
      </div>
    `;
  });
  html += '</div>';

  cont.innerHTML = html;

  // Agregar event listeners para copiar
  document.querySelectorAll('.history-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.dataset.url;
      navigator.clipboard.writeText(url).then(() => {
        btn.textContent = '✓';
        setTimeout(() => { btn.textContent = '📋'; }, 2000);
      });
    });
  });
}

/**
 * Renderiza los controles de tema anterior/siguiente
 * Muestra miniatura, título y autor del tema anterior y siguiente
 * Si no hay temas antes/después, muestra [START] o [END]
 */
function renderNavControls() {
  const prevTrack = document.getElementById('prevTrack');
  const nextTrack = document.getElementById('nextTrack');
  if (!prevTrack || !nextTrack) return;

  const tracks = state.playlists[state.current] || [];
  const idx = state.index;

  // Tema anterior
  if (idx > 0) {
    const track = tracks[idx - 1];
    prevTrack.className = 'nav-track';
    prevTrack.innerHTML = `
      <img src="${escapeHtml(track.thumb || '')}" alt="prev" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23121a13%22 width=%22100%22 height=%22100%22/%3E%3C/svg%3E'">
      <div class="info">
        <div class="title">${escapeHtml(track.title)}</div>
        <div class="author">${escapeHtml(track.author)}</div>
      </div>
    `;
  } else {
    prevTrack.className = 'nav-track empty';
    prevTrack.innerHTML = '[START]';
  }

  // Tema siguiente
  if (idx < tracks.length - 1) {
    const track = tracks[idx + 1];
    nextTrack.className = 'nav-track';
    nextTrack.innerHTML = `
      <img src="${escapeHtml(track.thumb || '')}" alt="next" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23121a13%22 width=%22100%22 height=%22100%22/%3E%3C/svg%3E'">
      <div class="info">
        <div class="title">${escapeHtml(track.title)}</div>
        <div class="author">${escapeHtml(track.author)}</div>
      </div>
    `;
  } else {
    nextTrack.className = 'nav-track empty';
    nextTrack.innerHTML = '[END]';
  }
}

/**
 * Escapa caracteres especiales HTML para prevenir inyección XSS
 * 
 * @param {string} s - String a escapar
 * @returns {string} - String escapado
 */
function escapeHtml(s) {
  return (s || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}
