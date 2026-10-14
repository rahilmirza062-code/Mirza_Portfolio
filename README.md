# Rahil Mirza — The Interactive Developer Experience

> **“Still learning. Always building. Becoming better.”**  
> *“Not just a student. A developer in progress.”*

An award-winning, cinematic, anime-inspired developer portfolio website engineered for **Rahil Mirza**, a B.Tech Computer & Data Science student at **R. C. Patel Institute of Technology** (Class of 2029).

---

## 🎨 Creative Concept & Design Philosophy

This portfolio departs from generic student templates. It merges a personal brand with immersive storytelling, subtle sound design, purposeful animations, and honest, evidence-backed project achievements.

- **Visual Direction:** Deep charcoal (`#080a10`), midnight navy (`#0c101c`), warm off-white, and electric cyan/emerald accents.
- **Hero Identity:** Featuring the custom anime illustration of Rahil walking through the campus corridor (`/images/rahil-campus.png`), composed in an editorial tech frame with active learning status telemetry.
- **Storytelling:** Chronicles the ongoing growth of a 2nd-year undergraduate engineering student combining core computer science fundamentals, independent research, and AI-assisted engineering.

---

## 🚀 Key Features

1. **Hero Experience:** Staggered typography reveals, status badge (`STATUS: LEARNING & BUILDING`), class tag (`B.TECH • CLASS OF 2029`), and prominent campus corridor portrait.
2. **Authentic About Dossier:** Honest background details, academic curriculum at R. C. Patel Institute of Technology, and a 4-pillar "What Drives Me" matrix.
3. **Transparent Skills Matrix:** Categorized cards separating technologies used in real projects from emerging areas of study. Zero arbitrary percentages.
4. **Real-World Project Showcase:**
   - **Kisan Connect:** Farmer procurement and queue-management platform ([Live Portal](https://kisan-connect-portal.netlify.app/)) with an interactive digital queue token simulator.
   - **Nivasa Hub:** Student accommodation & PG discovery network near campus with an interactive room amenity inspector.
   - **Neuronix AI:** Proposed campus study & exam assistant with separate, transparent tracking for prototyped vs. planned architecture.
5. **Interactive Developer CLI Terminal:** A real working in-browser shell supporting safe predefined commands (`help`, `about`, `skills`, `projects`, `contact`, `status`, `clear`) with keyboard history navigation and mobile quick-access buttons.
6. **Subtle Sound Design (Web Audio API):**
   - Synthesizes tactical clicks, copy confirmations, and mechanical key taps directly in the browser with **zero external audio dependencies**.
   - **Muted by default** to strictly respect browser autoplay restrictions and user context.
   - Sound toggle button in the navigation bar with `localStorage` preference memory.
   - Automatic fallback and graceful silent operation.
7. **Accessibility & Responsive Craft:**
   - Full mobile responsiveness with a custom drawer menu.
   - Semantic HTML5, ARIA labels, and visible keyboard focus states.
   - Respects `prefers-reduced-motion: reduce` by disabling smooth canvas animations and transition movements.

---

## 🎵 Sound Design & How to Disable Audio

The audio synthesizer is implemented in `src/audio/soundEngine.js` using the native Web Audio API.

- **Default State:** Audio is **MUTED by default**. No sound plays unless you explicitly click the **`Sound [OFF]`** button in the top navigation bar.
- **Persistent Preference:** Your sound preference is remembered across sessions via `localStorage.getItem('rahil_portfolio_sound_enabled')`.
- **To Disable Completely in Code:** If you wish to disable sound system-wide permanently, open `src/audio/soundEngine.js` and set:
  ```javascript
  this.muted = true;
  // comment out localStorage reading or return early in init()
  ```

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 3, Vanilla CSS Design System
- **Icons:** Lucide React
- **Audio:** Web Audio API (Synthesized in-browser)
- **Deployment:** Netlify / Vercel ready

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Run

1. Clone or navigate to the repository:
   ```bash
   cd "Porfolio 2.0"
   ```

2. Dependencies are already configured. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser at:
   ```
   http://localhost:5173
   ```

### Production Build
To create an optimized production bundle:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 📬 Contact & Information

- **Developer:** Rahil Mirza
- **Email:** [rahilmirza062@gmail.com](mailto:rahilmirza062@gmail.com)
- **GitHub:** [@rahilmirza062-code](https://github.com/rahilmirza062-code)
- **Institution:** R. C. Patel Institute of Technology, Shirpur, Maharashtra, India
