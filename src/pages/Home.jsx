import { motion } from 'framer-motion'
import PageWrapper from '../components/ui/PageWrapper'
import Section from '../components/ui/Section'
import Heading from '../components/ui/Heading'
import Button from '../components/ui/Button'
import Divider from '../components/ui/Divider'
import FloatingHearts from '../components/effects/FloatingHearts'
import { site } from '../config/site'
import { useScrollReveal, useStaggerContainer } from '../hooks/useScrollReveal'

function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-64px)] items-center overflow-hidden">
      <FloatingHearts />
      <Section className="py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <Heading variant="eyebrow">{site.home.eyebrow}</Heading>

          <Heading variant="script" className="mt-3 sm:mt-4">
            {site.herName}
          </Heading>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory/75 sm:text-lg">
            {site.home.tagline}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button to="/memories" variant="primary">
              {site.home.cta}
            </Button>
            <Button to="/proposal" variant="ghost">
              Skip ahead
            </Button>
          </div>

          <div className="mt-16 flex flex-col items-center gap-3 text-ivory/40">
            <span className="text-[10px] uppercase tracking-[0.5em]">
              scroll
            </span>
            <span className="block h-10 w-px bg-gradient-to-b from-ivory/40 to-transparent" />
          </div>
        </motion.div>
      </Section>
    </section>
  )
}

function StoryCard({ text, index }) {
  const isEven = index % 2 === 0
  const reveal = useScrollReveal()

  return (
    <motion.article
      {...reveal}
      className={[
        'relative grid gap-6 sm:grid-cols-12 sm:gap-10',
        'py-8 sm:py-12',
      ].join(' ')}
    >
      <div
        className={[
          'sm:col-span-3 flex sm:block',
          isEven ? '' : 'sm:order-2 sm:text-right',
        ].join(' ')}
      >
        <div className="flex items-baseline gap-2">
          <span className="font-display italic text-roseGoldLight text-3xl sm:text-4xl">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-xs uppercase tracking-[0.4em] text-champagne/70">
            chapter
          </span>
        </div>
      </div>

      <div className={[
        'sm:col-span-9',
        isEven ? '' : 'sm:order-1',
      ].join(' ')}>
        <p className="font-display text-lg italic leading-relaxed text-ivory/90 sm:text-2xl">
          {text}
        </p>
      </div>
    </motion.article>
  )
}

function StorySection() {
  const stagger = useStaggerContainer()

  return (
    <Section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Heading variant="eyebrow">Our story</Heading>
        <Heading variant="section" className="mt-3">
          Six quiet lines, only for you.
        </Heading>
        <p className="mt-3 text-ivory/60">
          Some feelings are simple — but they mean everything.
        </p>
      </div>

      <motion.div {...stagger} className="mx-auto mt-12 max-w-4xl divide-y divide-ivory/10">
        {site.storyParagraphs.map((text, idx) => (
          <StoryCard key={idx} text={text} index={idx} />
        ))}
      </motion.div>

      <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-4 text-center">
        <Divider className="max-w-xs" />
        <Button to="/memories" variant="primary">
          Continue
        </Button>
      </div>
    </Section>
  )
}

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <StorySection />
    </PageWrapper>
  )
}
