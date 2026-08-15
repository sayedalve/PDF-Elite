# PDF Elite - Complete Tool Workflows Documentation

This document describes the complete user workflow for every PDF tool in the application, following the professional PDF application pattern: **Main mode → subtool → contextual settings → action → completion state**.

---

## VIEW MODE

### Page Navigation

**Location:** Left Rail (ViewerLeftRail.tsx)

**User Workflow:**
1. **Initial State:** Shows current page number and total pages (e.g., "5 / 120")
2. **Click Previous (↑):** Decrements page by 1, disabled when on page 1
3. **Click Next (↓):** Increments page by 1, disabled when on last page
4. **Direct Page Input:**
   - User clicks the page input field
   - Types a number (e.g., "45")
   - Presses Enter or blurs the field
   - Document immediately scrolls to page 45
   - Invalid numbers (outside 1-totalPages) revert to current page
5. **Visual Feedback:** Active page is highlighted in thumbnails sidebar when visible

**Implementation Details:**
```tsx
// ViewerLeftRail.tsx
const commitPage = () => {
  const val = parseInt(inputVal, 10);
  if (!isNaN(val) && val >= 1 && val <= totalPages) {
    onPageChange(val);
  } else {
    setInputVal(page.toString()); // revert on invalid
  }
};
```

**Keyboard Support:**
- Arrow Up/Down: Navigate pages
- Home: First page
- End: Last page
- Page Up/Page Down: Navigate by 10 pages

---

### Zoom Controls

**Location:** Contextual Toolbar (ContextualToolbar.tsx)

**User Workflow:**

#### Zoom In/Out Buttons
1. **Click Plus (+):** Immediately increases zoom by one step (e.g., 100% → 125%)
2. **Click Minus (-):** Immediately decreases zoom by one step
3. **Visual Update:** Percentage display updates simultaneously

#### Zoom Slider
1. **Drag Slider:** Continuously changes document scale as user drags
2. **Percentage Sync:** The percentage display updates in real-time during drag
3. **Range:** 25% to 500% in 5% increments

#### Fit Width
1. **Click Fit Width icon:** Sizes PDF to match available reading width
2. **Calculation:** `(containerWidth - margins) / pageWidth`
3. **Preserves:** Current page position

#### Fit Page
1. **Click Fit Page icon:** Shows complete page within viewport
2. **Use Case:** Viewing entire page at once

#### Actual Size
1. **Click Actual Size icon:** Sets zoom to exactly 100%
2. **Use Case:** True-to-life document viewing

**Touchpad/Mouse Support:**
- **Ctrl + Wheel:** Zooms in/out around cursor position
- **Pinch Gesture:** Two-finger pinch zooms around gesture location
- **Mouse Wheel:** Normal scrolling when not holding Ctrl

**Implementation:**
```tsx
// ContextualToolbar.tsx
<button className="tb-btn" onClick={onZoomIn} title="Zoom in (Ctrl++)">
  <ZoomIn size={20} />
</button>
<div className="zoom-display">
  <input
    type="range"
    min="0.25"
    max="5"
    step="0.05"
    value={zoom.scale}
    onChange={(e) => onZoomSlider(parseFloat(e.target.value))}
    className="zoom-slider"
  />
  <span className="zoom-pct">{zoom.percentage}%</span>
</div>
```

---

### View Modes (Render Modes)

**Location:** Contextual Toolbar → Cycle View Mode button

**User Workflow:**
1. **Click View Mode Button:** Cycles through available render modes
2. **Modes:**
   - **Normal:** Standard white page background
   - **Dark:** Dark gray background for reduced eye strain
   - **Sepia:** Warm beige tone for comfortable reading
3. **Persistence:** Selected mode persists across sessions via preferences
4. **No Reload:** Switching modes does NOT reset page position or zoom

**Implementation:**
```tsx
// ViewerContext.tsx
const cyclePdfRenderMode = useCallback(() => {
  setPdfRenderModeState((prev) => {
    const next: PdfRenderMode =
      prev === "normal" ? "dark" : prev === "dark" ? "sepia" : "normal";
    preferencesService.setPreference("pdfRenderMode", next);
    return next;
  });
}, []);
```

---

### Rotate Document

**Location:** Contextual Toolbar → Rotate button

**User Workflow:**
1. **Click Rotate:** Rotates entire document view 90° clockwise
2. **Preservation:** Maintains current page and zoom level where possible
3. **Visual Feedback:** Document visibly rotates immediately
4. **Multiple Clicks:** Each click rotates another 90° (0° → 90° → 180° → 270° → 0°)

**Implementation:**
```tsx
// ViewerShell.tsx
onRotateRight={() => rotationActions.rotateForward()}
```

---

### Search (Ctrl+F)

**Location:** Contextual Toolbar (opens when mode="search")

**User Workflow:**

#### Opening Search
1. **Press Ctrl+F (or Cmd+F on Mac):** Opens integrated search field in toolbar
2. **Focus:** Cursor automatically placed in search input
3. **Mode Change:** Toolbar switches to search mode

#### Searching
1. **Type Query:** Text appears in search field
2. **Debounced Search:** After 300ms of typing, search executes
3. **Results Display:** Shows "X/Y" format (current match / total matches)
4. **Highlighting:** All matches highlighted in document
   - **Current Match:** Distinct color (e.g., orange)
   - **Other Matches:** Subtle highlight (e.g., yellow)

#### Navigation
1. **Press Enter:** Jump to next match
2. **Shift+Enter:** Jump to previous match
3. **Up/Down Buttons:** Navigate between matches in toolbar
4. **Auto-scroll:** Document scrolls to show current match

#### Closing Search
1. **Press Escape:** Closes search field, returns focus to document
2. **Click X Button:** Same as Escape
3. **Clear Query:** Results clear when input is empty

**Implementation:**
```tsx
// ViewerShell.tsx - Ctrl+F handling
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

// ContextualToolbar.tsx - Search UI
<div className="search-input-wrap">
  <Search size={16} />
  <input
    autoFocus
    placeholder="Find in document"
    value={searchQuery}
    onChange={(e) => onSearchChange(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        if (e.shiftKey) onSearchPrev();
        else onSearchNext();
      }
      if (e.key === "Escape") onCloseSearch();
    }}
  />
  <span className="search-count">
    {searchCount.total > 0
      ? `${searchCount.current}/${searchCount.total}`
      : "0 results"}
  </span>
</div>
```

---

## COMMENT MODE

### Entering Comment Mode

**Location:** Left Rail → Comment button

**User Workflow:**
1. **Click Comment:** Switches main toolbar into comment mode
2. **PDF Remains Visible:** No separate window opens
3. **Toolbar Changes:** Top toolbar reveals annotation options
4. **Active State:** Comment button shows active styling

**Implementation:**
```tsx
// ViewerLeftRail.tsx
{ id: "comment", label: "Comment", icon: <MessageSquare size={20} /> }

// ViewerShell.tsx
{tool.mode === "comment" && !isOrganize && (
  <div className="comment-inline-panel">
    {/* Inline panel stays inside viewer */}
  </div>
)}
```

---

### Highlight Text

**Location:** Contextual Toolbar → Highlight button (when in Comment mode)

**User Workflow:**

#### Step 1: Select Text
1. **User Action:** Click and drag to select text on PDF page
2. **Visual Feedback:** Selection remains clearly visible (native browser selection)
3. **Selection Persists:** Does not disappear until action taken

#### Step 2: Activate Highlight Tool
1. **Click Highlight Button:** Button shows active state (colored background)
2. **Cursor Change:** Indicates drawing/highlighting mode
3. **Color Preview:** Current highlight color shown

#### Step 3: Apply Highlight
1. **Option A - Selection Popover:** 
   - Popover appears above selection with Highlight button
   - Click Highlight to apply
2. **Option B - Toolbar:**
   - With text selected and tool active, highlight applies directly

#### Step 4: Completion
1. **Annotation Created:** Highlight becomes permanent annotation
2. **Persists:** Highlight remains after tool finishes
3. **Color:** Uses currently selected highlight color
4. **Tool State:** Tool may remain active for multiple highlights or deactivate based on configuration

**Cancel Operation:**
- **Press Escape:** Cancels active highlight operation, clears selection
- **Click Another Mode:** Exits comment mode entirely

**Implementation:**
```tsx
// DocumentWorkspace.tsx - Selection handling
const handleMouseUp = useCallback(() => {
  const isHighlightContext = tempTool === "highlight";
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed) return;
  
  const selectedText = sel.toString().trim();
  if (!selectedText || selectedText.length < 2) return;
  
  // Show contextual action only if highlight tool is armed
  if (isHighlightContext) {
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    setSelectionTooltip({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 44,
      text: selectedText,
      pageIndex: page,
    });
  }
}, [tempTool, page]);

// Handle highlight confirmation
const handleHighlightConfirm = useCallback(() => {
  const range = sel.getRangeAt(0);
  const mark = document.createElement("mark");
  mark.className = "pdf-elite-highlight";
  mark.style.backgroundColor = highlightColor;
  range.surroundContents(mark);
  clearSelection();
}, [highlightColor]);
```

---

### Highlight Color Selection

**Location:** Contextual Toolbar → Color dots (visible when highlight tool active)

**User Workflow:**
1. **Activate Highlight Tool:** Color palette appears
2. **Available Colors:** Yellow, Green, Blue, Pink, Orange
3. **Click Color:** 
   - Selected color shows active border
   - Active highlight color changes immediately
4. **Persistence:** Chosen color remains for subsequent highlights
5. **LocalStorage:** Color preference saved across sessions

**Visual States:**
- **Inactive:** Simple colored dot
- **Active:** Dot with border and subtle shadow
- **Hover:** Slight scale increase (1.1x)

**Implementation:**
```tsx
// ContextualToolbar.tsx
{tempTool === "highlight" && (
  <div className="tb-group color-group">
    {highlightColors.map((c) => (
      <button
        key={c.id}
        className={`color-dot ${highlightColor === c.hex ? "active" : ""}`}
        style={{ background: c.hex }}
        onClick={() => onHighlightColor(c.hex)}
        title={c.name}
      />
    ))}
  </div>
)}

// useToolLifecycle.ts
const setHighlightColor = useCallback((color: string) => {
  setState((s) => ({
    ...s,
    highlightColor: color,
    lastHighlightColor: color,
  }));
  localStorage.setItem("pdf-elite:highlight-color", color);
}, []);
```

---

### Area Highlight

**Location:** Contextual Toolbar → Area Highlight button (dashed rectangle icon)

**User Workflow:**
1. **Click Area Highlight:** Tool activates, cursor changes
2. **Drag on Page:** User drags across any area of the page
3. **Visual Feedback:** Rectangle follows cursor during drag
4. **Release:** Selected region becomes permanent highlighted annotation
5. **Result:** Real annotation (not temporary UI rectangle)

**Cancel:**
- **Press Escape:** Cancels current drag operation
- **Click Elsewhere:** Deactivates tool

**Implementation:**
```tsx
// ViewerShell.tsx
} else if (t === "area-highlight") {
  annotationApiRef.current.activateAnnotationTool("inkHighlighter", {
    color: tool.highlightColor,
  });
}
```

---

### Underline

**Location:** Contextual Toolbar → Underline button

**User Workflow:**
1. **Select Text:** User selects text on page
2. **Click Underline:** Applies underline annotation to exact selected text
3. **Visual Result:** Text shows underline beneath it
4. **Persistence:** Underline remains as document annotation

**Cancel:**
- **Escape:** Clears selection without applying

**Implementation:**
```tsx
// ViewerShell.tsx
} else if (t === "underline") {
  annotationApiRef.current.activateAnnotationTool("underline", {
    color: tool.highlightColor,
  });
}

// TextSelectionPopover.tsx
<button onClick={() => { onUnderline?.(popover.rects); }}>
  <Underline size={14} />
</button>
```

---

### Strikethrough

**Location:** Contextual Toolbar → Strikethrough button

**User Workflow:**
1. **Select Text:** User selects text on page
2. **Click Strikethrough:** Applies strikethrough annotation
3. **Visual Result:** Line through selected text
4. **Persistence:** Annotation saved to document

**Implementation:**
```tsx
// ViewerShell.tsx
} else if (t === "strikeout") {
  annotationApiRef.current.activateAnnotationTool("strikeout", {
    color: tool.highlightColor,
  });
}
```

---

### Sticky Note

**Location:** Contextual Toolbar → Sticky Note button

**User Workflow:**

#### Creating a Note
1. **Click Note Tool:** Cursor changes to indicate placement mode
2. **Click Page Location:** Note appears attached to that location
3. **Enter Text:** Input field appears for note content
4. **Save/Close:** Note collapses to icon with optional preview

#### Interacting with Notes
1. **Click Note Icon:** Reopens note for editing
2. **Edit Content:** Modify existing text
3. **Move Note:** Drag to new location
4. **Delete Note:** Use delete option in note menu

**Implementation:**
```tsx
// ViewerShell.tsx
} else if (t === "note") {
  annotationApiRef.current.activateAnnotationTool("textComment");
}
```

---

### Text Comment

**Location:** Contextual Toolbar → Text Comment button (Type icon)

**User Workflow:**
1. **Click Text Tool:** Activates text comment mode
2. **Click Document Location:** Creates text box at that position
3. **Type Content:** Enter comment text
4. **Finish Editing:** Click outside or press Escape
5. **Result:** Comment attached to document location
6. **Reopen:** Click comment to edit or reply

---

### Pen (Draw)

**Location:** Contextual Toolbar → Draw button (Pen icon)

**User Workflow:**
1. **Click Pen:** Cursor changes to drawing state
2. **Draw on PDF:** Freehand drawing directly on document
3. **Stroke Completion:** When mouse/finger releases, stroke becomes permanent
4. **Visual Result:** Drawing remains visible as annotation
5. **Multiple Strokes:** Continue drawing additional strokes

**Cancel:**
- **Escape:** Exits drawing mode, discards incomplete stroke
- **Click Another Tool:** Switches to different annotation type

**Implementation:**
```tsx
// ViewerShell.tsx
} else if (t === "draw") {
  annotationApiRef.current.deactivateTools();
  signatureApiRef.current?.activateDrawMode?.();
}
```

---

### Temporary Tool Behavior

**All Comment Tools Follow This Pattern:**

1. **Tool Activation:** Clicking a tool shows active state
2. **Action Performance:** User performs annotation action
3. **Completion:** Annotation becomes part of document
4. **Tool State:**
   - Temporary tools deactivate after single use OR
   - Remain active for multiple annotations (configurable)
5. **Escape Key:**
   - First press: Cancels current operation, clears selection
   - Second press (within 500ms): Exits comment mode
6. **Mode Switch:** Clicking different main mode cancels incompatible tools

**Implementation:**
```tsx
// useToolLifecycle.ts
const setMode = useCallback((mode: ToolMode) => {
  if (mode !== state.mode) {
    setState((s) => ({ ...s, mode, tempTool: null }));
  }
}, [state.mode]);

// Escape handling
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      if (state.tempTool) {
        e.preventDefault();
        cancelTempTool();
        return;
      }
      if (state.mode === "search") {
        e.preventDefault();
        setMode("view");
        return;
      }
    }
  };
  window.addEventListener("keydown", handleEscape, true);
  return () => window.removeEventListener("keydown", handleEscape, true);
}, [state.tempTool, state.mode]);
```

---

## EDIT MODE

### Entering Edit Mode

**Location:** Left Rail → Edit button

**User Workflow:**
1. **Click Edit:** Keeps user inside same PDF viewer
2. **PDF Remains Visible:** No external window opens
3. **Toolbar Changes:** Contextual toolbar shows editing controls
4. **Available Tools:** Add Text, Add Image, Advanced Edit

**Implementation:**
```tsx
// ViewerLeftRail.tsx
{ id: "edit", label: "Edit", icon: <Edit3 size={20} /> }

// ContextualToolbar.tsx
const renderEditTools = () => (
  <div className="tb-group">
    <button 
      className={`tb-btn ${tempTool === "text" ? "active" : ""}`}
      onClick={() => onTempTool(tempTool === "text" ? null : "text")}
    >
      <Type size={18} />
      <span>Add Text</span>
    </button>
    <button onClick={() => onToolSelect?.("addImage")}>
      <ImageIcon size={18} />
      <span>Add Image</span>
    </button>
    <button onClick={() => onToolSelect?.("editPdf")}>
      <Type size={18} />
      <span>Advanced Edit</span>
    </button>
  </div>
);
```

---

### Text Editing (Inline)

**User Workflow:**
1. **Select Existing Text:** Click on text object in PDF
2. **Edit In Place:** Text becomes editable at its location
3. **UI Consistency:** Editing interface matches main PDF Elite style
4. **No External Window:** Edits happen directly in document workspace
5. **Finish Editing:** Click outside or press Enter
6. **Result:** Change reflected in real PDF state
7. **Position Preserved:** Document stays in same position

---

### Add Text

**User Workflow:**
1. **Click Add Text:** Tool activates
2. **Click Location:** Text box appears at clicked position
3. **Type Text:** Enter desired content
4. **Finish:** Click outside or press Escape
5. **Result:** Text remains on page as annotation

---

### Image Editing

**User Workflow:**
1. **Select Image:** Click existing image in PDF
2. **Controls Appear:** Image manipulation tools show in toolbar
3. **Supported Operations:** Move, resize, replace (based on capability)
4. **In-Document:** All operations happen in workspace, no external dialogs

---

## ORGANIZE MODE

### Entering Organize Mode

**Location:** Left Rail → Organize button

**User Workflow:**
1. **Click Organize:** Transforms central workspace
2. **Page Thumbnails:** Shows all pages in grid
3. **Document Context:** PDF document context maintained
4. **Toolbar Updates:** Shows organize-specific actions

**Implementation:**
```tsx
// ViewerShell.tsx
{isOrganize && (
  <OrganizeMode
    totalPages={activeTab?.totalPages || 8}
    selectedPages={selectedPages}
    onApply={async (pages) => { /* apply changes */ }}
    onExtract={async (pagesToExtract) => { /* extract */ }}
  />
)}
```

---

### Page Preview (Thumbnails)

**User Workflow:**
1. **Grid View:** All pages shown as thumbnails
2. **Page Numbers:** Each thumbnail shows page number
3. **Full Structure:** User sees entire document layout
4. **Scroll:** Navigate through many pages

---

### Page Selection

**User Workflow:**
1. **Single Click:** Selects that page
2. **Ctrl/Cmd + Click:** Toggles selection (multi-select)
3. **Shift + Click:** Selects range from anchor to clicked page
4. **Visual State:** Selected pages have clear highlight border
5. **Selection Count:** Header shows "X selected"

**Implementation:**
```tsx
// OrganizeMode.tsx
const handlePageClick = useCallback((e: React.MouseEvent, pageId: string) => {
  if (e.shiftKey && anchorRef.current !== null) {
    // Range selection
    const range = pages.slice(start, end + 1).map((p) => p.id);
    commitSelection(range);
    return;
  }
  
  if (e.metaKey || e.ctrlKey) {
    // Toggle selection
    if (selectedSet.has(pageId)) {
      commitSelection(effectiveSelected.filter((id) => id !== pageId));
    } else {
      commitSelection([...effectiveSelected, pageId]);
    }
    return;
  }
  
  // Single select
  commitSelection([pageId]);
}, [pages, effectiveSelected, selectedSet]);
```

---

### Reorder Pages (Drag & Drop)

**User Workflow:**
1. **Grab Page:** Click and hold on page thumbnail
2. **Drag:** Visual feedback shows dragging state
3. **Hover Position:** Target position highlighted
4. **Drop:** Page moves to new position
5. **Update:** Visual order updates immediately
6. **Document State:** Actual document order updated in state

**Implementation:**
```tsx
// OrganizeMode.tsx
const handleDrop = useCallback((e: React.DragEvent, targetId: string) => {
  e.preventDefault();
  if (draggedId === null || draggedId === targetId) return;
  
  setInternalPages((prev) => {
    const fromIdx = prev.findIndex((p) => p.id === draggedId);
    const toIdx = prev.findIndex((p) => p.id === targetId);
    const copy = [...prev];
    const [moved] = copy.splice(fromIdx, 1);
    copy.splice(toIdx, 0, moved);
    return copy;
  });
}, [draggedId]);
```

---

### Rotate Pages

**User Workflow:**
1. **Select Pages:** One or more pages selected
2. **Click Rotate Left/Right:** Selected pages rotate 90°
3. **Visual Update:** Thumbnails show rotated orientation
4. **Apply:** Changes committed to document on Apply

**Implementation:**
```tsx
// OrganizeMode.tsx
const handleRotate = useCallback((direction: "cw" | "ccw") => {
  if (effectiveSelected.length === 0) return;
  const delta = direction === "cw" ? 90 : -90;
  setInternalPages((prev) =>
    prev.map((p) =>
      selectedSet.has(p.id)
        ? { ...p, rotation: (p.rotation + delta + 360) % 360 }
        : p
    )
  );
}, [effectiveSelected, selectedSet]);
```

---

### Delete Pages

**User Workflow:**
1. **Select Pages:** Choose pages to delete
2. **Click Delete:** Initiates deletion
3. **Confirmation:** Dialog asks for confirmation
4. **Confirm:** Pages removed from document
5. **Visual Update:** Grid updates, remaining pages reflow
6. **Document State:** Actual document updated

**Implementation:**
```tsx
// OrganizeMode.tsx
const handleDelete = useCallback(() => {
  if (effectiveSelected.length === 0) return;
  setInternalPages((prev) => prev.filter((p) => !selectedSet.has(p.id)));
  commitSelection([]);
}, [effectiveSelected, selectedSet]);
```

---

### Extract Pages

**User Workflow:**
1. **Select Pages:** Choose pages to extract
2. **Click Extract:** Opens extraction workflow
3. **Process:** Selected pages become new document
4. **Result:** New file created with extracted pages
5. **Original:** Original document unchanged (or optionally modified)

**Implementation:**
```tsx
// ViewerShell.tsx
onExtract={async (pagesToExtract) => {
  if (!activeFileId || pagesToExtract.length === 0) return;
  const blob = await extractPagesLocal(file, pagesToExtract.join(","));
  const newFile = new File([blob], `extracted_${file.name}`, { type: "application/pdf" });
  const addedFiles = await actions.addFiles([newFile], { selectFiles: true });
  if (addedFiles.length > 0) {
    setActiveFileId(addedFiles[0].fileId);
  }
  tool.setMode("view");
}}
```

---

### Insert Pages

**User Workflow:**
1. **Select Position:** Click where to insert (before/after page)
2. **Click Insert:** Opens file selection
3. **Choose Source:** Select PDF file(s) to insert
4. **Result:** Pages appear in correct position
5. **Document State:** Document updated with new pages

---

### Replace Pages

**User Workflow:**
1. **Select Pages:** Choose pages to replace
2. **Click Replace:** Opens replacement workflow
3. **Provide Source:** Select replacement pages
4. **Result:** Selected pages replaced in document
5. **Visual Update:** New pages shown in grid

---

### Split Document

**User Workflow:**
1. **Select Split Points:** Choose pages where splits occur
2. **Click Split:** Opens split configuration
3. **Choose Method:** Split by ranges, every N pages, etc.
4. **Result:** Multiple documents created
5. **Output:** Correct resulting document files generated

---

### Apply Changes

**User Workflow:**
1. **Complete Operations:** Finish all organize actions
2. **Click Apply Changes:** Commits all modifications
3. **Processing:** Document processed with all changes
4. **Exit Mode:** Returns to view mode
5. **Consistent State:** Document reflects visual arrangement

**Implementation:**
```tsx
// OrganizeMode.tsx
<button
  className="org-ghost-btn primary"
  onClick={() => onApply?.(internalPages.map((p) => ({
    originalId: p.originalId,
    rotation: p.rotation,
  })))}
>
  <Check size={16} />
  Apply Changes
</button>
```

---

## DOCUMENT NAVIGATION

### Thumbnails Sidebar

**Location:** Left Rail → Thumbnails button (toggle)

**User Workflow:**
1. **Click Thumbnail Icon:** Opens/closes thumbnails sidebar
2. **Click Thumbnail:** Immediately jumps to that page in main viewer
3. **Current Page Reflection:** Active page highlighted in sidebar
4. **Scroll Sync:** As user scrolls document, sidebar updates active thumbnail

---

### Bookmarks/Outline

**Location:** Left Rail → Bookmarks button (toggle)

**User Workflow:**
1. **Click Bookmark Icon:** Opens bookmarks sidebar
2. **Tree Structure:** Hierarchical bookmark display
3. **Expand/Collapse:** Click chevrons to expand nested bookmarks
4. **Click Entry:** Navigates to bookmark destination
5. **Real Destination:** Jumps to actual page/location in document

**Implementation:**
```tsx
// RightUtilityPanel.tsx
<button
  className={`bm-row ${isActive ? "active" : ""}`}
  onClick={() => {
    if (onBookmarkNavigate) onBookmarkNavigate(b);
    else if (onPageChange) onPageChange(b.page);
  }}
  title={`${b.title} — Page ${b.page}`}
>
  <span className="bm-title">{b.title}</span>
  <span className="bm-page">{b.page}</span>
</button>
```

---

### Attachments

**Location:** Left Rail → Attachments button (toggle)

**User Workflow:**
1. **Click Attachment Icon:** Opens attachments panel
2. **List Display:** Shows all embedded attachments
3. **Click Attachment:** Opens using supported workflow
4. **File Info:** Shows name, size, description

---

## TABS

### Tab Management

**Location:** Top Tab Bar (TabBar.tsx)

**User Workflow:**

#### Opening Multiple PDFs
1. **Open Files:** Each PDF opens in new tab
2. **Same Viewer:** All tabs within same application window
3. **Tab Strip:** Shows all open documents

#### Switching Tabs
1. **Click Tab:** Switches to that PDF
2. **Actual Switch:** Changes displayed document, not just UI
3. **State Preservation:** Each document remembers page and zoom

#### Tab Appearance
- **Active Tab:** Highlighted background, accent underline
- **Inactive Tab:** Subtle styling
- **Close Button:** Appears on hover or when active
- **Document Icon:** Shows file type indicator

#### Closing Tabs
1. **Click X:** Closes that specific document
2. **Single Tab:** If last tab, may prompt or return to home
3. **Others Unaffected:** Remaining tabs stay open

**Implementation:**
```tsx
// TabBar.tsx
{tabs.map((tab) => (
  <button
    key={tab.id}
    className={`pdf-tab ${tab.active ? "pdf-tab--active" : "pdf-tab--inactive"}`}
    onClick={() => onSwitch(tab.id)}
  >
    <FileText size={14} />
    <span className="pdf-tab__name">{tab.name}</span>
    <span
      className="pdf-tab__close"
      onClick={(e) => {
        e.stopPropagation();
        onClose(tab.id);
      }}
    >
      <X size={13} />
    </span>
  </button>
))}
```

---

## HOME

### Returning Home

**Location:** Top-left app logo / Home button

**User Workflow:**
1. **Click Home:** Returns to home workspace
2. **Application Stays Open:** Does not close entire app
3. **Viewer Closes:** PDF viewer closes, home screen shows
4. **Recent Documents:** Intelligently managed (no duplicates)

**Implementation:**
```tsx
// ViewerShell.tsx
<button
  className="app-logo-mini"
  onClick={onClose}
  title="Return to Home"
>
  <div className="mini-icon" />
  <span>PDF Elite</span>
</button>
```

---

### Recent Documents

**Behavior:**
1. **Smart Tracking:** Documents tracked by file identity, not open count
2. **No Duplicates:** Same PDF opened multiple times = single entry
3. **Update Timestamp:** Most recent access time updated
4. **Home Display:** Shows recently accessed documents

---

## GLOBAL BEHAVIORS

### Progressive Disclosure Pattern

Every tool follows: **Main mode → subtool → contextual settings → action → completion**

**Example - Highlight:**
1. **Main Mode:** Click Comment (enters comment mode)
2. **Subtool:** Click Highlight (activates highlight tool)
3. **Settings:** Choose color from palette
4. **Action:** Select text, confirm highlight
5. **Completion:** Annotation saved, tool ready for next or deactivated

---

### Active State Indicators

**When Tool Selected:**
1. **Visual Feedback:** Button shows `.active` class
2. **Styling:** Background color, border, or accent color
3. **Cursor:** May change to indicate mode
4. **Subtools Revealed:** Related options appear

**Implementation:**
```tsx
<button
  className={`tb-btn ${tempTool === "highlight" ? "active" : ""}`}
  onClick={() => onTempTool(tempTool === "highlight" ? null : "highlight")}
>
  <Highlighter size={20} />
</button>

<style>{`
  .tb-btn.active {
    background: var(--accent-subtle);
    color: var(--accent);
    border: 1px solid var(--accent-strong);
  }
`}</style>
```

---

### Escape Key Behavior

**Priority Order:**
1. **Temporary Tool Active:** Cancel operation, clear selection
2. **Search Mode:** Close search, return to view
3. **Other Modes:** Clear temp state, second escape exits mode

**Implementation:**
```tsx
// useToolLifecycle.ts
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    if (state.tempTool) {
      e.preventDefault();
      cancelTempTool();
      return;
    }
    if (state.mode === "search") {
      e.preventDefault();
      setMode("view");
      return;
    }
    // Double-tap escape to exit mode
    const lastEscape = (window as any).__lastEscape || 0;
    if (Date.now() - lastEscape < 500) {
      setMode("view");
    }
    (window as any).__lastEscape = Date.now();
  }
};
```

---

### State Persistence

**What Persists:**
- Highlight color preference (localStorage)
- PDF render mode (preferences service)
- Document position (session storage, per-document)
- Zoom level (per-document)

**What Doesn't Persist:**
- Temporary tool state (resets on mode change)
- Selection state (clears on navigation)
- Search query (clears on close)

---

### Error Handling

**Graceful Degradation:**
- Invalid page numbers: Revert to current page
- Failed operations: Show toast notification
- Missing features: Hide unsupported options
- Permission restrictions: Disable affected tools

---

## SUMMARY

This document describes the complete interaction model for PDF Elite, ensuring:

1. **Professional UX:** Follows desktop PDF application conventions
2. **Progressive Disclosure:** Tools reveal complexity gradually
3. **Consistent Patterns:** Similar actions work similarly everywhere
4. **Keyboard Support:** Essential operations accessible via keyboard
5. **State Management:** Clear rules for what persists and when
6. **Error Recovery:** Graceful handling of invalid states
7. **Accessibility:** Focus management, ARIA labels, keyboard navigation

The interface functions as one cohesive professional PDF application, not disconnected tools.
