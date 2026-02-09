import type { ExperienceData, Experience } from '../types'

interface ExperienceProps {
  experience: ExperienceData
}

interface ExperienceCardProps {
  experience: Experience
  index: number
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    
    if (years === 0) return `${months} month${months > 1 ? 's' : ''}`
    if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`
    return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
  }

  return (
    <div className={`relative mb-12 animate-fade-in`} style={{ animationDelay: `${index * 0.2}s` }}>
      {/* Timeline line */}
      <div className="absolute left-4 top-16 bottom-0 w-px bg-gray-300 hidden md:block"></div>
      
      {/* Timeline dot */}
      <div className="absolute left-0 top-12 w-8 h-8 bg-primary-600 rounded-full border-4 border-white shadow-lg hidden md:flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>

      {/* Content */}
      <div className="md:ml-16 bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center overflow-hidden">
              {experience.logo ? (
                <img
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement!.innerHTML = `<span class="text-primary-600 font-bold text-lg">${experience.company[0]}</span>`
                  }}
                />
              ) : (
                <span className="text-primary-600 font-bold text-lg">
                  {experience.company[0]}
                </span>
              )}
            </div>
          </div>

          {/* Experience Details */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {experience.role}
                </h3>
                <div className="flex items-center gap-2 text-primary-600 font-medium mb-2">
                  {experience.website ? (
                    <a 
                      href={experience.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {experience.company}
                    </a>
                  ) : (
                    <span>{experience.company}</span>
                  )}
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{experience.location}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {calculateDuration(experience.startDate, experience.endDate)}
                </div>
              </div>
            </div>

            {/* Job Type and Status */}
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                {experience.type}
              </span>
              {experience.current && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                  Current
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4 leading-relaxed">
              {experience.description}
            </p>

            {/* Key Highlights */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
              <ul className="space-y-2">
                {experience.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-md font-medium border border-primary-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Experience({ experience }: ExperienceProps) {
  const totalYears = experience.experiences.reduce((total, exp) => {
    const start = new Date(exp.startDate)
    const end = exp.endDate ? new Date(exp.endDate) : new Date()
    const years = (end.getFullYear() - start.getFullYear()) + (end.getMonth() - start.getMonth()) / 12
    return total + years
  }, 0)

  const stats = [
    { label: 'Years of Experience', value: Math.round(totalYears).toString() + '+' },
    { label: 'Companies', value: experience.experiences.length.toString() },
    { label: 'Current Role', value: experience.experiences.find(exp => exp.current)?.role || 'Available' },
    { label: 'Location', value: experience.experiences[0]?.location || 'Remote' }
  ]

  return (
    <section id="experience" className="py-20 bg-surface">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="section-title mb-8">Engineering Experience</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              My professional journey and the impact I've made at various organizations
            </p>
          </div>

          {/* Experience Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {experience.experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Ready to Work Together?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                I'm always interested in new opportunities and challenges. 
                Let's discuss how my experience can contribute to your team's success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#contact"
                  className="btn-primary"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Get In Touch
                </a>
                <a 
                  href="/images/fahad-md-kamal.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}