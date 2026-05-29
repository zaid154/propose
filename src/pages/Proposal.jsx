import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageWrapper from '../components/ui/PageWrapper'
import Section from '../components/ui/Section'
import Heading from '../components/ui/Heading'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Divider from '../components/ui/Divider'
import FloatingHearts from '../components/effects/FloatingHearts'
import { useFallingHearts } from '../hooks/useFallingHearts'
import { site } from '../config/site'

async function postToFormspree(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    body: data,
    headers: { Accept: 'application/json' },
  })
  return res.ok
}

export default function Proposal() {
  const { containerRef, burst } = useFallingHearts()
  const [phase, setPhase] = useState('asking')
  const [question, setQuestion] = useState(site.proposalQuestion)
  const [noLabel, setNoLabel] = useState('Not yet')
  const [statusMsg, setStatusMsg] = useState('')

  const noMessages = useMemo(() => site.noButtonMessages, [])

  const sendAnswer = async (answer) => {
    const data = new FormData()
    data.set('answer', answer)
    data.set('from', site.myName)
    data.set('to', site.herName)
    try {
      const ok = await postToFormspree(site.formspree.proposalUrl, data)
      setStatusMsg(ok ? 'Your reply has been sent.' : 'Could not send. Try again later.')
    } catch {
      setStatusMsg('Network error.')
    }
  }

  const onYes = async () => {
    setPhase('yes')
    setQuestion(site.proposalYesReply)
    burst(120, 25)
    await sendAnswer('Yes')
  }

  const onNo = async () => {
    const msg = noMessages[Math.floor(Math.random() * noMessages.length)]
    setNoLabel(msg)
    await sendAnswer(msg)
  }

  return (
    <PageWrapper>
      <div ref={containerRef} className="relative">
        <FloatingHearts />

        <Section className="py-20 sm:py-28" size="default">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Heading variant="eyebrow">For you, {site.herName}</Heading>

            <p className="mt-4 font-script text-5xl leading-none text-roseGoldLight sm:text-6xl">
              I have a question.
            </p>
          </motion.div>

          <Card className="mx-auto mt-10 max-w-3xl text-center" padding="lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={question}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
              >
                <Heading variant="display" as="p">
                  {question}
                </Heading>
              </motion.div>
            </AnimatePresence>

            <Divider className="mx-auto my-8 max-w-xs" />

            {phase === 'asking' ? (
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button variant="primary" onClick={onYes}>
                  Yes
                </Button>
                <Button variant="ghost" onClick={onNo}>
                  {noLabel}
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <Button to="/date" variant="primary">
                  Plan our first date
                </Button>
                <Button to="/surprise" variant="ghost">
                  Skip to a surprise
                </Button>
              </motion.div>
            )}

            {statusMsg ? (
              <p className="mt-6 text-xs uppercase tracking-[0.35em] text-ivory/50">
                {statusMsg}
              </p>
            ) : null}
          </Card>

          <div className="mx-auto mt-10 max-w-3xl text-center text-xs uppercase tracking-[0.4em] text-ivory/45">
            with all my love · {site.myName}
          </div>
        </Section>
      </div>
    </PageWrapper>
  )
}
