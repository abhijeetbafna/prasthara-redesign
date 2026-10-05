import { useState, type FormEvent } from 'react'
import instagramQr from '../assets/instagram-qr.png'
import { CONTACT, MESSAGES } from '../constants'
import { useToast } from '../store/ToastContext'

const FAQS = [
  {
    q: 'How does a Bespoke Upcycling Commission work?',
    a: 'You courier or bring us sentimental textiles (old sarees, kurtas, childhood blankets). Our design team inspects the fabric integrity, shares 2-3 silhouette concept sketches (e.g., quilted jacket, tote, wall hanging), and our master tailors stitch your one-of-a-kind heirloom within 10-14 days.',
  },
  {
    q: 'How are your curated thrift pieces cleaned and restored?',
    a: 'Every pre-loved garment undergoes a thorough inspection, botanical washing with natural soapberry and essential cedar extracts, seam reinforcement, and natural sun-drying before being measured and archived.',
  },
  {
    q: 'Do you ship outside Kerala and across all of India?',
    a: 'Yes, we ship to all 19,000+ PIN codes across India using carbon-neutral postal partners. Standard delivery takes 3 to 5 business days in plastic-free packaging, with complimentary shipping on orders over ₹1,499.',
  },
  {
    q: 'Can boutique tailoring studios partner with Prasthara for offcut disposal?',
    a: 'Absolutely. We partner with ethical tailoring houses and boutiques across Southern India to rescue clean cotton and linen offcuts from being incinerated. Please reach out via the partnership form.',
  },
]

export function ContactPage() {
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'bespoke-upcycle',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Form Error', MESSAGES.formError, 'alert')
      return
    }
    setSubmitted(true)
    showToast('Message Dispatched', MESSAGES.contactSent, 'success')
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: 'bespoke-upcycle',
      message: '',
    })
  }

  return (
    <div className="page-contact">
      {/* 1. HERO HEADER */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero__inner">
            <span className="eyebrow">Atelier Consultation</span>
            <h1 className="heading-display" style={{ margin: '1rem 0 1.25rem' }}>
              Connect With Our Kerala Studio
            </h1>
            <p className="subhead" style={{ margin: '0 auto', textAlign: 'center' }}>
              Whether you wish to commission a bespoke upcycle, donate fabrics, or inquire about a 1-of-1 archive piece, our atelier team is here to assist.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FORM & STUDIO DETAILS 2-COLUMN GRID */}
      <section className="section">
        <div className="container" style={{ maxWidth: '1080px' }}>
          <div className="contact-main-grid">
            {/* Left: Contact Form */}
            <div className="contact-form-card">
              <span className="eyebrow">Direct Message</span>
              <h2 className="heading-2" style={{ margin: '0.5rem 0 1rem' }}>
                Send an Atelier Inquiry
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1.75rem' }}>
                Our studio team reviews all messages and replies within 24 business hours.
              </p>

              {submitted ? (
                <div className="contact-success-box">
                  <div className="contact-success-icon">✨</div>
                  <h3 className="heading-3">Message Received with Reverence</h3>
                  <p style={{ marginTop: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                    {MESSAGES.contactSent}
                  </p>
                  <button
                    type="button"
                    className="btn btn--outline"
                    style={{ marginTop: '1.25rem' }}
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row form-row--2">
                    <div className="form-group">
                      <label>Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Iyer"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="maya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row form-row--2">
                    <div className="form-group">
                      <label>WhatsApp / Phone</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Inquiry Nature *</label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      >
                        <option value="bespoke-upcycle">Bespoke Custom Upcycling</option>
                        <option value="archive-question">Question on 1-of-1 Piece</option>
                        <option value="tailor-partnership">Tailor Offcut Partnership</option>
                        <option value="donation-inquiry">Fabric Donation Drop-off</option>
                        <option value="press">Press &amp; Collaborations</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Your Message / Project Details *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your request, garment measurements, or textile story..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn--primary btn--full" style={{ marginTop: '0.5rem' }}>
                    Dispatch Message to Atelier →
                  </button>
                </form>
              )}
            </div>

            {/* Right: Studio Sidebar Details */}
            <div className="contact-sidebar">
              <div className="contact-info-card">
                <span className="eyebrow">Studio Channels</span>
                <h3 className="heading-3" style={{ marginBottom: '1.25rem' }}>Direct Reach</h3>

                <div className="contact-info-item">
                  <strong>💬 WhatsApp Studio Desk</strong>
                  <p>Immediate responses for sizing, parcel tracking, and custom upcycle consultations.</p>
                  <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" className="contact-info-link">
                    Open WhatsApp Chat →
                  </a>
                </div>

                <div className="contact-info-item">
                  <strong>✉️ Email Address</strong>
                  <p>{CONTACT.email}</p>
                  <a href={CONTACT.emailHref} className="contact-info-link">
                    Send Email Inquiry →
                  </a>
                </div>

                <div className="contact-info-item">
                  <strong>📍 Physical Studio Location</strong>
                  <p>{CONTACT.location}</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Visits by prior appointment only.
                  </span>
                </div>

                <div className="contact-hours-block">
                  <strong>Studio Working Hours:</strong>
                  <p>Monday – Saturday: 9:30 AM – 6:30 PM IST</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    Sunday: Closed for restorative natural dyeing.
                  </p>
                </div>
              </div>

              {/* Instagram QR Card */}
              <div className="instagram-qr-card">
                <img src={instagramQr} alt="Scan QR to follow Prasthara Instagram" className="instagram-qr-img" />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.875rem' }}>Follow Our Daily Atelier Diary</strong>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0.2rem 0 0.5rem' }}>
                    Watch cutting-room updates, indigo vat stories, and preview 1-of-1 archive drops.
                  </p>
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--outline btn--compact"
                  >
                    {CONTACT.instagramHandle} →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FREQUENTLY ASKED QUESTIONS */}
      <section className="section section--alt" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="section-header section-header--center">
            <span className="eyebrow">Common Inquiries</span>
            <h2 className="heading-1">Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx
              return (
                <div key={faq.q} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-panel">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
