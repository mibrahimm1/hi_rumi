// LetterPaper.jsx — Vintage burnt-edge paper with Armelie handwritten text
// All text uses Armelie font exclusively. Text elements carry class="letter-text"
// so parent (LetterScene) can target them for GSAP stagger reveal.

function WaxSeal() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '18px',
        left: '50%',
        transform: 'translateX(-50%)',
        filter:
          'drop-shadow(0 0 6px rgba(180, 50, 80, 0.9)) drop-shadow(0 0 16px rgba(255, 130, 50, 0.45))',
        animation: 'waxGlow 3s ease-in-out infinite',
        zIndex: 2,
      }}
    >
      <svg viewBox="0 0 52 52" width="52" height="52" aria-hidden="true">
        {/* Wax drips below the seal */}
        <ellipse cx="26" cy="49" rx="13" ry="3.5" fill="#5c1228" opacity="0.55" />
        <ellipse cx="18" cy="45" rx="4" ry="6.5" fill="#6b1530" opacity="0.7" />
        <ellipse cx="34" cy="44" rx="3.5" ry="5.5" fill="#6b1530" opacity="0.65" />
        {/* Main disc layers */}
        <circle cx="26" cy="23" r="21" fill="#5c1228" />
        <circle cx="26" cy="23" r="19" fill="#7a1a3a" />
        <circle cx="26" cy="23" r="17.5" fill="#8e2450" />
        {/* Outer rim dashed ring */}
        <circle
          cx="26"
          cy="23"
          r="19"
          fill="none"
          stroke="#c94c7c"
          strokeWidth="0.9"
          strokeDasharray="3.2 2.8"
          opacity="0.55"
        />
        {/* Inner decorative ring */}
        <circle cx="26" cy="23" r="13.5" fill="none" stroke="#c94c7c" strokeWidth="0.45" opacity="0.35" />
        {/* Heart stamp */}
        <path
          d="M26 33.5 L17.5 25 C14.8 22.3 14.8 18.5 18.5 16.8 C21.2 15.8 23.8 17.8 26 20.5 C28.2 17.8 30.8 15.8 33.5 16.8 C37.2 18.5 37.2 22.3 34.5 25 Z"
          fill="#f8b4c8"
          opacity="0.88"
        />
        {/* Highlight shimmer on seal */}
        <ellipse
          cx="21"
          cy="19"
          rx="4"
          ry="2.5"
          fill="#d45078"
          opacity="0.28"
          transform="rotate(-25 21 19)"
        />
      </svg>
    </div>
  )
}

// Pre-computed irregular polygon for burnt edge clipping (44 points)
const BURNT_CLIP = `polygon(
  1.4% 0%, 5% 0.5%, 10% 0%, 15% 0.7%, 20% 0.2%, 25% 0.6%, 30% 0%, 35% 0.4%, 40% 0.1%, 45% 0.6%, 50% 0%,
  55% 0.5%, 60% 0.1%, 65% 0.6%, 70% 0%, 75% 0.5%, 80% 0.2%, 85% 0.6%, 90% 0%, 95% 0.4%, 98.8% 0%,
  100% 0.8%, 99.6% 6%, 100% 12%, 99.4% 18%, 100% 24%, 99.5% 30%, 100% 36%, 99.4% 42%, 100% 48%,
  99.5% 54%, 100% 60%, 99.4% 66%, 100% 72%, 99.5% 78%, 100% 84%, 99.4% 90%, 100% 96%, 99.2% 100%,
  95% 99.4%, 90% 100%, 85% 99.5%, 80% 100%, 75% 99.4%, 70% 100%, 65% 99.5%, 60% 100%, 55% 99.4%,
  50% 100%, 45% 99.5%, 40% 100%, 35% 99.4%, 30% 100%, 25% 99.5%, 20% 100%, 15% 99.4%, 10% 100%, 5% 99.5%, 1.2% 100%,
  0% 99%, 0.5% 94%, 0% 88%, 0.6% 82%, 0% 76%, 0.5% 70%, 0% 64%, 0.6% 58%, 0% 52%,
  0.5% 46%, 0% 40%, 0.6% 34%, 0% 28%, 0.5% 22%, 0% 16%, 0.6% 10%, 0% 4%, 0.5% 1%
)`

export default function LetterPaper() {
  return (
    <div
      className="letter-paper-root"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '370px',
        minHeight: '415px',
        // ─── Layered gradients: vintage parchment/sepia tones ───────────────
        background: [
          'radial-gradient(ellipse 65% 28% at 14% 10%, rgba(228,192,140,0.65) 0%, transparent 100%)',
          'radial-gradient(ellipse 55% 22% at 88% 88%, rgba(172,118,70,0.55) 0%, transparent 100%)',
          'radial-gradient(ellipse 45% 40% at 75% 20%, rgba(218,180,120,0.35) 0%, transparent 100%)',
          'radial-gradient(ellipse 80% 75% at 50% 55%, rgba(226,194,145,0.6) 0%, transparent 100%)',
          'linear-gradient(158deg, #c8955a 0%, #d4a86e 16%, #cc9e5c 33%, #dcba7a 52%, #c79450 68%, #d3a562 85%, #c8975e 100%)',
        ].join(', '),
        // ─── Irregular burnt-edge outline ────────────────────────────────────
        clipPath: BURNT_CLIP,
        // ─── Depth shadows ───────────────────────────────────────────────────
        boxShadow: [
          'inset 0 0 35px rgba(45, 18, 0, 0.55)',
          'inset 0 0 10px rgba(25, 8, 0, 0.35)',
          '0 12px 55px rgba(0, 0, 0, 0.6)',
          '0 3px 18px rgba(0, 0, 0, 0.35)',
        ].join(', '),
        padding: '28px 24px 74px',
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
    >
      {/* ── Charred corners + edges ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: [
            // 4 corners (deep char)
            'radial-gradient(ellipse 28% 28% at 0% 0%, rgba(12, 4, 0, 0.96) 0%, transparent 100%)',
            'radial-gradient(ellipse 28% 28% at 100% 0%, rgba(12, 4, 0, 0.96) 0%, transparent 100%)',
            'radial-gradient(ellipse 28% 28% at 0% 100%, rgba(12, 4, 0, 0.9) 0%, transparent 100%)',
            'radial-gradient(ellipse 28% 28% at 100% 100%, rgba(12, 4, 0, 0.9) 0%, transparent 100%)',
            // Top + bottom edges
            'radial-gradient(ellipse 72% 14% at 50% 0%, rgba(22, 8, 0, 0.82) 0%, transparent 100%)',
            'radial-gradient(ellipse 72% 14% at 50% 100%, rgba(22, 8, 0, 0.78) 0%, transparent 100%)',
            // Left + right edges
            'radial-gradient(ellipse 11% 65% at 0% 50%, rgba(18, 6, 0, 0.78) 0%, transparent 100%)',
            'radial-gradient(ellipse 11% 65% at 100% 50%, rgba(18, 6, 0, 0.78) 0%, transparent 100%)',
          ].join(', '),
        }}
      />

      {/* ── Ember / amber glow at burnt edges (screen blend) ────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          background: [
            'radial-gradient(ellipse 92% 9% at 50% 0%, rgba(215, 105, 18, 0.38) 0%, transparent 100%)',
            'radial-gradient(ellipse 92% 9% at 50% 100%, rgba(215, 105, 18, 0.32) 0%, transparent 100%)',
            'radial-gradient(ellipse 9% 85% at 0% 50%, rgba(215, 105, 18, 0.32) 0%, transparent 100%)',
            'radial-gradient(ellipse 9% 85% at 100% 50%, rgba(215, 105, 18, 0.32) 0%, transparent 100%)',
          ].join(', '),
        }}
      />

      {/* ── Paper grain texture (inline SVG noise) ──────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* ── Aged yellowing streaks (simulate old paper veins) ───────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.18,
          background: [
            'linear-gradient(72deg, transparent 0%, rgba(180,140,80,0.5) 35%, transparent 70%)',
            'linear-gradient(148deg, transparent 20%, rgba(150,110,55,0.35) 50%, transparent 80%)',
          ].join(', '),
        }}
      />

      {/* ── Letter content ──────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* "Dear Rumi," — greeting */}
        <TypewriterText
          className="letter-text"
          style={{
            fontFamily: '"Armelie", serif',
            fontSize: 'clamp(1.3rem, 4.5vw, 1.6rem)',
            color: '#2c1a0a',
            marginBottom: '1rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.2), 0 0 1px rgba(0,0,0,0.1)',
            lineHeight: 1.2,
            letterSpacing: '0.01em',
          }}
          text="Dear Rumi,"
        />

        {/* Body paragraphs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <TypewriterText
            className="letter-text"
            style={{
              fontFamily: '"Armelie", serif',
              fontSize: 'clamp(0.82rem, 2.6vw, 0.97rem)',
              color: '#3a220e',
              lineHeight: 1.88,
              textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.12)',
              letterSpacing: '0.005em',
            }}
            text="Mere dil ke haal ko jaanne ki haqdaar sirf tum ho. It's been five long years of knowing you — and now that i've experienced you, All I wonder is how much time i've wasted all these years."
          />

          <TypewriterText
            className="letter-text"
            style={{
              fontFamily: '"Armelie", serif',
              fontSize: 'clamp(0.82rem, 2.6vw, 0.97rem)',
              color: '#3a220e',
              lineHeight: 1.88,
              textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.12)',
              letterSpacing: '0.005em',
            }}
            text="This is every meethi meethi baatein, every moment I couldn't keep my eyes off you, and every moment that made my entire heart yours, built into a world just for us."
          />
        </div>

        {/* Signature */}
        <div
          className="letter-text"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: '1.2rem',
          }}
        >
          <TypewriterText
            style={{
              fontFamily: '"Armelie", serif',
              fontSize: 'clamp(1rem, 3.2vw, 1.18rem)',
              color: '#4a2a10',
              textShadow: '1px 1px 2px rgba(0,0,0,0.18)',
              letterSpacing: '0.01em',
            }}
            text="— sirf aapka nerdo ♡"
          />
        </div>
      </div>

      {/* ── Wax seal ────────────────────────────────────────────────────────── */}
      <WaxSeal />
    </div>
  )
}

function TypewriterText({ text, className, style }) {
  const words = text.split(' ')
  return (
    <p className={className} style={style}>
      {words.map((word, i) => (
        <span key={i} className="letter-word" style={{ opacity: 0 }}>
          {word}{' '}
        </span>
      ))}
    </p>
  )
}
