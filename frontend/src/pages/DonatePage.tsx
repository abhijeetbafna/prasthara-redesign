import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT, MESSAGES, ROUTES } from '../constants'
import { useToast } from '../store/ToastContext'

export function DonatePage() {
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    phone: '',
    city: '',
    itemTypes: 'cotton-sarees',
    quantityEst: '3-5 pieces',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!formData.donorName || !formData.phone || !formData.city) {
      showToast('Incomplete Form', MESSAGES.formError, 'alert')
      return
    }
    setSubmitted(true)
    showToast('Donation Pledge Received', MESSAGES.donationSent, 'success')
  }

  return (
    <div className="page-donate">
      {/* 1. EDITORIAL HERO */}
      <section className="donate-hero">
        <div className="container">
          <div className="donate-hero__inner">
            <span className="eyebrow">Circularity &amp; Textile Stewardship</span>
            <h1 className="heading-display" style={{ margin: '1rem 0 1.25rem' }}>
              Give Your Unworn Textiles a Dignified Second Life.
            </h1>
            <p className="subhead" style={{ margin: '0 auto', textAlign: 'center' }}>
              Have cherished garments sitting unworn in your wardrobe or tailor offcuts accumulating in your studio? Partner with Prasthara to keep natural fibers circulating in purposeful daily utility.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THREE WAYS TO PARTICIPATE */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="eyebrow">Three Pathways</span>
            <h2 className="heading-1">How You Can Support Circular Fashion</h2>
            <p className="subhead" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              Every piece pledged directly reduces virgin textile footprint and sustains rural artisan livelihood.
            </p>
          </div>

          <div className="donate-paths-grid">
            <div className="donate-path-card">
              <div className="donate-path-icon-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h3 className="heading-2" style={{ fontSize: '1.35rem', margin: '0.5rem 0' }}>1. Donate Clothes &amp; Scraps</h3>
              <p>
                Send us clean, wearable natural garments or studio tailoring offcuts. Wearable items are conditioned for our thrift archive; offcuts become upcycled aprons and bags.
              </p>
              <a href="#pledge-form" className="btn btn--outline btn--compact">
                Pledge a Parcel ↓
              </a>
            </div>

            <div className="donate-path-card">
              <div className="donate-path-icon-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path d="M2 2l7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
              </div>
              <h3 className="heading-2" style={{ fontSize: '1.35rem', margin: '0.5rem 0' }}>2. Bespoke Upcycle Commission</h3>
              <p>
                Cherish your family's sentimental textiles? Send us heirloom sarees or grandfather shirts and our atelier master tailors will re-engineer them into memory quilts or chore jackets.
              </p>
              <Link to={ROUTES.contact} className="btn btn--outline btn--compact">
                Custom Inquiries →
              </Link>
            </div>

            <div className="donate-path-card">
              <div className="donate-path-icon-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h3 className="heading-2" style={{ fontSize: '1.35rem', margin: '0.5rem 0' }}>3. Shop Consciously</h3>
              <p>
                Every purchase from our 1-of-1 archive directly finances fair artisan wages in Kerala, eliminates virgin synthetic demand, and keeps circular design accessible.
              </p>
              <Link to={ROUTES.shop} className="btn btn--primary btn--compact">
                Explore The Vault →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACCEPTED TEXTILES GUIDELINE */}
      <section className="section section--alt">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="section-header section-header--center">
            <span className="eyebrow">Material Quality Standard</span>
            <h2 className="heading-1">What We Gladly Accept &amp; Transform</h2>
          </div>

          <div className="guidelines-grid">
            <div className="guideline-card guideline-card--accept">
              <h3 className="heading-3" style={{ color: 'var(--color-sage)', marginBottom: '1rem' }}>
                ✓ Accepted Natural Fibers
              </h3>
              <ul className="guideline-list">
                <li>Pure Cotton &amp; Khadi (shirts, kurtas, dhotis, yardage)</li>
                <li>Pure Silk &amp; Tussar (sarees, dupattas, stoles)</li>
                <li>Linen &amp; Hemp textiles</li>
                <li>Tailor offcuts &amp; cutting room remnants (min. 2 inches)</li>
                <li>Pre-loved denim and heavy cotton twill</li>
              </ul>
            </div>

            <div className="guideline-card guideline-card--decline">
              <h3 className="heading-3" style={{ color: 'var(--color-terracotta)', marginBottom: '1rem' }}>
                ✕ What We Cannot Accept
              </h3>
              <ul className="guideline-list">
                <li>100% Synthetic polyester, nylon, or spandex activewear</li>
                <li>Severely soiled, moldy, or wet fabrics</li>
                <li>Undergarments &amp; hosiery</li>
                <li>Faux leather, PVC, or plastic-coated textiles</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DONATION PLEDGE FORM */}
      <section id="pledge-form" className="section">
        <div className="container" style={{ maxWidth: '680px' }}>
          <div className="section-header section-header--center">
            <span className="eyebrow">Pledge A Parcel</span>
            <h2 className="heading-1">Dispatch Fabrics to Kasaragod Studio</h2>
            <p className="subhead" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              Fill out your details below and our studio team will send you complimentary courier pickup logistics or shipping voucher credit.
            </p>
          </div>

          {submitted ? (
            <div className="contact-success-box">
              <div className="contact-success-icon">🌱</div>
              <h3 className="heading-2">Thank You for Your Circular Pledge</h3>
              <p style={{ marginTop: '0.5rem', color: 'var(--color-text-secondary)' }}>
                Our Kerala logistics team will review your parcel description and email you a pre-paid postal label within 24 hours.
              </p>
              <button
                type="button"
                className="btn btn--outline"
                style={{ marginTop: '1.5rem' }}
                onClick={() => setSubmitted(false)}
              >
                Pledge Another Parcel
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="donate-form-card">
              <div className="form-row form-row--2">
                <div className="form-group">
                  <label>Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Menon"
                    value={formData.donorName}
                    onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="radhika@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row form-row--2">
                <div className="form-group">
                  <label>WhatsApp / Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Your City &amp; PIN Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kochi, 682001"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row form-row--2">
                <div className="form-group">
                  <label>Primary Textile Type</label>
                  <select
                    value={formData.itemTypes}
                    onChange={(e) => setFormData({ ...formData, itemTypes: e.target.value })}
                  >
                    <option value="cotton-sarees">Cotton &amp; Khadi Sarees / Kurtas</option>
                    <option value="tailor-offcuts">Tailoring &amp; Cutting Room Offcuts</option>
                    <option value="linen-home">Linen &amp; Home Textiles</option>
                    <option value="vintage-shirts">Vintage Denim &amp; Overshirts</option>
                    <option value="mixed">Mixed Natural Fiber Parcel</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Estimated Quantity / Weight</label>
                  <select
                    value={formData.quantityEst}
                    onChange={(e) => setFormData({ ...formData, quantityEst: e.target.value })}
                  >
                    <option value="1-2 pieces">Small Parcel (1–2 pieces / ~1 kg)</option>
                    <option value="3-5 pieces">Medium Box (3–5 pieces / ~2–4 kg)</option>
                    <option value="bulk-offcuts">Studio Bulk (5+ kg offcut sack)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Notes / Provenance Story (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Share any details about the age, weave, or regional origin of these textiles..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn--primary btn--full" style={{ marginTop: '0.5rem' }}>
                Submit Textile Donation Pledge →
              </button>
            </form>
          )}

          <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            <span>Need direct studio assistance? WhatsApp us at </span>
            <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" style={{ color: 'var(--color-text-main)', fontWeight: 600, textDecoration: 'underline' }}>
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
