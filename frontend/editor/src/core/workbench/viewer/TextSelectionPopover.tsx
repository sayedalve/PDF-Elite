import React, { useEffect, useState, RefObject } from "react";
import { Highlighter, Type, Scissors, Strikethrough, Underline } from "lucide-react";

type PopoverState = {
  visible: boolean;
  x: number;
  y: number;
  rects: DOMRect[];
  text: string;
};

type TextSelectionPopoverProps = {
  containerRef: RefObject<HTMLElement | null>;
  onHighlight?: (rects: DOMRect[], color?: string) => void;
  onUnderline?: (rects: DOMRect[], color?: string) => void;
  onStrikeout?: (rects: DOMRect[], color?: string) => void;
};

export const TextSelectionPopover: React.FC<TextSelectionPopoverProps> = ({
  containerRef,
  onHighlight,
  onUnderline,
  onStrikeout,
}) => {
  const [popover, setPopover] = useState<PopoverState>({
    visible: false,
    x: 0,
    y: 0,
    rects: [],
    text: "",
  });

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = document.getSelection();
      if (!selection || selection.isCollapsed || !containerRef.current) {
        setPopover((p) => (p.visible ? { ...p, visible: false } : p));
        return;
      }

      // Check if selection is inside our container
      if (!containerRef.current.contains(selection.anchorNode)) {
        return;
      }

      const text = selection.toString().trim();
      if (!text) {
        setPopover((p) => (p.visible ? { ...p, visible: false } : p));
        return;
      }

      const range = selection.getRangeAt(0);
      const rects = Array.from(range.getClientRects());
      if (rects.length === 0) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const firstRect = rects[0];

      // Position above the first rect
      setPopover({
        visible: true,
        x: firstRect.left - containerRect.left + (firstRect.width / 2),
        y: firstRect.top - containerRect.top - 10,
        rects,
        text,
      });
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    // Also listen to mouseup in case selectionchange is flaky
    document.addEventListener("mouseup", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("mouseup", handleSelectionChange);
    };
  }, [containerRef]);

  if (!popover.visible) return null;

  return (
    <div
      className="text-selection-popover"
      style={{
        left: popover.x,
        top: popover.y,
      }}
      onMouseDown={(e) => {
        // Prevent selection clearing
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button onClick={() => { onHighlight?.(popover.rects); setPopover(p => ({...p, visible: false})) }} title="Highlight">
        <Highlighter size={14} />
      </button>
      <button onClick={() => { onUnderline?.(popover.rects); setPopover(p => ({...p, visible: false})) }} title="Underline">
        <Underline size={14} />
      </button>
      <button onClick={() => { onStrikeout?.(popover.rects); setPopover(p => ({...p, visible: false})) }} title="Strikeout">
        <Strikethrough size={14} />
      </button>
      <div className="divider" />
      <button onClick={() => { navigator.clipboard.writeText(popover.text); setPopover(p => ({...p, visible: false})) }} title="Copy Text">
        <Type size={14} />
      </button>

      <style>{`
        .text-selection-popover {
          position: absolute;
          transform: translate(-50%, -100%);
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--surface-floating, #1e293b);
          border: 1px solid var(--border-light, rgba(255,255,255,0.1));
          padding: 4px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 100;
          animation: pop-up 0.15s ease-out forwards;
        }
        .text-selection-popover::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 5px 5px 0 5px;
          border-style: solid;
          border-color: var(--surface-floating, #1e293b) transparent transparent transparent;
        }
        .text-selection-popover button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 4px;
          border: none;
          background: transparent;
          color: white;
          cursor: pointer;
          transition: background 0.1s;
        }
        .text-selection-popover button:hover {
          background: rgba(255,255,255,0.15);
        }
        .text-selection-popover .divider {
          width: 1px;
          height: 16px;
          background: rgba(255,255,255,0.2);
          margin: 0 2px;
        }
        @keyframes pop-up {
          from { opacity: 0; transform: translate(-50%, -80%) scale(0.95); }
          to { opacity: 1; transform: translate(-50%, -100%) scale(1); }
        }
      `}</style>
    </div>
  );
};
