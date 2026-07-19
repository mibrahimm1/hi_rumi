import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MusicPlayer({ isPlaying, setIsPlaying }) {
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/music/song.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.35
    if (isPlaying) {
      audioRef.current.play().catch(() => {})
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) audioRef.current.play().catch(() => {})
    else audioRef.current.pause()
  }, [isPlaying])

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      onClick={() => setIsPlaying(!isPlaying)}
      className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-pastel-pink/30 flex items-center justify-center hover:border-pastel-pink/60 transition-all"
    >
      {isPlaying ? (
        <div className="flex gap-[2px] items-end h-3.5">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="w-[3px] bg-pastel-pink rounded-full"
              animate={{ height: ["4px", "14px", "4px"] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }}
            />
          ))}
        </div>
      ) : (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#f8b4c8">
          <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
        </svg>
      )}
    </motion.button>
  )
}
