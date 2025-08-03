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

  gameEventBus.addEventListener('executeCode', executeCodeHandler);
  gameEventBus.addEventListener('resetGame', resetGameHandler);

  const cleanup = () => {
    gameEventBus.removeEventListener('executeCode', executeCodeHandler);
    gameEventBus.removeEventListener('resetGame', resetGameHandler);
  };

  scene._cleanupController = cleanup;
  scene.events.on('destroy', cleanup);

  gameEventBus.gameReady();
}