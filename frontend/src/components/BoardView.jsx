import React, { useState } from 'react';
import TaskCard from './TaskCard';

export default function BoardView({ board, cards, onMoveCard, onDeleteCard, onOpenTaskModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [dragOverCol, setDragOverCol] = useState(null);

  const columns = board?.columns || ['To Do', 'In Progress', 'In Review', 'Done'];

  // Filter cards by search and priority
  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (card.description && card.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (card.assignedTo && card.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPriority = selectedPriority === 'All' || card.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  // Drag and Drop handlers
  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData('text/plain', cardId);
  };

  const handleDragOver = (e, column) => {
    e.preventDefault();
    setDragOverCol(column);
  };

  const handleDragLeave = () => {
    setDragOverCol(null);
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    setDragOverCol(null);
    const cardId = e.dataTransfer.getData('text/plain');
    if (cardId) {
      onMoveCard(cardId, targetColumn);
    }
  };

  return (
    <div>
      <div className="board-header">
        <div className="board-info">
          <h1>{board?.title || 'Main Project Board'}</h1>
          <p>{board?.description || 'Manage tasks, track progress, and organize sprint deliverables'}</p>
        </div>

        <div className="controls-row">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="search-input"
            style={{ width: '130px' }}
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <option value="All">All Priority</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button className="btn btn-primary" onClick={onOpenTaskModal}>
            + Add Task
          </button>
        </div>
      </div>

      <div className="board-grid">
        {columns.map((column) => {
          const columnCards = filteredCards.filter((c) => c.status === column);
          const isOver = dragOverCol === column;

          return (
            <div
              key={column}
              className="column"
              onDragOver={(e) => handleDragOver(e, column)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column)}
            >
              <div className="column-header">
                <span className="column-title">
                  {column}
                  <span className="badge-count">{columnCards.length}</span>
                </span>
                <button
                  onClick={onOpenTaskModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '1.1rem'
                  }}
                  title="Add card to column"
                >
                  +
                </button>
              </div>

              <div className={`card-list ${isOver ? 'drag-over' : ''}`}>
                {columnCards.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    No tasks in this column
                  </div>
                ) : (
                  columnCards.map((card) => (
                    <TaskCard
                      key={card._id}
                      card={card}
                      onDelete={onDeleteCard}
                      onDragStart={handleDragStart}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
