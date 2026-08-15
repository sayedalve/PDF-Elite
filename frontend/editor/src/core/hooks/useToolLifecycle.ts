import { useEffect, useState, useCallback, useRef } from "react";

export type ToolMode = "view" | "comment" | "edit" | "organize" | "search" | "tools";
export type TempTool =
  | "highlight"
  | "note"
  | "draw"
  | "select"
  | "area-highlight"
  | "underline"
  | "strikeout"
  | "text"
  | null;

type ToolState = {
  mode: ToolMode;
  tempTool: TempTool;
  highlightColor: string;
  lastHighlightColor: string;
};

const HIGHLIGHT_COLORS = [
  { id: "yellow", hex: "#fef08a", name: "Yellow" },
  { id: "green", hex: "#bbf7d0", name: "Green" },
  { id: "blue", hex: "#bfdbfe", name: "Blue" },
  { id: "pink", hex: "#fbcfe8", name: "Pink" },
  { id: "orange", hex: "#fed7aa", name: "Orange" },
];

export function useToolLifecycle() {
  const [state, setState] = useState<ToolState>({
    mode: "view",
    tempTool: null,
    highlightColor: "#fef08a",
    lastHighlightColor: "#fef08a",
  });

  const previousModeRef = useRef<ToolMode>("view");

  // Remember highlight color across operations
  const setHighlightColor = useCallback((color: string) => {
    setState((s) => ({
      ...s,
      highlightColor: color,
      lastHighlightColor: color,
    }));
    try {
      localStorage.setItem("pdf-elite:highlight-color", color);
    } catch {
      /* ignore */
    }
  }, []);

  // Restore persisted color
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pdf-elite:highlight-color");
      if (saved) {
        setState((s) => ({
          ...s,
          highlightColor: saved,
          lastHighlightColor: saved,
        }));
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setMode = useCallback(
    (mode: ToolMode) => {
      // When switching major modes, cancel temp tools
      if (mode !== state.mode) {
        previousModeRef.current = state.mode;
        setState((s) => ({ ...s, mode, tempTool: null }));
      }
    },
    [state.mode],
  );

  const setTempTool = useCallback((tool: TempTool) => {
    setState((s) => ({ ...s, tempTool: tool }));
  }, []);

  const cancelTempTool = useCallback(() => {
    setState((s) => ({ ...s, tempTool: null }));
  }, []);

  // CRITICAL: Escape handling - cancels temp tool, closes popovers, exits modes
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Priority: temp tool > search > back to view
        if (state.tempTool) {
          e.preventDefault();
          e.stopPropagation();
          cancelTempTool();
          return;
        }

        if (state.mode === "search") {
          e.preventDefault();
          setMode("view");
          return;
        }

        // If in comment/edit/organize, maybe go back to view? But keep mode, just clear temp
        // Spec says Escape must behave predictably
        if (state.mode !== "view") {
          // For now, clear temp and stay in mode - user can press again to go to view if needed
          // Actually spec: Escape cancels current temporary operation, clear selection, close popovers, exit temp tool state
          // So we don't switch mode on first Escape unless it's search
          // Second Escape could go to view - implement double-escape
          const lastEscape = (window as any).__lastEscape || 0;
          const now = Date.now();
          if (now - lastEscape < 500) {
            setMode("view");
          }
          (window as any).__lastEscape = now;
        }
      }
    };

    // Use capture to ensure we get Escape before other handlers
    window.addEventListener("keydown", handleEscape, true);
    return () => window.removeEventListener("keydown", handleEscape, true);
  }, [state.tempTool, state.mode, cancelTempTool, setMode]);

  // Clicking another major mode must cancel incompatible temp modes (handled in setMode)
  // Also clicking outside should cancel? That's UI-specific

  return {
    ...state,
    setMode,
    setTempTool,
    cancelTempTool,
    setHighlightColor,
    highlightColors: HIGHLIGHT_COLORS,
    isHighlightActive: state.tempTool === "highlight",
  };
}
