import { motion } from 'framer-motion'
import PageWrapper from '../components/ui/PageWrapper'
import Section from '../components/ui/Section'
import Heading from '../components/ui/Heading'
import Button from '../components/ui/Button'
import Divider from '../components/ui/Divider'
import FloatingHearts from '../components/effects/FloatingHearts'
import { site } from '../config/site'
import { getRevealAnimation, getStaggerAnimation } from '../hooks/useScrollReveal'

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <FloatingHearts />
      <Section className="py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <Heading variant="eyebrow">{site.home.eyebrow}</Heading>
          <Heading variant="script" className="mt-3 sm:mt-4">
            {site.herName}
          </Heading>
          <p className="mx-auto mt-6 max-w-xl text-base text-gray-600 sm:text-lg">
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
          <div className="mt-16 flex flex-col items-center gap-3 text-gray-400">
            <span className="text-xs uppercase tracking-widest">scroll</span>
            <span className="block h-10 w-px bg-pink-200" />
          </div>
        </motion.div>
      </Section>
    </section>
  )
}

const StoryCard = (props) => {
  const text = props.text
  const index = props.index
  const reveal = getRevealAnimation()

  let numberClass = 'sm:col-span-3 flex sm:block'
  let textClass = 'sm:col-span-9'

  if (index % 2 !== 0) {
    numberClass = 'sm:col-span-3 flex sm:block sm:order-2 sm:text-right'
    textClass = 'sm:col-span-9 sm:order-1'
  }

  const chapterNumber = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      initial={reveal.initial}
      whileInView={reveal.whileInView}
      viewport={reveal.viewport}
      variants={reveal.variants}
      className="relative grid gap-6 py-8 sm:grid-cols-12 sm:gap-10 sm:py-12"
    >
      <div className={numberClass}>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-3xl italic text-pink-600 sm:text-4xl">
            {chapterNumber}
          </span>
          <span className="text-xs uppercase tracking-widest text-pink-500">chapter</span>
        </div>
      </div>
      <div className={textClass}>
        <p className="font-display text-lg italic text-gray-800 sm:text-2xl">{text}</p>
      </div>
    </motion.article>
  )
}

const StorySection = () => {
  const stagger = getStaggerAnimation()

  return (
    <Section className="pt-12 pb-12">
      <div className="mx-auto max-w-3xl text-center">
        <Heading variant="eyebrow">Our story</Heading>
        <Heading variant="section" className="mt-3">
          Six quiet lines, only for you.
        </Heading>
        <p className="mt-3 text-gray-600">
          Some feelings are simple — but they mean everything.
        </p>
      </div>

      <motion.div
        initial={stagger.initial}
        whileInView={stagger.whileInView}
        viewport={stagger.viewport}
        variants={stagger.variants}
        className="mx-auto mt-12 max-w-4xl divide-y divide-pink-100"
      >
        {site.storyParagraphs.map((text, index) => (
          <StoryCard key={index} text={text} index={index} />
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

const Home = () => {
  return (
    <PageWrapper>
      <Hero />
      <StorySection />
    </PageWrapper>
  )
}

export default Home
