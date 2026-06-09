import { useState } from 'react'
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

const inputClass = 'w-full rounded border border-gray-300 px-3 py-2 text-gray-800'

const FormField = (props) => {
  return (
    <div>
      <label htmlFor={props.id} className="mb-1 block text-sm text-gray-700">
        {props.label}
      </label>
      <input
        id={props.id}
        name={props.id}
        type={props.type || 'text'}
        min={props.min}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className={inputClass}
        autoComplete="off"
      />
    </div>
  )
}

async function sendFormData(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    body: data,
    headers: { Accept: 'application/json' },
  })
  return res.ok
}

const DatePlanner = () => {
  const today = new Date().toISOString().split('T')[0]
  const places = getPlaces()

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [place, setPlace] = useState(places[0] || 'Other')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (name.trim() === '') {
      setError('All fields are required.')
      return
    }
    if (date === '') {
      setError('All fields are required.')
      return
    }
    if (time === '') {
      setError('All fields are required.')
      return
    }
    if (place === '') {
      setError('All fields are required.')
      return
    }
    if (message.trim() === '') {
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
      setLoading(true)
      const ok = await sendFormData(site.formspree.dateUrl, data)
      if (!ok) {
        setError('Could not send. Please try again.')
        return
      }
      setSubmitted(true)
    } catch (err) {
      console.log(err)
      setError('Could not send. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <Section className="pt-6 pb-12" size="lg">
        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading variant="eyebrow">Plan our date</Heading>
            <Heading variant="display" className="mt-3">
              Pick a day worth remembering.
            </Heading>
            <p className="mt-4 max-w-lg text-gray-600">
              Choose a moment and a place — and I will be there, on time, with flowers.
            </p>

            {submitted ? (
              <Card className="mt-10" padding="lg">
                <Heading variant="section">It's in my calendar.</Heading>
                <p className="mt-3 text-gray-600">
                  I'll see you then. Until that day — a small surprise waits for you.
                </p>
                <Divider className="my-7 max-w-xs" />
                <Button to="/surprise" variant="primary">
                  Continue to your surprise
                </Button>
              </Card>
            ) : (
              <Card className="mt-10" padding="lg">
                <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
                  <div className="sm:col-span-2">
                    <FormField id="name" label="Your name" value={name} onChange={setName} />
                  </div>

                  <FormField
                    id="date"
                    label="Date"
                    type="date"
                    value={date}
                    onChange={setDate}
                    min={today}
                  />

                  <FormField id="time" label="Time" type="time" value={time} onChange={setTime} />

                  <div className="sm:col-span-2">
                    <label htmlFor="place" className="mb-1 block text-sm text-gray-700">
                      Place
                    </label>
                    <select
                      id="place"
                      name="place"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      className={inputClass}
                    >
                      {places.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="mb-1 block text-sm text-gray-700">
                      A short note
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {error ? (
                    <p className="sm:col-span-2 text-sm text-pink-600">{error}</p>
                  ) : null}

                  <div className="sm:col-span-2 flex items-center justify-between">
                    <Button to="/proposal" variant="ghost">
                      ← Back
                    </Button>
                    <Button type="submit" variant="primary" disabled={loading}>
                      {loading ? 'Sending…' : 'Send'}
                    </Button>
                  </div>
                </form>
              </Card>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden overflow-hidden rounded-lg border border-pink-100 lg:block"
          >
            <img
              src={rosesBg}
              alt=""
              aria-hidden="true"
              className="h-96 w-full object-cover"
            />
            <div className="bg-white p-6">
              <p className="font-script text-4xl text-pink-600">For {site.herName},</p>
              <p className="mt-2 max-w-xs font-display italic text-gray-600">
                a day, a place, a quiet promise.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>
    </PageWrapper>
  )
}

export default DatePlanner
