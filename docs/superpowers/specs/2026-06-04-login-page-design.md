# Login Page — Design Spec
**Date:** 2026-06-04  
**Project:** SMB ERP  
**Status:** Approved

---

## Overview

A full-viewport split-screen login page. It is the first screen users see, so it must be visually strong, professional, and fast to interact with. Built as a static HTML file using the existing SMB ERP design system tokens from `index.html`.

**Output file:** `wireframes/01-login.html`

---

## Layout

- **Split screen:** left panel 45% width, right panel 55% width
- No scroll — entire page fits within one viewport height
- **Mobile (< 768px):** left panel hidden, right panel takes full width with small logo at top

---

## Left Panel — Brand

| Property | Value |
|---|---|
| Background | `#1B3A5C` (design system `--clr-primary`) |
| Texture | Subtle dot-grid SVG pattern, white at ~6% opacity |
| Depth accent | Soft radial gradient from `#2E6DA4` at top-right corner |
| Logo | Simple text-based: **"SMB"** in `DM Serif Display`, white, 28px + **"ERP"** in `DM Sans` medium, muted blue-white |
| Headline | "Biznesinizi idarə edin" — white, `DM Serif Display`, ~36px |
| Subtext | Short description, muted blue-white, `DM Sans` 14px |
| Trust badges | 3 items bottom-left: "Təhlükəsiz · Sürətli · Etibarlı" with small SVG icons |

---

## Right Panel — Form

**Container:** white background, form centered vertically and horizontally, max-width 360px.

### Header area
- Small SMB ERP logo top-left (same text-based logo, dark version)
- Language switcher top-right: three pill buttons `AZ | EN | RU`
  - Active: filled accent blue `#2E6DA4`, white text
  - Inactive: ghost style, border `--clr-border`, text `--clr-text-secondary`
  - Switching updates all form labels instantly (no page reload)

### Form fields (in order)

1. **E-poçt ünvanı** (`E-mail address` / `Адрес почты`)
   - Input with envelope icon on left
   - Type: `email`
   - Uses `.input` class from design system

2. **Şifrə** (`Password` / `Пароль`)
   - Input with lock icon on left, eye toggle icon on right
   - Type: `password`, toggle shows/hides text
   - Uses `.input` class from design system

3. **Bottom row (two columns)**
   - Left: "Məni xatırla" checkbox + label (uses `.check-box` from design system)
   - Right: "Şifrəni unutmusunuz?" — link, accent color, no underline by default, underline on hover

4. **Daxil ol** button
   - Full width, 44px height (`.btn-lg` variant)
   - Background: `--clr-primary` (`#1B3A5C`)
   - On click: shows inline spinner, button disabled to prevent double submit
   - Uses `.btn.btn-primary.btn-lg` from design system

### Footer
- Centered below button: `v1.0 · SMB ERP` in muted text, 11px

---

## Error States

- Invalid email or wrong password: red border on relevant input (`.input-error`), small error message below field using `.input-hint.error`
- General auth error: small error banner above the button, red-tinted background

---

## Language Strings

| Key | AZ (default) | EN | RU |
|---|---|---|---|
| Email label | E-poçt ünvanı | Email address | Адрес почты |
| Password label | Şifrə | Password | Пароль |
| Remember me | Məni xatırla | Remember me | Запомнить меня |
| Forgot password | Şifrəni unutmusunuz? | Forgot password? | Забыли пароль? |
| Login button | Daxil ol | Sign in | Войти |
| Headline | Biznesinizi idarə edin | Manage your business | Управляйте бизнесом |
| Trust 1 | Təhlükəsiz | Secure | Безопасно |
| Trust 2 | Sürətli | Fast | Быстро |
| Trust 3 | Etibarlı | Reliable | Надёжно |

---

## Design System Tokens Used

From `index.html`:
- Colors: `--clr-primary`, `--clr-accent`, `--clr-border`, `--clr-text-secondary`, `--clr-text-muted`, `--clr-bg-subtle`
- Components: `.btn`, `.btn-primary`, `.btn-lg`, `.input`, `.input-label`, `.input-error`, `.input-hint`, `.check-box`
- Fonts: `DM Serif Display` (logo, headline), `DM Sans` (all body text)

---

## File Structure

```
wireframes/
  01-login.html    ← output of this spec
```

Logo is text-based (no image file needed for now).

---

## Out of Scope

- Actual authentication logic
- Backend integration
- Forgot password flow (separate wireframe)
- Registration page
