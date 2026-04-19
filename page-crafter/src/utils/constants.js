// Block type constants and palette catalog used across the app.
export const BLOCK_TYPES = {
  TEXT: "text",
  IMAGE: "image",
  HEADER: "header",
  MARKDOWN: "markdown",
};

export const STORAGE_KEY = "pagecrafter:blocks:v1";

export const DEFAULT_CONTENT = {
  [BLOCK_TYPES.TEXT]: { text: "Write something inspiring..." },
  [BLOCK_TYPES.IMAGE]: { url: "", alt: "" },
  [BLOCK_TYPES.HEADER]: { level: "h1", text: "Your headline" },
  [BLOCK_TYPES.MARKDOWN]: {
    md: "## Hello, **PageCrafter**\n\n- Drag blocks\n- Drop them here\n- Edit & arrange",
  },
};

export const PALETTE_ITEMS = [
  {
    type: BLOCK_TYPES.TEXT,
    label: "Text",
    icon: "T",
    description: "Paragraph copy",
  },
  {
    type: BLOCK_TYPES.HEADER,
    label: "Header",
    icon: "H",
    description: "H1 / H2 / H3",
  },
  {
    type: BLOCK_TYPES.IMAGE,
    label: "Image",
    icon: "▣",
    description: "From a URL",
  },
  {
    type: BLOCK_TYPES.MARKDOWN,
    label: "Markdown",
    icon: "M↓",
    description: "Live preview",
  },
];
