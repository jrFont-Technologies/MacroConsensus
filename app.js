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
    autoSync: true
  },
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
  loadConfigFromStorage();
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

// ==========================================
// GESTIÓN DE CONFIGURACIÓN & STORAGE
// ==========================================
function loadConfigFromStorage() {
  const savedKey = localStorage.getItem('macro_gemini_api_key');
  if (savedKey) state.config.geminiApiKey = savedKey;

  const savedModel = localStorage.getItem('macro_gemini_model');
  if (savedModel) state.config.geminiModel = savedModel;

  const savedRepo = localStorage.getItem('macro_github_repo');
  if (savedRepo) state.config.githubRepo = savedRepo;

  const savedToken = localStorage.getItem('macro_github_token');
  if (savedToken) state.config.githubToken = savedToken;

  // Actualizar campos de la pestaña de configuración
  const elKey = document.getElementById('settingApiKey');
  const elModel = document.getElementById('settingModel');
  const elRepo = document.getElementById('settingGithubRepo');
  const elToken = document.getElementById('settingGithubToken');

  if (elKey) elKey.value = state.config.geminiApiKey;
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
    state.config.geminiApiKey = elKey.value.trim();
    localStorage.setItem('macro_gemini_api_key', state.config.geminiApiKey);
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
      lastSync: new Date().toISOString()
    },
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

  const statusBadge = document.getElementById('githubStatusBadge');
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

        if (remoteData.videos && remoteData.videos.length > 0) {
          state.videos = remoteData.videos;
          state.meta_analisis = remoteData.meta_analisis || state.meta_analisis;
          renderAll();
        }
        if (syncDot) syncDot.className = 'status-dot';
        if (syncText) syncText.textContent = 'En línea';
      } else if (res.status === 404) {
        // Archivo no existe aún en el repo, haremos push al primer cambio
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
          lastSync: new Date().toISOString()
        },
        meta_analisis: state.meta_analisis,
        videos: state.videos
      };

      // Obtener SHA actual si no lo tenemos
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

  const metaCountBadge = document.getElementById('metaCountBadge');
  const videosCountBadge = document.getElementById('videosCountBadge');
  const includedVideosCount = document.getElementById('includedVideosCount');
  const totalVideosCountMeta = document.getElementById('totalVideosCountMeta');

  if (metaCountBadge) metaCountBadge.textContent = includedVideos;
  if (videosCountBadge) videosCountBadge.textContent = totalVideos;
  if (includedVideosCount) includedVideosCount.textContent = includedVideos;
  if (totalVideosCountMeta) totalVideosCountMeta.textContent = totalVideos;
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
// RENDER PESTAÑA 2: VÍDEOS & BIBLIOTECA
// ==========================================
function renderVideosTab() {
  populateFilters();

  const grid = document.getElementById('videosGrid');
  if (!grid) return;

  // Filtrado
  const query = state.filters.search.toLowerCase();
  const selectedTag = state.filters.tag;
  const selectedAuthor = state.filters.author;

  const filteredVideos = state.videos.filter(v => {
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
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No se encontraron vídeos con los filtros seleccionados.</p>
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
        <!-- Thumbnail y autor -->
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

          <!-- Consulta del vídeo (Tus condiciones destacadas) -->
          <div class="user-query-box">
            <strong>🎯 Tu Consulta del Vídeo:</strong>
            ${escapeHtml(video.consulta || 'Sin consulta previa')}
          </div>

          <!-- Tags -->
          <div class="tags-list">
            ${(video.tags || []).map(t => `<span class="tag-badge" onclick="filterByTag('${escapeHtml(t)}')">#${escapeHtml(t)}</span>`).join('')}
          </div>

          <!-- Acordeón con Resumen de 4 Bloques -->
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

        <!-- Acciones del pie -->
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

  if (tagSelect) {
    const currentVal = tagSelect.value;
    const allTags = new Set();
    state.videos.forEach(v => (v.tags || []).forEach(t => allTags.add(t)));
    tagSelect.innerHTML = `<option value="">Todas las etiquetas (${allTags.size})</option>` +
      Array.from(allTags).sort().map(t => `<option value="${escapeHtml(t)}" ${t === currentVal ? 'selected' : ''}>#${escapeHtml(t)}</option>`).join('');
  }

  if (authorSelect) {
    const currentVal = authorSelect.value;
    const allAuthors = new Set();
    state.videos.forEach(v => {
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
// PROCESAMIENTO CON GEMINI 3.8 FLASH
// ==========================================
async function callGeminiApi(prompt, systemPrompt = '', returnJson = true) {
  const apiKey = state.config.geminiApiKey;
  if (!apiKey) {
    throw new Error('Por favor, introduce tu clave de API de Google Gemini en la pestaña de Configuración.');
  }

  const model = state.config.geminiModel || 'gemini-3.8-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const bodyData = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2
    }
  };

  if (systemPrompt) {
    bodyData.systemInstruction = { parts: [{ text: systemPrompt }] };
  }

  if (returnJson) {
    bodyData.generationConfig.responseMimeType = "application/json";
  }

  let res;
  try {
    // 1. Intento directo desde cliente
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    });
  } catch (corsErr) {
    // 2. Fallback a servidor local /api/gemini si CORS falla
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
      // Intentar limpiar bloques markdown tipo ```json
      const cleaned = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    }
  }

  return textOutput;
}

// Ingesta de nuevo vídeo
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
    // 1. Extraer transcripción y datos del vídeo mediante el endpoint
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

    // Si no pudimos obtener transcripción automática, pedimos al usuario
    if (!transcript) {
      setLoading(false);
      const manual = prompt('No se detectaron subtítulos automáticos en este vídeo. Pega aquí el resumen o transcripción manual para que Gemini 3.8 Flash lo analice:', '');
      if (!manual) return;
      transcript = manual;
      setLoading(true, 'Analizando contenido con Gemini 3.8 Flash...', 'Enfocando en tu consulta personalizada');
    } else {
      setLoading(true, 'Procesando con Gemini 3.8 Flash...', `Analizando transcripción (${extractData.lineCount || 'múltiples'} líneas)`);
    }

    // 2. Prompt a Gemini 3.8 Flash
    const systemPrompt = `Eres un estratega macroeconómico institucional de élite. Analizas transcripciones de analistas financieros y respondes en perfecto español.
Tu máxima prioridad es responder a la "Consulta y condiciones del usuario". Sé incisivo, técnico, objetivo y destaca los matices reales.
Devuelve SIEMPRE tu respuesta en formato JSON válido según la estructura requerida.`;

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

Devuelve un objeto JSON con este formato exacto:
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
`;

    const aiRes = await callGeminiApi(userPrompt, systemPrompt, true);

    const newVideo = {
      id: 'vid_' + Date.now(),
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

    // Agregar a la lista al principio
    state.videos.unshift(newVideo);
    renderAll();
    await persistData(true);

    // Limpiar formulario y dar feedback
    urlInput.value = '';
    consultaInput.value = '';
    showToast('¡Vídeo analizado y añadido a la biblioteca con éxito!', 'success');

    // Cambiar a la vista de vídeos
    const tabVideosBtn = document.querySelector('[data-tab="tab-videos"]');
    if (tabVideosBtn) tabVideosBtn.click();

  } catch (err) {
    alert('Error al analizar el vídeo: ' + err.message);
  } finally {
    setLoading(false);
  }
}

// Regenerar Meta-Análisis (Síntesis y Duelo de Tesis)
async function handleRegenerateMetaAnalysis() {
  const selectedVideos = state.videos.filter(v => v.incluidoEnSintesis !== false);
  if (selectedVideos.length === 0) {
    alert('No hay vídeos seleccionados para el Meta-Análisis. Marca al menos 1 o 2 vídeos.');
    return;
  }

  setLoading(true, 'Generando Meta-Análisis y Duelo de Tesis con Gemini 3.8 Flash...', `Sintetizando visiones cruzadas de ${selectedVideos.length} vídeos`);

  try {
    const videosContext = selectedVideos.map((v, i) => `
VÍDEO #${i + 1}:
- Analista: ${v.author || v.channel}
- Título: ${v.title}
- Fecha: ${v.fecha}
- Consulta del usuario: ${v.consulta}
- Tesis macro: ${v.resumen_estructurado?.tesis_macro || ''}
- Respuesta a consulta: ${v.resumen_estructurado?.respuesta_consulta || ''}
- Activos: ${JSON.stringify(v.resumen_estructurado?.matriz_activos || {})}
`).join('\n---\n');

    const systemPrompt = `Eres un Chief Investment Officer (CIO) y estratega macroeconómico institucional. 
Tu labor es contrastar las tesis de varios analistas financieros independientes, identificar el consenso real del mercado y aislar los "Duelos de Tesis / Puntos de Fricción" donde chocan frontalmente sus predicciones.
Devuelve SIEMPRE un JSON válido en perfecto español.`;

    const userPrompt = `
SINTETIZA Y CONTRASTA LAS TESIS DE LOS SIGUIENTES ${selectedVideos.length} VÍDEOS:
${videosContext}

Devuelve un JSON con este formato exacto:
{
  "titulo": "Titular institucional que resuma el pulso general del mercado",
  "resumen_ejecutivo": "Párrafo de 3-4 líneas resumiendo el estado del ciclo, inflación, política monetaria y riesgo geopolítico",
  "consenso_macro": "Puntos clave donde TODOS o la gran mayoría de analistas coinciden de manera inequívoca",
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
    showToast('¡Meta-Análisis y Duelos de Tesis actualizados con éxito!', 'success');

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
  // Formulario de añadir vídeo
  const formAdd = document.getElementById('formAddVideo');
  if (formAdd) formAdd.addEventListener('submit', handleAddVideo);

  // Botón regenerar Meta-Análisis
  const btnRegen = document.getElementById('btnRegenerateMeta');
  if (btnRegen) btnRegen.addEventListener('click', handleRegenerateMetaAnalysis);

  // Botón modal vídeos incluidos
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

  // Búsqueda y filtros
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

  // Configuración
  const btnSaveSettings = document.getElementById('btnSaveSettings');
  if (btnSaveSettings) btnSaveSettings.addEventListener('click', saveConfigToStorage);

  const btnTestGemini = document.getElementById('btnTestGemini');
  if (btnTestGemini) {
    btnTestGemini.addEventListener('click', async () => {
      saveConfigToStorage();
      setLoading(true, 'Probando conexión con Gemini 3.8 Flash...', 'Enviando saludo de prueba');
      try {
        const testRes = await callGeminiApi('Devuelve {"status": "ok", "message": "Conexión exitosa con Gemini 3.8 Flash"}');
        alert(`✅ ¡Conexión con Gemini exitosa!\nMensaje: ${testRes.message || JSON.stringify(testRes)}`);
      } catch (e) {
        alert('❌ Error al conectar con Gemini: ' + e.message);
      } finally {
        setLoading(false);
      }
    });
  }

  // Botones de sincronización manual
  const btnSyncNow = document.getElementById('btnSyncNow');
  if (btnSyncNow) btnSyncNow.addEventListener('click', () => syncWithGitHub('pull'));

  const btnForcePull = document.getElementById('btnForcePull');
  if (btnForcePull) btnForcePull.addEventListener('click', () => syncWithGitHub('pull'));

  const btnForcePush = document.getElementById('btnForcePush');
  if (btnForcePush) btnForcePush.addEventListener('click', () => syncWithGitHub('push'));

  // Exportar / Importar
  const btnExport = document.getElementById('btnExportJson');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        config: state.config,
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
