import React, { useState, useEffect } from "react";
import { Eye, MessageSquare, Edit3, LayoutGrid, Wrench, Menu, Bookmark, Paperclip } from "lucide-react";
import type { ToolMode } from "@app/hooks/useToolLifecycle";

type Props = {
  activeMode: ToolMode;
  onModeChange: (mode: ToolMode) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  // Sidebars
  sidebarOpen: "thumbnails" | "bookmarks" | "attachments" | null;
  onToggleSidebar: (sidebar: "thumbnails" | "bookmarks" | "attachments") => void;
};

const modes: { id: ToolMode; label: string; icon: React.ReactNode }[] = [
  { id: "view", label: "View", icon: <Eye size={20} /> },
  { id: "comment", label: "Comment", icon: <MessageSquare size={20} /> },
  { id: "edit", label: "Edit", icon: <Edit3 size={20} /> },
  { id: "organize", label: "Organize", icon: <LayoutGrid size={20} /> },
  { id: "tools", label: "Tools", icon: <Wrench size={20} /> },
];

export const ViewerLeftRail: React.FC<Props> = ({
  activeMode,
  onModeChange,
  page,
  totalPages,
  onPageChange,
  sidebarOpen,
  onToggleSidebar,
}) => {
  const [inputVal, setInputVal] = useState(page.toString());

  useEffect(() => {
    setInputVal(page.toString());
  }, [page]);

  const commitPage = () => {
    const val = parseInt(inputVal, 10);
    if (!isNaN(val) && val >= 1 && val <= totalPages) {
      onPageChange(val);
    } else {
      setInputVal(page.toString()); // revert on invalid
    }
  };

  return (
    <div className="viewer-left-rail">
      {/* eslint-disable no-restricted-syntax */}
      <div className="rail-modes">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`rail-btn ${activeMode === m.id ? "active" : ""}`}
            onClick={() => onModeChange(m.id)}
            title={m.label}
          >
            <span className="rail-icon">{m.icon}</span>
            <span className="rail-label">{m.label}</span>
          </button>
        ))}
      </div>

      <div className="rail-divider" />

      <div className="rail-modes" style={{ marginTop: 'auto', marginBottom: '8px' }}>
        <button
          type="button"
          className={`rail-btn ${sidebarOpen === "thumbnails" ? "active" : ""}`}
          onClick={() => onToggleSidebar("thumbnails")}
          title="Thumbnails"
        >
          <span className="rail-icon"><Menu size={18} /></span>
        </button>
        <button
          type="button"
          className={`rail-btn ${sidebarOpen === "bookmarks" ? "active" : ""}`}
          onClick={() => onToggleSidebar("bookmarks")}
          title="Bookmarks"
        >
          <span className="rail-icon"><Bookmark size={18} /></span>
        </button>
        <button
          type="button"
          className={`rail-btn ${sidebarOpen === "attachments" ? "active" : ""}`}
          onClick={() => onToggleSidebar("attachments")}
          title="Attachments"
        >
          <span className="rail-icon"><Paperclip size={18} /></span>
        </button>
      </div>

      <div className="rail-page-nav" style={{ marginTop: 0 }}>
        <button
          type="button"
          className="page-nav-btn"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
        >
          ↑
        </button>
        <div className="page-indicator">
          <input
            className="page-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onBlur={commitPage}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                commitPage();
                e.currentTarget.blur();
              }
            }}
            onFocus={(e) => e.target.select()}
            title="Type page number and press Enter"
          />
          <span className="page-sep">/</span>
          <span className="page-total">{totalPages}</span>
        </div>
        <button
          type="button"
          className="page-nav-btn"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
        >
          ↓
        </button>
      </div>
      {/* eslint-enable no-restricted-syntax */}

      <style>{`
        .viewer-left-rail {
          width: var(--viewer-left-rail-width);
          background: var(--viewer-left-rail-bg);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 12px 0;
          gap: 8px;
          flex-shrink: 0;
        }
        .rail-modes {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 100%;
          padding: 0 8px;
        }
        .rail-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 10px 4px;
          border-radius: 10px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-out);
          width: 100%;
        }
        .rail-btn:hover {
          background: var(--surface-hover);
          color: var(--text-primary);
        }
        .rail-btn.active {
          background: var(--surface-selected);
          color: var(--text-primary);
        }
        .rail-btn.active .rail-icon {
          color: var(--accent);
        }
        .rail-icon {
          display: flex;
        }
        .rail-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2px;
        }
        .rail-divider {
          width: 32px;
          height: 1px;
          background: var(--border);
          margin: 8px 0;
        }
        .rail-page-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          margin-top: auto;
          background: var(--surface-elevated);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 8px 6px;
        }
        .page-nav-btn {
          width: 32px;
          height: 24px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }
        .page-nav-btn:hover:not(:disabled) {
          background: var(--surface-hover);
          color: var(--text-primary);
        }
        .page-nav-btn:disabled {
          opacity: 0.4;
          cursor: default;
        }
        .page-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 11px;
          line-height: 1.2;
          font-variant-numeric: tabular-nums;
        }
        .page-input {
          width: 32px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 11px;
          text-align: center;
          padding: 2px 0;
          margin-bottom: 2px;
        }
        .page-input:focus {
          outline: 1px solid var(--accent);
          border-color: var(--accent);
        }
        .page-sep, .page-total {
          color: var(--text-tertiary);
          font-size: 10px;
        }
      `}</style>
    </div>
  );
};
