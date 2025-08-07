/**
 * Helpers para criar wrappers de funções para o js-interpreter
 * Fornece métodos utilitários para registrar ações, condições e funções especiais
 */
export class ApiHelpers {
  /**
   * Cria wrapper para ações do jogo (funções assíncronas com delay)
   * @param {object} scene - Cena do jogo que contém o método
   * @param {string} methodName - Nome do método a ser chamado
   * @param {number} animationDelay - Delay após execução (ms)
   * @returns {function} - Wrapper para o js-interpreter
   */
  static createActionWrapper(scene, methodName, animationDelay = 100) {
    return (callback) => {
      // Chama o método no scene
      if (scene[methodName] && typeof scene[methodName] === 'function') {
        scene[methodName]();
      } else {
        console.warn(`Method '${methodName}' not found in scene`);
      }
      
      // Aguarda animação terminar antes de chamar callback
      setTimeout(callback, animationDelay);
    };
  }

  /**
   * Cria wrapper para condições do jogo (funções síncronas)
   * @param {object} scene - Cena do jogo que contém o método
   * @param {string} methodName - Nome do método a ser chamado
   * @returns {function} - Wrapper para o js-interpreter
   */
  static createConditionWrapper(scene, methodName) {
    return (...args) => {
      if (scene[methodName] && typeof scene[methodName] === 'function') {
        return scene[methodName](...args);
      } else {
        console.warn(`Method '${methodName}' not found in scene`);
        return false;
      }
    };
  }

  /**
   * Cria wrapper para função de highlight de blocos
   * @param {object} scene - Cena do jogo
   * @returns {function} - Wrapper para highlight
   */
  static createHighlightWrapper(scene) {
    return (id) => {
      const blockId = String(id || '');
      
      // Chamar método de highlight se disponível
      if (scene.highlightBlock && typeof scene.highlightBlock === 'function') {
        scene.highlightBlock(blockId);
      } else if (scene.workspace?.highlightBlock) {
        scene.workspace.highlightBlock(blockId);
      }
      
      // Marcar pausa para highlight se suportado
      if (scene.highlightPause !== undefined) {
        scene.highlightPause = true;
      }
    };
  }

  /**
   * Registra uma função no escopo global do interpreter
   * @param {object} interpreter - Instância do js-interpreter
   * @param {object} globalScope - Escopo global do interpreter
   * @param {string} name - Nome da função
   * @param {function} wrapper - Função wrapper
   * @param {boolean} isAsync - Se a função é assíncrona
   */
  static registerFunction(interpreter, globalScope, name, wrapper, isAsync = false) {
    const func = isAsync 
      ? interpreter.createAsyncFunction(wrapper)
      : interpreter.createNativeFunction(wrapper);
    
    interpreter.setProperty(globalScope, name, func);
  }

  /**
   * Registra múltiplas funções de uma vez
   * @param {object} interpreter - Instância do js-interpreter
   * @param {object} globalScope - Escopo global do interpreter
   * @param {Array} functions - Array de objetos {name, wrapper, isAsync}
   */
  static registerMultipleFunctions(interpreter, globalScope, functions) {
    functions.forEach(({ name, wrapper, isAsync = false }) => {
      this.registerFunction(interpreter, globalScope, name, wrapper, isAsync);
    });
  }
}