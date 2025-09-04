# Afrodev

> Personal portfolio and tech blog showcasing engineering expertise, projects, and insights on software development.

## 🚀 Overview

Afrodev is a modern, full-stack portfolio and blog platform built with Nuxt 3. It features a clean, professional design that showcases technical projects, professional experience, and thought leadership through curated articles.

## ✨ Features

- **Dynamic Portfolio**: Showcases professional experience, key projects, and side projects
- **Curated Blog**: Featured articles on AI/ML, real-time systems, and modern development practices
- **Responsive Design**: Mobile-first approach with dark/light mode support
- **Component-Driven**: Modular architecture with reusable Vue components
- **Type-Safe**: Full TypeScript implementation for better developer experience
- **SEO Optimized**: Server-side rendering with proper meta tags and structured data

## 🛠 Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) - The Intuitive Vue Framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type safety and better DX
- **Styling**: [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Content**: [Nuxt Content](https://content.nuxtjs.org/) - Markdown-based content management
- **Icons**: [Nuxt Icon](https://github.com/nuxt-modules/icon) - Icon component library
- **Deployment**: Static site generation for optimal performance

## 📁 Project Structure

```
├── assets/                 # Static assets (images, logos)
├── components/             # Reusable Vue components
│   ├── ExperienceCard.vue     # Professional experience display
│   ├── ProjectCard.vue        # Featured project showcase
│   ├── IndieProjectCard.vue   # Side project display
│   ├── ExpertiseCard.vue      # Technical skills display
│   └── content/               # Content-specific components
├── content/                # Markdown blog posts
├── data/                   # Structured data and types
│   └── projects.ts            # Projects, experience, and expertise data
├── layouts/                # Page layouts
├── pages/                  # Application pages
│   ├── index.vue              # Homepage with featured articles
│   ├── portfolio.vue          # Professional portfolio
│   ├── blog.vue               # Blog listing
│   └── [...slug].vue          # Dynamic blog post pages
├── public/                 # Public static files
└── server/                 # Server-side API routes
```

## 🏗 Data Architecture

The project uses a centralized data management approach:

- **`data/projects.ts`** - Contains all structured data:
  - `featuredProjects`: Key professional projects
  - `indieProjects`: Personal/experimental projects  
  - `experiences`: Professional work history
  - `expertiseAreas`: Technical skills and competencies

- **`content/`** - Markdown files for blog posts with frontmatter metadata

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Afrodev
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📝 Content Management

### Adding Blog Posts

1. Create a new markdown file in `content/` directory
2. Follow the naming convention: `[number].[slug].md`
3. Include proper frontmatter:

```markdown
---
title: "Your Article Title"
featured_image: "/images/your-image.jpg"
draft: false
description: "Article description"
author: "John Oba - Afrodev"
date: "DD MMM, YYYY"
read_time: "X min"
category: "Category Name"
---

Your article content here...
```

### Updating Portfolio Data

Edit `data/projects.ts` to update:
- **Professional Experience**: Add/modify entries in `experiences` array
- **Featured Projects**: Add/modify entries in `featuredProjects` array  
- **Side Projects**: Add/modify entries in `indieProjects` array
- **Technical Skills**: Add/modify entries in `expertiseAreas` array

### Curating Featured Articles

Update the `featuredPaths` array in `pages/index.vue` to control which articles appear on the homepage.

## 🏗 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm generate         # Generate static site

# Code Quality
pnpm lint             # Run linter
pnpm type-check       # Run TypeScript checks
```

## 🚀 Deployment

The site is optimized for static hosting and can be deployed to:

- **Netlify**: Connect your Git repository for automatic deployments
- **Vercel**: Import project and deploy with zero configuration
- **GitHub Pages**: Use the generated static files from `pnpm generate`

### Build for Production

```bash
pnpm generate
```

This creates a `dist/` directory with all static files ready for deployment.

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for custom design tokens
- Update `css/style.scss` for global styles
- Component styles use Tailwind utility classes

### SEO & Meta
- Update `nuxt.config.ts` for global SEO settings
- Modify individual page meta in respective Vue files
- Blog post SEO handled via frontmatter

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

**John Oba**
- Website: [afrodev.com](https://afrodev.com)
- Email: obajohn75@gmail.com
- Twitter: [@_afrodev](https://twitter.com/_afrodev)
- LinkedIn: [johnoba](https://linkedin.com/in/johnoba)
- GitHub: [johnexzy](https://github.com/johnexzy)

---

*Built with ❤️ by John Oba*