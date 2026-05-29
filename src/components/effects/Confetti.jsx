import { useMemo } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#B76E79', '#D89AA3', '#E9D8B4', '#FFB178', '#F7EFE3']

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

export default function Confetti({ count = 90, active = true }) {
  const pieces = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      left: `${randomBetween(0, 100)}%`,
      delay: randomBetween(0, 0.6),
      duration: randomBetween(2.4, 4.2),
      rotate: randomBetween(-180, 180),
      rotateEnd: randomBetween(-540, 540),
      drift: randomBetween(-80, 80),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: randomBetween(6, 12),
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    }))
  }, [count])

  if (!active) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          initial={{ y: -40, x: 0, rotate: p.rotate, opacity: 0 }}
          animate={{
            y: ['-5%', '110vh'],
            x: [0, p.drift],
            rotate: [p.rotate, p.rotateEnd],
            opacity: [0, 1, 1, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            boxShadow: `0 0 8px ${p.color}55`,
          }}
        />
      ))}
    </div>
  )
}
