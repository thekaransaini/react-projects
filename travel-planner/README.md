# 🌍 Travel Planner App

A modern and responsive **Travel Planner Web App** that helps users plan trips, manage expenses, track packing lists, and visualize travel routes on an interactive map.

🔗 **Live App:** [Travel Planner App](https://travel-planner-theta-blush.vercel.app/)

🔗 **Backend API:** [Render Server](https://travel-planner-api-1lge.onrender.com)

---

## 🚀 Features

- 🔐 User Authentication (Login / Signup)
- 🗺️ Interactive Map with city search & markers
- 📍 Add & manage trips with multiple cities
- 🧭 Dynamic routes with polylines on map
- 💰 Expense tracking with category & currency
- 🎒 Packing list with progress tracking
- 📅 Date selection with validation
- 📱 Fully responsive UI (mobile + desktop)
- ⚡ Smooth animations & improved UX
- 🧠 Error handling & loading states

---

## 🛠️ Tech Stack

**Frontend**

- React.js
- HTML5
- CSS3
- JavaScript (ES6+)
- React Router
- Context API + useReducer

**Backend**

- JSON Server (Mock REST API)
- Hosted on Render

**Map & APIs**

- Leaflet.js
- Geoapify API (for city search & geocoding)

---

## 📂 Project Structure

```
## 📁 Project Structure

travel-planner/
│
├── client/                     # Frontend (React + Vite)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images, icons, etc.
│   │   ├── components/         # Reusable UI components
│   │   ├── contexts/           # Global state (Context API)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # App pages (Home, Login, Trips, etc.)
│   │   ├── routes/             # Routing configuration
│   │   ├── App.jsx             # Root component
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   │
│   ├── .env                    # Environment variables
│   ├── index.html              # HTML template
│   ├── vite.config.js          # Vite configuration
│   ├── eslint.config.js        # Linting config
│   ├── package.json
│   ├── package-lock.json
│   ├── .gitignore
│   ├── dist/
│   └──demo/
├── server/                     # Backend (JSON Server)│
│    ├── data/
│    │   └── data.json           # Mock database
│    ├── server.js               # Custom server setup (if any)
│    ├── package.json
│    └── package-lock.json
└── README.md



```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/travel-planner.git
cd travel-planner
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file:

```
VITE_API_URL=https://travel-planner-api-1lge.onrender.com
VITE_GEOAPIFY_API_KEY=your_api_key
```

---

### 4. Run Frontend

```bash
npm run dev
```

---

### 5. Run JSON Server (Local)

```bash
npm run server
```

Your script:

```json
"server": "json-server --watch data/data.json --port 8000"
```

---

## 📡 API Endpoints (JSON Server)

- `/users`
- `/trips`
- `/cities`
- `/expenses`
- `/packingItems`

---

## 📊 Key Functionalities

### ✈️ Trip Management

- Create, delete, and view trips
- Add multiple cities per trip

### 🗺️ Map Integration

- Search cities using API
- Get latitude & longitude dynamically
- Display markers and routes

### 💸 Expense Tracking

- Add expenses with category & currency
- Calculate totals

### 🎒 Packing List

- Add items
- Mark as packed/unpacked
- Track progress

---

## 🧪 Deployment

### Frontend (Vercel)

- Connected GitHub repo
- Auto deploy on push

### Backend (Render)

- JSON Server hosted
- Environment variables configured

---

## 🎥 Demo Video

[![Travel Planner Demo](client/demo/app-demo.png)](https://youtu.be/FeymYJhe3Rw)

---

## ⚠️ Notes

- JSON Server is used as a mock backend (not for production)
- For production apps, replace with real backend (Node.js / Firebase / Supabase)

---

## 🙌 Author

**Karan Saini**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
