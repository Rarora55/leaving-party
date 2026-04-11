# Quickstart: Farewell Party Website Development

**Date**: 2026-04-09  
**Purpose**: Get developers up to speed on the project architecture, file structure, and implementation workflow for the farewell party website.

---

## 1. Project Overview

The farewell party website is a three-page React application featuring:

1. **Home** (`/`): Scrolling animated landing page with progressive scene reveal
2. **Are You Coming?** (`/are-you-coming`): Minimal RSVP form (name field only)
3. **Drop a Message** (`/drop-a-message`): Message submission + public message wall

All pages include a persistent full-screen navigation overlay accessible via a top-right menu icon.

**Stack**: React 18 + TypeScript + Vite + React Router v6 + Tailwind CSS + Framer Motion + Supabase

---

## 2. Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Git (for version control)
- Supabase account (already set up in `.env`)

### Initial Setup

```bash
# Install dependencies
npm install

# Make sure .env is present at project root with:
# VITE_SUPABASE_URL=...
# VITE_SUPABASE_ANON_KEY=...

# Start dev server
npm run dev

# Visit http://localhost:5173
```

### Supabase Setup (if not already done)

1. Create two tables in Supabase:
   ```sql
   CREATE TABLE public.guest_rsvps (
     id BIGSERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     confirmed_at TIMESTAMP DEFAULT NOW(),
     created_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE public.guest_messages (
     id BIGSERIAL PRIMARY KEY,
     guest_name TEXT NOT NULL,
     message TEXT NOT NULL,
     approved BOOLEAN DEFAULT TRUE,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

2. Enable RLS (Row-Level Security) if moderation is planned:
   ```sql
   ALTER TABLE public.guest_rsvps ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.guest_messages ENABLE ROW LEVEL SECURITY;
   ```

---

## 3. Project Structure & Key Files

### Core Application

```
src/
├── app/
│   ├── AppRouter.tsx          ← Routes definition (/home, /are-you-coming, /drop-a-message)
│   ├── AppShell.tsx           ← App wrapper with persistent navigation overlay
│   ├── AppProviders.tsx       ← Context providers (theme, navigation state, etc.)
│   └── providers/
│
├── pages/
│   ├── HomePage/
│   │   └── HomePage.tsx       ← Scrollable Home experience
│   ├── GuestListPage/
│   │   └── GuestListPage.tsx  ← Are You Coming? (RSVP)
│   └── MessagesPage/
│       └── MessagesPages.tsx  ← Drop a Message (submit + wall)
│
├── features/
│   ├── home/
│   │   ├── components/
│   │   │   ├── HomeHero.tsx   ← Opening scene
│   │   │   ├── HomeScene.tsx  ← Individual scene section wrapper
│   │   │   └── PaperTrigger.tsx ← Title trigger component
│   │   └── hooks/
│   │       └── useHomeScrollAnimation.ts ← Scroll-triggered animation logic
│   │
│   ├── guest-list/
│   │   ├── GuestListForm.tsx  ← RSVP form component
│   │   └── guestList.types.ts ← RSVP types
│   │
│   ├── guest-messages/
│   │   ├── GuestMessageForm.tsx     ← Message submission form
│   │   ├── GuestMessageCard.tsx     ← Single message card in wall
│   │   ├── GuestMessagesList.tsx    ← Message wall grid/layout
│   │   └── guestMessages.types.ts   ← Message types
│   │
│   └── components/
│       ├── PersistentNavigation.tsx ← Full-screen overlay nav
│       ├── GuestMessageCard.tsx
│       ├── GuestMessageForm.tsx
│       └── GuestMessagesList.tsx
│
├── services/
│   ├── supabase/
│   │   ├── client.ts                ← Supabase client initialization
│   │   ├── guestList.api.ts         ← RSVP API calls
│   │   └── guestMessages.api.ts     ← Message API calls
│   │
│   └── localStorage/
│       └── siteStorage.ts           ← Ephemeral state (scroll position, nav overlay state)
│
├── shared/
│   ├── constants/
│   │   ├── navigation.constants.ts  ← Navigation destinations config
│   │   ├── home.constants.ts        ← Home scene sections config
│   │   ├── events.constants.ts
│   │   └── storage.constants.ts
│   │
│   ├── types/
│   │   └── site.types.ts            ← Global type definitions
│   │
│   ├── components/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── TextArea/
│   │   ├── PageContainer/
│   │   └── PixelCard/
│   │
│   ├── config/
│   │   └── env.ts                   ← Environment variable access
│   │
│   └── utils/
│       └── cn.ts                    ← Tailwind class merging
│
├── styles/
│   └── global.css                   ← Global Tailwind + custom styles
│
├── assets/
│   ├── fonts/                       ← Pixel-art fonts
│   ├── images/                      ← General images
│   ├── icons/                       ← UI icons
│   └── pixel-art/                   ← Home scene artwork
│
├── App.tsx                          ← App component entry
└── main.tsx                         ← React DOM render
```

### Spec & Documentation

```
specs/001-farewell-party-site/
├── spec.md              ← Feature specification
├── plan.md              ← Implementation plan (this document)
├── research.md          ← Technical research findings
├── data-model.md        ← Entity and relationship definitions
├── quickstart.md        ← Developer quickstart (you are here)
└── contracts/           ← TypeScript interface definitions
    ├── navigation.contract.ts
    ├── home-scene.contract.ts
    ├── rsvp.contract.ts
    └── message.contract.ts
```

---

## 4. Key Implementation Patterns

### 4.1 Scroll-Triggered Animation (Home Page)

```typescript
// src/features/home/hooks/useHomeScrollAnimation.ts
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function useHomeScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: ref });
  
  // Trigger section animation when scrollY crosses triggerOffset
  const opacity = useTransform(
    scrollY,
    [triggerOffset, triggerOffset + 100],
    [0, 1]
  );
  
  return { opacity };
}
```

### 4.2 Form Validation Pattern (RSVP/Messages)

```typescript
// Example: RSVP form validation
const validateRSVPForm = (formInput: RSVPFormInput): FormError | null => {
  const trimmed = formInput.name.trim();
  if (!trimmed) return { field: 'name', message: 'Name is required.' };
  if (trimmed.length > 100) return { field: 'name', message: 'Name too long.' };
  return null;
};

// Use in form component
const [formState, setFormState] = useState<RSVPFormState>({
  name: '',
  isValidating: false,
  error: null,
  isSubmitting: false,
  isSuccess: false,
  successMessage: ''
});

const handleSubmit = async () => {
  // Client-side validation
  const error = validateRSVPForm(formState);
  if (error) {
    setFormState(prev => ({ ...prev, error: error.message }));
    return;
  }
  
  // API submission
  setFormState(prev => ({ ...prev, isSubmitting: true }));
  try {
    const response = await submitRSVP({ name: formState.name });
    setFormState(prev => ({ ...prev, isSuccess: true, successMessage: '...' }));
  } catch (err) {
    setFormState(prev => ({ ...prev, error: 'Submission failed.' }));
  }
};
```

### 4.3 Data Fetching with Supabase

```typescript
// src/services/supabase/guestMessages.api.ts
import { supabase } from './client';

export async function getGuestMessages() {
  const { data, error } = await supabase
    .from('guest_messages')
    .select('*')
    .eq('approved', true)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as GuestMessageSubmission[];
}

export async function submitGuestMessage(
  input: GuestMessageSubmissionRequest
) {
  const { data, error } = await supabase
    .from('guest_messages')
    .insert([{
      guest_name: input.guestName,
      message: input.message,
      approved: true,
      created_at: new Date().toISOString()
    }])
    .select();
  
  if (error) throw error;
  return data[0] as GuestMessageSubmission;
}
```

### 4.4 Local Storage Pattern (Navigation State)

```typescript
// src/services/localStorage/siteStorage.ts
const STORAGE_KEYS = {
  NAV_OVERLAY_OPEN: 'farewell-party__nav-overlay-open',
  HOME_SCROLL_POSITION: 'farewell-party__home-scroll-position',
} as const;

export const siteStorage = {
  getNavOverlayState() {
    const stored = localStorage.getItem(STORAGE_KEYS.NAV_OVERLAY_OPEN);
    return stored ? JSON.parse(stored) : false;
  },
  
  setNavOverlayState(isOpen: boolean) {
    localStorage.setItem(STORAGE_KEYS.NAV_OVERLAY_OPEN, JSON.stringify(isOpen));
  },
  
  getHomeScrollPosition() {
    const stored = localStorage.getItem(STORAGE_KEYS.HOME_SCROLL_POSITION);
    return stored ? parseInt(stored, 10) : 0;
  },
  
  setHomeScrollPosition(position: number) {
    localStorage.setItem(STORAGE_KEYS.HOME_SCROLL_POSITION, String(position));
  }
};
```

### 4.5 Configuration Constants (Data-Driven)

```typescript
// src/shared/constants/navigation.constants.ts
import { NavigationDestination } from '../../../specs/001-farewell-party-site/contracts/navigation.contract';

export const NAVIGATION_DESTINATIONS: NavigationDestination[] = [
  {
    id: 'home',
    label: 'Home',
    route: '/',
    order: 0
  },
  {
    id: 'rsvp',
    label: 'Are You Coming?',
    route: '/are-you-coming',
    order: 1
  },
  {
    id: 'messages',
    label: 'Drop a Message',
    route: '/drop-a-message',
    order: 2
  }
];

// src/shared/constants/home.constants.ts
import { HomeSceneSection } from '../../../specs/001-farewell-party-site/contracts/home-scene.contract';

export const HOME_SCENE_SECTIONS: HomeSceneSection[] = [
  {
    id: 'opening',
    title: 'Opening Scene',
    triggerOffset: 0,
    duration: 600,
    content: 'Welcome to our farewell party...',
    isTitleTrigger: false,
    isFinalComposition: false,
    assets: ['opening.png'],
    order: 0
  },
  // ... more sections
  {
    id: 'closing',
    title: 'Final Composition',
    triggerOffset: 2000,
    duration: 800,
    isTitleTrigger: false,
    isFinalComposition: true,
    assets: ['final-artwork.png'],
    order: 5
  }
];
```

---

## 5. Responsive Design Breakpoints

Use Tailwind CSS breakpoints consistently:

```typescript
// Mobile (< 640px): Single column, full width
// sm (≥ 640px): Tablet adjustments
// md (≥ 768px): Tablet optimizations
// lg (≥ 1024px): Desktop layout
// xl (≥ 1280px): Large desktop

// Example responsive message grid:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {messages.map(msg => <GuestMessageCard key={msg.id} {...msg} />)}
</div>
```

---

## 6. Accessibility Checklist

- ✅ Navigation overlay: keyboard dismissible (Escape key, Tab cycling)
- ✅ Focus states: visible focus ring on interactive elements
- ✅ Form labels: associated with inputs via `htmlFor`
- ✅ ARIA roles: `role="dialog"` on overlay, `role="status"` on validation messages
- ✅ Reduced motion: `prefers-reduced-motion` query respected (instant reveals, no animation)
- ✅ Color contrast: Minimum 4.5:1 for text, pixel-art colors verified
- ✅ Semantic HTML: Proper heading hierarchy, form structure

---

## 7. Testing Strategy

### Manual QA Checklist

- [ ] Home page scrolls smoothly and scenes appear on cue (all breakpoints)
- [ ] Title trigger moment is visually distinct
- [ ] Final composition area displays correctly (with/without artwork)
- [ ] Navigation overlay opens/closes and restores scroll position
- [ ] RSVP form validates and submits successfully
- [ ] RSVP form shows error for empty/invalid input
- [ ] Message form validates and submits successfully
- [ ] Message cards display in playful layout (non-rigid)
- [ ] Empty state shown when no messages exist
- [ ] All interactions accessible via keyboard
- [ ] Reduced motion preference respected (no animations when enabled)

### Browser Testing

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (iOS + macOS)
- Mobile Chrome (Android)

---

## 8. Deployment

### Build & Preview

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Deploy to Vercel

```bash
# Vercel CLI (if installed)
vercel deploy

# Or push to GitHub and connect Vercel for auto-deploy
git push origin main
```

**Vercel Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_SUPABASE_URL": "@supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@supabase_anon_key"
  }
}
```

---

## 9. Common Development Tasks

### Add a New Home Scene Section

1. Define in `src/shared/constants/home.constants.ts`
2. Create corresponding assets (images)
3. Add component JSX in `src/features/home/components/HomeScene.tsx`
4. Connect scroll trigger in `useHomeScrollAnimation` hook

### Update RSVP/Message Validation Rules

1. Update validation functions in respective form components
2. Update error messages in `contracts/rsvp.contract.ts` or `contracts/message.contract.ts`
3. Update API validation server-side (if applicable)

### Add Navigation Destination

1. Add entry to `src/shared/constants/navigation.constants.ts`
2. Create new page component in `src/pages/`
3. Add route in `src/app/AppRouter.tsx`
4. Verify navigation overlay links the new route

---

## 10. Debugging Tips

### Scroll Position Not Recovering?

Check `siteStorage.ts` for localStorage key consistency. Verify nav overlay state is persisted before navigation.

### Animation Not Triggering?

Ensure `triggerOffset` in Home scene config matches actual scroll position. Use browser DevTools to check `window.scrollY` during scroll.

### Supabase Connection Issues?

Verify `.env` file has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Check Supabase project settings for CORS configuration.

### Tailwind Styles Not Applying?

Ensure `tailwind.config.js` includes template paths:
```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

---

## 11. Next Steps

1. **Phase 2 (Implementation)**: Use `/speckit.tasks` to generate actionable task list
2. **Review Contracts**: Reference `contracts/` directory for type definitions during coding
3. **Follow Constants**: Keep content in `shared/constants/` (not hardcoded in JSX)
4. **Test Locally**: Run `npm run dev` and manually verify flows
5. **Deploy**: Once Phase 2 tasks are complete, build and deploy to Vercel

---

**Reference Documents**:
- [spec.md](spec.md) – Feature specification
- [data-model.md](data-model.md) – Entity definitions
- [research.md](research.md) – Technical research
- [contracts/](contracts/) – TypeScript interface examples
