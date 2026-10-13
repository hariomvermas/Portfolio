import React, { useState, useEffect, useRef } from 'react'
import CardBackground from './components/CardBackground/CardBackground.jsx'
import Navbar       from './components/Navbar/Navbar.jsx'
import Hero         from './components/Hero/Hero.jsx'
import About        from './components/About/About.jsx'
import Skills       from './components/Skills/Skills.jsx'
import Projects     from './components/Projects/Projects.jsx'
import Experience   from './components/Experience/Experience.jsx'
import Certificates from './components/Certificates/Certificates.jsx'
import Education    from './components/Education/Education.jsx'
import Contact      from './components/Contact/Contact.jsx'
import Footer       from './components/Footer/Footer.jsx'

function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    // Disable on touch devices and when user prefers reduced motion
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = glowRef.current
    if (!el) return
    const move = (e) => {
      el.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
      el.style.opacity = '1'
    }
    const leave = () => { el.style.opacity = '0' }
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
      }}
    />
  )
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') ??
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    }
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <div className="app">
      <CardBackground />
      <CursorGlow />
      <Navbar theme={theme} onThemeToggle={toggleTheme} />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
