import { useEffect, useState } from 'react'
import type { Profile } from '../types'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Github, Linkedin, Twitter, Mail, MapPin, ExternalLink, Download } from 'lucide-react'

interface HeroProps {
  profile: Profile
}

export default function Hero({ profile }: HeroProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [projectsData, setProjectsData] = useState<any>(null)
  
  const techStack = ['Python • FastAPI • Django', 'TypeScript • React • Node.js', 'AWS • Azure • Docker', 'LangChain • RAG • LLMs']

  useEffect(() => {
    // Load projects data to count systems built
    import('../data/projects.json').then(data => {
      setProjectsData(data)
    })
  }, [])
  
  // Calculate years of experience dynamically
  const calculateYearsExperience = () => {
    if (!profile.career?.startDate) return '5+'
    
    const startDate = new Date(profile.career.startDate)
    const today = new Date()
    const years = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    
    return years >= 5 ? `${years}+` : `${years}+`
  }
  
  // Calculate systems built from projects
  const calculateSystemsBuilt = () => {
    if (!projectsData) return '5+'
    
    const totalProjects = (projectsData.projects?.length || 0) + (projectsData.aiProjects?.length || 0)
    return `${totalProjects}+`
  }

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
              <Avatar className="w-32 h-32 border-4 border-gray-800 shadow-lg">
                <AvatarImage 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary text-white text-4xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Badge 
                variant="secondary" 
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500 border-4 border-background p-0 flex items-center justify-center"
              >
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </Badge>
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
            <div className="flex items-center justify-center mb-8">
              <Badge variant="outline" className="text-lg font-mono px-4 py-2 bg-background/50">
                <span className="mr-2 text-secondary">// </span>
                <span className="min-w-fit">
                  {displayedText}
                  <span className="animate-pulse text-secondary">_</span>
                </span>
              </Badge>
            </div>
          </div>

          {/* Key Metrics - Signal Dense */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-surface/50 border-gray-800 hover:bg-surface/80 transition-colors">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{calculateYearsExperience()}</div>
                <div className="text-sm text-text-secondary font-mono">Years Experience</div>
              </CardContent>
            </Card>
            <Card className="bg-surface/50 border-gray-800 hover:bg-surface/80 transition-colors">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{calculateSystemsBuilt()}</div>
                <div className="text-sm text-text-secondary font-mono">Systems Built</div>
              </CardContent>
            </Card>
            <Card className="bg-surface/50 border-gray-800 hover:bg-surface/80 transition-colors">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
                <div className="text-sm text-text-secondary font-mono">Uptime Achieved</div>
              </CardContent>
            </Card>
            <Card className="bg-surface/50 border-gray-800 hover:bg-surface/80 transition-colors">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-text-secondary font-mono">Clients Served</div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Links - Clean and Professional */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button
              onClick={scrollToProjects}
              size="lg"
              className="font-mono px-8 py-3 bg-primary hover:bg-primary/80"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Systems
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-mono px-8 py-3 border-gray-800 hover:bg-surface/80"
            >
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4 mr-2" />
                View Resume
              </a>
            </Button>
          </div>

          {/* Professional Links */}
          <div className="flex justify-center flex-wrap gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button variant="ghost" size="sm" asChild className="text-text-secondary hover:text-primary font-mono">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-text-secondary hover:text-primary font-mono">
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-text-secondary hover:text-primary font-mono">
              <a
                href={profile.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Twitter className="w-4 h-4" />
                X (Twitter)
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-text-secondary hover:text-primary font-mono">
              <a
                href={`mailto:${profile.contact.email}`}
                className="flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </Button>
          </div>

          {/* Location & Status */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="inline-flex items-center gap-4 text-text-secondary text-sm font-mono">
              <Badge variant="secondary" className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                {profile.contact.location}
              </Badge>
              {profile.availability.status === 'open' && (
                <Badge variant="outline" className="flex items-center gap-2 border-green-500/20 text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {profile.availability.message}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}