# PageCrafter — Dynamic Content Builder

A drag-and-drop page builder built with React + dnd-kit. Compose pages from modular blocks (Text, Header, Image, Markdown), reorder them, edit inline, and persist your work to localStorage automatically.

## ✨ Features

- Palette + Canvas two-column layout
- Drag-and-drop from palette to canvas (`@dnd-kit`)
- Reorder blocks with a drag handle
- Inline editing with Edit/Done toggle
- Block types: Text, Header (H1/H2/H3), Image (URL + alt), Markdown (live preview via `marked`)
- Persistence via `localStorage` (auto save + restore)
- Save Page toast + Clear Page confirm
- Graceful fallbacks for empty data, broken images, unknown types
- Responsive, animated, modern card UI

## 🧱 Tech Stack

React 18, Vite, Tailwind CSS, `@dnd-kit/core` + `@dnd-kit/sortable`, `uuid`, `marked`, `sonner`.

## 📁 Structure

```
src/
├── components/{NavBar,Palette,Canvas,BlockWrapper,Loader,ErrorMessage}.jsx
├── components/blocks/{TextBlock,ImageBlock,HeaderBlock,MarkdownBlock}.jsx
├── contexts/BuilderContext.jsx
├── hooks/useLocalStorage.js
├── utils/constants.js
├── pages/Index.tsx
└── main.tsx
```

## 🚀 Setup

```bash
npm install
npm run dev
```

Open the printed local URL (typically http://localhost:5173).

## 🧠 State Management

Centralized in `BuilderContext` (React Context API). API: `blocks`, `addBlock(type, index?)`, `updateBlock(id, partial)`, `removeBlock(id)`, `moveBlock(from, to)`, `clearAll()`.

Block shape:

```js
{ id: "uuid-v4", type: "text"|"image"|"header"|"markdown", content: { ... } }
```

## 💾 Persistence

The `useLocalStorage` hook syncs `blocks` under the `pagecrafter:blocks:v1` key on every change and rehydrates on load (with safe JSON parsing and a `[]` fallback on errors).

## 🧪 Edge Cases

Empty canvas → empty state · invalid image URL → inline error · unknown type → soft error · storage failure → silent · duplicate IDs → prevented by `uuid` v4.
