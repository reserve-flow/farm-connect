Below is a **coherent, production-ready design system** optimized for **Farsi + English**, public-record seriousness, and trust continuity across light/dark modes.

---

## 1) Typography system (Farsi + English, credibility-first)

### Principles

* Neutral, humanist, readable at small sizes
* No “startup” personality
* Excellent numerals (dates, quantities matter)
* Farsi and English must feel *equal*, not patched

---

### Primary Font (UI + body)

**Inter** (English)
**Vazirmatn** (Farsi)

Why:

* Both are modern, neutral, highly readable
* Similar x-height → visual harmony
* Vazirmatn is professional, not decorative

Fallbacks:

* English: `system-ui, -apple-system, Segoe UI`
* Farsi: `Tahoma` (still widely trusted in Iran)

CSS idea:

```css
font-family:
  "Inter",
  "Vazirmatn",
  system-ui,
  -apple-system,
  Segoe UI,
  Tahoma,
  sans-serif;
```

---

### Font Weights (strict)

* **400**: body, explanations
* **500**: labels, metadata
* **600**: headings, names
* **700+**: avoid (feels salesy)

---

### Type Scale (do not improvise)

| Role         | Size    | Line-height |
| ------------ | ------- | ----------- |
| Body         | 14–15px | 1.6         |
| Secondary    | 13px    | 1.5         |
| H3 (section) | 18px    | 1.4         |
| H2 (page)    | 22px    | 1.35        |
| Hero         | 28–32px | 1.2         |

Hero must stay calm. No 48px ego headlines.

---

### Numerals (important)

* Use **tabular numerals** for quantities, dates, IDs
* Same weight as body
* No stylized digits

---

## 2) Spacing + layout rules (“public record” feel)

### Core mental model

**Design it like a registry, not a feed.**

---

### Page Layout

* Max width: **1100–1200px**
* Content centered
* Generous margins

No edge-to-edge chaos.

---

### Vertical Rhythm

Base unit: **8px**

Common spacing:

* Section gap: 48–64px
* Card padding: 16–20px
* Table rows: 12–16px height

Consistency > creativity.

---

### Cards & Containers

* Border: 1px solid neutral gray
* Radius: 4–6px (small)
* Background: flat
* No shadows by default

If everything floats, nothing is accountable.

---

### Tables > Cards (where possible)

For commitments, history, outcomes:

* Tables or timeline rows
* Columns aligned
* Headers visible

This screams “records”.

---

### Alignment rules

* Left-align text (both languages)
* Right-align numbers
* Dates always same format

Misalignment kills trust.

---

### Empty space rule

If a section feels empty → good.
White space = confidence.

---

## 3) Dark mode (trust-preserving)

Dark mode is optional. If done wrong, it hides failure.
If done right, it feels like **an archive at night**.

---

### Dark Mode Background

* **Deep charcoal**, not black

  * `#0F1115` or `#121417`

Never pure black. Pure black feels secretive.

---

### Text

* Primary: `#E5E7EB`
* Secondary: `#9CA3AF`

Contrast must stay high.

---

### Borders & Dividers

* `#2A2E35`
  Borders are **more important** in dark mode.

---

### Status Colors (unchanged meaning)

* Success green → slightly desaturated
* Failure red → still unmistakable
* Do NOT “soften” failure in dark mode

Failure must remain uncomfortable.

---

### Dark Mode Rules

* No glow
* No neon
* No gradients
* No glass effects

Dark mode ≠ cyberpunk.

---

## Language Switching (small but important)

* Language switcher in footer or header (text-only)
* No flags
* Remember last choice

Farsi RTL:

* Mirror layout
* Keep numbers readable
* Do not reflow tables badly

---

## One-line system philosophy

> Typography is for reading.
> Spacing is for honesty.
> Color is for accountability.

---

## Final hard constraint (tell the dev)

If a design choice makes the platform feel:

* Trendy ❌
* Exciting ❌
* Clever ❌

It’s wrong.

If it feels:

* Calm
* Slightly boring
* Serious

It’s correct.

---

