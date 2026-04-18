# Compass Information Architecture Map

**Version:** 1.0  
**Rule:** Every screen and every connection between screens must be documented here. If a screen or connection is not here, it does not exist yet.

---

## Screen Map

```
compass
│
├── My Day
│   ├── Morning tab
│   │   ├── Energy (start of day)
│   │   ├── Meaningful question
│   │   └── Commitments (up to 6, value-tagged)
│   └── Evening tab
│       ├── Energy (end of day)
│       ├── Alignment question
│       ├── Acknowledge yourself
│       ├── Gratitude
│       ├── Body / Mind / Soul check
│       └── Off-course items
│
├── My Week
│   ├── Week title + nav slider
│   ├── Up Next panel (from Projects/Areas/Resources only)
│   ├── Values pie chart
│   ├── View dropdown (Week / Month)
│   ├── Week grid (time blocks, drag/drop, 30-min slots)
│   └── Month calendar (fallback view)
│
├── Inbox
│   ├── Filter row (All, Uncategorised, Action | Project, Area, Resource | Emotion, Feeling, Idea, Insight, Memory, Thought)
│   ├── Item list (with route buttons: → Maps, → Journal, ✕)
│   └── Capture input (type select, text, voice, send)
│
├── Maps
│   ├── Inbox tab (items routed from Inbox, promote to Projects/Areas/Resources)
│   ├── Projects tab (project cards)
│   ├── Areas tab (area cards)
│   ├── Resources tab (resource cards)
│   └── Archives tab (archived cards)
│
├── Journal
│   └── Filtered view of experience captures (Emotion, Feeling, Idea, Insight, Memory, Thought, Moment)
│
├── Insights
│   ├── This week stats (check-ins, energy averages, aligned days)
│   ├── Time by value chart
│   ├── Compass notice
│   ├── Streak grid
│   └── All entries list
│
└── Values
    ├── What values are (intro text)
    ├── Values Canvas (4-step guided discovery)
    │   ├── Step 1: Valued Living Questionnaire
    │   ├── Step 2: Linehan word chips
    │   ├── Step 3: Three reflection questions
    │   └── Step 4: Write first value
    └── My Values list (add, edit, view history)
```

---

## Connection Map

Every arrow means data flows or navigation exists between these two screens/components.

```
+ button (anywhere)
  → Capture sheet
    → Inbox (all captures land here first)

Inbox item
  → Maps (Action, Project, Area, Resource types)
  → Journal (Emotion, Feeling, Idea, Insight, Memory, Thought types)

Maps project card
  → Up Next panel in My Week (via "Send Up Next to Week")
  → Time block modal in My Week (via clicking Up Next item)

My Day morning commitments
  → My Week grid (commitment dots shown on day cells)
  → Insights (time by value chart uses commitment tags)
  → Values (commitment tags sourced from Values list)

My Day evening reflection
  → Insights (alignment data, energy data)
  → My Week month view (day detail shows reflection summary)

My Week time blocks
  → Insights (time by value chart counts time block value tags)
  → Values (time block value tags sourced from Values list)

Values
  → My Day (commitment value chip options)
  → My Week (time block value tag options)
  → Maps (project primary/other value options)
  → Insights (all charts and summaries use value names and colours)

Journal entry
  → Maps (via "→ Action in Maps" button, creates Inbox action item)

Trash (in Profile)
  ← Inbox items (soft delete)
  → Inbox (restore)
```

---

## Data Flow Summary

```
CAPTURE (+ button or Inbox input)
    ↓
INBOX (everything lands here first)
    ↓
    ├── ACTION → MAPS (Projects / Areas / Resources)
    │               ↓
    │           UP NEXT → MY WEEK (explicit send only)
    │
    └── EXPERIENCE → JOURNAL (Emotion, Feeling, Idea, Insight, Memory, Thought)

VALUES → drives tags on: Commitments, Time Blocks, Projects
COMMITMENTS + TIME BLOCKS → drives: Insights charts
MORNING + EVENING → drives: Insights stats, streak, week day detail
```

---

## Screen Relationships Table

| From | To | Trigger | Data passed |
|---|---|---|---|
| Inbox | Maps | → Maps button | Item text, type |
| Inbox | Journal | → Journal button | Item text, type, timestamp |
| Maps card | My Week Up Next | Send Up Next to Week | upNext text, project name |
| My Week Up Next | Time block modal | Click item | Label pre-filled |
| Journal entry | Inbox | → Action in Maps | Item text as action type |
| Values list | My Day commits | Value chip selection | Value name, colour |
| Values list | Time block modal | Value dropdown | Value name, colour |
| Values list | Maps card form | Value chip selection | Value name, colour |
| My Day morning | Insights | Save morning | Energy, commits, meaningful |
| My Day evening | Insights | Save evening | Energy, alignment |
| Time blocks | Insights | Auto | Value tag, duration |

---

## What Does Not Exist Yet (Phase 2+)

- Direct screen-to-screen navigation (e.g. tapping a value in Insights opens that value in Values)
- Notifications linking to specific screens
- Search across all data
- Partner/accountability view
- AI suggestions surfaced anywhere in the UI
- Goal path map (visual diagram)
- Midday drop as a distinct screen (currently handled by + button)

