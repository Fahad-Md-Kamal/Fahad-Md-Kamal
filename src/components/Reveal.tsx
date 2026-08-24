import React from 'react'
import { useInView } from '../hooks/useInView'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: React.ElementType
  [key: string]: unknown
}

// Fade + slide-up wrapper for cards/images/blocks as they scroll into view.
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div', ...rest }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>()

  return React.createElement(
    Tag,
    {
      ref,
      className: `${className} transition-all duration-500 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`,
      style: { transitionDelay: `${delay}ms` },
      ...rest,
    },
    children
  )
}
