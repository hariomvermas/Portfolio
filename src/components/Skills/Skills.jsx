import React from 'react'
import { motion } from 'framer-motion'
import skills from '../../data/skills.js'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import './Skills.css'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const chip = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  show:   { opacity: 1, scale: 1,    y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
}
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] } },
})

export default function Skills() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section id="skills" className="skills section" ref={ref} aria-labelledby="skills-heading">
      <div className="container">
        <motion.p className="section-label" variants={fadeUp(0)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          GET /skills
        </motion.p>
        <motion.h2 id="skills-heading" className="skills__heading" variants={fadeUp(0.08)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          Skills
        </motion.h2>

        <div className="skills__groups">
          {skills.map((group, gi) => (
            <motion.div
              key={group.group}
              className="skills__group"
              variants={fadeUp(0.1 + gi * 0.06)}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
            >
              <p className="skills__group-label">{group.group}</p>
              <motion.ul
                className="skills__chips"
                role="list"
                variants={container}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
              >
                {group.items.map(item => (
                  <motion.li key={item} className="skills__chip" variants={chip}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
