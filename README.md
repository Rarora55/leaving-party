# We Are Leaving

We Are Leaving is a pixel art farewell party invitation website. The experience is
meant to feel personal, playful, and visually engaging, centered on a scrolling
animated landing page plus dedicated pages for guest confirmation and public messages.

## Product Direction

- Preserve a cohesive pixel-art identity across the full experience.
- Use motion to support storytelling, atmosphere, and interaction clarity.
- Keep content reusable and data-driven instead of scattering hardcoded copy through
  page components.
- Optimize for responsive layouts, accessibility, smooth scrolling, and simple
  deployment.

## Required Stack

The project constitution defines the approved stack for ongoing work:

- React
- Vite
- React Router
- Tailwind CSS
- Motion

See [`/.specify/memory/constitution.md`](./.specify/memory/constitution.md) for the
non-negotiable engineering and product rules that future specs and implementation
plans must follow.

## Architecture Direction

Work in this repository should preserve clear boundaries between:

- `src/app` for application wiring and providers
- `src/pages` for route-level composition
- `src/features` for feature-specific UI and behavior
- `src/shared` for reusable components, constants, hooks, types, and utilities
- `src/services` for external integrations and data access
- `src/assets` and `src/styles` for the visual system

The architecture should stay maintainable, modular, and ready for future CMS or
admin-panel integration.

## Development

```bash
npm install
npm run dev
npm run build
npm run lint
```
