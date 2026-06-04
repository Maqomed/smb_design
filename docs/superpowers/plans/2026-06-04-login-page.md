# Login Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished split-screen login page wireframe at `wireframes/01-login.html` using the SMB ERP design system tokens and components.

**Architecture:** Single self-contained HTML file with embedded CSS and JS. No build step, no dependencies beyond Google Fonts (already used in the design system). All language strings stored in a JS object; a language switcher updates the DOM via `data-i18n` attributes.

**Tech Stack:** HTML5, CSS3 (custom properties from design system), vanilla JS (ES6)

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `wireframes/01-login.html` | Create | Complete login page: layout, styles, JS |

---

## Task 1: Scaffold — base HTML + design system tokens

**Files:**
- Create: `wireframes/01-login.html`

- [ ] **Step 1: Create the file with full HTML scaffold**

Create `wireframes/01-login.html` with this exact content:

```html
<!DOCTYPE html>
<html lang="az">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>SMB ERP — Daxil ol</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<style>

/* ── Design System Tokens ─────────────────────────── */
:root {
  --clr-primary:         #1B3A5C;
  --clr-primary-hover:   #24497A;
  --clr-accent:          #2E6DA4;
  --clr-accent-hover:    #245E90;
  --clr-secondary:       #8BAFC8;
  --clr-secondary-light: #9BBDCF;
  --clr-input-label:     #2A4E70;
  --clr-text-secondary:  #4A7296;
  --clr-text-muted:      #7AAFC5;
  --clr-border:          #C8DCE8;
  --clr-border-light:    #E0EBF5;
  --clr-bg-page:         #EEF3F8;
  --clr-bg-hover:        #F0F6FF;
  --clr-bg-subtle:       #F4F7FB;
  --clr-accent-bg:       #DBEAFE;
  --clr-accent-fg:       #1E3A7A;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--clr-bg-page);
  color: var(--clr-primary);
  font-size: 14px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  height: 100vh;
  overflow: hidden;
}

</style>
</head>
<body>

  <div id="app"></div>

  <script>
    // placeholder — JS added in later tasks
  </script>

</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open `wireframes/01-login.html` in a browser. Expected: blank page with `--clr-bg-page` background color (`#EEF3F8` — a light blue-grey). No errors in console.

---

## Task 2: Split-screen layout

**Files:**
- Modify: `wireframes/01-login.html`

- [ ] **Step 1: Add layout CSS inside `<style>`**

Add after the `body` rule:

```css
/* ── Layout ───────────────────────────────────────── */
.login-wrap {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.panel-left {
  width: 45%;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  background: var(--clr-primary);
}

.panel-right {
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
}
```

- [ ] **Step 2: Replace `<div id="app">` with the layout HTML**

```html
<div class="login-wrap">
  <div class="panel-left"></div>
  <div class="panel-right"></div>
</div>
```

- [ ] **Step 3: Verify in browser**

Expected: left half is deep navy `#1B3A5C`, right half is white. Full viewport height, no scroll.

---

## Task 3: Left panel — texture, gradient, logo, headline, trust badges

**Files:**
- Modify: `wireframes/01-login.html`

- [ ] **Step 1: Add left panel CSS**

Add inside `<style>`:

```css
/* ── Left Panel ───────────────────────────────────── */
.panel-left-inner {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 48px;
}

/* Dot-grid texture overlay */
.panel-left::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 28px 28px;
  z-index: 0;
}

/* Radial depth accent top-right */
.panel-left::after {
  content: '';
  position: absolute;
  top: -80px;
  right: -80px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(46,109,164,0.45) 0%, transparent 70%);
  z-index: 0;
}

/* Logo */
.brand-logo {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: auto;
}
.brand-smb {
  font-family: 'DM Serif Display', serif;
  font-size: 26px;
  color: #fff;
  letter-spacing: -0.5px;
}
.brand-erp {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--clr-secondary-light);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

/* Headline block */
.brand-headline {
  margin-bottom: 48px;
}
.brand-headline h1 {
  font-family: 'DM Serif Display', serif;
  font-size: 36px;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin-bottom: 12px;
}
.brand-headline p {
  font-size: 14px;
  color: var(--clr-secondary-light);
  line-height: 1.6;
  max-width: 300px;
}

/* Trust badges */
.trust-row {
  display: flex;
  gap: 20px;
}
.trust-badge {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255,255,255,0.65);
}
.trust-badge svg {
  opacity: 0.7;
  flex-shrink: 0;
}
```

- [ ] **Step 2: Replace `<div class="panel-left"></div>` with full left panel HTML**

```html
<div class="panel-left">
  <div class="panel-left-inner">

    <div class="brand-logo">
      <span class="brand-smb">SMB</span>
      <span class="brand-erp">ERP</span>
    </div>

    <div class="brand-headline">
      <h1 data-i18n="headline">Biznesinizi<br>idarə edin</h1>
      <p data-i18n="subtext">Maliyyə, satış, anbar və mühasibatlıq — hamısı bir yerdə.</p>
    </div>

    <div class="trust-row">
      <div class="trust-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span data-i18n="trust1">Təhlükəsiz</span>
      </div>
      <div class="trust-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span data-i18n="trust2">Sürətli</span>
      </div>
      <div class="trust-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <span data-i18n="trust3">Etibarlı</span>
      </div>
    </div>

  </div>
</div>
```

- [ ] **Step 3: Verify in browser**

Expected: Left panel shows logo top-left ("SMB ERP"), large headline in center-bottom area, three trust badges at bottom. Dot-grid texture is visible over the navy. Blue glow visible top-right.

---

## Task 4: Right panel — header (mini logo + language switcher)

**Files:**
- Modify: `wireframes/01-login.html`

- [ ] **Step 1: Add right panel header CSS**

Add inside `<style>`:

```css
/* ── Right Panel ──────────────────────────────────── */
.panel-right-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 40px;
  flex-shrink: 0;
}

/* Mini logo (dark version) */
.brand-logo-mini {
  display: flex;
  align-items: baseline;
  gap: 5px;
}
.brand-logo-mini .brand-smb {
  font-family: 'DM Serif Display', serif;
  font-size: 18px;
  color: var(--clr-primary);
}
.brand-logo-mini .brand-erp {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 600;
  color: var(--clr-text-muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

/* Language switcher */
.lang-switcher {
  display: flex;
  gap: 4px;
  background: var(--clr-bg-subtle);
  border: 1px solid var(--clr-border-light);
  border-radius: 8px;
  padding: 3px;
}
.lang-btn {
  padding: 5px 12px;
  border-radius: 6px;
  border: none;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--clr-text-secondary);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  letter-spacing: 0.04em;
}
.lang-btn:hover { color: var(--clr-primary); }
.lang-btn.active {
  background: var(--clr-accent);
  color: #fff;
}
```

- [ ] **Step 2: Replace `<div class="panel-right"></div>` with right panel HTML (header only for now)**

```html
<div class="panel-right">

  <div class="panel-right-header">
    <div class="brand-logo-mini">
      <span class="brand-smb">SMB</span>
      <span class="brand-erp">ERP</span>
    </div>
    <div class="lang-switcher">
      <button class="lang-btn active" data-lang="az">AZ</button>
      <button class="lang-btn" data-lang="en">EN</button>
      <button class="lang-btn" data-lang="ru">RU</button>
    </div>
  </div>

  <!-- Form area added in Task 5 -->
  <div class="form-area"></div>

</div>
```

- [ ] **Step 3: Verify in browser**

Expected: Right panel header shows mini "SMB ERP" logo left, language pill-switcher right with "AZ" highlighted in accent blue. Header sits at top of white panel.

---

## Task 5: Form — email, password, remember me, forgot password, button

**Files:**
- Modify: `wireframes/01-login.html`

- [ ] **Step 1: Add form CSS**

Add inside `<style>`:

```css
/* ── Form Area ────────────────────────────────────── */
.form-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px 40px;
}

.login-form {
  width: 100%;
  max-width: 360px;
}

.form-title {
  font-family: 'DM Serif Display', serif;
  font-size: 28px;
  color: var(--clr-primary);
  margin-bottom: 6px;
  letter-spacing: -0.3px;
}
.form-subtitle {
  font-size: 13px;
  color: var(--clr-text-secondary);
  margin-bottom: 32px;
}

/* Input group */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}
.input-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--clr-input-label);
}
.input-field-wrap {
  position: relative;
}
.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--clr-secondary);
  pointer-events: none;
  display: flex;
  align-items: center;
}
.input-field {
  width: 100%;
  height: 44px;
  padding: 0 40px 0 40px;
  border: 1.5px solid var(--clr-border);
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: var(--clr-primary);
  background: #fff;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.input-field:focus {
  border-color: var(--clr-primary);
  box-shadow: 0 0 0 3px rgba(27,58,92,0.1);
}
.input-field.error {
  border-color: #EF4444;
}
.input-field.error:focus {
  box-shadow: 0 0 0 3px rgba(239,68,68,0.12);
}
.input-hint {
  font-size: 11px;
  color: var(--clr-text-secondary);
}
.input-hint.error {
  color: #EF4444;
}

/* Password toggle button */
.pw-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--clr-secondary);
  display: flex;
  align-items: center;
  padding: 2px;
  transition: color 0.15s;
}
.pw-toggle:hover { color: var(--clr-primary); }

/* Remember me + forgot password row */
.form-extras {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  margin-top: 4px;
}
.remember-row {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}
.check-box {
  width: 16px;
  height: 16px;
  border: 2px solid var(--clr-border);
  border-radius: 4px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, border-color 0.15s;
}
.check-box.checked {
  background: var(--clr-primary);
  border-color: var(--clr-primary);
}
.check-box.checked::after {
  content: '';
  width: 9px;
  height: 5px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translateY(-1px);
}
.remember-label {
  font-size: 13px;
  color: var(--clr-text-secondary);
}
.forgot-link {
  font-size: 13px;
  color: var(--clr-accent);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.15s;
}
.forgot-link:hover {
  color: var(--clr-accent-hover);
  text-decoration: underline;
}

/* Submit button */
.btn-login {
  width: 100%;
  height: 46px;
  background: var(--clr-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  letter-spacing: 0.01em;
}
.btn-login:hover { background: var(--clr-primary-hover); }
.btn-login:active { transform: scale(0.99); }
.btn-login:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none;
}

/* Spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: none;
}
@keyframes spin { to { transform: rotate(360deg); } }
.btn-login.loading .spinner { display: block; }
.btn-login.loading .btn-label { opacity: 0.8; }

/* Error banner */
.error-banner {
  display: none;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #B91C1C;
}
.error-banner.visible { display: block; }

/* Footer */
.form-footer {
  text-align: center;
  margin-top: 24px;
  font-size: 11px;
  color: var(--clr-text-muted);
  font-family: 'JetBrains Mono', monospace;
}
```

- [ ] **Step 2: Replace `<div class="form-area"></div>` with the full form**

```html
<div class="form-area">
  <form class="login-form" id="loginForm" novalidate>

    <div class="form-title" data-i18n="formTitle">Xoş gəldiniz</div>
    <div class="form-subtitle" data-i18n="formSubtitle">Hesabınıza daxil olun</div>

    <div class="error-banner" id="errorBanner" data-i18n="errorBanner">
      E-poçt və ya şifrə yanlışdır.
    </div>

    <!-- Email -->
    <div class="input-group">
      <label class="input-label" data-i18n="emailLabel">E-poçt ünvanı</label>
      <div class="input-field-wrap">
        <span class="input-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </span>
        <input class="input-field" id="emailInput" type="email" autocomplete="email" data-i18n-placeholder="emailPlaceholder" placeholder="ad@şirkət.az" />
      </div>
      <span class="input-hint error" id="emailError" style="display:none" data-i18n="emailError">Düzgün e-poçt ünvanı daxil edin.</span>
    </div>

    <!-- Password -->
    <div class="input-group">
      <label class="input-label" data-i18n="passwordLabel">Şifrə</label>
      <div class="input-field-wrap">
        <span class="input-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </span>
        <input class="input-field" id="passwordInput" type="password" autocomplete="current-password" data-i18n-placeholder="passwordPlaceholder" placeholder="••••••••" />
        <button type="button" class="pw-toggle" id="pwToggle" aria-label="Şifrəni göstər">
          <svg id="eyeIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <span class="input-hint error" id="passwordError" style="display:none" data-i18n="passwordError">Şifrəni daxil edin.</span>
    </div>

    <!-- Remember me + Forgot password -->
    <div class="form-extras">
      <div class="remember-row" id="rememberRow">
        <div class="check-box" id="rememberCheck"></div>
        <span class="remember-label" data-i18n="rememberMe">Məni xatırla</span>
      </div>
      <a href="#" class="forgot-link" data-i18n="forgotPassword">Şifrəni unutmusunuz?</a>
    </div>

    <!-- Submit -->
    <button type="submit" class="btn-login" id="loginBtn">
      <div class="spinner"></div>
      <span class="btn-label" data-i18n="loginBtn">Daxil ol</span>
    </button>

    <div class="form-footer">v1.0 · SMB ERP</div>

  </form>
</div>
```

- [ ] **Step 3: Verify in browser**

Expected: Right panel shows a centered form with "Xoş gəldiniz" title, email field with envelope icon, password field with lock icon and eye toggle on right, remember me checkbox + forgot password link on same row, full-width navy login button. Footer "v1.0 · SMB ERP" at bottom.

---

## Task 6: JavaScript — language switcher + interactions

**Files:**
- Modify: `wireframes/01-login.html`

- [ ] **Step 1: Replace the `<script>` placeholder with full JS**

```html
<script>
/* ── i18n strings ─────────────────────────────────── */
const STRINGS = {
  az: {
    headline:        'Biznesinizi\nidarə edin',
    subtext:         'Maliyyə, satış, anbar və mühasibatlıq — hamısı bir yerdə.',
    trust1:          'Təhlükəsiz',
    trust2:          'Sürətli',
    trust3:          'Etibarlı',
    formTitle:       'Xoş gəldiniz',
    formSubtitle:    'Hesabınıza daxil olun',
    emailLabel:      'E-poçt ünvanı',
    emailPlaceholder:'ad@şirkət.az',
    emailError:      'Düzgün e-poçt ünvanı daxil edin.',
    passwordLabel:   'Şifrə',
    passwordPlaceholder: '••••••••',
    passwordError:   'Şifrəni daxil edin.',
    rememberMe:      'Məni xatırla',
    forgotPassword:  'Şifrəni unutmusunuz?',
    loginBtn:        'Daxil ol',
    errorBanner:     'E-poçt və ya şifrə yanlışdır.',
  },
  en: {
    headline:        'Manage your\nbusiness',
    subtext:         'Finance, sales, inventory and accounting — all in one place.',
    trust1:          'Secure',
    trust2:          'Fast',
    trust3:          'Reliable',
    formTitle:       'Welcome back',
    formSubtitle:    'Sign in to your account',
    emailLabel:      'Email address',
    emailPlaceholder:'you@company.com',
    emailError:      'Please enter a valid email address.',
    passwordLabel:   'Password',
    passwordPlaceholder: '••••••••',
    passwordError:   'Please enter your password.',
    rememberMe:      'Remember me',
    forgotPassword:  'Forgot password?',
    loginBtn:        'Sign in',
    errorBanner:     'Incorrect email or password.',
  },
  ru: {
    headline:        'Управляйте\nбизнесом',
    subtext:         'Финансы, продажи, склад и бухгалтерия — всё в одном месте.',
    trust1:          'Безопасно',
    trust2:          'Быстро',
    trust3:          'Надёжно',
    formTitle:       'Добро пожаловать',
    formSubtitle:    'Войдите в свой аккаунт',
    emailLabel:      'Адрес почты',
    emailPlaceholder:'вы@компания.ru',
    emailError:      'Введите корректный адрес электронной почты.',
    passwordLabel:   'Пароль',
    passwordPlaceholder: '••••••••',
    passwordError:   'Введите пароль.',
    rememberMe:      'Запомнить меня',
    forgotPassword:  'Забыли пароль?',
    loginBtn:        'Войти',
    errorBanner:     'Неверный адрес почты или пароль.',
  }
};

let currentLang = 'az';

/* ── Apply language ───────────────────────────────── */
function applyLang(lang) {
  currentLang = lang;
  const s = STRINGS[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (s[key] !== undefined) {
      // headline uses \n for line breaks
      if (key === 'headline') {
        el.innerHTML = s[key].replace(/\n/g, '<br>');
      } else {
        el.textContent = s[key];
      }
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (s[key] !== undefined) el.placeholder = s[key];
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
}

/* ── Language switcher clicks ─────────────────────── */
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

/* ── Password show/hide toggle ────────────────────── */
const pwInput  = document.getElementById('passwordInput');
const pwToggle = document.getElementById('pwToggle');
const eyeIcon  = document.getElementById('eyeIcon');

const EYE_OPEN   = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
const EYE_CLOSED = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`;

pwToggle.addEventListener('click', () => {
  const show = pwInput.type === 'password';
  pwInput.type = show ? 'text' : 'password';
  eyeIcon.innerHTML = show ? EYE_CLOSED : EYE_OPEN;
});

/* ── Remember me checkbox ─────────────────────────── */
const rememberCheck = document.getElementById('rememberCheck');
rememberCheck.addEventListener('click', () => {
  rememberCheck.classList.toggle('checked');
});

/* ── Form validation + loading state ─────────────── */
const loginForm    = document.getElementById('loginForm');
const loginBtn     = document.getElementById('loginBtn');
const emailInput   = document.getElementById('emailInput');
const emailError   = document.getElementById('emailError');
const passwordError= document.getElementById('passwordError');
const errorBanner  = document.getElementById('errorBanner');

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  // reset errors
  emailInput.classList.remove('error');
  pwInput.classList.remove('error');
  emailError.style.display = 'none';
  passwordError.style.display = 'none';
  errorBanner.classList.remove('visible');

  if (!validateEmail(emailInput.value.trim())) {
    emailInput.classList.add('error');
    emailError.textContent = STRINGS[currentLang].emailError;
    emailError.style.display = 'block';
    valid = false;
  }

  if (!pwInput.value) {
    pwInput.classList.add('error');
    passwordError.textContent = STRINGS[currentLang].passwordError;
    passwordError.style.display = 'block';
    valid = false;
  }

  if (!valid) return;

  // Show loading state (wireframe simulation — auto-reset after 2s)
  loginBtn.classList.add('loading');
  loginBtn.disabled = true;

  setTimeout(() => {
    loginBtn.classList.remove('loading');
    loginBtn.disabled = false;
    errorBanner.textContent = STRINGS[currentLang].errorBanner;
    errorBanner.classList.add('visible');
  }, 2000);
});

/* ── Init ─────────────────────────────────────────── */
applyLang('az');
</script>
```

- [ ] **Step 2: Verify language switcher**

Open browser. Click **EN** → all labels switch to English. Click **RU** → all labels switch to Russian. Click **AZ** → back to Azerbaijani. No page reload.

- [ ] **Step 3: Verify password toggle**

Click the eye icon on the password field. Expected: password becomes visible, icon changes to crossed-out eye. Click again — hidden again.

- [ ] **Step 4: Verify remember me checkbox**

Click the "Məni xatırla" row. Expected: checkbox shows a white checkmark on navy background. Click again — unchecked.

- [ ] **Step 5: Verify form validation**

Click "Daxil ol" with empty fields. Expected: both fields get red border, error messages appear below each. Enter a valid email + any password and submit — loading spinner shows on button for 2 seconds, then error banner appears above the button.

---

## Task 7: Mobile responsive

**Files:**
- Modify: `wireframes/01-login.html`

- [ ] **Step 1: Add responsive CSS at end of `<style>` block**

```css
/* ── Mobile ───────────────────────────────────────── */
@media (max-width: 768px) {
  .panel-left { display: none; }
  .panel-right { width: 100%; }
  .panel-right-header { padding: 20px 24px; }
  .form-area { padding: 0 24px 32px; align-items: flex-start; padding-top: 20px; }
  .login-form { max-width: 100%; }
}

@media (max-width: 480px) {
  .panel-right-header { padding: 16px 20px; }
  .form-area { padding: 16px 20px 28px; }
  .form-title { font-size: 24px; }
}
```

- [ ] **Step 2: Verify mobile layout**

In browser DevTools, toggle to a mobile viewport (e.g. iPhone SE, 375px wide). Expected: left panel hidden, form fills the full width, mini logo visible top-left of the page, language switcher top-right. Form is readable and tappable.

---

## Self-Review

**Spec coverage check:**
- [x] Split-screen layout 45/55 — Task 2
- [x] Left panel: dot-grid texture, radial gradient, logo, headline, trust badges — Task 3
- [x] Right panel header: mini logo + AZ/EN/RU switcher — Task 4
- [x] Form: email with icon, password with icon + eye toggle — Task 5
- [x] Remember me checkbox + forgot password link — Task 5
- [x] Full-width login button with loading state — Tasks 5 & 6
- [x] Footer "v1.0 · SMB ERP" — Task 5
- [x] Error states: field-level + banner — Task 6
- [x] Language switching (AZ default, EN, RU) with all strings — Task 6
- [x] Mobile responsive — Task 7
- [x] Uses design system tokens (`--clr-*`) throughout — Tasks 1-7

**Placeholder scan:** No TBD, no TODO, no "implement later". All code blocks are complete.

**Type consistency:** All element IDs referenced in JS (`loginForm`, `loginBtn`, `emailInput`, `passwordInput`, `pwToggle`, `eyeIcon`, `rememberCheck`, `emailError`, `passwordError`, `errorBanner`) match the HTML `id` attributes exactly.
