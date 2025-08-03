import * as Blockly from 'blockly/core';

class CustomCategory extends Blockly.ToolboxCategory {
  constructor(categoryDef, toolbox, opt_parent) {
    super(categoryDef, toolbox, opt_parent);
  }

  init() {
    super.init();

    // Agora o DOM está criado, pode alterar cor do texto e ícone
    const labelDom = this.rowDiv_.getElementsByClassName(
      'blocklyToolboxCategoryLabel',
    )[0];
    if (labelDom) {
      labelDom.style.color = 'white';
    }
    if (this.iconDom_) {
      this.iconDom_.style.color = 'white';
    }
  }

  addColourBorder_(colour) {
    this.rowDiv_.style.backgroundColor = colour;
  }

  setSelected(isSelected) {
    const labelDom = this.rowDiv_.getElementsByClassName(
      'blocklyToolboxCategoryLabel',
    )[0];
    if (isSelected) {
      this.rowDiv_.style.backgroundColor = 'white';
      labelDom.style.color = this.colour_;
      this.iconDom_.style.color = this.colour_;
    } else {
      this.rowDiv_.style.backgroundColor = this.colour_;
      labelDom.style.color = 'white';
      this.iconDom_.style.color = 'white';
    }
    Blockly.utils.aria.setState(this.htmlDiv_, Blockly.utils.aria.State.SELECTED, isSelected);
  }

  createIconDom_() {
    const iconClass = this.toolboxItemDef_['css-icon'];
    if (iconClass) {
      const iconElement = document.createElement('i');
      iconElement.className = iconClass;
      iconElement.style.fontSize = '18px';
      iconElement.style.marginRight = '8px';

      return iconElement;
    }

    // fallback
    const iconImg = document.createElement('img');
    iconImg.src = './logo_only.svg';
    iconImg.alt = 'Blockly Logo';
    iconImg.width = 20;
    iconImg.height = 20;
    return iconImg;
  }
}

Blockly.registry.register(
  Blockly.registry.Type.TOOLBOX_ITEM,
  Blockly.ToolboxCategory.registrationName,
  CustomCategory,
  true,
);
