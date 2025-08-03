import React, { useEffect, useState } from "react";
import ConfirmacaoModal from "./ConfirmacaoModal";
import { Lock, CheckCircle, Star, X } from "lucide-react";

export default function SeletorDeFases({
  isVisible,
  onClose,
  gameConfig,
  faseAtual,
  onMudarFase,
  onResetProgresso
}) {
  const gameId = gameConfig.gameId;
  const totalFases = gameConfig.fases.length;
  const storageKey = `${gameId}-fases-concluidas`;
  const [fasesCompletadas, setFasesCompletadas] = useState([]);
  const [mostrarConfirmacaoReset, setMostrarConfirmacaoReset] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const salvo = localStorage.getItem(storageKey);
    if (salvo) {
      try {
        const fases = JSON.parse(salvo);
        setFasesCompletadas(fases);
      } catch {
        setFasesCompletadas([]);
      }
    } else {
      setFasesCompletadas([]);
    }
  }, [isVisible, storageKey]);

  const fasesLiberadas = (() => {
    if (fasesCompletadas.length === 0) return [1];
    const maxCompleta = Math.max(...fasesCompletadas);
    return Array.from(
      { length: Math.min(maxCompleta + 1, totalFases) },
      (_, i) => i + 1
    );
  })();

  const selecionarFase = (numero) => {
    if (!fasesLiberadas.includes(numero)) return;
    onMudarFase(numero);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white/95 backdrop-blur-sm border border-white/30 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white">
              <Star className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Selecionar Fase - {gameConfig.gameName || "Jogo"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: totalFases }, (_, i) => {
              const numeroFase = i + 1;
              const estaLiberada = fasesLiberadas.includes(numeroFase);
              const foiCompletada = fasesCompletadas.includes(numeroFase);
              const ehAtual = faseAtual === numeroFase;
              const dadosFase = gameConfig.fases[i];

              return (
                <div
                  key={numeroFase}
                  className={`bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl shadow-lg p-4 cursor-pointer transition-all duration-200 border-2 ${
                    ehAtual
                      ? "border-blue-400 ring-2 ring-blue-200"
                      : estaLiberada
                      ? "border-transparent hover:border-blue-300"
                      : "border-gray-200 opacity-60 cursor-not-allowed"
                  }`}
                  onClick={() => estaLiberada && selecionarFase(numeroFase)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                          foiCompletada
                            ? "bg-green-100 text-green-600"
                            : !estaLiberada
                            ? "bg-gray-100 text-gray-400"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {foiCompletada ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : !estaLiberada ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          numeroFase
                        )}
                      </div>
                    </div>
                    {ehAtual && (
                      <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-medium">
                        Atual
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-sm">
                      Fase {numeroFase}
                    </h4>
                    <h5 className="font-medium text-gray-700 text-sm">
                      {dadosFase.nome}
                    </h5>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {dadosFase.descricao}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                      {dadosFase.dificuldade}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-white/20 flex justify-center">
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition-all duration-200"
            onClick={() => setMostrarConfirmacaoReset(true)}
          >
            Resetar TODO o progresso do jogo
          </button>
        </div>

        <ConfirmacaoModal
          isVisible={mostrarConfirmacaoReset}
          onClose={() => setMostrarConfirmacaoReset(false)}
          onConfirm={() => {
            onResetProgresso();
            setMostrarConfirmacaoReset(false);
            onClose();
          }}
          titulo="Resetar progresso"
          mensagem="Tem certeza que deseja apagar TODO o progresso e blocos salvos deste jogo? Esta ação não pode ser desfeita."
        />
      </div>
    </div>
  );
}
