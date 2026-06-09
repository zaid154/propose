import { useRef } from 'react'

// Hook for falling hearts effect
export function useFallingHearts() {
  const containerRef = useRef(null)

  // Create one falling heart
  function createHeart() {
    const heart = document.createElement('div')
    heart.innerHTML = '♥'
    heart.style.position = 'fixed'
    heart.style.color = '#D89AA3'
    heart.style.textShadow = '0 0 12px rgba(255, 177, 120, 0.55)'
    heart.style.fontSize = Math.random() * 22 + 14 + 'px'
    heart.style.left = Math.random() * 100 + 'vw'
    heart.style.top = '100vh'
    heart.style.pointerEvents = 'none'
    heart.style.zIndex = '9999'

    let mount = document.body
    if (containerRef.current) {
      mount = containerRef.current
    }
    mount.appendChild(heart)

    const animation = heart.animate(
      [
        { transform: 'translateY(0) rotate(0deg)', opacity: 0.85 },
        {
          transform: 'translateY(-' + (window.innerHeight + 100) + 'px) rotate(' + Math.random() * 360 + 'deg)',
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 3000 + 2000,
        easing: 'ease-out',
      }
    )

    animation.onfinish = function () {
      heart.remove()
    }
  }

  // Burst many hearts at once
  function burst(count, stepMs) {
    if (!count) count = 100
    if (!stepMs) stepMs = 30

    for (let i = 0; i < count; i++) {
      setTimeout(createHeart, i * stepMs)
    }
  }

  return { containerRef, burst }
}
