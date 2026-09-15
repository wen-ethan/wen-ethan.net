import { Link } from 'react-router-dom'
import Background from '../components/Background'
import Nav from '../components/Nav'
import SocialLinks from '../components/SocialLinks'

export default function Home() {
  return (
    <>
      <Background />
      <Nav />
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Ethan Wen</h1>
            <p className="subtitle is-5 mt-4">
              ECE student at Princeton interested in digital design, embedded
              systems, and the boundary between hardware and software.
            </p>
            <div className="hero-actions">
              <Link className="hero-cta primary" to="/projects">View projects</Link>
              <Link className="hero-cta" to="/about">About me</Link>
            </div>
            <SocialLinks size={40} className="hero-links" />
          </div>
        </div>
      </section>
    </>
  )
}
