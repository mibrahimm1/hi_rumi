import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const TOTAL_PHOTOS = 24

export default function LoadingScreen({ onReady }) {
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(0)

  // 1. Enforce minimum time for the beautiful drawing animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true)
    }, 2800)
    return () => clearTimeout(timer)
  }, [])

  // 2. Preload all heavy images in the background
  useEffect(() => {
    let loadedCount = 0
    const imageUrls = Array.from({ length: TOTAL_PHOTOS }, (_, i) => `/photos/${i + 1}.jpg`)
    
    // Preload custom fonts by injecting a hidden element
    document.fonts.ready.then(() => {
      console.log('Fonts loaded')
    })
    
    imageUrls.forEach(url => {
      const img = new Image()
      // Whether it loads or fails, we increment to avoid getting stuck forever
      img.onload = img.onerror = () => {
        loadedCount++
        setImagesLoaded(loadedCount)
      }
      img.src = url
    })
  }, [])

  // 3. Complete loading when both conditions are met
  useEffect(() => {
    if (minTimeElapsed && imagesLoaded >= TOTAL_PHOTOS) {
      onReady()
    }
  }, [minTimeElapsed, imagesLoaded, onReady])

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050010]"
    >
      {/* Animated heart that draws itself */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
        >
          <svg viewBox="0 0 32 32" className="w-20 h-20 md:w-24 md:h-24">
            <motion.path
              d="M16 28l-1.45-1.32C7.4 20.36 4 17.28 4 13.5 4 10.42 6.42 8 9.5 8c1.74 0 3.41.81 4.5 2.09C15.09 8.81 16.76 8 18.5 8 21.58 8 24 10.42 24 13.5c0 3.78-3.4 6.86-8.55 11.54L16 28z"
              stroke="#f8b4c8"
              strokeWidth="0.6"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                fill: ['rgba(255,107,157,0)', 'rgba(255,107,157,0)', 'rgba(255,107,157,0.5)'],
              }}
              transition={{
                pathLength: { duration: 1.5, ease: 'easeInOut' },
                fill: { duration: 2.2, times: [0, 0.65, 1], ease: 'easeIn' },
              }}
            />
            {/* Glow behind */}
            <motion.path
              d="M16 28l-1.45-1.32C7.4 20.36 4 17.28 4 13.5 4 10.42 6.42 8 9.5 8c1.74 0 3.41.81 4.5 2.09C15.09 8.81 16.76 8 18.5 8 21.58 8 24 10.42 24 13.5c0 3.78-3.4 6.86-8.55 11.54L16 28z"
              fill="none"
              stroke="#f8b4c8"
              strokeWidth="2"
              opacity="0.15"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="heading text-xl md:text-2xl text-pastel-pink mt-6"
      >
        {imagesLoaded < TOTAL_PHOTOS ? 'Loading your universe...' : 'Ready...'}
      </motion.p>

      {/* Progress bar */}
      <div className="w-28 md:w-36 h-[2px] bg-pastel-pink/15 rounded-full mt-5 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-pastel-pink/60 to-cosmic-pink/60 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(10, (imagesLoaded / TOTAL_PHOTOS) * 100)}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}
