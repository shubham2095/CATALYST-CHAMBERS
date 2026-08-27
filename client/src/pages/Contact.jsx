import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Send,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  MessageSquare,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import { RevealGroup, RevealItem } from '../components/RevealGroup'
import './Contact.css'

const initialForm = { name: '', email: '', phone: '', message: '' }

const infoCards = [
  {
    icon: MapPin,
    title: 'Office Address',
    lines: ['S-258, Basement, Block S, Greater Kailash-1, New Delhi – 110048'],
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: [{ text: '+91 88266 54793', href: 'tel:+918826654793' }],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: [
      { text: 'info@catalystchambers.com', href: 'mailto:info@catalystchambers.com' },
      { text: 'rohitghosh.alt@gmail.com', href: 'mailto:rohitghosh.alt@gmail.com' },
    ],
  },
  {
    icon: Globe,
    title: 'Jurisdictions',
    lines: ['Delhi NCR · Gurugram · Noida · Pan-India'],
  },
  {
    icon: Clock,
    title: 'Office Hours',
    lines: ['Monday – Saturday: 10:00 AM – 8:00 PM', 'Sunday: Closed'],
  },
]

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Request failed')

      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <section className="contact-hero">
        <div className="hero-decor hero-decor-1" />
        <div className="hero-decor hero-decor-2" />
        <div className="container">
          <Reveal>
            <p className="section-label">Get In Touch</p>
            <h1 className="section-title">Contact Us</h1>
            <p className="section-intro">
              Reach out for a confidential consultation.
            </p>
            <p className="response-badge">
              <Clock size={16} strokeWidth={1.75} /> We typically respond within one business day
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <RevealGroup className="info-card-grid">
              {infoCards.map((card) => (
                <RevealItem className="info-card" key={card.title}>
                  <span className="info-card-icon">
                    <card.icon strokeWidth={1.75} />
                  </span>
                  <div>
                    <h4>{card.title}</h4>
                    {card.lines.map((line) =>
                      typeof line === 'string' ? (
                        <p key={line}>{line}</p>
                      ) : (
                        <p key={line.text}><a href={line.href}>{line.text}</a></p>
                      )
                    )}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal type="up" delay={0.15} className="map-card">
              <p className="map-card-heading">Find Us on the Map</p>
              <div className="map-embed">
                <iframe
                  title="Catalyst Chambers Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.7115410260963!2d77.23186736835737!3d28.548388860974367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce387b2872f8b%3A0x5ce5bf542610e05e!2sCATALYST%20CHAMBERS!5e0!3m2!1sen!2sin!4v1787741651750!5m2!1sen!2sin"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </Reveal>
          </div>

          <Reveal type="left" delay={0.1}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3 className="icon-title"><Send strokeWidth={1.75} /> Send an Enquiry</h3>

              <label>
                Name
                <span className="input-wrap">
                  <User size={17} strokeWidth={1.75} />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </span>
              </label>

              <label>
                Email
                <span className="input-wrap">
                  <Mail size={17} strokeWidth={1.75} />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </span>
              </label>

              <label>
                Phone
                <span className="input-wrap">
                  <Phone size={17} strokeWidth={1.75} />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </span>
              </label>

              <label>
                Message
                <span className="input-wrap input-wrap-textarea">
                  <MessageSquare size={17} strokeWidth={1.75} />
                  <textarea
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </span>
              </label>

              <motion.button
                type="submit"
                className="btn-primary"
                disabled={status === 'sending'}
                whileTap={{ scale: 0.96 }}
              >
                {status === 'sending' ? 'Sending...' : 'Send Enquiry'}
                <Send size={16} strokeWidth={2} />
              </motion.button>

              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.p
                    key="success"
                    className="form-status success icon-title"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <CheckCircle2 strokeWidth={1.75} /> Thank you — your enquiry has been received.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    key="error"
                    className="form-status error icon-title"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <AlertTriangle strokeWidth={1.75} /> Something went wrong. Please try again or call us directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
