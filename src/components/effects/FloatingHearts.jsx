const hearts = [
  { left: '6%', top: '20%', size: 16, opacity: 0.18, delay: 0, duration: 7.5 },
  { left: '18%', top: '74%', size: 12, opacity: 0.14, delay: 0.6, duration: 8.2 },
  { left: '32%', top: '12%', size: 18, opacity: 0.16, delay: 0.2, duration: 6.8 },
  { left: '47%', top: '60%', size: 14, opacity: 0.13, delay: 1.0, duration: 9.0 },
  { left: '62%', top: '24%', size: 20, opacity: 0.18, delay: 0.4, duration: 7.0 },
  { left: '76%', top: '70%', size: 16, opacity: 0.15, delay: 0.8, duration: 7.6 },
  { left: '88%', top: '32%', size: 12, opacity: 0.13, delay: 0.3, duration: 8.4 },
  { left: '94%', top: '82%', size: 14, opacity: 0.14, delay: 0.9, duration: 6.4 },
]

const FloatingHearts = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((heart, index) => (
        <span
          key={index}
          className="absolute float-heart text-pink-600"
          style={{
            left: heart.left,
            top: heart.top,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  )
}

export default FloatingHearts
