export interface Project {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  highlights: string[];
  status: 'Production' | 'In Development' | 'Beta';
  link?: string;
  featured?: boolean;
}

export interface IndieProject {
  title: string;
  description: string;
  technologies: string[];
  status: 'Production' | 'In Development' | 'Beta' | 'Research' | 'Stale';
  link?: string;
}

export interface Experience {
  period: string;
  title: string;
  company: string;
  department: string;
  description: string;
  achievements: string[];
}

export interface ExpertiseArea {
  title: string;
  skills: string[];
}

export const featuredProjects: Project[] = [
  {
    title: 'Box.tools',
    subtitle: 'Browser-based productivity tools',
    description: 'A collection of file, text, and developer tools that run in the browser. I worked across the Next.js frontend, FastAPI services, and data layer.',
    technologies: [
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'FastAPI',
      'TailwindCSS',
    ],
    highlights: [
      'Built the frontend in Next.js and TypeScript',
      'Developed supporting services with FastAPI and PostgreSQL',
      'Designed responsive interfaces for desktop and mobile',
      'Set up the deployment pipeline',
    ],
    status: 'Production',
    link: 'https://box.tools',
    featured: true,
  },
  {
    title: 'BonBonPay',
    subtitle: 'Payments platform',
    description: 'A payments product spanning web, mobile, and internal operations. I worked on customer flows, payment integrations, and the admin tooling.',
    technologies: [
      'React Native',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'Payment APIs',
      'Mobile Development',
    ],
    highlights: [
      'Built web and cross-platform mobile interfaces',
      'Integrated payment processing flows',
      'Developed the internal administration dashboard',
    ],
    status: 'Production',
    link: 'https://www.bonbonpay.com',
    featured: true,
  },
  {
    title: 'Victor Onazi Portfolio',
    subtitle: 'Product designer portfolio',
    description: 'A portfolio for product designer Victor Onazi. The site presents his case studies and experience in a focused, responsive layout.',
    technologies: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Framer Motion',
      'Responsive Design',
    ],
    highlights: [
      'Structured case studies and project navigation',
      'Built responsive layouts and page transitions',
      'Worked with the client on presentation and content hierarchy',
    ],
    status: 'Production',
    link: 'https://www.victoronazi.com',
    featured: true,
  },
  {
    title: 'Kwara SAPZ Government Portal',
    subtitle: 'Government programme website',
    description: 'The public website for Kwara State’s Special Agro-Industrial Processing Zone programme. It publishes programme information, training, activities, and events.',
    technologies: [
      'Modern Web Development',
      'Government Standards',
      'CMS Architecture',
      'Mobile Responsive',
      'Multi-Language Support',
    ],
    highlights: [
      'Built the public website and content management workflow',
      'Added activity, event, and training content',
      'Implemented responsive and multilingual page structures',
    ],
    status: 'Production',
    link: 'https://kw.sapz.gov.ng',
    featured: true,
  },
  {
    title: 'Saphir Restaurant',
    subtitle: 'Restaurant launch site',
    description: 'A pre-launch website for a restaurant in Ilorin, with a waitlist and early-access reservation flow.',
    technologies: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Waitlist Management',
      'Email Integration',
    ],
    highlights: [
      'Built the launch page and waitlist flow',
      'Added email and early-access integrations',
      'Implemented the restaurant’s visual direction on the web',
    ],
    status: 'Production',
    link: 'https://www.saphirrestaurant.com',
    featured: true,
  },
  {
    title: 'Oystack',
    subtitle: 'Contract review tool',
    description: 'A contract review tool with a browser extension and dashboard. It uses language models and vector search to find clauses and surface potential issues.',
    technologies: [
      'Django',
      'FastAPI',
      'Kafka',
      'Redis',
      'PostgreSQL',
      'Docker',
      'Pulumi',
      'GCP',
    ],
    highlights: [
      'Built contract analysis and search features',
      'Developed the browser extension and dashboard',
      'Used vector search for document retrieval',
      'Designed the supporting service architecture',
    ],
    status: 'In Development',
    link: 'https://oystack.com',
    featured: true,
  },
  {
    title: 'KP Astro',
    subtitle: 'Astrology software',
    description: 'An astrology application with birth-chart calculations, Swiss Ephemeris integration, and machine-learning-assisted interpretations.',
    technologies: [
      'FastAPI',
      'Django',
      'Kafka',
      'Redis',
      'Swiss Ephemeris',
      'ML Models',
    ],
    highlights: [
      'High-accuracy ML models with Swiss Ephemeris',
      'Birth chart and Vimshottari Dasha calculations',
      'Real-time communication with Kafka',
      'Domain-specific astronomical calculations',
    ],
    status: 'Production',
    link: 'https://kpastro.ai',
    featured: true,
  },
];

export const indieProjects: IndieProject[] = [
  {
    title: "PeerPlay",
    description: "Real-time video watching platform for distributed users",
    technologies: ["Next.js", "WebRTC", "PostgreSQL", "WebSockets"],
    status: "Production",
    link: "https://peerplay.space",
  },
  {
    title: "Web3Bot",
    description: "Discord bot for wallet integration & crypto transactions",
    technologies: ["Discord.js", "Ethers.js", "Nuxt3", "Docker"],
    status: "Production",
    link: "http://web3bot-ui.web.app/",
  },
  {
    title: "SendUSDC",
    description: "Gasless USDC transfers using EIP-3009",
    technologies: ["Solidity", "Web3.js", "React", "Circle API"],
    status: "Research",
    link: "https://github.com/johnexzy/SendUSDC",
  },
  {
    title: "TokenPass",
    description: "Token-gated content monetization platform",
    technologies: ["Vue.js", "Solidity", "Web3.js", "IPFS"],
    status: "Beta",
    link: "https://github.com/johnexzy/TokenPass",
  },
  {
    title: "MachoMara",
    description: "Blockchain donations with USSD & M-Pesa integration",
    technologies: ["Vue 3", "Solidity", "Ethers.js", "AdonisJS"],
    status: "Stale",
    link: "https://github.com/johnexzy/MachoMara",
  },
];

export const experiences: Experience[] = [
  {
    period: "Nov 2024 – Present",
    title: "Senior Software Engineer",
    company: "Alveum",
    department: "Research & AI",
    description: "Working on Astro Finance, including backend services, astronomical calculations, and AI-assisted features.",
    achievements: [
      "Designed core backend services in Django",
      "Implemented AI agents with the Agno framework",
      "Built models around Swiss Ephemeris data",
    ],
  },
  {
    period: "Nov 2023 – Nov 2024",
    title: "Senior Software Engineer & Technical Lead",
    company: "Niyo Group",
    department: "EdTech",
    description: "Led work on real-time learning features, video transcription, and streaming infrastructure.",
    achievements: [
      "Built real-time features used by thousands of learners",
      "Moved video delivery from MP4 to HLS",
      "Added video transcription with Whisper",
      "Collaborative features increased session engagement by 40%",
    ],
  },
  {
    period: "Jan 2023 – Nov 2023",
    title: "Senior Frontend Developer",
    company: "Nomba (formerly Kudi)",
    department: "Fintech",
    description: "Rebuilt the marketing frontend after Kudi rebranded to Nomba, including the terminal purchase experience.",
    achievements: [
      "Purchase pages supported more than 21,000 terminal sales",
      "Built responsive and animated purchase flows",
      "Reworked the frontend architecture over eight months",
    ],
  },
  {
    period: "Nov 2020 – Present",
    title: "Co-Founder & CTO",
    company: "Startuplist Africa",
    department: "Startup Intelligence",
    description: "Co-founded Startuplist Africa and built its startup and funding data platform, which has reached more than 300,000 users.",
    achievements: [
      "Built the startup and funding data pipeline",
      "An SPA-to-SSR migration and SEO work contributed to 300% MRR growth",
      "Developed internal tools for data collection and publishing",
    ],
  },
];

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: "AI & Machine Learning",
    skills: [
      "GPT Integration",
      "Gemini",
      "Whisper",
      "PGVector",
      "Recommendation Systems",
    ],
  },
  {
    title: "Real-Time Systems",
    skills: [
      "WebSockets",
      "WebRTC",
      "Server-Sent Events",
      "Live Streaming",
      "Collaborative Editing",
    ],
  },
  {
    title: "Web Development",
    skills: [
      "Vue.js / Nuxt3",
      "React / Next.js",
      "Django",
      "NestJS",
      "TypeScript",
    ],
  },
  {
    title: "Backend & Infrastructure",
    skills: [
      "Django / FastAPI",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
  },
  {
    title: "Blockchain & Web3",
    skills: [
      "Solidity",
      "Web3.js / Ethers.js",
      "DeFi Protocols",
      "Smart Contracts",
      "TheGraph",
    ],
  },
  {
    title: "DevOps & Cloud",
    skills: [
      "AWS / GCP",
      "Pulumi / Terraform",
      "CI/CD",
      "Elasticsearch",
      "Monitoring & Scaling",
    ],
  },
];
