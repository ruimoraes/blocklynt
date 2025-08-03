import React from 'react';

function obterDificuldade(dadosFase) {
  // Usa a dificuldade da fase, se existir, senão calcula pelo número
  if (dadosFase?.dificuldade) {
    switch (dadosFase.dificuldade) {
      case "Fácil": return { nivel: "Fácil", cor: "bg-green-500", emoji: "😊" };
      case "Médio": return { nivel: "Médio", cor: "bg-yellow-500", emoji: "🤔" };
      case "Difícil": return { nivel: "Difícil", cor: "bg-orange-500", emoji: "😤" };
      case "Extremo": return { nivel: "Extremo", cor: "bg-red-500", emoji: "🔥" };
      default: return null;
    }
  }
  return null;
}

function GameFaseInfo ({ dadosFase = {}, numeroFase }){ 
  const dificuldade = obterDificuldade(dadosFase);

  return (
    <div className="p-1 lg:px-3 lg:py-2">
      {dadosFase && dadosFase.nome ? (
        <div className="flex items-center justify-between">
          {/* Número da fase */}
          <div className="flex-shrink-0 w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm lg:text-lg font-bold shadow-lg">
            {numeroFase}
          </div>
          {/* Título/Subtítulo */}
          <div className="flex-1 min-w-0 px-3 lg:px-5">
            <h3 className="text-base lg:text-2xl font-semibold text-gray-800 truncate">
              {dadosFase.nome}
            </h3>
            {dadosFase.descricao && (
              <p className="text-sm lg:text-xl text-gray-600 leading-tight truncate">
                {dadosFase.descricao}
              </p>
            )}
          </div>
          {/* Dificuldade */}
          <div className="flex-shrink-0">
            {dificuldade && (
              <div className={`flex items-center space-x-1 text-xs lg:text-sm text-white px-2 py-1 lg:px-3 lg:py-1.5 rounded-full font-medium ${dificuldade.cor}`}>
                <span className="lg:text-base">{dificuldade.emoji}</span>
                <span>{dificuldade.nivel}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between text-gray-500">
          <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 text-sm lg:text-lg font-bold">
            ?
          </div>
          <div className="flex-1 px-3 lg:px-5">
            <p className="text-xs lg:text-sm">Selecione uma fase para começar</p>
          </div>
          <div className="flex-shrink-0"></div>
        </div>
      )}
    </div>
  );
}

export default GameFaseInfo;