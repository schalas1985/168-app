# Compass Behaviour Spec

**Version:** 1.0  
**Rule:** Every interaction in the app must match a rule in this document. If a rule does not exist, ask before building.

---

## General Interaction Principles

1. **Forms open inline, below the triggering element.** Never at the top of the page. Never in a separate page.
2. **Modals are for confirmation and time-sensitive input only** (e.g. time block creation). Everything else is inline.
3. **One open form at a time.** Opening a second form closes the first without saving.
4. **Save is always explicit.** Nothing saves automatically. The user always presses a button.
5. **Every destructive action requires confirmation.** Confirmation is a simple inline prompt, not a browser `confirm()` dialog.
6. **Errors show inline, below the field that caused them.** Never as alerts.
7. **Toast notifications** confirm completed actions. Duration: 2400ms. Position: bottom centre. Never stack.
8. **Scroll position is preserved** when a form opens or closes inline.
9. **Empty states always explain what to do next.** Never just "Nothing here."
10. **Buttons that lead to unbuilt features** show a toast: "Coming in [Phase X]." Never silent.

---

## Navigation

### Top nav tabs
- Click a tab: active view switches, tab gets accent underline, font-weight 500
- Active tab does not respond to a second click
- Switching tabs does not reset scroll position within that tab
- Tab state persists for the session

### Back navigation
- There is no browser back button dependency
- All "back" actions are explicit close/cancel buttons within the UI

---

## My Day

### Morning check-in
- Opens on the Morning inner tab by default each day
- If morning already saved today: show a read-only summary with an Edit button
- Edit button re-opens the form pre-filled with saved data
- "Start my day" button: validates at least one commitment exists, then saves and shows toast "Day started."
- Energy strip: single select, clicking a selected value deselects it (returns to null)
- Commitment rows: 3 by default. "Add another" adds a 4th with a warning message. Maximum 6.
- Value chips on commitment rows: multi-select, colour highlights on selection
- Removing a commitment row (4th+): removes immediately, no confirmation needed

### Evening reflection
- Opens on the Evening inner tab
- If evening already saved today: show read-only summary with Edit button
- "Close the day" button saves and shows toast "Day closed."
- Alignment options: single select radio style
- Off-course items: add/remove inline, no limit

---

## My Week

### Week grid
- Default view: current week, scrolled to current hour on load
- Week starts Monday
- Clicking the top half of an hour cell: opens time block modal with start time :00
- Clicking the bottom half of an hour cell: opens time block modal with start time :30
- Dragging a time block to a new cell: moves it, saves immediately, shows toast "Moved to [time]"
- Dropping on the bottom half of a cell: sets start time to :30
- Clicking an existing time block: opens time block modal pre-filled for editing
- Week navigation: ‹ and › shift by 7 days
- Today column: highlighted with accent tint
- Current time: red/accent line across all columns at current hour position

### Week title
- Format: "Week [number] · [Month] [Year]"
- Updates when week shifts

### View dropdown
- Options: Week, Month
- Default: Week
- Switching to Month: hides week grid, shows month calendar
- Switching back to Week: restores week grid, re-renders current week

### Sunday planning banner
- Visible only when My Week is active AND today is Sunday
- Dismissible: clicking an X hides it for the rest of that Sunday (session only)

### Up Next panel
- Sources: ONLY items explicitly sent from project/area/resource cards via "Send Up Next to Week"
- Each item shows: text, project name in blue below
- Clicking an item: opens time block modal pre-filled with that item's text
- ✕ on an item: removes it from Up Next immediately, no confirmation
- Empty state: "Use 'Send Up Next to Week' on a project card to add items here."

### Time block modal
- Opens centred on screen, overlay behind it
- Fields: Label (required), Start time (:00 or :30), Duration, Value tag, Domain tag
- Save: validates Label not empty, saves, closes modal, re-renders grid
- Delete: shows inline confirmation "Delete this block?" with confirm/cancel. On confirm: removes block, closes modal
- Cancel: closes modal, no save
- Clicking overlay: closes modal, no save

---

## Inbox

### Capture (+ button)
- Opens capture sheet from bottom of screen (slide up animation)
- Type selector: To Do, Idea, Feeling, Moment -- single select
- Text area: auto-focus on open
- Voice button: toggles listening, transcribes into text area
- "Hold this" button: saves, closes sheet, shows toast "[Type] captured."
- Closing without saving: no confirmation needed

### Inbox list
- New items appear at the bottom
- Each item has: type badge, text, timestamp, action buttons
- Action buttons: → Maps, → Journal, ✕ (delete to trash)
- → Maps: moves item to Maps inbox tab, removes from Inbox, toast "Moved to Maps"
- → Journal: moves item to Journal, removes from Inbox, toast "Moved to Journal"
- ✕: moves to trash, removes from list, toast "Deleted" with implicit undo for 5 seconds

### Filter row
- Single active filter at a time
- "All" shows everything
- Filters are additive within their group only

---

## Maps

### BASB tabs
- Inbox, Projects, Areas, Resources, Archives
- Active tab: accent underline
- Inbox tab: shows items routed from main Inbox, with promote buttons
- "Add item" button: hidden when on Inbox tab, visible on all others

### Project / Area / Resource card
- Default state: collapsed card showing name, status, value tag, next action preview
- **Edit button: opens form INLINE, directly below the card that was clicked. Not at top of page.**
- Form opens with animation (expand downward, 200ms ease)
- Form closes on Save or Cancel, card re-renders in place
- Only one card form open at a time -- opening another closes the current one without saving
- Status badge: click cycles through active → waiting → done → archived
- "Send Up Next to Week" in meatball menu: adds upNext text to Up Next queue, toast "Sent to Week"
- Delete: inline confirmation inside card, not browser dialog
- Meatball menu: closes when clicking anywhere outside it

### Card fields visible at a glance (collapsed)
- Name, status badge, primary value tag, domain tag, next action (if set)

### Card fields in edit form
- Name (required), Objective ("done looks like"), Next action, Up Next this week, Notes, Domain tag, Value tags (primary + others), Tasks (subtask list with add/remove), Where did you leave it, Due date

### Task list inside card
- Check to complete: strikes through text, moves to bottom of list
- Add task: inline input at bottom of task list, Enter to add
- Remove task: ✕ on each row, no confirmation needed
- Progress bar: updates live as tasks are checked

---

## Journal

### Filter tabs
- All, Emotion, Feeling, Idea, Insight, Memory, Thought, Moment
- Single active filter
- Each entry: type badge, date, text, "→ Action in Maps" button
- "→ Action in Maps": creates an action item in Inbox, toast "Added to Inbox as Action"

---

## Values

### Values canvas
- Toggle open/closed with button
- 4 steps: navigate with Next/Back buttons
- Step progress is preserved for the session
- Closing the canvas does not reset progress

### Value list
- Each value: swatch, name, short tag, description
- Edit button: opens inline form below the value item
- History: collapsible, shows previous versions with dates
- Delete: inline confirmation, warns "This will remove this value from all past commitments"

---

## Profile panel
- Opens as a right-side slide-in panel
- Overlay closes it on click outside
- Domain tags: add inline, edit inline (no browser prompt()), delete with inline confirmation

---

## Animations and Motion

| Interaction | Animation |
|---|---|
| Tab switch | fadeIn 220ms ease, translateY 4px → 0 |
| Form expand inline | max-height 0 → auto, opacity 0 → 1, 200ms ease |
| Form collapse | reverse of expand, 160ms ease |
| Capture sheet open | slideUp 220ms ease |
| Profile panel open | slideRight 250ms ease |
| Toast appear | opacity 0 → 1, translateY 10px → 0, 220ms |
| Modal open | fadeIn 180ms ease |
| Drag block | opacity 0.4, dashed border while dragging |
| Drop target | accent2 background tint on dragOver |

---

## Validation Rules

| Field | Rule |
|---|---|
| Commitment text | Required if row exists |
| Project name | Required |
| Time block label | Required |
| Value name | Required |
| Value tag | Falls back to value name if empty |
| Energy | Optional, no validation |

---

## Error States

- Required field empty on save: red border on field, inline message below "This field is required"
- Duplicate value name: inline warning "You already have a value with this name"
- Voice not supported: toast "Voice input is not supported in this browser"

