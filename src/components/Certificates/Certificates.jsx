import React from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiAward } from 'react-icons/fi'
import certificates from '../../data/certificates.js'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import './Certificates.css'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] } },
})

export default function Certificates() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section id="certificates" className="certificates section" ref={ref} aria-labelledby="certificates-heading">
      <div className="container">
        <motion.p className="section-label" variants={fadeUp(0)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          GET /certificates
        </motion.p>
        <motion.h2 id="certificates-heading" className="certificates__heading" variants={fadeUp(0.08)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          Certificates
        </motion.h2>

        <div className="certificates__grid">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              className="cert-card"
              variants={fadeUp(0.1 + i * 0.05)}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
            >
              <div className="cert-card__icon" aria-hidden="true">
                <FiAward size={18} />
              </div>
              <div className="cert-card__body">
                <p className="cert-card__title">{cert.title}</p>
                <p className="cert-card__issuer">{cert.issuer}</p>
                <div className="cert-card__footer">
                  <div className="cert-card__badges">
                    {cert.date && <span className="cert-card__badge">{cert.date}</span>}
                    {cert.score && <span className="cert-card__badge cert-card__badge--score">{cert.score}</span>}
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-card__view"
                      aria-label={`View certificate: ${cert.title}`}
                    >
                      View <FiExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
