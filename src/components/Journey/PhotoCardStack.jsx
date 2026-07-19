import { useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { swipeState } from '../../sharedState'

const CAPTIONS = [
  "Meri Jaan",
  "Our first goofy selfie",
  "My Gugi",
  "Just look at your cute face",
  "Only my kissie",
  "My favourite goofy selfie",
  "Can't keep my eyes off can I",
  "Idhar bhi",
  "My cute lil panda with her panda",
  "The cutest",
  "Only my kissie (2)",
  "THe most cutest one of you ♡",
  "The most perfect hand to grab",
  "Our kewl photo",
  "My rasmalai",
  "Main tumhara ♡",
  "Another goofy one",
  "The signature hand pose",
  "ahahah cutest",
  "Best girlfriend ever ♡",
  "My baby",
  "My forever date ♡",
  "Khaa jaaon",
  "Always & forever ♡",
]

const PHOTOS = CAPTIONS.map((caption, i) => ({
  id: i,
  src: `/photos/${i + 1}.jpg`,
  caption,
}))

function CardFace({ photo }) {
  return (
    <div className="w-full h-full bg-[#fdfaf5] rounded-[10px] overflow-hidden flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.2)] p-3">
      <div className="flex-1 overflow-hidden bg-black/5">
        <img
          src={photo.src}
          alt=""
          className="w-full h-full object-cover select-none"
          draggable={false}
          loading="lazy"
        />
      </div>
      <div className="shrink-0 min-h-[80px] py-4 bg-[#fdfaf5] flex items-center justify-center">
        <p
          className="text-[#d48fa8] text-center leading-tight text-[18px]"
          style={{ fontFamily: 'Armelie, cursive', lineHeight: '1.2' }}
        >
          {photo.caption}
        </p>
      </div>
    </div>
  )
}

function FloatingPolaroid({ photo, direction, onSwiped }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])

  const handleDrag = (_, info) => {
    swipeState.rotationY = (info.offset.x / window.innerWidth) * Math.PI
  }

  const handleDragEnd = (_, info) => {
    swipeState.rotationY = 0
    if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 400) {
      const dir = info.offset.x > 0 ? -1 : 1 // -1 means swipe right (prev photo), 1 means swipe left (next photo)
      swipeState.targetPanY += (dir > 0 ? 1 : -1) * (Math.PI / 3) // Pan universe
      onSwiped(dir)
    }
  }

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateZ: dir > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateZ: 0,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateZ: dir < 0 ? 15 : -15,
      transition: { duration: 0.3 }
    })
  }

  // Floating animation
  const floatAnimation = {
    y: [-5, 5, -5],
    rotateZ: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate, zIndex: 10, touchAction: 'none' }}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <motion.div className="w-full h-full" animate={floatAnimation}>
        <CardFace photo={photo} />
      </motion.div>
    </motion.div>
  )
}

export default function PhotoCardStack() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for next, -1 for prev
  const total = PHOTOS.length

  const handleSwiped = (dir) => {
    setDirection(dir)
    setCurrent((prev) => {
      let next = prev + dir
      if (next < 0) next = total - 1
      if (next >= total) next = 0
      return next
    })
  }

  const handleNext = () => {
    swipeState.targetPanY += Math.PI / 3
    handleSwiped(1)
  }

  const handlePrev = () => {
    swipeState.targetPanY -= Math.PI / 3
    handleSwiped(-1)
  }

  return (
    <div className="flex flex-col items-center gap-4 pointer-events-auto select-none">

      {/* ── Card stack viewport ── */}
      <div className="relative" style={{ width: 300, height: 380 }}>
        <AnimatePresence mode="popLayout" custom={direction}>
          <FloatingPolaroid
            key={current}
            photo={PHOTOS[current]}
            direction={direction}
            onSwiped={handleSwiped}
          />
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full border border-white/20 text-white/50 flex items-center justify-center hover:bg-white/5 hover:text-white/80 transition-all hover:scale-110 active:scale-95"
        >
          ←
        </button>
        <span className="text-white/40 font-serif tracking-widest text-sm w-16 text-center italic">
          {current + 1} / {total}
        </span>
        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full border border-[#f8b4c8]/30 text-[#f8b4c8]/70 flex items-center justify-center hover:bg-[#f8b4c8]/20 hover:text-[#f8b4c8] transition-all hover:scale-110 active:scale-95"
        >
          →
        </button>
      </div>

    </div>
  )
}
