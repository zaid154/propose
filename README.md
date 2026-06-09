# Only For You — Proposal Website

A simple multi-page romantic proposal website made with React (Vite) + Tailwind CSS + Framer Motion + React Router.

It has a light pink and white theme, custom fonts, a Yes / No proposal flow (saved using Formspree), a date planner form, and a 3-step surprise at the end (typewriter letter, photo slideshow, gift box reveal).

The code is written in a simple, beginner-friendly style so it is easy to read and explain.

**Live site:** https://perposal-9d5d6.web.app

---

## Project details

| Item | Value |
|------|-------|
| Project name | Only For You (romantic-proposal-site) |
| Type | Single Page Application (SPA) |
| Framework | React 19 with Vite |
| Styling | Tailwind CSS (simple classes) |
| Animation | Framer Motion + simple CSS |
| Routing | React Router |
| Forms | Formspree |
| Hosting | Firebase Hosting |
| Total pages | 5 (Home, Memories, Proposal, Date, Surprise) |

---

## Quick start

```bash
npm install
copy .env.example .env
npm run dev
```

Then open `http://localhost:5173`.

Scripts:

- `npm run dev` — start the local dev server
- `npm run build` — build the site into the `dist/` folder
- `npm run preview` — preview the built site
- `npm run deploy` — build and deploy to Firebase Hosting

---

## Pages and flow

```
Home (/)
  -> Memories (/memories)
       -> Proposal (/proposal)
            -> Yes  -> Date Planner (/date) -> Surprise (/surprise)
            -> Skip -> Surprise (/surprise)
```

The navbar shows Home, Memories, and Proposal. The `/date` and `/surprise` pages are reached through the flow.

---

## How to change the content

There are two places to edit your story.

**1. `.env` file** (short text, URLs, and the places list)

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

VITE_FORMSPREE_PROPOSAL_URL="https://formspree.io/f/xxxxxxx"
VITE_FORMSPREE_DATE_URL="https://formspree.io/f/yyyyyyy"

VITE_DATE_PLACES="India Gate,Lodhi Garden,Connaught Place,Other"
```

**2. `src/config/site.js` file** (longer text)

- `storyParagraphs` — the lines shown on the Home page
- `letterLines` — the lines typed in the Surprise letter
- `noButtonMessages` — the funny replies for the "Not yet" button

Every page reads from one object: `import { site } from '../config/site'`.

---

## Photos

Put your images in this folder:

```
src/assets/images/
```

Supported types: `jpg`, `jpeg`, `png`, `webp`. They show up automatically in the Memories grid and the Surprise slideshow. No code change needed.

---

## Forms (Formspree)

The Proposal answer and the Date Planner form are sent to [Formspree](https://formspree.io).

1. Make a free Formspree account and create two forms.
2. Copy each form URL.
3. Paste them into `VITE_FORMSPREE_PROPOSAL_URL` and `VITE_FORMSPREE_DATE_URL` in your `.env` file.

---

## Deploy to Firebase Hosting

This project is hosted on **Firebase Hosting**.

- Firebase app config: `src/config/firebase.js`
- Hosting settings: `firebase.json` (serves the `dist/` folder, all routes go to `index.html`)
- Project id: `firebaserc` -> `perposal-9d5d6`

### First time setup (only once)

```bash
npm install -g firebase-tools
firebase login
```

`firebase login` opens the browser. Log in with the same Google account that owns the Firebase project.

### Deploy command

```bash
npm run deploy
```

This one command does two things:

1. `vite build` -> makes the `dist/` folder (the final website)
2. `firebase deploy --only hosting` -> uploads `dist/` to Firebase

After it finishes you will see:

```
+  Deploy complete!
Hosting URL: https://perposal-9d5d6.web.app
```

### Manual way (same result)

```bash
npm run build
firebase deploy --only hosting
```

### Deploy time

A normal deploy takes about **30 seconds to 1 minute** (build is around 5 seconds, upload depends on internet speed and image sizes).

### If deploy fails

Sometimes a large image upload fails with a network error (for example `Converting circular structure to JSON ... TLSSocket`). This is usually a temporary internet issue. Just run `npm run deploy` again and it works.

---

## How the code works (file by file)

### Entry files

- **`index.html`** — the single HTML page. It loads Google Fonts and `src/main.jsx`. The whole app renders inside `<div id="root">`.
- **`src/main.jsx`** — the starting point. It mounts the React app, wraps it in `<BrowserRouter>` (for routing), and loads `firebase.js` and the CSS.
- **`src/App.jsx`** — defines all the routes (which page shows for which URL) and wraps every page in `AppShell`. Also scrolls to top when the page changes.
- **`src/routes.js`** — one object with all the page paths (`/`, `/memories`, `/proposal`, `/date`, `/surprise`).
- **`src/index.css`** — global styles: body background/color and the keyframe animations (`floatHeart`, `fadeIn`, `confettiFall`).

### Config files (`src/config/`)

- **`site.js`** — all the text content of the site (names, taglines, story lines, letter lines, button messages). It reads from `.env` with a small `getEnvValue` helper, or uses a default value.
- **`places.js`** — reads the date places list from `.env` and returns it as an array (used by the Date Planner dropdown).
- **`images.js`** — automatically finds every image inside `src/assets/images/` and returns them as a list (used by Memories and Surprise).
- **`firebase.js`** — sets up Firebase using your project config and turns on Analytics.

### Hooks (`src/hooks/`) — reusable bits of logic

- **`useScrollReveal.js`** — returns simple animation settings so things fade in as you scroll.
- **`useTypewriter.js`** — types out text letter by letter (used in the Surprise letter).
- **`useFallingHearts.js`** — drops animated hearts on the screen (used when she clicks Yes and when the gift opens).

### Layout components (`src/components/layout/`)

- **`AppShell.jsx`** — the page frame: navbar on top, page content in the middle, footer at the bottom.
- **`NavBar.jsx`** — the top menu with Home / Memories / Proposal links and a mobile menu button.
- **`Footer.jsx`** — the bottom strip with the site title and names.

### Effect components (`src/components/effects/`)

- **`FloatingHearts.jsx`** — small hearts that gently float in the background.
- **`Confetti.jsx`** — falling confetti pieces (shown when the gift box opens).
- **`BackgroundCandles.jsx`** and **`FilmGrain.jsx`** — old decoration effects, now turned off (return nothing) to keep the new clean look.

### UI components (`src/components/ui/`) — small reusable building blocks

- **`PageWrapper.jsx`** — wraps each page and gives it a fade-in.
- **`Section.jsx`** — centers content and limits its width.
- **`Heading.jsx`** — titles in different sizes/styles (display, script, section, eyebrow).
- **`Button.jsx`** — the pink button. Works as a link (`to`), an external link (`href`), or a normal button.
- **`Card.jsx`** — a white rounded box with a border and shadow.
- **`Divider.jsx`** — a thin line to separate content.
- **`Lightbox.jsx`** — the popup that shows a photo big, with next/previous and close.

### Pages (`src/pages/`)

- **`Home.jsx`** — the welcome screen (hero) and the story lines.
- **`Memories.jsx`** — a photo grid; clicking a photo opens it in the Lightbox.
- **`Proposal.jsx`** — the "Will you...?" question with Yes / Not yet buttons. Yes drops hearts and the answer is sent to Formspree.
- **`DatePlanner.jsx`** — a form (name, date, time, place, message). It checks the fields and sends the plan to Formspree.
- **`Surprise.jsx`** — the 3-step ending: typewriter letter -> photo slideshow -> gift box that opens to a ring and final message.

### Assets (`src/assets/`)

- **`images/`** — your photos (auto-loaded).
- **`logo.png`**, **`heart-of-roses.jpg`** — pictures used in the design.

---

## Project structure

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
    firebase.js

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
      FloatingHearts.jsx
      Confetti.jsx
      BackgroundCandles.jsx
      FilmGrain.jsx
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

## Theme

- Colors: simple Tailwind colors (pink, gray, white)
- Fonts: `font-display` (Cormorant Garamond), `font-script` (Italianno), `font-eyebrow` (Cormorant SC), `font-body` (Manrope)
- Animations: simple CSS animations and Framer Motion

---

## Tech used

- React (Vite)
- Tailwind CSS
- Framer Motion
- React Router
- Firebase (hosting)
- Formspree (forms)
