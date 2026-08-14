# PDF VIEWER UI/UX SKILL
## Professional Desktop PDF Viewer Design Intelligence

A specialized, self-contained design skill for AI agents designing or redesigning **professional desktop PDF viewers and PDF reading applications**. Extracted and adapted from the UI UX Pro Max universal design knowledge base, filtered exclusively for desktop document viewing contexts.

---

## How To Use This File

### For AI Models

1. Read this file as part of your system prompt or project context.
2. When a user requests PDF viewer UI/UX work, follow the **Design Decision Pipeline** (Section 28).
3. Use the **Master Design System** template (Section 29) before implementing any UI.
4. Apply **Anti-Patterns** (Section 27) as a filter before delivering any design.
5. Run the **Quality Checklist** (Section 30) before considering work complete.
6. This file is self-contained. You do not need the universal source file.

---

## 1. Specialized AI Operating Instructions

### 1.1 Fundamental Rules (PDF Viewer Specialization)

These rules adapt the universal design operating principles specifically for professional desktop PDF viewing software.

**Understand before designing.** Always identify the viewer's purpose (reading, annotation, review, presentation), target users (knowledge workers, researchers, legal professionals, students), platform (Windows, macOS, Linux, cross-platform), and rendering technology (native, web-based, hybrid) before selecting any visual style.

**Prioritize reading over decoration.** The PDF document is the product. Every design decision must serve the act of reading, navigating, and understanding document content. Visual decoration that does not serve reading is noise.

**Keep the document visually dominant.** The document workspace must occupy the largest visual area. Application chrome (toolbars, panels, tabs) must support the document, never compete with it. If chrome draws more visual attention than the document, the design has failed.

**Use a consistent design language.** Pick one primary visual style (see Section 8). Apply it consistently across toolbars, panels, tabs, dialogs, and the workspace. Do not mix unrelated visual languages within a single viewer.

**Create a coherent design system before implementation.** Before writing any UI code, establish: style direction, semantic color tokens, typography scale, spacing scale, density parameters, component specifications, and interaction state definitions. (See Section 29.)

**Use semantic design tokens.** Never hardcode hex values per screen. Define tokens like `--viewer-bg`, `--toolbar-bg`, `--surface-elevated`, `--text-primary`, `--accent-focus` and reference them everywhere. This enables theming (light/dark/sepia) without rewriting components.

**Prefer usability over decoration.** A PDF viewer is a productivity tool. Usable beats beautiful. Every control must be discoverable, every state must be visible, every interaction must have feedback.

**Preserve consistency across the entire viewer.** Toolbar icon sizes, panel spacing, tab heights, font sizes, and interaction patterns must be uniform. Inconsistency in a document viewer creates cognitive friction during long reading sessions.

**Consider accessibility from the beginning.** PDF viewers serve users who depend on screen readers, keyboard navigation, and high contrast. Accessibility is not a post-hoc audit. It is a design constraint from the first wireframe.

**Consider performance from the beginning.** PDF viewers handle large documents (hundreds of pages, embedded images, complex vector graphics). Every design decision must account for rendering cost, memory usage, and interaction responsiveness.

**Use production-practical designs.** Prefer implementable, stable UI over fragile visual effects. A PDF viewer must work reliably across document sizes, display densities, OS themes, and accessibility settings. Decorative effects that break under these conditions are unacceptable.

### 1.2 Workflow Rules (PDF Viewer Specialization)

- **Always generate a viewer design system first** before implementing any component.
- **Use hierarchical architecture:** Global viewer design system + per-area overrides (toolbar, workspace, panels). Overrides document only deviations.
- **Resolve color mode early.** If the viewer targets dark mode, professional users, or long reading sessions, select the appropriate palette immediately.
- **Check anti-patterns last.** Verify final design against Section 27 before delivery.
- **Pre-delivery verification.** Run the full quality checklist (Section 30).

### 1.3 Forbidden Actions (PDF Viewer Context)

- Never use emojis as UI icons. Use SVG icons from a consistent icon family.
- Never omit `cursor: pointer` on clickable elements.
- Never create layout-shifting hover effects on toolbars or tabs.
- Never use low-contrast text. Maintain 4.5:1 minimum for all UI text.
- Never use instant state changes. Always use 100–200ms transitions.
- Never create invisible focus states. Keyboard users must always see where they are.
- Never ignore `prefers-reduced-motion`.
- Never hardcode per-screen hex values. Use semantic color tokens.
- Never randomly combine unrelated visual styles within one viewer.
- Never treat the PDF viewer toolbar as a PDF editing toolbar. This is a viewer.
- Never make the document workspace smaller than necessary to accommodate chrome.
- Never open separate windows for interactions that belong in the main viewer.

---

## 2. PDF Viewer Product Category

### 2.1 Category Definition

**Product Type:** Professional Desktop PDF Viewer

**Category Characteristics:**
- Document-focused (the PDF is the primary object)
- Reading-focused (long sessions, sustained attention)
- Productivity-focused (knowledge workers, professionals)
- Desktop-oriented (mouse, keyboard, touchpad, multi-window)
- Information-dense but not dashboard-dense (structured chrome, not data grids)
- Navigation-heavy (pages, bookmarks, outline, search, tabs)
- Interaction-heavy (scroll, zoom, pan, select, navigate)
- Performance-sensitive (large documents, smooth rendering)
- Typography-sensitive (document rendering, UI readability)

### 2.2 Design Characteristics Appropriate to This Category

A professional PDF viewer is fundamentally a **reading environment**. Its design must:

1. **Maximize document visibility.** The workspace is the hero.
2. **Minimize cognitive overhead.** Users think about the document, not the interface.
3. **Support sustained focus.** Low visual noise, calm colors, consistent layout.
4. **Enable fast navigation.** Pages, sections, bookmarks, search results.
5. **Preserve context.** Document position, zoom level, panel state survive interactions.
6. **Respect professional aesthetics.** Clean, competent, trustworthy appearance.

### 2.3 What a PDF Viewer Is NOT

- It is not a PDF editor (no heavy annotation toolbars, no form-building UI)
- It is not a dashboard (no data cards, no KPI grids)
- It is not a marketing website (no hero sections, no CTAs, no conversion funnels)
- It is not a mobile app (no bottom navigation bars, no hamburger menus as primary nav)
- It is not a creative portfolio (no experimental layouts, no artistic chrome)

---

## 3. Design Style Intelligence

### 3.1 Evaluation Criteria for PDF Viewer Styles

Styles are evaluated against these criteria, weighted for document viewing:

| Criterion | Weight | Rationale |
|-----------|--------|-----------|
| Readability | Critical | Long reading sessions demand clarity |
| Desktop productivity fit | Critical | Must feel native to desktop workflows |
| Document focus | Critical | Chrome must not compete with content |
| Navigation clarity | High | Complex document structures need clear UI |
| Low distraction | High | Sustained attention requires calm visuals |
| Professional appearance | High | Trust and competence signals |
| Performance | High | No expensive rendering in chrome |
| Accessibility | High | WCAG AA minimum, keyboard-first |

### 3.2 Recommended Styles (with Rationale)

**Primary: Refined Minimalism (adapted from source's Minimalism & Swiss Style)**

Why it fits:
- Clean, spacious, functional — lets the document dominate
- Grid-based structure supports consistent toolbar/panel layout
- High contrast type hierarchy supports readable UI labels
- No unnecessary decoration — nothing competes with the PDF
- Excellent performance (no gradients, blur, or complex effects)
- WCAG AAA achievable

Implementation notes for PDF viewers:
- Use 1px borders for panel separation, not shadows
- Subtle background color shifts (workspace vs. chrome) define hierarchy
- Single accent color for focus/selection states
- No rounded corners on workspace panels (professional sharpness) or subtle 4–6px radius on controls

**Secondary: Professional Flat Design (adapted from source's Flat Design)**

Why it fits:
- Bold colors without gradients/shadows keeps rendering fast
- Clear icon-centric toolbars are immediately scannable
- Cross-platform consistency (no OS-specific effects)
- Simple hover/active states (color shift, no layout change)
- Excellent for dense toolbar UI

Implementation notes for PDF viewers:
- 4–6 solid colors maximum in the UI palette
- Icon-heavy toolbar with clear active/disabled states
- Fast 150–200ms transitions on state changes
- No shadows on toolbar buttons (use background color change)

**Tertiary: Subtle Depth / Dimensional Layering (use sparingly)**

Why it fits (in limited use):
- Page shadows in the workspace give documents a physical presence
- Panel elevation (1–2 levels) separates chrome from workspace
- Tab elevation distinguishes active from inactive

Constraints:
- Maximum 2 shadow levels (page shadow, panel shadow)
- No blur-based effects (backdrop-filter) in the main chrome
- No parallax, no floating animations

### 3.3 Styles Explicitly Rejected for PDF Viewers

| Style | Why Rejected |
|-------|-------------|
| Glassmorphism (everywhere) | Backdrop blur is GPU-expensive, reduces text contrast, creates visual noise behind documents. Acceptable only in small overlays (e.g., a floating page indicator). |
| Neumorphism | Low contrast, poor accessibility, soft shadows are expensive and ambiguous in dense UI. Unprofessional for document tools. |
| Brutalism | Raw, unpolished aesthetic is inappropriate for professional document software. Poor accessibility. |
| Cyberpunk / Neon | Distracting, low readability, inappropriate professional context. |
| 3D & Hyperrealism | GPU-intensive, no functional benefit for document viewing. |
| Excessive Gradients / Aurora UI | Decorative, distracting, reduces text contrast, inappropriate for reading environments. |
| Motion-Driven (heavy) | Continuous animation competes with reading. Only micro-interactions are acceptable. |
| Claymorphism | Playful, toy-like aesthetic contradicts professional document context. |
| Gen Z Chaos / Maximalism | Antithetical to focused reading. |
| Experimental / Artistic styles | PDF viewers are tools, not art installations. |

### 3.4 PDF Viewer Specialization of Source Style Principles

The source's principle "Match style to context" is specialized here as:

> **PDF viewer style rule:** The visual style must make the user forget the interface exists. The best PDF viewer chrome is the one the user stops noticing after 30 seconds of reading.

The source's principle "No conflicting visual languages" is specialized as:

> **PDF viewer consistency rule:** Toolbar, tabs, panels, workspace, and dialogs must feel like one product. A user should never wonder if a panel belongs to a different application.

---

## 4. Color System Intelligence

### 4.1 Methodology (Adapted from Source)

The source defines 10 semantic color tokens per product type. For a professional desktop PDF viewer, we extend this to a dedicated viewer token system that accounts for the unique layering of a document viewer (chrome → workspace → document → overlays).

### 4.2 PDF Viewer Semantic Color Tokens

| Token | Role | Light Theme Example | Dark Theme Example |
|-------|------|-------------------|-------------------|
| `--app-bg` | Application background (behind all chrome) | `#F5F5F5` | `#1E1E1E` |
| `--workspace-bg` | Document workspace background (behind pages) | `#E8E8E8` | `#2D2D2D` |
| `--surface-elevated` | Panels, sidebars, elevated chrome | `#FFFFFF` | `#252526` |
| `--surface-selected` | Selected items (tab, bookmark, search result) | `#E3F2FD` | `#37373D` |
| `--surface-hover` | Hover state background | `#F0F0F0` | `#2A2D2E` |
| `--text-primary` | Primary text (labels, titles) | `#1A1A1A` | `#E0E0E0` |
| `--text-secondary` | Secondary text (metadata, hints) | `#6B6B6B` | `#9E9E9E` |
| `--text-disabled` | Disabled state text | `#B0B0B0` | `#5A5A5A` |
| `--border` | Panel borders, dividers | `#E0E0E0` | `#3E3E3E` |
| `--accent` | Primary accent (focus ring, active state) | `#0066CC` | `#4D9EFF` |
| `--focus-ring` | Focus indicator | `#0066CC` (3px) | `#4D9EFF` (3px) |
| `--destructive` | Delete/remove actions | `#DC2626` | `#F87171` |
| `--success` | Success feedback | `#16A34A` | `#4ADE80` |
| `--toolbar-bg` | Toolbar background | `#FFFFFF` | `#2D2D2D` |
| `--tab-active-bg` | Active tab background | `#FFFFFF` | `#1E1E1E` |
| `--tab-inactive-bg` | Inactive tab background | `#E8E8E8` | `#2D2D2D` |
| `--page-shadow` | Document page shadow | `rgba(0,0,0,0.12)` | `rgba(0,0,0,0.4)` |
| `--scrollbar` | Scrollbar thumb | `#C0C0C0` | `#555555` |

### 4.3 Color Mode Guidance

**Light Theme (default for most viewers):**
- Workspace background slightly darker than panel backgrounds to create depth
- Document pages are white (`#FFFFFF`) and visually "float" on the workspace
- Toolbar matches panel surface for cohesion
- Single accent color for all interactive states

**Dark Theme:**
- Avoid pure black (`#000000`). Use `#1E1E1E` to `#2D2D2D` range.
- Document pages remain white or shift to warm white (`#FAFAFA`) depending on reading mode.
- Reduce shadow intensity (dark-on-dark shadows are invisible; use subtle lighter borders instead).
- Increase accent color luminance for visibility against dark surfaces.

**Sepia / Reading Modes:**
- Workspace background shifts to warm paper tone (`#F5F0E8`)
- Page background shifts to warm white (`#FDF8F0`)
- UI chrome remains neutral (does not shift with reading mode)
- Text contrast must be independently verified per mode

### 4.4 Color Selection Rules for Specific Viewer Areas

| Area | Guidance |
|------|----------|
| Toolbars | Match `--surface-elevated`. Slight border below for separation. |
| Tabs | Active tab matches workspace bg. Inactive tabs slightly darker. |
| Navigation panels | Match `--surface-elevated`. 1px right border. |
| Document workspace | Slightly darker than panels. Creates visual "recess" for the document. |
| Search results highlight | Accent color at 20–30% opacity background. Full accent for current match. |
| Focus states | 2–3px `--focus-ring` outline. Never remove without replacement. |
| Selected page (thumbnail) | Accent border + slight background tint. |

---

## 5. Typography Intelligence

### 5.1 Methodology (Adapted from Source)

The source provides 74 font pairings with mood/best-for guidance. For a professional desktop PDF viewer, we select based on: readability at small sizes, compactness, professional tone, cross-platform availability, and performance (system fonts preferred).

### 5.2 Typography Roles in a PDF Viewer

| Role | Size | Weight | Line Height | Notes |
|------|------|--------|-------------|-------|
| Application title | 13–14px | 600 | 1.2 | Window title bar area |
| Document title (tab) | 12–13px | 500 | 1.2 | Truncate with ellipsis |
| Toolbar label | 11–12px | 400–500 | 1.0 | Compact, uppercase optional |
| Page number | 12–13px | 500 | 1.0 | Monospace or tabular figures |
| Sidebar heading | 11–12px | 600 | 1.2 | Uppercase, letter-spacing 0.5px |
| Bookmark item | 12–13px | 400 | 1.4 | Support indentation hierarchy |
| Search result text | 12–13px | 400 | 1.4 | Highlight match inline |
| Metadata / properties | 11–12px | 400 | 1.4 | Key-value pairs |
| Tooltip | 11–12px | 400 | 1.3 | Brief, single-line preferred |
| Dialog body | 13–14px | 400 | 1.5 | Comfortable reading |
| Status bar message | 11–12px | 400 | 1.0 | Single line, truncate |
| Menu items | 12–13px | 400 | 1.5 | Standard desktop menu sizing |

### 5.3 Font Selection Guidance

**Recommended approach:** Use the platform-native system font stack.

- **Windows:** Segoe UI (body), Segoe UI Semibold (headings)
- **macOS:** SF Pro Text (body), SF Pro Display (headings)
- **Linux:** Ubuntu, Cantarell, or Noto Sans
- **Cross-platform (web-based):** Inter, or system font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`)

**Monospace for page numbers and data:**
- Use `ui-monospace, 'Cascadia Mono', 'SF Mono', 'Fira Code', monospace` for page counters, zoom percentage, and coordinate displays.

### 5.4 Critical Separation Rule

> **The PDF document's own typography is completely separate from the application's UI typography.** The viewer renders the PDF's fonts as-is. The UI font stack applies only to chrome elements (toolbars, panels, tabs, dialogs, status bars). Never conflate the two systems.

---

## 6. Spacing and Density

### 6.1 Density Philosophy (Adapted from Source's Design Dials)

The source defines density on a 1–10 dial. A professional PDF viewer sits at **density 5–6** (standard, leaning slightly compact):

- **Not sparse (1–3):** A PDF viewer is a productivity tool. Excessive whitespace wastes screen real estate needed for the document.
- **Not dashboard-dense (8–10):** The viewer is not a data grid. Controls need breathing room for discoverability.
- **Standard-compact (5–6):** Controls are compact enough to maximize workspace, but spacious enough for comfortable interaction.

### 6.2 Spacing Scale for PDF Viewers

| Token | Value | Usage |
|-------|-------|-------|
| `--space-2xs` | 2px | Icon-to-text tight gaps |
| `--space-xs` | 4px | Internal control padding, icon gaps |
| `--space-sm` | 8px | Between toolbar buttons, panel padding |
| `--space-md` | 12px | Panel section gaps, tab internal padding |
| `--space-lg` | 16px | Panel-to-workspace gap, section headers |
| `--space-xl` | 24px | Page spacing in workspace |
| `--space-2xl` | 32px | Page margins in facing-page view |

### 6.3 Density Rules by Area

| Area | Density | Rationale |
|------|---------|-----------|
| Toolbar | Compact (28–36px height) | Maximize workspace. Icons + optional labels. |
| Tab bar | Compact (30–36px height) | Show many tabs. Truncate names. |
| Sidebar / panels | Standard (padding 8–12px) | Readable list items. Indentation for hierarchy. |
| Workspace | Spacious (page gaps 16–24px) | Reading comfort. Pages need visual separation. |
| Status bar | Minimal (22–28px height) | Single line. Essential info only. |
| Dialogs | Standard (16–24px padding) | Comfortable form layout. |

### 6.4 The Balance Rule

> A PDF viewer must feel **structured but not cramped, spacious but not wasteful.** Every pixel of chrome that is not serving navigation, control, or state feedback is a pixel stolen from the document.

---

## 7. Desktop Viewer Layout Model

### 7.1 Layout Zones

```
┌─────────────────────────────────────────────────────────────────┐
│  APPLICATION TITLE BAR (optional, OS-managed or custom)          │
├─────────────────────────────────────────────────────────────────┤
│  TAB BAR (document tabs)                                         │
├─────────────────────────────────────────────────────────────────┤
│  PRIMARY TOOLBAR (viewer controls)                               │
├────────┬────────────────────────────────────────────┬───────────┤
│ LEFT   │                                            │  RIGHT    │
│ NAV    │       DOCUMENT WORKSPACE                   │  UTILITIES│
│ PANEL  │       (PDF pages rendered here)            │  PANEL    │
│        │                                            │  (optional)│
├────────┴────────────────────────────────────────────┴───────────┤
│  STATUS BAR / PAGE CONTROLS (integrated or separate)             │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 Zone Roles and Visibility Rules

| Zone | Role | Visibility |
|------|------|-----------|
| Title bar | App identity, window controls | Always visible (OS-managed or custom) |
| Tab bar | Switch between open documents | Visible when ≥1 document open. Hidden in fullscreen. |
| Primary toolbar | Core viewer actions (zoom, page nav, search, view mode) | Always visible. Collapsible in reading/fullscreen mode. |
| Left navigation panel | Thumbnails, bookmarks, outline, attachments | Collapsible. Default visible. User-toggleable. |
| Document workspace | The PDF pages. THE PRIMARY ZONE. | Always visible. Maximum area. |
| Right utilities panel | Properties, comments, annotations (if supported) | Collapsible. Default hidden. Contextual. |
| Status bar / page controls | Page number, zoom level, view mode | Always visible. Minimal height. |

### 7.3 Layout Priority Rule

> **The document workspace must always receive the largest allocation of screen space.** If a panel or toolbar is not actively needed, it should be collapsed or hidden. The workspace expands to fill freed space.

### 7.4 Panel Behavior Rules

- **Collapsible:** All side panels must be collapsible via toolbar toggle or keyboard shortcut.
- **Resizable:** Left panel width should be user-adjustable (drag edge). Remember last width.
- **Contextual:** Right panel opens only when relevant (e.g., document properties, search results in some implementations).
- **Non-blocking:** Panels never overlap the document workspace. They push it. (Exception: overlay search bar.)
- **State persistence:** Panel open/closed state and width persist across sessions.

---

## 8. Document-First Principle

### 8.1 The Hierarchy

This is the single most important structural rule in this skill.

**Priority order (descending):**

1. **Document** (the PDF content, rendered clearly and large)
2. **Navigation** (getting to the right page, section, or position)
3. **Viewer controls** (zoom, rotate, view mode, search)
4. **Secondary utilities** (properties, metadata, attachments)

### 8.2 The Failure Mode

The most common design failure in PDF viewers is inverting this hierarchy:

❌ **Tool list → Tool categories → Dashboard → Document**

This creates a "tool store" interface where the document is an afterthought surrounded by buttons, panels, and features. The user came to read a document, not to shop for tools.

### 8.3 Detection Methods

Ask these questions of any design:

1. **What percentage of the default window area is the document?** If less than 60%, the design is chrome-heavy.
2. **How many UI elements are visible without any user action?** If more than 40 distinct interactive elements are visible at launch, the interface is cluttered.
3. **Can the user hide all chrome and see only the document?** If not, there is no reading mode.
4. **Does the eye go to the document first, or to a toolbar/panel?** If the toolbar is more visually prominent than the page, hierarchy is broken.
5. **Are there panels or toolbars that serve PDF editing rather than PDF viewing?** If yes, they do not belong in a viewer.

### 8.4 Practical Corrections

- Move rarely-used actions into menus or overflow.
- Collapse panels by default if they are not needed for the primary reading task.
- Use progressive disclosure: show controls when the user signals intent (hover near toolbar area, press a shortcut).
- Provide a "reading mode" or "fullscreen" that strips all non-essential chrome.
- Keep the toolbar to one row. Never stack multiple toolbar rows permanently.

---

## 9. Toolbar Intelligence

### 9.1 Toolbar Philosophy

The PDF viewer toolbar provides **quick access to the most frequent viewer actions** without overwhelming the user. It is not a feature inventory. It is a shortcut layer.

### 9.2 Toolbar Content (Viewer-Specific)

**Primary actions (always visible):**
- Page navigation (previous/next, page number input, total pages)
- Zoom controls (zoom in, zoom out, zoom percentage, fit width, fit page)
- Search (Ctrl+F trigger)
- View mode (single page, continuous, facing pages)
- Fullscreen / reading mode toggle
- Panel toggles (thumbnails, bookmarks, outline)

**Secondary actions (overflow or secondary toolbar):**
- Rotate page
- Print
- Document properties
- Presentation mode
- Hand tool / selection tool toggle

**NOT in the toolbar (viewer scope):**
- Text editing tools
- Form creation tools
- Stamp tools
- Redaction tools
- Export/conversion tools
- OCR tools

### 9.3 Toolbar Visual Rules

| Property | Value | Rationale |
|----------|-------|-----------|
| Height | 32–40px | Compact but tappable |
| Icon size | 16–20px | Clear at desktop distances |
| Button padding | 6–8px | Comfortable hit area |
| Button spacing | 2–4px between buttons, 8–12px between groups | Grouped logically |
| Group separation | 1px vertical divider or 12px gap | Visual grouping without clutter |
| Active state | Background color change + optional accent color | Clear which tool is active |
| Hover state | Subtle background change (100–150ms) | Feedback without distraction |
| Focus state | 2px focus ring | Keyboard accessibility |
| Disabled state | 40–50% opacity, no pointer cursor | Clear non-interactivity |

### 9.4 Progressive Disclosure

- Show the 8–12 most-used actions permanently.
- Place remaining actions in an overflow menu (`⋯` or `More`).
- Never show more than one row of toolbar buttons.
- Context-sensitive controls (e.g., "Exit Fullscreen") replace their counterpart when active.

### 9.5 Responsive Toolbar Behavior

- When window width shrinks, hide labels and show icons only.
- When window width shrinks further, move low-priority buttons to overflow.
- Never wrap the toolbar to two rows.

---

## 10. Tab System

### 10.1 Tab Purpose

Tabs allow the user to keep multiple PDF documents open simultaneously and switch between them without reopening files. Each tab preserves its own document state (page, zoom, scroll position, panel state).

### 10.2 Tab Visual Specifications

| Property | Value | Rationale |
|----------|-------|-----------|
| Height | 30–36px | Compact, desktop-appropriate |
| Min width | 120px | Enough for truncated title + close button |
| Max width | 200px | Prevent one tab from dominating |
| Active tab bg | Matches workspace background | Visual connection to document area |
| Inactive tab bg | Slightly darker than active | Subtle depth without heavy shadow |
| Tab text | 12–13px, truncate with ellipsis | Readable, compact |
| Close button | 14–16px, visible on hover or always | Accessible but not distracting |
| Tab spacing | 0–1px gap or connected with shared border | Clean, professional |
| Overflow | Scroll or dropdown when too many tabs | Never wrap to multiple rows |

### 10.3 Tab Interaction Rules

- **Click:** Switch to that document. Preserve previous document's state.
- **Middle-click:** Close tab (standard desktop convention).
- **Close button:** Close document. If unsaved annotations exist, confirm first.
- **Drag:** Reorder tabs (optional but expected in professional tools).
- **Double-click empty tab bar area:** Open file dialog (optional).
- **Context menu:** Close, Close Others, Close All, Copy Path, Open Containing Folder.

### 10.4 State Preservation Rule

> When switching tabs, the viewer must preserve: current page, zoom level, scroll position, panel state, and selection state for each document. Returning to a tab must restore exactly where the user left off.

### 10.5 Tab Identity

Tabs must feel like they belong to a **desktop document application**, not a web browser. Differences from browser tabs:
- No favicons (use a small PDF file type icon or none)
- No loading spinners (use a subtle progress indicator in the workspace)
- Slightly more rectangular (less rounded)
- Document title is the primary label, not a website name

---

## 11. Document Navigation

### 11.1 Navigation Panel Types

| Panel | Content | Default State |
|-------|---------|---------------|
| Page Thumbnails | Grid/list of page thumbnails | Collapsed |
| Bookmarks | Document bookmark tree | Visible if bookmarks exist |
| Outline / Table of Contents | Document structure outline | Visible if outline exists |
| Attachments | List of embedded files | Collapsed |

### 11.2 Panel Behavior Rules

- **Collapsible:** Toggle via toolbar button or keyboard shortcut.
- **Resizable:** Drag right edge to adjust width. Min 180px, max 400px.
- **State persistence:** Remember open/closed and width per session.
- **Scroll sync:** Clicking a bookmark/outline item scrolls the document to that location.
- **Current page indicator:** The thumbnail panel highlights the current page. The outline highlights the current section.
- **Preserve scroll position:** When switching documents (tabs), each panel remembers its own scroll position.

### 11.3 Thumbnail Panel Specifics

- Thumbnails render lazily (only visible + buffer).
- Current page has a visible indicator (accent border or background).
- Click a thumbnail to navigate to that page.
- Thumbnail size adjustable (small/medium/large) via slider or menu.
- Do not render all thumbnails at once for large documents.

### 11.4 Bookmark / Outline Panel Specifics

- Tree structure with expand/collapse.
- Indentation indicates hierarchy level.
- Click navigates to the bookmark destination.
- Current section highlighted based on scroll position.
- Support keyboard navigation (arrow keys to move, Enter to navigate, Left/Right to collapse/expand).

### 11.5 Avoid Unnecessary Reloads

> Navigating via bookmarks, thumbnails, or outline must NEVER reload the PDF document. Navigation is a scroll/position change within the already-loaded document. If the viewer reloads the file on navigation, this is a critical UX failure.

---

## 12. PDF Reading Experience (Document Workspace)

### 12.1 Workspace Fundamentals

The document workspace is where PDF pages are rendered. It is the largest zone in the viewer.

| Property | Guidance |
|----------|----------|
| Background | Slightly darker than panels (`--workspace-bg`) to create depth |
| Page rendering | White pages on the workspace background |
| Page shadow | Subtle drop shadow (0 2px 8px rgba(0,0,0,0.1)) to lift pages |
| Page spacing | 16–24px vertical gap between pages in continuous mode |
| Page centering | Pages horizontally centered in the workspace |
| Scrollbars | Visible when content overflows. Styled to match theme. |

### 12.2 View Modes

| Mode | Behavior | Use Case |
|------|----------|----------|
| Single Page | One page visible, scroll snaps to pages | Presentations, focused reading |
| Continuous Scroll | Pages flow vertically, free scroll | Long reading sessions |
| Facing Pages | Two pages side by side (spread) | Books, magazines |
| Continuous Facing | Facing pages with continuous scroll | Long books |

### 12.3 Zoom Behaviors

| Zoom Mode | Behavior |
|-----------|----------|
| Fit Width | Page width matches workspace width. Height scrolls. |
| Fit Page | Entire page visible. Both dimensions fit. |
| Actual Size (100%) | Page rendered at 72 DPI (1 PDF point = 1 screen pixel at 100%). |
| Custom % | User-defined zoom. Percentage displayed in toolbar. |

### 12.4 Reading Comfort

- **Long sessions:** Minimize visual noise. No animated backgrounds. No floating decorations.
- **Eye strain:** Provide dark workspace option. Consider sepia/warm reading mode.
- **Focus:** Fullscreen mode removes all chrome except a minimal floating page indicator.
- **Scroll smoothness:** Scrolling must be buttery smooth (60fps). No jank, no stutter.

### 12.5 Fullscreen / Reading Mode

- Hides: title bar, tab bar, toolbar, panels, status bar.
- Shows: Document only. Minimal floating controls on hover (page nav, exit button).
- Exit: Escape key, or hover to reveal controls.
- Preserves: Current page and zoom.

---

## 13. Search Experience

### 13.1 Search Trigger

- **Ctrl+F** opens the search bar/panel.
- Search bar appears as an overlay in the top-right of the workspace, or as a panel.
- Search field auto-focuses and selects any previous query.

### 13.2 Search UI Components

| Component | Behavior |
|-----------|----------|
| Search input | Text field. Placeholder: "Search in document…" |
| Match counter | "3 of 47" format. Updates as user navigates matches. |
| Previous / Next buttons | Navigate between matches. Disabled at boundaries. |
| Close button | Dismisses search. Returns to previous view state. |
| Options (optional) | Case sensitive, whole words, regex (advanced) |

### 13.3 Search Highlight Rules

- All matches on the current page highlighted with a semi-transparent accent background.
- Current match highlighted with a stronger/different color (e.g., accent vs. accent-light).
- Highlights do not obscure text readability.
- Highlights clear when search is dismissed.

### 13.4 Search Accuracy Rule

> The match count must be accurate. If the viewer reports "47 matches," there must be exactly 47 matches. Inaccurate search counts destroy user trust.

### 13.5 Search Performance

- Search should begin returning results incrementally (do not block UI until full document is searched).
- Show a progress indicator for large documents.
- Allow the user to navigate to found matches before the full search completes.

### 13.6 State Persistence

- If the user switches tabs and returns, the search state (query, current match index) should persist for that document.
- Closing the search bar does not necessarily clear the query (user may reopen).

---

## 14. Zoom Intelligence

### 14.1 Zoom Methods

| Method | Trigger | Behavior |
|--------|---------|----------|
| Toolbar zoom in/out | Click +/- buttons | Step zoom (e.g., 10% increments) |
| Zoom percentage input | Type in toolbar field | Set exact zoom level |
| Fit Width button | Click | Zoom to match workspace width |
| Fit Page button | Click | Zoom to show entire page |
| Actual Size button | Click | Zoom to 100% |
| Ctrl + Mouse Wheel | Hold Ctrl, scroll wheel | Zoom in/out centered on cursor |
| Touchpad Pinch | Two-finger pinch on touchpad | Smooth zoom centered on pinch midpoint |
| Ctrl + Plus/Minus | Keyboard shortcut | Step zoom |
| Ctrl + 0 | Keyboard shortcut | Reset to 100% or Fit Page |

### 14.2 Critical Distinction: Scrolling vs. Zooming

> **Mouse wheel without modifier = SCROLL. Mouse wheel with Ctrl = ZOOM. Touchpad two-finger scroll = SCROLL. Touchpad pinch = ZOOM.**

This distinction is non-negotiable. A PDF viewer that zooms on plain mouse wheel scroll is broken. A PDF viewer that scrolls on pinch gesture is broken.

### 14.3 Zoom Focal Point

- **Ctrl+Wheel zoom:** Zoom centered on the cursor position. The point under the cursor stays fixed.
- **Pinch zoom:** Zoom centered on the midpoint between the two fingers.
- **Toolbar zoom:** Zoom centered on the current viewport center.

### 14.4 Zoom State

- Zoom percentage displayed in toolbar (e.g., "125%").
- Zoom level persists per document (tab).
- Zoom level persists across viewer restarts (per-document memory optional).
- Fit Width / Fit Page are states, not one-time actions. If the window resizes, the fit recalculates.

### 14.5 Zoom Performance

- Zoom must be smooth. No visible re-rendering lag.
- For large/complex PDFs, render at lower quality during zoom animation, then re-render at full quality on zoom end.
- Do not block the UI thread during zoom rendering.

### 14.6 Gesture Conflict Resolution

| Gesture | Action | Conflict Prevention |
|---------|--------|-------------------|
| Two-finger scroll (touchpad) | Scroll document | Do NOT interpret as zoom |
| Pinch (touchpad) | Zoom | Do NOT interpret as scroll |
| Ctrl + Wheel | Zoom | Do NOT interpret as scroll |
| Plain wheel | Scroll | Do NOT interpret as zoom |
| Shift + Wheel | Horizontal scroll (optional) | Do NOT interpret as zoom |

> If a gesture handler cannot distinguish between scroll and zoom, investigate the event properties (`ctrlKey`, `deltaMode`, pointer type) before implementing. Never guess.

---

## 15. Touchpad and Pointer Interaction

### 15.1 Precision Touchpad Scrolling

Modern touchpads (Windows Precision Touchpad, macOS trackpad) emit high-frequency wheel events with momentum/inertia. The viewer must:

- Handle high-frequency scroll events without dropping frames.
- Support both vertical and horizontal scrolling (Shift+Wheel or horizontal swipe).
- Respect OS scroll direction settings.
- Not apply custom smoothing that conflicts with OS-level momentum.

### 15.2 Pinch-to-Zoom on Touchpad

- Windows: Emit `wheel` events with `ctrlKey: true` during pinch.
- The viewer must detect `ctrlKey` on wheel events and switch from scroll to zoom.
- Zoom should be proportional to the pinch delta (not stepped).
- Use `preventDefault()` on the wheel event when handling zoom to prevent browser/OS default zoom.

### 15.3 Event Handling Rules

| Rule | Rationale |
|------|-----------|
| Use passive listeners for scroll | Prevents scroll jank. Do not call `preventDefault()` on passive scroll. |
| Use non-passive listeners for zoom | Allows `preventDefault()` to stop page scroll during zoom. |
| Check `event.ctrlKey` for pinch detection | Touchpad pinch on Windows sends ctrlKey=true wheel events. |
| Check `event.deltaMode` | Distinguish pixel vs. line vs. page scrolling. |
| Debounce zoom re-render | Render at low quality during gesture, full quality on end. |
| Clean up event listeners | Remove listeners on component unmount/document close. |

### 15.4 Selection vs. Navigation

- **Text selection tool:** Click and drag selects text in the PDF. Cursor is I-beam.
- **Hand/pan tool:** Click and drag scrolls the document. Cursor is grab/grabbing.
- These are mutually exclusive modes. The toolbar toggles between them.
- Default: Text selection tool active. Hand tool via toolbar toggle or Space+drag.

### 15.5 Investigation Before Implementation

> Before implementing or fixing touchpad/pointer interactions, the AI must investigate:
> 1. What rendering technology is used (canvas, DOM, native)?
> 2. What event model is available (DOM wheel events, native pointer events, OS gesture APIs)?
> 3. Are there existing gesture conflicts in the current implementation?
> 4. What is the target OS and its touchpad driver model?
> 5. Are passive/non-passive listeners correctly configured?

---

## 16. Keyboard Interaction

### 16.1 Standard PDF Viewer Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+F` | Open search |
| `Escape` | Close search / Exit fullscreen / Cancel operation |
| `Page Down` / `Page Up` | Scroll one viewport down/up |
| `Ctrl+Page Down` / `Ctrl+Page Up` | Go to next/previous page |
| `Home` | Go to first page |
| `End` | Go to last page |
| `Ctrl+Home` | Go to first page |
| `Ctrl+End` | Go to last page |
| `Ctrl+=` / `Ctrl++` | Zoom in |
| `Ctrl+-` | Zoom out |
| `Ctrl+0` | Reset zoom (100% or Fit Page) |
| `Ctrl+1` | Fit Page (or Actual Size, depending on convention) |
| `Ctrl+2` | Fit Width (or Actual Size) |
| `Ctrl+Shift+F` | Fullscreen / Reading mode |
| `F11` | Fullscreen toggle |
| `Ctrl+P` | Print |
| `Ctrl+O` | Open file |
| `Ctrl+W` | Close current tab |
| `Ctrl+Tab` | Switch to next tab |
| `Ctrl+Shift+Tab` | Switch to previous tab |
| `Arrow Keys` | Scroll viewport (when not in text field) |
| `Tab` | Move focus between UI controls |
| `Enter` / `Space` | Activate focused control |

### 16.2 Keyboard Navigation Rules

- All toolbar buttons, panel items, tabs, and dialog controls must be keyboard-focusable.
- Focus order must follow visual order (left-to-right, top-to-bottom).
- Focus must be visible (2–3px focus ring).
- Modal dialogs trap focus (Tab cycles within the dialog).
- Escape closes dialogs, search overlays, and fullscreen mode.
- Do not create keyboard traps.

### 16.3 Keyboard Productivity

> A professional PDF viewer must be fully usable without a mouse for core navigation tasks. A user should be able to: open a document, search, navigate pages, zoom, switch tabs, and close the document using only the keyboard.

---

## 17. Reading Modes

### 17.1 Appropriate Reading Modes for PDF Viewers

| Mode | Description | Use Case |
|------|-------------|----------|
| Normal (Light) | Standard light workspace. White pages. | Default. General use. |
| Dark Workspace | Dark workspace background. Pages remain white. | Reduced eye strain in low light. |
| Sepia / Warm | Warm paper-tone workspace and page background. | Extended reading comfort. |
| Inverted / Dark Page | Page content inverted (dark background, light text). | Low-light reading. Accessibility. |
| Fullscreen / Reading | All chrome hidden. Document only. | Distraction-free reading. |
| Presentation | One page at a time, fullscreen, no scroll. | Presenting slides/documents. |

### 17.2 Mode-Specific Rules

- Reading mode changes affect the **workspace and page rendering only**. Toolbar and panel colors may remain neutral.
- Inverted mode must maintain text readability. Test with complex PDFs (images, vector graphics).
- Sepia mode should not reduce contrast below WCAG AA.
- Fullscreen mode must have a clear exit mechanism (Escape, hover controls).
- Mode selection persists per session. Optionally per document.

### 17.3 Modes That Do NOT Belong

- Animated page transitions (flip effects) — gimmicky, slows reading.
- Custom background images behind pages — distracting.
- Color themes that alter the document content beyond readability modes.

---

## 18. Accessibility

### 18.1 Contrast Requirements (Adapted from Source)

- Body text: Minimum **4.5:1** against background.
- Large text (14pt bold or 18pt regular): Minimum **3:1**.
- UI components (borders, icons, focus rings): Minimum **3:1**.
- Verify contrast in ALL themes (light, dark, sepia, inverted).

### 18.2 Keyboard Navigation

- All interactive elements keyboard-reachable.
- Focus states always visible (minimum 2px outline).
- Focus order matches visual order.
- Trap focus inside modal dialogs.
- Provide skip navigation for panel-heavy layouts.

### 18.3 Screen Reader Considerations

- All icon-only buttons must have `aria-label` or equivalent accessible name.
- Panel open/close state must be announced.
- Page navigation changes should update an `aria-live` region (e.g., "Page 5 of 42").
- Search match count announced via live region.
- Document tabs have accessible names (document title).
- Toolbar groups have accessible group labels.

### 18.4 Reduced Motion

- Respect `prefers-reduced-motion` media query.
- When reduced motion is active: disable panel slide animations, tab transitions, and hover animations. Use instant state changes.
- Never require motion to convey information.

### 18.5 Target Sizes

- Minimum interactive target: **32×32px** for desktop (pointer-based).
- Toolbar buttons: minimum 28×28px hit area.
- Tab close buttons: minimum 16×16px visual, 24×24px hit area.
- Maintain 4px minimum spacing between adjacent targets.

### 18.6 State Visibility

- Never convey state by color alone. Pair with icon, text, or position.
- Active tool: background change + optional icon fill change.
- Disabled: reduced opacity + `cursor: not-allowed`.
- Selected: background change + optional border.
- Focused: visible focus ring (never removed).

---

## 19. Icon Guidance

### 19.1 Icon System Rules (Adapted from Source)

- **One icon family.** Use a single, consistent SVG icon set (e.g., Phosphor, Heroicons, Lucide, or a custom set). Never mix families.
- **Consistent stroke weight.** All icons in the same visual layer use the same stroke width (e.g., 1.5px or 2px).
- **Consistent size.** Define icon size tokens: `icon-sm` (14px), `icon-md` (16px), `icon-lg` (20px), `icon-xl` (24px).
- **Never use emoji as UI icons.** Emoji are font-dependent, inconsistent, cannot be themed, and fail accessibility.
- **Filled vs. outline:** Use one style per hierarchy level. Outline for default. Filled for active state.

### 19.2 PDF Viewer Icon Set

| Category | Icons Needed | Source Reference |
|----------|-------------|-----------------|
| Navigation | arrow-left, arrow-right, caret-down, caret-up, list | Phosphor: ArrowLeft, ArrowRight, CaretDown, CaretUp, List |
| Page controls | chevron-up, chevron-down, first-page, last-page | Custom or Phosphor equivalents |
| Zoom | magnifying-glass-plus, magnifying-glass-minus, fit-width, fit-page, actual-size | Phosphor: MagnifyingGlass, ArrowsOut |
| Search | magnifying-glass, x (close) | Phosphor: MagnifyingGlass, X |
| Bookmarks | bookmark, bookmark-filled | Phosphor: Bookmark |
| Thumbnails | grid-four, image | Phosphor: GridFour, Image |
| Outline | list-bullets, tree-structure | Phosphor: ListBullets |
| Attachments | paperclip | Phosphor: Paperclip |
| View mode | monitor (single), columns (facing), arrows-out (fullscreen) | Phosphor: Monitor, Columns, ArrowsOut |
| File | file-text, folder-open | Phosphor: FileText, FolderOpen |
| Actions | printer, gear, x, plus, minus | Phosphor: Printer, Gear, X, Plus, Minus |
| State | check, circle-notch (loading), warning | Phosphor: Check, CircleNotch, Warning |

### 19.3 Icon Sizing by Context

| Context | Size | Stroke |
|---------|------|--------|
| Toolbar buttons | 16–20px | 1.5–2px |
| Sidebar panel headers | 14–16px | 1.5px |
| Tab close button | 12–14px | 1.5px |
| Status bar | 12–14px | 1.5px |
| Dialog / menu items | 16px | 1.5px |

---

## 20. Motion

### 20.1 Motion Philosophy for PDF Viewers

> Motion in a PDF viewer must be **subtle, fast, and purposeful.** It provides feedback and orientation. It never entertains, decorates, or competes with reading.

### 20.2 Recommended Motion (Subtle, 100–200ms)

| Element | Motion | Duration | Easing |
|---------|--------|----------|--------|
| Panel open/close | Width transition or slide | 150–200ms | ease-out |
| Tab switch | Background color cross-fade | 100ms | ease-out |
| Toolbar button hover | Background opacity change | 100ms | ease-out |
| Menu open/close | Opacity + slight translate | 100–150ms | ease-out |
| Search bar appear | Fade in + slide down | 150ms | ease-out |
| Tooltip appear | Fade in (delayed 500ms) | 100ms | ease-out |
| Page turn (if animated) | Not recommended | — | — |

### 20.3 Motion to Avoid

| Motion | Why Avoided |
|--------|-------------|
| Parallax scrolling | Distracting. No functional benefit. Causes motion sickness. |
| Large page-turn animations | Slow. Gimmicky. Interferes with fast navigation. |
| Bounce / elastic effects | Unprofessional. Distracting. |
| Continuous background animations | Competes with reading. Wastes GPU. |
| Staggered entrance animations for panels | Delays access to content. |
| Cinematic transitions between views | Slow. No functional benefit. |
| Animated icons | Distracting. Unprofessional. |

### 20.4 Reduced Motion Compliance

> All animations must be wrapped in a `prefers-reduced-motion` check. When reduced motion is active, replace all transitions with instant state changes. This is non-negotiable.

---

## 21. Performance

### 21.1 Performance Philosophy

> A PDF viewer must remain responsive with documents of 500+ pages, embedded images, and complex vector graphics. Performance is not an optimization pass. It is a design constraint.

### 21.2 Rendering Performance

| Concern | Guidance |
|---------|----------|
| Canvas rendering | Use `requestAnimationFrame` for render loops. Batch draw calls. |
| Page rendering | Render only visible pages + buffer (1–2 pages above/below viewport). |
| Zoom rendering | Render at low resolution during zoom gesture. Full quality on gesture end. |
| Scroll performance | Virtualize page list. Do not create DOM/canvas for all pages. |
| Thumbnail rendering | Lazy-render thumbnails. Render visible + buffer only. Cache rendered thumbnails. |
| Large documents | Stream page data. Do not load entire PDF into memory at once if avoidable. |

### 21.3 Interaction Performance

| Concern | Guidance |
|---------|----------|
| Event listeners | Clean up on document close / tab close. Prevent memory leaks. |
| Scroll handlers | Use passive listeners. Debounce expensive operations. |
| Zoom handlers | Debounce re-render. Use `requestAnimationFrame` throttling. |
| Search | Run search off main thread (Web Worker or async). Update UI incrementally. |
| Tab switching | Preserve rendered state. Do not re-render from scratch on tab return. |

### 21.4 Memory Management

- Unload page canvases for tabs that are not active (optional, based on tab count).
- Release PDF document data when a tab is closed.
- Limit thumbnail cache size.
- Avoid creating new objects in render loops (pre-allocate).

### 21.5 Anti-Pattern: Unnecessary Reloads

> The following must NEVER trigger a full PDF document reload:
> - Page navigation (scrolling, bookmark click, thumbnail click)
> - Zoom change
> - Panel open/close
> - Tab switch (returning to an already-open tab)
> - Search
> - View mode change
>
> If any of these actions causes a document reload, it is a critical performance and UX failure.

---

## 22. Anti-Patterns (PDF Viewer Specific)

### 22.1 Layout & Structure Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Tool-store interface | Toolbar/panels overflow with editing tools. Document is tiny. | Show only viewer tools. Move editing to a separate product/mode. |
| Dashboard interface | Cards, widgets, KPIs surround the document. | Remove all non-document UI. Document is the only "widget." |
| Oversized permanent sidebars | Panels take 40%+ of screen permanently. | Make panels collapsible. Default to narrow or hidden. |
| Giant bottom control bars | A 60px+ bar at the bottom wastes vertical space. | Integrate page controls into toolbar or status bar. |
| Browser-looking tabs | Tabs look like Chrome/Firefox tabs with favicons. | Style tabs as document tabs. Rectangular. Document title. No favicon. |
| Multiple permanent toolbars | Two or more stacked toolbar rows. | One toolbar row. Overflow menu for extras. |
| Excessive floating controls | Floating buttons, FABs, or overlays scattered on workspace. | Keep workspace clean. Controls in chrome zones. |

### 22.2 Visual Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Pure black chrome | `#000000` backgrounds cause eye strain and OLED smear. | Use `#1E1E1E` to `#2D2D2D` for dark themes. |
| Low contrast text | Text below 4.5:1 is unreadable. | Verify all text meets WCAG AA. |
| Inconsistent icons | Mixed icon families, sizes, or stroke weights. | One family. Tokenized sizes. Consistent stroke. |
| Inconsistent typography | Random font sizes, weights, or families. | Defined type scale. One UI font family. |
| Decorative UI competing with PDF | Gradients, glows, or animations near the document. | Calm, flat, minimal chrome. Document is the visual focus. |
| Emoji as icons | Inconsistent, unthemeable, inaccessible. | SVG icons from a consistent family. |

### 22.3 Interaction Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Broken pinch zoom | Pinch scrolls instead of zooms, or vice versa. | Check `ctrlKey` on wheel events. Separate scroll and zoom handlers. |
| Zoom dependent on tool mode | Zoom only works in "hand tool" mode. | Zoom must work regardless of active tool. |
| Fake zoom percentages | Zoom display shows a value that doesn't match actual rendering scale. | Compute and display true zoom ratio. |
| Losing page position | Navigating, searching, or switching tabs resets scroll position. | Preserve scroll/zoom per document. Restore on return. |
| Unnecessary document reloads | Opening a panel or switching view mode reloads the PDF. | Never reload for UI state changes. |
| Opening separate windows for normal actions | Search, bookmarks, or properties open in a new window. | Keep all viewer interactions in the main window. |
| Plain wheel zooms | Mouse wheel zooms instead of scrolling. | Wheel = scroll. Ctrl+Wheel = zoom. Pinch = zoom. |
| No focus indicator | Keyboard users cannot see where focus is. | Always show 2px+ focus ring. |
| Instant state changes | Panels, tabs, or menus snap with no transition. | Use 100–200ms transitions. |

### 22.4 Search Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Inaccurate match counts | "47 matches" but only 43 exist. | Implement accurate counting. Test edge cases. |
| Search blocks UI | UI freezes during search of large documents. | Async search. Incremental results. |
| No match highlighting | User cannot see where matches are on the page. | Highlight all matches. Stronger highlight for current. |
| Search state lost | Switching tabs clears search. | Persist search state per document. |

---

## 23. Design Decision Pipeline (PDF Viewer Specialized)

This pipeline adapts the source's 12-step design system generation process specifically for PDF viewers. It does NOT use the landing-page or marketing conversion pipeline.

### Pipeline Steps

**Step 1: Identify the viewer context.**
What platform? What rendering technology? What existing codebase? What OS conventions apply?

**Step 2: Identify target users and reading behavior.**
Knowledge workers reading reports? Researchers reading papers? Legal professionals reading contracts? Students reading textbooks? Reading session length? Document complexity?

**Step 3: Determine light or dark interface.**
Default to light for general use. Provide dark theme. Consider the primary reading environment.

**Step 4: Select appropriate viewer style.**
From Section 3: Refined Minimalism (primary), Professional Flat Design (secondary), Subtle Depth (sparingly). Reject all decorative/experimental styles.

**Step 5: Select semantic color system.**
Define all tokens from Section 4.2. Support light + dark themes. Define reading mode variants.

**Step 6: Select typography.**
From Section 5: System font stack. Define type scale for all UI roles. Separate UI typography from document rendering.

**Step 7: Select spacing and density.**
From Section 6: Density 5–6. Define spacing scale. Set panel/toolbar/workspace dimensions.

**Step 8: Define viewer layout.**
From Section 7: Zone allocation. Panel positions. Workspace priority. Responsive behavior.

**Step 9: Define navigation hierarchy.**
From Sections 11, 13: Panel types. Navigation methods. Search integration. Keyboard shortcuts.

**Step 10: Define toolbar hierarchy.**
From Section 9: Primary vs. overflow actions. Icon sizes. Grouping. Responsive behavior.

**Step 11: Define interaction states.**
Hover, focus, active, disabled, selected, loading for all components. Consistent timing (100–200ms).

**Step 12: Define accessibility requirements.**
From Section 18: Contrast ratios. Focus visibility. Keyboard access. Screen reader labels. Reduced motion.

**Step 13: Define motion level.**
From Section 20: Subtle. 100–200ms. Panel/tab/menu only. No decorative animation. Reduced motion fallback.

**Step 14: Define performance constraints.**
From Section 21: Page virtualization. Lazy thumbnails. Async search. No reloads. Event cleanup.

**Step 15: Check PDF viewer anti-patterns.**
From Section 22: Verify none are present. Specifically check: tool-store feel, broken zoom, lost position, unnecessary reloads.

**Step 16: Produce the final viewer design system.**
Compile all decisions into the Master Design System document (Section 24).

---

## 24. Master Design System Template

Before implementing any PDF viewer UI, the AI must produce a design system document containing all of the following. This is the viewer's single source of truth.

### Required Sections

```
1. STYLE DIRECTION
   - Primary style name
   - Rationale for selection
   - Explicit style rejections

2. COLOR SYSTEM
   - All semantic tokens (Section 4.2)
   - Light theme values
   - Dark theme values
   - Reading mode variants (sepia, inverted)
   - Contrast verification notes

3. TYPOGRAPHY
   - Font family (system or specified)
   - Type scale table (all roles from Section 5.2)
   - Weight usage rules
   - Line height rules

4. SPACING & DENSITY
   - Spacing scale tokens (Section 6.2)
   - Density parameters per zone (Section 6.3)
   - Panel widths (min, default, max)
   - Toolbar height
   - Tab height
   - Status bar height

5. ICONS
   - Icon family name
   - Size tokens (Section 19.3)
   - Stroke weight
   - Filled vs. outline rules
   - Complete icon list for viewer functions

6. COMPONENTS
   - Buttons (toolbar, panel, dialog)
   - Tabs (active, inactive, hover, close)
   - Toolbar (groups, separators, overflow)
   - Navigation panels (header, items, tree, scroll)
   - Search bar (input, counter, nav buttons)
   - Page controls (page input, prev/next)
   - Zoom controls (buttons, percentage, fit modes)
   - Menus (context menu, overflow menu)
   - Dialogs (modal structure, padding, buttons)
   - Scrollbars (thumb, track, hover)
   - Tooltips
   - Status bar

7. INTERACTION STATES
   - Hover (all interactive elements)
   - Focus (focus ring spec)
   - Active / Pressed
   - Selected
   - Disabled
   - Loading
   - Timing (100–200ms standard)
   - Easing (ease-out for enters)

8. MOTION
   - Allowed animations (Section 20.2)
   - Duration range
   - Easing
   - Reduced motion fallback

9. ACCESSIBILITY
   - Contrast targets
   - Focus ring spec
   - Keyboard shortcut map
   - Screen reader label requirements
   - Reduced motion behavior

10. ANTI-PATTERN CHECKLIST
    - Reference to Section 22
    - Sign-off that none are present
```

---

## 25. Quality Checklist (PDF Viewer Specific)

Run this checklist before delivering any PDF viewer design or implementation.

### Visual

- [ ] Document workspace is the dominant visual area (≥60% of window)
- [ ] Consistent color palette across all chrome elements
- [ ] Consistent typography (one font family, defined scale)
- [ ] Consistent spacing (tokenized, no magic numbers)
- [ ] Consistent icons (one family, tokenized sizes)
- [ ] All controls are readable (4.5:1 contrast minimum)
- [ ] No decorative elements competing with the document
- [ ] Professional, calm appearance

### Interaction

- [ ] Mouse wheel scrolls (does not zoom)
- [ ] Ctrl+wheel zooms (does not scroll)
- [ ] Touchpad pinch zooms (does not scroll)
- [ ] Touchpad two-finger scroll scrolls (does not zoom)
- [ ] Toolbar zoom in/out works
- [ ] Fit Width / Fit Page / Actual Size work
- [ ] Zoom percentage display is accurate
- [ ] Page navigation works (prev/next, input, Home/End)
- [ ] Search works (Ctrl+F, match count, prev/next, highlights)
- [ ] Tabs work (switch, close, reorder, preserve state)
- [ ] Panels work (open, close, resize, navigate)
- [ ] Keyboard navigation works (Tab, Enter, Escape, arrows)
- [ ] Fullscreen / reading mode works and exits cleanly

### UX

- [ ] No tool-store feeling (toolbar is viewer-focused, not editor-focused)
- [ ] No unnecessary panels visible by default
- [ ] No unnecessary windows (all interactions in main window)
- [ ] Document state preserved per tab (page, zoom, scroll, panel state)
- [ ] Reading position preserved after navigation, search, tab switch
- [ ] UI remains calm during long reading sessions
- [ ] No document reloads on navigation, zoom, or panel toggle
- [ ] Progressive disclosure for advanced features

### Accessibility

- [ ] All text meets 4.5:1 contrast (both themes)
- [ ] All UI components meet 3:1 contrast
- [ ] Focus indicators visible on all interactive elements
- [ ] Full keyboard navigation functional
- [ ] Icon-only buttons have accessible labels
- [ ] `prefers-reduced-motion` respected
- [ ] Screen reader announcements for page changes, search results
- [ ] No information conveyed by color alone

### Performance

- [ ] Smooth scrolling (60fps) with 100+ page documents
- [ ] Smooth zoom (no visible re-render lag)
- [ ] Efficient tab switching (no full re-render)
- [ ] No unnecessary PDF document reloads
- [ ] No obvious UI lag during panel open/close
- [ ] Thumbnails render lazily
- [ ] Search does not block UI
- [ ] Event listeners cleaned up on tab close
- [ ] Memory usage stable over long sessions

---

## 26. Source Traceability

This skill was derived from the UI UX Pro Max universal design knowledge base. The following table maps sections to their source origins:

| This Skill Section | Source Origin |
|--------------------|--------------|
| 1. AI Operating Instructions | Section 1 (AI Operating Instructions) of source, specialized |
| 2. Product Category | Section 10 (Product Type Reference) methodology, new category |
| 3. Style Intelligence | Section 6 (UI Style Library) evaluation criteria, filtered |
| 4. Color System | Section 4.1 (Color Palette tokens) + Section 7 (Color System Library) methodology, specialized |
| 5. Typography | Section 8 (Typography Library) methodology, specialized |
| 6. Spacing & Density | Section 2.3 (Design Dials) + Section 4.2 (Spacing Scale), adapted |
| 7. Layout Model | Section 4.5 (Page Override Architecture) layout inference, specialized |
| 8. Document-First | New principle derived from source's "UX before decoration" rule |
| 9. Toolbar | Section 4.4 (Component Specs) + Section 11 (UX Guidelines), specialized |
| 10. Tab System | Section 11 (UX Guidelines) navigation rules, specialized |
| 11. Navigation | Section 11 (UX Guidelines) + Section 12 (Accessibility), specialized |
| 12. Reading Experience | Section 11 (UX Guidelines) + Section 13 (Responsive Design), specialized |
| 13. Search | Section 11 (UX Guidelines: Search patterns), specialized |
| 14. Zoom | Section 20 (Touchpad/Pointer), new detailed guidance |
| 15. Touchpad/Pointer | Section 16 (Technology Guidance: WPF, JavaFX, Avalonia, WinUI input patterns), specialized |
| 16. Keyboard | Section 12.2 (Keyboard Navigation) + Section 11 (UX: Focus States), specialized |
| 17. Reading Modes | New section. Informed by source's dark mode detection (Section 7.2) |
| 18. Accessibility | Section 12 (Accessibility) fully adapted |
| 19. Icons | Appendix A (Icon Library) + Section 1.3 (Forbidden Actions: no emoji), specialized |
| 20. Motion | Section 14 (Interaction and Motion) filtered for subtle desktop UI |
| 21. Performance | Section 16 (React/Next.js Performance) principles adapted for desktop rendering |
| 22. Anti-Patterns | Section 17 (Anti-Patterns) universal rules + new PDF-specific additions |
| 23. Decision Pipeline | Section 3 (Design Decision Pipeline) restructured for viewers |
| 24. Master Design System | Section 4 (Design System Architecture) template, specialized |
| 25. Quality Checklist | Section 23 (Final UI/UX Quality Checklist) restructured for viewers |

---

## Appendix A: Example Design System (Light Theme)

This is a complete example of what a PDF viewer design system might look like. It is illustrative, not prescriptive.

```
STYLE: Refined Minimalism
PLATFORM: Windows Desktop (WPF / Web-based)
DENSITY: 5 (Standard-Compact)
MOTION: Subtle (100–200ms, ease-out)

COLORS (Light):
  --app-bg:            #F5F5F5
  --workspace-bg:      #E8E8E8
  --surface-elevated:  #FFFFFF
  --surface-selected:  #E3F2FD
  --surface-hover:     #F0F0F0
  --text-primary:      #1A1A1A
  --text-secondary:    #6B6B6B
  --text-disabled:     #B0B0B0
  --border:            #E0E0E0
  --accent:            #0066CC
  --focus-ring:        #0066CC
  --destructive:       #DC2626
  --success:           #16A34A
  --toolbar-bg:        #FFFFFF
  --tab-active-bg:     #FFFFFF
  --tab-inactive-bg:   #E8E8E8
  --page-shadow:       rgba(0,0,0,0.12)
  --scrollbar:         #C0C0C0

COLORS (Dark):
  --app-bg:            #1E1E1E
  --workspace-bg:      #2D2D2D
  --surface-elevated:  #252526
  --surface-selected:  #37373D
  --surface-hover:     #2A2D2E
  --text-primary:      #E0E0E0
  --text-secondary:    #9E9E9E
  --text-disabled:     #5A5A5A
  --border:            #3E3E3E
  --accent:            #4D9EFF
  --focus-ring:        #4D9EFF
  --destructive:       #F87171
  --success:           #4ADE80
  --toolbar-bg:        #2D2D2D
  --tab-active-bg:     #1E1E1E
  --tab-inactive-bg:   #2D2D2D
  --page-shadow:       rgba(0,0,0,0.4)
  --scrollbar:         #555555

TYPOGRAPHY:
  Family: System (Segoe UI on Windows)
  App title:    13px / 600 / 1.2
  Tab title:    12px / 500 / 1.2
  Toolbar:      11px / 500 / 1.0
  Page number:  12px / 500 / 1.0 (tabular figures)
  Sidebar head: 11px / 600 / 1.2 / uppercase / ls 0.5px
  Panel item:   12px / 400 / 1.4
  Search text:  12px / 400 / 1.4
  Metadata:     11px / 400 / 1.4
  Tooltip:      11px / 400 / 1.3
  Dialog:       13px / 400 / 1.5
  Status bar:   11px / 400 / 1.0

SPACING:
  --space-2xs: 2px
  --space-xs:  4px
  --space-sm:  8px
  --space-md:  12px
  --space-lg:  16px
  --space-xl:  24px
  --space-2xl: 32px

DIMENSIONS:
  Toolbar height:     36px
  Tab bar height:     34px
  Status bar height:  24px
  Sidebar min width:  180px
  Sidebar max width:  400px
  Sidebar default:    240px
  Page gap:           20px
  Icon size (toolbar): 18px
  Icon size (panel):   14px
  Icon size (tab):     12px

ICONS:
  Family: Phosphor (Outline)
  Stroke: 1.5px
  Sizes: sm=14, md=16, lg=18, xl=20

MOTION:
  Duration: 100–200ms
  Easing: ease-out (cubic-bezier(0, 0, 0.2, 1))
  Panel slide: 150ms
  Tab switch: 100ms
  Hover: 100ms
  Menu: 120ms
  Reduced motion: instant (0ms)
```

---

*This skill file is a specialized extraction from the UI UX Pro Max universal design knowledge base, filtered and reorganized exclusively for professional desktop PDF viewer design. It is self-contained and does not require the source file for use.*

*Version: 1.0*
*Category: Professional Desktop PDF Viewer*
*Platform Focus: Desktop (Windows primary, cross-platform secondary)*
```