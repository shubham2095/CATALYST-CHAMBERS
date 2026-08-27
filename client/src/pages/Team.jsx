import { Scale, BadgeCheck, Phone, Mail, Sparkles, MessageCircle } from 'lucide-react'
import Reveal from '../components/Reveal'
import { RevealGroup, RevealItem } from '../components/RevealGroup'
import './Team.css'

const teamMembers = [
  {
    name: 'Rohit Ghosh',
    role: 'Founder & Lead Advocate',
    photo: '/rohit.jpeg',
    bio: 'B.Sc. (H.), LL.B., Faculty of Law, University of Delhi. Over 10 years of experience across civil & commercial litigation, arbitration, insolvency, banking & finance, constitutional law, and corporate advisory. Previously Senior Associate at Khaitan & Co. LLP, and trained under Sr. Advocates Indira Jaising and Prashanto Chandra Sen.',
    specializations: [
      'Civil & Commercial Litigation',
      'Arbitration',
      'Insolvency & Bankruptcy',
      'Constitutional Law',
      'Banking & Finance',
    ],
  },
]

export default function Team() {
  return (
    <>
      <section className="team-hero">
        <div className="hero-decor hero-decor-1" />
        <div className="hero-decor hero-decor-2" />
        <div className="container">
          <Reveal>
            <p className="section-label">Our People</p>
            <h1 className="section-title">The Team</h1>
            <p className="section-intro">
              Catalyst Chambers is built around a commitment to strategic,
              solution-oriented representation — led by advocates with deep
              courtroom and advisory experience.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <RevealGroup className="team-grid">
            {teamMembers.map((member) => (
              <RevealItem className="team-card" key={member.name}>
                <div className="team-card-photo">
                  <img src={member.photo} alt={member.name} />
                  <span className="team-card-badge">
                    <BadgeCheck size={16} strokeWidth={1.75} /> 10+ Years
                  </span>
                </div>
                <div className="team-card-body">
                  <h3>{member.name}</h3>
                  <p className="team-role icon-title"><Scale size={16} strokeWidth={1.75} /> {member.role}</p>
                  <p className="team-bio">{member.bio}</p>

                  <div className="team-tags">
                    {member.specializations.map((spec) => (
                      <span className="team-tag" key={spec}>
                        <Sparkles size={13} strokeWidth={1.75} /> {spec}
                      </span>
                    ))}
                  </div>

                  <div className="team-card-actions">
                    <a href="tel:+918826654793" className="btn-outline">
                      <Phone size={16} strokeWidth={1.75} /> Call
                    </a>
                    <a href="mailto:info@catalystchambers.com" className="btn-outline">
                      <Mail size={16} strokeWidth={1.75} /> Email
                    </a>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section cta-section">
        <Reveal type="scale" className="container cta-inner">
          <h2>Want to work with our team?</h2>
          <p>Reach out to discuss your matter with us.</p>
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
