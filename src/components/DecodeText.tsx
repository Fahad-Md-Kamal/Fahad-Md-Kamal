import React, { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'

const CHARS = '01'

interface DecodeTextProps {
  text: string
  as?: React.ElementType
  className?: string
  delay?: number
}

// Scrambles through binary digits, then resolves left-to-right into the
// real text once scrolled into view — the site's signature reveal effect.
export default function DecodeText({ text, as: Tag = 'span', className, delay = 0 }: DecodeTextProps) {
  const { ref, inView } = useInView<HTMLElement>()
  const [display, setDisplay] = useState(text)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const length = text.length
    const duration = Math.min(250 + length * 14, 900)
    let start: number | null = null
    let raf = 0

    const tick = (now: number) => {
      if (start === null) start = now + delay
      const elapsed = now - start
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      const progress = Math.min(elapsed / duration, 1)
      const revealCount = Math.floor(progress * length)

      let out = ''
      for (let i = 0; i < length; i++) {
        const ch = text[i]
        if (i < revealCount || /\s/.test(ch)) {
          out += ch
        } else {
          out += CHARS[(Math.random() * CHARS.length) | 0]
        }
      }
      setDisplay(out)

      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, text, delay])

  return React.createElement(
    Tag,
    { ref, className, 'aria-label': text },
    React.createElement('span', { 'aria-hidden': 'true' }, display)
  )
}
