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
          ? 'bg-background/95 backdrop-blur-sm border-b border-gray-800 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Button
            variant="ghost"
            onClick={() => scrollToSection('hero')}
            className="font-mono font-bold text-lg text-primary hover:text-primary/80 p-0 h-auto"
          >
            {profile.name.split(' ').map(word => word[0]).join('')}
          </Button>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {navLinks.map(link => (
              <Button
                key={link.label}
                variant="ghost"
                className="text-text-secondary hover:text-primary font-mono font-medium"
                onClick={() => scrollToSection(link.href.slice(1))}
              >
                {link.label}
              </Button>
            ))}
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary font-mono px-4 py-2 rounded-md"
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
          <div className="md:hidden mt-3 space-y-2">
            {navLinks.map(link => (
              <Button
                key={link.label}
                variant="ghost"
                className="w-full justify-start font-mono"
                onClick={() => scrollToSection(link.href.slice(1))}
              >
                {link.label}
              </Button>
            ))}
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary font-mono px-4 py-2 rounded-md block text-center"
            >
              Resume
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
