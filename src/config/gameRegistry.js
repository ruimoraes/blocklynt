import { gameConfig as AUTOMATO_GAME_CONFIG } from '../games/automato/config.js';
import { gameConfig as TURTLE_GAME_CONFIG } from '../games/turtle/config.js';

const enhanceGameConfig = (baseConfig, metadata) => ({
  ...baseConfig,
  ...metadata
});

export const GAMES_REGISTRY = {
  automato: enhanceGameConfig(AUTOMATO_GAME_CONFIG, {
    name: 'Autômato',
    icon: '🤖',
    description: 'Aprenda programação navegando por labirintos com blocos Blockly',
    category: 'Lógica',
    difficulty: 'Iniciante',
    estimatedTime: '15-30 min',
    concepts: [
      'Sequências',
      'Loops/Repetição', 
      'Condicionais',
      'Estruturas de controle'
    ],
    route: '/games/automato',
    component: 'AutomatoGame',
    isActive: true,
    enabled: true,
    featured: true,
    objectives: [
      'Entender sequências de comandos',
      'Usar loops para otimizar código',
      'Aplicar condicionais para tomada de decisão',
      'Resolver problemas de navegação'
    ],
    metadata: {
      totalPhases: AUTOMATO_GAME_CONFIG.fases?.length || 15,
      hasProgressTracking: true,
      supportsMultipleUsers: false,
      lastUpdated: '2025-08-03',
      version: '2.0.0'
    }
  }),
  turtle: enhanceGameConfig(TURTLE_GAME_CONFIG, {
    name: 'Tartaruga',
    icon: '🐢',
    description: 'Aprenda programação com uma tartaruga que desenha no papel',
    category: 'Lógica',
    difficulty: 'Iniciante',
    estimatedTime: '15-30 min',
    concepts: [
      'Sequências',
      'Loops/Repetição',
      'Condicionais',
      'Funções'
    ],
    route: '/games/turtle',
    component: 'TurtleGame',
    isActive: true,
    enabled: true,
    featured: true,
    objectives: [
      'Entender sequências de comandos',
      'Usar loops para otimizar código',
      'Aplicar condicionais para tomada de decisão',
      'Resolver problemas de desenho'
    ],
    metadata: {
      totalPhases: TURTLE_GAME_CONFIG.fases?.length || 15,
      hasProgressTracking: true,
      supportsMultipleUsers: false,
      lastUpdated: '2025-08-03',
      version: '2.0.0'
    }
  })
};

export const GAME_CATEGORIES = {
  'Lógica': {
    name: 'Lógica e Algoritmos',
    description: 'Jogos focados em pensamento lógico e estruturas algorítmicas',
    color: '#3498db',
    icon: '🧠'
  },
  'Variáveis': {
    name: 'Variáveis e Dados',
    description: 'Jogos que ensinam sobre armazenamento e manipulação de dados',
    color: '#e74c3c',
    icon: '📊'
  },
  'Funções': {
    name: 'Funções e Módulos',
    description: 'Jogos sobre criação e uso de funções reutilizáveis',
    color: '#2ecc71',
    icon: '⚙️'
  },
  'Eventos': {
    name: 'Eventos e Interação',
    description: 'Jogos focados em programação orientada a eventos',
    color: '#f39c12',
    icon: '🎮'
  }
};

export const DIFFICULTY_LEVELS = {
  'Iniciante': {
    name: 'Iniciante',
    description: 'Ideal para quem está começando',
    color: '#27ae60',
    level: 1
  },
  'Intermediário': {
    name: 'Intermediário', 
    description: 'Para quem já tem conhecimento básico',
    color: '#f39c12',
    level: 2
  },
  'Avançado': {
    name: 'Avançado',
    description: 'Para usuários experientes',
    color: '#e74c3c',
    level: 3
  }
};

export const gameRegistryUtils = {
  getActiveGames() {
    return Object.values(GAMES_REGISTRY).filter(game => game.isActive);
  },

  getFeaturedGames() {
    return Object.values(GAMES_REGISTRY).filter(game => game.featured && game.isActive);
  },

  getGamesByCategory(category) {
    return Object.values(GAMES_REGISTRY).filter(game => 
      game.category === category && game.isActive
    );
  },

  getGamesByDifficulty(difficulty) {
    return Object.values(GAMES_REGISTRY).filter(game => 
      game.difficulty === difficulty && game.isActive
    );
  },

  getGameById(id) {
    return GAMES_REGISTRY[id];
  },

  searchGames(query) {
    const searchTerm = query.toLowerCase();
    return Object.values(GAMES_REGISTRY).filter(game =>
      game.isActive && (
        game.name.toLowerCase().includes(searchTerm) ||
        game.description.toLowerCase().includes(searchTerm) ||
        game.concepts.some(concept => concept.toLowerCase().includes(searchTerm))
      )
    );
  },

  getCategoriesWithCounts() {
    const categories = {};
    Object.values(GAMES_REGISTRY).forEach(game => {
      if (game.isActive) {
        if (!categories[game.category]) {
          categories[game.category] = {
            ...GAME_CATEGORIES[game.category],
            games: []
          };
        }
        categories[game.category].games.push(game);
      }
    });
    return categories;
  },

  registerGame(gameConfig) {
    if (!gameConfig.id && !gameConfig.gameId) {
      throw new Error('Game must have an ID or gameId');
    }
    const id = gameConfig.gameId || gameConfig.id;
    GAMES_REGISTRY[id] = gameConfig;
  },

  unregisterGame(gameId) {
    delete GAMES_REGISTRY[gameId];
  },

  updateGame(gameId, updates) {
    if (GAMES_REGISTRY[gameId]) {
      GAMES_REGISTRY[gameId] = { ...GAMES_REGISTRY[gameId], ...updates };
    }
  }
};

export const getGameConfig = (gameId) => {
  const config = GAMES_REGISTRY[gameId];
  if (!config) {
    throw new Error(`Jogo '${gameId}' não encontrado no registry`);
  }
  return config;
};

export const getAllGames = () => {
  return Object.values(GAMES_REGISTRY);
};

export const registerGame = (gameConfig) => {
  if (!gameConfig.gameId && !gameConfig.id) {
    throw new Error('gameId ou id é obrigatório para registrar um jogo');
  }
  
  const id = gameConfig.gameId || gameConfig.id;
  GAMES_REGISTRY[id] = gameConfig;
  return gameConfig;
};

export const GAME_REGISTRY = GAMES_REGISTRY;

export default GAMES_REGISTRY;

