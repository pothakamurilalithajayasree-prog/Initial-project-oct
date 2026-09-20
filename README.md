# 🌌 Project OCT — A Special Birthday Surprise for Raghu

A romantic, interactive, cinematic birthday story and experience created for Raghu (October 3, 2026).

---

## ✨ Features

- **Cinematic Midnight Sky Theme**: Deep midnight gradients, dynamic canvas starfield, drifting shooting stars, soft nebula clouds, and glassmorphism UI.
- **Interactive Mystery Storyline**:
  1. *Screen 1 — Mysterious Opening*: Staggered timed text reveal and glowing entry button.
  2. *Screen 2 — The Little Secret*: Nickname riddle with humorous multi-attempt feedback and sparkle unlock.
  3. *Screen 3 — First Superhero Interlude*: Original cute bat-caped hero rooftop skyline animation.
  4. *Screen 4 — 3 Curious Choices*: Interactive reveal cards.
  5. *Screen 5 — Long-Distance Constellation*: Dynamic celestial world map connecting distant cities.
  6. *Screen 6 — Little Things*: Interactive 3D flip cards for shared memories and little habits.
  7. *Screen 7 — Second Superhero Interlude*: Suspense peak with moonlit swoop animation.
  8. *Screen 8 — The Main Birthday Reveal*: Grand glowing reveal of `03 • 10 • 2026` & `RAGHUU...` with celebratory fireworks and floating hearts.
  9. *Screen 9 — Personal Letter*: Emotional letter in a parchment-glass container.
  10. *Screen 10 — Final Secret*: Heartfelt promise.
  11. *Final Screen — Peaceful Rooftop*: Peaceful moonlit scene with replay button.
- **Ambient Sound & Music**: Built-in procedural Web Audio API romantic synth lullaby (starts OFF by default).
- **Mobile-First & Ultra Responsive**: Tailored for smooth viewing on all mobile devices, tablets, and desktop browsers.

---

## 🛠️ Project Structure

```
project-oct/
├── index.html            # Main HTML structure and screen containers
├── styles/
│   ├── main.css          # Design system, glassmorphism tokens, night sky gradients
│   └── animations.css    # Keyframe micro-interactions and transitions
├── js/
│   ├── config.js         # Centralized configuration (nickname, date, texts, letter)
│   ├── starfield.js      # Canvas starfield & shooting stars engine
│   ├── confetti.js       # Fireworks and floating hearts celebration engine
│   ├── audio.js          # Web Audio synthesizer and audio controller
│   ├── bat-scene.js      # Original superhero SVG vector artwork & animations
│   └── app.js            # State machine and interaction coordinator
└── assets/               # Media and icon assets
```

---

## 🚀 How to Run Locally

Simply open `index.html` in any web browser, or run a local HTTP server:

```bash
# Python
python -m http.server 8080

# Or Node.js
npx serve .
```

---

## 💌 Customization

All text, the secret nickname, dates, and messages can be customized in [`js/config.js`](js/config.js).
