// ParticleField.jsx — R3F golden dust particles for LetterScene background
// Uses drei <Sparkles> for performant GPU-driven particle animation.
// Two layers: warm gold drifting dust + soft amber micro-motes.

import { Sparkles } from '@react-three/drei'

export default function ParticleField() {
  return (
    <group>
      {/* Primary layer — golden parchment dust, wider spread */}
      <Sparkles
        count={110}
        size={1.4}
        scale={[15, 11, 7]}
        color="#f5e6a3"
        speed={0.13}
        opacity={0.55}
        noise={0.45}
      />

      {/* Secondary layer — amber embers, tighter + slower */}
      <Sparkles
        count={65}
        size={0.85}
        scale={[10, 7.5, 4]}
        color="#ffb870"
        speed={0.08}
        opacity={0.35}
        noise={0.3}
      />

      {/* Accent layer — faint blush, adds warmth near centre */}
      <Sparkles
        count={40}
        size={0.6}
        scale={[6, 5, 3]}
        color="#f8d0c8"
        speed={0.06}
        opacity={0.22}
        noise={0.2}
      />
    </group>
  )
}
