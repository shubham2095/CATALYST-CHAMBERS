import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  HardHat,
  Zap,
  Building2,
  Landmark,
  Scale,
  Home as HomeIcon,
  CalendarDays,
  Star,
  Globe,
  Gavel,
  Award,
  Users,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  Maximize2,
  MessageCircle,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import { RevealGroup, RevealItem } from '../components/RevealGroup'
import AnimatedCounter from '../components/AnimatedCounter'
import Accordion from '../components/Accordion'
import { faqs } from '../data/faqs'
import './Home.css'

const practiceAreas = [
  {
    icon: HardHat,
    title: 'Construction & Infrastructure',
    desc: 'Disputes involving national & state highways, railway infrastructure, and smart city projects.',
  },
  {
    icon: Zap,
    title: 'Energy, Oil & Gas',
    desc: 'Regulatory disputes, renewable energy (solar & wind EPC), and offshore construction matters.',
  },
  {
    icon: Building2,
    title: 'Company Law & Insolvency',
    desc: 'Insolvency, bankruptcy, winding-up, M&A, shareholder and corporate governance disputes.',
  },
  {
    icon: Landmark,
    title: 'Banking, Finance & Technology',
    desc: 'Debt recovery & security enforcement before DRTs/DRATs, debt restructuring, securities advisory.',
  },
  {
    icon: Scale,
    title: 'Constitutional & Rights-Based Law',
    desc: 'Human rights, PIL and public law cases, environmental law, and administrative & service law.',
  },
  {
    icon: HomeIcon,
    title: 'Real Estate & Property',
    desc: 'Testamentary & succession law, due diligence, land acquisition, and municipal compliance.',
  },
]

const stats = [
  { icon: CalendarDays, value: '10+', label: 'Years of Practice' },
  { icon: Scale, value: `${practiceAreas.length}`, label: 'Practice Areas' },
  { icon: Globe, value: '4', label: 'Jurisdictions Covered' },
  { icon: Gavel, value: '35+', label: 'Landmark Matters' },
]

const whyChooseUs = [
  {
    icon: Award,
    title: 'Ex-Khaitan & Co. LLP',
    desc: '6 years as Senior Associate at one of India’s top law firms, handling high-profile clients and complex disputes.',
  },
  {
    icon: Users,
    title: 'Trained Under Top Seniors',
    desc: 'Honed under Sr. Advocates Indira Jaising and Prashanto Chandra Sen, appearing in landmark constitutional cases.',
  },
  {
    icon: Gavel,
    title: 'Supreme Court Experience',
    desc: 'Extensive appearances before the Supreme Court of India, Delhi High Court, Tribunals, and Statutory Authorities.',
  },
  {
    icon: ShieldCheck,
    title: 'Strategic & Confidential',
    desc: 'Solution-oriented representation with complete confidentiality, tailored to each client’s objectives.',
  },
]

const notableMatters = [
  {
    title: 'JSW Steel Ltd. v. South-Western Railways',
    detail: '5-Judge Constitution Bench, Supreme Court',
  },
  {
    title: 'State Bank of India',
    detail: 'Insolvency actions against prominent companies & guarantors',
  },
  {
    title: 'Abhiram Singh v. C.D. Commachen',
    detail: '7-Judge Constitution Bench on election law',
  },
  {
    title: 'Vedanta Limited v. Nominated Authority',
    detail: 'Mining dispute before Delhi High Court',
  },
  {
    title: 'Mumbai Metropolitan Regional Development Authority',
    detail: 'Supreme Court & Bombay High Court',
  },
]

const officeGlimpse = [
  { src: '/8.jpeg', caption: "Advocate's Chamber" },
  { src: '/9.jpeg', caption: 'Office Corridor' },
  { src: '/14.jpeg', caption: 'Legal Library' },
]

export default function Home() {
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
            <p className="section-label">Advocates &amp; Consultants, New Delhi</p>
            <h1 className="hero-title">Legal Excellence You Can Trust</h1>
            <p className="hero-text">
              Catalyst Chambers is led by Adv. Rohit Ghosh, a New Delhi-based
              advocate with over 10 years of experience representing companies,
              institutions, and individuals before the Supreme Court, High
              Courts, Tribunals, and Statutory Authorities across India.
            </p>
            <div className="hero-actions">
              <a
                href="https://wa.me/918826654793"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle size={17} strokeWidth={2} /> Enquire Now
              </a>
              <Link to="/about" className="btn-outline">Learn More</Link>
            </div>
            <div className="hero-badges">
              <span><Award size={16} strokeWidth={1.75} /> Ex-Khaitan &amp; Co. LLP</span>
              <span><Gavel size={16} strokeWidth={1.75} /> Supreme Court Practice</span>
            </div>
          </motion.div>

          <motion.div
            className="hero-portrait"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="hero-portrait-frame">
              <img src="/rohit.jpeg" alt="Adv. Rohit Ghosh" />
            </div>
            <motion.div
              className="hero-portrait-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Star className="hero-portrait-card-icon" strokeWidth={1.75} />
              <div>
                <p className="hero-portrait-card-value">5.0</p>
                <p className="hero-portrait-card-label">Google Rating</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section stats-section">
        <div className="container">
          <RevealGroup className="stats-grid">
            {stats.map((stat) => (
              <RevealItem className="stat-card" key={stat.label}>
                <span className="stat-icon-badge">
                  <stat.icon strokeWidth={1.75} />
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
                  <item.icon className="why-icon" strokeWidth={1.75} />
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
                  <area.icon className="practice-icon" strokeWidth={1.75} />
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
            {officeGlimpse.map((photo) => (
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
            <Accordion items={faqs.slice(0, 4)} />
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
          <a
            href="https://wa.me/918826654793"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <MessageCircle size={17} strokeWidth={2} /> Contact Us
          </a>
        </Reveal>
      </section>
    </>
  )
}
