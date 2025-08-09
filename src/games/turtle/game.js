import Phaser from 'phaser';
import { setupGameController } from "../../shared/gameController";
import { gameEventBus } from "../../utils/gameEvents";
import { GameInterpreter } from '../../interpreters/GameInterpreter.js';
import { setupTurtleAPI } from "./interpreterSetup.js";
import turtleImg1 from './assets/1.png';
import turtleImg2 from './assets/2.png';

export const createGame = (parentElement, configFaseAtual) => ({
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 5
  },
  backgroundColor: "#000000ff",
  antialias: true,
  roundPixels: true,
  pixelArt: false,
  parent: parentElement,

  scene: {
    preload() {
      this.load.image('turtle1', turtleImg1);
      this.load.image('turtle2', turtleImg2);
    },

    init() {
      this.executionSpeed = 50;

      this.setExecutionSpeed = (speed) => {
        this.executionSpeed = Math.max(1, Math.min(100, speed));

        if (typeof this.updateSpeedUI === 'function') {
          this.updateSpeedUI();
        }
      };

      this.createSpeedControl = () => {
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;

        this.sliderWidth = Math.min(gameWidth - 40, 300);
        const controlHeight = 50;
        const centerX = gameWidth / 2;
        const bottomY = gameHeight - 35;

        const controlsContainer = this.add.container(centerX, bottomY);

        const bg = this.add.rectangle(0, 0, this.sliderWidth + 80, controlHeight, 0x000000, 0.85);
        bg.setOrigin(0.5, 0.5);
        controlsContainer.add(bg);

        const sliderBg = this.add.rectangle(0, 8, this.sliderWidth, 12, 0x444444);
        controlsContainer.add(sliderBg);

        this.sliderFill = this.add.rectangle(-this.sliderWidth / 2, 8, (this.executionSpeed / 100) * this.sliderWidth, 12, 0x00ff88);
        this.sliderFill.setOrigin(0, 0.5);
        controlsContainer.add(this.sliderFill);

        this.sliderHandle = this.add.circle((this.executionSpeed / 100 - 0.5) * this.sliderWidth, 8, 8, 0xffffff);
        this.sliderHandle.setInteractive({ useHandCursor: true });
        this.sliderHandle.setStrokeStyle(2, 0x333333);
        controlsContainer.add(this.sliderHandle);

        this.speedText = this.add.text(0, -12, `Velocidade: ${this.executionSpeed}%`, {
          fontSize: '14px',
          fill: '#ffffff',
          fontFamily: 'Arial'
        });
        this.speedText.setOrigin(0.5, 0.5);
        controlsContainer.add(this.speedText);

        let isDragging = false;

        this.sliderHandle.on('pointerdown', () => {
          isDragging = true;
        });

        this.input.on('pointermove', (pointer) => {
          if (isDragging) {
            const localX = pointer.x - centerX;
            const clampedX = Math.max(-this.sliderWidth / 2, Math.min(this.sliderWidth / 2, localX));
            const newSpeed = Math.round(((clampedX + this.sliderWidth / 2) / this.sliderWidth) * 100);
            this.setExecutionSpeed(newSpeed);
          }
        });

        this.input.on('pointerup', () => {
          isDragging = false;
        });

        sliderBg.setInteractive();
        sliderBg.on('pointerdown', (pointer) => {
          const localX = pointer.x - centerX;
          const clampedX = Math.max(-this.sliderWidth / 2, Math.min(this.sliderWidth / 2, localX));
          const newSpeed = Math.round(((clampedX + this.sliderWidth / 2) / this.sliderWidth) * 100);
          this.setExecutionSpeed(newSpeed);
        });

        controlsContainer.setDepth(9999);
      };

      this.updateSpeedUI = () => {
        if (this.speedText) {
          this.speedText.setText(`Velocidade: ${this.executionSpeed}%`);
        }
        if (this.sliderFill) {
          this.sliderFill.setSize((this.executionSpeed / 100) * this.sliderWidth, 12);
        }
        if (this.sliderHandle) {
          this.sliderHandle.x = (this.executionSpeed / 100 - 0.5) * this.sliderWidth;
        }
      };

      this.setupAllMethods = () => {
        this.turtleState = { x: 0, y: 0, angle: 0, penDown: true, penColour: 0x000000 };
        this.activeGraphics = null;

        this.playerColors = [];
        this.solutionColors = [];

        this.resetTurtle = () => {
          this.turtleState.x = this.game.config.width / 2;
          this.turtleState.y = this.game.config.height / 2;
          this.turtleState.angle = 0;
          this.turtleState.penDown = true;
          this.turtleState.penColour = 0xFFFFFF;

          if (this.turtleSprite) {
            this.turtleSprite.setPosition(this.turtleState.x, this.turtleState.y);
            this.turtleSprite.setAngle(0);
            this.turtleSprite.stop();
            this.turtleSprite.setTexture('turtle1');
          }
        };

        this.penColour = (color) => {
          if (typeof color === 'string') {
            if (color.startsWith('#')) {
              this.turtleState.penColour = parseInt(color.substring(1), 16);
            } else {
              const colorMap = {
                'red': 0xFF0000,
                'blue': 0x0000FF,
                'green': 0x00FF00,
                'yellow': 0xFFFF00,
                'white': 0xFFFFFF,
                'black': 0x000000
              };
              this.turtleState.penColour = colorMap[color.toLowerCase()] || 0xFFFFFF;
            }
          } else {
            this.turtleState.penColour = color;
          }

          if (this.activeGraphics === this.playerGraphics) {
            if (!this.playerColors.includes(this.turtleState.penColour)) {
              this.playerColors.push(this.turtleState.penColour);
            }
          } else if (this.activeGraphics === this.validationGraphics) {
            if (!this.solutionColors.includes(this.turtleState.penColour)) {
              this.solutionColors.push(this.turtleState.penColour);
            }
          }
        };

        this._moveInstant = (distance) => {
          const lastX = this.turtleState.x;
          const lastY = this.turtleState.y;
          const angleRad = Phaser.Math.DegToRad(this.turtleState.angle);

          this.turtleState.x += Math.cos(angleRad) * distance;
          this.turtleState.y -= Math.sin(angleRad) * distance;

          if (this.turtleState.penDown && this.activeGraphics) {
            this.activeGraphics.lineStyle(4, this.turtleState.penColour, 1);
            this.activeGraphics.lineBetween(lastX, lastY, this.turtleState.x, this.turtleState.y);

            if (this.activeGraphics === this.playerGraphics) {
              if (!this.playerColors.includes(this.turtleState.penColour)) {
                this.playerColors.push(this.turtleState.penColour);
              }
            } else if (this.activeGraphics === this.validationGraphics) {
              if (!this.solutionColors.includes(this.turtleState.penColour)) {
                this.solutionColors.push(this.turtleState.penColour);
              }
            }
          }
        };

        this._turnInstant = (angle) => {
          this.turtleState.angle += angle;
          this.turtleState.angle = this.turtleState.angle % 360;
          if (this.turtleState.angle < 0) {
            this.turtleState.angle += 360;
          }
        };

        this.move = (distance) => {
          return new Promise(resolve => {
            let duration;

            if (this.executionSpeed >= 90) {
              duration = 1;
            } else if (this.executionSpeed >= 75) {
              duration = 5;
            } else if (this.executionSpeed >= 50) {
              duration = 20;
            } else if (this.executionSpeed >= 25) {
              duration = 50;
            } else {
              duration = 100;
            }

            const angleRad = Phaser.Math.DegToRad(this.turtleState.angle);
            const targetX = this.turtleSprite.x + Math.cos(angleRad) * distance;
            const targetY = this.turtleSprite.y - Math.sin(angleRad) * distance;

            this.turtleSprite.play('turtle_walk');

            this.tweens.add({
              targets: this.turtleSprite,
              x: targetX,
              y: targetY,
              duration: duration,
              ease: 'Linear',
              onComplete: () => {
                this.turtleSprite.stop();
                this.turtleSprite.setTexture('turtle1');
                this.turtleSprite.x = targetX;
                this.turtleSprite.y = targetY;
                this._moveInstant(distance);
                resolve();
              }
            });
          });
        };

        this.turn = (angle) => {
          return new Promise(resolve => {
            let duration;

            if (this.executionSpeed >= 90) {
              duration = 1;
            } else if (this.executionSpeed >= 75) {
              duration = 5;
            } else if (this.executionSpeed >= 50) {
              duration = 20;
            } else if (this.executionSpeed >= 25) {
              duration = 50;
            } else {
              duration = 100;
            }

            this._turnInstant(angle);

            const currentSpriteAngle = this.turtleSprite.angle;
            const targetSpriteAngle = -this.turtleState.angle;

            let angleDiff = targetSpriteAngle - currentSpriteAngle;

            while (angleDiff > 180) angleDiff -= 360;
            while (angleDiff < -180) angleDiff += 360;

            const finalAngle = currentSpriteAngle + angleDiff;

            this.tweens.add({
              targets: this.turtleSprite,
              angle: finalAngle,
              duration: duration,
              ease: 'Linear',
              onComplete: () => {
                resolve();
              }
            });
          });
        };

        this.penDown = (isDown) => {
          this.turtleState.penDown = isDown;
        };

        this.highlightBlock = (id) => {
          if (this.workspace) this.workspace.highlightBlock(id);
          this.highlightPause = true;
        };

        this.checkAnswer = () => {
          try {
            this.solutionColors = [];

            const hasPlayerDrawing = this.playerGraphics &&
              this.playerGraphics.commandBuffer &&
              this.playerGraphics.commandBuffer.length > 0;

            if (!hasPlayerDrawing) {
              return false;
            }

            this.validationGraphics.clear();
            this.activeGraphics = this.validationGraphics;
            this.resetTurtle();
            this.turtleState.penColour = 0xFFFFFF;

            const move = (d) => this._moveInstant(d);
            const turn = (a) => this._turnInstant(a);
            const penDown = (s) => this.penDown(s);
            const penColour = (c) => this.penColour(c);

            try {
              eval(configFaseAtual.solutionCode);
            } catch (e) {
              return false;
            }

            return this.compareDrawings();

          } catch (error) {
            return false;
          }
        };

        // this.compareDrawings = () => {
        //   if (!this.compareColors(this.playerColors, this.solutionColors)) {
        //     return false;
        //   }

        //   const playerCommands = this.playerGraphics.commandBuffer?.length || 0;
        //   const solutionCommands = this.validationGraphics.commandBuffer?.length || 0;

        //   const commandRatio = Math.min(playerCommands, solutionCommands) / Math.max(playerCommands, solutionCommands);

        //   console.log(commandRatio)

        //   if (commandRatio < 0.9) {
        //     return false;
        //   }

        //   const playerBounds = this.calculateDrawingBounds(this.playerGraphics);
        //   const solutionBounds = this.calculateDrawingBounds(this.validationGraphics);

        //   if (playerBounds && solutionBounds) {
        //     const playerArea = playerBounds.width * playerBounds.height;
        //     const solutionArea = solutionBounds.width * solutionBounds.height;

        //     if (playerArea > 0 && solutionArea > 0) {
        //       const areaRatio = Math.min(playerArea, solutionArea) / Math.max(playerArea, solutionArea);

        //       if (areaRatio >= 0.8) {
        //         return true;
        //       } else {
        //         return false;
        //       }
        //     }
        //   }

        //   if (commandRatio > 0.95) {
        //     return true;
        //   }
        //   return false;
        // };
        this.compareDrawings = () => {
          if (!this.compareColors(this.playerColors, this.solutionColors)) {
            console.log('❌ Cores diferentes');
            return false;
          }

          const playerBounds = this.calculateDrawingBounds(this.playerGraphics);
          const solutionBounds = this.calculateDrawingBounds(this.validationGraphics);

          if (!playerBounds || !solutionBounds) {
            console.log('❌ Falta desenho');
            return false;
          }

          const playerArea = playerBounds.width * playerBounds.height;
          const solutionArea = solutionBounds.width * solutionBounds.height;

          if (playerArea > 0 && solutionArea > 0) {
            const areaRatio = Math.min(playerArea, solutionArea) / Math.max(playerArea, solutionArea);
            return areaRatio >= 0.95;
          }

          return false;
        };
        this.calculateDrawingBounds = (graphics) => {
          if (!graphics.commandBuffer || graphics.commandBuffer.length === 0) {
            return null;
          }

          let minX = Infinity, minY = Infinity;
          let maxX = -Infinity, maxY = -Infinity;
          let foundPoints = false;

          let i = 0;
          while (i < graphics.commandBuffer.length) {
            const cmd = graphics.commandBuffer[i];

            if (cmd === 6) {
              if (i + 11 < graphics.commandBuffer.length &&
                graphics.commandBuffer[i + 1] === 4 &&
                graphics.commandBuffer[i + 5] === 5 &&
                graphics.commandBuffer[i + 8] === 4 &&
                graphics.commandBuffer[i + 11] === 9) {

                const x1 = graphics.commandBuffer[i + 6];
                const y1 = graphics.commandBuffer[i + 7];
                const x2 = graphics.commandBuffer[i + 9];
                const y2 = graphics.commandBuffer[i + 10];

                minX = Math.min(minX, x1, x2);
                minY = Math.min(minY, y1, y2);
                maxX = Math.max(maxX, x1, x2);
                maxY = Math.max(maxY, y1, y2);
                foundPoints = true;

                i += 12;
              } else {
                i++;
              }
            } else {
              i++;
            }
          }

          if (!foundPoints || minX === Infinity) {
            return null;
          }

          return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
          };
        };

        this.compareColors = (playerColors, solutionColors) => {
          if (playerColors.length !== solutionColors.length) return false;

          const sortedPlayer = [...playerColors].sort();
          const sortedSolution = [...solutionColors].sort();

          return sortedSolution.every((color, index) => sortedPlayer[index] === color);
        };

        this.handleExecutionResult = (result) => {
          if (result === 'failure' || this.resultadoJogada === 'falha') {
            gameEventBus.gameFailure();
            return;
          }

          if (this.checkAnswer()) {
            gameEventBus.gameSuccess();
          } else {
            gameEventBus.gameFailure();
          }
        }
      };
    },

    create() {
      this.setupAllMethods();
      this.createSpeedControl();

      this.anims.create({
        key: 'turtle_walk',
        frames: [
          { key: 'turtle1' },
          { key: 'turtle2' }
        ],
        frameRate: 8,
        repeat: -1
      });

      this.solutionGraphics = this.add.graphics();
      this.playerGraphics = this.add.graphics();
      this.solutionGraphics.setAlpha(0.3);
      this.validationGraphics = this.add.graphics().setVisible(false);
      this.playerRT = this.add.renderTexture(0, 0, this.game.config.width, this.game.config.height).setVisible(false);
      this.validationRT = this.add.renderTexture(0, 0, this.game.config.width, this.game.config.height).setVisible(false);
      this.activeGraphics = this.playerGraphics;

      this.turtleSprite = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'turtle1');
      this.turtleSprite.setOrigin(0.5, 0.5);
      this.turtleSprite.setAngle(0);
      this.turtleSprite.setDepth(1000);

      this.gameInterpreter = new GameInterpreter({
        stepDelay: 5
      });

      this.setExecutionSpeed(this.executionSpeed);

      const drawSolution = () => {
        this.activeGraphics = this.solutionGraphics;
        this.resetTurtle();
        this.turtleState.penColour = 0x444444;

        const move = (d) => this._moveInstant(d);
        const turn = (a) => this._turnInstant(a);
        const penDown = (s) => this.penDown(s);
        const penColour = (c) => this.penColour(c);

        try {
          eval(configFaseAtual.solutionCode);
        } catch (e) {
          console.error("Erro ao desenhar a solução:", e);
        }
      };

      const executarCodigo = async (codigo, workspace) => {
        this.playerGraphics.clear();
        this.activeGraphics = this.playerGraphics;
        this.resetTurtle();
        this.playerColors = [];
        this.resultadoJogada = 'em_andamento';
        this.workspace = workspace;
        this.highlightPause = false;

        try {
          const result = await this.gameInterpreter.executeCode(
            codigo,
            setupTurtleAPI(this)
          );

          if (this.workspace)
            this.workspace.highlightBlock(null);

          if (result !== 'stopped_by_user') {
            this.handleExecutionResult(result);
          }

          this.handleExecutionResult(result);
        } catch (error) {
          this.resultadoJogada = 'falha';
          this.handleExecutionResult('failure');
        }
      };

      const resetar = () => {
        this.gameInterpreter.stop();
        this.resultadoJogada = 'em_andamento';

        if (this.workspace)
          this.workspace.highlightBlock(null);

        this.highlightPause = false;
        this.playerGraphics.clear();
      };

      setupGameController(this, {
        onExecuteCode: executarCodigo,
        onReset: resetar,
        onCheckSuccess: () => { }
      });

      drawSolution();
    }
  }
});