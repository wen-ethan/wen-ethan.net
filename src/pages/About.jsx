import { Link } from 'react-router-dom'
import Background from '../components/Background'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import SocialLinks from '../components/SocialLinks'
import '../styles/about.css'

export default function About() {
  return (
    <>
      <Background />
      <Nav />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-2">About Me</h1>
            <p className="subtitle is-5 mt-2">
              A little something about who I am.
            </p>
          </div>
        </div>
      </section>

      <section className="about-shell">
        <div className="about-grid">
          <div className="about-media">
            <img src="/headshot.jpg" alt="Ethan Wen headshot" />
          </div>

          <div className="about-content">
            <p>
              I'm Ethan, a Princeton University undergraduate pursuing a B.S.E. in Electrical and Computer Engineering, with my focus being on hardware. Specifically, I’m interested in digital design, embedded systems, and the path from RTL to silicon that makes modern chips possible.
            </p>
            <p>
              I'm especially drawn to the problems that live at the boundary between hardware and software: how a processor gets designed, how firmware talks to bare metal, how modern chips like Apple's M-series goes from architecture to physical implementation. I build projects that keep me close to that boundary, currently working with FPGAs and microcontrollers to sharpen my Verilog and embedded C fundamentals.
            </p>
            <p>
              Outside of engineering, I care about who technology is built for and who gets left out. That shapes how I think about the problems worth solving, not just thinking about how to build well, but why it matters.
            </p>

            <div className="about-now">
              <h3>Right now:</h3>
              <ul>
                <li>Currently enrolled in Contemporary Logic Design (Verilog) and Introduction to Programming Systems (C) at Princeton.</li>
                <li>Tech lead for Tinker, the hardware subteam of Princeton University Robotics Club (PURC), working on restoring and repairing vintage electronics.</li>
                <li>Shipping the friendship, concerts, and messaging systems for <Link to="/projects/relay">Relay</Link>, and building frontend for HoagieHelp with Hoagie Club.</li>
                <li>Looking for a summer 2027 internship in embedded systems or digital design. If I sound like a good fit, <a href="mailto:wen.ethann@gmail.com">please say hi</a>!</li>
              </ul>
            </div>

            <SocialLinks />
          </div>
        </div>
      </section>

      <Footer links={false} />
    </>
  )
}
