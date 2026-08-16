/**
 * YT // GLITCH PLAYER - Controls & Events
 * 
 * Gestiona todos los event listeners:
 * - Reproductor de YouTube
 * - Botones de control (play, pause, siguiente, anterior)
 * - Controles de volumen y progreso
 * - Toggle de cola y modos de animación
 * - Creación y eliminación de playlists
 * - Agregar temas a la cola
 */

let player = null;

/**
 * Inicializa el reproductor de YouTube embebido
 * Se ejecuta la primera vez que se selecciona un tema
 * 
 * @param {string} videoId - ID del video de YouTube
 */
function initPlayer(videoId) {
  if (player) {
    player.loadVideoById(videoId);
    return;
  }

  const container = document.getElementById('player');
  if (!container) return;

  player = new YT.Player('player', {
    videoId: videoId,
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      playsinline: 1
    },
    events: {
      onReady: () => {
        updatePlayerUI();
        player.setVolume(80);
      },
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.ENDED) {
          goNext();
        }
        updatePlayerUI();
      }
    }
  });
}

/**
 * Reproduce un tema por su índice en la lista actual
 * 
 * @param {number} idx - Índice en la lista actual
 */
function playIndex(idx) {
  if (!state.current || !state.playlists[state.current]) return;

  const tracks = state.playlists[state.current];
  if (idx < 0 || idx >= tracks.length) return;

  state.index = idx;
  const track = tracks[idx];

  // Registrar en historial con duración 0 (se actualiza cuando termina)
  addToHistory(track.videoId, track.title, track.author, track.url, track.thumb, 0);

  // Inicializar o actualizar reproductor
  if (!player) {
    initPlayer(track.videoId);
  } else {
    player.loadVideoById(track.videoId);
    player.playVideo();
  }

  // Actualizar UI
  document.getElementById('trackTitle').textContent = track.title;
  document.getElementById('trackAuthor').textContent = track.author;

  if (track.thumb) {
    const coverImg = document.querySelector('.cover-wrap img');
    if (coverImg) {
      coverImg.src = track.thumb;
    } else {
      const img = document.createElement('img');
      img.src = track.thumb;
      document.querySelector('.cover-wrap').innerHTML = '';
      document.querySelector('.cover-wrap').appendChild(img);
    }
  }

  renderQueue();
  renderNavControls();
  saveState();
}

/**
 * Reproduce el siguiente tema
 * Respeta el modo shuffle si está activo
 * Aplica lógica de bucle (all, one, none)
 */
function goNext() {
  if (!state.current || !state.playlists[state.current]) return;

  const tracks = state.playlists[state.current];
  if (tracks.length === 0) return;

  let nextIdx;

  if (state.shuffled && state.shuffleOrder.length > 0) {
    const currentPos = state.shuffleOrder.indexOf(state.index);
    if (currentPos < state.shuffleOrder.length - 1) {
      nextIdx = state.shuffleOrder[currentPos + 1];
    } else {
      if (state.loop === 'all') {
        nextIdx = state.shuffleOrder[0];
      } else if (state.loop === 'one') {
        nextIdx = state.index;
      } else {
        return;
      }
    }
  } else {
    if (state.index < tracks.length - 1) {
      nextIdx = state.index + 1;
    } else {
      if (state.loop === 'all') {
        nextIdx = 0;
      } else if (state.loop === 'one') {
        nextIdx = state.index;
      } else {
        return;
      }
    }
  }

  playIndex(nextIdx);
}

/**
 * Reproduce el tema anterior
 * Respeta el modo shuffle si está activo
 */
function goPrev() {
  if (!state.current || !state.playlists[state.current]) return;

  const tracks = state.playlists[state.current];
  if (tracks.length === 0) return;

  let prevIdx;

  if (state.shuffled && state.shuffleOrder.length > 0) {
    const currentPos = state.shuffleOrder.indexOf(state.index);
    if (currentPos > 0) {
      prevIdx = state.shuffleOrder[currentPos - 1];
    } else {
      prevIdx = state.shuffleOrder[state.shuffleOrder.length - 1];
    }
  } else {
    if (state.index > 0) {
      prevIdx = state.index - 1;
    } else {
      prevIdx = tracks.length - 1;
    }
  }

  playIndex(prevIdx);
}

/**
 * Actualiza la UI del reproductor
 * Se llama constantemente para reflejar estado actual
 */
function updatePlayerUI() {
  if (!player) return;

  // Actualizar botón play/pausa
  const btnPlay = document.getElementById('btnPlay');
  const isPlaying = player.getPlayerState() === YT.PlayerState.PLAYING;
  btnPlay.textContent = isPlaying ? '⏸' : '▶';

  // Actualizar barra de progreso
  const current = player.getCurrentTime();
  const duration = player.getDuration();

  const seekBar = document.getElementById('seekBar');
  const tCur = document.getElementById('tCur');
  const tDur = document.getElementById('tDur');

  if (duration > 0) {
    seekBar.max = Math.floor(duration);
    seekBar.value = Math.floor(current);
  }

  tCur.textContent = formatTime(current);
  tDur.textContent = formatTime(duration);

  // Registrar duración en historial
  if (player.getPlayerState() === YT.PlayerState.ENDED && state.history.length > 0) {
    const lastEntry = state.history[state.history.length - 1];
    if (lastEntry.plays.length > 0) {
      const lastPlay = lastEntry.plays[lastEntry.plays.length - 1];
      lastPlay.duration = Math.floor(duration);
      updateStats();
      saveState();
    }
  }
}

/**
 * Formatea segundos a MM:SS
 * 
 * @param {number} sec - Segundos
 * @returns {string} - Formato MM:SS
 */
function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

/**
 * Inicializa todos los event listeners
 * Se ejecuta una sola vez cuando la página carga
 */
function initControls() {
  // Reproducción
  document.getElementById('btnPlay').addEventListener('click', () => {
    if (!player) return;
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  document.getElementById('btnNext').addEventListener('click', goNext);
  document.getElementById('btnPrev').addEventListener('click', goPrev);

  // Bucle
  document.getElementById('btnLoop').addEventListener('click', () => {
    const states = ['none', 'all', 'one'];
    const idx = states.indexOf(state.loop);
    state.loop = states[(idx + 1) % states.length];

    const btn = document.getElementById('btnLoop');
    btn.style.color = state.loop === 'none' ? '' : 'var(--verde)';

    saveState();
  });

  // Oneshot (repetir tema actual desde inicio)
  document.getElementById('btnOneshot').addEventListener('click', () => {
    if (player && state.index >= 0) {
      player.seekTo(0);
      player.playVideo();
    }
  });

  // Shuffle (genera orden aleatorio)
  document.getElementById('btnShuffle').addEventListener('click', () => {
    if (!state.current || !state.playlists[state.current]) return;

    state.shuffled = !state.shuffled;

    if (state.shuffled) {
      // Generar orden aleatorio (Fisher-Yates)
      const tracks = state.playlists[state.current];
      state.shuffleOrder = Array.from({ length: tracks.length }, (_, i) => i);

      for (let i = state.shuffleOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [state.shuffleOrder[i], state.shuffleOrder[j]] = [state.shuffleOrder[j], state.shuffleOrder[i]];
      }

      document.getElementById('btnShuffle').style.color = 'var(--verde)';
    } else {
      state.shuffleOrder = [];
      document.getElementById('btnShuffle').style.color = '';
    }

    saveState();
  });

  // Barra de progreso
  document.getElementById('seekBar').addEventListener('input', () => {
    if (player) {
      const val = document.getElementById('seekBar').value;
      player.seekTo(val);
    }
  });

  // Volumen
  document.getElementById('volBar').addEventListener('input', () => {
    if (player) {
      const vol = document.getElementById('volBar').value;
      player.setVolume(vol);
    }
  });

  // Agregar tema
  const addInput = document.getElementById('addUrl');
  const addBtn = document.getElementById('addBtn');

  const addTrack = async () => {
    const url = addInput.value.trim();
    if (!url) return;

    const videoId = extractVideoId(url);
    if (!videoId) {
      alert('URL inválida de YouTube');
      return;
    }

    try {
      const meta = await fetchMeta(url, videoId);

      state.playlists[state.current].push({
        url,
        videoId,
        title: meta.title,
        author: meta.author,
        thumb: meta.thumbnail
      });

      saveState();
      renderQueue();
      addInput.value = '';
    } catch (err) {
      console.error('Error agregando tema:', err);
      alert('Error al agregar tema');
    }
  };

  addBtn.addEventListener('click', addTrack);
  addInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTrack();
  });

  // Nueva playlist
  document.getElementById('btnNewPl').addEventListener('click', () => {
    const name = document.getElementById('newPlName').value.trim();
    if (!name) {
      alert('Ingresa un nombre');
      return;
    }

    if (state.playlists[name]) {
      alert('Ya existe una lista con ese nombre');
      return;
    }

    state.playlists[name] = [];
    state.current = name;
    state.index = -1;

    saveState();
    renderPlaylists();
    renderQueue();

    document.getElementById('newPlName').value = '';
  });

  // Export/Import
  document.getElementById('btnExport').addEventListener('click', exportPlaylist);
  document.getElementById('btnImport').addEventListener('click', openFileImport);
  document.getElementById('fileImport').addEventListener('change', importPlaylist);

  // Queue toggle
  document.getElementById('queueToggle').addEventListener('click', () => {
    const app = document.querySelector('.app');
    app.classList.toggle('queue-visible');
    const toggle = document.getElementById('queueToggle');
    toggle.textContent = app.classList.contains('queue-visible') ? '◀' : '▶';
    toggle.classList.toggle('active');
  });

  // Historial toggle
  document.getElementById('btnHistoryToggle').addEventListener('click', () => {
    const cont = document.getElementById('historyContainer');
    if (cont) {
      cont.style.display = cont.style.display === 'none' ? 'block' : 'none';
    }
  });

  // Controles de fuente y animaciones
  let fontScale = 1;
  const fontBase = parseFloat(getComputedStyle(document.documentElement).fontSize);

  document.getElementById('btnFontSmaller').addEventListener('click', () => {
    fontScale = Math.max(0.8, fontScale - 0.1);
    document.querySelectorAll('h1, h2, p, span, div, li').forEach(el => {
      if (!el.tagName.match(/INPUT|BUTTON/i) && !el.closest('input, button')) {
        el.style.fontSize = (fontBase * fontScale) + 'px';
      }
    });
  });

  document.getElementById('btnFontLarger').addEventListener('click', () => {
    fontScale = Math.min(1.5, fontScale + 0.1);
    document.querySelectorAll('h1, h2, p, span, div, li').forEach(el => {
      if (!el.tagName.match(/INPUT|BUTTON/i) && !el.closest('input, button')) {
        el.style.fontSize = (fontBase * fontScale) + 'px';
      }
    });
  });

  // Ciclo de 3 estados: normal → ASCII → disabled
  let animationState = 0;
  document.getElementById('btnToggleAnimations').addEventListener('click', () => {
    const body = document.body;
    const btn = document.getElementById('btnToggleAnimations');
    const glitchEl = document.querySelector('.glitch');

    animationState = (animationState + 1) % 3;

    body.classList.remove('animations-disabled', 'ascii-mode');
    glitchEl?.classList.remove('ascii-mode');
    btn.classList.remove('active');
    btn.textContent = '◊';
    btn.style.color = 'var(--verde)';

    if (animationState === 1) {
      // ASCII Hacker mode
      body.classList.add('ascii-mode');
      glitchEl?.classList.add('ascii-mode');
      generarAsciiData(glitchEl);
      btn.textContent = '◆';
      btn.style.color = 'var(--amatista)';
    } else if (animationState === 2) {
      // Animaciones desactivadas
      body.classList.add('animations-disabled');
      btn.classList.add('active');
      btn.textContent = '●';
    }
  });

  // Update loop
  setInterval(updatePlayerUI, 100);
}

/**
 * Genera datos aleatorios ASCII para la animación
 * Se usa en modo hacker para reemplazar cada frame con caracteres random
 * 
 * @param {Element} el - Elemento .glitch
 */
function generarAsciiData(el) {
  if (!el) return;

  const chars = '▓░▒╪╫╬█░░▓▒╪╫╬█░░▓▒╪╫╬█░░▓▒╪╫╬█░░▓▒╪╫╬█░░▓▒╪╫╬█░░▓▒╪╫╬█░░▓▒╪╫╬█░░▓▒╪╫╬█░░▓▒╪╫╬█░░▓▒╪╫╬█░░▓▒╪╫╬█ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
  const text = el.getAttribute('data-text') || '';
  const len = text.length;

  for (let i = 1; i <= 9; i++) {
    let ascii = '';
    for (let j = 0; j < len; j++) {
      ascii += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    el.setAttribute(`data-ascii-${i}`, ascii);
  }
}
