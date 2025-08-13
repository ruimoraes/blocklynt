export const gameConfig = {
  gameId: 'semaforo',
  gameName: "Semáforo Pedestre",
  descricao: "Controle o semáforo de carros e pedestres programando os blocos.",
  fases: [
    {
      id: 1,
      nome: 'Controle básico do semáforo de carros',
      descricao: 'Programe o semáforo dos carros para alternar entre verde, amarelo e vermelho com espera.',
      allowedBlocks: ['mudar_semaforo', 'aguardar_segundos'],
      solutionCode:
        "mudarSemaforo('green');\n" +
        "aguardarSegundos(5);\n" +
        "mudarSemaforo('yellow');\n" +
        "aguardarSegundos(2);\n" +
        "mudarSemaforo('red');\n" +
        "aguardarSegundos(5);\n",
    },
    {
      id: 2,
      nome: 'Botão do pedestre e semáforo de pedestre',
      descricao: 'Adicione o controle do semáforo de pedestres e o evento de botão pressionado.',
      allowedBlocks: [
        'mudar_semaforo',
        'mudar_semaforo_pedestre',
        'aguardar_segundos',
        'quando_botao_pedestre_pressionado',
        'definir_botaoPressionado',
      ],
      solutionCode:
        "mudarSemaforo('green');\n" +
        "mudarSemaforoPedestre('red');\n" +
        "aguardarSegundos(5);\n" +
        "quandoBotaoPedestrePressionado(() => {\n" +
        "  definir_botaoPressionado('true');\n" +
        "});\n",
    },
    {
      id: 3,
      nome: 'Reação ao botão: semáforo de carros e pedestres',
      descricao: 'Quando o botão do pedestre for pressionado, o semáforo de carros fica vermelho e o de pedestres fica verde.',
      allowedBlocks: [
        'mudar_semaforo',
        'mudar_semaforo_pedestre',
        'aguardar_segundos',
        'quando_botao_pedestre_pressionado',
        'controle_se',
        'definir_botaoPressionado',
      ],
      solutionCode:
        "mudarSemaforo('green');\n" +
        "mudarSemaforoPedestre('red');\n" +
        "aguardarSegundos(5);\n" +
        "quandoBotaoPedestrePressionado(() => {\n" +
        "  definir_botaoPressionado('true');\n" +
        "});\n" +
        "se (botaoPressionado == verdadeiro) então {\n" +
        "  mudarSemaforo('red');\n" +
        "  mudarSemaforoPedestre('green');\n" +
        "  aguardarSegundos(5);\n" +
        "  definir_botaoPressionado('false');\n" +
        "}\n",
    }
  ],
};
