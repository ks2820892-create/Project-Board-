import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BoardView from './components/BoardView';
import TaskModal from './components/TaskModal';
import AuthModal from './components/AuthModal';
import { api } from './services/api';

const DEFAULT_BOARD = {
  _id: 'default-board-1',
  title: 'Project Roadmap & Tasks',
  description: 'Team task tracker built with React & Node.js (5-Day MVP)',
  columns: ['To Do', 'In Progress', 'In Review', 'Done']
};

const INITIAL_CARDS = [
  {
    _id: 'c-1',
    boardId: 'default-board-1',
    title: 'Design Database Schemas',
    description: 'Create Mongoose models for User, Board, and Task cards.',
    status: 'Done',
    priority: 'High',
    assignedTo: 'Krishna',
    dueDate: '2026-11-18'
  },
  {
    _id: 'c-2',
    boardId: 'default-board-1',
    title: 'Implement Authentication API',
    description: 'Add JWT register and login endpoints with password hashing.',
    status: 'Done',
    priority: 'Urgent',
    assignedTo: 'Krishna',
    dueDate: '2026-11-19'
  },
  {
    _id: 'c-3',
    boardId: 'default-board-1',
    title: 'Build Drag & Drop Kanban UI',
    description: 'HTML5 native drag & drop with column status updates.',
    status: 'In Progress',
    priority: 'Urgent',
    assignedTo: 'Krishna',
    dueDate: '2026-11-20'
  },
  {
    _id: 'c-4',
    boardId: 'default-board-1',
    title: 'Deploy on Vercel & Render',
    description: 'Deploy frontend on Vercel and backend server on Render.',
    status: 'To Do',
    priority: 'Medium',
    assignedTo: 'Krishna',
    dueDate: '2026-11-21'
  }
];

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : { id: 'demo', name: 'Krishna' };
  });

  const [board, setBoard] = useState(DEFAULT_BOARD);
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('project_cards');
    return saved ? JSON.parse(saved) : INITIAL_CARDS;
  });

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync cards with backend if available
  useEffect(() => {
    async function loadBackendData() {
      try {
        const res = await api.getBoards();
        if (res.boards && res.boards.length > 0) {
          const firstBoard = res.boards[0];
          setBoard(firstBoard);
          const boardDetails = await api.getBoardById(firstBoard._id);
          if (boardDetails.cards) {
            setCards(boardDetails.cards);
          }
        }
      } catch (e) {
        console.log('Using local client state.');
      }
    }
    loadBackendData();
  }, []);

  // Persist cards locally
  useEffect(() => {
    localStorage.setItem('project_cards', JSON.stringify(cards));
  }, [cards]);

  // Card Actions
  const handleCreateTask = async (taskData) => {
    const newCard = {
      _id: 'c-' + Date.now(),
      boardId: board._id,
      ...taskData
    };

    setCards((prev) => [...prev, newCard]);

    // Try backend sync
    try {
      await api.createCard({ ...taskData, boardId: board._id });
    } catch (e) {
      console.log('Saved to local store.');
    }
  };

  const handleMoveCard = async (cardId, newStatus) => {
    setCards((prev) =>
      prev.map((c) => (c._id === cardId ? { ...c, status: newStatus } : c))
    );

    // Try backend sync
    try {
      await api.updateCardStatus(cardId, newStatus);
    } catch (e) {
      console.log('Status updated in local store.');
    }
  };

  const handleDeleteCard = async (cardId) => {
    setCards((prev) => prev.filter((c) => c._id !== cardId));

    // Try backend sync
    try {
      await api.deleteCard(cardId);
    } catch (e) {
      console.log('Deleted from local store.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleNewBoard = () => {
    const title = prompt('Enter new board title:');
    if (title) {
      const newB = {
        _id: 'b-' + Date.now(),
        title,
        description: 'Custom board created by ' + (user?.name || 'User'),
        columns: ['To Do', 'In Progress', 'In Review', 'Done']
      };
      setBoard(newB);
      setCards([]);
    }
  };

  return (
    <div className="app-container">
      <Navbar
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onNewBoard={handleNewBoard}
      />

      <main style={{ flex: 1 }}>
        <BoardView
          board={board}
          cards={cards}
          onMoveCard={handleMoveCard}
          onDeleteCard={handleDeleteCard}
          onOpenTaskModal={() => setIsTaskModalOpen(true)}
        />
      </main>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleCreateTask}
        columns={board.columns}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
        api={api}
      />
    </div>
  );
}
