import { useMemo } from "react";
import { marked } from "marked";
import { useBuilder } from "../../contexts/BuilderContext";

marked.setOptions({ gfm: true, breaks: true });

export default function MarkdownBlock({ block, editing }) {
  const { updateBlock } = useBuilder();
  const md = block?.content?.md ?? "";

  const html = useMemo(() => {
    try {
      return marked.parse(md || "");
    } catch {
      return "<p><em>Invalid markdown</em></p>";
    }
  }, [md]);

  if (editing) {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        <textarea
          value={md}
          onChange={(e) => updateBlock(block.id, { md: e.target.value })}
          rows={8}
          className="min-h-[180px] w-full resize-y rounded-lg border border-input bg-background p-3 font-mono text-xs leading-relaxed outline-none ring-primary/20 transition-base focus:ring-2"
          placeholder="# Markdown supported"
        />
        <div
          className="md-preview min-h-[180px] rounded-lg border border-border bg-muted/40 p-3 text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  }

  return (
    <div
      className="md-preview text-[15px]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
