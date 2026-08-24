import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { ProjectsData, Project } from '../types'
import { Button } from './ui/button'
import { IconLayers } from './icons'

interface ProjectsProps {
  projects: ProjectsData
}

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project) => void
}

const MAX_VISIBLE_TECH = 4

function resolveAsset(path: string) {
  if (!path) return path
  if (path.startsWith('http')) return path
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

function ProjectImage({ project, className }: { project: Project; className: string }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className={className}>
      {project.image && !imageError ? (
        <img
          src={resolveAsset(project.image)}
          alt={`${project.title} architecture overview`}
          className="absolute inset-0 w-full h-full object-cover object-top"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-text-secondary/70">
          <IconLayers className="w-8 h-8" />
          <span className="text-xs font-mono uppercase tracking-wider">{project.category}</span>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const visibleTech = project.technologies.slice(0, MAX_VISIBLE_TECH)
  const hiddenCount = project.technologies.length - visibleTech.length

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(project) } }}
      className="group hover:border-primary/50 hover:-translate-y-1 hover:shadow-glow transition-all duration-300 flex flex-col h-full overflow-hidden cursor-pointer"
    >
      <ProjectImage
        project={project}
        className="relative aspect-[16/9] w-full border-b border-border/60 overflow-hidden bg-gradient-to-br from-primary/10 via-surface to-secondary/10"
      />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg font-display font-semibold text-text-primary group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          {project.featured && (
            <Badge variant="default" className="border-primary text-primary bg-primary/10 flex-shrink-0">
              Featured
            </Badge>
          )}
        </div>
        <CardDescription className="text-text-secondary text-sm leading-relaxed line-clamp-2">
          {project.shortDescription}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col justify-end">
        <div className="flex flex-wrap gap-2 mb-4">
          {visibleTech.map((tech, index) => (
            <Badge
              key={index}
              variant="outline"
              className="font-mono text-xs"
              style={{
                borderBottomColor: tech.color,
                borderBottomWidth: '2px',
                borderBottomStyle: 'solid'
              }}
            >
              {tech.name}
            </Badge>
          ))}
          {hiddenCount > 0 && (
            <Badge variant="outline" className="font-mono text-xs text-text-secondary">
              +{hiddenCount} more
            </Badge>
          )}
        </div>
        <div className="text-sm text-primary font-medium flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
          View details
          <span aria-hidden="true">→</span>
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 overflow-y-auto overscroll-contain"
      onClick={onClose}
    >
      <div
        className="max-w-5xl w-full max-h-[85vh] overflow-y-auto bg-surface rounded-2xl border border-border/60 shadow-glow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <ProjectImage
          project={project}
          className="relative aspect-[16/9] w-full border-b border-border/60 overflow-hidden bg-gradient-to-br from-primary/10 via-surface to-secondary/10"
        />

        <div className="flex items-start justify-between gap-4 p-6 pb-0">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-2xl font-display font-semibold text-text-primary">{project.title}</h3>
              {project.featured && (
                <Badge variant="default" className="border-primary text-primary bg-primary/10">
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">{project.shortDescription}</p>
          </div>
          <Button size="sm" variant="ghost" onClick={onClose} aria-label="Close">
            Close
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {project.context && (
            <div className="p-3 bg-background border-l-2 border-secondary rounded-r">
              <div className="text-xs font-mono uppercase tracking-wider text-secondary mb-1">Context</div>
              <p className="text-sm text-text-secondary leading-relaxed">{project.context}</p>
            </div>
          )}

          {project.architecture && (
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                <span>Architecture</span>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-text-secondary">Pattern:</span>
                  <div className="font-mono text-text-primary">{project.architecture.pattern}</div>
                </div>
                <div>
                  <span className="text-text-secondary">Scale:</span>
                  <div className="font-mono text-primary">{project.architecture.scale}</div>
                </div>
                <div className="col-span-2">
                  <span className="text-text-secondary">Infrastructure:</span>
                  <div className="font-mono text-text-primary">{project.architecture.infrastructure}</div>
                </div>
              </div>
            </div>
          )}

          {project.impact && (
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                <span>Impact</span>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(project.impact).map(([key, value]) => (
                  <div key={key} className="text-center p-2 rounded-xl border border-border/60 bg-background/40">
                    <div className="text-sm font-mono font-bold text-primary">{value}</div>
                    <div className="text-xs text-text-secondary capitalize">{key.replace('_', ' ')}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
              <span>Tech Stack</span>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="font-mono text-xs"
                  style={{
                    borderBottomColor: tech.color,
                    borderBottomWidth: '2px',
                    borderBottomStyle: 'solid'
                  }}
                >
                  {tech.name}
                </Badge>
              ))}
            </div>
          </div>

          {project.design_decisions && (
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-secondary mb-3 flex items-center gap-2">
                <span>Design Decisions</span>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
              </div>
              <ul className="text-sm text-text-secondary space-y-2">
                {project.design_decisions.map((decision, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Links */}
        <div className="flex gap-3 p-6 pt-0">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 px-3 bg-primary text-background hover:bg-primary/90 transition-colors font-mono text-sm rounded-xl"
            >
              Live Site
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 px-3 border border-border/60 text-text-secondary hover:text-primary hover:border-primary/50 transition-all font-mono text-sm rounded-xl"
            >
              Code
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 px-3 border border-secondary text-secondary hover:bg-secondary/10 hover:border-secondary/70 transition-all font-mono text-sm rounded-xl"
            >
              Demo
            </a>
          )}
          {!project.links.live && !project.links.github && !project.links.demo && (
            <div className="flex-1 text-center py-2 px-3 border border-border/60 text-text-secondary/60 font-mono text-sm rounded-xl cursor-not-allowed">
              Private Project
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects({ projects }: ProjectsProps) {
  // Separate regular projects and AI projects
  const systemsProjects = projects.projects || []
  const aiProjects = projects.aiProjects || []
  const allProjects = [...systemsProjects, ...aiProjects]

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-20 md:py-28 bg-background/85">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <div className="section-eyebrow">Selected Work</div>
            <h2 className="section-title">Engineering Systems</h2>
            <p className="text-lg text-text-secondary max-w-3xl mb-8">
              Production systems built for scale, reliability, and maintainability.
              Focus on architecture decisions, performance impact, and real-world constraints.
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="w-full mb-12 grid grid-cols-1 sm:grid-cols-3 h-auto">
              <TabsTrigger value="all" className="font-mono text-xs md:text-sm p-2 md:p-3">
                <span className="hidden sm:inline">All Projects ({allProjects.length})</span>
                <span className="sm:hidden">All ({allProjects.length})</span>
              </TabsTrigger>
              <TabsTrigger value="systems" className="font-mono text-xs md:text-sm p-2 md:p-3">
                <span className="hidden sm:inline">Backend Systems ({systemsProjects.length})</span>
                <span className="sm:hidden">Backend ({systemsProjects.length})</span>
              </TabsTrigger>
              <TabsTrigger value="ai" className="font-mono text-xs md:text-sm p-2 md:p-3">
                <span className="hidden sm:inline">AI & LLM Systems ({aiProjects.length})</span>
                <span className="sm:hidden">AI ({aiProjects.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-12">
                {systemsProjects.length > 0 && (
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <h3 className="text-xl font-display text-primary">Backend & Infrastructure</h3>
                      <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8">
                      {systemsProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
                      ))}
                    </div>
                  </div>
                )}
                {aiProjects.length > 0 && (
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <h3 className="text-xl font-display text-secondary">AI & LLM Systems</h3>
                      <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8">
                      {aiProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="systems">
              <div className="space-y-12">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xl font-display text-primary">Backend & Infrastructure</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-8">
                    {systemsProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai">
              <div className="space-y-12">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xl font-display text-secondary">AI & LLM Systems</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-8">
                    {aiProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Engineering Notes Section */}
          <Card className="mt-20 bg-surface border-border/60">
            <CardHeader>
              <CardTitle className="text-lg font-display text-primary">Engineering Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-background border-border/60">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xs font-mono text-secondary">TRADE-OFFS</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-text-secondary leading-relaxed">
                    Redis Pub/Sub vs Kafka: Chosen Redis for sub-100ms latency requirements in threat processing,
                    accepting trade-off in total ordering guarantees for real-time performance.
                  </CardContent>
                </Card>

                <Card className="bg-background border-border/60">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xs font-mono text-secondary">SCALE PATTERNS</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-text-secondary leading-relaxed">
                    Event-driven architecture with circuit breakers enables 10K+ req/sec while maintaining
                    system stability during downstream service degradation.
                  </CardContent>
                </Card>

                <Card className="bg-background border-border/60">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xs font-mono text-secondary">LESSONS LEARNED</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-text-secondary leading-relaxed">
                    Serverless cost optimization: 40% savings achieved by right-sizing function memory and
                    implementing intelligent cold-start warming strategies.
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center mt-16">
            <p className="text-text-secondary mb-6 font-mono text-sm">
              // More systems and architectural decisions on GitHub
            </p>
            <Button
              asChild
              href="https://github.com/fahad-md-kamal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono"
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Repository
              </span>
            </Button>
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}
