import { useState, useEffect } from 'react'
import AmbientBackground from './components/AmbientBackground'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Certifications from './components/Certifications'
import GithubActivity from './components/GithubActivity'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Blogs from './components/Blogs'

// Import data
import profileData from './data/profile.json'
import skillsData from './data/skills.json'
import experienceData from './data/experience.json'
import educationData from './data/education.json'
import certificationsData from './data/certifications.json'
import projectsData from './data/projects.json'

// Import types
import type { Profile, SkillsData, ExperienceData, EducationData, CertificationsData, ProjectsData } from './types'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const profile = profileData as Profile
  const skills = skillsData as SkillsData
  const experience = experienceData as ExperienceData
  const education = educationData as EducationData
  const certifications = certificationsData as CertificationsData
  const projects = projectsData as ProjectsData

  const totalProjects = (projects.projects?.length || 0) + (projects.aiProjects?.length || 0)

  useEffect(() => {
    // Simulate loading time for smooth experience
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Update document title with profile name
    document.title = `${profile.name} - ${profile.role}`
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', profile.summary)
    }
  }, [profile])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-secondary">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AmbientBackground />
      <Header profile={profile} />
      
      <main>
        <Hero profile={profile} projectCount={totalProjects} />
        <About profile={profile} projectCount={totalProjects} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience experience={experience} profile={profile} />
        <Education education={education} />
        <Certifications certifications={certifications} />
        <GithubActivity profile={profile} />
        <Blogs />
        <Contact profile={profile} />
      </main>
      
      <Footer profile={profile} />
      <ScrollToTop />
    </div>
  )
}

export default App
