import { Calendar, MapPin, Tag, ExternalLink } from 'lucide-react'
import Reveal from '../components/Reveal'
import './Blog.css'

const tags = [
  'Courts', 'Economy', 'Government', 'India', 'Insights',
  'Law', 'Legal', 'Litigation', 'Practice', 'Procedure', 'Process',
]

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

      <section className="section">
        <div className="container blog-layout">
          <Reveal as="article" className="blog-post">
            <h2 className="blog-post-title">Introducing... The Debrief</h2>
            <div className="blog-post-meta">
              <span><Calendar size={15} strokeWidth={1.75} /> December 8, 2025</span>
              <span><MapPin size={15} strokeWidth={1.75} /> New Delhi, Delhi, India</span>
            </div>

            <p className="blog-post-note">
              (Rohit Ghosh has provided this information in the public domain
              for educational and academic purposes. Request is made to
              credit the author for any use of this document and its
              contents.)
            </p>

            <p>Dear Readers,</p>

            <p>
              Advocates occupy and enjoy the privileged position in their
              profession as officers of the Courts. Such power is not to be
              wielded lightly. &ldquo;With great power, comes great
              responsibility&rdquo;, and as advocates we must discharge our
              responsibilities with utmost dedication and fearlessness.
            </p>

            <p>
              It is with good reason that in present times, advocates,
              lawyers, and legal professionals in India no longer enjoy the
              trust and faith of the masses. In fact, these days, lawyers
              are viewed with fear, distrust, and suspicion. The experience
              of the collective (which are the litigants), broadly boils
              down to a binary choice — either avail sub-par legal services
              at cheaper rates, or avail good quality legal services for
              exorbitant fees. Either way, advocates cannot promise or
              guarantee to the litigants that relief will be granted by the
              Courts. The results in litigation are ultimately determined
              by the quality of advocacy, legal skills, and experience that
              the advocate brings to the case.
            </p>

            <h3>About Me</h3>

            <p>
              I am an advocate practicing in New Delhi, India, with
              experience of nearly 10 years now. I have practiced primarily
              in civil and commercial law across the entire spectrum of
              litigants, be it corporate or individuals involving diverse
              subjects and industries. I enjoy reading, writing, music,
              sports, and culture. I take keen interest in current affairs,
              geopolitics, economics, social activism, environmentalism,
              human rights and animal rights. I am a staunch advocate of
              the freedom of speech, ideas, and expression, which I will be
              addressing through my blog posts.
            </p>

            <p>
              My vision as an advocate is to provide quality and affordable
              legal services to litigants and bring them relief in the most
              effective manner possible. I hope that through my practice, I
              can help litigants get access to justice and contribute
              towards making the legal system in this country accessible,
              transparent, and economical for the litigants.
            </p>

            <h3>The Purpose of This Blog</h3>

            <p>
              This blog will be based on my experiences with litigation
              practice and advocacy in various Courts and Tribunals in
              India. My endeavor is to discuss the processes and
              methodologies I have adopted in my career so far to tackle
              various kinds of cases.
            </p>

            <p>
              I will be recounting my experiences inside and outside
              Courts, without in any manner disclosing identities of
              persons and lawyers involved in such anecdotes.
            </p>

            <p>
              I hope this blog will serve as a guide to legal practitioners
              on how to approach cases, clients, and legal strategies one
              might follow. Of course, I look forward to your feedback and
              comments on this blog, and interesting discussions in the
              future.
            </p>

            <p>I look forward to sharing my thoughts with you very soon!</p>

            <p>
              Best Regards,
              <br />
              Rohit Ghosh
            </p>

            <div className="blog-post-tags">
              {tags.map((tag) => (
                <span className="blog-tag" key={tag}>
                  <Tag size={12} strokeWidth={1.75} /> {tag}
                </span>
              ))}
            </div>

            <a
              href="https://debriefchronicles.blogspot.com/2025/12/introducing-debrief.html"
              target="_blank"
              rel="noopener noreferrer"
              className="blog-source-link"
            >
              Read on The Debrief <ExternalLink size={15} strokeWidth={1.75} />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
