import { Link } from 'react-router-dom'
import Background from '../../components/Background'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Carousel from '../../components/Carousel'
import ProjectNav from '../../components/ProjectNav'
import { findProject } from '../../data/projects'
import '../../styles/project-page.css'

const slides = [
  { src: '/projects/spatial-computing/tiger_firefighter.png', alt: 'Tiger firefighter AR scene' },
  { src: '/projects/spatial-computing/potted_plant.png', alt: 'Potted plant AR model' },
  { src: '/projects/spatial-computing/spline_vespa.png', alt: 'Spline Vespa 3D model' },
  { type: 'video', src: '/projects/spatial-computing/spline_animation.mp4', poster: '/projects/spatial-computing/spline_animation_thumbnail.png' },
  { type: 'video', src: '/projects/spatial-computing/in-progress_screen_recording.mp4', poster: '/projects/spatial-computing/in-progress_screen_recording_thumbnail.png' },
  { type: 'video', src: '/projects/spatial-computing/final_project_video.mp4', poster: '/projects/spatial-computing/final_project_video_thumbnail.jpg' },
]

export default function SpatialComputing() {
  const project = findProject('spatial-computing')
  return (
    <>
      <Background />
      <Nav />
      <section className="project-shell">
        <header className="project-header">
          <h1 className="title is-3" style={{ marginBottom: '1rem' }}>Spatial Computing Portfolio</h1>
          <div className="project-tags">
            {['Spatial Computing', 'Augmented Reality', '3D Design', 'Spline', 'Reality Composer'].map(t => (
              <span key={t} className="tag is-dark">{t}</span>
            ))}
          </div>
          <p className="project-meta">{project.date}</p>
        </header>

        <div className="project-grid">
          <Carousel slides={slides} />

          <div className="project-content">
            <p>
              This project is a collection of spatial computing work I created while exploring how interaction, scale, and motion can be used to communicate ideas in 3D space. Built during my Digital Creators Internship, these projects range from polished AR experiences to smaller experiments focused on animation, modeling, and user interaction. One of the projects in this portfolio was selected to be showcased at Apple's Everyone Can Code Showcase.
            </p>

            <div className="project-links">
              <a className="button is-link is-light" href="https://github.com/wen-ethan/spatial-computing" target="_blank" rel="noreferrer">GitHub Repo</a>
              <a className="button is-link is-light" href="https://www.eccchicago.org/2025-showcase.html" target="_blank" rel="noreferrer">Apple ECC Showcase 2025</a>
            </div>

            <div className="project-footer">
              <Link className="back-link" to="/projects">← Back to projects</Link>
            </div>
          </div>
        </div>

        <ProjectNav slug="spatial-computing" />
      </section>

      <Footer />
    </>
  )
}
