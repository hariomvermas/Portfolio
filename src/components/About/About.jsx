import React from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiBook, FiBriefcase } from 'react-icons/fi'
import profile from '../../data/profile.js'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import './About.css'

const FACT_ICONS = [FiMapPin, FiBook, FiBriefcase]

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
})

export default function About() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section id="about" className="about section" ref={ref} aria-labelledby="about-heading">
      <div className="container">
        <motion.p className="section-label" variants={fadeUp(0)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          GET /about
        </motion.p>
        <motion.h2 id="about-heading" className="about__heading" variants={fadeUp(0.08)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          About Me
        </motion.h2>

        <div className="about__grid">
          <motion.p className="about__summary" variants={fadeUp(0.16)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
            {profile.summary}
          </motion.p>

          <motion.div className="about__facts" variants={fadeUp(0.24)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
            {profile.quickFacts.map(({ label, value }, i) => {
              const Icon = FACT_ICONS[i] ?? FiBriefcase
              return (
                <div key={label} className="about__fact">
                  <span className="about__fact-icon"><Icon size={16} /></span>
                  <div>
                    <span className="about__fact-label">{label}</span>
                    <span className="about__fact-value">{value}</span>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
