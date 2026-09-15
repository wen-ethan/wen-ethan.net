import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Background from '../../components/Background'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import '../../styles/blog-page.css'

// Generated from content/how-this-site-was-built.md by tools/build-writeup.py.
// Edit the Markdown and re-run the script; changes made here are overwritten.

const sections = [
  { id: 'overview', label: 'Four versions' },
  { id: 'v1', label: 'Raw HTML and CSS' },
  { id: 'v2', label: 'Bootstrap' },
  { id: 'v3', label: 'Back to HTML and CSS' },
  { id: 'v4', label: 'React and Vite' },
  { id: 'stack', label: 'What it runs on' },
]

export default function Colophon() {
  const [active, setActive] = useState('overview')
  const scrollingRef = useRef(false)

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting && !scrollingRef.current) setActive(id) },
        { rootMargin: '-30% 0px -60% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  const handleTocClick = (e, id) => {
    e.preventDefault()
    setActive(id)
    scrollingRef.current = true
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => { scrollingRef.current = false }, 1000)
  }

  return (
    <>
      <Background />
      <Nav />
      <article className="blog-shell">

        <header className="blog-header">
          <h1 className="title is-3">How This Site Was Built</h1>
          <p className="blog-meta">September 2026</p>
          <div className="blog-tags">
            {['Web', 'React', 'Meta'].map(t => (
              <span key={t} className="tag is-dark">{t}</span>
            ))}
          </div>
        </header>

        <div className="blog-layout">

          <nav className="blog-toc">
            <h3>Contents</h3>
            <ol>
              {sections.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={active === id ? 'active' : ''}
                    onClick={e => handleTocClick(e, id)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="blog-body">

            <h2 id="overview">Four versions</h2>
            <p>
              This site has been rebuilt four times. Each rebuild came from learning something new and wanting to do the previous version better, so the history of the site is also a fairly honest record of what I knew about the web at each point. None of the versions were planned as stepping stones. They just turned out that way.
            </p>
            <p>
              The current site is the fourth, and the first one where the rebuild was not a redesign. The look is the third version's; only the way it is put together changed.
            </p>

            <h2 id="v1">Raw HTML and CSS</h2>
            <p>
              The first version was a handful of HTML files and one stylesheet. It was functional and rough, and its main value was that it forced me to learn how a page is actually structured: what the document is, how the cascade works, why a layout breaks when the viewport shrinks. It was not a good site, but nothing in it was hidden from me either.
            </p>

            <h2 id="v2">Bootstrap</h2>
            <p>
              The second version was built in Bootstrap Studio. It looked cleaner almost immediately, which was the point, and it cost me ownership of the result. The WYSIWYG workflow and the plug-a-class-in nature of the framework meant the site felt assembled rather than made. When something did not look right I was searching for the class that would fix it, not understanding why it was wrong. I fell out of love with it quickly and never finished it.
            </p>

            <h2 id="v3">Back to HTML and CSS</h2>
            <p>
              During a break I threw the Bootstrap version out and redesigned the site from scratch in plain HTML and CSS, deliberately without frameworks or shortcuts. I wanted to own every design decision and understand what was happening at each step. That is where the current visual language comes from: the dark, layered background, the translucent glass surfaces, the floating pill navigation, one typeface. This became the definitive version of the site and everything since has been measured against it.
            </p>

            <h2 id="v4">React and Vite</h2>
            <p>
              After picking up React, I rebuilt the third version as a faithful port. Same look, same feel, same pages, now as components. React Router handles navigation cleanly, and Bulma provides a small set of layout utilities without the opinionated behaviour that had put me off Bootstrap. The constraint I set was that nothing about the design should change just because the tooling did, and it mostly held.
            </p>
            <p>
              Since the port, the site has kept changing in ways that are less visible. The background used to be a video, then an image, and is now a procedural SVG drawn at load time, because a full-screen gradient in an SVG dithers into a visible grid on desktop engines and the fix was to move the colour into CSS. The project pages grew from one shared layout into a data-driven list with prev and next links between them. And the long-form writeups, including this one, are written in Markdown and compiled into React components by a small Python script, so the prose lives in a text file and the layout lives in one template.
            </p>

            <h2 id="stack">What it runs on</h2>
            <p>
              
            </p>
            <ul>
              <li><strong>React 18</strong> for the components and <strong>Vite</strong> for the dev server and build.</li>
              <li><strong>React Router</strong> for client-side routing. Vercel rewrites every path to <code>index.html</code>, so deep links work on a refresh.</li>
              <li><strong>Bulma</strong> for a handful of layout and spacing utilities; almost all of the styling is hand-written CSS.</li>
              <li><strong>Inter</strong> as the only typeface.</li>
              <li><strong>Vercel</strong> for hosting, deploying on every push to <code>main</code>.</li>
            </ul>
            <p>
              The source is on <a href="https://github.com/wen-ethan/wen-ethan.github.io" target="_blank" rel="noreferrer">GitHub</a>. The repository name is a leftover from when it was hosted on GitHub Pages.
            </p>

            <hr className="blog-divider" />

            <div className="blog-footer">
              <Link className="back-link" to="/writing">&larr; Back to writing</Link>
            </div>

          </div>
        </div>
      </article>
      <Footer />
    </>
  )
}
