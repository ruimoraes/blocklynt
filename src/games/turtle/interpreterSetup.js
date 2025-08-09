import { ApiHelpers } from '../../interpreters/ApiHelpers.js';

export const setupTurtleAPI = (scene, config = {}) => {
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
      'move',
      ApiHelpers.createActionWrapper(scene, 'move', getAnimationDelay()),
      true
    );

    ApiHelpers.registerFunction(
      interpreter,
      globalScope,
      'turn',
      ApiHelpers.createActionWrapper(scene, 'turn', getAnimationDelay()),
      true
    );

    ApiHelpers.registerFunction(
      interpreter,
      globalScope,
      'penDown',
      ApiHelpers.createConditionWrapper(scene, 'penDown'),
      false
    );

    ApiHelpers.registerFunction(
      interpreter,
      globalScope,
      'penColour',
      ApiHelpers.createConditionWrapper(scene, 'penColour'),
      false
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

export const TURTLE_COMMANDS = {
  ACTIONS: [
    'move',
    'turn'
  ],
  CONDITIONS: [
    'penDown',
    'penColour'
  ],
  SPECIAL: [
    'highlightBlock'
  ]
};
