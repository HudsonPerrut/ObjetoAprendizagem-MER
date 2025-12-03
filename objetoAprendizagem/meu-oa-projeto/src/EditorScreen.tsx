import { ArrowLeft, Database } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SCENARIOS } from "./TelaInicial";


export const EditorScreen = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const scenario = id ? SCENARIOS.find(s => s.id === parseInt(id)) : null;

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Cenário não encontrado</h2>
          <button onClick={() => navigate('/')} className="mt-4 text-indigo-600 hover:underline">
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              {scenario.title}
              <span className="px-2 py-0.5 rounded text-xs border border-gray-200 text-gray-500 font-normal">
                Modo Edição
              </span>
            </h2>
          </div>
        </div>
        <div className="text-sm text-gray-500 hidden md:block">
           Desafio: {scenario.difficulty}
        </div>
      </header>

      <main className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center max-w-lg">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Ambiente de Modelagem</h3>
            <p className="text-gray-600 mb-6">
              Você está editando o cenário: <strong>"{scenario.title}"</strong>.
            </p>
            <div className="bg-gray-50 p-4 rounded text-left text-sm text-gray-700 border border-gray-200 mb-6">
              <strong>Regras de Negócio:</strong><br/>
              {scenario.description}
            </div>
            <p className="text-sm text-gray-400 italic">
              (ID do Cenário na URL: {id})
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};