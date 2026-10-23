import { motion } from 'framer-motion'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export function RevealGroup({ children, className, amount = 0.15, as = 'div' }) {
  const Component = motion[as] || motion.div

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={container}
    >
      {children}
    </Component>
  )
}

export function RevealItem({ children, className, as = 'div' }) {
  const Component = motion[as] || motion.div
  return (
    <Component className={className} variants={item}>
      {children}
    </Component>
  )
}
