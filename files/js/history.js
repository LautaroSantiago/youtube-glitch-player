/**
 * YT // GLITCH PLAYER - History Management
 * 
 * Funciones adicionales para el panel de historial
 * Como estado del panel (expandido/colapsado) y acciones especiales
 */

let historyPanelOpen = false;

/**
 * Toggle del panel de historial
 * Se llama desde los event listeners en controls.js
 */
function toggleHistoryPanel() {
  const cont = document.getElementById('historyContainer');
  if (!cont) return;

  historyPanelOpen = !historyPanelOpen;
  cont.style.display = historyPanelOpen ? 'block' : 'none';

  if (historyPanelOpen) {
    renderHistory();
  }
}

/**
 * Limpia todo el historial
 * Requiere confirmación del usuario
 */
function clearHistory() {
  if (!confirm('¿Eliminar todo el historial de reproducción?')) {
    return;
  }

  state.history = [];
  updateStats();
  saveState();

  renderHistory();
}

/**
 * Exporta el historial como archivo JSON
 * Incluye todas las reproducciones con timestamps
 */
function exportHistory() {
  const data = {
    exportDate: new Date().toISOString(),
    stats: state.stats,
    history: state.history
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `historial_${new Date().toISOString().split('T')[0]}.json`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}
