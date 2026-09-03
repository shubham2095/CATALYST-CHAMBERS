import { Link } from 'react-router-dom'
import { HardHat, Zap, Building2, Landmark, Scale, Home as HomeIcon, ArrowRight, Gavel } from 'lucide-react'
import Reveal from '../components/Reveal'
import { RevealGroup, RevealItem } from '../components/RevealGroup'
import './Services.css'

const serviceCategories = [
  {
    icon: HardHat,
    title: 'Construction & Infrastructure Disputes',
    points: [
      'National & State Highways',
      'Railway Infrastructure',
      'Smart City Projects',
    ],
  },
  {
    icon: Zap,
    title: 'Energy & Oil and Gas Disputes',
    points: [
      'Regulatory disputes',
      'Renewable energy (solar & wind EPC)',
      'Offshore construction disputes',
    ],
  },
  {
    icon: Building2,
    title: 'Company Cases',
    points: [
      'Insolvency, Bankruptcy, Winding-up & Liquidation',
      'Mergers & Acquisition',
      'Mismanagement, Oppression & Shareholder disputes',
      'Corporate governance, transactions & regulatory compliances',
      'Competition & Anti-Trust cases',
      'Labour & Industrial law',
    ],
  },
  {
    icon: Landmark,
    title: 'Banking, Finance & Technology',
    points: [
      'Debt recovery & security enforcement disputes before DRTs and DRATs',
      'Debt restructuring and acquisition advisory',
      'Securities & share markets advisory',
    ],
  },
  {
    icon: Scale,
    title: 'Constitutional & Rights-Based Law',
    points: [
      'Human rights, PIL & public law cases',
      'Environmental law cases',
      'Administrative & Service Law cases',
    ],
  },
  {
    icon: HomeIcon,
    title: 'Real Estate & Property Disputes',
    points: [
      'Testamentary & Succession laws',
      'Due diligences, transactions & bespoke advisory',
      'Land acquisition disputes',
      'Municipal & Urban bodies compliances',
    ],
  },
]

const additionalAreas = [
  'Original Side & Commercial Suits',
  'Domestic & International Arbitration',
  'Mediation & Conciliation',
  'Taxation Laws',
  'Mining Laws',
  'Criminal Appeals',
  'Maritime Law',
  'Motor Accident Claims',
  'Consumer Laws',
]

export default function Services() {
  return (
    <>
      <section className="services-hero">
        <div className="hero-decor hero-decor-1" />
        <div className="hero-decor hero-decor-2" />
        <div className="container">
          <Reveal>
            <p className="section-label">What We Do</p>
            <h1 className="section-title">Our Services</h1>
            <p className="section-intro">
              Catalyst Chambers provides strategic, solution-oriented
              representation before all Courts, Tribunals, and Statutory
              Authorities, along with bespoke legal counselling across the
              following practice areas.
            </p>
            <div className="services-hero-stats">
              <span><strong>6</strong> Core Practice Areas</span>
              <span><strong>9+</strong> Additional Specializations</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <RevealGroup className="services-grid">
            {serviceCategories.map((cat, index) => (
              <RevealItem className="service-card" key={cat.title}>
                <span className="service-card-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="service-icon-badge">
                  <cat.icon className="service-icon" strokeWidth={1.75} />
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

      <section className="section cta-section">
        <Reveal type="scale" className="container cta-inner">
          <h2>Need legal counsel for your matter?</h2>
          <p>Get in touch for a confidential consultation.</p>
          <div className="cta-actions">
            <a
              href="https://wa.me/918826654793"
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
