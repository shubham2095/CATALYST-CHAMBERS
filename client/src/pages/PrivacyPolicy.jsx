import Reveal from '../components/Reveal'
import './LegalPage.css'

export default function PrivacyPolicy() {
  return (
    <>
      <section className="legal-hero">
        <div className="container">
          <Reveal>
            <p className="section-label">Legal</p>
            <h1 className="section-title">Privacy Policy</h1>
            <p className="legal-updated">Last updated: August 2026</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="legal-content">
            <h2>1. Introduction</h2>
            <p>
              Catalyst Chambers (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
              &ldquo;our&rdquo;) respects your privacy. This Privacy Policy
              explains what information we collect through this website
              (catalystchambers.com), how we use it, and the choices you
              have.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              When you submit our Contact form, we collect the information
              you provide, which may include:
            </p>
            <ul>
              <li>Your name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>The content of your message or enquiry</li>
            </ul>
            <p>
              We do not use cookies to track visitors, and we do not collect
              payment or financial information through this website.
            </p>

            <h2>3. How We Use Your Information</h2>
            <p>
              Information submitted through our Contact form is used solely
              to respond to your enquiry and, where relevant, to provide
              legal consultation or services you have requested. We do not
              sell, rent, or share your personal information with third
              parties for marketing purposes.
            </p>

            <h2>4. Confidentiality</h2>
            <p>
              As a law practice, we treat all client communications with
              strict confidentiality in accordance with our professional and
              ethical obligations under the Advocates Act and the Bar
              Council of India rules.
            </p>

            <h2>5. Third-Party Services</h2>
            <p>
              This website uses Google Maps to display our office location
              and Google Fonts to load typography. These third-party
              services may process technical data (such as your IP address)
              in accordance with their own privacy policies.
            </p>

            <h2>6. Data Security</h2>
            <p>
              We take reasonable technical measures to protect the
              information submitted through this website. However, no method
              of transmission over the internet is completely secure, and we
              cannot guarantee absolute security.
            </p>

            <h2>7. Your Rights</h2>
            <p>
              You may request that we delete any personal information you
              have submitted to us by contacting us at{' '}
              <a href="mailto:info@catalystchambers.com">
                info@catalystchambers.com
              </a>
              .
            </p>

            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any
              changes will be posted on this page with a revised
              &ldquo;Last updated&rdquo; date.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{' '}
              <a href="mailto:info@catalystchambers.com">
                info@catalystchambers.com
              </a>{' '}
              or call +91 88266 54793.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
