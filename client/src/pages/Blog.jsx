import { Link } from 'react-router-dom'
import { Calendar, MapPin, ArrowUpRight, Tag } from 'lucide-react'
import Reveal from '../components/Reveal'
import { blogPosts } from '../data/blogPosts'
import './Blog.css'

export default function Blog() {
  return (
    <>
      <section className="blog-hero">
        <div className="hero-decor hero-decor-1" />
        <div className="hero-decor hero-decor-2" />
        <div className="container">
          <Reveal>
            <p className="section-label">The Debrief</p>
            <h1 className="section-title">Blog &amp; Insights</h1>
            <p className="section-intro">
              Reflections on litigation practice, advocacy, and the legal
              profession in India, from Adv. Rohit Ghosh.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section blog-section">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.1}>
                <Link to={`/blog/${post.slug}`} className="blog-card">
                  <h2 className="blog-card-title">{post.title}</h2>
                  <div className="blog-post-meta">
                    <span><Calendar size={15} strokeWidth={1.75} /> {post.date}</span>
                    <span><MapPin size={15} strokeWidth={1.75} /> {post.location}</span>
                  </div>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-tags">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span className="blog-tag" key={tag}>
                        <Tag size={12} strokeWidth={1.75} /> {tag}
                      </span>
                    ))}
                  </div>
                  <span className="blog-card-link">
                    Read more <ArrowUpRight size={16} strokeWidth={1.75} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
