import { useEffect, useRef, useState } from 'react'

export function useTypewriter({
  lines = [],
  charDelay = 38,
  lineDelay = 600,
  enabled = true,
  onComplete,
} = {}) {
  const [typedLines, setTypedLines] = useState([])
  const [isComplete, setIsComplete] = useState(false)
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete

  useEffect(() => {
    if (!enabled) return
    if (!lines || lines.length === 0) return

    let cancelled = false
    let lineIndex = 0
    let charIndex = 0
    let currentLine = ''
    let timer

    const tick = () => {
      if (cancelled) return

      if (lineIndex >= lines.length) {
        setIsComplete(true)
        completeRef.current?.()
        return
      }

      const target = lines[lineIndex]

      if (charIndex < target.length) {
        currentLine += target[charIndex]
        charIndex += 1
        setTypedLines((prev) => {
          const next = prev.slice(0, lineIndex)
          next.push(currentLine)
          return next
        })
        timer = setTimeout(tick, charDelay)
      } else {
        lineIndex += 1
        charIndex = 0
        currentLine = ''
        timer = setTimeout(tick, lineDelay)
      }
    }

    setTypedLines([])
    setIsComplete(false)
    timer = setTimeout(tick, 350)

    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [lines, charDelay, lineDelay, enabled])

  return { typedLines, isComplete }
}
