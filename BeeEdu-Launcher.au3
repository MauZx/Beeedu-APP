#include <FileConstants.au3>
#include <MsgBoxConstants.au3>

; Script AutoIt para abrir o BeeEdu HTML
$htmlPath = @ScriptDir & "\build\index.html"

If FileExists($htmlPath) Then
    ShellExecute($htmlPath)
Else
    MsgBox($MB_ICONERROR, "Erro", "Arquivo HTML não encontrado em:" & @CRLF & $htmlPath & @CRLF & @CRLF & "Certifique-se de que o build foi gerado com 'npm run build'")
EndIf 