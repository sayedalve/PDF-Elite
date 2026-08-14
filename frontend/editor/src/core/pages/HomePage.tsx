import React, { useState, useCallback, useEffect } from "react";
import { HomePage as EliteHomePage } from "@app/components/home/HomePage";
import { ViewerShell } from "@app/components/viewer/ViewerShell";
import { useRecentDocs } from "@app/hooks/useRecentDocs";
import { useFileActions, useFileState } from "@app/contexts/FileContext";

type AppMode = "home" | "viewer";

export default function HomePage() {
  const { docs, addOrUpdate, remove, toggleStar } = useRecentDocs();
  const { actions } = useFileActions();
  const { state } = useFileState();
  const activeFileId = state.activeFileId;
  
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

  const handleOpenPdf = useCallback((file: File) => {
    const sizeMB = file.size / (1024 * 1024);
    const sizeStr = sizeMB >= 1 ? `${sizeMB.toFixed(1)} MB` : `${(file.size / 1024).toFixed(1)} KB`;
    addOrUpdate({
      name: file.name,
      path: (file as any).path || file.name,
      size: sizeStr,
      sizeBytes: file.size,
    });
    
    actions.addFiles([file]);
  }, [addOrUpdate, actions]);

  const handleOpenDoc = useCallback(async (doc: any) => {
    addOrUpdate({
      name: doc.name,
      path: doc.path,
      size: doc.size,
      sizeBytes: doc.sizeBytes,
    });
    setMode("viewer");
  }, [addOrUpdate]);

  const handleToolClick = useCallback((toolId: string) => {
    if (["edit", "comment", "organize"].includes(toolId)) {
      setMode("viewer");
    }
  }, []);

  return (
    <div className="pdf-elite-app" style={{ width: "100%", height: "100%", overflow: "hidden" }}>
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
        <ViewerShell
          onClose={() => {
            setMode("home");
            if (state.files.length > 0) {
              actions.removeFiles(state.files.map(f => f.fileId));
            }
          }}
        />
      )}
    </div>
  );
}
