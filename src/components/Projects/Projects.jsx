import React, { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi'
import projects from '../../data/projects.js'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import './Projects.css'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
})

// Derive a short endpoint slug from the project id
const toEndpoint = (id) => `/projects/${id}`

function ProjectCard({ project, index }) {
  const cardRef       = useRef(null)
  const prefersReduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt]       = useState({ x: 0, y: 0 })

  const onMouseMove = (e) => {
    if (prefersReduced) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8
    setTilt({ x, y })
  }
  const onMouseLeave = () => { setTilt({ x: 0, y: 0 }); setHovered(false) }

  const tiltStyle = prefersReduced
    ? {}
    : { transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }

  return (
    <motion.article
      ref={cardRef}
      className={`project-card${hovered ? ' project-card--hovered' : ''}`}
      variants={fadeUp(0.08 + index * 0.09)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      style={tiltStyle}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      // Keyboard access: the card itself is focusable; focusing it opens the
      // reveal panel so the Code/Live links become tabbable.
      tabIndex={0}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false)
      }}
      aria-label={`Project: ${project.title}`}
    >
      {/* ── Resting layer — always visible ── */}
      <div className="project-card__rest">
        <div className="project-card__rest-top">
          <span className="project-card__index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="project-card__endpoint" aria-hidden="true">
            {toEndpoint(project.id)}
          </span>
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        {/* Arrow hint — fades out on hover */}
        <span className="project-card__hint" aria-hidden="true">
          <FiArrowUpRight size={16} />
        </span>
      </div>

      {/* ── Reveal panel — slides up on hover ── */}
      <div className="project-card__reveal" aria-hidden={!hovered}>
        <p className="project-card__desc">{project.description}</p>

        <ul className="project-card__tech" role="list" aria-label="Technologies used">
          {project.tech.map(t => (
            <li key={t} className="project-card__tech-chip">{t}</li>
          ))}
        </ul>

        <div className="project-card__links">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="project-card__icon-link" aria-label={`${project.title} GitHub repository`}
              tabIndex={hovered ? 0 : -1}>
              <FiGithub size={16} aria-hidden="true" />
              <span>Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="project-card__icon-link" aria-label={`${project.title} live demo`}
              tabIndex={hovered ? 0 : -1}>
              <FiExternalLink size={16} aria-hidden="true" />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section id="projects" className="projects section" ref={ref} aria-labelledby="projects-heading">
      <div className="container">
        <motion.p className="section-label"
          variants={fadeUp(0)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          GET /projects
        </motion.p>
        <motion.h2 id="projects-heading" className="projects__heading"
          variants={fadeUp(0.08)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          Projects
        </motion.h2>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
