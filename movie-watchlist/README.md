# 🎬 Movie Watchlist

A responsive single-page application built with React that allows users to search, explore, and manage movies using real-time data from the OMDb API.

---

## 🔗 Live Demo

👉 [View Live Application](https://movie-watchlist-jet.vercel.app/)

---

## 🎥 Demo Video

👉 [Watch Demo Video](https://youtu.be/jRTobc-rVnE?si=MK6dTNdQXPZQ0lax./demo/screenshot.png)

---

## 🎯 Objective

This project was built as part of a Frontend Developer Intern assignment to demonstrate the ability to:

- Build a responsive, component-based web application
- Fetch and display data from an external API
- Handle loading and error states effectively
- Maintain clean architecture and reusable components

---

## 🚀 Features

- 🔍 **Search Functionality**  
  Search movies dynamically using the OMDb API

- 🎥 **Movie Details View**  
  Display detailed information including poster, year, and ratings

- ⭐ **User Rating System**  
  Rate movies using a reusable star rating component

- 📋 **Watchlist Management**  
  Add/remove movies from a personal watched list

- 💾 **Persistent Storage**  
  Saves watched movies using `localStorage`

- ⚡ **API Handling**  
  Includes loading indicators and error handling for API requests

- 📱 **Responsive Design**  
  Fully optimized for mobile, tablet, and desktop devices

- ⌨️ **Keyboard Shortcuts**
  - `Enter` → Focus search bar
  - `Escape` → Close movie details

---

## 🧱 Component Architecture

```
src/
├── components/
│   ├── NavBar
│   ├── MovieList
│   ├── MovieDetails
│   ├── Loader
│   ├── ErrorMessage
│   └── ...
├── contexts/
├── hooks/
├── App.jsx
└── main.jsx
```

- Reusable components improve maintainability
- Custom hooks handle API logic and separation of concerns
- Context API manages global state efficiently

---

## 🔄 State Management Approach

- Local state managed using `useState`
- Side effects handled using `useEffect`
- Custom hooks used for API fetching and reuse
- Persistent state handled via `localStorage`

---

## 🌐 API Used

**OMDb API**  
https://www.omdbapi.com/

Used to fetch:

- Movie search results
- Movie details
- Ratings and metadata

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Language:** JavaScript (ES6+)
- **Styling:** CSS3
- **State Management:** React Hooks + Context API
- **API Integration:** Fetch API
- **Version Control:** Git & GitHub
- **Deployment:** Vercel / Netlify

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd movie-watchlist
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create a `.env` file in the root directory:

```env
VITE_OMDB_API_KEY=your_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

---

## 🧪 Error & Loading Handling

- Displays loader while fetching data
- Shows error messages for failed API requests
- Prevents unnecessary API calls
- Handles edge cases like empty search results

---

## 📱 Responsiveness

- Mobile-first design approach
- Uses CSS media queries for adaptive layout
- Tested across modern browsers (Chrome, Edge)

---

## 🧠 Key Learnings

- Efficient API handling and optimization
- Writing reusable and maintainable components
- Managing side effects and cleanup in React
- Improving user experience with proper UI states
- Structuring scalable frontend applications

---

## 📌 Conclusion

This project demonstrates practical frontend development skills including API integration, responsive UI design, and clean architecture, aligned with real-world application requirements.

---
