import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { Panel, PanelGroup } from "react-resizable-panels";
import GameNavBar from "./GameNavBar";
import GameFaseInfo from "./GameFaseInfo";
import GameArea from "./GameArea";
import GameFooter from "./GameFooter";
import SeletorDeFases from "./SeletorDeFases";
import SucessoModal from "./SucessoModal"
import ResizeHandle from "./ResizeHandle";
import { useIsMobile } from "../../hooks/useIsMobile";
import { GameStateProvider, useGameState, GAME_STATES } from "../../contexts/GameStateContext";
import { EditorProvider } from "../../contexts/EditorContext";

function GameBaseContent({ gameFactory, gameConfig, editor }) {
  const gameContainerRef = useRef(null);
  const gameInstanceRef = useRef(null);
  const isInitializingRef = useRef(false);
  const isMobile = useIsMobile();
  const [modalFasesAberto, setModalFasesAberto] = useState(false);
  const [modalSucessoAberto, setModalSucessoAberto] = useState(false);

  const {
    faseAtual,
    setFaseAtual,
    resetarProgresso,
    estadoExecucao,
    codigoGerado,
    reiniciar
  } = useGameState();

  const currentPhase = gameConfig.fases[faseAtual - 1];

  useEffect(() => {
    if (gameInstanceRef.current && gameContainerRef.current) {
      const phaserScale = gameInstanceRef.current.scale;
      phaserScale.resize(
        gameContainerRef.current.clientWidth,
        gameContainerRef.current.clientHeight
      );
    }
  }, [isMobile]);

  useEffect(() => {
    if (isInitializingRef.current) {
      return;
    }

    isInitializingRef.current = true;

    if (gameInstanceRef.current) {
      try {
        gameInstanceRef.current.destroy(true);
      } catch (error) {
        console.warn("Erro ao destruir Phaser:", error);
      }
      gameInstanceRef.current = null;
    }

    // Aguardar um frame para garantir que o cleanup foi concluído
    const timeoutId = setTimeout(() => {
      try {
        if (!gameContainerRef.current) {
          console.warn("Container do jogo não disponível");
          isInitializingRef.current = false;
          return;
        }

        const config = gameFactory(gameContainerRef.current, currentPhase);
        gameInstanceRef.current = new Phaser.Game(config);

      } catch (error) {
        console.error("Erro ao inicializar Phaser:", error);
      } finally {
        isInitializingRef.current = false;
      }
    }, 10); // Pequeno delay para garantir cleanup

    return () => {
      clearTimeout(timeoutId);

      if (gameInstanceRef.current) {
        try {
          gameInstanceRef.current.destroy(true);
        } catch (error) {
          console.warn("Erro durante cleanup do Phaser:", error);
        }
        gameInstanceRef.current = null;
      }

      isInitializingRef.current = false;
    };
  }, [gameFactory, faseAtual]);

  const handleResetProgresso = () => {
    resetarProgresso();

    window.dispatchEvent(new CustomEvent('resetBlocklyWorkspace', {
      detail: { gameId: gameConfig.gameId }
    }));
  };

  useEffect(() => {
    if (estadoExecucao === GAME_STATES.SUCESSO) {
      setModalSucessoAberto(true);
    }
  }, [estadoExecucao]);

  const handleProximaFase = () => {
    const proximaFase = faseAtual + 1;
    if (proximaFase <= gameConfig.fases.length) {
      setFaseAtual(proximaFase);
    }

    setModalSucessoAberto(false);
    reiniciar();
  };

  const handleFecharModalSucesso = () => {
    setModalSucessoAberto(false);
  }

  const codigoParaExibir = React.useMemo(() => {
    if (!codigoGerado) return 'Nenhum código gerado';

    let codigo = '';

    if (typeof codigoGerado === 'string') {
      codigo = codigoGerado;
    } else if (typeof codigoGerado === 'object' && codigoGerado.codigo) {
      codigo = codigoGerado.codigo;
    } else {
      return 'Código não disponível';
    }

    const codigoLimpo = codigo
      .split('\n')
      .filter(linha => !linha.trim().startsWith('highlightBlock('))
      .join('\n')
      .trim();

    return codigoLimpo || codigo;
  }, [codigoGerado]);

  return (
    <div className="game-base-page flex flex-col h-screen w-screen">
      <GameNavBar title={`${gameConfig.gameName}`} />
      <GameFaseInfo dadosFase={currentPhase} numeroFase={faseAtual} />
      <div className="flex-1 min-h-0 flex flex-col">
        <PanelGroup
          direction={isMobile ? "vertical" : "horizontal"}
          className="h-full w-full"
        >
          <Panel defaultSize={isMobile ? 50 : 50} minSize={isMobile ? 50 : 50}>
            <EditorProvider gameConfig={gameConfig} faseAtual={faseAtual}>
              {typeof editor === "function"
                ? editor({ faseAtual: currentPhase, faseAtualIndex: faseAtual })
                : editor}
            </EditorProvider>
          </Panel>
          <ResizeHandle direction={isMobile ? "vertical" : "horizontal"} />
          <Panel defaultSize={isMobile ? 50 : 50} minSize={isMobile ? 10 : 10}>
            <GameArea>
              <div ref={gameContainerRef} className="w-full h-full" />
            </GameArea>
          </Panel>
        </PanelGroup>
      </div>

      <GameFooter
        gameConfig={gameConfig}
        faseAtual={faseAtual}
        onAbrirSeletor={() => setModalFasesAberto(true)}
      />

      <SeletorDeFases
        isVisible={modalFasesAberto}
        onClose={() => setModalFasesAberto(false)}
        faseAtual={faseAtual}
        gameConfig={gameConfig}
        onMudarFase={(fase) => {
          setFaseAtual(fase);
          setModalFasesAberto(false);
        }}
        onResetProgresso={handleResetProgresso}
      />

      <SucessoModal
        isOpen={modalSucessoAberto}
        onClose={handleFecharModalSucesso}
        onNextPhase={handleProximaFase}
        codigoGerado={codigoParaExibir}
        currentPhase={faseAtual}
        totalPhases={gameConfig.fases.length}
        canGoNext={faseAtual < gameConfig.fases.length}
      />
    </div>
  );
}

export default function GameBase({ gameFactory, gameConfig, title, editor }) {
  return (
    <GameStateProvider gameConfig={gameConfig}>
      <GameBaseContent
        gameFactory={gameFactory}
        gameConfig={gameConfig}
        title={title}
        editor={editor}
      />
    </GameStateProvider>
  );
}