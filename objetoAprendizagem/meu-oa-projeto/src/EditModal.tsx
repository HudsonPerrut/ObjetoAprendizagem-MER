import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';
import type { TableNodeData } from './TableNode'; // Importando o tipo que definimos antes
 // Importando o tipo que definimos antes

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (label: string, columns: string[]) => void;
  initialData: TableNodeData;
}

export default function EditModal({ isOpen, onClose, onSave, initialData }: EditModalProps) {
  const [label, setLabel] = useState('');
  const [columns, setColumns] = useState<string[]>([]);
  const [newCol, setNewCol] = useState('');

  // Carrega os dados da tabela quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setLabel(initialData.label);
      setColumns(initialData.columns || []);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleAddColumn = () => {
    if (newCol.trim()) {
      setColumns([...columns, newCol]);
      setNewCol('');
    }
  };

  const handleRemoveColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(label, columns);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Editar Tabela</h3>
          <button onClick={onClose} className="btn-icon"><X size={20}/></button>
        </div>

        <div className="modal-body">
          {/* Nome da Tabela */}
          <div className="form-group">
            <label>Nome da Tabela:</label>
            <input 
              type="text" 
              value={label} 
              onChange={(e) => setLabel(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Lista de Colunas */}
          <div className="form-group">
            <label>Colunas:</label>
            <div className="columns-list">
              {columns.map((col, idx) => (
                <div key={idx} className="column-item">
                  <span>{col}</span>
                  <button onClick={() => handleRemoveColumn(idx)} className="btn-delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Adicionar Nova Coluna */}
            <div className="add-column-box">
              <input 
                type="text" 
                placeholder="Ex: nome varchar(50)"
                value={newCol}
                onChange={(e) => setNewCol(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddColumn()}
                className="input-field"
              />
              <button onClick={handleAddColumn} className="btn-add">
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-cancel">Cancelar</button>
          <button onClick={handleSave} className="btn-save">
            <Save size={16} /> Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}