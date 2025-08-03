class GameEventBus extends EventTarget {
  // Eventos que o React envia para o Phaser
  executeCode(code, workspace) {
    this.dispatchEvent(new CustomEvent('executeCode', { 
      detail: { 
        code: code,
        workspace: workspace
       } }));
  }

  resetGame() {
    this.dispatchEvent(new CustomEvent('resetGame'));
  }

  pauseGame() {
    this.dispatchEvent(new CustomEvent('pauseGame'));
  }

  // Eventos que o Phaser envia para o React
  gameSuccess() {
    this.dispatchEvent(new CustomEvent('gameSuccess'));
  }

  gameFailure() {
    this.dispatchEvent(new CustomEvent('gameFailure'));
  }

  gameReady() {
    this.dispatchEvent(new CustomEvent('gameReady'));
  }
}

export const gameEventBus = new GameEventBus();