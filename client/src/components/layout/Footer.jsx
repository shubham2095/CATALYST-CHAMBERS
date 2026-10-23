import { Link } from 'react-router-dom'
import { Link2, Phone, MapPin, Mail, Scale } from 'lucide-react'
import LinkedinIcon from '../icons/LinkedinIcon'
import WhatsappIcon from '../icons/WhatsappIcon'
import { useSite } from '../../context/ContentContext'
import './Footer.css'

export default function Footer() {
  const site = useSite()

  return (
    <footer className="footer">
      <div className="footer-top-accent" />

      <div className="container footer-grid">
        <div className="footer-brand-col">
          <div className="footer-brand-row">
            <img src="/images/brand/logo.jpeg" alt={site.firmName} className="footer-logo" />
            <div>
              <h3 className="footer-brand">{site.firmName.toUpperCase()}</h3>
              <p className="footer-sub">{site.tagline}</p>
            </div>
          </div>
          <p className="footer-text">{site.footerText}</p>
          <div className="footer-social">
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.linkedinLabel} on LinkedIn`}
            >
              <LinkedinIcon size={17} />
            </a>
            <a
              href={site.waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
            >
              <WhatsappIcon size={17} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="footer-heading icon-title"><Link2 strokeWidth={1.75} /> Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Practice Areas</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/careers">Career</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading icon-title"><Scale strokeWidth={1.75} /> Practice Areas</h4>
          <ul className="footer-links">
            {site.footerPracticeAreas.map((area) => (
              <li key={area}><Link to="/services">{area}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="footer-heading icon-title"><Phone strokeWidth={1.75} /> Contact</h4>
          <ul className="footer-links footer-contact-list">
            <li>
              <span className="footer-icon-badge"><MapPin strokeWidth={1.75} /></span>
              {site.address}
            </li>
            <li>
              <a href={site.telHref}>
                <span className="footer-icon-badge"><Phone strokeWidth={1.75} /></span>
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.emails[0]}`}>
                <span className="footer-icon-badge"><Mail strokeWidth={1.75} /></span>
                {site.emails[0]}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} Catalyst Chambers. All Rights Reserved.</p>
          <p className="footer-disclaimer">
            As per the rules of the Bar Council of India, this website is for
            informational purposes only and does not constitute advertising or
            solicitation.
          </p>
          <div className="footer-bottom-right">
            <div className="footer-legal-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <span aria-hidden="true">&bull;</span>
              <Link to="/terms-of-service">Terms of Service</Link>
            </div>
            <p className="footer-credit">
              Powered by{' '}
              <a href="https://heltog.com" target="_blank" rel="noopener noreferrer">
                Heltog Technologies Pvt. Ltd.
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
