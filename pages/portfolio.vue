<template>
  <div class="relative">
    <!-- Elegant Table of Contents -->
    <nav
      class="fixed right-12 top-1/2 transform -translate-y-1/2 z-30 hidden xl:block"
    >
      <div class="relative">
        <!-- Progress Line -->
        <div
          class="absolute left-0 top-0 w-px h-full bg-gray-200 dark:bg-gray-700"
        ></div>
        <div
          class="absolute left-0 top-0 w-px bg-gradient-to-b from-red-500 to-red-400 transition-all duration-700 ease-out"
          :style="{ height: scrollProgress + '%' }"
        ></div>

        <!-- Navigation Items -->
        <ul class="relative space-y-8 py-2">
          <li
            v-for="(section, index) in sections"
            :key="section.id"
            class="relative"
          >
            <button
              @click="scrollToSection(section.id)"
              :class="[
                'group relative flex items-center transition-all duration-300 ease-out',
                activeSection === section.id
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300',
              ]"
            >
              <!-- Indicator Dot -->
              <div
                class="relative flex items-center justify-center w-3 h-3 -ml-1.5"
              >
                <div
                  :class="[
                    'w-2 h-2 rounded-full transition-all duration-300 ease-out',
                    activeSection === section.id
                      ? 'bg-red-500 scale-125 shadow-lg shadow-red-200 dark:shadow-red-900'
                      : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-gray-400 dark:group-hover:bg-gray-500 group-hover:scale-110',
                  ]"
                ></div>
              </div>

              <!-- Section Label -->
              <span
                :class="[
                  'ml-6 text-xs font-medium tracking-wide transition-all duration-300 ease-out whitespace-nowrap',
                  activeSection === section.id
                    ? 'translate-x-1 opacity-100'
                    : 'translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100',
                ]"
              >
                {{ section.label }}
              </span>
            </button>

            <!-- Section Number -->
            <div
              :class="[
                'absolute -left-8 top-0 flex items-center justify-center w-6 h-3 text-xs font-light transition-all duration-300',
                activeSection === section.id
                  ? 'text-red-500 opacity-100'
                  : 'text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-70',
              ]"
            >
              {{ String(index + 1).padStart(2, "0") }}
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <main class="max-w-4xl px-6 sm:px-8">
             <!-- Hero Section -->
       <div id="overview" class="relative my-32 overflow-hidden">
         <!-- Subtle Background Elements -->
         <div class="absolute inset-0 -z-10">
           <div class="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-full blur-3xl opacity-30 animate-float"></div>
           <div class="absolute top-40 left-10 w-96 h-96 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-full blur-3xl opacity-20 animate-float-delayed"></div>
         </div>

         <div class="relative z-10">
           <!-- Main Content -->
           <div class="mb-16 hero-content">
             <div class="mb-8 overflow-hidden">
               <h1 class="text-6xl md:text-7xl lg:text-8xl font-extralight text-gray-900 dark:text-gray-100 tracking-tight leading-none animate-slide-up">
                 Portfolio
               </h1>
             </div>
             
             <div class="mb-12 overflow-hidden">
               <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed font-light animate-slide-up-delayed">
                 7+ years crafting intelligent systems, real-time experiences, and scalable products that impact millions.
               </p>
             </div>

             <!-- Action Buttons -->
             <div class="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
               <a
                 href="https://docs.google.com/document/d/1nhlf5X-M4HKSYbJ-e0UEuBLLmFAcIyYSc5T9wdHnazg/edit?usp=sharing"
                 target="_blank"
                 class="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
               >
                 <span>View Resume</span>
                 <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                 </svg>
               </a>
               
               <!-- PDF Export Button - Client Side Only -->
               <ClientOnly>
                 <div class="export-button">
                   <button
                     @click="exportToPDF"
                     :disabled="isExporting"
                     class="group inline-flex items-center gap-3 px-8 py-4 text-gray-900 dark:text-gray-100 border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                   >
                     <svg
                       v-if="!isExporting"
                       class="w-4 h-4 transition-transform duration-300 group-hover:translate-y-[-2px]"
                       fill="none"
                       stroke="currentColor"
                       viewBox="0 0 24 24"
                     >
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                     </svg>
                     <svg
                       v-else
                       class="w-4 h-4 animate-spin"
                       fill="none"
                       viewBox="0 0 24 24"
                     >
                       <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                       <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     <span>{{ isExporting ? "Exporting..." : "Export PDF" }}</span>
                   </button>
                 </div>
                 <template #fallback>
                   <div class="text-sm text-gray-500 dark:text-gray-400">
                     Loading...
                   </div>
                 </template>
               </ClientOnly>
             </div>
           </div>


         </div>
       </div>

      <!-- Featured Projects -->
      <section id="work" class="mb-32">
        <h2
          class="text-2xl font-light text-gray-900 dark:text-gray-100 mb-16 tracking-wide"
        >
          Selected Work
        </h2>

        <div class="space-y-20">
          <!-- Startuplist Africa -->
          <ProjectCard
            :project="{
              title: 'Startuplist Africa',
              subtitle: 'Co-Founder & CTO',
              description:
                'Founded and scaled Africa\'s No. 1 Startup Intelligence System. Grew platform to 300K+ users, manually aggregating data across startups, funding rounds, and ecosystems.',
              technologies: [
                'Django',
                'Next.js',
                'PostgreSQL',
                'Vue.js',
                'AWS',
              ],
              highlights: [
                'Established recognized source of truth in African tech space',
                '300K+ users through comprehensive data aggregation',
                '300% MRR growth via SPA → SSR migration and SEO optimization',
                'Micro-frontend architecture for scalable intelligence platform',
                'Comprehensive business intelligence for startup ecosystem',
              ],
              status: 'Production',
              link: 'https://startuplist.africa',
              featured: true,
            }"
                     />

           <!-- Box.tools -->
           <ProjectCard
             :project="{
               title: 'Box.tools',
               subtitle: 'Digital Productivity Platform',
               description:
                 'Built a comprehensive digital productivity toolbox that streamlines workflows for modern teams. Designed for efficiency and scalability with a focus on user experience and performance.',
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
             }"
           />

           <!-- Niyo Labs -->
          <ProjectCard
            :project="{
              title: 'Niyo Labs EdTech Platform',
              subtitle: 'Technical Lead',
              description:
                'Spearheaded development of scalable EdTech platform with real-time collaboration features (Learn with a Friend). Integrated AI-powered video transcription and streaming infrastructure.',
              technologies: [
                'NestJS',
                'MongoDB',
                'Elasticsearch',
                'Redis',
                'Next.js',
                'GCP',
              ],
              highlights: [
                'Built real-time infrastructure serving thousands of learners',
                'Migrated from MP4 to HLS for scalable video streaming',
                'AI-powered video transcription with Whisper integration',
                '40% increase in session engagement through collaborative features',
                'Vector-based recommendation engine for personalized learning',
                             ],
               status: 'Production',
               link: 'https://www.niyolabs.com',
               featured: true,
             }"
           />

           <!-- BonBonPay -->
           <ProjectCard
             :project="{
               title: 'BonBonPay',
               subtitle: 'Complete Payment Platform',
               description:
                 'Developed a comprehensive fintech payment solution including web platform, mobile application, and super admin dashboard. Full-stack development covering user experience, payment processing, and administrative controls.',
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
             }"
           />

           <!-- Victor Onazi Portfolio -->
           <ProjectCard
             :project="{
               title: 'Victor Onazi Portfolio',
               subtitle: 'Designer Portfolio & Personal Brand',
               description:
                 'Developed a sophisticated portfolio website for product designer Victor Onazi that directly contributed to securing a senior designer position. Clean, professional design showcasing 5+ years of UX work with seamless user experience.',
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
             }"
           />

           <!-- Kwara SAPZ Government Portal -->
           <ProjectCard
             :project="{
               title: 'Kwara SAPZ Government Portal',
               subtitle: 'State Government Agricultural Platform',
               description:
                 'Developed the official government portal for Kwara State SAPZ (Special Agro-Industrial Processing Zones), transforming agricultural development through modern agro-processing infrastructure. Platform supports farmer training, value chain development, and agricultural transformation initiatives.',
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
             }"
           />

           <!-- Saphir Restaurant -->
           <ProjectCard
             :project="{
               title: 'Saphir Restaurant',
               subtitle: 'Fine Dining Experience Platform',
               description:
                 'Created an elegant coming-soon website for Saphir, a premium fine dining restaurant in Ilorin. Features sophisticated waitlist management, early access reservations, and strategic pre-launch marketing to build anticipation.',
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
             }"
           />

           <!-- Oystack -->
          <ProjectCard
            :project="{
              title: 'Oystack',
              subtitle: 'Contract Intelligence Assistant',
              description:
                'Building a contract intelligence assistant with Chrome extension and dashboard. Uses LLMs, vector databases, and AI pipelines for contract review and insights.',
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
             }"
           />

           <!-- KP Astro -->
          <ProjectCard
            :project="{
              title: 'KP Astro',
              subtitle: 'Astrology SaaS Platform',
              description:
                'Advanced astrology platform with birth chart calculations, Swiss Ephemeris integration, and ML-powered insights.',
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
            }"
          />
        </div>
      </section>

      <!-- Indie Projects Grid -->
      <section id="experiments" class="mb-32">
        <h2
          class="text-2xl font-light text-gray-900 dark:text-gray-100 mb-16 tracking-wide"
        >
          Experiments
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <IndieProjectCard
            v-for="project in indieProjects"
            :key="project.title"
            :project="project"
          />
        </div>
      </section>

      <!-- Technical Expertise -->
      <section id="expertise" class="mb-32">
        <h2
          class="text-2xl font-light text-gray-900 dark:text-gray-100 mb-16 tracking-wide"
        >
          Expertise
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          <!-- AI & LLMs -->
          <div class="space-y-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              AI & Machine Learning
            </h3>
            <div class="space-y-2 text-gray-600 dark:text-gray-400">
              <div>GPT Integration</div>
              <div>Gemini</div>
              <div>Whisper</div>
              <div>PGVector</div>
              <div>Recommendation Systems</div>
            </div>
          </div>

          <!-- Real-Time Systems -->
          <div class="space-y-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              Real-Time Systems
            </h3>
            <div class="space-y-2 text-gray-600 dark:text-gray-400">
              <div>WebSockets</div>
              <div>WebRTC</div>
              <div>Server-Sent Events</div>
              <div>Live Streaming</div>
              <div>Collaborative Editing</div>
            </div>
          </div>

          <!-- Web Development -->
          <div class="space-y-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              Web Development
            </h3>
            <div class="space-y-2 text-gray-600 dark:text-gray-400">
              <div>Vue.js / Nuxt3</div>
              <div>React / Next.js</div>
              <div>Django</div>
              <div>NestJS</div>
              <div>TypeScript</div>
            </div>
          </div>

          <!-- Backend & Infrastructure -->
          <div class="space-y-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              Backend & Infrastructure
            </h3>
            <div class="space-y-2 text-gray-600 dark:text-gray-400">
              <div>Django / FastAPI</div>
              <div>Kafka</div>
              <div>PostgreSQL</div>
              <div>Redis</div>
              <div>Docker</div>
            </div>
          </div>

          <!-- Blockchain & Web3 -->
          <div class="space-y-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              Blockchain & Web3
            </h3>
            <div class="space-y-2 text-gray-600 dark:text-gray-400">
              <div>Solidity</div>
              <div>Web3.js / Ethers.js</div>
              <div>DeFi Protocols</div>
              <div>Smart Contracts</div>
              <div>TheGraph</div>
            </div>
          </div>

          <!-- DevOps & Cloud -->
          <div class="space-y-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              DevOps & Cloud
            </h3>
            <div class="space-y-2 text-gray-600 dark:text-gray-400">
              <div>AWS / GCP</div>
              <div>Pulumi / Terraform</div>
              <div>CI/CD</div>
              <div>Elasticsearch</div>
              <div>Monitoring & Scaling</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Timeline -->
      <section id="experience" class="mb-32">
        <h2
          class="text-2xl font-light text-gray-900 dark:text-gray-100 mb-16 tracking-wide"
        >
          Experience
        </h2>

        <div class="space-y-16">
          <div class="border-l-2 border-gray-200 dark:border-gray-700 pl-8">
            <div class="mb-6">
              <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Nov 2024 – Present
              </div>
              <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">
                Engineering Lead
              </h3>
              <div class="text-gray-600 dark:text-gray-400">
                Alveum • Research & AI
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Leading research team on Astro Finance platform with ML models
              powered by Swiss Ephemeris Engine.
            </p>
            <ul class="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Designed Django backend for 10M+ users</li>
              <li>• Implemented autonomous AI agents with Agno Framework</li>
              <li>• Built high-accuracy ML models</li>
            </ul>
          </div>

          <div class="border-l-2 border-gray-200 dark:border-gray-700 pl-8">
            <div class="mb-6">
              <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Nov 2023 – Nov 2024
              </div>
              <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">
                Technical Lead
              </h3>
              <div class="text-gray-600 dark:text-gray-400">
                Niyo Group • EdTech
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Spearheaded development of scalable EdTech platform with real-time
              collaboration features ("Learn with a Friend"). Integrated
              AI-powered video transcription and streaming infrastructure.
            </p>
            <ul class="space-y-1 text-gray-600 dark:text-gray-400">
              <li>
                • Built real-time infrastructure serving thousands of learners
              </li>
              <li>• Migrated from MP4 → HLS for scalable video streaming</li>
              <li>• AI-powered video transcription with Whisper integration</li>
              <li>
                • 40% increase in session engagement through collaborative
                features
              </li>
            </ul>
          </div>

          <div class="border-l-2 border-gray-200 dark:border-gray-700 pl-8">
            <div class="mb-6">
              <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Feb 2023 – Oct 2023 (8 months)
              </div>
              <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">
                Senior Frontend Developer
              </h3>
              <div class="text-gray-600 dark:text-gray-400">
                Nomba (formerly Kudi) • Fintech
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Singlehandedly revamped the entire Marketing Frontend post rebrand
              from Kudi. Built multiple high-throughput pages including
              responsive animations for Nomba Terminal purchase.
            </p>
            <ul class="space-y-1 text-gray-600 dark:text-gray-400">
              <li>
                • Drove 21,000+ terminal sales through optimized marketing pages
              </li>
              <li>
                • Contributed to company growth ahead of $30M Series B raise
                (May 2022)
              </li>
              <li>
                • Built high-performance, responsive, and animated purchase
                flows
              </li>
              <li>
                • Complete frontend architecture overhaul in record 8-month
                timeframe
              </li>
            </ul>
          </div>

          <div class="border-l-2 border-gray-200 dark:border-gray-700 pl-8">
            <div class="mb-6">
              <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Nov 2020 – Present
              </div>
              <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">
                Co-Founder & CTO
              </h3>
              <div class="text-gray-600 dark:text-gray-400">
                Startuplist Africa • Startup Intelligence
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Founded and scaled Africa's No. 1 Startup Intelligence System.
              Grew platform to 300K+ users through manual data aggregation
              across startups, funding rounds, and ecosystems.
            </p>
            <ul class="space-y-1 text-gray-600 dark:text-gray-400">
              <li>
                • Established recognized source of truth in African tech space
              </li>
              <li>
                • 300% MRR growth via SPA → SSR migration and SEO optimization
              </li>
              <li>
                • Micro-frontend architecture for scalable data aggregation
              </li>
              <li>
                • Comprehensive business intelligence for startup ecosystem
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Personal Statement -->
      <section id="philosophy" class="mb-32">
        <h2
          class="text-2xl font-light text-gray-900 dark:text-gray-100 mb-16 tracking-wide"
        >
          Philosophy
        </h2>

        <div
          class="max-w-3xl space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed"
        >
          <p class="text-lg">
            My focus every day is to create meaningful impact, leaving lasting
            value on both the projects I build and the people I work alongside.
            In recent years, I’ve stepped into projects thought to be beyond
            saving and successfully turned them around in record time.
          </p>

          <p>
            Teammates I’ve collaborated with, engineers, managers, and testers
            alike, often describe our time together as some of the most
            rewarding moments in their careers. I thrive at the intersection of
            people and systems, strategy and execution, always aiming to help
            teams and products move forward with clarity and momentum.
          </p>

          <p>
            What does that look like in practice? Some days it starts with a
            thoughtful conversation with a product manager, breaking down
            complexity and surfacing hidden needs. Other times, it means
            gathering dependencies, leading collaborative workshops, and
            aligning the broader team. And when it’s time to act, I dive into
            shared sessions with engineers, shaping system requirements and
            building prototypes that bring ideas to life.
          </p>
        </div>
      </section>

      <!-- Contact & Resume Section -->
      <section id="contact" class="mb-32">
        <div class="border-t border-gray-200 dark:border-gray-700 pt-20">
          <h2
            class="text-2xl font-light text-gray-900 dark:text-gray-100 mb-12 tracking-wide"
          >
            Get In Touch
          </h2>

          <div class="space-y-8">
            <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Ready to bring your ideas to life with cutting-edge technology and
              proven expertise?
            </p>

                         <div class="flex flex-col sm:flex-row gap-6">
               <a
                 href="mailto:obajohn75@gmail.com"
                 class="inline-flex items-center text-gray-900 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 transition-colors"
               >
                 obajohn75@gmail.com
               </a>
             </div>

            <div class="flex gap-8 pt-4">
              <a
                href="https://github.com/johnexzy"
                target="_blank"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/johnoba"
                target="_blank"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/_afrodev"
                target="_blank"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* PDF Export Optimizations */
@media print {
  .export-button {
    display: none !important;
  }

  nav {
    display: none !important;
  }

  main {
    margin-left: 0 !important;
  }

  .fluid-background {
    display: none !important;
  }

  main {
    max-width: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .page-break {
    page-break-before: always;
  }

  .avoid-break {
    page-break-inside: avoid;
  }
}

/* PDF-specific styles for better layout */
.pdf-optimized {
  font-size: 12px;
  line-height: 1.5;
  color: #000 !important;
  background: white !important;
}

.pdf-optimized * {
  color: #1f2937 !important;
  background-color: transparent !important;
}

.pdf-optimized p,
.pdf-optimized span,
.pdf-optimized div,
.pdf-optimized li {
  color: #374151 !important;
}

.pdf-optimized h1 {
  font-size: 24px;
  margin-bottom: 8px;
}

.pdf-optimized h2 {
  font-size: 18px;
  margin-bottom: 12px;
  margin-top: 20px;
}

.pdf-optimized h3 {
  font-size: 14px;
  margin-bottom: 8px;
}

.pdf-optimized .stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 20px 0;
  padding: 16px 0;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.pdf-optimized .project-section {
  margin-bottom: 24px;
  page-break-inside: avoid;
}

.pdf-optimized .contact-section {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}
</style>

<script setup lang="ts">
// PDF export state
const isExporting = ref(false);

// Navigation sections with elegant structure
const sections = [
  { id: "overview", label: "Overview" },
  { id: "work", label: "Selected Work" },
  { id: "experiments", label: "Experiments" },
  { id: "expertise", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "philosophy", label: "Philosophy" },
  { id: "contact", label: "Contact" },
];

// Reactive state
const activeSection = ref("overview");
const scrollProgress = ref(0);



// Elegant scroll to section with refined easing
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 100;
    const elementPosition = element.offsetTop - headerOffset;

    // Custom smooth scroll with refined curve
    const startPosition = window.pageYOffset;
    const distance = elementPosition - startPosition;
    const duration = Math.min(Math.abs(distance) / 2, 800); // Adaptive duration
    let start: number;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime: number) => {
      if (start === undefined) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }
};

// Sophisticated scroll tracking
const updateScrollProgress = () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgress.value = Math.min(Math.max(scrolled, 0), 100);

  // Update active section with refined detection
  const sectionOffsets = sections.map((section) => {
    const element = document.getElementById(section.id);
    return {
      id: section.id,
      offset: element ? element.offsetTop - 150 : 0,
    };
  });

  const currentScroll = window.pageYOffset + 200;

  for (let i = sectionOffsets.length - 1; i >= 0; i--) {
    if (currentScroll >= sectionOffsets[i].offset) {
      activeSection.value = sectionOffsets[i].id;
      break;
    }
  }
};

// Lifecycle management
onMounted(() => {
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollProgress);
});

// PDF Export Function - Client-side only
const exportToPDF = async () => {
  // Multiple layers of client-side protection
  if (!process.client || typeof window === "undefined" || isExporting.value) {
    return;
  }

  isExporting.value = true;

  try {
    // Dynamic import for client-side only with timeout
    const html2pdfModule = await Promise.race([
      import("html2pdf.js"),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Import timeout")), 5000)
      ),
    ]);
    const html2pdf = html2pdfModule.default;

    // Get the main content element (excluding navigation and background)
    const element = document.querySelector("main");

    if (!element) {
      throw new Error("Portfolio content not found");
    }

    // Create a clean copy and strip all problematic classes
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = element.innerHTML;

    // Remove ALL dark mode and gray text classes completely
    const allElements = tempContainer.querySelectorAll("*");
    allElements.forEach((el) => {
      if (el.className) {
        // Handle both regular className strings and SVGAnimatedString objects
        const classString =
          typeof el.className === "string"
            ? el.className
            : el.className.baseVal || "";
        if (classString && typeof classString === "string") {
          const classList = classString
            .split(" ")
            .filter(
              (cls) =>
                !cls.includes("text-gray") &&
                !cls.includes("dark:text") &&
                !cls.includes("text-white") &&
                !cls.includes("opacity-")
            );
          if (typeof el.className === "string") {
            el.className = classList.join(" ");
          } else if (el.className.baseVal !== undefined) {
            el.className.baseVal = classList.join(" ");
          }
        }
      }
    });

    tempContainer.className = "pdf-optimized";
    tempContainer.style.cssText = `
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      line-height: 1.5;
      color: #000000 !important;
      background: white !important;
      padding: 40px;
      max-width: none;
      width: 100%;
      font-size: 12px;
    `;

    // Add CSS to override all potential light text colors - simpler approach
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      * { color: #000000 !important; background: white !important; }
      h1 { color: #000000 !important; font-size: 36px !important; font-weight: 600 !important; }
      h2 { color: #000000 !important; font-size: 24px !important; }
      h3 { color: #000000 !important; font-size: 18px !important; }
      p { color: #333333 !important; }
      div { color: #333333 !important; }
      span { color: #333333 !important; }
    `;
    tempContainer.appendChild(styleElement);

    // Hide the export button and optimize elements for PDF
    const exportButton = tempContainer.querySelector(".export-button");
    if (exportButton) {
      exportButton.style.display = "none";
    }

    // Apply PDF-specific classes and styles
    const sections = tempContainer.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.add("project-section", "avoid-break");
    });

    // Style headings for better PDF appearance
    const headings = tempContainer.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading) => {
      heading.style.setProperty("color", "#000000", "important");
      heading.style.fontWeight = "600";
    });

    // Direct color forcing - simple and effective
    const pdfElements = tempContainer.querySelectorAll("*");
    pdfElements.forEach((el) => {
      if (el.tagName === "H1" || el.tagName === "H2" || el.tagName === "H3") {
        el.style.color = "#000000";
      } else {
        el.style.color = "#333333";
      }
    });

    // That's it - keep it simple

    // PDF configuration
    const opt = {
      margin: [15, 15, 15, 15],
      filename: "John_Oba_Portfolio.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
    };

    // Temporarily add to DOM for rendering
    document.body.appendChild(tempContainer);

    // Generate PDF
    await html2pdf().set(opt).from(tempContainer).save();

    // Clean up
    document.body.removeChild(tempContainer);
  } catch (error) {
    console.error("PDF export failed:", error);

    // More user-friendly error handling
    if (error instanceof Error) {
      if (error.message.includes("html2pdf")) {
        alert(
          "PDF export library failed to load. Please refresh the page and try again."
        );
      } else {
        alert(`PDF export failed: ${error.message}. Please try again.`);
      }
    } else {
      alert(
        "Failed to export PDF. Please check your browser compatibility and try again."
      );
    }
  } finally {
    isExporting.value = false;
  }
};

// SEO Meta
useServerSeoMeta({
  title: "Portfolio - John Oba | Senior Software Engineer & Technical Lead",
  ogTitle: "Portfolio - John Oba | Senior Software Engineer & Technical Lead",
  description:
    "Explore John Oba's portfolio showcasing 7+ years of building intelligent systems, real-time experiences, and scalable products. From AI-powered platforms to blockchain innovations.",
  ogDescription:
    "Explore John Oba's portfolio showcasing 7+ years of building intelligent systems, real-time experiences, and scalable products. From AI-powered platforms to blockchain innovations.",
  ogImage:
    "https://res.cloudinary.com/dpq6dieap/image/upload/v1678755812/meta_en37in.png",
  twitterCard: "summary_large_image",
});

// Indie Projects Data
const indieProjects = [
  {
    title: "Box.tools",
    description: "Digital productivity toolbox for streamlined workflows",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "FastAPI"],
    status: "Production",
    link: "https://box.tools",
  },
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
</script>

<style scoped>
.slide-enter-content {
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced Hero Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(1deg);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(-1deg);
  }
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(60px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up-delayed {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}



.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 10s ease-in-out infinite;
}

.animate-slide-up {
  animation: slide-up 1s ease-out forwards;
}

.animate-slide-up-delayed {
  animation: slide-up-delayed 1s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out 0.4s forwards;
  opacity: 0;
}


</style>
