import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import profile from '../../data/profile.js'
import links from '../../data/links.js'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import './Contact.css'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
})

/*
 * ── How the form sends ────────────────────────────────────────────────
 * API_BASE comes from .env.local:  VITE_API_BASE_URL=http://localhost:8080
 * With the dev proxy in vite.config.js you can also leave it EMPTY and the
 * call goes to /api/contact on the same origin — vite forwards it to the
 * Spring Boot backend, and in production a Vercel rewrite does the same.
 *
 * Backend contract (ContactController.java):
 *   201 -> saved in MySQL, body is the saved message
 *   400 -> { status, error, fields: { name?, email?, message? } }
 *   500 -> { status, error }
 * Empty API_BASE means no backend is configured yet, so the form falls
 * back to the mailto handoff and never claims a message was delivered.
 */
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''
const MAX_MESSAGE_LENGTH = 5000 // must match @Size(max = 5000) in ContactRequest.java
const REQUEST_TIMEOUT_MS = 10000

async function sendToApi(data) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Trim here too, so what leaves the browser matches what the backend stores
    body: JSON.stringify({
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })

  if (res.status === 201) return { ok: true }

  if (res.status === 400) {
    // Spring's validation error handler answers with per-field messages
    const body = await res.json().catch(() => null)
    const err = new Error('Validation failed')
    err.fieldErrors = body?.fields ?? null
    throw err
  }

  throw new Error(`API responded with ${res.status}`)
}

// Fallback for when no backend URL is configured: hand the message to the
// visitor's email app. Nothing is delivered by the browser itself, so the
// UI says exactly that and keeps the typed text in the form.
function sendViaMailto(data) {
  const subject = encodeURIComponent(`Portfolio contact from ${data.name}`)
  const body    = encodeURIComponent(
    `Name: ${data.name}\nReply-to: ${data.email}\n\n${data.message}`
  )
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
}

export default function Contact() {
  const { ref, isInView } = useScrollReveal()
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  // idle | sending | sent | opened | error
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const [usingFallback, setUsingFallback] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const resetForm = () => {
    setForm({ name: '', email: '', message: '' })
    setErrors({})
    setStatus('idle')
    setUsingFallback(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('sending')
    try {
      if (API_BASE || true) {
        // API_BASE empty + dev proxy still resolves /api/contact on this origin,
        // so always try the API first; the mailto path is only for the rare
        // case where the API call itself fails AND no backend is configured.
        await sendToApi(form)
        setStatus('sent')
        setUsingFallback(false)
      }
    } catch (err) {
      if (err?.fieldErrors) {
        // Real 400 from Spring: show each message under its input
        setErrors(err.fieldErrors)
        setStatus('idle')
      } else if (!API_BASE) {
        // No backend configured anywhere (no env var, proxy dead in prod) —
        // degrade gracefully to the email handoff instead of a dead error.
        sendViaMailto(form)
        setUsingFallback(true)
        setStatus('opened')
      } else {
        setStatus('error')
      }
    }
  }

  const nearLimit = form.message.length >= MAX_MESSAGE_LENGTH - 100

  return (
    <section id="contact" className="contact section" ref={ref} aria-labelledby="contact-heading">
      <div className="container">
        <motion.p className="section-label" variants={fadeUp(0)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          POST /contact
        </motion.p>
        <motion.h2 id="contact-heading" className="contact__heading" variants={fadeUp(0.08)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          Get in Touch
        </motion.h2>

        <div className="contact__grid">
          {/* Left — info */}
          <motion.div className="contact__info" variants={fadeUp(0.14)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
            <p className="contact__blurb">
              Open to internship and full-time opportunities. Whether you have a question, a project idea, or just want to say hello — my inbox is open.
            </p>

            <a href={`mailto:${profile.email}`} className="contact__email">
              <FiMail size={16} aria-hidden="true" />
              {profile.email}
            </a>

            <div className="contact__socials">
              {links.github && (
                <a href={links.github} target="_blank" rel="noopener noreferrer"
                  className="contact__social-link" aria-label="GitHub profile">
                  <FiGithub size={20} aria-hidden="true" />
                  <span>GitHub</span>
                </a>
              )}
              {links.linkedin && (
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer"
                  className="contact__social-link" aria-label="LinkedIn profile">
                  <FiLinkedin size={20} aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Right — form (or the success panel after a real save) */}
          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            noValidate
            variants={fadeUp(0.22)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            aria-label="Contact form"
          >
            {status === 'sent' ? (
              <div className="contact__success" role="status">
                <FiCheckCircle size={36} aria-hidden="true" />
                <p className="contact__success-title">Message saved!</p>
                <p>
                  It landed safely in my database — I read every message and
                  usually reply within a day or two.
                </p>
                <button type="button" className="btn btn--outline contact__again" onClick={resetForm}>
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="contact__row">
                  <div className="contact__field">
                    <label htmlFor="contact-name" className="contact__label">Name</label>
                    <input
                      id="contact-name" name="name" type="text"
                      className={`contact__input${errors.name ? ' contact__input--error' : ''}`}
                      value={form.name} onChange={handleChange}
                      placeholder="Your name" autoComplete="name" maxLength={120}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                    />
                    {errors.name && <span id="err-name" className="contact__error" role="alert">{errors.name}</span>}
                  </div>
                  <div className="contact__field">
                    <label htmlFor="contact-email" className="contact__label">Email</label>
                    <input
                      id="contact-email" name="email" type="email"
                      className={`contact__input${errors.email ? ' contact__input--error' : ''}`}
                      value={form.email} onChange={handleChange}
                      placeholder="your@email.com" autoComplete="email" maxLength={180}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                    />
                    {errors.email && <span id="err-email" className="contact__error" role="alert">{errors.email}</span>}
                  </div>
                </div>

                <div className="contact__field">
                  <div className="contact__label-row">
                    <label htmlFor="contact-message" className="contact__label">Message</label>
                    <span
                      className={`contact__counter${nearLimit ? ' contact__counter--limit' : ''}`}
                      aria-live="polite"
                    >
                      {form.message.length}/{MAX_MESSAGE_LENGTH}
                    </span>
                  </div>
                  <textarea
                    id="contact-message" name="message" rows={5}
                    className={`contact__input contact__textarea${errors.message ? ' contact__input--error' : ''}`}
                    value={form.message} onChange={handleChange}
                    placeholder="What's on your mind?" maxLength={MAX_MESSAGE_LENGTH}
                    aria-describedby={errors.message ? 'err-message' : undefined}
                  />
                  {errors.message && <span id="err-message" className="contact__error" role="alert">{errors.message}</span>}
                </div>

                {status === 'error' && (
                  <p className="contact__error" role="alert">
                    <FiAlertCircle size={12} aria-hidden="true" /> Something went wrong sending your message. Please try again or email me directly at{' '}
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                  </p>
                )}

                {status === 'opened' && usingFallback && (
                  <p className="contact__note" role="status">
                    Your email app was opened with this message filled in. It is only
                    sent once you press Send there. If nothing opened, write to me at{' '}
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                  </p>
                )}

                <button type="submit" className="btn btn--primary contact__submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : <><FiSend size={15} aria-hidden="true" /> Send Message</>}
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
