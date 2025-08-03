import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="text-lg font-bold mb-4">Recursos</h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <button
                onClick={() => alert('🚧')}
                className="hover:text-white transition-colors duration-300"
              >
                Tutoriais
                </button>
            </li>
            <li>
              <button
                onClick={() => alert('🚧')}
                className="hover:text-white transition-colors duration-300"
              >
                Documentação
              </button>
              </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Suporte</h4>
          <ul className="space-y-2 text-gray-300">
            <li>  <button
    onClick={() => alert('🚧')}
    className="hover:text-white transition-colors duration-300 bg-transparent border-none p-0 m-0 cursor-pointer"
    style={{ background: 'none' }}
  >
    Saiba Mais
  </button></li>
            <li><a href="https://www.nucleodetecnologia.com.br/" target="_blank" className="hover:text-white transition-colors duration-300">Quem Somos</a></li>              
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 pt-8 text-center">
        <p className="text-gray-400 text-sm">
          © 2025 Blockly NT. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
