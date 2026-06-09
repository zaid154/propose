import { useEffect } from 'react'

const Lightbox = (props) => {
  const isOpen = props.isOpen
  const images = props.images || []
  const index = props.index || 0
  const onClose = props.onClose
  const onPrev = props.onPrev
  const onNext = props.onNext

  const hasMultiple = images.length > 1
  const src = images[index]

  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return
      if (e.key === 'Escape' && onClose) onClose()
      if (hasMultiple && e.key === 'ArrowRight' && onNext) onNext()
      if (hasMultiple && e.key === 'ArrowLeft' && onPrev) onPrev()
    }

    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [isOpen, hasMultiple, onClose, onPrev, onNext])

  if (!isOpen || !src) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute right-5 top-5 rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-800 hover:bg-pink-50"
        onClick={(e) => {
          e.stopPropagation()
          if (onClose) onClose()
        }}
        aria-label="Close"
      >
        Close
      </button>

      {hasMultiple ? (
        <button
          type="button"
          aria-label="Previous"
          onClick={(e) => {
            e.stopPropagation()
            if (onPrev) onPrev()
          }}
          className="absolute left-3 top-1/2 rounded-full border border-gray-300 bg-white px-3 py-2 text-gray-800 hover:bg-pink-50 sm:left-6"
        >
          ‹
        </button>
      ) : null}

      {hasMultiple ? (
        <button
          type="button"
          aria-label="Next"
          onClick={(e) => {
            e.stopPropagation()
            if (onNext) onNext()
          }}
          className="absolute right-3 top-1/2 rounded-full border border-gray-300 bg-white px-3 py-2 text-gray-800 hover:bg-pink-50 sm:right-6"
        >
          ›
        </button>
      ) : null}

      <img
        src={src}
        alt={`Memory ${index + 1}`}
        className="max-h-screen max-w-full rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />

      {hasMultiple ? (
        <div className="absolute bottom-5 left-1/2 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-600">
          {index + 1} / {images.length}
        </div>
      ) : null}
    </div>
  )
}

export default Lightbox
