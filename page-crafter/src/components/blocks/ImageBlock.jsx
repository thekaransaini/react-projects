import { useState } from "react";
import { useBuilder } from "../../contexts/BuilderContext";
import ErrorMessage from "../ErrorMessage";

export default function ImageBlock({ block, editing }) {
  const { updateBlock } = useBuilder();
  const url = block?.content?.url ?? "";
  const alt = block?.content?.alt ?? "";
  const [broken, setBroken] = useState(false);

  if (editing) {
    return (
      <div className="flex flex-col gap-2">
        <input
          value={url}
          onChange={(e) => {
            setBroken(false);
            updateBlock(block.id, { url: e.target.value });
          }}
          placeholder="https://example.com/image.jpg"
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-primary/20 focus:ring-2"
        />
        <input
          value={alt}
          onChange={(e) => updateBlock(block.id, { alt: e.target.value })}
          placeholder="Alt text (for accessibility)"
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-primary/20 focus:ring-2"
        />
        {url && !broken ? (
          <img
            src={url}
            alt={alt || "preview"}
            onError={() => setBroken(true)}
            className="max-h-72 w-full rounded-lg border border-border object-cover"
            loading="lazy"
          />
        ) : url ? (
          <ErrorMessage>Could not load image. Check the URL.</ErrorMessage>
        ) : (
          <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">
            Image preview
          </div>
        )}
      </div>
    );
  }

  if (!url)
    return (
      <p className="text-sm italic text-muted-foreground">No image URL set.</p>
    );
  if (broken) return <ErrorMessage>Image failed to load.</ErrorMessage>;
  return (
    <img
      src={url}
      alt={alt || "user image"}
      onError={() => setBroken(true)}
      className="max-h-[480px] w-full rounded-lg border border-border object-cover"
      loading="lazy"
    />
  );
}
