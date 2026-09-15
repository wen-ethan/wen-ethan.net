import { Link } from 'react-router-dom'
import Background from '../components/Background'
import Nav from '../components/Nav'

// Catch-all route. Without it an unknown path rendered nothing at all -- no
// nav, no background -- so a mistyped or stale link looked like a broken site.
export default function NotFound() {
  return (
    <>
      <Background />
      <Nav />
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">404 Error</h1>
            <p className="subtitle is-5 mt-4">
              The page you&rsquo;re looking for doesn&rsquo;t exist. :(
            </p>
            <div className="hero-actions">
              <Link className="hero-cta primary" to="/">Go home</Link>
              <Link className="hero-cta" to="/projects">View projects</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
