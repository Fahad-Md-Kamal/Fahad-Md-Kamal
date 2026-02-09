# Professional Developer Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. This project is designed to be easily customizable through JSON configuration files, making it simple to update your portfolio content without touching the code.

## ✨ Features

- **🎨 Modern Design**: Clean, professional UI with smooth animations
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🔧 Easy to Update**: Content driven by JSON files - no code changes needed
- **♿ Accessible**: Semantic HTML and ARIA labels for screen readers
- **🚀 GitHub Pages Ready**: Pre-configured for free hosting on GitHub Pages
- **📊 SEO Optimized**: Meta tags and semantic structure for better search rankings

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: GitHub Pages
- **Package Manager**: npm

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── images/            # Images for projects, companies, etc.
│   ├── resume.pdf         # Your resume file
│   └── vite.svg           # Favicon
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx     # Navigation header
│   │   ├── Hero.tsx       # Hero section with intro
│   │   ├── About.tsx      # About section
│   │   ├── Skills.tsx     # Skills showcase
│   │   ├── Projects.tsx   # Projects portfolio
│   │   ├── Experience.tsx # Work experience
│   │   ├── Contact.tsx    # Contact form
│   │   ├── Footer.tsx     # Footer
│   │   └── ScrollToTop.tsx # Scroll to top button
│   ├── data/              # JSON configuration files
│   │   ├── profile.json   # Personal info & social links
│   │   ├── skills.json    # Technical skills by category
│   │   ├── experience.json # Work experience
│   │   └── projects.json  # Portfolio projects (EDIT THIS MOST!)
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # All interface definitions
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # React entry point
│   └── index.css          # Global styles & Tailwind imports
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone or download this repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit `http://localhost:3000`

## 🎨 Customization Guide

### 1. Personal Information (`src/data/profile.json`)

Update your basic information:
```json
{
  "name": "Your Name",
  "role": "Your Job Title",
  "tagline": "Your Professional Tagline",
  "summary": "Your professional summary...",
  "email": "your.email@example.com",
  "phone": "+1 (555) 123-4567",
  "location": "Your City, State",
  "social": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername"
  }
}
```

### 2. Skills (`src/data/skills.json`)

Organize your skills by categories:
```json
{
  "categories": [
    {
      "name": "Frontend",
      "icon": "🎨",
      "skills": [
        { "name": "React", "level": 95, "years": 4 },
        { "name": "TypeScript", "level": 90, "years": 3 }
      ]
    }
  ]
}
```

### 3. Projects (`src/data/projects.json`) - **MOST IMPORTANT**

This is the file you'll update most frequently:
```json
{
  "projects": [
    {
      "id": "1",
      "title": "Your Project Name",
      "shortDescription": "Brief description",
      "description": "Detailed project description...",
      "image": "/images/projects/project-image.jpg",
      "category": "Full-Stack",
      "featured": true,
      "status": "Completed",
      "technologies": [
        { "name": "React", "color": "#61DAFB" },
        { "name": "Node.js", "color": "#339933" }
      ],
      "features": [
        "Feature 1",
        "Feature 2"
      ],
      "links": {
        "live": "https://yourproject.com",
        "github": "https://github.com/yourusername/project"
      }
    }
  ]
}
```

### 4. Experience (`src/data/experience.json`)

Add your work history:
```json
{
  "experiences": [
    {
      "company": "Company Name",
      "role": "Your Position",
      "startDate": "2023-01",
      "endDate": null,
      "current": true,
      "description": "What you do/did at this company...",
      "highlights": [
        "Achievement 1",
        "Achievement 2"
      ],
      "technologies": ["React", "Node.js", "AWS"]
    }
  ]
}
```

### 5. Images

Replace placeholder images in the `public/images/` directory:
- `avatar.jpg` - Your profile photo
- `projects/` - Screenshots of your projects
- `companies/` - Company logos (optional)

### 6. Resume

Replace `public/resume.pdf` with your actual resume file.

## 🎨 Styling Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Change these hex values to your preferred colors
        500: '#0ea5e9',  // Main brand color
        600: '#0284c7',  // Darker shade
        // ... other shades
      }
    }
  }
}
```

### Fonts

Update the font imports in `index.html` and reference them in `tailwind.config.js`.

## 🚀 Deployment

### GitHub Pages (Recommended)

1. **Update configuration**:
   - In `vite.config.ts`, change `base: '/portfolio/'` to your repository name
   - In `package.json`, update the `homepage` field

2. **Deploy**:
   ```bash
   npm run build
   npm run deploy
   ```

### Alternative Hosting Options

- **Vercel**: Connect your GitHub repo at vercel.com
- **Netlify**: Drag and drop the `dist` folder after running `npm run build`
- **Firebase Hosting**: Use Firebase CLI to deploy

## 📱 Mobile Optimization

The portfolio is fully responsive and includes:
- Mobile-first design approach
- Touch-friendly navigation
- Optimized images and performance
- Accessible tap targets

## 🔧 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
npm run deploy   # Deploy to GitHub Pages
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Tips for Success

1. **Keep projects.json updated** - This is what visitors will see first
2. **Use high-quality images** - They make a huge difference in presentation
3. **Write compelling descriptions** - Tell the story of your projects
4. **Update regularly** - Keep your portfolio current with new work
5. **Test on mobile** - Most visitors will view on mobile devices
6. **SEO matters** - Update meta tags in `index.html` for better search visibility

## 🎯 What Makes This Portfolio Stand Out

- **No hardcoded content** - Everything is driven by JSON files
- **Type-safe** - Full TypeScript support prevents runtime errors
- **Performance focused** - Optimized builds and lazy loading
- **Accessibility first** - WCAG compliant with proper ARIA labels
- **Modern stack** - Latest React patterns and best practices
- **Easy maintenance** - Clear structure and comprehensive documentation

---

**Ready to showcase your work to the world? Update the JSON files and deploy! 🚀**