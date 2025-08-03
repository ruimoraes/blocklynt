import React from "react";
import { useNavigate } from 'react-router-dom';

import logoBlockly from './assets/logo_blockly.png';
import imgHome from './assets/img_home.png';
import puzzleRed from './assets/puzzle_red.png';
import puzzleBlue from './assets/puzzle_blue.png';
import codeImg from './assets/code.png';
import starship from './assets/starship.png';
import idea from './assets/idea.png';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Texto à esquerda */}
        <div className="hero-text">
          <div className="hero-logo">
            <img src={logoBlockly} alt="Logo Blockly NT" />
          </div>
          <div className="mb-8">
            <h1 className="hero-title">
              Aprenda
              <br />
              <span className="hero-title-programming">Programação</span>
              <br />
              brincando com
              <br />
              <span className="hero-title-blocks">Blocos</span>
            </h1>
            <p className="hero-description">
              Descubra o mundo da programação através de jogos educativos e interativos.
              Desenvolva habilidades lógicas enquanto se diverte!
            </p>
            <div className="hero-buttons">
              <button
                onClick={() => {
                  const el = document.getElementById('all-games-section');
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 24;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className="hero-button-primary"
              >
                Explorar Jogos
              </button>
              <button className="hero-button-secondary"
                onClick={() => alert('🚧')}
              >
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
        <div className="hero-image-container">
          <div className="hero-image-wrapper">
            <div className="absolute inset-0 z-0 pointer-events-none" />
            <img src={imgHome} alt="Ilustração Blockly NT" className="hero-image" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="floating-element floating-element-1">
          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <img src={puzzleRed} alt="Float 1" style={{ width: '70%', height: '70%', background: 'transparent', opacity: 0.7 }} />
          </div>
        </div>
        <div className="floating-element floating-element-2">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <img src={codeImg} alt="Float 2" style={{ width: '70%', height: '70%', background: 'transparent', opacity: 0.7 }} />
          </div>
        </div>
        <div className="floating-element floating-element-3">
          <div className="w-24 h-24 bg-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <img src={starship} alt="Float 3" style={{ width: '60%', height: '60%', background: 'transparent', opacity: 0.7 }} />
          </div>
        </div>
        <div className="floating-element floating-element-4">
          <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <img src={puzzleBlue} alt="Float 4" style={{ width: '70%', height: '70%', background: 'transparent', opacity: 0.7 }} />
          </div>
        </div>
        <div className="floating-element floating-element-5">
          <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <img src={idea} alt="Float 5" style={{ width: '70%', height: '70%', background: 'transparent', opacity: 0.7 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
