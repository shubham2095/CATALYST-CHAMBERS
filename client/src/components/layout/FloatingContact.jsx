import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, X, Headset } from 'lucide-react'
import './FloatingContact.css'

const PHONE_NUMBER = '+918826654793'
const WHATSAPP_NUMBER = '918826654793'

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  return (
    <div className="floating-contact">
      <AnimatePresence>
        {open && (
          <motion.div
            className="floating-options"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.a
              href={`tel:${PHONE_NUMBER}`}
              className="floating-pill call"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone strokeWidth={1.75} />
              Call Now
            </motion.a>
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="floating-pill whatsapp"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle strokeWidth={1.75} />
              WhatsApp
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="floating-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Close contact options' : 'Open contact options'}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Headset strokeWidth={1.75} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
