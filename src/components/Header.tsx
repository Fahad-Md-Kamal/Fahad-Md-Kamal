import { useState, useEffect } from 'react'
import type { Profile } from '../types'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Menu, FileText } from 'lucide-react'

interface HeaderProps {
  profile: Profile
}

export default function Header({ profile }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ]

  const resumeLink = 'https://flowcv.com/resume/69kur1fdef'

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-sm border-b border-gray-800 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Button
            variant="ghost"
            onClick={() => scrollToSection('hero')}
            className="font-mono font-bold text-lg text-primary hover:text-primary/80 p-0 h-auto"
          >
            {profile.name.split(' ').map(word => word[0]).join('')}
          </Button>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex items-center space-x-2">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuLink asChild>
                    <Button
                      variant="ghost"
                      onClick={() => scrollToSection(link.href.slice(1))}
                      className="text-text-secondary hover:text-primary font-mono font-medium cursor-pointer"
                    >
                      {link.label}
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Button asChild className="ml-4">
                    <a
                      href={resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Resume
                    </a>
                  </Button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
              >
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Button
                    key={link.label}
                    variant="ghost"
                    onClick={() => scrollToSection(link.href.slice(1))}
                    className="text-text-secondary hover:text-primary font-mono justify-start"
                  >
                    {link.label}
                  </Button>
                ))}
                <Button asChild className="mt-4">
                  <a
                    href={resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono flex items-center gap-2 justify-center"
                  >
                    <FileText className="w-4 h-4" />
                    Resume
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>


      </nav>
    </header>
  )
}
