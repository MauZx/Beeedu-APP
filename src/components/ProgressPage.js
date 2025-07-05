import React from 'react';

// Estrutura dos níveis e insígnias
const LEVELS = Array.from({ length: 100 }, (_, i) => {
  const level = i + 1;
  const points = Math.round(100 * Math.pow(1.5, i));
  return { level, points };
});

const BADGES = [
  { level: 0, name: 'Melzinho na Chupeta' },
  { level: 5, name: 'Bem-vindo à Colmeia!' },
  { level: 10, name: 'Guardião das Abelhas' },
  { level: 15, name: 'Explorador das Bombus' },
  { level: 20, name: 'Amigo das Trigonas' },
  { level: 25, name: 'Guardião da Abelha-Canudo' },
  { level: 30, name: 'Protetor das Nativas' },
  { level: 35, name: 'Guardião das Abelhas Solitárias' },
  { level: 40, name: 'Amigo das Sem Ferrão' },
  { level: 45, name: 'Protetor das Jataís' },
  { level: 50, name: 'Defensor das Mandaçaias' },
  { level: 55, name: 'Protetor das Manduris' },
  { level: 60, name: 'Guardião da Abelha-Iraí' },
  { level: 65, name: 'Sentinela das Tubunas' },
  { level: 70, name: 'Guardião das Borás' },
  { level: 75, name: 'Amigo da Abelha-Arapuã' },
  { level: 80, name: 'Observador das Plebeias' },
  { level: 85, name: 'Explorador das Meliponas' },
  { level: 90, name: 'Defensor da Abelha-Mirim' },
  { level: 95, name: 'Sentinela do Mel' },
  { level: 100, name: 'Defensor das Polinizadoras + Estudante 100% Empenhado' },
];

// Exemplo de progresso do usuário
const userProgress = {
  currentLevel: 17,
  currentPoints: 4200,
  unlockedBadges: BADGES.filter(b => b.level <= 17),
};

function getBadgeForLevel(level) {
  let badge = BADGES[0];
  for (let i = 0; i < BADGES.length; i++) {
    if (level >= BADGES[i].level) badge = BADGES[i];
  }
  return badge;
}

export default function ProgressPage() {
  // Calcular progresso total e para o próximo nível
  const currentLevelObj = LEVELS[userProgress.currentLevel - 1];
  const nextLevelObj = LEVELS[userProgress.currentLevel] || LEVELS[LEVELS.length - 1];
  const pointsForCurrent = currentLevelObj ? currentLevelObj.points : 0;
  const pointsForNext = nextLevelObj ? nextLevelObj.points : pointsForCurrent;
  const progressPercent = Math.min(100, ((userProgress.currentPoints - pointsForCurrent) / (pointsForNext - pointsForCurrent)) * 100);
  const currentBadge = getBadgeForLevel(userProgress.currentLevel);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2 text-blue-900">Progresso de Nível</h1>
      <div className="mb-6 text-lg text-blue-700">Level {userProgress.currentLevel} &bull; {userProgress.currentPoints} pontos</div>
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <div className="w-full flex items-center mb-4">
          <div className="flex-1">
            <div className="h-6 bg-gray-200 rounded-full relative overflow-hidden">
              <div
                className="h-6 bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 text-xs text-blue-900 font-bold" style={{ top: '-1.5rem' }}>
                {progressPercent.toFixed(1)}%
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Level {userProgress.currentLevel}</span>
              <span>Level {userProgress.currentLevel + 1}</span>
            </div>
          </div>
          <div className="ml-8 flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-3xl mb-2 border-4 border-yellow-300 shadow">
              🏅
            </div>
            <div className="text-sm font-semibold text-yellow-700 text-center">{currentBadge.name}</div>
          </div>
        </div>
        <div className="w-full mt-8">
          <h2 className="text-xl font-bold mb-4 text-blue-800">Insígnias Desbloqueadas</h2>
          <div className="flex flex-wrap gap-4">
            {userProgress.unlockedBadges.map((badge, idx) => (
              <div key={badge.level} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl border-2 border-yellow-300 mb-1">🏅</div>
                <div className="text-xs text-yellow-800 text-center font-semibold">{badge.name}</div>
                <div className="text-[10px] text-gray-400">Nível {badge.level}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mt-10">
          <h2 className="text-xl font-bold mb-4 text-blue-800">Próximos Níveis</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {LEVELS.slice(userProgress.currentLevel, userProgress.currentLevel + 8).map(lvl => (
              <div key={lvl.level} className="bg-blue-50 rounded-lg p-3 flex flex-col items-center border border-blue-100">
                <div className="font-bold text-blue-700">Nível {lvl.level}</div>
                <div className="text-xs text-gray-500">{lvl.points} pontos</div>
                <div className="mt-2 text-xs text-yellow-700 font-semibold">{getBadgeForLevel(lvl.level).name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 max-w-2xl text-center text-gray-600">
        <h3 className="text-lg font-bold mb-2 text-blue-800">Como ganhar pontos?</h3>
        <ul className="text-left mx-auto inline-block">
          <li>• Conclusão de módulo de curso: <span className="font-bold text-blue-700">+25</span></li>
          <li>• Conclusão de curso com certificado: <span className="font-bold text-blue-700">+150</span></li>
          <li>• Verificação de conta (e-mail + celular): <span className="font-bold text-blue-700">+200</span></li>
          <li>• Conclusão de freela: <span className="font-bold text-blue-700">+225</span></li>
          <li>• Conclusão de projeto: <span className="font-bold text-blue-700">+575</span></li>
        </ul>
      </div>
    </div>
  );
} 