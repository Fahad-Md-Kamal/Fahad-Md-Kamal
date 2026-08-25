import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import type { SkillsData, SkillCategory } from '../types'
import { useInView } from '../hooks/useInView'
import DecodeText from './DecodeText'
import Reveal from './Reveal'

interface SkillsProps {
  skills: SkillsData
}

interface SkillItemProps {
  skill: { name: string; level: number; years: number }
  index: number
}

function SkillItem({ skill, index }: SkillItemProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-background/30 hover:border-primary/40 hover:bg-background/50 transition-all duration-300"
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div className="flex items-center gap-3">
        <DecodeText text={skill.name} delay={index * 40} className="text-text-primary text-sm font-medium" />
        <span className="text-xs font-mono text-text-secondary">
          {skill.years}yr{skill.years > 1 ? 's' : ''}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative w-16 h-1.5 rounded-full overflow-hidden bg-white/[0.06]">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
            style={{
              width: inView ? `${skill.level}%` : '0%',
              transitionDelay: `${index * 40 + 200}ms`
            }}
          />
        </div>
        <span className="text-xs font-mono text-primary min-w-[3ch]">{inView ? `${skill.level}%` : '0%'}</span>
      </div>
    </div>
  )
}

interface CategorySectionProps {
  category: SkillCategory
  index: number
}

function CategorySection({ category, index }: CategorySectionProps) {
  return (
    <Reveal delay={index * 100} className="flex flex-col h-full" as={Card as any}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 border border-border/60 rounded-xl flex items-center justify-center">
            <span className="text-2xl">{category.icon}</span>
          </div>
          <div>
            <DecodeText as={CardTitle as any} text={category.name} className="text-lg font-display font-semibold text-text-primary" />
            <CardDescription className="text-sm text-text-secondary">
              {category.skills.length} technologies
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 flex-1">
        {category.skills.map((skill, skillIndex) => (
          <SkillItem
            key={skill.name}
            skill={skill}
            index={skillIndex}
          />
        ))}
      </CardContent>

      {/* Proficiency Summary */}
      <CardFooter className="flex-col pt-6 border-t border-border/60 mt-auto">
        <div className="grid grid-cols-3 gap-4 text-center w-full">
          <div>
            <DecodeText text={String(category.skills.filter(s => s.level >= 90).length)} className="text-sm font-mono font-bold text-primary" />
            <div className="text-xs text-text-secondary font-mono">Expert</div>
          </div>
          <div>
            <DecodeText text={String(category.skills.filter(s => s.level >= 70 && s.level < 90).length)} className="text-sm font-mono font-bold text-secondary" />
            <div className="text-xs text-text-secondary font-mono">Advanced</div>
          </div>
          <div>
            <DecodeText text={`${Math.round(category.skills.reduce((acc, s) => acc + s.years, 0) / category.skills.length)}yr`} className="text-sm font-mono font-bold text-text-secondary" />
            <div className="text-xs text-text-secondary font-mono">Avg Exp</div>
          </div>
        </div>
      </CardFooter>
    </Reveal>
  )
}

export default function Skills({ skills }: SkillsProps) {
  // Group categories by type for tabbed interface
  const backendCategories = skills.categories.filter(cat => 
    cat.name.includes('Backend') || cat.name.includes('Core') || cat.name.includes('Data')
  )
  const frontendCategories = skills.categories.filter(cat =>
    cat.name.includes('Frontend') || cat.name.includes('Mobile')
  )
  const devopsCategories = skills.categories.filter(cat =>
    cat.name.includes('DevOps') || cat.name.includes('Cloud')
  )
  const aiCategories = skills.categories.filter(cat =>
    cat.name.includes('AI') || cat.name.includes('LLM')
  )
  const allCategories = skills.categories

  return (
    <section id="skills" className="py-20 md:py-28 bg-background/85">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <Reveal className="mb-16">
            <div className="section-eyebrow">
              <DecodeText text="Technology Stack" />
            </div>
            <DecodeText as="h2" text="Tools I reach for" className="section-title mb-4" />
            <p className="text-lg text-text-secondary max-w-3xl leading-relaxed">
              Tools and technologies I have used in real full-stack and AI-focused projects.
            </p>
          </Reveal>

          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="w-full mb-12 grid grid-cols-2 md:grid-cols-5 h-auto">
              <TabsTrigger value="all" className="font-mono text-xs md:text-sm p-2 md:p-3">
                <span className="hidden sm:inline">All Technologies ({allCategories.length})</span>
                <span className="sm:hidden">All ({allCategories.length})</span>
              </TabsTrigger>
              <TabsTrigger value="backend" className="font-mono text-xs md:text-sm p-2 md:p-3">
                <span className="hidden sm:inline">Backend & Core ({backendCategories.length})</span>
                <span className="sm:hidden">Backend ({backendCategories.length})</span>
              </TabsTrigger>
              <TabsTrigger value="frontend" className="font-mono text-xs md:text-sm p-2 md:p-3">
                <span className="hidden sm:inline">Frontend & Mobile ({frontendCategories.length})</span>
                <span className="sm:hidden">Frontend ({frontendCategories.length})</span>
              </TabsTrigger>
              <TabsTrigger value="devops" className="font-mono text-xs md:text-sm p-2 md:p-3">
                <span className="hidden sm:inline">DevOps & Cloud ({devopsCategories.length})</span>
                <span className="sm:hidden">DevOps ({devopsCategories.length})</span>
              </TabsTrigger>
              <TabsTrigger value="ai" className="font-mono text-xs md:text-sm p-2 md:p-3">
                <span className="hidden sm:inline">AI & LLMs ({aiCategories.length})</span>
                <span className="sm:hidden">AI ({aiCategories.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 gap-8">
                {allCategories.map((category, index) => (
                  <CategorySection 
                    key={category.name} 
                    category={category} 
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="backend">
              <div className="grid md:grid-cols-2 gap-8">
                {backendCategories.map((category, index) => (
                  <CategorySection 
                    key={category.name} 
                    category={category} 
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="frontend">
              <div className="grid md:grid-cols-2 gap-8">
                {frontendCategories.map((category, index) => (
                  <CategorySection
                    key={category.name}
                    category={category}
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="devops">
              <div className="grid md:grid-cols-2 gap-8">
                {devopsCategories.map((category, index) => (
                  <CategorySection
                    key={category.name}
                    category={category}
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ai">
              <div className="grid md:grid-cols-2 gap-8">
                {aiCategories.map((category, index) => (
                  <CategorySection 
                    key={category.name} 
                    category={category} 
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Technical Notes */}
          <Reveal className="mt-20 p-8 bg-gradient-to-br from-surface to-surface/60 rounded-2xl border border-border/60 shadow-soft">
            <DecodeText as="h3" text="Technical Philosophy" className="text-lg font-display font-semibold text-text-primary mb-4" />
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-secondary mb-2">
                  <DecodeText text="Architecture Principles" />
                </div>
                <p className="text-text-secondary leading-relaxed">
                  Prefer simple, maintainable backend designs first, then introduce asynchronous processing,
                  event-driven flows, and service boundaries where they clearly improve reliability or scale.
                </p>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-secondary mb-2">
                  <DecodeText text="Performance Focus" />
                </div>
                <p className="text-text-secondary leading-relaxed">
                  Focus on query optimization, background jobs, cache-aware design,
                  and production visibility so backend systems stay understandable under load.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
