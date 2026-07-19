import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LetterScene from './Letter/LetterScene'
import PhotoCardStack from './Journey/PhotoCardStack'



const sceneVariants = {
  initial: { opacity: 0, y: 25, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: 'easeOut', staggerChildren: 0.06, delayChildren: 0.1 } },
  exit: { opacity: 0, y: -20, scale: 1.02, transition: { duration: 0.35 } },
}

const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function SceneContent({ currentScene, transitioning }) {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {currentScene === 0 && <LetterScene key="letter" />}
        {currentScene === 1 && <GardenContent key="garden" />}
        {currentScene === 2 && <JourneyContent key="journey" />}
        {currentScene === 3 && <SoundtrackContent key="soundtrack" />}
        {currentScene === 4 && <SupernovaContent key="supernova" />}
        {currentScene === 5 && <FinaleContent key="finale" />}
      </AnimatePresence>
    </div>
  )
}

/* ── Shared State for 3D Interaction ── */
import { swipeState, useBigBang, setBigBangPhase } from '../sharedState'

const reasons = [
  "Because you are my entire heart, and I couldn't imagine beating without you.",
  "Because you make me feel like the sweetest boy in your life, and letting me in was the greatest gift.",
  "Because calling me a \"real man\" makes me melt completely, and I want to be your everything—your best friend, your protector, your hero.",
  "Because even your sleepy typos are incredibly adorable, and I can hear your sweet voice perfectly in my head.",
  "Because you make me want to be strong and calm just for you, and I love it when you are playful and mess with me.",
  "Because when I think of you, I think of everything sweet and soft, and my kindness is just a reflection of how you make me feel.",
  "Because I love the very idea of us, and I catch myself imagining our future in almost every way possible.",
  "Because I pray every day that this works out, because in the end, it just has to be you, Rumaisa.",
  "Because you always say exactly what's in your beautiful heart, and it means the absolute world to me.",
  "Because you are the only one who can make me extra happy just by being yourself—if it wasn't you, baby, it wouldn't be anyone.",
  "Because you are my safe space, and thinking about you brings me a peace I have never known before.",
  "Because I want to be the one who listens to your breathing as you fall asleep, hoping your sweetest dreams are about me.",
  "Because you have the most beautiful soul, and every compliment from you feels like the greatest achievement.",
  "Because you see the real me, and you make me want to be the absolute best version of myself for you.",
  "Because holding onto you feels like holding onto my entire world.",
  "Because I love the way we connect on such a deep level—you aren't just my love, you are my soulmate.",
  "Because every time you distance yourself even slightly, it reminds me how desperately I need you close to me.",
  "Because you appreciate my sweetness, and you always make sure I know how much you value me in your life.",
  "Because the love you give me is so pure and real, it completely transformed my life.",
  "Because no matter what happens, you will always, always be my entire heart."
]

/* ── Scene 1: Meethi Meethi Baatein (Cosmic Memory Swipe) ── */
import { useMotionValue, useTransform } from 'framer-motion'

function GardenContent() {
  const [cards, setCards] = useState(reasons)

  const removeCard = (indexToRemove) => {
    setCards((prev) => prev.filter((_, i) => i !== indexToRemove))
    swipeState.rotationY = 0 // Reset rotation on snap
  }

  return (
    <motion.div variants={sceneVariants} initial="initial" animate="animate" exit="exit"
      className="pointer-events-none w-full h-full flex flex-col items-center justify-center relative"
    >
      {/* Title */}
      <motion.div variants={itemVariants} className="absolute top-10 flex flex-col items-center justify-center gap-1">
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-pastel-pink/80 mb-2" fill="currentColor">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 2c1.2 0 2.3.3 3.3.8l-1.5 1.5C13.1 6.1 12.6 6 12 6c-3.3 0-6 2.7-6 6 0 .6.1 1.1.3 1.8l-1.5 1.5C4.3 14.3 4 13.2 4 12c0-4.4 3.6-8 8-8zm3 6c0-.6-.1-1.1-.3-1.6L16 7c.6.9 1 2 1 3.2 0 3.3-2.7 6-6 6-.6 0-1.2-.1-1.7-.3l1.3-1.3c.1 0 .3.1.4.1 2.2 0 4-1.8 4-4zm-3 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </svg>
        <h2 className="heading text-3xl md:text-4xl text-pastel-pink glow-pink">Reasons Why I Love You</h2>
        <p className="text-xs text-pastel-cream/50 tracking-widest italic mt-2">swipe to discover</p>
      </motion.div>

      {/* Card Stack */}
      <div className="relative w-[320px] h-[460px] md:w-[400px] md:h-[540px] pointer-events-auto mt-20">
        <AnimatePresence>
          {cards.map((reason, index) => {
            // Only render top 3 cards for performance
            const isTop = index === cards.length - 1
            if (index < cards.length - 3) return null

            return (
              <SwipeableCard
                key={reason}
                reason={reason}
                index={index}
                total={cards.length}
                onRemove={() => removeCard(index)}
                isTop={isTop}
              />
            )
          })}
        </AnimatePresence>

        {cards.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p className="heading text-2xl text-pastel-pink/80 glow-pink text-center px-4">
              And so many more reasons...
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

function SwipeableCard({ reason, index, total, onRemove, isTop }) {
  const x = useMotionValue(0)

  // Calculate visual stack effect based on distance from top
  const offset = total - 1 - index
  const scale = 1 - offset * 0.05
  const y = offset * 15
  const opacity = 1 - offset * 0.2

  const rotate = useTransform(x, [-200, 200], [-10, 10])

  const handleDrag = (e, info) => {
    if (isTop) {
      // Map drag offset to subtle 3D rotation (-0.5 to 0.5 rad)
      swipeState.rotationY = (info.offset.x / window.innerWidth) * Math.PI
    }
  }

  const handleDragEnd = (e, info) => {
    swipeState.rotationY = 0 // snap back 3D rotation
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 500) {
      // Add a permanent pan to the universe based on swipe direction
      swipeState.targetPanY += (info.offset.x > 0 ? 1 : -1) * (Math.PI / 3) // 60 degrees pan
      onRemove()
    }
  }

  return (
    <motion.div
      style={{ x, y, scale, rotate, zIndex: index }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity, scale, y }}
      exit={{ x: x.get() > 0 ? 300 : -300, opacity: 0, transition: { duration: 0.2 } }}
      whileTap={isTop ? { cursor: "grabbing" } : {}}
      className={`absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 md:p-14 flex items-center justify-center text-center ${isTop ? 'cursor-grab' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pastel-pink/10 to-transparent rounded-3xl" />
      <p className="heading text-2xl md:text-3xl text-pastel-cream drop-shadow-md leading-relaxed">
        {reason}
      </p>
    </motion.div>
  )
}

/* ── Scene 2: The Journey / Memory Orbit ── */
function JourneyContent() {
  return (
    <motion.div variants={sceneVariants} initial="initial" animate="animate" exit="exit"
      className="w-full flex flex-col items-center gap-5 pointer-events-none"
    >
      {/* Title */}
      <motion.div variants={itemVariants} className="flex items-center justify-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-pastel-lavender/60" fill="currentColor">
          <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
        </svg>
        <h2 className="heading text-2xl md:text-3xl text-pastel-lavender glow-pink">Our Sweetest Memories</h2>
      </motion.div>

      {/* Card stack */}
      <motion.div variants={itemVariants} className="pointer-events-auto">
        <PhotoCardStack />
      </motion.div>

      {/* Swipe hint */}
      <motion.p
        variants={itemVariants}
        className="text-xs text-pastel-cream/25 italic tracking-wider"
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        swipe or tap → to flip through
      </motion.p>
    </motion.div>
  )
}

/* ── Scene 3: Our Soundtrack ── */
function SoundtrackContent() {
  return (
    <motion.div variants={sceneVariants} initial="initial" animate="animate" exit="exit"
      className="pointer-events-auto w-full max-w-sm mx-auto"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-6">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-pastel-mint/60" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
        <h2 className="heading text-2xl md:text-3xl text-pastel-mint glow-gold">Songs that remind me of you</h2>
      </motion.div>

      <motion.div variants={itemVariants}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/64b4SQXZbPgC9yOugR2UvE?utm_source=generator&si=34760091feeb4dd9"
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </motion.div>
    </motion.div>
  )
}

/* ── Scene 4: The Supernova ── */
function SupernovaContent() {
  const phase = useBigBang()

  const handleTap = () => {
    if (phase < 3) {
      setBigBangPhase(phase + 1)
    }
  }

  return (
    <motion.div variants={sceneVariants} initial="initial" animate="animate" exit="exit"
      className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center"
      onClick={handleTap}
    >
      <AnimatePresence mode="wait">
        {phase < 3 && (
          <motion.div
            key="instruction"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="absolute z-20 pointer-events-none flex flex-col items-center justify-center gap-6"
          >
            {/* The pulsing ring indicator */}
            <motion.div
              animate={{
                scale: phase === 0 ? [1, 1.2, 1] : phase === 1 ? [1, 1.5, 1] : [1, 2, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: phase === 0 ? 2 : phase === 1 ? 1 : 0.5,
                repeat: Infinity
              }}
              className="w-16 h-16 rounded-full border border-white/40"
            />

            <p className="font-rockybilly text-5xl md:text-6xl text-pastel-pink drop-shadow-md text-center">
              {phase === 0 && "Tap the heart"}
              {phase === 1 && "Tap again"}
              {phase === 2 && "One more time..."}
            </p>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div
            key="date"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, delay: 1, ease: "easeOut" }}
            className="z-20 w-[90vw] max-w-lg mx-auto"
          >
            <div className="relative w-full">
              <div className="flex flex-col items-center justify-center gap-8 py-20 md:py-28 border-y border-pastel-gold/20 bg-[#1a0a2e]/30 backdrop-blur-sm rounded-[2.5rem] px-8 md:px-12 w-full shadow-[0_0_50px_rgba(245,230,163,0.1)]">
                <p className="elegant text-sm md:text-base text-pastel-gold text-center font-medium drop-shadow-md tracking-wider px-4" style={{ lineHeight: '3.5' }}>
                  March 21, 2026
                </p>
                <div className="w-20 h-[1px] bg-pastel-gold/30" />
                <p className="elegant text-sm md:text-base text-pastel-gold text-center font-medium drop-shadow-md tracking-wider px-4" style={{ lineHeight: '3.5' }}>
                  The day my universe found its center.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shockwave flash on explosion */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, times: [0, 0.1, 1] }}
            className="absolute inset-0 bg-white pointer-events-none z-10 mix-blend-screen"
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Scene 5: Finale ── */
function FinaleContent() {
  return (
    <>
      <motion.div variants={sceneVariants} initial="initial" animate="animate" exit="exit"
        className="pointer-events-auto w-[92vw] max-w-lg text-center mx-auto"
      >
        {/* Birthday headings */}
        <motion.div variants={itemVariants}>
          <h2 className="heading text-3xl md:text-5xl text-pastel-gold glow-gold">Happy Birthday</h2>
          <h3 className="handwritten text-2xl md:text-3xl text-pastel-pink mt-1.5">Meri Jaan</h3>
        </motion.div>

        {/* Message card */}
        <motion.div
          variants={itemVariants}
          className="bg-[#1a0a2e]/50 backdrop-blur-md border border-pastel-gold/10 rounded-[2rem] mt-4 shadow-lg hover:border-pastel-gold/30 transition-colors"
        >
          <div className="px-10 md:px-20 py-16 md:py-24">
            <div className="space-y-12">
              <p
                className="elegant text-[13px] md:text-[15px] text-pastel-cream/90 tracking-wide leading-[3.4]"
              >
                Someone who has such a beautiful heart and soul deserves the whole
                world. I want to spend my life trying to give you that.
              </p>

              <p
                className="elegant text-[13px] md:text-[15px] text-pastel-cream/90 tracking-wide leading-[3.4]"
              >
                I want to love you in ways you haven&apos;t imagined. I wish to bring
                the entire world at your feet and make your belief in me into a
                reality.
              </p>

              <p
                className="elegant text-[13px] md:text-[15px] text-pastel-cream/90 tracking-wide leading-[3.4]"
              >
                I just wish our story never ends and you remain meri and sirf aur sirf
                meri. I wish every year of your life is more beautiful than the last.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sign-off */}
        <motion.div variants={itemVariants} className="mt-5 space-y-1">
          <p className="heading text-lg md:text-xl text-pastel-gold/80">
            Happy Birthday, my rasmalai
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="handwritten text-base md:text-lg text-pastel-lavender/60">— Forever yours, nerdo</span>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 animate-pulse" fill="#f8b4c8">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}
