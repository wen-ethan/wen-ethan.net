import { Link } from 'react-router-dom'
import Background from '../components/Background'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { publishedWriting } from '../data/writing'
import { findProject } from '../data/projects'

export default function Writing() {
  return (
    <>
      <Background />
      <Nav />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-2">Writing</h1>
            <p className="subtitle is-5 mt-2">
              Longer notes on things I've built, documenting the process and what went wrong along the way.
            </p>
          </div>
        </div>
      </section>

      <section className="writing-section page-section">
        <div className="container">
          <div className="writing-list">
            {publishedWriting.map((w) => {
              const project = w.project && findProject(w.project)
              return (
                <Link key={w.path} to={w.path} className="writing-card">
                  <p className="project-meta">
                    {w.date}
                    {project && <span className="project-badge">{project.title}</span>}
                  </p>
                  <h3 className="writing-card-title">{w.title}</h3>
                  <p className="writing-card-summary">{w.summary}</p>
                  <div className="writing-card-tags">
                    {w.tags.map((t) => (
                      <span key={t} className="tag is-dark">{t}</span>
                    ))}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
