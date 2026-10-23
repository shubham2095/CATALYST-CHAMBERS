import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Maximize2, MessageCircle } from 'lucide-react'
import Reveal from '../../components/common/Reveal'
import { RevealGroup, RevealItem } from '../../components/common/RevealGroup'
import AnimatedCounter from '../../components/common/AnimatedCounter'
import Accordion from '../../components/common/Accordion'
import DynamicIcon from '../../components/common/DynamicIcon'
import { useContent, useSite } from '../../context/ContentContext'
import './Home.css'

export default function Home() {
  const { home, faqs } = useContent()
  const { waHref } = useSite()
  const { hero, stats, whyChooseUs, practiceAreas, officePhotos } = home

  return (
    <>
      <section className="hero">
        <div className="hero-decor hero-decor-1" />
        <div className="hero-decor hero-decor-2" />
        <div className="container hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">{hero.label}</p>
            <h1 className="hero-title">{hero.title}</h1>
            <p className="hero-text">{hero.text}</p>
            <div className="hero-actions">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle size={17} strokeWidth={2} /> {hero.primaryCta}
              </a>
              <Link to="/team" className="btn-outline">{hero.secondaryCta}</Link>
            </div>
            <div className="hero-badges">
              {hero.badges.map((badge) => (
                <span key={badge.text}>
                  <DynamicIcon name={badge.icon} size={16} strokeWidth={1.75} /> {badge.text}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="hero-portrait"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="hero-portrait-frame">
              <img src={hero.image} alt="Adv. Rohit Ghosh" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section stats-section">
        <div className="container">
          <RevealGroup className="stats-grid">
            {stats.map((stat) => (
              <RevealItem className="stat-card" key={stat.label}>
                <span className="stat-icon-badge">
                  <DynamicIcon name={stat.icon} strokeWidth={1.75} />
                </span>
                <p className="stat-value">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="stat-label">{stat.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section why-section">
        <div className="container">
          <Reveal>
            <p className="section-label">Why Catalyst Chambers</p>
            <h2 className="section-title">Built on Experience &amp; Trust</h2>
            <p className="section-intro">
              A practice shaped by years at India&rsquo;s leading law firms and
              chambers of eminent Senior Advocates.
            </p>
          </Reveal>

          <RevealGroup className="why-grid">
            {whyChooseUs.map((item, index) => (
              <RevealItem className="why-card" key={item.title}>
                <span className="why-card-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="why-icon-badge">
                  <DynamicIcon name={item.icon} className="why-icon" strokeWidth={1.75} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <p className="section-label">What We Do</p>
            <h2 className="section-title">Practice Areas</h2>
            <p className="section-intro">
              Dedicated to justice, committed to you — we provide strategic,
              solution-oriented representation across a wide spectrum of
              practice areas.
            </p>
          </Reveal>

          <RevealGroup className="practice-grid">
            {practiceAreas.map((area) => (
              <RevealItem className="practice-card" key={area.title}>
                <span className="practice-shine" />
                <span className="practice-icon-badge">
                  <DynamicIcon name={area.icon} className="practice-icon" strokeWidth={1.75} />
                </span>
                <h3>{area.title}</h3>
                <p>{area.desc}</p>
                <Link to="/services" className="practice-link">
                  Learn more <ArrowRight size={15} strokeWidth={2} />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="practice-cta" delay={0.1}>
            <Link to="/services" className="btn-outline">View All Services</Link>
          </Reveal>
        </div>
      </section>

      <section className="section office-section">
        <div className="container">
          <Reveal>
            <p className="section-label">Step Inside</p>
            <h2 className="section-title">Our Office in Greater Kailash</h2>
          </Reveal>
          <RevealGroup className="office-strip">
            {officePhotos.map((photo) => (
              <RevealItem className="office-strip-item" key={photo.src}>
                <Link to="/gallery" className="office-strip-link">
                  <img src={photo.src} alt={photo.caption} loading="lazy" />
                  <span className="office-strip-overlay">
                    <span className="office-strip-expand">
                      <Maximize2 size={20} strokeWidth={1.75} />
                    </span>
                  </span>
                  <span className="office-strip-caption">{photo.caption}</span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="office-cta" delay={0.1}>
            <Link to="/gallery" className="btn-outline">View Full Gallery</Link>
          </Reveal>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-home-layout">
          <Reveal>
            <p className="section-label">Have Questions?</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-intro">
              Quick answers to what clients ask us most.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion items={faqs.items.slice(0, 4)} />
            <Link to="/faq" className="faq-view-all">
              View All FAQs <ArrowRight size={15} strokeWidth={2} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section cta-section">
        <Reveal type="scale" className="container cta-inner">
          <h2>Have a legal matter to discuss?</h2>
          <p>Reach out for a confidential consultation with our team.</p>
          <div className="cta-actions">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={17} strokeWidth={2} /> Contact Us
            </a>
            <Link to="/contact" className="btn-outline">Book Consultation</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
