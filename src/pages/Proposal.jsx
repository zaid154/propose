import { useState } from 'react'
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

async function sendFormData(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    body: data,
    headers: { Accept: 'application/json' },
  })
  return res.ok
}

const Proposal = () => {
  const { containerRef, burst } = useFallingHearts()

  const [step, setStep] = useState('asking')
  const [question, setQuestion] = useState(site.proposalQuestion)
  const [noLabel, setNoLabel] = useState('Not yet')
  const [statusMsg, setStatusMsg] = useState('')

  const noMessages = site.noButtonMessages

  async function sendAnswer(answer) {
    const data = new FormData()
    data.set('answer', answer)
    data.set('from', site.myName)
    data.set('to', site.herName)

    try {
      const ok = await sendFormData(site.formspree.proposalUrl, data)
      if (ok) {
        setStatusMsg('Your reply has been sent.')
      } else {
        setStatusMsg('Could not send. Try again later.')
      }
    } catch (error) {
      console.log(error)
      setStatusMsg('Network error.')
    }
  }

  async function handleYes() {
    setStep('yes')
    setQuestion(site.proposalYesReply)
    burst(120, 25)
    await sendAnswer('Yes')
  }

  async function handleNo() {
    const randomIndex = Math.floor(Math.random() * noMessages.length)
    const msg = noMessages[randomIndex]
    setNoLabel(msg)
    await sendAnswer(msg)
  }

  return (
    <PageWrapper>
      <div ref={containerRef} className="relative">
        <FloatingHearts />

        <Section className="pt-6 pb-12" size="default">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Heading variant="eyebrow">For you, {site.herName}</Heading>
            <p className="mt-4 font-script text-5xl text-pink-600 sm:text-6xl">
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

            {step === 'asking' ? (
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button variant="primary" onClick={handleYes}>
                  Yes
                </Button>
                <Button variant="ghost" onClick={handleNo}>
                  {noLabel}
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
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
              <p className="mt-6 text-xs uppercase tracking-widest text-gray-400">{statusMsg}</p>
            ) : null}
          </Card>

          <div className="mx-auto mt-10 max-w-3xl text-center text-xs uppercase tracking-widest text-gray-400">
            with all my love · {site.myName}
          </div>
        </Section>
      </div>
    </PageWrapper>
  )
}

export default Proposal
