# Guia de Estrutura e Funcionamento dos Arquivos da Pasta `src/`

Este documento detalha o propósito e funcionamento dos principais arquivos e componentes da pasta `src/` do projeto Blockly NT, com foco em orientar agentes de IA (ou desenvolvedores) sobre como criar, integrar e expandir jogos dentro deste ecossistema.

---

## 1. Estrutura Geral

O projeto é organizado em torno de um fluxo React + Phaser, com integração via EventBus e suporte a múltiplos jogos (games) e fases. Os principais diretórios e arquivos são:

- `components/game/` — Componentes reutilizáveis para interface e lógica de jogos.
- `contexts/` — Contextos React para gerenciamento de estado global do jogo.
- `games/` — Cada subpasta representa um jogo, com arquivos de configuração, lógica e integração.
- `utils/` — Utilitários diversos, incluindo EventBus e helpers para Blockly.

---

## 2. Componentes e Arquivos Principais

### 2.1. `GameBase.jsx`

- **Função:** Componente "container" que orquestra o ciclo de vida do jogo, renderiza o editor, a área do jogo (Phaser), o seletor de fases, o modal de sucesso e o rodapé.
- **Props:**
  - `gameFactory`: função que retorna a configuração do Phaser para o jogo atual.
  - `gameConfig`: objeto de configuração do jogo (nome, fases, etc).
  - `editor`: componente do editor de blocos (ex: BlocklyEditor).
- **Fluxo:**
  - Usa o contexto `GameStateProvider` para gerenciar estado global (fase atual, progresso, execução, etc).
  - Renderiza:
    - `GameNavBar`: barra superior com logo e título do jogo.
    - `GameFaseInfo`: informações da fase atual (número, nome, descrição, dificuldade).
    - `PanelGroup`: divide a tela entre editor e área do jogo.
    - `GameArea`: área onde o Phaser é injetado e onde o confete é exibido em caso de sucesso.
    - `GameFooter`: rodapé com navegação de fases e ajuda.
    - `SeletorDeFases`: modal para seleção de fases.
    - `SucessoModal`: modal exibido ao completar uma fase.

```jsx
// src/components/game/GameBase.jsx (trecho principal)
return (
  <GameStateProvider gameConfig={gameConfig}>
    <GameNavBar title={gameConfig.nome} />
    <GameFaseInfo fase={faseAtual} />
    <PanelGroup>
      <BlocklyEditor ... />
      <GameArea ... />
    </PanelGroup>
    <GameFooter ... />
    <SeletorDeFases ... />
    <SucessoModal ... />
  </GameStateProvider>
);
```

### 2.2. `GameNavBar.jsx`

- **Função:** Barra de navegação fixa no topo, com botão de home (logo + nome) e título do jogo à direita.
- **Destaques:**
  - Usa o logo localizado em `src/assets/logont.svg`.
  - O título é passado via prop e exibido à direita.

```jsx
// src/components/game/GameNavBar.jsx (trecho)
<nav className="navbar">
  <a href="/">
    <img src={logo} alt="Logo" /> Blockly NT
  </a>
  <span className="title">{title}</span>
</nav>
```

### 2.3. `GameFaseInfo.jsx`

- **Função:** Exibe informações detalhadas da fase atual: número, nome, descrição e dificuldade.
- **Lógica:**
  - A dificuldade pode ser definida diretamente na fase (`dificuldade`) ou inferida pelo número da fase.
  - Exibe um badge colorido e emoji correspondente à dificuldade.

```jsx
// src/components/game/GameFaseInfo.jsx (trecho)
<div className="fase-info">
  <span className={`badge badge-${dificuldade}`}>{emoji} {dificuldade}</span>
  <h2>{fase.nome}</h2>
  <p>{fase.descricao}</p>
</div>
```

### 2.4. `GameFooter.jsx`

- **Função:** Rodapé fixo com botões de ajuda e seleção de fases, além do indicador de fase atual/total.
- **Estilo:**
  - Segue o mesmo gradiente visual do restante da interface.
  - O botão de "Fases" abre o seletor de fases.
  - O botão de "Ajuda" exibe um alerta (pode ser customizado).

```jsx
// src/components/game/GameFooter.jsx (trecho)
<footer className="game-footer">
  <button onClick={abrirSeletorFases}>Fases</button>
  <span>{faseAtual + 1} / {totalFases}</span>
  <button onClick={mostrarAjuda}>Ajuda</button>
</footer>
```

### 2.5. `GameArea.jsx`

- **Função:** Área principal do jogo, responsável por:
  - Injetar o canvas do Phaser.
  - Exibir o efeito de confete (`ConfettiOverlay`) em caso de sucesso.
  - Integrar-se ao EventBus para escutar eventos de sucesso/falha e disparar execução de código.
- **Lógica:**
  - Usa o estado global para saber quando exibir o confete.
  - Reseta o confete ao sair do estado de sucesso.

```jsx
// src/components/game/GameArea.jsx (trecho)
<div ref={phaserRef} className="game-area">
  {showConfetti && <ConfettiOverlay />}
</div>
```

### 2.6. `SeletorDeFases.jsx`

- **Função:** Modal para seleção de fases.
- **Lógica:**
  - Mostra quais fases estão liberadas, concluídas ou bloqueadas.
  - Lê o progresso do localStorage (`gameId-fases-concluidas`).
  - Suporta reset de progresso.
  - Em modo debug (`?debug=true` na URL), todas as fases são marcadas como concluídas automaticamente ao carregar o contexto do jogo.

```jsx
// src/components/game/SeletorDeFases.jsx (trecho)
<Modal open={open} onClose={onClose}>
  {fases.map((fase, idx) => (
    <button
      key={idx}
      disabled={!fase.liberada}
      className={fase.concluida ? 'concluida' : ''}
      onClick={() => selecionarFase(idx)}
    >
      {fase.nome}
    </button>
  ))}
  <button onClick={resetarProgresso}>Resetar Progresso</button>
</Modal>
```

### 2.7. `SucessoModal.jsx`

- **Função:** Modal exibido ao completar uma fase com sucesso.
- **Conteúdo:**
  - Mostra o código gerado pelo usuário.
  - Explica o que aconteceu.
  - Permite avançar para a próxima fase (se disponível) ou fechar o modal.

```jsx
// src/components/game/SucessoModal.jsx (trecho)
<Modal open={open} onClose={onClose}>
  <h2>Parabéns!</h2>
  <pre>{codigoGerado}</pre>
  <button onClick={proximaFase}>Próxima Fase</button>
  <button onClick={onClose}>Fechar</button>
</Modal>
```

### 2.8. `GameStateContext.jsx`

- **Função:** Contexto React para gerenciar o estado global do jogo.
- **Estados:**
  - `faseAtual`, `fasesConcluidas`, `estadoExecucao`, `codigoGerado`, etc.
- **Lógica:**
  - Carrega e salva progresso no localStorage.
  - Em modo debug (`?debug=true`), marca todas as fases como concluídas automaticamente.
  - Fornece funções para executar código, finalizar com sucesso/falha, reiniciar, mudar de fase, etc.

```jsx
// src/contexts/GameStateContext.jsx (trecho)
export const GameStateContext = createContext();

export function GameStateProvider({ children, gameConfig }) {
  const [faseAtual, setFaseAtual] = useState(0);
  // ... outros estados ...
  useEffect(() => {
    if (debug) setFasesConcluidas(todasFases);
  }, [debug]);
  // ...
  return (
    <GameStateContext.Provider value={{ faseAtual, ... }}>
      {children}
    </GameStateContext.Provider>
  );
}
```

### 2.9. `ConfettiOverlay.jsx`

- **Função:** Exibe o efeito visual de confete na tela quando o jogador tem sucesso.
- **Integração:**
  - Controlado pelo estado de sucesso em `GameArea`.
  - O efeito é resetado ao fechar o modal de sucesso ou ao sair do estado de sucesso.

```jsx
// src/components/game/ConfettiOverlay.jsx (trecho)
import Confetti from 'react-confetti';
export default function ConfettiOverlay() {
  return <Confetti width={window.innerWidth} height={window.innerHeight} />;
}
```

### 2.10. `editors/BlocklyEditor.jsx`

- **Função:** Editor visual de blocos (Blockly) customizado para o projeto.
- **Lógica:**
  - Garante que o workspace do Blockly é corretamente criado e destruído para evitar vazamentos de memória.
  - Permite salvar e restaurar o estado do workspace.
  - Integra-se com o restante do sistema via refs e callbacks.

```jsx
// src/components/game/editors/BlocklyEditor.jsx (trecho)
useEffect(() => {
  workspaceRef.current = Blockly.inject(domRef.current, config);
  return () => {
    workspaceRef.current?.dispose();
  };
}, [config]);
```

### 2.11. `utils/gameEvents.js`

- **Função:** EventBus customizado para comunicação desacoplada entre React e Phaser.
- **Eventos:**
  - `executeCode`, `resetGame`, `pauseGame`, `gameSuccess`, `gameFailure`, `gameReady`, etc.
- **Uso:**
  - Permite que componentes React e o jogo Phaser se comuniquem sem dependências diretas.

```js
// src/utils/gameEvents.js (exemplo)
const listeners = {};
export const EventBus = {
  on(event, cb) { (listeners[event] ||= []).push(cb); },
  off(event, cb) { listeners[event] = (listeners[event]||[]).filter(f => f!==cb); },
  emit(event, data) { (listeners[event]||[]).forEach(f => f(data)); }
};
```

### 2.12. `shared/gameController.js`

- **Função:** Abstrai a integração do ciclo de vida do Phaser com o EventBus.
- **Lógica:**
  - Recebe funções específicas do jogo (executar código, resetar, checar sucesso) e cuida de adicionar/remover listeners automaticamente.
  - Garante que não há vazamento de listeners ou múltiplas execuções.

```js
// src/shared/gameController.js (trecho)
export function createGameController({ executeCode, resetGame, checkSuccess }) {
  useEffect(() => {
    EventBus.on('executeCode', executeCode);
    EventBus.on('resetGame', resetGame);
    return () => {
      EventBus.off('executeCode', executeCode);
      EventBus.off('resetGame', resetGame);
    };
  }, []);
}
```

### 2.13. `games/template/`

- **Função:** Exemplo de implementação de um jogo.
- **Arquivos:**
  - `config.js`: define o objeto de configuração do jogo (nome, fases, descrição, dificuldade, etc).
  - `blocks.js`: define os blocos customizados do Blockly e o toolbox.
  - `game.js`: lógica do Phaser para o jogo, integrando com o controller e o EventBus.
  - `TemplateGame.jsx`: componente React que integra tudo, injeta o editor, cria o game e conecta o ciclo de execução.

```js
// src/games/template/config.js (exemplo)
export default {
  nome: 'Jogo Exemplo',
  fases: [
    { nome: 'Fase 1', descricao: '...', dificuldade: 'fácil' },
    // ...
  ]
};
```

```js
// src/games/template/blocks.js (exemplo)
export function defineBlocks(Blockly) {
  Blockly.Blocks['mover'] = {
    init: function() {
      this.appendDummyInput().appendField('Mover');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };
}
```

```js
// src/games/template/game.js (trecho)
import { createGameController } from '../../shared/gameController';
export function gameFactory(config) {
  // ... inicialização Phaser ...
  createGameController({
    executeCode: (code) => {/* ... */},
    resetGame: () => {/* ... */},
    checkSuccess: () => {/* ... */}
  });
}
```

```jsx
// src/games/template/TemplateGame.jsx (trecho)
<GameBase
  gameFactory={gameFactory}
  gameConfig={config}
  editor={<BlocklyEditor ... />}
/>
```

---

## 3. Fluxo de Criação de um Novo Jogo

1. **Crie uma nova pasta em `src/games/`** com o nome do seu jogo.
2. **Implemente o arquivo `config.js`** com as informações do jogo e das fases (nome, descricao, dificuldade, etc).
3. **Implemente os blocos customizados em `blocks.js`** (se necessário).
4. **Implemente a lógica do Phaser em `game.js`**, usando o padrão do controller e EventBus.
5. **Crie o componente React principal (`SeuJogo.jsx`)** baseado em `TemplateGame.jsx`, conectando editor, gameFactory e gameConfig.
6. **Garanta que o contexto e o EventBus estão integrados** para comunicação entre React e Phaser.
7. **Adapte/estenda componentes visuais** (modais, overlays, etc) conforme necessário.

---

## 4. Observações Importantes

- **Debug:** Para liberar todas as fases para teste, acesse o jogo com `?debug=true` na URL.
- **Persistência:** O progresso do jogador é salvo no localStorage por jogo.
- **Extensibilidade:** Todos os componentes são altamente reutilizáveis e desacoplados, facilitando a criação de novos jogos e fases.
- **Responsividade:** O layout é adaptado para mobile e desktop.

---

## 5. Recomendações para IA e Desenvolvedores

- Sempre siga o padrão de integração via EventBus e controller para garantir isolamento e reusabilidade.
- Use o contexto global para manipular estado de fases, progresso e execução.
- Adapte os componentes visuais conforme a identidade do novo jogo, mas mantenha a estrutura base para garantir integração.
- Consulte este guia sempre que for criar, adaptar ou depurar um novo jogo.

---

**Este documento serve como referência detalhada para a criação, integração e expansão de jogos no ecossistema Blockly NT.**
