import { useDraggable } from "@dnd-kit/core";
import { PALETTE_ITEMS } from "../utils/constants";
import { useBuilder } from "../contexts/BuilderContext";

function PaletteItem({ item }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${item.type}`,
    data: { from: "palette", type: item.type },
  });
  const { addBlock } = useBuilder();

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ touchAction: "none" }}
      onPointerDown={(e) => {
        e.target.setPointerCapture(e.pointerId);
      }}
      onPointerUp={(e) => {
        if (!isDragging) {
          addBlock(item.type);
        }
      }}
      className={`group flex w-full items-center gap-3 rounded-xl border border-border bg-card p-3 text-left shadow-sm transition-base hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-primary font-display text-sm font-bold text-primary-foreground">
        {item.icon}
      </span>
      <span className="flex-1">
        <span className="block text-sm font-semibold">{item.label}</span>
        <span className="block text-xs text-muted-foreground">
          {item.description}
        </span>
      </span>
      <span className="text-xs text-muted-foreground opacity-0 transition-base group-hover:opacity-100">
        ⋮⋮
      </span>
    </button>
  );
}

export default function Palette() {
  return (
    <aside className="flex h-full flex-col gap-4 border-r border-border/60 bg-gradient-surface p-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Blocks
        </p>
        <h2 className="font-display text-lg font-bold">Palette</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Drag a block onto the canvas, or click to append.
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        {PALETTE_ITEMS.map((item) => (
          <PaletteItem key={item.type} item={item} />
        ))}
      </div>

      <div className="mt-auto rounded-xl border border-dashed border-border/80 p-3 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">Tip</p>
        <p className="mt-1">
          Use the ⋮⋮ handle on a canvas block to reorder. Toggle ✎ to edit, 🗑
          to remove.
        </p>
      </div>
    </aside>
  );
}
