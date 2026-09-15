import { Link } from 'react-router-dom'
import Background from '../../components/Background'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Carousel from '../../components/Carousel'
import ProjectNav from '../../components/ProjectNav'
import { findProject } from '../../data/projects'
import '../../styles/project-page.css'

// Videos are H.264 mp4 transcoded from the HEVC .mov originals -- HEVC in a
// QuickTime container plays only in Safari, not Chrome or Firefox.
const slides = [
  { src: '/projects/echoassist/echoassist_thumbnail.jpeg', alt: 'EchoAssist Features Overview' },
  {
    type: 'video',
    src: '/projects/echoassist/live_recording.mp4',
    poster: '/projects/echoassist/live_recording_poster.jpg',
    alt: 'Live captioning with speaker labels in EchoAssist',
  },
  {
    type: 'video',
    src: '/projects/echoassist/translation.mp4',
    poster: '/projects/echoassist/translation_poster.jpg',
    alt: 'Transcript translation in EchoAssist',
  },
  {
    type: 'video',
    src: '/projects/echoassist/personalize-share.mp4',
    poster: '/projects/echoassist/personalize-share_poster.jpg',
    alt: 'Personalizing and sharing a transcript in EchoAssist',
  },
  { src: '/projects/echoassist/architecture_diagram.jpeg', alt: 'EchoAssist architecture diagram' },
]

export default function EchoAssist() {
  const project = findProject('echoassist')
  return (
    <>
      <Background />
      <Nav />
      <section className="project-shell">
        <header className="project-header">
          <h1 className="title is-3" style={{ marginBottom: '1rem' }}>EchoAssist</h1>
          <div className="project-tags">
            {['Swift', 'CoreML', 'Accessibility'].map((t) => (
              <span key={t} className="tag is-dark">{t}</span>
            ))}
          </div>
          <p className="project-meta">{project.date}</p>
        </header>

        <div className="project-grid">
          <Carousel slides={slides} />

          <div className="project-content">
            <p>
              EchoAssist captions live conversations on an iPhone and labels each speaker as they talk, built for people who are deaf or hard of hearing. Most captioning tools send audio to a server, which rules them out for a doctor's appointment or anything private. EchoAssist runs entirely on-device.
            </p>
            <p>
              Two Core ML models stream against a shared audio clock (Parakeet for speech recognition, Sortformer for diarization) joined by timestamp overlap so each caption arrives already attributed, ~0.6s behind real time; developing this system without drift was hard but worth it. Saved transcripts can also be summarized and translated into six languages. My team built it in six weeks in <a href="https://www.eccchicago.org/" target="_blank" rel="noreferrer">Everyone Can Code Chicago</a>, an Apple and City of Chicago program, placing top 12 of 56 teams judged by Apple engineers.
            </p>

            <div className="project-links">
              <a className="button is-link is-light" href="https://github.com/wen-ethan/EchoAssist" target="_blank" rel="noreferrer">GitHub Repo</a>
              <a className="button is-link is-light" href="https://www.youtube.com/live/KPH9C-T3cUA?si=ffLACIMfcsSosuJY&t=2208" target="_blank" rel="noreferrer">Pitch Presentation</a>
            </div>

            <div className="project-footer">
              <Link className="back-link" to="/projects">← Back to projects</Link>
            </div>
          </div>
        </div>

        <ProjectNav slug="echoassist" />
      </section>

      <Footer />
    </>
  )
}
