import { gameEventBus } from "../utils/gameEvents";

export function setupGameController(scene, {
  onExecuteCode,
  onReset,
  onCheckSuccess
}) {
  if (scene.events.listenerCount('destroy') > 0 && scene._cleanupController) {
    scene.events.removeListener('destroy', scene._cleanupController);
  }

  const executeCodeHandler = (event) => {
    onExecuteCode.call(scene, event.detail.code, event.detail.workspace);
    onCheckSuccess.call(scene);
  };

  const resetGameHandler = () => {
    onReset.call(scene);
  };

  const stopExecutionHandler = () => {
    if (scene.gameInterpreter) {
      scene.gameInterpreter.stop();
    }
    if (scene.workspace) {
      scene.workspace.highlightBlock(null);
    }
  }  

  gameEventBus.addEventListener('executeCode', executeCodeHandler);
  gameEventBus.addEventListener('resetGame', resetGameHandler);
  gameEventBus.addEventListener('stopExecution', stopExecutionHandler);


  const cleanup = () => {
    gameEventBus.removeEventListener('executeCode', executeCodeHandler);
    gameEventBus.removeEventListener('resetGame', resetGameHandler);
    gameEventBus.removeEventListener('stopExecution', stopExecutionHandler);
  };

  scene._cleanupController = cleanup;
  scene.events.on('destroy', cleanup);


  gameEventBus.gameReady();
}