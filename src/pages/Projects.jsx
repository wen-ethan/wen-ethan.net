import { Link } from 'react-router-dom'
import Background from '../components/Background'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { featuredProjects, sideProjects } from '../data/projects'

export default function Projects() {
  return (
    <>
      <Background />
      <Nav />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-2">Projects</h1>
            <p className="subtitle is-5 mt-2">
              A collection of my most notable work.
            </p>
          </div>
        </div>
      </section>

      <section className="projects-section page-section">
        <div className="container">
          <div className="projects-grid">
            {featuredProjects.map((p) => (
              <Link key={p.slug} to={`/projects/${p.slug}`} className={`project-card${p.imageRight ? ' image-right' : ''}`}>
                {!p.imageRight && (
                  <div className="project-image">
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </div>
                )}
                <div className="project-content">
                  <p className="project-meta">
                    {p.date}
                    {p.writeup && <span className="project-badge">Writeup</span>}
                  </p>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-description">{p.description}</p>
                </div>
                {p.imageRight && (
                  <div className="project-image">
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="side-projects-section page-section">
        <div className="container">
          <h2 className="side-projects-heading">Other things I&rsquo;ve made</h2>
          <p className="side-projects-note">
            Smaller side projects, built for fun.
          </p>
          <div className="side-projects-grid">
            {sideProjects.map((p) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className="side-card"
              >
                <p className="project-meta">{p.date}</p>
                <h3 className="side-card-title">{p.title}</h3>
                <p className="side-card-description">{p.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
