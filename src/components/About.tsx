import type { Profile } from '../types'
import { useEffect, useState } from 'react'

interface AboutProps {
  profile: Profile
}

export default function About({ profile }: AboutProps) {
  const [projectsData, setProjectsData] = useState<any>(null)
  
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

  const stats = [
    { label: 'Years Experience', value: calculateYearsExperience() },
    { label: 'Systems Built', value: calculateSystemsBuilt() },
    { label: 'Clients Served', value: '15+' },
    { label: 'Tech Stack Size', value: '25+' }
  ]

  return (
    <section id="about" className="py-20 bg-surface">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="section-title mb-8">System Engineer Profile</h2>
            <p className="text-lg text-text-secondary max-w-3xl font-mono leading-relaxed">
              // Senior engineer with focus on scalable backend systems, cloud architecture, and AI integration
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left - Technical Summary */}
            <div className="lg:col-span-2 space-y-8">
              <div className="card">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-mono text-sm font-bold">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold text-text-primary">{profile.name}</h3>
                    <p className="text-text-secondary font-mono">{profile.role}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-mono text-primary mb-3 flex items-center gap-2">
                    <span>TECHNICAL SUMMARY</span>
                    <div className="flex-1 h-px bg-gray-800"></div>
                  </div>
                  
                  <p className="text-text-secondary leading-relaxed">
                    {profile.summary}
                  </p>
                  
                  <p className="text-text-secondary leading-relaxed">
                    Specialized in designing event-driven architectures for high-throughput systems, 
                    with expertise in microservices patterns, serverless computing, and AI/LLM integration. 
                    Focus on measurable performance improvements and cost optimization strategies.
                  </p>

                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="text-xs font-mono text-primary mb-3">CORE EXPERTISE</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-text-secondary">Backend Systems:</span>
                        <div className="font-mono text-text-primary">Python, TypeScript, Microservices</div>
                      </div>
                      <div>
                        <span className="text-text-secondary">Cloud Architecture:</span>
                        <div className="font-mono text-text-primary">AWS, Azure, Serverless</div>
                      </div>
                      <div>
                        <span className="text-text-secondary">Messaging:</span>
                        <div className="font-mono text-text-primary">Redis, Kafka, Event-Driven</div>
                      </div>
                      <div>
                        <span className="text-text-secondary">AI/LLM:</span>
                        <div className="font-mono text-text-primary">LangChain, RAG, OpenAI</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Stats & Contact */}
            <div className="space-y-8">
              {/* Stats */}
              <div className="card">
                <div className="text-xs font-mono text-primary mb-6 flex items-center gap-2">
                  <span>METRICS</span>
                  <div className="flex-1 h-px bg-gray-800"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-background rounded border border-gray-800">
                      <div className="text-2xl font-mono font-bold text-primary mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-text-secondary font-mono">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="card">
                <div className="text-xs font-mono text-primary mb-6 flex items-center gap-2">
                  <span>CONTACT</span>
                  <div className="flex-1 h-px bg-gray-800"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-surface border border-gray-800 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary font-mono">Location</p>
                      <p className="font-mono text-text-primary">{profile.contact?.location || profile.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-surface border border-gray-800 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary font-mono">Email</p>
                      <a href={`mailto:${profile.contact?.email || profile.email}`} className="font-mono text-primary hover:text-primary/80 text-sm">
                        {profile.contact?.email || profile.email}
                      </a>
                    </div>
                  </div>

                  {profile.availability.status === 'open' && (
                    <div className="pt-4 border-t border-gray-800">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-text-secondary font-mono">{profile.availability.message}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}