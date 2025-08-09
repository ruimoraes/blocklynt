import Phaser from 'phaser';
import { setupGameController } from "../../shared/gameController";
import { gameEventBus } from "../../utils/gameEvents";
import { GameInterpreter } from '../../interpreters/GameInterpreter.js';
import { setupAutomatoAPI } from './interpreterSetup.js';

import tiles from './assets/tiles_pegman.png';
import pegman from './assets/pegman.png';
import marker from './assets/marker.png';

const TAMANHO_TILE = 50;
const PEGMAN_HEIGHT = 51;
const PEGMAN_WIDTH = 49;
const Direcao = { NORTE: 0, LESTE: 1, SUL: 2, OESTE: 3 };
const VELOCIDADE_ANIMACAO = 200;

export const createGame = (parentElement, configFaseAtual) => ({
  type: Phaser.AUTO,
  width: configFaseAtual.mapa[0].length * TAMANHO_TILE,
  height: configFaseAtual.mapa.length * TAMANHO_TILE,
  scale: {
    mode: Phaser.Scale.EXPAND,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  backgroundColor: "#F1EEE7",
  parent: parentElement,
  
  scene: {
    preload() {
      // Carregar assets do jogo
      this.load.image('marker', marker);
      this.load.spritesheet('tiles', tiles, {
        frameWidth: TAMANHO_TILE,
        frameHeight: TAMANHO_TILE,
      });
      this.load.spritesheet('pegman', pegman, {
        frameHeight: PEGMAN_HEIGHT,
        frameWidth: PEGMAN_WIDTH,
      });
    },

    init() {
      this.setupAllMethods = () => {
        this.atualizarVisualJogador = () => {
          if (this.posicaoJogador) {
            const posX = this.posicaoJogador.x * TAMANHO_TILE + TAMANHO_TILE / 2;
            const posY = this.posicaoJogador.y * TAMANHO_TILE + TAMANHO_TILE / 2 - 6;
            this.pegmanSprite.setPosition(posX, posY);

            const animacoesDirecao = [
              'pegman_idle_norte',  // NORTE = 0
              'pegman_idle_leste',  // LESTE = 1
              'pegman_idle_sul',    // SUL = 2
              'pegman_idle_oeste'   // OESTE = 3
            ];
            this.pegmanSprite.play(animacoesDirecao[this.direcaoJogador]);
          }
        };

        this.moverParaFrente = () => {
          if (this.resultadoJogada !== 'em_andamento') return;

          let { x, y } = this.posicaoJogador;

          if (this.direcaoJogador === Direcao.NORTE) y--;
          else if (this.direcaoJogador === Direcao.LESTE) x++;
          else if (this.direcaoJogador === Direcao.SUL) y++;
          else if (this.direcaoJogador === Direcao.OESTE) x--;

          const proximoTile = (this.mapa[y] && this.mapa[y][x] !== undefined) ? this.mapa[y][x] : -1;

          if (proximoTile === 0 || proximoTile === -1) {
            this.animarFalha();

            if (this.gameInterpreter) {
              this.gameInterpreter.stop();
            }

          } else {
            const novaX = x * TAMANHO_TILE + TAMANHO_TILE / 2;
            const novaY = y * TAMANHO_TILE + TAMANHO_TILE / 2 - 6;

            this.tweens.add({
              targets: this.pegmanSprite,
              x: novaX,
              y: novaY,
              duration: VELOCIDADE_ANIMACAO / 2,
              ease: 'Power2',
              onComplete: () => {
                this.posicaoJogador = { x, y };
                this.atualizarVisualJogador();
              }
            });
          }

        };

        this.animarFalha = () => {
          const deltaX = this.direcaoJogador === Direcao.LESTE ? 1 :
            this.direcaoJogador === Direcao.OESTE ? -1 : 0;
          const deltaY = this.direcaoJogador === Direcao.NORTE ? -1 :
            this.direcaoJogador === Direcao.SUL ? 1 : 0;

          const bounceX = this.pegmanSprite.x + (deltaX * TAMANHO_TILE / 4);
          const bounceY = this.pegmanSprite.y + (deltaY * TAMANHO_TILE / 4);

          this.tweens.add({
            targets: this.pegmanSprite,
            x: bounceX,
            y: bounceY,
            duration: VELOCIDADE_ANIMACAO / 3,
            yoyo: true,
            repeat: 1,
            ease: 'Power2',
            onComplete: () => {
              this.pegmanSprite.play('pegman_fall');
              this.resultadoJogada = 'falha';
            }
          });
        };

        this.virarEsquerda = () => {
          const novaDirecao = (this.direcaoJogador + 3) % 4;
          this.animarRotacao(novaDirecao);
        };

        this.virarDireita = () => {
          const novaDirecao = (this.direcaoJogador + 1) % 4;
          this.animarRotacao(novaDirecao);
        };

        this.animarRotacao = (novaDirecao) => {
          const direcaoAtual = this.direcaoJogador;
          const nomesDirecoes = ['norte', 'leste', 'sul', 'oeste'];
          const direcaoAtualNome = nomesDirecoes[direcaoAtual];
          const novaDirecaoNome = nomesDirecoes[novaDirecao];

          this.direcaoJogador = novaDirecao;

          const chaveAnimacao = `${direcaoAtualNome}_para_${novaDirecaoNome}`;

          if (this.anims.exists(chaveAnimacao)) {
            this.pegmanSprite.play(chaveAnimacao);

            const onRotationComplete = () => {
              this.atualizarVisualJogador();
              this.pegmanSprite.off('animationcomplete', onRotationComplete);
            };

            this.pegmanSprite.on('animationcomplete', onRotationComplete);
          } else {
            console.log(`Animação ${chaveAnimacao} não encontrada, usando visual direto`);
            this.atualizarVisualJogador();
          }
        };

        this.chegouNoAlvo = () => {
          return this.posicaoJogador.x === this.posicaoFinal.x && 
                 this.posicaoJogador.y === this.posicaoFinal.y;
        };

        this.haCaminho = (direcaoRelativa) => {
          let direcaoAbsoluta = this.direcaoJogador;
          if (direcaoRelativa === 'esquerda') {
            direcaoAbsoluta = (this.direcaoJogador + 3) % 4;
          } else if (direcaoRelativa === 'direita') {
            direcaoAbsoluta = (this.direcaoJogador + 1) % 4;
          }

          let { x, y } = this.posicaoJogador;
          if (direcaoAbsoluta === Direcao.NORTE) y--;
          else if (direcaoAbsoluta === Direcao.LESTE) x++;
          else if (direcaoAbsoluta === Direcao.SUL) y++;
          else if (direcaoAbsoluta === Direcao.OESTE) x--;

          const proximoTile = (this.mapa[y] && this.mapa[y][x] !== undefined) ? this.mapa[y][x] : -1;
          return proximoTile !== 0 && proximoTile !== -1;
        };

        this.animarVitoria = () => {
          const stepSpeed = 150;
          this.pegmanSprite.setFrame(16);
          setTimeout(() => this.pegmanSprite.setFrame(18), stepSpeed);
          setTimeout(() => this.pegmanSprite.setFrame(16), stepSpeed * 2);
          setTimeout(() => {
            const framesBase = [0, 4, 8, 12];
            this.pegmanSprite.setFrame(framesBase[this.direcaoJogador]);
          }, stepSpeed * 3);
        };

        this.highlightBlock = (id) => {
          if (this.workspace) this.workspace.highlightBlock(id);

          this.highlightPause = true;
        };

        this.handleExecutionResult = (result) => {
          if (result === 'failure' || this.resultadoJogada === 'falha') {
            gameEventBus.gameFailure();
            return;
          }
          if (this.chegouNoAlvo()) {
            this.animarVitoria();
            setTimeout(() => gameEventBus.gameSuccess(), 800);
          } else {
            gameEventBus.gameFailure();
          }
        };

        this.createAnimations = () => {
          this.anims.create({ key: 'pegman_idle_norte', frames: [{ key: 'pegman', frame: 0 }], frameRate: 1 });
          this.anims.create({ key: 'pegman_idle_leste', frames: [{ key: 'pegman', frame: 4 }], frameRate: 1 });
          this.anims.create({ key: 'pegman_idle_sul', frames: [{ key: 'pegman', frame: 8 }], frameRate: 1 });
          this.anims.create({ key: 'pegman_idle_oeste', frames: [{ key: 'pegman', frame: 12 }], frameRate: 1 });
          this.anims.create({ key: 'pegman_fall', frames: this.anims.generateFrameNumbers('pegman', { start: 18, end: 20 }), frameRate: 10, repeat: 0 });
          this.createRotationAnimations();
        };

        this.createRotationAnimations = () => {
          this.anims.create({ key: 'norte_para_leste', frames: [0,1,2,3,4].map(frame => ({ key: 'pegman', frame })), frameRate: 30 });
          this.anims.create({ key: 'norte_para_oeste', frames: [0,15,14,13,12].map(frame => ({ key: 'pegman', frame })), frameRate: 30 });
          this.anims.create({ key: 'oeste_para_sul', frames: [12,11,10,9,8].map(frame => ({ key: 'pegman', frame })), frameRate: 30 });
          this.anims.create({ key: 'oeste_para_norte', frames: [12,13,14,15,0].map(frame => ({ key: 'pegman', frame })), frameRate: 30 });
          this.anims.create({ key: 'leste_para_sul', frames: [4,5,6,7,8].map(frame => ({ key: 'pegman', frame })), frameRate: 30 });
          this.anims.create({ key: 'leste_para_norte', frames: [4,3,2,1,0].map(frame => ({ key: 'pegman', frame })), frameRate: 30 });
          this.anims.create({ key: 'sul_para_oeste', frames: [8,9,10,11,12].map(frame => ({ key: 'pegman', frame })), frameRate: 30 });
          this.anims.create({ key: 'sul_para_leste', frames: [8,7,6,5,4].map(frame => ({ key: 'pegman', frame })), frameRate: 30 });
        };

        this.createVisualGrid = (TILE_SHAPES, normalize) => {
          this.gradeVisual = this.add.group();
          for (let y = 0; y < this.mapa.length; y++) {
            for (let x = 0; x < this.mapa[y].length; x++) {
              let tileShape = normalize(x, y) + normalize(x, y - 1) + normalize(x + 1, y) + normalize(x, y + 1) + normalize(x - 1, y);
              if (!TILE_SHAPES[tileShape]) {
                tileShape = (tileShape === '00000' && Math.random() > 0.3) ? 'null0' : 'null' + Math.floor(1 + Math.random() * 4);
              }
              const [tileX, tileY] = TILE_SHAPES[tileShape];
              const frameIndex = tileY * 5 + tileX;
              const tileSprite = this.add.sprite(x * TAMANHO_TILE, y * TAMANHO_TILE, 'tiles', frameIndex);
              tileSprite.setDisplaySize(TAMANHO_TILE, TAMANHO_TILE);
              tileSprite.setOrigin(0);
              this.gradeVisual.add(tileSprite);
            }
          }
          for (let y = 0; y < this.mapa.length; y++) {
            for (let x = 0; x < this.mapa[y].length; x++) {
              if (this.mapa[y][x] === 3) {
                const markerImg = this.add.image(x * TAMANHO_TILE + TAMANHO_TILE / 2, y * TAMANHO_TILE + TAMANHO_TILE / 2 - 10, 'marker');
                markerImg.setDisplaySize(12, 20.04);
                markerImg.setOrigin(0.5);
                this.gradeVisual.add(markerImg);
              }
            }
          }
        };

        this.createPegmanSprite = () => {
          this.pegmanSprite = this.add.sprite(0, 0, 'pegman', 4);
          this.pegmanSprite.setDisplaySize(TAMANHO_TILE * 0.8, TAMANHO_TILE * 0.8);
          this.pegmanSprite.setOrigin(0.5);
          this.atualizarVisualJogador();
        };
      };
    },

    create() {
      this.setupAllMethods();

      this.gameInterpreter = new GameInterpreter({
        stepDelay: 20,
        pauseExec: true
      });

      this.mapa = configFaseAtual.mapa;
      this.resultadoJogada = 'em_andamento';

      const TILE_SHAPES = {
        '10010': [4, 0], '10001': [3, 3], '11000': [0, 1], '10100': [0, 2], '11010': [4, 1],
        '10101': [3, 2], '10110': [0, 0], '10011': [2, 0], '11001': [4, 2], '11100': [2, 3],
        '11110': [1, 1], '10111': [1, 0], '11011': [2, 1], '11101': [1, 2], '11111': [2, 2],
        'null0': [4, 3], 'null1': [3, 0], 'null2': [3, 1], 'null3': [0, 3], 'null4': [1, 3],
      };

      const normalize = (x, y) => {
        if (x < 0 || x >= this.mapa[0].length || y < 0 || y >= this.mapa.length) return '0';
        return (this.mapa[y][x] === 0) ? '0' : '1';
      };

      this.createAnimations();

      const encontrarPosicao = (tipo) => {
        for (let y = 0; y < this.mapa.length; y++) {
          for (let x = 0; x < this.mapa[y].length; x++) {
            if (this.mapa[y][x] === tipo) return { x, y };
          }
        }
        return null;
      };

      this.posicaoInicial = encontrarPosicao(2);
      this.posicaoFinal = encontrarPosicao(3);
      this.posicaoJogador = { ...this.posicaoInicial };
      this.direcaoJogador = Direcao.LESTE;

      this.createVisualGrid(TILE_SHAPES, normalize);
      this.createPegmanSprite();

      const executarCodigo = async (codigo, workspace) => {
        this.posicaoJogador = { ...this.posicaoInicial };
        this.direcaoJogador = Direcao.LESTE;
        this.resultadoJogada = 'em_andamento';
        this.atualizarVisualJogador();
        this.workspace = workspace;
        this.highlightPause = false;

        try {
          const result = await this.gameInterpreter.executeCode(
            codigo,
            setupAutomatoAPI(this, { animationSpeed: VELOCIDADE_ANIMACAO * 2 })
          );
          if (this.workspace) this.workspace.highlightBlock(null);
          this.handleExecutionResult(result);
        } catch (error) {
          console.error('❌ Falha na execução do código:', error);
          this.resultadoJogada = 'falha';
          this.handleExecutionResult('failure');
        }
      };

      const resetar = () => {
        this.gameInterpreter.stop();
        this.posicaoJogador = { ...this.posicaoInicial };
        this.direcaoJogador = Direcao.LESTE;
        this.resultadoJogada = 'em_andamento';
        this.atualizarVisualJogador();

        if (this.workspace) 
          this.workspace.highlightBlock(null);
        
        this.highlightPause = false;
      };

      setupGameController(this, {
        onExecuteCode: executarCodigo,
        onReset: resetar,
        onCheckSuccess: () => {}
      });
    }
  }
});
