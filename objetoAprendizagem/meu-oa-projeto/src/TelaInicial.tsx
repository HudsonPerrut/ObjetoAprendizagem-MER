import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Database, Book, ShoppingCart, GraduationCap, ChevronRight, ArrowLeft, Play } from 'lucide-react';

export const SCENARIOS = [
  {
    id: 1,
    title: 'Sistema de Biblioteca',
    description: 'Modele um sistema para gerenciar empréstimos de livros. Um leitor pode pegar vários livros, e um livro pode ter vários exemplares.',
    difficulty: 'Fácil',
    icon: <Book className="w-8 h-8 text-blue-500" />,
    color: 'bg-blue-50 border-blue-200'
  },
  {
    id: 2,
    title: 'E-commerce Simples',
    description: 'Crie o esquema para uma loja virtual. Clientes fazem pedidos, pedidos contêm produtos. Não esqueça do controle de estoque.',
    difficulty: 'Médio',
    icon: <ShoppingCart className="w-8 h-8 text-purple-500" />,
    color: 'bg-purple-50 border-purple-200'
  },
  {
    id: 3,
    title: 'Gestão Escolar',
    description: 'Um desafio completo: Alunos, Professores, Disciplinas e Turmas. Um professor pode dar várias disciplinas, mas uma turma tem uma sala fixa.',
    difficulty: 'Difícil',
    icon: <GraduationCap className="w-8 h-8 text-orange-500" />,
    color: 'bg-orange-50 border-orange-200'
  }
];

const ProblemCard = ({ scenario, onStart }) => {
  return (
    <div className={`min-w-[300px] md:min-w-[350px] p-6 rounded-2xl border-2 transition-transform hover:scale-105 hover:shadow-xl flex flex-col justify-between snap-center ${scenario.color} bg-white shadow-sm`}>
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
            {scenario.icon}
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
            ${scenario.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' : 
              scenario.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-700' : 
              'bg-red-100 text-red-700'}`}>
            {scenario.difficulty}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">{scenario.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {scenario.description}
        </p>
      </div>

      <button 
        onClick={() => onStart(scenario.id)}
        className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors group"
      >
        <Play size={16} className="fill-current" />
        Iniciar Desafio
        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export const TelaInicial = () => {
  const navigate = useNavigate();

  const handleStartScenario = (id) => {
    navigate(`/editor/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center p-4 md:p-8">
      
      <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
        <div className="inline-flex items-center justify-center p-4 mb-6 bg-white rounded-full shadow-lg">
          <Database className="w-10 h-10 text-indigo-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          O Construtor de Esquemas
        </h1>
        <p className="text-lg text-gray-600">
          Escolha um cenário do mundo real abaixo e comece a construir seu diagrama entidade-relacionamento.
        </p>
      </div>

      <div className="w-full max-w-6xl">
        <div className="flex gap-6 overflow-x-auto pb-12 pt-4 px-4 snap-x snap-mandatory scrollbar-hide justify-start md:justify-center">
          {SCENARIOS.map((scenario) => (
            <ProblemCard 
              key={scenario.id} 
              scenario={scenario} 
              onStart={handleStartScenario} 
            />
          ))}
        </div>
      </div>

      <footer className="mt-auto text-gray-400 text-sm">
        Objeto de Aprendizagem - Modelagem de Banco de Dados
      </footer>
    </div>
  );
};



