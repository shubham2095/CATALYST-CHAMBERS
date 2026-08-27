import { Maximize2, Camera } from 'lucide-react'
import Reveal from '../components/Reveal'
import { RevealGroup, RevealItem } from '../components/RevealGroup'
import './Gallery.css'

const photos = [
  { src: '/8.jpeg', caption: "Advocate's Chamber", featured: true },
  { src: '/9.jpeg', caption: 'Office Corridor' },
  { src: '/10.jpeg', caption: 'Consultation Seating' },
  { src: '/11.jpeg', caption: 'Chamber Entrance' },
  { src: '/12.jpeg', caption: 'Meeting Area' },
  { src: '/14.jpeg', caption: 'Legal Library & Workdesk' },
  { src: '/4.jpeg', caption: 'Cabin Interior' },
  { src: '/7.jpeg', caption: 'Cabin View' },
]

export default function Gallery() {
  return (
    <>
      <section className="gallery-hero">
        <div className="hero-decor hero-decor-1" />
        <div className="hero-decor hero-decor-2" />
        <div className="container">
          <Reveal>
            <p className="section-label">A Look Inside</p>
            <h1 className="section-title">Gallery</h1>
            <p className="section-intro">
              A glimpse of our office at Greater Kailash-1, New Delhi.
            </p>
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
    </>
  )
}
