const Card = require('../models/Card');
const { getStore } = require('../config/db');

// Create a new task card
exports.createCard = async (req, res) => {
  try {
    const { title, description, boardId, status, priority, assignedTo, dueDate } = req.body;

    if (!title || !boardId) {
      return res.status(400).json({ error: 'Title and boardId are required.' });
    }

    const { isConnected, memoryStore } = getStore();

    if (isConnected) {
      const card = await Card.create({
        title,
        description: description || '',
        boardId,
        status: status || 'To Do',
        priority: priority || 'Medium',
        assignedTo: assignedTo || 'Unassigned',
        dueDate: dueDate || '',
        position: Date.now()
      });
      return res.status(201).json({ card });
    } else {
      const card = {
        _id: 'card-' + Date.now(),
        title,
        description: description || '',
        boardId,
        status: status || 'To Do',
        priority: priority || 'Medium',
        assignedTo: assignedTo || 'Unassigned',
        dueDate: dueDate || '',
        position: Date.now(),
        createdAt: new Date().toISOString()
      };
      memoryStore.cards.push(card);
      return res.status(201).json({ card });
    }
  } catch (err) {
    console.error('createCard error:', err);
    return res.status(500).json({ error: 'Failed to create task card.' });
  }
};

// Update card (title, description, priority, etc.)
exports.updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const { isConnected, memoryStore } = getStore();

    if (isConnected) {
      const card = await Card.findByIdAndUpdate(id, updates, { new: true });
      if (!card) {
        return res.status(404).json({ error: 'Card not found.' });
      }
      return res.json({ card });
    } else {
      const index = memoryStore.cards.findIndex(c => c._id.toString() === id.toString());
      if (index === -1) {
        return res.status(404).json({ error: 'Card not found.' });
      }
      memoryStore.cards[index] = { ...memoryStore.cards[index], ...updates };
      return res.json({ card: memoryStore.cards[index] });
    }
  } catch (err) {
    console.error('updateCard error:', err);
    return res.status(500).json({ error: 'Failed to update card.' });
  }
};

// Move card to another status/column (Drag & Drop or click move)
exports.moveCardStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, position } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Target status is required.' });
    }

    const { isConnected, memoryStore } = getStore();

    if (isConnected) {
      const updateData = { status };
      if (position !== undefined) updateData.position = position;
      const card = await Card.findByIdAndUpdate(id, updateData, { new: true });
      if (!card) return res.status(404).json({ error: 'Card not found.' });
      return res.json({ card });
    } else {
      const card = memoryStore.cards.find(c => c._id.toString() === id.toString());
      if (!card) return res.status(404).json({ error: 'Card not found.' });
      card.status = status;
      if (position !== undefined) card.position = position;
      return res.json({ card });
    }
  } catch (err) {
    console.error('moveCardStatus error:', err);
    return res.status(500).json({ error: 'Failed to move card.' });
  }
};

// Delete card
exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { isConnected, memoryStore } = getStore();

    if (isConnected) {
      await Card.findByIdAndDelete(id);
      return res.json({ message: 'Card deleted successfully.' });
    } else {
      memoryStore.cards = memoryStore.cards.filter(c => c._id.toString() !== id.toString());
      return res.json({ message: 'Card deleted successfully.' });
    }
  } catch (err) {
    console.error('deleteCard error:', err);
    return res.status(500).json({ error: 'Failed to delete card.' });
  }
};
