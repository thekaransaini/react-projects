import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useBuilder } from "../contexts/BuilderContext";
import BlockWrapper from "./BlockWrapper";

export default function Canvas() {
  const { blocks } = useBuilder();
  const { setNodeRef, isOver } = useDroppable({ id: "canvas-droppable" });

  return (
    <section className="h-full overflow-y-auto bg-background p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Workspace
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Your page
            </h2>
          </div>
          <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            {blocks.length} block{blocks.length === 1 ? "" : "s"}
          </span>
        </div>

        <div
          ref={setNodeRef}
          className={`min-h-[60vh] rounded-2xl border-2 border-dashed p-4 transition-base ${
            isOver ? "border-primary bg-primary/5" : "border-border bg-card/40"
          }`}
        >
          {blocks.length === 0 ? (
            <div className="flex h-[50vh] flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary text-2xl text-primary-foreground shadow-glow">
                ✨
              </div>
              <h3 className="font-display text-xl font-semibold">
                Start crafting
              </h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Drag a block from the palette on the left, or click any block to
                append it here.
              </p>
            </div>
          ) : (
            <SortableContext
              items={blocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-4">
                {blocks.map((block) => (
                  <BlockWrapper key={block.id} block={block} />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      </div>
    </section>
  );
}
