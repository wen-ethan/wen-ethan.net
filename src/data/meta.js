import { projects, findProject } from './projects.js'
import { writing, findWriting } from './writing.js'

// Title, description and preview image for every route. Used in two places:
// usePageMeta (in the browser, after navigation) and tools/prerender.mjs (at
// build time, to write one index.html per route so link unfurlers -- which do
// not run JS -- see the right card). Plain JS with no React so both can load it.

export const SITE_NAME = 'Ethan Wen'
export const SITE_URL = 'https://wen-ethan.net'
export const DEFAULT_DESCRIPTION =
  'Princeton ECE student interested in digital design, embedded systems, and the boundary between hardware and software.'
export const DEFAULT_IMAGE = '/projects/serial-vga-display/serial_vga_display_thumbnail.jpeg'

// Hand-written pages. Project and writing pages come from their data files.
const STATIC = {
  '/': { title: null, description: DEFAULT_DESCRIPTION },
  '/projects': { title: 'Projects', description: 'FPGA, iOS, and app projects, with writeups where there is a story to tell.' },
  '/writing': { title: 'Writing', description: 'Long-form notes on things I have built and what went wrong along the way.' },
  '/resume': { title: 'Resume', description: 'Education, projects, experience, and skills, with a PDF download.' },
  '/about': { title: 'About', description: 'Who I am, what I am working on right now, and how to get in touch.' },
}

export function metaFor(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (STATIC[path]) return { image: DEFAULT_IMAGE, ...STATIC[path] }

  const post = findWriting(path)
  if (post) {
    const project = post.project && findProject(post.project)
    return { title: post.title, description: post.summary, image: project?.image || DEFAULT_IMAGE }
  }

  const m = path.match(/^\/projects\/([^/]+)$/)
  const project = m && findProject(m[1])
  if (project) return { title: project.title, description: project.description, image: project.image || DEFAULT_IMAGE }

  return { title: 'Page not found', description: DEFAULT_DESCRIPTION, image: DEFAULT_IMAGE }
}

export function fullTitle(title) {
  return title ? `${title} · ${SITE_NAME}` : SITE_NAME
}

// Every real route worth a prerendered shell: the static pages, each project,
// and each non-draft post. The 404 route is deliberately absent.
export function prerenderRoutes() {
  return [
    ...Object.keys(STATIC),
    ...projects.map((p) => `/projects/${p.slug}`),
    ...writing.filter((w) => !w.draft).map((w) => w.path),
  ]
}
