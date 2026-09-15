#!/usr/bin/env node
// Writes one index.html per route into dist/ after `vite build`, each with
// that route's title, description and preview image filled in. The page is
// otherwise the same SPA shell, so the app boots identically; the difference
// is only what link unfurlers (iMessage, LinkedIn, Slack) see, since they read
// the HTML without running JS. Vercel's `handle: filesystem` route serves
// dist/projects/echoassist/index.html for /projects/echoassist before falling
// back to the root index.html, so nothing else has to change.
//
// Route list and copy come from src/data/meta.js -- the same module the
// in-app usePageMeta hook uses -- so the two cannot drift.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { metaFor, fullTitle, prerenderRoutes, SITE_URL } from '../src/data/meta.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const shell = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function setTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`prerender: index.html is missing ${pattern}`)
  return html.replace(pattern, replacement)
}

function render(route) {
  const { title, description, image } = metaFor(route)
  const full = esc(fullTitle(title))
  const desc = esc(description)
  const url = SITE_URL + (route === '/' ? '/' : route)
  let html = shell
  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${full}</title>`)
  html = setTag(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${desc}" />`)
  html = setTag(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${full}" />`)
  html = setTag(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${desc}" />`)
  html = setTag(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
  html = setTag(html, /<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${SITE_URL + image}" />`)
  html = setTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
  return html
}

let count = 0
for (const route of prerenderRoutes()) {
  const out = route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, render(route))
  count++
}
console.log(`prerendered ${count} routes into dist/`)
