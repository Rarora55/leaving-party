# Research: Farewell Party Website - Phase 0 Findings

**Date**: 2026-04-09  
**Scope**: Technical unknowns, best practices, and integration patterns for scroll-based animation, form validation, message layout, accessibility, and backend schema.

---

## 1. Scroll-Triggered Animation for Home Scene Reveal

**Decision**: Use Framer Motion with Intersection Observer API for scroll-triggered scene reveals.

**Rationale**:
- Motion library already approved in constitution
- Intersection Observer provides performant viewport detection (no expensive scroll event listeners)
- Framer Motion's `useViewportScroll()` and `useAnimation()` hooks enable frame-synchronous reveal transitions
- Approach aligns with pixel-art aesthetic: discrete scene transitions rather than continuous scrolling parallax

**Alternatives Considered**:
- Continuous parallax via scroll listeners: Rejected because it adds visual complexity (multiple depths distracting from scene narrative)
- CSS Animations alone: Rejected because scroll-syncing requires JavaScript coordination
- AOS (Animate On Scroll) library: Rejected to avoid dependency outside approved stack

**Implementation Notes**:
- Each Home scene section is wrapped in a Framer Motion component with `whileInView` animation trigger
- Scroll position is saved to localStorage so users can resume mid-journey (per spec edge case requirement)
- Title trigger point uses a dedicated observer to mark the narrative beat (distinct animation state)

---

## 2. RSVP Form Validation & Submission Pattern

**Decision**: Minimal validation (name required, trimmed, non-empty) with fail-fast feedback and retry capability.

**Rationale**:
- Spec requires only name field (no email, count, dietary needs)
- Single-field forms benefit from inline validation (no separate error summary)
- Clear empty/loading/success/error states per spec acceptance criteria
- localStorage persists typed name if submission fails (UX recovery)

**Alternatives Considered**:
- Rich form library (React Hook Form): Rejected (overcomplicated for single field; adds dependency)
- Server-side validation only: Rejected (violates UX requirement for instant feedback)
- No validation: Rejected (violates spec FR-009 requirement for clear feedback on invalid names)

**Implementation Notes**:
- Validation rule: name.trim().length >= 1 and <= 100 characters
- Success state persists for 3 seconds then offers option to submit another RSVP or navigate
- Network failures show retry button; spec allows duplicate names (per edge case clause)

---

## 3. Message Card Layout (Playful, Non-Rigid)

**Decision**: Use CSS Grid with staggered auto-placement and rotated cards for natural, conversational feel.

**Rationale**:
- CSS Grid `auto-flow: dense` allows flexible card sizes without strict rows
- Subtle rotation (±1–3 degrees) and card shadows reinforce playful, handwritten aesthetic
- No special library needed: Tailwind CSS supports custom grid templates
- Responsive behavior: Single column mobile, 2–3 columns tablet, 3–4 desktop (via Tailwind breakpoints)

**Alternatives Considered**:
- Masonry layout (e.g., react-masonry): Rejected (adds dependency, overkill for small card collections)
- Strict grid: Rejected (violates spec requirement for playful, non-rigid arrangement)
- Absolute positioning: Rejected (breaks responsive resizing and accessibility ordering)

**Implementation Notes**:
- Empty state shows placeholder card ("No messages yet") with invite copy
- Message loading state uses skeleton cards (Tailwind animate-pulse) for perceived performance
- Cards are keyboard-accessible (semantic HTML, focus states) despite visual rotation

---

## 4. Reduced Motion Support (prefers-reduced-motion)

**Decision**: Implement two parallel animation sets: full-motion (default) and no-motion (reduced-motion).

**Rationale**:
- Spec FR-017 requires accessible content and navigation for reduced-motion preference
- Motion library supports `useReducedMotion()` hook for conditional animation
- Graceful degradation: no-motion variant shows content instantly without skip state
- Affects Home scene reveals, form transitions, card entrances, navigation overlays

**Alternatives Considered**:
- Single animation set with reduced duration: Rejected (doesn't meet spec requirement for full content access without animation)
- No animation fallback: Rejected (spec requires motion as design feature, not optional polish)
- Separate page for reduced-motion users: Rejected (violates accessibility requirement for single unified experience)

**Implementation Notes**:
- `matchMedia('(prefers-reduced-motion: reduce)').matches` checked at app level and stored in context
- Home scene sections use conditional Variants in Framer Motion (`animate` prop switches based on context)
- Form submission transitions (success/error message appearance) are instant in reduced-motion mode

---

## 5. Supabase Schema & RSVP/Message Data Model

**Decision**: Two Postgres tables (guest_rsvps, guest_messages) with basic fields and timestamps.

**Rationale**:
- Spec requires persistent storage of RSVP name + confirmation and message name + text
- Supabase PostgreSQL provides built-in Row-Level Security for moderation-ready schema
- Simple schema now; admin panel can extend message approval workflow later (CMS-ready per constitution)
- Real-time subscriptions not required for initial release (spec assumes refresh on return visit)

**Schema Outline**:
```sql
-- guest_rsvps table
CREATE TABLE public.guest_rsvps (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  confirmed_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- guest_messages table
CREATE TABLE public.guest_messages (
  id BIGSERIAL PRIMARY KEY,
  guest_name TEXT NOT NULL,
  message TEXT NOT NULL,
  approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Alternatives Considered**:
- Single table for all guest data: Rejected (violates separation of concerns; RSVP and message are independent features)
- Firestore: Rejected (adds external provider; Supabase already integrated in project)
- In-memory state only: Rejected (spec requires persistent wall and RSVP record)

**Implementation Notes**:
- RSVP API endpoint: POST /api/guest-rsvp, GET /api/guest-rsvps (read-only for admin)
- Message API endpoints: POST /api/guest-message, GET /api/guest-messages (read-only, approved only)
- Supabase client is already initialized (services/supabase/client.ts); no new provider setup needed

---

## 6. Navigation Overlay Implementation Pattern

**Decision**: Full-screen overlay with fixed positioning, backdrop blur, and keyboard-dismissible (Escape key).

**Rationale**:
- Spec requires "full-screen overlay" language; fixed position prevents scroll interaction bleeding
- Backdrop blur (Tailwind `backdrop-blur`) signals modal without heavy visual weight
- Keyboard support (Escape, Tab cycling) maintains accessibility requirement
- localStorage persists overlay visibility so users can recover scroll position when closing (per spec edge case)

**Alternatives Considered**:
- Drawer/slide-out sidebar: Rejected (spec explicitly calls for full-screen overlay)
- Dropdown menu: Rejected (doesn't afford navigation discoverability for all three routes equally)
- Inline nav bar: Rejected (conflicts with pixel-art space constraints and aesthetic)

**Implementation Notes**:
- Overlay is mounted at app level (AppShell.tsx) so it's available from all routes
- PersistentNavigation component handles open/close state via custom hook (useNavigationOverlay)
- Focus trap library not required for initial MVP; manual focus management on open/close

---

## 7. Image Asset Optimization for Pixel-Art

**Decision**: Use Vite's built-in image optimization (JPEG/PNG compression); store pixel-art SVGs in public/ for sharp scaling.

**Rationale**:
- Vite automatically optimizes imported PNG/JPEG assets via esbuild
- Pixel art typically small file size; SVGs scale infinitely without quality loss
- Spec mentions "pixel art" but detailed assets supplied later—placeholder area ready to accept artwork
- No ImageMagick or additional tool needed; Vite handles minification

**Alternatives Considered**:
- WebP + fallback: Rejected (premature optimization; current browser support adequate)
- External CDN (e.g., Cloudinary): Rejected (adds complexity; Vercel static asset serving is sufficient)
- Procedurally generated art: Rejected (spec indicates designed pixel art will be supplied)

**Implementation Notes**:
- Home final composition area uses a dedicated `<img>` element with placeholder (e.g., alt text directing to future asset)
- Scene section assets (characters, boxes) imported as modules so Vite tracks them
- Deployment to Vercel includes automatic static asset optimization

---

## 8. localStorage Strategy for Ephemeral State

**Decision**: Use localStorage for scroll position recovery (Home), overlay visibility, and typed form values (resilience).

**Rationale**:
- Scroll position recovery required by spec edge case (return to mid-page location after closing overlay)
- Form value persistence improves UX if submission fails and user retries
- localStorage is native API; no additional dependency
- Keys namespaced under `farewell-party__` to avoid conflicts

**Alternatives Considered**:
- Session Storage: Rejected (doesn't survive page refresh; user may close and reopen tab)
- URL query params: Rejected (clutters URL; worse UX for sharing)
- No persistence: Rejected (violates edge case requirement for scroll recovery)

**Implementation Notes**:
- Keys: `farewell-party__home-scroll-position`, `farewell-party__nav-overlay-open`, `farewell-party__rsvp-name-draft`
- Cleanup: stale values cleared after 1 hour (TTL timestamp stored with values)
- siteStorage.ts service wraps localStorage to provide type-safe named accessors

---

## Summary: Unknowns Resolved

| Unknown | Decision | Impact |
|---------|----------|--------|
| Scroll animation approach | Framer Motion + Intersection Observer | Home scene reveals performant, pixel-art aesthetic preserved |
| Form validation | Minimal (name required) with inline feedback | RSVP UX meets spec simplicity requirement |
| Message layout | CSS Grid with rotation for playfulness | No additional dependency; responsive and accessible |
| Accessibility (reduced motion) | Conditional animation tree + motion-safe variants | Full feature access without animation |
| Persistence layer | Supabase PostgreSQL (guest_rsvps, guest_messages tables) | Simple schema, CMS-ready for moderation/admin |
| Navigation overlay | Full-screen fixed overlay with keyboard support | Accessible, spec-compliant |
| Assets | Vite optimization + SVG for pixel art | No additional tooling; Vercel deployment handles serving |
| Ephemeral state | localStorage with namespaced keys | Resilient UX, scroll recovery enabled |

All research findings integrate into Phase 1 data modeling and contract definitions (next step).
