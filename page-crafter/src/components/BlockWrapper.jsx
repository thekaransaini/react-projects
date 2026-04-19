import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBuilder } from "../contexts/BuilderContext";
import TextBlock from "./blocks/TextBlock";
import ImageBlock from "./blocks/ImageBlock";
import HeaderBlock from "./blocks/HeaderBlock";
import MarkdownBlock from "./blocks/MarkdownBlock";
import ErrorMessage from "./ErrorMessage";
import { BLOCK_TYPES } from "../utils/constants";

const LABELS = {
  [BLOCK_TYPES.TEXT]: "Text",
  [BLOCK_TYPES.IMAGE]: "Image",
  [BLOCK_TYPES.HEADER]: "Header",
  [BLOCK_TYPES.MARKDOWN]: "Markdown",
};

function renderBlock(block, editing) {
  switch (block.type) {
    case BLOCK_TYPES.TEXT:
      return <TextBlock block={block} editing={editing} />;
    case BLOCK_TYPES.IMAGE:
      return <ImageBlock block={block} editing={editing} />;
    case BLOCK_TYPES.HEADER:
      return <HeaderBlock block={block} editing={editing} />;
    case BLOCK_TYPES.MARKDOWN:
      return <MarkdownBlock block={block} editing={editing} />;
    default:
      return (
        <ErrorMessage>Unknown block type: {String(block.type)}</ErrorMessage>
      );
  }
}

export default function BlockWrapper({ block }) {
  const [editing, setEditing] = useState(false);
  const { removeBlock } = useBuilder();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
    data: { from: "canvas", type: block.type },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className="group animate-fade-in rounded-2xl border border-border bg-card p-4 shadow-sm transition-base hover:shadow-elegant"
    >
      <header className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="flex h-7 w-7 cursor-grab items-center justify-center rounded-md text-muted-foreground hover:bg-muted active:cursor-grabbing"
            style={{ touchAction: "none" }}
            title="Drag to reorder"
            aria-label="Drag handle"
          >
            ⋮⋮
          </button>
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-secondary-foreground">
            {LABELS[block.type] || "Block"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setEditing((v) => !v)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-base ${
              editing
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            {editing ? "Done" : "✎ Edit"}
          </button>
          <button
            onClick={() => removeBlock(block.id)}
            className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-base hover:bg-destructive hover:text-destructive-foreground"
            title="Delete block"
          >
            🗑
          </button>
        </div>
      </header>
      <div>{renderBlock(block, editing)}</div>
    </article>
  );
}
