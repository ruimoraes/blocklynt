import React, { useEffect, useRef } from "react";
import GameBase from "../../components/game/GameBase";
import GameEditor from "../../components/game/GameEditor";
import BlocklyEditor from "../../components/game/editors/BlocklyEditor";
import { createGame } from "./game";
import { gameConfig } from "./config";
import { registerAutomatoBlocks, generateDynamicToolbox } from './blocks';
import { javascriptGenerator } from "blockly/javascript";
import { validateBlocklyWorkspace } from "../../utils/blocklyValidation";

export default function AutomatoGame() {
  const workspaceRef = useRef(null);

  useEffect(() => {
    registerAutomatoBlocks();
  }, []);

  const handleExecutar = (executarCallback) => {
    if (!workspaceRef.current) {
      return;
    }

    const validation = validateBlocklyWorkspace(workspaceRef.current, {
      allowMultipleTopBlocks: false,
      preferredStartBlocks: ['start', 'when_run', 'main'],
      logLevel: 'info'
    });

    if (!validation.isValid) {
      console.error("❌ Execução cancelada: workspace inválida");
      return;
    }

    const blocos = workspaceRef.current.getAllBlocks();
    
    if (blocos.length > 0) {
      const codigo = javascriptGenerator.workspaceToCode(workspaceRef.current);      
      executarCallback(codigo, workspaceRef.current);
    }

    if (validation.reEnableBlocks) {
      setTimeout(validation.reEnableBlocks, 100);
    }

  };

  return (
    <GameBase
      gameFactory={createGame}
      gameConfig={gameConfig}
      editor={({ faseAtual }) => (
        <GameEditor onExecutar={handleExecutar}>
          <BlocklyEditor
            toolboxJson={generateDynamicToolbox(faseAtual.allowedBlocks)}
            ref={workspaceRef}
          />
        </GameEditor>
      )}
    />
  );
}