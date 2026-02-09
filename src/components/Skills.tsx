import { useState } from 'react'
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
    <div 
      className="flex items-center justify-between p-3 bg-background rounded border border-gray-800 hover:border-primary/50 transition-colors animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-text-primary">{skill.name}</span>
        <span className="text-xs font-mono text-text-secondary">
          {skill.years}yr{skill.years > 1 ? 's' : ''}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-16 h-1 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-1000 ease-out"
            style={{ 
              width: `${skill.level}%`,
              animationDelay: `${index * 0.05 + 0.3}s`
            }}
          />
        </div>
        <span className="text-xs font-mono text-primary min-w-[3ch]">{skill.level}%</span>
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
    <div className="card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
          <span className="text-2xl">{category.icon}</span>
        </div>
        <div>
          <h3 className="text-lg font-display font-semibold text-primary">{category.name}</h3>
          <p className="text-sm text-text-secondary font-mono">
            {category.skills.length} technologies
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {category.skills.map((skill, skillIndex) => (
          <SkillItem 
            key={skill.name} 
            skill={skill} 
            index={skillIndex}
          />
        ))}
      </div>

      {/* Proficiency Summary */}
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="grid grid-cols-3 gap-4 text-center">
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
      </div>
    </div>
  )
}

export default function Skills({ skills }: SkillsProps) {
  const [activeTab, setActiveTab] = useState<'backend' | 'devops' | 'ai'>('backend')

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

  const getActiveCategories = () => {
    switch (activeTab) {
      case 'backend':
        return backendCategories
      case 'devops':
        return devopsCategories
      case 'ai':
        return aiCategories
      default:
        return backendCategories
    }
  }

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="section-title mb-8">Technology Stack</h2>
            <p className="text-lg text-text-secondary max-w-3xl font-mono leading-relaxed">
              // Production-grade technologies for scalable system architecture
            </p>
          </div>

          {/* Tabs */}
          <div className="inline-flex gap-1 p-1 bg-surface rounded-lg mb-12">
            <button
              onClick={() => setActiveTab('backend')}
              className={`px-6 py-3 rounded font-mono text-sm transition-all ${
                activeTab === 'backend'
                  ? 'bg-primary text-background'
                  : 'text-text-secondary hover:text-primary'
              }`}
            >
              Backend & Core ({backendCategories.length})
            </button>
            <button
              onClick={() => setActiveTab('devops')}
              className={`px-6 py-3 rounded font-mono text-sm transition-all ${
                activeTab === 'devops'
                  ? 'bg-primary text-background'
                  : 'text-text-secondary hover:text-primary'
              }`}
            >
              DevOps & Cloud ({devopsCategories.length})
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-6 py-3 rounded font-mono text-sm transition-all ${
                activeTab === 'ai'
                  ? 'bg-secondary text-background'
                  : 'text-text-secondary hover:text-secondary'
              }`}
            >
              AI & LLMs ({aiCategories.length})
            </button>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {getActiveCategories().map((category, index) => (
              <CategorySection 
                key={category.name} 
                category={category} 
                index={index}
              />
            ))}
          </div>

          {/* Technical Notes */}
          <div className="mt-20 p-8 bg-surface rounded-lg border border-gray-800">
            <h3 className="text-lg font-display text-primary mb-4">Technical Philosophy</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="font-mono text-secondary mb-2">ARCHITECTURE PRINCIPLES</div>
                <p className="text-text-secondary leading-relaxed">
                  Event-driven design for loose coupling, microservices for domain separation, 
                  and infrastructure as code for reproducible deployments.
                </p>
              </div>
              <div>
                <div className="font-mono text-secondary mb-2">PERFORMANCE FOCUS</div>
                <p className="text-text-secondary leading-relaxed">
                  Sub-100ms API response times, horizontal scaling patterns, 
                  and monitoring-first development for production observability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}