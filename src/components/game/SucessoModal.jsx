import React from 'react';
import PropTypes from 'prop-types';
import { X, Code, CheckCircle, ChevronRight } from 'lucide-react';

const SucessoModal = ({ 
  isOpen, 
  onClose, 
  onNextPhase, 
  codigoGerado, 
  canGoNext 
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleNextPhase = () => {
    onClose();
    if (onNextPhase) {
      onNextPhase();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Parabéns!
              </h2>
              <p className="text-sm text-gray-600">
                Veja o código que foi gerado
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-6 flex-1 overflow-auto">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">
                Código Gerado
              </h3>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
              <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                {typeof codigoGerado === 'string' ? codigoGerado : codigoGerado?.codigo || 'Código não disponível'}
              </pre>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                💡 O que aconteceu?
              </h4>
              <p className="text-blue-800 text-sm">
                Os blocos que você conectou foram convertidos em código JavaScript real. 
                Este é o mesmo tipo de código que os programadores usam para criar aplicações!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full font-medium transition-colors"
            >
              Fechar
            </button>
            
            {canGoNext && (
              <button
                onClick={handleNextPhase}
                className="flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 shadow-md bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 hover:from-red-600 hover:via-pink-600 hover:to-purple-700 hover:scale-105 hover:shadow-lg text-white"
              >
                <span>Próxima Fase</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

SucessoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onNextPhase: PropTypes.func,
  codigoGerado: PropTypes.string,
  canGoNext: PropTypes.bool.isRequired,
};

export default SucessoModal;
