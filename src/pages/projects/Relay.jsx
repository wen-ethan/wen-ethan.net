import { Link } from 'react-router-dom'
import Background from '../../components/Background'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Carousel from '../../components/Carousel'
import ProjectNav from '../../components/ProjectNav'
import { findProject } from '../../data/projects'
import '../../styles/project-page.css'

const slides = [
  { src: '/projects/relay/messaging_ui.png', alt: 'Relay messaging interface' },
  { src: '/projects/relay/friend_profile_ui.png', alt: 'Relay friend profile interface' },
  {
    src: '/projects/relay/friendship_state_machine.jpeg',
    alt: 'Friendship system state machine diagram',
  },
]

export default function Relay() {
  const project = findProject('relay')
  return (
    <>
      <Background />
      <Nav />
      <section className="project-shell">
        <header className="project-header">
          <h1 className="title is-3" style={{ marginBottom: '1rem' }}>Relay</h1>
          <div className="project-tags">
            {['Flutter', 'Firestore', 'System Design'].map((t) => (
              <span key={t} className="tag is-dark">{t}</span>
            ))}
          </div>
          <p className="project-meta">{project.date}</p>
        </header>

        <div className="project-grid">
          <Carousel slides={slides} />

          <div className="project-content">
            <p>
              Relay is built in Flutter by a five-person team run startup-style, where each engineer owns systems end to end rather than assigned tickets. I own three: the friendship graph, the concerts system, and messaging. It's pre-launch, so most of the work so far has been deciding how those systems should behave before they have users to break them.
            </p>
            <p>
              Each system started as an engineering design doc before any code — how the data is modeled in Firestore, which writes have to be transactional, what the security rules enforce, and how the feature holds up under abuse or unexpected scale. One doc caught a set of non-transactional writes that would have left records inconsistent in production. Writing the docs first has been the most useful habit on the project.
            </p>

            <div className="project-links">
              <a className="button is-link is-light" href="https://relay-app.xyz/" target="_blank" rel="noreferrer">Live Web Build</a>
            </div>

            <div className="project-footer">
              <Link className="back-link" to="/projects">← Back to projects</Link>
            </div>
          </div>
        </div>

        <ProjectNav slug="relay" />
      </section>

      <Footer />
    </>
  )
}
