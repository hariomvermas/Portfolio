import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-80px 0px', ...options })
  // When reduced motion is preferred, treat everything as already in view
  return { ref, isInView: prefersReduced ? true : isInView }
}
