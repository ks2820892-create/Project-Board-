# 📋 Team Task Management System (5-Day MVP)

A collaborative Kanban-style task management web application designed for high productivity, built as part of **ALTA Builder 30 (Fast-Track 5-Day Scope)**.

Repository: [github.com/ks2820892-create/Project-Board-](https://github.com/ks2820892-create/Project-Board-)

---

## ⚡ Instant Live Preview (No Installation Required)

Agar aapko turant project dekhna aur test karna hai bina koi software install kiye:
1. Simply double-click **`quick-preview.html`** in Finder, ya terminal me run karein:
   ```bash
   open quick-preview.html
   ```
2. Browser me complete working Kanban board open ho jayega jisme aap:
   - Tasks drag-and-drop kar sakte hain.
   - Naye tasks add kar sakte hain (with Priority, Assignee, Due date).
   - Search aur Priority filter test kar sakte hain.
   - LocalStorage me data automatically save hota hai!

---

## 🚀 Full-Stack Setup (Node.js + React)

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
# or: node server.js
```
* Server URL: `http://localhost:5000`
* Health Check: `http://localhost:5000/api/health`
* *Note: MongoDB locally install na hone par bhi server automatically In-Memory Database Mode me chalega!*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
* Frontend URL: `http://localhost:3000`

---

## 🛠️ Features Included

- **Project Boards**: Create and switch between boards.
- **Kanban Columns**: Standard agile columns (`To Do`, `In Progress`, `In Review`, `Done`).
- **Drag & Drop**: Smooth HTML5 drag-and-drop between columns.
- **Task Metadata**:
  - Task Title & Description
  - Priority Badges (`Urgent`, `High`, `Medium`, `Low`)
  - Assignee Name
  - Due Date
- **Live Search & Filter**: Instant card filtering by title or priority.
- **Authentication**: JWT-based login/signup with guest demo fallback.

---

## 📂 Project Structure

```text
project-board/
├── quick-preview.html      # Standalone single-file working app (1-click run)
├── 5_DAY_ROADMAP.md        # Detailed day-by-day execution plan
├── FEATURES_5_DAYS.md      # 30-Day vs 5-Day scope comparison
├── README.md               # Project documentation
│
├── backend/
│   ├── config/db.js        # MongoDB + In-Memory fallback store
│   ├── controllers/        # Auth, Board, Card controllers
│   ├── middleware/         # JWT verification middleware
│   ├── models/             # User, Board, Card schemas
│   ├── routes/             # REST API routes
│   ├── server.js           # Express main server
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── components/     # Navbar, BoardView, TaskCard, Modals
        ├── services/       # API client & local sync
        ├── App.jsx         # Main application component
        ├── index.css       # Modern dark-theme styling
        └── main.jsx
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user account |
| `POST` | `/api/auth/login` | Login and receive JWT token |
| `GET` | `/api/boards` | Fetch user project boards |
| `POST` | `/api/boards` | Create a new board |
| `GET` | `/api/boards/:id` | Get board details with cards |
| `POST` | `/api/cards` | Create a new task card |
| `PATCH` | `/api/cards/:id/status` | Update task status column |
| `DELETE` | `/api/cards/:id` | Delete a task card |
