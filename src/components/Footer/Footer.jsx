import React from 'react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import profile from '../../data/profile.js'
import links from '../../data/links.js'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__left">
          <span className="footer__logo">
            <span className="footer__logo-bracket">&lt;</span>HV<span className="footer__logo-bracket">/&gt;</span>
          </span>
          <span className="footer__copy">
            © {year} {profile.name}. Built with React + Vite.
          </span>
        </div>

        <div className="footer__links">
          <a href={`mailto:${profile.email}`} className="footer__link" aria-label="Send email">
            <FiMail size={16} aria-hidden="true" />
          </a>
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer"
              className="footer__link" aria-label="GitHub profile">
              <FiGithub size={16} aria-hidden="true" />
            </a>
          )}
          {links.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer"
              className="footer__link" aria-label="LinkedIn profile">
              <FiLinkedin size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
