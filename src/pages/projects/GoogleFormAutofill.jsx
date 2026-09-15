import { Link } from 'react-router-dom'
import Background from '../../components/Background'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Carousel from '../../components/Carousel'
import ProjectNav from '../../components/ProjectNav'
import { findProject } from '../../data/projects'
import '../../styles/project-page.css'

const slides = [
  { src: '/projects/google-form-autofill/main-code.png', alt: 'Apps Script main code' },
  { src: '/projects/google-form-autofill/autofilled-doc.png', alt: 'Autofilled PDF document' },
  { src: '/projects/google-form-autofill/successful-email.png', alt: 'Successful confirmation email' },
]

export default function GoogleFormAutofill() {
  const project = findProject('google-form-autofill')
  return (
    <>
      <Background />
      <Nav />
      <section className="project-shell">
        <header className="project-header">
          <h1 className="title is-3" style={{ marginBottom: '1rem' }}>Google Form Autofill</h1>
          <div className="project-tags">
            {['Google Workspace', 'JavaScript', 'Google Apps Script', 'Automation'].map(t => (
              <span key={t} className="tag is-dark">{t}</span>
            ))}
          </div>
          <p className="project-meta">{project.date}</p>
        </header>

        <div className="project-grid">
          <Carousel slides={slides} />

          <div className="project-content">
            <p>
              A Google Apps Script automation built for NCHS member applications. When a Google Form is submitted,
              the script pulls the response data, populates a PDF template, and emails the completed document back
              to the applicant — all automatically.
            </p>
            <p>
              Reduced the manual processing time for each application to zero and eliminated formatting inconsistencies
              across submitted documents.
            </p>

            <div className="project-links">
              <a className="button is-link is-light" href="https://github.com/wen-ethan/apps-script-application-automation" target="_blank" rel="noreferrer">GitHub Repo</a>
            </div>

            <div className="project-footer">
              <Link className="back-link" to="/projects">← Back to projects</Link>
            </div>
          </div>
        </div>

        <ProjectNav slug="google-form-autofill" />
      </section>

      <Footer />
    </>
  )
}
