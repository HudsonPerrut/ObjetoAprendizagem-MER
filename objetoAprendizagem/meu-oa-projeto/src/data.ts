// src/data.ts
import { BookOpen, ShoppingCart, Share2 } from 'lucide-react';

export const challenges = [
  {
    id: 1,
    title: 'Sistema de Biblioteca',
    difficulty: 'Fácil',
    description: 'Modele um sistema simples para gerenciar empréstimos de livros, autores e alunos. Considere que um aluno pode pegar vários livros e um livro pode ter vários autores.',
    icon: BookOpen, // Note: Passamos a referência do componente, não o JSX <Icon />
    difficultyClass: 'easy'
  },
  {
    id: 2,
    title: 'E-commerce Básico',
    difficulty: 'Médio',
    description: 'Crie um diagrama para produtos, categorias, clientes e pedidos. Um pedido deve conter múltiplos itens, e cada item deve registrar o preço histórico do produto no momento da compra.',
    icon: ShoppingCart,
    difficultyClass: 'medium'
  },
  {
    id: 3,
    title: 'Rede Social',
    difficulty: 'Difícil',
    description: 'Desafio complexo envolvendo usuários, amizades (auto-relacionamento), postagens, comentários e likes. O sistema deve permitir saber quem curtiu o que e quando.',
    icon: Share2,
    difficultyClass: 'hard'
  }
];