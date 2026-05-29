import { useCallback, useRef } from 'react'

export function useFallingHearts() {
  const containerRef = useRef(null)

  const createHeart = useCallback(() => {
    const heart = document.createElement('div')
    heart.innerHTML = '♥'
    heart.style.position = 'fixed'
    heart.style.color = '#D89AA3'
    heart.style.textShadow = '0 0 12px rgba(255, 177, 120, 0.55)'
    heart.style.fontSize = `${Math.random() * 22 + 14}px`
    heart.style.left = `${Math.random() * 100}vw`
    heart.style.top = '100vh'
    heart.style.pointerEvents = 'none'
    heart.style.zIndex = '9999'

    const mount = containerRef.current ?? document.body
    mount.appendChild(heart)

    const animation = heart.animate(
      [
        { transform: 'translateY(0) rotate(0deg)', opacity: 0.85 },
        {
          transform: `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 3000 + 2000,
        easing: 'cubic-bezier(0.1, 0.8, 0.9, 0.1)',
      },
    )

    animation.onfinish = () => heart.remove()
  }, [])

  const burst = useCallback(
    (count = 100, stepMs = 30) => {
      for (let i = 0; i < count; i++) {
        setTimeout(createHeart, i * stepMs)
      }
    },
    [createHeart],
  )

  return { containerRef, burst }
}
