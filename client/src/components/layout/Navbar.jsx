import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MessageCircle, ChevronDown } from 'lucide-react'
import LinkedinIcon from '../icons/LinkedinIcon'
import WhatsappIcon from '../icons/WhatsappIcon'
import { useSite } from '../../context/ContentContext'
import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Practice Areas' },
  { to: '/team', label: 'Team' },
]

const resourceLinks = [
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/faq', label: 'FAQ' },
]

export default function Navbar() {
  const site = useSite()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()

  const isResourceActive = resourceLinks.some((link) => link.to === location.pathname)

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setResourcesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const closeAll = () => {
    setOpen(false)
    setResourcesOpen(false)
  }

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-topbar">
        <div className="container navbar-topbar-inner">
          <div className="navbar-topbar-links">
            <a href={site.telHref}>
              <Phone strokeWidth={1.75} /> {site.phone}
            </a>
            <a href={`mailto:${site.emails[0]}`}>
              <Mail strokeWidth={1.75} /> {site.emails[0]}
            </a>
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.linkedinLabel} on LinkedIn`}
            >
              <LinkedinIcon size={14} /> {site.linkedinLabel}
            </a>
          </div>
          <p className="navbar-topbar-tagline">
            {site.jurisdictions.join(' • ')}
          </p>
        </div>
      </div>

      <div className="container navbar-inner">
        <a href="/" className="navbar-brand">
          <img src="/images/brand/logo.jpeg" alt={site.firmName} className="navbar-logo" />
          <span className="navbar-brand-text">
            <span className="navbar-brand-name">{site.firmName.toUpperCase()}</span>
            <span className="navbar-brand-sub">{site.tagline}</span>
          </span>
        </a>

        <nav className={`navbar-links ${open ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`}
              onClick={closeAll}
            >
              {link.label}
            </NavLink>
          ))}

          <div className="navbar-dropdown" ref={dropdownRef}>
            <button
              type="button"
              className={`navbar-link navbar-dropdown-trigger ${isResourceActive ? 'is-active' : ''} ${resourcesOpen ? 'is-open' : ''}`}
              onClick={() => setResourcesOpen((prev) => !prev)}
              aria-expanded={resourcesOpen}
            >
              Resources
              <ChevronDown size={15} strokeWidth={2} className="navbar-dropdown-chevron" />
            </button>

            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  className="navbar-dropdown-panel"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {resourceLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) => `navbar-dropdown-link ${isActive ? 'is-active' : ''}`}
                      onClick={closeAll}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink
            to="/careers"
            className={({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`}
            onClick={closeAll}
          >
            Career
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`}
            onClick={closeAll}
          >
            Contact
          </NavLink>

          <a
            href={site.waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline navbar-cta navbar-cta-whatsapp"
            onClick={closeAll}
          >
            <WhatsappIcon size={17} /> WhatsApp
          </a>
          <Link
            to="/contact"
            className="btn-primary navbar-cta"
            onClick={closeAll}
          >
            <MessageCircle size={17} strokeWidth={2} /> Book Consultation
          </Link>
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
