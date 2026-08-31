import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scale, X } from 'lucide-react'
import './DisclaimerModal.css'

export default function DisclaimerModal() {
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
        <p className="disclaimer-text">
          As per the Rules of the Bar Council of India, advocates are not
          permitted to advertise or solicit work in any manner. Catalyst
          Chambers confirms that the content of this website is for
          general informational purposes only, and does not constitute
          advertising, solicitation, or inducement of any kind. By
          accessing this website, you confirm that Catalyst Chambers and
          its members have not advertised, induced, or solicited work
          from you through this website, and that you are seeking
          information about this law practice of your own accord.
        </p>
        <button className="btn-primary disclaimer-btn" onClick={handleAgree}>
          I Agree
        </button>
      </motion.div>
    </motion.div>
  )
}
