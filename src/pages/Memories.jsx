import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/ui/PageWrapper'
import Section from '../components/ui/Section'
import Heading from '../components/ui/Heading'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Lightbox from '../components/ui/Lightbox'
import { getGalleryImages } from '../config/images'
import { useStaggerContainer, revealVariants } from '../hooks/useScrollReveal'

function GalleryItem({ src, index, onOpen }) {
  return (
    <motion.button
      type="button"
      variants={revealVariants}
      onClick={onOpen}
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-ivory/10 bg-ivory/[0.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-roseGoldLight"
      aria-label={`Open memory ${index + 1}`}
    >
      <img
        src={src}
        alt={`Memory ${index + 1}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-wine/70 via-wine/0 to-wine/0 opacity-90 transition-opacity duration-300 group-hover:opacity-70" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-[10px] uppercase tracking-[0.35em] text-ivory/80">
        <span>moment</span>
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-roseGoldLight/0 transition-all duration-300 group-hover:ring-2 group-hover:ring-roseGoldLight/40" />
    </motion.button>
  )
}

export default function Memories() {
  const images = useMemo(() => getGalleryImages(), [])
  const [openIndex, setOpenIndex] = useState(null)
  const stagger = useStaggerContainer()

  const close = () => setOpenIndex(null)
  const next = () =>
    setOpenIndex((idx) => (idx == null ? 0 : (idx + 1) % images.length))
  const prev = () =>
    setOpenIndex((idx) =>
      idx == null ? 0 : (idx - 1 + images.length) % images.length,
    )

  return (
    <PageWrapper>
      <Section className="py-16 sm:py-24" size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <Heading variant="eyebrow">Memories</Heading>
          <Heading variant="display" className="mt-3">
            Frames I keep close.
          </Heading>
          <p className="mt-4 text-ivory/65">
            A small collection. Select any photograph to view it larger.
          </p>
        </div>

        {images.length === 0 ? (
          <Card className="mx-auto mt-14 max-w-xl text-center">
            <p className="font-display text-xl italic text-ivory/85">
              No photographs yet.
            </p>
            <p className="mt-2 text-sm text-ivory/60">
              Drop images into{' '}
              <code className="rounded bg-ivory/10 px-2 py-0.5 text-roseGoldLight">
                src/assets/images/
              </code>{' '}
              (jpg, png, webp) — they will appear here automatically.
            </p>
          </Card>
        ) : (
          <motion.div
            {...stagger}
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6"
          >
            {images.map((src, idx) => (
              <GalleryItem
                key={src}
                src={src}
                index={idx}
                onOpen={() => setOpenIndex(idx)}
              />
            ))}
          </motion.div>
        )}

        <div className="mt-20 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Button to="/" variant="ghost">
            ← Home
          </Button>
          <Button to="/proposal" variant="primary">
            Continue
          </Button>
        </div>
      </Section>

      <Lightbox
        isOpen={openIndex != null}
        images={images}
        index={openIndex ?? 0}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </PageWrapper>
  )
}
