import { useState } from 'react'
import type { Profile } from '../types'

interface ContactProps {
  profile: Profile
}

export default function Contact({ profile }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create mailto link
    const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    const mailtoLink = `mailto:${profile.contact?.email || profile.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`
    window.location.href = mailtoLink
    
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1000)
  }

  const contactMethods = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      label: 'Email',
      value: profile.contact?.email || profile.email,
      href: `mailto:${profile.contact?.email || profile.email}`,
      description: 'Direct technical communication'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      label: 'GitHub',
      value: 'Technical portfolio & repositories',
      href: profile.social.github,
      description: 'Code samples and project architecture'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      label: 'LinkedIn',
      value: 'Professional networking',
      href: profile.social.linkedin,
      description: 'Career timeline and recommendations'
    }
  ]

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="section-title mb-8">System Integration</h2>
            <p className="text-lg text-text-secondary max-w-3xl font-mono leading-relaxed">
              // Ready to architect your next scalable system? Let's discuss technical requirements
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <div className="space-y-8">
              <div className="card">
                <div className="text-xs font-mono text-primary mb-6 flex items-center gap-2">
                  <span>COMMUNICATION CHANNELS</span>
                  <div className="flex-1 h-px bg-gray-800"></div>
                </div>
                
                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <a
                      key={index}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-background border border-gray-800 rounded hover:border-primary/50 transition-colors group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-surface border border-gray-800 rounded flex items-center justify-center text-primary group-hover:text-primary/80">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-mono font-semibold text-text-primary">
                              {method.label}
                            </h3>
                          </div>
                          <p className="font-mono text-sm text-text-secondary mb-2">
                            {method.value}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {method.description}
                          </p>
                        </div>
                        <svg className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Response */}
              <div className="card">
                <div className="text-xs font-mono text-primary mb-4 flex items-center gap-2">
                  <span>RESPONSE METRICS</span>
                  <div className="flex-1 h-px bg-gray-800"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-background rounded border border-gray-800">
                    <div className="text-lg font-mono font-bold text-primary">24h</div>
                    <div className="text-xs text-text-secondary font-mono">Email Response</div>
                  </div>
                  <div className="p-3 bg-background rounded border border-gray-800">
                    <div className="text-lg font-mono font-bold text-secondary">Available</div>
                    <div className="text-xs text-text-secondary font-mono">New Projects</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card">
              <div className="text-xs font-mono text-primary mb-6 flex items-center gap-2">
                <span>MESSAGE INTERFACE</span>
                <div className="flex-1 h-px bg-gray-800"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-mono text-text-secondary mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-gray-800 rounded text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none font-mono"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-mono text-text-secondary mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-gray-800 rounded text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none font-mono"
                      placeholder="your.email@domain.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-mono text-text-secondary mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-gray-800 rounded text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none font-mono"
                    placeholder="Project discussion / Technical consultation"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-mono text-text-secondary mb-2">
                    Technical Requirements *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-gray-800 rounded text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none font-mono resize-none"
                    placeholder="Describe your system architecture needs, scale requirements, tech stack preferences, timeline, and any specific challenges..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Initializing...' : 'Send Message'}
                </button>

                <p className="text-xs text-text-secondary font-mono text-center mt-4">
                  // This will open your default email client with the message pre-filled
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
   