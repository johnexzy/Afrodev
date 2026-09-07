# September 2026 refresh

## Direction

A personal work index, not an agency landing page. The visual language is warm paper, ink-blue links, quiet rules, a signature, and locally hosted Instrument Sans and Instrument Serif. Dark mode uses the same hierarchy. Project illustrations are drawn in CSS/SVG and explicitly labelled as studies on detail pages.

The desktop navigation remains alongside the work; on smaller screens it becomes a four-link index. The homepage leads with a selection, the work index supports filtering, and each featured project has room for its purpose, implementation, and constraints. Three small browser demonstrations explain clipboard selection, pixel size, and shared playback without pretending to be the actual applications.

Motion is limited to a short entrance and direct feedback. The connection study redraws only when requested. Reduced-motion preferences disable entrance motion and smooth scrolling. There are no continuous canvas loops or font-CDN requests.

## Content evidence

The refresh was informed by public repositories and scoped inspection of local project documentation and implementation. Private source, operational details, credentials, unpublished customer information, and unsupported performance metrics were not copied into the site.

| Work                          | Evidence and boundaries                                                                                                                                                                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| StartupList Africa            | [Public product](https://www.startuplist.africa/), the existing anniversary article, and local product/backend code. The site describes data collection, review, and discovery without repeating unverified scale or revenue claims.                               |
| Now                           | [Public repository](https://github.com/johnexzy/now-macos), README, and ClipLibrary implementation: seven active clips, earlier-clip selection, representation preservation, retention, and native storage.                                                        |
| macOS Computer Use            | [Public repository](https://github.com/johnexzy/macos-computer-use), README, and server implementation: Accessibility-first operations, window targeting, OCR, permission checks, and safe defaults.                                                               |
| PeerPlay                      | [Public frontend](https://github.com/johnexzy/PeerPlay), player implementation, and the existing collaborative-systems article. The embedded slider is a conceptual demonstration, not a connected room.                                                           |
| Pixelator                     | [Public source](https://github.com/johnexzy/pixelator), plugin implementation, and the existing launch article. The browser flower demonstrates cell size; it does not claim to run Figma.                                                                         |
| Oystack                       | Current local product context and document/research implementation. The page is explicitly marked in development and describes the current research direction rather than the superseded contract-review positioning.                                              |
| XTTS                          | Existing technical article and local evaluation artifacts. The original article, charts, audio, measurements, and limitations are preserved.                                                                                                                       |
| Box.tools                     | [Public toolbox](https://box.tools/), its launch article, and current local development documentation. The public toolbox and the image/film-studio work in progress are distinguished.                                                                            |
| Smaller repositories          | Public GitHub inventory, including [Smart-recommender](https://github.com/johnexzy/Smart-recommender), [SendUSDC](https://github.com/johnexzy/sendUsdc), and the [pgvector/Gemini starter](https://github.com/johnexzy/Nextjs-pgvector-starter-with-google-genai). |
| Collaborations and experience | Existing curated portfolio information. Copy was shortened without adding outcomes, measurements, or dates not present in the source.                                                                                                                              |

## Reader and implementation

- Existing article URLs and Markdown content are unchanged.
- Dates determine archive ordering rather than file numbering.
- Native lazy-loaded Markdown images resolve against the application base path, not a hard-coded localhost port.
- Code blocks use legible foreground/background tokens in both themes and retain copy feedback.
- Comments load once, on request, with a direct GitHub fallback. The old automatic third-party like widget is no longer loaded.
- The sitemap is generated from published articles and project data.
- Superseded card components, project data, and the continuous background canvas were removed. Git history retains them.
- No new application dependency was added. Font licence files accompany the local assets.

## Verification

- `pnpm build` completed successfully after the final changes. The installed toolchain still reports its existing stale Browserslist data and missing local Sharp binary warnings. This redesign uses native images, not the image-optimization endpoint.
- All 30 published routes returned HTTP 200 with a title and main landmark from the production server. The sitemap includes all 30. Invalid article and project addresses returned HTTP 404; the designed recovery page and its return action were checked.
- The homepage, work index, about page, and XTTS reader were checked for horizontal overflow at 390, 768, and 1280 CSS pixels. The homepage was also visually checked at 320 pixels. These are browser viewport checks, not a claim of testing physical devices.
- Light and dark themes, active navigation, project filtering, archive matching/empty/reset states, and project-to-project navigation were exercised. Searching “embeddings” finds the recommendation article through its source slug.
- The connection-study redraw was verified on a 320-pixel viewport after fixing an overlapping hit area. The Now demonstration was checked with arrow keys; Pixelator with the range control; PeerPlay reflected the same position in both displayed rooms.
- XTTS audio loaded and played/paused, chart metric selection worked on mobile, code copying reported success, and local and remote article images rendered. Discussion loading inserted one Utterances script and retained its GitHub fallback; no comment was posted.
- Plain code contrast is approximately 11.1:1 in light mode and 12.1:1 in dark mode. Dark table headings resolve to the light foreground token. Reduced-motion behavior was checked in source; this was not a full assistive-technology audit.
- `git diff --check` passed. Original Markdown articles are unchanged. No deployment, commit, or push was performed.
