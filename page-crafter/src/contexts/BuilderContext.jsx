import { createContext, useCallback, useContext, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { DEFAULT_CONTENT, STORAGE_KEY } from "../utils/constants";

const BuilderContext = createContext(null);

export function BuilderProvider({ children }) {
  const [blocks, setBlocks] = useLocalStorage(STORAGE_KEY, []);

  const addBlock = useCallback(
    (type, index) => {
      if (!DEFAULT_CONTENT[type]) return;
      const newBlock = {
        id: uuidv4(),
        type,
        content: { ...DEFAULT_CONTENT[type] },
      };
      setBlocks((prev) => {
        const next = [...prev];
        if (typeof index === "number" && index >= 0 && index <= next.length) {
          next.splice(index, 0, newBlock);
        } else {
          next.push(newBlock);
        }
        return next;
      });
      return newBlock.id;
    },
    [setBlocks],
  );

  const updateBlock = useCallback(
    (id, partialContent) => {
      setBlocks((prev) =>
        prev.map((b) =>
          b.id === id
            ? { ...b, content: { ...b.content, ...partialContent } }
            : b,
        ),
      );
    },
    [setBlocks],
  );

  const removeBlock = useCallback(
    (id) => setBlocks((prev) => prev.filter((b) => b.id !== id)),
    [setBlocks],
  );

  const moveBlock = useCallback(
    (fromIndex, toIndex) => {
      setBlocks((prev) => {
        if (fromIndex === toIndex) return prev;
        const next = [...prev];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        return next;
      });
    },
    [setBlocks],
  );

  const clearAll = useCallback(() => setBlocks([]), [setBlocks]);

  const value = useMemo(
    () => ({ blocks, addBlock, updateBlock, removeBlock, moveBlock, clearAll }),
    [blocks, addBlock, updateBlock, removeBlock, moveBlock, clearAll],
  );

  return (
    <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
  );
}

export function useBuilder() {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error("useBuilder must be used inside <BuilderProvider>");
  return ctx;
}
