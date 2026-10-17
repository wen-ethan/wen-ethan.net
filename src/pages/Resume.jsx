import Background from '../components/Background'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import '../styles/resume.css'

export default function Resume() {
  return (
    <div className="resume-page">
      <Background />
      <Nav />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-2">Resume</h1>
            <p className="subtitle is-5 mt-2">
              Education, experience, and skills.
            </p>
            <div className="resume-actions mt-4">
              <a href="/Ethan_Wen_Resume.pdf" className="resume-download" download>↓ Download PDF</a>
            </div>
          </div>
        </div>
      </section>

      <section className="projects-section page-section">
        <div className="container">
          <div className="projects-grid">

            {/* Education */}
            <div className="project-card resume-card">
              <div className="project-content">
                <h3 className="project-title">Education</h3>

                <div className="resume-entry">
                  <strong>Princeton University</strong> <span className="resume-meta">Princeton, NJ</span><br />
                  <span className="resume-meta">B.S.E. in Electrical & Computer Engineering · Expected May 2029</span>
                  <ul className="resume-list-plain">
                    <li>Cumulative GPA: 3.82</li>
                    <li>Fall 2026 Coursework: Contemporary Logic Design (Verilog); Introduction to Programming Systems (C)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="project-card resume-card">
              <div className="project-content">
                <h3 className="project-title">Projects</h3>

                <div className="resume-entry">
                  <strong>Serial-Controlled VGA Character Display</strong> <span className="resume-meta">Verilog, Lattice iCE40-HX1K, Yosys, nextpnr-ice40, IceStorm</span>
                  <ul>
                    <li>40x30 character grid at 640x480/60 Hz over UART; 4-state parser FSM, per-pixel font ROM fetch, no framebuffer.</li>
                    <li>585/1280 logic cells, 6/16 block RAMs, closes at 108.5 MHz; per-module benches plus an end-to-end frame compare.</li>
                  </ul>
                </div>

                <div className="resume-entry">
                  <strong>EchoAssist</strong> <span className="resume-meta">Swift, SwiftUI, CoreML, Apple Intelligence Foundation Models</span><br />
                  <span className="resume-meta">Jun 2026 - Jul 2026</span>
                  <ul>
                    <li>Live speaker-labeled accessibility captions generated fully on-device by two streaming CoreML models (Parakeet ASR, Sortformer diarization) synced on a shared audio clock, running ~0.6s behind real time.</li>
                    <li>On-device summarization via Apple Intelligence Foundation Models and translation into six languages.</li>
                    <li>Built with a three-person team and submitted to the App Store; review appeal pending.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="project-card resume-card">
              <div className="project-content">
                <h3 className="project-title">Experience</h3>
                <div className="resume-entry">
                  <strong>Relay</strong> <span className="resume-meta">Software Engineer</span><br />
                  <span className="resume-meta">Jun 2026 - Present</span>
                  <ul>
                    <li>Shipped the friendship, concerts, messaging, and gamification systems for a five-person Flutter music-sharing app.</li>
                    <li>Authored engineering design documents covering Firestore data modeling, transaction safety, security rules, and abuse and scale analysis.</li>
                  </ul>
                </div>

                <div className="resume-entry">
                  <strong>Everyone Can Code Chicago</strong> <span className="resume-meta">Chicago, IL</span><br />
                  <span className="resume-meta">Software Engineer Intern, Sept 2026 - Present · iOS App Dev & ML Program, Jun 2026 - Jul 2026</span>
                  <ul>
                    <li>App Accelerator (one of 24 selected): building an iOS app on a small product team through App Store launch.</li>
                    <li>Summer program: advanced to the second round of the Apple-judged showcase, top 12 of 56 teams.</li>
                  </ul>
                </div>

                <div className="resume-entry">
                  <strong>Princeton University</strong> <span className="resume-meta">COS 126 Undergraduate Course Assistant</span><br />
                  <span className="resume-meta">Sept 2026 - Present</span>
                  <ul>
                    <li>Code reviews and debugging help for students in Princeton's introductory computer science course.</li>
                  </ul>
                </div>

                <div className="resume-entry">
                  <strong>Hoagie Club</strong> <span className="resume-meta">HoagieHelp Developer</span><br />
                  <span className="resume-meta">Feb 2026 - Present</span>
                  <ul>
                    <li>Building frontend components in Next.js, React, TypeScript, and Tailwind for a student academic support platform, with contributions to Python backend services.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Activities */}
            <div className="project-card resume-card">
              <div className="project-content">
                <h3 className="project-title">Activities</h3>

                <div className="resume-entry">
                  <strong>Princeton University Robotics Club</strong> <span className="resume-meta">Princeton, NJ</span><br />
                  <span className="resume-meta">Tinker Tech Lead, Aug 2026 - Present · Tinker Member, Sept 2025 - Aug 2026</span>
                  <ul><li>Setting project direction and managing the parts budget for Tinker, the club's hardware subteam; firmware, bring-up, and debugging work including vintage iPod refurbishment.</li></ul>
                </div>
              </div>
            </div>

            {/* Honors */}
            <div className="project-card resume-card">
              <div className="project-content">
                <h3 className="project-title">Honors</h3>

                <div className="resume-entry">
                  <strong>Chicago Engineers' Foundation</strong> <span className="resume-meta">Engineering Futures Award · $5,000 merit award</span><br />
                  <span className="resume-meta">2026</span>
                </div>

                <div className="resume-entry">
                  <strong>IEEE SSCS Arduino Contest</strong> <span className="resume-meta">2nd Place</span><br />
                  <span className="resume-meta">2024</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="project-card resume-card">
              <div className="project-content">
                <h3 className="project-title">Skills</h3>
                <strong>Hardware & Digital Design</strong>
                <div className="resume-skills mb-3">
                  {['Verilog', 'RTL design', 'Yosys / nextpnr / IceStorm', 'Icarus Verilog / GTKWave', 'Lattice iCE40', 'Arduino / ESP32'].map(s => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <strong>Programming</strong>
                <div className="resume-skills mb-3">
                  {['C++', 'Python', 'Swift', 'Dart', 'TypeScript / JavaScript'].map(s => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <strong>Frameworks & Tools</strong>
                <div className="resume-skills mb-3">
                  {['SwiftUI', 'CoreML', 'Flutter', 'Firebase / Firestore', 'Next.js / React', 'Git', 'Xcode', 'LaTeX'].map(s => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <strong>Spoken</strong>
                <div className="resume-skills">
                  {['English (native)', 'Cantonese (native)', 'Mandarin (conversational)'].map(s => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
