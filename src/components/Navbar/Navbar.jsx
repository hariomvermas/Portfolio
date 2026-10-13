import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import './Navbar.css'

const NAV_ITEMS = [
  { label: 'About',      href: '#about',      api: '/about' },
  { label: 'Skills',     href: '#skills',     api: '/skills' },
  { label: 'Projects',   href: '#projects',   api: '/projects' },
  { label: 'Experience', href: '#experience', api: '/experience' },
  { label: 'Contact',    href: '#contact',    api: '/contact' },
]

export default function Navbar({ theme, onThemeToggle }) {
  const [active, setActive]     = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = NAV_ITEMS.map(n => n.href.slice(1))
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Skip-to-content target is <main id="main-content">
  return (
    <>
      <a href="#main-content" className="navbar__skip">Skip to main content</a>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <nav className="navbar__inner container" aria-label="Main navigation">
        <a href="#hero" className="navbar__logo" onClick={e => { e.preventDefault(); handleNav('#hero') }}>
          <span className="navbar__logo-bracket">&lt;</span>HV<span className="navbar__logo-bracket">/&gt;</span>
        </a>

        <ul className="navbar__links" role="list">
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <button
                className={`navbar__link${active === item.href.slice(1) ? ' navbar__link--active' : ''}`}
                onClick={() => handleNav(item.href)}
                aria-current={active === item.href.slice(1) ? 'location' : undefined}
              >
                <span className="navbar__link-api">{item.api}</span>
                <span className="navbar__link-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button className="navbar__theme-btn" onClick={onThemeToggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <button className="navbar__hamburger" onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div className="navbar__mobile"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            {NAV_ITEMS.map(item => (
              <button key={item.href}
                className={`navbar__mobile-link${active === item.href.slice(1) ? ' navbar__link--active' : ''}`}
                onClick={() => handleNav(item.href)}>
                <span className="navbar__link-api">{item.api}</span>
                <span className="navbar__link-label">{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  )
}
