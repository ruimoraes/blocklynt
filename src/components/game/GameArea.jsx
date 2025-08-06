import { useEffect, useState } from 'react';
import { useGameState, GAME_STATES } from '../../contexts/GameStateContext';
import { gameEventBus } from '../../utils/gameEvents';
import ConfettiOverlay from './ConfettiOverlay';

export default function GameArea({ children, blocosRestantes = null }) {
  const { 
    estadoExecucao, 
    codigoGerado,
    workspace,
    finalizarComSucesso, 
    finalizarComFalha 
  } = useGameState();

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const handleGameSuccess = () => {
      finalizarComSucesso();
      setShowConfetti(true);
    };
    
    const handleGameFailure = () => {
      finalizarComFalha();
    };

    gameEventBus.addEventListener('gameSuccess', handleGameSuccess);
    gameEventBus.addEventListener('gameFailure', handleGameFailure);

    return () => {
      gameEventBus.removeEventListener('gameSuccess', handleGameSuccess);
      gameEventBus.removeEventListener('gameFailure', handleGameFailure);
    };
  }, [finalizarComSucesso, finalizarComFalha]);
  

  useEffect(() => {    
    switch (estadoExecucao) {
      case GAME_STATES.EXECUTANDO:
        if (codigoGerado) {
        const codigo = typeof codigoGerado === 'string' ? codigoGerado : codigoGerado.codigo;
        const workspace = typeof codigoGerado === 'object' ? codigoGerado.workspace : null;
                  
          gameEventBus.executeCode(codigo, workspace);
        }
        break;
      case GAME_STATES.PARADO:
        gameEventBus.resetGame();
        setShowConfetti(false);
        break;
    }
  }, [estadoExecucao, codigoGerado, workspace]);

  return (
    <div 
      className="w-full h-full overflow-hidden relative flex items-center justify-center game-area-container" 
      style={{ backgroundColor: "#F1EEE7" }}
      id="visualization"
    >
      <ConfettiOverlay isActive={showConfetti} />
      
      {/* Indicador de blocos restantes */}
      {blocosRestantes !== null && (
        <div id="capacityBubble">
          <div id="capacity" style={{ display: 'block' }}>
            Blocos restantes: <span className="capacityNumber">{blocosRestantes}</span>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-center w-full h-full phaser-container">
        {children}
      </div>
    </div>
  );
}
