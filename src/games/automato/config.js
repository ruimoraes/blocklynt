
export const gameConfig = {
  gameId: 'automato',
  gameName: "Autômato",
  descricao: "Aprenda programação navegando por labirintos com blocos Blockly",
  fases: [
    {
      id: 1,
      nome: 'Primeiro Passo',
      descricao: 'Aprenda a mover para frente',
      maxBlocks: Infinity,
      startPosition: { x: 2, y: 4 },
      allowedBlocks: ['moveForward'],
      mapa: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 1, 3, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ]
    },
    {
      id: 2,
      nome: 'Primeira Curva',
      descricao: 'Aprenda a virar à direita',
      maxBlocks: Infinity,
      startPosition: { x: 2, y: 4 },
      allowedBlocks: ['moveForward', 'turnLeft', 'turnRight'],
      mapa: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 3, 0, 0, 0],
        [0, 0, 2, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]
    },
    {
      id: 3,
      nome: 'Linha Reta',
      descricao: 'Use repetição para economizar blocos',
      maxBlocks: 2,
      startPosition: { x: 1, y: 4 },
      allowedBlocks: ['moveForward', 'turnLeft', 'turnRight', 'automato_repeat_until_goal'],
      mapa: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 1, 1, 1, 1, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]
    },
    {
      id: 4,
      nome: 'Escadaria',
      descricao: 'Navegue pela escadaria diagonal',
      maxBlocks: 5,
      startPosition: { x: 1, y: 6 },
      allowedBlocks: ['moveForward', 'turnLeft', 'turnRight', 'automato_repeat_until_goal'],
      mapa: [
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 3, 1, 0],
        [0, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0],
        [0, 2, 1, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0]
      ]
    },
    {
      id: 5,
      nome: 'Torre',
      descricao: 'Suba a torre',
      maxBlocks: 5,
      startPosition: { x: 3, y: 6 },
      allowedBlocks: ['moveForward', 'turnLeft', 'turnRight', 'automato_repeat_until_goal'],
      mapa: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 2, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]
    },
    {
      id: 6,
      nome: 'Caminho em Bloco',
      descricao: 'Use condicionais - verifique se há caminho à frente',
      maxBlocks: 5,
      startPosition: { x: 1, y: 6 },
      allowedBlocks: ['moveForward', 'turnLeft', 'turnRight', 'automato_repeat_until_goal', 'automato_if'],
      mapa: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 0, 1, 0, 0],
        [0, 1, 1, 3, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 2, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]
    },
    {
      id: 7,
      nome: 'Labirinto Ramificado',
      descricao: 'Navegue por caminhos que se ramificam - use condicionais gerais',
      maxBlocks: 10,
      startPosition: { x: 1, y: 2 },
      allowedBlocks: ['moveForward', 'turnLeft', 'turnRight', 'automato_repeat_until_goal', 'automato_if'],
      mapa: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 0],
        [0, 2, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 0],
        [0, 1, 1, 3, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]
    },
    {
      id: 8,
      nome: 'Caminho Complexo',
      descricao: 'Um labirinto mais desafiador',
      maxBlocks: 7,
      startPosition: { x: 1, y: 6 },
      allowedBlocks: ['moveForward', 'turnLeft', 'turnRight', 'automato_repeat_until_goal', 'automato_if'],
      mapa: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 2, 1, 1, 0, 3, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]
    },
    {
      id: 9,
      nome: 'Labirinto Avançado',
      descricao: 'Use todas suas habilidades - agora com condicionais if/else',
      maxBlocks: 10,
      startPosition: { x: 5, y: 6 },
      allowedBlocks: ['moveForward', 'turnLeft', 'turnRight', 'automato_repeat_until_goal', 'automato_if', 'automato_ifElse'],
      mapa: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [3, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 1, 0],
        [1, 1, 1, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 2, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]
    },
    {
      id: 10,
      nome: 'Desafio Final',
      descricao: 'O último desafio - use tudo que aprendeu!',
      maxBlocks: 10,
      startPosition: { x: 1, y: 6 },
      allowedBlocks: ['moveForward', 'turnLeft', 'turnRight', 'automato_repeat_until_goal', 'automato_if', 'automato_ifElse'],
      mapa: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 3, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 1, 0],
        [0, 2, 1, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]
    }
  ],

  SquareType: {
    WALL: 0,
    OPEN: 1,
    START: 2,
    FINISH: 3
  },

  DirectionType: {
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3
  },

  BlockColors: {
    MOVEMENT: 290,  // Roxo para movimento
    LOOPS: 120,     // Verde para loops
    LOGIC: 210      // Azul para lógica
  }
};
