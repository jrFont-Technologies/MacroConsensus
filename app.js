/**
 * MacroConsensus - Inteligencia Macro y Meta-Análisis de Expertos
 * Frontend interactivo y sincronización en la nube
 */

// Estado Global
const state = {
  config: {
    geminiApiKey: '',
    geminiModel: 'gemini-3.8-flash',
    githubRepo: 'jrFont-Technologies/MacroConsensus',
    githubToken: '',
    autoSync: true,
    ventanaMeses: 3
  },
  canales: [],
  activeCanalId: 'cava',
  gestorSubtab: 'canales', // 'canales' | 'sueltos'
  channelSubfilter: 'all', // 'all' | 'macro' | 'tier1' | 'tier2' | 'tier3' | 'excluded'
  meta_analisis: null,
  videos: [],
  filters: {
    search: '',
    tag: '',
    author: ''
  },
  isSyncing: false,
  githubFileSha: null
};

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
  initTabs();
  initEventListeners();
  await loadConfigFromStorage();
  await loadInitialData();
  renderAll();

  // Sincronización periódica con GitHub si está configurado
  if (state.config.autoSync) {
    setInterval(() => syncWithGitHub('pull'), 60000);
  }
  window.addEventListener('focus', () => {
    if (state.config.autoSync) syncWithGitHub('pull');
  });
});

// Clave de API de Gemini por defecto (pre-activada, no requiere introducirse manualmente)
const DEFAULT_GEMINI_KEY = atob('QVEuQWI4Uk42STZvV0NWejluOVd1aGs3cVo4ZjZnT21teUlPUWNDbXV6U1R2T1NFcGJZU1E=');

function getEffectiveApiKey() {
  const customKey = localStorage.getItem('macro_gemini_api_key');
  if (customKey && customKey.trim()) {
    return customKey.trim();
  }
  return DEFAULT_GEMINI_KEY;
}

// ==========================================
// GESTIÓN DE CONFIGURACIÓN & STORAGE
// ==========================================
async function loadConfigFromStorage() {
  const customKey = localStorage.getItem('macro_gemini_api_key');
  if (customKey && customKey.trim()) {
    state.config.geminiApiKey = customKey.trim();
  } else {
    state.config.geminiApiKey = DEFAULT_GEMINI_KEY;
  }

  const savedModel = localStorage.getItem('macro_gemini_model');
  if (savedModel) state.config.geminiModel = savedModel;

  const savedRepo = localStorage.getItem('macro_github_repo');
  if (savedRepo) state.config.githubRepo = savedRepo;

  const savedToken = localStorage.getItem('macro_github_token');
  if (savedToken) state.config.githubToken = savedToken;

  // Si no hay token en localStorage, intentar cargarlo desde el endpoint local seguro
  if (!state.config.githubToken) {
    try {
      const locRes = await fetch('/api/config-local');
      if (locRes.ok) {
        const locCfg = await locRes.json();
        if (locCfg.githubToken) {
          state.config.githubToken = locCfg.githubToken;
          localStorage.setItem('macro_github_token', locCfg.githubToken);
        }
        if (locCfg.githubRepo) {
          state.config.githubRepo = locCfg.githubRepo;
          localStorage.setItem('macro_github_repo', locCfg.githubRepo);
        }
      }
    } catch (e) {}
  }

  // Actualizar campos de la pestaña de configuración
  const elKey = document.getElementById('settingApiKey');
  const elModel = document.getElementById('settingModel');
  const elRepo = document.getElementById('settingGithubRepo');
  const elToken = document.getElementById('settingGithubToken');

  if (elKey) {
    if (customKey && customKey.trim()) {
      elKey.value = customKey.trim();
    } else {
      elKey.value = '';
      elKey.placeholder = '•••••••••••••••••••••••••••••••• (Clave predeterminada activa)';
    }
  }
  if (elModel) elModel.value = state.config.geminiModel;
  if (elRepo) elRepo.value = state.config.githubRepo;
  if (elToken) elToken.value = state.config.githubToken;
}

function saveConfigToStorage() {
  const elKey = document.getElementById('settingApiKey');
  const elModel = document.getElementById('settingModel');
  const elRepo = document.getElementById('settingGithubRepo');
  const elToken = document.getElementById('settingGithubToken');

  if (elKey) {
    const val = elKey.value.trim();
    if (val) {
      state.config.geminiApiKey = val;
      localStorage.setItem('macro_gemini_api_key', val);
      showToast('Nueva clave API guardada (sustituye a la predeterminada)', 'success');
    } else {
      state.config.geminiApiKey = DEFAULT_GEMINI_KEY;
      localStorage.removeItem('macro_gemini_api_key');
      elKey.placeholder = '•••••••••••••••••••••••••••••••• (Clave predeterminada activa)';
      showToast('Restaurada clave API predeterminada activa', 'info');
    }
  }
  if (elModel) {
    state.config.geminiModel = elModel.value;
    localStorage.setItem('macro_gemini_model', state.config.geminiModel);
  }
  if (elRepo) {
    state.config.githubRepo = elRepo.value.trim();
    localStorage.setItem('macro_github_repo', state.config.githubRepo);
  }
  if (elToken) {
    state.config.githubToken = elToken.value.trim();
    localStorage.setItem('macro_github_token', state.config.githubToken);
  }

  showToast('Configuración guardada correctamente', 'success');
}

// Cargar datos locales iniciales
async function loadInitialData() {
  try {
    const res = await fetch('datos.json?t=' + Date.now());
    if (res.ok) {
      const data = await res.json();
      state.canales = data.canales || [
        { id: 'cava', nombre: 'José Luis Cava', handle: '@JoseLuisCavaOficial', color: '#3b82f6', descripcion: 'Análisis técnico institucional, S&P 500, bono a 30 años, liquidez global y Bitcoin.' },
        { id: 'rallo', nombre: 'Juan Ramón Rallo', handle: '@JuanRamonRallo', color: '#10b981', descripcion: 'Macroeconomía, política monetaria (Fed / BCE), inflación, deuda y debasement trade.' },
        { id: 'jon', nombre: 'Jon Economist', handle: '@joneconomist', color: '#f59e0b', descripcion: 'Ciclos de liquidez global, Reserva Federal, Bitcoin y macro-trading.' }
      ];
      if (state.canales.length > 0 && !state.canales.some(c => c.id === state.activeCanalId)) {
        state.activeCanalId = state.canales[0].id;
      }
      state.meta_analisis = data.meta_analisis || null;
      state.videos = data.videos || [];
      if (data.config) {
        if (!state.config.geminiApiKey && data.config.geminiApiKey) {
          state.config.geminiApiKey = data.config.geminiApiKey;
        }
        if (data.config.githubRepo) state.config.githubRepo = data.config.githubRepo;
        if (data.config.githubToken) state.config.githubToken = data.config.githubToken;
      }
    }
  } catch (err) {
    console.warn('No se pudo cargar datos.json local:', err);
  }

  // Intentar pull de GitHub si hay token y repo
  if (state.config.githubRepo && state.config.githubToken) {
    await syncWithGitHub('pull');
  }
}

// Guardar datos (Localmente en el servidor si existe + GitHub)
async function persistData(saveToGitHub = true) {
  const payload = {
    config: {
      geminiModel: state.config.geminiModel,
      githubRepo: state.config.githubRepo,
      lastSync: new Date().toISOString(),
      ventanaMeses: 3
    },
    canales: state.canales,
    meta_analisis: state.meta_analisis,
    videos: state.videos
  };

  // 1. Guardar en servidor local si está corriendo
  try {
    await fetch('/api/guardar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    // Si estamos en Vercel o estático sin servidor local, ignorar
  }

  // 2. Guardar en GitHub
  if (saveToGitHub && state.config.githubRepo && state.config.githubToken) {
    await syncWithGitHub('push', payload);
  }
}

// ==========================================
// SINCRONIZACIÓN CON GITHUB (REST API)
// ==========================================
async function syncWithGitHub(action = 'pull', payload = null) {
  if (state.isSyncing && action === 'push') return;
  if (!state.config.githubRepo || !state.config.githubToken) return;

  const syncDot = document.getElementById('syncDot');
  const syncText = document.getElementById('syncText');

  try {
    state.isSyncing = true;
    if (syncDot) syncDot.className = 'status-dot syncing';
    if (syncText) syncText.textContent = action === 'pull' ? 'Descargando...' : 'Guardando...';

    const url = `https://api.github.com/repos/${state.config.githubRepo}/contents/datos.json`;
    const headers = {
      'Authorization': `token ${state.config.githubToken}`,
      'Accept': 'application/vnd.github+json'
    };

    if (action === 'pull') {
      const res = await fetch(url, { headers, cache: 'no-store' });
      if (res.ok) {
        const fileInfo = await res.json();
        state.githubFileSha = fileInfo.sha;
        const decodedContent = decodeURIComponent(escape(atob(fileInfo.content.replace(/\n/g, ''))));
        const remoteData = JSON.parse(decodedContent);

        if (remoteData.canales && remoteData.canales.length > 0) {
          state.canales = remoteData.canales;
        }
        if (remoteData.videos && remoteData.videos.length > 0) {
          state.videos = remoteData.videos;
          state.meta_analisis = remoteData.meta_analisis || state.meta_analisis;
          renderAll();
        }
        if (syncDot) syncDot.className = 'status-dot';
        if (syncText) syncText.textContent = 'En línea';
      } else if (res.status === 404) {
        if (syncDot) syncDot.className = 'status-dot';
        if (syncText) syncText.textContent = 'Repo Listo (vacío)';
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } else if (action === 'push') {
      const dataToSave = payload || {
        config: {
          geminiModel: state.config.geminiModel,
          githubRepo: state.config.githubRepo,
          lastSync: new Date().toISOString(),
          ventanaMeses: 3
        },
        canales: state.canales,
        meta_analisis: state.meta_analisis,
        videos: state.videos
      };

      if (!state.githubFileSha) {
        const checkRes = await fetch(url, { headers, cache: 'no-store' });
        if (checkRes.ok) {
          const checkInfo = await checkRes.json();
          state.githubFileSha = checkInfo.sha;
        }
      }

      const contentBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(dataToSave, null, 2))));
      const pushBody = {
        message: `Actualización MacroConsensus: ${new Date().toLocaleString('es-ES')}`,
        content: contentBase64
      };
      if (state.githubFileSha) {
        pushBody.sha = state.githubFileSha;
      }

      const putRes = await fetch(url, {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pushBody)
      });

      if (putRes.ok) {
        const resData = await putRes.json();
        state.githubFileSha = resData.content.sha;
        if (syncDot) syncDot.className = 'status-dot';
        if (syncText) syncText.textContent = 'Sincronizado';
        showToast('Datos respaldados en GitHub con éxito', 'success');
      } else {
        throw new Error(`Error subiendo a GitHub: ${putRes.status}`);
      }
    }
  } catch (err) {
    console.warn('Error en sync GitHub:', err);
    if (syncDot) syncDot.className = 'status-dot error';
    if (syncText) syncText.textContent = 'Sin conexión GitHub';
  } finally {
    state.isSyncing = false;
  }
}

// ==========================================
// NAVEGACIÓN POR PESTAÑAS
// ==========================================
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.add('active');
    });
  });
}

// ==========================================
// RENDERIZADO GENERAL
// ==========================================
function renderAll() {
  updateBadges();
  renderMetaTab();
  renderVideosTab();
}

function updateBadges() {
  const totalVideos = state.videos.length;
  const includedVideos = state.videos.filter(v => v.incluidoEnSintesis !== false).length;
  const totalCanalesVideos = state.videos.filter(v => v.tipo === 'canal').length;
  const totalSueltosVideos = state.videos.filter(v => v.tipo !== 'canal').length;

  const metaCountBadge = document.getElementById('metaCountBadge');
  const videosCountBadge = document.getElementById('videosCountBadge');
  const includedVideosCount = document.getElementById('includedVideosCount');
  const totalVideosCountMeta = document.getElementById('totalVideosCountMeta');
  const badgeTotalCanalesCount = document.getElementById('badgeTotalCanalesCount');
  const badgeTotalSueltosCount = document.getElementById('badgeTotalSueltosCount');

  if (metaCountBadge) metaCountBadge.textContent = includedVideos;
  if (videosCountBadge) videosCountBadge.textContent = totalVideos;
  if (includedVideosCount) includedVideosCount.textContent = includedVideos;
  if (totalVideosCountMeta) totalVideosCountMeta.textContent = totalVideos;
  if (badgeTotalCanalesCount) badgeTotalCanalesCount.textContent = totalCanalesVideos;
  if (badgeTotalSueltosCount) badgeTotalSueltosCount.textContent = totalSueltosVideos;
}

// ==========================================
// RENDER PESTAÑA 1: META-ANÁLISIS
// ==========================================
function renderMetaTab() {
  const meta = state.meta_analisis;
  if (!meta) return;

  const elTitle = document.getElementById('metaTitle');
  const elDate = document.getElementById('metaDate');
  const elLead = document.getElementById('metaLead');
  const elConsensusText = document.getElementById('metaConsensusText');

  if (elTitle && meta.titulo) elTitle.textContent = meta.titulo;
  if (elDate && meta.fecha) elDate.textContent = `Última síntesis: ${meta.fecha}`;
  if (elLead && meta.resumen_ejecutivo) elLead.textContent = meta.resumen_ejecutivo;
  if (elConsensusText && meta.consenso_macro) elConsensusText.textContent = meta.consenso_macro;

  // 1. Renderizar Duelo de Tesis
  const duelContainer = document.getElementById('duelContainer');
  if (duelContainer) {
    if (!meta.duelo_tesis || meta.duelo_tesis.length === 0) {
      duelContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No hay discrepancias registradas en el análisis actual.</p>`;
    } else {
      duelContainer.innerHTML = meta.duelo_tesis.map(duel => `
        <div class="duel-card">
          <div class="duel-card-header">
            <span>⚔️</span> ${escapeHtml(duel.titulo)}
          </div>
          <div class="duel-battlefield">
            <!-- Lado A -->
            <div class="duel-side side-a">
              <div class="duel-analyst">
                <span class="analyst-name">👤 ${escapeHtml(duel.analystA || duel.analistaA)}</span>
                <span class="posture-badge">${escapeHtml(duel.postureA || duel.posturaA || 'Tesis A')}</span>
              </div>
              <p class="duel-args">${escapeHtml(duel.argumentsA || duel.argumentosA)}</p>
            </div>

            <!-- VS Badge -->
            <div class="duel-vs-badge">VS</div>

            <!-- Lado B -->
            <div class="duel-side side-b">
              <div class="duel-analyst">
                <span class="analyst-name">👤 ${escapeHtml(duel.analystB || duel.analistaB)}</span>
                <span class="posture-badge">${escapeHtml(duel.postureB || duel.posturaB || 'Tesis B')}</span>
              </div>
              <p class="duel-args">${escapeHtml(duel.argumentsB || duel.argumentosB)}</p>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // 2. Renderizar Matriz Agregada de Activos
  const assetContainer = document.getElementById('assetMatrixContainer');
  if (assetContainer) {
    if (!meta.matriz_activos || meta.matriz_activos.length === 0) {
      assetContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No hay matriz de activos disponible.</p>`;
    } else {
      assetContainer.innerHTML = meta.matriz_activos.map(asset => {
        let pillClass = 'neutral';
        let barColor = 'var(--accent-amber)';
        const sesgoLower = (asset.sesgo || '').toLowerCase();
        if (sesgoLower.includes('bull') || sesgoLower.includes('favor') || sesgoLower.includes('alcist')) {
          pillClass = 'bullish';
          barColor = 'var(--accent-green)';
        } else if (sesgoLower.includes('bear') || sesgoLower.includes('cautel') || sesgoLower.includes('bajist') || sesgoLower.includes('desfavor')) {
          pillClass = 'bearish';
          barColor = 'var(--accent-red)';
        }

        const pct = asset.consenso_pct || 50;

        return `
          <div class="asset-card">
            <div class="asset-card-top">
              <span class="asset-name">${escapeHtml(asset.activo)}</span>
              <span class="bias-pill ${pillClass}">${escapeHtml(asset.sesgo)}</span>
            </div>
            <div class="asset-meter-bg" title="Convicción del consenso: ${pct}%">
              <div class="asset-meter-fill" style="width: ${pct}%; background-color: ${barColor};"></div>
            </div>
            <p class="asset-desc">${escapeHtml(asset.detalle || '')}</p>
          </div>
        `;
      }).join('');
    }
  }
}

// ==========================================
// RENDER PESTAÑA 2: GESTOR DUAL DE VÍDEOS
// ==========================================
function renderVideosTab() {
  if (state.gestorSubtab === 'canales') {
    renderChannelsView();
  } else {
    renderSueltosView();
  }
}

// Alternar entre subpestañas 'canales' y 'sueltos'
window.switchGestorSubtab = function(subtab) {
  state.gestorSubtab = subtab;
  const btnCanales = document.getElementById('btnSubtabCanales');
  const btnSueltos = document.getElementById('btnSubtabSueltos');
  const panelCanales = document.getElementById('panelCanales');
  const panelSueltos = document.getElementById('panelSueltos');

  if (subtab === 'canales') {
    if (btnCanales) btnCanales.classList.add('active');
    if (btnSueltos) btnSueltos.classList.remove('active');
    if (panelCanales) panelCanales.style.display = 'block';
    if (panelSueltos) panelSueltos.style.display = 'none';
    renderChannelsView();
  } else {
    if (btnCanales) btnCanales.classList.remove('active');
    if (btnSueltos) btnSueltos.classList.add('active');
    if (panelCanales) panelCanales.style.display = 'none';
    if (panelSueltos) panelSueltos.style.display = 'block';
    renderSueltosView();
  }
};

window.switchActiveChannel = function(canalId) {
  state.activeCanalId = canalId;
  state.channelSubfilter = 'all';
  renderChannelsView();
};

window.filterChannelSub = function(subfilter) {
  state.channelSubfilter = subfilter;
  renderChannelsView();
};

window.toggleChannelVideoMacro = function(videoId) {
  const v = state.videos.find(x => x.id === videoId);
  if (v) {
    v.incluidoEnSintesis = !v.incluidoEnSintesis;
    updateBadges();
    renderChannelsView();
    persistData(true);
    showToast(v.incluidoEnSintesis ? 'Vídeo incluido en síntesis macro' : 'Vídeo descartado de síntesis macro', 'info');
  }
};

window.setChannelMacroAll = function(canalId, isIncluded) {
  let count = 0;
  state.videos.forEach(v => {
    if (v.tipo === 'canal' && v.canalId === canalId) {
      v.incluidoEnSintesis = isIncluded;
      count++;
    }
  });
  updateBadges();
  renderChannelsView();
  persistData(true);
  showToast(`${count} vídeos ${isIncluded ? 'incluidos' : 'excluidos'} para este canal`, 'success');
};

window.setChannelAutoDiscard = function(canalId) {
  let discarded = 0;
  state.videos.forEach(v => {
    if (v.tipo === 'canal' && v.canalId === canalId) {
      if (v.categoriaSugerida === 'politica_sociedad') {
        v.incluidoEnSintesis = false;
        discarded++;
      } else {
        v.incluidoEnSintesis = true;
      }
    }
  });
  updateBadges();
  renderChannelsView();
  persistData(true);
  showToast(`Auto-descartados ${discarded} vídeos off-topic / política`, 'success');
};

// Modal Añadir Canal
window.openAddChannelModal = function() {
  const modal = document.getElementById('modalAddChannel');
  if (modal) modal.classList.add('active');
};

window.closeAddChannelModal = function() {
  const modal = document.getElementById('modalAddChannel');
  if (modal) modal.classList.remove('active');
};

window.handleAddChannelSubmit = function(e) {
  e.preventDefault();
  const nameInput = document.getElementById('newChannelName');
  const handleInput = document.getElementById('newChannelHandle');
  const descInput = document.getElementById('newChannelDesc');

  const nombre = nameInput ? nameInput.value.trim() : '';
  const handle = handleInput ? handleInput.value.trim() : '';
  const descripcion = (descInput && descInput.value.trim()) ? descInput.value.trim() : 'Canal monitorizado de análisis macroeconómico y de mercados.';

  if (!nombre) return;

  const id = nombre.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 15) + '_' + Date.now().toString().slice(-4);
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
  const randomColor = colors[state.canales.length % colors.length];

  const newCanal = {
    id,
    nombre,
    handle,
    color: randomColor,
    descripcion
  };

  state.canales.push(newCanal);
  state.activeCanalId = id;
  closeAddChannelModal();
  if (nameInput) nameInput.value = '';
  if (handleInput) handleInput.value = '';
  if (descInput) descInput.value = '';

  renderVideosTab();
  persistData(true);
  showToast(`¡Canal "${nombre}" añadido con éxito! Ya puedes monitorizar sus vídeos de los últimos 3 meses.`, 'success');
};

// Subpestaña 1: Renderizado de Canales Monitorizados
function renderChannelsView() {
  const pillsContainer = document.getElementById('channelsPillsList');
  const heroContainer = document.getElementById('channelHeroCard');
  const listContainer = document.getElementById('channelVideosList');
  if (!pillsContainer || !heroContainer || !listContainer) return;

  const canales = state.canales || [];
  if (canales.length === 0) {
    pillsContainer.innerHTML = `<span style="color: var(--text-muted); font-size: 0.85rem;">No hay canales configurados. Añade uno con el botón lateral.</span>`;
    heroContainer.innerHTML = '';
    listContainer.innerHTML = '';
    return;
  }

  if (!canales.some(c => c.id === state.activeCanalId)) {
    state.activeCanalId = canales[0].id;
  }
  const currentCanal = canales.find(c => c.id === state.activeCanalId) || canales[0];

  // 1. Píldoras de Canales
  pillsContainer.innerHTML = canales.map(c => {
    const isActive = c.id === currentCanal.id;
    const vCount = state.videos.filter(v => v.tipo === 'canal' && v.canalId === c.id).length;
    return `
      <button class="channel-pill ${isActive ? 'active' : ''}" onclick="switchActiveChannel('${c.id}')">
        <span>${escapeHtml(c.nombre)}</span>
        <span class="badge-subtab">${vCount}</span>
      </button>
    `;
  }).join('');

  // 2. Estadísticas del Canal Activo
  const channelVideos = state.videos.filter(v => v.tipo === 'canal' && v.canalId === currentCanal.id);
  const totalChannelVideos = channelVideos.length;
  const includedCount = channelVideos.filter(v => v.incluidoEnSintesis !== false).length;
  const excludedCount = channelVideos.filter(v => v.incluidoEnSintesis === false).length;
  const macroCount = channelVideos.filter(v => v.categoriaSugerida === 'macro').length;
  const tier1Count = channelVideos.filter(v => v.recencyTier === 'tier1' || (v.diasAntiguedad != null && v.diasAntiguedad <= 15)).length;
  const tier2Count = channelVideos.filter(v => v.recencyTier === 'tier2' || (v.diasAntiguedad != null && v.diasAntiguedad > 15 && v.diasAntiguedad <= 45)).length;
  const tier3Count = channelVideos.filter(v => v.recencyTier === 'tier3' || (v.diasAntiguedad != null && v.diasAntiguedad > 45 && v.diasAntiguedad <= 90)).length;

  heroContainer.innerHTML = `
    <div class="channel-hero-top">
      <div class="channel-hero-info">
        <div class="channel-avatar" style="border-color: ${currentCanal.color || 'var(--border-focus)'}">
          ${escapeHtml(currentCanal.nombre.charAt(0))}
        </div>
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.2rem; display: flex; align-items: center; gap: 0.5rem;">
            ${escapeHtml(currentCanal.nombre)}
            <span style="font-size: 0.8rem; font-weight: normal; color: var(--text-muted);">${escapeHtml(currentCanal.handle || '')}</span>
          </h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 680px; margin: 0;">
            ${escapeHtml(currentCanal.descripcion || 'Canal monitorizado de análisis macroeconómico y de mercados.')}
          </p>
        </div>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="setChannelMacroAll('${currentCanal.id}', true)" title="Incluir todos los vídeos de este canal en la síntesis macro">
          ✅ Incluir Todos
        </button>
        <button class="btn btn-secondary btn-sm" onclick="setChannelAutoDiscard('${currentCanal.id}')" title="Auto-descartar vídeos clasificados como Política / Sociedad">
          🧹 Auto-Descartar Off-Topic
        </button>
        <button class="btn btn-secondary btn-sm" onclick="setChannelMacroAll('${currentCanal.id}', false)" title="Excluir todos temporalmente">
          ⏹️ Excluir Todos
        </button>
      </div>
    </div>

    <div class="channel-hero-stats">
      <div class="stat-box">
        <div class="stat-box-num" style="color: var(--accent-blue);">${totalChannelVideos}</div>
        <div class="stat-box-label">Vídeos (Últimos 3 meses)</div>
      </div>
      <div class="stat-box">
        <div class="stat-box-num" style="color: var(--accent-green);">${includedCount}</div>
        <div class="stat-box-label">Incluidos en Síntesis Macro</div>
      </div>
      <div class="stat-box">
        <div class="stat-box-num" style="color: #f87171;">${tier1Count}</div>
        <div class="stat-box-label">🔥 Tier 1: &lt;15 días (Máx. Peso)</div>
      </div>
      <div class="stat-box">
        <div class="stat-box-num" style="color: #60a5fa;">${tier2Count}</div>
        <div class="stat-box-label">⚡ Tier 2: 16-45 días</div>
      </div>
      <div class="stat-box">
        <div class="stat-box-num" style="color: #94a3b8;">${tier3Count}</div>
        <div class="stat-box-label">🕰️ Tier 3: 46-90 días</div>
      </div>
    </div>

    <div class="channel-actions-toolbar">
      <div class="channel-subfilters">
        <button class="subfilter-btn ${state.channelSubfilter === 'all' ? 'active' : ''}" onclick="filterChannelSub('all')">Todos (${totalChannelVideos})</button>
        <button class="subfilter-btn ${state.channelSubfilter === 'macro' ? 'active' : ''}" onclick="filterChannelSub('macro')">Solo Macro (${macroCount})</button>
        <button class="subfilter-btn ${state.channelSubfilter === 'tier1' ? 'active' : ''}" onclick="filterChannelSub('tier1')">🔥 Últimos 15 días (${tier1Count})</button>
        <button class="subfilter-btn ${state.channelSubfilter === 'tier2' ? 'active' : ''}" onclick="filterChannelSub('tier2')">Tier 2 (16-45d) (${tier2Count})</button>
        <button class="subfilter-btn ${state.channelSubfilter === 'tier3' ? 'active' : ''}" onclick="filterChannelSub('tier3')">Tier 3 (46-90d) (${tier3Count})</button>
        <button class="subfilter-btn ${state.channelSubfilter === 'excluded' ? 'active' : ''}" onclick="filterChannelSub('excluded')">Descartados (${excludedCount})</button>
      </div>
      <div style="font-size: 0.8rem; color: var(--text-muted);">
        💡 Ventana fija: <strong>Últimos 3 meses</strong>. Ponderación automática por recencia temporal en la síntesis.
      </div>
    </div>
  `;

  // 3. Filtrar vídeos del canal según subfiltro
  let displayedVideos = channelVideos;
  if (state.channelSubfilter === 'macro') {
    displayedVideos = channelVideos.filter(v => v.categoriaSugerida === 'macro');
  } else if (state.channelSubfilter === 'tier1') {
    displayedVideos = channelVideos.filter(v => v.recencyTier === 'tier1' || (v.diasAntiguedad != null && v.diasAntiguedad <= 15));
  } else if (state.channelSubfilter === 'tier2') {
    displayedVideos = channelVideos.filter(v => v.recencyTier === 'tier2' || (v.diasAntiguedad != null && v.diasAntiguedad > 15 && v.diasAntiguedad <= 45));
  } else if (state.channelSubfilter === 'tier3') {
    displayedVideos = channelVideos.filter(v => v.recencyTier === 'tier3' || (v.diasAntiguedad != null && v.diasAntiguedad > 45 && v.diasAntiguedad <= 90));
  } else if (state.channelSubfilter === 'excluded') {
    displayedVideos = channelVideos.filter(v => v.incluidoEnSintesis === false);
  }

  // Ordenar por fecha más reciente primero
  displayedVideos.sort((a, b) => (b.dateTimestamp || 0) - (a.dateTimestamp || 0));

  if (displayedVideos.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <p style="font-size: 1rem; margin-bottom: 0.35rem;">No hay vídeos que coincidan con el filtro seleccionado.</p>
        <p style="font-size: 0.8rem;">Prueba a seleccionar "Todos" en la barra de filtros superior.</p>
      </div>
    `;
    return;
  }

  // 4. Renderizar Filas de Vídeos
  listContainer.innerHTML = displayedVideos.map(video => {
    const isIncluded = video.incluidoEnSintesis !== false;

    let tierClass = 'recency-tier3';
    let tierLabel = '🕰️ 46-90 días (Estructural)';
    if (video.recencyTier === 'tier1' || (video.diasAntiguedad != null && video.diasAntiguedad <= 15)) {
      tierClass = 'recency-tier1';
      tierLabel = '🔥 <15 días (Máx. Peso)';
    } else if (video.recencyTier === 'tier2' || (video.diasAntiguedad != null && video.diasAntiguedad <= 45)) {
      tierClass = 'recency-tier2';
      tierLabel = '⚡ 16-45 días (Tendencia)';
    }

    const isOffTopic = video.categoriaSugerida === 'politica_sociedad';
    const catClass = isOffTopic ? 'category-offtopic' : 'category-macro';
    const catLabel = isOffTopic ? '🏛️ Política / Sociedad' : '📊 Macro / Mercados';

    return `
      <div class="channel-video-row ${isIncluded ? '' : 'excluded'}">
        <div class="channel-video-left">
          <img src="${video.thumbnail || 'https://i.ytimg.com/vi/' + extractVideoId(video.url) + '/hqdefault.jpg'}" 
               class="channel-video-thumb" alt="${escapeHtml(video.title)}" loading="lazy">
          <div class="channel-video-details">
            <div class="channel-video-title" title="${escapeHtml(video.title)}">
              ${escapeHtml(video.title)}
            </div>
            <div class="channel-video-meta">
              <span class="recency-badge ${tierClass}">${tierLabel}</span>
              <span class="category-pill ${catClass}">${catLabel}</span>
              <span style="color: var(--text-muted);">📅 ${escapeHtml(video.fecha)}</span>
              <span style="color: var(--text-muted);">⏱️ hace ${video.diasAntiguedad || 0}d</span>
              <a href="${video.url}" target="_blank" style="color: var(--accent-blue); text-decoration: none; font-size: 0.75rem;" title="Abrir en YouTube">▶ Ver en YT</a>
            </div>
          </div>
        </div>
        <div class="channel-video-right">
          <button class="macro-switch-btn ${isIncluded ? 'active' : 'inactive'}" 
                  onclick="toggleChannelVideoMacro('${video.id}')"
                  title="${isIncluded ? 'Activo en la síntesis macro. Clic para descartar.' : 'Descartado de la síntesis. Clic para incluir.'}">
            <span>${isIncluded ? '🟢' : '⚪'}</span>
            <span>${isIncluded ? 'En Síntesis Macro' : 'Descartado / Off-Topic'}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Subpestaña 2: Renderizado de Vídeos Sueltos & Ocasionales
function renderSueltosView() {
  populateFilters();

  const grid = document.getElementById('videosGrid');
  if (!grid) return;

  const query = state.filters.search.toLowerCase();
  const selectedTag = state.filters.tag;
  const selectedAuthor = state.filters.author;

  const sueltosVideos = state.videos.filter(v => v.tipo !== 'canal');

  const filteredVideos = sueltosVideos.filter(v => {
    const matchesSearch = !query || 
      v.title.toLowerCase().includes(query) ||
      (v.author && v.author.toLowerCase().includes(query)) ||
      (v.consulta && v.consulta.toLowerCase().includes(query)) ||
      (v.tags && v.tags.some(t => t.toLowerCase().includes(query)));

    const matchesTag = !selectedTag || (v.tags && v.tags.includes(selectedTag));
    const matchesAuthor = !selectedAuthor || (v.author === selectedAuthor || v.channel === selectedAuthor);

    return matchesSearch && matchesTag && matchesAuthor;
  });

  if (filteredVideos.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No se encontraron vídeos sueltos con los filtros seleccionados.</p>
        <p style="font-size: 0.85rem;">Añade uno nuevo usando el formulario superior o limpia los filtros de búsqueda.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredVideos.map(video => {
    const isIncluded = video.incluidoEnSintesis !== false;
    const estructurado = video.resumen_estructurado || null;

    return `
      <div class="video-card" data-id="${video.id}">
        <div class="video-thumb-container">
          <img src="${video.thumbnail || 'https://i.ytimg.com/vi/' + extractVideoId(video.url) + '/hqdefault.jpg'}" 
               alt="${escapeHtml(video.title)}" 
               class="video-thumb-img"
               loading="lazy">
          <div class="video-author-badge">👤 ${escapeHtml(video.author || video.channel || 'Analista')}</div>
          <div class="video-date-badge">📅 ${escapeHtml(video.fecha || video.fecha_registro || '')}</div>
        </div>

        <div class="video-card-body">
          <h4 class="video-card-title" title="${escapeHtml(video.title)}">${escapeHtml(video.title)}</h4>

          <div class="user-query-box">
            <strong>🎯 Tu Consulta del Vídeo:</strong>
            ${escapeHtml(video.consulta || 'Sin consulta previa')}
          </div>

          <div class="tags-list">
            ${(video.tags || []).map(t => `<span class="tag-badge" onclick="filterByTag('${escapeHtml(t)}')">#${escapeHtml(t)}</span>`).join('')}
          </div>

          <div class="summary-accordion">
            <button class="accordion-toggle" onclick="toggleAccordion(this)">
              <span>📋 Ver Desglose Analítico IA</span>
              <span class="accordion-arrow">▼</span>
            </button>
            <div class="accordion-content">
              ${renderStructuredSummary(estructurado, video.resumen)}
            </div>
          </div>
        </div>

        <div class="video-card-actions">
          <label class="checkbox-label" title="Incluir este vídeo en la Síntesis / Meta-Análisis">
            <input type="checkbox" ${isIncluded ? 'checked' : ''} onchange="toggleIncludeVideo('${video.id}', this.checked)">
            <span>En Meta-Análisis</span>
          </label>
          <div style="display: flex; gap: 0.35rem;">
            <a href="${video.url}" target="_blank" class="btn btn-secondary btn-sm" title="Abrir vídeo en YouTube">
              ▶ Ver
            </a>
            <button class="btn btn-secondary btn-sm" onclick="editVideoQuery('${video.id}')" title="Modificar tu consulta y notas">
              ✏️ Consulta
            </button>
            <button class="btn btn-danger btn-sm" onclick="deleteVideo('${video.id}')" title="Eliminar vídeo de la biblioteca">
              🗑️
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderStructuredSummary(est, fallbackText) {
  if (!est) {
    return `<div style="white-space: pre-wrap;">${escapeHtml(fallbackText || 'Sin resumen disponible')}</div>`;
  }

  let html = '';

  if (est.respuesta_consulta) {
    html += `
      <div class="structured-block">
        <div class="block-title">🎯 Respuesta a tu Consulta:</div>
        <div>${escapeHtml(est.respuesta_consulta)}</div>
      </div>
    `;
  }

  if (est.tesis_macro) {
    html += `
      <div class="structured-block">
        <div class="block-title">📈 Tesis Central y Catalizadores:</div>
        <div>${escapeHtml(est.tesis_macro)}</div>
      </div>
    `;
  }

  if (est.matriz_activos && Object.keys(est.matriz_activos).length > 0) {
    html += `
      <div class="structured-block">
        <div class="block-title">💼 Impacto en Activos:</div>
        <ul style="padding-left: 1.2rem; margin-top: 0.25rem;">
          ${Object.entries(est.matriz_activos).map(([k, v]) => `<li><strong>${escapeHtml(formatKey(k))}:</strong> ${escapeHtml(v)}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  if (est.timestamps_citas && est.timestamps_citas.length > 0) {
    html += `
      <div class="structured-block">
        <div class="block-title">⏱️ Marcas de Tiempo & Citas:</div>
        <ul style="padding-left: 1.2rem; margin-top: 0.25rem;">
          ${est.timestamps_citas.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  return html || `<div style="white-space: pre-wrap;">${escapeHtml(fallbackText || '')}</div>`;
}

function formatKey(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function populateFilters() {
  const tagSelect = document.getElementById('tagFilter');
  const authorSelect = document.getElementById('authorFilter');

  const sueltosVideos = state.videos.filter(v => v.tipo !== 'canal');

  if (tagSelect) {
    const currentVal = tagSelect.value;
    const allTags = new Set();
    sueltosVideos.forEach(v => (v.tags || []).forEach(t => allTags.add(t)));
    tagSelect.innerHTML = `<option value="">Todas las etiquetas (${allTags.size})</option>` +
      Array.from(allTags).sort().map(t => `<option value="${escapeHtml(t)}" ${t === currentVal ? 'selected' : ''}>#${escapeHtml(t)}</option>`).join('');
  }

  if (authorSelect) {
    const currentVal = authorSelect.value;
    const allAuthors = new Set();
    sueltosVideos.forEach(v => {
      if (v.author) allAuthors.add(v.author);
      else if (v.channel) allAuthors.add(v.channel);
    });
    authorSelect.innerHTML = `<option value="">Todos los analistas (${allAuthors.size})</option>` +
      Array.from(allAuthors).sort().map(a => `<option value="${escapeHtml(a)}" ${a === currentVal ? 'selected' : ''}>👤 ${escapeHtml(a)}</option>`).join('');
  }
}

window.filterByTag = function(tag) {
  const tagSelect = document.getElementById('tagFilter');
  if (tagSelect) {
    tagSelect.value = tag;
    state.filters.tag = tag;
    renderVideosTab();
  }
};

window.toggleAccordion = function(btn) {
  const content = btn.nextElementSibling;
  const arrow = btn.querySelector('.accordion-arrow');
  if (content.classList.contains('open')) {
    content.classList.remove('open');
    if (arrow) arrow.textContent = '▼';
  } else {
    content.classList.add('open');
    if (arrow) arrow.textContent = '▲';
  }
};

window.toggleIncludeVideo = function(videoId, isIncluded) {
  const v = state.videos.find(x => x.id === videoId);
  if (v) {
    v.incluidoEnSintesis = isIncluded;
    updateBadges();
    persistData(true);
  }
};

window.deleteVideo = function(videoId) {
  const v = state.videos.find(x => x.id === videoId);
  if (!v) return;
  if (confirm(`¿Estás seguro de que deseas eliminar "${v.title}"?`)) {
    state.videos = state.videos.filter(x => x.id !== videoId);
    renderAll();
    persistData(true);
    showToast('Vídeo eliminado de la biblioteca', 'info');
  }
};

window.editVideoQuery = function(videoId) {
  const v = state.videos.find(x => x.id === videoId);
  if (!v) return;
  const nuevaConsulta = prompt('Edita tu consulta y condiciones prioritarias para este vídeo:', v.consulta || '');
  if (nuevaConsulta !== null && nuevaConsulta.trim() !== '') {
    v.consulta = nuevaConsulta.trim();
    renderVideosTab();
    persistData(true);
    showToast('Consulta actualizada. Puedes re-analizar el vídeo si lo deseas.', 'success');
  }
};

// ==========================================
// PROCESAMIENTO CON GEMINI FLASH
// ==========================================
async function callGeminiApi(prompt, systemPrompt = '', returnJson = true) {
  const apiKey = getEffectiveApiKey();
  if (!apiKey) {
    throw new Error('Por favor, introduce tu clave de API de Google Gemini en la pestaña de Configuración.');
  }

  let model = state.config.geminiModel || 'gemini-3.8-flash';
  let url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const bodyData = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2
    }
  };

  if (systemPrompt) {
    bodyData.systemInstruction = { parts: [{ text: systemPrompt }] };
  }

  const requestHeaders = { 'Content-Type': 'application/json' };
  if (!apiKey.startsWith('AQ.')) {
    requestHeaders['x-goog-api-key'] = apiKey;
  }

  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(bodyData)
    });

    if (res.status === 503 && model === 'gemini-3.8-flash') {
      console.warn('Gemini 3.8 ocupado (503). Reintentando con gemini-3.6-flash...');
      url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
      res = await fetch(url, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(bodyData)
      });
    }
  } catch (corsErr) {
    res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, systemPrompt, apiKey, model })
    });
  }

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Error en llamada Gemini (${res.status})`);
  }

  const result = await res.json();
  const textOutput = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) {
    throw new Error('Respuesta vacía de la API de Gemini.');
  }

  if (returnJson) {
    try {
      return JSON.parse(textOutput);
    } catch (e) {
      const cleaned = textOutput.replace(/```json/gi, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    }
  }

  return textOutput;
}

// Ingesta de nuevo vídeo suelto
async function handleAddVideo(e) {
  e.preventDefault();
  const urlInput = document.getElementById('videoUrl');
  const consultaInput = document.getElementById('videoConsulta');

  const rawUrl = urlInput.value.trim();
  const consulta = consultaInput.value.trim();

  const videoId = extractVideoId(rawUrl);
  if (!videoId) {
    alert('Introduce una URL válida de YouTube');
    return;
  }

  setLoading(true, 'Extrayendo transcripción y metadatos de YouTube...', 'Consultando pistas de audio y subtítulos');

  try {
    let extractData;
    try {
      const extRes = await fetch('/api/extraer-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: rawUrl })
      });
      extractData = await extRes.json();
    } catch (err) {
      extractData = { ok: false };
    }

    let transcript = extractData?.fullTranscript || '';
    let title = extractData?.title || 'Vídeo de Análisis Económico';
    let author = extractData?.author || 'Analista';

    if (!transcript) {
      setLoading(false);
      const manual = prompt('No se detectaron subtítulos automáticos en este vídeo. Pega aquí el resumen o transcripción manual para que la IA lo analice:', '');
      if (!manual) return;
      transcript = manual;
      setLoading(true, 'Analizando contenido con IA...', 'Enfocando en tu consulta personalizada');
    } else {
      setLoading(true, 'Procesando con IA...', `Analizando transcripción (${extractData.lineCount || 'múltiples'} líneas)`);
    }

    const systemPrompt = `Eres un estratega macroeconómico institucional de élite. Analizas transcripciones de analistas financieros y respondes en perfecto español.
Tu máxima prioridad es responder a la "Consulta y condiciones del usuario". Sé incisivo, técnico, objetivo y destaca los matices reales.
Devuelve SIEMPRE tu respuesta en formato JSON dentro de un bloque markdown \`\`\`json.`;

    const userPrompt = `
ANALIZA EL SIGUIENTE VÍDEO:
- Título: ${title}
- Analista / Canal: ${author}
- URL: ${rawUrl}

🎯 CONSULTA Y CONDICIONES DEL USUARIO (MÁXIMA PRIORIDAD):
"${consulta}"

TRANSCRIPCIÓN COMPLETA DEL VÍDEO:
---
${transcript.slice(0, 150000)}
---

Devuelve un bloque JSON válido con este formato:
\`\`\`json
{
  "title": "${title}",
  "author": "${author}",
  "respuesta_consulta": "Respuesta directa, exhaustiva y estructurada respondiendo exactamente a la consulta del usuario",
  "tesis_macro": "Tesis central del analista, escenario base y catalizadores",
  "matriz_activos": {
    "renta_variable": "sesgo (Favorable/Desfavorable/Neutral) y motivo",
    "bonos": "sesgo y motivo",
    "oro": "sesgo y motivo",
    "petroleo": "sesgo y motivo",
    "dolar": "sesgo y motivo",
    "bitcoin": "sesgo y motivo"
  },
  "timestamps_citas": [
    "MM:SS - Cita relevante del vídeo",
    "MM:SS - Cita relevante del vídeo"
  ],
  "tags_sugeridos": ["Tag1", "Tag2", "Tag3", "Tag4"]
}
\`\`\`
`;

    const aiRes = await callGeminiApi(userPrompt, systemPrompt, true);

    const newVideo = {
      id: 'vid_' + Date.now(),
      tipo: 'suelto',
      url: rawUrl,
      title: aiRes.title || title,
      author: aiRes.author || author,
      channel: aiRes.author || author,
      fecha: new Date().toLocaleDateString('es-ES'),
      fecha_registro: new Date().toLocaleString('es-ES'),
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      consulta: consulta,
      tags: aiRes.tags_sugeridos || ['Macro', 'Mercados'],
      incluidoEnSintesis: true,
      resumen_estructurado: {
        respuesta_consulta: aiRes.respuesta_consulta,
        tesis_macro: aiRes.tesis_macro,
        matriz_activos: aiRes.matriz_activos,
        timestamps_citas: aiRes.timestamps_citas
      }
    };

    state.videos.unshift(newVideo);
    renderAll();
    await persistData(true);

    urlInput.value = '';
    consultaInput.value = '';
    showToast('¡Vídeo suelto analizado y añadido a la biblioteca con éxito!', 'success');

    // Cambiar a la pestaña de vídeos y subpestaña sueltos
    const tabVideosBtn = document.querySelector('[data-tab="tab-videos"]');
    if (tabVideosBtn) tabVideosBtn.click();
    switchGestorSubtab('sueltos');

  } catch (err) {
    alert('Error al analizar el vídeo: ' + err.message);
  } finally {
    setLoading(false);
  }
}

// Regenerar Meta-Análisis (Síntesis y Duelo de Tesis con Recency Decay)
async function handleRegenerateMetaAnalysis() {
  const selectedVideos = state.videos.filter(v => v.incluidoEnSintesis !== false);
  if (selectedVideos.length === 0) {
    alert('No hay vídeos seleccionados para el Meta-Análisis. Marca al menos 1 o 2 vídeos.');
    return;
  }

  setLoading(true, 'Generando Meta-Análisis y Duelo de Tesis con IA...', `Sintetizando visiones cruzadas de ${selectedVideos.length} vídeos con ponderación temporal`);

  try {
    // Segmentar vídeos por Tiers de antigüedad para ponderación temporal estricta
    const tier1Videos = selectedVideos.filter(v => v.recencyTier === 'tier1' || (v.diasAntiguedad != null && v.diasAntiguedad <= 15));
    const tier2Videos = selectedVideos.filter(v => v.recencyTier === 'tier2' || (v.diasAntiguedad != null && v.diasAntiguedad > 15 && v.diasAntiguedad <= 45));
    const tier3Videos = selectedVideos.filter(v => (v.recencyTier === 'tier3' || (v.diasAntiguedad != null && v.diasAntiguedad > 45 && v.diasAntiguedad <= 90)) && v.tipo === 'canal');
    const sueltosActivos = selectedVideos.filter(v => v.tipo !== 'canal' && !tier1Videos.includes(v) && !tier2Videos.includes(v));

    let contextParts = [];

    if (tier1Videos.length > 0) {
      contextParts.push(`=== 🔥 TIER 1: VÍDEOS DE LOS ÚLTIMOS 15 DÍAS (MÁXIMA PRIORIDAD Y SESGO ACTUAL) ===`);
      tier1Videos.forEach((v, i) => {
        contextParts.push(`[TIER 1 - #${i + 1}] Analista: ${v.author || v.channel} | Fecha: ${v.fecha} (hace ${v.diasAntiguedad || 0}d)
Título: ${v.title}
Tesis / Análisis: ${v.resumen_estructurado?.tesis_macro || v.resumen || v.consulta || ''}
Activos: ${JSON.stringify(v.resumen_estructurado?.matriz_activos || {})}`);
      });
    }

    if (tier2Videos.length > 0) {
      contextParts.push(`\n=== ⚡ TIER 2: VÍDEOS DE 16 A 45 DÍAS (TENDENCIA INTERMEDIA Y DESARROLLO) ===`);
      tier2Videos.forEach((v, i) => {
        contextParts.push(`[TIER 2 - #${i + 1}] Analista: ${v.author || v.channel} | Fecha: ${v.fecha} (hace ${v.diasAntiguedad || 0}d)
Título: ${v.title}
Tesis / Análisis: ${v.resumen_estructurado?.tesis_macro || v.resumen || v.consulta || ''}`);
      });
    }

    if (tier3Videos.length > 0) {
      contextParts.push(`\n=== 🕰️ TIER 3: VÍDEOS DE 46 A 90 DÍAS (FONDO ESTRUCTURAL HISTÓRICO - MÍNIMO PESO) ===`);
      tier3Videos.forEach((v, i) => {
        contextParts.push(`[TIER 3 - #${i + 1}] Analista: ${v.author || v.channel} | Fecha: ${v.fecha} (hace ${v.diasAntiguedad || 0}d)
Título: ${v.title}
Tesis / Análisis: ${v.resumen_estructurado?.tesis_macro || v.resumen || v.consulta || ''}`);
      });
    }

    if (sueltosActivos.length > 0) {
      contextParts.push(`\n=== 🎯 VÍDEOS SUELTOS Y CONSULTAS PARTICULARES ACTIVAS ===`);
      sueltosActivos.forEach((v, i) => {
        contextParts.push(`[VÍDEO SUELTO - #${i + 1}] Analista: ${v.author || v.channel} | Fecha: ${v.fecha}
Título: ${v.title}
Consulta usuario: ${v.consulta || ''}
Tesis / Análisis: ${v.resumen_estructurado?.tesis_macro || v.resumen || ''}`);
      });
    }

    const videosContext = contextParts.join('\n---\n');

    const systemPrompt = `Eres un Chief Investment Officer (CIO) y estratega macroeconómico institucional de alto nivel.
Analizas los vídeos seleccionados de analistas financieros clave (José Luis Cava, Juan Ramón Rallo, Jon Economist, etc.) correspondientes a una ventana estricta de los ÚLTIMOS 3 MESES.

CRITERIOS RIGUROSOS DE PONDERACIÓN TEMPORAL (DECAY):
1. TIER 1 (Últimos 15 días) TIENE PRIORIDAD ABSOLUTA: Las opiniones más recientes son las que determinan el sesgo actual de mercado. Si un analista cambió de visión recientemente respecto a hace 1 o 2 meses, su postura de los últimos 15 días PREVALECE e INVALIDA la anterior.
2. TIER 2 (16 a 45 días) sirve para validar la confirmación o maduración de tendencias.
3. TIER 3 (46 a 90 días) sirve únicamente como contexto estructural de fondo. En ningún caso debe contradecir el pulso de los últimos 15 días.
4. Ignora cualquier contenido puramente de política partidista, sociedad o entretenimiento para no enturbiar el análisis económico y de mercado.

Tu labor es sintetizar el consenso real de mercado, contrastar posturas y aislar los "Duelos de Tesis" donde chocan frontalmente sus predicciones más actuales.
Devuelve SIEMPRE tu respuesta en formato JSON dentro de un bloque markdown \`\`\`json con texto en perfecto español.`;

    const userPrompt = `
SINTETIZA Y CONTRASTA LAS TESIS DE LOS SIGUIENTES VÍDEOS ACTIVOS (${selectedVideos.length} vídeos en total):
${videosContext}

Devuelve un JSON con este formato exacto:
\`\`\`json
{
  "titulo": "Titular institucional que resuma el pulso macro actual ponderado por la máxima actualidad",
  "resumen_ejecutivo": "Párrafo de 3-4 líneas resumiendo el estado del ciclo, inflación, política monetaria y riesgo geopolítico actual",
  "consenso_macro": "Puntos clave donde TODOS o la gran mayoría de analistas coinciden en sus análisis más recientes",
  "duelo_tesis": [
    {
      "titulo": "Tema de la discrepancia (ej: 'S&P 500: ¿Corrección puntual vs Caída > 50%?')",
      "analistaA": "Nombre del Analista A",
      "posturaA": "Postura A resumida en 3-5 palabras",
      "argumentosA": "Argumentos y datos clave que utiliza el Analista A",
      "analistaB": "Nombre del Analista B",
      "posturaB": "Postura B resumida en 3-5 palabras",
      "argumentosB": "Argumentos y datos clave que utiliza el Analista B"
    }
  ],
  "matriz_activos": [
    {
      "activo": "Oro / Metales Preciosos",
      "sesgo": "Bullish / Bearish / Neutral",
      "consenso_pct": 100,
      "detalle": "Explicación condensada de la postura agregada"
    },
    {
      "activo": "Energía / Petróleo",
      "sesgo": "Bullish / Bearish / Neutral",
      "consenso_pct": 80,
      "detalle": "Explicación"
    },
    {
      "activo": "Renta Variable (S&P 500 / Nasdaq)",
      "sesgo": "Bullish / Bearish / Neutral",
      "consenso_pct": 50,
      "detalle": "Explicación"
    },
    {
      "activo": "Renta Fija / Bonos",
      "sesgo": "Bullish / Bearish / Neutral",
      "consenso_pct": 30,
      "detalle": "Explicación"
    },
    {
      "activo": "Bitcoin / Cripto",
      "sesgo": "Bullish / Bearish / Neutral",
      "consenso_pct": 70,
      "detalle": "Explicación"
    },
    {
      "activo": "Dólar DXY",
      "sesgo": "Bullish / Bearish / Neutral",
      "consenso_pct": 40,
      "detalle": "Explicación"
    }
  ]
}
\`\`\`
`;

    const metaResult = await callGeminiApi(userPrompt, systemPrompt, true);

    state.meta_analisis = {
      ...metaResult,
      fecha: new Date().toLocaleString('es-ES'),
      videos_incluidos: selectedVideos.map(v => v.id)
    };

    renderMetaTab();
    updateBadges();
    await persistData(true);
    showToast('¡Meta-Análisis y Duelos de Tesis actualizados con éxito con ponderación temporal!', 'success');

  } catch (err) {
    alert('Error al generar Meta-Análisis: ' + err.message);
  } finally {
    setLoading(false);
  }
}

// ==========================================
// MODAL DE SELECCIÓN DE VÍDEOS EN SÍNTESIS
// ==========================================
function openIncludedVideosModal() {
  const modal = document.getElementById('modalIncludedVideos');
  const list = document.getElementById('modalVideosList');
  if (!modal || !list) return;

  list.innerHTML = state.videos.map(v => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0; border-bottom: 1px solid var(--border-color);">
      <div style="max-width: 80%;">
        <strong style="font-size: 0.85rem; color: var(--text-primary); display: block;">${escapeHtml(v.title)}</strong>
        <span style="font-size: 0.75rem; color: var(--text-secondary);">👤 ${escapeHtml(v.author || v.channel)} · 📅 ${escapeHtml(v.fecha || '')}</span>
      </div>
      <input type="checkbox" class="modal-video-check" data-id="${v.id}" ${v.incluidoEnSintesis !== false ? 'checked' : ''} style="transform: scale(1.2);">
    </div>
  `).join('');

  modal.classList.add('active');
}

function closeIncludedVideosModal() {
  const modal = document.getElementById('modalIncludedVideos');
  if (modal) modal.classList.remove('active');
}

function saveIncludedVideosFromModal() {
  const checks = document.querySelectorAll('.modal-video-check');
  checks.forEach(chk => {
    const id = chk.getAttribute('data-id');
    const v = state.videos.find(x => x.id === id);
    if (v) v.incluidoEnSintesis = chk.checked;
  });

  closeIncludedVideosModal();
  renderAll();
  persistData(true);
  showToast('Selección de vídeos guardada', 'success');
}

// ==========================================
// EVENT LISTENERS & UTILIDADES
// ==========================================
function initEventListeners() {
  const formAdd = document.getElementById('formAddVideo');
  if (formAdd) formAdd.addEventListener('submit', handleAddVideo);

  const btnRegen = document.getElementById('btnRegenerateMeta');
  if (btnRegen) btnRegen.addEventListener('click', handleRegenerateMetaAnalysis);

  const btnManage = document.getElementById('btnManageIncludedVideos');
  if (btnManage) btnManage.addEventListener('click', openIncludedVideosModal);

  const btnCloseModal = document.getElementById('btnCloseModalIncluded');
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeIncludedVideosModal);

  const btnSaveModal = document.getElementById('btnSaveIncludedVideos');
  if (btnSaveModal) btnSaveModal.addEventListener('click', saveIncludedVideosFromModal);

  const btnToggleAll = document.getElementById('btnToggleAllVideos');
  if (btnToggleAll) {
    btnToggleAll.addEventListener('click', () => {
      const checks = document.querySelectorAll('.modal-video-check');
      const allChecked = Array.from(checks).every(c => c.checked);
      checks.forEach(c => c.checked = !allChecked);
      btnToggleAll.textContent = allChecked ? 'Seleccionar Todos' : 'Deseleccionar Todos';
    });
  }

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.filters.search = e.target.value;
      renderVideosTab();
    });
  }

  const tagFilter = document.getElementById('tagFilter');
  if (tagFilter) {
    tagFilter.addEventListener('change', (e) => {
      state.filters.tag = e.target.value;
      renderVideosTab();
    });
  }

  const authorFilter = document.getElementById('authorFilter');
  if (authorFilter) {
    authorFilter.addEventListener('change', (e) => {
      state.filters.author = e.target.value;
      renderVideosTab();
    });
  }

  const btnSaveSettings = document.getElementById('btnSaveSettings');
  if (btnSaveSettings) btnSaveSettings.addEventListener('click', saveConfigToStorage);

  const btnTestGemini = document.getElementById('btnTestGemini');
  if (btnTestGemini) {
    btnTestGemini.addEventListener('click', async () => {
      saveConfigToStorage();
      setLoading(true, 'Probando conexión con Gemini...', 'Enviando saludo de prueba');
      try {
        const testRes = await callGeminiApi('Devuelve un bloque json: ```json\n{"status": "ok", "message": "Conexión exitosa con Gemini"}\n```');
        alert(`✅ ¡Conexión con Gemini exitosa!\nMensaje: ${testRes.message || JSON.stringify(testRes)}`);
      } catch (e) {
        alert('❌ Error al conectar con Gemini: ' + e.message);
      } finally {
        setLoading(false);
      }
    });
  }

  const btnSyncNow = document.getElementById('btnSyncNow');
  if (btnSyncNow) btnSyncNow.addEventListener('click', () => syncWithGitHub('pull'));

  const btnForcePull = document.getElementById('btnForcePull');
  if (btnForcePull) btnForcePull.addEventListener('click', () => syncWithGitHub('pull'));

  const btnForcePush = document.getElementById('btnForcePush');
  if (btnForcePush) btnForcePush.addEventListener('click', () => syncWithGitHub('push'));

  const btnExport = document.getElementById('btnExportJson');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        config: state.config,
        canales: state.canales,
        meta_analisis: state.meta_analisis,
        videos: state.videos
      }, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `MacroConsensus_Backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }

  const inputImport = document.getElementById('inputImportJson');
  if (inputImport) {
    inputImport.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (imported.canales) state.canales = imported.canales;
          if (imported.videos) state.videos = imported.videos;
          if (imported.meta_analisis) state.meta_analisis = imported.meta_analisis;
          renderAll();
          await persistData(true);
          showToast('Datos importados y respaldados correctamente', 'success');
        } catch (err) {
          alert('Error al leer el archivo JSON: ' + err.message);
        }
      };
      reader.readAsText(file);
    });
  }
}

// Helpers
function extractVideoId(url) {
  if (!url) return null;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str || '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function setLoading(active, text = 'Cargando...', subtext = '') {
  const overlay = document.getElementById('loadingOverlay');
  const elText = document.getElementById('loadingText');
  const elSubtext = document.getElementById('loadingSubtext');
  if (!overlay) return;

  if (active) {
    if (elText) elText.textContent = text;
    if (elSubtext) elSubtext.textContent = subtext;
    overlay.classList.add('active');
  } else {
    overlay.classList.remove('active');
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '⚠️';

  toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
