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
    subtitle: 'Digital Productivity Platform',
    description: 'Built a comprehensive digital productivity toolbox that streamlines workflows for modern teams. Designed for efficiency and scalability with a focus on user experience and performance.',
    technologies: [
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'FastAPI',
      'TailwindCSS',
    ],
    highlights: [
      'Full-stack productivity platform with modern architecture',
      'Streamlined workflows for enhanced team productivity',
      'Scalable backend with FastAPI and PostgreSQL',
      'Responsive design with optimized user experience',
      'Production-ready with continuous deployment pipeline',
    ],
    status: 'Production',
    link: 'https://box.tools',
    featured: true,
  },
  {
    title: 'BonBonPay',
    subtitle: 'Complete Payment Platform',
    description: 'Developed a comprehensive fintech payment solution including web platform, mobile application, and super admin dashboard. Full-stack development covering user experience, payment processing, and administrative controls.',
    technologies: [
      'React Native',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'Payment APIs',
      'Mobile Development',
    ],
    highlights: [
      'Complete payment ecosystem with web and mobile interfaces',
      'Cross-platform mobile app for seamless user experience',
      'Comprehensive super admin dashboard for platform management',
      'Secure payment processing with modern fintech standards',
      'End-to-end client solution delivery',
    ],
    status: 'Production',
    link: 'https://www.bonbonpay.com',
    featured: true,
  },
  {
    title: 'Victor Onazi Portfolio',
    subtitle: 'Designer Portfolio & Personal Brand',
    description: 'Developed a sophisticated portfolio website for product designer Victor Onazi that directly contributed to securing a senior designer position. Clean, professional design showcasing 5+ years of UX work with seamless user experience.',
    technologies: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Framer Motion',
      'Responsive Design',
    ],
    highlights: [
      'Portfolio directly helped client secure senior designer role',
      'Clean, professional design reflecting modern design standards',
      'Optimized user journey showcasing 5+ years of design work',
      'Responsive across all devices with smooth animations',
      'Strategic personal branding that converts visitors to opportunities',
    ],
    status: 'Production',
    link: 'https://www.victoronazi.com',
    featured: true,
  },
  {
    title: 'Kwara SAPZ Government Portal',
    subtitle: 'State Government Agricultural Platform',
    description: 'Developed the official government portal for Kwara State SAPZ (Special Agro-Industrial Processing Zones), transforming agricultural development through modern agro-processing infrastructure. Platform supports farmer training, value chain development, and agricultural transformation initiatives.',
    technologies: [
      'Modern Web Development',
      'Government Standards',
      'CMS Architecture',
      'Mobile Responsive',
      'Multi-Language Support',
    ],
    highlights: [
      'Official Kwara State Government contract',
      'Agricultural transformation platform for economic prosperity',
      'Supports farmer training and agribusiness development',
      'Partnership with Islamic Development Bank',
      'Comprehensive activities and events management system',
    ],
    status: 'Production',
    link: 'https://kw.sapz.gov.ng',
    featured: true,
  },
  {
    title: 'Saphir Restaurant',
    subtitle: 'Fine Dining Experience Platform',
    description: 'Created an elegant coming-soon website for Saphir, a premium fine dining restaurant in Ilorin. Features sophisticated waitlist management, early access reservations, and strategic pre-launch marketing to build anticipation.',
    technologies: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Waitlist Management',
      'Email Integration',
    ],
    highlights: [
      'Elegant pre-launch marketing strategy implementation',
      'Sophisticated waitlist management system',
      'Premium brand positioning with refined visual design',
      'Early access reservation system for VIP customers',
      'Social media integration for maximum reach',
    ],
    status: 'Production',
    link: 'https://www.saphirrestaurant.com',
    featured: true,
  },
  {
    title: 'Oystack',
    subtitle: 'Contract Intelligence Assistant',
    description: 'Building a contract intelligence assistant with Chrome extension and dashboard. Uses LLMs, vector databases, and AI pipelines for contract review and insights.',
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
      'Early traction as paid project in legal-tech circles',
      'LLM-powered contract analysis and insights',
      'Chrome extension for seamless workflow integration',
      'Vector database for intelligent document processing',
      'Microservices architecture with AI pipelines',
    ],
    status: 'In Development',
    link: 'https://oystack.com',
    featured: true,
  },
  {
    title: 'KP Astro',
    subtitle: 'Astrology SaaS Platform',
    description: 'Advanced astrology platform with birth chart calculations, Swiss Ephemeris integration, and ML-powered insights.',
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
    description: "Leading research team on Astro Finance platform with ML models powered by Swiss Ephemeris Engine.",
    achievements: [
      "Designed Django backend for 10M+ users",
      "Implemented autonomous AI agents with Agno Framework",
      "Built high-accuracy ML models",
    ],
  },
  {
    period: "Nov 2023 – Nov 2024",
    title: "Senior Software Engineer & Technical Lead",
    company: "Niyo Group",
    department: "EdTech",
    description: "Spearheaded development of scalable EdTech platform with real-time collaboration features (\"Learn with a Friend\"). Integrated AI-powered video transcription and streaming infrastructure.",
    achievements: [
      "Built real-time infrastructure serving thousands of learners",
      "Migrated from MP4 → HLS for scalable video streaming",
      "AI-powered video transcription with Whisper integration",
      "40% increase in session engagement through collaborative features",
    ],
  },
  {
    period: "Jan 2023 – Nov 2023",
    title: "Senior Frontend Developer",
    company: "Nomba (formerly Kudi)",
    department: "Fintech",
    description: "Singlehandedly revamped the entire Marketing Frontend post rebrand from Kudi. Built multiple high-throughput pages including responsive animations for Nomba Terminal purchase.",
    achievements: [
      "Drove 21,000+ terminal sales through optimized marketing pages",
      "Contributed to company growth ahead of $30M Series B raise (May 2022)",
      "Built high-performance, responsive, and animated purchase flows",
      "Complete frontend architecture overhaul in record 8-month timeframe",
    ],
  },
  {
    period: "Nov 2020 – Present",
    title: "Co-Founder & CTO",
    company: "Startuplist Africa",
    department: "Startup Intelligence",
    description: "Founded and scaled Africa's No. 1 Startup Intelligence System. Grew platform to 300K+ users through manual data aggregation across startups, funding rounds, and ecosystems.",
    achievements: [
      "Established recognized source of truth in African tech space",
      "300% MRR growth via SPA → SSR migration and SEO optimization",
      "Micro-frontend architecture for scalable data aggregation",
      "Comprehensive business intelligence for startup ecosystem",
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
