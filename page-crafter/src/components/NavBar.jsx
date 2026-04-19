import { useBuilder } from "../contexts/BuilderContext";
import { toast } from "sonner";

export default function NavBar() {
  const { blocks, clearAll } = useBuilder();

  const handleClear = () => {
    if (blocks.length === 0) {
      toast("Canvas is already empty");
      return;
    }
    if (window.confirm("Clear the entire page? This cannot be undone.")) {
      clearAll();
      toast.success("Page cleared");
    }
  };

  const handleSave = () => {
    toast.success("Page saved", {
      description: `${blocks.length} block(s) stored locally.`,
    });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <span className="font-display text-lg font-bold text-primary-foreground">
              P
            </span>
          </div>
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight">
              PageCrafter
            </h1>
            <p className="text-xs text-muted-foreground -mt-0.5">
              Dynamic content builder
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            className="rounded-lg border border-border bg-secondary px-3.5 py-2 text-sm font-medium text-secondary-foreground transition-base hover:bg-muted"
          >
            Clear page
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant transition-base hover:shadow-glow"
          >
            Save page
          </button>
        </div>
      </div>
    </header>
  );
}
