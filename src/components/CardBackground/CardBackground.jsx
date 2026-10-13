import React from 'react'
import './CardBackground.css'

// ─────────────────────────────────────────────────────────────────
//  TWEAK THESE CONSTANTS to adjust the look in one place
// ─────────────────────────────────────────────────────────────────
const CFG = {
  // Opacity per depth layer  (0 = invisible, 1 = fully opaque)
  opacity: {
    far:  0.10,
    mid:  0.16,
    near: 0.22,
  },
  // CSS blur per depth layer
  blur: {
    far:  '3.5px',
    mid:  '1.5px',
    near: '0px',
  },
  // Card width per depth layer (height is auto via aspect-ratio)
  size: {
    far:  '110px',
    mid:  '155px',
    near: '200px',
  },
  // Saturation filter (1 = full colour, 0 = greyscale)
  saturation: 0.35,
  // Base tilt angle (degrees). Each card gets a small random offset added.
  tilt: -17,
  // Drift animation durations (seconds). Staggered per card via delay.
  duration: {
    far:  90,
    mid:  65,
    near: 45,
  },
  // Bob (vertical float) amplitude in px and period in seconds
  bob: { amplitude: 18, period: 7 },
  // Rotation wobble amplitude in degrees and period in seconds
  wobble: { amplitude: 3, period: 11 },
}
// ─────────────────────────────────────────────────────────────────

const IMAGES = {
  ace:   '/assets/cards/Ekka-card.png',
  queen: '/assets/cards/queen-card.png',
  king:  '/assets/cards/king-card.png',
}

// 6 cards: each image used twice, spread across 3 depth layers.
// `mobileHide: true` marks the 3 cards hidden on screens < 768px.
// `startX` / `startY` are initial translate offsets (vw / vh) so cards
// are staggered across the screen and never all enter at the same time.
// The drift keyframe moves cards from bottom-left to top-right.
const CARDS = [
  // ── FAR layer ──
  {
    id: 'far-ace',
    img: IMAGES.ace,
    layer: 'far',
    tiltOffset: -1,
    startX: '10vw',
    startY: '60vh',
    delay: 0,
    durationOffset: 8,
    mobileHide: true,
  },
  {
    id: 'far-queen',
    img: IMAGES.queen,
    layer: 'far',
    tiltOffset: 2,
    startX: '70vw',
    startY: '80vh',
    delay: 38,
    durationOffset: -5,
    mobileHide: true,
  },
  // ── MID layer ──
  {
    id: 'mid-king',
    img: IMAGES.king,
    layer: 'mid',
    tiltOffset: -2,
    startX: '40vw',
    startY: '90vh',
    delay: 14,
    durationOffset: 4,
    mobileHide: false,
  },
  {
    id: 'mid-ace',
    img: IMAGES.ace,
    layer: 'mid',
    tiltOffset: 1,
    startX: '-10vw',
    startY: '30vh',
    delay: 52,
    durationOffset: -8,
    mobileHide: true,
  },
  // ── NEAR layer ──
  {
    id: 'near-queen',
    img: IMAGES.queen,
    layer: 'near',
    tiltOffset: -3,
    startX: '80vw',
    startY: '50vh',
    delay: 6,
    durationOffset: 3,
    mobileHide: false,
  },
  {
    id: 'near-king',
    img: IMAGES.king,
    layer: 'near',
    tiltOffset: 2,
    startX: '25vw',
    startY: '110vh',
    delay: 28,
    durationOffset: -4,
    mobileHide: false,
  },
]

// Build per-card CSS custom properties as an inline style object.
// All animation is driven by CSS keyframes — no JS on the animation loop.
function cardStyle(card) {
  const layer    = card.layer
  const tilt     = CFG.tilt + card.tiltOffset
  const duration = CFG.duration[layer] + card.durationOffset

  return {
    '--card-opacity':   CFG.opacity[layer],
    '--card-blur':      CFG.blur[layer],
    '--card-width':     CFG.size[layer],
    '--card-tilt':      `${tilt}deg`,
    '--card-duration':  `${duration}s`,
    '--card-delay':     `${card.delay}s`,
    '--card-start-x':   card.startX,
    '--card-start-y':   card.startY,
    '--card-saturate':  CFG.saturation,
    '--bob-amplitude':  `${CFG.bob.amplitude}px`,
    '--bob-period':     `${CFG.bob.period}s`,
    '--wobble-amp':     `${CFG.wobble.amplitude}deg`,
    '--wobble-period':  `${CFG.wobble.period}s`,
  }
}

export default function CardBackground() {
  return (
    <div
      className="card-bg"
      aria-hidden="true"
      role="presentation"
    >
      {/* Dark vignette — keeps centre readable */}
      <div className="card-bg__vignette" />

      {CARDS.map(card => (
        <div
          key={card.id}
          className={[
            'card-bg__card',
            `card-bg__card--${card.layer}`,
            card.mobileHide ? 'card-bg__card--mobile-hide' : '',
          ].join(' ').trim()}
          style={cardStyle(card)}
        >
          <img
            src={card.img}
            alt=""
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        </div>
      ))}
    </div>
  )
}
