# Feature Specification: Redefine Home and Navigation Experience

**Feature Branch**: `003-redefine-home-navigation`  
**Created**: 2026-04-10  
**Status**: Draft  
**Input**: User description: "Redefine the Home experience and navigation
architecture of the project.

The Home must no longer use an automatic intro animation. Instead, the experience
must be scroll-driven. On initial load, the screen should show a full-width and
full-height sky-blue background covering the entire viewport. The background must be
a solid sky/celeste tone and should act as the base visual layer. This is the
colour-code: #BFE9FF. For the title use MaisonNeue, helvetica, sans-serif fonts,
48px, and centered on the screen, the title would be: We Are Leaving. Under the
title with 20px adjusted to center-down of the title: 9th of May, 2026, same font.
Colour Black.

Clouds must no longer be embedded in the background. The assets are in folder
Components/Clouds. They must be implemented as separate visual assets/components
layered on top of the background. As the user starts scrolling, the title should
progressively appear, and the clouds should begin moving horizontally in a soft,
organic, pseudo-random way until the user reaches the Footer, which must be
implemented as a new component at the end of the Home flow.

Structure the Home into clear reusable components, separating responsibilities such
as background, cloud field, title reveal, and footer. The animation should feel
smooth and atmospheric, not chaotic. Prioritize a clean composition and scroll-based
motion over complex intro timelines.

The navigation must also be redefined. Replace the current navbar approach with a
minimal navigation inspired by editorial/portfolio websites such as ConForm
Architects: low visual weight, very clean, and non-intrusive. The navigation should
not behave like a traditional heavy top bar. Instead, it must use a simple fixed
trigger in the top-right corner that opens a full-screen overlay menu.

The overlay navigation must be minimal, with only the primary sections of the site,
large clear links, generous spacing, and a simple open/close interaction. It should
feel elegant, lightweight, and compatible with a highly visual Home. In this
project, the primary navigation entries should be: Home, Are You Coming?, and Drop a
Message.

Right now there is a really raw test of the pages, lets implemente everything that
we need now."

## Clarifications

### Session 2026-04-10

- Q: Should the title/date be visible on first load or only appear progressively after scrolling starts? -> A: The title and date are hidden at first and only appear progressively after scroll begins.
- Q: Should cloud motion happen only on scroll, combine scroll response with gentle drift, or run continuously from page load? -> A: Cloud motion responds to scroll progress and also drifts gently while the visitor is within the Home flow.
- Q: Should the footer be purely visual, lightly directional, or a fuller information block? -> A: The footer is a visual end state with light navigational or directional content.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Arrive Into a Scroll-Driven Farewell Scene (Priority: P1)

As a visitor, I want the Home page to open as a full-viewport visual scene so that I
immediately understand the atmosphere of the farewell and begin the experience by
scrolling rather than waiting through a scripted intro.

**Why this priority**: This is the primary first impression of the site and the main
experience being redefined.

**Independent Test**: Open Home on a new visit and verify the initial viewport shows
only the solid sky-blue field with no automatic intro timeline, then confirm the
title/date appear progressively only after scrolling begins.

**Acceptance Scenarios**:

1. **Given** a visitor opens Home, **When** the first screen renders, **Then** the
entire viewport is covered by a solid sky-blue background using the specified visual
tone.
2. **Given** the first screen is visible, **When** the visitor has not scrolled yet,
**Then** the page does not yet show the title/date composition and instead presents
the sky layer as the opening state.
3. **Given** the visitor loads Home, **When** the page becomes interactive, **Then**
the experience waits for scrolling instead of playing an automatic intro animation.

---

### User Story 2 - Scroll Through Layered Clouds and Title Reveal (Priority: P1)

As a visitor, I want the Home scene to evolve as I scroll so that the page feels
atmospheric and alive, with clouds and title motion responding to my movement rather
than acting like a disconnected animation loop.

**Why this priority**: The scroll behavior is the core redesign of the Home
experience and defines how the page should feel.

**Independent Test**: Scroll from the first viewport through the Home flow and verify
the title and date progressively reveal while cloud assets move horizontally in a soft,
organic way until the footer is reached.

**Acceptance Scenarios**:

1. **Given** the visitor starts scrolling on Home, **When** they move through the
page, **Then** the title transitions progressively as part of the scroll journey
rather than appearing only as a one-time load animation.
2. **Given** cloud assets are visible, **When** the visitor scrolls further into the
Home flow, **Then** the clouds move horizontally in a soft, pseudo-random way that
feels atmospheric instead of mechanical or chaotic, with scroll response remaining
the primary driver of the motion.
3. **Given** the visitor continues through the Home sequence, **When** they reach the
end of the flow, **Then** the cloud motion resolves at a newly defined footer
component that lightly directs them onward without becoming a heavy content block.

---

### User Story 3 - Experience a Layered Visual Composition (Priority: P2)

As a visitor, I want the sky, clouds, title, and footer to behave as distinct parts
of one composition so that the page feels intentional and visually clean.

**Why this priority**: The redesign depends on separating embedded visuals into
clearer layered elements that can be controlled independently.

**Independent Test**: Inspect the Home experience visually while scrolling and verify
the sky acts as the base layer, the clouds read as separate overlays, and the footer
feels like a deliberate final destination in the composition.

**Acceptance Scenarios**:

1. **Given** the Home page is displayed, **When** the visitor views the sky area,
**Then** the sky reads as a solid base layer rather than a mixed background with
embedded cloud artwork.
2. **Given** the cloud assets appear on Home, **When** the visitor observes the
scene, **Then** the clouds read as separate layered visual elements on top of the
sky.
3. **Given** the visitor reaches the end of the Home flow, **When** the footer is in
view, **Then** it acts as the clear visual and navigational end point of the Home
experience with light directional content.

---

### User Story 4 - Navigate Through a Minimal Overlay Menu (Priority: P1)

As a visitor, I want a lightweight fixed trigger that opens a full-screen overlay
menu so that I can move between the main sections of the site without a heavy
traditional navbar distracting from the Home experience.

**Why this priority**: Navigation affects every route and must be redesigned to match
the visual direction of the new Home.

**Independent Test**: From any main page, open the fixed top-right trigger and verify
the overlay menu presents Home, Are You Coming?, and Drop a Message as large clear
links with a simple open and close interaction.

**Acceptance Scenarios**:

1. **Given** the visitor is on a main page, **When** they look to the top-right area,
**Then** they can find a minimal fixed navigation trigger without a heavy top bar.
2. **Given** the visitor activates the trigger, **When** the overlay opens, **Then**
the full-screen menu shows only the primary navigation entries: Home, Are You
Coming?, and Drop a Message.
3. **Given** the overlay is open, **When** the visitor closes it or selects a link,
**Then** the interaction feels simple, clean, and non-intrusive.
4. **Given** the other site pages are currently raw, **When** the visitor navigates to
them through the overlay, **Then** the navigation still feels consistent with the
refined Home experience.

### Edge Cases

- What happens on very short or small screens? The full initial composition must still
  show readable centered title and date without overlapping the fixed trigger.
- What happens if some cloud assets are unavailable? The Home page must remain
  coherent with the sky layer and title still readable.
- What happens when visitors prefer reduced motion? The Home must preserve the layered
  composition and scroll progression with softer or simplified motion.
- What happens if the visitor opens the overlay menu while in the middle of the Home
  scroll? Closing the overlay must return them to their current reading position.
- What happens if the visitor reaches the footer quickly? The end of the Home flow
  must still feel resolved rather than abrupt.

## Experience Constraints *(mandatory)*

### Visual and Narrative Continuity

- This feature redefines the landing story and the shared navigation layer for the
  whole site.
- Home must move away from automatic intro behavior and instead feel driven by scroll,
  atmosphere, and layered composition.
- The opening visual state must use a solid sky-blue base layer in the provided tone
  and start as a clean field before the title/date composition reveals through scroll.
- The title styling is part of the intended experience: it uses MaisonNeue,
  Helvetica, or sans-serif styling cues and keeps black text for both title and date
  once they have entered the composition.
- Cloud visuals must come from the existing `Components/Clouds` assets and read as
  separate layers above the sky instead of being embedded into the background.
- Cloud motion should combine scroll-linked progression with gentle ambient drift so
  the scene feels alive without losing scroll as the primary interaction.
- The footer must be introduced as a deliberate final component in the Home flow.
- The footer should resolve the Home visually while offering light directional cues
  rather than turning into a dense information block.
- The overlay navigation must feel editorial, minimal, elegant, and visually light
  enough to coexist with a highly visual Home.

### Accessibility and Responsiveness

- The Home composition must remain legible on mobile, tablet, and desktop without
  turning the revealed title/date composition into a cramped or off-balance layout.
- The fixed top-right navigation trigger must remain discoverable and usable at all
  supported breakpoints.
- The overlay menu must support clear focus behavior, readable link sizing, and a
  straightforward close path.
- Motion must stay smooth and atmospheric rather than chaotic, and reduced-motion
  visitors must still understand the Home structure and navigate the site fully.
- Ambient cloud drift must remain subtle enough that it does not overpower the
  scroll-driven nature of the experience.
- Black title/date text and overlay content must maintain readable contrast against
  their respective backgrounds.

### Content and Data Modeling

- The Home scene structure should be maintainable through reusable content and scene
  definitions rather than page-local one-off composition.
- The title text, date text, navigation entries, footer copy, and cloud layer
  definitions should remain centralized so they can be updated consistently.
- Cloud assets are existing project content and should be treated as reusable visual
  resources rather than merged into a single painted background.
- Footer directional content should remain small in scope and complementary to the
  overlay navigation rather than competing with it.
- The refined navigation architecture should remain ready for future expansion if
  additional sections are introduced later.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST replace the current automatic Home intro behavior with a
  scroll-driven Home experience.
- **FR-002**: The first Home viewport MUST display a full-width and full-height solid
  sky-blue background using color `#BFE9FF`.
- **FR-003**: The first Home viewport MUST display the title "We Are Leaving"
  progressively after scrolling begins, centered on screen in black.
- **FR-004**: The date "9th of May, 2026" MUST appear progressively after scrolling
  begins, below the title in black and centered with it.
- **FR-005**: The title and date presentation MUST follow the requested MaisonNeue,
  Helvetica, sans-serif visual direction and preserve the stated title sizing intent.
- **FR-006**: The Home background MUST no longer include clouds embedded into the sky
  layer.
- **FR-007**: The system MUST use the existing cloud assets from `Components/Clouds`
  as separate layered visual elements.
- **FR-008**: As the visitor scrolls through Home, the title MUST progressively
  reveal from an initially hidden state as part of the scroll behavior.
- **FR-009**: As the visitor scrolls through Home, the cloud layers MUST move
  horizontally in a soft, organic, pseudo-random way.
- **FR-010**: The cloud layers MUST combine scroll-responsive horizontal movement
  with gentle ambient drift while the visitor remains within the Home flow.
- **FR-011**: The horizontal cloud motion MUST continue through the Home flow until
  the visitor reaches the footer.
- **FR-012**: The system MUST introduce a new footer component at the end of the Home
  flow.
- **FR-013**: The footer MUST act as both the visual landing state of the Home flow
  and a lightweight directional element.
- **FR-014**: The Home experience MUST be structured around reusable parts separating
  at least the background layer, cloud field, title reveal, and footer.
- **FR-015**: The site MUST replace the current navbar approach with a minimal fixed
  top-right trigger.
- **FR-016**: Activating the fixed trigger MUST open a full-screen overlay navigation
  menu.
- **FR-017**: The overlay navigation MUST contain only the primary entries Home, Are
  You Coming?, and Drop a Message.
- **FR-018**: The overlay navigation MUST present those entries as large clear links
  with generous spacing and simple open/close interaction.
- **FR-019**: The new navigation MUST feel visually lightweight and non-intrusive
  rather than like a heavy traditional top bar.
- **FR-020**: The refined navigation MUST work consistently across the currently raw
  site pages so the project feels coherent while those pages continue to evolve.
- **FR-021**: The Home and navigation experiences MUST remain usable across mobile,
  tablet, and desktop layouts.
- **FR-022**: The Home and navigation experiences MUST preserve access and clarity for
  visitors who prefer reduced motion.

### Key Entities *(include if feature involves data)*

- **Home Visual Layer**: A distinct part of the Home composition, such as the sky
  background, cloud field, title block, or footer, with its own role in the scroll
  experience.
- **Cloud Asset Layer**: A reusable cloud visual sourced from the existing
  `Components/Clouds` folder and positioned as an independent overlay in the Home
  scene.
- **Title Composition**: The opening Home arrangement containing the main title and
  date, including its hidden initial state, progressive reveal, visual hierarchy, and
  centered layout behavior.
- **Footer Section**: The new final component that closes the Home flow and marks the
  end of the atmospheric scroll sequence while providing light directional cues.
- **Navigation Entry**: A primary destination in the overlay menu containing label,
  target, and display order.
- **Navigation Overlay**: The full-screen menu state opened by the fixed trigger and
  used to move between the three main sections of the site.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On first arrival, visitors see the intended full-viewport sky layer
  within 2 seconds of page readiness and can trigger the title/date reveal by
  beginning to scroll.
- **SC-002**: In qualitative review, the Home experience is consistently described as
  scroll-driven and atmospheric rather than as a scripted intro animation.
- **SC-003**: In qualitative review, cloud motion feels gently alive without being
  distracting or breaking the scroll-led reading of the page.
- **SC-004**: At least 95% of visitors can identify and open the main navigation from
  the fixed top-right trigger within 10 seconds.
- **SC-005**: In qualitative review, the footer is understood as the resolved end of
  the Home journey and offers helpful direction without feeling like a heavy content
  section.
- **SC-006**: Visitors can reach Home, Are You Coming?, or Drop a Message from the
  overlay menu in one open interaction with no unnecessary secondary navigation steps.
- **SC-007**: Across supported viewport sizes, the title, date, fixed trigger, and
  overlay links remain readable without overlap or horizontal scrolling.
- **SC-008**: In reduced-motion use, visitors can still understand the Home structure
  and complete primary navigation tasks without missing content.

## Assumptions

- MaisonNeue may not be bundled yet, so the experience is defined by that visual
  direction with Helvetica and sans-serif as acceptable fallbacks once the title/date
  reveal begins.
- The existing cloud assets in `Components/Clouds` are the intended source material
  for the layered cloud field.
- The footer introduced here is part of the Home experience definition and does not
  require a separate global site footer specification, but it does include light
  directional content.
- The current raw state of the non-Home pages remains in scope only insofar as the new
  navigation must work consistently across them.
- No authentication, backend dependency, or content-management workflow is required to
  deliver this Home and navigation redesign.
