import { useEffect, useState } from 'react'
import type { Profile } from '../types'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
interface HeroProps {
  profile: Profile
  projectCount: number
}

export default function Hero({ profile, projectCount }: HeroProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [avatarError, setAvatarError] = useState(false)
  
  const resolveAsset = (path: string) => {
    if (!path) return path
    if (path.startsWith('http')) return path
    const base = import.meta.env.BASE_URL || '/'
    return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
  }
  const avatarSrc = resolveAsset(profile.avatar)
  
  const techStack = ['Python • FastAPI • Django', 'TypeScript • React • Node.js', 'AWS • Azure • Docker', 'LangChain • RAG • LLMs']

  // Calculate years of experience dynamically
  const calculateYearsExperience = () => {
    if (!profile.career?.startDate) return '5+'
    
    const startDate = new Date(profile.career.startDate)
    const today = new Date()
    const years = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    
    return years >= 5 ? `${years}+` : `${years}+`
  }
  
  // Calculate systems built from projects
  const calculateSystemsBuilt = () => `${projectCount}+`

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
    <section id="hero" className="min-h-screen flex items-center justify-center bg-background pt-16 pb-8 px-4">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Profile Avatar */}
          <div className="flex justify-center mb-6 sm:mb-8 animate-fade-in">
            <div className="relative">
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-gray-800 shadow-lg">
                <AvatarImage 
                  src={avatarSrc} 
                  alt={profile.name}
                  className="object-cover"
                  onError={() => setAvatarError(true)}
                  style={avatarError ? { display: 'none' } : undefined}
                />
                <AvatarFallback className={`bg-primary text-white text-2xl sm:text-4xl font-bold ${avatarError ? '' : 'hidden'}`}>
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Badge 
                variant="secondary" 
                className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-500 border-4 border-background p-0 flex items-center justify-center"
              >
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse"></div>
              </Badge>
            </div>
          </div>

          {/* Main Title - Direct and Technical */}
          <div className="mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold text-text-primary mb-4 sm:mb-6 leading-tight text-center">
              {profile.name}
            </h1>
            <h2 className="text-lg sm:text-2xl lg:text-4xl text-primary mb-3 sm:mb-4 text-center font-mono">
              Senior Software Engineer
            </h2>
            <div className="text-base sm:text-xl lg:text-3xl text-text-secondary mb-6 sm:mb-8 leading-relaxed text-center px-4">
              Building cloud-native, event-driven systems & AI platforms
            </div>
            {/* Tech Stack Rotation */}
            <div className="flex items-center justify-center mb-6 sm:mb-8 px-4">
              <Badge variant="outline" className="text-sm sm:text-lg font-mono px-3 sm:px-4 py-2 bg-background/50">
                <span className="mr-2 text-secondary">// </span>
                <span className="min-w-fit text-xs sm:text-base">
                  {displayedText}
                  <span className="animate-pulse text-secondary">_</span>
                </span>
              </Badge>
            </div>
          </div>

          {/* Key Metrics - Signal Dense */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8 sm:mb-12 animate-slide-up px-4" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-surface/50 border-gray-800 hover:bg-surface/80 transition-colors">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-bold text-primary mb-1">{calculateYearsExperience()}</div>
                <div className="text-xs sm:text-sm text-text-secondary font-mono">Years Experience</div>
              </CardContent>
            </Card>
            <Card className="bg-surface/50 border-gray-800 hover:bg-surface/80 transition-colors">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-bold text-primary mb-1">{calculateSystemsBuilt()}</div>
                <div className="text-xs sm:text-sm text-text-secondary font-mono">Systems Built</div>
              </CardContent>
            </Card>
            <Card className="bg-surface/50 border-gray-800 hover:bg-surface/80 transition-colors">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-bold text-primary mb-1">99.9%</div>
                <div className="text-xs sm:text-sm text-text-secondary font-mono">Uptime Achieved</div>
              </CardContent>
            </Card>
            <Card className="bg-surface/50 border-gray-800 hover:bg-surface/80 transition-colors">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-bold text-primary mb-1">15+</div>
                <div className="text-xs sm:text-sm text-text-secondary font-mono">Clients Served</div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Links - Clean and Professional */}
          <div className="flex flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 animate-slide-up px-4" style={{ animationDelay: '0.4s' }}>
            <Button
              onClick={scrollToProjects}
              size="lg"
              className="font-mono px-6 sm:px-8 py-3 bg-primary hover:bg-primary/80 w-full sm:w-auto"
            >
              View Systems ↗
            </Button>
            <Button
              asChild
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
              className="font-mono px-6 sm:px-8 py-3 border-gray-800 hover:bg-surface/80 w-full sm:w-auto"
            >
              View Resume ↓
            </Button>
          </div>

          {/* Professional Links */}
          <div className="flex justify-center flex-wrap gap-4 sm:gap-6 mb-8 sm:mb-12 animate-fade-in px-4" style={{ animationDelay: '0.6s' }}>
            <Button
              variant="ghost"
              size="sm"
              asChild
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary font-mono text-xs sm:text-sm"
            >
              <span className="flex items-center gap-1 sm:gap-2">
                <span className="text-sm">🐙</span>
                <span className="hidden sm:inline">GitHub</span>
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary font-mono text-xs sm:text-sm"
            >
              <span className="flex items-center gap-1 sm:gap-2">
                <span className="text-sm">🔗</span>
                <span className="hidden sm:inline">LinkedIn</span>
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              href={profile.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary font-mono text-xs sm:text-sm"
            >
              <span className="flex items-center gap-1 sm:gap-2">
                <span className="text-sm">✖️</span>
                <span className="hidden sm:inline">X (Twitter)</span>
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              href={`mailto:${profile.contact.email}`}
              className="text-text-secondary hover:text-primary font-mono text-xs sm:text-sm"
            >
              <span className="flex items-center gap-1 sm:gap-2">
                <span className="text-sm">✉️</span>
                <span className="hidden sm:inline">Email</span>
              </span>
            </Button>
          </div>

          {/* Location & Status */}
          <div className="text-center animate-fade-in px-4" style={{ animationDelay: '0.8s' }}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-text-secondary text-xs sm:text-sm font-mono">
              <Badge variant="secondary" className="flex items-center gap-2">
                <span className="text-sm">📍</span>
                {profile.contact.location}
              </Badge>
              {profile.availability.status === 'open' && (
                <Badge variant="outline" className="flex items-center gap-2 border-green-500/20 text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs">{profile.availability.message}</span>
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
