import { Link } from 'react-router-dom'
import { Scale, ArrowLeft } from 'lucide-react'
import Reveal from '../components/Reveal'
import './NotFound.css'

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container not-found-inner">
        <Reveal type="scale">
          <span className="not-found-icon">
            <Scale strokeWidth={1.5} />
          </span>
          <p className="not-found-code">404</p>
          <h1 className="section-title">Case Not Found</h1>
          <p className="section-intro">
            The page you&rsquo;re looking for doesn&rsquo;t exist or may
            have been moved. Let&rsquo;s get you back on track.
          </p>
          <Link to="/" className="btn-primary">
            <ArrowLeft size={17} strokeWidth={2} /> Back to Home
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
