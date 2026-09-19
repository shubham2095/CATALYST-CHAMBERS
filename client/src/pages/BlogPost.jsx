import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  Calendar, MapPin, Tag, ExternalLink, ArrowLeft, ArrowRight,
  Clock, Link2, Check,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import LinkedinIcon from '../components/LinkedinIcon'
import WhatsappIcon from '../components/WhatsappIcon'
import { getBlogPost, getAdjacentPost, blogAuthor } from '../data/blogPosts'
import './Blog.css'

function ShareBar({ title }) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="blog-share">
      <span className="blog-share-label">Share this article</span>
      <div className="blog-share-icons">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`Check out this article from Catalyst Chambers: "${title}"`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-share-btn"
          aria-label="Share on WhatsApp"
        >
          <WhatsappIcon size={17} />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-share-btn"
          aria-label="Share on LinkedIn"
        >
          <LinkedinIcon size={17} />
        </a>
        <button type="button" className="blog-share-btn" onClick={handleCopy} aria-label="Copy link">
          {copied ? <Check size={17} strokeWidth={1.75} /> : <Link2 size={17} strokeWidth={1.75} />}
        </button>
      </div>
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getBlogPost(slug)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const { title, date, location, readingTime, tags, note, externalLink, externalLinkLabel, Content } = post
  const nextPost = getAdjacentPost(slug)

  return (
    <>
      <motion.div className="blog-progress" style={{ scaleX: progress }} />

      <section className="blog-hero blog-post-hero">
        <div className="hero-decor hero-decor-1" />
        <div className="hero-decor hero-decor-2" />
        <div className="container">
          <Reveal>
            <Link to="/blog" className="blog-back-link">
              <ArrowLeft size={15} strokeWidth={1.75} /> Back to Blog
            </Link>
            <p className="section-label">The Debrief</p>
            <h1 className="section-title blog-post-hero-title">{title}</h1>

            <div className="blog-hero-author">
              <img src={blogAuthor.photo} alt={blogAuthor.name} className="blog-hero-author-photo" />
              <div>
                <span className="blog-hero-author-name">{blogAuthor.name}</span>
                <span className="blog-hero-author-role">{blogAuthor.role}</span>
              </div>
              <div className="blog-hero-meta">
                <span><Calendar size={15} strokeWidth={1.75} /> {date}</span>
                <span><MapPin size={15} strokeWidth={1.75} /> {location}</span>
                {readingTime && <span><Clock size={15} strokeWidth={1.75} /> {readingTime} min read</span>}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container blog-post-layout">
          <Reveal as="article" className="blog-post" amount={0}>
            {note && <p className="blog-post-note">{note}</p>}

            <Content />

            <div className="blog-post-tags">
              {tags.map((tag) => (
                <span className="blog-tag" key={tag}>
                  <Tag size={12} strokeWidth={1.75} /> {tag}
                </span>
              ))}
            </div>

            {externalLink && (
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-source-link"
              >
                {externalLinkLabel} <ExternalLink size={15} strokeWidth={1.75} />
              </a>
            )}
          </Reveal>

          <aside className="blog-sidebar">
            <Reveal delay={0.1}>
              <div className="blog-author-card">
                <img src={blogAuthor.photo} alt={blogAuthor.name} className="blog-author-card-photo" />
                <h3>{blogAuthor.name}</h3>
                <p className="blog-author-card-role">{blogAuthor.role}</p>
                <a
                  href={blogAuthor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline blog-author-card-link"
                >
                  <LinkedinIcon size={15} /> Connect on LinkedIn
                </a>
              </div>

              <ShareBar title={title} />
            </Reveal>
          </aside>
        </div>
      </section>

      {nextPost && (
        <section className="section blog-next-section">
          <div className="container">
            <Reveal>
              <Link to={`/blog/${nextPost.slug}`} className="blog-next-card">
                <span className="blog-next-label">Read Next</span>
                <span className="blog-next-title">{nextPost.title}</span>
                <span className="blog-card-link">
                  Continue reading <ArrowRight size={16} strokeWidth={1.75} />
                </span>
              </Link>
            </Reveal>
          </div>
        </section>
      )}
    </>
  )
}
