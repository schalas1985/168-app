# Compass Design System

**Version:** 7  
**Status:** Active  
**Rule:** Read this file before every build. Never deviate without updating this file first.

---

## Colour Tokens

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#F7F5F0` | Page background (warm white) |
| `--surface` | `#FFFFFF` | Card / panel background |
| `--surface2` | `#F0EDE6` | Input / secondary surface |
| `--surface3` | `#E8E4DA` | Hover / tertiary surface |
| `--ink` | `#1A1916` | Primary text |
| `--ink2` | `#6B6760` | Secondary text |
| `--ink3` | `#A8A49E` | Placeholder / label text |
| `--ink4` | `#D3CFC6` | Dividers / disabled states |
| `--accent` | `#2D6A4F` | Primary action (forest green) |
| `--accent2` | `#D8EDE4` | Accent background tint |
| `--accent3` | `rgba(45,106,79,0.08)` | Subtle accent fill |
| `--gold` | `#8A6A1A` | Warning / secondary action |
| `--gold2` | `#FDF3DC` | Gold background tint |
| `--warm` | `#9A3D1A` | Destructive / alert |
| `--warm2` | `#FDEEE8` | Warm background tint |
| `--blue` | `#1A5F8A` | Info / link |
| `--blue2` | `#E6F1FB` | Blue background tint |
| `--purple` | `#5A3F9A` | Tag / special |
| `--purple2` | `#EEE8FB` | Purple background tint |
| `--border` | `rgba(26,25,22,0.10)` | Standard border |
| `--border2` | `rgba(26,25,22,0.05)` | Subtle border |

---

## Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / headings | Cormorant Garamond (`--font-d`) | 300 / 400 / 600 | 16–22px |
| Body / UI | Jost (`--font-b`) | 300 / 400 / 500 | 12–14px |
| Meta / labels | Jost | 400–500 | 9–11px |

**Scale:** 9 · 10 · 11 · 12 · 13 · 14 · 16 · 18 · 20 · 22px

---

## Spacing

`4 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 24px`  
Never use arbitrary values outside this scale.

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius` | `16px` | Cards, modals, panels |
| `--radius-sm` | `10px` | Inputs, buttons, chips |
| Pill | `20px` | Inner tabs, filter chips |
| Tight | `6–8px` | Small badges, inline tags |

---

## Components

### `.card`
- Background: `--surface`
- Border: `1px solid var(--border)`
- Border radius: `--radius`
- Padding: `18px`
- Margin bottom: `10px`

### `.card-dim`
- Background: `--surface2`
- Border: `1px solid var(--border2)`

### `.btn-primary`
- Background: `--accent`
- Text: `#fff`
- Width: 100% by default
- Padding: `13px`
- Font size: `14px`
- Hover: `#245c42`

### `.btn-ghost`
- Background: transparent
- Border: `1px solid var(--border)`
- Text: `--ink3`
- Hover: background `--surface2`, text `--ink`

### `.btn-sm`
- Width: auto
- Padding: `6px 13px`
- Font size: `12px`

### `.field`
- Background: `--surface2`
- Border: `1px solid var(--border)`
- Border radius: `--radius-sm`
- Padding: `11px 13px`
- Font size: `14px`
- Focus: border-color `--accent`

### `.slabel`
- Font size: `10px`
- Font weight: `500`
- Letter spacing: `0.12em`
- Text transform: uppercase
- Color: `--ink3`
- Text align: center
- Margin: `22px 0 9px`

### `.nav-btn`
- Font size: `12px`
- Active: border-bottom `2px solid var(--accent)`, text `--ink`, weight `500`

### `.inner-tab` (pill tabs)
- Inactive: border `1px solid var(--border)`, text `--ink3`
- Active: background `--ink`, text `#fff`, border `--ink`

### `.tag-chip`
- Padding: `3px 9px`
- Border radius: `20px`
- Font size: `11px`
- Color and background derived from value colour

### `.inbox-filter`
- Same pattern as `.inner-tab` but smaller padding

---

## Data Structures

### Entry (daily check-in)
```
{ date, meaningful, energyM, energyE, commits[], morningDone, eveningDone, align, acknowledge, offcourseItems[] }
```

### Inbox item
```
{ id, text, type, date, ts, recordedAt, source, projectRef? }
```
**Types:** `uncategorised · action · emotion · feeling · idea · insight · memory · thought · project · area · resource`

### Project / Area / Resource / Archive
```
{ name, objective, nextAction, upNext, notes, domain, where, status, basbTab, primaryValue, otherValues[], subtasks[], dueDate, created }
```
**Status cycle:** `active → waiting → done → archived`  
**Up Next rule:** Only surfaces in My Week when explicitly sent via "Send Up Next to Week". Never auto-populated from Inbox.

### Time Block
```
{ id, date, hour, duration, label, valueTag, domain, created }
```
**Hour granularity:** 0–23 (full hours) + 0.5 offset for 30-min slots

### Value
```
{ name, tag, desc, color, history[] }
```

### Capture (journal)
```
{ id, text, type, ts, date }
```

---

## Navigation Structure

```
My Day       → Morning check-in / Evening reflection
My Week      → Week grid (time blocks, value dots) / Month view
Inbox        → Fast capture → route to Maps or Journal
Maps         → Projects / Areas / Resources / Archives (BASB)
Journal      → Experience captures filtered by type
Insights     → Stats, value time chart, streak
Values       → Canvas (4-step) + My Values list
```

---

## Information Architecture Rules

1. **Everything lands in Inbox first.** No exceptions.
2. **Action items** route to Maps (Projects / Areas / Resources).
3. **Experience items** (emotion, feeling, idea, insight, memory, thought) route to Journal.
4. **Up Next** in My Week comes only from project cards via explicit "Send Up Next to Week". Never from Inbox auto-population.
5. **Values** drive commitment tags, time block tags, and the insights chart.
6. **Editable always.** Every entry belongs to the user. Nothing is locked.

---

## Buttons: Clickability Rules

- Every button must have a visible, working `onclick` handler or link to a real function.
- Buttons leading to unbuilt features must show a toast: `"Coming soon"` or `"Coming in [phase]"`.
- Never render a button that does nothing silently.

---

## Storage Keys

| Key | Contents |
|---|---|
| `cp_entries` | Daily check-in entries |
| `cp_inbox` | Inbox items |
| `cp_projects` | All Maps items (projects, areas, resources, archives) |
| `cp_values` | User values |
| `cp_captures` | Journal captures |
| `cp_profile` | User profile |
| `cp_timeblocks` | Week time blocks |
| `cp_domaintags` | Domain tag list |
| `cp_trash` | Soft-deleted items |

---

## Phase Map

| Feature | Phase |
|---|---|
| My Day (check-in / reflection) | Live |
| My Week (time blocks, week grid) | Live |
| Inbox (capture, route) | Live |
| Maps (projects, areas, resources) | Live |
| Journal | Live |
| Values canvas | Live |
| Insights | Live |
| Voice capture | Live |
| Drag and drop time blocks | v7 |
| 30-min time block slots | v7 |
| Up Next from Projects to Week | v7 |
| AI sidekick / suggestions | Phase 2 |
| Partner / accountability link | Phase 2 |
| Backend / multi-user data | Phase 3 |
| Mobile app | Phase 3 |
| Breathwork / inner work tools | Phase 3 |
| Notifications | Phase 3 |
| Billing / subscription | Phase 3 |

