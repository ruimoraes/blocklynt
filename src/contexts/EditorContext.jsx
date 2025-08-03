import { createContext, useContext } from 'react';

const EditorContext = createContext();

export function EditorProvider({ children, gameConfig, faseAtual }) {
  const gameNameKey = `${gameConfig.gameId}-fase-${faseAtual}`;
  
  return (
    <EditorContext.Provider value={{ gameNameKey, gameConfig, faseAtual }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  return useContext(EditorContext);
}