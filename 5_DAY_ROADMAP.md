# 5-Day Fast-Track Roadmap: Team Task Management System

Yeh roadmap aapke **ALTA Builder 30** ke "Team Task Management System" project ko **5 din ke practical MVP (Minimum Viable Product)** me divide karta hai, taaki project 100% complete aur working condition me deliver ho sake bina burnout ke.

---

## 📅 Day-by-Day Plan

### 🔹 Day 1: Project Setup & Backend Architecture
* **Goal**: Backend server initialize karna aur User & Task models define karna.
* **Tasks**:
  1. Node.js & Express server setup (`server.js`).
  2. Database Connection (`config/db.js`): MongoDB Mongoose setup + local in-memory fallback taaki bina database install kiye bhi server chal sake.
  3. Schemas create karna: `User`, `Board`, `Card`.
  4. Authentication API banana:
     - `POST /api/auth/register` (Password hashing ke sath).
     - `POST /api/auth/login` (JWT token return karna).
* **Deliverable Day 1**: Working backend server jo register aur login accept kare.

---

### 🔹 Day 2: Board & Task REST APIs (CRUD)
* **Goal**: Board aur Task Cards ke sabhi API endpoints ready karna.
* **Tasks**:
  1. Board Endpoints:
     - `GET /api/boards` (User ke boards fetch karna).
     - `POST /api/boards` (Naya board banana).
     - `GET /api/boards/:id` (Board aur uske cards fetch karna).
  2. Task Card Endpoints:
     - `POST /api/cards` (Naya task add karna with title, priority, assignee, due date).
     - `PATCH /api/cards/:id/status` (Task column move karna: To Do -> In Progress -> Done).
     - `DELETE /api/cards/:id` (Task delete karna).
* **Deliverable Day 2**: Postman / Thunder Client me test kiye hue complete working APIs.

---

### 🔹 Day 3: Frontend Foundation & Auth UI
* **Goal**: Modern React UI layout aur Authentication interface create karna.
* **Tasks**:
  1. React (Vite) app setup.
  2. Modern Dark/Clean Theme CSS (`index.css`) with CSS custom properties.
  3. Responsive Navbar component with User Profile & Board Switcher.
  4. Login & Register modal/page jo JWT token ko `localStorage` me save kare.
* **Deliverable Day 3**: Clean, responsive frontend jisme user login/register kar sake aur dashboard open ho sake.

---

### 🔹 Day 4: Interactive Kanban Board & Task Actions
* **Goal**: Real Kanban board banana with drag-and-drop.
* **Tasks**:
  1. Board layout create karna with 4 columns:
     - **To Do**
     - **In Progress**
     - **In Review**
     - **Done**
  2. HTML5 native Drag & Drop events implement karna (`onDragStart`, `onDragOver`, `onDrop`) - zero external dependency lag ke smooth experience.
  3. "Add Task" modal form:
     - Title, Description, Status, Priority (Urgent, High, Medium, Low), Assignee, Due Date.
  4. Task card delete aur quick actions.
* **Deliverable Day 4**: Full visual board jisme task card banaye aur ek column se doosre column drag kiye ja sakein.

---

### 🔹 Day 5: Search, Priority Filters, Polish & GitHub Submission
* **Goal**: Final presentation polish aur project submit karna.
* **Tasks**:
  1. Instant search bar (Task title aur description match karne ke liye).
  2. Priority filter dropdown (Urgent / High / Medium / Low).
  3. Quick-Preview single-file HTML test karna for instant offline demonstration.
  4. Repository documentation update (`README.md` & `FEATURES.md`).
  5. Git Commit & Push:
     ```bash
     git add .
     git commit -m "Complete 5-Day MVP: Team Task Management Board"
     git push origin main
     ```
* **Deliverable Day 5**: Fully working project code, polished README, ready to demonstrate to mentors or recruiters!
