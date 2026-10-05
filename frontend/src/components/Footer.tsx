import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FREE_SHIPPING_THRESHOLD, ROUTES } from '../constants'
import { useToast } from '../store/ToastContext'

export function Footer() {
  const [email, setEmail] = useState('')
  const { showToast } = useToast()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      showToast('Subscribed', 'You will receive our intimate monthly archive drops and essays.', 'success')
      setEmail('')
    }
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          {/* Brand Col */}
          <div>
            <span className="footer-brand__name">Prasthara</span>
            <p className="footer-brand__mission">
              An Indian textile atelier dedicated to circular design, zero-waste tailoring, and honoring the generational memory of slow handlooms.
            </p>
            <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#A39C94' }}>
              Studio: Kasaragod, Kerala, India.
            </p>
          </div>

          {/* The Archive */}
          <div>
            <h4 className="footer-col__title">The Archive</h4>
            <div className="footer-col__links">
              <Link to={`${ROUTES.shop}?category=clothing`}>Vintage Garments</Link>
              <Link to={`${ROUTES.shop}?category=apron`}>Patchwork Aprons</Link>
              <Link to={`${ROUTES.shop}?category=bag`}>Utility Totes &amp; Bags</Link>
              <Link to={`${ROUTES.shop}?category=pouch`}>Travel Pouches</Link>
              <Link to={`${ROUTES.shop}?category=home`}>Home &amp; Table Linen</Link>
              <Link to={`${ROUTES.shop}?type=upcycled`}>1-of-1 Vault Pieces</Link>
            </div>
          </div>

          {/* Circularity & Studio */}
          <div>
            <h4 className="footer-col__title">Circularity &amp; Studio</h4>
            <div className="footer-col__links">
              <Link to={ROUTES.story}>Our Story &amp; Manifesto</Link>
              <Link to={ROUTES.donate}>Donate Clothes &amp; Scraps</Link>
              <Link to={ROUTES.journal}>The Slow Cloth Gazette</Link>
              <Link to={ROUTES.wishlist}>Your Saved Artifacts</Link>
              <Link to={ROUTES.contact}>Bespoke Upcycling Inquiries</Link>
              <Link to={ROUTES.contact}>Atelier Studio Visit</Link>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="footer-col__title">Customer Care</h4>
            <div className="footer-col__links">
              <Link to={ROUTES.contact}>Shipping &amp; Courier FAQs</Link>
              <Link to={ROUTES.contact}>Returns &amp; Exchange Policy</Link>
              <Link to={ROUTES.contact}>Direct Studio Support</Link>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <h4 className="footer-col__title" style={{ marginBottom: '0.5rem' }}>Archive Dispatch</h4>
              <p className="footer-newsletter__desc">
                Receive private previews of new 1-of-1 drops and textile essays.
              </p>
              <form onSubmit={handleSubscribe} className="footer-newsletter__form">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="footer-newsletter__input"
                />
                <button
                  type="submit"
                  style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#F0DFC8', fontWeight: 600 }}
                >
                  Join →
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Prasthara Atelier. All textiles honored &amp; reclaimed.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <span>Zero Plastic Packaging</span>
            <span>•</span>
            <span>Free Courier Above ₹{FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')}</span>
            <span>•</span>
            <span>Fair Artisan Wages</span>
            <span>•</span>
            <span>Carbon-Neutral Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
