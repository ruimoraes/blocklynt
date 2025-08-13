import Phaser from 'phaser';
import { setupGameController } from "../../shared/gameController";
import { gameEventBus } from "../../utils/gameEvents";
import { GameInterpreter } from '../../interpreters/GameInterpreter.js';
import { setupSemaforoAPI } from "./interpreterSetup.js";

import motoca from './assets/motoca.png';
import rua from './assets/rua.png';
import truck from './assets/truck.png';
import car from './assets/car.png';
import police from './assets/police.png';
import city_sound from './assets/city_sound.mp3';
import beep_sound from './assets/beep.mp3';

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export const createGame = (parentElement, configFaseAtual) => ({
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 5
  },
  backgroundColor: "#a0d8f0ff",
  antialias: true,
  roundPixels: true,
  pixelArt: false,
  parent: parentElement,

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },

  scene: {
    preload() {
      this.load.image('motoca', motoca);
      this.load.image('rua', rua);
      this.load.image('truck', truck);
      this.load.image('car', car);
      this.load.image('police', police);
      this.load.audio('city_sound', city_sound);
      this.load.audio('beep_sound', beep_sound);
    },
    
    init() {
      this.semaforoEstado = {
        carros: 'verde',
        pedestre: 'vermelho',
        botaoPressionado: false,
      };
      
      this.onBotaoPedestrePressionadoCallbacks = [];
      
      this.definirBotaoPressionado = async (valor) => {
        this.semaforoEstado.botaoPressionado = valor;
        this.gameInterpreter.stop();
        await this.validarFase2();
        await this.validarFase3();
      };
      
      this.onBotaoPedestrePressionado = (callback) => {
        this.onBotaoPedestrePressionadoCallbacks.push(callback);
      };
      
      this.botaoPedestreClickHandler = () => {
        if (!this.semaforoEstado.botaoPressionado) {
          this.definirBotaoPressionado(true);
          this.onBotaoPedestrePressionadoCallbacks.forEach(cb => cb());
        }
      };
      
      this.mudarSemaforoCarros = (cor) => {
        this.semaforoEstado.carros = cor;
        this.updateSemaforoCarrosVisual();
      };
      
      this.mudarSemaforoPedestre = (cor) => {
        this.semaforoEstado.pedestre = cor;
        this.updateSemaforoPedestreVisual();
      };
      
      this.aguardarSegundos = (segundos) => {
        return new Promise(resolve => {
          setTimeout(resolve, segundos * 1000);
        });
      };
      
      this.updateSemaforoCarrosVisual = () => {
        if (!this.semaforoCarrosLuzVerde) return;
        
        const cor = this.semaforoEstado.carros;
        
        this.semaforoCarrosLuzVerde
          .setAlpha(cor === 'verde' ? 1 : 0.15)
          .setStrokeStyle(cor === 'verde' ? 4 : 1, 0x00ff00)
          .setFillStyle(cor === 'verde' ? 0x00ff00 : 0x003300);
          
        this.semaforoCarrosLuzAmarela
          .setAlpha(cor === 'amarelo' ? 1 : 0.15)
          .setStrokeStyle(cor === 'amarelo' ? 4 : 1, 0xffff00)
          .setFillStyle(cor === 'amarelo' ? 0xffff00 : 0x333300);
          
        this.semaforoCarrosLuzVermelha
          .setAlpha(cor === 'vermelho' ? 1 : 0.15)
          .setStrokeStyle(cor === 'vermelho' ? 4 : 1, 0xff0000)
          .setFillStyle(cor === 'vermelho' ? 0xff0000 : 0x330000);
      };
      
      this.updateSemaforoPedestreVisual = () => {
        if (!this.semaforoPedestreLuzVerde) return;
        
        const cor = this.semaforoEstado.pedestre;
        
        this.semaforoPedestreLuzVerde
          .setAlpha(cor === 'verde' ? 1 : 0.15)
          .setStrokeStyle(cor === 'verde' ? 4 : 1, 0x00ff00)
          .setFillStyle(cor === 'verde' ? 0x00ff00 : 0x003300);
          
        this.semaforoPedestreLuzVermelha
          .setAlpha(cor === 'vermelho' ? 1 : 0.15)
          .setStrokeStyle(cor === 'vermelho' ? 4 : 1, 0xff0000)
          .setFillStyle(cor === 'vermelho' ? 0xff0000 : 0x330000);
      };
      
      this.lastBeepTime = 0;
    },

    create() {
      const DEPTHS = {
        RUA: 0,
        VEICULOS: 10,
        INTERFACE: 20
      };

      this.add.rectangle(320, 240, 640, 480, 0x545454).setDepth(DEPTHS.RUA - 1);
      this.ruaFundo = this.add.image(320, 240, 'rua').setDisplaySize(640, 480).setDepth(DEPTHS.RUA);
      
      this.semaforoCarrosContainer = this.add.container(150, 150).setDepth(DEPTHS.INTERFACE);
      const carrosBox = this.add.rectangle(0, 0, 40, 100, 0x222222);
      this.semaforoCarrosContainer.add(carrosBox);
      
      this.semaforoCarrosLuzVerde = this.add.circle(0, 30, 12, 0x00ff00);
      this.semaforoCarrosLuzAmarela = this.add.circle(0, 0, 12, 0x555500);
      this.semaforoCarrosLuzVermelha = this.add.circle(0, -30, 12, 0x550000);
      this.semaforoCarrosContainer.add([this.semaforoCarrosLuzVerde, this.semaforoCarrosLuzAmarela, this.semaforoCarrosLuzVermelha]);
      
      this.semaforoPedestreContainer = this.add.container(450, 150).setDepth(DEPTHS.INTERFACE);
      const pedestreBox = this.add.rectangle(0, 0, 40, 70, 0x222222);
      this.semaforoPedestreContainer.add(pedestreBox);
      
      this.semaforoPedestreLuzVerde = this.add.circle(0, 15, 12, 0x00ff00);
      this.semaforoPedestreLuzVermelha = this.add.circle(0, -15, 12, 0xff0000);
      this.semaforoPedestreContainer.add([this.semaforoPedestreLuzVerde, this.semaforoPedestreLuzVermelha]);
      
      const botaoX = 580;
      const botaoY = 420;
      const botaoRaio = 40;

      this.botaoPedestreContainer = this.add.container(botaoX, botaoY).setDepth(DEPTHS.INTERFACE);
      const sombraBotao = this.add.circle(2, 3, botaoRaio, 0x006400);
      const corpoBotao = this.add.circle(0, 0, botaoRaio, 0x00CD00);
      corpoBotao.setStrokeStyle(2, 0x004400);

      const textoBotao = this.add.text(0, 0, 'APERTE\nPARA\nATRAVESSAR', {
        fontSize: '12px',
        fill: '#ffffff',
        align: 'center',
        fontStyle: 'bold',
        wordWrap: { width: botaoRaio * 2 }
      }).setOrigin(0.5);
      
      this.botaoPedestreContainer.add([sombraBotao, corpoBotao, textoBotao]);
      this.botaoPedestreContainer.setSize(botaoRaio * 2, botaoRaio * 2).setInteractive({ useHandCursor: true });
      this.botaoPedestreContainer.on('pointerdown', this.botaoPedestreClickHandler);      
      
      this.updateSemaforoCarrosVisual();
      this.updateSemaforoPedestreVisual();

      const larguraTela = 640;
      const alteruraTela = 480;
      const margemCalcada = larguraTela * 0.10;
      const margemCentral = 40;
      const faixaLargura = (larguraTela - 2 * margemCalcada - margemCentral) / 4;
      
      this.faixasConfig = [
        { x: margemCalcada + faixaLargura * 0.5, y: -50, descendo: true },
        { x: margemCalcada + faixaLargura * 1.5, y: -50, descendo: true },
        { x: larguraTela - margemCalcada - faixaLargura * 1.5, y: alteruraTela + 50, descendo: false },
        { x: larguraTela - margemCalcada - faixaLargura * 0.5, y: alteruraTela + 50, descendo: false }
      ];

      this.faixaGroups = [
        this.physics.add.group(), 
        this.physics.add.group(),
        this.physics.add.group(), 
        this.physics.add.group()
      ];

      this.faixaGroups.forEach(group => {
        group.setDepth(DEPTHS.VEICULOS);
        this.physics.add.collider(group, group);
      });

      this.spawnVeiculo = (faixaIndex) => {
        const config = this.faixasConfig[faixaIndex];
        const group = this.faixaGroups[faixaIndex];
        
        const tiposVeiculo = [
          { key: 'truck', scale: 1.125 }, 
          { key: 'car', scale: 1.0 },
          { key: 'motoca', scale: 0.875 }, 
          { key: 'police', scale: 1.0 }
        ];
        
        const tipo = tiposVeiculo[Math.floor(Math.random() * 9) < 8 ? Math.floor(Math.random() * 3) : 3];
        const sprite = group.create(config.x, config.y, tipo.key);
        
        sprite.setScale(tipo.scale).setAngle(config.descendo ? 180 : 0);
        
        const espacamentoObrigatorio = 60;
        sprite.body.setSize(sprite.width * 0.8, sprite.height + espacamentoObrigatorio);
        
        sprite.setData({
          descendo: config.descendo,
          velocidadeBase: rand(80, 120)
        });
        
        sprite.body.immovable = false;
      }

      this.gameInterpreter = new GameInterpreter({ stepDelay: 5 });
      this.cicloSemaforoAtivo = false;
      this.cicloSemaforoInterrompido = false;
      
      this.iniciarCicloSemaforo = async () => { 
        this.cicloSemaforoAtivo = true; 
        this.cicloSemaforoInterrompido = false; 
        
        while (this.cicloSemaforoAtivo && !this.cicloSemaforoInterrompido) { 
          if (this.cicloSemaforoInterrompido) break; 
          
          this.mudarSemaforoCarros('verde'); 
          await this.aguardarSegundos(5); 
          
          if (this.cicloSemaforoInterrompido) break; 
          
          this.mudarSemaforoCarros('amarelo'); 
          await this.aguardarSegundos(2); 
          
          if (this.cicloSemaforoInterrompido) break; 
          
          this.mudarSemaforoCarros('vermelho'); 
          await this.aguardarSegundos(7); 
        } 
      };
      
      this.interromperCicloSemaforo = () => { 
        this.cicloSemaforoInterrompido = true; 
      };
      
      this.validarFase2 = async () => { 
        if (configFaseAtual.id === 2 && this.semaforoEstado.botaoPressionado) { 
          await this.aguardarSegundos(2); 
          gameEventBus.gameSuccess(); 
        } 
      };
      
      this.validarFase3 = async () => { 
        if (configFaseAtual.id === 3 && this.semaforoEstado.botaoPressionado) { 
          await this.aguardarSegundos(2); 
          
          this.mudarSemaforoCarros('amarelo'); 
          this.mudarSemaforoPedestre('vermelho'); 
          await this.aguardarSegundos(5); 
          
          this.mudarSemaforoCarros('vermelho'); 
          this.mudarSemaforoPedestre('verde'); 
          await this.aguardarSegundos(2); 
          
          if (this.semaforoEstado.carros === 'vermelho' && this.semaforoEstado.pedestre === 'verde') { 
            gameEventBus.gameSuccess(); 
          } 
        } 
      };
      
      const executarCodigo = async (codigo, workspace) => { 
        if (this.sound.context.state === 'suspended') { 
          this.sound.context.resume(); 
        } 
        
        if (!this.citySound || !this.citySound.isPlaying) { 
          this.citySound.play(); 
        } 
        
        this.scene.resume(); 
        this.physics.world.resume(); 
        this.interromperCicloSemaforo(); 
        
        this.semaforoEstado.botaoPressionado = false; 
        this.mudarSemaforoCarros('verde'); 
        this.mudarSemaforoPedestre('vermelho'); 
        this.resultadoJogada = 'em_andamento'; 
        this.workspace = workspace; 
        
        if (configFaseAtual.id > 1) { 
          this.iniciarCicloSemaforo(); 
        } 
        
        try { 
          await this.gameInterpreter.executeCode(codigo, setupSemaforoAPI(this)); 
          
          if (this.workspace) this.workspace.highlightBlock(null); 
        } catch (error) { 
          this.resultadoJogada = 'falha'; 
          gameEventBus.gameFailure(); 
        } 
      };
      
      const resetar = () => { 
        this.gameInterpreter.stop(); 
        this.interromperCicloSemaforo(); 
        this.resultadoJogada = 'em_andamento'; 
        
        if (this.citySound && this.citySound.isPlaying) { 
          this.citySound.stop(); 
        } 
        
        this.scene.restart(); 
      };
      
      setupGameController(this, { 
        onExecuteCode: executarCodigo, 
        onReset: resetar, 
        onCheckSuccess: () => { } 
      });
      
      this.citySound = this.sound.add('city_sound', { loop: true, volume: 0.5 });
      this.physics.world.pause();
      this.scene.pause();
    },

    update(time, delta) {
      const alturaTela = this.scale.height;
      const centroDaTela = alturaTela / 2;
      const larguraFaixaPedestre = 50;
      const margemSeguranca = larguraFaixaPedestre * 0.30;
      const linhaDeParadaCima = centroDaTela - (larguraFaixaPedestre / 2) - margemSeguranca;
      const linhaDeParadaBaixo = centroDaTela + (larguraFaixaPedestre / 2) + margemSeguranca;
      const zonaDeDesaceleracao = 100;

      this.faixaGroups.forEach((group, index) => {
        const config = this.faixasConfig[index];
        const maxVeiculosPorFaixa = 3;

        if (group.countActive(true) < maxVeiculosPorFaixa) {
          let ultimoVeiculo = null;
          let veiculos = group.getChildren();
          
          if (veiculos.length > 0) {
            ultimoVeiculo = veiculos.reduce((a, b) => 
              config.descendo ? (a.y < b.y ? a : b) : (a.y > b.y ? a : b)
            );
          }
          
          let podeGerar = !ultimoVeiculo || 
            Phaser.Math.Distance.Between(0, ultimoVeiculo.y, 0, config.y) > ultimoVeiculo.body.height * 1.5;
            
          if (podeGerar) {
            this.spawnVeiculo(index);
          }
        }

        group.getChildren().forEach(veiculo => {
          const descendo = veiculo.getData('descendo');
          const velocidadeBase = veiculo.getData('velocidadeBase');
          let velocidadeFinal = descendo ? velocidadeBase : -velocidadeBase;

          const estadoSemaforo = this.semaforoEstado.carros;
          const jaPassouDoCruzamento = descendo ? veiculo.y > linhaDeParadaBaixo : veiculo.y < linhaDeParadaCima;

          veiculo.body.immovable = false;

          if (!jaPassouDoCruzamento) {
            const pontoDeParada = descendo ? linhaDeParadaCima : linhaDeParadaBaixo;
            const antesDoPontoDeParada = descendo ? veiculo.y < pontoDeParada : veiculo.y > pontoDeParada;

            if (estadoSemaforo === 'amarelo' && antesDoPontoDeParada) {
              velocidadeFinal *= 0.5;
            } else if (estadoSemaforo === 'vermelho') {
              if (this.semaforoEstado.carros === 'vermelho') {
                if (!this.lastBeepTime || time - this.lastBeepTime > 1000) {
                  this.sound.play('beep_sound', { volume: 0.7 });
                  this.lastBeepTime = time;
                }
              }
              
              if (antesDoPontoDeParada) {
                const distancia = Math.abs(veiculo.y - pontoDeParada);
                
                if (distancia < zonaDeDesaceleracao) {
                  const fator = Math.max(0, distancia / zonaDeDesaceleracao);
                  velocidadeFinal *= fator;
                  
                  if (distancia < 2) velocidadeFinal = 0;
                } else {
                  // Mantém velocidade normal se ainda está longe
                }
              } else {
                velocidadeFinal = 0;
              }
            } else {
              this.lastBeepTime = 0;
            }
          }

          if (Math.abs(veiculo.body.velocity.y) < 1) {
            veiculo.body.immovable = true;
          }

          veiculo.body.setVelocityY(velocidadeFinal);

          const foraDaTela = descendo ? veiculo.y > alturaTela + 150 : veiculo.y < -150;
          
          if (foraDaTela) {
            veiculo.destroy();
          }
        });
      });
    }
  }
});