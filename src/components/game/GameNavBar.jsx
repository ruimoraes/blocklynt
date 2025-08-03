import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logont.svg";

export default function GameNavBar({ title }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar normal - oculto em telas pequenas */}
      <nav className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 sticky top-0 z-50 border-b border-white/20 shadow-lg hidden sm:block">
        <div className="flex items-center justify-between px-4 py-1 lg:px-6 lg:py-2">
          <div className="flex items-center space-x-4">
            <div
              onClick={() => navigate("/")}
              title="Ir para Home"
              className="header-logo group cursor-pointer flex items-center space-x-2"
            >
              <img
                src={logo}
                alt="Blockly NT"
                className="h-8 w-8"
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'inline'; }}
              />
              <span className="header-logo-text text-white font-bold text-lg">Blockly NT</span>
            </div>
          </div>
          <div className="flex-1 flex justify-center"></div>
          <div className="flex items-center space-x-2">
            <h5 className="text-white font-semibold text-2xl lg:text-3xl">{title}</h5>
          </div>
        </div>
      </nav>

      {/* Botão menu flutuante - só aparece em telas pequenas */}
      <button
        className="fixed top-4 right-4 z-50 sm:hidden bg-white/80 rounded-full p-2 shadow-lg"
        aria-label="Abrir menu"
        onClick={() => setMenuOpen(true)}
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <rect x="4" y="7" width="16" height="2" rx="1" fill="#a21caf"/>
          <rect x="4" y="11" width="16" height="2" rx="1" fill="#a21caf"/>
          <rect x="4" y="15" width="16" height="2" rx="1" fill="#a21caf"/>
        </svg>
      </button>

      {/* Overlay do menu mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-red-600 bg-opacity-70  flex flex-col items-center justify-center">
          <button
            onClick={() => { setMenuOpen(false); navigate("/"); }}
            className="flex items-center space-x-2 px-6 py-3 mb-6"
          >
            <img
              src={logo}
              alt="Blockly NT"
              className="h-12 w-12"
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'inline'; }}
            />
            <span className="header-logo-text text-purple-700 font-bold text-lg">Voltar para Home</span>
          </button>
          <h5 className="text-white font-semibold text-3xl">{title}</h5>
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl"
            aria-label="Fechar menu"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}