export const gameConfig = {
  gameId: 'turtle',
  gameName: "Tartaruga",
  descricao: "Aprenda a programar criando desenhos incríveis com a Tartaruga!",
  fases: [
    {
      id: 1,
      nome: 'O Quadrado',
      descricao: 'Desenhe um quadrado.',
      allowedBlocks: ['turtle_move_internal', 'turtle_turn_internal', 'turtle_repeat_internal'],
      solutionCode:
        'var count = 0;\n' +
        'while (count < 4) {\n' +
        '  move(100);\n' +
        '  turn(90);\n' +
        '  count = count + 1;\n' +
        '}\n'
    },
    {
      id: 2,
      nome: 'O Pentágono',
      descricao: 'Desenhe um pentágono.',
      allowedBlocks: ['turtle_move_internal', 'turtle_turn_internal', 'turtle_repeat_internal'],
      solutionCode:
        'for (var count = 0; count < 5; count++) {\n' +
        '  move(100);\n' +
        '  turn(72);\n' +
        '}\n'
    },
    {
      id: 3,
      nome: 'A Estrela',
      descricao: 'Desenhe uma estrela amarela.',
      allowedBlocks: ['turtle_move_internal', 'turtle_turn_internal', 'turtle_repeat_internal', 'turtle_colour_internal'],
      solutionCode:
        'function drawStar(length) {\n' +
        '  for (var count = 0; count < 5; count++) {\n' +
        '    move(length);\n' +
        '    turn(144);\n' +
        '  }\n' +
        '}\n' +
        'penColour("#ffff00");\n' +
        'drawStar(100);\n'
    },
    {
      id: 4,
      nome: 'Estrela e Linha',
      descricao: 'Desenhe uma estrela e depois uma linha ao lado.',
      allowedBlocks: ['turtle_move_internal', 'turtle_turn_internal', 'turtle_repeat_internal', 'turtle_pen', 'turtle_colour_internal'],
      solutionCode:
        'function drawStar(length) {\n' +
        '  for (var count = 0; count < 5; count++) {\n' +
        '    move(length);\n' +
        '    turn(144);\n' +
        '  }\n' +
        '}\n' +
        'penColour("#ffff00");\n' +
        'drawStar(50);\n' +
        'penDown(false);\n' +
        'move(150);\n' +
        'penDown(true);\n' +
        'move(20);\n'
    },
    {
      id: 5,
      nome: 'Quatro Estrelas',
      descricao: 'Desenhe quatro estrelas em um padrão circular.',
      allowedBlocks: ['turtle_move_internal', 'turtle_turn_internal', 'turtle_repeat_internal', 'turtle_pen', 'turtle_colour_internal'],
      solutionCode:
        'function drawStar(length) {\n' +
        '  for (var count = 0; count < 5; count++) {\n' +
        '    move(length);\n' +
        '    turn(144);\n' +
        '  }\n' +
        '}\n' +
        'penColour("#ffff00");\n' +
        'for (var count = 0; count < 4; count++) {\n' +
        '  drawStar(50);\n' +
        '  penDown(false);\n' +
        '  move(150);\n' +
        '  turn(90);\n' +
        '  penDown(true);\n' +
        '}\n'
    },
    {
      id: 6,
      nome: 'Três Estrelas e uma Linha',
      descricao: 'Desenhe três estrelas e uma linha branca.',
      allowedBlocks: ['turtle_move_internal', 'turtle_turn_internal', 'turtle_repeat_internal', 'turtle_pen', 'turtle_colour_internal'],
      solutionCode:
        'function drawStar(length) {\n' +
        '  for (var count = 0; count < 5; count++) {\n' +
        '    move(length);\n' +
        '    turn(144);\n' +
        '  }\n' +
        '}\n' +
        'penColour("#ffff00");\n' +
        'for (var count = 0; count < 3; count++) {\n' +
        '  drawStar(50);\n' +
        '  penDown(false);\n' +
        '  move(150);\n' +
        '  turn(120);\n' +
        '  penDown(true);\n' +
        '}\n' +
        'penDown(false);\n' +
        'turn(-90);\n' +
        'move(100);\n' +
        'penDown(true);\n' +
        'penColour("#ffffff");\n' +
        'move(50);\n'
    },
    {
      id: 7,
      nome: 'Três Estrelas e Raios',
      descricao: 'Desenhe três estrelas e quatro raios brancos.',
      allowedBlocks: ['turtle_move_internal', 'turtle_turn_internal', 'turtle_repeat_internal', 'turtle_pen', 'turtle_colour_internal'],
      solutionCode:
        'function drawStar(length) {\n' +
        '  for (var count = 0; count < 5; count++) {\n' +
        '    move(length);\n' +
        '    turn(144);\n' +
        '  }\n' +
        '}\n' +
        'penColour("#ffff00");\n' +
        'for (var count = 0; count < 3; count++) {\n' +
        '  drawStar(50);\n' +
        '  penDown(false);\n' +
        '  move(150);\n' +
        '  turn(120);\n' +
        '  penDown(true);\n' +
        '}\n' +
        'penDown(false);\n' +
        'turn(-90);\n' +
        'move(100);\n' +
        'penDown(true);\n' +
        'penColour("#ffffff");\n' +
        'for (var count2 = 0; count2 < 4; count2++) {\n' +
        '  move(50);\n' +
        '  move(-50);\n' +
        '  turn(45);\n' +
        '}\n'
    },
    {
      id: 8,
      nome: 'Três Estrelas e um Círculo',
      descricao: 'Desenhe três estrelas e um círculo branco.',
      allowedBlocks: ['turtle_move_internal', 'turtle_turn_internal', 'turtle_repeat_internal', 'turtle_pen', 'turtle_colour_internal'],
      solutionCode:
        'function drawStar(length) {\n' +
        '  for (var count = 0; count < 5; count++) {\n' +
        '    move(length);\n' +
        '    turn(144);\n' +
        '  }\n' +
        '}\n' +
        'penColour("#ffff00");\n' +
        'for (var count = 0; count < 3; count++) {\n' +
        '  drawStar(50);\n' +
        '  penDown(false);\n' +
        '  move(150);\n' +
        '  turn(120);\n' +
        '  penDown(true);\n' +
        '}\n' +
        'penDown(false);\n' +
        'turn(-90);\n' +
        'move(100);\n' +
        'penDown(true);\n' +
        'penColour("#ffffff");\n' +
        'for (var count2 = 0; count2 < 360; count2++) {\n' +
        '  move(50);\n' +
        '  move(-50);\n' +
        '  turn(1);\n' +
        '}\n'
    },
    {
      id: 9,
      nome: 'Lua Crescente',
      descricao: 'Desenhe três estrelas e uma lua crescente.',
      allowedBlocks: ['turtle_move_internal', 'turtle_turn_internal', 'turtle_repeat_internal', 'turtle_pen', 'turtle_colour_internal'],
      solutionCode:
        'function drawStar(length) {\n' +
        '  for (var count = 0; count < 5; count++) {\n' +
        '    move(length);\n' +
        '    turn(144);\n' +
        '  }\n' +
        '}\n' +
        'penColour("#ffff00");\n' +
        'for (var count = 0; count < 3; count++) {\n' +
        '  drawStar(50);\n' +
        '  penDown(false);\n' +
        '  move(150);\n' +
        '  turn(120);\n' +
        '  penDown(true);\n' +
        '}\n' +
        'penDown(false);\n' +
        'turn(-90);\n' +
        'move(100);\n' +
        'penDown(true);\n' +
        'penColour("#ffffff");\n' +
        'for (var count2 = 0; count2 < 360; count2++) {\n' +
        '  move(50);\n' +
        '  move(-50);\n' +
        '  turn(1);\n' +
        '}\n' +
        'turn(120);\n' +
        'move(20);\n' +
        'penColour("#000000");\n' +
        'for (var count3 = 0; count3 < 360; count3++) {\n' +
        '  move(50);\n' +
        '  move(-50);\n' +
        '  turn(1);\n' +
        '}\n'
    }
  ]
};
