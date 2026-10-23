import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({ value, duration = 1.5 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return

    const match = String(value).match(/^([\d.]+)(.*)$/)
    if (!match) {
      setDisplay(value)
      return
    }

    const target = parseFloat(match[1])
    const trailing = match[2]
    const isDecimal = match[1].includes('.')
    const start = performance.now()
    let frame

    function tick(now) {
      const progress = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = target * eased
      setDisplay((isDecimal ? current.toFixed(1) : Math.round(current)) + trailing)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isInView, value, duration])

  return <span ref={ref}>{display}</span>
}
