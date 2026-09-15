import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

// Prev / next links between project pages, so a reader who finishes one is
// not dropped back to the index to pick again. Walks the shared list in its
// display order and stops at the ends rather than wrapping.
export default function ProjectNav({ slug }) {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return null
  const prev = projects[i - 1]
  const next = projects[i + 1]

  return (
    <nav className="project-nav" aria-label="Other projects">
      {prev ? (
        <Link className="project-nav-link prev" to={`/projects/${prev.slug}`}>
          <span className="project-nav-label">Previous</span>
          <span className="project-nav-title">← {prev.title}</span>
        </Link>
      ) : <span />}
      {next && (
        <Link className="project-nav-link next" to={`/projects/${next.slug}`}>
          <span className="project-nav-label">Next</span>
          <span className="project-nav-title">{next.title} →</span>
        </Link>
      )}
    </nav>
  )
}
