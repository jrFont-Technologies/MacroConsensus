/**
 * MacroConsensus - Inteligencia Macro y Meta-Análisis de Expertos
 * Frontend interactivo y sincronización en la nube
 */

// Prompt Maestro por defecto (Estructura operativa de 4 puntos + Few-Shot con tus 3 ejemplos reales)
const DEFAULT_MASTER_PROMPT = `Actúa como un analista y operador de mercados que toma apuntes personales ultra-directos de vídeos financieros. Tu objetivo es resumir la transcripción exactamente con mi estilo, mi concisión y mi estructura.

REGLAS DE ORO DE FILTRADO:
1. CERO RELLENO Y CERO PUBLICIDAD: Ignora al 100% los saludos iniciales, comentarios del tiempo, bromas, promoción de libros/cursos/servicios (ej. HOPLA) y cualquier mención a brokers patrocinadores (ej. Freedom24, Quantfury) o a los ETFs/productos comerciales que el autor mencione solo como parte del anuncio del patrocinador. Quédate únicamente con el análisis puro del índice o activo subyacente (ej. el VIX, el SP500, el bono, el petróleo).
2. CAUSA -> EFECTO EN FRASES CORTAS: Explica siempre los hechos conectando la causa con la consecuencia en 1 o 2 frases directas por idea, sin adornos literarios.
3. CONSERVA DATOS TÉCNICOS, MECÁNICA Y NIVELES EXACTOS: Incluye siempre fechas concretas del gráfico (ej. días 17, 20 y 24), niveles y rangos numéricos exactos (ej. 7740 o zona 7850-8000 en SP500, 16-20 en VIX), plazos temporales (ej. 3ª semana de octubre, 3 de noviembre, agosto-septiembre) y la mecánica interna si se explica (opciones Call/Put, cobertura de futuros por delta de los creadores de mercado, recompra de deuda a largo plazo del Tesoro/Bessent, déficit/PIB, rebajas de rating).

ESTRUCTURA OBLIGATORIA DEL RESUMEN:
- Como se ve el mercado / los hechos:
Expón los hechos objetivos que muestra el vídeo:
  * Qué ha hecho el precio en el gráfico en fechas concretas o hacia qué rango se dirige (ej. SP500 hacia 7850-8000).
  * Qué medidas o catalizadores concretos están en juego (ej. penalizar exportaciones de diésel de EE.UU. a Europa -> bajan precios del petróleo en EE.UU.).
  * Qué han descontado ya los mercados y qué muestran los flujos de opciones/futuros y el sentimiento (ej. compra masiva de CALLs de tecnología = institucionales sin miedo frente a miedo solo en particulares; venta de calls/compra de puts y cobertura delta de dealers).
  * Qué ocurre con la rentabilidad de los bonos, deuda/PIB, déficits y calificaciones crediticias.

- Como reaccionar:
Indica de forma directa qué comprar o vender y en qué nivel exacto (ej. "Comprar futuros si el SP500 supera la zona de los 7740"). Si el vídeo no da una orden de entrada concreta de corto plazo no patrocinada, déjalo vacío ("").

- ¿por que? / conclusión:
Explica la deducción lógica, el motor político/liquidez detrás del movimiento (ej. el tiempo que le queda a Trump antes de las mid-term, recompras de deuda pública a largo plazo de Bessent que estabilizan el mercado y fijan resistencias) y el escenario de cada activo mencionado de forma telegráfica (qué ha hecho, hacia dónde irá, hasta qué fecha exacta y por qué). Destaca cualquier "Fecha importante" del calendario (ej. elecciones del 3 de noviembre).

- Otros temas / maldades / predicción:
Recoge en puntos claros las "maldades", predicciones políticas/macro y temas estructurales tratados en el vídeo:
  * Mercados de predicción y política: resultado esperado en elecciones (ej. barrido demócrata en las mid-term -> bloqueo legislativo).
  * Tema presupuestario / monetario: mayor gasto y deuda pública -> mayor degradación monetaria; problemas fiscales de países (Francia, Reino Unido).
  * Tema sectorial / geopolítico (ej. Tema Inteligencia Artificial): control político y regulatorio sobre CEOs de IA, participaciones estatales en empresas, parálisis de inversión en centros de datos por precio de la energía, o emisión de deuda estatal para comprar acciones de IA si la bolsa cae +-10%.
  * Previsiones por activo, niveles de volatilidad (VIX 16-20), sectores interesantes (Salud, Energías limpias) y hoja de ruta estacional completa de la bolsa (ej. bajada agosto-septiembre -> subida hasta el 3 de noviembre -> caída después de noviembre).

---
EJEMPLOS EXACTOS DE CÓMO QUIERO QUE RESUMAS (IMITA ESTE ESTILO Y LONGITUD):

[EJEMPLO 1 - Vídeo de operativa y microestructura (zoUHJ6eB6IY)]:
- Como se ve el mercado / los hechos:
En el gráfico del SP500 cayó tras la noticia, se recuperó rápido el 17, 20 y 24; se concluye que hay una mano que evita la caída.
En el caso concreto del 24 se pudo ver grandes apuestas bajistas sobre el SP500, esto es, especuladores de corto plazo vendiendo opciones call y comprando opciones put y los creadores de mercado estaban vendiendo futuros para cubrirse, ajustándolo por la delta. El escenario fue claramente bajista pero no bajó el SP500.
- Como reaccionar:
Comprar futuros si el SP500 supera la zona de los 7740.
- ¿por que? / conclusión:
Al ver un mercado bajista y no bajar se concluye que alguien compra siempre y evita que caiga la bolsa; además en cuanto apareció la noticia positiva el precio subió, se entiende que van a seguir apareciendo noticias positivas desde ahora hasta octubre.
Fecha importante: 3 de noviembre elecciones, las bolsas subirán hasta el 3 de noviembre y después bajarán.
- Otros temas / maldades / predicción:
Francia tiene problemas económicos.

[EJEMPLO 2 - Vídeo macro y multi-activo (6avY-2ixQI0)]:
- Como se ve el mercado / los hechos:
Debido a la irresponsabilidad fiscal de los políticos se produce degradación monetaria garantizada, lo que a su vez significa que el oro tendrá tendencia alcista.
Rentabilidad del bono francés a 10 años sube a consecuencia del déficit público creciente, ratio deuda pública - PIB incrementándose y le han rebajado la calificación crediticia.
Rentabilidad del bono del Reino Unido a 10 años en clara tendencia alcista por las mismas razones que Francia.
- ¿por que? / conclusión:
El Oro ha hecho suelo y subirá hasta la tercera semana de octubre.
Bitcoin ha hecho un suelo cíclico y va a subir desde ahora hasta el 3 de noviembre más que el oro.
SP500 subirá por motivaciones políticas de Trump.
Petróleo bajará también por motivaciones políticas de Trump.
- Otros temas / maldades / predicción:
Bessent y Kevin Warsh fueron gestores de fondos, y a partir del 3 de noviembre habrá un susto / bajada de la bolsa. La volatilidad del SP500 (VIX) ha estado muy comprimida, hay una zona de resistencia sobre 16 - 20. Si el índice superara los 20, las bolsas caerían.
A partir del 3 de Noviembre se espera una caída en bolsa y los próximos sectores interesantes son Salud y Energías limpias.

[EJEMPLO 3 - Vídeo de posicionamiento, política y temas estructurales (rOKQ00NlYfo)]:
- Como se ve el mercado / los hechos:
Trump podría penalizar las exportaciones de Diesel desde EE.UU. hacia Europa y como consecuencia bajarían los precios del petróleo para los EE.UU.
Se entiende que los mercados han descontado que Trump va a perder las mid-term y que la cotización del SP500 puede dirigirse a la zona comprendida entre 7850 y 8000.
Se ha comprado muchas opciones CALL de tecnología por lo que no tienen que tener mucho miedo, solo los inversores particulares tienen miedo. Por tanto los mercados no han descontado nada malo.
- ¿por que? / conclusión:
A Trump le queda 1 mes para arreglar la economía e intentar ganar las elecciones de mid-term. Bessent ya comenzó la recompra de deuda pública a largo plazo y ha conseguido la estabilización de los mercados y ha dejado claro dónde está la resistencia. Petróleo también ha bajado.
- Otros temas / maldades / predicción:
Según los mercados de predicción va a haber un barrido demócrata en las próximas elecciones de medio mandato.
Las elecciones de medio término las van a ganar los demócratas y como consecuencia se va a producir un bloqueo legislativo.
Tema presupuestario: mayor gasto público y deuda pública y como consecuencia mayor degradación monetaria.
Tema Inteligencia Artificial: Los señores de la IA (los CEO de las principales empresas de IA) ya han aceptado que van a ser controlados por los políticos a través de las regulaciones y de participaciones en las empresas. Se van a paralizar las inversiones en centros de datos debido al precio de la energía.
Tendencia bajista a corto plazo del petróleo podría continuar, menor demanda.
La rentabilidad de los bonos puede caer.
Caída de las bolsas +- 10%, el estado de los EE.UU. creará más deuda para comprar las acciones de las empresas de IA.
La previsión era bajada de la bolsa entre agosto-septiembre y luego subidas hasta el 3 de noviembre, y después de noviembre una caída.`;

// Estado Global
const state = {
  config: {
    geminiApiKey: '',
    geminiModel: 'gemini-3.8-flash',
    masterPrompt: DEFAULT_MASTER_PROMPT,
    githubRepo: 'jrFont-Technologies/MacroConsensus',
    githubToken: '',
    autoSync: true,
    ytScanIntervalMinutes: 30,
    lastYoutubeScan: null,
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
  isScanningYoutube: false,
  githubFileSha: null
};

let ytAutoScanTimer = null;

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
  initTabs();
  initEventListeners();
  await loadConfigFromStorage();
  await loadInitialData();
  syncPromptInputsUI();
  recalculateVideosRecency();
  renderAll();
  updateYtSyncBadge();

  // Sincronización periódica con GitHub si está configurado
  if (state.config.autoSync) {
    setInterval(() => syncWithGitHub('pull'), 60000);
  }

  // Configurar rastreo automático de nuevos vídeos en YouTube
  setupYoutubeAutoScan();
  setInterval(updateYtSyncBadge, 30000);

  window.addEventListener('focus', () => {
    if (state.config.autoSync) syncWithGitHub('pull');
    checkAndTriggerAutoYoutubeScan();
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

function getEffectiveMasterPrompt() {
  return (state.config.masterPrompt && state.config.masterPrompt.trim())
    ? state.config.masterPrompt.trim()
    : DEFAULT_MASTER_PROMPT;
}

function syncPromptInputsUI() {
  const promptText = getEffectiveMasterPrompt();
  const elSettingPrompt = document.getElementById('settingMasterPrompt');
  const elQuickPrompt = document.getElementById('quickMasterPromptTextarea');
  const elModalPrompt = document.getElementById('editModalMasterPrompt');

  if (elSettingPrompt) elSettingPrompt.value = promptText;
  if (elQuickPrompt) elQuickPrompt.value = promptText;
  if (elModalPrompt) elModalPrompt.value = promptText;
}

window.togglePromptPanel = function() {
  const panel = document.getElementById('quickPromptPanel');
  if (!panel) return;
  syncPromptInputsUI();
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
};

window.saveMasterPromptFromQuickPanel = async function() {
  const elQuickPrompt = document.getElementById('quickMasterPromptTextarea');
  if (elQuickPrompt && elQuickPrompt.value.trim()) {
    state.config.masterPrompt = elQuickPrompt.value.trim();
    localStorage.setItem('macro_master_prompt', state.config.masterPrompt);
    syncPromptInputsUI();
    await persistData(true);
    showToast('✅ Prompt Maestro guardado. Pulsa "🔄 Actualizar Resumen IA" en cualquier vídeo para aplicarlo.', 'success');
  }
};

window.restoreDefaultMasterPrompt = async function() {
  state.config.masterPrompt = DEFAULT_MASTER_PROMPT;
  localStorage.setItem('macro_master_prompt', DEFAULT_MASTER_PROMPT);
  syncPromptInputsUI();
  await persistData(true);
  showToast('↩️ Restaurado el Prompt Maestro original', 'info');
};

window.restoreDefaultMasterPromptInModal = function() {
  state.config.masterPrompt = DEFAULT_MASTER_PROMPT;
  localStorage.setItem('macro_master_prompt', DEFAULT_MASTER_PROMPT);
  syncPromptInputsUI();
  showToast('↩️ Prompt original cargado en el editor. Pulsa "Actualizar y Generar Resumen" para aplicarlo.', 'info');
};

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

  const savedPrompt = localStorage.getItem('macro_master_prompt');
  if (savedPrompt && savedPrompt.trim() && savedPrompt.includes('[EJEMPLO 3')) {
    state.config.masterPrompt = savedPrompt.trim();
  } else {
    state.config.masterPrompt = DEFAULT_MASTER_PROMPT;
    localStorage.setItem('macro_master_prompt', DEFAULT_MASTER_PROMPT);
  }

  const savedRepo = localStorage.getItem('macro_github_repo');
  if (savedRepo) state.config.githubRepo = savedRepo;

  const savedToken = localStorage.getItem('macro_github_token');
  if (savedToken) state.config.githubToken = savedToken;

  const savedYtInterval = localStorage.getItem('macro_yt_scan_interval');
  if (savedYtInterval !== null && savedYtInterval !== '') {
    state.config.ytScanIntervalMinutes = parseInt(savedYtInterval, 10);
  }

  const savedLastYtScan = localStorage.getItem('macro_last_yt_scan');
  if (savedLastYtScan) {
    state.config.lastYoutubeScan = savedLastYtScan;
  }

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
  const elYtInterval = document.getElementById('settingYtInterval');

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
  if (elYtInterval) elYtInterval.value = String(state.config.ytScanIntervalMinutes ?? 30);
  syncPromptInputsUI();
}

function saveConfigToStorage() {
  const elKey = document.getElementById('settingApiKey');
  const elModel = document.getElementById('settingModel');
  const elPrompt = document.getElementById('settingMasterPrompt');
  const elRepo = document.getElementById('settingGithubRepo');
  const elToken = document.getElementById('settingGithubToken');
  const elYtInterval = document.getElementById('settingYtInterval');

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
    }
  }
  if (elModel) {
    state.config.geminiModel = elModel.value;
    localStorage.setItem('macro_gemini_model', state.config.geminiModel);
  }
  if (elPrompt && elPrompt.value.trim()) {
    state.config.masterPrompt = elPrompt.value.trim();
    localStorage.setItem('macro_master_prompt', state.config.masterPrompt);
    syncPromptInputsUI();
  }
  if (elRepo) {
    state.config.githubRepo = elRepo.value.trim();
    localStorage.setItem('macro_github_repo', state.config.githubRepo);
  }
  if (elToken) {
    state.config.githubToken = elToken.value.trim();
    localStorage.setItem('macro_github_token', state.config.githubToken);
  }
  if (elYtInterval) {
    state.config.ytScanIntervalMinutes = parseInt(elYtInterval.value, 10) || 0;
    localStorage.setItem('macro_yt_scan_interval', String(state.config.ytScanIntervalMinutes));
    setupYoutubeAutoScan();
    updateYtSyncBadge();
  }

  persistData(true);
  showToast('Configuración y Prompt Maestro guardados correctamente', 'success');
}

// Recalcular dinámicamente los días de antigüedad y el Tier de todos los vídeos
function recalculateVideosRecency() {
  const now = Date.now();
  state.videos.forEach(v => {
    let ts = v.dateTimestamp;
    if (!ts && v.fecha) {
      const parts = v.fecha.split('/');
      if (parts.length === 3) {
        const parsed = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10), 12, 0, 0).getTime();
        if (!isNaN(parsed)) ts = parsed;
      }
    }
    if (ts) {
      v.dateTimestamp = ts;
      const diffDays = Math.max(0, Math.floor((now - ts) / (1000 * 60 * 60 * 24)));
      v.diasAntiguedad = diffDays;
      if (diffDays <= 15) {
        v.recencyTier = 'tier1';
        v.recencyLabel = '🔥 Últimos 15 días (Máx. Ponderación)';
      } else if (diffDays <= 45) {
        v.recencyTier = 'tier2';
        v.recencyLabel = '⚡ 16-45 días (Tendencia)';
      } else {
        v.recencyTier = 'tier3';
        v.recencyLabel = '🕰️ 46-90 días (Estructural)';
      }
    }
  });

  // Mantener únicamente vídeos de canal dentro de la ventana de 90 días (3 meses) + todos los vídeos sueltos
  state.videos = state.videos.filter(v => v.tipo !== 'canal' || (v.diasAntiguedad ?? 0) <= 95);
}

// Cargar datos locales iniciales
async function loadInitialData() {
  try {
    const res = await fetch('datos.json?t=' + Date.now());
    if (res.ok) {
      const data = await res.json();
      state.canales = data.canales || [
        { id: 'cava', nombre: 'José Luis Cava', handle: '@JoseLuisCavatv', color: '#3b82f6', descripcion: 'Análisis técnico institucional, S&P 500, bono a 30 años, liquidez global y Bitcoin.' },
        { id: 'rallo', nombre: 'Juan Ramón Rallo', handle: '@juanrallo', color: '#10b981', descripcion: 'Macroeconomía, política monetaria (Fed / BCE), inflación, deuda y debasement trade.' },
        { id: 'jon', nombre: 'Jon Economist', handle: '@JonEconomist', color: '#f59e0b', descripcion: 'Ciclos de liquidez global, Reserva Federal, Bitcoin y macro-trading.' }
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
        if (!localStorage.getItem('macro_master_prompt') && data.config.masterPrompt) {
          state.config.masterPrompt = data.config.masterPrompt;
        }
        if (data.config.githubRepo) state.config.githubRepo = data.config.githubRepo;
        if (data.config.githubToken) state.config.githubToken = data.config.githubToken;
        if (!state.config.lastYoutubeScan && data.config.lastYoutubeScan) {
          state.config.lastYoutubeScan = data.config.lastYoutubeScan;
        }
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
      masterPrompt: state.config.masterPrompt,
      githubRepo: state.config.githubRepo,
      lastSync: new Date().toISOString(),
      lastYoutubeScan: state.config.lastYoutubeScan,
      ytScanIntervalMinutes: state.config.ytScanIntervalMinutes,
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
  if (state.isScanningYoutube && action === 'pull') return;
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
          const handleFixes = {
            '@joseluiscavaoficial': '@JoseLuisCavatv',
            '@juanramonrallo': '@juanrallo',
            '@joneconomist': '@JonEconomist'
          };
          // Combinar canales remotos y locales
          const canalMap = new Map();
          [...remoteData.canales, ...(state.canales || [])].forEach(c => {
            if (c && c.id) {
              const lowerH = (c.handle || '').toLowerCase();
              if (handleFixes[lowerH]) c.handle = handleFixes[lowerH];
              canalMap.set(c.id, { ...(canalMap.get(c.id) || {}), ...c });
            }
          });
          state.canales = Array.from(canalMap.values());
        }
        if (remoteData.videos && remoteData.videos.length > 0) {
          // Fusionar vídeos locales y remotos por YouTube ID para no perder vídeos recién escaneados localmente
          const mergedMap = new Map();
          [...remoteData.videos, ...(state.videos || [])].forEach(v => {
            if (!v) return;
            const key = extractVideoId(v.url) || v.id;
            if (!mergedMap.has(key)) {
              mergedMap.set(key, v);
            } else {
              // Mantener el que tenga resumen estructurado enriquecido (hechos_mercado) o fecha de análisis más reciente
              const prev = mergedMap.get(key);
              const prevHas4Block = Boolean(prev?.resumen_estructurado?.hechos_mercado);
              const currHas4Block = Boolean(v?.resumen_estructurado?.hechos_mercado);
              const prevTime = prev?.lastAnalyzedAt ? new Date(prev.lastAnalyzedAt).getTime() : 0;
              const currTime = v?.lastAnalyzedAt ? new Date(v.lastAnalyzedAt).getTime() : 0;
              if (prevHas4Block && !currHas4Block) {
                mergedMap.set(key, { ...v, ...prev, resumen_estructurado: prev.resumen_estructurado, tags: prev.tags });
              } else if (currTime >= prevTime) {
                mergedMap.set(key, { ...prev, ...v });
              }
            }
          });
          state.videos = Array.from(mergedMap.values()).sort((a, b) => (b.dateTimestamp || 0) - (a.dateTimestamp || 0));
          state.meta_analisis = remoteData.meta_analisis || state.meta_analisis;
          recalculateVideosRecency();
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

// ==========================================
// RASTREO AUTOMÁTICO DE CANALES EN YOUTUBE
// ==========================================
function updateYtSyncBadge() {
  const dot = document.getElementById('ytSyncDot');
  const txt = document.getElementById('ytSyncText');
  if (!txt) return;

  if (state.isScanningYoutube) {
    if (dot) dot.className = 'status-dot syncing';
    txt.textContent = 'Escaneando YouTube...';
    return;
  }

  if (dot) dot.className = 'status-dot';
  const intervalMin = state.config.ytScanIntervalMinutes ?? 30;
  const intervalLabel = intervalMin > 0 ? `Auto ${intervalMin}m` : 'Manual';

  if (!state.config.lastYoutubeScan) {
    txt.textContent = `YT: Pendiente (${intervalLabel})`;
    return;
  }

  const lastMs = new Date(state.config.lastYoutubeScan).getTime();
  if (isNaN(lastMs)) {
    txt.textContent = `YT: ${intervalLabel}`;
    return;
  }

  const diffMin = Math.max(0, Math.floor((Date.now() - lastMs) / 60000));
  if (diffMin < 1) {
    txt.textContent = `YT: hace <1m (${intervalLabel})`;
  } else if (diffMin < 60) {
    txt.textContent = `YT: hace ${diffMin}m (${intervalLabel})`;
  } else {
    const diffHours = Math.floor(diffMin / 60);
    txt.textContent = `YT: hace ${diffHours}h (${intervalLabel})`;
  }
}

function setupYoutubeAutoScan() {
  if (ytAutoScanTimer) {
    clearInterval(ytAutoScanTimer);
    ytAutoScanTimer = null;
  }

  const intervalMin = state.config.ytScanIntervalMinutes ?? 30;
  if (intervalMin > 0) {
    // Comprobar periódicamente cada minuto si toca escanear YouTube
    ytAutoScanTimer = setInterval(() => {
      checkAndTriggerAutoYoutubeScan();
    }, 60 * 1000);

    // Comprobar también al iniciar la aplicación (tras 1.5s para no bloquear el render inicial)
    setTimeout(() => {
      checkAndTriggerAutoYoutubeScan();
    }, 1500);
  }
}

function checkAndTriggerAutoYoutubeScan() {
  if (state.isScanningYoutube) return;
  const intervalMin = state.config.ytScanIntervalMinutes ?? 30;
  if (intervalMin <= 0) return;

  const hasEmptyChannel = (state.canales || []).some(
    c => !state.videos.some(v => v.tipo === 'canal' && v.canalId === c.id)
  );

  if (hasEmptyChannel || !state.config.lastYoutubeScan) {
    scanAllChannelsForNewVideos(false);
    return;
  }

  const lastMs = new Date(state.config.lastYoutubeScan).getTime();
  if (isNaN(lastMs) || (Date.now() - lastMs) >= intervalMin * 60 * 1000) {
    scanAllChannelsForNewVideos(false);
  }
}

// Clasificación heurística rápida de respaldo (Macro vs Política/Sociedad)
function classifyAndBuildChannelVideo(item, canal) {
  const titleLower = (item.title || '').toLowerCase();
  const descLower = (item.description || '').toLowerCase();
  const combined = `${titleLower} ${descLower}`;

  const offTopicKeywords = [
    'elecciones', 'votar', 'partido político', 'amnistía', 'corrupción política',
    'sánchez', 'feijóo', 'abascal', 'iglesias', 'maduro', 'milei vs', 'lula',
    'aborto', 'inmigración', 'delincuencia', 'fútbol', 'deporte', 'entrevista personal',
    'polémica', 'debate político', 'constitución', 'judicial', 'caso koldo', 'begoña'
  ];

  const macroKeywords = [
    'fed', 'bce', 'tipos de interés', 'inflación', 'deflación', 'recesión', 'pib',
    'deuda', 'bonos', 'tesoro', 'liquidez', 's&p', 'sp500', 'nasdaq', 'bolsa',
    'mercado', 'oro', 'plata', 'petróleo', 'energía', 'bitcoin', 'btc', 'cripto',
    'dólar', 'euro', 'divisa', 'banco central', 'bancos', 'crisis financiera',
    'trading', 'inversión', 'acciones', 'wall street', ' China ', 'aranceles', 'impuestos'
  ];

  let isOffTopic = offTopicKeywords.some(kw => titleLower.includes(kw));
  const hasStrongMacro = macroKeywords.some(kw => titleLower.includes(kw.trim()));
  if (hasStrongMacro) isOffTopic = false;

  const categoriaSugerida = isOffTopic ? 'politica_sociedad' : 'macro';

  // Detectar etiquetas automáticas según el título
  const tags = [];
  if (combined.includes('bitcoin') || combined.includes('btc') || combined.includes('cripto')) tags.push('Bitcoin');
  if (combined.includes('oro') || combined.includes('plata')) tags.push('Oro');
  if (combined.includes('fed') || combined.includes('powell') || combined.includes('bce') || combined.includes('tipos')) tags.push('Bancos Centrales');
  if (combined.includes('inflación') || combined.includes('ipc')) tags.push('Inflación');
  if (combined.includes('deuda') || combined.includes('bono')) tags.push('Deuda y Bonos');
  if (combined.includes('s&p') || combined.includes('bolsa') || combined.includes('acciones') || combined.includes('nasdaq')) tags.push('Bolsas');
  if (combined.includes('liquidez')) tags.push('Liquidez');
  if (combined.includes('petróleo') || combined.includes('energía')) tags.push('Energía');
  if (tags.length === 0) {
    tags.push(isOffTopic ? 'Política / Sociedad' : 'Macroeconomía', canal.nombre);
  }

  return {
    id: `vid_${canal.id}_${item.videoId}`,
    tipo: 'canal',
    canalId: canal.id,
    url: item.url || `https://www.youtube.com/watch?v=${item.videoId}`,
    title: item.title,
    author: canal.nombre,
    channel: canal.nombre,
    fecha: item.fecha,
    fecha_registro: new Date().toLocaleString('es-ES'),
    dateTimestamp: item.dateTimestamp,
    diasAntiguedad: item.diasAntiguedad,
    recencyTier: item.recencyTier,
    recencyLabel: item.recencyLabel,
    categoriaSugerida,
    incluidoEnSintesis: !isOffTopic,
    thumbnail: item.thumbnail || `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`,
    consulta: isOffTopic
      ? 'Contenido de actualidad política o social descartado automáticamente de la síntesis macro.'
      : `Análisis de la tesis macroeconómica, liquidez e impacto en activos en "${item.title}".`,
    tags: tags.slice(0, 4),
    resumen_estructurado: {
      respuesta_consulta: item.description
        ? item.description.slice(0, 280)
        : `Análisis de ${canal.nombre} centrado en: ${item.title}.`,
      tesis_macro: isOffTopic
        ? 'Vídeo centrado en cuestiones políticas o sociales sin impacto operativo directo en la matriz de activos.'
        : `Postura de ${canal.nombre} (${ item.fecha }): ${item.title}.`,
      matriz_activos: {
        renta_variable: tags.includes('Bolsas') ? 'En foco en el vídeo' : 'Neutral',
        bonos: tags.includes('Deuda y Bonos') ? 'En foco en el vídeo' : 'Neutral',
        oro: tags.includes('Oro') ? 'Favorable / Cobertura' : 'Neutral',
        petroleo: tags.includes('Energía') ? 'En foco en el vídeo' : 'Neutral',
        dolar: 'Neutral',
        bitcoin: tags.includes('Bitcoin') ? 'En foco en el vídeo' : 'Neutral'
      },
      timestamps_citas: [
        `00:00 - Publicado el ${item.fecha}: ${item.title}`
      ]
    }
  };
}

// Enriquecer los nuevos vídeos detectados usando Gemini 3.8 Flash en lote
async function enrichNewChannelVideosWithAI(newVideoObjs, canal, rawItemsMap) {
  if (!newVideoObjs || newVideoObjs.length === 0) return;
  try {
    // Enriquecer hasta los 6 vídeos más recientes del lote con IA para máxima velocidad y precisión
    const subset = newVideoObjs.slice(0, 6);

    // Intentar obtener extracto de transcripción del vídeo más reciente (Tier 1) si solo hay 1-2 vídeos nuevos
    let latestTranscriptSnippet = '';
    if (subset.length <= 2) {
      try {
        const vId = extractVideoId(subset[0].url);
        const trRes = await fetch('/api/extraer-video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: subset[0].url })
        });
        if (trRes.ok) {
          const trData = await trRes.json();
          if (trData.ok && trData.fullTranscript) {
            latestTranscriptSnippet = trData.fullTranscript.slice(0, 12000);
          }
        }
      } catch (e) {}
    }

    const itemsPromptList = subset.map((v, idx) => {
      const vId = extractVideoId(v.url);
      const raw = rawItemsMap.get(vId);
      const desc = raw?.description ? `\nDescripción: ${raw.description.slice(0, 350)}` : '';
      const tr = (idx === 0 && latestTranscriptSnippet) ? `\nExtracto Transcripción:\n${latestTranscriptSnippet}` : '';
      return `[#${idx}] id="${v.id}" | Fecha: ${v.fecha} | Título: "${v.title}"${desc}${tr}`;
    }).join('\n---\n');

    const systemPrompt = `Eres un analista macroeconómico institucional. Clasificas y sintetizas nuevos vídeos de YouTube del analista ${canal.nombre} (${canal.descripcion || ''}).
Para cada vídeo indica si es de temática económica/mercados ("macro") o puramente política partidista/sociedad off-topic ("politica_sociedad"), y genera su síntesis estructurada en español.
Devuelve SIEMPRE un bloque JSON válido con un array bajo la clave "analisis".`;

    const userPrompt = `Analiza estos ${subset.length} vídeos recién detectados del canal ${canal.nombre}:

${itemsPromptList}

Devuelve un JSON con este formato exacto:
\`\`\`json
{
  "analisis": [
    {
      "id": "id exacto del vídeo",
      "categoriaSugerida": "macro" o "politica_sociedad",
      "consulta": "Pregunta macro clave que responde este vídeo",
      "tags": ["Tag1", "Tag2", "Tag3"],
      "respuesta_consulta": "Síntesis directa de 2 líneas",
      "tesis_macro": "Tesis central macroeconómica y de mercado del vídeo",
      "matriz_activos": {
        "renta_variable": "Favorable / Desfavorable / Neutral y motivo breve",
        "bonos": "Sesgo y motivo breve",
        "oro": "Sesgo y motivo breve",
        "petroleo": "Sesgo y motivo breve",
        "dolar": "Sesgo y motivo breve",
        "bitcoin": "Sesgo y motivo breve"
      }
    }
  ]
}
\`\`\``;

    const aiData = await callGeminiApi(userPrompt, systemPrompt, true);
    if (aiData && Array.isArray(aiData.analisis)) {
      for (const itemAi of aiData.analisis) {
        const target = newVideoObjs.find(v => v.id === itemAi.id);
        if (target) {
          if (itemAi.categoriaSugerida === 'politica_sociedad' || itemAi.categoriaSugerida === 'macro') {
            target.categoriaSugerida = itemAi.categoriaSugerida;
            target.incluidoEnSintesis = itemAi.categoriaSugerida === 'macro';
          }
          if (itemAi.consulta) target.consulta = itemAi.consulta;
          if (Array.isArray(itemAi.tags) && itemAi.tags.length > 0) target.tags = itemAi.tags.slice(0, 4);
          if (itemAi.respuesta_consulta) target.resumen_estructurado.respuesta_consulta = itemAi.respuesta_consulta;
          if (itemAi.tesis_macro) target.resumen_estructurado.tesis_macro = itemAi.tesis_macro;
          if (itemAi.matriz_activos) target.resumen_estructurado.matriz_activos = itemAi.matriz_activos;
        }
      }
    }
  } catch (err) {
    console.warn('Enriquecimiento IA opcional omitido (usando clasificación heurística):', err.message);
  }
}

// Escanear un único canal en YouTube
window.scanSingleChannel = async function(canalId, showFeedback = true) {
  const canal = state.canales.find(c => c.id === canalId);
  if (!canal) return 0;

  if (showFeedback) {
    showToast(`📡 Buscando vídeos en YouTube para ${canal.nombre}...`, 'info');
  }

  try {
    const res = await fetch('/api/explorar-canal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ handle: canal.handle || canal.nombre, maxDays: 90 })
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.ok || !Array.isArray(data.videos)) {
      throw new Error(data.error || 'No se pudieron obtener vídeos del canal');
    }

    if (data.resolvedHandle && data.resolvedHandle.startsWith('@')) {
      canal.handle = data.resolvedHandle;
    }
    if (data.channelAvatar && (!canal.avatar || canal.avatar.includes('Placeholder'))) {
      canal.avatar = data.channelAvatar;
    }

    // Mapa de vídeos actuales por su ID de YouTube
    const existingByYtId = new Map();
    state.videos.forEach(v => {
      const ytId = extractVideoId(v.url);
      if (ytId) existingByYtId.set(ytId, v);
    });

    const newVideoObjs = [];
    const rawItemsMap = new Map();

    for (const item of data.videos) {
      rawItemsMap.set(item.videoId, item);
      const existing = existingByYtId.get(item.videoId);
      if (existing) {
        // Actualizar fecha y antigüedad real si ya existía
        existing.dateTimestamp = item.dateTimestamp;
        existing.fecha = item.fecha;
        existing.diasAntiguedad = item.diasAntiguedad;
        existing.recencyTier = item.recencyTier;
        existing.recencyLabel = item.recencyLabel;
      } else {
        const built = classifyAndBuildChannelVideo(item, canal);
        newVideoObjs.push(built);
      }
    }

    if (newVideoObjs.length > 0) {
      await enrichNewChannelVideosWithAI(newVideoObjs, canal, rawItemsMap);
      state.videos.unshift(...newVideoObjs);
      state.videos.sort((a, b) => (b.dateTimestamp || 0) - (a.dateTimestamp || 0));
    }

    recalculateVideosRecency();

    if (showFeedback) {
      renderAll();
      await persistData(true);
      if (newVideoObjs.length > 0) {
        showToast(`✅ ¡Añadidos ${newVideoObjs.length} vídeos nuevos de ${canal.nombre}!`, 'success');
      } else {
        showToast(`✅ ${canal.nombre} está al día (${data.videos.length} vídeos en ventana de 3 meses).`, 'info');
      }
    }

    return newVideoObjs.length;
  } catch (err) {
    console.warn(`Error escaneando canal ${canal.nombre}:`, err);
    if (showFeedback) {
      showToast(`⚠️ No se pudo escanear ${canal.nombre}: ${err.message}`, 'error');
    }
    return 0;
  }
};

// Escanear todos los canales monitorizados en busca de nuevos vídeos en YouTube
window.scanAllChannelsForNewVideos = async function(isManual = false) {
  if (state.isScanningYoutube) return;
  if (!state.canales || state.canales.length === 0) return;

  state.isScanningYoutube = true;
  updateYtSyncBadge();

  if (isManual) {
    showToast('📡 Comprobando en YouTube nuevos vídeos de todos los canales...', 'info');
  }

  let totalNew = 0;
  try {
    for (const canal of state.canales) {
      const added = await window.scanSingleChannel(canal.id, false);
      totalNew += added;
    }

    state.config.lastYoutubeScan = new Date().toISOString();
    localStorage.setItem('macro_last_yt_scan', state.config.lastYoutubeScan);

    recalculateVideosRecency();
    renderAll();

    if (totalNew > 0) {
      await persistData(true);
      showToast(`🎉 ¡Actualización completada! Se han incorporado ${totalNew} nuevos vídeos desde YouTube.`, 'success');
    } else {
      await persistData(false);
      if (isManual) {
        showToast('✅ Todos los canales están al día. No hay vídeos nuevos pendientes en YouTube.', 'success');
      }
    }
  } catch (err) {
    console.warn('Error en escaneo global de YouTube:', err);
  } finally {
    state.isScanningYoutube = false;
    updateYtSyncBadge();
    if (state.gestorSubtab === 'canales') {
      renderChannelsView();
    }
  }
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

window.handleAddChannelSubmit = async function(e) {
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
  showToast(`📡 Canal "${nombre}" añadido. Importando sus vídeos de los últimos 3 meses desde YouTube...`, 'info');
  await window.scanSingleChannel(id, true);
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

  const lastScanText = state.config.lastYoutubeScan
    ? new Date(state.config.lastYoutubeScan).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    : 'Pendiente';

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
        <button class="btn btn-primary btn-sm" onclick="scanSingleChannel('${currentCanal.id}', true)" title="Comprobar ahora en YouTube si este canal ha subido nuevos vídeos">
          🔄 Actualizar Canal YT
        </button>
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
        📺 Última revisión YT: <strong>${lastScanText}</strong> · Ventana: <strong>Últimos 3 meses</strong>
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

  // 4. Renderizar Filas de Vídeos con Botón Directo de Actualizar Resumen IA y Desglose de 4 Bloques
  listContainer.innerHTML = displayedVideos.map(video => {
    const isIncluded = video.incluidoEnSintesis !== false;
    const estructurado = video.resumen_estructurado || null;
    const has4Blocks = Boolean(estructurado && estructurado.hechos_mercado);

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
      <div class="channel-video-row ${isIncluded ? '' : 'excluded'}" data-id="${video.id}">
        <div class="channel-video-top">
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
                <a href="${video.url}" target="_blank" style="color: var(--accent-blue); text-decoration: none; font-size: 0.75rem; font-weight: 600;" title="Abrir en YouTube">▶ Ver en YT</a>
                ${(video.tags || []).map(t => `<span class="tag-badge">#${escapeHtml(t)}</span>`).join('')}
              </div>
            </div>
          </div>
          <div class="channel-video-right">
            <button class="btn btn-primary btn-sm" onclick="reanalyzeVideoById('${video.id}')" title="Extraer transcripción de YouTube y generar/actualizar el resumen usando el Prompt Maestro actual">
              🔄 Actualizar Resumen IA
            </button>
            <button class="btn btn-secondary btn-sm" onclick="editVideoQuery('${video.id}')" title="Ver o cambiar el Prompt Maestro / notas y actualizar el resumen">
              ✏️ Prompt / Notas
            </button>
            <button class="macro-switch-btn ${isIncluded ? 'active' : 'inactive'}" 
                    onclick="toggleChannelVideoMacro('${video.id}')"
                    title="${isIncluded ? 'Activo en la síntesis macro. Clic para descartar.' : 'Descartado de la síntesis. Clic para incluir.'}">
              <span>${isIncluded ? '🟢' : '⚪'}</span>
              <span>${isIncluded ? 'En Síntesis' : 'Descartado'}</span>
            </button>
          </div>
        </div>

        <div class="channel-video-body">
          <div class="summary-accordion" style="border-top: none; padding-top: 0.1rem; margin-top: 0;">
            <button class="accordion-toggle" onclick="toggleAccordion(this)">
              <span>📋 ${has4Blocks ? 'Ver Resumen Operativo (4 Bloques)' : 'Ver Desglose Analítico IA'}</span>
              <span class="accordion-arrow">${has4Blocks ? '▲' : '▼'}</span>
            </button>
            <div class="accordion-content ${has4Blocks ? 'open' : ''}" id="acc_${video.id}">
              ${renderStructuredSummary(estructurado, video.resumen, video.id)}
            </div>
          </div>
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
    const has4Blocks = Boolean(estructurado && estructurado.hechos_mercado);

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

          ${video.consulta ? `
          <div class="user-query-box">
            <strong>🎯 Notas del Vídeo:</strong>
            ${escapeHtml(video.consulta)}
          </div>` : ''}

          <div class="tags-list">
            ${(video.tags || []).map(t => `<span class="tag-badge" onclick="filterByTag('${escapeHtml(t)}')">#${escapeHtml(t)}</span>`).join('')}
          </div>

          <div class="summary-accordion">
            <button class="accordion-toggle" onclick="toggleAccordion(this)">
              <span>📋 ${has4Blocks ? 'Ver Resumen Operativo (4 Bloques)' : 'Ver Desglose Analítico IA'}</span>
              <span class="accordion-arrow">${has4Blocks ? '▲' : '▼'}</span>
            </button>
            <div class="accordion-content ${has4Blocks ? 'open' : ''}" id="acc_${video.id}">
              ${renderStructuredSummary(estructurado, video.resumen, video.id)}
            </div>
          </div>
        </div>

        <div class="video-card-actions">
          <label class="checkbox-label" title="Incluir este vídeo en la Síntesis / Meta-Análisis">
            <input type="checkbox" ${isIncluded ? 'checked' : ''} onchange="toggleIncludeVideo('${video.id}', this.checked)">
            <span>En Meta-Análisis</span>
          </label>
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            <button class="btn btn-primary btn-sm" onclick="reanalyzeVideoById('${video.id}')" title="Actualizar resumen con el Prompt Maestro actual">
              🔄 Actualizar Resumen
            </button>
            <button class="btn btn-secondary btn-sm" onclick="editVideoQuery('${video.id}')" title="Editar Prompt / Notas y actualizar">
              ✏️ Prompt
            </button>
            <a href="${video.url}" target="_blank" class="btn btn-secondary btn-sm" title="Abrir vídeo en YouTube">
              ▶ YT
            </a>
            <button class="btn btn-danger btn-sm" onclick="deleteVideo('${video.id}')" title="Eliminar vídeo de la biblioteca">
              🗑️
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderStructuredSummary(est, fallbackText, videoId = '') {
  const actionToolbar = videoId ? `
    <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px dashed rgba(255,255,255,0.1);">
      <button type="button" class="btn btn-secondary btn-sm" onclick="editVideoQuery('${videoId}')" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;">
        ✏️ Cambiar Prompt / Notas
      </button>
      <button type="button" class="btn btn-primary btn-sm" onclick="reanalyzeVideoById('${videoId}')" style="font-size: 0.75rem; padding: 0.25rem 0.65rem;">
        🔄 Actualizar Resumen con IA Ahora
      </button>
    </div>
  ` : '';

  if (!est) {
    return `${actionToolbar}<div style="white-space: pre-wrap;">${escapeHtml(fallbackText || 'Sin resumen disponible')}</div>`;
  }

  let html = actionToolbar;

  // Nuevo formato de 4 bloques del usuario
  if (est.hechos_mercado || est.por_que_conclusion || est.otros_temas_maldades) {
    if (est.hechos_mercado) {
      html += `
        <div class="structured-block">
          <div class="block-title" style="color: #60a5fa;">📊 - Como se ve el mercado / los hechos:</div>
          <div style="white-space: pre-line; color: #e2e8f0;">${escapeHtml(est.hechos_mercado)}</div>
        </div>
      `;
    }

    if (est.como_reaccionar && est.como_reaccionar.trim()) {
      html += `
        <div class="structured-block">
          <div class="block-title" style="color: #34d399;">🎯 - Como reaccionar:</div>
          <div style="white-space: pre-line; color: #d1fae5; font-weight: 600;">${escapeHtml(est.como_reaccionar)}</div>
        </div>
      `;
    }

    if (est.por_que_conclusion || est.fecha_importante) {
      html += `
        <div class="structured-block">
          <div class="block-title" style="color: #fbbf24;">💡 - ¿por que? / conclusión:</div>
          ${est.por_que_conclusion ? `<div style="white-space: pre-line; color: #e2e8f0;">${escapeHtml(est.por_que_conclusion)}</div>` : ''}
          ${est.fecha_importante ? `<div style="margin-top: 0.4rem; padding: 0.4rem 0.65rem; background: rgba(245, 158, 11, 0.12); border-left: 3px solid var(--accent-amber); border-radius: 4px; color: #fde68a; font-weight: 600;">📅 Fecha importante: ${escapeHtml(est.fecha_importante)}</div>` : ''}
        </div>
      `;
    }

    if (est.otros_temas_maldades) {
      html += `
        <div class="structured-block">
          <div class="block-title" style="color: #c084fc;">🌶️ - Otros temas / maldades / predicción:</div>
          <div style="white-space: pre-line; color: #e2e8f0;">${escapeHtml(est.otros_temas_maldades)}</div>
        </div>
      `;
    }
  } else {
    // Formato clásico de respaldo para vídeos aún no actualizados
    if (est.respuesta_consulta) {
      html += `
        <div class="structured-block">
          <div class="block-title">🎯 Respuesta / Resumen previo:</div>
          <div style="white-space: pre-line;">${escapeHtml(est.respuesta_consulta)}</div>
        </div>
      `;
    }

    if (est.tesis_macro) {
      html += `
        <div class="structured-block">
          <div class="block-title">📈 Tesis Central y Catalizadores:</div>
          <div style="white-space: pre-line;">${escapeHtml(est.tesis_macro)}</div>
        </div>
      `;
    }
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

  return html;
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

  const modal = document.getElementById('modalEditQuery');
  const idInput = document.getElementById('editQueryVideoId');
  const titleEl = document.getElementById('editQueryVideoTitle');
  const metaEl = document.getElementById('editQueryVideoMeta');
  const textarea = document.getElementById('editQueryTextarea');
  const modalMasterPrompt = document.getElementById('editModalMasterPrompt');

  if (modal && idInput && textarea) {
    idInput.value = v.id;
    if (titleEl) titleEl.textContent = v.title || 'Vídeo';
    if (metaEl) metaEl.textContent = `👤 ${v.author || v.channel || 'Analista'} · 📅 ${v.fecha || ''}`;
    textarea.value = v.consulta || '';
    if (modalMasterPrompt) {
      modalMasterPrompt.value = getEffectiveMasterPrompt();
    }
    modal.classList.add('active');
  }
};

window.closeEditQueryModal = function() {
  const modal = document.getElementById('modalEditQuery');
  if (modal) modal.classList.remove('active');
};

window.saveQueryOnly = async function() {
  const idInput = document.getElementById('editQueryVideoId');
  const textarea = document.getElementById('editQueryTextarea');
  const modalMasterPrompt = document.getElementById('editModalMasterPrompt');
  if (!idInput || !textarea) return;

  const v = state.videos.find(x => x.id === idInput.value);
  if (!v) return;

  v.consulta = textarea.value.trim();

  if (modalMasterPrompt && modalMasterPrompt.value.trim()) {
    state.config.masterPrompt = modalMasterPrompt.value.trim();
    localStorage.setItem('macro_master_prompt', state.config.masterPrompt);
    syncPromptInputsUI();
  }

  closeEditQueryModal();
  renderVideosTab();
  await persistData(true);
  showToast('Prompt Maestro y notas guardados correctamente', 'success');
};

// Función directa para re-analizar cualquier vídeo con 1 clic usando el Prompt Maestro actual
window.reanalyzeVideoById = async function(videoId) {
  const v = state.videos.find(x => x.id === videoId);
  if (!v) return;

  const masterPrompt = getEffectiveMasterPrompt();
  const consulta = v.consulta || '';

  setLoading(true, 'Extrayendo transcripción real de YouTube...', `Descargando subtítulos de "${v.title}"`);

  try {
    let transcript = '';
    try {
      const extRes = await fetch('/api/extraer-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: v.url })
      });
      if (extRes.ok) {
        const extData = await extRes.json();
        if (extData.ok && extData.fullTranscript) {
          transcript = extData.fullTranscript;
        }
      }
    } catch (e) {}

    setLoading(
      true,
      'Generando resumen con tu Prompt Maestro (Gemini 3.8 Flash)...',
      transcript
        ? `Analizando transcripción completa (${transcript.split('\n').length} líneas)`
        : 'Analizando vídeo con tu estructura de 4 bloques'
    );

    const systemPrompt = `${masterPrompt}

IMPORTANTE: Devuelve SIEMPRE tu respuesta en formato JSON válido dentro de un bloque \`\`\`json.`;

    const contextBlock = transcript
      ? `TRANSCRIPCIÓN COMPLETA DEL VÍDEO:\n---\n${transcript.slice(0, 150000)}\n---`
      : `CONTEXTO PREVIO DEL VÍDEO:\nTítulo: ${v.title}\nResumen previo: ${v.resumen_estructurado?.hechos_mercado || v.resumen_estructurado?.tesis_macro || v.resumen_estructurado?.respuesta_consulta || ''}`;

    const userPrompt = `
ANALIZA EL SIGUIENTE VÍDEO SIGUIENDO EL PROMPT MAESTRO:
- Título: ${v.title}
- Analista / Canal: ${v.author || v.channel}
- Fecha: ${v.fecha || ''}
- URL: ${v.url}
${consulta ? `\n🎯 NOTAS O CONDICIONES ADICIONALES PARA ESTE VÍDEO:\n"${consulta}"\n` : ''}
${contextBlock}

Devuelve un bloque JSON válido con este formato exacto:
\`\`\`json
{
  "categoriaSugerida": "macro" o "politica_sociedad",
  "hechos_mercado": "Texto directo para '- Como se ve el mercado / los hechos:' (causa->efecto, fechas del gráfico, flujos de opciones Call/Put y cobertura por delta de creadores de mercado, o situación de bonos/déficit/deuda).",
  "como_reaccionar": "Texto directo para '- Como reaccionar:' indicando qué comprar/vender y en qué nivel exacto (ej. 'Comprar futuros si el SP500 supera la zona de los 7740'). Si no da orden concreta, pon cadena vacía ''.",
  "por_que_conclusion": "Texto directo para '- ¿por que? / conclusión:' (1 línea telegráfica por activo con su dirección, fecha límite y motivo, o por qué alguien sujeta el mercado).",
  "fecha_importante": "Fecha clave mencionada y qué ocurrirá antes y después (ej. '3 de noviembre elecciones, las bolsas subirán hasta el 3 de noviembre y después bajarán'). Si no hay fecha clave, pon ''.",
  "otros_temas_maldades": "Texto directo para '- Otros temas / maldades / predicción:' (problemas económicos de países como Francia/UK, qué pasará tras la fecha clave, niveles de VIX como 16-20 y >20, y sectores futuros como Salud y Energías limpias).",
  "matriz_activos": {
    "renta_variable": "sesgo y nivel clave",
    "bonos": "sesgo y motivo",
    "oro": "sesgo y horizonte",
    "petroleo": "sesgo y motivo",
    "dolar": "sesgo",
    "bitcoin": "sesgo y horizonte"
  },
  "timestamps_citas": [
    "MM:SS - Hecho o nivel clave del vídeo",
    "MM:SS - Conclusión o maldad final"
  ],
  "tags_sugeridos": ["Tag1", "Tag2", "Tag3", "Tag4"]
}
\`\`\`
`;

    const aiRes = await callGeminiApi(userPrompt, systemPrompt, true);

    v.resumen_estructurado = {
      hechos_mercado: aiRes.hechos_mercado || '',
      como_reaccionar: aiRes.como_reaccionar || '',
      por_que_conclusion: aiRes.por_que_conclusion || '',
      fecha_importante: aiRes.fecha_importante || '',
      otros_temas_maldades: aiRes.otros_temas_maldades || '',
      respuesta_consulta: aiRes.por_que_conclusion || aiRes.respuesta_consulta || '',
      tesis_macro: `${aiRes.hechos_mercado || ''} ${aiRes.por_que_conclusion || ''} ${aiRes.otros_temas_maldades || ''}`.trim(),
      matriz_activos: aiRes.matriz_activos || v.resumen_estructurado?.matriz_activos || {},
      timestamps_citas: aiRes.timestamps_citas || v.resumen_estructurado?.timestamps_citas || []
    };
    v.lastAnalyzedAt = Date.now();

    if (Array.isArray(aiRes.tags_sugeridos) && aiRes.tags_sugeridos.length > 0) {
      v.tags = aiRes.tags_sugeridos;
    }
    if (aiRes.categoriaSugerida === 'macro' || aiRes.categoriaSugerida === 'politica_sociedad') {
      v.categoriaSugerida = aiRes.categoriaSugerida;
    }

    renderAll();

    // Abrir automáticamente el acordeón del vídeo recién analizado para mostrar el resultado
    const accEl = document.getElementById(`acc_${v.id}`);
    if (accEl) {
      accEl.classList.add('open');
      const arrow = accEl.previousElementSibling?.querySelector('.accordion-arrow');
      if (arrow) arrow.textContent = '▲';
    }

    await persistData(true);
    showToast('✨ ¡Resumen actualizado con éxito usando tu Prompt Maestro!', 'success');
  } catch (err) {
    alert('Error al analizar el vídeo con IA: ' + err.message);
  } finally {
    setLoading(false);
  }
};

window.saveAndAnalyzeQueryWithAI = async function() {
  const idInput = document.getElementById('editQueryVideoId');
  const textarea = document.getElementById('editQueryTextarea');
  const modalMasterPrompt = document.getElementById('editModalMasterPrompt');
  if (!idInput) return;

  const v = state.videos.find(x => x.id === idInput.value);
  if (!v) return;

  if (textarea) {
    v.consulta = textarea.value.trim();
  }
  if (modalMasterPrompt && modalMasterPrompt.value.trim()) {
    state.config.masterPrompt = modalMasterPrompt.value.trim();
    localStorage.setItem('macro_master_prompt', state.config.masterPrompt);
    syncPromptInputsUI();
  }

  closeEditQueryModal();
  await window.reanalyzeVideoById(v.id);
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
  const consulta = consultaInput ? consultaInput.value.trim() : '';

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
      setLoading(true, 'Analizando contenido con tu Prompt Maestro...', 'Generando estructura de 4 bloques');
    } else {
      setLoading(true, 'Procesando con tu Prompt Maestro...', `Analizando transcripción (${extractData.lineCount || 'múltiples'} líneas)`);
    }

    const masterPrompt = getEffectiveMasterPrompt();
    const systemPrompt = `${masterPrompt}\n\nIMPORTANTE: Devuelve SIEMPRE tu respuesta en formato JSON dentro de un bloque markdown \`\`\`json.`;

    const userPrompt = `
ANALIZA EL SIGUIENTE VÍDEO SIGUIENDO EL PROMPT MAESTRO:
- Título: ${title}
- Analista / Canal: ${author}
- URL: ${rawUrl}
${consulta ? `\n🎯 NOTAS O CONDICIONES DEL USUARIO:\n"${consulta}"\n` : ''}
TRANSCRIPCIÓN COMPLETA DEL VÍDEO:
---
${transcript.slice(0, 150000)}
---

Devuelve un bloque JSON válido con este formato:
\`\`\`json
{
  "title": "${title}",
  "author": "${author}",
  "hechos_mercado": "Texto para '- Como se ve el mercado / los hechos:'",
  "como_reaccionar": "Texto para '- Como reaccionar:' (o '' si no da orden concreta)",
  "por_que_conclusion": "Texto para '- ¿por que? / conclusión:'",
  "fecha_importante": "Fecha clave y qué pasará antes y después (o '' si no aplica)",
  "otros_temas_maldades": "Texto para '- Otros temas / maldades / predicción:'",
  "matriz_activos": {
    "renta_variable": "sesgo y nivel",
    "bonos": "sesgo y motivo",
    "oro": "sesgo y horizonte",
    "petroleo": "sesgo y motivo",
    "dolar": "sesgo",
    "bitcoin": "sesgo y horizonte"
  },
  "timestamps_citas": [
    "MM:SS - Cita o nivel clave del vídeo",
    "MM:SS - Conclusión o maldad final"
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
      lastAnalyzedAt: Date.now(),
      resumen_estructurado: {
        hechos_mercado: aiRes.hechos_mercado || '',
        como_reaccionar: aiRes.como_reaccionar || '',
        por_que_conclusion: aiRes.por_que_conclusion || '',
        fecha_importante: aiRes.fecha_importante || '',
        otros_temas_maldades: aiRes.otros_temas_maldades || '',
        respuesta_consulta: aiRes.por_que_conclusion || '',
        tesis_macro: `${aiRes.hechos_mercado || ''} ${aiRes.por_que_conclusion || ''} ${aiRes.otros_temas_maldades || ''}`.trim(),
        matriz_activos: aiRes.matriz_activos,
        timestamps_citas: aiRes.timestamps_citas
      }
    };

    state.videos.unshift(newVideo);
    renderAll();
    await persistData(true);

    urlInput.value = '';
    if (consultaInput) consultaInput.value = '';
    showToast('¡Vídeo suelto analizado con tu Prompt Maestro y añadido con éxito!', 'success');

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

function getVideoSynthesisText(v) {
  const est = v.resumen_estructurado;
  if (!est) return v.resumen || v.consulta || '';
  if (est.hechos_mercado || est.por_que_conclusion) {
    return [
      est.hechos_mercado ? `Hechos: ${est.hechos_mercado}` : '',
      est.como_reaccionar ? `Operativa: ${est.como_reaccionar}` : '',
      est.por_que_conclusion ? `Conclusión: ${est.por_que_conclusion}` : '',
      est.fecha_importante ? `Fecha clave: ${est.fecha_importante}` : '',
      est.otros_temas_maldades ? `Otros/Predicción: ${est.otros_temas_maldades}` : ''
    ].filter(Boolean).join(' | ');
  }
  return est.tesis_macro || est.respuesta_consulta || v.resumen || v.consulta || '';
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
Tesis / Análisis: ${getVideoSynthesisText(v)}
Activos: ${JSON.stringify(v.resumen_estructurado?.matriz_activos || {})}`);
      });
    }

    if (tier2Videos.length > 0) {
      contextParts.push(`\n=== ⚡ TIER 2: VÍDEOS DE 16 A 45 DÍAS (TENDENCIA INTERMEDIA Y DESARROLLO) ===`);
      tier2Videos.forEach((v, i) => {
        contextParts.push(`[TIER 2 - #${i + 1}] Analista: ${v.author || v.channel} | Fecha: ${v.fecha} (hace ${v.diasAntiguedad || 0}d)
Título: ${v.title}
Tesis / Análisis: ${getVideoSynthesisText(v)}`);
      });
    }

    if (tier3Videos.length > 0) {
      contextParts.push(`\n=== 🕰️ TIER 3: VÍDEOS DE 46 A 90 DÍAS (FONDO ESTRUCTURAL HISTÓRICO - MÍNIMO PESO) ===`);
      tier3Videos.forEach((v, i) => {
        contextParts.push(`[TIER 3 - #${i + 1}] Analista: ${v.author || v.channel} | Fecha: ${v.fecha} (hace ${v.diasAntiguedad || 0}d)
Título: ${v.title}
Tesis / Análisis: ${getVideoSynthesisText(v)}`);
      });
    }

    if (sueltosActivos.length > 0) {
      contextParts.push(`\n=== 🎯 VÍDEOS SUELTOS Y CONSULTAS PARTICULARES ACTIVAS ===`);
      sueltosActivos.forEach((v, i) => {
        contextParts.push(`[VÍDEO SUELTO - #${i + 1}] Analista: ${v.author || v.channel} | Fecha: ${v.fecha}
Título: ${v.title}
Consulta usuario: ${v.consulta || ''}
Tesis / Análisis: ${getVideoSynthesisText(v)}`);
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
