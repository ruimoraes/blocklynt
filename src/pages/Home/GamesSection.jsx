import React from "react";
import { GAME_CATEGORIES, DIFFICULTY_LEVELS } from '../../config/gameRegistry';

const GamesSection = ({
  filteredGames,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  handleGameSelect,
  getCategoryColor,
  getDifficultyColor
}) => (
  <section id="all-games-section" className="games-section">
    <div className="games-container">
      {/* Search and Filters */}
      {/* <div className="games-filters">
        <div className="games-filters-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Buscar jogos
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Digite o nome do jogo..."
                  className="w-full px-6 py-4 pr-12 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Categoria
              </label>
              <select
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Todas as categorias</option>
                {Object.entries(GAME_CATEGORIES).map(([key, category]) => (
                  <option key={key} value={key}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Dificuldade
              </label>
              <select
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="all">Todas as dificuldades</option>
                {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
                  <option key={key} value={key}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                  setSearchQuery('');
                }}
                className="btn-gradient py-3 px-8"
              >
                🔄 Limpar todos os filtros
              </button>
            </div>
          )}
        </div>
      </div> */}
      {/* Games Grid */}
      <div className="flex items-center justify-between mb-12">
        <h3 className="text-3xl font-bold text-gray-900">
          {searchQuery ? `Resultados para "${searchQuery}"` : 'Explore os Jogos'}
        </h3>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold">
          {filteredGames.length} {filteredGames.length === 1 ? 'jogo' : 'jogos'}
        </div>
      </div>
      {filteredGames.length > 0 ? (
        <div className="games-grid">
          {filteredGames.map((game) => (
            <div
              key={game.gameId || game.id}
              onClick={() => handleGameSelect(game)}
              className="game-card group"
            >
              <div className="game-card-content">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                      {game.icon}
                    </div>
                    <div className="flex gap-2">
                      <span
                        className="px-3 py-1 text-xs font-bold rounded-full text-white"
                        style={{ backgroundColor: getCategoryColor(game.category) }}
                      >
                        {game.category}
                      </span>
                      <span
                        className="px-3 py-1 text-xs font-bold rounded-full text-white"
                        style={{ backgroundColor: getDifficultyColor(game.difficulty) }}
                      >
                        {game.difficulty}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {game.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {game.description}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 mb-6">
                    <span>⏱️ {game.estimatedTime}</span>
                    <span>🎯 {game.ageRange}</span>
                    <span>📊 {game.metadata?.totalPhases || 0} fases</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {game.concepts.slice(0, 2).map((concept) => (
                      <span
                        key={concept}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {concept}
                      </span>
                    ))}
                    {game.concepts.length > 2 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{game.concepts.length - 2}
                      </span>
                    )}
                  </div>
                </div>
                <button className="w-full mt-auto btn-gradient py-4 px-6 transition-all duration-300 transform group-hover:scale-105">
                  Jogar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-8xl mb-8">🎮</div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Nenhum jogo encontrado
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Não encontramos jogos que correspondam aos seus critérios. 
            Que tal tentar uma busca diferente?
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedDifficulty('all');
              setSearchQuery('');
            }}
            className="btn-gradient py-4 px-8"
          >
            Ver todos os jogos
          </button>
        </div>
      )}
    </div>
  </section>
);

export default GamesSection;
