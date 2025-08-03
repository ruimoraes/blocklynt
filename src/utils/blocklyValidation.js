/**
 * Utilitário para validação e limpeza de workspace Blockly
 * Garante que apenas um programa principal seja executado
 */

export class BlocklyWorkspaceValidator {
  constructor(options = {}) {
    this.options = {
      allowMultipleTopBlocks: false,
      preferredStartBlocks: ['start', 'when_run', 'main'],
      logLevel: 'info', // 'none', 'error', 'warn', 'info', 'debug'
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
      this.log('error', "❌ Workspace não fornecida");
      return { isValid: false, warnings: ["Workspace não disponível"] };
    }

    const topBlocks = workspace.getTopBlocks(false);
    const warnings = [];
    
    // Verificar se há blocos na workspace
    if (topBlocks.length === 0) {
      this.log('warn', "⚠️ Nenhum bloco encontrado na workspace");
      return { 
        isValid: false, 
        warnings: ["Nenhum bloco encontrado na workspace"] 
      };
    }

    // Se há apenas um bloco top-level, está tudo certo
    if (topBlocks.length === 1) {
      this.log('info', `✅ Workspace válida com 1 programa principal`);
      return { 
        isValid: true, 
        warnings: [],
        mainBlock: topBlocks[0],
        reEnableBlocks: null // Não há blocos para reabilitar
      };
    }

    // Múltiplos blocos top-level detectados
    this.log('warn', `⚠️ Encontrados ${topBlocks.length} programas separados`);
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
    // Identificar o bloco principal (index 0 ou bloco preferido)
    const mainBlock = this.selectMainBlock(topBlocks);
    const mainBlockIndex = topBlocks.indexOf(mainBlock);
    
    if (mainBlock) {
      this.log('info', `ℹ️ Selecionado como programa principal: "${mainBlock.type}" (posição ${mainBlockIndex})`);
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

      // Verificar se o bloco pode ser controlado
      if (!this.isBlockControllable(block)) {
        this.log('warn', `⚠️ Bloco "${block.type}" não pode ser desabilitado (sem método setDisabledReason)`);
        return;
      }

      try {
        console.log(block);
        // Desabilitar usando setDisabledReason
        block.setDisabledReason(true, "MANUALLY_DISABLED");
        disabledBlocks.push(block);
        
        this.log('debug', `🚫 Desabilitado temporariamente: "${block.type}" (posição ${index})`);
        warnings.push(`Programa "${block.type}" desabilitado temporariamente`);

        // Guardar callback para reabilitar
        reEnableCallbacks.push(() => {
          try {
            if (this.isBlockControllable(block)) {
              block.setDisabledReason(false);
              this.log('debug', `✅ Reabilitado: "${block.type}"`);
            }
          } catch (error) {
            this.log('warn', `Erro ao reabilitar bloco "${block.type}":`, error);
          }
        });

      } catch (error) {
        this.log('warn', `Erro ao desabilitar bloco "${block.type}":`, error);
      }
    });

    // Função para reabilitar todos os blocos
    const reEnableAllBlocks = () => {
      if (reEnableCallbacks.length > 0) {
        reEnableCallbacks.forEach(callback => callback());
        this.log('info', `✅ ${reEnableCallbacks.length} blocos reabilitados após execução`);
      } else {
        this.log('debug', `ℹ️ Nenhum bloco para reabilitar`);
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
    // Filtrar apenas blocos válidos
    const validBlocks = topBlocks.filter(block => block && !block.disposed);
    
    if (validBlocks.length === 0) {
      this.log('warn', `⚠️ Nenhum bloco válido encontrado`);
      return null;
    }

    // Procurar por blocos de início específicos primeiro
    for (const preferredType of this.options.preferredStartBlocks) {
      const startBlock = validBlocks.find(block => 
        block.type === preferredType || 
        block.type.includes(preferredType)
      );
      if (startBlock) {
        this.log('debug', `📍 Encontrado bloco preferido: "${startBlock.type}"`);
        return startBlock;
      }
    }

    // Se não encontrou bloco preferido, usar o primeiro válido (index 0)
    this.log('debug', `📍 Usando primeiro bloco válido encontrado: "${validBlocks[0].type}"`);
    return validBlocks[0];
  }

  /**
   * Sistema de logging configurável
   * @param {string} level - Nível do log
   * @param {string} message - Mensagem
   * @param {...any} args - Argumentos adicionais
   */
  log(level, message, ...args) {
    const levels = { none: 0, error: 1, warn: 2, info: 3, debug: 4 };
    const currentLevel = levels[this.options.logLevel] || 3;
    const messageLevel = levels[level] || 3;

    if (messageLevel <= currentLevel) {
      const logMethod = console[level] || console.log;
      logMethod(`[BlocklyValidator] ${message}`, ...args);
    }
  }
}

// Instância padrão para uso geral
export const defaultValidator = new BlocklyWorkspaceValidator({
  allowMultipleTopBlocks: false,
  preferredStartBlocks: ['start', 'when_run', 'main', 'begin'],
  logLevel: 'info'
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