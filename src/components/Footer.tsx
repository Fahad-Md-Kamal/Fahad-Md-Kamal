import type { Profile } from '../types'

interface FooterProps {
  profile: Profile
}

export default function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  const footerSections = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-surface border-t border-gray-800">
      <div className="section-container">
        <div className="max-w-6xl mx-auto py-16">
          {/* System Info */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Engineer Identity */}
            <div>
              <button
                onClick={scrollToTop}
                className="font-mono text-lg font-bold mb-4 text-text-primary hover:text-primary transition-colors"
              >
                {profile.name}
              </button>
              <p className="text-text-secondary text-sm font-mono leading-relaxed mb-6">
                // Senior System Engineer specializing in scalable backend
                <br />
                // architectures and AI-driven solutions
              </p>
              
              {/* Technical Links */}
              <div className="flex gap-3">
                {Object.entries(profile.social).map(([platform, url]) => {
                  if (platform === 'portfolio') return null // Skip portfolio link
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-background border border-gray-800 rounded flex items-center justify-center text-text-secondary hover:border-primary/50 hover:text-primary transition-all duration-200"
                      aria-label={`${platform} profile`}
                    >
                      {platform === 'github' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      )}
                      {platform === 'linkedin' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      )}
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Navigation Interface */}
            <div>
              <h3 className="text-xs font-mono text-primary mb-4 flex items-center gap-2">
                <span>NAVIGATION</span>
                <div className="flex-1 h-px bg-gray-800"></div>
              </h3>
              <ul className="space-y-3">
                {footerSections.map((section) => (
                  <li key={section.label}>
                    <button
                      onClick={() => scrollToSection(section.href.slice(1))}
                      className="font-mono text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-primary"></span>
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* System Status */}
            <div>
              <h3 className="text-xs font-mono text-secondary mb-4 flex items-center gap-2">
                <span>SYSTEM STATUS</span>
                <div className="flex-1 h-px bg-gray-800"></div>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-mono text-sm text-text-secondary">Available for hire</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-mono text-sm text-text-secondary">Accepting new projects</span>
                </div>
                <a
                  href={profile.resumeUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono text-sm group"
                >
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Resume.pdf
                </a>
              </div>
            </div>
          </div>

          {/* Terminal Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs">
              <div className="text-text-secondary">
                © {currentYear} {profile.name} // All rights reserved
              </div>
              
              <div className="flex items-center gap-6 text-text-secondary">
                <span>Built with React + TypeScript + Tailwind</span>
                <div className="flex items-center gap-2">
                  <span className="text-primary">localhost:3002</span>
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}