import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import type { SkillsData, SkillCategory } from '../types'

interface SkillsProps {
  skills: SkillsData
}

interface SkillItemProps {
  skill: { name: string; level: number; years: number }
  index: number
}

function SkillItem({ skill, index }: SkillItemProps) {
  return (
    <Card 
      className="flex items-center justify-between p-3 hover:border-primary/60 transition-all duration-200 animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-text-primary">{skill.name}</span>
        <span className="text-xs font-mono text-text-secondary">
          {skill.years}yr{skill.years > 1 ? 's' : ''}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative w-16 h-2 rounded-full overflow-hidden bg-gray-900/60">
          <div
            className="absolute left-0 top-0 h-full bg-primary transition-all duration-1000 ease-out"
            style={{ 
              width: `${skill.level}%`,
              animationDelay: `${index * 0.05 + 0.3}s`
            }}
          />
          <div
            className="absolute right-0 top-0 h-full bg-gray-500/50 transition-all duration-1000 ease-out"
            style={{ 
              width: `${100 - skill.level}%`,
              animationDelay: `${index * 0.05 + 0.3}s`
            }}
          />
        </div>
        <span className="text-xs font-mono text-primary min-w-[3ch]">{skill.level}%</span>
      </div>
    </Card>
  )
}

interface CategorySectionProps {
  category: SkillCategory
  index: number
}

function CategorySection({ category, index }: CategorySectionProps) {
  return (
    <Card className="animate-slide-up flex flex-col h-full" style={{ animationDelay: `${index * 0.1}s` }}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">{category.icon}</span>
          </div>
          <div>
            <CardTitle className="text-lg font-display font-semibold text-primary">{category.name}</CardTitle>
            <CardDescription className="text-sm text-text-secondary font-mono">
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
      <CardFooter className="flex-col pt-6 border-t border-gray-800 mt-auto">
        <div className="grid grid-cols-3 gap-4 text-center w-full">
          <div>
            <div className="text-sm font-mono font-bold text-primary">
              {category.skills.filter(s => s.level >= 90).length}
            </div>
            <div className="text-xs text-text-secondary font-mono">Expert</div>
          </div>
          <div>
            <div className="text-sm font-mono font-bold text-secondary">
              {category.skills.filter(s => s.level >= 70 && s.level < 90).length}
            </div>
            <div className="text-xs text-text-secondary font-mono">Advanced</div>
          </div>
          <div>
            <div className="text-sm font-mono font-bold text-text-secondary">
              {Math.round(category.skills.reduce((acc, s) => acc + s.years, 0) / category.skills.length)}yr
            </div>
            <div className="text-xs text-text-secondary font-mono">Avg Exp</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function Skills({ skills }: SkillsProps) {
  // Group categories by type for tabbed interface
  const backendCategories = skills.categories.filter(cat => 
    cat.name.includes('Backend') || cat.name.includes('Core') || cat.name.includes('Data')
  )
  const devopsCategories = skills.categories.filter(cat => 
    cat.name.includes('DevOps') || cat.name.includes('Cloud')
  )
  const aiCategories = skills.categories.filter(cat => 
    cat.name.includes('AI') || cat.name.includes('LLM')
  )
  const allCategories = skills.categories

  return (
    <section id="skills" className="py-10 bg-background">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="section-title mb-8">Technology Stack</h2>
            <p className="text-lg text-text-secondary max-w-3xl font-mono leading-relaxed">
              // Tools and technologies I have used in real backend and AI-focused projects
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="w-full mb-12 grid grid-cols-2 md:grid-cols-4 h-auto">
              <TabsTrigger value="all" className="font-mono text-xs md:text-sm p-2 md:p-3">
                <span className="hidden sm:inline">All Technologies ({allCategories.length})</span>
                <span className="sm:hidden">All ({allCategories.length})</span>
              </TabsTrigger>
              <TabsTrigger value="backend" className="font-mono text-xs md:text-sm p-2 md:p-3">
                <span className="hidden sm:inline">Backend & Core ({backendCategories.length})</span>
                <span className="sm:hidden">Backend ({backendCategories.length})</span>
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
          <div className="mt-20 p-8 bg-surface rounded-lg border border-gray-800">
            <h3 className="text-lg font-display text-primary mb-4">Technical Philosophy</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="font-mono text-secondary mb-2">ARCHITECTURE PRINCIPLES</div>
                <p className="text-text-secondary leading-relaxed">
                  Prefer simple, maintainable backend designs first, then introduce asynchronous processing,
                  event-driven flows, and service boundaries where they clearly improve reliability or scale.
                </p>
              </div>
              <div>
                <div className="font-mono text-secondary mb-2">PERFORMANCE FOCUS</div>
                <p className="text-text-secondary leading-relaxed">
                  Focus on query optimization, background jobs, cache-aware design,
                  and production visibility so backend systems stay understandable under load.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
