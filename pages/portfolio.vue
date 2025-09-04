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
           <div class=" hero-content">
             <div class="mb-8 overflow-hidden">
               <h2 class="text-6xl md:text-7xl lg:text-8xl font-extralight text-gray-900 dark:text-gray-100 tracking-tight leading-none animate-slide-up">
                 Portfolio
               </h2>
             </div>
             
             <div class="mb-12 overflow-hidden">
               <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed font-light animate-slide-up-delayed">
                 Engineering intelligent systems, real-time experiences, and scalable products that impact millions.
               </p>
             </div>

             <!-- Action Buttons -->
             <div class="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
               <a
                 href="https://docs.google.com/document/d/1nhlf5X-M4HKSYbJ-e0UEuBLLmFAcIyYSc5T9wdHnazg/edit?usp=sharing"
                 target="_blank"
                 class="group inline-flex items-center gap-3 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-101 hover:shadow-lg font-medium"
               >
                 <span>View Resume</span>
                 <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                 </svg>
               </a>
               
             </div>
           </div>


         </div>
       </div>

             <!-- Professional Experience -->
       <section id="experience" class="mb-32">
         <h2
           class="text-2xl font-light text-gray-900 dark:text-gray-100 mb-16 tracking-wide"
         >
           Professional Experience
         </h2>

        <div class="space-y-16">
          <ExperienceCard
            v-for="experience in experiences"
            :key="experience.title + experience.company"
            :experience="experience"
          />
        </div>
      </section>

             <!-- Key Projects -->
       <section id="work" class="mb-32">
         <h2
           class="text-2xl font-light text-gray-900 dark:text-gray-100 mb-16 tracking-wide"
         >
           Key Projects
         </h2>

        <div class="space-y-20">
          <ProjectCard
            v-for="project in featuredProjects"
            :key="project.title"
            :project="project"
          />
        </div>
      </section>

             <!-- Side Projects Grid -->
       <section id="experiments" class="mb-32">
         <h2
           class="text-2xl font-light text-gray-900 dark:text-gray-100 mb-16 tracking-wide"
         >
           Side Projects
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
          <ExpertiseCard
            v-for="expertise in expertiseAreas"
            :key="expertise.title"
            :expertise="expertise"
          />
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
              Ready to bring your ideas to life ?
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

<script setup lang="ts">
import { featuredProjects, indieProjects, experiences, expertiseAreas, type Project, type IndieProject, type Experience, type ExpertiseArea } from '~/data/projects'

// Navigation sections with elegant structure
const sections = [
  { id: "overview", label: "Overview" },
  { id: "experience", label: "Professional Experience" },
  { id: "work", label: "Key Projects" },
  { id: "experiments", label: "Side Projects" },
  { id: "expertise", label: "Expertise" },
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
