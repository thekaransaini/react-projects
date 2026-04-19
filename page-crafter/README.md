# 🚀 PageCrafter – Dynamic Content Builder

## 📌 Overview

**PageCrafter** is a dynamic web application that allows users to build and customize a personal content page using draggable and configurable content blocks.

* UI/UX design
* Drag-and-drop interactions
* State management
* Component architecture
* Data persistence

---

## 🔗 Live Demo

👉 [View Live Application](https://page-crafter-ruby.vercel.app/)

---

## 🎥 Demo Video

👉 [Watch Demo Video](https://youtu.be/-ahRcVdVhNI)

---

## 🎯 Features

### 🧱 Content Blocks

* Text Block (editable paragraph)
* Header Block (H1 / H2 / H3)
* Image Block (URL + preview)
* Markdown Block (live preview)

---

### 🖱️ Drag & Drop

* Drag blocks from palette to canvas
* Reorder blocks within canvas
* Smooth interactions using **dnd-kit**

---

### ⚙️ Block Controls

* Edit content in real-time
* Delete blocks
* Toggle edit mode
* Clean card-based UI

---

### 💾 Persistence

* Saves data in **localStorage**
* Automatically restores state on reload

---

### 🎨 UI/UX

* Two-column layout (Palette + Canvas)
* Modern, minimal design
* Responsive layout
* Smooth animations

---

## 🛠️ Tech Stack

* **React.js** (Functional Components + Hooks)
* **TypeScript**
* **Tailwind CSS**
* **dnd-kit** (Drag & Drop)
* **uuid** (Unique IDs)
* **marked** (Markdown parsing)

---

## 📁 Project Structure

```bash
src/
├── assets/
├── components/
│   ├── blocks/
│   │   ├── HeaderBlock.jsx
│   │   ├── ImageBlock.jsx
│   │   ├── MarkdownBlock.jsx
│   │   ├── TextBlock.jsx
│   ├── ui/
│   │   ├── BlockWrapper.jsx
│   │   ├── Canvas.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Loader.jsx
│   │   ├── NavBar.jsx
│   │   ├── NavLinks.jsx
│   │   ├── Palette.jsx
├── contexts/
│   ├── BuilderContext.jsx
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   ├── useLocalStorage.js
├── lib/
│   ├── utils.ts
├── pages/
│   ├── Index.tsx
│   ├── NotFound.tsx
├── test/
│   ├── example.test.ts
│   ├── setup.ts
├── utils/
├── App.css
├── App.tsx
```

---

## 🧠 State Management

The app uses **React Context API** for centralized state handling.

### Block Data Structure

```ts
type Block = {
  id: string;
  type: "text" | "image" | "header" | "markdown";
  content: any;
};
```

### Key Operations

* Add block
* Update block content
* Delete block
* Reorder blocks

---

## 💾 Persistence Strategy

Custom hook: **useLocalStorage**

### How it works:

1. State updates in Context
2. Data is stored in `localStorage`
3. On reload → data is restored automatically

---

## ⚠️ Edge Case Handling

* Prevent duplicate IDs using `uuid`
* Handle empty canvas gracefully
* Fallback for invalid image URLs
* Safe markdown rendering
* No crashes on invalid state

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/pagecrafter.git
cd pagecrafter
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Run the App

```bash
npm run dev
```

---

### 4. Open in Browser

```
http://localhost:5173
```

---

## 🎥 Demo Requirements Covered

✔ Drag blocks from palette
✔ Reorder blocks
✔ Edit content
✔ Delete blocks
✔ Persistence after refresh

---

## 🚀 Future Improvements

* Rich text editor support
* Export page as HTML/PDF
* Undo/Redo functionality
* Backend integration
* More block types (video, embed, etc.)

---

## 📜 License

This project is for educational and evaluation purposes only.

---

## ⭐ Final Thoughts

This project demonstrates:

* Advanced frontend architecture
* Interactive UI design
* Scalable state management
* Real-world problem solving

---

✨ *Build. Drag. Create. — with PageCrafter*

