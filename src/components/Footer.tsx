import type { Profile } from '../types'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

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
        <div className="max-w-6xl mx-auto py-10">
          {/* System Info */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Engineer Identity */}
            <div>
              <Button
                variant="ghost"
                onClick={scrollToTop}
                className="font-mono text-lg font-bold mb-4 text-text-primary hover:text-primary transition-colors p-0 h-auto"
              >
                {profile.name}
              </Button>
              <p className="text-text-secondary text-sm font-mono leading-relaxed mb-6">
                // Senior System Engineer specializing in scalable backend
                <br />
                // architectures and AI-driven solutions
              </p>
              
              {/* Technical Links */}
              <div className="flex gap-3">
                {Object.entries(profile.social).map(([platform, url]) => {
                  if (platform === 'portfolio') return null // Skip portfolio link
                  const labelMap: Record<string, string> = {
                    github: 'GH',
                    linkedin: 'IN',
                    twitter: 'X',
                    medium: 'M',
                    stackoverflow: 'SO',
                  }
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-background border border-gray-800 rounded flex items-center justify-center text-text-secondary hover:border-primary/50 hover:text-primary transition-all duration-200"
                      aria-label={`${platform} profile`}
                    >
                      <span className="font-mono text-xs">
                        {labelMap[platform] || platform.slice(0, 2).toUpperCase()}
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Navigation Interface */}
            <div>
              <h3 className="text-xs font-mono text-primary mb-4 flex items-center gap-2">
                <span>NAVIGATION</span>
                <Separator className="flex-1" />
              </h3>
              <ul className="space-y-3">
                {footerSections.map((section) => (
                  <li key={section.label}>
                    <Button
                      variant="ghost"
                      onClick={() => scrollToSection(section.href.slice(1))}
                      className="font-mono text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 group p-0 h-auto justify-start"
                    >
                      <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-primary"></span>
                      {section.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            {/* System Status */}
            <div>
              <h3 className="text-xs font-mono text-secondary mb-4 flex items-center gap-2">
                <span>SYSTEM STATUS</span>
                <Separator className="flex-1" />
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-green-500/10 border-green-500/20 text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    Available for hire
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    Accepting projects
                  </Badge>
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
                  Resume
                </a>
              </div>
            </div>
          </div>

          {/* Terminal Footer */}
          <div className="pt-8 text-center border-t border-gray-800">
            <Separator className="mb-8" />
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs">
              <div className="text-text-secondary">
                © {currentYear} {profile.name} // All rights reserved
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
