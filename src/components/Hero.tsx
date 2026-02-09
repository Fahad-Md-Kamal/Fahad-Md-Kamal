import { useEffect, useState } from 'react'
import type { Profile } from '../types'

interface HeroProps {
  profile: Profile
}

export default function Hero({ profile }: HeroProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const techStack = ['Python • FastAPI • Django', 'TypeScript • React • Node.js', 'AWS • Azure • Docker', 'LangChain • RAG • LLMs']

  useEffect(() => {
    const currentTech = techStack[currentIndex]
    const speed = isDeleting ? 30 : 80
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentTech.length) {
          setDisplayedText(currentTech.slice(0, displayedText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % techStack.length)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [displayedText, currentIndex, isDeleting, techStack])

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-background pt-20">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Profile Avatar */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-800 shadow-lg"
                onError={(e) => {
                  console.log('Image failed to load:', profile.avatar)
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const fallback = target.parentElement?.querySelector('.avatar-fallback') as HTMLElement
                  if (fallback) fallback.style.display = 'flex'
                }}
                onLoad={() => console.log('Image loaded successfully:', profile.avatar)}
              />
              {/* Fallback avatar */}
              <div className="avatar-fallback w-32 h-32 rounded-full bg-primary flex items-center justify-center border-4 border-gray-800 shadow-lg" style={{ display: 'none' }}>
                <span className="text-4xl font-bold text-white">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-background flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Main Title - Direct and Technical */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6 leading-tight text-center">
              {profile.name}
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-primary mb-4 text-center font-mono">
              Senior Software Engineer
            </h2>
            <div className="text-xl sm:text-2xl lg:text-3xl text-text-secondary mb-8 leading-relaxed text-center">
              Building cloud-native, event-driven systems & AI platforms
            </div>
            
            {/* Tech Stack Rotation */}
            <div className="text-lg sm:text-xl font-mono text-primary mb-8 h-8 flex items-center justify-center">
              <span className="mr-1">// </span>
              <span className="min-w-fit">
                {displayedText}
                <span className="animate-pulse text-secondary">_</span>
              </span>
            </div>
          </div>

          {/* Key Metrics - Signal Dense */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="card text-center">
              <div className="text-2xl font-bold text-primary mb-1">5+</div>
              <div className="text-sm text-text-secondary font-mono">Years</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-primary mb-1">5M+</div>
              <div className="text-sm text-text-secondary font-mono">Records Processed</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
              <div className="text-sm text-text-secondary font-mono">Uptime</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-primary mb-1">40%</div>
              <div className="text-sm text-text-secondary font-mono">Latency Reduced</div>
            </div>
          </div>

          {/* Contact Links - Clean and Professional */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={scrollToProjects}
              className="btn-primary text-base px-8 py-3 font-mono"
            >
              View Systems
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base px-8 py-3 font-mono"
            >
              Resume.pdf
            </a>
          </div>

          {/* Professional Links */}
          <div className="flex justify-center space-x-8 mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-mono text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-mono text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.contact.email}`}
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-mono text-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Email
            </a>
          </div>

          {/* Location & Status */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="inline-flex items-center gap-4 text-text-secondary text-sm font-mono">
              <span>📍 {profile.contact.location}</span>
              {profile.availability.status === 'open' && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>{profile.availability.message}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}