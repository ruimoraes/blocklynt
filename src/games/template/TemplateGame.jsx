import React, { useEffect, useRef } from "react";
import GameBase from "../../components/game/GameBase";
import GameEditor from "../../components/game/GameEditor";
import BlocklyEditor from "../../components/game/editors/BlocklyEditor";
import { createGame } from "./game";
import { gameConfig } from "./config";
import { registerTemplateBlocks, templateToolbox} from "./blocks";
import { javascriptGenerator } from "blockly/javascript";

export default function TemplateGame() {
  const workspaceRef = useRef(null);

  useEffect(() => {
    registerTemplateBlocks();
  }, []);

  const handleExecutar = (executarCallback) => {
    if (!workspaceRef.current) {
      return;
    }

    const blocos = workspaceRef.current.getAllBlocks();
    
    if (blocos.length > 0) {
      const codigo = javascriptGenerator.workspaceToCode(workspaceRef.current);      
      executarCallback(codigo);
    }
  };

  return (
    <GameBase
      gameFactory={createGame}
      gameConfig={gameConfig}
      editor={
        <GameEditor onExecutar={handleExecutar}>
          <BlocklyEditor
            toolboxJson={templateToolbox}
            ref={workspaceRef}
          />
        </GameEditor>
      }
    />
  );
}