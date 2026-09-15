// Single source of truth for the project list. The Projects page renders its
// cards from this, ProjectNav walks it for prev/next links, and App.jsx uses
// it for per-route titles. Order matters: it is the display order on the
// Projects page and the order prev/next moves through.
//
// `featured` projects get the large image cards; the rest go in the compact
// "Other things I've made" section. `writeup` is the path to a long-form post
// when one exists.

export const projects = [
  {
    slug: 'serial-vga-display',
    title: 'Serial VGA Display',
    description: 'UART-controlled text display on an iCE40 FPGA, where a 40×30 character grid is drawn pixel by pixel as the VGA beam scans.',
    image: '/projects/serial-vga-display/serial_vga_display_thumbnail.jpeg',
    date: 'Summer 2026',
    featured: true,
    writeup: '/projects/serial-vga-display/writeup',
  },
  {
    slug: 'echoassist',
    title: 'EchoAssist',
    description: 'Real-time iOS captioning app with on-device speech recognition and speaker diarization, built to break communication barriers without sending audio off the phone.',
    image: '/projects/echoassist/echoassist_thumbnail.jpeg',
    imageRight: true,
    date: 'Summer 2026',
    featured: true,
  },
  {
    slug: 'relay',
    title: 'Relay',
    description: 'Cross-platform Flutter music-sharing app built by a five-person team, where I helped build the friendship, concerts, and messaging systems and the Firestore design docs behind them.',
    image: '/projects/relay/messaging_ui.png',
    date: '2026 – present',
    featured: true,
  },
  {
    slug: 'spatial-computing',
    title: 'Spatial Computing Portfolio',
    description: 'Interactive AR and spatial computing projects built during my Digital Creators Internship, exploring 3D interaction, animation, and immersive storytelling for platforms like Apple Vision Pro.',
    date: 'Summer 2025',
  },
  {
    slug: 'ap-physics-c',
    title: 'AP Physics C Notes',
    description: "Built a clean notes website for AP Physics C: E&M while prepping for the AP exam and learning HTML/CSS along the way.",
    // TODO: confirm. Assumed senior-year exam prep; the resume does not date it.
    date: '2025',
  },
  {
    slug: 'google-form-autofill',
    title: 'Google Form Autofill',
    description: 'Created a Google Apps Script workflow that turns form responses into auto-filled, ready-to-submit PDFs.',
    // TODO: confirm. Built for NCHS in high school; the resume does not date it.
    date: '2024',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const sideProjects = projects.filter((p) => !p.featured)

export function findProject(slug) {
  return projects.find((p) => p.slug === slug)
}
