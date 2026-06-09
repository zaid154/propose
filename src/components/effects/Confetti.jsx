import { useState, useEffect } from 'react'

const colors = ['#db2777', '#ec4899', '#f472b6', '#fbcfe8', '#fce7f3']

function getRandom(min, max) {
  return Math.random() * (max - min) + min
}

const Confetti = (props) => {
  const count = props.count || 90
  const active = props.active !== false
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    const list = []
    for (let i = 0; i < count; i++) {
      list.push({
        left: getRandom(0, 100),
        delay: getRandom(0, 0.6),
        duration: getRandom(2.4, 4.2),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: getRandom(6, 12),
      })
    }
    setPieces(list)
  }, [count])

  if (!active) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((piece, index) => (
        <span
          key={index}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            background: piece.color,
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default Confetti
