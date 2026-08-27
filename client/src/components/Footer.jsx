import { Link } from 'react-router-dom'
import { Link2, Phone, MapPin, Mail, Scale } from 'lucide-react'
import './Footer.css'

const practiceAreas = [
  'Construction & Infrastructure',
  'Company Law & Insolvency',
  'Banking & Finance',
  'Constitutional & Rights-Based Law',
  'Real Estate & Property',
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top-accent" />

      <div className="container footer-grid">
        <div className="footer-brand-col">
          <div className="footer-brand-row">
            <img src="/logo.jpeg" alt="Catalyst Chambers" className="footer-logo" />
            <div>
              <h3 className="footer-brand">CATALYST CHAMBERS</h3>
              <p className="footer-sub">Advocates &amp; Consultants</p>
            </div>
          </div>
          <p className="footer-text">
            Providing strategic, solution-oriented legal representation before all
            Courts, Tribunals, and Statutory Authorities across Delhi NCR.
          </p>
        </div>

        <div>
          <h4 className="footer-heading icon-title"><Link2 strokeWidth={1.75} /> Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading icon-title"><Scale strokeWidth={1.75} /> Practice Areas</h4>
          <ul className="footer-links">
            {practiceAreas.map((area) => (
              <li key={area}><Link to="/services">{area}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="footer-heading icon-title"><Phone strokeWidth={1.75} /> Contact</h4>
          <ul className="footer-links footer-contact-list">
            <li>
              <span className="footer-icon-badge"><MapPin strokeWidth={1.75} /></span>
              S-258, Basement, Block S, Greater Kailash-1, New Delhi – 110048
            </li>
            <li>
              <a href="tel:+918826654793">
                <span className="footer-icon-badge"><Phone strokeWidth={1.75} /></span>
                +91 88266 54793
              </a>
            </li>
            <li>
              <a href="mailto:info@catalystchambers.com">
                <span className="footer-icon-badge"><Mail strokeWidth={1.75} /></span>
                info@catalystchambers.com
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
