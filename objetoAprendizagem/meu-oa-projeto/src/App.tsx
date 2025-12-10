import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Database, ArrowRight } from 'lucide-react';
import { challenges } from './data'; // Importa os dados centralizados
import Editor from './Editor'; // Importa a nova tela
import './App.css';

// Componente da Tela Inicial (O que fizemos antes)
function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="header">
        <div className="icon-wrapper">
          <Database color="white" size={32} />
        </div>
        <h1 className="title">Pratique Modelagem de Dados</h1>
        <p className="subtitle">
          Selecione um nível de dificuldade abaixo para começar.
        </p>
      </div>

      <div className="cards-grid">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="card">
            <div className="card-header">
              <div className={`card-icon ${challenge.difficultyClass}`}>
                {/* Como salvamos a referência do ícone, renderizamos como componente aqui: */}
                <challenge.icon size={24} />
              </div>
              <span className={`badge ${challenge.difficultyClass}`}>
                {challenge.difficulty}
              </span>
            </div>
            <h3>{challenge.title}</h3>
            <p>{challenge.description}</p>
            <button 
              className="btn-start"
              onClick={() => navigate(`/editor/${challenge.id}`)} // Navega para a rota do editor
            >
              Iniciar Desafio
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Configuração Principal das Rotas
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:id" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;