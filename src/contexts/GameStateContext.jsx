import React, { createContext, useContext, useEffect, useState, useRef } from 'react';


export const GAME_STATES = {
  PARADO: 'parado',
  EXECUTANDO: 'executando', 
  SUCESSO: 'sucesso',
  FALHA: 'falha'
};

const GameStateContext = createContext();

export function GameStateProvider({ children, gameConfig }) {
  const [estadoExecucao, setEstadoExecucao] = useState(GAME_STATES.PARADO);
  const [codigoGerado, setCodigoGerado] = useState('');

  const [faseAtual, setFaseAtual] = useState(1);
  const [fasesConcluidas, setFasesConcluidas] = useState([]);

  const storageKey = `${gameConfig.gameId}-fases-concluidas`;
  const initialized = useRef(false);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const debugParam = urlParams.get('debug');
    
    if (debugParam === 'true') {      
      const todas = Array.from({ length: gameConfig.fases.length }, (_, i) => i + 1);
      setFasesConcluidas(todas);
      localStorage.setItem(storageKey, JSON.stringify(todas));
      setFaseAtual(gameConfig.fases.length);
      return;
    }

    if (initialized.current) return;

    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      const fasesSalvas = JSON.parse(saved);

      setFasesConcluidas(fasesSalvas);
      
      if (fasesSalvas.length > 0) {
        const ultimaFaseConcluida = Math.max(...fasesSalvas);
        const proximaFase = ultimaFaseConcluida + 1;
        const faseParaSetar = proximaFase <= gameConfig.fases.length ? proximaFase : ultimaFaseConcluida;
        setFaseAtual(faseParaSetar);
      }
    }
    initialized.current = true;
  }, [storageKey, gameConfig.fases.length]);

  useEffect(() => {
    if (!initialized.current) return;

    localStorage.setItem(storageKey, JSON.stringify(fasesConcluidas));

  }, [fasesConcluidas, storageKey]);

  const executar = (codigo, workspace) => {
    setCodigoGerado({ codigo, workspace });
    setEstadoExecucao(GAME_STATES.EXECUTANDO);
  };

  const finalizarComSucesso = () => {
    setEstadoExecucao(GAME_STATES.SUCESSO);

    if (!fasesConcluidas.includes(faseAtual)) {
      setFasesConcluidas([...fasesConcluidas, faseAtual]);
    }
  };

  const finalizarComFalha = () => {
    setEstadoExecucao(GAME_STATES.FALHA);
  };

  const reiniciar = () => {
    setEstadoExecucao(GAME_STATES.PARADO);
    setCodigoGerado('');
  };

  const resetarProgresso = () => {
    setFasesConcluidas([]);
    setFaseAtual(1);
    localStorage.removeItem(storageKey);
  };

  const mudarFase = (numeroFase) => {
    setFaseAtual(numeroFase);
    setEstadoExecucao(GAME_STATES.PARADO);
    setCodigoGerado('');
  };  

  return (
    <GameStateContext.Provider value={{
      estadoExecucao,
      codigoGerado,
      executar,
      finalizarComSucesso,
      finalizarComFalha,
      reiniciar,
      faseAtual,
      setFaseAtual: mudarFase,
      fasesConcluidas,
      resetarProgresso,
      gameConfig
    }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState deve ser usado dentro de GameStateProvider');
  }
  return context;
}