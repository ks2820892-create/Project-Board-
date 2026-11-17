const mongoose = require('mongoose');

let isConnected = false;

// In-memory store fallback if MongoDB is not running locally
const memoryStore = {
  users: [],
  boards: [
    {
      _id: 'sample-board-1',
      title: 'Sprint 1 Tasks',
      description: 'Main project planning board for ALTA 5-Day MVP',
      owner: 'demo-user-id',
      columns: ['To Do', 'In Progress', 'In Review', 'Done'],
      createdAt: new Date().toISOString()
    }
  ],
  cards: [
    {
      _id: 'card-1',
      boardId: 'sample-board-1',
      title: 'Setup Backend Server',
      description: 'Initialize Node.js Express server with REST endpoints',
      status: 'Done',
      priority: 'High',
      assignedTo: 'Krishna',
      dueDate: '2026-11-18',
      position: 0
    },
    {
      _id: 'card-2',
      boardId: 'sample-board-1',
      title: 'Build Kanban Board UI',
      description: 'Create column layout and card dragging mechanics',
      status: 'In Progress',
      priority: 'Urgent',
      assignedTo: 'Krishna',
      dueDate: '2026-11-19',
      position: 1
    },
    {
      _id: 'card-3',
      boardId: 'sample-board-1',
      title: 'Connect Frontend & Backend APIs',
      description: 'Integrate fetch requests and test board persistence',
      status: 'To Do',
      priority: 'Medium',
      assignedTo: 'Krishna',
      dueDate: '2026-11-20',
      position: 2
    }
  ]
};

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/project_board';
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500
    });
    isConnected = true;
    console.log('✅ Connected to MongoDB successfully.');
  } catch (err) {
    console.warn('⚠️  Could not connect to MongoDB:', err.message);
    console.log('⚡ Using built-in In-Memory Database Fallback. Perfect for instant 5-day local development!');
    isConnected = false;
  }
}

function getStore() {
  return { isConnected, memoryStore };
}

module.exports = { connectDB, getStore };
