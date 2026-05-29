import { motion } from 'framer-motion'

const HEARTS = [
  { left: '6%', top: '20%', size: 16, opacity: 0.18, delay: 0.0, dur: 7.5 },
  { left: '18%', top: '74%', size: 12, opacity: 0.14, delay: 0.6, dur: 8.2 },
  { left: '32%', top: '12%', size: 18, opacity: 0.16, delay: 0.2, dur: 6.8 },
  { left: '47%', top: '60%', size: 14, opacity: 0.13, delay: 1.0, dur: 9.0 },
  { left: '62%', top: '24%', size: 20, opacity: 0.18, delay: 0.4, dur: 7.0 },
  { left: '76%', top: '70%', size: 16, opacity: 0.15, delay: 0.8, dur: 7.6 },
  { left: '88%', top: '32%', size: 12, opacity: 0.13, delay: 0.3, dur: 8.4 },
  { left: '94%', top: '82%', size: 14, opacity: 0.14, delay: 0.9, dur: 6.4 },
]

function HeartSvg({ size, opacity }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <path
        d="M12 21s-7.5-4.7-9.5-9.1C1 8.7 2.8 5 6.5 5c2 0 3.5 1.1 5.5 3 2-1.9 3.5-3 5.5-3 3.7 0 5.5 3.7 4 6.9C19.5 16.3 12 21 12 21z"
        fill="#D89AA3"
      />
    </svg>
  )
}

export default function FloatingHearts() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {HEARTS.map((h, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{ left: h.left, top: h.top }}
          animate={{ y: [0, -18, 0] }}
          transition={{
            duration: h.dur,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: h.delay,
          }}
        >
          <HeartSvg size={h.size} opacity={h.opacity} />
        </motion.div>
      ))}
    </div>
  )
}
