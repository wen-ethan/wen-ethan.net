import SocialLinks from './SocialLinks'

// `links={false}` for pages that already show the social links in their own
// content (About), so the same three icons are not stacked twice on screen.
export default function Footer({ links = true }) {
  return (
    <footer className="page-footer">
      {links && <SocialLinks size={36} className="footer-links" />}
      <p>© {new Date().getFullYear()} Ethan Wen</p>
    </footer>
  )
}
