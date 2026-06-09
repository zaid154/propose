import { useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/ui/PageWrapper'
import Section from '../components/ui/Section'
import Heading from '../components/ui/Heading'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Lightbox from '../components/ui/Lightbox'
import { getGalleryImages } from '../config/images'
import { getStaggerAnimation, itemVariant } from '../hooks/useScrollReveal'

const GalleryItem = (props) => {
  return (
    <motion.button
      type="button"
      variants={itemVariant}
      onClick={props.onOpen}
      className="overflow-hidden rounded-lg border border-pink-100 hover:shadow-md transition"
      aria-label={`Open memory ${props.index + 1}`}
    >
      <img
        src={props.src}
        alt={`Memory ${props.index + 1}`}
        loading="lazy"
        className="aspect-square w-full object-cover"
      />
    </motion.button>
  )
}

const Memories = () => {
  const images = getGalleryImages()
  const [selectedImage, setSelectedImage] = useState(null)
  const stagger = getStaggerAnimation()

  function openImage(index) {
    setSelectedImage(index)
  }

  function closeImage() {
    setSelectedImage(null)
  }

  function nextImage() {
    if (selectedImage === null) {
      setSelectedImage(0)
      return
    }
    const next = (selectedImage + 1) % images.length
    setSelectedImage(next)
  }

  function prevImage() {
    if (selectedImage === null) {
      setSelectedImage(0)
      return
    }
    const prev = (selectedImage - 1 + images.length) % images.length
    setSelectedImage(prev)
  }

  return (
    <PageWrapper>
      <Section className="pt-6 pb-12" size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <Heading variant="eyebrow">Memories</Heading>
          <Heading variant="display" className="mt-3">
            Frames I keep close.
          </Heading>
          <p className="mt-4 text-gray-600">
            A small collection. Select any photograph to view it larger.
          </p>
        </div>

        {images.length === 0 ? (
          <Card className="mx-auto mt-14 max-w-xl text-center">
            <p className="font-display text-xl italic text-gray-800">No photographs yet.</p>
            <p className="mt-2 text-sm text-gray-600">
              Drop images into{' '}
              <code className="rounded bg-pink-50 px-2 py-1 text-pink-600">
                src/assets/images/
              </code>{' '}
              (jpg, png, webp) — they will appear here automatically.
            </p>
          </Card>
        ) : (
          <motion.div
            initial={stagger.initial}
            whileInView={stagger.whileInView}
            viewport={stagger.viewport}
            variants={stagger.variants}
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            {images.map((src, index) => (
              <GalleryItem
                key={src}
                src={src}
                index={index}
                onOpen={() => openImage(index)}
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
        isOpen={selectedImage !== null}
        images={images}
        index={selectedImage !== null ? selectedImage : 0}
        onClose={closeImage}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </PageWrapper>
  )
}

export default Memories
