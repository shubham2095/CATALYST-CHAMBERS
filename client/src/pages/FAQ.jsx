import { MessageCircle } from 'lucide-react'
import Reveal from '../components/Reveal'
import Accordion from '../components/Accordion'
import { faqs } from '../data/faqs'
import './FAQ.css'

export default function FAQ() {
  return (
    <>
      <section className="faq-hero">
        <div className="hero-decor hero-decor-1" />
        <div className="hero-decor hero-decor-2" />
        <div className="container">
          <Reveal>
            <p className="section-label">Have Questions?</p>
            <h1 className="section-title">Frequently Asked Questions</h1>
            <p className="section-intro">
              Answers to some of the most common questions we receive from
              clients. Can&rsquo;t find what you&rsquo;re looking for?
              Reach out directly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container faq-layout">
          <Reveal className="faq-list">
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <section className="section cta-section">
        <Reveal type="scale" className="container cta-inner">
          <h2>Still have a question?</h2>
          <p>Get in touch and we&rsquo;ll be happy to help.</p>
          <a
            href="https://wa.me/918826654793"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <MessageCircle size={17} strokeWidth={2} /> Ask on WhatsApp
          </a>
        </Reveal>
      </section>
    </>
  )
}
