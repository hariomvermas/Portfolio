import React from 'react'
import { motion } from 'framer-motion'
import { FiBook, FiCalendar, FiAward } from 'react-icons/fi'
import education from '../../data/education.js'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import './Education.css'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] } },
})

export default function Education() {
  const { ref, isInView } = useScrollReveal()
  const edu = education[0]

  return (
    <section id="education" className="education section" ref={ref} aria-labelledby="education-heading">
      <div className="container">
        <motion.p className="section-label" variants={fadeUp(0)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          GET /education
        </motion.p>
        <motion.h2 id="education-heading" className="education__heading" variants={fadeUp(0.08)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          Education
        </motion.h2>

        <motion.div className="edu-card" variants={fadeUp(0.16)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          <div className="edu-card__icon" aria-hidden="true">
            <FiBook size={22} />
          </div>
          <div className="edu-card__body">
            <h3 className="edu-card__degree">{edu.degree}</h3>
            <p className="edu-card__institution">{edu.institution}</p>
            <p className="edu-card__university">{edu.university}</p>
            <div className="edu-card__meta">
              <span className="edu-card__meta-item">
                <FiCalendar size={13} aria-hidden="true" />
                Expected {edu.expectedGraduation}
              </span>
              <span className="edu-card__meta-item edu-card__cgpa">
                <FiAward size={13} aria-hidden="true" />
                CGPA {edu.cgpa}
                <span className="edu-card__cgpa-note">({edu.cgpaNote})</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
