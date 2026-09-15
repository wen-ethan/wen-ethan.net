import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Background from '../../components/Background'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import '../../styles/blog-page.css'

// Generated from content/how-this-site-was-built.md by tools/build-writeup.py.
// Edit the Markdown and re-run the script; changes made here are overwritten.

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'v1', label: 'v1: Raw HTML and CSS' },
  { id: 'v2', label: 'v2: Bootstrap' },
  { id: 'v3', label: 'v3: Return to HTML and CSS' },
  { id: 'v4', label: 'v4: React and Vite' },
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
            {['Web', 'React', 'HTMLL/CSS'].map(t => (
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

            <h2 id="overview">Overview</h2>
            <p>
              This site has been redesigned and rebuilt four times, with each rebuild stemming from learning a new technique and wanting to implement it myself; in this way, the history of this site is also a fairly honest record of what I knew about web development at each point. I never set out to build any of them as practice for the next one; that only became evident in hindsight.
            </p>
            <p>
              The current implementation of the website is its fourth iteration, and incidentally the first version where my rebuild did not coincide with a complete redesign (I ultimately chose to keep the third version's design and layout, but upgrade the underlying technology).
            </p>

            <h2 id="v1">v1: Raw HTML and CSS</h2>
            <p>
              The first iteration of my website was simply a handful of HTML files, stylized with the new.css framework. Although it was pretty rough around the edges, it was functional enough, and ultimately helped me learn how web pages are actually structured. Honestly, it was not a very good site, but I was still proud to call it my own.
            </p>

            <div className="blog-image-row">
              <figure className="blog-image">
                <img src="/writing/colophon/v1-home-1024.png" alt="v1's home page: a black page with a heading, a nav line, and two short lists" />
                <figcaption>
                  v1, mid-2024. The whole home page.
                </figcaption>
              </figure>
              <figure className="blog-image">
                <img src="/writing/colophon/v1-projects-1024.png" alt="The first version's projects page, two headings on a black page" />
                <figcaption>
                  v1's projects page. Two headings, no links yet.
                </figcaption>
              </figure>
            </div>


            <h2 id="v2">v2: Bootstrap</h2>
            <p>
              One day, I had seen a friend configuring their own website with Bootstrap Studio, using its WYSIWYG workflow to build up a beautiful website with not that much effort. As a result, I decided to completely scrap my original site in favor of rebuilding it in Bootstrap Studio. Although it ended up looking much cleaner almost immediately, it ultimately cost me ownership of the result; the WYSIWYG workflow that had drawn me into using it began to make the site feel more like I had assembled it, rather than built it myself. I fell out of love with it quickly and never finished it.
            </p>

            <figure className="blog-image">
              <img src="/writing/colophon/v2-home-fold.png" alt="The Bootstrap version's landing section with a dark navbar and a centred heading" />
              <figcaption>
                v2, mid-2024, above the fold. Bootstrap Studio made it look finished before it was.
              </figcaption>
            </figure>


            <figure className="blog-image">
              <img src="/writing/colophon/v2-home.png" alt="The full Bootstrap version home page, one long scroll with About, Fun Facts, Skills, and Projects sections" />
              <figcaption>
                The full v2 home page. Everything lived on one page; the Projects and Skills pages on that branch are blank.
              </figcaption>
            </figure>


            <h2 id="v3">v3: Return to HTML and CSS</h2>
            <p>
              During a break, I finally scrapped the Bootstrap version and took it upon myself to redesign the website from the ground up, using pure HTML and CSS (since that was all I was comfortable with at the time), without using any frameworks or shortcuts. With this redesign, I wanted to own every design decision and understand what was happening with each component, and how they came together to create a cohesive page. It is here that the current visual design language originates from: inspired by Apple's Liquid Glass and the way modern mobile interfaces lean on transparency, I settled on a dark, layered background with translucent glass surfaces floating over it, a pill-shaped navigation bar, and a single typeface throughout. This ultimately became the definitive version of the site, with all changes made since being measured against it.
            </p>

            <figure className="blog-image">
              <img src="/writing/colophon/v3-home-fold.jpg" alt="The third version's home page, a name and one line over a purple video background with a floating pill nav" />
              <figcaption>
                v3, early 2026. The layered background, the glass surfaces, and the pill nav all start here.
              </figcaption>
            </figure>


            <div className="blog-image-row">
              <figure className="blog-image">
                <img src="/writing/colophon/v3-projects-fold.jpg" alt="The third version's projects page with large glass cards" />
                <figcaption>
                  v3's projects page.
                </figcaption>
              </figure>
              <figure className="blog-image">
                <img src="/writing/colophon/v3-project-page-fold.jpg" alt="A v3 project detail page with a carousel on the left and text on the right" />
                <figcaption>
                  A v3 project page.
                </figcaption>
              </figure>
            </div>


            <h2 id="v4">v4: React and Vite</h2>
            <p>
              After joining clubs on campus and picking up React, I ported my website over to using React, keeping the same overall look and feel, but breaking every repeated piece of the page (the nav, the cards, the carousel, the footer) into its own component instead of copying the same HTML across every file. React Router handles navigation cleanly, and Bulma provides a small set of layout utilities without the opinionated behaviour that had put me off Bootstrap. My main constraint with this version was that the overall design of the site should not change just because the underlying tooling did, which mostly held.
            </p>

            <div className="blog-image-row">
              <figure className="blog-image">
                <img src="/writing/colophon/v4-home-fold.jpg" alt="The current home page, visually the same as v3 with buttons and social links added" />
                <figcaption>
                  v4, the current site; built to look the same as v3.
                </figcaption>
              </figure>
              <figure className="blog-image">
                <img src="/writing/colophon/v4-projects-fold.jpg" alt="The current projects page" />
                <figcaption>
                  The current projects page.
                </figcaption>
              </figure>
            </div>

            <p>
              Since this major port, the site has continue to change and evolve in less visible ways. For example, the background used to be a royalty-free video, which was then changed to a single frame from this video, and ultimately became a procedural SVG drawn at load time (a full-screen gradient in an SVG dithers into a visible grid on desktop engines, and as such required moving the colour into CSS). In addition, the project pages grew from one shared layout for all projects into a data-driven list with previous and next links between them. Long-form writeups (like the one you're reading right now!) are written in Markdown before being compiled into React components by a small Python script, such that the prose lives in a text file and the layout lives in one template.
            </p>

            <h2 id="stack">What it runs on</h2>
            <p>
              For thos curious, here's what the current website is built upon:
            </p>
            <ul>
              <li><strong>React 18</strong> handles all of the components, with <strong>Vite</strong> running the dev server and builds (the main appeal of Vite was that I never had to think about it).</li>
              <li><strong>React Router</strong> takes care of navigation on the client side; since the site is just a single page under the hood, Vercel writes every path back to <code>index.html</code>, allowing page links and refreshes to land on the right page, rather than a 404.</li>
              <li>While <strong>Bulma</strong> is still being used, it's mainly only for a handful of layout and spacing utilities; almost everything you actually see is hand-written CSS, carried over from v3.</li>
              <li><strong>Inter</strong> is the only typeface on the site, and I have yet to find a reason to add a second.</li>
              <li><strong>Vercel</strong> hosts everything and redeploys on every push to <code>main</code>.</li>
            </ul>
            <p>
              The source is on <a href="https://github.com/wen-ethan/wen-ethan.net" target="_blank" rel="noreferrer">GitHub</a>, if you'd like to check it out!
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
