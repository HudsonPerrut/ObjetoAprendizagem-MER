import { useCallback, useMemo, useState } from 'react'; // Adicionei useMemo
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap,
  useNodesState, 
  useEdgesState, 
  addEdge,
  type Connection,
  type Node, // Importando tipo Node
  MarkerType,
  ConnectionLineType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ArrowLeft, AlertCircle, PlusCircle, Send, Check } from 'lucide-react'; // Importei PlusCircle
import { challenges } from './data';
import TableNodeComponent, { type TableNode } from './TableNode';
import './Editor.css';
import EditModal from './EditModal';

const initialEdges: any[] = [];
const initialNodes: Node[] = []; // Começando vazio para o usuário criar

const defaultEdgeOptions = {
    type: 'smoothstep', // Define linhas com ângulos retos (melhor para diagramas)
    markerEnd: {
      type: MarkerType.ArrowClosed, // Seta fechada na ponta final
      width: 20,
      height: 20,
      color: '#64748b', // Cor cinza chumbo
    },
    style: {
      strokeWidth: 2, // Linha mais grossa
      stroke: '#64748b',
    },
    animated: false, // Diagramas de banco geralmente são estáticos
  };

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const challenge = challenges.find(c => c.id === Number(id));

  const [isSending, setIsSending] = useState(false);

  // 1. REGISTRAR O NÓ PERSONALIZADO
  // O useMemo é importante para performance, evita recriar o objeto a cada render
  const nodeTypes = useMemo(() => ({ table: TableNodeComponent }), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNode, setEditingNode] = useState<TableNode | null>(null);

  const onNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
    // Verificamos se é um nó do tipo 'table' para abrir a edição
    if (node.type === 'table') {
      setEditingNode(node as TableNode);
      setIsModalOpen(true);
    }
  }, []);

  const handleSendEmail = () => {
    // Pergunta de confirmação
    const confirmacao = window.confirm(
      `Você tem certeza que deseja finalizar e enviar o diagrama do desafio "${challenge?.title}" para o professor?`
    );

    if (confirmacao) {
      setIsSending(true); // Ativa o estado de carregamento

      // Simula uma demora de 2 segundos (como se estivesse enviando pela internet)
      setTimeout(() => {
        setIsSending(false);
        alert("✅ Sucesso!\n\nO diagrama foi enviado para o email do professor (professor@faculdade.fake) com sucesso.");
        // Opcional: Navegar de volta para o início após enviar
        // navigate('/'); 
      }, 2000);
    }
  };

  const handleSaveNode = (newLabel: string, newColumns: string[]) => {
    if (!editingNode) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === editingNode.id) {
          // Retorna o nó atualizado (preservando posição e id)
          return {
            ...node,
            data: {
              ...node.data,
              label: newLabel,
              columns: newColumns,
            },
          };
        }
        return node;
      })
    );
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // 2. FUNÇÃO PARA ADICIONAR NOVA TABELA
  const addTable = () => {
    const newNode: TableNode = {
      id: Date.now().toString(), // ID único baseado no tempo
      type: 'table', // IMPORTANTE: Tem que bater com a chave do nodeTypes
      position: { 
        x: Math.random() * 300, // Posição aleatória para não empilhar
        y: Math.random() * 300 
      },
      data: { 
        label: 'Nova Tabela', 
        columns: ['id (PK)'] // Coluna padrão inicial
      },
    };
    
    // Adiciona o novo nó ao array existente
    setNodes((nds) => [...nds, newNode]);
  };

  if (!challenge) return null;

  return (
    <div className="editor-container">
      
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <button onClick={() => navigate('/')} className="btn-back">
            <ArrowLeft size={16} /> Voltar
          </button>
          <h2 style={{ margin: 0 }}>{challenge.title}</h2>
        </div>

        <div className="sidebar-content">
          {/* Botão de Adicionar Tabela */}
          <button 
            onClick={addTable}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '2rem',
              boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)'
            }}
          >
            <PlusCircle size={20} />
            Adicionar Tabela
          </button>

          <span className={`difficulty-tag ${challenge.difficultyClass}`}>
            Nível: {challenge.difficulty}
          </span>
          
          <h3>Descrição:</h3>
          <p style={{ lineHeight: '1.6', color: '#475569', fontSize: '0.9rem' }}>
            {challenge.description}
          </p>

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#e0f2fe', borderRadius: '8px', border: '1px solid #bae6fd' }}>
             <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', gap: '8px', color: '#0369a1' }}>
              <AlertCircle size={16} /> Dica:
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#075985', margin: 0 }}>
              Use o botão acima para criar tabelas e arraste as bolinhas azuis para criar relacionamentos.
            </p>
          </div>
          <div style={{ marginTop: '2rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
            <button 
              onClick={handleSendEmail}
              disabled={isSending} // Desabilita o botão enquanto envia
              className={`btn-send-email ${isSending ? 'sending' : ''}`}
            >
              {isSending ? (
                <>Enviando...</>
              ) : (
                <>
                  <Send size={18} /> Enviar para Professor
                </>
              )}
            </button>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', marginTop: '0.5rem' }}>
              Isso enviará a versão final para avaliação.
            </p>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="canvas-area">
        <div style={{ width: '100%', height: '100%' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes} // 3. PASSAR OS TIPOS AQUI
            onNodeDoubleClick={onNodeDoubleClick}
            fitView
            defaultEdgeOptions={defaultEdgeOptions} 
            connectionLineType={ConnectionLineType.SmoothStep}
          >
            <Background gap={12} size={1} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>

      {editingNode && (
        <EditModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveNode}
          initialData={editingNode.data}
        />
      )}

    </div>
  );
}