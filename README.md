# StepWise 🔢

> Watch algorithms come to life — step by step, with live code highlighting.

StepWise is a full-stack algorithm visualizer built with **React** and **Express**. Select an algorithm, enter your input, and step through every operation while watching the exact line of code highlight in real time — in Java and C++.

---

## 🚀 Features

- **Step-by-step visualization** — go forward, backward, or auto-play at your own pace
- **Live code highlighting** — the exact line highlights as each step executes
- **Multiple data structures** — Arrays, Stacks, and Linked Lists
- **Multi-language support** — Java and C++ implementations
- **Dynamic input** — each data structure has its own input UI
- **Complexity badges** — Best, Average, Worst time and Space complexity at a glance

---

## 🗂 Project Structure

```
StepWise/
├── Backend/
│   └── src/
│       ├── algorithms/
│       │   ├── array/
│       │   │   └── bubbleSort.js
│       │   ├── stack/
│       │   │   └── push.js
│       │   ├── linkedList/
│       │   │   └── traversal.js
│       │   └── validationError.js
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   └── algorithmController.js
│       ├── models/
│       │   ├── algorithmModel.js
│       │   ├── codesModel.js
│       │   └── comparisonsModel.js
│       ├── routes/
│       │   └── algorithms.js
│       └── seed/
│           ├── schema.sql
│           └── data.sql
│   └── app.js
│
└── frontend/
    └── src/
        ├── api/
        ├── assets/
        ├── components/
        │   ├── visualizers/
        │   │   ├── index.js
        │   │   ├── ArrayVisualizer.jsx
        │   │   ├── StackVisualizer.jsx
        │   │   └── LinkedListVisualizer.jsx
        │   ├── AlgoInput.jsx
        │   ├── CodePanel.jsx
        │   ├── ComplexityBadge.jsx
        │   ├── Controls.jsx
        │   ├── Navbar.jsx
        │   └── Sidebar.jsx
        ├── hooks/
        │   └── useVisualizer.js
        └── pages/
            ├── Landing.jsx
            └── Home.jsx
```

---

## 🛠 Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React, Vite, Tailwind CSS         |
| Backend   | Node.js, Express.js               |
| Database  | PostgreSQL                        |
| Routing   | React Router v6                   |
| HTTP      | Axios                             |

---

## 🗃 Database Schema

### `algorithms`
Stores all algorithm metadata.

| Column           | Type         | Description                          |
|------------------|--------------|--------------------------------------|
| id               | SERIAL PK    | Auto-increment ID                    |
| name             | VARCHAR      | Display name e.g. "Bubble Sort"      |
| slug             | VARCHAR      | URL-safe ID e.g. "bubble-sort"       |
| category         | VARCHAR      | `array` / `stack` / `linked_list`    |
| subcategory      | VARCHAR      | `sorting` / `searching` / `operation`|
| description      | TEXT         | Short description                    |
| time_best        | VARCHAR      | e.g. `O(n)`                          |
| time_avg         | VARCHAR      | e.g. `O(n²)`                         |
| time_worst       | VARCHAR      | e.g. `O(n²)`                         |
| space_complexity | VARCHAR      | e.g. `O(1)`                          |
| is_stable        | BOOLEAN      | Only relevant for sorting algorithms |
| order_index      | INT          | Controls display order in sidebar    |

### `algorithm_codes`
Stores Java and C++ implementations with highlight maps.

| Column       | Type   | Description                                          |
|--------------|--------|------------------------------------------------------|
| algorithm_id | INT FK | References `algorithms.id`                           |
| language     | VARCHAR| `java` / `cpp`                                       |
| code         | TEXT   | Full implementation                                  |
| highlight_map| JSONB  | Maps action → line numbers e.g. `{"compare": [3,4]}` |

### `steps` *(pre-seeded defaults)*
Stores default demo steps per algorithm.

### `comparisons`
Defines valid algorithm pairs for future side-by-side comparison feature.

---

## 🔌 API Endpoints

| Method | Endpoint                          | Description                        |
|--------|-----------------------------------|------------------------------------|
| GET    | `/api/algorithms`                 | Get all algorithms                 |
| GET    | `/api/algorithms/:slug`           | Get single algorithm by slug       |
| POST   | `/api/algorithms/:slug/visualize` | Generate visualization steps       |
| GET    | `/api/algorithms/:slug/code`      | Get code + highlight map by lang   |

### POST `/api/algorithms/:slug/visualize`

**Request body:**
```json
// Array algorithms
{ "input": [5, 3, 8, 1] }

// Stack algorithms
{ "input": { "value": 10, "stack": [1, 2, 3] } }

// Linked List algorithms
{ "input": [10, 20, 30] }
```

**Response:**
```json
{
  "success": true,
  "data": {
    "steps": [
      {
        "step_number": 1,
        "action": "compare",
        "state": { "array": [5,3,8,1], "comparing": [0,1], "sorted": [] }
      }
    ]
  }
}
```

---

## ⚙️ How It Works

### Backend — Step Generation

Each algorithm lives in its own file under `src/algorithms/`. It validates its own input and returns an array of steps:

```
POST /visualize
      ↓
algorithmController → algorithmMap[slug]
      ↓
stepGenerator(input) → validates → generates steps[]
      ↓
res.json({ steps })
```

Adding a new algorithm:
1. Create `src/algorithms/<category>/<name>.js`
2. Write validation + step generator
3. Import and add to `algorithmMap` in the controller
4. Seed code + `highlight_map` into `algorithm_codes` table

### Frontend — Visualizer Registry

Each `category` maps to a dedicated visualizer component:

```
selectedAlgo.category
      ↓
VISUALIZER_MAP['array'] → ArrayVisualizer
VISUALIZER_MAP['stack'] → StackVisualizer
VISUALIZER_MAP['linked_list'] → LinkedListVisualizer
```

`useVisualizer` hook manages all animation state — steps array, current index, play/pause, prev/next.

### Validation Error Pattern

Each step generator throws typed errors so the controller can distinguish user errors (400) from server crashes (500):

```js
// validationError.js
const throwValidation = (msg) => {
  const err = new Error(msg)
  err.isValidationError = true
  throw err
}

// controller catch:
const status = err.isValidationError ? 400 : 500
```

---

## 🧩 Algorithms Implemented

### Arrays
| Algorithm      | Slug             | Type      |
|----------------|------------------|-----------|
| Bubble Sort    | `bubble-sort`    | Sorting   |
| Selection Sort | `selection-sort` | Sorting   |
| Insertion Sort | `insertion-sort` | Sorting   |
| Binary Search  | `binary-search`  | Searching |
| Linear Search  | `linear-search`  | Searching |

### Stack
| Algorithm    | Slug           | Type      |
|--------------|----------------|-----------|
| Stack Push   | `stack-push`   | Operation |
| Stack Pop    | `stack-pop`    | Operation |
| Stack Peek   | `stack-peek`   | Operation |
| isEmpty Check| `stack-isempty`| Operation |

### Linked List
| Algorithm      | Slug             | Type      |
|----------------|------------------|-----------|
| LL Traversal   | `ll-traversal`   | Operation |
| LL Insert Head | `ll-insert-head` | Operation |
| LL Insert Tail | `ll-insert-tail` | Operation |
| LL Delete Node | `ll-delete-node` | Operation |

> ✅ = fully implemented &nbsp; 🔲 = seeded in DB, visualizer coming soon

---

## 📦 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=stepwise
PORT=5000
```

Run the database schema and seed:
```bash
psql -U your_user -d stepwise -f src/seed/schema.sql
psql -U your_user -d stepwise -f src/seed/data.sql
```

Start the server:
```bash
node app.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

---

## 🗺 Pages

| Route        | Page          | Description                          |
|--------------|---------------|--------------------------------------|
| `/`          | Landing       | Hero, features, algorithm preview    |
| `/visualize` | Visualizer    | Main app — select, input, visualize  |

---

## 🔮 Future Updates

### Algorithms
- [ ] Selection Sort visualizer
- [ ] Insertion Sort visualizer
- [ ] Binary Search visualizer
- [ ] Linear Search visualizer
- [ ] Stack Pop, Peek, isEmpty visualizers
- [ ] LL Insert Head / Tail / Delete visualizers

### Features
- [ ] **Algorithm Comparison** — side-by-side view of two algorithms running on the same input
- [ ] **Speed control** — slider to adjust auto-play speed
- [ ] **Tree data structure** — BFS, DFS visualizations
- [ ] **Random input generator** — one-click random array/stack
- [ ] **Mobile responsive** — full touch support
- [ ] **Dark mode**
- [ ] **Share URL** — shareable link with pre-loaded algorithm + input

---

## 📁 Adding a New Algorithm — Checklist

```
Backend:
  ✅ Create src/algorithms/<category>/<name>.js
  ✅ Add validation using throwValidation()
  ✅ Generate and return steps[]
  ✅ Import and register in algorithmMap
  ✅ Seed Java + C++ code with highlight_map into algorithm_codes

Frontend:
  ✅ If new category → create new XxxVisualizer.jsx
  ✅ Register in components/visualizers/index.js
  ✅ If new input shape → add case in AlgoInput.jsx
```

---

*StepWise — built to make algorithms click.*
