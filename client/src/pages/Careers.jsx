import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Users,
  Gavel,
  UploadCloud,
  FileText,
  Send,
  CheckCircle2,
  AlertTriangle,
  X,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import { RevealGroup, RevealItem } from '../components/RevealGroup'
import './Careers.css'

const perks = [
  {
    icon: GraduationCap,
    title: 'Professional Growth',
    desc: 'Structured mentorship and exposure that helps you build a real career in litigation and advisory.',
  },
  {
    icon: Gavel,
    title: 'High-Stakes Matters',
    desc: 'Work on complex, high-value disputes across constitutional, corporate, and infrastructure law.',
  },
  {
    icon: Users,
    title: 'Direct Mentorship',
    desc: 'Close, hands-on guidance from an advocate trained under leading Senior Advocates and Khaitan & Co. LLP.',
  },
]

const positions = [
  'Associate Advocate',
  'Legal Associate',
  'Legal Intern',
  'Paralegal / Support Staff',
  'Other',
]

const initialForm = { name: '', email: '', phone: '', position: '', message: '' }

export default function Careers() {
  const [form, setForm] = useState(initialForm)
  const [resume, setResume] = useState(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFile = (file) => {
    if (!file) return
    setResume(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files?.[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const data = new FormData()
      Object.entries(form).forEach(([key, value]) => data.append(key, value))
      if (resume) data.append('resume', resume)

      const res = await fetch('/api/careers', { method: 'POST', body: data })
      const json = await res.json().catch(() => ({}))

      if (!res.ok) throw new Error(json.error || 'Request failed')

      setStatus('success')
      setForm(initialForm)
      setResume(null)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong.')
    }
  }

  return (
    <>
      <section className="careers-hero">
        <div className="careers-hero-overlay" />
        <div className="container careers-hero-content">
          <Reveal>
            <p className="section-label careers-hero-label">Join The Excellence</p>
            <h1 className="careers-hero-title">
              Build Your Legal Career
              <br />
              <span>With Catalyst Chambers</span>
            </h1>
            <p className="careers-hero-quote">
              &ldquo;We do not view our people as a cost to be managed — we
              view them as the chamber&rsquo;s greatest asset. Our
              responsibility is to create an environment where talented
              individuals can build a genuine career in law.&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section why-join-section">
        <div className="container">
          <Reveal>
            <p className="section-label">Why Join Us</p>
            <h2 className="section-title">Why Join Catalyst Chambers?</h2>
            <p className="section-intro">
              We are committed to fostering a culture of excellence,
              integrity, and continuous learning — where your growth is
              taken as seriously as our clients&rsquo; matters.
            </p>
          </Reveal>

          <RevealGroup className="perks-grid">
            {perks.map((perk) => (
              <RevealItem className="perk-card" key={perk.title}>
                <span className="perk-icon-badge">
                  <perk.icon strokeWidth={1.75} />
                </span>
                <h3>{perk.title}</h3>
                <p>{perk.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section application-section">
        <div className="container">
          <Reveal className="application-card">
            <div className="application-card-header">
              <h2 className="section-title">Submit Your Application</h2>
              <p className="section-intro">
                No specific vacancies are open right now, but we review
                applications on a rolling basis and keep every submission on
                file for future openings.
              </p>
            </div>

            <form className="application-form" onSubmit={handleSubmit}>
              <div className="application-form-grid">
                <label>
                  Full Name
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Email Address
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Phone Number
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Position Applied For
                  <select name="position" value={form.position} onChange={handleChange}>
                    <option value="">Select a position</option>
                    {positions.map((p) => (
                      <option value={p} key={p}>{p}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="application-field">
                <span className="application-field-label">Resume / CV</span>
                <div
                  className={`dropzone ${resume ? 'has-file' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    hidden
                    onChange={(e) => handleFile(e.target.files?.[0])}
                  />
                  {resume ? (
                    <>
                      <FileText strokeWidth={1.75} />
                      <p><strong>{resume.name}</strong></p>
                      <button
                        type="button"
                        className="dropzone-remove"
                        onClick={(e) => { e.stopPropagation(); setResume(null) }}
                      >
                        <X size={14} strokeWidth={2} /> Remove
                      </button>
                    </>
                  ) : (
                    <>
                      <UploadCloud strokeWidth={1.75} />
                      <p><strong>Click to upload</strong> or drag and drop</p>
                      <span>PDF or Word, up to 10MB</span>
                    </>
                  )}
                </div>
              </div>

              <label>
                Cover Letter / Message
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell us why you'd be a great fit..."
                  value={form.message}
                  onChange={handleChange}
                />
              </label>

              <motion.button
                type="submit"
                className="btn-primary application-submit"
                disabled={status === 'sending'}
                whileTap={{ scale: 0.97 }}
              >
                {status === 'sending' ? 'Submitting...' : 'Submit Application'}
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
                    <CheckCircle2 strokeWidth={1.75} /> Application received — thank you for applying.
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
                    <AlertTriangle strokeWidth={1.75} /> {errorMsg || 'Something went wrong. Please try again.'}
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
