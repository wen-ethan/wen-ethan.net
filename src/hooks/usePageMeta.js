import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { metaFor, fullTitle, SITE_URL } from '../data/meta'

function setMeta(selector, content) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [name, value] = selector.slice(5, -1).split('=')
    el.setAttribute(name, value.replace(/"/g, ''))
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Keeps the tab title and meta tags right as the SPA navigates. The first
// paint already has the correct tags for the entry route, since the build
// prerenders one index.html per route (tools/prerender.mjs) from the same
// data; this only matters for in-app navigation after that.
export default function usePageMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const { title, description, image } = metaFor(pathname)
    document.title = fullTitle(title)
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', fullTitle(title))
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:image"]', SITE_URL + image)
    setMeta('meta[property="og:url"]', SITE_URL + (pathname === '/' ? '/' : pathname.replace(/\/+$/, '')))
  }, [pathname])
}
