import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { ProjectsData, Project } from '../types'
import { Button } from './ui/button'

interface ProjectsProps {
  projects: ProjectsData
}

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
      {/* Project Header */}
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <CardTitle className="text-xl font-display font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <CardDescription className="text-text-secondary text-sm leading-relaxed mb-3">
              {project.shortDescription}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {project.featured && (
              <Badge variant="default" className="border-primary text-primary bg-primary/10">
                Featured
              </Badge>
            )}
          </div>
        </div>

        {/* Context & Problem */}
        {project.context && (
          <div className="mb-4 p-3 bg-background border-l-2 border-secondary rounded-r">
            <div className="text-xs font-mono text-secondary mb-1">CONTEXT</div>
            <p className="text-sm text-text-secondary leading-relaxed">{project.context}</p>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6 flex-1">
        {/* Architecture & Scale */}
        {project.architecture && (
          <div>
            <div className="text-xs font-mono text-primary mb-3 flex items-center gap-2">
              <span>ARCHITECTURE</span>
              <div className="flex-1 h-px bg-gray-800"></div>
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

        {/* Impact Metrics */}
        {project.impact && (
          <div>
            <div className="text-xs font-mono text-primary mb-3 flex items-center gap-2">
              <span>IMPACT</span>
              <div className="flex-1 h-px bg-gray-800"></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(project.impact).slice(0, 4).map(([key, value]) => (
                <div key={key} className="text-center p-2 bg-background rounded">
                  <div className="text-sm font-mono font-bold text-primary">{value}</div>
                  <div className="text-xs text-text-secondary capitalize">{key.replace('_', ' ')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div>
          <div className="text-xs font-mono text-primary mb-3 flex items-center gap-2">
            <span>TECH STACK</span>
            <div className="flex-1 h-px bg-gray-800"></div>
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

        {/* Design Decisions (collapsed by default) */}
        {project.design_decisions && (
          <details className="mb-4">
            <summary className="text-xs font-mono text-secondary cursor-pointer hover:text-primary transition-colors mb-2">
              DESIGN DECISIONS
            </summary>
            <ul className="text-sm text-text-secondary space-y-1 ml-4">
              {project.design_decisions.map((decision, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1.5">•</span>
                  <span>{decision}</span>
                </li>
              ))}
            </ul>
          </details>
        )}
      </CardContent>

      {/* Action Links */}
      <CardFooter className="flex gap-3 pt-4 border-t border-gray-800 mt-auto">
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 px-3 bg-primary text-background hover:bg-primary/90 transition-colors font-mono text-sm rounded"
          >
            Live Site
          </a>
        )}
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 px-3 border border-gray-800 text-text-secondary hover:text-primary hover:border-primary/50 transition-all font-mono text-sm rounded"
          >
            Code
          </a>
        )}
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 px-3 border border-secondary text-secondary hover:bg-secondary/10 hover:border-secondary/70 transition-all font-mono text-sm rounded"
          >
            Demo
          </a>
        )}
        {!project.links.live && !project.links.github && !project.links.demo && (
          <div className="flex-1 text-center py-2 px-3 border border-gray-600 text-gray-500 font-mono text-sm rounded cursor-not-allowed">
            Private Project
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export default function Projects({ projects }: ProjectsProps) {
  // Separate regular projects and AI projects
  const systemsProjects = projects.projects || []
  const aiProjects = projects.aiProjects || []
  const allProjects = [...systemsProjects, ...aiProjects]

  return (
    <section id="projects" className="py-10 bg-background">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
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
                      <div className="flex-1 h-px bg-gray-800"></div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8">
                      {systemsProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </div>
                )}
                {aiProjects.length > 0 && (
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <h3 className="text-xl font-display text-secondary">AI & LLM Systems</h3>
                      <div className="flex-1 h-px bg-gray-800"></div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8">
                      {aiProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
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
                    <div className="flex-1 h-px bg-gray-800"></div>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-8">
                    {systemsProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
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
                    <div className="flex-1 h-px bg-gray-800"></div>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-8">
                    {aiProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Engineering Notes Section */}
          <Card className="mt-20 bg-surface border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-display text-primary">Engineering Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-background border-gray-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xs font-mono text-secondary">TRADE-OFFS</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-text-secondary leading-relaxed">
                    Redis Pub/Sub vs Kafka: Chosen Redis for sub-100ms latency requirements in threat processing,
                    accepting trade-off in total ordering guarantees for real-time performance.
                  </CardContent>
                </Card>

                <Card className="bg-background border-gray-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xs font-mono text-secondary">SCALE PATTERNS</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-text-secondary leading-relaxed">
                    Event-driven architecture with circuit breakers enables 10K+ req/sec while maintaining
                    system stability during downstream service degradation.
                  </CardContent>
                </Card>

                <Card className="bg-background border-gray-800">
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
    </section>
  )
}
