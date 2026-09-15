import { NavLink } from 'react-router-dom'

export default function Nav() {
  const cls = ({ isActive }) => 'nav-item' + (isActive ? ' active' : '')

  return (
    <nav className="nav-wrapper">
      <NavLink to="/" end className={cls}>Home</NavLink>
      <NavLink to="/projects" className={cls}>Projects</NavLink>
      <NavLink to="/writing" className={cls}>Writing</NavLink>
      <NavLink to="/resume" className={cls}>Resume</NavLink>
      <NavLink to="/about" className={cls}>About</NavLink>
    </nav>
  )
}
