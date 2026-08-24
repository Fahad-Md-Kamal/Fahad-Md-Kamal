import { useEffect, useState } from 'react'
import type { Profile } from '../types'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  profile: Profile
}

export default function Header({ profile }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Blog', href: '#blogs' },
    { label: 'Contact', href: '#contact' },
  ]

  const resumeLink = profile.resumeUrl || 'https://flowcv.com/resume/69kur1fdef'

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsMobileOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass border-b border-border/60 shadow-[0_1px_0_0_rgba(255,255,255,0.03)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <button
            onClick={() => scrollToSection('hero')}
            className="group flex items-center gap-2.5"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary text-background font-display font-bold text-sm shadow-glow transition-transform duration-200 group-hover:scale-105">
              {profile.name.split(' ').map(word => word[0]).join('')}
            </span>
            <span className="hidden sm:inline font-display font-semibold text-text-primary group-hover:text-primary transition-colors">
              {profile.name}
            </span>
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href.slice(1))}
                className="group relative px-3 py-2 text-sm text-text-secondary hover:text-text-primary font-medium transition-colors"
              >
                {link.label}
                <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </button>
            ))}
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white text-sm font-medium px-4 py-2 shadow-glow hover:-translate-y-0.5 transition-all duration-200"
            >
              Resume
            </a>
          </div>

          {/* Mobile trigger */}
          <div className="md:hidden">
            <Button variant="outline" size="sm" onClick={() => setIsMobileOpen(o => !o)}>
              {isMobileOpen ? 'Close' : 'Menu'}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <div className="md:hidden mt-2 mb-4 space-y-1 glass rounded-2xl border border-border/60 p-2 shadow-soft">
            {navLinks.map(link => (
              <Button
                key={link.label}
                variant="ghost"
                className="w-full justify-start font-medium"
                onClick={() => scrollToSection(link.href.slice(1))}
              >
                {link.label}
              </Button>
            ))}
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white text-sm font-medium px-4 py-2.5 mt-2"
            >
              Resume
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
