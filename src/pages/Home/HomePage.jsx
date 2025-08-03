import React, { useState, useMemo } from 'react';
import Hero from './Hero';
import GamesSection from './GamesSection';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { gameRegistryUtils, GAME_CATEGORIES, DIFFICULTY_LEVELS } from '../../config/gameRegistry';
import './HomePage.css';

const Home = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Obter jogos filtrados
  const filteredGames = useMemo(() => {
    let games = gameRegistryUtils.getActiveGames();

    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      games = games.filter(game => game.category === selectedCategory);
    }

    // Filtrar por dificuldade
    if (selectedDifficulty !== 'all') {
      games = games.filter(game => game.difficulty === selectedDifficulty);
    }

    // Filtrar por busca
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      games = games.filter(game =>
        game.name.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query) ||
        game.concepts.some(concept => concept.toLowerCase().includes(query))
      );
    }

    return games;
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const featuredGames = gameRegistryUtils.getFeaturedGames();
  const categoriesWithCounts = gameRegistryUtils.getCategoriesWithCounts();

  // Carrossel functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredGames.length) % featuredGames.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play do carrossel

  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  // Função para obter slides visíveis baseado no tamanho da tela
  const getSlidesPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 768) return 2;  // md
      return 1; // sm
    }
    return 1;
  };

  const getDifficultyColor = (difficulty) => {
    return DIFFICULTY_LEVELS[difficulty]?.color || '#6c757d';
  };  

  const getCategoryColor = (category) => {
    return GAME_CATEGORIES[category]?.color || '#6c757d';
  };  

  const handleGameSelect = (game) => {
    if (game.route) {
      navigate(game.route);
    } else {
      // Fallback para jogos sem rota específica
      navigate(`/games/${game.gameId || game.id}`);
    }
  };  

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

  React.useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section - Tela Completa */}
      <Hero />
      {/* <Featured
        featuredGames={featuredGames}
        currentSlide={currentSlide}
        slidesPerView={slidesPerView}
        handleGameSelect={handleGameSelect}
        getCategoryColor={getCategoryColor}
        getDifficultyColor={getDifficultyColor}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        goToSlide={goToSlide}
      /> */}
      <GamesSection
        filteredGames={filteredGames}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        handleGameSelect={handleGameSelect}
        getCategoryColor={getCategoryColor}
        getDifficultyColor={getDifficultyColor}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
