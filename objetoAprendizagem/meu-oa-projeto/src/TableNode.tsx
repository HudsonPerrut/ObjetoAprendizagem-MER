import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';

// 1. Definimos o formato dos DADOS (o que vai dentro de 'data')
export type TableNodeData = {
  label: string;
  columns?: string[];
};

// 2. Definimos o tipo do NÓ COMPLETO
// Node<TipoDosDados, 'tipo-do-no'>
export type TableNode = Node<TableNodeData, 'table'>;

// 3. O Componente recebe as props tipadas corretamente
export default function TableNodeComponent({ data }: NodeProps<TableNode>) {
  return (
    <div className="table-node-container">
      <Handle type="target" position={Position.Left} className="handle-dot" />
      
      <div className="table-node-header">
        <strong>{data.label}</strong>
      </div>

      <div className="table-node-body">
        {data.columns && data.columns.length > 0 ? (
          data.columns.map((col, index) => (
            <div key={index} className="table-column-row">
              {col}
            </div>
          ))
        ) : (
          <div className="table-column-placeholder">
            + Adicionar Coluna
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="handle-dot" />
    </div>
  );
}