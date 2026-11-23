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
    category: "Startup database",
    kind: "Product",
    period: "2020 — present",
    role: "Co-founder & CTO",
    summary: "A database of African startups, funding rounds, and investors.",
    description:
      "I co-founded StartupList Africa in 2020 and built the platform behind it: company profiles, funding rounds, investor directories, and the internal tools our team uses to publish and maintain the data.",
    visual: "atlas",
    details: [
      {
        title: "Connecting companies, funding, and people",
        text: "Every company links to founders, investors, funding rounds, sectors, and countries. Most of the product work goes into keeping those connections clean so people can look up a startup, check its funding history, and trace where the data came from.",
      },
      {
        title: "The tooling behind the site",
        text: "I handle the public frontend, backend APIs, data ingestion, internal review workflows, and cloud infra. Keeping the data accurate and easy for the team to update takes just as much engineering as the pages visitors see.",
      },
      {
        title: "Built for search and discovery",
        text: "Over time it grew from a simple directory into a broader research tool for founders, investors, and journalists. Server-rendered pages, structured records, and filtering make it quick to find what you’re looking for.",
      },
    ],
    stack: ["Next.js", "PostgreSQL", "Data pipelines", "Google Cloud"],
    links: [
      { label: "Visit StartupList", href: "https://www.startuplist.africa" },
      {
        label: "Read the anniversary post",
        href: `${blogOrigin}/startuplist-africa-4yrs-anniversary`,
      },
    ],
  },
  {
    slug: "now",
    title: "Now",
    category: "macOS app",
    kind: "Open source",
    period: "2026",
    role: "Creator",
    summary:
      "A lightweight Mac clipboard manager that keeps your last 7 clips handy.",
    description:
      "I got tired of copying something new and immediately losing what I had on my clipboard ten seconds ago. Now sits in your Mac menu bar and keeps your 7 most recent clips one shortcut away, with search for older ones. Everything stays local on your machine.",
    visual: "now",
    details: [
      {
        title: "Built around 7 active clips",
        text: "When you open Now, your 7 latest clips are right there, with the previous one already highlighted since that’s usually what you’re trying to grab back. Arrow keys, number keys, and Return handle everything without touching the mouse.",
      },
      {
        title: "Doesn’t flatten what you copied",
        text: "A single copy on macOS can hold plain text, rich text, links, images, and files at once. Now keeps all of those formats together so pasting works the way you expect. Copying the same thing twice just moves it back to the front instead of cluttering the list.",
      },
      {
        title: "Native Swift, zero bloat",
        text: "Built with SwiftUI, AppKit, and SwiftData. No Electron, no third-party runtime dependencies, no account, and no cloud sync. Standard copy/paste works out of the box, and direct paste is an optional Accessibility toggle.",
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
    category: "Research tool",
    kind: "Product",
    period: "In progress",
    role: "Creator",
    summary:
      "A workspace for reading papers, taking notes, and tracing answers back to sources.",
    description:
      "Oystack is a research workspace I’m actively building. You bring papers into a library, read and take notes, ask questions, and keep every answer tied back to the exact passage it came from.",
    visual: "research",
    details: [
      {
        title: "Every answer links back to the paper",
        text: "Reading, notes, collections, and Q&A all live in the same workspace. Whenever you pull out a finding or get an answer, you can jump straight back to the source material to double-check it.",
      },
      {
        title: "Under the hood",
        text: "The backend handles document extraction, chunking, vector embeddings, and background research jobs, paired with a reader UI and a browser extension for saving papers straight from the web.",
      },
      {
        title: "Still taking shape",
        text: "This started out as a contract-review tool before pivoting into research and evidence workflows. I’m still actively iterating on it and figuring out which parts actually save people time.",
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
    category: "Real-time web",
    kind: "Open source",
    period: "2023 — 2024",
    role: "Creator",
    summary: "Watch videos in sync with friends from anywhere.",
    description:
      "PeerPlay is a watch-party web app I built to watch videos with friends remotely. Play, pause, and seek events sync across everyone in the room alongside live chat and presence. It turned into a fun deep dive into handling flaky connections.",
    visual: "sync",
    details: [
      {
        title: "Keeping playback in sync",
        text: "When someone pauses or scrubs the video, that event has to reach everyone else without triggering an endless echo loop of socket updates. Keeping the controls responsive while handling network drift was the main engineering puzzle.",
      },
      {
        title: "Chat and who’s in the room",
        text: "Each room has live chat and shows who’s currently watching. Syncing the video is the technical bit, but chatting while watching is what actually makes it fun to use.",
      },
      {
        title: "Open source",
        text: "Both the Next.js frontend and the socket server are on GitHub. Building it also led to a longer write-up on real-time collaborative systems, state conflicts, and unreliable networks.",
      },
    ],
    stack: ["Next.js", "TypeScript", "WebSockets", "React Player"],
    links: [
      { label: "Client repo", href: "https://github.com/johnexzy/PeerPlay" },
      {
        label: "Socket server",
        href: "https://github.com/johnexzy/PeerPlaySocket",
      },
      {
        label: "Read the post",
        href: `${blogOrigin}/building-real-time-collaborative-systems`,
      },
    ],
  },
  {
    slug: "macos-computer-use",
    title: "macOS Computer Use",
    category: "Developer tool",
    kind: "Open source",
    period: "2026",
    role: "Creator",
    summary:
      "An MCP server that lets AI agents inspect and control Mac apps safely.",
    description:
      "A Model Context Protocol server backed by a native Swift core. It gives agents access to macOS screenshots, Vision OCR, and Accessibility controls while keeping window targeting and permissions strict.",
    visual: "native",
    details: [
      {
        title: "Strict window targeting",
        text: "If an agent passes a window ID, that’s the only window the action can hit. Bad targets or mismatched apps return an error instead of clicking the wrong window, and semantic actions can run in the background without stealing focus.",
      },
      {
        title: "Safe defaults and permission checks",
        text: "Screen capture and Accessibility require separate macOS permissions, so the server exposes a preflight check that tells the agent what it’s allowed to do. Global input and arbitrary AppleScript stay off by default.",
      },
      {
        title: "Clear feedback on every action",
        text: "Every action reports how it ran and whether the change was verified. There’s also a separate visual cursor overlay so you can see what the agent is targeting without it hijacking your own mouse.",
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
    category: "Figma plugin",
    kind: "Open source",
    period: "2024",
    role: "Creator",
    summary:
      "A Figma plugin that turns layers and images into editable vector pixel art.",
    description:
      "I built Pixelator after spending way too long manually placing tiny squares in Figma for an 8-bit UI. Pick any image or filled shape, drag the pixel-size slider, preview it, and generate clean vector blocks you can still edit.",
    visual: "pixels",
    details: [
      {
        title: "Simple workflow",
        text: "The first version had way too many toggles, so I stripped it down to what actually gets used: pick a layer, set the cell size, preview the result, and apply. Works on both images and shape fills.",
      },
      {
        title: "Vectors instead of flat images",
        text: "The plugin UI processes the pixels on a canvas, averages the colors per block, and sends the grid back to Figma to create grouped vector rectangles. Because it stays vector, you can recolor or scale it anytime.",
      },
    ],
    stack: ["TypeScript", "Figma Plugin API", "Canvas"],
    links: [
      { label: "View source", href: "https://github.com/johnexzy/pixelator" },
      {
        label: "Read the launch post",
        href: `${blogOrigin}/introducing-pixelator-figma-plugin`,
      },
    ],
  },
  {
    slug: "xtts",
    title: "Fine-tuning XTTS v2",
    category: "Speech ML",
    kind: "Experiment",
    period: "2026",
    role: "Training & evaluation",
    summary:
      "Fine-tuning XTTS v2 for more natural long-form Bible narration.",
    description:
      "An experiment in improving KJV Bible narration with XTTS v2 by expanding the dataset, picking the right checkpoint, and tuning inference. The write-up includes side-by-side audio clips and the metrics behind each call.",
    visual: "voice",
    details: [
      {
        title: "Why I didn’t use the last checkpoint",
        text: "Validation loss bottomed out at step 10,725. Training kept going all the way to step 35,750, but eval loss crept back up and the audio got worse. Stopping early mattered a lot more than training longer.",
      },
      {
        title: "Metrics plus listening tests",
        text: "I checked pacing, pitch contours, and spectral similarity alongside actual listening comparisons, and documented where the numbers helped and where the local eval had blind spots.",
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
    period: "2024 — present",
    role: "Creator",
    summary:
      "Ad-free browser utilities, plus new image and video studio tools in the works.",
    description:
      "Box.tools started because I was tired of opening five sketchy, ad-heavy sites just to convert an image or tweak a PDF. The live site still runs those everyday browser utilities, while I’m building out dedicated image and video studio workflows next.",
    visual: "tools",
    details: [
      {
        title: "Everyday utilities without the junk",
        text: "File conversion, image tools, text utilities, and developer helpers all in one place in the browser, with no pop-up ads or sketchy downloads.",
      },
      {
        title: "What I’m building next",
        text: "The newer studio side combines image generation and editing with storyboards, character consistency, video generation, and export, backed by a job and credit system that handles retries and failures cleanly.",
      },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Media pipelines"],
    links: [
      { label: "Visit Box.tools", href: "https://box.tools" },
      { label: "Read the launch post", href: `${blogOrigin}/box.tools-launch` },
    ],
  },
];

export const smallWorks = [
  {
    title: "Smart recommender",
    category: "Embeddings",
    description:
      "Playing with text embeddings, similarity search, and recommendations using PostgreSQL and Gemini.",
    href: "https://github.com/johnexzy/Smart-recommender",
  },
  {
    title: "pgvector + Gemini starter",
    category: "Developer tools",
    description:
      "A starter template for Next.js apps using pgvector and the Gemini API.",
    href: "https://github.com/johnexzy/Nextjs-pgvector-starter-with-google-genai",
  },
  {
    title: "SendUSDC",
    category: "Smart contracts",
    description:
      "An EIP-3009 experiment for gasless USDC transfers where a separate wallet covers the gas.",
    href: "https://github.com/johnexzy/sendUsdc",
  },
  {
    title: "AnniBo",
    category: "Early AI experiments",
    description: "An early GPT-3 writing assistant with a browser extension.",
    href: "https://github.com/johnexzy/annibo",
  },
  {
    title: "Dalle-gen",
    category: "Creative tools",
    description:
      "A Discord bot for generating images right inside a chat thread.",
    href: "https://github.com/johnexzy/Dalle-gen",
  },
  {
    title: "TokenPass",
    category: "Smart contracts",
    description: "An experiment in token-gated content and publishing.",
    href: "https://github.com/johnexzy/tokenpass-frontend",
  },
];

export const collaborations = [
  {
    title: "Nomba",
    description:
      "Marketing site and POS terminal purchase flow after the Kudi rebrand.",
    discipline: "Frontend engineering",
    href: "https://nomba.com",
  },
  {
    title: "Niyo Group",
    description:
      "Real-time learning features, HLS video streaming, and Whisper transcription.",
    discipline: "Technical leadership",
    href: "https://niyo.co",
  },
  {
    title: "KP Astro / Alveum",
    description:
      "Backend services, Swiss Ephemeris calculations, and AI-assisted readings.",
    discipline: "Backend engineering",
    href: `${blogOrigin}/from-zero-knowledge-to-kp-astro`,
  },
  {
    title: "BonBonPay",
    description:
      "Payment flows across web, mobile, and internal admin tools.",
    discipline: "Product engineering",
    href: "https://www.bonbonpay.com",
  },
  {
    title: "Victor Onazi",
    description: "Portfolio site built for product designer Victor Onazi.",
    discipline: "Web development",
    href: "https://www.victoronazi.com",
  },
  {
    title: "Kwara SAPZ",
    description:
      "Public programme website, activity listings, and content management setup.",
    discipline: "Web development",
    href: "https://kw.sapz.gov.ng",
  },
  {
    title: "Saphir",
    description: "Launch site with a waitlist and table reservation flow.",
    discipline: "Web development",
    href: "https://www.saphirrestaurant.com",
  },
];
