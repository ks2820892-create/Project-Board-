import React from 'react';

export default function TaskCard({ card, onDelete, onDragStart }) {
  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, card._id)}
    >
      <div className="task-card-header">
        <span className="task-card-title">{card.title}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card._id);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
          title="Delete task"
        >
          ✕
        </button>
      </div>

      {card.description && (
        <p className="task-card-desc">{card.description}</p>
      )}

      <div className="task-card-footer">
        <span className={`badge-priority priority-${card.priority || 'Medium'}`}>
          {card.priority || 'Medium'}
        </span>
        <span className="card-assignee">
          {card.assignedTo ? `👤 ${card.assignedTo}` : ''}
          {card.dueDate ? ` 📅 ${card.dueDate}` : ''}
        </span>
      </div>
    </div>
  );
}
