'use strict';

import * as Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";

// --- Constantes de Configuração ---
const HUE_TARTARUGA = "#4CAF50";
const HUE_COR = "#9C27B0";
const HUE_REPETICAO = "#FF9800";

// Opções do Dropdown (a aparência para o usuário não muda)
const MOVE_OPTIONS = [["avançar", 'forward'], ["recuar", 'backward']];
const DISTANCE_OPTIONS = [['20', '20'], ['50', '50'], ['100', '100'], ['150', '150']];
const TURN_OPTIONS = [[`virar a direita ↻`, 'right'], [`virar a esquerda ↺`, 'left']];
const ANGLE_OPTIONS = [['1°', '1'], ['45°', '45'], ['72°', '72'], ['90°', '90'], ['120°', '120'], ['144°', '144']];
const PEN_OPTIONS = [["abaixar caneta", 'true'], ["levantar caneta", 'false']]; // Valores agora são 'true' e 'false'
const REPEAT_OPTIONS = [["3", "3"], ["4", "4"], ["5", "5"], ["360", "360"]];

const COLOUR_OPTIONS = [
    ["🔴 vermelho", "#ff0000"],
    ["🟠 laranja", "#ffa500"],
    ["🟡 amarelo", "#ffff00"],
    ["🟣 roxo", "#800080"],
    ["🟢 verde", "#008000"],
    ["🔵 azul", "#0000ff"],
    ["⚫ preto", "#000000"],
    ["⚪ branco", "#ffffff"]
];

export const registerTurtleBlocks = () => {
  defineBlocks();
  defineGenerators();
};

const defineBlocks = () => {
    Blockly.Blocks['turtle_move_internal'] = {
        init: function() { this.jsonInit({ "type": "turtle_move_internal", "message0": "%1 %2", "args0": [{ "type": "field_dropdown", "name": "DIR", "options": MOVE_OPTIONS }, { "type": "field_dropdown", "name": "VALUE", "options": DISTANCE_OPTIONS }], "previousStatement": true, "nextStatement": true, "colour": HUE_TARTARUGA, "tooltip": "Move a tartaruga para frente ou para trás." }); }
    };

    Blockly.Blocks['turtle_turn_internal'] = {
        init: function() { this.jsonInit({ "type": "turtle_turn_internal", "message0": "%1 %2", "args0": [{ "type": "field_dropdown", "name": "DIR", "options": TURN_OPTIONS }, { "type": "field_dropdown", "name": "VALUE", "options": ANGLE_OPTIONS }], "previousStatement": true, "nextStatement": true, "colour": "#ED0973", "tooltip": "Vira a tartaruga para a esquerda ou direita." }); }
    };

    Blockly.Blocks['turtle_pen'] = {
        init: function() { this.jsonInit({ "type": "turtle_pen", "message0": "%1", "args0": [{ "type": "field_dropdown", "name": "STATE", "options": PEN_OPTIONS }], "previousStatement": true, "nextStatement": true, "colour": HUE_TARTARUGA, "tooltip": "Levanta ou abaixa a caneta." }); }
    };

    Blockly.Blocks['turtle_repeat_internal'] = {
        init: function() { this.jsonInit({ "type": "turtle_repeat_internal", "message0": "repita %1 vezes", "args0": [{ "type": "field_dropdown", "name": "TIMES", "options": REPEAT_OPTIONS }], "message1": "faça %1", "args1": [{ "type": "input_statement", "name": "DO" }], "previousStatement": true, "nextStatement": true, "colour": HUE_REPETICAO, "tooltip": "Repete os comandos internos um número fixo de vezes." }); }
    };

    Blockly.Blocks['turtle_colour_internal'] = {
        init: function() {
            this.jsonInit({
                "message0": "definir cor para %1",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "COLOUR",
                        "options": COLOUR_OPTIONS
                    }
                ],
                "previousStatement": true,
                "nextStatement": true,
                "colour": HUE_COR,
                "tooltip": "Define a cor da caneta."
            });
        }
    };
};

// --- GERADORES DE CÓDIGO AJUSTADOS ---
const defineGenerators = () => {
    javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    javascriptGenerator.addReservedWords('highlightBlock');
    let loopCounter = 0;

    // Gera: move(100) ou move(-100)
    javascriptGenerator.forBlock['turtle_move_internal'] = (b) => {
        let value = b.getFieldValue('VALUE');
        if (b.getFieldValue('DIR') === 'backward') {
            value = -value;
        }
        return `move(${value});\n`;
    };

    // Gera: turn(90) ou turn(-90)
    javascriptGenerator.forBlock['turtle_turn_internal'] = (b) => {
        let value = b.getFieldValue('VALUE');
        if (b.getFieldValue('DIR') === 'right') {
            value = -value;
        }
        return `turn(${value});\n`;
    };

    // Gera: penDown(true) ou penDown(false)
    javascriptGenerator.forBlock['turtle_pen'] = (b) => {
        const state = b.getFieldValue('STATE');
        return `penDown(${state});\n`;
    };

    // Gera: penColour('#ff0000') - Sem alterações
    javascriptGenerator.forBlock['turtle_colour_internal'] = (b) => `penColour('${b.getFieldValue('COLOUR')}');\n`;

    // Gera o laço de repetição - Sem alterações
    javascriptGenerator.forBlock['turtle_repeat_internal'] = (b) => {
        const r = b.getFieldValue('TIMES');
        const s = javascriptGenerator.statementToCode(b, 'DO');
        const varName = `count${loopCounter++}`;
        return `var ${varName} = 0;\nwhile (${varName} < ${r}) {\n${s}  ${varName} = ${varName} + 1;\n}\n`;
    };
};

export const turtleToolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Movimento",
            "colour": HUE_TARTARUGA,
            "contents": [
                { "kind": "block", "type": "turtle_move_internal" },
                { "kind": "block", "type": "turtle_turn_internal" },
                { "kind": "block", "type": "turtle_pen" }
            ]
        },
        {
            "kind": "category",
            "name": "Cor",
            "colour": HUE_COR,
            "contents": [
                { "kind": "block", "type": "turtle_colour_internal" }
            ]
        },
        {
            "kind": "category",
            "name": "Repetição",
            "colour": HUE_REPETICAO,
            "contents": [
                { "kind": "block", "type": "turtle_repeat_internal" }
            ]
        }
    ]
};

