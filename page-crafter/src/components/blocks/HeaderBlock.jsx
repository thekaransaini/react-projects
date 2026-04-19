import { useBuilder } from "../../contexts/BuilderContext";

const SIZES = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-semibold",
};

export default function HeaderBlock({ block, editing }) {
  const { updateBlock } = useBuilder();
  const level = block?.content?.level ?? "h1";
  const text = block?.content?.text ?? "";

  if (editing) {
    return (
      <div className="flex flex-col gap-2 sm:flex-row">
        <select
          value={level}
          onChange={(e) => updateBlock(block.id, { level: e.target.value })}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-primary/20 focus:ring-2"
        >
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
        </select>
        <input
          value={text}
          onChange={(e) => updateBlock(block.id, { text: e.target.value })}
          placeholder="Headline text"
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-primary/20 focus:ring-2"
        />
      </div>
    );
  }

  const Tag = ["h1", "h2", "h3"].includes(level) ? level : "h1";
  return (
    <Tag className={`${SIZES[Tag]} font-display tracking-tight`}>
      {text || (
        <span className="text-muted-foreground italic">Empty header</span>
      )}
    </Tag>
  );
}
