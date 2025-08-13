'use strict';

import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

const HUE_SEMAFORO = '#4CAF50';
const HUE_PEDRESTRE = '#2196F3';
const HUE_CONTROLE = '#FF9800';

const defineBlocks = () => {

  Blockly.Blocks['mudar_semaforo'] = {
    init: function () {
      this.jsonInit({
        "message0": "mudar semáforo para %1",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "COR",
            "options": [
              ["verde", "verde"],
              ["amarelo", "amarelo"],
              ["vermelho", "vermelho"]
            ]
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": HUE_SEMAFORO,
        "tooltip": "Muda a cor do semáforo dos carros."
      });
    }
  };

  Blockly.Blocks['mudar_semaforo_pedestre'] = {
    init: function () {
      this.jsonInit({
        "message0": "mudar semáforo de pedestre para %1",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "COR",
            "options": [
              ["verde", "verde"],
              ["vermelho", "vermelho"]
            ]
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": HUE_PEDRESTRE,
        "tooltip": "Muda a cor do semáforo de pedestre."
      });
    }
  };

  Blockly.Blocks['aguardar_segundos'] = {
    init: function () {
      this.jsonInit({
        "message0": "aguardar %1 segundos",
        "args0": [
          {
            "type": "field_number",
            "name": "TEMPO",
            "value": 1,
            "min": 0,
            "max": 60
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": HUE_SEMAFORO,
        "tooltip": "Espera o tempo definido antes de continuar."
      });
    }
  };

  Blockly.Blocks['quando_botao_pedestre_pressionado'] = {
    init: function () {
      this.jsonInit({
        "message0": "quando botão pedestre pressionado",
        "message1": "faça %1",
        "args1": [
          {
            "type": "input_statement",
            "name": "DO"
          }
        ],
        "colour": HUE_PEDRESTRE,
        "tooltip": "Evento disparado quando o botão de pedestre for pressionado."
      });
    }
  };

  Blockly.Blocks['controle_se'] = {
    init: function () {
      this.jsonInit({
        "message0": "se %1 então",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "COND",
            "options": [
              ["botaoPressionado == verdadeiro", "true"],
              ["botaoPressionado == falso", "false"]
            ]
          }
        ],
        "message1": "faça %1",
        "args1": [
          {
            "type": "input_statement",
            "name": "DO"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": HUE_CONTROLE,
        "tooltip": "Estrutura condicional para executar blocos se condição for verdadeira."
      });
    }
  };

  Blockly.Blocks['definirBotaoPressionado'] = {
    init: function () {
      this.jsonInit({
        "message0": "definir botaoPressionado para %1",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "VALOR",
            "options": [
              ["verdadeiro", "true"],
              ["falso", "false"]
            ]
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": HUE_CONTROLE,
        "tooltip": "Define o valor da variável botaoPressionado."
      });
    }
  };

};

const defineGenerators = () => {
  
  javascriptGenerator.forBlock['mudar_semaforo'] = (block) => {
    const cor = block.getFieldValue('COR');
    return `mudarSemaforo('${cor}');\n`;
  };

  javascriptGenerator.forBlock['mudar_semaforo_pedestre'] = (block) => {
    const cor = block.getFieldValue('COR');
    return `mudarSemaforoPedestre('${cor}');\n`;
  };

  javascriptGenerator.forBlock['aguardar_segundos'] = (block) => {
    const tempo = Number(block.getFieldValue('TEMPO'));
    return `aguardarSegundos(${tempo});\n`;
  };

  javascriptGenerator.forBlock['quando_botao_pedestre_pressionado'] = (block) => {
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `quandoBotaoPedestrePressionado(function() {\n${statements}});\n`;
  };

  javascriptGenerator.forBlock['controle_se'] = (block) => {
    const cond = block.getFieldValue('COND');
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `if (botaoPressionado == ${cond}) {\n${statements}}\n`;
  };

  javascriptGenerator.forBlock['definirBotaoPressionado'] = (block) => {
    const valor = block.getFieldValue('VALOR');
    return `definirBotaoPressionado('${valor}');\n`;
  };
};

export const registerSemaforoBlocks = () => {
  defineBlocks();
  defineGenerators();
};

export const semaforoToolbox = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Semáforo Carros",
      "colour": HUE_SEMAFORO,
      "contents": [
        { "kind": "block", "type": "mudar_semaforo" },
        { "kind": "block", "type": "aguardar_segundos" }
      ]
    },
    {
      "kind": "category",
      "name": "Semáforo Pedestre",
      "colour": HUE_PEDRESTRE,
      "contents": [
        { "kind": "block", "type": "mudar_semaforo_pedestre" },
        { "kind": "block", "type": "quando_botao_pedestre_pressionado" }
      ]
    },
    {
      "kind": "category",
      "name": "Controle",
      "colour": HUE_CONTROLE,
      "contents": [
        { "kind": "block", "type": "definirBotaoPressionado" },
        { "kind": "block", "type": "controle_se" }
      ]
    }
  ]
};
