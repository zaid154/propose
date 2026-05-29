## Only For You — Cinematic Proposal Site

A multi-page, premium romantic proposal experience built with React (Vite) + Tailwind CSS + Framer Motion + React Router.

Dark cinematic aesthetic (burgundy / ivory / rose-gold), elegant typography, smooth scroll-reveal animations, a Yes / No proposal flow with Formspree, a date planner, and a 3-act surprise climax (typewriter letter → photo cinema → gift-box reveal).

---

### Quick start

```bash
npm install
copy .env.example .env
npm run dev          # or: npm run start
```

Then open `http://localhost:5173`.

Other scripts:

- `npm run build` — production build into `dist/`
- `npm run preview` — preview the built site locally

---

### Pages & flow

```
Home (/)
  └── Memories (/memories)
        └── Proposal (/proposal)
              ├── Yes → Date Planner (/date) → Surprise (/surprise)
              └── Skip → Surprise (/surprise)
```

NavBar publicly shows **Home / Memories / Proposal**. `/date` and `/surprise` are reached through the flow so the climax stays intentional.

---

### Two-layer content system (edit your story in two places)

**Layer 1 — `.env`** (short strings, URLs, comma-separated lists)

```bash
VITE_SITE_TITLE="Only For You"
VITE_MY_NAME="Your Name"
VITE_HER_NAME="Her Name"

VITE_HOME_EYEBROW="FOR"
VITE_HOME_TAGLINE="A little story I made, just for you."
VITE_HOME_CTA="Begin"

VITE_PROPOSAL_QUESTION="Will you be my partner for life?"
VITE_PROPOSAL_YES_REPLY="You've made me the happiest person."

VITE_SURPRISE_FINAL_MESSAGE="Today, tomorrow, always — I choose you."
VITE_SURPRISE_SIGNATURE="Always yours,"
VITE_SURPRISE_MUSIC_URL=""

VITE_FORMSPREE_PROPOSAL_URL="https://formspree.io/f/mreznqnk"
VITE_FORMSPREE_DATE_URL="https://formspree.io/f/mnjaedeb"

VITE_DATE_PLACES="India Gate,Hauz Khas Village,Lodhi Garden,Connaught Place (CP),Garden of Five Senses,Mehrauli Archaeological Park,Sundar Nursery,DLF Cyber Hub,Worlds of Wonder,Qutub Minar Complex,Kingdom of Dreams,Okhla Bird Sanctuary,Other"
```

**Layer 2 — `src/config/site.js`** (multi-line content)

- `storyParagraphs` — the 6 Hinglish lines shown on Home
- `letterLines` — typed line-by-line in the Surprise letter act
- `noButtonMessages` — playful replies cycled by the "Not yet" button

Every page imports a single object: `import { site } from '../config/site'`.

---

### Photos (Memories page + Surprise cinema)

Drop any images into:

```
src/assets/images/
```

Supported: `jpg`, `jpeg`, `png`, `webp`. They auto-appear in the Memories grid and the Surprise photo cinema act — no imports to edit.

---

### Optional background music (Surprise act 2)

Set `VITE_SURPRISE_MUSIC_URL` to a CORS-friendly mp3 URL. If left empty, the audio toggle is hidden entirely.

---

### Project structure

```
src/
  main.jsx
  App.jsx
  routes.js
  index.css

  config/
    site.js
    places.js
    images.js

  hooks/
    useScrollReveal.js
    useTypewriter.js
    useFallingHearts.js

  components/
    layout/
      AppShell.jsx
      NavBar.jsx
      Footer.jsx
    effects/
      BackgroundCandles.jsx
      FloatingHearts.jsx
      FilmGrain.jsx
      Confetti.jsx
    ui/
      PageWrapper.jsx
      Section.jsx
      Heading.jsx
      Button.jsx
      Card.jsx
      Divider.jsx
      Lightbox.jsx

  pages/
    Home.jsx
    Memories.jsx
    Proposal.jsx
    DatePlanner.jsx
    Surprise.jsx

  assets/
    images/
    logo.png
    heart-of-roses.jpg
```

---

### Design system (Tailwind theme)

- Palette: `wine`, `burgundy`, `bordeaux`, `ivory`, `champagne`, `roseGold`, `roseGoldLight`, `candle`
- Fonts: `font-display` (Cormorant Garamond), `font-script` (Italianno), `font-body` (Manrope), `font-eyebrow` (Cormorant SC)
- Shadows: `shadow-soft`, `shadow-glow`
- Gradient: `bg-wine-gradient`

---

### Code style

- Functional components, named exports
- One component per file
- All copy lives in `site` (no hardcoded strings in JSX)
- Hooks under `src/hooks/`, prefixed `use*`
- Reusable UI primitives under `src/components/ui/`
