# Wireframe 01 — Login Page

**File:** `wireframes/01-login.html`
**Status:** Complete
**Languages:** Azerbaijani (default), English, Russian

---

## Overview

Split-screen login page. Left panel is the brand/visual zone. Right panel contains the login form. Single-file HTML — no build step, no dependencies beyond Google Fonts.

---

## Typography (Design System)

| Font | Weight | Used for |
|---|---|---|
| `Instrument Serif` italic | regular italic | Left panel headline — editorial, dramatic |
| `DM Serif Display` | regular | Logo "SMB", form title "Xoş gəldiniz" |
| `DM Sans` | 400/500/600/700 | All UI text — labels, body, buttons |
| `JetBrains Mono` | 400/500 | Eyebrow label, footer, modules card label |

---

## Design Tokens Used

All colors reference the Arctic palette from `index.html`:

```
--clr-primary         #1B3A5C   buttons, borders, headlines
--clr-primary-hover   #24497A   button hover
--clr-accent          #2E6DA4   lang switcher active, links, eyebrow
--clr-secondary       #8BAFC8   input icons
--clr-secondary-light #9BBDCF   brand ERP label, left panel text
--clr-input-label     #2A4E70   form field labels
--clr-text-secondary  #4A7296   subtitle, remember me
--clr-text-muted      #7AAFC5   mini logo ERP label
--clr-border          #C8DCE8   input borders, lang switcher border
--clr-border-light    #E0EBF5   divider, form divider
--clr-bg-subtle       #F4F7FB   input background (unfocused)
```

---

## Layout

- **Split screen:** left 45% / right 55%
- **Height:** 100vh, no scroll on desktop

### Responsive Breakpoints

| Range | Behaviour |
|---|---|
| > 1100px | Full side-by-side, default sizing |
| 901–1100px | Compact side-by-side — reduced fonts/padding, fixes modules overflow |
| 769–900px | Tighter side-by-side — left panel 48%, further reduced |
| ≤ 768px | **Vertical stack** — left panel full-width on top, form below, page scrollable |
| ≤ 480px | Extra compact vertical — 2-column modules grid, reduced padding |

---

## Left Panel

### Background
- Animated mesh gradient — 6-stop linear gradient (`-45deg`, colors: `#081828` → `#0F2844` → `#1B3A5C` → `#112236` → `#1A3F6F` → `#0A1E32`) cycling every 18 seconds via `background-size: 400% 400%`

### Layers (bottom to top)

| Layer | Type | Detail |
|---|---|---|
| 1 | Mesh gradient | Animated background (see above) |
| 2 | Ambient orb 1 | `380px` blurred circle, top-right, `rgba(46,109,164,0.55)`, drifts 14s |
| 3 | Ambient orb 2 | `320px` blurred circle, bottom-left, `rgba(20,60,110,0.7)`, drifts 18s |
| 4 | Ambient orb 3 | `240px` blurred circle, center, `rgba(46,109,164,0.20)`, drifts 11s |
| 5 | SVG geometry | See geometric layer below |
| 6 | Film grain | SVG `feTurbulence` noise as data URL, 4% opacity, 160px tile |
| 7 | Content | Logo, headline, modules card, trust badges |

### Geometric SVG Layer (`viewBox="0 0 540 900"`)

| Element | Description | Animation |
|---|---|---|
| Ring pair A | Two concentric circles at `(500, 20)`, radii 310 + 260 | Slow clockwise spin, 120s |
| Ring B | Dashed circle at `(500, 20)`, radius 200 | Counter-clockwise spin, 80s |
| Arc bottom-left | Circle at `(-30, 870)`, radius 230 | Draws itself on load (stroke-dashoffset, 3.5s) |
| Hexagon pair | Two nested hexagons, center-left | Opacity pulse 5s |
| Diamond | Rotated square outline, right-center | Static |
| Triangle | Small triangle outline, mid-right | Static |
| Corner brackets | `⌐` marks top-left and bottom-right | Static |
| Plus crosses | Three `+` accents scattered | Static |
| Diagonal lines | 3 parallel lines, lower-left | Static |
| Ghost circle | Thin circle `r=100` mid-panel | Static |
| Floating dots | 8 dots, various sizes and opacities | Float up/down, staggered 4.5–7s |

### Logo Mark
- Rounded square border `32×32px`, `border: 2px solid rgba(255,255,255,0.5)`
- Inner rotated square `14×14px` via `::after`, `transform: rotate(15deg)`
- Text: "SMB" in `DM Serif Display`, "ERP" in `DM Sans` uppercase

### Headline
- `Instrument Serif` italic, 52px, line-height 1.05
- Text gradient: `linear-gradient(160deg, #ffffff 30%, #9BBDCF 100%)` via `-webkit-background-clip: text`
- Supports `<br>` line break via i18n `\n` replacement

### Modules Showcase Card
- Glassmorphism: `rgba(255,255,255,0.06)` background, `backdrop-filter: blur(16px)`, `border: 1px solid rgba(255,255,255,0.11)`
- Header: "ERP Modulları" label in `JetBrains Mono` uppercase
- 2-column grid of 6 module pills
- Each pill: icon (SVG, `28×28px` icon container with `rgba(46,109,164,0.30)` bg) + module name in `DM Sans`
- Modules shown (from actual product FRDs): Maliyyə, Satış, Anbar, Bank, Hesabatlar, Kontragentlər
- No numbers, no fake data
- Fully translated in AZ / EN / RU

### Trust Badges
- 3 badges with SVG icons: shield (Təhlükəsiz), clock (Sürətli), checkmark (Etibarlı)
- `DM Sans`, 11px, `rgba(255,255,255,0.45)`

---

## Right Panel

### Background
- `#F7FAFD` (off-white with subtle blue tint)
- Two pseudo-element radial glows (very light): top-right `rgba(46,109,164,0.07)`, bottom-left `rgba(46,109,164,0.05)`

### Header
- Mini logo (same mark, dark version)
- Language switcher: `AZ | EN | RU` pill group, active state uses `--clr-primary` fill

### Form Card
- Floating card: `background: #fff`, `border-radius: 20px`, `padding: 40px 36px 36px`
- Box shadow: three-layer (1px ambient + 16px soft + 1px border ring)
- Max-width: `368px`, centered vertically

### Form Structure (top to bottom)
1. Eyebrow — `JetBrains Mono` 10px uppercase, accent color
2. Form title — `DM Serif Display` 28px
3. Form subtitle — `DM Sans` 13px, secondary color
4. Horizontal divider
5. Error banner (hidden by default) — red bg + `!` badge prefix
6. Email input — envelope icon left, type=email
7. Password input — lock icon left, eye toggle right
8. Remember me checkbox + Forgot password link
9. Login button — gradient (`--clr-primary` → `#245E90`), glow shadow, lifts 1px on hover
10. Footer — `JetBrains Mono` 10px, muted

### Input States
- Default: `--clr-bg-subtle` background, `--clr-border` border
- Focus: white background, `--clr-primary` border, `3px` glow ring
- Error: `#EF4444` border, `3px` red glow ring on focus
- Error hint: `DM Sans` 11px, `#EF4444`

---

## Interactions

| Interaction | Behavior |
|---|---|
| Language switch | Updates all `[data-i18n]` text and `[data-i18n-placeholder]` instantly, no reload |
| Password eye toggle | Switches `type="password"` ↔ `type="text"`, swaps icon |
| Remember me | Toggles `.checked` class on the checkbox div |
| Form submit (invalid) | Shows red borders + hint text per field |
| Form submit (valid) | Loading spinner on button, disabled state, resets after 2s with error banner (wireframe simulation) |

---

## i18n Keys

```
headline, subtext, modulesLabel,
mod1–mod6, trust1–trust3,
eyebrow, formTitle, formSubtitle,
emailLabel, emailPlaceholder, emailError,
passwordLabel, passwordError,
rememberMe, forgotPassword, loginBtn,
errorBanner, footerText
```

---

## What Was Changed Across Sessions

### Session 1 — Initial build
- Created `wireframes/01-login.html` from scratch
- Split-screen layout, design system tokens, AZ/EN/RU language switcher
- Email + password fields with icons, remember me, forgot password, login button with spinner
- Basic dot-grid texture and radial glow on left panel

### Session 2 — Geometric upgrade
- Left panel background → animated mesh gradient
- Added 3 animated ambient glow orbs
- Added film grain overlay
- Added full SVG geometric layer (rings, hexagon, diamond, triangle, brackets, crosses, dots)
- Switched headline from `DM Serif Display` to `Instrument Serif` italic with text gradient
- Added geometric logo mark
- Right panel → `#F7FAFD` with corner glows
- Form → floating card with shadow
- Button → gradient + glow shadow + hover lift
- Inputs → subtle filled background, clears on focus
- Error banner → `!` badge prefix
- Added eyebrow label

### Session 4 — Responsive overhaul
- Replaced `display: none` on mobile with vertical stack layout
- Left panel stays visible — stacks on top of the form at ≤ 768px
- `body` `overflow: hidden` overridden to `overflow-y: auto` on mobile so page scrolls
- 4 breakpoints: 1100px, 900px, 768px, 480px
- Modules grid: 2 columns (desktop) → 3 columns (tablet/mobile) → 2 columns (< 480px)
- Module pills switch to column layout at 768px for narrow cells, back to row at 480px
- Fonts, padding, gaps reduce progressively at each breakpoint

### Session 3 — Metrics card removed
- Removed glassmorphism metrics card (fake data: revenue, document count, sparklines, live dot)
- Replaced with ERP modules showcase card — 6 real modules with icons, no numbers, fully translated
