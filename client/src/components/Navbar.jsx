import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Phone, Mail, MessageCircle } from 'lucide-react'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/team', label: 'Team' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false

    const evaluate = () => {
      const y = window.scrollY
      setScrolled((prev) => {
        if (y > 80) return true
        if (y < 40) return false
        return prev // dead zone between 40-80px avoids flicker at the boundary
      })
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(evaluate)
        ticking = true
      }
    }

    evaluate()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-topbar">
        <div className="container navbar-topbar-inner">
          <div className="navbar-topbar-links">
            <a href="tel:+918826654793">
              <Phone strokeWidth={1.75} /> +91 88266 54793
            </a>
            <a href="mailto:info@catalystchambers.com">
              <Mail strokeWidth={1.75} /> info@catalystchambers.com
            </a>
          </div>
          <p className="navbar-topbar-tagline">
            Delhi NCR &bull; Gurugram &bull; Noida &bull; Pan-India
          </p>
        </div>
      </div>

      <div className="container navbar-inner">
        <a href="/" className="navbar-brand">
          <img src="/logo.jpeg" alt="Catalyst Chambers" className="navbar-logo" />
          <span className="navbar-brand-text">
            <span className="navbar-brand-name">CATALYST CHAMBERS</span>
            <span className="navbar-brand-sub">Advocates &amp; Consultants</span>
          </span>
        </a>

        <nav className={`navbar-links ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="https://wa.me/918826654793"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary navbar-cta"
            onClick={() => setOpen(false)}
          >
            <MessageCircle size={17} strokeWidth={2} /> Enquire Now
          </a>
        </nav>

        <button
          className={`navbar-toggle ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
