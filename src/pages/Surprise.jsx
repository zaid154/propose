import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageWrapper from '../components/ui/PageWrapper'
import Section from '../components/ui/Section'
import Heading from '../components/ui/Heading'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Divider from '../components/ui/Divider'
import Confetti from '../components/effects/Confetti'
import FloatingHearts from '../components/effects/FloatingHearts'
import { useFallingHearts } from '../hooks/useFallingHearts'
import { useTypewriter } from '../hooks/useTypewriter'
import { getGalleryImages } from '../config/images'
import { site } from '../config/site'

const LetterPart = (props) => {
  const result = useTypewriter({
    lines: site.letterLines,
    charDelay: 32,
    lineDelay: 500,
  })

  const typedLines = result.lines
  const done = result.done

  return (
    <motion.div
      key="letter"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5 }}
    >
      <Section className="pt-6 pb-12" size="default">
        <div className="mx-auto max-w-2xl text-center">
          <Heading variant="eyebrow">A letter</Heading>
          <p className="mt-3 font-script text-5xl text-pink-600">For {site.herName},</p>
        </div>

        <Card className="mx-auto mt-10 max-w-2xl" padding="lg">
          <div className="space-y-5 text-center">
            {typedLines.map((line, index) => {
              const isLastLine = index === typedLines.length - 1
              const showCursor = isLastLine && !done

              return (
                <p key={index} className="font-display text-xl italic text-gray-800 sm:text-2xl">
                  {line}
                  {showCursor ? <span className="ml-1 text-pink-600">|</span> : null}
                </p>
              )
            })}

            {done ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Divider className="mx-auto my-6 max-w-xs" />
                <p className="font-script text-3xl text-pink-600">{site.myName}</p>
                <div className="mt-8">
                  <Button onClick={props.onContinue} variant="primary">
                    Continue
                  </Button>
                </div>
              </motion.div>
            ) : null}
          </div>
        </Card>
      </Section>
    </motion.div>
  )
}

const CinemaPart = (props) => {
  const images = getGalleryImages()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (images.length === 0) return

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, 4200)

    return () => clearInterval(timer)
  }, [images.length])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.45

    if (playing) {
      audio.play().catch((err) => console.log(err))
    } else {
      audio.pause()
    }
  }, [playing])

  if (images.length === 0) {
    return (
      <motion.div
        key="cinema-empty"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Section className="pt-6 pb-12 text-center">
          <Heading variant="section">Add some photos to begin the reel.</Heading>
          <p className="mt-3 text-gray-600">
            Drop images into{' '}
            <code className="text-pink-600">src/assets/images/</code> and refresh.
          </p>
          <div className="mt-8">
            <Button onClick={props.onContinue} variant="primary">
              Continue
            </Button>
          </div>
        </Section>
      </motion.div>
    )
  }

  return (
    <motion.div
      key="cinema"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="relative h-screen w-full overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute right-5 top-5">
          <button
            type="button"
            onClick={() => setPlaying(!playing)}
            className="rounded-full border border-white bg-black/50 px-4 py-2 text-xs text-white hover:bg-black/70"
          >
            {playing ? 'Pause Music' : 'Play Music'}
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-5 pb-12 text-center">
          <p className="font-script text-5xl text-white">Us, in moments.</p>

          <div className="flex items-center gap-2">
            {images.map((_, i) => {
              let dotClass = 'h-1 w-4 bg-white/50'
              if (i === index) {
                dotClass = 'h-1 w-8 bg-pink-400'
              }
              return <span key={i} className={dotClass} />
            })}
          </div>

          <Button onClick={props.onContinue} variant="primary">
            Continue
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

const GiftBox = (props) => {
  return (
    <button
      type="button"
      onClick={props.onOpen}
      aria-label="Open the gift"
      className="relative h-56 w-56"
    >
      <div className="absolute inset-x-3 bottom-0 h-44 rounded-md bg-pink-600 shadow-md">
        <div className="absolute inset-y-0 left-1/2 w-3 bg-pink-400" />
        <div className="absolute inset-x-0 top-1/2 h-3 bg-pink-400" />
      </div>

      <motion.div
        initial={false}
        animate={
          props.opened
            ? { rotateX: -120, y: -60, opacity: 0.95 }
            : { rotateX: 0, y: 0, opacity: 1 }
        }
        transition={{ duration: 0.9 }}
        className="absolute inset-x-0 top-0 h-16"
      >
        <div className="relative mx-2 h-full rounded-md bg-pink-400 shadow-md">
          <div className="absolute inset-x-0 top-1/2 h-3 bg-pink-300" />
        </div>
      </motion.div>

      {!props.opened ? (
        <span className="absolute -bottom-7 left-1/2 text-xs uppercase tracking-widest text-gray-400">
          tap to open
        </span>
      ) : null}
    </button>
  )
}

const RingSvg = () => {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="78" r="32" stroke="#db2777" strokeWidth="6" fill="none" />
      <polygon points="60,18 48,38 60,52 72,38" fill="#fce7f3" stroke="#db2777" strokeWidth="1" />
    </svg>
  )
}

const GiftPart = () => {
  const [opened, setOpened] = useState(false)
  const { containerRef, burst } = useFallingHearts()

  function handleOpen() {
    if (opened) return
    setOpened(true)
    burst(140, 22)
  }

  let title = 'A small gift, just for you.'
  if (opened) {
    title = 'For you.'
  }

  return (
    <motion.div
      key="box"
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Confetti active={opened} count={110} />

      <Section className="pt-6 pb-12" size="default">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Heading variant="eyebrow">One more thing</Heading>
          <Heading variant="display" className="mt-3">
            {title}
          </Heading>

          <div className="mt-14 flex h-72 items-end justify-center">
            {opened ? (
              <motion.div
                key="ring"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="flex flex-col items-center"
              >
                <RingSvg />
              </motion.div>
            ) : (
              <GiftBox opened={opened} onOpen={handleOpen} />
            )}
          </div>

          {opened ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-14 max-w-xl"
            >
              <Heading variant="display" as="p">
                {site.surprise.finalMessage}
              </Heading>
              <p className="mt-6 font-script text-3xl text-pink-600">{site.surprise.signature}</p>
              <p className="mt-1 font-script text-5xl text-gray-800">{site.myName}</p>
              <Divider className="mx-auto my-10 max-w-xs" />
              <div className="flex items-center justify-center gap-3">
                <Button to="/" variant="ghost">
                  Return home
                </Button>
                <Button to="/memories" variant="primary">
                  Relive our memories
                </Button>
              </div>
            </motion.div>
          ) : null}
        </div>
      </Section>
    </motion.div>
  )
}

const Surprise = () => {
  const [currentStep, setCurrentStep] = useState('letter')

  return (
    <PageWrapper>
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {currentStep === 'letter' ? (
          <LetterPart key="letter" onContinue={() => setCurrentStep('cinema')} />
        ) : null}

        {currentStep === 'cinema' ? (
          <CinemaPart key="cinema" onContinue={() => setCurrentStep('box')} />
        ) : null}

        {currentStep === 'box' ? <GiftPart key="box" /> : null}
      </AnimatePresence>
    </PageWrapper>
  )
}

export default Surprise
