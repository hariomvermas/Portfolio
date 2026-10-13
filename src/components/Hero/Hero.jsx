import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiDownload, FiArrowRight } from 'react-icons/fi'
import profile from '../../data/profile.js'
import links from '../../data/links.js'
import './Hero.css'

const STATUS = '200 OK'

function useTypewriter(text, startDelay = 0, speed = 55, skip = false) {
  const [displayed, setDisplayed] = useState(skip ? text : '')
  const [done, setDone] = useState(skip)

  useEffect(() => {
    if (skip) { setDisplayed(text); setDone(true); return }
    let timeout
    timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) { clearInterval(interval); setDone(true) }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [text, startDelay, speed, skip])

  return { displayed, done }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const { displayed: typedCmd, done: cmdDone } = useTypewriter('GET /hariom', 400, 55, prefersReduced)
  const { displayed: typedStatus }             = useTypewriter(STATUS, cmdDone ? (prefersReduced ? 0 : 900) : 99999, 55, prefersReduced)
  const showContent = typedStatus.length > 0

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="hero section" aria-label="Introduction">
      <div className="container hero__inner">

        {/* Left — text */}
        <div className="hero__text">
          {/* API request line */}
          <div className="hero__request" aria-hidden="true">
            <span className="hero__method">GET</span>
            <span className="hero__path">{typedCmd.replace('GET ', '')}</span>
            <span className={`hero__cursor${cmdDone ? ' hero__cursor--hidden' : ''}`}>▋</span>
          </div>

          {cmdDone && (
            <motion.div
              className="hero__status"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            >
              <span className="hero__status-code">200</span>
              <span className="hero__status-text"> {typedStatus.replace('200 ', '')}</span>
            </motion.div>
          )}

          {/* Main content — revealed after status */}
          {showContent && (
            <motion.div variants={stagger} initial="hidden" animate="show" className="hero__content">
              <motion.p variants={fadeUp} className="hero__greeting">
                Hello, I'm
              </motion.p>
              <motion.h1 variants={fadeUp} className="hero__name">
                <span className="hero__name-first">{profile.name.split(' ')[0]}</span>
                <span className="hero__name-last">{profile.name.split(' ').slice(1).join(' ')}</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="hero__role">
                {profile.role}
              </motion.p>
              <motion.p variants={fadeUp} className="hero__pitch">
                {profile.pitch}
              </motion.p>

              <motion.div variants={fadeUp} className="hero__buttons">
                <button className="btn btn--primary" onClick={scrollToProjects}>
                  View Projects <FiArrowRight size={16} aria-hidden="true" />
                </button>
                <a className="btn btn--outline" href={profile.resume} download
                  aria-label="Download resume PDF">
                  <FiDownload size={16} aria-hidden="true" /> Resume
                </a>
                {links.github && (
                  <a className="btn btn--ghost" href={links.github}
                    target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                    <FiGithub size={18} />
                  </a>
                )}
                {links.linkedin && (
                  <a className="btn btn--ghost" href={links.linkedin}
                    target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                    <FiLinkedin size={18} />
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Right — photo */}
        {showContent && (
          <motion.div
            className="hero__photo-wrap"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero__photo-frame">
              {/* Amber L-bracket corners */}
              <span className="hero__corner hero__corner--tl" aria-hidden="true" />
              <span className="hero__corner hero__corner--br" aria-hidden="true" />
              <img
                src={profile.photo}
                alt="Hariom Verma — Java Full Stack Developer"
                className="hero__photo"
                loading="eager"
              />
              <div className="hero__photo-badge">
                <span className="hero__photo-badge-dot" />
                Open to work
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll hint */}
      {showContent && (
        <motion.div className="hero__scroll-hint"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
          <span className="hero__scroll-line" />
          <span className="hero__scroll-label">scroll</span>
        </motion.div>
      )}
    </section>
  )
}
