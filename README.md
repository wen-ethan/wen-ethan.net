# wen-ethan.net

Personal portfolio website for Ethan Wen — Princeton ECE student interested in embedded systems, digital design, and hardware–software interfaces.

Live at: [wen-ethan.net](https://wen-ethan.net/) (deployed via Vercel)

---

## The Journey

This site has gone through several redesigns and one rebuild, each iteration driven by learning something new and wanting to do it better.

1. **Raw HTML + CSS** — A basic first attempt at a personal site. Functional, but rough around the edges; a decent introduction to how web pages are structured, nothing more.

2. **Bootstrap** — Redesigned using Bootstrap Studio, which made it look cleaner but at the cost of ownership. The WYSIWYG, plug-a-class-in nature of it made the result feel assembled rather than made. As such, fell out of love with it quickly, and never fully finished.

3. **Back to HTML + CSS** — During a break, stepped back and fully redesigned the site from scratch using plain HTML and CSS, without big frameworks or shortcuts; wanted to own every design decision and actually understand what was happening at each step. This became the definitive version of the site.

4. **React + Vite (current)** — After picking up React, rebuilt v3 as a faithful reimplementation; ultimately the same look and feel, just ported to a component-based architecture. React Router handles navigation cleanly, and Bulma was chosen for lightweight CSS utilities without the opinionated behavior of Bootstrap.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI component architecture |
| [Vite](https://vitejs.dev/) | Fast dev server and build tooling |
| [React Router DOM](https://reactrouter.com/) | Client-side SPA routing |
| [Bulma](https://bulma.io/) | CSS framework for layout and styling |
| [Vercel Analytics](https://vercel.com/analytics) | Pageview tracking |
| [Vercel](https://vercel.com/) | Hosting and continuous deployment |

---

## Pages

- **Home** — Landing page with a brief intro, links onward, and contact
- **About** — Background, a "right now" snapshot, and contact links
- **Projects** — Featured work up top, smaller side projects below; cards carry a date and a badge when a writeup exists
- **Writing** — Index of long-form posts
- **Resume** — Education, projects, experience, activities, honors, and skills, with a PDF download
- **Project pages** — One detail page per project at `/projects/<slug>`, with prev/next links between them, plus long-form writeups at `/projects/<slug>/writeup`
- **404** — Catch-all for unknown paths

Project metadata lives in `src/data/projects.js` and the list of posts in `src/data/writing.js`. Writeups are authored as Markdown in `content/` and compiled to components by `tools/build-writeup.py`.

---

## Featured Projects

### Serial VGA Display
UART-controlled text display on a Lattice iCE40 FPGA, where a 40×30 character grid is drawn pixel by pixel as the VGA beam scans, with no framebuffer. Includes a full engineering writeup.

### EchoAssist
Real-time iOS captioning app with on-device speech recognition and speaker diarization, built to break communication barriers without sending audio off the phone.

### Relay
Cross-platform Flutter music-sharing app built by a five-person team; I helped build the friendship, concerts, and messaging systems and the Firestore design docs behind them.

### Side Projects
Spatial Computing Portfolio (AR work for Apple Vision Pro), AP Physics C Notes, and Google Form Autofill; earlier work, kept on the site but presented compactly.

---

## Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

**Note on static files:** `vite.config.js` sets `publicDir: 'assets'`, so static files live in [`assets/`](assets/) rather than the conventional `public/`. Reference them with root-absolute paths — `/headshot.jpg`, `/projects/serial-vga-display/render.png`, `/Ethan_Wen_Resume.pdf`.

---

## Project Structure

```
assets/                 # Static files (served at web root; NOT public/)
└── projects/           # Per-project images and video, one folder per slug
src/
├── components/         # Shared UI (Nav, Footer, Carousel, Background)
├── pages/              # Top-level page views (Home, About, Projects, Resume)
│   └── projects/       # Individual project detail and writeup pages
├── styles/             # Plain CSS, one file per page type
├── App.jsx             # Route definitions and scroll-to-top behavior
└── main.jsx            # Application entry point
```

---

## Deployment

Hosted on Vercel with automatic deployments on push to `main`. The `vercel.json` config rewrites all routes to `index.html` to support client-side SPA routing.

---

*Built and maintained by Ethan Wen*
