import { useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Lightbox({
  isOpen,
  images = [],
  index = 0,
  onClose,
  onPrev,
  onNext,
}) {
  const hasMultiple = images.length > 1

  const handleKey = useCallback(
    (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose?.()
      if (hasMultiple && e.key === 'ArrowRight') onNext?.()
      if (hasMultiple && e.key === 'ArrowLeft') onPrev?.()
    },
    [isOpen, hasMultiple, onClose, onPrev, onNext],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  const src = images[index]

  return (
    <AnimatePresence>
      {isOpen && src ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-5 top-5 rounded-full border border-ivory/20 px-3 py-1 text-sm text-ivory/80 transition hover:border-roseGoldLight hover:text-ivory"
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
            aria-label="Close"
          >
            Close
          </button>

          {hasMultiple ? (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={(e) => {
                  e.stopPropagation()
                  onPrev?.()
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-ivory/20 bg-black/30 px-3 py-2 text-ivory/90 transition hover:border-roseGoldLight hover:text-ivory sm:left-6"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={(e) => {
                  e.stopPropagation()
                  onNext?.()
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-ivory/20 bg-black/30 px-3 py-2 text-ivory/90 transition hover:border-roseGoldLight hover:text-ivory sm:right-6"
              >
                ›
              </button>
            </>
          ) : null}

          <motion.img
            key={src}
            src={src}
            alt={`Memory ${index + 1}`}
            className="max-h-[88vh] w-auto max-w-[94vw] rounded-2xl shadow-glow"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          />

          {hasMultiple ? (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-ivory/15 bg-black/40 px-3 py-1 text-xs tracking-wider text-ivory/80">
              {index + 1} / {images.length}
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
