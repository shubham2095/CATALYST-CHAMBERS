import { Link } from 'react-router-dom'
import {
  Compass,
  GraduationCap,
  Landmark,
  PenLine,
  ExternalLink,
  BadgeCheck,
  MessageCircle,
} from 'lucide-react'
import Reveal from '../../components/common/Reveal'
import { RevealGroup, RevealItem } from '../../components/common/RevealGroup'
import DynamicIcon from '../../components/common/DynamicIcon'
import { useContent, useSite } from '../../context/ContentContext'
import './About.css'

export default function About() {
  const { about } = useContent()
  const { waHref } = useSite()
  const { intro, profile, timeline, education, affiliations, publications } = about

  return (
    <>
      <section className="about-hero">
        <div className="hero-decor hero-decor-1" />
        <div className="hero-decor hero-decor-2" />
        <div className="container">
          <Reveal>
            <p className="section-label">About Us</p>
            <h1 className="section-title">Catalyst Chambers</h1>
            <p className="section-intro">{intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="section profile-section">
        <div className="container profile-grid">
          <Reveal type="right" className="profile-photo-wrap" as="div">
            <div className="profile-photo">
              <img src={profile.photo} alt={`Adv. ${profile.name}`} />
            </div>
            <div className="profile-photo-badge">
              <BadgeCheck strokeWidth={1.75} />
              <div>
                <p className="profile-photo-badge-value">{profile.badgeValue}</p>
                <p className="profile-photo-badge-label">{profile.badgeLabel}</p>
              </div>
            </div>
          </Reveal>
          <Reveal type="left" delay={0.1} className="profile-text-block">
            <p className="section-label">{profile.label}</p>
            <h2 className="section-title">{profile.name}</h2>
            {profile.paragraphs.map((paragraph) => (
              <p className="profile-text" key={paragraph}>{paragraph}</p>
            ))}
            <p className="profile-meta">
              <strong>Enrolment No.:</strong> {profile.enrolmentNo} &nbsp;|&nbsp;
              <strong> Jurisdictions:</strong> {profile.jurisdictions}
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
                  <DynamicIcon name={item.icon} size={16} strokeWidth={1.75} />
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
