# MacroConsensus ⚡
**Inteligencia Macroeconómica, Síntesis de Vídeos de Expertos y Duelo de Tesis**

MacroConsensus es una aplicación web y PWA diseñada para transformar horas de análisis en vídeo de YouTube (analistas macro, gestores de fondos, estrategas de inversión) en inteligencia operativa accionable y sintetizada mediante el modelo **Gemini 3.8 Flash**.

---

## 🎯 Filosofía: "Human-in-the-Loop" (Consulta del Vídeo)

A diferencia de los resúmenes genéricos que se pierden en superficialidades, MacroConsensus sitúa tu criterio en el centro:
1. **Ves el vídeo** y detectas qué aspectos son verdaderamente cruciales (un nivel técnico, una contradicción en bonos, su lectura del petróleo).
2. **Introduces el enlace y tu «Consulta del Vídeo»**: Defines tus condiciones, sesgos detectados y puntos prioritarios.
3. **Gemini 3.8 Flash** analiza la transcripción completa priorizando tus preguntas, generando un desglose estructurado en 4 bloques:
   * 🎯 **Respuesta directa a tu Consulta**.
   * 📈 **Tesis Central y Catalizadores Macro**.
   * 💼 **Matriz de Impacto en Activos**.
   * ⏱️ **Marcas de Tiempo y Citas Clave**.
4. **⚔️ Duelo de Tesis y Consenso**: La aplicación contrasta automáticamente los vídeos de tu biblioteca para aislar dónde los expertos coinciden al 100% y en qué puntos de fricción chocan frontalmente sus predicciones.

---

## 🚀 Cómo Ejecutar en Local (Windows)

1. Haz doble clic en el archivo **`iniciar_app.bat`**.
2. Se abrirá automáticamente tu navegador en `http://localhost:8080`.
3. ¡Listo! Puedes añadir vídeos, consultar la biblioteca y generar meta-análisis.

*(Alternativa por terminal)*:
```bash
node servidor.js
```

---

## ☁️ Sincronización en la Nube con GitHub

MacroConsensus almacena y sincroniza tu biblioteca directamente en tu repositorio de GitHub usando la API REST:
* **Repositorio Predeterminado**: `jrFont-Technologies/MacroConsensus`
* **Archivo de Datos**: `datos.json`
* **Configuración**: Puedes ajustar el repositorio y el Personal Access Token (PAT) en la pestaña **⚙️ Configuración** de la aplicación.

---

## 🌐 Despliegue en Vercel

La aplicación está 100% preparada para desplegarse en **Vercel** de manera gratuita:
1. Sube esta carpeta a tu repositorio de GitHub `jrFont-Technologies/MacroConsensus`.
2. Conecta el repositorio en [Vercel](https://vercel.com).
3. Vercel detectará automáticamente `vercel.json` y la función serverless `api/extraer.js` para extraer las transcripciones de YouTube.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend**: HTML5, Vanilla JavaScript moderno (ES6+), CSS3 Dark Terminal Theme, PWA.
* **Backend Local**: Node.js v22 nativo (sin dependencias externas pesadas).
* **Motor de IA**: Google Gemini API (`gemini-3.8-flash`).
* **Cloud & Serverless**: Vercel Serverless Functions + GitHub REST API.
