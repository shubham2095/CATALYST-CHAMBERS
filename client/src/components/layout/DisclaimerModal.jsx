import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scale, X } from 'lucide-react'
import { useSite } from '../../context/ContentContext'
import './DisclaimerModal.css'

export default function DisclaimerModal() {
  const { disclaimerText } = useSite()
  const [visible, setVisible] = useState(true)

  const handleAgree = () => {
    setVisible(false)
  }

  if (!visible) return null

  return (
    <motion.div
      className="disclaimer-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="disclaimer-modal"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
      >
        <button
          className="disclaimer-close"
          onClick={handleAgree}
          aria-label="Close disclaimer"
        >
          <X strokeWidth={2} />
        </button>
        <span className="disclaimer-icon">
          <Scale strokeWidth={1.5} />
        </span>
        <h2 id="disclaimer-title" className="disclaimer-title">Disclaimer</h2>
        <p className="disclaimer-text">{disclaimerText}</p>
        <button className="btn-primary disclaimer-btn" onClick={handleAgree}>
          I Agree
        </button>
      </motion.div>
    </motion.div>
  )
}
