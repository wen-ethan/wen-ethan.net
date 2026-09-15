// Every long-form post on the site, newest first. The Writing page lists
// these; App.jsx uses them for per-route titles. Posts that belong to a
// project live under /projects/<slug>/writeup and are also badged on that
// project's card; standalone posts live under /writing/<slug>.
//
// `draft: true` keeps a post routed (so it can be previewed at its URL) but
// off the Writing page. Drafts should also stay out of assets/sitemap.xml.

export const writing = [
  {
    path: '/writing/how-this-site-was-built',
    title: 'How This Site Was Built',
    date: 'September 2026',
    tags: ['Web', 'React', 'Meta'],
    summary: 'A journey though the various iterations of this site, from raw HTML to Bootstrap and back.',
    draft: false,
  },
  {
    path: '/projects/serial-vga-display/writeup',
    title: 'A Serial VGA Terminal, and Two Bugs That Were Not Where They Looked',
    date: 'August 2026',
    tags: ['FPGA', 'Verilog', 'Hardware'],
    summary: 'How I fit a 40×30 character display on an iCE40 with no framebuffer, along with discovering two hardware-only bugs (a missing corner and a baud mismatch) that simulation could not have shown.',
    project: 'serial-vga-display',
  },
]

export const publishedWriting = writing.filter((w) => !w.draft)

export function findWriting(path) {
  return writing.find((w) => w.path === path)
}
