const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Quando empacotado com pkg, __dirname pode não funcionar corretamente
// Vamos usar process.cwd() para obter o diretório atual
const htmlPath = path.join(process.cwd(), 'build', 'index.html');

if (fs.existsSync(htmlPath)) {
    console.log('Abrindo BeeEdu...');
    exec(`start "" "${htmlPath}"`, (error) => {
        if (error) {
            console.error('Erro ao abrir o arquivo:', error);
        }
    });
} else {
    console.error('Erro: Arquivo HTML não encontrado em:', htmlPath);
    console.error('Certifique-se de que o build foi gerado com "npm run build"');
    process.exit(1);
} 