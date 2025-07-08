@echo off
title BeeEdu Launcher
echo Abrindo BeeEdu...

set "HTML_PATH=%~dp0build\index.html"

if exist "%HTML_PATH%" (
    start "" "%HTML_PATH%"
) else (
    echo Erro: Arquivo HTML nao encontrado em:
    echo %HTML_PATH%
    echo.
    echo Certifique-se de que o build foi gerado com 'npm run build'
    pause
) 