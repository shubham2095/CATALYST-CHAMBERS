import Reveal from '../components/Reveal'
import './LegalPage.css'

export default function TermsOfService() {
  return (
    <>
      <section className="legal-hero">
        <div className="container">
          <Reveal>
            <p className="section-label">Legal</p>
            <h1 className="section-title">Terms of Service</h1>
            <p className="legal-updated">Last updated: August 2026</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="legal-content">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using this website (catalystchambers.com), you
              agree to be bound by these Terms of Service. If you do not
              agree with any part of these terms, please do not use this
              website.
            </p>

            <h2>2. No Advertising or Solicitation</h2>
            <p>
              As per the Rules of the Bar Council of India, advocates are
              not permitted to advertise or solicit work in any manner. The
              content on this website is provided for general informational
              purposes only and does not constitute advertising,
              solicitation, or inducement of any kind. By accessing this
              website, you confirm that you are seeking information about
              Catalyst Chambers of your own accord, and that there has been
              no solicitation, invitation, or inducement of any sort
              whatsoever from us or any of our members to solicit any work
              through this website.
            </p>

            <h2>3. No Attorney-Client Relationship</h2>
            <p>
              Viewing this website, submitting an enquiry through our
              Contact form, or communicating with us via phone, email, or
              WhatsApp does not create an attorney-client relationship. Such
              a relationship is only established once we have formally
              agreed to represent you, typically following a conflict check
              and mutual engagement.
            </p>

            <h2>4. No Legal Advice</h2>
            <p>
              The information on this website is provided for general
              informational purposes only and should not be construed as
              legal advice on any specific facts or circumstances. You
              should not act, or refrain from acting, based on any
              information on this website without seeking professional
              legal counsel.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos,
              and images, is the property of Catalyst Chambers unless
              otherwise stated, and is protected by applicable intellectual
              property laws. You may not reproduce, distribute, or use this
              content for commercial purposes without our prior written
              consent.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              While we strive to keep the information on this website
              accurate and up to date, we make no warranties or
              representations as to its completeness or accuracy. Catalyst
              Chambers shall not be liable for any loss or damage arising
              from your use of, or reliance on, this website.
            </p>

            <h2>7. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in
              accordance with the laws of India, and any disputes arising
              from your use of this website shall be subject to the
              exclusive jurisdiction of the courts in New Delhi.
            </p>

            <h2>8. Changes to These Terms</h2>
            <p>
              We may revise these Terms of Service from time to time. Any
              changes will be posted on this page with a revised
              &ldquo;Last updated&rdquo; date.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              For any questions regarding these Terms of Service, please
              contact us at{' '}
              <a href="mailto:rohitghosh.alt@gmail.com">
                rohitghosh.alt@gmail.com
              </a>{' '}
              or call +91 88266 54793.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
