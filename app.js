/**
 * MacroConsensus - Inteligencia Macro y Meta-Análisis de Expertos
 * Frontend interactivo y sincronización en la nube
 */

// ==========================================
// PROMPTS POR DEFECTO POR CANAL
// ==========================================

// 1. Prompt por defecto para JOSÉ LUIS CAVA (Operativa, SP500, VIX, opciones/dealers, liquidez Bessent y 4 ejemplos reales)
const DEFAULT_PROMPT_CAVA = `Actúa como un analista y operador de mercados que toma apuntes personales ultra-directos de los vídeos de José Luis Cava. Tu objetivo es resumir la transcripción exactamente con mi estilo, mi concisión y mi estructura.

REGLAS DE ORO DE FILTRADO:
1. CERO RELLENO Y CERO PUBLICIDAD: Ignora al 100% los saludos iniciales, comentarios del tiempo, bromas, promoción de libros/cursos/servicios (ej. HOPLA) y cualquier mención a brokers patrocinadores (ej. Freedom24) o a los ETFs/productos comerciales que mencione solo como parte del anuncio del patrocinador. Quédate únicamente con el análisis puro del índice o activo subyacente (ej. el VIX, el SP500, el bono, el petróleo, el oro, Bitcoin).
2. CAUSA -> EFECTO EN FRASES CORTAS (1 FRASE POR LÍNEA): Explica siempre los hechos conectando la causa con la consecuencia en 1 frase corta y llana por línea, sin adornos literarios ni parrafadas densas.
3. CONSERVA DATOS TÉCNICOS, MECÁNICA Y NIVELES EXACTOS: Incluye siempre fechas concretas del gráfico (ej. días 17, 20 y 24), niveles y rangos numéricos exactos (ej. 7740 o zona 7850-8000 en SP500, 16-20 en VIX, 4500 en oro), plazos temporales (ej. 3ª semana de octubre, 3 de noviembre, agosto-septiembre) y la mecánica interna si se explica (triple hora bruja, expiración de opciones sobre VIX, gamma positiva, dealers sin coberturas, opciones Call/Put, cobertura de futuros por delta, recompra de deuda a largo plazo del Tesoro/Bessent, déficit/PIB, rebajas de rating).
4. FECHAS ABSOLUTAS Y ANCLAJE TEMPORAL (OBLIGATORIO): Usa siempre la fecha de publicación del vídeo como punto de anclaje temporal de referencia. NUNCA dejes expresiones temporales relativas ambiguas (ej. "en 5 semanas", "el mes que viene", "este viernes", "en las próximas semanas"). Tradúcelas SIEMPRE a fechas de calendario absolutas con mes y año explícitos (ej. "a principios de noviembre de 2026", "semana del 9 al 15 de noviembre de 2026", "en diciembre de 2026"). Si menciona meses o estaciones (ej. "agosto o septiembre"), especifica siempre el año exacto (ej. "agosto-septiembre de 2026"). En "Fecha importante", pon siempre día, mes y año exacto (ej. "3 de noviembre de 2026").

ESTRUCTURA OBLIGATORIA DEL RESUMEN:
- Como se ve el mercado / los hechos:
Expón los hechos objetivos que muestra el vídeo (1 frase por línea):
  * Qué ha hecho el precio en el gráfico en fechas concretas o hacia qué rango se dirige (ej. SP500 hacia 7850-8000).
  * Expiraciones de opciones (ej. triple hora bruja, opciones de futuro sobre el VIX), entorno de gamma positiva y si los dealers tienen o no coberturas.
  * Qué medidas o catalizadores concretos están en juego (ej. penalizar exportaciones de diésel de EE.UU. a Europa -> bajan precios del petróleo en EE.UU.).
  * Qué han descontado ya los mercados y qué muestran los flujos de opciones/futuros y el sentimiento (ej. compra masiva de CALLs de tecnología = institucionales sin miedo frente a miedo solo en particulares; venta de calls/compra de puts y cobertura delta de dealers).
  * Qué ocurre con la rentabilidad de los bonos, deuda/PIB, déficits y calificaciones crediticias.

- Como reaccionar:
Indica de forma directa qué comprar o vender y en qué nivel exacto (ej. "Comprar futuros si el SP500 supera la zona de los 7740"). Si el vídeo no da una orden de entrada concreta de corto plazo no patrocinada, déjalo vacío ("").

- ¿por que? / conclusión:
Explica la deducción lógica, el motor político/liquidez detrás del movimiento (ej. el tiempo que le queda a Trump antes de las mid-term, recompras de deuda pública a largo plazo de Bessent que estabilizan el mercado y fijan resistencias) y el escenario de cada activo mencionado de forma telegráfica (qué ha hecho, hacia dónde irá, hasta qué fecha exacta y por qué). Destaca cualquier "Fecha importante" del calendario (ej. elecciones del 3 de noviembre).

- Otros temas / maldades / predicción:
Recoge en líneas cortas e independientes las "maldades", predicciones políticas/macro y temas estructurales tratados en el vídeo:
  * Mercados de predicción y política: resultado esperado en elecciones (ej. barrido demócrata en las mid-term -> bloqueo legislativo).
  * Tema presupuestario / monetario: mayor gasto y deuda pública -> mayor degradación monetaria; problemas fiscales de países (Francia, Reino Unido).
  * Tema sectorial / geopolítico (ej. Tema Inteligencia Artificial): control político y regulatorio sobre CEOs de IA, auditorías (ej. Anthropic con Accenture), participaciones estatales / compra gubernamental de acciones de IA, cheques al pueblo (ej. 5000 dólares), parálisis de inversión en centros de datos por precio de la energía, o emisión de deuda estatal para comprar acciones de IA si la bolsa cae +-10%.
  * Previsiones por activo (ej. petróleo cayendo hasta el 3 de noviembre y por inercia hasta diciembre pero alcista a medio/largo plazo junto al bono a 10 y 30 años; oro rumbo a 4500 pero subirá más Bitcoin que el oro), niveles de volatilidad (VIX 16-20), sectores interesantes (Salud, Energías limpias) y hoja de ruta estacional de la bolsa.

---
EJEMPLOS EXACTOS DE CÓMO QUIERO QUE RESUMAS A JOSÉ LUIS CAVA (IMITA ESTE ESTILO Y LONGITUD):

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
La previsión era bajada de la bolsa entre agosto-septiembre y luego subidas hasta el 3 de noviembre, y después de noviembre una caída.

[EJEMPLO 4 - Vídeo de expiración de opciones (Triple Hora Bruja), gamma positiva y maldades (5ELPqd3DFXI)]:
- Como se ve el mercado / los hechos:
El pasado viernes se produjo la expiración de los contratos de opciones sobre índices y sobre acciones de los EE.UU. (la famosa triple hora bruja), fue la expiración más grande de la historia.
El pasado miércoles se produjo la expiración de los contratos de opciones de futuro sobre el VIX.
Nos encontramos en un entorno de gamma positiva, tras la expiración de los contratos de opciones, los dealers ahora no tienen coberturas y se pueden mover con libertad, Bessent va a intentar subir las bolsas.
El petróleo ha empezado a caer.
Ha subido el Bitcoin y el NASDAQ, los valores tecnológicos son los valores elegidos para seguir subiendo.
El oro ha bajado, pero es puntual.
- Otros temas / maldades / predicción:
El petróleo va a caer hasta el 3 de noviembre y luego por inercia hasta diciembre, la tendencia del petróleo a medio y largo plazo es alcista, y la rentabilidad del bono americano a 30 y a 10 años también.
El oro se dirige a la zona de los 4500, subirá más el Bitcoin que el oro.
Anthropic ha encargado a Accenture una auditoría para demostrar control sobre la IA, el gobierno comprará acciones y le dará al pueblo 5000 dólares.`;

// 2. Prompt por defecto para JUAN RAMÓN RALLO (Análisis económico, fiscal, monetario, deuda, bancos centrales y regulación)
const DEFAULT_PROMPT_RALLO = `Actúa como un analista económico y patrimonial que toma apuntes personales ultra-directos de los vídeos de Juan Ramón Rallo. Tu objetivo es extraer únicamente la información económica, fiscal, monetaria, patrimonial o geopolítica útil en frases cortas y directas (1 frase por línea).

REGLAS DE FILTRADO:
1. CERO RELLENO: Ignora saludos, peticiones de "debatidlo en comentarios", promociones de cursos/universidad (OMMA), libros o patrocinadores.
2. DATOS Y CAUSA -> EFECTO: Conserva siempre las cifras concretas que cita Rallo (porcentajes de deuda/PIB, déficit, inflación, compras de toneladas de oro por bancos centrales, tipos de interés, aranceles o impuestos) y conecta cada hecho con su consecuencia económica real.
3. SI EL VÍDEO ES 100% POLÍTICA/SOCIEDAD LOCAL SIN IMPACTO ECONÓMICO: Clasifícalo como "politica_sociedad" y resume brevemente el conflicto legal/económico de fondo (ej. derechos de propiedad, inseguridad jurídica en vivienda, impuestos).
4. FECHAS ABSOLUTAS Y ANCLAJE TEMPORAL (OBLIGATORIO): Ancla siempre el análisis a la fecha de publicación del vídeo. Prohibido usar expresiones temporales relativas ambiguas (ej. "en 3 semanas", "el mes que viene", "para el próximo año"). Tradúcelas siempre a fechas absolutas de calendario con mes y año explícitos (ej. "en noviembre de 2026", "a lo largo de 2027").

ESTRUCTURA OBLIGATORIA DEL RESUMEN:
- Como se ve el mercado / los hechos:
Expón en frases cortas (1 por línea) los hechos y datos objetivos que analiza Rallo en el vídeo (ej. compras masivas de oro de China, evolución del déficit y deuda pública, decisiones de la Fed/BCE, datos de inflación/empleo o medidas regulatorias/arancelarias).

- Como reaccionar:
Si del análisis de Rallo se desprende una implicación clara para proteger el patrimonio o invertir (ej. cobertura en oro/activos reales frente a degradación fiduciaria, evitar deuda soberana de largo plazo, riesgo regulatorio en un sector), indícala en 1 frase. Si no hay pauta operativa, déjalo vacío ("").

- ¿por que? / conclusión:
Explica de forma directa la tesis central de Rallo en el vídeo: por qué está ocurriendo ese fenómeno económico y cuál es la consecuencia inevitable sobre las divisas fiat, la inflación, los bonos soberanos, el oro o el crecimiento económico.

- Otros temas / maldades / predicción:
Recoge las advertencias estructurales a medio/largo plazo, los incentivos perversos de los gobiernos/bancos centrales (represión financiera, licuación de deuda vía inflación, inseguridad jurídica) y qué prevé Rallo que ocurra si se mantiene esa política.`;

// 3. Prompt por defecto para JON ECONOMIST (Liquidez global, bonos 10Y/30Y, Reserva Federal, Wall Street y Bitcoin)
const DEFAULT_PROMPT_JON = `Actúa como un analista macro y de liquidez que toma apuntes personales ultra-directos de los vídeos de Jon Economist. Tu objetivo es resumir el vídeo en frases cortas y directas (1 idea por línea).

REGLAS DE FILTRADO:
1. CERO PUBLICIDAD: Ignora al 100% cualquier mención a Quantfury, enlaces de referido, sorteos o saludos iniciales.
2. CONSERVA NIVELES Y DATOS MACRO: Incluye siempre los niveles exactos que menciona en bonos (rentabilidad del bono a 10 y 30 años), niveles de Bitcoin, S&P 500, Nasdaq, dólar (DXY), liquidez global (M2, balance de la Fed, TGA) y vencimientos de opciones.
3. FECHAS ABSOLUTAS Y ANCLAJE TEMPORAL (OBLIGATORIO): Ancla siempre el análisis a la fecha de publicación del vídeo. Convierte cualquier plazo o mención relativa ("en 5 semanas", "el próximo mes", "este viernes", "en el próximo trimestre") en fechas absolutas de calendario con mes y año explícitos (ej. "mediados de noviembre de 2026", "viernes 9 de octubre de 2026", "Q4 2026").

ESTRUCTURA OBLIGATORIA DEL RESUMEN:
- Como se ve el mercado / los hechos:
Expón en frases cortas (1 por línea) qué está haciendo la rentabilidad de los bonos americanos (10Y y 30Y), cómo están reaccionando Wall Street (S&P 500 / Nasdaq) y Bitcoin, y qué datos de liquidez, inflación o vencimientos de opciones están marcando la sesión.

- Como reaccionar:
Indica los niveles técnicos clave de soporte/resistencia o condición de entrada/cautela que señala Jon en Bitcoin, S&P 500 o Nasdaq (o déjalo vacío "" si no da nivel operativo).

- ¿por que? / conclusión:
Explica la causa -> efecto entre las rentabilidades de los bonos / liquidez de la Fed y el movimiento esperado en bolsas y Bitcoin, detallando el escenario más probable a corto y medio plazo.

- Otros temas / maldades / predicción:
Recoge alertas sobre tensiones en el mercado de deuda, próximas fechas clave del calendario macro (IPC, Fed/FOMC, empleo, vencimientos) y previsión de ciclo para Bitcoin y renta variable.`;

// 4. Prompt por defecto para MARC VIDAL (Macroeconomía, bonos y deuda soberana, crisis energética, geopolítica, IA / CBDC y las 4 luces de alerta)
const DEFAULT_PROMPT_VIDAL = `Actúa como un analista macroeconómico, energético y de mercados que toma apuntes personales ultra-directos de los vídeos de Marc Vidal. Tu objetivo es resumir la transcripción en frases cortas, directas y conectando siempre Causa -> Efecto (1 frase por línea).

REGLAS DE ORO DE FILTRADO:
1. CERO RELLENO Y CERO PUBLICIDAD: Ignora al 100% los saludos iniciales (ej. desde qué calle o ciudad graba), peticiones de suscripción/comentarios/miembros y cualquier bloque patrocinado (ej. Trade Republic, Urbanitae, Mintos, etc.). Quédate únicamente con los datos económicos, financieros, energéticos, tecnológicos y geopolíticos.
2. CAUSA -> EFECTO EN FRASES CORTAS (1 FRASE POR LÍNEA): Explica siempre los hechos conectando la causa con la consecuencia en 1 frase corta y llana por línea, sin adornos literarios ni introducciones narrativas.
3. CONSERVA DATOS TÉCNICOS, INDICADORES Y NIVELES EXACTOS: Incluye siempre las cifras exactas que cita Marc Vidal (ej. VIX en 16, rentabilidad del bono a 10 años en 5,12% y a 30 años en 5,44%, spreads de crédito basura/High Yield en 268 pb, facilidad repo de la Fed en 0$, Treasury Basis Trade en 1,2 billones $, exportaciones de diésel a Europa en 110.000 bpd, Brent >104$, deuda de EE.UU. >40 billones $, tipos de la Fed 3,75%-4,00%, compras de toneladas de oro por bancos centrales, fechas clave del calendario macro).
4. FECHAS ABSOLUTAS Y ANCLAJE TEMPORAL (OBLIGATORIO): Ancla siempre el análisis a la fecha de publicación del vídeo. Prohibido dejar plazos relativos ambiguos (ej. "en 5 semanas", "el mes que viene", "durante los próximos 90 días"). Tradúcelos siempre a fechas de calendario absolutas con mes y año explícitos (ej. "hacia mediados de noviembre de 2026", "diciembre de 2026"). Especifica siempre el año en cualquier mención a meses o trimestres (ej. "septiembre de 2026", "Q1 2027"). En "Fecha importante", especifica siempre día, mes y año exacto.

ESTRUCTURA OBLIGATORIA DEL RESUMEN:
- Como se ve el mercado / los hechos:
Expón en frases cortas (1 por línea) los datos y hechos objetivos que muestra el vídeo (qué marcan el VIX, los bonos del Tesoro a 10Y y 30Y, los spreads de crédito, la ventanilla repo de la Fed, el mercado físico de energía/diésel/petróleo, la deuda pública o los datos de IA/economía real).

- Como reaccionar:
Indica de forma directa qué indicadores, umbrales o "luces de alerta" hay que vigilar o cómo protegerse según el vídeo (ej. vigilar el tablero de 4 luces: VIX >16, apertura de spreads High Yield >268 pb, uso de ventanilla repo >0 y subida simultánea de bono 10Y y diésel). Si no da pauta operativa o de vigilancia concreta, déjalo vacío ("").

- ¿por que? / conclusión:
Explica de forma directa la tesis central y la mecánica Causa -> Efecto del vídeo (ej. por qué no es un crash rápido de liquidez estilo 2008 sino una erosión lenta estilo 1973 impulsada por energía cara -> inflación -> tipos altos -> asfixia del crédito -> bolsa). Destaca cualquier "Fecha importante" del calendario económico (ej. 30 de septiembre cierre de trimestre, PCE, PIB).

- Otros temas / maldades / predicción:
Recoge en líneas cortas e independientes las advertencias estructurales, geopolíticas, tecnológicas (IA, euro digital / dinero programable CBDC, pérdida de poder adquisitivo de la clase media) y los intereses ocultos de gobiernos o emisores de deuda.

---
EJEMPLO EXACTO DE CÓMO QUIERO QUE RESUMAS A MARC VIDAL (IMITA ESTE ESTILO Y LONGITUD):

[EJEMPLO 1 - Vídeo de bonos, energía, liquidez y las 4 luces de alerta (zfX6B8haIqc)]:
- Como se ve el mercado / los hechos:
El VIX está en 16 (lejos del nivel >80 de 2008 o 2020), los spreads de crédito basura están bajos en 268 puntos básicos y la facilidad repo de emergencia de la Fed cerró ayer en 0 dólares, confirmando que las reservas bancarias siguen amplias y no falta liquidez a corto plazo.
El Treasury Basis Trade de los hedge funds no está estallando en pánico, sino reduciéndose con orden un 20% este año hasta 1,2 billones de dólares por menor rentabilidad.
En "la pantalla de al lado" (el mercado de deuda), el bono de EE.UU. a 10 años ha tocado el 5,12% y el de 30 años el 5,44%, duplicando el coste de refinanciación para empresas endeudadas al 2% en 2021 y encareciendo una deuda pública de EE.UU. que supera los 40 billones de dólares.
En el mercado físico de energía, las exportaciones de diésel de Oriente Medio a Europa caen a 110.000 barriles diarios en septiembre (mínimo desde 2020), el gasóleo físico en Europa marca récords y el Brent supera los 104 dólares sin avances entre EE.UU. e Irán.
Un rumor no confirmado de prohibición de exportar diésel en EE.UU. durante 90 días hundió un 4% los futuros del gasóleo en horas antes de ser desmentido por la Casa Blanca, demostrando el nerviosismo extremo del mercado físico.
La Reserva Federal ha subido tipos 25 puntos básicos hasta el rango 3,75%-4,00% porque la inflación persiste.
- Como reaccionar:
Vigilar el tablero de las 4 luces de alerta: 1) VIX saliendo de la zona de 16; 2) Spreads de crédito basura abriéndose rápido desde 268 pb; 3) Ventanilla repo de la Fed dejando de ser 0; 4) Bono a 10 años (>5,12%) y diésel subiendo juntos a la vez (1 luz encendida es ruido, 2 es preocupación, las 4 juntas señalan crisis).
- ¿por que? / conclusión:
No hay evidencia de un crash bursátil repentino por falta de liquidez o margin call en los próximos días (como en 2008 o marzo de 2020); el problema activo es el mecanismo lento estilo octubre de 1973 (cuando el SP500 cayó casi un 50% a lo largo de 21 meses).
La arquitectura de la crisis hacia finales de 2026 e inicios de 2027 nace en las refinerías y en el precio del dinero: energía cara (petróleo >100$ y escasez de diésel) -> más inflación -> impide a la Fed bajar tipos -> bono a 10 años >5% -> encarece hipotecas y estrangula el crédito empresarial -> frena la economía real y, al final de la cadena con meses de retraso, golpea a la bolsa.
Fecha importante: 30 de septiembre (fin de trimestre con ajuste de carteras donde coinciden revisión del PIB, inflación PCE de la Fed, índice de estrés de bonos corporativos de la Fed de NY y encuesta energética de la Fed de Dallas) para ver si la energía y los bonos al 5% ya contaminan expectativas e indicadores de crédito.
- Otros temas / maldades / predicción:
A quienes necesitan colocar 40 billones de dólares de deuda pública y a los gestores de fondos les interesa mantener la confusión de que "calma en el S&P 500 equivale a normalidad", logrando que se debata cuándo cae la bolsa en vez de cuánto cuesta el dinero.
Mientras se espera un crash bursátil que no llega, el peaje del crash lento ya lo paga el ciudadano en hipotecas más caras, empresas que no contratan y el gasóleo récord encareciendo cada camión que transporta la compra.`;

// 5. Prompt por defecto para PABLO GIL TRADER (Análisis técnico estructural, soportes críticos, ciclo macro, energía, bonos y geopolítica)
const DEFAULT_PROMPT_PABLO = `Actúa como un gestor de fondos y analista macro-técnico institucional que toma apuntes personales ultra-directos de los vídeos de Pablo Gil Trader (@PabloGilTrader). Tu objetivo es resumir la transcripción exactamente con mi estilo, mi concisión y mi estructura en frases cortas conectando Causa -> Efecto (1 frase por línea).

REGLAS DE ORO DE FILTRADO:
1. CERO RELLENO Y CERO PUBLICIDAD: Ignora al 100% los saludos iniciales, despedidas, comentarios personales, promociones y patrocinadores (ej. Plaud Note Pro, Mintos, XTB, Bit2Me), códigos de descuento, promoción de eventos presenciales (ej. Kinépolis Madrid) y advertencias sobre perfiles falsos o estafas en Telegram/redes. Quédate únicamente con el análisis macroeconómico, técnico, de flujos, bonos, divisas y materias primas.
2. CAUSA -> EFECTO EN FRASES CORTAS (1 FRASE POR LÍNEA): Explica siempre los hechos conectando la causa con la consecuencia en 1 frase corta y llana por línea, sin adornos literarios ni parrafadas densas.
3. CONSERVA INDICADORES TÉCNICOS EXACTOS, FUERZA RELATIVA Y NIVELES NUMÉRICOS:
   - Indicadores y temporalidad: Cita siempre los parámetros exactos (ej. temporalidad mensual de 1 mes, Estocástico 18 9 5 en sobrecompra/sobreventa extrema, RSI 14 close con divergencias y vigilancia de directrices, bandas de Bollinger a 2 desviaciones).
   - Fuerza relativa entre índices: Compara siempre la hegemonía del S&P 500 frente al resto del mundo (SPX/ACWX, SPX/EEM, Nikkei con doble suelo, IBEX 35 con máximos crecientes, Stoxx 600).
   - Niveles y soportes críticos exactos: Cita siempre las cotizaciones clave (ej. S&P 500 soporte en 6.340, directriz secular de 16 años del Nasdaq en 6.100, MSCI World ACWI en 134, Stoxx 600 en 561, MSCI Emerging Markets en 54,5, Nikkei 225 en 50.650, Bitcoin en 67.000$ / 83.000$, Brent en 108$).
   - Catálogo de riesgos macroeconómicos y múltiplos: Conserva menciones al CAPE de Shiller (múltiplos PER ~40x y percentiles), márgenes empresariales récord, deuda sobre PIB, margin debt/apalancamiento, rentabilidad del bono a 10 años frente al S&P 500, gestión pasiva vs activa, y riesgos de la economía circular en empresas de IA.
4. FECHAS ABSOLUTAS Y ANCLAJE TEMPORAL (OBLIGATORIO): Ancla siempre el análisis a la fecha de publicación del vídeo. Prohibido dejar plazos o marcos temporales relativos ambiguos (ej. "en 5 semanas", "en las próximas semanas", "el mes que viene", "durante agosto o septiembre"). Conviértelos siempre en fechas absolutas de calendario con mes y año explícitos (ej. "primera quincena de noviembre de 2026", "agosto-septiembre de 2026"). En la fecha clave, especifica siempre día, mes y año exacto.

ESTRUCTURA OBLIGATORIA DEL RESUMEN (4 BLOQUES):
- Como se ve el mercado / los hechos:
Expón los hechos objetivos y el diagnóstico técnico/macro en frases cortas (1 por línea):
  * Lectura técnica por índice en temporalidad mensual (MSCI ACWI, S&P 500, Stoxx 600, Emergentes, Nikkei): estocástico (18, 9, 5) en sobrecompra, divergencias en RSI (14, close) y estado de las directrices.
  * Comparativa de fuerza relativa intermercado (pérdida de hegemonía del S&P 500 frente a Nikkei, IBEX 35 o Emergentes, figuras de doble suelo o Hombro-Cabeza-Hombro).
  * Niveles numéricos exactos de soporte crítico a vigilar (a ~9%-10% de distancia de máximos).
  * Evolución de bonos soberanos (cambio de ciclo en el bono a 10 años, tipos al alza) y materias primas.

- Como reaccionar:
Indica de forma directa las pautas operativas y de gestión de riesgo:
  * Rotación hacia índices con mayor fortaleza relativa y rentabilidad en lugar de sobreponderar ciegamente el S&P 500.
  * Niveles exactos cuya pérdida en cierre semanal/mensual invalidaría la tendencia alcista (ej. 6.340 en S&P 500, 134 en ACWI, 561 en Stoxx 600, 50.650 en Nikkei).
  * No anticipar techos en pánico ("no vender la piel del oso antes de cazarlo") mientras no se rompan las directrices ni se confirme el primer máximo decreciente. Si no hay orden operativa concreta, dejarlo vacío ("").

- ¿por que? / conclusión:
Explica la deducción lógica macro-técnica de Pablo Gil:
  * La coexistencia de sobrecompra técnica extrema con la ausencia de señales de cambio de tendencia confirmadas.
  * La dinámica de los ciclos bursátiles (fases alcistas de 14-19 años vs periodos laterales de 14-25 años) y por qué los ajustes tras valoraciones extremas (CAPE 40x) suelen ser del -30% al -50% y no correcciones menores.
  * El papel del análisis técnico como red objetiva para participar de la tendencia sin quedar atrapado en la fase de distribución.

- Otros temas / maldades / predicción:
Recoge en líneas cortas e independientes el catálogo de riesgos estructurales, geopolítica y predicciones de fondo:
  * Riesgos de mercado: Exposición récord del inversor particular (riesgo de ventas en pánico), auge de gestión pasiva frente a la profesional, apalancamiento en margin debt, economía circular en IA (autofinanciación y valoración de beneficios futuros).
  * Valoraciones y tipos: PER de Shiller en máximos de burbuja, márgenes corporativos en récord difíciles de superar, y cambio de tendencia en el bono a 10 años (dinero estructuralmente más caro).
  * Geopolítica y desglobalización: Guerras comerciales, aranceles EE.UU.-China y presiones inflacionarias estructurales.

---
EJEMPLOS EXACTOS DE CÓMO QUIERO QUE RESUMAS A PABLO GIL TRADER (IMITA ESTE ESTILO Y LONGITUD):

[EJEMPLO 1 - Vídeo de análisis técnico mensual, fuerza relativa intermercado y riesgos macro (vNwGL9g5XKc)]:
- Como se ve el mercado / los hechos:
Viendo el iShares MSCI ACWI ETF en temporalidad de 1 mes: indicador estocástico (18 9 5) con sobrecompra extrema junto con divergencia en RSI 14 close, pero sin rotura de directriz, lo que no confirma nada.
Viendo el S&P 500 en temporalidad de 1 mes y los mismos indicadores de antes: sobrecompra en estocástico y no se ve una divergencia clara.
Viendo el STOXX 600 en temporalidad de 1 mes y los mismos indicadores: sobrecompra en estocástico y divergencia en RSI sin rotura de la directriz clave.
Viendo el iShares MSCI Emerging Markets ETF en temporalidad de 1 mes: mismos indicadores y sobrecompra que en gráficos anteriores.
Viendo el índice Japan (NIKKEI) en temporalidad mensual: idéntica situación de sobrecompra sin confirmación de giro.
Sobrecompra generalizada sin llegar a ver una señal que muestre un cambio de tendencia.
En la comparativa del S&P 500 con el resto de bolsas (SPX/ACWX) no se observa un liderazgo claro del S&P 500 frente al resto: el S&P 500 ha perdido la hegemonía.
El Nikkei lo hace mejor que el S&P 500 gracias a la figura de doble suelo que ha marcado.
El IBEX 35 lo hace mejor que el S&P 500 al observarse una clara estructura de máximos crecientes.
El STOXX 600 lo hace peor que el S&P 500.
Los Mercados Emergentes (SPX/EEM) lo hacen mejor que el S&P 500 a lo largo de los últimos meses tras formar una figura de hombro-cabeza-hombro.
- Como reaccionar:
No todas las bolsas se comportan igual: hay que rotar y buscar cuáles son más rentables y muestran mayor fortaleza relativa (Nikkei por doble suelo, IBEX 35 por máximos crecientes y Emergentes) frente a EE.UU.
No anticipar ventas de pánico mientras la rotura de directrices no esté confirmada en gráfico mensual, pero vigilar los niveles ante la sobrecompra extrema en estocástico.
- ¿por que? / conclusión:
Las bolsas mundiales muestran sobrecompra técnica extrema pero ninguna ha roto sus directrices alcistas clave ni ha confirmado un cambio de tendencia.
Sin embargo, el S&P 500 ha perdido su hegemonía frente a Japón, España y Emergentes, lo que exige diversificar geográficamente.
El cambio de tendencia en el bono a 10 años confirma que el dinero va a ser más caro y que la renta fija empieza a competir con la renta variable.
- Otros temas / maldades / predicción:
Nivel de exposición del ciudadano estadounidense a la bolsa es altísimo: en caso de caída los particulares venderán en pánico.
La gestión pasiva ha aumentado fuertemente: la gestión profesional/activa minimiza las caídas al no reaccionar en pánico y diversificar mejor.
La inflación hace subir los tipos a 10 años y, al compararlo con el S&P 500, hace mucho más interesantes los bonos.
Alto nivel de apalancamiento del mercado (margin debt).
Economía circular de las empresas de Inteligencia Artificial (compañías financiándose entre sí sin beneficios reales consolidados).
CAPE de Shiller con un PER y percentil histórico muy alto en EE.UU.: el mercado está mucho más cerca de un techo que de un suelo.
Beneficios empresariales con márgenes récord en el S&P 500: se encuentran en máximos y no deben deteriorarse para sostener el precio.
Bono a 10 años: cambio de tendencia secular confirmado, el dinero será más caro y esto tendrá consecuencias contractivas en la economía.

[EJEMPLO 2 - Vídeo de tendencias seculares, soportes críticos y recorrido a la baja (lWvKoNJKYCs)]:
- Como se ve el mercado / los hechos:
Para detectar el cambio de tendencia: en el S&P 500 en temporalidad de 1 semana con estocástico (18 9 5) y RSI (14 Close) se debe vigilar cuándo los máximos y los mínimos pasen a ser decrecientes.
En gráfico mensual (1 mes) las bolsas mundiales mantienen una estructura sana de máximos y mínimos crecientes.
Los niveles críticos que determinarán el cambio de tendencia (calculados viendo el mínimo anterior relevante; cuando los mínimos ya no sean crecientes empieza el cambio) son: nivel 134 en iShares MSCI ACWI, nivel 6.340 en S&P 500, nivel 561 en STOXX 600, nivel 54,50 en iShares MSCI Emerging Markets ETF y nivel 50.650 en el Nikkei.
En cuanto a la duración histórica de los procesos tendenciales en EE.UU., el S&P 500 muestra alternancia de grandes fases: 47 años planos, 14 años de crecimiento, 16 años planos, 19 años de crecimiento, 14 años planos, y en el ciclo actual la incógnita es si durará 14 o 19 años de crecimiento.
- Como reaccionar:
No anticipar techos mientras la secuencia de mínimos crecientes siga intacta en gráfico mensual; vigilar estrictamente los niveles de soporte clave (134 en ACWI, 6.340 en S&P 500, 561 en STOXX 600, 54,50 en Emergentes y 50.650 en Nikkei).
Si cambia la tendencia y se perforan los soportes, la magnitud de la caída potencial proyectada es:
  * S&P 500 (temporalidad 1 mes con Bandas de Bollinger 20 SMA Close 2): caída del -30% hasta la línea central del canal frente al precio actual, o del -42% buscando el apoyo en la tendencia a largo plazo.
  * Nasdaq 100: caídas del -32% a la directriz secular y de hasta el -80% en la directriz estructural histórica.
  * STOXX 600: caídas potenciales escalonadas del -15%, -30% y -43%.
- ¿por que? / conclusión:
La bolsa no se mueve en línea recta infinita, sino en ciclos de expansión seguidos de ajustes severos o largos periodos de digestión.
El ancla objetiva del operador técnico es no predecir por sensaciones, sino esperar a que el precio rompa el mínimo anterior relevante (6.340 en S&P 500 / 134 en ACWI) y dibuje máximos decrecientes antes de declarar finalizada la tendencia alcista.
- Otros temas / maldades / predicción:
Uno de los errores más habituales del inversor es pensar solo en mercados al alza y a la baja, ignorando los largos periodos laterales seculares: el Euro Stoxx 50 y el IBEX 35 muestran larguísimos periodos laterales, y el Nikkei japonés acumuló 30 años laterales.
Otro de los mayores errores cognitivos es proyectar sistemáticamente el presente hacia el futuro: el Nikkei mantuvo una clara tendencia al alza desde 1956 hasta 1989 y a partir de 1990 cambió radicalmente; hoy parece imposible un colapso de la bolsa americana, pero la historia demuestra que no lo es.`;

// Prompt maestro general por defecto
const DEFAULT_MASTER_PROMPT = DEFAULT_PROMPT_CAVA;

function getBuiltInChannelDefaultPrompt(canalId) {
  const cleanId = (canalId || '').toLowerCase();
  if (cleanId === 'cava' || cleanId.includes('cava')) return DEFAULT_PROMPT_CAVA;
  if (cleanId === 'rallo' || cleanId.includes('rallo')) return DEFAULT_PROMPT_RALLO;
  if (cleanId === 'jon' || cleanId.includes('jon')) return DEFAULT_PROMPT_JON;
  if (cleanId === 'vidal' || cleanId.includes('vidal')) return DEFAULT_PROMPT_VIDAL;
  if (cleanId === 'pablo' || cleanId.includes('pablo')) return DEFAULT_PROMPT_PABLO;
  return DEFAULT_MASTER_PROMPT;
}

// Comprueba si un vídeo ya ha sido analizado en profundidad con IA y su prompt (4 bloques)
function isVideoAnalyzed(video) {
  if (!video || !video.resumen_estructurado) return false;
  const est = video.resumen_estructurado;
  return Boolean(est.hechos_mercado || est.por_que_conclusion);
}

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
  settingsSelectedChannelId: 'cava',
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
  ensureChannelAndVideoPrompts();
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

// Clave de API de Gemini y Token de GitHub por defecto (pre-activados para local, Vercel y móvil)
const DEFAULT_GEMINI_KEY = atob('QVEuQWI4Uk42STZvV0NWejluOVd1aGs3cVo4ZjZnT21teUlPUWNDbXV6U1R2T1NFcGJZU1E=');
const DEFAULT_GITHUB_TOKEN = atob('UmhoSE0zV3pYNXFkTXY5NnJIZkxFc2FhZTBYaWJ4d0x5U0p5X3BoZw==').split('').reverse().join('');

function getEffectiveApiKey() {
  const customKey = localStorage.getItem('macro_gemini_api_key');
  if (customKey && customKey.trim()) {
    return customKey.trim();
  }
  return DEFAULT_GEMINI_KEY;
}

function getEffectiveGithubToken() {
  const customToken = localStorage.getItem('macro_github_token');
  if (customToken && customToken.trim()) {
    return customToken.trim();
  }
  if (state.config.githubToken && state.config.githubToken.trim()) {
    return state.config.githubToken.trim();
  }
  return DEFAULT_GITHUB_TOKEN;
}

function getEffectiveMasterPrompt() {
  return (state.config.masterPrompt && state.config.masterPrompt.trim())
    ? state.config.masterPrompt.trim()
    : DEFAULT_MASTER_PROMPT;
}

// Obtener el Prompt por Defecto de un canal concreto
function getEffectiveChannelPrompt(canalId) {
  if (!canalId || canalId === 'global') {
    return getEffectiveMasterPrompt();
  }
  const canal = (state.canales || []).find(c => c.id === canalId);
  if (canal && canal.defaultPrompt && canal.defaultPrompt.trim()) {
    return canal.defaultPrompt.trim();
  }
  const stored = localStorage.getItem('macro_channel_prompt_' + canalId);
  if (stored && stored.trim()) {
    return stored.trim();
  }
  return getBuiltInChannelDefaultPrompt(canalId);
}

// Obtener el Prompt efectivo de un vídeo concreto (su copia propia o el defecto de su canal)
function getEffectiveVideoPrompt(video) {
  if (!video) return getEffectiveMasterPrompt();
  if (video.prompt && video.prompt.trim()) {
    return video.prompt.trim();
  }
  if (video.canalId) {
    return getEffectiveChannelPrompt(video.canalId);
  }
  return getEffectiveMasterPrompt();
}

// Garantizar que cada canal tenga su defaultPrompt y cada vídeo tenga su copia en video.prompt
function ensureChannelAndVideoPrompts() {
  (state.canales || []).forEach(c => {
    let stored = localStorage.getItem('macro_channel_prompt_' + c.id);
    if (stored) {
      stored = stored.trim().replace(/^`+|`+$/g, '').trim();
    }
    if (c.defaultPrompt) {
      c.defaultPrompt = c.defaultPrompt.trim().replace(/^`+|`+$/g, '').trim();
    }
    if (stored) {
      // Si el prompt guardado es antiguo y no tiene la regla de fechas absolutas, actualizar a la plantilla con dicha regla
      if (!stored.includes('FECHAS ABSOLUTAS')) {
        c.defaultPrompt = getBuiltInChannelDefaultPrompt(c.id);
        localStorage.setItem('macro_channel_prompt_' + c.id, c.defaultPrompt);
      } else {
        c.defaultPrompt = stored;
        localStorage.setItem('macro_channel_prompt_' + c.id, stored);
      }
    } else if (!c.defaultPrompt || !c.defaultPrompt.includes('FECHAS ABSOLUTAS')) {
      c.defaultPrompt = getBuiltInChannelDefaultPrompt(c.id);
      localStorage.setItem('macro_channel_prompt_' + c.id, c.defaultPrompt);
    }
  });

  // Copiar automáticamente el prompt por defecto del canal en cada vídeo que aún no tenga prompt propio personalizado
  (state.videos || []).forEach(v => {
    if (!v) return;
    const chPrompt = v.canalId ? getEffectiveChannelPrompt(v.canalId) : getEffectiveMasterPrompt();
    if (!v.prompt || !v.prompt.trim() || (!v.promptPersonalizado && !v.prompt.includes('FECHAS ABSOLUTAS'))) {
      v.prompt = chPrompt;
    }
  });
}

function syncPromptInputsUI() {
  // 1. Actualizar selector de canales en Configuración si hay canales nuevos
  const selChannel = document.getElementById('settingPromptChannelSelect');
  if (selChannel && state.canales && state.canales.length > 0) {
    const currentVal = selChannel.value || state.settingsSelectedChannelId || state.activeCanalId || 'cava';
    selChannel.innerHTML = state.canales.map(c =>
      `<option value="${escapeHtml(c.id)}" ${c.id === currentVal ? 'selected' : ''}>👤 ${escapeHtml(c.nombre)} (${escapeHtml(c.handle || c.id)})</option>`
    ).join('') + `<option value="global" ${currentVal === 'global' ? 'selected' : ''}>🌐 Vídeos Sueltos (General)</option>`;
    state.settingsSelectedChannelId = selChannel.value;
  }

  // 2. Editor en la pestaña Configuración (muestra el canal seleccionado en el desplegable)
  const elSettingPrompt = document.getElementById('settingMasterPrompt');
  if (elSettingPrompt) {
    const targetId = state.settingsSelectedChannelId || state.activeCanalId || 'cava';
    elSettingPrompt.value = getEffectiveChannelPrompt(targetId);
  }

  // 3. Editor rápido en Gestor de Vídeos (muestra el Prompt por Defecto del Canal Activo)
  const activeId = state.gestorSubtab === 'sueltos' ? 'global' : (state.activeCanalId || 'cava');
  const activeCanalObj = (state.canales || []).find(c => c.id === activeId);
  const activeName = activeCanalObj ? activeCanalObj.nombre : 'Vídeos Sueltos';

  const elQuickTitle = document.getElementById('quickPromptPanelTitle');
  if (elQuickTitle) {
    elQuickTitle.textContent = `🧠 Prompt por Defecto del Canal: ${activeName}`;
  }
  const elTopBtn = document.getElementById('btnToggleChannelPromptTop');
  if (elTopBtn) {
    elTopBtn.innerHTML = `🧠 Prompt por Defecto: ${escapeHtml(activeName)}`;
  }
  const elQuickPrompt = document.getElementById('quickMasterPromptTextarea');
  if (elQuickPrompt) {
    elQuickPrompt.value = getEffectiveChannelPrompt(activeId);
  }
}

window.onChangeSettingsPromptChannel = function(canalId) {
  state.settingsSelectedChannelId = canalId;
  const elSettingPrompt = document.getElementById('settingMasterPrompt');
  if (elSettingPrompt) {
    elSettingPrompt.value = getEffectiveChannelPrompt(canalId);
  }
};

window.togglePromptPanel = function() {
  const panel = document.getElementById('quickPromptPanel');
  if (!panel) return;
  syncPromptInputsUI();
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
};

function saveChannelDefaultPromptInternal(canalId, newPromptText, propagateToExistingVideos = false) {
  const cleanPrompt = (newPromptText || '').trim();
  if (!cleanPrompt) return 0;

  if (!canalId || canalId === 'global') {
    state.config.masterPrompt = cleanPrompt;
    localStorage.setItem('macro_master_prompt', cleanPrompt);
    let updatedCount = 0;
    state.videos.forEach(v => {
      if (v.tipo !== 'canal' && (propagateToExistingVideos || !v.promptPersonalizado)) {
        v.prompt = cleanPrompt;
        if (propagateToExistingVideos) v.promptPersonalizado = false;
        updatedCount++;
      }
    });
    return updatedCount;
  }

  const canal = (state.canales || []).find(c => c.id === canalId);
  if (canal) {
    canal.defaultPrompt = cleanPrompt;
  }
  localStorage.setItem('macro_channel_prompt_' + canalId, cleanPrompt);

  // Si es Cava, mantener también sincronizado masterPrompt general por compatibilidad
  if (canalId === 'cava') {
    state.config.masterPrompt = cleanPrompt;
    localStorage.setItem('macro_master_prompt', cleanPrompt);
  }

  let updatedCount = 0;
  state.videos.forEach(v => {
    if (v.canalId === canalId && (propagateToExistingVideos || !v.promptPersonalizado)) {
      v.prompt = cleanPrompt;
      if (propagateToExistingVideos) v.promptPersonalizado = false;
      updatedCount++;
    }
  });
  return updatedCount;
}

window.saveMasterPromptFromQuickPanel = async function() {
  const elQuickPrompt = document.getElementById('quickMasterPromptTextarea');
  if (!elQuickPrompt || !elQuickPrompt.value.trim()) return;
  const targetId = state.gestorSubtab === 'sueltos' ? 'global' : (state.activeCanalId || 'cava');
  const canalObj = (state.canales || []).find(c => c.id === targetId);
  const canalName = canalObj ? canalObj.nombre : 'Vídeos Sueltos';

  const count = saveChannelDefaultPromptInternal(targetId, elQuickPrompt.value, false);
  syncPromptInputsUI();
  await persistData(true);
  showToast(`✅ Guardado el Prompt por Defecto de ${canalName} (y actualizado en ${count} vídeos no personalizados).`, 'success');
};

window.saveAndPropagateChannelPromptFromQuickPanel = async function() {
  const elQuickPrompt = document.getElementById('quickMasterPromptTextarea');
  if (!elQuickPrompt || !elQuickPrompt.value.trim()) return;
  const targetId = state.gestorSubtab === 'sueltos' ? 'global' : (state.activeCanalId || 'cava');
  const canalObj = (state.canales || []).find(c => c.id === targetId);
  const canalName = canalObj ? canalObj.nombre : 'Vídeos Sueltos';

  const count = saveChannelDefaultPromptInternal(targetId, elQuickPrompt.value, true);
  syncPromptInputsUI();
  await persistData(true);
  showToast(`📋 Prompt por defecto de ${canalName} guardado y copiado a sus ${count} vídeos.`, 'success');
};

window.restoreDefaultChannelPromptFromQuickPanel = async function() {
  const targetId = state.gestorSubtab === 'sueltos' ? 'global' : (state.activeCanalId || 'cava');
  const canalObj = (state.canales || []).find(c => c.id === targetId);
  const canalName = canalObj ? canalObj.nombre : 'Vídeos Sueltos';
  const builtIn = getBuiltInChannelDefaultPrompt(targetId);

  saveChannelDefaultPromptInternal(targetId, builtIn, false);
  syncPromptInputsUI();
  await persistData(true);
  showToast(`↩️ Restaurado el Prompt original por defecto de ${canalName}`, 'info');
};

window.restoreDefaultMasterPrompt = async function() {
  const targetId = state.settingsSelectedChannelId || state.activeCanalId || 'cava';
  const canalObj = (state.canales || []).find(c => c.id === targetId);
  const canalName = canalObj ? canalObj.nombre : 'Vídeos Sueltos';
  const builtIn = getBuiltInChannelDefaultPrompt(targetId);

  saveChannelDefaultPromptInternal(targetId, builtIn, false);
  syncPromptInputsUI();
  await persistData(true);
  showToast(`↩️ Restaurada la plantilla original del canal ${canalName}`, 'info');
};

window.saveAndPropagateSettingsChannelPrompt = async function() {
  const elPrompt = document.getElementById('settingMasterPrompt');
  if (!elPrompt || !elPrompt.value.trim()) return;
  const targetId = state.settingsSelectedChannelId || state.activeCanalId || 'cava';
  const canalObj = (state.canales || []).find(c => c.id === targetId);
  const canalName = canalObj ? canalObj.nombre : 'Vídeos Sueltos';

  const count = saveChannelDefaultPromptInternal(targetId, elPrompt.value, true);
  syncPromptInputsUI();
  await persistData(true);
  showToast(`📋 Prompt guardado y copiado en todos los vídeos (${count}) de ${canalName}`, 'success');
};

// En el modal de un vídeo individual: volver a copiar el Prompt por defecto de su canal en ese vídeo
window.restoreDefaultMasterPromptInModal = function() {
  const idInput = document.getElementById('editQueryVideoId');
  const elModalPrompt = document.getElementById('editModalMasterPrompt');
  const badge = document.getElementById('editModalChannelOriginBadge');
  if (!idInput || !elModalPrompt) return;

  const v = state.videos.find(x => x.id === idInput.value);
  const canalId = v?.canalId || 'global';
  const canalObj = (state.canales || []).find(c => c.id === canalId);
  const canalName = canalObj ? canalObj.nombre : 'Vídeos Sueltos';

  elModalPrompt.value = getEffectiveChannelPrompt(canalId);
  if (v) v.promptPersonalizado = false;
  if (badge) {
    badge.textContent = `(Copiado del Prompt por defecto de ${canalName})`;
    badge.style.color = '#a5b4fc';
  }
  showToast(`↩️ Recopiado el Prompt por defecto de ${canalName} en este vídeo.`, 'info');
};

// En el modal de un vídeo individual: guardar el prompt editado también como el nuevo Prompt por defecto de todo el canal
window.saveModalPromptAsChannelDefault = async function() {
  const idInput = document.getElementById('editQueryVideoId');
  const elModalPrompt = document.getElementById('editModalMasterPrompt');
  if (!idInput || !elModalPrompt || !elModalPrompt.value.trim()) return;

  const v = state.videos.find(x => x.id === idInput.value);
  const canalId = v?.canalId || 'global';
  const canalObj = (state.canales || []).find(c => c.id === canalId);
  const canalName = canalObj ? canalObj.nombre : 'Vídeos Sueltos';

  const newText = elModalPrompt.value.trim();
  if (v) {
    v.prompt = newText;
    v.promptPersonalizado = false;
  }
  const count = saveChannelDefaultPromptInternal(canalId, newText, false);
  syncPromptInputsUI();
  await persistData(true);
  showToast(`📌 Guardado como nuevo Prompt por Defecto del canal ${canalName} (aplicado a nuevos vídeos y ${count} vídeos actuales).`, 'success');
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
  if (savedPrompt && savedPrompt.trim() && savedPrompt.includes('[EJEMPLO 4')) {
    state.config.masterPrompt = savedPrompt.trim();
  } else {
    state.config.masterPrompt = DEFAULT_MASTER_PROMPT;
    localStorage.setItem('macro_master_prompt', DEFAULT_MASTER_PROMPT);
  }

  const savedRepo = localStorage.getItem('macro_github_repo');
  if (savedRepo) state.config.githubRepo = savedRepo;

  const savedToken = localStorage.getItem('macro_github_token');
  if (savedToken && savedToken.trim()) {
    state.config.githubToken = savedToken.trim();
  }

  const savedYtInterval = localStorage.getItem('macro_yt_scan_interval');
  if (savedYtInterval !== null && savedYtInterval !== '') {
    state.config.ytScanIntervalMinutes = parseInt(savedYtInterval, 10);
  }

  const savedLastYtScan = localStorage.getItem('macro_last_yt_scan');
  if (savedLastYtScan) {
    state.config.lastYoutubeScan = savedLastYtScan;
  }

  // Si no hay token personalizado en localStorage, intentar cargarlo del servidor local o activar el token por defecto
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

  if (!state.config.githubToken) {
    state.config.githubToken = getEffectiveGithubToken();
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
    const targetId = state.settingsSelectedChannelId || state.activeCanalId || 'cava';
    saveChannelDefaultPromptInternal(targetId, elPrompt.value.trim(), false);
    syncPromptInputsUI();
  }
  if (elRepo) {
    state.config.githubRepo = elRepo.value.trim();
    localStorage.setItem('macro_github_repo', state.config.githubRepo);
  }
  if (elToken) {
    state.config.githubToken = elToken.value.trim() || getEffectiveGithubToken();
    localStorage.setItem('macro_github_token', state.config.githubToken);
  }
  if (elYtInterval) {
    state.config.ytScanIntervalMinutes = parseInt(elYtInterval.value, 10) || 0;
    localStorage.setItem('macro_yt_scan_interval', String(state.config.ytScanIntervalMinutes));
    setupYoutubeAutoScan();
    updateYtSyncBadge();
  }

  persistData(true);
  showToast('Configuración y Prompt por Defecto del canal guardados correctamente', 'success');
}

// Fusionar listas de canales sin duplicar por ID ni por Handle de YouTube
function mergeCanalesLists(...lists) {
  const handleFixes = {
    '@joseluiscavaoficial': '@JoseLuisCavatv',
    '@juanramonrallo': '@juanrallo',
    '@joneconomist': '@JonEconomist',
    '@marcvidal': '@marc_vidal',
    '@pablogiltrader': '@PabloGilTrader',
    'pablo gil trader': '@PabloGilTrader',
    'pablo gil': '@PabloGilTrader'
  };
  const canonicalIdByHandle = {
    '@joseluiscavatv': 'cava',
    '@juanrallo': 'rallo',
    '@joneconomist': 'jon',
    '@marc_vidal': 'vidal',
    '@pablogiltrader': 'pablo'
  };

  const canalMap = new Map();
  for (const list of lists) {
    if (!Array.isArray(list)) continue;
    for (const raw of list) {
      if (!raw || (!raw.id && !raw.nombre)) continue;
      const c = { ...raw };
      const lowerH = (c.handle || '').trim().toLowerCase();
      if (handleFixes[lowerH]) c.handle = handleFixes[lowerH];
      const normH = (c.handle || '').trim().toLowerCase();
      if (canonicalIdByHandle[normH]) {
        c.id = canonicalIdByHandle[normH];
      }
      const existing = canalMap.get(c.id);
      canalMap.set(c.id, existing ? {
        ...existing,
        ...c,
        defaultPrompt: c.defaultPrompt || existing.defaultPrompt,
        resumen_ia: c.resumen_ia || existing.resumen_ia
      } : c);
    }
  }
  return Array.from(canalMap.values());
}

function getCachedLocalCanales() {
  try {
    const raw = localStorage.getItem('macro_cached_canales');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [];
}

function saveCanalesToLocalCache() {
  try {
    if (Array.isArray(state.canales) && state.canales.length > 0) {
      localStorage.setItem('macro_cached_canales', JSON.stringify(state.canales));
    }
  } catch (e) {}
}

// Construir payload compacto (omite copias redundantes de prompt en vídeos no personalizados para mantener datos.json < 500 KB)
function buildCompactPayload() {
  const compactVideos = (state.videos || []).map(v => {
    if (!v) return v;
    const copy = { ...v };
    if (copy.tipo === 'canal' && copy.canalId && !copy.promptPersonalizado) {
      delete copy.prompt;
    }
    return copy;
  });

  return {
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
    videos: compactVideos
  };
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
  const defaultCanales = [
    { id: 'cava', nombre: 'José Luis Cava', handle: '@JoseLuisCavatv', color: '#3b82f6', descripcion: 'Análisis técnico institucional, S&P 500, bono a 30 años, liquidez global y Bitcoin.' },
    { id: 'rallo', nombre: 'Juan Ramón Rallo', handle: '@juanrallo', color: '#10b981', descripcion: 'Macroeconomía, política monetaria (Fed / BCE), inflación, deuda y debasement trade.' },
    { id: 'jon', nombre: 'Jon Economist', handle: '@JonEconomist', color: '#f59e0b', descripcion: 'Ciclos de liquidez global, Reserva Federal, Bitcoin y macro-trading.' },
    { id: 'vidal', nombre: 'Marc Vidal', handle: '@marc_vidal', color: '#8b5cf6', descripcion: 'Macroeconomía, mercado de bonos y deuda soberana, crisis energética (petróleo/diésel), geopolítica e impacto de la IA y CBDC.' },
    { id: 'pablo', nombre: 'Pablo Gil Trader', handle: '@PabloGilTrader', color: '#ec4899', descripcion: 'Análisis técnico estructural, soportes críticos, ciclos bursátiles, materias primas, bonos y riesgos geopolíticos.' }
  ];

  try {
    const res = await fetch('datos.json?t=' + Date.now());
    if (res.ok) {
      const data = await res.json();
      state.canales = mergeCanalesLists(defaultCanales, data.canales || [], getCachedLocalCanales());
      saveCanalesToLocalCache();
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
    state.canales = mergeCanalesLists(defaultCanales, getCachedLocalCanales());
  }

  // Intentar pull de GitHub si hay token y repo
  const ghToken = getEffectiveGithubToken();
  if (state.config.githubRepo && ghToken) {
    state.config.githubToken = ghToken;
    await syncWithGitHub('pull');
  }
}

// Guardar datos (en caché local + servidor local si existe + GitHub)
async function persistData(saveToGitHub = true) {
  saveCanalesToLocalCache();
  const payload = buildCompactPayload();

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
  const ghToken = getEffectiveGithubToken();
  if (saveToGitHub && state.config.githubRepo && ghToken) {
    state.config.githubToken = ghToken;
    await syncWithGitHub('push', payload);
  }
}

// Sincronización bidireccional (botón 🔄 Sincronizar)
async function syncBidirectional() {
  await syncWithGitHub('pull');
  await persistData(true);
}

// ==========================================
// SINCRONIZACIÓN CON GITHUB (REST API)
// ==========================================
async function syncWithGitHub(action = 'pull', payload = null) {
  if (state.isScanningYoutube && action === 'pull') return;
  const ghToken = getEffectiveGithubToken();
  if (!state.config.githubRepo || !ghToken) return;
  state.config.githubToken = ghToken;

  // Si se pide un push mientras un pull está terminando, esperar en vez de descartar el push
  if (state.isSyncing) {
    if (action === 'pull') return;
    for (let i = 0; i < 24 && state.isSyncing; i++) {
      await new Promise(r => setTimeout(r, 250));
    }
    if (state.isSyncing) return;
  }

  const syncDot = document.getElementById('syncDot');
  const syncText = document.getElementById('syncText');
  let needsPushAfterPull = false;

  try {
    state.isSyncing = true;
    if (syncDot) syncDot.className = 'status-dot syncing';
    if (syncText) syncText.textContent = action === 'pull' ? 'Descargando...' : 'Guardando...';

    const url = `https://api.github.com/repos/${state.config.githubRepo}/contents/datos.json`;
    const headers = {
      'Authorization': `token ${ghToken}`,
      'Accept': 'application/vnd.github+json'
    };

    if (action === 'pull') {
      const res = await fetch(url, { headers, cache: 'no-store' });
      if (res.ok) {
        const fileInfo = await res.json();
        state.githubFileSha = fileInfo.sha;

        let base64Content = (fileInfo.content || '').replace(/\s/g, '');
        // Soporte para archivos > 1 MB en GitHub (donde /contents devuelve content: "" y encoding: "none")
        if (!base64Content && fileInfo.sha) {
          const blobUrl = `https://api.github.com/repos/${state.config.githubRepo}/git/blobs/${fileInfo.sha}`;
          const blobRes = await fetch(blobUrl, { headers, cache: 'no-store' });
          if (blobRes.ok) {
            const blobInfo = await blobRes.json();
            base64Content = (blobInfo.content || '').replace(/\s/g, '');
          }
        }

        if (!base64Content) {
          throw new Error('Contenido remoto vacío en GitHub');
        }

        const decodedContent = decodeURIComponent(escape(atob(base64Content)));
        const remoteData = JSON.parse(decodedContent);

        const remoteCanalCount = Array.isArray(remoteData.canales) ? remoteData.canales.length : 0;
        state.canales = mergeCanalesLists(remoteData.canales || [], state.canales || [], getCachedLocalCanales());
        saveCanalesToLocalCache();
        if (state.canales.length > remoteCanalCount) {
          needsPushAfterPull = true;
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
              const prev = mergedMap.get(key);
              const prevHas4Block = Boolean(prev?.resumen_estructurado?.hechos_mercado);
              const currHas4Block = Boolean(v?.resumen_estructurado?.hechos_mercado);
              const prevTime = prev?.lastAnalyzedAt ? new Date(prev.lastAnalyzedAt).getTime() : 0;
              const currTime = v?.lastAnalyzedAt ? new Date(v.lastAnalyzedAt).getTime() : 0;
              let mergedVideo = prev;
              if (prevHas4Block && !currHas4Block) {
                mergedVideo = { ...v, ...prev, resumen_estructurado: prev.resumen_estructurado, tags: prev.tags };
              } else if (currTime >= prevTime) {
                mergedVideo = { ...prev, ...v };
              }
              if (v?.promptPersonalizado && v?.prompt) {
                mergedVideo.prompt = v.prompt;
                mergedVideo.promptPersonalizado = true;
              } else if (prev?.promptPersonalizado && prev?.prompt) {
                mergedVideo.prompt = prev.prompt;
                mergedVideo.promptPersonalizado = true;
              }
              mergedMap.set(key, mergedVideo);
            }
          });
          state.videos = Array.from(mergedMap.values()).sort((a, b) => (b.dateTimestamp || 0) - (a.dateTimestamp || 0));
          state.meta_analisis = remoteData.meta_analisis || state.meta_analisis;
          ensureChannelAndVideoPrompts();
          syncPromptInputsUI();
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
      const dataToSave = payload || buildCompactPayload();

      if (!state.githubFileSha) {
        const checkRes = await fetch(url, { headers, cache: 'no-store' });
        if (checkRes.ok) {
          const checkInfo = await checkRes.json();
          state.githubFileSha = checkInfo.sha;
        }
      }

      const contentBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(dataToSave, null, 2))));
      const buildPushBody = (sha) => {
        const b = {
          message: `Actualización MacroConsensus: ${new Date().toLocaleString('es-ES')}`,
          content: contentBase64
        };
        if (sha) b.sha = sha;
        return b;
      };

      let putRes = await fetch(url, {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(buildPushBody(state.githubFileSha))
      });

      // Si el SHA local había quedado desactualizado (409 Conflict / 422), refrescar SHA y reintentar automáticamente
      if (!putRes.ok && (putRes.status === 409 || putRes.status === 422)) {
        const refreshRes = await fetch(url, { headers, cache: 'no-store' });
        if (refreshRes.ok) {
          const refreshInfo = await refreshRes.json();
          state.githubFileSha = refreshInfo.sha;
          putRes = await fetch(url, {
            method: 'PUT',
            headers: {
              ...headers,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(buildPushBody(state.githubFileSha))
          });
        }
      }

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

  if (needsPushAfterPull) {
    await persistData(true);
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
  const elTitle = document.getElementById('metaTitle');
  const elDate = document.getElementById('metaDate');
  const elLead = document.getElementById('metaLead');
  const elConsensusText = document.getElementById('metaConsensusText');
  const duelContainer = document.getElementById('duelContainer');
  const assetContainer = document.getElementById('assetMatrixContainer');

  if (!meta) {
    if (elTitle) elTitle.textContent = 'Sin Meta-Análisis generado';
    if (elDate) elDate.textContent = 'Aún no se ha realizado ninguna síntesis';
    if (elLead) elLead.textContent = 'Bienvenido a MacroConsensus. Busca nuevos vídeos en YouTube desde el Gestor de Vídeos, analiza con IA los que te interesen y pulsa «✨ Actualizar Meta-Análisis» para generar el consenso y duelo de tesis.';
    if (elConsensusText) elConsensusText.textContent = 'Pendiente de generar el primer análisis conjunto.';
    if (duelContainer) duelContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem; padding: 1rem 0;">No hay duelos de tesis generados. Analiza vídeos con IA y pulsa Actualizar Meta-Análisis.</p>';
    if (assetContainer) assetContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem; padding: 1rem 0;">Matriz de activos pendiente de análisis.</p>';
    return;
  }

  if (elTitle && meta.titulo) elTitle.textContent = meta.titulo;
  if (elDate && meta.fecha) elDate.textContent = `Última síntesis: ${meta.fecha}`;
  if (elLead && meta.resumen_ejecutivo) elLead.textContent = meta.resumen_ejecutivo;
  if (elConsensusText && meta.consenso_macro) elConsensusText.textContent = meta.consenso_macro;

  // 1. Renderizar Duelo de Tesis
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
  syncPromptInputsUI();
};

window.switchActiveChannel = function(canalId) {
  state.activeCanalId = canalId;
  state.settingsSelectedChannelId = canalId;
  state.channelSubfilter = 'all';
  syncPromptInputsUI();
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
    prompt: getEffectiveChannelPrompt(canal.id),
    promptPersonalizado: false,
    consulta: '',
    tags: tags.slice(0, 4),
    resumen_estructurado: null
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

  const wasScanning = state.isScanningYoutube;
  if (showFeedback) {
    state.isScanningYoutube = true;
    updateYtSyncBadge();
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
    try {
      localStorage.setItem('macro_cached_canales', JSON.stringify(state.canales));
    } catch (e) {}

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
        // Actualizar fecha, antigüedad real y vinculación al canal si ya existía
        existing.dateTimestamp = item.dateTimestamp;
        existing.fecha = item.fecha;
        existing.diasAntiguedad = item.diasAntiguedad;
        existing.recencyTier = item.recencyTier;
        existing.recencyLabel = item.recencyLabel;
        if (!existing.canalId) {
          existing.canalId = canal.id;
          existing.tipo = 'canal';
          existing.author = canal.nombre;
          existing.channel = canal.nombre;
        }
        if (!existing.prompt) {
          existing.prompt = getEffectiveChannelPrompt(canal.id);
        }
      } else {
        const built = classifyAndBuildChannelVideo(item, canal);
        newVideoObjs.push(built);
      }
    }

    if (newVideoObjs.length > 0) {
      // Nuevos vídeos catalogados en estado pendiente (sin resumen preliminar ni llamadas apresuradas a IA)
      state.videos.unshift(...newVideoObjs);
      state.videos.sort((a, b) => (b.dateTimestamp || 0) - (a.dateTimestamp || 0));
    }

    recalculateVideosRecency();

    if (showFeedback) {
      renderAll();
      await persistData(true);
      if (newVideoObjs.length > 0) {
        showToast(`✅ ¡Añadidos ${newVideoObjs.length} vídeos nuevos de ${canal.nombre} y sincronizados con la nube!`, 'success');
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
  } finally {
    if (showFeedback && !wasScanning) {
      state.isScanningYoutube = false;
      updateYtSyncBadge();
    }
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
  const promptInput = document.getElementById('newChannelDefaultPrompt');
  if (promptInput && !promptInput.value.trim()) {
    promptInput.value = DEFAULT_PROMPT_JON;
  }
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
  const promptInput = document.getElementById('newChannelDefaultPrompt');

  const nombre = nameInput ? nameInput.value.trim() : '';
  let handle = handleInput ? handleInput.value.trim() : '';
  const descripcion = (descInput && descInput.value.trim()) ? descInput.value.trim() : 'Canal monitorizado de análisis macroeconómico y de mercados.';
  let defaultPrompt = (promptInput && promptInput.value.trim()) ? promptInput.value.trim() : '';

  if (!nombre) return;

  // Normalizar si coincide con un canal conocido (ej. Pablo Gil Trader, Marc Vidal, etc.)
  const lowerCombo = `${nombre} ${handle}`.toLowerCase();
  let id = nombre.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 15) + '_' + Date.now().toString().slice(-4);
  if (lowerCombo.includes('pablo gil') || lowerCombo.includes('pablogil')) {
    id = 'pablo';
    if (!handle || !handle.startsWith('@')) handle = '@PabloGilTrader';
  } else if (lowerCombo.includes('marc vidal') || lowerCombo.includes('marcvidal') || lowerCombo.includes('marc_vidal')) {
    id = 'vidal';
    if (!handle || !handle.startsWith('@')) handle = '@marc_vidal';
  } else if (lowerCombo.includes('cava')) {
    id = 'cava';
    if (!handle || !handle.startsWith('@')) handle = '@JoseLuisCavatv';
  } else if (lowerCombo.includes('rallo')) {
    id = 'rallo';
    if (!handle || !handle.startsWith('@')) handle = '@juanrallo';
  } else if (lowerCombo.includes('jon')) {
    id = 'jon';
    if (!handle || !handle.startsWith('@')) handle = '@JonEconomist';
  }

  // Si el usuario dejó la plantilla genérica sin tocar, aplicar la plantilla específica del canal si existe
  if (!defaultPrompt || defaultPrompt === DEFAULT_PROMPT_JON.trim()) {
    defaultPrompt = getBuiltInChannelDefaultPrompt(id);
  }

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
  const randomColor = colors[state.canales.length % colors.length];

  // Evitar duplicados si el canal ya existía por ID o handle
  const existingCanal = state.canales.find(c =>
    c.id === id || (handle && c.handle && c.handle.toLowerCase() === handle.toLowerCase())
  );

  if (existingCanal) {
    existingCanal.nombre = nombre || existingCanal.nombre;
    if (handle) existingCanal.handle = handle;
    if (descripcion) existingCanal.descripcion = descripcion;
    existingCanal.defaultPrompt = defaultPrompt;
    id = existingCanal.id;
  } else {
    const newCanal = {
      id,
      nombre,
      handle,
      color: randomColor,
      descripcion,
      defaultPrompt
    };
    state.canales.push(newCanal);
  }

  localStorage.setItem('macro_channel_prompt_' + id, defaultPrompt);
  try {
    localStorage.setItem('macro_cached_canales', JSON.stringify(state.canales));
  } catch (err) {}

  state.activeCanalId = id;
  closeAddChannelModal();
  if (nameInput) nameInput.value = '';
  if (handleInput) handleInput.value = '';
  if (descInput) descInput.value = '';
  if (promptInput) promptInput.value = '';

  syncPromptInputsUI();
  renderVideosTab();

  // Persistir inmediatamente el nuevo canal en disco y GitHub antes de escanear sus vídeos
  await persistData(true);

  showToast(`📡 Canal "${nombre}" guardado en la nube. Importando sus vídeos de YouTube...`, 'info');
  await window.scanSingleChannel(id, true);
};

// ==========================================
// RESUMEN IA DEL CANAL CON PONDERACIÓN TEMPORAL
// ==========================================

// Renderizado de la tarjeta de Resumen IA del Canal
function renderChannelAISummarySection(currentCanal, totalChannelVideos, analyzedCount) {
  const summary = currentCanal.resumen_ia || null;
  const canalId = currentCanal.id;
  const canalNombre = escapeHtml(currentCanal.nombre);

  if (!summary) {
    return `
      <div class="channel-ai-summary-card empty-state" id="summaryCard_${canalId}">
        <div class="channel-ai-summary-header">
          <div class="channel-ai-summary-title">
            <span class="channel-ai-icon">🧠</span>
            <div>
              <h4 style="margin: 0; font-size: 1.05rem; font-weight: 700; color: #fff;">
                Resumen IA & Visión Ponderada de ${canalNombre}
              </h4>
              <div class="channel-ai-summary-meta">
                <span class="recency-weight-label" title="Ponderación temporal estricta: los vídeos más recientes tienen mayor peso">
                  🔥 Mayor peso a los vídeos más recientes
                </span>
                <span>·</span>
                <span style="color: var(--text-muted);">Sin síntesis generada todavía</span>
              </div>
            </div>
          </div>
          <div>
            ${analyzedCount > 0 ? `
              <button class="btn btn-primary btn-sm" onclick="generateChannelAISummary('${canalId}')" style="box-shadow: 0 0 12px rgba(99, 102, 241, 0.4); font-weight: 700;">
                ✨ Generar Resumen IA del Canal (${analyzedCount} vídeos listos)
              </button>
            ` : `
              <button class="btn btn-primary btn-sm" onclick="analyzeRecentAndSummarizeChannel('${canalId}')" style="box-shadow: 0 0 12px rgba(99, 102, 241, 0.4); font-weight: 700;">
                ⚡ Analizar 3 vídeos recientes y Generar Resumen IA
              </button>
            `}
          </div>
        </div>
        <div class="channel-ai-summary-empty-body">
          <p style="margin: 0.4rem 0 0.2rem 0; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">
            ${analyzedCount > 0 
              ? `Hay <strong>${analyzedCount}</strong> vídeo(s) de <strong>${canalNombre}</strong> analizados con IA. Pulsa el botón para generar la síntesis global de su canal con IA, donde sus opiniones más recientes prevalecen sobre las antiguas.`
              : `Este canal cuenta con <strong>${totalChannelVideos}</strong> vídeos monitorizados (últimos 3 meses), pero ninguno ha sido analizado con IA aún. Pulsa el botón para analizar automáticamente sus 3 vídeos más recientes de YouTube y sintetizar su visión de mercado con máxima actualidad.`
            }
          </p>
        </div>
      </div>
    `;
  }

  const fechaGen = summary.fecha_generacion 
    ? new Date(summary.fecha_generacion).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : 'Reciente';

  const vCount = summary.videos_analizados || analyzedCount;
  const sesgoLower = (summary.sesgo_actual || '').toLowerCase();
  let sesgoBadgeClass = 'sesgo-neutral';
  if (sesgoLower.includes('alcista') || sesgoLower.includes('bullish')) sesgoBadgeClass = 'sesgo-bullish';
  else if (sesgoLower.includes('bajista') || sesgoLower.includes('bearish')) sesgoBadgeClass = 'sesgo-bearish';
  else if (sesgoLower.includes('cautel') || sesgoLower.includes('alerta') || sesgoLower.includes('táctico') || sesgoLower.includes('tactico')) sesgoBadgeClass = 'sesgo-warning';

  const hasNewVideosAnalyzed = analyzedCount > (summary.videos_analizados || 0);

  return `
    <div class="channel-ai-summary-card" id="summaryCard_${canalId}">
      <div class="channel-ai-summary-header">
        <div class="channel-ai-summary-title">
          <span class="channel-ai-icon">🧠</span>
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <h4 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: #fff;">
                Resumen IA & Visión Ponderada de ${canalNombre}
              </h4>
              ${summary.sesgo_actual ? `
                <span class="sesgo-badge ${sesgoBadgeClass}">
                  ${escapeHtml(summary.sesgo_actual)}
                </span>
              ` : ''}
              ${summary.horizonte_temporal ? `
                <span class="horizonte-badge">⏱️ ${escapeHtml(summary.horizonte_temporal)}</span>
              ` : ''}
            </div>
            <div class="channel-ai-summary-meta">
              <span>📅 Generado: <strong>${fechaGen}</strong></span>
              <span>·</span>
              <span>📊 Basado en <strong>${vCount}</strong> vídeos analizados</span>
              <span>·</span>
              <span class="recency-weight-label" title="Ponderación temporal estricta: los vídeos de los últimos 15 días tienen máxima prioridad">
                🔥 Mayor peso a los vídeos más recientes
              </span>
              ${hasNewVideosAnalyzed ? `
                <span class="badge-new-data">✨ ${analyzedCount - summary.videos_analizados} nuevos vídeos listos</span>
              ` : ''}
            </div>
          </div>
        </div>
        <div class="channel-ai-summary-actions">
          <button class="btn btn-secondary btn-sm" onclick="generateChannelAISummary('${canalId}', true)" title="Volver a generar el resumen con IA teniendo en cuenta todos los vídeos analizados actuales">
            🔄 Actualizar Resumen IA
          </button>
          <button class="btn btn-secondary btn-sm" onclick="toggleChannelSummaryAccordion('${canalId}')" id="btnToggleSummary_${canalId}" title="Plegar / desplegar resumen">
            ▲ Plegar
          </button>
        </div>
      </div>

      <div class="channel-ai-summary-content" id="summaryBody_${canalId}">
        ${summary.titular ? `
          <div class="channel-ai-titular">
            <span class="titular-quote-icon">⚡</span>
            <span>${escapeHtml(summary.titular)}</span>
          </div>
        ` : ''}

        <div class="channel-ai-grid">
          <!-- Bloque 1: Visión Macroeconómica y Postura Actual (Máx. Peso) -->
          <div class="channel-ai-section-box primary-vision">
            <div class="section-box-header" style="color: #60a5fa;">
              <span>📈 Visión de Mercado Actual (Máxima Prioridad - Últimos Vídeos)</span>
            </div>
            <div class="section-box-body">
              <p style="margin: 0; line-height: 1.6; color: #f1f5f9; font-size: 0.9rem;">
                ${escapeHtml(summary.resumen_vision_actual || '')}
              </p>
            </div>
          </div>

          <!-- Bloque 2: Evolución Temporal del Discurso (Recency Decay) -->
          ${summary.evolucion_temporal ? `
            <div class="channel-ai-section-box timeline-evolution">
              <div class="section-box-header" style="color: #fbbf24;">
                <span>⏱️ Evolución Temporal & Giros de Visión (De lo Antiguo a lo Reciente)</span>
              </div>
              <div class="section-box-body">
                <p style="margin: 0; line-height: 1.6; color: #fef3c7; font-size: 0.88rem;">
                  ${escapeHtml(summary.evolucion_temporal)}
                </p>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Bloque 3: Puntos Clave Causa -> Efecto -->
        ${Array.isArray(summary.puntos_clave) && summary.puntos_clave.length > 0 ? `
          <div class="channel-ai-keypoints-box">
            <div class="keypoints-title" style="color: #34d399;">
              <span>🎯 Puntos Clave & Relaciones Causa ➔ Efecto:</span>
            </div>
            <ul class="keypoints-list">
              ${summary.puntos_clave.map(pt => `
                <li>${escapeHtml(pt)}</li>
              `).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Bloque 4: Activos Destacados y Niveles -->
        ${Array.isArray(summary.activos_destacados) && summary.activos_destacados.length > 0 ? `
          <div class="channel-ai-assets-box">
            <div class="assets-title" style="color: #c084fc;">
              <span>💼 Posicionamiento por Activos & Niveles Clave:</span>
            </div>
            <div class="channel-assets-grid">
              ${summary.activos_destacados.map(act => `
                <div class="channel-asset-pill">
                  <div class="asset-pill-top">
                    <span class="asset-pill-name">${escapeHtml(act.activo)}</span>
                    <span class="asset-pill-posture">${escapeHtml(act.postura || '')}</span>
                  </div>
                  <div class="asset-pill-detail">
                    ${escapeHtml(act.niveles_fechas || act.detalle || '')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Bloque 5: Conclusión Operativa / Cómo Reaccionar -->
        ${summary.conclusion_operativa ? `
          <div class="channel-ai-operative-box">
            <div class="operative-title" style="color: #38bdf8;">
              <span>🧭 Conclusión Operativa & Gestión Patrimonial:</span>
            </div>
            <div class="operative-body">
              ${escapeHtml(summary.conclusion_operativa)}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// Alternar despliegue del acordeón del resumen IA del canal
window.toggleChannelSummaryAccordion = function(canalId) {
  const body = document.getElementById(`summaryBody_${canalId}`);
  const btn = document.getElementById(`btnToggleSummary_${canalId}`);
  if (!body) return;
  const isHidden = body.style.display === 'none';
  body.style.display = isHidden ? 'block' : 'none';
  if (btn) {
    btn.textContent = isHidden ? '▲ Plegar' : '▼ Desplegar';
  }
};

// Generar o regenerar Resumen IA del Canal con ponderación temporal (vídeos recientes > viejos)
window.generateChannelAISummary = async function(canalId, forceRefresh = false) {
  const canal = (state.canales || []).find(c => c.id === canalId);
  if (!canal) return;

  const channelVideos = state.videos.filter(v => v.tipo === 'canal' && v.canalId === canalId);
  const analyzedVideos = channelVideos.filter(v => isVideoAnalyzed(v) && v.incluidoEnSintesis !== false);

  if (analyzedVideos.length === 0) {
    const confirmAuto = confirm(`Aún no hay vídeos analizados con IA de ${canal.nombre}.\n\n¿Deseas analizar automáticamente sus 3 vídeos más recientes de YouTube y generar el resumen con IA?`);
    if (confirmAuto) {
      await window.analyzeRecentAndSummarizeChannel(canalId);
    }
    return;
  }

  setLoading(true, `Generando Resumen IA de ${canal.nombre}...`, `Sintetizando ${analyzedVideos.length} vídeos ponderando los más recientes`);

  try {
    // Ordenar de más reciente a más viejo
    analyzedVideos.sort((a, b) => (b.dateTimestamp || 0) - (a.dateTimestamp || 0));

    // Segmentar por Tiers de antigüedad
    const tier1Videos = analyzedVideos.filter(v => v.recencyTier === 'tier1' || (v.diasAntiguedad != null && v.diasAntiguedad <= 15));
    const tier2Videos = analyzedVideos.filter(v => v.recencyTier === 'tier2' || (v.diasAntiguedad != null && v.diasAntiguedad > 15 && v.diasAntiguedad <= 45));
    const tier3Videos = analyzedVideos.filter(v => v.recencyTier === 'tier3' || (v.diasAntiguedad != null && v.diasAntiguedad > 45 && v.diasAntiguedad <= 90));

    let contextParts = [];

    if (tier1Videos.length > 0) {
      contextParts.push(`=== 🔥 TIER 1: VÍDEOS DE LOS ÚLTIMOS 15 DÍAS (MÁXIMA PRIORIDAD Y SESGO ACTUAL) ===`);
      tier1Videos.forEach((v, i) => {
        const est = v.resumen_estructurado || {};
        contextParts.push(`[TIER 1 - #${i + 1}] Fecha: ${v.fecha} (hace ${v.diasAntiguedad || 0}d)
Título: ${v.title}
Hechos / Mercado: ${est.hechos_mercado || ''}
Cómo reaccionar: ${est.como_reaccionar || ''}
Conclusión / Por qué: ${est.por_que_conclusion || ''}
Otros temas / Predicciones: ${est.otros_temas_maldades || ''}
Activos: ${JSON.stringify(est.matriz_activos || {})}`);
      });
    }

    if (tier2Videos.length > 0) {
      contextParts.push(`\n=== ⚡ TIER 2: VÍDEOS DE 16 A 45 DÍAS (TENDENCIA INTERMEDIA Y DESARROLLO) ===`);
      tier2Videos.forEach((v, i) => {
        const est = v.resumen_estructurado || {};
        contextParts.push(`[TIER 2 - #${i + 1}] Fecha: ${v.fecha} (hace ${v.diasAntiguedad || 0}d)
Título: ${v.title}
Hechos / Mercado: ${est.hechos_mercado || ''}
Cómo reaccionar: ${est.como_reaccionar || ''}
Conclusión / Por qué: ${est.por_que_conclusion || ''}
Otros temas / Predicciones: ${est.otros_temas_maldades || ''}`);
      });
    }

    if (tier3Videos.length > 0) {
      contextParts.push(`\n=== 🕰️ TIER 3: VÍDEOS DE 46 A 90 DÍAS (FONDO ESTRUCTURAL HISTÓRICO - MÍNIMO PESO) ===`);
      tier3Videos.forEach((v, i) => {
        const est = v.resumen_estructurado || {};
        contextParts.push(`[TIER 3 - #${i + 1}] Fecha: ${v.fecha} (hace ${v.diasAntiguedad || 0}d)
Título: ${v.title}
Conclusión: ${est.por_que_conclusion || ''}`);
      });
    }

    const videosContext = contextParts.join('\n---\n');

    const systemPrompt = `Eres un Chief Investment Officer (CIO) y estratega macroeconómico institucional de alto nivel.
Tu tarea es generar un RESUMEN EJECUTIVO Y ANÁLISIS EVOLUTIVO de la visión y tesis de mercado del analista/YouTuber ${canal.nombre} a partir de sus vídeos en la ventana de los últimos 3 meses.

CRITERIOS RIGUROSOS DE PONDERACIÓN TEMPORAL (RECENCY WEIGHTING):
1. MÁXIMA PRIORIDAD A LOS VÍDEOS MÁS RECIENTES (TIER 1 / ÚLTIMOS DÍAS): La postura actual del analista es la que determinan sus últimos vídeos. Si en vídeos anteriores mantenía una tesis y en los vídeos más recientes la ha matizado, corregido o cambiado radicalmente, LA POSTURA MÁS RECIENTE PREVALECE E INVALIDA LA ANTERIOR.
2. VÍDEOS INTERMEDIOS (TIER 2 / 16-45 DÍAS): Muestran el desarrollo y la maduración de sus tesis intermedias.
3. VÍDEOS MÁS ANTIGUOS (TIER 3 / 46-90 DÍAS): Solo representan el trasfondo histórico o estructural. No deben utilizarse como sesgo actual si contradicen lo más reciente.
4. IDENTIFICACIÓN DE EVOLUCIÓN TEMPORAL: Destaca con claridad cómo ha ido cambiando o reafirmando su discurso a lo largo del tiempo (ej. qué sostenía hace semanas vs qué alerta o recomienda en sus vídeos más recientes).
5. REGLA ESTRICTA DE FECHAS ABSOLUTAS: Expresa SIEMPRE las fechas clave, horizontes temporales y plazos con fechas de calendario absolutas con mes y año explícitos (ej. 'noviembre de 2026', 'Q1 2027'). Queda terminantemente prohibido utilizar expresiones relativas ambiguas como 'en las próximas semanas' o 'el mes que viene'.
6. NIVELES EXACTOS Y ACTIVOS: Conserva los niveles técnicos numéricos exactos (ej. 7740 en SP500, 16 en VIX, 4500 en oro) y los activos clave mencionados.
7. CERO RELLENO: Sin saludos ni publicidad. Solo análisis macroeconómico, operativo y de mercados puro.
Devuelve SIEMPRE tu respuesta en formato JSON dentro de un bloque markdown \`\`\`json con texto en perfecto español.`;

    const userPrompt = `
GENERA EL RESUMEN EJECUTIVO Y RADIOGRAFÍA TEMPORAL DE ${canal.nombre.toUpperCase()} BASÁNDOTE EN SUS VÍDEOS (ORDENADOS POR RECENCIA, DE MÁS NUEVO A MÁS VIEJO):
${videosContext}

Devuelve un JSON con este formato exacto:
\`\`\`json
{
  "titular": "Titular conciso que resuma su postura y sesgo actual más reciente",
  "sesgo_actual": "Alcista / Bajista / Cauteloso / Neutral / Rotación hacia defensivos (máx 3-4 palabras)",
  "horizonte_temporal": "ej. Hasta noviembre de 2026",
  "resumen_vision_actual": "Párrafo de 3-5 líneas con la tesis principal y visión de mercado actual del analista, basada prioritariamente en sus vídeos más recientes.",
  "evolucion_temporal": "Párrafo explicando la evolución cronológica de su pensamiento: qué sostenía en los vídeos más viejos vs qué giros o alertas ha dado en los vídeos más recientes.",
  "puntos_clave": [
    "Punto clave 1 (Causa -> Efecto)",
    "Punto clave 2...",
    "Punto clave 3..."
  ],
  "activos_destacados": [
    {
      "activo": "Nombre del activo (ej. S&P 500, Oro, Bonos 10Y, Bitcoin)",
      "postura": "Postura actual (ej. Alcista hasta 7850-8000 / Alerta de corrección)",
      "niveles_fechas": "Niveles técnicos y fechas clave citadas con año (ej. Soporte 7740, fecha clave 3 de noviembre de 2026)"
    }
  ],
  "conclusion_operativa": "Pauta de acción concreta o recomendación operativa/patrimonial que defiende el analista actualmente (o cómo proteger la cartera)."
}
\`\`\`
`;

    const aiRes = await callGeminiApi(userPrompt, systemPrompt, true);

    canal.resumen_ia = {
      ...aiRes,
      fecha_generacion: new Date().toISOString(),
      videos_analizados: analyzedVideos.length,
      distribucion_tiers: {
        tier1: tier1Videos.length,
        tier2: tier2Videos.length,
        tier3: tier3Videos.length
      }
    };

    saveCanalesToLocalCache();
    await persistData(true);
    renderChannelsView();
    showToast(`✅ Resumen IA generado con éxito para ${canal.nombre}`, 'success');
  } catch (err) {
    console.error('Error generando resumen de canal:', err);
    alert('Error al generar resumen IA del canal: ' + err.message);
  } finally {
    setLoading(false);
  }
};

// Analizar automáticamente los 3 vídeos más recientes de un canal y generar su resumen
window.analyzeRecentAndSummarizeChannel = async function(canalId) {
  const canal = (state.canales || []).find(c => c.id === canalId);
  if (!canal) return;

  const channelVideos = state.videos.filter(v => v.tipo === 'canal' && v.canalId === canalId);
  const pendingVideos = channelVideos
    .filter(v => !isVideoAnalyzed(v))
    .sort((a, b) => (b.dateTimestamp || 0) - (a.dateTimestamp || 0));

  if (pendingVideos.length === 0) {
    await window.generateChannelAISummary(canalId);
    return;
  }

  const toAnalyze = pendingVideos.slice(0, 3);
  for (let i = 0; i < toAnalyze.length; i++) {
    const v = toAnalyze[i];
    try {
      await window.reanalyzeVideoById(v.id);
    } catch (e) {
      console.warn(`Error analizando vídeo ${v.id}:`, e);
    }
  }

  await window.generateChannelAISummary(canalId);
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
  const analyzedCount = channelVideos.filter(v => isVideoAnalyzed(v)).length;
  const pendingCount = totalChannelVideos - analyzedCount;
  const includedCount = channelVideos.filter(v => v.incluidoEnSintesis !== false).length;
  const excludedCount = channelVideos.filter(v => v.incluidoEnSintesis === false).length;
  const macroCount = channelVideos.filter(v => v.categoriaSugerida === 'macro').length;
  const tier1Count = channelVideos.filter(v => v.recencyTier === 'tier1' || (v.diasAntiguedad != null && v.diasAntiguedad <= 15)).length;
  const tier2Count = channelVideos.filter(v => v.recencyTier === 'tier2' || (v.diasAntiguedad != null && v.diasAntiguedad > 15 && v.diasAntiguedad <= 45)).length;
  const tier3Count = channelVideos.filter(v => v.recencyTier === 'tier3' || (v.diasAntiguedad != null && v.diasAntiguedad > 45 && v.diasAntiguedad <= 90)).length;

  const lastScanText = state.config.lastYoutubeScan
    ? new Date(state.config.lastYoutubeScan).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    : 'Pendiente';

  // Renderizar bloque de resumen IA del canal (justo debajo de la información y estadísticas del canal)
  const summaryHtml = renderChannelAISummarySection(currentCanal, totalChannelVideos, analyzedCount);

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
        <button class="btn btn-secondary btn-sm" onclick="togglePromptPanel()" style="border-color: var(--accent-indigo); color: #c7d2fe;" title="Ver o editar el Prompt por defecto que se copia automáticamente en los vídeos de ${escapeHtml(currentCanal.nombre)}">
          🧠 Prompt por Defecto de ${escapeHtml(currentCanal.nombre)}
        </button>
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
        <div class="stat-box-num" style="color: #34d399;">${analyzedCount}</div>
        <div class="stat-box-label">✅ Analizados con IA</div>
      </div>
      <div class="stat-box">
        <div class="stat-box-num" style="color: #fbbf24;">${pendingCount}</div>
        <div class="stat-box-label">⏳ Pendientes de Analizar</div>
      </div>
      <div class="stat-box">
        <div class="stat-box-num" style="color: var(--accent-green);">${includedCount}</div>
        <div class="stat-box-label">Incluidos en Síntesis</div>
      </div>
      <div class="stat-box">
        <div class="stat-box-num" style="color: #f87171;">${tier1Count}</div>
        <div class="stat-box-label">🔥 Tier 1 (&lt;15d)</div>
      </div>
    </div>

    ${summaryHtml}

    <div class="channel-actions-toolbar">
      <div class="channel-subfilters">
        <button class="subfilter-btn ${state.channelSubfilter === 'all' ? 'active' : ''}" onclick="filterChannelSub('all')">Todos (${totalChannelVideos})</button>
        <button class="subfilter-btn ${state.channelSubfilter === 'analyzed' ? 'active' : ''}" onclick="filterChannelSub('analyzed')">✅ Con Resumen IA (${analyzedCount})</button>
        <button class="subfilter-btn ${state.channelSubfilter === 'pending' ? 'active' : ''}" onclick="filterChannelSub('pending')">⏳ Pendientes (${pendingCount})</button>
        <button class="subfilter-btn ${state.channelSubfilter === 'macro' ? 'active' : ''}" onclick="filterChannelSub('macro')">Solo Macro (${macroCount})</button>
        <button class="subfilter-btn ${state.channelSubfilter === 'tier1' ? 'active' : ''}" onclick="filterChannelSub('tier1')">🔥 &lt;15 días (${tier1Count})</button>
        <button class="subfilter-btn ${state.channelSubfilter === 'tier2' ? 'active' : ''}" onclick="filterChannelSub('tier2')">Tier 2 (${tier2Count})</button>
        <button class="subfilter-btn ${state.channelSubfilter === 'tier3' ? 'active' : ''}" onclick="filterChannelSub('tier3')">Tier 3 (${tier3Count})</button>
        <button class="subfilter-btn ${state.channelSubfilter === 'excluded' ? 'active' : ''}" onclick="filterChannelSub('excluded')">Descartados (${excludedCount})</button>
      </div>
      <div style="font-size: 0.8rem; color: var(--text-muted);">
        📺 Última revisión YT: <strong>${lastScanText}</strong> · Ventana: <strong>Últimos 3 meses</strong>
      </div>
    </div>
  `;

  // 3. Filtrar vídeos del canal según subfiltro
  let displayedVideos = channelVideos;
  if (state.channelSubfilter === 'analyzed') {
    displayedVideos = channelVideos.filter(v => isVideoAnalyzed(v));
  } else if (state.channelSubfilter === 'pending') {
    displayedVideos = channelVideos.filter(v => !isVideoAnalyzed(v));
  } else if (state.channelSubfilter === 'macro') {
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

  // 4. Renderizar Filas de Vídeos con Estado de Análisis y Desglose
  listContainer.innerHTML = displayedVideos.map(video => {
    const isIncluded = video.incluidoEnSintesis !== false;
    const estructurado = video.resumen_estructurado || null;
    const isAnalyzed = isVideoAnalyzed(video);

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
                <span class="analysis-status-badge ${isAnalyzed ? 'status-analyzed' : 'status-pending'}">
                  ${isAnalyzed ? '✅ Analizado con IA' : '⏳ Resumen pendiente'}
                </span>
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
            ${isAnalyzed ? `
              <button class="btn btn-secondary btn-sm" onclick="reanalyzeVideoById('${video.id}')" title="Volver a extraer transcripción de YouTube y actualizar el resumen">
                🔄 Re-analizar con IA
              </button>
            ` : `
              <button class="btn btn-primary btn-sm" onclick="reanalyzeVideoById('${video.id}')" style="font-weight: 700; box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);" title="Extraer transcripción de YouTube y generar el resumen con el Prompt de ${escapeHtml(video.author || currentCanal.nombre)}">
                ⚡ Analizar con IA
              </button>
            `}
            <button class="btn btn-secondary btn-sm" onclick="editVideoQuery('${video.id}')" style="${video.promptPersonalizado ? 'border-color: var(--accent-indigo); color: #c7d2fe;' : ''}" title="Ver o editar el Prompt copiado en este vídeo y actualizar su resumen">
              ${video.promptPersonalizado ? '✏️ Prompt (Editado)' : '✏️ Prompt del Vídeo'}
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
              <span>📋 ${isAnalyzed ? 'Ver Resumen Operativo (4 Bloques)' : '⏳ Resumen pendiente (Pulse para ver / analizar)'}</span>
              <span class="accordion-arrow">${isAnalyzed ? '▲' : '▼'}</span>
            </button>
            <div class="accordion-content ${isAnalyzed ? 'open' : ''}" id="acc_${video.id}">
              ${renderStructuredSummary(estructurado, video.resumen, video.id, video.author || currentCanal.nombre)}
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
    const isAnalyzed = isVideoAnalyzed(video);

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

          <div style="margin-bottom: 0.5rem;">
            <span class="analysis-status-badge ${isAnalyzed ? 'status-analyzed' : 'status-pending'}">
              ${isAnalyzed ? '✅ Analizado con IA' : '⏳ Resumen pendiente'}
            </span>
          </div>

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
              <span>📋 ${isAnalyzed ? 'Ver Resumen Operativo (4 Bloques)' : '⏳ Resumen pendiente (Pulse para analizar)'}</span>
              <span class="accordion-arrow">${isAnalyzed ? '▲' : '▼'}</span>
            </button>
            <div class="accordion-content ${isAnalyzed ? 'open' : ''}" id="acc_${video.id}">
              ${renderStructuredSummary(estructurado, video.resumen, video.id, video.author || video.channel)}
            </div>
          </div>
        </div>

        <div class="video-card-actions">
          <label class="checkbox-label" title="Incluir este vídeo en la Síntesis / Meta-Análisis">
            <input type="checkbox" ${isIncluded ? 'checked' : ''} onchange="toggleIncludeVideo('${video.id}', this.checked)">
            <span>En Meta-Análisis</span>
          </label>
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            ${isAnalyzed ? `
              <button class="btn btn-secondary btn-sm" onclick="reanalyzeVideoById('${video.id}')" title="Actualizar resumen con el Prompt Maestro actual">
                🔄 Re-analizar
              </button>
            ` : `
              <button class="btn btn-primary btn-sm" onclick="reanalyzeVideoById('${video.id}')" style="font-weight: 700;" title="Analizar vídeo con el Prompt de este autor">
                ⚡ Analizar con IA
              </button>
            `}
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

function renderStructuredSummary(est, fallbackText, videoId = '', authorName = '') {
  const isAnalyzed = isVideoAnalyzed({ resumen_estructurado: est });

  const actionToolbar = videoId ? `
    <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px dashed rgba(255,255,255,0.1);">
      <button type="button" class="btn btn-secondary btn-sm" onclick="editVideoQuery('${videoId}')" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;">
        ✏️ Cambiar Prompt / Notas
      </button>
      <button type="button" class="btn btn-primary btn-sm" onclick="reanalyzeVideoById('${videoId}')" style="font-size: 0.75rem; padding: 0.25rem 0.65rem;">
        ${isAnalyzed ? '🔄 Re-analizar con IA' : '⚡ Analizar con IA ahora'}
      </button>
    </div>
  ` : '';

  if (!isAnalyzed) {
    return `
      ${actionToolbar}
      <div class="pending-summary-box">
        <div class="pending-summary-title">
          <span>⏳</span> Resumen pendiente de análisis
        </div>
        <p class="pending-summary-desc">
          Este vídeo aún no ha sido analizado con su transcripción real. Pulse el botón para extraer los subtítulos completos de YouTube y procesarlos con el Prompt correspondiente ${authorName ? 'de <strong>' + escapeHtml(authorName) + '</strong>' : 'del canal'}.
        </p>
        <button type="button" class="btn btn-primary btn-sm" onclick="reanalyzeVideoById('${videoId}')" style="font-size: 0.825rem; font-weight: 700; padding: 0.45rem 1.1rem; box-shadow: 0 0 12px rgba(59, 130, 246, 0.4);">
          ⚡ Analizar con IA (${authorName ? 'Prompt de ' + escapeHtml(authorName) : 'Prompt del Canal'})
        </button>
      </div>
    `;
  }

  let html = actionToolbar;

  // Formato de 4 bloques del usuario
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
  const badge = document.getElementById('editModalChannelOriginBadge');

  const canalObj = (state.canales || []).find(c => c.id === v.canalId);
  const canalName = canalObj ? canalObj.nombre : (v.author || v.channel || 'Vídeos Sueltos');

  if (modal && idInput && textarea) {
    idInput.value = v.id;
    if (titleEl) titleEl.textContent = v.title || 'Vídeo';
    if (metaEl) metaEl.textContent = `👤 ${canalName} · 📅 ${v.fecha || ''}`;
    textarea.value = v.consulta || '';
    if (modalMasterPrompt) {
      modalMasterPrompt.value = getEffectiveVideoPrompt(v);
    }
    if (badge) {
      if (v.promptPersonalizado) {
        badge.textContent = `(✨ Prompt personalizado para este vídeo)`;
        badge.style.color = '#fbbf24';
      } else {
        badge.textContent = `(Copiado del Prompt por defecto de ${canalName})`;
        badge.style.color = '#a5b4fc';
      }
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
    const newText = modalMasterPrompt.value.trim();
    const chDefault = getEffectiveChannelPrompt(v.canalId || 'global');
    v.prompt = newText;
    v.promptPersonalizado = (newText !== chDefault);
  }

  closeEditQueryModal();
  renderVideosTab();
  await persistData(true);
  showToast('💾 Prompt guardado en este vídeo correctamente', 'success');
};

// Función directa para re-analizar cualquier vídeo con 1 clic usando el Prompt guardado en ese vídeo (copiado de su canal o editado)
window.reanalyzeVideoById = async function(videoId) {
  const v = state.videos.find(x => x.id === videoId);
  if (!v) return;

  const videoPrompt = getEffectiveVideoPrompt(v);
  v.prompt = videoPrompt;
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
      `Generando resumen con el Prompt de "${v.author || v.channel || 'este vídeo'}" (Gemini 3.8 Flash)...`,
      transcript
        ? `Analizando transcripción completa (${transcript.split('\n').length} líneas)`
        : 'Analizando vídeo con su Prompt de 4 bloques'
    );

    const systemPrompt = `${videoPrompt}

REGLA CRÍTICA OBLIGATORIA: FECHAS ABSOLUTAS Y ANCLAJE TEMPORAL
La fecha de publicación del vídeo es: ${v.fecha || 'Fecha actual'}.
QUEDA ESTRICTAMENTE PROHIBIDO usar expresiones temporales relativas ambiguas (ej. "en 5 semanas", "el mes que viene", "en las próximas semanas", "este viernes", "hace 3 semanas", "durante agosto o septiembre").
Debes calcular y escribir SIEMPRE la fecha o rango de calendario absoluto con mes y año explícitos (ej. "a principios de noviembre de 2026", "semana del 9 al 15 de noviembre de 2026", "agosto-septiembre de 2026", "Q4 2026").
En el campo "fecha_importante", especifica siempre día, mes y año exacto (ej. "3 de noviembre de 2026").

IMPORTANTE: Devuelve SIEMPRE tu respuesta en formato JSON válido dentro de un bloque \`\`\`json.`;

    const contextBlock = transcript
      ? `TRANSCRIPCIÓN COMPLETA DEL VÍDEO:\n---\n${transcript.slice(0, 150000)}\n---`
      : `CONTEXTO PREVIO DEL VÍDEO:\nTítulo: ${v.title}\nResumen previo: ${v.resumen_estructurado?.hechos_mercado || v.resumen_estructurado?.tesis_macro || v.resumen_estructurado?.respuesta_consulta || ''}`;

    const userPrompt = `
ANALIZA EL SIGUIENTE VÍDEO SIGUIENDO EL PROMPT DEL VÍDEO:
- Título: ${v.title}
- Analista / Canal: ${v.author || v.channel}
- Fecha de Publicación (PUNTO DE ANCLAJE TEMPORAL PARA CALCULAR FECHAS ABSOLUTAS): ${v.fecha || 'Fecha actual'}
- URL: ${v.url}
${consulta ? `\n🎯 NOTAS O CONDICIONES ADICIONALES PARA ESTE VÍDEO:\n"${consulta}"\n` : ''}
${contextBlock}

Devuelve un bloque JSON válido con este formato exacto:
\`\`\`json
{
  "categoriaSugerida": "macro" o "politica_sociedad",
  "hechos_mercado": "Texto directo para '- Como se ve el mercado / los hechos:' (ESCRIBE 1 FRASE CORTA POR LÍNEA separada con salto de línea \\n, lenguaje llano y directo como en los ejemplos; con fechas absolutas si se mencionan momentos).",
  "como_reaccionar": "Texto directo para '- Como reaccionar:' indicando qué comprar/vender y en qué nivel exacto (ej. 'Comprar futuros si el SP500 supera la zona de los 7740'). Si no da orden concreta, pon cadena vacía ''.",
  "por_que_conclusion": "Texto directo para '- ¿por que? / conclusión:' (frases cortas separadas por salto de línea \\n con la deducción o previsión por activo y fecha absoluta, o '' si ya queda recogido en los otros bloques).",
  "fecha_importante": "Fecha clave exacta con día, mes y año (ej. '3 de noviembre de 2026: elecciones en EE.UU., las bolsas subirán hasta el 3 de noviembre y después bajarán'). Si no hay fecha clave, pon ''.",
  "otros_temas_maldades": "Texto directo para '- Otros temas / maldades / predicción:' (ESCRIBE 1 IDEA CORTA POR LÍNEA separada por \\n, sin parrafadas; con horizontes temporales en fechas absolutas con mes y año).",
  "matriz_activos": {
    "renta_variable": "sesgo y nivel clave",
    "bonos": "sesgo y motivo",
    "oro": "sesgo y horizonte en fechas absolutas",
    "petroleo": "sesgo y motivo",
    "dolar": "sesgo",
    "bitcoin": "sesgo y horizonte en fechas absolutas"
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
    showToast('✨ ¡Resumen actualizado con éxito usando el Prompt de este vídeo!', 'success');
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
    const newText = modalMasterPrompt.value.trim();
    const chDefault = getEffectiveChannelPrompt(v.canalId || 'global');
    v.prompt = newText;
    v.promptPersonalizado = (newText !== chDefault);
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
      setLoading(true, 'Analizando contenido con tu Prompt por defecto...', 'Generando estructura de 4 bloques');
    } else {
      setLoading(true, 'Procesando con tu Prompt por defecto...', `Analizando transcripción (${extractData.lineCount || 'múltiples'} líneas)`);
    }

    // Si el autor coincide con alguno de nuestros canales (ej. Cava, Rallo, Jon, Vidal, Pablo Gil), usar el prompt por defecto de su canal
    const authorLower = (author || '').toLowerCase();
    let matchedCanalId = 'global';
    if (authorLower.includes('cava')) matchedCanalId = 'cava';
    else if (authorLower.includes('rallo')) matchedCanalId = 'rallo';
    else if (authorLower.includes('jon')) matchedCanalId = 'jon';
    else if (authorLower.includes('vidal')) matchedCanalId = 'vidal';
    else if (authorLower.includes('pablo')) matchedCanalId = 'pablo';

    const copiedPrompt = getEffectiveChannelPrompt(matchedCanalId);
    const videoFecha = extractData?.fecha || new Date().toLocaleDateString('es-ES');
    const systemPrompt = `${copiedPrompt}

REGLA CRÍTICA OBLIGATORIA: FECHAS ABSOLUTAS Y ANCLAJE TEMPORAL
La fecha de publicación del vídeo es: ${videoFecha}.
QUEDA ESTRICTAMENTE PROHIBIDO usar expresiones temporales relativas ambiguas (ej. "en 5 semanas", "el mes que viene", "este viernes", "durante agosto o septiembre").
Debes calcular y escribir SIEMPRE la fecha o rango de calendario absoluto con mes y año explícitos (ej. "a principios de noviembre de 2026", "semana del 9 al 15 de noviembre de 2026", "agosto-septiembre de 2026", "Q4 2026").
En el campo "fecha_importante", especifica siempre día, mes y año exacto (ej. "3 de noviembre de 2026").

IMPORTANTE: Devuelve SIEMPRE tu respuesta en formato JSON dentro de un bloque markdown \`\`\`json.`;

    const userPrompt = `
ANALIZA EL SIGUIENTE VÍDEO SIGUIENDO EL PROMPT DEL VÍDEO:
- Título: ${title}
- Analista / Canal: ${author}
- Fecha de Publicación (PUNTO DE ANCLAJE TEMPORAL PARA CALCULAR FECHAS ABSOLUTAS): ${videoFecha}
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
  "hechos_mercado": "Texto para '- Como se ve el mercado / los hechos:' (1 frase por línea con fechas absolutas si se mencionan momentos)",
  "como_reaccionar": "Texto para '- Como reaccionar:' (o '' si no da orden concreta)",
  "por_que_conclusion": "Texto para '- ¿por que? / conclusión:' (frases con deducción por activo y plazos en fechas absolutas con mes y año)",
  "fecha_importante": "Fecha clave exacta con día, mes y año (o '' si no aplica)",
  "otros_temas_maldades": "Texto para '- Otros temas / maldades / predicción:' (1 idea por línea; horizontes temporales en fechas absolutas)",
  "matriz_activos": {
    "renta_variable": "sesgo y nivel",
    "bonos": "sesgo y motivo",
    "oro": "sesgo y horizonte en fechas absolutas",
    "petroleo": "sesgo y motivo",
    "dolar": "sesgo",
    "bitcoin": "sesgo y horizonte en fechas absolutas"
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
      canalId: matchedCanalId !== 'global' ? matchedCanalId : undefined,
      url: rawUrl,
      title: aiRes.title || title,
      author: aiRes.author || author,
      channel: aiRes.author || author,
      fecha: new Date().toLocaleDateString('es-ES'),
      fecha_registro: new Date().toLocaleString('es-ES'),
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      prompt: copiedPrompt,
      promptPersonalizado: false,
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
  if (!est) return '';
  if (est.hechos_mercado || est.por_que_conclusion) {
    return [
      est.hechos_mercado ? `Hechos: ${est.hechos_mercado}` : '',
      est.como_reaccionar ? `Operativa: ${est.como_reaccionar}` : '',
      est.por_que_conclusion ? `Conclusión: ${est.por_que_conclusion}` : '',
      est.fecha_importante ? `Fecha clave: ${est.fecha_importante}` : '',
      est.otros_temas_maldades ? `Otros/Predicción: ${est.otros_temas_maldades}` : ''
    ].filter(Boolean).join(' | ');
  }
  return '';
}

// Regenerar Meta-Análisis (Síntesis y Duelo de Tesis con Recency Decay)
async function handleRegenerateMetaAnalysis() {
  const selectedVideos = state.videos.filter(v => v.incluidoEnSintesis !== false && isVideoAnalyzed(v));
  if (selectedVideos.length === 0) {
    alert('No hay vídeos analizados con IA seleccionados para el Meta-Análisis. Analiza al menos 1 o 2 vídeos con el botón «⚡ Analizar con IA» para generar la síntesis.');
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
Analizas los vídeos seleccionados de analistas financieros clave (José Luis Cava, Juan Ramón Rallo, Jon Economist, Marc Vidal, Pablo Gil Trader, etc.) correspondientes a una ventana estricta de los ÚLTIMOS 3 MESES.

CRITERIOS RIGUROSOS DE PONDERACIÓN TEMPORAL (DECAY):
1. TIER 1 (Últimos 15 días) TIENE PRIORIDAD ABSOLUTA: Las opiniones más recientes son las que determinan el sesgo actual de mercado. Si un analista cambió de visión recientemente respecto a hace 1 o 2 meses, su postura de los últimos 15 días PREVALECE e INVALIDA la anterior.
2. TIER 2 (16 a 45 días) sirve para validar la confirmación o maduración de tendencias.
3. TIER 3 (46 a 90 días) sirve únicamente como contexto estructural de fondo. En ningún caso debe contradecir el pulso de los últimos 15 días.
4. Ignora cualquier contenido puramente de política partidista, sociedad o entretenimiento para no enturbiar el análisis económico y de mercado.
5. REGLA ESTRICTA DE FECHAS ABSOLUTAS: Expresa SIEMPRE los horizontes temporales, catalizadores, fechas clave y plazos de las predicciones con fechas de calendario absolutas con mes y año explícitos (ej. "noviembre de 2026", "primer trimestre de 2027", "finales de 2026"). Queda terminantemente prohibido utilizar expresiones relativas ambiguas como "en las próximas semanas", "en unos meses" o "el mes que viene".

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
  if (btnSyncNow) btnSyncNow.addEventListener('click', () => syncBidirectional());

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

// Reiniciar aplicación completamente a cero (biblioteca limpia y sin análisis)
window.resetAllToFreshState = async function() {
  if (!confirm('¿Estás seguro de que deseas reiniciar la biblioteca a cero? Se vaciarán los vídeos y el meta-análisis para empezar completamente desde el principio.')) return;
  state.videos = [];
  state.meta_analisis = null;
  state.config.lastYoutubeScan = null;
  localStorage.removeItem('macro_last_yt_scan');
  localStorage.removeItem('macro_cached_canales');
  await persistData(true);
  renderAll();
  showToast('✅ Biblioteca reiniciada a cero. ¡Lista para explorar!', 'success');
};

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
