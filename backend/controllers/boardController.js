const Board = require('../models/Board');
const Card = require('../models/Card');
const { getStore } = require('../config/db');

// Get all boards for logged in user
exports.getBoards = async (req, res) => {
  try {
    const userId = req.user.id;
    const { isConnected, memoryStore } = getStore();

    if (isConnected) {
      const boards = await Board.find({
        $or: [{ owner: userId }, { members: userId }]
      }).sort({ createdAt: -1 });
      return res.json({ boards });
    } else {
      const boards = memoryStore.boards;
      return res.json({ boards });
    }
  } catch (err) {
    console.error('getBoards error:', err);
    return res.status(500).json({ error: 'Failed to retrieve boards.' });
  }
};

// Create a new board
exports.createBoard = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res.status(400).json({ error: 'Board title is required.' });
    }

    const { isConnected, memoryStore } = getStore();

    if (isConnected) {
      const board = await Board.create({
        title,
        description: description || '',
        owner: userId,
        members: [userId],
        columns: ['To Do', 'In Progress', 'In Review', 'Done']
      });
      return res.status(201).json({ board });
    } else {
      const board = {
        _id: 'board-' + Date.now(),
        title,
        description: description || '',
        owner: userId,
        members: [userId],
        columns: ['To Do', 'In Progress', 'In Review', 'Done'],
        createdAt: new Date().toISOString()
      };
      memoryStore.boards.push(board);
      return res.status(201).json({ board });
    }
  } catch (err) {
    console.error('createBoard error:', err);
    return res.status(500).json({ error: 'Failed to create board.' });
  }
};

// Get single board with all its cards
exports.getBoardById = async (req, res) => {
  try {
    const { id } = req.params;
    const { isConnected, memoryStore } = getStore();

    if (isConnected) {
      const board = await Board.findById(id);
      if (!board) {
        return res.status(404).json({ error: 'Board not found.' });
      }
      const cards = await Card.find({ boardId: id }).sort({ position: 1 });
      return res.json({ board, cards });
    } else {
      const board = memoryStore.boards.find(b => b._id.toString() === id.toString());
      if (!board) {
        return res.status(404).json({ error: 'Board not found.' });
      }
      const cards = memoryStore.cards.filter(c => c.boardId.toString() === id.toString());
      return res.json({ board, cards });
    }
  } catch (err) {
    console.error('getBoardById error:', err);
    return res.status(500).json({ error: 'Failed to load board details.' });
  }
};

// Delete board
exports.deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { isConnected, memoryStore } = getStore();

    if (isConnected) {
      await Board.findByIdAndDelete(id);
      await Card.deleteMany({ boardId: id });
      return res.json({ message: 'Board deleted successfully.' });
    } else {
      memoryStore.boards = memoryStore.boards.filter(b => b._id.toString() !== id.toString());
      memoryStore.cards = memoryStore.cards.filter(c => c.boardId.toString() !== id.toString());
      return res.json({ message: 'Board deleted successfully.' });
    }
  } catch (err) {
    console.error('deleteBoard error:', err);
    return res.status(500).json({ error: 'Failed to delete board.' });
  }
};
