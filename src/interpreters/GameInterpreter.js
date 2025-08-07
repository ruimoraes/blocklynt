import Interpreter from 'js-interpreter';

/**
 * Interpretador simplificado para execução de código JavaScript em jogos
 * Wrapper minimalista sobre js-interpreter com controle de execução
 */
export class GameInterpreter {
  constructor(config = {}) {
    this.config = {
      stepDelay: 20, // Delay entre steps do interpreter (ms)
      ...config
    };
    this.interpreter = null;
    this.isRunning = false;
    this.shouldStop = false;
  }

  /**
   * Executa código JavaScript com API customizada
   * @param {string} code - Código JavaScript a ser executado
   * @param {function} apiSetupFunction - Função que configura a API do interpreter
   * @returns {Promise<string>} - Resultado da execução ('completed', 'stopped', ou erro)
   */
  async executeCode(code, apiSetupFunction) {
    if (this.isRunning) {
      throw new Error('Interpreter already running');
    }

    this.isRunning = true;
    this.shouldStop = false;

    try {
      // Criar interpreter com API customizada
      this.interpreter = new Interpreter(code, apiSetupFunction);
      
      // Executar código step by step
      const result = await this._runSteps();
      return result;
    } finally {
      this.isRunning = false;
      this.interpreter = null;
    }
  }

  /**
   * Para a execução do código
   */
  stop() {
    this.shouldStop = true;
  }

  /**
   * Executa os steps do interpreter de forma assíncrona
   * @private
   */
  _runSteps() {
    return new Promise((resolve, reject) => {
      const step = () => {
        if (this.shouldStop) {
          resolve('stopped');
          return;
        }

        let hasMoreCode;
        try {
          hasMoreCode = this.interpreter.step();
        } catch (error) {
          reject(error);
          return;
        }

        if (!hasMoreCode) {
          resolve('completed');
          return;
        }

        // Continuar execução após delay
        setTimeout(step, this.config.stepDelay);
      };

      step();
    });
  }

  /**
   * Verifica se o interpreter está executando
   */
  get running() {
    return this.isRunning;
  }
}