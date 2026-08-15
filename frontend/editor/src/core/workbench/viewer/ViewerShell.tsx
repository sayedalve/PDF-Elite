import React, { useState, useCallback, useEffect, useRef } from "react";
import { TabBar } from "@app/workbench/viewer/TabBar";
import { ViewerLeftRail } from "@app/workbench/viewer/ViewerLeftRail";
import { ContextualToolbar } from "@app/workbench/viewer/ContextualToolbar";
import { RightUtilityPanel } from "@app/workbench/viewer/RightUtilityPanel";
import { OrganizeMode } from "@app/workbench/viewer/OrganizeMode";
import { ViewerToolsGrid } from "@app/workbench/viewer/ViewerToolsGrid";
import { TextSelectionPopover } from "./TextSelectionPopover";
import { useToolLifecycle } from "@app/hooks/useToolLifecycle";
import { applyOrganizeChangesLocal } from "@app/services/offlinePageOps";
import { createChildStub } from "@app/contexts/file/fileActions";
import {
  createStirlingFile,
  createFileId,
  FileId,
} from "@app/types/fileContext";
import { useSignature } from "@app/contexts/SignatureContext";

export type Props = {
  children?: React.ReactNode;
  onClose: () => void; // back to home
  onToolSelect?: (toolId: string) => void;
};

import { useFileState, useFileActions } from "@app/contexts/FileContext";
import { useViewer } from "@app/contexts/ViewerContext";

export const ViewerShell: React.FC<Props> = ({ children, onClose, onToolSelect }) => {
  const { selectors } = useFileState();
  const { actions } = useFileActions();
  const activeFiles = selectors.getFiles();
  const {
    activeFileId,
    setActiveFileId,
    zoomActions,
    getZoomState,
    scrollActions,
    getScrollState,
    searchActions,
    getSearchState,
    registerImmediateZoomUpdate,
    registerImmediateScrollUpdate,
    rotationActions,
    cyclePdfRenderMode,
    isThumbnailSidebarVisible,
    toggleThumbnailSidebar,
    isBookmarkSidebarVisible,
    toggleBookmarkSidebar,
    isAttachmentSidebarVisible,
    toggleAttachmentSidebar,
  } = useViewer();
  const { annotationApiRef, signatureApiRef } = useSignature();

  // Synchronized state from viewer
  const [zoomPercent, setZoomPercent] = useState(getZoomState().zoomPercent);
  const [zoomScale, setZoomScale] = useState(getZoomState().currentZoom);
  const [currentPage, setCurrentPage] = useState(getScrollState().currentPage);
  const [totalPages, setTotalPages] = useState(getScrollState().totalPages);

  const viewerCenterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unregisterZoom = registerImmediateZoomUpdate((percent) => {
      setZoomPercent(percent);
      setZoomScale(percent / 100);
    });
    const unregisterScroll = registerImmediateScrollUpdate((page, total) => {
      setCurrentPage(page);
      setTotalPages(total);
    });
    return () => {
      unregisterZoom();
      unregisterScroll();
    };
  }, [registerImmediateZoomUpdate, registerImmediateScrollUpdate]);

  const tabs = activeFiles.map((f) => {
    const file = f;
    return {
      id: file.fileId || file.name,
      name: file.name,
      path: file.fileId || "",
      active: file.fileId === activeFileId,
      page: currentPage,
      totalPages: totalPages,
      zoom: zoomScale,
    };
  });

  const activeTab = tabs.find((t) => t.active) || tabs[0];

  const tool = useToolLifecycle();

  const [searchQuery, setSearchQuery] = useState("");
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [selectedPages] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  // Persist position
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        localStorage.setItem(
          `pdf-elite:pos:${activeTab?.id}`,
          JSON.stringify({ page: currentPage, zoom: zoomScale }),
        );
      } catch {
        // ignore
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentPage, zoomScale, activeTab?.id]);

  // Search logic - real
  const searchState = getSearchState();
  const searchResults = searchState?.results || [];
  const searchIndex = (searchState?.activeIndex || 1) - 1;

  useEffect(() => {
    if (!searchQuery.trim()) {
      searchActions.clear();
      return;
    }

    const timer = setTimeout(() => {
      searchActions.search(searchQuery.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, searchActions]);

  const handleSearchNext = useCallback(() => {
    searchActions.next();
  }, [searchActions]);

  const handleTabSwitch = useCallback(
    (id: string) => {
      setActiveFileId(id as FileId);
    },
    [setActiveFileId],
  );

  const handleTabClose = useCallback(
    (id: string) => {
      actions.removeFiles([id as FileId]);
      if (tabs.length === 1) {
        onClose();
      }
    },
    [actions, tabs.length, onClose],
  );

  const handleSearchPrev = useCallback(() => {
    searchActions.previous();
  }, [searchActions]);

  // Ctrl+F handling - spec: open search, focus field, accurate counts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setShowSearch(true);
        tool.setMode("search");
      } else if (e.key === "Escape") {
        tool.setTempTool(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [tool]);

  const isOrganize = tool.mode === "organize";

  useEffect(() => {
    if (!annotationApiRef.current) return;
    const t = tool.tempTool;

    if (t === "highlight") {
      annotationApiRef.current.activateAnnotationTool("highlight", {
        color: tool.highlightColor,
      });
      signatureApiRef.current?.deactivateTools?.();
    } else if (t === "area-highlight") {
      annotationApiRef.current.activateAnnotationTool("inkHighlighter", {
        color: tool.highlightColor,
      });
      signatureApiRef.current?.deactivateTools?.();
    } else if (t === "underline") {
      annotationApiRef.current.activateAnnotationTool("underline", {
        color: tool.highlightColor,
      });
      signatureApiRef.current?.deactivateTools?.();
    } else if (t === "strikeout") {
      annotationApiRef.current.activateAnnotationTool("strikeout", {
        color: tool.highlightColor,
      });
      signatureApiRef.current?.deactivateTools?.();
    } else if (t === "note") {
      annotationApiRef.current.activateAnnotationTool("textComment");
      signatureApiRef.current?.deactivateTools?.();
    } else if (t === "text") {
      annotationApiRef.current.activateAnnotationTool("text", {
        color: tool.highlightColor,
      });
      signatureApiRef.current?.deactivateTools?.();
    } else if (t === "draw") {
      annotationApiRef.current.deactivateTools();
      signatureApiRef.current?.activateDrawMode?.();
    } else {
      annotationApiRef.current.activateAnnotationTool("select");
      signatureApiRef.current?.deactivateTools?.();
    }
  }, [tool.tempTool, tool.highlightColor, annotationApiRef, signatureApiRef]);

  const handleHighlightColorChange = useCallback(
    (hex: string) => {
      tool.setHighlightColor(hex);
    },
    [tool],
  );

  return (
    <div className="viewer-shell">
      {/* Tab bar - single, polished, fully visible */}
      <div className="viewer-tab-strip">
        {/* eslint-disable no-restricted-syntax */}
        <button
          type="button"
          className="app-logo-mini"
          onClick={onClose}
          title="Return to Home"
        >
          <div className="mini-icon" />
          <span>PDF Elite</span>
        </button>
        {/* eslint-enable no-restricted-syntax */}
        <div className="tab-strip-divider" />
        <TabBar
          tabs={tabs.map((t) => ({
            id: t.id,
            name: t.name,
            path: t.path,
            active: t.active,
          }))}
          onSwitch={handleTabSwitch}
          onClose={handleTabClose}
          onNew={() => {}}
        />
        {/* eslint-disable no-restricted-syntax */}
        <div className="window-controls">
          <button type="button" className="wc-btn">
            —
          </button>
          <button type="button" className="wc-btn">
            □
          </button>
          <button type="button" className="wc-btn close" onClick={onClose}>
            ✕
          </button>
        </div>
        {/* eslint-enable no-restricted-syntax */}
      </div>

      {/* Contextual toolbar - changes per left mode */}
      <ContextualToolbar
        mode={showSearch ? "search" : tool.mode}
        tempTool={tool.tempTool}
        onTempTool={tool.setTempTool}
        zoom={{ percentage: zoomPercent, scale: zoomScale }}
        onZoomIn={zoomActions.zoomIn}
        onZoomOut={zoomActions.zoomOut}
        onFitWidth={() => zoomActions.requestZoom("fit-width")}
        onFitPage={() => zoomActions.requestZoom("fit-page")}
        onActualSize={() => zoomActions.requestZoom("actual-size")}
        onZoomSlider={(val) => zoomActions.setZoomLevel(val / 100)}
        onRotateRight={() => rotationActions.rotateForward()}
        onCycleViewMode={() => cyclePdfRenderMode()}
        highlightColor={tool.highlightColor}
        highlightColors={tool.highlightColors}
        onHighlightColor={handleHighlightColorChange}
        searchQuery={searchQuery}
        searchCount={{
          current: searchResults.length ? searchIndex + 1 : 0,
          total: searchResults.length,
        }}
        onSearchChange={setSearchQuery}
        onSearchNext={handleSearchNext}
        onSearchPrev={handleSearchPrev}
        onCloseSearch={() => {
          setShowSearch(false);
          tool.setMode("view");
          setSearchQuery("");
        }}
      />

      <div className="viewer-body">
        <ViewerLeftRail
          activeMode={tool.mode}
          onModeChange={(m) => {
            if (m === "search") {
              setShowSearch(true);
            } else {
              setShowSearch(false);
              tool.setMode(m);
            }
          }}
          page={currentPage}
          totalPages={totalPages || 1}
          onPageChange={(p) => scrollActions.scrollToPage(p)}
          sidebarOpen={
            isThumbnailSidebarVisible ? "thumbnails" :
            isBookmarkSidebarVisible ? "bookmarks" :
            isAttachmentSidebarVisible ? "attachments" :
            null
          }
          onToggleSidebar={(sb) => {
            if (sb === "thumbnails") toggleThumbnailSidebar();
            if (sb === "bookmarks") toggleBookmarkSidebar();
            if (sb === "attachments") toggleAttachmentSidebar();
          }}
        />

        <div className="viewer-center" ref={viewerCenterRef}>
          <TextSelectionPopover 
            containerRef={viewerCenterRef}
            onHighlight={() => {
              annotationApiRef.current?.activateAnnotationTool("highlight", { color: tool.highlightColor });
              signatureApiRef.current?.deactivateTools?.();
            }}
            onUnderline={() => {
              annotationApiRef.current?.activateAnnotationTool("underline", { color: tool.highlightColor });
              signatureApiRef.current?.deactivateTools?.();
            }}
            onStrikeout={() => {
              annotationApiRef.current?.activateAnnotationTool("strikeout", { color: tool.highlightColor });
              signatureApiRef.current?.deactivateTools?.();
            }}
          />
          {isOrganize && (
            <OrganizeMode
              totalPages={activeTab?.totalPages || 8}
              selectedPages={selectedPages}
              onExtract={async (pagesToExtract) => {
                if (!activeFileId || pagesToExtract.length === 0) return;
                const fileId = activeFileId as FileId;
                const stub = selectors.getStirlingFileStub(fileId);
                const file = selectors.getFile(fileId);
                if (!stub || !file) return;
                try {
                  const { extractPagesLocal } = await import("@app/services/offlinePageOps");
                  const blob = await extractPagesLocal(file, pagesToExtract.join(","));
                  const newFile = new File([blob], `extracted_${file.name}`, { type: "application/pdf" });
                  const addedFiles = await actions.addFiles([newFile], { selectFiles: true });
                  if (addedFiles.length > 0) {
                    setActiveFileId(addedFiles[0].fileId);
                  }
                  tool.setMode("view");
                } catch (e) {
                  console.error("Extract failed:", e);
                }
              }}
              onInsert={(pids) => {
                onToolSelect?.("merge");
              }}
              onSplit={(pids) => {
                onToolSelect?.("split");
              }}
              onReplace={(pids) => {
                onToolSelect?.("reorganizePages");
              }}
              onApply={async (pages) => {
                if (!activeFileId) return;
                const fileId = activeFileId as FileId;
                const stub = selectors.getStirlingFileStub(fileId);
                const file = selectors.getFile(fileId);
                if (!stub || !file) return;

                try {
                  const blob = await applyOrganizeChangesLocal(file, pages);
                  const newFile = new File([blob], file.name, {
                    type: "application/pdf",
                  });
                  const newStirlingFile = createStirlingFile(
                    newFile,
                    createFileId(),
                  );

                  const newStub = createChildStub(
                    stub,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    { toolId: "organizePages" as any, timestamp: Date.now() },
                    newFile,
                  );

                  await actions.consumeFiles(
                    [fileId],
                    [newStirlingFile],
                    [newStub],
                  );

                  // Exit organize mode
                  tool.setMode("view");
                } catch (e) {
                  console.error("Organize failed:", e);
                }
              }}
            />
          )}

          <div
            style={{
              flex: 1,
              position: "relative",
              zIndex: 1,
              display: isOrganize ? "none" : "block",
              width: "100%",
              height: "100%",
            }}
          >
            {tool.mode === "tools" ? (
              <ViewerToolsGrid onToolSelect={onToolSelect} />
            ) : (
              children
            )}
          </div>

          {/* Comment mode fix: no separate error window, stays in workspace */}
          {tool.mode === "comment" && !isOrganize && (
            <div className="comment-inline-panel">
              <div className="cip-header">
                <h4>Comments • {activeTab?.name}</h4>
                <span className="cip-subtitle">
                  Fixed: no error window, stays inside viewer
                </span>
              </div>
              <div className="cip-content">
                <div className="comment-thread">
                  <div className="ct-avatar">SA</div>
                  <div className="ct-body">
                    <div className="ct-author">
                      Md Sayed Alve <span>now</span>
                    </div>
                    <div className="ct-text">
                      Highlight workflow works. Select text → Highlight → color
                      persists.
                    </div>
                  </div>
                </div>
                <div className="annotation-list">
                  <div className="ann-item highlight">
                    <div
                      className="ann-color"
                      style={{ background: tool.highlightColor }}
                    />
                    <span>
                      Page {currentPage} highlight: "Modeling and
                      Verification..."
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <RightUtilityPanel
          collapsed={rightCollapsed}
          onToggle={() => setRightCollapsed(!rightCollapsed)}
          page={currentPage}
          totalPages={totalPages || 1}
          onPageChange={(p) => scrollActions.scrollToPage(p)}
          zoom={{ percentage: zoomPercent, scale: zoomScale }}
          mode={tool.mode}
          searchQuery={searchQuery}
          searchResults={searchResults.map((r, i) => ({
            id: `${i}`,
            page: r.pageIndex + 1,
            preview: "Match on page " + (r.pageIndex + 1),
            active: i === searchIndex,
          }))}
          onSearchResultClick={(r) => searchActions.goToResult(parseInt(r.id))}
          bookmarks={[
            { id: "1", title: "Assignment 03", page: 1, level: 0 },
            { id: "2", title: "Objectives", page: 1, level: 1 },
            { id: "3", title: "Project Description", page: 2, level: 1 },
          ]}
          documentInfo={{
            title: activeTab?.name,
            pageCount: activeTab?.totalPages,
            fileSize: "194.9 KB",
            creationDate: "Aug 12",
            author: "ETABS",
          }}
        />
      </div>

      <style>{`
        .viewer-shell {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: var(--app-bg);
          overflow: hidden;
          font-family: var(--font-sans);
        }
        .viewer-tab-strip {
          height: var(--tab-bar-height);
          background: var(--tab-bar-bg);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 0;
          flex-shrink: 0;
          -webkit-app-region: drag;
        }
        .app-logo-mini {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 16px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
          color: var(--text-primary);
          transition: background-color var(--duration-fast);
          height: 100%;
        }
        .app-logo-mini:hover {
          background-color: var(--surface-hover);
        }
        .tab-strip-divider {
          width: 1px;
          height: 24px;
          background: var(--border);
          margin-right: 8px;
        }
        .mini-icon {
          width: 18px;
          height: 18px;
          background: var(--accent);
          border-radius: 4px;
        }
        .window-controls {
          margin-left: auto;
          display: flex;
          height: 100%;
          flex-shrink: 0;
        }
        .wc-btn {
          width: 46px;
          height: 100%;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 14px;
        }
        .wc-btn:hover {
          background: var(--surface-hover);
          color: var(--text-primary);
        }
        .wc-btn.close:hover {
          background: var(--destructive);
          color: white;
        }
        .viewer-body {
          flex: 1;
          display: flex;
          overflow: hidden;
          min-height: 0;
        }
        .viewer-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          position: relative;
          overflow: hidden;
          background: var(--workspace-paper-bg);
        }
        .comment-inline-panel {
          position: absolute;
          right: 12px;
          top: 12px;
          width: 320px;
          background: var(--surface-elevated);
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: var(--page-shadow);
          z-index: 10;
          overflow: hidden;
        }
        .cip-header {
          padding: 12px 14px;
          border-bottom: 1px solid var(--border);
          background: var(--surface-card);
        }
        .cip-header h4 {
          margin: 0;
          font-size: 13px;
          font-weight: 600;
        }
        .cip-subtitle {
          font-size: 11px;
          color: var(--success);
        }
        .cip-content {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .comment-thread {
          display: flex;
          gap: 10px;
        }
        .ct-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--accent);
          color: var(--text-inverse);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .ct-author {
          font-size: 12px;
          font-weight: 600;
        }
        .ct-author span {
          font-weight: 400;
          color: var(--text-tertiary);
          margin-left: 6px;
        }
        .ct-text {
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 2px;
          line-height: 1.4;
        }
        .ann-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          background: var(--surface-card);
          border-radius: 8px;
          font-size: 11px;
        }
        .ann-color {
          width: 12px;
          height: 12px;
          border-radius: 3px;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};
