import { useState } from 'react'
import type { Profile } from '../types'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

interface ContactProps {
  profile: Profile
}

export default function Contact({ profile }: ContactProps) {
  const resolveAsset = (path: string) => {
    if (!path) return path
    if (path.startsWith('http')) return path
    const base = import.meta.env.BASE_URL || '/'
    return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setStatusMessage('')

    const emailBody = `Name: ${formData.name}\\nEmail: ${formData.email}\\n\\nMessage:\\n${formData.message}`
    const mailtoLink = `mailto:${profile.contact?.email || profile.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`

    // Open the user's email client with a pre-filled message
    window.location.href = mailtoLink

    setSubmitStatus('success')
    setStatusMessage('Opening your email client with the message pre-filled.')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)

    setTimeout(() => {
      setSubmitStatus('idle')
      setStatusMessage('')
    }, 5000)
  }

  const contactMethods = [
    {
      icon: '✉️',
      label: 'Email',
      value: profile.contact?.email || profile.email,
      href: `mailto:${profile.contact?.email || profile.email}`,
      description: 'Direct technical communication'
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'Technical portfolio & repositories',
      href: profile.social.github,
      description: 'Code samples and project architecture'
    },
    {
      icon: '🔗',
      label: 'LinkedIn',
      value: 'Professional networking',
      href: profile.social.linkedin,
      description: 'Career timeline and recommendations'
    }
  ]

  return (
    <section id="contact" className="py-10 bg-background">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="section-title mb-8">Contact</h2>
            <p className="text-lg text-text-secondary max-w-3xl font-mono leading-relaxed">
              // Open to backend engineering roles, contract work, and technical conversations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-800 bg-surface">
                    <img
                      src={resolveAsset(profile.avatar)}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-display text-text-primary">{profile.name}</p>
                    <p className="text-xs font-mono text-text-secondary">{profile.role}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-4">
                  <div className="text-xs font-mono text-primary flex items-center gap-2">
                    <span>COMMUNICATION CHANNELS</span>
                    <div className="flex-1 h-px bg-gray-800"></div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <Card
                      key={index}
                      className="group hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => window.open(method.href, '_blank')}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-surface border border-gray-800 rounded flex items-center justify-center text-primary group-hover:text-primary/80">
                            <span aria-hidden="true">{method.icon}</span>
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
                          <span className="text-text-secondary group-hover:text-primary transition-colors text-sm">↗</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Response */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="text-xs font-mono text-primary flex items-center gap-2">
                    <span>RESPONSE METRICS</span>
                    <div className="flex-1 h-px bg-gray-800"></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <Card>
                      <CardContent className="p-3">
                        <div className="text-lg font-mono font-bold text-primary">24h</div>
                        <div className="text-xs text-text-secondary font-mono">Email Response</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3">
                        <Badge variant="secondary" className="text-sm font-mono font-bold bg-green-500 text-white">Available</Badge>
                        <div className="text-xs text-text-secondary font-mono mt-1">New Projects</div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader className="pb-4">
                <div className="text-xs font-mono text-primary flex items-center gap-2">
                  <span>MESSAGE INTERFACE</span>
                  <div className="flex-1 h-px bg-gray-800"></div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-mono text-text-secondary">
                        Name *
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="font-mono"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-mono text-text-secondary">
                        Email *
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="font-mono"
                        placeholder="your.email@domain.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-mono text-text-secondary">
                      Subject *
                    </Label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="font-mono"
                      placeholder="Project discussion / Technical consultation"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-mono text-text-secondary">
                      Technical Requirements *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="font-mono resize-none"
                      placeholder="Describe your system architecture needs, scale requirements, tech stack preferences, timeline, and any specific challenges..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-mono flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Preparing email...
                      </>
                    ) : (
                      <>
                        Send Message
                      </>
                    )}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus !== 'idle' && (
                    <div className={`p-4 rounded-lg border font-mono text-sm flex items-center gap-3 ${
                      submitStatus === 'success' 
                        ? 'bg-green-500/10 border-green-500/20 text-green-400'
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                      <span>{submitStatus === 'success' ? '✅' : '⚠️'}</span>
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  <p className="text-xs text-text-secondary font-mono text-center mt-4">
                    // Opens your default email client with all fields filled in
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
