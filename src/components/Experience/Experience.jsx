import React from 'react'
import { motion } from 'framer-motion'
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi'
import experience from '../../data/experience.js'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import './Experience.css'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
})

export default function Experience() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section id="experience" className="experience section" ref={ref} aria-labelledby="experience-heading">
      <div className="container">
        <motion.p className="section-label" variants={fadeUp(0)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          GET /experience
        </motion.p>
        <motion.h2 id="experience-heading" className="experience__heading" variants={fadeUp(0.08)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          Experience
        </motion.h2>

        <div className="timeline">
          {/* Animated vertical line */}
          <motion.div
            className="timeline__line"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {experience.map((item, i) => (
            <motion.article
              key={item.id}
              className="timeline__item"
              variants={fadeUp(0.2 + i * 0.15)}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              aria-label={`${item.role} at ${item.company}`}
            >
              <div className="timeline__dot" aria-hidden="true" />

              <div className="timeline__card">
                <div className="timeline__card-header">
                  <div>
                    <h3 className="timeline__role">{item.role}</h3>
                    <p className="timeline__company">
                      <FiBriefcase size={13} aria-hidden="true" />
                      {item.company}
                    </p>
                  </div>
                  <div className="timeline__meta">
                    <span className="timeline__meta-item">
                      <FiCalendar size={12} aria-hidden="true" />
                      {item.startDate} — {item.endDate}
                    </span>
                    <span className="timeline__meta-item">
                      <FiMapPin size={12} aria-hidden="true" />
                      {item.type}
                    </span>
                  </div>
                </div>

                <p className="timeline__desc">{item.description}</p>

                <ul className="timeline__skills" role="list" aria-label="Skills used">
                  {item.skills.map(s => (
                    <li key={s} className="timeline__skill-chip">{s}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
