export class BlocklyWorkspaceValidator {
  constructor(options = {}) {
    this.options = {
      allowMultipleTopBlocks: false,
      preferredStartBlocks: ['start', 'when_run', 'main'],
      ...options
    };
  }

  /**
   * Valida e limpa a workspace antes da execução
   * @param {Blockly.Workspace} workspace - A workspace do Blockly
   * @returns {Object} Resultado da validação
   */
  validateAndClean(workspace) {
    if (!workspace) {
      return { isValid: false, warnings: ["Workspace não disponível"] };
    }

    const topBlocks = workspace.getTopBlocks(false);
    const warnings = [];
    
    if (topBlocks.length === 0) {
      return { 
        isValid: false, 
        warnings: ["Nenhum bloco encontrado na workspace"] 
      };
    }

    if (topBlocks.length === 1) {
      return { 
        isValid: true, 
        warnings: [],
        mainBlock: topBlocks[0],
        reEnableBlocks: null // Não há blocos para reabilitar
      };
    }

    warnings.push(`Encontrados ${topBlocks.length} programas separados. Apenas um será executado.`);

    if (!this.options.allowMultipleTopBlocks) {
      const result = this.handleMultipleTopBlocks(topBlocks, warnings);
      return result;
    }

    return { 
      isValid: true, 
      warnings,
      mainBlock: topBlocks[0],
      reEnableBlocks: null
    };
  }

  /**
   * Verifica se um bloco tem o método setDisabledReason
   * @param {Object} block - Bloco do Blockly
   * @returns {boolean} Se o bloco é válido para controle
   */
  isBlockControllable(block) {
    return block && 
           typeof block.setDisabledReason === 'function' &&
           !block.disposed;
  }

  /**
   * Lida com múltiplos blocos top-level
   * @param {Array} topBlocks - Array de blocos top-level
   * @param {Array} warnings - Array de warnings acumulados
   * @returns {Object} Resultado do processamento
   */
  handleMultipleTopBlocks(topBlocks, warnings) {
    const mainBlock = this.selectMainBlock(topBlocks);
    
    if (mainBlock) {
      warnings.push(`Programa principal selecionado: "${mainBlock.type}"`);
    }

    // Desabilitar todos os outros blocos top-level (diferentes do mainBlock)
    const disabledBlocks = [];
    const reEnableCallbacks = [];

    topBlocks.forEach((block, index) => {
      // Pular o bloco principal
      if (block === mainBlock) {
        return;
      }

      if (!this.isBlockControllable(block)) {
        return;
      }

      try {
        block.setDisabledReason(true, "MANUALLY_DISABLED");
        disabledBlocks.push(block);
        warnings.push(`Programa "${block.type}" desabilitado temporariamente`);

        reEnableCallbacks.push(() => {
          try {
            if (this.isBlockControllable(block)) {
              block.setDisabledReason(false);
            }
          } catch (error) {
            // Falhou ao reabilitar, mas não precisamos fazer nada
          }
        });

      } catch (error) {
        // Falhou ao desabilitar, mas não precisamos fazer nada
      }
    });

    const reEnableAllBlocks = () => {
      if (reEnableCallbacks.length > 0) {
        reEnableCallbacks.forEach(callback => callback());
      }
    };

    return {
      isValid: true,
      warnings,
      mainBlock,
      disabledBlocks,
      disabledCount: disabledBlocks.length,
      reEnableBlocks: disabledBlocks.length > 0 ? reEnableAllBlocks : null
    };
  }

  /**
   * Seleciona o bloco principal entre múltiplos blocos top-level
   * @param {Array} topBlocks - Array de blocos top-level
   * @returns {Object} Bloco principal selecionado
   */
  selectMainBlock(topBlocks) {
    const validBlocks = topBlocks.filter(block => block && !block.disposed);
    
    if (validBlocks.length === 0) {
      return null;
    }

    for (const preferredType of this.options.preferredStartBlocks) {
      const startBlock = validBlocks.find(block => 
        block.type === preferredType || 
        block.type.includes(preferredType)
      );
      if (startBlock) {
        return startBlock;
      }
    }

    return validBlocks[0];
  }
}

export const defaultValidator = new BlocklyWorkspaceValidator({
  allowMultipleTopBlocks: false,
  preferredStartBlocks: ['start', 'when_run', 'main', 'begin']
});

/**
 * Função de conveniência para validação rápida
 * @param {Blockly.Workspace} workspace - A workspace do Blockly
 * @param {Object} options - Opções de validação
 * @returns {Object} Resultado da validação
 */
export function validateBlocklyWorkspace(workspace, options = {}) {
  const validator = new BlocklyWorkspaceValidator(options);
  return validator.validateAndClean(workspace);
}