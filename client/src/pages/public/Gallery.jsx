import { Link } from 'react-router-dom'
import { Maximize2, Camera, MessageCircle } from 'lucide-react'
import Reveal from '../../components/common/Reveal'
import { RevealGroup, RevealItem } from '../../components/common/RevealGroup'
import { useContent, useSite } from '../../context/ContentContext'
import './Gallery.css'

export default function Gallery() {
  const { gallery } = useContent()
  const { waHref } = useSite()
  const { photos } = gallery

  return (
    <>
      <section className="gallery-hero">
        <div className="hero-decor hero-decor-1" />
        <div className="hero-decor hero-decor-2" />
        <div className="container">
          <Reveal>
            <p className="section-label">A Look Inside</p>
            <h1 className="section-title">Gallery</h1>
            <p className="section-intro">{gallery.intro}</p>
            <p className="gallery-count">
              <Camera size={16} strokeWidth={1.75} /> {photos.length} Photos
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <RevealGroup className="gallery-grid">
            {photos.map((photo) => (
              <RevealItem
                as="figure"
                className={`gallery-item ${photo.featured ? 'is-featured' : ''}`}
                key={photo.src}
              >
                <div className="gallery-item-frame">
                  <img src={photo.src} alt={photo.caption} loading="lazy" />
                  <span className="gallery-item-overlay">
                    <span className="gallery-item-expand">
                      <Maximize2 size={20} strokeWidth={1.75} />
                    </span>
                  </span>
                </div>
                <figcaption>{photo.caption}</figcaption>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section cta-section">
        <Reveal type="scale" className="container cta-inner">
          <h2>Want to visit our office?</h2>
          <p>Reach out to schedule a consultation with our team.</p>
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
