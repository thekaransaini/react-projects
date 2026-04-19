export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex items-center gap-3 text-muted-foreground text-sm">
      <span className="h-4 w-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      <span>{label}</span>
    </div>
  );
}
