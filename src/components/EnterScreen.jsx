import { motion } from 'framer-motion'

export default function EnterScreen({ onStart }) {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent pointer-events-none"
    >
      <div className="flex flex-col items-center justify-center text-center px-6 max-w-md md:max-w-xl mx-auto gap-4 md:gap-6 pointer-events-auto">
        {/* Animated envelope with floating heart */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-2"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" className="w-16 h-16 md:w-20 md:h-20 text-pastel-cream/80 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="3" y="5" width="18" height="14" rx="2" strokeLinecap="round" />
            </svg>
          </motion.div>
          <motion.div
            animate={{ 
              y: [-10, -25, -10],
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 left-1/2 -translate-x-1/2"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6" fill="#ff6b9d">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="heading text-6xl md:text-8xl text-pastel-pink glow-pink tracking-normal mb-8"
        >
          Hi Rumi
        </motion.h1>

        {/* Subtitle lines */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="space-y-8 mt-4"
        >
          <p className="elegant text-xl md:text-3xl text-pastel-cream/90 tracking-[0.12em] leading-relaxed px-4">
            I built you a small universe, meri rasmalai
          </p>
          <p className="elegant text-lg md:text-2xl text-pastel-lavender/80 tracking-[0.12em] px-4">
            — just you and me, floating in our own little cosmos
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95, y: 4, boxShadow: "0px 0px 0px 0px #9b2d6a, 0px 0px 10px rgba(0,0,0,0.5)" }}
          onClick={onStart}
          style={{
            boxShadow: "0px 6px 0px 0px #9b2d6a, 0px 10px 20px rgba(0,0,0,0.4)"
          }}
          className="mt-8 px-10 py-5 md:px-12 md:py-6 rounded-full bg-[#ff6b9d] heading text-base md:text-lg text-white tracking-normal flex items-center justify-center gap-3 transition-colors hover:bg-[#ff8cb3] whitespace-nowrap pointer-events-auto"
        >
          <span className="drop-shadow-sm">Open Your Gift</span>
          <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 drop-shadow-sm" fill="#ffffff">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.button>

        {/* Headphones note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex items-center gap-2 mt-4"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-pastel-lavender/40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
          </svg>
          <p className="text-xs text-pastel-lavender/35">
            headphones recommended
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
