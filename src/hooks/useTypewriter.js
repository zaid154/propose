import { useEffect, useState } from 'react'

// Typewriter effect for letter text
export function useTypewriter(options) {
  const textLines = options.lines || []
  const charDelay = options.charDelay || 38
  const lineDelay = options.lineDelay || 600
  const enabled = options.enabled !== false

  const [lines, setLines] = useState([])
  const [done, setDone] = useState(false)

  useEffect(function () {
    if (!enabled) return
    if (!textLines || textLines.length === 0) return

    let cancelled = false
    let lineIndex = 0
    let charIndex = 0
    let currentLine = ''
    let timer = null

    function tick() {
      if (cancelled) return

      if (lineIndex >= textLines.length) {
        setDone(true)
        return
      }

      const target = textLines[lineIndex]

      if (charIndex < target.length) {
        currentLine = currentLine + target[charIndex]
        charIndex = charIndex + 1

        setLines(function (prev) {
          const next = prev.slice(0, lineIndex)
          next.push(currentLine)
          return next
        })

        timer = setTimeout(tick, charDelay)
      } else {
        lineIndex = lineIndex + 1
        charIndex = 0
        currentLine = ''
        timer = setTimeout(tick, lineDelay)
      }
    }

    setLines([])
    setDone(false)
    timer = setTimeout(tick, 350)

    return function () {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [textLines, charDelay, lineDelay, enabled])

  return { lines, done }
}
