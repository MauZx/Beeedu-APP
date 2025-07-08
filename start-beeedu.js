const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Caminho absoluto para a pasta build
const buildPath = path.join(process.cwd(), 'build');

if (!fs.existsSync(buildPath)) {
    console.error('A pasta build/ não foi encontrada. Rode "npm run build" antes de executar este programa.');
    process.exit(1);
}

// Inicia o servidor local
const serveCmd = `npx serve "${buildPath}" -l 3000`;
const server = exec(serveCmd, (error) => {
    if (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
});

// Aguarda o servidor iniciar e abre o navegador
setTimeout(() => {
    console.log('Abrindo BeeEdu no navegador...');
    exec('start http://localhost:3000');
}, 2000); // 2 segundos para garantir que o servidor subiu

// Encerra o servidor ao fechar o script
process.on('SIGINT', () => {
    server.kill();
    process.exit();
}); 