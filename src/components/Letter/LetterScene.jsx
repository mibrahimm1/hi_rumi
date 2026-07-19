// LetterScene.jsx — GSAP-driven magical letter reveal overlay
//
// Animation timeline:
//   0 – 1.4s  : 16 sparkle particles converge from random screen positions to centre
//   0.5 – 2.1s: radial bloom glow expands then dissolves
//   1.6 – 2.6s: paper zooms in from deep z-depth (3D perspective fly-in)
//   2.7 – 3.6s: letter text lines reveal with stagger fade-up
//   3.8s+      : GSAP idle float (gentle y + rotationX oscillation)
//
// Rendered by SceneContent when currentScene === 0.

import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import LetterPaper from './LetterPaper'

// ─── Sparkle data (module-level = stable across HMR) ─────────────────────────
const SPARKLE_COUNT = 16
const SPARKLES = Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
  id: i,
  top:   8  + Math.random() * 78, // 8%  – 86%  of viewport
  left:  6  + Math.random() * 82, // 6%  – 88%
  size:  4  + Math.random() * 7,  // 4px – 11px
  delay: Math.random() * 0.32,    // stagger 0 – 0.32s
  color: ['#f5e6a3', '#f8b4c8', '#ffe4b5', '#fff8dc', '#ffd700', '#e8a0b4', '#c8f0f8'][
    Math.floor(Math.random() * 7)
  ],
}))

// ─── Gentle sound helper (silent-fails if files don't exist) ─────────────────
function playSound(src, volume = 0.3) {
  try {
    const a = new Audio(src)
    a.volume = volume
    a.play().catch(() => {})
  } catch (_) {}
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function LetterScene() {
  const containerRef  = useRef(null) // outer fixed div
  const sparkleRefs   = useRef([])   // array of sparkle DOM refs
  const bloomRef      = useRef(null) // central glow div
  const paperWrapRef  = useRef(null) // perspective container
  const paperInnerRef = useRef(null) // GSAP 3D fly-in target
  const idleTweens    = useRef([])   // stored so cleanup can kill them

  // ─── Store sparkle ref ────────────────────────────────────────────────────
  const setSparkleRef = useCallback((el, i) => {
    sparkleRefs.current[i] = el
  }, [])

  useEffect(() => {
    const paper = paperInnerRef.current
    const bloom = bloomRef.current
    if (!paper || !bloom) return

    // ── Reset all GSAP-controlled elements to known start state ──────────────
    const textEls = paper.querySelectorAll('.letter-text')
    const wordEls = paper.querySelectorAll('.letter-word')

    gsap.set(paper, { z: -750, rotationX: 20, rotationY: -7, opacity: 0, scale: 0.5 })
    gsap.set(textEls,  { opacity: 1, y: 0 }) // Parent text container stays visible
    gsap.set(wordEls,  { opacity: 0 })       // Individual words are hidden
    gsap.set(bloom,    { scale: 0, opacity: 0 })
    sparkleRefs.current.forEach(el => {
      if (el) gsap.set(el, { x: 0, y: 0, opacity: 1, scale: 1 })
    })
    idleTweens.current.forEach(t => t?.kill())
    idleTweens.current = []

    // ── Sound cues ────────────────────────────────────────────────────────────
    playSound('/music/magic-shimmer.mp3', 0.3)
    setTimeout(() => playSound('/music/paper-rustle.mp3', 0.4), 1600)

    // ── Build main GSAP timeline ──────────────────────────────────────────────
    const tl = gsap.timeline()

    // Phase A — Sparkles converge to viewport centre
    sparkleRefs.current.forEach((el, i) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const dx = window.innerWidth  / 2 - rect.left - rect.width  / 2
      const dy = window.innerHeight / 2 - rect.top  - rect.height / 2
      tl.to(
        el,
        {
          x: dx,
          y: dy,
          scale: 0.15,
          opacity: 0,
          duration: 0.9 + Math.random() * 0.4,
          ease: 'power2.inOut',
        },
        SPARKLES[i].delay, // staggered start (0 – 0.32s)
      )
    })

    // Phase A — Bloom glow: expand …
    tl.to(bloom, { scale: 1.7, opacity: 0.68, duration: 0.85, ease: 'power2.out' }, 0.55)
    // … then dissolve
    tl.to(bloom, { opacity: 0, scale: 2.4, duration: 0.85, ease: 'power2.in' }, 1.35)

    // Phase B — Paper 3D fly-in from behind camera
    tl.to(
      paper,
      {
        z: 0,
        rotationX: 2,
        rotationY: 0,
        opacity: 1,
        scale: 1,
        duration: 1.05,
        ease: 'power3.out',
      },
      1.6,
    )

    // Phase C — Stagger text reveal (Typewriter effect)
    tl.to(
      wordEls,
      {
        opacity: 1,
        stagger: 0.1, // 0.1s per word (10 words per second)
        duration: 0.1,
      },
      2.72,
    )

    // Phase D — Start idle float (gentle bob + rock)
    tl.call(
      () => {
        // Gentle vertical bob
        const t1 = gsap.to(paper, {
          y: 7,
          duration: 3.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
        // Very subtle rotationX breath
        const t2 = gsap.to(paper, {
          rotationX: 3.2,
          duration: 5.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
        // Micro rotationY sway
        const t3 = gsap.to(paper, {
          rotationY: 0.8,
          duration: 6.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
        idleTweens.current = [t1, t2, t3]
      },
      null,
      3.85,
    )

    return () => {
      tl.kill()
      idleTweens.current.forEach(t => t?.kill())
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 20,
      }}
    >
      {/* ── Convergence sparkles (positioned absolutely in the fixed viewport) ── */}
      {SPARKLES.map((sp, i) => (
        <div
          key={sp.id}
          ref={el => setSparkleRef(el, i)}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top:  `${sp.top}%`,
            left: `${sp.left}%`,
            width:  `${sp.size}px`,
            height: `${sp.size}px`,
            borderRadius: '50%',
            background: sp.color,
            boxShadow: `0 0 ${sp.size * 2.5}px ${sp.color}, 0 0 ${sp.size * 5}px ${sp.color}55`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ── Central bloom glow (radial gradient that flares on entry) ─────────── */}
      <div
        ref={bloomRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top:  '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width:  '340px',
          height: '340px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(245,230,163,0.85) 0%, rgba(248,180,200,0.5) 35%, rgba(200,162,200,0.2) 60%, transparent 75%)',
          pointerEvents: 'none',
          transformOrigin: 'center center',
        }}
      />

      {/* ── Perspective container → GSAP-animated paper wrapper ────────────────── */}
      <div
        ref={paperWrapRef}
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 48%',
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: '430px',
          padding: '0 18px',
        }}
      >
        <div
          ref={paperInnerRef}
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform, opacity',
          }}
        >
          <LetterPaper />
        </div>
      </div>
    </motion.div>
  )
}
