# Compass Scope Document

**Version:** 1.0  
**Rule:** If a feature is not in MVP scope, it does not get built until MVP is complete and tested. No exceptions.

---

## The One Sentence

Compass helps you see whether your daily time reflects what actually matters to you.

---

## Who It Is For (MVP)

One person: Schalk. Then a small test group of 5 to 10 men who feel the same gap between how they spend their time and how they want to spend it.

Not for: productivity optimisers, people who want task management, people who want social features.

---

## MVP Definition

MVP is complete when Schalk can:

1. Start each morning by setting his energy, his meaningful question, and his commitments tied to his values
2. Close each evening with an honest reflection on whether his day reflected what matters
3. See his week at a glance, block time in advance, and move blocks around
4. Capture anything quickly via the + button and process it later
5. Manage his projects, areas, and resources with enough detail to know what is next
6. See which values are getting his time and which are not

That is the full MVP. Nothing else ships before these six things work reliably.

---

## In Scope for MVP

### My Day
- [x] Morning check-in (energy, meaningful question, commitments with value tags)
- [x] Evening reflection (energy, alignment, acknowledge, gratitude, body/mind/soul, off-course items)
- [x] Save and read back saved data
- [x] Edit a saved check-in

### My Week
- [x] Week grid with 7-day view, starting Monday
- [x] Time block creation at full hour and :30 mark
- [x] Time block editing and deletion
- [x] Drag and drop time blocks between cells
- [x] Value-tagged time blocks
- [x] Domain-tagged time blocks
- [x] Week/Month view toggle
- [x] Up Next panel sourced from project cards only
- [x] Values pie chart
- [x] Sunday planning banner
- [x] Week number title format

### Inbox
- [x] Fast text capture via input row
- [x] Voice capture (Web Speech API, Chrome desktop)
- [x] Type tagging (Action, Emotion, Feeling, Idea, Insight, Memory, Thought, Project, Area, Resource)
- [x] Route to Maps (Actions, Projects, Areas, Resources)
- [x] Route to Journal (experience types)
- [x] Filter row
- [x] Soft delete to trash

### Maps
- [x] Projects, Areas, Resources, Archives tabs
- [x] Card with: name, status, next action, up next, notes, value tags, domain tag, tasks with progress, where left it, due date
- [x] Inline edit form below the card (not at top of page)
- [x] Status cycle (active / waiting / done / archived)
- [x] Send Up Next to Week
- [x] Task checklist with progress bar
- [x] Meatball menu (edit, send to week, delete)

### Journal
- [x] View all experience captures
- [x] Filter by type
- [x] Route to Maps as action

### Values
- [x] Values canvas (4-step guided discovery)
- [x] My Values list
- [x] Add, edit, delete values
- [x] Version history per value
- [x] Value colours

### Insights
- [x] Weekly stats (check-ins, energy, aligned days)
- [x] Time by value chart
- [x] Streak grid
- [x] All entries list

### General
- [x] Profile (name, location, day start time)
- [x] Domain tags (create, edit, delete)
- [x] Trash with restore
- [x] Local storage persistence
- [x] Data migration from old storage keys
- [x] Toast notifications
- [x] Voice input (Chrome desktop)
- [x] Design system file
- [x] Behaviour spec file
- [x] IA map file
- [x] Component spec file

---

## Explicitly Out of Scope for MVP

These must not be built until the MVP checklist above is complete and stable.

| Feature | Reason deferred | Phase |
|---|---|---|
| Backend / server / database | Requires significant infrastructure | Phase 3 |
| User accounts / authentication | Requires backend | Phase 3 |
| Multi-user / shared data | Requires backend | Phase 3 |
| Mobile app (iOS / Android) | Requires separate build | Phase 3 |
| Push notifications | Requires backend | Phase 3 |
| AI suggestions / sidekick | Core UX must work first | Phase 2 |
| Goal path map (visual diagram) | Complexity risk to MVP | Phase 2 |
| Partner / accountability link | Requires backend | Phase 3 |
| Breathwork / inner work tools | Nice to have, not core | Phase 2 |
| Billing / subscription | Nothing to bill for yet | Phase 3 |
| Export data | Useful but not blocking MVP | Phase 2 |
| Notion sync | Overhead for early testers | Phase 2 |
| Midday drop as distinct screen | + button covers this | Phase 2 |
| Search | Not needed at small scale | Phase 2 |
| Dark mode toggle | Light mode is working | Phase 2 |
| Onboarding flow | Manual for small group | Phase 2 |

---

## Known Bugs (fix before small group test)

| Bug | Screen | Priority |
|---|---|---|
| Project edit form opens at top of page instead of inline below card | Maps | High |
| Up Next panel not rendering after latest layout change | My Week | High |

---

## Definition of Done for Each Feature

A feature is done when:
1. It works as described in the Behaviour Spec
2. It matches the Component Spec visually
3. Data saves to local storage and survives a page refresh
4. Empty state is handled (not a blank space or JS error)
5. Every button on the feature does something (no silent dead buttons)

---

## Small Group Test Criteria

Ready to share with 5 to 10 people when:
- All MVP items above are checked
- No known high-priority bugs
- A person can open the file and use it for one full day without asking for help
- Their data persists across browser sessions on their own machine

