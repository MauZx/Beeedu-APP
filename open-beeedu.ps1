# Script para abrir o BeeEdu no navegador
$htmlPath = Join-Path $PSScriptRoot "build\index.html"
$fullPath = [System.IO.Path]::GetFullPath($htmlPath)

if (Test-Path $fullPath) {
    Write-Host "Abrindo BeeEdu..."
    Start-Process $fullPath
} else {
    Write-Host "Erro: Arquivo HTML não encontrado em: $fullPath"
    Write-Host "Certifique-se de que o build foi gerado com 'npm run build'"
    Read-Host "Pressione Enter para sair"
} 