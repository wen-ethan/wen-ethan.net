import { Link } from 'react-router-dom'
import Background from '../../components/Background'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Carousel from '../../components/Carousel'
import ProjectNav from '../../components/ProjectNav'
import { findProject } from '../../data/projects'
import '../../styles/project-page.css'

const slides = [
  { src: '/projects/ap-physics-c/e-m.png', alt: 'E&M notes overview' },
  { src: '/projects/ap-physics-c/electrostatics.png', alt: 'Electrostatics section' },
  { src: '/projects/ap-physics-c/diaelectric.png', alt: 'Dielectrics section' },
  { src: '/projects/ap-physics-c/practice-resources.png', alt: 'Practice resources' },
]

export default function ApPhysicsC() {
  const project = findProject('ap-physics-c')
  return (
    <>
      <Background />
      <Nav />
      <section className="project-shell">
        <header className="project-header">
          <h1 className="title is-3" style={{ marginBottom: '1rem' }}>AP Physics C Notes</h1>
          <div className="project-tags">
            {['HTML & CSS', 'Physics', 'new.css'].map(t => (
              <span key={t} className="tag is-dark">{t}</span>
            ))}
          </div>
          <p className="project-meta">{project.date}</p>
        </header>

        <div className="project-grid">
          <Carousel slides={slides} />

          <div className="project-content">
            <p>
              A notes website for AP Physics C: Electricity & Magnetism, built from scratch as an HTML/CSS learning project.
              Covers electrostatics, circuits, magnetism, and electromagnetic induction with LaTeX-rendered equations.
            </p>
            <p>
              Uses the <em>new.css</em> classless framework for clean default styles, with LaTeXMathML.js for inline math rendering.
              Built iteratively as I studied the material — design and content developed together.
            </p>

            <div className="project-links">
              <a className="button is-link is-light" href="https://ap-physics-notes.wen-ethan.net/" target="_blank" rel="noreferrer">Live Site</a>
              <a className="button is-link is-light" href="https://github.com/wen-ethan/ap-physics-notes" target="_blank" rel="noreferrer">GitHub Repo</a>
            </div>

            <div className="project-footer">
              <Link className="back-link" to="/projects">← Back to projects</Link>
            </div>
          </div>
        </div>

        <ProjectNav slug="ap-physics-c" />
      </section>

      <Footer />
    </>
  )
}
