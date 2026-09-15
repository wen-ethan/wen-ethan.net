import { Link } from 'react-router-dom'
import Background from '../../components/Background'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Carousel from '../../components/Carousel'
import ProjectNav from '../../components/ProjectNav'
import { findProject } from '../../data/projects'
import '../../styles/project-page.css'

// First slide doubles as the Projects page card image. The demo is transcoded
// from the .MOV original -- same reason as EchoAssist, a QuickTime container
// plays reliably only in Safari.
const slides = [
  {
    src: '/projects/serial-vga-display/serial_vga_display_thumbnail.jpeg',
    alt: 'Text rendered by the FPGA on a VGA monitor',
  },
  {
    type: 'video',
    src: '/projects/serial-vga-display/demo.mp4',
    poster: '/projects/serial-vga-display/demo_poster.jpg',
    alt: 'Typing in a terminal and the characters appearing on the monitor',
  },
  {
    src: '/projects/serial-vga-display/architecture_diagram.png',
    alt: 'Block diagram of the five modules and how they connect',
  },
]

export default function SerialVgaDisplay() {
  const project = findProject('serial-vga-display')
  return (
    <>
      <Background />
      <Nav />
      <section className="project-shell">
        <header className="project-header">
          <h1 className="title is-3" style={{ marginBottom: '1rem' }}>Serial VGA Display</h1>
          <div className="project-tags">
            {['Verilog', 'FPGA', 'Digital Design', 'VGA'].map((t) => (
              <span key={t} className="tag is-dark">{t}</span>
            ))}
          </div>
          <p className="project-meta">{project.date}</p>
        </header>

        <div className="project-grid">
          <Carousel slides={slides} />

          <div className="project-content">
            <p>
              A text display written entirely in Verilog and running on a Lattice iCE40 FPGA. Typing into a terminal on a host device puts characters on a VGA monitor, with no middle-man processor. Instead, the FPGA takes bytes in over serial and puts out 640x480 at 60 Hz as a 40x30 grid of characters. I built it as a capstone to my work learning Verilog and digital design, and specified it myself rather than following a walkthrough.
            </p>
            <p>
              Given a full frame does not fit in the chip's block ram, there is no frame buffer; instead the design only stores the 1200 character codes, computing each pixel as the beam reaches it. As such, the character generator has to pull the code from RAM and the glyph from the font ROM to have the right bit ready (lining this pipeline up with the sync signals was especially difficult). The finished design fits in 585 of the 1280 logic cells, and every module has its own self-checking testbench.
            </p>

            <div className="project-links">
              <a className="button is-link is-light" href="https://github.com/wen-ethan/serial-vga-display" target="_blank" rel="noreferrer">GitHub Repo</a>
            </div>

            <div className="project-footer">
              <Link className="back-link" to="/projects">← Back to projects</Link>
              <Link className="blog-link" to="/projects/serial-vga-display/writeup">Read the Writeup</Link>
            </div>
          </div>
        </div>

        <ProjectNav slug="serial-vga-display" />
      </section>

      <Footer />
    </>
  )
}
