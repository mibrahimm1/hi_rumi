# Hi Rumi — Project Context & Bible

> A romantic, immersive 3D birthday web experience for Rumaisa (Rumi), built by Ibrahim (nerdo).
> Birthday: **July 20, 2026**
> Deployed on: **Vercel**

---

## 1. THE RELATIONSHIP

### Key Facts
- **Her name**: Rumaisa (Rumi)
- **His name**: Ibrahim Shaikh (she calls him "nerdo")
- **Known each other**: ~5 years (friends first)
- **Relationship started**: March 21, 2026
- **Dates so far**: 3 dates since the relationship began
- **Birthday**: July 20, 2026
- **Platform**: Instagram DMs (the chat source)

### Pet Names
| Ibrahim calls her | Rumaisa calls him |
|---|---|
| **meri jaan** (most frequent) | **hon / honey / honeyloo** (most frequent) |
| **love** | **nerdo / nerdoo** |
| **baby** | **pyaruu** |
| **sweetheart** | **baby** |
| **my girl / my woman** | **lovely boy** |
| **jaana / meri jaana** | |
| **rasmalai** 🍮 (cute food nickname) | |

### The Iconic Nickname Chain
> "my rasmalai urf strawberry icecream urf rumi baby urf honeyloo"

### Inside Jokes & Unique Phrases
- **"Meethi meethi baatein"** — their phrase for sweet nightly talks
- **"Nerdo"** — her signature name for him ("yehi keh im gonna meet nerdo", "nerdo karega tumhara paper")
- **"Mera kabza hai ap par"** — her playful possessive claim on him
- **"Eid Mubarak nerdoo!"** — an early spark moment
- **"Kha jaon tumko"** — her playful affection
- **"LOVELLYYY EYESSS"** — he's obsessed with her eyes
- **"I couldn't keep my eyes off you when you were walking Habitt pe"** — his own words after their first date

### Their Date Spots
1. **Habitt Café** — main date spot (mirror selfies, first date, "Sunday was our Habitt day")
2. **Satori** — coffee dates
3. **Second Street** — another hangout
4. Walking dates (road walks, hand holding)

### Emotional Themes from Chat Analysis
- He fell for her trustworthiness first: *"the first thing that brought me towards you is that you're trustworthy meri jaan"*
- 5 years of friendship before dating — the slow-burn love story
- She's his safe space: *"cause meh toh apko kuch bhi batadoon"*
- He's protective: *"I wish I always succeed in protecting you"*
- She changed him: *"when you tell me how you've changed since me"*
- Deep emotional vulnerability — they cry together, share family struggles, support each other
- "You turned my tears into happy tears"
- "Calming you down is something I want to be really really good at"
- First hug was a huge deal — very emotional
- "Itni kissies doongi" — her cute promise
- "I want to love you in ways you haven't imagined"
- He wants to take her on proper dates: "then I imagined how I would want to take you out to a really nice date"
- Locket app sharing — they use Locket camera widget

### Chat Data Location
- **Path**: `d:\Personal Projects\rumaisa\rumaisa_843433280390315\`
- **Files**: `message_1.json` through `message_12.json`
- **Format**: Instagram data export JSON (messages in reverse chronological order — newest first)
- **Date ranges**:
  - `message_1.json`: 2026-07-17 to 2026-07-07 (most recent)
  - `message_2.json`: 2026-07-07 to 2026-06-26
  - `message_3.json`: 2026-06-26 to 2026-06-16
  - `message_4.json`: 2026-06-16 to 2026-06-08
  - `message_5.json`: 2026-06-08 to 2026-05-31
  - `message_6.json`: 2026-05-31 to 2026-05-24
  - `message_7.json`: 2026-05-24 to 2026-05-16
  - `message_8.json`: 2026-05-16 to 2026-05-03
  - `message_9.json`: 2026-05-03 to 2026-04-25
  - `message_10.json`: 2026-04-25 to 2026-04-17
  - `message_11.json`: 2026-04-17 to 2026-04-01 (first month as a couple)
  - `message_12.json`: 2026-04-01 to 2025-07-20 (pre-relationship friendship era)
- **Each file**: ~10,000 messages, ~70K-76K lines
- **Total**: ~120,000 messages

---

## 2. THE VISION

### Concept: "Hi Rumi — A Journey Through Our Universe"
A **single immersive 3D scroll-driven experience** where the user flies through different romantic worlds. Not a website with 3D decoration — the 3D IS the experience.

### Aesthetic Direction
- **Studio Ghibli** warmth meets **cosmic dreamy** space
- **Pastel color palette**: pink, lavender, gold, cream, mint
- **Deeply romantic** — cinematic/emotional but also playful
- **Music**: "Until I Found You" by Stephen Sanchez
- **Mobile-first** (it's a birthday gift she'll open on her phone)

### The 5 Acts (scroll-driven camera flight through 3D space):

**Act 1 — "The Letter" (scroll pages 0-1)**
- Dark cosmic void with floating 3D hearts, sparkles
- A vintage brown paper letter with burned/torn edges floats in center
- Handwritten text: "Dear Rumi..." with personalized content
- Signed "— nerdo ♥"

**Act 2 — "Meethi Meethi Baatein" / The Garden (scroll pages 1-3)**
- Ghibli-style 3D flower garden materializes
- 20+ procedural 3D flowers with animated petals
- Falling cherry blossom petals (instanced meshes)
- Fireflies (sparkles)
- 12 "reasons I love you" cards floating in 3D space
- All reasons extracted from real chat moments

**Act 3 — "Our Universe" (scroll pages 3-5)**
- Deep space with 5000+ stars
- 3D nebula clouds (MeshDistortMaterial)
- "RUMI" spelled out as a constellation of connected star meshes
- 3 shooting stars with Trail effects
- 3 orbiting celestial bodies
- Date memory cards floating in space (Habitt, 2nd date, 3rd date)
- Central glowing orb = "our love"

**Act 4 — "The Journey" (scroll pages 5-7)**
- Floating islands (cylinder + cone geometry) with mini trees and flowers
- Golden tube geometry ribbon connecting them
- 3D hearts scattered throughout
- Journey moments text floating on each island
- Stars and sparkles

**Act 5 — "Happy Birthday, Meri Jaan" / Finale (scroll pages 7-8)**
- 15 rising lanterns (glowing spheres ascending)
- Massive central 3D heart
- 100+ sparkles / particles
- 8 smaller hearts in all colors floating
- The grand birthday message crafted from his real words
- Signed "— Forever yours, nerdo ♾️"

---

## 3. TECH STACK

### Core
- **React 19** + **Vite 8** (fast HMR, mobile-optimized)
- **Three.js** via **React Three Fiber** (R3F) — the 3D engine
- **@react-three/drei** — helpers (ScrollControls, Float, Stars, Html, MeshDistortMaterial, Trail, Sparkles, Cloud)
- **@react-three/postprocessing** — Bloom, Vignette effects
- **Framer Motion** — 2D animations (loading screen, enter screen, music player)
- **Tailwind CSS v4** — styling with custom theme tokens
- **GSAP** — installed but not yet heavily used (available for scroll animations)

### Deployment
- **Vercel** (free tier, easy deploy)

### Fonts (Google Fonts)
- **Dancing Script** — handwritten feel (for emotional text, letter, signatures)
- **Cormorant Garamond** — elegant serif (for quotes, reason cards)
- **Quicksand** — body font (clean, modern)

---

## 4. PROJECT STRUCTURE

```
d:\Personal Projects\hi_rumi\
├── index.html                    # Entry point with Google Fonts
├── vite.config.js                # Vite + React + Tailwind
├── package.json                  # Dependencies
├── public/
│   ├── favicon.svg               # 💕 emoji favicon
│   ├── music/
│   │   └── song.mp3              # "Until I Found You" (user provides)
│   └── photos/
│       ├── date1.jpg             # First date photos (user provides)
│       ├── date2.jpg             # Second date photos
│       └── date3.jpg             # Third date photos
├── src/
│   ├── main.jsx                  # React entry
│   ├── index.css                 # Tailwind + theme tokens + animations
│   ├── App.jsx                   # App shell: Canvas + ScrollControls + UI overlays
│   └── components/
│       ├── Experience.jsx        # THE CORE — entire 3D world (all 5 acts)
│       ├── EnterScreen.jsx       # "Open Your Gift" landing
│       ├── LoadingScreen.jsx     # Loading animation
│       └── MusicPlayer.jsx       # Music toggle button
```

### Key Architecture Decision
**Everything 3D lives in ONE component: `Experience.jsx`**
- Single `<Canvas>` with `<ScrollControls pages={8}>`
- `useScroll()` drives camera position (moves group Y by `-offset * 60`)
- All 5 scenes are placed at different Y positions in the same 3D space
- User scrolls → camera descends through the worlds
- Text is rendered via drei's `<Html>` component inside 3D space

---

## 5. DESIGN TOKENS (CSS)

```css
--color-pastel-pink: #f8b4c8;
--color-pastel-lavender: #c8a2c8;
--color-pastel-gold: #f5e6a3;
--color-pastel-cream: #fdf6e3;
--color-pastel-mint: #b8e6d4;
--color-pastel-rose: #e8a0b4;
--color-deep-purple: #1a0a2e;
--color-deep-blue: #0d1b3e;
--color-cosmic-pink: #ff6b9d;
--color-cosmic-purple: #c44dff;
--color-warm-glow: #ffb347;
```

---

## 6. 3D COMPONENTS INVENTORY

| Component | Type | Used In |
|---|---|---|
| `Heart3D` | Extruded 2D heart shape with bevel | All scenes |
| `Flower3D` | 6-petal sphere caps + center + stem | Garden |
| `FloatingIsland` | Cylinder top + cone bottom + mini tree | Journey |
| `Nebula` | Sphere with MeshDistortMaterial | Universe |
| `ConstellationRUMI` | Array of sphere meshes spelling R-U-M-I | Universe |
| `OrbitingBody` | Sphere on circular path | Universe |
| `ShootingStar3D` | Sphere with Trail component | Universe |
| `GoldenRibbon` | TubeGeometry on CatmullRomCurve3 | Journey |
| `Lantern` | Small glowing sphere rising upward | Finale |
| `FallingPetals3D` | InstancedMesh planes falling | Garden |
| `DateCard` | HTML-in-3D card | Universe |

---

## 7. CONTENT — ALL PERSONALIZED TEXT

### Letter (Act 1)
> Dear Rumi,
> Mere dil ke haal ko jaanne ki haqdaar sirf tum ho, Rumaisa. Five years of knowing you — and somewhere along the way, you became my whole universe.
> This is every meethi meethi baat, every moment I couldn't keep my eyes off you — built into a world just for us.
> — nerdo ♥

### Garden Reasons (Act 2)
1. Those eyes — I could never stop staring
2. You're trustworthy — the first thing that pulled me in
3. Our meethi meethi baatein at midnight
4. You're my safe space — meh toh apko kuch bhi batadoon
5. How clingy you get — I loved it, meri jaan
6. The way you call me nerdo
7. You turned my tears into happy tears
8. 5 years — and you never left
9. Mera kabza hai ap par
10. I wish I always succeed in protecting you

### Date Memories (Act 3)
- **Habitt ☕ — Our First Date**: "I couldn't keep my eyes off you walking Habitt pe..."
- **Second Date 🌙**: "Every second felt like a dream I was terrified to wake up from."
- **Third Date ⭐**: "You're my favorite place in the entire universe, meri jaan."
- **March 21, 2026**: "The day my universe found its center"

### Journey Moments (Act 4)
1. 5 years of knowing you
2. That first 'Eid Mubarak nerdoo!'
3. Every late-night call
4. March 21 — everything changed
5. Habitt — couldn't keep my eyes off you
6. Itni kissies doongi
7. Every 'hi honeyloo'

### Finale Message (Act 5)
> Someone who has such a beautiful heart and soul deserves the whole world. I want to spend my life trying to give you that.
> I want to love you in ways you haven't imagined. You've had me since day one. Since that first "Eid Mubarak nerdoo."
> I wish our meethi meethi baatein never end. I wish every year of your life is more beautiful than the last.
> Happy Birthday, my rasmalai 🍮
> — Forever yours, nerdo ♾️

---

## 8. ASSETS NEEDED (from Ibrahim)

| Asset | Path | Status |
|---|---|---|
| Song: "Until I Found You" by Stephen Sanchez | `public/music/song.mp3` | ⏳ Pending |
| First date photo(s) | `public/photos/date1.jpg` | ⏳ Pending |
| Second date photo(s) | `public/photos/date2.jpg` | ⏳ Pending |
| Third date photo(s) | `public/photos/date3.jpg` | ⏳ Pending |
| Additional 96 media items | TBD | ⏳ Pending |

---

## 9. KNOWN ISSUES / TODO

- [ ] Photos not yet integrated (placeholders with emoji fallback)
- [ ] Song file not yet added
- [ ] Bundle size is ~1.3MB (could code-split with dynamic imports)
- [ ] The 3D experience quality needs refinement — more immersive camera paths, better transitions between acts, potentially Spline assets for richer visuals
- [ ] Consider adding a photo gallery/carousel in the Universe scene
- [ ] Mobile performance testing needed (heavy 3D on low-end phones)
- [ ] Consider reducing particle counts on mobile for performance
- [ ] Could add GSAP-driven scroll animations for more cinematic camera movement
- [ ] The "scroll through" feeling could be enhanced with rotation/zoom changes per scene

---

## 10. DEVELOPMENT COMMANDS

```bash
# Install dependencies
npm install

# Dev server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 11. DEPLOYMENT (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Or connect the GitHub repo to Vercel for auto-deploy on push.

---

*Last updated: July 19, 2026*
*Created by Ibrahim's nerdo AI assistant 🤓*
