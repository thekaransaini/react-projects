import { useBuilder } from "../../contexts/BuilderContext";

export default function TextBlock({ block, editing }) {
  const { updateBlock } = useBuilder();
  const text = block?.content?.text ?? "";

  if (editing) {
    return (
      <textarea
        value={text}
        onChange={(e) => updateBlock(block.id, { text: e.target.value })}
        rows={4}
        className="w-full resize-y rounded-lg border border-input bg-background p-3 text-sm leading-relaxed outline-none ring-primary/20 transition-base focus:ring-2"
        placeholder="Write your paragraph..."
      />
    );
  }
  return (
    <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-foreground/90">
      {text || (
        <span className="text-muted-foreground italic">Empty text block</span>
      )}
    </p>
  );
}
