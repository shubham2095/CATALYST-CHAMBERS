import { Link } from 'react-router-dom'
import {
  Compass,
  GraduationCap,
  Landmark,
  PenLine,
  Gavel,
  Scale,
  Building2,
  ExternalLink,
  BadgeCheck,
  MessageCircle,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import { RevealGroup, RevealItem } from '../components/RevealGroup'
import './About.css'

const timeline = [
  {
    year: '2025 – Present',
    role: 'Advocate, Chambers of Mr. Rohit Ghosh',
    desc: 'Running an independent litigation and corporate advisory practice for companies, entities, organizations, and individuals in the New Delhi area.',
    icon: Gavel,
  },
  {
    year: 'May 2025 – Nov 2025',
    role: 'Associate, Chambers of Mr. Prashanto Chandra Sen, Senior Advocate',
    desc: 'Worked across civil & commercial litigation, arbitration, infrastructure disputes, insolvency, mining, electoral, and constitutional matters.',
    icon: Scale,
  },
  {
    year: '2019 – 2025',
    role: 'Senior Associate, Khaitan & Co. LLP, New Delhi',
    desc: 'Six years handling high-profile clients — case management, legal strategy, and corporate/regulatory advisories across civil, commercial, insolvency, arbitration, and banking matters.',
    icon: Building2,
  },
  {
    year: '2018 – 2019',
    role: 'Associate, Chambers of Ms. Bina Gupta, Advocate-on-Record',
    desc: 'Appeared before the Supreme Court, High Court, District Courts, and Tribunals in constitutional, commercial, IBC, and consumer matters.',
    icon: Scale,
  },
  {
    year: '2016 – 2018',
    role: 'Associate, Chambers of Ms. Indira Jaising, Senior Advocate',
    desc: 'Began his career appearing extensively before the Supreme Court of India and Delhi High Court on cases of significant constitutional importance.',
    icon: Scale,
  },
]

const education = [
  {
    degree: 'LL.B.',
    institution: 'Faculty of Law (Law Centre-1), University of Delhi',
  },
  {
    degree: 'B.Sc. (Hons.) Physics',
    institution: 'Hansraj College, University of Delhi',
  },
]

const affiliations = [
  { org: 'Saket Bar Association (SBA)', status: 'Member, 2026-Present' },
  { org: 'Delhi High Court Bar Association (DHCBA)', status: 'Member, 2022-Present' },
  { org: 'Bar Council of India (BCI)', status: 'Advocate, 2017-Present' },
  { org: 'Bar Council of Delhi (BCD)', status: 'Advocate, Reg. No. D-2850/2016' },
  { org: 'Delhi State Legal Services Authority (DSLSA)', status: 'Para Legal Volunteer, 2015-2016' },
]

const publications = [
  {
    title: 'Limited Judicial Review by NCLT and NCLAT During Liquidation Proceedings',
    source: 'Lexology',
    date: 'Sept 2022',
  },
  {
    title: 'Moratorium Prohibits Recovery Proceedings of Customs Duty Against Corporate Debtor',
    source: 'Lexology',
    date: 'Sept 2022',
  },
  {
    title: 'Allottees in Real Estate Projects Cannot Be Coerced into Settlements by NCLT',
    source: 'Lexology',
    date: 'Jan 2022',
  },
  {
    title: 'Supreme Court Reinforces Timelines Under RDB Act',
    source: 'Lexology',
    date: 'Feb 2020',
  },
  {
    title: 'Towards the Tipping Point: NRC Exercise in Assam',
    source: 'The Leaflet',
    date: 'Oct 2018',
  },
]

export default function About() {
  return (
    <>
      <section className="about-hero">
        <div className="hero-decor hero-decor-1" />
        <div className="hero-decor hero-decor-2" />
        <div className="container">
          <Reveal>
            <p className="section-label">About Us</p>
            <h1 className="section-title">Catalyst Chambers</h1>
            <p className="section-intro">
              Catalyst Chambers is a New Delhi-based law practice led by Adv.
              Rohit Ghosh, offering comprehensive legal solutions across
              litigation, arbitration, and corporate advisory. We are
              dedicated to justice and committed to providing strategic,
              solution-oriented representation to every client.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section profile-section">
        <div className="container profile-grid">
          <Reveal type="right" className="profile-photo-wrap" as="div">
            <div className="profile-photo">
              <img src="/rohit.jpeg" alt="Adv. Rohit Ghosh" />
            </div>
            <div className="profile-photo-badge">
              <BadgeCheck strokeWidth={1.75} />
              <div>
                <p className="profile-photo-badge-value">10+ Years</p>
                <p className="profile-photo-badge-label">Legal Practice</p>
              </div>
            </div>
          </Reveal>
          <Reveal type="left" delay={0.1} className="profile-text-block">
            <p className="section-label">Founder &amp; Lead Advocate</p>
            <h2 className="section-title">Rohit Ghosh</h2>
            <p className="profile-text">
              Rohit Ghosh is a New Delhi-based Advocate with over 10 years of
              experience. He has learned under the tutelage of top senior
              advocates in India, including Ms. Indira Jaising and Mr.
              Prashanto Chandra Sen, and gained extensive experience at
              Khaitan &amp; Co. LLP, a leading law firm in India, handling
              end-to-end case management for top companies and high net
              worth individuals.
            </p>
            <p className="profile-text">
              He has appeared in many landmark cases of constitutional
              importance before the Supreme Court of India and the Delhi
              High Court, and focuses on advocating for the rights of
              citizens, procedural fairness, corporate diligence, and good
              governance.
            </p>
            <p className="profile-meta">
              <strong>Enrolment No.:</strong> D-2850/2016 &nbsp;|&nbsp;
              <strong> Jurisdictions:</strong> Delhi NCR, Gurugram, Noida, Pan-India
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section timeline-section">
        <div className="container">
          <Reveal>
            <p className="section-label">Career</p>
            <h2 className="section-title icon-title"><Compass strokeWidth={1.75} /> Professional Journey</h2>
          </Reveal>
          <RevealGroup className="timeline">
            {timeline.map((item) => (
              <RevealItem className="timeline-item" key={item.role}>
                <span className="timeline-dot">
                  <item.icon size={16} strokeWidth={1.75} />
                </span>
                <p className="timeline-year">{item.year}</p>
                <h3>{item.role}</h3>
                <p>{item.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section">
        <div className="container info-grid">
          <Reveal type="right">
            <p className="section-label">Education</p>
            <h2 className="section-title icon-title"><GraduationCap strokeWidth={1.75} /> Academic Background</h2>
            <RevealGroup as="ul" className="edu-list">
              {education.map((item) => (
                <RevealItem as="li" className="edu-item" key={item.degree}>
                  <span className="edu-icon"><GraduationCap size={18} strokeWidth={1.75} /></span>
                  <span>
                    <span className="edu-degree">{item.degree}</span>
                    <span className="edu-institution">{item.institution}</span>
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>
          <Reveal type="left" delay={0.1}>
            <p className="section-label">Memberships</p>
            <h2 className="section-title icon-title"><Landmark strokeWidth={1.75} /> Bar Affiliations</h2>
            <RevealGroup as="ul" className="edu-list">
              {affiliations.map((item) => (
                <RevealItem as="li" className="edu-item" key={item.org}>
                  <span className="edu-icon"><Landmark size={18} strokeWidth={1.75} /></span>
                  <span>
                    <span className="edu-degree">{item.org}</span>
                    <span className="edu-institution">{item.status}</span>
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>
        </div>
      </section>

      <section className="section publications-section">
        <div className="container">
          <Reveal>
            <p className="section-label">Writing</p>
            <h2 className="section-title icon-title"><PenLine strokeWidth={1.75} /> Publications</h2>
          </Reveal>
          <RevealGroup className="pub-grid">
            {publications.map((item) => (
              <RevealItem className="pub-card" key={item.title}>
                <div className="pub-card-top">
                  <span className="pub-source">{item.source}</span>
                  <ExternalLink size={16} strokeWidth={1.75} className="pub-link-icon" />
                </div>
                <p className="pub-title">{item.title}</p>
                <p className="pub-date">{item.date}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section cta-section">
        <Reveal type="scale" className="container cta-inner">
          <h2>Want to know more about our practice?</h2>
          <p>Get in touch to discuss how we can assist you.</p>
          <div className="cta-actions">
            <a
              href="https://wa.me/918826654793"
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
