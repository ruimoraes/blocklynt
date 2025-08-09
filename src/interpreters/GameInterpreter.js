import Interpreter from 'js-interpreter';

export class GameInterpreter {
  constructor(config = {}) {
    this.config = {
      stepDelay: 20,
      ...config
    };
    this.interpreter = null;
    this.isRunning = false;
    this.shouldStop = false;
    this.pause = 0;
  }

  async executeCode(code, apiSetupFunction) {
    if (this.isRunning) {
      throw new Error('Interpreter already running');
    }

    this.isRunning = true;
    this.shouldStop = false;
    this.pause = 0;

    try {      
      this.interpreter = new Interpreter(code, apiSetupFunction);
            
      if (!this.interpreter.ast || !this.interpreter.ast.body || this.interpreter.ast.body.length === 0) {
        console.warn('No code to execute - empty AST');
        return 'completed';
      }
      
      const result = await this._runSteps();
      return result;
    } catch (error) {
      console.error('Error in executeCode:', error);
      throw error;
    } finally {
      this.isRunning = false;
      this.interpreter = null;
    }
  }

  stop() {
    this.shouldStop = true;
  }

  setPause(pauseValue) {
    this.pause = pauseValue;
  }

  _runSteps() {
    return new Promise((resolve, reject) => {
      let stepCount = 0;
      
      const executeChunk = () => {
        this.pause = 0;
        let ticks = 1000; 
        let go;
        
        do {
          if (this.shouldStop) {
            resolve('stopped');
            return;
          }
          stepCount++;

          try {
            go = this.interpreter.step();
          } catch (error) {
            console.error(`Error in step ${stepCount}:`, error);
            reject(error);
            return;
          }

          if (!go) {
            resolve('completed');
            return;
          }

          // Forçar pausa para evitar travamento
          if (!ticks--) {
            this.pause = 1;
          }

          if (go && this.pause) {
            go = false;
            setTimeout(executeChunk, this.pause);
          }
        } while (go);

        // Se não há pausa, continuar imediatamente
        if (!this.pause) {
          resolve('completed');
        }
      };

      executeChunk();
    });
  }

  get running() {
    return this.isRunning;
  }
}