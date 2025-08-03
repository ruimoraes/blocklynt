import * as Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";

// === Registro dos Blocos ===
export function registerTemplateBlocks() {
  // Evita sobrescrever se já foi registrado
  if (Blockly.Blocks['print_text']) return;

  // Bloco de imprimir texto
  Blockly.Blocks['print_text'] = {
    init: function () {
      this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("imprimir");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Imprime um texto no console");
      this.setHelpUrl("");
    },
  };

  // Gerador de código para o bloco
  javascriptGenerator.forBlock['print_text'] = function (block) {
    const value = javascriptGenerator.valueToCode(
      block,
      'TEXT',
      javascriptGenerator.ORDER_ATOMIC
    ) || '""';
    return `this.imprimir(${value});\n`;
  };
}

// === Toolbox ===
export const templateToolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Controle",
      colour: "#5C81A6",
      contents: [
        { kind: "block", type: "controls_repeat_ext" }
      ],
    },
    {
      kind: "category",
      name: "Matemática",
      colour: "#5C68A6",
      contents: [
        { kind: "block", type: "math_number" }
      ],
    },
    {
      kind: "category",
      name: "Texto",
      colour: "#5CA68D",
      contents: [
        { kind: "block", type: "text" }
      ],
    },
    {
      kind: "category",
      name: "Utilitários",
      colour: "#A65C81",
      contents: [
        { kind: "block", type: "print_text" }
      ],
    },
  ],
};