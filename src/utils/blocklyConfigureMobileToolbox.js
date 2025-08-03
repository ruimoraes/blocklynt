export function configureMobileToolboxIcons(workspace) {
  if (!workspace || window.innerWidth > 480) return;

  const tryConfigureIcons = (attempt = 1) => {
    console.log(`📱 Tentativa ${attempt} - Configurando ícones mobile...`);
    
    // Tentar diferentes seletores para encontrar as categorias
    const possibleSelectors = [
      '.blocklyToolboxCategory',
      '.blocklyTreeRow',
      '[role="treeitem"]',
      '.blocklyToolboxContents > div',
      '.blocklyToolbox .blocklyTreeRow'
    ];

    let categories = [];
    for (const selector of possibleSelectors) {
      categories = document.querySelectorAll(selector);
      if (categories.length > 0) {
        console.log(`✅ Encontrou ${categories.length} categorias com seletor: ${selector}`);
        break;
      }
    }

    if (categories.length === 0) {
      console.log('❌ Nenhuma categoria encontrada. Elementos disponíveis:');
      console.log('Blockly toolbox:', document.querySelector('.blocklyToolbox'));
      console.log('Blockly div:', document.querySelector('.blocklyDiv'));
      
      // Tentar novamente até 5 vezes
      if (attempt < 5) {
        setTimeout(() => tryConfigureIcons(attempt + 1), 200);
      }
      return;
    }
    
    categories.forEach((categoryElement, index) => {
      try {
        console.log(`Analisando categoria ${index}:`, categoryElement);
        
        // Tentar diferentes seletores para encontrar os elementos internos
        const possibleIconSelectors = [
          '.blocklyToolboxCategoryIcon',
          '.blocklyTreeIcon', 
          '.blocklyTreeRowIcon',
          'span[class*="Icon"]',
          '.fa',
          'i'
        ];

        const possibleLabelSelectors = [
          '.blocklyToolboxCategoryLabel',
          '.blocklyTreeLabel',
          '.blocklyTreeRowLabel',
          'span[class*="Label"]',
          'span:not([class*="Icon"])'
        ];

        let iconElement = null;
        let labelElement = null;

        // Procurar ícone
        for (const selector of possibleIconSelectors) {
          iconElement = categoryElement.querySelector(selector);
          if (iconElement) {
            console.log(`Ícone encontrado com: ${selector}`);
            break;
          }
        }

        // Procurar label
        for (const selector of possibleLabelSelectors) {
          labelElement = categoryElement.querySelector(selector);
          if (labelElement && labelElement.textContent.trim()) {
            console.log(`Label encontrado com: ${selector}`);
            break;
          }
        }

        // Se não encontrou, criar elementos
        if (!iconElement) {
          iconElement = document.createElement('i');
          iconElement.className = 'blocklyToolboxCategoryIcon';
          categoryElement.insertBefore(iconElement, categoryElement.firstChild);
          console.log('Ícone criado artificialmente');
        }

        if (!labelElement) {
          labelElement = categoryElement.querySelector('*');
          if (!labelElement || !labelElement.textContent.trim()) {
            console.log('❌ Não foi possível encontrar ou criar label');
            return;
          }
        }

        const categoryName = labelElement.textContent.trim().toLowerCase();
        console.log('📝 Nome da categoria encontrado:', `"${categoryName}"`);
        
        // Mapeamento de ícones
        const iconMap = {
          // Movimento (com e sem emojis)
          '🤖 movimento': 'fas fa-running',
          'movimento': 'fas fa-running',
          'movimentos': 'fas fa-running',
          'mover': 'fas fa-running',
          
          // Repetição/Loops  
          '🔄 repetição': 'fas fa-sync-alt',
          'repetição': 'fas fa-sync-alt',
          'repeticao': 'fas fa-sync-alt',
          'loops': 'fas fa-sync-alt',
          'loop': 'fas fa-sync-alt',
          
          // Lógica
          '🤔 lógica': 'fas fa-brain',
          'lógica': 'fas fa-brain',
          'logica': 'fas fa-brain',
          'logic': 'fas fa-brain',
          
          // Outros
          'matemática': 'fas fa-calculator',
          'matematica': 'fas fa-calculator',
          'math': 'fas fa-calculator',
          'texto': 'fas fa-font',
          'text': 'fas fa-font',
          'variáveis': 'fas fa-box',
          'variaveis': 'fas fa-box',
          'variables': 'fas fa-box',
          'funções': 'fas fa-cog',
          'funcoes': 'fas fa-cog',
          'functions': 'fas fa-cog',
          'controle': 'fas fa-gamepad',
          'control': 'fas fa-gamepad',
          'eventos': 'fas fa-bolt',
          'events': 'fas fa-bolt'
        };

        const iconClass = iconMap[categoryName] || 'fas fa-puzzle-piece';
        console.log('🎯 Ícone selecionado:', iconClass, 'para categoria:', categoryName);
        
        // Aplicar classe do ícone
        iconElement.className = `blocklyToolboxCategoryIcon ${iconClass}`;
        
        // Aplicar estilos diretamente no elemento
        const iconStyles = {
          'display': 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'width': '32px',
          'height': '32px',
          'font-family': '"Font Awesome 6 Free", "FontAwesome", sans-serif',
          'font-weight': '900',
          'font-size': '20px',
          'color': '#C41E3A',
          'margin': '0 auto',
          'text-rendering': 'auto',
          '-webkit-font-smoothing': 'antialiased',
          'position': 'relative',
          'z-index': '50'
        };

        Object.entries(iconStyles).forEach(([prop, value]) => {
          iconElement.style.setProperty(prop, value, 'important');
        });
        
        // Ocultar o texto em mobile
        labelElement.style.setProperty('display', 'none', 'important');
        
        // Garantir que a categoria seja clicável
        categoryElement.style.setProperty('pointer-events', 'auto', 'important');
        categoryElement.style.setProperty('cursor', 'pointer', 'important');
        
        console.log('✅ Ícone configurado com sucesso para:', categoryName);
        
      } catch (error) {
        console.error(`❌ Erro ao configurar categoria ${index}:`, error);
      }
    });

    console.log('🎉 Configuração de ícones mobile concluída!');
  };

  // Começar tentativas
  tryConfigureIcons();

  // Reconfigurar quando houver mudanças no workspace
  if (workspace.addChangeListener) {
    workspace.addChangeListener((event) => {
      if (event.type === 'selected' && window.innerWidth <= 480) {
        setTimeout(() => tryConfigureIcons(), 100);
      }
    });
  }
}