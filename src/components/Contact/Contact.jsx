import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheckCircle } from 'react-icons/fi'
import profile from '../../data/profile.js'
import links from '../../data/links.js'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import './Contact.css'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
})

// TODO: Replace sendMessage with a fetch POST to your Spring Boot API:
//   const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   })
async function sendMessage(data) {
  const subject = encodeURIComponent(`Portfolio contact from ${data.name}`)
  const body    = encodeURIComponent(`Name: ${data.name}\n\n${data.message}`)
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  return { ok: true }
}

export default function Contact() {
  const { ref, isInView } = useScrollReveal()
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('sending')
    try {
      await sendMessage(form)
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

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

          {/* Right — form */}
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
                <FiCheckCircle size={32} aria-hidden="true" />
                <p>Message sent! I'll get back to you soon.</p>
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
                      placeholder="Your name" autoComplete="name"
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
                      placeholder="your@email.com" autoComplete="email"
                      aria-describedby={errors.email ? 'err-email' : undefined}
                    />
                    {errors.email && <span id="err-email" className="contact__error" role="alert">{errors.email}</span>}
                  </div>
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-message" className="contact__label">Message</label>
                  <textarea
                    id="contact-message" name="message" rows={5}
                    className={`contact__input contact__textarea${errors.message ? ' contact__input--error' : ''}`}
                    value={form.message} onChange={handleChange}
                    placeholder="What's on your mind?"
                    aria-describedby={errors.message ? 'err-message' : undefined}
                  />
                  {errors.message && <span id="err-message" className="contact__error" role="alert">{errors.message}</span>}
                </div>

                {status === 'error' && (
                  <p className="contact__error" role="alert">Something went wrong. Please email me directly.</p>
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
