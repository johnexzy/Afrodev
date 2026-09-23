import { blogOrigin } from "../utils/site";

export type WorkKind = "Product" | "Open source" | "Experiment" | "Client work";
export interface WorkProject {
  slug: string;
  title: string;
  category: string;
  kind: WorkKind;
  period: string;
  role: string;
  summary: string;
  description: string;
  visual:
    | "atlas"
    | "now"
    | "research"
    | "sync"
    | "pixels"
    | "native"
    | "voice"
    | "tools";
  details: { title: string; text: string }[];
  stack: string[];
  links: { label: string; href: string }[];
}

export const projects: WorkProject[] = [
  {
    slug: "startuplist-africa",
    title: "StartupList Africa",
    category: "Data & discovery",
    kind: "Product",
    period: "2020 — ongoing",
    role: "Co-founder & engineering",
    summary: "Making Africa’s startup ecosystem easier to find and understand.",
    description:
      "I co-founded StartupList Africa and built the software behind its company profiles, funding records, investor directory, and publishing tools. It is a long-running exercise in turning scattered information into a useful, connected record.",
    visual: "atlas",
    details: [
      {
        title: "A directory is only the beginning.",
        text: "A company connects to people, investors, funding rounds, industries, and places. The work is in making those relationships useful: finding a startup, understanding its context, and following the sources behind a record.",
      },
      {
        title: "The work behind the page.",
        text: "I work across the public website, the backend, data ingestion, internal review tools, and infrastructure. Publishing and maintaining the data is as much a product problem as presenting it.",
      },
      {
        title: "Built to keep being useful.",
        text: "The platform has grown from a startup directory into a broader source of market information. Search, server-rendered pages, and structured records help people get to the information they came for.",
      },
    ],
    stack: ["Next.js", "PostgreSQL", "Data pipelines", "Google Cloud"],
    links: [
      { label: "Visit StartupList", href: "https://www.startuplist.africa" },
      {
        label: "Read the story",
        href: `${blogOrigin}/startuplist-africa-4yrs-anniversary`,
      },
    ],
  },
  {
    slug: "now",
    title: "Now",
    category: "Native macOS",
    kind: "Open source",
    period: "2026",
    role: "Product, design & engineering",
    summary: "A small working clipboard. Seven active clips, always close.",
    description:
      "Copying something new shouldn’t make the previous thing disappear. Now is a native menu-bar app that keeps seven active clips within reach, with older clips available when you search. It all stays on your Mac.",
    visual: "now",
    details: [
      {
        title: "A working surface, sized for the moment.",
        text: "The seven most recent clips are immediately available. The previous clip is preselected because it is often the one you meant to recover. Arrow keys, number keys, and Return make the whole surface usable from the keyboard.",
      },
      {
        title: "One copy stays one clip.",
        text: "A clipboard item can contain text, rich text, images, links, and files at the same time. Now preserves those representations together, so pasting doesn’t silently flatten what you copied. An exact duplicate moves forward instead of creating another card.",
      },
      {
        title: "Small by design.",
        text: "Now uses SwiftUI, AppKit, and SwiftData, with no third-party runtime dependencies. There is no account or sync service. Normal paste keeps working, and direct paste is an optional Accessibility capability.",
      },
    ],
    stack: ["Swift", "SwiftUI", "AppKit", "SwiftData"],
    links: [
      {
        label: "Source & download",
        href: "https://github.com/johnexzy/now-macos",
      },
    ],
  },
  {
    slug: "oystack",
    title: "Oystack",
    category: "Research software",
    kind: "Product",
    period: "In development",
    role: "Product & engineering",
    summary:
      "A workspace for papers, questions, and the evidence behind an answer.",
    description:
      "Oystack is my ongoing work on research software: bringing papers into a library, reading them, asking questions, and keeping useful findings connected to their sources. The current direction is grounded in the daily work of reading and building an argument.",
    visual: "research",
    details: [
      {
        title: "Keep the source in view.",
        text: "The workspace brings document reading, notes, collections, and conversations together. A finding should lead back to the material that supports it, so it can be checked and used again.",
      },
      {
        title: "From a file to something you can work with.",
        text: "The implementation spans document extraction, searchable chunks, embeddings, research tasks, and a reader interface. A browser extension helps bring papers into the workspace from the web.",
      },
      {
        title: "An evolving product.",
        text: "This is active product development. The earlier contract-review direction has given way to research and evidence workflows; I am still refining where the software helps most.",
      },
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Vector search", "Python"],
    links: [
      {
        label: "Ask me about Oystack",
        href: "mailto:obajohn75@gmail.com?subject=Oystack",
      },
    ],
  },
  {
    slug: "peerplay",
    title: "PeerPlay",
    category: "Real-time systems",
    kind: "Open source",
    period: "2023 — 2024",
    role: "Design & engineering",
    summary: "Watch together, even when you’re somewhere else.",
    description:
      "PeerPlay is a shared video room. Play, pause, and seek events travel between viewers, alongside chat and presence. The project became a practical way to explore what “together” means when everyone has a different connection.",
    visual: "sync",
    details: [
      {
        title: "One room, several clocks.",
        text: "Playback is shared state. A local action needs to reach the other viewers without causing a loop of echoed events. The player and socket layer coordinate those updates while keeping the controls responsive.",
      },
      {
        title: "The social part matters.",
        text: "Rooms include chat and a view of who is watching. Those small signals make the difference between playing the same file and feeling like you are watching with someone.",
      },
      {
        title: "An experiment you can inspect.",
        text: "The Next.js client and companion socket server are public. I also wrote about the broader challenges of collaborative systems: synchronization, conflicts, and the experience of unreliable networks.",
      },
    ],
    stack: ["Next.js", "TypeScript", "WebSockets", "React Player"],
    links: [
      { label: "Client source", href: "https://github.com/johnexzy/PeerPlay" },
      {
        label: "Socket server",
        href: "https://github.com/johnexzy/PeerPlaySocket",
      },
      {
        label: "Related writing",
        href: `${blogOrigin}/building-real-time-collaborative-systems`,
      },
    ],
  },
  {
    slug: "macos-computer-use",
    title: "macOS Computer Use",
    category: "Developer tools",
    kind: "Open source",
    period: "2026",
    role: "Design & engineering",
    summary:
      "Giving agents a precise way to inspect and operate Mac interfaces.",
    description:
      "A Model Context Protocol server with a native Swift core. It connects agents to macOS screenshots, Vision OCR, and Accessibility controls, with explicit targeting and permission boundaries.",
    visual: "native",
    details: [
      {
        title: "A window is a real boundary.",
        text: "A supplied window ID is authoritative. Invalid targets and app/window mismatches produce errors, rather than sending an action to an unrelated window. Semantic actions can work in the background without taking over the foreground app.",
      },
      {
        title: "Use the capability the task needs.",
        text: "Reading Accessibility controls and capturing the screen require different permissions. The server exposes a preflight so an agent can see what is available. Global input and arbitrary AppleScript are disabled in the default configuration.",
      },
      {
        title: "Make actions observable.",
        text: "Actions report how they were delivered and whether the result was verified. A separate cursor overlay makes the agent’s target visible without moving the person’s own pointer.",
      },
    ],
    stack: ["Swift", "Node.js", "MCP", "Vision", "Accessibility"],
    links: [
      {
        label: "View source",
        href: "https://github.com/johnexzy/macos-computer-use",
      },
    ],
  },
  {
    slug: "pixelator",
    title: "Pixelator",
    category: "Design tools",
    kind: "Open source",
    period: "Figma plugin",
    role: "Design & engineering",
    summary: "Turning Figma layers into something a little more pixelated.",
    description:
      "A small Figma plugin for pixelating images and filled shapes. It lets you adjust the cell size, preview the result, and turn an image into editable vector blocks.",
    visual: "pixels",
    details: [
      {
        title: "A visual tool should invite adjustment.",
        text: "The interaction is deliberately small: select a layer, adjust the pixel size, preview, and apply. Shape fills and image layers go through the same approachable workflow.",
      },
      {
        title: "From image to editable geometry.",
        text: "Image processing runs in the plugin’s UI, while the Figma side reads selections and creates the result. Vector output keeps the individual blocks available for further design work.",
      },
    ],
    stack: ["TypeScript", "Figma Plugin API", "Canvas"],
    links: [
      { label: "View source", href: "https://github.com/johnexzy/pixelator" },
      {
        label: "Read about Pixelator",
        href: `${blogOrigin}/introducing-pixelator-figma-plugin`,
      },
    ],
  },
  {
    slug: "xtts",
    title: "A voice for long-form narration",
    category: "Applied machine learning",
    kind: "Experiment",
    period: "2026",
    role: "Training & evaluation",
    summary: "Fine-tuning XTTS v2, then listening closely to what changed.",
    description:
      "A technical study in improving Bible narration through dataset expansion, checkpoint selection, and inference tuning. The article includes audio comparisons and the measurements behind the choices.",
    visual: "voice",
    details: [
      {
        title: "More training wasn’t the answer.",
        text: "The best validation checkpoint occurred at step 10,725. Training continued to step 35,750, but evaluation loss increased. Selecting the right checkpoint mattered more than using the last one.",
      },
      {
        title: "Measure, then listen.",
        text: "I compared pacing, pitch behavior, spectral similarity, and audible delivery. The case study distinguishes training signals from listening observations and describes the limits of the local evaluation.",
      },
    ],
    stack: ["Python", "PyTorch", "XTTS v2", "Audio evaluation"],
    links: [
      {
        label: "Read & listen",
        href: `${blogOrigin}/fine-tuning-xtts-v2-for-more-natural-bible-narration`,
      },
    ],
  },
  {
    slug: "box-tools",
    title: "Box.tools",
    category: "Web tools",
    kind: "Product",
    period: "Ongoing",
    role: "Product & engineering",
    summary:
      "A browser toolbox, with a new chapter in image and film creation.",
    description:
      "Box.tools began with everyday file, text, and image tools. The public site still serves those utilities. My current development work explores dedicated image, cinema, and film studios on a shared generation pipeline.",
    visual: "tools",
    details: [
      {
        title: "Useful software, one task at a time.",
        text: "The original toolbox brings common tasks into the browser: file conversion, text utilities, image processing, and developer tools. Each tool starts with the thing a person wants to get done.",
      },
      {
        title: "A new direction in progress.",
        text: "The studio work joins image generation and editing with storyboards, consistent characters, video, and export. Credits and generation jobs share a durable lifecycle, so retries and incomplete jobs can be handled coherently.",
      },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Media pipelines"],
    links: [
      { label: "Visit the toolbox", href: "https://box.tools" },
      { label: "The original launch", href: `${blogOrigin}/box.tools-launch` },
    ],
  },
];

export const smallWorks = [
  {
    title: "Smart recommender",
    category: "Embeddings",
    description:
      "Text embeddings, similarity, and recommendations with PostgreSQL and Gemini.",
    href: "https://github.com/johnexzy/Smart-recommender",
  },
  {
    title: "pgvector + Gemini starter",
    category: "Developer tools",
    description:
      "A Next.js starting point for working with embeddings and generative AI.",
    href: "https://github.com/johnexzy/Nextjs-pgvector-starter-with-google-genai",
  },
  {
    title: "SendUSDC",
    category: "Smart contracts",
    description:
      "An EIP-3009 experiment: transfer USDC with a separate wallet paying for gas.",
    href: "https://github.com/johnexzy/sendUsdc",
  },
  {
    title: "AnniBo",
    category: "Early AI experiments",
    description:
      "An early GPT-3 writing assistant, with a companion browser extension.",
    href: "https://github.com/johnexzy/annibo",
  },
  {
    title: "Dalle-gen",
    category: "Creative tools",
    description: "Generating images from a Discord conversation.",
    href: "https://github.com/johnexzy/Dalle-gen",
  },
  {
    title: "TokenPass",
    category: "Smart contracts",
    description: "An experiment in token-gated publishing and content access.",
    href: "https://github.com/johnexzy/tokenpass-frontend",
  },
];

export const collaborations = [
  {
    title: "Nomba",
    description:
      "Marketing frontend and the terminal purchase experience after the Kudi rebrand.",
    discipline: "Frontend engineering",
    href: "https://nomba.com",
  },
  {
    title: "Niyo Group",
    description:
      "Real-time learning, HLS video delivery, and transcription with Whisper.",
    discipline: "Technical leadership",
    href: "https://niyo.co",
  },
  {
    title: "KP Astro / Alveum",
    description:
      "Backend systems, Swiss Ephemeris calculations, and AI-assisted interpretation.",
    discipline: "Backend engineering",
    href: `${blogOrigin}/from-zero-knowledge-to-kp-astro`,
  },
  {
    title: "BonBonPay",
    description:
      "Customer payment flows across web, mobile, and internal administration.",
    discipline: "Product engineering",
    href: "https://www.bonbonpay.com",
  },
  {
    title: "Victor Onazi",
    description:
      "A portfolio that gives a product designer’s case studies room to speak.",
    discipline: "Web development",
    href: "https://www.victoronazi.com",
  },
  {
    title: "Kwara SAPZ",
    description:
      "The public programme website, activities, and content management workflow.",
    discipline: "Web development",
    href: "https://kw.sapz.gov.ng",
  },
  {
    title: "Saphir",
    description:
      "A restaurant launch website with a waitlist and reservation flow.",
    discipline: "Web development",
    href: "https://www.saphirrestaurant.com",
  },
];
