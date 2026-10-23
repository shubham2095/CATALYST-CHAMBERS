import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Gavel } from 'lucide-react'
import Reveal from '../../components/common/Reveal'
import { RevealGroup, RevealItem } from '../../components/common/RevealGroup'
import DynamicIcon from '../../components/common/DynamicIcon'
import { useContent, useSite } from '../../context/ContentContext'
import './Services.css'

export default function Services() {
  const { services } = useContent()
  const { waHref } = useSite()
  const { intro, categories, additionalAreas, notableMatters } = services

  return (
    <>
      <section className="services-hero">
        <div className="hero-decor hero-decor-1" />
        <div className="hero-decor hero-decor-2" />
        <div className="container">
          <Reveal>
            <p className="section-label">What We Do</p>
            <h1 className="section-title">Our Services</h1>
            <p className="section-intro">{intro}</p>
            <div className="services-hero-stats">
              <span><strong>{categories.length}</strong> Core Practice Areas</span>
              <span><strong>{additionalAreas.length}+</strong> Additional Specializations</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <RevealGroup className="services-grid">
            {categories.map((cat, index) => (
              <RevealItem className="service-card" key={cat.title}>
                <span className="service-card-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="service-icon-badge">
                  <DynamicIcon name={cat.icon} className="service-icon" strokeWidth={1.75} />
                </span>
                <h3>{cat.title}</h3>
                <ul>
                  {cat.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section additional-section">
        <div className="container">
          <Reveal>
            <p className="section-label">Also Handled</p>
            <h2 className="section-title">Additional Practice Areas</h2>
          </Reveal>
          <RevealGroup className="tag-list">
            {additionalAreas.map((area) => (
              <RevealItem as="span" className="tag" key={area}>
                <Gavel size={14} strokeWidth={1.75} /> {area}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section matters-section">
        <div className="container">
          <Reveal>
            <p className="section-label">Track Record</p>
            <h2 className="section-title">Notable Matters</h2>
          </Reveal>
          <RevealGroup className="matters-list" as="ul">
            {notableMatters.map((matter, index) => (
              <RevealItem className="matters-item" as="li" key={matter.title}>
                <span className="matters-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="matters-text">
                  <span className="matters-title">{matter.title}</span>
                  <span className="matters-detail">
                    <Gavel size={13} strokeWidth={1.75} /> {matter.detail}
                  </span>
                </span>
                <ArrowUpRight className="matters-arrow" size={20} strokeWidth={1.75} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section cta-section">
        <Reveal type="scale" className="container cta-inner">
          <h2>Need legal counsel for your matter?</h2>
          <p>Get in touch for a confidential consultation.</p>
          <div className="cta-actions">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Contact Us <ArrowRight size={16} strokeWidth={2} />
            </a>
            <Link to="/contact" className="btn-outline">Book Consultation</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
