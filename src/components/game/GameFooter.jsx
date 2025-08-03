import React from "react";

export default function GameFooter({ gameConfig, faseAtual, onAbrirSeletor }) {
  const totalFases = gameConfig.fases.length;

  const ajuda = () => {
    alert("Recurso de ajuda será implementado em breve!");
  }

  return (
    <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 border-t border-white/20 border-b-0">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Lado esquerdo - Botão de Ajuda */}
        <div className="flex items-center">
          <button
            onClick={ajuda}
            title="Ajuda"
            className="!bg-white !text-gray-800 font-medium py-2 px-6 lg:py-3 lg:px-9 lg:text-lg rounded-full transition-all duration-200 hover:!bg-gray-900 hover:!text-white hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            Ajuda
          </button>
        </div>
        {/* Centro - Indicador de Fase Atual/Total */}
        <div className="flex items-center space-x-4">
          <div className="phase-indicator">
            <span className="text-white font-medium text-base lg:text-2xl">
              <span className="phase-current">{faseAtual}</span>
              <span className="phase-separator">/</span>
              <span className="phase-total">{totalFases}</span>
            </span>
          </div>
        </div>
        {/* Lado direito - Botão do Seletor de Fases */}
        <div className="flex items-center">
          <button
            onClick={onAbrirSeletor}
            title="Selecionar Fase"
            className="!bg-white !text-gray-800 font-medium py-2 px-6 lg:py-3 lg:px-9 lg:text-lg rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 hover:!bg-gray-900 hover:!text-white hover:scale-105 hover:shadow-lg"
          >
            Fases
          </button>
        </div>
      </div>
    </div>
  );
}