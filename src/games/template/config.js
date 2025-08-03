export const gameConfig = {
  gameId: "template",
  gameName: "Template",
  descricao: "Um jogo exemplo que testa saída de texto",
  fases: [
    {
      id: 1,
      nome: "Fase 1",
      descricao: "Imprima a palavra correta",
      dificuldade: "Fácil",
      allowedBlocks: ["print_text"],
      maxBlocks: 3,
      goal: { 
        type: "text_match", 
        value: "palavra_certa" 
      },
    },
    {
      id: 2,
      nome: "Fase 2",
      descricao: "Imprima outra palavra",
      dificuldade: "Médio",
      allowedBlocks: ["print_text"],
      maxBlocks: 3,
      goal: { 
        type: "text_match", 
        value: "outra_palavra" 
      },
    }
  ]
};