import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/ui/PageWrapper'
import Section from '../components/ui/Section'
import Heading from '../components/ui/Heading'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Divider from '../components/ui/Divider'
import { site } from '../config/site'
import { getPlaces } from '../config/places'
import rosesBg from '../assets/heart-of-roses.jpg'

const fieldBase =
  'peer w-full rounded-xl border border-ivory/15 bg-ivory/[0.04] px-4 pt-6 pb-2 text-ivory placeholder-transparent outline-none transition focus:border-roseGoldLight focus:bg-ivory/[0.06]'

const labelBase =
  'pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-[0.35em] text-ivory/55 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ivory/40 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:tracking-[0.35em] peer-focus:text-roseGoldLight'

function FloatingField({ id, label, type = 'text', value, onChange, min }) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        min={min}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className={fieldBase}
        autoComplete="off"
      />
      <label htmlFor={id} className={labelBase}>
        {label}
      </label>
    </div>
  )
}

async function postToFormspree(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    body: data,
    headers: { Accept: 'application/json' },
  })
  return res.ok
}

export default function DatePlanner() {
  const today = useMemo(() => new Date().toISOString().split('T')[0], [])
  const places = useMemo(() => getPlaces(), [])

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [place, setPlace] = useState(places[0] ?? 'Other')
  const [message, setMessage] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (
      name.trim() === '' ||
      date === '' ||
      time === '' ||
      place === '' ||
      message.trim() === ''
    ) {
      setError('All fields are required.')
      return
    }
    if (date < today) {
      setError('Please choose a future date.')
      return
    }

    const data = new FormData()
    data.set('name', name)
    data.set('date', date)
    data.set('time', time)
    data.set('place', place)
    data.set('message', message)

    try {
      setSubmitting(true)
      const ok = await postToFormspree(site.formspree.dateUrl, data)
      if (!ok) throw new Error('Send failed')
      setDone(true)
    } catch {
      setError('Could not send. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageWrapper>
      <Section className="py-16 sm:py-24" size="lg">
        <div className="grid gap-10 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <Heading variant="eyebrow">Plan our date</Heading>
            <Heading variant="display" className="mt-3">
              Pick a day worth remembering.
            </Heading>
            <p className="mt-4 max-w-lg text-ivory/65">
              Choose a moment and a place — and I will be there, on time, with flowers.
            </p>

            {done ? (
              <Card className="mt-10" padding="lg">
                <Heading variant="section">It’s in my calendar.</Heading>
                <p className="mt-3 text-ivory/70">
                  I’ll see you then. Until that day — a small surprise waits for you.
                </p>
                <Divider className="my-7 max-w-xs" />
                <Button to="/surprise" variant="primary">
                  Continue to your surprise
                </Button>
              </Card>
            ) : (
              <Card className="mt-10" padding="lg">
                <form className="grid gap-5 sm:grid-cols-2" onSubmit={onSubmit}>
                  <div className="sm:col-span-2">
                    <FloatingField
                      id="name"
                      label="Your name"
                      value={name}
                      onChange={setName}
                    />
                  </div>

                  <FloatingField
                    id="date"
                    label="Date"
                    type="date"
                    value={date}
                    onChange={setDate}
                    min={today}
                  />

                  <FloatingField
                    id="time"
                    label="Time"
                    type="time"
                    value={time}
                    onChange={setTime}
                  />

                  {/* <div className="relative sm:col-span-2">
                    <select
                      id="place"
                      name="place"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-ivory/15 bg-ivory/[0.04] px-4 pt-6 pb-2 text-ivory outline-none transition focus:border-roseGoldLight"
                    >
                      {places.map((p) => (
                        <option key={p} value={p} className="bg-wine">
                          {p}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="place"
                      className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-[0.35em] text-roseGoldLight"
                    >
                      Place
                    </label>
                  </div> */}

                  <div className="relative sm:col-span-2">
                    <select
                      id="place"
                      name="place"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-ivory/15 bg-ivory/[0.04] px-4 pt-6 pb-2 text-ivory outline-none transition focus:border-roseGoldLight"
                    >
                      {places.map((p) => (
                        <option
                          key={p}
                          value={p}
                          className="bg-[#3b0d1e] text-white"
                        >
                          {p}
                        </option>
                      ))}
                    </select>

                    <label
                      htmlFor="place"
                      className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-[0.35em] text-roseGoldLight"
                    >
                      Place
                    </label>
                  </div>

                  <div className="relative sm:col-span-2">
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${fieldBase} resize-none`}
                    />
                    <label htmlFor="message" className={labelBase}>
                      A short note
                    </label>
                  </div>

                  {error ? (
                    <p className="sm:col-span-2 text-xs uppercase tracking-[0.3em] text-roseGoldLight">
                      {error}
                    </p>
                  ) : null}

                  <div className="sm:col-span-2 flex items-center justify-between">
                    <Button to="/proposal" variant="ghost">
                      ← Back
                    </Button>
                    <Button type="submit" variant="primary" disabled={submitting}>
                      {submitting ? 'Sending…' : 'Send'}
                    </Button>
                  </div>
                </form>
              </Card>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative hidden overflow-hidden rounded-3xl border border-ivory/10 lg:col-span-5 lg:block"
          >
            <img
              src={rosesBg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 [bg-gradient-to-br] from-wine/90 via-wine/40 to-wine/85" />
            <div className="relative flex h-full [min-h-[28rem]] flex-col items-start justify-end p-8">
              <p className="font-script text-4xl text-roseGoldLight">
                For {site.herName},
              </p>
              <p className="mt-2 max-w-xs font-display italic text-ivory/85">
                a day, a place, a quiet promise.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>
    </PageWrapper>
  )
}
