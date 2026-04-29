# Product Blueprint: The Sanctuary
**A Value-Aligned Time Management System**

## Executive Summary
The Sanctuary is a web application designed to help users spend their most precious and finite resource—time—more meaningfully. It is born from a dissatisfaction with traditional, clinical productivity tools that focus on "doing more" rather than "being more." By synthesizing the **168 Hours** methodology, **Building a Second Brain (BASB)**, and **Dialectical Behavior Therapy (DBT)**, The Sanctuary provides a "safe container" where users feel held, seen, and supported as they navigate their week.

---

## Core Philosophy & Framework Integration
The application is built on three foundational pillars that bridge the gap between high-level values and daily action.

| Framework | Core Contribution | Application in The Sanctuary |
| :--- | :--- | :--- |
| **168 Hours** | The week as the unit of time. | A comprehensive 168-hour grid for manual time "booking." |
| **BASB (CODE)** | Capture and knowledge management. | An ultra-fast, friction-less capture engine for thoughts and tasks. |
| **DBT** | Emotional regulation and Wise Mind. | Reflective prompts and "holding" UI to ensure emotional safety. |
| **CliftonStrengths** | Natural talent optimization. | Future-state tagging of activities to personal strengths. |

---

## Technical Architecture
To avoid the "simple, stupid errors" of previous builds, we recommend a robust, industry-standard stack that prioritizes reliability and speed.

### Recommended Stack
*   **Frontend:** Next.js (React) with TypeScript for type safety.
*   **Styling:** Tailwind CSS for a minimalist, calm, and responsive UI.
*   **Backend/Database:** Supabase (PostgreSQL) for real-time data and secure authentication.
*   **Hosting:** Netlify (already in use) for seamless CI/CD.

### Data Model Entities
1.  **Captures:** Raw entries (text, voice, image) that are "unprocessed."
2.  **Values/Missions:** High-level anchors that define why we do what we do.
3.  **Projects/Areas:** Organizational buckets based on PARA.
4.  **Bookings:** Specific time blocks assigned to the 168-hour grid.

---

## Key Feature Specifications

### 1. The Capture Engine ("Out of Head")
The primary goal is speed. Users must be able to dump information as fast as it occurs to them.
*   **Universal Input:** A prominent, minimalist input field available on all screens.
*   **Multi-modal:** Support for text, voice-to-text, and quick image uploads.
*   **The "Safety" Buffer:** Captured items sit in an "Inbox" until the user is ready to assess them, ensuring nothing is lost but also nothing is overwhelming.

### 2. The 168-Hour Grid ("Meaningful Booking")
This is the heart of the app's time-management logic.
*   **Manual Drag-and-Drop:** Users manually assign tasks or reflections from their "Inbox" to specific slots in a 168-hour weekly view.
*   **Value-Alignment Overlay:** When booking time, users can see which "Value" or "Mission" this block serves.
*   **Visual Clarity:** A minimalist grid that highlights "What is Next" without cluttering the view with past or distant future events.

### 3. The "Safe Container" UX
The interface must feel supportive rather than demanding.
*   **Minimalist Aesthetic:** Use of soft colors, ample white space, and subtle animations.
*   **Contextual Guidance:** Instead of "prompts are ok," the system should offer DBT-inspired reflections (e.g., "Is this action coming from your Wise Mind?") when it detects high-friction activities.
*   **The "Mission" Anchor:** A persistent but non-intrusive reminder of the user's current mission or project to provide grounding.

---

## Development Roadmap

### Phase 1: The Foundation (Weeks 1-3)
*   Setup Next.js + Supabase environment.
*   Implement Authentication and basic "Capture" functionality (text-only).
*   Design the core PARA-based database schema.

### Phase 2: The Grid (Weeks 4-6)
*   Build the 168-hour interactive weekly grid.
*   Implement the drag-and-drop mechanism from Capture Inbox to Grid.
*   Develop the "Value" tagging system.

### Phase 3: The Sanctuary Experience (Weeks 7-9)
*   Integrate Voice-to-Text for the Capture Engine.
*   Refine UI/UX for the "Safe Container" feeling (minimalism and calm).
*   Add DBT-inspired reflection prompts during the "Review" phase.

### Phase 4: Future Horizons (Weeks 10+)
*   Integration of Gallup CliftonStrengths data.
*   Advanced analytics on time spent vs. value alignment.
*   Mobile application for on-the-go capture.

---

## Developer Handoff Requirements
*   **No "Black Box" Code:** Every component must be documented with its purpose and framework logic.
*   **Error Resilience:** Implement robust error handling and user feedback for all API calls (no more weather data as text errors).
*   **Type Safety:** Strict TypeScript usage to prevent the "stupid errors" that lose hours of time.
