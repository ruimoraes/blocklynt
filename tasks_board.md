**Descrição**
Alguns jogos podem ter execuções que caem em um loop infinito, sem chegar a solução. É necessário criar um controle para limitir o tempo máximo de uma execução e uma forma de cancelar a execução iniciada.



## Criar componente reutilizável de Console

**Descrição:**
Desenvolver um componente de Console reutilizável, que simule uma janela de console JavaScript para exibir as respostas dos editores (Blockly, Options ou CodeEditor) ao executar códigos. O componente deve ser visualmente semelhante a um console, responsivo e não depende necessariamente de Phaser (pode ser feito com P5, CSS ou outra solução leve).

**Checklist:**
- [ ] Definir requisitos visuais e funcionais do Console, considerando independência em relação ao editor.
- [ ] Implementar o componente de Console com aparência de janela de terminal, renderizado dentro do GameArea.
- [ ] Garantir que o Console possa receber e exibir saídas de diferentes editores, mas sem depender deles.
- [ ] Adicionar suporte a rolagem, limpeza e histórico de comandos/saídas.
- [ ] Garantir responsividade e acessibilidade do componente.
- [ ] Garantir que o Console não dependa de Phaser (pode ser feito com P5, CSS ou outra solução leve).
- [ ] Documentar como utilizar e integrar o Console em diferentes contextos do GameArea.

**Critérios de Aceite:**
- [ ] O Console pode ser integrado facilmente a qualquer editor do projeto.
- [ ] As saídas dos códigos executados aparecem corretamente no Console.
- [ ] O componente é visualmente semelhante a um terminal, responsivo e documentado.
## Criar template de game de Opções

**Descrição:**
Desenvolver um template reutilizável para games baseados em opções, cujo objetivo principal é servir como exercício de fixação de conteúdo. O usuário deve escolher entre diferentes alternativas para avançar ou resolver desafios, sendo que as opções podem conter texto e/ou pequenas imagens para auxiliar no exercício. O template deve ser flexível para ser adaptado a diferentes contextos e tipos de jogos. O GameArea desse tipo de game pode ou não utilizar Phaser, conforme a necessidade do exercício.

**Checklist:**
- [ ] Definir os requisitos e estrutura básica do template de game de opções.
- [ ] Implementar componente base para exibição de opções (texto e imagens) e captura da escolha do usuário.
- [ ] Permitir configuração dinâmica das opções e feedback para cada escolha.
- [ ] Adicionar suporte a diferentes tipos de feedback (visual, textual, etc.).
- [ ] Garantir responsividade e acessibilidade do template.
- [ ] Documentar como utilizar e customizar o template para novos jogos.

**Critérios de Aceite:**
- [ ] O template permite criar rapidamente novos games baseados em opções.
- [ ] É possível configurar opções e feedbacks de forma dinâmica.
- [ ] O componente é responsivo, acessível e documentado.
## Não permitir blocos soltos na workspace

**Descrição:**
Restringir o uso do Blockly para que apenas um bloco principal (e seus encadeamentos) seja permitido na workspace, impedindo a existência de blocos soltos ou múltiplos encadeamentos. O objetivo é garantir que o usuário sempre monte uma solução única e linear, facilitando a validação e compreensão do código.

**Checklist:**
- [ ] Analisar o comportamento atual da workspace quanto a blocos soltos.
- [ ] Implementar restrição para permitir apenas um bloco principal e seus encadeamentos.
- [ ] Exibir mensagem de aviso ao usuário ao tentar criar blocos soltos ou múltiplos encadeamentos.
- [ ] Garantir que a restrição funcione em todas as fases e tipos de jogo.
- [ ] Testar a funcionalidade em diferentes dispositivos e navegadores.
- [ ] Documentar a solução e possíveis limitações.

**Critérios de Aceite:**
- [ ] Não é possível deixar blocos soltos ou múltiplos encadeamentos na workspace.
- [ ] O usuário recebe feedback claro ao tentar violar a restrição.
- [ ] A solução é estável, responsiva e documentada.
## Melhorar experiência de blocos no mobile

**Descrição:**
Melhorar a usabilidade do Blockly em dispositivos móveis, fixando os blocos no topo da workspace e impedindo a movimentação livre deles. O objetivo é otimizar o uso do espaço e tornar a experiência mais intuitiva para usuários mobile.

**Checklist:**
- [ ] Analisar o comportamento atual dos blocos no mobile.
- [ ] Implementar a fixação dos blocos no topo da workspace em dispositivos móveis.
- [ ] Impedir a movimentação livre dos blocos na workspace mobile.
- [ ] Garantir que a solução não afete negativamente a experiência no desktop.
- [ ] Testar a nova experiência em diferentes tamanhos de tela e navegadores mobile.
- [ ] Documentar a solução e possíveis limitações.

**Critérios de Aceite:**
- [ ] Os blocos permanecem fixos no topo da workspace em dispositivos móveis.
- [ ] Não é possível mover blocos livremente na workspace mobile.
- [ ] A experiência no desktop permanece inalterada.
- [ ] A solução é responsiva, estável e documentada.
## Recriar a home com listagem dinâmica dos jogos

**Descrição:**
Recriar a página inicial do site para exibir dinamicamente a lista de jogos disponíveis, tornando a navegação mais intuitiva e atraente. Pesquisar e se inspirar em melhores modelos de home para sites de jogos educacionais e plataformas de aprendizado.

**Checklist:**
- [ ] Pesquisar referências e modelos de home para sites de jogos e plataformas educacionais.
- [ ] Definir o layout e os elementos principais da nova home (ex: cards, filtros, busca, destaques).
- [ ] Implementar a listagem dinâmica dos jogos, buscando os dados de forma centralizada.
- [ ] Garantir que a home seja responsiva e acessível.
- [ ] Adicionar navegação fácil para cada jogo e para outras áreas importantes do site.
- [ ] Testar a nova home em diferentes dispositivos e navegadores.
- [ ] Documentar a estrutura e lógica da nova home.

**Critérios de Aceite:**
- [ ] A home exibe dinamicamente todos os jogos disponíveis.
- [ ] O layout é moderno, responsivo e inspirado em boas práticas de UX/UI.
- [ ] A navegação para os jogos e demais áreas do site é fácil e intuitiva.
- [ ] A solução está documentada e pronta para manutenção/expansão.

## Definir um nome para o site

**Descrição:**
Definir um nome original, memorável e alinhado com o propósito do site, levando em conta o público-alvo, a proposta educacional e a facilidade de comunicação/divulgação.

**Checklist:**
- [ ] Levantar palavras-chave relacionadas ao projeto, público e objetivos.
- [ ] Pesquisar nomes já existentes para evitar conflitos.
- [ ] Gerar uma lista de possíveis nomes.
- [ ] Validar os nomes quanto à disponibilidade de domínio e redes sociais.
- [ ] Selecionar o nome final com base em critérios de originalidade, clareza e alinhamento com o projeto.
- [ ] Atualizar a documentação e materiais do projeto com o novo nome.

**Critérios de Aceite:**
- [ ] O nome é original, fácil de lembrar e comunicar.
- [ ] Não há conflitos com marcas ou domínios já existentes.
- [ ] O nome está refletido em toda a documentação e comunicação do projeto.
## Acrescentar lint para qualidade do código

**Descrição:**
Adicionar e configurar uma ferramenta de lint (como ESLint) ao projeto para garantir a padronização e qualidade do código, prevenindo erros comuns e facilitando a manutenção.

**Checklist:**
- [ ] Escolher a ferramenta de lint adequada (ex: ESLint).
- [ ] Instalar as dependências necessárias no projeto.
- [ ] Criar ou ajustar o arquivo de configuração do lint (ex: `.eslintrc`, `eslint.config.js`).
- [ ] Definir regras e padrões de código a serem seguidos.
- [ ] Integrar o lint ao fluxo de desenvolvimento (scripts npm/pnpm, IDE, CI se aplicável).
- [ ] Corrigir os problemas apontados pelo lint no código existente.
- [ ] Documentar o uso do lint e como rodar/verificar localmente.

**Critérios de Aceite:**
- [ ] O projeto possui lint configurado e funcional.
- [ ] O código segue os padrões definidos pelo lint.
- [ ] O processo de lint está documentado para todos os desenvolvedores.
## Permitir tela cheia do GameArea

**Descrição:**
Implementar a funcionalidade de "tela cheia" para o componente GameArea, permitindo que ele ocupe toda a tela do navegador, sem impactar a renderização do BlocklyEditor. O modo tela cheia deve ser opcional, ativado por um botão, e deve permitir retornar ao modo anterior facilmente. A tela cheia deve afetar apenas o GameBase, mantendo o restante da interface inalterado.

**Checklist:**
- [ ] Analisar a estrutura atual do GameArea e GameBase para identificar pontos de ajuste para tela cheia.
- [ ] Implementar um botão de "tela cheia" visível no GameArea.
- [ ] Garantir que o modo tela cheia afete apenas o GameBase, sem alterar o BlocklyEditor ou outros componentes.
- [ ] Implementar um botão para sair do modo tela cheia e retornar ao layout anterior.
- [ ] Garantir responsividade e compatibilidade cross-browser.
- [ ] Testar a funcionalidade em diferentes dispositivos e navegadores.
- [ ] Documentar o funcionamento e possíveis limitações.

**Critérios de Aceite:**
- [ ] O usuário pode alternar entre modo normal e tela cheia do GameArea por meio de botões.
- [ ] O modo tela cheia ocupa toda a tela apenas para o GameBase, sem impactar o BlocklyEditor.
- [ ] O layout volta ao normal ao sair do modo tela cheia.
- [ ] A funcionalidade é responsiva, estável e documentada.
## Criação do game Motoca

**Descrição:**
Converter o jogo "Saindo do Buraco" para o formato Blockly, criando o game "Motoca". O diferencial é tornar a área do game jogável diretamente pelo usuário: em desktop, com botões na tela; em mobile, com toque na área do game. Os objetivos das fases serão baseados em tempo de execução (ex: manter a cena rodando por 10, 20, 30 segundos) e haverá duas fases específicas onde a validação será se a movimentação para esquerda ou direita, programada por blocos, está correta. O último desafio será implementar uma IA que controla o jogo automaticamente.

**Checklist:**
- [ ] Analisar e adaptar as regras e mecânicas do jogo "Saindo do Buraco" para o novo formato.
- [ ] Definir os blocos Blockly necessários para controlar a motoca (movimentação, espera, lógica condicional, etc.).
- [ ] Implementar controles jogáveis: botões em tela (desktop) e toque na área do game (mobile).
- [ ] Criar os assets gráficos da motoca, cenário e elementos interativos.
- [ ] Implementar o componente principal do game (ex: `src/games/motoca/MotocaGame.jsx`).
- [ ] Integrar Blockly ao game, permitindo que o usuário monte a lógica de movimentação.
- [ ] Implementar fases com objetivos de tempo de execução.
- [ ] Implementar fases com validação de movimentação correta (esquerda/direita).
- [ ] Implementar o desafio final: IA que controla o jogo automaticamente.
- [ ] Testar o game em diferentes dispositivos e navegadores.
- [ ] Documentar o funcionamento, exemplos de uso dos blocos e possíveis extensões do game.

**Critérios de Aceite:**
- [ ] O usuário consegue controlar a motoca usando blocos e controles interativos.
- [ ] O game possui fases com objetivos de tempo e validação de movimentação.
- [ ] O desafio final permite observar a IA controlando o jogo.
- [ ] O componente é responsivo e funciona em diferentes dispositivos.
- [ ] O código é modular, documentado e pronto para futuras expansões.
## Criação do game Caminhão

**Descrição:**
Desenvolver um game chamado "Caminhão" que mescla a lógica visual do semáforo com a lógica de movimentos do autômato. O usuário deverá programar, usando blocos Blockly, a movimentação de um caminhão em um cenário, respeitando sinais de semáforo e regras de transição de estados (como em autômatos). O objetivo é ensinar lógica sequencial, controle de fluxo e interação entre múltiplos elementos programáveis.

**Checklist:**
- [ ] Definir as regras e objetivos do game Caminhão (ex: chegar ao destino respeitando semáforos).
- [ ] Especificar e criar os blocos Blockly necessários (movimentação, checagem de semáforo, espera, transições de estado, etc.).
- [ ] Criar os assets gráficos do caminhão, semáforos e cenário.
- [ ] Implementar o componente principal do game (ex: `src/games/caminhao/CaminhaoGame.jsx`).
- [ ] Integrar Blockly ao game, permitindo que o usuário monte a lógica de movimentação e interação com semáforos.
- [ ] Implementar a execução dos blocos, controlando o caminhão e os semáforos conforme a lógica criada.
- [ ] Adicionar feedback visual para ações corretas e incorretas.
- [ ] Criar fases/desafios progressivos, aumentando a complexidade das interações.
- [ ] Testar o game em diferentes dispositivos e navegadores.
- [ ] Documentar o funcionamento, exemplos de uso dos blocos e possíveis extensões do game.

**Critérios de Aceite:**
- [ ] O usuário consegue programar, com blocos, a movimentação do caminhão e a interação com semáforos.
- [ ] O caminhão respeita corretamente os sinais e transições de estado definidos pela lógica criada.
- [ ] O game possui fases ou desafios com objetivos claros e progressivos.
- [ ] O feedback visual é claro e responsivo.
- [ ] O código é modular, documentado e pronto para futuras expansões.
# Criação do game Semáforo simples

**Descrição:**
Desenvolver um mini game de Semáforo simples utilizando Blockly, focado na representação visual e no controle do funcionamento de um semáforo (vermelho, amarelo, verde) por meio de blocos de programação. O objetivo é criar um componente visual interativo onde o usuário monta, com blocos, a lógica de troca de estados do semáforo, podendo ser utilizado para fins educativos ou como base para jogos mais complexos no futuro.

**Checklist:**
- [ ] Definir o escopo visual e funcional do semáforo (apenas troca de luzes, sem lógica de trânsito).
- [ ] Especificar e criar os blocos Blockly necessários para controlar o semáforo (ex: "acender luz vermelha", "acender luz amarela", "acender luz verde", "esperar tempo").
- [ ] Criar os assets gráficos das luzes do semáforo.
- [ ] Implementar o componente do semáforo (ex: `src/games/semaforo/SemaforoGame.jsx`).
- [ ] Integrar Blockly ao game, permitindo que o usuário monte a lógica de troca de luzes usando blocos.
- [ ] Implementar a execução dos blocos para controlar o semáforo visualmente.
- [ ] Implementar animação ou transição visual entre os estados.
- [ ] Testar o componente em diferentes dispositivos e navegadores.
- [ ] Documentar o funcionamento, exemplos de uso dos blocos e possíveis extensões do game.

**Critérios de Aceite:**
- [ ] O usuário consegue montar, com blocos, a lógica de troca de luzes do semáforo.
- [ ] O semáforo alterna corretamente entre os três estados visuais conforme a lógica criada com blocos.
- [ ] O componente é responsivo e funciona em diferentes dispositivos.
- [ ] O código é modular, documentado e pronto para futuras expansões.
## Criação do game Turtle

**Descrição:**
Desenvolver um novo jogo chamado "Turtle" inspirado no conceito de programação de tartaruga (turtle graphics), onde o usuário pode controlar uma tartaruga para desenhar formas e padrões utilizando blocos de programação. O objetivo é ensinar lógica de programação e pensamento computacional de forma visual e interativa.

****** AVALIAR SE É NECESSÁRIO USO DE PHASER ******


**Checklist:**
- [ ] Definir as regras e objetivos do game Turtle.
- [ ] Especificar os blocos necessários (movimentação, rotação, repetição, etc.).
- [ ] Criar os assets gráficos da tartaruga e do cenário.
- [ ] Implementar o componente principal do game Turtle (ex: `src/games/turtle/TurtleGame.jsx`).
- [ ] Integrar o Blockly com os blocos específicos do Turtle.
- [ ] Implementar a lógica de execução dos comandos da tartaruga.
- [ ] Adicionar feedback visual para os comandos executados.
- [ ] Criar fases/desafios progressivos para o usuário.
- [ ] Testar o game em diferentes dispositivos e navegadores.
- [ ] Documentar o funcionamento e como criar novos desafios para o Turtle.

**Critérios de Aceite:**
- [ ] O usuário consegue controlar a tartaruga usando blocos para desenhar na tela.
- [ ] O game possui fases ou desafios com objetivos claros.
- [ ] O feedback visual é claro e responsivo.
- [ ] O código é modular e documentado, facilitando manutenção e expansão.

# Tasks para o Board
---


## Criar sessão de documentação para o site

**Descrição:**
Planejar, estruturar e implementar uma sessão de documentação para o site, tornando o projeto mais acessível para novos usuários e desenvolvedores. A documentação deve abordar desde a visão geral do sistema até detalhes de uso, arquitetura, exemplos, FAQ e orientações para contribuição. O objetivo é facilitar o onboarding, reduzir dúvidas recorrentes e garantir que o conhecimento do projeto esteja centralizado e atualizado.

**Checklist:**
- [ ] Levantar as principais dúvidas e necessidades de informação dos usuários e desenvolvedores.
- [ ] Definir a estrutura inicial da documentação (ex: visão geral, instalação, uso, arquitetura, contribuição, FAQ, changelog).
- [ ] Criar um diretório dedicado para documentação, se necessário (ex: `docs/`).
- [ ] Documentar as principais funcionalidades do site, com exemplos de uso e imagens ilustrativas.
- [ ] Adicionar instruções detalhadas de instalação, configuração e execução do projeto (incluindo dependências, comandos e dicas para Windows/Linux/Mac).
- [ ] Explicar a arquitetura do sistema, principais componentes, fluxos e decisões técnicas.
- [ ] Incluir seção de contribuição: como abrir issues, enviar PRs, padrões de código, boas práticas e contato.
- [ ] Adicionar FAQ com dúvidas frequentes e soluções para problemas comuns.
- [ ] Manter a documentação atualizada conforme novas features e mudanças são lançadas.
- [ ] Revisar a clareza, organização e acessibilidade do conteúdo.

**Critérios de Aceite:**
- [ ] A documentação cobre as principais áreas do projeto, incluindo visão geral, uso, arquitetura e contribuição.
- [ ] Usuários e desenvolvedores conseguem entender como instalar, usar e contribuir com o site apenas lendo a documentação.
- [ ] A documentação está acessível, organizada, com exemplos e imagens, e é facilmente encontrada no repositório.
- [ ] Existe um processo definido para manter a documentação atualizada.

## Limitar quantidade de blocos por fase no Blockly

**Descrição:**
Implementar uma funcionalidade que permita definir e restringir o número máximo de blocos que o usuário pode utilizar em cada fase do jogo. O objetivo é aumentar o desafio e incentivar soluções mais eficientes.

**Checklist:**
- [ ] Adicionar campo `maxBlocks` na configuração de cada fase.
- [ ] Integrar o limite de blocos na inicialização do Blockly.
- [ ] Exibir ao usuário o número de blocos restantes e/ou o limite atingido.
- [ ] Impedir a adição de novos blocos ao atingir o limite.
- [ ] Testar a funcionalidade em diferentes fases e dispositivos.
- [ ] Atualizar a documentação do projeto sobre a configuração do limite de blocos.

**Critérios de Aceite:**
- [ ] O usuário não consegue adicionar mais blocos do que o permitido na fase.
- [ ] O limite pode ser configurado individualmente para cada fase.
- [ ] O usuário recebe feedback visual ao atingir o limite.

---

## Abstrair interpretador JavaScript dos códigos dos jogos

**Descrição:**
Refatorar o projeto para criar uma camada de abstração para o interpretador JavaScript utilizado na execução dos códigos dos jogos. O objetivo é facilitar a manutenção, permitir futuras trocas de interpretador e centralizar regras de execução e segurança.

**Checklist:**
- [ ] Identificar onde o código do usuário é interpretado/executado atualmente nos jogos.
- [ ] Criar um módulo ou serviço dedicado para o interpretador JS (ex: `src/shared/jsInterpreter.js`).
- [ ] Mover toda a lógica de execução de código JS dos jogos para esse novo módulo.
- [ ] Garantir que a interface do interpretador seja genérica e reutilizável para diferentes jogos.
- [ ] Atualizar os jogos para utilizar a nova abstração.
- [ ] Adicionar testes para garantir o funcionamento da abstração.
- [ ] Documentar como utilizar e estender o interpretador.

**Critérios de Aceite:**
- [ ] O interpretador JS está isolado em um módulo próprio.
- [ ] Todos os jogos utilizam a nova abstração para executar código JS.
- [ ] A interface do interpretador é clara e documentada.

## Implementar controle de tempo máximo e cancelamento de execução

**Descrição:**
Alguns jogos podem permitir que o usuário crie execuções que entram em loop infinito ou demoram excessivamente para terminar. É necessário implementar um mecanismo que limite o tempo máximo de execução de qualquer código disparado pelo usuário (seja via Blockly, CodeEditor ou outros), além de prover uma forma de cancelar a execução em andamento manualmente.

**Checklist:**
- [ ] Definir o tempo máximo de execução permitido para cada jogo/fase (configurável).
- [ ] Implementar lógica para interromper/cancelar a execução automaticamente ao atingir o tempo limite.
- [ ] Adicionar botão ou comando para o usuário cancelar manualmente a execução em andamento.
- [ ] Exibir mensagem clara ao usuário quando a execução for interrompida por tempo excedido ou cancelamento manual.
- [ ] Garantir que o sistema funcione para diferentes tipos de jogos e editores (Blockly, CodeEditor, etc).
- [ ] Testar o controle de tempo e cancelamento em diferentes navegadores e dispositivos.
- [ ] Documentar como configurar e utilizar o controle de tempo/cancelamento nos jogos.

**Critérios de Aceite:**
- [ ] Nenhuma execução pode ultrapassar o tempo máximo definido.
- [ ] O usuário pode cancelar a execução a qualquer momento.
- [ ] O feedback ao usuário é claro e responsivo.
- [ ] O mecanismo é reutilizável e documentado.

---

## Migrar jogo Autômato para utilizar Phaser

**Descrição:**
O jogo Autômato atualmente não utiliza Phaser como engine principal. Migrar toda a lógica, renderização e controle do jogo para dentro de uma cena Phaser, aproveitando os recursos de animação, física e gerenciamento de estados da engine.

**Checklist:**
- [ ] Analisar a lógica atual do jogo Autômato e identificar pontos de integração com Phaser.
- [ ] Refatorar o componente principal para inicializar e controlar uma cena Phaser.
- [ ] Migrar toda a renderização visual e interações para dentro do contexto Phaser.
- [ ] Garantir que a integração com Blockly e outros editores continue funcionando normalmente.
- [ ] Testar o jogo migrado em diferentes dispositivos e navegadores.
- [ ] Documentar a arquitetura e pontos de extensão do novo Autômato com Phaser.

**Critérios de Aceite:**
- [ ] O jogo Autômato roda inteiramente dentro de uma cena Phaser.
- [ ] Todas as funcionalidades anteriores são mantidas ou melhoradas.
- [ ] O código está modularizado e documentado para futuras expansões.

---

## Criar Template de uso do Phaser

**Descrição:**
Desenvolver um template reutilizável para novos jogos baseados em Phaser, facilitando a criação de novos games com estrutura padronizada, integração com React e suporte a editores como Blockly.

**Checklist:**
- [ ] Definir a estrutura básica do template (componentização, ciclo de vida, integração com React).
- [ ] Implementar inicialização e destruição segura da cena Phaser.
- [ ] Adicionar exemplos de integração com editores (Blockly, CodeEditor).
- [ ] Documentar como criar novos jogos a partir do template.
- [ ] Garantir responsividade e compatibilidade cross-browser.
- [ ] Adicionar hooks/utilitários para comunicação entre React e Phaser.

**Critérios de Aceite:**
- [ ] É possível criar rapidamente novos jogos Phaser a partir do template.
- [ ] O template é documentado e fácil de entender.
- [ ] Suporta integração com diferentes editores e componentes do projeto.

---

## Utilizar react-resizable-panels e remover sistema de Abas mobile

**Descrição:**
Melhorar a experiência de uso em dispositivos móveis e desktop substituindo o sistema atual de abas por painéis redimensionáveis usando a biblioteca `react-resizable-panels`. Isso permitirá que o usuário ajuste o espaço entre editor, game e console de forma mais flexível.

**Checklist:**
- [ ] Remover o sistema de abas mobile do projeto.
- [ ] Integrar a biblioteca `react-resizable-panels` ao layout principal do GameArea.
- [ ] Permitir que o usuário ajuste o tamanho dos painéis conforme sua preferência.
- [ ] Garantir que a experiência seja fluida tanto em mobile quanto em desktop.
- [ ] Testar a responsividade e usabilidade em diferentes dispositivos.
- [ ] Documentar a nova abordagem e exemplos de uso.

**Critérios de Aceite:**
- [ ] O sistema de abas foi removido.
- [ ] O usuário pode redimensionar os painéis livremente.
- [ ] O layout é responsivo e estável.

---

## Customizar experiência do Workspace Blockly em dispositivo Mobile

**Descrição:**
Aprimorar a usabilidade do Blockly em dispositivos móveis, tornando a interface mais limpa e adaptada ao toque. Isso inclui ocultar ícones de categorias e utilizar ícones do Font Awesome no nome das categorias.

**Checklist:**
- [ ] Detectar quando o usuário está em um dispositivo mobile.
- [ ] Ocultar ícones de categorias na toolbox do Blockly para mobile.
- [ ] Exibir ícones do Font Awesome ao lado do nome da categoria (em vez do ícone padrão).
- [ ] Garantir que a experiência no desktop permaneça inalterada.
- [ ] Testar a nova experiência em diferentes tamanhos de tela e navegadores mobile.
- [ ] Documentar a solução e possíveis limitações.

**Critérios de Aceite:**
- [ ] A toolbox do Blockly é mais limpa e adaptada ao mobile.
- [ ] Os ícones das categorias usam Font Awesome.
- [ ] A experiência desktop não é afetada.

---

## Utilizar Render do Scratch no Blockly

**Descrição:**
Integrar o renderer visual do Scratch (Scratch Blocks) ao Blockly, proporcionando uma experiência visual mais amigável e próxima do Scratch, especialmente para usuários iniciantes.

**Checklist:**
- [ ] Pesquisar e integrar o renderer do Scratch ao Blockly.
- [ ] Ajustar a configuração do BlocklyEditor para usar o renderer do Scratch.
- [ ] Testar a compatibilidade dos blocos existentes com o novo renderer.
- [ ] Garantir que a experiência visual seja consistente em todas as fases e jogos.
- [ ] Documentar como ativar/desativar o renderer do Scratch.

**Critérios de Aceite:**
- [ ] O Blockly utiliza o renderer do Scratch.
- [ ] A experiência visual é mais amigável e próxima do Scratch.
- [ ] O sistema é documentado e pode ser revertido facilmente se necessário.

---

## Recriar sistema de controle de máquina de estado

**Descrição:**
Refatorar todo o sistema de controle de máquina de estado dos jogos para torná-lo mais limpo, simples e eficiente. O objetivo é evitar renderizações desnecessárias do Blockly e garantir que o controle de estados seja centralizado, fácil de manter e reutilizável.

**Checklist:**
- [ ] Analisar o sistema atual de controle de estados e identificar pontos de complexidade/desempenho.
- [ ] Projetar uma nova arquitetura de máquina de estado mais enxuta e desacoplada do render do Blockly.
- [ ] Implementar o novo sistema de controle de estados.
- [ ] Garantir que o novo sistema funcione para todos os jogos e editores.
- [ ] Testar a performance e a estabilidade do novo sistema.
- [ ] Documentar a arquitetura e exemplos de uso.

**Critérios de Aceite:**
- [ ] O controle de estados é centralizado, limpo e fácil de entender.
- [ ] O Blockly não é renderizado desnecessariamente.
- [ ] O sistema é reutilizável e documentado.

---

## Corrigir bug que apaga blocos do workspace no game Automato

**Descrição:**
Existe um bug no game Automato em que, na primeira execução de cada fase, o workspace do Blockly é renderizado novamente ao executar, apagando os blocos da tela (mas mantendo-os no localStorage). É necessário corrigir esse comportamento para garantir que os blocos permaneçam visíveis e utilizáveis após a execução.

**Checklist:**
- [ ] Investigar a causa da re-renderização do workspace na primeira execução.
- [ ] Corrigir o fluxo de inicialização e execução para evitar perda dos blocos visuais.
- [ ] Garantir que o localStorage e o estado visual do workspace estejam sempre sincronizados.
- [ ] Testar o comportamento em diferentes fases e navegadores.
- [ ] Documentar a solução e possíveis causas do bug.

**Critérios de Aceite:**
- [ ] Os blocos não desaparecem do workspace após a execução.
- [ ] O localStorage e o visual do workspace permanecem sincronizados.

---

## Adaptar seletor de fases para simplificação dos estados da aplicação

**Descrição:**
Refatorar o seletor de fases para acompanhar a simplificação dos estados da aplicação, tornando-o mais direto, fácil de manter e integrado ao novo fluxo de controle de estados.

**Checklist:**
- [ ] Analisar o seletor de fases atual e identificar dependências desnecessárias.
- [ ] Simplificar a lógica de seleção e transição de fases.
- [ ] Integrar o seletor ao novo sistema de controle de estados.
- [ ] Testar a navegação entre fases em diferentes jogos.
- [ ] Documentar a nova abordagem.

**Critérios de Aceite:**
- [ ] O seletor de fases é simples, eficiente e integrado ao novo fluxo de estados.
- [ ] A navegação entre fases é estável e previsível.

---

## Remover sistema de debug anterior e simplificá-lo

**Descrição:**
O sistema de debug anterior exigia implementação individual em cada jogo, tornando a manutenção difícil e o uso pouco transparente. Refatorar para um sistema de debug mais simples, centralizado e fácil de usar em qualquer jogo.

**Checklist:**
- [ ] Remover o sistema de debug antigo dos jogos.
- [ ] Implementar um novo sistema de debug centralizado e plugável.
- [ ] Garantir que o novo debug seja transparente e fácil de ativar/desativar.
- [ ] Testar o debug em diferentes jogos e cenários.
- [ ] Documentar como utilizar o novo sistema de debug.

**Critérios de Aceite:**
- [ ] O debug é centralizado, simples e reutilizável.
- [ ] Não é necessário implementar debug individual em cada jogo.
- [ ] O sistema é documentado e fácil de ativar.

---

## Utilizar js-interpreter no Automato

**Descrição:**
Evoluir a execução dos códigos do jogo Automato para utilizar o js-interpreter, evitando o uso de eval e adotando o interpretador de códigos JavaScript original do Blockly Games. Isso trará mais segurança, controle e compatibilidade com o padrão Blockly.

**Checklist:**
- [ ] Integrar o js-interpreter ao fluxo de execução do Automato.
- [ ] Remover qualquer uso de eval ou execuções inseguras de código.
- [ ] Adaptar a API de integração do jogo para funcionar com o js-interpreter.
- [ ] Testar a execução dos blocos em diferentes fases e cenários.
- [ ] Documentar a integração e exemplos de uso.

**Critérios de Aceite:**
- [ ] O Automato executa códigos usando js-interpreter.
- [ ] Não há mais uso de eval no fluxo do jogo.
- [ ] O sistema é seguro, compatível e documentado.

---

## Criar guia de contribuição

**Descrição:**
Desenvolver um guia de contribuição claro e acessível para o projeto, orientando novos colaboradores sobre como participar, abrir issues, enviar pull requests, seguir padrões de código e boas práticas.

**Checklist:**
- [ ] Definir a estrutura do guia de contribuição (ex: introdução, fluxo de contribuição, padrões de código, revisão de PRs, contato).
- [ ] Criar um arquivo CONTRIBUTING.md no repositório.
- [ ] Incluir exemplos de issues e pull requests bem formatados.
- [ ] Explicar o processo de revisão e aprovação de contribuições.
- [ ] Documentar padrões de commit, branch e código.
- [ ] Garantir que o guia seja fácil de encontrar e entender.
- [ ] Revisar e atualizar o guia conforme necessário.

**Critérios de Aceite:**
- [ ] O projeto possui um guia de contribuição acessível e atualizado.
- [ ] Novos colaboradores conseguem contribuir seguindo o guia.
- [ ] O guia cobre desde o fluxo básico até padrões e boas práticas.

---

## Migrar repositório para o Git do NT

**Descrição:**
Migrar todo o repositório do projeto para a infraestrutura de Git do NT, garantindo histórico, issues e documentação preservados.

**Checklist:**
- [ ] Planejar o processo de migração e comunicar a equipe.
- [ ] Realizar backup completo do repositório atual.
- [ ] Criar o novo repositório no Git do NT.
- [ ] Migrar todo o histórico de commits, branches e tags.
- [ ] Migrar issues e pull requests relevantes (se aplicável).
- [ ] Atualizar links/documentação para o novo repositório.
- [ ] Testar o novo repositório e garantir que está funcional.
- [ ] Comunicar a equipe sobre a conclusão da migração.

**Critérios de Aceite:**
- [ ] O repositório está disponível e funcional no Git do NT.
- [ ] Todo o histórico e documentação foram preservados.
- [ ] A equipe está informada e utilizando o novo repositório.

---

## Criar versão 100% offline do projeto

**Descrição:**
Desenvolver uma versão totalmente offline do projeto, permitindo que todas as funcionalidades, jogos e editores funcionem sem necessidade de conexão com a internet. O objetivo é garantir acessibilidade em ambientes sem acesso à rede, como escolas, eventos ou uso pessoal.

**Checklist:**
- [ ] Mapear todas as dependências externas (CDNs, APIs, fontes, imagens, libs, etc).
- [ ] Adaptar o build para empacotar todos os assets e dependências localmente.
- [ ] Garantir que o carregamento de fontes, imagens e scripts seja feito apenas do ambiente local.
- [ ] Testar o funcionamento de todos os jogos, editores e recursos em modo offline.
- [ ] Documentar o processo de build e uso da versão offline.
- [ ] Incluir instruções para instalação e execução offline em diferentes sistemas operacionais.
- [ ] Validar a experiência offline em diferentes navegadores e dispositivos.

**Critérios de Aceite:**
- [ ] O projeto funciona 100% offline, sem dependências externas.
- [ ] Todas as funcionalidades e jogos estão disponíveis localmente.
- [ ] O processo de build e uso offline está documentado.

---

## Recriar funcionalidade de instalação como PWA na abertura do site na versão mobile

**Descrição:**
Reimplementar a funcionalidade de instalação do site como Progressive Web App (PWA) ao ser acessado em dispositivos mobile, garantindo que o prompt de instalação seja apresentado de forma amigável e consistente.

**Checklist:**
- [ ] Revisar e atualizar o manifesto e service worker do PWA.
- [ ] Detectar acesso via mobile e exibir prompt de instalação apropriado.
- [ ] Garantir que o prompt não seja exibido repetidamente para o mesmo usuário.
- [ ] Testar a instalação e funcionamento offline do PWA em diferentes navegadores mobile.
- [ ] Documentar o fluxo de instalação e possíveis limitações.

**Critérios de Aceite:**
- [ ] O usuário mobile recebe o prompt de instalação do PWA ao acessar o site.
- [ ] O site pode ser instalado e funciona offline como app.
- [ ] O fluxo é amigável, não intrusivo e documentado.

---

## Criar sistema de ajuda configurável por fase

**Descrição:**
Desenvolver um sistema de ajuda/contextualização que permita configurar dicas, instruções ou tutoriais específicos para cada fase dos jogos, facilitando o aprendizado e a resolução dos desafios.

**Checklist:**
- [ ] Definir o formato/configuração das ajudas por fase (ex: texto, imagens, vídeos, links).
- [ ] Implementar componente de ajuda acessível durante o jogo.
- [ ] Permitir configuração dinâmica das ajudas por fase no backend/config do jogo.
- [ ] Garantir que o sistema de ajuda seja responsivo e acessível.
- [ ] Testar o sistema em diferentes jogos e dispositivos.
- [ ] Documentar como configurar e utilizar o sistema de ajuda.

**Critérios de Aceite:**
- [ ] Cada fase pode exibir sua própria ajuda configurável.
- [ ] O sistema é fácil de configurar, responsivo e documentado.

---

## Apresentar tela de instruções na primeira abertura de um game

**Descrição:**
Implementar uma tela/modal de instruções que seja apresentada automaticamente na primeira vez que o usuário abrir um determinado jogo, ajudando na compreensão das regras e objetivos.

**Checklist:**
- [ ] Criar componente de instruções/modal reutilizável.
- [ ] Detectar se é a primeira vez do usuário em cada jogo (ex: localStorage, IndexedDB).
- [ ] Exibir a tela de instruções apenas na primeira abertura do jogo.
- [ ] Permitir que o usuário acesse as instruções novamente se desejar.
- [ ] Testar o comportamento em diferentes jogos e navegadores.
- [ ] Documentar a solução e pontos de configuração.

**Critérios de Aceite:**
- [ ] O usuário vê as instruções na primeira vez que acessa um game.
- [ ] O componente é reutilizável e fácil de configurar.
- [ ] O usuário pode acessar as instruções novamente se quiser.

---
