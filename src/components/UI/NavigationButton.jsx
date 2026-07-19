import { motion } from 'framer-motion'

const sceneLabels = ['Letter', 'Garden', 'Universe', 'Journey', 'Finale']

export default function NavigationButton({ currentScene, totalScenes, onNext, onPrev, transitioning }) {
  const isFirst = currentScene === 0
  const isLast = currentScene === totalScenes - 1

  return (
    <div className="fixed bottom-6 md:bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-4 md:gap-6 px-6">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isFirst ? 0 : 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onPrev}
        disabled={transitioning || isFirst}
        className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none transition-opacity"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-pastel-cream/50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </motion.button>

      {/* Scene indicator dots */}
      <div className="flex items-center gap-2.5">
        {Array.from({ length: totalScenes }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === currentScene ? 1 : 0.7,
              opacity: i === currentScene ? 1 : 0.35,
            }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {i === currentScene ? (
              /* Active: filled heart */
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4" fill="#f8b4c8">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              /* Inactive: outlined heart */
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="#f8b4c8" strokeWidth="1.5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      {/* Next button — heart with arrow */}
      {!isLast ? (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          disabled={transitioning}
          className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none group"
        >
          {/* Pulsing glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-pastel-pink/10 border border-pastel-pink/25"
            animate={{
              boxShadow: [
                '0 0 12px rgba(248,180,200,0.15)',
                '0 0 25px rgba(248,180,200,0.3)',
                '0 0 12px rgba(248,180,200,0.15)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Glass background */}
          <div className="absolute inset-0 rounded-full bg-black/30 backdrop-blur-md" />
          {/* Heart icon */}
          <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:scale-110 transition-transform" fill="#f8b4c8">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          {/* Small arrow indicator */}
          <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 absolute right-1.5 top-1/2 -translate-y-1/2 text-pastel-cream/40 z-10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.button>
      ) : (
        /* Last scene: just a heart (no nav) */
        <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#f8b4c8" fillOpacity="0.4">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  )
}
