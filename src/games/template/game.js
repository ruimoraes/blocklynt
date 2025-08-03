import Phaser from "phaser";
import { usePhaserResize } from "../../utils/phaserResize";
import { setupGameController } from "../../shared/gameController";
import { gameEventBus } from "../../utils/gameEvents";

export const createGame = (parentElement, currentPhaseConfig) => ({
  type: Phaser.AUTO,
  width: '800',
  height: '600',
  scale: {
    mode: Phaser.Scale.EXPAND,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  backgroundColor: "#1e1e1e",
  parent: parentElement,
  scene: {
    preload() {
      this.currentPhaseConfig = currentPhaseConfig;
      this.load.setBaseURL("https://labs.phaser.io" );
      this.load.image("logo", "assets/sprites/phaser3-logo.png");
    },

    create() {
      this.currentPhaseConfig = currentPhaseConfig;

      const logo = this.add.image(400, 300, "logo");
      this.tweens.add({
        targets: logo,
        y: 400,
        duration: 1500,
        ease: "Sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      this.textValue = this.add.text(400, 100, 'Texto: ', {
        fontSize: '32px',
        fill: '#ffffff',
        fontFamily: 'Arial'
      }).setOrigin(0.5);

      this.imprimir = (texto) => {
        this.textValue.setText(texto);
      };

      const onExecuteCode = (code) => {
        const funcao = new Function(code);
        funcao.call(this); // Executa o código que chamará "this.imprimir"
      };

      const onReset = () => {
        this.textValue.setText('');
      };

      const onCheckSuccess = () => {
        if (
          this.currentPhaseConfig.goal.type === "text_match" &&
          this.textValue.text === this.currentPhaseConfig.goal.value
        ) {
          gameEventBus.gameSuccess();
        } else {
          gameEventBus.gameFailure();
        }
      };

      setupGameController(this, { onExecuteCode, onReset, onCheckSuccess });

      usePhaserResize(this, (gameSize) => {
        const { width, height } = gameSize;
        logo.setPosition(width / 2, height / 2);
        this.textValue.setPosition(width / 2, 100);
      });
    },
  },
});
