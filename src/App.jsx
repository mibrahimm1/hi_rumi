import { useState, useCallback, Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence } from 'framer-motion'
import Experience from './components/Experience'
import LoadingScreen from './components/LoadingScreen'
import EnterScreen from './components/EnterScreen'
import SceneContent from './components/SceneContent'
import NavigationButton from './components/UI/NavigationButton'
import MusicPlayer from './components/MusicPlayer'

const TOTAL_SCENES = 6

function App() {
  const [phase, setPhase] = useState('loading')
  const [currentScene, setCurrentScene] = useState(0)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  const handleStart = () => {
    setPhase('experience')
    setMusicPlaying(true)
  }

  const goToScene = useCallback((index) => {
    if (transitioning || index < 0 || index >= TOTAL_SCENES) return
    setTransitioning(true)
    setCurrentScene(index)
    setTimeout(() => setTransitioning(false), 1400)
  }, [transitioning])

  const lastInteraction = useRef(0)

  useEffect(() => {
    if (phase !== 'experience') return

    let touchStartY = 0

    const handleWheel = (e) => {
      const now = Date.now()
      if (now - lastInteraction.current < 1500) return
      
      if (e.deltaY > 30) {
        goToScene(currentScene + 1)
        lastInteraction.current = now
      } else if (e.deltaY < -30) {
        goToScene(currentScene - 1)
        lastInteraction.current = now
      }
    }

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY - touchEndY
      const now = Date.now()
      
      if (now - lastInteraction.current < 1500) return
      
      if (deltaY > 50) { // Swipe up -> next scene
        goToScene(currentScene + 1)
        lastInteraction.current = now
      } else if (deltaY < -50) { // Swipe down -> prev scene
        goToScene(currentScene - 1)
        lastInteraction.current = now
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [phase, currentScene, goToScene])

  return (
    <div className="w-full h-[100dvh] fixed inset-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={1}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        style={{
          opacity: phase === 'loading' ? 0.3 : 1,
          transition: 'opacity 1.5s ease',
        }}
      >
        <color attach="background" args={['#050010']} />
        <Suspense fallback={null}>
          <Experience currentScene={currentScene} phase={phase} />
        </Suspense>
      </Canvas>

      {/* Loading overlay */}
      <AnimatePresence>
        {phase === 'loading' && (
          <LoadingScreen key="loader" onReady={() => setPhase('enter')} />
        )}
      </AnimatePresence>

      {/* Enter screen overlay */}
      <AnimatePresence>
        {phase === 'enter' && (
          <EnterScreen key="enter" onStart={handleStart} />
        )}
      </AnimatePresence>

      {/* Experience overlays */}
      {phase === 'experience' && (
        <>
          <SceneContent currentScene={currentScene} transitioning={transitioning} />
          <NavigationButton
            currentScene={currentScene}
            totalScenes={TOTAL_SCENES}
            onNext={() => goToScene(currentScene + 1)}
            onPrev={() => goToScene(currentScene - 1)}
            transitioning={transitioning}
          />
          <MusicPlayer isPlaying={musicPlaying} setIsPlaying={setMusicPlaying} />
        </>
      )}
    </div>
  )
}

export default App
