import { Play, Loader, RotateCcw } from "lucide-react";
import { useGameState, GAME_STATES } from "../../contexts/GameStateContext";

export default function GameEditor({ 
  children, 
  onExecutar, 
  textoExecutar = "Executar", 
  textoReiniciar = "Reiniciar" 
 }) {
  const { estadoExecucao, executar, reiniciar } = useGameState();

  const isExecutando = estadoExecucao === GAME_STATES.EXECUTANDO;
  const precisaReiniciar = estadoExecucao === GAME_STATES.SUCESSO || estadoExecucao === GAME_STATES.FALHA;

  const handleClick = () => {
    if (isExecutando) return;
    
    if (precisaReiniciar) {
      reiniciar();
    } else {
      onExecutar?.(executar);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 min-h-0">{children}</div>
      <div className="py-4 flex flex-col items-center space-y-2">
        {/* Informações dos blocos podem ser exibidas aqui */}
        <button
          onClick={handleClick}
          disabled={isExecutando}
          className={`game-controls-custom flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 shadow-md ${
            isExecutando
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : precisaReiniciar
              ? "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
              : "bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 hover:from-red-600 hover:via-pink-600 hover:to-purple-700 text-white"
          } ${!isExecutando ? "hover:scale-105 hover:shadow-lg" : ""}`}
        >
          {isExecutando ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span>Executando...</span>
            </>
          ) : precisaReiniciar ? (
            <>
              <RotateCcw className="w-4 h-4" />
              <span>{textoReiniciar}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>{textoExecutar}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}