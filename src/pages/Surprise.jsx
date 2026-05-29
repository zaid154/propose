// import { useEffect, useMemo, useRef, useState } from 'react'
// import { AnimatePresence, motion } from 'framer-motion'
// import PageWrapper from '../components/ui/PageWrapper'
// import Section from '../components/ui/Section'
// import Heading from '../components/ui/Heading'
// import Button from '../components/ui/Button'
// import Card from '../components/ui/Card'
// import Divider from '../components/ui/Divider'
// import Confetti from '../components/effects/Confetti'
// import FloatingHearts from '../components/effects/FloatingHearts'
// import { useFallingHearts } from '../hooks/useFallingHearts'
// import { useTypewriter } from '../hooks/useTypewriter'
// import { getGalleryImages } from '../config/images'
// import { site } from '../config/site'

// function LetterAct({ onContinue }) {
//   const { typedLines, isComplete } = useTypewriter({
//     lines: site.letterLines,
//     charDelay: 32,
//     lineDelay: 500,
//   })

//   return (
//     <motion.div
//       key="letter"
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -12 }}
//       transition={{ duration: 0.6 }}
//     >
//       <Section className="py-20 sm:py-28" size="default">
//         <div className="mx-auto max-w-2xl text-center">
//           <Heading variant="eyebrow">A letter</Heading>
//           <p className="mt-3 font-script text-5xl text-roseGoldLight">
//             For {site.herName},
//           </p>
//         </div>

//         <Card className="mx-auto mt-10 max-w-2xl" padding="lg">
//           <div className="space-y-5 text-center">
//             {typedLines.map((line, idx) => (
//               <p
//                 key={idx}
//                 className="font-display text-xl italic leading-relaxed text-ivory/90 sm:text-2xl"
//               >
//                 {line}
//                 {idx === typedLines.length - 1 && !isComplete ? (
//                   <span className="ml-1 inline-block w-px animate-pulse bg-roseGoldLight align-middle">
//                     &nbsp;
//                   </span>
//                 ) : null}
//               </p>
//             ))}

//             <AnimatePresence>
//               {isComplete ? (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <Divider className="mx-auto my-6 max-w-[40%]" />
//                   <p className="font-script text-3xl text-roseGoldLight">
//                     {site.myName}
//                   </p>
//                   <div className="mt-8">
//                     <Button onClick={onContinue} variant="primary">
//                       Continue
//                     </Button>
//                   </div>
//                 </motion.div>
//               ) : null}
//             </AnimatePresence>
//           </div>
//         </Card>
//       </Section>
//     </motion.div>
//   )
// }

// function CinemaAct({ onContinue }) {
//   const images = useMemo(() => getGalleryImages(), [])
//   const [index, setIndex] = useState(0)
//   const [muted, setMuted] = useState(true)
//   const audioRef = useRef(null)
//   const musicUrl = site.surprise.musicUrl

//   useEffect(() => {
//     if (images.length === 0) return
//     const t = setInterval(() => {
//       setIndex((i) => (i + 1) % images.length)
//     }, 4200)
//     return () => clearInterval(t)
//   }, [images.length])

//   useEffect(() => {
//     const a = audioRef.current
//     if (!a) return
//     a.volume = 0.45
//     if (!muted) {
//       a.play().catch(() => { })
//     } else {
//       a.pause()
//     }
//   }, [muted])

//   if (images.length === 0) {
//     return (
//       <motion.div
//         key="cinema-empty"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <Section className="py-20 text-center">
//           <Heading variant="section">Add some photos to begin the reel.</Heading>
//           <p className="mt-3 text-ivory/65">
//             Drop images into <code className="text-roseGoldLight">src/assets/images/</code> and refresh.
//           </p>
//           <div className="mt-8">
//             <Button onClick={onContinue} variant="primary">
//               Continue
//             </Button>
//           </div>
//         </Section>
//       </motion.div>
//     )
//   }

//   return (
//     <motion.div
//       key="cinema"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//       className="relative"
//     >
//       <div className="relative h-[100vh] w-full overflow-hidden">
//         <AnimatePresence mode="sync">
//           <motion.img
//             key={images[index]}
//             src={images[index]}
//             alt=""
//             initial={{ opacity: 0, scale: 1.04 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 1.02 }}
//             transition={{ duration: 1.4, ease: 'easeOut' }}
//             className="absolute inset-0 h-full w-full object-cover"
//           />
//         </AnimatePresence>
//         <div className="absolute inset-0 bg-gradient-to-t from-wine via-wine/30 to-wine/60" />

//         <div className="absolute right-5 top-5 flex items-center gap-3">
//           {musicUrl ? (
//             <button
//               type="button"
//               onClick={() => setMuted((m) => !m)}
//               className="rounded-full border border-ivory/25 bg-black/30 px-4 py-1 text-xs uppercase tracking-[0.3em] text-ivory/85 backdrop-blur transition hover:border-roseGoldLight"
//             >
//               {muted ? 'Unmute' : 'Mute'}
//             </button>
//           ) : null}
//         </div>
//         <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-5 pb-12 text-center">
//           <p className="font-script text-5xl text-roseGoldLight drop-shadow">
//             Us, in moments.
//           </p>
//           <div className="flex items-center gap-2">
//             {images.map((_, i) => (
//               <span
//                 key={i}
//                 className={`h-px transition-all ${i === index ? 'w-8 bg-roseGoldLight' : 'w-4 bg-ivory/30'
//                   }`}
//               />
//             ))}
//           </div>
//           <Button onClick={onContinue} variant="primary">
//             Continue
//           </Button>
//         </div>
//       </div>

//       {musicUrl ? (
//         <audio
//           ref={audioRef}
//           src={musicUrl}
//           loop
//           preload="auto"
//           controls
//         />
//       ) : null}
//     </motion.div>
//   )
// }

// function GiftBox({ opened, onOpen }) {
//   return (
//     <button
//       type="button"
//       onClick={onOpen}
//       aria-label="Open the gift"
//       className="group relative h-56 w-56 cursor-pointer focus:outline-none"
//       style={{ perspective: '900px' }}
//     >
//       <div
//         className="absolute inset-0"
//         style={{ transformStyle: 'preserve-3d' }}
//       >
//         <div className="absolute inset-x-3 bottom-0 h-44 rounded-md bg-gradient-to-b from-bordeaux to-burgundy shadow-glow">
//           <div className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-roseGold/80" />
//           <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-roseGold/80" />
//         </div>
//         <motion.div
//           initial={false}
//           animate={
//             opened
//               ? { rotateX: -120, y: -60, opacity: 0.95 }
//               : { rotateX: 0, y: 0, opacity: 1 }
//           }
//           transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
//           className="absolute inset-x-0 top-0 h-16 origin-bottom"
//           style={{ transformStyle: 'preserve-3d' }}
//         >
//           <div className="relative mx-2 h-full rounded-md bg-gradient-to-b from-roseGold to-bordeaux shadow-soft">
//             <div className="absolute inset-x-0 -top-3 mx-auto h-5 w-10 rounded-t-full bg-roseGoldLight" />
//             <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-roseGoldLight/90" />
//           </div>
//         </motion.div>
//       </div>
//       {!opened ? (
//         <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.4em] text-ivory/60">
//           tap to open
//         </span>
//       ) : null}
//     </button>
//   )
// }

// function RingSvg() {
//   return (
//     <svg
//       width="120"
//       height="120"
//       viewBox="0 0 120 120"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <defs>
//         <radialGradient id="diamond" cx="50%" cy="50%" r="50%">
//           <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
//           <stop offset="60%" stopColor="#E9D8B4" stopOpacity="0.95" />
//           <stop offset="100%" stopColor="#B76E79" stopOpacity="0.6" />
//         </radialGradient>
//         <linearGradient id="band" x1="0" x2="0" y1="0" y2="1">
//           <stop offset="0%" stopColor="#E9D8B4" />
//           <stop offset="100%" stopColor="#B76E79" />
//         </linearGradient>
//       </defs>
//       <circle cx="60" cy="78" r="32" stroke="url(#band)" strokeWidth="6" fill="none" />
//       <polygon
//         points="60,18 48,38 60,52 72,38"
//         fill="url(#diamond)"
//         stroke="#E9D8B4"
//         strokeWidth="1"
//       />
//     </svg>
//   )
// }

// function BoxAct() {
//   const [opened, setOpened] = useState(false)
//   const { containerRef, burst } = useFallingHearts()

//   const handleOpen = () => {
//     if (opened) return
//     setOpened(true)
//     burst(140, 22)
//   }

//   return (
//     <motion.div
//       key="box"
//       ref={containerRef}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//       className="relative"
//     >
//       <Confetti active={opened} count={110} />

//       <Section className="py-20 sm:py-28" size="default">
//         <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
//           <Heading variant="eyebrow">One more thing</Heading>
//           <Heading variant="display" className="mt-3">
//             {opened ? 'For you.' : 'A small gift, just for you.'}
//           </Heading>

//           <div className="mt-14 flex h-72 items-end justify-center">
//             <AnimatePresence>
//               {opened ? (
//                 <motion.div
//                   key="ring"
//                   initial={{ opacity: 0, y: 40, scale: 0.6 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{ duration: 0.9, delay: 0.25, type: 'spring', stiffness: 90 }}
//                   className="flex flex-col items-center"
//                 >
//                   <RingSvg />
//                   <div
//                     aria-hidden="true"
//                     className="mt-2 h-2 w-24 rounded-full bg-roseGold/40 blur-md"
//                   />
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="giftbox"
//                   initial={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   <GiftBox opened={opened} onOpen={handleOpen} />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           <AnimatePresence>
//             {opened ? (
//               <motion.div
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7, delay: 0.6 }}
//                 className="mt-14 max-w-xl"
//               >
//                 <Heading variant="display" as="p">
//                   {site.surprise.finalMessage}
//                 </Heading>
//                 <p className="mt-6 font-script text-3xl text-roseGoldLight">
//                   {site.surprise.signature}
//                 </p>
//                 <p className="mt-1 font-script text-5xl text-ivory">
//                   {site.myName}
//                 </p>

//                 <Divider className="mx-auto my-10 max-w-xs" />

//                 <div className="flex items-center justify-center gap-3">
//                   <Button to="/" variant="ghost">
//                     Return home
//                   </Button>
//                   <Button to="/memories" variant="primary">
//                     Relive our memories
//                   </Button>
//                 </div>
//               </motion.div>
//             ) : null}
//           </AnimatePresence>
//         </div>
//       </Section>
//     </motion.div>
//   )
// }

// export default function Surprise() {
//   const [act, setAct] = useState('letter')

//   return (
//     <PageWrapper>
//       <FloatingHearts />
//       <AnimatePresence mode="wait">
//         {act === 'letter' ? (
//           <LetterAct onContinue={() => setAct('cinema')} key="letter" />
//         ) : act === 'cinema' ? (
//           <CinemaAct onContinue={() => setAct('box')} key="cinema" />
//         ) : (
//           <BoxAct key="box" />
//         )}
//       </AnimatePresence>
//     </PageWrapper>
//   )
// }

import { useEffect, useMemo, useRef, useState } from 'react'
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

// DIRECT MUSIC IMPORT
// import musicFile from '../assets/music/song.mp3'

function LetterAct({ onContinue }) {
  const { typedLines, isComplete } = useTypewriter({
    lines: site.letterLines,
    charDelay: 32,
    lineDelay: 500,
  })

  return (
    <motion.div
      key="letter"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6 }}
    >
      <Section className="py-20 sm:py-28" size="default">
        <div className="mx-auto max-w-2xl text-center">
          <Heading variant="eyebrow">A letter</Heading>

          <p className="mt-3 font-script text-5xl text-roseGoldLight">
            For {site.herName},
          </p>
        </div>

        <Card className="mx-auto mt-10 max-w-2xl" padding="lg">
          <div className="space-y-5 text-center">
            {typedLines.map((line, idx) => (
              <p
                key={idx}
                className="font-display text-xl italic leading-relaxed text-ivory/90 sm:text-2xl"
              >
                {line}

                {idx === typedLines.length - 1 && !isComplete ? (
                  <span className="ml-1 inline-block w-px animate-pulse bg-roseGoldLight align-middle">
                    &nbsp;
                  </span>
                ) : null}
              </p>
            ))}

            <AnimatePresence>
              {isComplete ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Divider className="mx-auto my-6 max-w-[40%]" />

                  <p className="font-script text-3xl text-roseGoldLight">
                    {site.myName}
                  </p>

                  <div className="mt-8">
                    <Button onClick={onContinue} variant="primary">
                      Continue
                    </Button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </Card>
      </Section>
    </motion.div>
  )
}

function CinemaAct({ onContinue }) {
  const images = useMemo(() => getGalleryImages(), [])

  const [index, setIndex] = useState(0)

  const [playing, setPlaying] = useState(false)

  const audioRef = useRef(null)

  useEffect(() => {
    if (images.length === 0) return

    const t = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, 4200)

    return () => clearInterval(t)
  }, [images.length])

  // MUSIC PLAY / PAUSE
  useEffect(() => {
    const a = audioRef.current

    if (!a) return

    a.volume = 0.45

    if (playing) {
      a.play().catch((err) => {
        console.log(err)
      })
    } else {
      a.pause()
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
        <Section className="py-20 text-center">
          <Heading variant="section">
            Add some photos to begin the reel.
          </Heading>

          <p className="mt-3 text-ivory/65">
            Drop images into{' '}
            <code className="text-roseGoldLight">
              src/assets/images/
            </code>{' '}
            and refresh.
          </p>

          <div className="mt-8">
            <Button onClick={onContinue} variant="primary">
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
      <div className="relative h-[100vh] w-full overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt=""
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-wine via-wine/30 to-wine/60" />

        {/* MUSIC BUTTON */}
        <div className="absolute right-5 top-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="rounded-full border border-ivory/25 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.3em] text-ivory/85 backdrop-blur transition hover:border-roseGoldLight"
          >
            {playing ? 'Pause Music' : 'Play Music'}
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-5 pb-12 text-center">
          <p className="font-script text-5xl text-roseGoldLight drop-shadow">
            Us, in moments.
          </p>

          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-px transition-all ${
                  i === index
                    ? 'w-8 bg-roseGoldLight'
                    : 'w-4 bg-ivory/30'
                }`}
              />
            ))}
          </div>

          <Button onClick={onContinue} variant="primary">
            Continue
          </Button>
        </div>
      </div>

      {/* AUDIO */}
      {/* <audio
        ref={audioRef}
        src={musicFile}
        loop
        preload="auto"
      /> */}
    </motion.div>
  )
}

function GiftBox({ opened, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open the gift"
      className="group relative h-56 w-56 cursor-pointer focus:outline-none"
      style={{ perspective: '900px' }}
    >
      <div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-x-3 bottom-0 h-44 rounded-md bg-gradient-to-b from-bordeaux to-burgundy shadow-glow">
          <div className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-roseGold/80" />

          <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-roseGold/80" />
        </div>

        <motion.div
          initial={false}
          animate={
            opened
              ? { rotateX: -120, y: -60, opacity: 0.95 }
              : { rotateX: 0, y: 0, opacity: 1 }
          }
          transition={{
            duration: 0.9,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          className="absolute inset-x-0 top-0 h-16 origin-bottom"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="relative mx-2 h-full rounded-md bg-gradient-to-b from-roseGold to-bordeaux shadow-soft">
            <div className="absolute inset-x-0 -top-3 mx-auto h-5 w-10 rounded-t-full bg-roseGoldLight" />

            <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-roseGoldLight/90" />
          </div>
        </motion.div>
      </div>

      {!opened ? (
        <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.4em] text-ivory/60">
          tap to open
        </span>
      ) : null}
    </button>
  )
}

function RingSvg() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="diamond" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />

          <stop
            offset="60%"
            stopColor="#E9D8B4"
            stopOpacity="0.95"
          />

          <stop
            offset="100%"
            stopColor="#B76E79"
            stopOpacity="0.6"
          />
        </radialGradient>

        <linearGradient id="band" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#E9D8B4" />

          <stop offset="100%" stopColor="#B76E79" />
        </linearGradient>
      </defs>

      <circle
        cx="60"
        cy="78"
        r="32"
        stroke="url(#band)"
        strokeWidth="6"
        fill="none"
      />

      <polygon
        points="60,18 48,38 60,52 72,38"
        fill="url(#diamond)"
        stroke="#E9D8B4"
        strokeWidth="1"
      />
    </svg>
  )
}

function BoxAct() {
  const [opened, setOpened] = useState(false)

  const { containerRef, burst } = useFallingHearts()

  const handleOpen = () => {
    if (opened) return

    setOpened(true)

    burst(140, 22)
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

      <Section className="py-20 sm:py-28" size="default">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Heading variant="eyebrow">One more thing</Heading>

          <Heading variant="display" className="mt-3">
            {opened ? 'For you.' : 'A small gift, just for you.'}
          </Heading>

          <div className="mt-14 flex h-72 items-end justify-center">
            <AnimatePresence>
              {opened ? (
                <motion.div
                  key="ring"
                  initial={{ opacity: 0, y: 40, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.25,
                    type: 'spring',
                    stiffness: 90,
                  }}
                  className="flex flex-col items-center"
                >
                  <RingSvg />

                  <div
                    aria-hidden="true"
                    className="mt-2 h-2 w-24 rounded-full bg-roseGold/40 blur-md"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="giftbox"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <GiftBox
                    opened={opened}
                    onOpen={handleOpen}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {opened ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mt-14 max-w-xl"
              >
                <Heading variant="display" as="p">
                  {site.surprise.finalMessage}
                </Heading>

                <p className="mt-6 font-script text-3xl text-roseGoldLight">
                  {site.surprise.signature}
                </p>

                <p className="mt-1 font-script text-5xl text-ivory">
                  {site.myName}
                </p>

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
          </AnimatePresence>
        </div>
      </Section>
    </motion.div>
  )
}

export default function Surprise() {
  const [act, setAct] = useState('letter')

  return (
    <PageWrapper>
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {act === 'letter' ? (
          <LetterAct
            onContinue={() => setAct('cinema')}
            key="letter"
          />
        ) : act === 'cinema' ? (
          <CinemaAct
            onContinue={() => setAct('box')}
            key="cinema"
          />
        ) : (
          <BoxAct key="box" />
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}