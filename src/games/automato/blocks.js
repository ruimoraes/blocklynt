import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// Função principal para registrar todos os blocos do Autômato
export const registerAutomatoBlocks = () => {
    defineBlocks();
    defineGenerators();
};

// Função para gerar toolbox dinâmico baseado nos blocos permitidos
export const generateDynamicToolbox = (allowedBlocks = []) => {
    const blockDefinitions = {
        'moveForward': {
            kind: 'block',
            type: 'automato_move_forward'
        },
        'turnLeft': {
            kind: 'block',
            type: 'automato_turn_left'
        },
        'turnRight': {
            kind: 'block',
            type: 'automato_turn_right'
        },
        'automato_if': {
            kind: 'block',
            type: 'automato_if'
        },
        'automato_ifElse': {
            kind: 'block',
            type: 'automato_ifElse'
        },
        'isPathAhead': {
            kind: 'block',
            type: 'automato_is_path_ahead'
        },
        'isPathLeft': {
            kind: 'block',
            type: 'automato_is_path_left'
        },
        'isPathRight': {
            kind: 'block',
            type: 'automato_is_path_right'
        },
        'automato_repeat_until_goal': {
            kind: 'block',
            type: 'automato_repeat_until_goal'
        }
    };

const toolboxContents = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category',
            name: 'Movimento',
            colour: '#4CAF50',
            contents: [],
            cssConfig: {
                'container': 'movimento'
            }
        },
        {
            kind: 'category',
            name: 'Repetição', 
            colour: '#FF9800',
            contents: [],
            cssConfig: {
                'container': 'repeticao'
            }
        },
        {
            kind: 'category',
            name: 'Lógica',
            colour: '#2196F3',
            contents: [],
            cssConfig: {
                'container': 'logica'
            }
        },
        {
            kind: 'category',
            name: 'Sensores',
            colour: '#9C27B0',
            contents: [],
            cssConfig: {
                'container': 'sensores'
            }
        }
    ]
};

    // Distribuir blocos nas categorias corretas
    allowedBlocks.forEach(blockId => {
        const blockDef = blockDefinitions[blockId];
        if (!blockDef) return;

        if (['moveForward', 'turnLeft', 'turnRight'].includes(blockId)) {
            toolboxContents.contents[0].contents.push(blockDef);
        } else if (['automato_repeat_until_goal'].includes(blockId)) {
            toolboxContents.contents[1].contents.push(blockDef);
        } else if (['automato_if', 'automato_ifElse'].includes(blockId)) {
            toolboxContents.contents[2].contents.push(blockDef);
        } else if (['isPathAhead', 'isPathLeft', 'isPathRight'].includes(blockId)) {
            toolboxContents.contents[3].contents.push(blockDef);
        }
    });

    // Remover categorias vazias
    toolboxContents.contents = toolboxContents.contents.filter(category =>
        category.contents && category.contents.length > 0
    );

    return toolboxContents;
};

// Definir blocos customizados para o jogo Automato
const defineBlocks = () => {
    // Bloco: Mover Frente
    Blockly.Blocks['automato_move_forward'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("mover a frente");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour('#4CAF50');
            this.setTooltip("Move o autômato uma posição para frente");
            this.setHelpUrl("");
        }
    };

    // Bloco: Virar à Esquerda
    Blockly.Blocks['automato_turn_left'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("↺ virar à esquerda");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour('#9C27B0');
            this.setTooltip("Vira o autômato 90° para a esquerda");
            this.setHelpUrl("");
        }
    };

    // Bloco: Virar à Direita
    Blockly.Blocks['automato_turn_right'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("↻ virar à direita");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour('#9C27B0');
            this.setTooltip("Vira o autômato 90° para a direita");
            this.setHelpUrl("");
        }
    };

    // Bloco: Se (condicional simples)
    Blockly.Blocks['automato_if'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("se")
                .appendField(new Blockly.FieldDropdown([
                    ["há caminho à frente", "isPathAhead"],
                    ["há caminho à esquerda", "isPathLeft"],
                    ["há caminho à direita", "isPathRight"]
                ]), "DIR");
            this.appendStatementInput("DO")
                .setCheck(null)
                .appendField("faça");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#2196F3");
            this.setTooltip("Execute comandos se a condição for verdadeira");
            this.setHelpUrl("");
        }
    };

    // Bloco: Se/Senão (condicional com else)
    Blockly.Blocks['automato_ifElse'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("se")
                .appendField(new Blockly.FieldDropdown([
                    ["há caminho à frente", "isPathAhead"],
                    ["há caminho à esquerda", "isPathLeft"],
                    ["há caminho à direita", "isPathRight"]
                ]), "DIR");
            this.appendStatementInput("DO")
                .setCheck(null)
                .appendField("faça");
            this.appendStatementInput("ELSE")
                .setCheck(null)
                .appendField("senão");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#2196F3");
            this.setTooltip("Execute comandos diferentes dependendo da condição");
            this.setHelpUrl("");
        }
    };

    // Bloco: Verificar se há caminho à frente
    Blockly.Blocks['automato_is_path_ahead'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("👁️ há caminho à frente?");
            this.setOutput(true, "Boolean");
            this.setColour("#2196F3");
            this.setTooltip("Verifica se há um caminho livre à frente do autômato");
            this.setHelpUrl("");
        }
    };

    // Bloco: Verificar se há caminho à esquerda
    Blockly.Blocks['automato_is_path_left'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("há caminho à esquerda?");
            this.setOutput(true, "Boolean");
            this.setColour("#2196F3");
            this.setTooltip("Verifica se há um caminho livre à esquerda do autômato");
            this.setHelpUrl("");
        }
    };

    // Bloco: Verificar se há caminho à direita
    Blockly.Blocks['automato_is_path_right'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("há caminho à direita?");
            this.setOutput(true, "Boolean");
            this.setColour("#2196F3");
            this.setTooltip("Verifica se há um caminho livre à direita do autômato");
            this.setHelpUrl("");
        }
    };

    // Bloco: Repita até o objetivo
    Blockly.Blocks['automato_repeat_until_goal'] = {
        init: function () {
            this.appendDummyInput()
                .appendField('repita até o objetivo');
            this.appendStatementInput('DO')
                .setCheck(null)
                .appendField('fazer');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour('#FF9800');
            this.setTooltip('Repete as ações até o objetivo ser alcançado');
            this.setHelpUrl('');
        }
    };
};

// Definir geradores de código JavaScript
const defineGenerators = () => {
    javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    javascriptGenerator.addReservedWords('highlightBlock');

    // Gerador: Mover Frente
    javascriptGenerator.forBlock['automato_move_forward'] = function () {
        return 'moverParaFrente();\n';
    };

    // Gerador: Virar à Esquerda
    javascriptGenerator.forBlock['automato_turn_left'] = function () {
        return 'virarEsquerda();\n';
    };

    // Gerador: Virar à Direita
    javascriptGenerator.forBlock['automato_turn_right'] = function () {
        return 'virarDireita();\n';
    };

    // Gerador: Se (condicional simples)
    javascriptGenerator.forBlock['automato_if'] = function (block) {
        // Pega o valor do dropdown: 'isPathAhead', 'isPathLeft', ou 'isPathRight'
        const direcaoDropdown = block.getFieldValue('DIR');

        // Mapeia o valor do dropdown para o argumento da nossa função 'haCaminho'
        const mapaDeDirecao = {
            'isPathAhead': '"frente"',
            'isPathLeft': '"esquerda"',
            'isPathRight': '"direita"'
        };
        const argumentoFuncao = mapaDeDirecao[direcaoDropdown];

        const statements = javascriptGenerator.statementToCode(block, 'DO');
        // Gera o código correto: if (haCaminho("frente")) { ... }
        return `if (haCaminho(${argumentoFuncao})) {\n${statements}}\n`;
    };

    // Gerador: Se/Senão (condicional com else)
    javascriptGenerator.forBlock['automato_ifElse'] = function (block) {
        const direcaoDropdown = block.getFieldValue('DIR');

        const mapaDeDirecao = {
            'isPathAhead': '"frente"',
            'isPathLeft': '"esquerda"',
            'isPathRight': '"direita"'
        };
        const argumentoFuncao = mapaDeDirecao[direcaoDropdown];

        const statementsIf = javascriptGenerator.statementToCode(block, 'DO');
        const statementsElse = javascriptGenerator.statementToCode(block, 'ELSE');
        // Gera o código correto: if (haCaminho("frente")) { ... } else { ... }
        return `if (haCaminho(${argumentoFuncao})) {\n${statementsIf}} else {\n${statementsElse}}\n`;
    };

    // Gerador: Verificar se há caminho à frente / esquerda / direita
    javascriptGenerator.forBlock['automato_is_path_ahead'] = () => ['haCaminho("frente")', javascriptGenerator.ORDER_FUNCTION_CALL];
    javascriptGenerator.forBlock['automato_is_path_left'] = () => ['haCaminho("esquerda")', javascriptGenerator.ORDER_FUNCTION_CALL];
    javascriptGenerator.forBlock['automato_is_path_right'] = () => ['haCaminho("direita")', javascriptGenerator.ORDER_FUNCTION_CALL];

    // Gerador: Repita até o objetivo
    javascriptGenerator.forBlock['automato_repeat_until_goal'] = function (block) {
        const statements = javascriptGenerator.statementToCode(block, 'DO');
        return `while (!chegouNoAlvo()) {\n${statements}}\n`;
    };
};

// Configuração da toolbox padrão (todos os blocos disponíveis)
export const automatoToolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Movimento",
            "colour": "#4CAF50",
            "contents": [
                {
                    "kind": "block",
                    "type": "automato_move_forward"
                },
                {
                    "kind": "block",
                    "type": "automato_turn_left"
                },
                {
                    "kind": "block",
                    "type": "automato_turn_right"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Repetição",
            "colour": "#FF9800",
            "contents": [
                {
                    "kind": "block",
                    "type": "automato_repeat_until_goal"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Lógica",
            "colour": "#2196F3",
            "contents": [
                {
                    "kind": "block",
                    "type": "automato_if"
                },
                {
                    "kind": "block",
                    "type": "automato_ifElse"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Sensores",
            "colour": "#9C27B0",
            "contents": [
                {
                    "kind": "block",
                    "type": "automato_is_path_ahead"
                },
                {
                    "kind": "block",
                    "type": "automato_is_path_left"
                },
                {
                    "kind": "block",
                    "type": "automato_is_path_right"
                }
            ]
        }
    ]
};