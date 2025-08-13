import { ApiHelpers } from '../../interpreters/ApiHelpers.js';

export const setupSemaforoAPI = (scene, config = {}) => {
  const getAnimationDelay = () => {
    if (scene.executionSpeed >= 75) return 1;
    if (scene.executionSpeed >= 50) return 2;
    if (scene.executionSpeed >= 25) return 5;
    return 10;
  };

  return (interpreter, globalScope) => {
    ApiHelpers.registerFunction(
      interpreter,
      globalScope,
      'mudarSemaforo',
      ApiHelpers.createActionWrapper(scene, 'mudarSemaforoCarros', getAnimationDelay()),
      true
    );

    ApiHelpers.registerFunction(
      interpreter,
      globalScope,
      'mudarSemaforoPedestre',
      ApiHelpers.createActionWrapper(scene, 'mudarSemaforoPedestre', getAnimationDelay()),
      true
    );

    ApiHelpers.registerFunction(
      interpreter,
      globalScope,
      'aguardarSegundos',
      ApiHelpers.createActionWrapper(scene, 'aguardarSegundos'),
      true
    );

    ApiHelpers.registerFunction(
      interpreter,
      globalScope,
      'definirBotaoPressionado',
      ApiHelpers.createActionWrapper(scene, 'definirBotaoPressionado', 0),
      true
    );

    interpreter.setProperty(globalScope, 'quandoBotaoPedestrePressionado',
      interpreter.createAsyncFunction(function (callback) {
        scene.onBotaoPedestrePressionado(() => {
          if (callback && typeof callback === 'object' && callback.type === 'function') {
            interpreter.stateStack.push({
              node: callback.node,
              scope: interpreter.getScope(),
              thisExpression: interpreter.globalObject,
              done: false,
              isLoop: false
            });
            while (interpreter.step()) { /* executa callback */ }
          }
        });
      })
    );

    ApiHelpers.registerFunction(
      interpreter,
      globalScope,
      'highlightBlock',
      ApiHelpers.createHighlightWrapper(scene),
      false
    );
  };
};
