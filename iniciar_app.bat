@echo off
chcp 65001 > nul
title MacroConsensus - Inteligencia y Meta-Análisis de Expertos
echo.
echo ========================================================
echo   MacroConsensus - Inteligencia Macro y Meta-Analisis
echo ========================================================
echo.
echo [1/2] Abriendo navegador en http://localhost:8080...
start http://localhost:8080
echo [2/2] Iniciando servidor Node.js...
echo.
node servidor.js
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] No se pudo iniciar el servidor. Asegurate de tener Node.js instalado.
    pause
)
