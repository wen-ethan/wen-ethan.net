#!/usr/bin/env python3
"""Regenerate a blog-post page component from its Markdown source.

    python3 tools/build-writeup.py content/<post>.md src/pages/<dir>/<Name>.jsx
    python3 tools/build-writeup.py            # rebuilds every post in POSTS

The component is named after the output file's stem. The JSX is generated
output -- edit the Markdown, not the component.

The page shell (imports, TOC scroll-spy, classNames) is the BlogTemplate
layout and lives in TEMPLATE below; only the header, hero, sections array
and .blog-body come from the Markdown.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Every post on the site, so a bare run rebuilds all of them. Add a line here
# when a new Markdown file lands in content/.
POSTS = [
    ("content/serial-vga-writeup.md", "src/pages/projects/SerialVgaWriteup.jsx"),
    ("content/how-this-site-was-built.md", "src/pages/writing/Colophon.jsx"),
]


def escape(text):
    """Make a plain string safe as JSX text. Runs before inline markup."""
    return (text.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("{", "&#123;")
                .replace("}", "&#125;"))


def inline(text):
    """Escape, then expand `code`, **bold**, *italic* and [text](url)."""
    out = escape(text)
    out = re.sub(r"`([^`]+)`", r"<code>\1</code>", out)
    out = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)",
                 r'<a href="\2" target="_blank" rel="noreferrer">\1</a>', out)
    out = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", out, flags=re.S)
    out = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", r"<em>\1</em>", out, flags=re.S)
    return out


def parse_frontmatter(text):
    if not text.startswith("---\n"):
        sys.exit("error: file must open with a --- frontmatter block")
    _, raw, body = text.split("---\n", 2)
    meta = {}
    for line in raw.splitlines():
        if line.strip():
            key, _, value = line.partition(":")
            meta[key.strip()] = value.strip()
    for required in ("title", "date", "tags", "back_to", "back_label"):
        if required not in meta:
            sys.exit(f"error: frontmatter is missing '{required}'")
    if ("hero" in meta) != ("hero_alt" in meta):
        sys.exit("error: hero and hero_alt must be given together")
    return meta, body


def split_prose(text):
    """Split plain text into ('p', str) and ('ul'|'ol', [items]) in order.

    A list is a run of lines opening with `- ` (or `* `, `+ `) or `1. `.
    An indented line continues the item above it.
    """
    blocks = []
    for chunk in re.split(r"\n\s*\n", text):
        if not chunk.strip():
            continue
        para, items, kind = [], [], None

        def flush_para():
            if para:
                blocks.append(("p", " ".join(" ".join(para).split())))
                para.clear()

        def flush_list():
            nonlocal kind
            if items:
                blocks.append((kind, [" ".join(i.split()) for i in items]))
                items.clear()
            kind = None

        for line in chunk.splitlines():
            bullet = re.match(r"\s*[-*+]\s+(.*)$", line)
            number = re.match(r"\s*\d+\.\s+(.*)$", line)
            if bullet or number:
                flush_para()
                want = "ul" if bullet else "ol"
                if kind and kind != want:
                    flush_list()
                kind = want
                items.append((bullet or number).group(1))
            elif items and line[:1].isspace() and line.strip():
                items[-1] += " " + line.strip()
            else:
                flush_list()
                para.append(line.strip())

        flush_para()
        flush_list()
    return blocks


def hero_position(meta):
    """Optional `hero_position: top|bottom` in frontmatter -> a modifier class.

    The hero crops to max-height with object-fit: cover, so a tall source photo
    loses its top and bottom. This picks which edge is kept. Omit the key for
    the default centred crop; nothing is emitted and the shared style applies.
    """
    value = meta.get("hero_position", "").strip().lower()
    if not value or value == "center":
        return ""
    if value not in ("top", "bottom"):
        sys.exit(f"error: hero_position must be top, bottom or center (got '{value}')")
    return f" hero-{value}"


def parse_figure(block):
    """A figure block is `key: value` lines; caption may not contain a newline."""
    fig = {}
    for line in block.strip().splitlines():
        key, _, value = line.partition(":")
        fig[key.strip()] = value.strip()
    for required in ("src", "alt", "caption"):
        if required not in fig:
            sys.exit(f"error: figure block is missing '{required}':\n{block}")
    return fig


def parse_body(body):
    """Return [(id, label, [block, ...]), ...] preserving document order."""
    body = re.sub(r"<!--.*?-->", "", body, flags=re.S)
    sections, current = [], None

    # Split into headings, fenced blocks, and paragraphs, in order.
    token = re.compile(r"^## (?P<label>.+?)\s*\{#(?P<id>[a-z0-9-]+)\}\s*$"
                       r"|^```(?P<kind>figure-row|figure)\n(?P<block>.*?)^```\s*$",
                       re.M | re.S)

    pos = 0
    for m in token.finditer(body):
        text = body[pos:m.start()]
        if current is not None:
            current[2].extend(split_prose(text))
        elif text.strip():
            sys.exit("error: prose appears before the first '## Heading {#id}'")
        pos = m.end()

        if m.group("label"):
            current = (m.group("id"), m.group("label").strip(), [])
            sections.append(current)
        elif m.group("kind") == "figure":
            current[2].append(("figure", parse_figure(m.group("block"))))
        else:
            parts = m.group("block").split("\n---\n")
            if len(parts) != 2:
                sys.exit("error: a figure-row needs exactly two figures split by ---")
            current[2].append(("figure-row", [parse_figure(p) for p in parts]))

    if current is not None:
        current[2].extend(split_prose(body[pos:]))
    if not sections:
        sys.exit("error: no '## Heading {#id}' sections found")
    return sections


def render_hero(meta):
    """The hero block, or nothing when the post has no `hero` in frontmatter."""
    if "hero" not in meta:
        return ""
    return (f'        <div className="blog-hero{hero_position(meta)}">\n'
            f'          <img src="{meta["hero"]}" alt="{escape(meta["hero_alt"])}" />\n'
            f'        </div>\n\n')


def render_figure(fig, indent):
    pad = " " * indent
    return (f'{pad}<figure className="blog-image">\n'
            f'{pad}  <img src="{fig["src"]}" alt="{escape(fig["alt"])}" />\n'
            f'{pad}  <figcaption>\n'
            f'{pad}    {inline(fig["caption"])}\n'
            f'{pad}  </figcaption>\n'
            f'{pad}</figure>')


def render_body(sections):
    out = []
    for sid, label, blocks in sections:
        out.append(f'            <h2 id="{sid}">{escape(label)}</h2>')
        for kind, payload in blocks:
            if kind == "p":
                # One line per paragraph on purpose: JSX drops the space between
                # text and an inline element when a newline separates them, so
                # wrapping would silently eat spaces around <strong>/<em>/<a>.
                out.append(f"            <p>\n              {inline(payload)}\n            </p>")
            elif kind in ("ul", "ol"):
                tag = kind
                lines = [f"            <{tag}>"]
                lines += [f"              <li>{inline(item)}</li>" for item in payload]
                lines.append(f"            </{tag}>")
                out.append("\n".join(lines))
            elif kind == "figure":
                out.append("\n" + render_figure(payload, 12) + "\n")
            else:
                left, right = payload
                out.append("\n            <div className=\"blog-image-row\">\n"
                           + render_figure(left, 14) + "\n"
                           + render_figure(right, 14) + "\n"
                           + "            </div>\n")
        out.append("")
    return "\n".join(out).rstrip()


TEMPLATE = '''import {{ useEffect, useRef, useState }} from 'react'
import {{ Link }} from 'react-router-dom'
import Background from '../../components/Background'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import '../../styles/blog-page.css'

// Generated from {source} by tools/build-writeup.py.
// Edit the Markdown and re-run the script; changes made here are overwritten.

const sections = [
{sections}
]

export default function {component}() {{
  const [active, setActive] = useState('{first_id}')
  const scrollingRef = useRef(false)

  useEffect(() => {{
    const observers = sections.map(({{ id }}) => {{
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {{ if (entry.isIntersecting && !scrollingRef.current) setActive(id) }},
        {{ rootMargin: '-30% 0px -60% 0px' }}
      )
      obs.observe(el)
      return obs
    }})
    return () => observers.forEach(obs => obs?.disconnect())
  }}, [])

  const handleTocClick = (e, id) => {{
    e.preventDefault()
    setActive(id)
    scrollingRef.current = true
    document.getElementById(id)?.scrollIntoView({{ behavior: 'smooth' }})
    setTimeout(() => {{ scrollingRef.current = false }}, 1000)
  }}

  return (
    <>
      <Background />
      <Nav />
      <article className="blog-shell">

        <header className="blog-header">
          <h1 className="title is-3">{title}</h1>
          <p className="blog-meta">{date}</p>
          <div className="blog-tags">
            {{{tags}.map(t => (
              <span key={{t}} className="tag is-dark">{{t}}</span>
            ))}}
          </div>
        </header>

{hero}        <div className="blog-layout">

          <nav className="blog-toc">
            <h3>Contents</h3>
            <ol>
              {{sections.map(({{ id, label }}) => (
                <li key={{id}}>
                  <a
                    href={{`#${{id}}`}}
                    className={{active === id ? 'active' : ''}}
                    onClick={{e => handleTocClick(e, id)}}
                  >
                    {{label}}
                  </a>
                </li>
              ))}}
            </ol>
          </nav>

          <div className="blog-body">

{body}

            <hr className="blog-divider" />

            <div className="blog-footer">
              <Link className="back-link" to="{back_to}">&larr; {back_label}</Link>
            </div>

          </div>
        </div>
      </article>
      <Footer />
    </>
  )
}}
'''


def build(src, out):
    meta, body = parse_frontmatter(src.read_text())
    sections = parse_body(body)

    tags = [t.strip() for t in meta["tags"].split(",") if t.strip()]
    jsx = TEMPLATE.format(
        sections="\n".join(
            f"  {{ id: '{sid}', label: '{label.replace(chr(39), chr(92) + chr(39))}' }},"
            for sid, label, _ in sections),
        first_id=sections[0][0],
        source=src.relative_to(ROOT),
        component=out.stem,
        title=escape(meta["title"]),
        date=escape(meta["date"]),
        tags="[" + ", ".join(f"'{t}'" for t in tags) + "]",
        hero=render_hero(meta),
        back_to=meta["back_to"],
        back_label=escape(meta["back_label"]),
        body=render_body(sections),
    )
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(jsx)
    words = sum(len(p.split()) if kind == "p" else sum(len(i.split()) for i in p)
                for _, _, blocks in sections
                for kind, p in blocks if kind in ("p", "ul", "ol"))
    print(f"wrote {out.relative_to(ROOT)} "
          f"({len(sections)} sections, {words} words of body prose)")


def main():
    if len(sys.argv) == 3:
        pairs = [(sys.argv[1], sys.argv[2])]
    elif len(sys.argv) == 1:
        pairs = POSTS
    else:
        sys.exit(__doc__)
    for src, out in pairs:
        build(ROOT / src, ROOT / out)


if __name__ == "__main__":
    main()
