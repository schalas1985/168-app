# Compass Component Spec

**Version:** 1.0  
**Rule:** Every reusable component is defined here with its states, variants, and rules. Build to spec, not to intuition.

---

## Card

**Class:** `.card`  
**Purpose:** Primary content container.

| Property | Value |
|---|---|
| Background | `--surface` (#FFFFFF) |
| Border | `1px solid var(--border)` |
| Border radius | `--radius` (16px) |
| Padding | `18px` |
| Margin bottom | `10px` |

**Variant: `.card-dim`**
- Background: `--surface2`
- Border: `1px solid var(--border2)`
- Use for: secondary panels, empty states

**Rules:**
- Cards never have drop shadows in light mode
- Cards never nest more than one level deep
- Cards scroll with the page -- they are not sticky

---

## Button: Primary

**Class:** `.btn.btn-primary`

| State | Background | Text |
|---|---|---|
| Default | `--accent` (#2D6A4F) | #fff |
| Hover | #245c42 | #fff |
| Active (press) | scale(0.98) | #fff |
| Disabled | `--ink4` | `--ink3` |

- Width: 100% by default. Use `.btn-sm` for auto width.
- Padding: `13px`
- Font: Jost 14px weight 400
- Margin top: `7px` above button in a form context

---

## Button: Ghost

**Class:** `.btn.btn-ghost`

| State | Background | Border | Text |
|---|---|---|---|
| Default | transparent | `var(--border)` | `--ink3` |
| Hover | `--surface2` | `var(--border)` | `--ink` |

---

## Button: Small

**Class:** `.btn-sm`
- Width: auto
- Padding: `6px 13px`
- Font size: `12px`
- Margin top: `0`

---

## Field (Input / Textarea)

**Class:** `.field`

| State | Border | Background |
|---|---|---|
| Default | `1px solid var(--border)` | `--surface2` |
| Focus | `1px solid var(--accent)` | `--surface2` |
| Error | `1px solid var(--warm)` | `--warm2` |

- Border radius: `--radius-sm` (10px)
- Padding: `11px 13px`
- Font: Jost 14px weight 400
- Placeholder: `--ink3`
- `input.field` height: `42px`
- `textarea.field` resize: none, line-height 1.6

---

## Nav Tab

**Class:** `.nav-btn`

| State | Text colour | Border bottom | Weight |
|---|---|---|---|
| Default | `--ink3` | transparent | 400 |
| Hover | `--ink2` | transparent | 400 |
| Active | `--ink` | `2px solid var(--accent)` | 500 |

- Font: Jost 12px
- Padding: `10px 14px 11px`
- Letter spacing: `0.03em`
- Never use background colour on nav tabs

---

## Inner Tab (Pill)

**Class:** `.inner-tab`

| State | Background | Border | Text |
|---|---|---|---|
| Default | transparent | `var(--border)` | `--ink3` |
| Active | `--ink` | `--ink` | #fff |

- Padding: `6px 18px`
- Border radius: `20px`
- Font: Jost 12px

---

## Tag Chip

**Class:** `.tag-chip`
- Padding: `3px 9px`
- Border radius: `20px`
- Font size: `11px`
- Colour and background are always derived from the associated value colour
- Pattern: `background: [value.color]22; color: [value.color];`

---

## Status Badge

**Class:** `.proj-status`

| Status | Class | Background | Text |
|---|---|---|---|
| active | `.ps-active` | `--accent2` | `--accent` |
| waiting | `.ps-waiting` | `--gold2` | `--gold` |
| done | `.ps-done` | `--surface3` | `--ink3` (strikethrough) |
| archived | `.ps-archived` | `--surface2` | `--ink3` |

- Click to cycle: active → waiting → done → archived → active
- Font size: `10px`
- Padding: `2px 7px`
- Border radius: `4px`
- Font weight: `500`
- Letter spacing: `0.06em`
- Text transform: uppercase

---

## Meatball Menu

**Class:** `.meatball-wrap > .meatball-btn + .meatball-menu`
- Opens on click, closes on click outside (document-level listener)
- Only one open at a time
- Position: absolute, right-aligned to button, top offset 32px
- Min width: `140px`
- Items: `9px 14px` padding, Jost 13px weight 300
- Danger item: `.meatball-item.danger` -- text `--warm`, hover background `--warm2`

---

## Project Card

**States:**
1. **Collapsed** -- name, status badge, value tag, domain tag, next action preview (first 60 chars)
2. **Edit open** -- full form expanded inline directly below this card
3. **Deleting** -- inline confirmation replaces action buttons

**Edit form behaviour:**
- Opens below the card that triggered it, not at top of page
- Animated: expand downward 200ms ease
- Closes on Save (saves data) or Cancel (discards changes)
- Only one edit form open at a time across all cards

**Progress bar:**
- Height: `3px`
- Background: `--surface3`
- Fill: `--accent`
- Transition: `width 0.4s ease`
- Shows only when at least one task exists

---

## Toast

- Position: fixed, bottom centre
- Offset: `80px` from bottom
- Background: `--ink`
- Text: `--bg`
- Padding: `8px 16px`
- Border radius: `20px`
- Font size: `12px`
- Duration: `2400ms`
- Animation: opacity 0→1, translateY 10px→0, 220ms
- Never stack -- new toast replaces current

---

## Capture Sheet

- Position: fixed, bottom of screen
- Width: 100%, max-width: 900px, centred
- Border radius: `--radius` on top corners only
- Animation: slideUp 220ms ease
- Overlay: `rgba(0,0,0,0.5)` with blur(4px)
- Close: ✕ button top right, or tap overlay

---

## Modal (Time Block, Archive, Domain Tag)

- Position: fixed, centred on screen
- Overlay: `rgba(0,0,0,0.45)`
- Max width: `360px` (time block), `520px` (archive)
- Click overlay: closes without saving
- Border radius: `--radius`
- Box shadow: `0 8px 32px rgba(0,0,0,0.15)`

---

## Energy Strip

- 10 buttons, equally spaced
- Single select
- Selected: `--accent2` background, `--accent` border and text
- Clicking selected button: deselects (returns to null state)

---

## Subtask Row

- Checkbox: `16px` circle, border `1.5px solid --ink3`
- Checked: background `--accent`, border `--accent`, white dot inside
- Text: `13px`, `--ink2`
- Done text: `--ink3`, `text-decoration: line-through`
- Remove: ✕ button, no confirmation needed

---

## Inline Form (opens below a card)

**Pattern for all inline forms in Maps:**
```
[card content]
[form -- expanded below, same width as card]
  [fields]
  [Save button] [Cancel button]
```

- Form wraps in a div with `id="form-[cardId]"`
- Animation: `max-height: 0 → auto, opacity: 0 → 1, 200ms ease`
- Collapse: reverse, `160ms ease`
- On open: scroll the card into view if partially off screen
- On save: collapse form, re-render card in place
- On cancel: collapse form, no data change

