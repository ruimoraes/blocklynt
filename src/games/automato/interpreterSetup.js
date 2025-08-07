import { ApiHelpers } from '../../interpreters/ApiHelpers.js';

/**
 * Configura a API do Automato para o js-interpreter
 * @param {object} scene - Cena do jogo Phaser
 * @param {object} config - Configurações de velocidade e animação
 * @returns {function} - Função de setup para o interpreter
 */
export const setupAutomatoAPI = (scene, config = {}) => {
  const animationDelay = config.animationSpeed || 100;
  
  return (interpreter, globalScope) => {

    // ===== COMANDOS DE MOVIMENTO (ASSÍNCRONOS) =====    

    ApiHelpers.registerFunction(
      interpreter, 
      globalScope, 
      'moverParaFrente',
      ApiHelpers.createActionWrapper(scene, 'moverParaFrente', animationDelay),
      true
    );

    ApiHelpers.registerFunction(
      interpreter, 
      globalScope, 
      'virarEsquerda',
      ApiHelpers.createActionWrapper(scene, 'virarEsquerda', animationDelay),
      true
    );

    ApiHelpers.registerFunction(
      interpreter, 
      globalScope, 
      'virarDireita',
      ApiHelpers.createActionWrapper(scene, 'virarDireita', animationDelay),
      true
    );

    // ===== COMANDOS DE CONDIÇÃO (SÍNCRONOS) =====

    ApiHelpers.registerFunction(
      interpreter, 
      globalScope, 
      'chegouNoAlvo',
      ApiHelpers.createConditionWrapper(scene, 'chegouNoAlvo'),
      false
    );

    ApiHelpers.registerFunction(
      interpreter, 
      globalScope, 
      'haCaminho',
      ApiHelpers.createConditionWrapper(scene, 'haCaminho'),
      false
    );

    // ===== FUNÇÕES ESPECIAIS =====
    
    ApiHelpers.registerFunction(
      interpreter, 
      globalScope, 
      'highlightBlock',
      ApiHelpers.createHighlightWrapper(scene),
      false
    );
  };
};


export const AUTOMATO_COMMANDS = {
  ACTIONS: [
    'moverParaFrente',
    'virarEsquerda', 
    'virarDireita'
  ],
  CONDITIONS: [
    'chegouNoAlvo',
    'haCaminho'
  ],
  SPECIAL: [
    'highlightBlock'
  ]
};