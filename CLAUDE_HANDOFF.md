# SMB ERP Wireframe — Claude Handoff

## What This Project Is

A single-file HTML wireframe for an SMB ERP system. Built as a high-fidelity interactive prototype — real CSS, real JS, no framework. The user is the designer/developer and iterates on it with Claude.

---

## The Only File That Matters

```
C:\Dev\Work\smb_design\wireframes\03-module.html
```

Everything — HTML, CSS, JS — is inline in this one file. All edits go here.

---

## Rules (Non-Negotiable)

1. **Never run `git commit` or `git add`**. The user handles all commits themselves.
2. **No brainstorm → spec → plan flow for wireframe tasks**. Single HTML file = build directly.
3. **Background sessions**: edits must go to `.claude/worktrees/<name>/wireframes/03-module.html`, then copy to the working copy with `cp`. Always read the worktree file before editing.

---

## Architecture Overview

### Module System

Two ERP modules are implemented. URL param `?m=` selects which one (`?m=satis` or `?m=maliyye`). Default is `satis`.

```js
const MODULES = {
  satis:   { name, sidebar, tableHead, tableBody, ... },
  maliyye: { name, sidebar, tableHead, tableBody, ... },
};
const key = new URLSearchParams(window.location.search).get('m') || 'satis';
const mod = MODULES[key];
```

### Two Table Types

| Type | CSS class | How rendered |
|------|-----------|--------------|
| Normal | `table:not(.data-grid)` | HTML string injected into `#tableHead` / `#tableBody` |
| Complex data-grid | `table.data-grid` | Built entirely via `document.createElement` in `cgInit()` |

Which mode is used is determined by `data-complex="true"` on the sidebar nav button.

### Page Layout

```
.app
  header
  .app-body
    aside.sidebar          ← rendered by renderSidebar()
    .main
      .page-hd
      .toolbar             ← status filter, date range, Sütunlar btn, search, reset
      .table-wrap
        .data-card          ← either normal table OR replaced by cgInit()
      .pagination
```

---

## Key Functions

### `setActive(btn, title)`
Called when user clicks a sidebar nav item. Switches to complex grid or normal table:
```js
if (btn.dataset.complex === 'true') {
  cgInit();
} else {
  clearAllFilters();
  cgShowNormal();
}
```

### `cgInit()`
- Saves current `.data-card` innerHTML to `cgNormalHTML` (first call only)
- Clears `.data-card`, builds `grid-strip` (search only) + `tableScroll` + `table.data-grid`
- Wires the toolbar `#columnsBtn` → `_cgColsBtnHandler` (opens `cgColPanel`)
- Detaches `_ntColsBtnHandler` from `#columnsBtn` before adding its own handler
- Closes `_ntColPanel` if open
- Calls `cgRender()`

### `cgRender()`
Builds `<thead>` and `<tbody>` from `cgRows` data, applying:
- `cgFilterText` (search)
- `tbFilterStatus` (status dropdown)
- `tbFilterDateFrom` / `tbFilterDateTo` (date range)
- Column sort (`cgSortCol`, `cgSortDir`)
- Column visibility (`cgHiddenCols`)
- Column order (`cgCols` array)

### `cgShowNormal()`
Restores normal table from `cgNormalHTML`. Detaches `_cgColsBtnHandler`, closes `cgColPanel`, calls `ntInitTable()`.
```js
function cgShowNormal() {
  cgEditRow = null;
  // detach cg handler
  if (cgNormalHTML) {
    document.querySelector('.data-card').innerHTML = cgNormalHTML;
    cgTable = null;
    if (cgColPanel) { cgColPanel.classList.remove('open'); cgColPanel = null; }
  }
  ntInitTable(); // always re-wire Sütunlar for normal table
}
```

### `ntInitTable()`
Wires `#columnsBtn` → `_ntColsBtnHandler` for normal tables. Closes `_ntColPanel` on entry (prevents first-click-closes-panel bug). Sets outside-click handler to close the panel.

### `clearAllFilters()`
Resets status, date range, search filters and re-renders the active table.

---

## Toolbar — `#columnsBtn` (Sütunlar)

The single `<button id="columnsBtn" class="filter-btn">` in the toolbar is shared between both table types. Its handler is swapped on tab switch:

- **Normal tab**: `ntInitTable()` wires it → opens `_ntColPanel` (body-level div, column checkboxes built from `ntGetHeaders()`)
- **Complex tab**: `cgInit()` wires it → opens `cgColPanel` (body-level div, built from `cgAllCols`)

**Important**: `cgInit` must `removeEventListener` the nt handler before adding cg handler, and must close `_ntColPanel`. This prevents double-firing. ✓ Already implemented.

### Relevant Variables
```js
var cgColPanel = null;         // complex grid column toggle panel (body-level div)
var _cgColsBtnHandler = null;  // complex grid's click handler on #columnsBtn

var _ntColPanel = null;        // normal table column toggle panel (body-level div)
var _ntHiddenCols = {};        // { 'ColumnLabel': true } for hidden columns
var _ntColsBtnHandler = null;  // normal table's click handler on #columnsBtn

var cgTable = null;            // the data-grid <table> element (null when normal table showing)
var cgNormalHTML = null;       // saved innerHTML of .data-card (set once on first cgInit call)
var cgRows = [...];            // payment order data rows for the complex grid
var cgAllCols = [...];         // all column keys in order
var cgCols = [...];            // currently visible column keys (subset of cgAllCols)
var cgHiddenCols = {};         // { 'colKey': true } for hidden columns
var cgColWidths = {...};       // px widths per column key
var cgColLabels = {...};       // display label per column key
```

---

## Complex Data-Grid Features

The `table.data-grid` (Ödəniş tapşırıqları) has:
- **Sort**: click column header, `cgSortCol` / `cgSortDir`
- **Column reorder**: drag & drop column headers
- **Column resize**: drag resize handle at right edge of each `<th>`
- **Column toggle**: via `#columnsBtn` toolbar button → `cgColPanel`
- **Inline edit**: double-click a row → edit fields appear in-row
- **Context menu**: right-click row → custom context menu (`cgCtxEl`)
- **Select rows**: checkbox column + select-all in header
- **Search**: text input in grid-strip searches doc, payee, purpose
- **Status filter**: toolbar status dropdown (uses `cgRows` data when grid is active)
- **Date range filter**: toolbar date pickers

---

## Normal Table Features

Normal tables (`table:not(.data-grid)`) have:
- **Search**: `#searchInput` in toolbar searches visible text across all `<td>` in each row
- **Status filter**: reads `.badge` text from `#tableBody`
- **Date range filter**: reads date cells
- **Column toggle**: via `#columnsBtn` → `_ntColPanel`, built from `ntGetHeaders()`
- `ntGetHeaders()` skips first col (checkbox) and last col (actions)
- `ntApplyVisibility()` shows/hides `<th>` and `<td>` by index

---

## Sidebar & Modules

```js
function renderSidebar(sections) // returns HTML string of <button class="nav-item"> elements
```

Nav items are `<button>` elements (NOT `<li>`). The sidebar has `overflow-x: hidden` to clip the `.nav-item.active::before` accent bar (`left: -8px`).

On mobile (≤768px) the sidebar becomes a `position: fixed` overlay sliding in from the left.

---

## Known Issues / TODO

### 🔴 Dots next to checkbox (small screens, Ödəniş tapşırıqları)
**Status**: Was fixed in a previous session but user accidentally removed the fix. Needs to be re-applied.  
**Symptom**: On smaller screen widths, a small circular dot appears to the right of the checkbox in each row of the complex data-grid.  
**Screenshot**: `c:\Users\maqom\OneDrive\Pictures\Screenshots\Screenshot 2026-06-05 111648.png`  
**Previous fix**: Unknown — user believes they accidentally deleted some CSS or JS. Likely related to `list-style`, a pseudo-element, or overflow. To investigate: check whether `.data-grid tr` or `.data-grid td` needs `list-style: none`, or whether the `tableScroll` wrapper needs explicit `overflow: hidden` on Y axis.  
**To reproduce**: Open `?m=maliyye`, click "Ödəniş tapşırıqları", narrow the browser window below ~1100px.

---

## Responsive Breakpoints

| Breakpoint | What changes |
|------------|--------------|
| `≤1024px` | Sidebar narrows to 200px |
| `≤768px` | Sidebar becomes fixed overlay; burger button shown; `table { min-width: 640px }` |
| `≤480px` | Page header stacks; logo shrinks |

---

## CSS Conventions

- CSS variables: `var(--clr-accent)`, `var(--clr-primary)`, `var(--clr-border)`, etc. — all defined in `:root`
- Icons: inline SVG via `icon(key)` helper function
- All panels (column toggle, context menu, filter dropdowns) are `position: fixed` or `position: absolute`
- Reset: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }` — note: no `list-style: none` in reset

---

## Git State

Branch: `main`  
Recent commits:
- `c07299d feat: grdi designs implementation` (HEAD at project start)
- `080f7d4 feat:wireframe setup`
- `bff4057 first commit`

The working copy (`wireframes/03-module.html`) has significant uncommitted changes from ongoing Claude sessions (user commits manually).
