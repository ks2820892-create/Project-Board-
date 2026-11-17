const API_BASE = 'http://localhost:5000/api';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async register(name, email, password) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return res.json();
  },

  // Boards
  async getBoards() {
    const res = await fetch(`${API_BASE}/boards`, {
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  async createBoard(title, description) {
    const res = await fetch(`${API_BASE}/boards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ title, description })
    });
    return res.json();
  },

  async getBoardById(id) {
    const res = await fetch(`${API_BASE}/boards/${id}`, {
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  // Cards
  async createCard(cardData) {
    const res = await fetch(`${API_BASE}/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(cardData)
    });
    return res.json();
  },

  async updateCardStatus(cardId, status) {
    const res = await fetch(`${API_BASE}/cards/${cardId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  async deleteCard(cardId) {
    const res = await fetch(`${API_BASE}/cards/${cardId}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return res.json();
  }
};
