import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TelaInicial  } from './TelaInicial';    
import { EditorScreen } from './EditorScreen';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/editor/:id" element={<EditorScreen />} />
      </Routes>
    </Router>
  );
}
