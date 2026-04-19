import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { BuilderProvider, useBuilder } from "@/contexts/BuilderContext";
import NavBar from "@/components/NavBar";
import Palette from "@/components/Palette";
import Canvas from "@/components/Canvas";

function Builder() {
  const { blocks, addBlock, moveBlock } = useBuilder();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const fromPalette = active.data?.current?.from === "palette";
    const overId = String(over.id);

    if (fromPalette) {
      const type = active.data?.current?.type as string;
      if (overId === "canvas-droppable") {
        addBlock(type);
      } else {
        const overIndex = blocks.findIndex((b) => b.id === overId);
        addBlock(type, overIndex === -1 ? undefined : overIndex);
      }
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        const reordered = arrayMove(blocks, oldIndex, newIndex);
        moveBlock(oldIndex, newIndex);
        void reordered;
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex min-h-screen flex-col bg-background">
        <NavBar />
        <main className="grid flex-1 grid-cols-1 lg:grid-cols-[300px_1fr]">
          <Palette />
          <Canvas />
        </main>
      </div>
    </DndContext>
  );
}

const Index = () => (
  <BuilderProvider>
    <Builder />
  </BuilderProvider>
);

export default Index;
