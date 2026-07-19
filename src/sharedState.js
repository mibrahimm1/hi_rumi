import { useState, useEffect } from 'react'

export const swipeState = { 
  rotationY: 0, 
  targetPanY: 0 
}

// Big Bang State:
// 0: Dark spark
// 1: Growing spark
// 2: Pulsing heartbeat
// 3: EXPLOSION (Supernova)
export const bigBangState = { 
  phase: 0, 
  listeners: new Set() 
}

export const setBigBangPhase = (p) => {
  bigBangState.phase = p
  bigBangState.listeners.forEach((listener) => listener(p))
}

export function useBigBang() {
  const [phase, setPhase] = useState(bigBangState.phase)

  useEffect(() => {
    const listener = (p) => setPhase(p)
    bigBangState.listeners.add(listener)
    return () => {
      bigBangState.listeners.delete(listener)
    }
  }, [])

  return phase
}
