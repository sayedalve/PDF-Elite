/* eslint-disable */
import React, { useState, useCallback, useEffect } from "react";
import { HomePage as EliteHomePage } from "@app/components/home/HomePage";
import { ViewerShell } from "@app/components/viewer/ViewerShell";
import Viewer from "@app/components/viewer/Viewer";
import { useRecentDocs } from "@app/hooks/useRecentDocs";
import { useFileActions, useFileState } from "@app/contexts/FileContext";
import { useViewer } from "@app/contexts/ViewerContext";

type AppMode = "home" | "viewer";

export default function HomePage() {
  const { docs, addOrUpdate, remove, toggleStar } = useRecentDocs();
  const { actions } = useFileActions();
  const { activeFileId, setActiveFileId } = useViewer();

  const [mode, setMode] = useState<AppMode>(activeFileId ? "viewer" : "home");
  const [activeView, setActiveView] = useState("recent");

  // Keep mode in sync with activeFileId
  useEffect(() => {
    if (activeFileId) {
      setMode("viewer");
    } else {
      setMode("home");
    }
  }, [activeFileId]);

  const handleOpenPdf = useCallback(
    (file: File) => {
      const sizeMB = file.size / (1024 * 1024);
      const sizeStr =
        sizeMB >= 1
          ? `${sizeMB.toFixed(1)} MB`
          : `${(file.size / 1024).toFixed(1)} KB`;
      addOrUpdate({
        name: file.name,
        path: (file as any).path || file.name,
        size: sizeStr,
        sizeBytes: file.size,
      });

      actions.addFiles([file]);
    },
    [addOrUpdate, actions],
  );

  const handleOpenDoc = useCallback(
    async (doc: any) => {
      try {
        await actions.loadPersistedFiles([doc.id]);
        setActiveFileId(doc.id);
        setMode("viewer");
      } catch (error) {
        console.error("Failed to load recent doc:", error);
      }
    },
    [actions, setActiveFileId],
  );

  const handleToolClick = useCallback((toolId: string) => {
    if (["edit", "comment", "organize"].includes(toolId)) {
      setMode("viewer");
    }
  }, []);

  return (
    <div
      className="pdf-elite-app"
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    >
      {mode === "home" ? (
        <EliteHomePage
          docs={docs}
          onOpenPdf={handleOpenPdf}
          onOpenDoc={handleOpenDoc}
          onRemove={remove}
          onToggleStar={toggleStar}
          onToolClick={handleToolClick}
          activeView={activeView}
          onNavigate={setActiveView}
        />
      ) : (
        <Viewer
          onClose={() => {
            setMode("home");
            setActiveFileId(null);
            if (state.files.ids.length > 0) {
              actions.removeFiles(state.files.ids);
            }
          }}
        />
      )}
    </div>
  );
}
