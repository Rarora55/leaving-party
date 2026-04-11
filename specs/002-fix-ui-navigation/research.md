# Research: Fix UI and Navigation Issues

**Feature**: 002-fix-ui-navigation  
**Date**: 2026-04-09  
**Purpose**: Resolve technical unknowns for UI fixes and navigation implementation.

## Research Tasks

### Full Viewport Home Screen
**Decision**: Use CSS `min-h-screen` or `h-screen` in Tailwind, combined with flexbox centering for content.  
**Rationale**: Ensures the home screen covers 100vh, responsive to window resize.  
**Alternatives Considered**: JavaScript viewport height detection (rejected for simplicity and performance).

### Intro Title Fade-In Animation
**Decision**: Use Framer Motion `motion.div` with `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` on component mount.  
**Rationale**: Simple, performant, supports reduced motion via `prefers-reduced-motion` media query.  
**Alternatives Considered**: CSS animations (rejected for React integration complexity).

### Remove Extra Title
**Decision**: Locate and remove hardcoded "BlackHorseRoadWeAreLeaving" text from HomeHero component.  
**Rationale**: Clean branding as per spec.  
**Alternatives Considered**: None.

### Replace Burger Menu with Cross Icon
**Decision**: Update PersistentNavigation component to use a cross (X) icon instead of hamburger.  
**Rationale**: Spec requires cross icon for closing/opening navbar.  
**Alternatives Considered**: Keep burger but change to cross on open (rejected for clarity).

### Full-Screen Navbar Implementation
**Decision**: Use fixed overlay with full screen height/width, toggle visibility on button click.  
**Rationale**: Immersive navigation experience, closes on link click or cross.  
**Alternatives Considered**: Side drawer (rejected for full-screen requirement).

### Properly Implement Pages
**Decision**: Ensure GuestListPage and MessagesPage have complete UI with forms and lists, using existing components.  
**Rationale**: Move from raw tests to functional pages.  
**Alternatives Considered**: None.

## Findings Summary

All technical approaches align with React/Vite/Tailwind/Motion stack. No new dependencies needed. Implementation is straightforward UI updates.