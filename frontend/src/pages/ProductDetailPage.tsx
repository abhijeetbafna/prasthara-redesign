import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { CheckoutModal } from '../components/CheckoutModal'
import { PincodeChecker } from '../components/PincodeChecker'
import { FREE_SHIPPING_THRESHOLD, ROUTES } from '../constants'
import { useProductBySlug } from '../hooks/useProducts'
import { productService } from '../services/productService'
import { useCart } from '../store/CartContext'
import { useWishlist } from '../store/WishlistContext'
import { useToast } from '../store/ToastContext'
import type { Product } from '../types/product'

function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`
}

export function ProductDetailPage() {
  const { slug } = useParams()
  const { product, loading, error } = useProductBySlug(slug)
  const { addItem, openCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { showToast } = useToast()

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'spec' | 'impact' | 'care' | 'reviews'>('spec')
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

  const isFavorited = product ? isInWishlist(product.id) : false

  useEffect(() => {
    if (product) {
      productService.getRelated(product, 4).then(setRelatedProducts)
      setSelectedImageIndex(0)
    }
  }, [product])

  if (loading) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        <p>Loading artisan textile details...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <h2 className="heading-2">Piece Not Found</h2>
        <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
          This 1-of-1 piece may have already found a home.
        </p>
        <Link to={ROUTES.shop} className="btn btn--primary" style={{ marginTop: '1.5rem' }}>
          Explore Available Pieces →
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, 1)
    showToast('Added to Bag', `${product.name} is in your cart.`, 'success')
    openCart()
  }

  const handleBuyNow = () => {
    addItem(product, 1)
    setCheckoutModalOpen(true)
  }

  return (
    <div className="page-pdp">
      <div className="container pdp-wrapper">
        {/* Breadcrumbs */}
        <nav className="pdp-breadcrumbs" aria-label="Breadcrumbs">
          <Link to={ROUTES.home}>Home</Link>
          <span>/</span>
          <Link to={ROUTES.shop}>Shop</Link>
          <span>/</span>
          <span className="current">{product.name}</span>
        </nav>

        {/* PDP Main Layout */}
        <div className="pdp-layout">
          {/* Gallery Left */}
          <div className="pdp-gallery">
            <div className="pdp-gallery__main">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
              />
            </div>

            {product.images.length > 1 && (
              <div className="pdp-gallery__thumbs">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`pdp-gallery__thumb-btn ${selectedImageIndex === idx ? 'is-active' : ''}`}
                    onClick={() => setSelectedImageIndex(idx)}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Right */}
          <div className="pdp-info">
            <div className="pdp-tag-row">
              {product.isOneOfOne ? (
                <span className="pdp-tag pdp-tag--one-of-one">1 of 1 Archive Piece</span>
              ) : (
                <span className="pdp-tag">{product.category}</span>
              )}
              <span className="pdp-tag" style={{ color: 'var(--color-text-muted)' }}>
                {product.type === 'upcycled' ? 'Artisanal Upcycled' : 'Curated Vintage'}
              </span>
            </div>

            <h1 className="pdp-title">{product.name}</h1>

            <div className="pdp-price-box">
              <span className="pdp-price">{formatPrice(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="pdp-price-mrp">{formatPrice(product.originalPrice)}</span>
                  <span className="pdp-savings-tag">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Size & Fit */}
            {product.size && (
              <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Size: <strong>{product.size}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  style={{ fontSize: '0.75rem', textDecoration: 'underline', color: 'var(--color-text-muted)' }}
                >
                  Tape Measurement Guide
                </button>
              </div>
            )}

            {/* Shipping Reassurance */}
            <div style={{ marginBottom: '1.25rem', padding: '0.65rem 0.85rem', backgroundColor: 'var(--color-bg-alt)', borderRadius: 'var(--radius-xs)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--color-sage)', fontWeight: 600 }}>🚚 Free Delivery</span>
              <span>on all orders above ₹{FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')} across India.</span>
            </div>

            {/* CTAs */}
            <div className="pdp-actions">
              <button
                type="button"
                className="btn btn--primary btn--full"
                onClick={handleAddToCart}
              >
                + Add to Shopping Bag
              </button>
              <button
                type="button"
                className="btn btn--outline btn--full"
                onClick={handleBuyNow}
              >
                Instant Checkout
              </button>
              <button
                type="button"
                className={`btn btn--outline ${isFavorited ? 'is-active' : ''}`}
                style={{ padding: '0.85rem 1.25rem' }}
                onClick={() => {
                  toggleWishlist(product)
                  showToast(
                    isFavorited ? 'Removed from Wishlist' : 'Saved to Wishlist',
                    product.name,
                    'info'
                  )
                }}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorited ? 'var(--color-terracotta)' : 'none'} stroke={isFavorited ? 'var(--color-terracotta)' : 'currentColor'} strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Pincode Serviceability */}
            <div style={{ marginBottom: '2rem' }}>
              <PincodeChecker />
            </div>

            {/* Story / Description */}
            <p className="pdp-story">{product.story}</p>

            {/* Tabs */}
            <div className="pdp-tabs">
              <div className="pdp-tab-header">
                <button
                  type="button"
                  className={`pdp-tab-btn ${activeTab === 'spec' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('spec')}
                >
                  Specifications
                </button>
                <button
                  type="button"
                  className={`pdp-tab-btn ${activeTab === 'impact' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('impact')}
                >
                  Circularity
                </button>
                <button
                  type="button"
                  className={`pdp-tab-btn ${activeTab === 'care' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('care')}
                >
                  Care Guide
                </button>
                <button
                  type="button"
                  className={`pdp-tab-btn ${activeTab === 'reviews' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Provenance ({product.reviews?.length || 0})
                </button>
              </div>

              <div className="pdp-tab-content">
                {activeTab === 'spec' && (
                  <table className="spec-table">
                    <tbody>
                      <tr>
                        <th>Material</th>
                        <td>{product.material || '100% Handloom Cotton'}</td>
                      </tr>
                      <tr>
                        <th>Weave &amp; Origin</th>
                        <td>{product.weave || 'Traditional Khadi'} • {product.origin || 'Kasaragod, Kerala'}</td>
                      </tr>
                      {product.dimensions && (
                        <tr>
                          <th>Dimensions</th>
                          <td>{product.dimensions}</td>
                        </tr>
                      )}
                      <tr>
                        <th>Condition</th>
                        <td style={{ textTransform: 'capitalize' }}>{product.condition || 'Excellent vintage condition'}</td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {activeTab === 'impact' && (
                  <div>
                    <p style={{ marginBottom: '0.75rem' }}>
                      By acquiring this pre-loved or upcycled piece, you directly prevent:
                    </p>
                    <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', color: 'var(--color-text-main)' }}>
                      <li><strong>{product.sustainability?.waterSavedLiters || 850} Liters</strong> of clean water consumption.</li>
                      <li><strong>{product.sustainability?.wasteDivertedGrams || 620} Grams</strong> of virgin textile waste from landfills.</li>
                      <li><strong>{product.sustainability?.co2PreventedKg || 2.1} kg</strong> of carbon emissions.</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'care' && (
                  <div>
                    <p style={{ marginBottom: '0.5rem' }}>Preserve natural fibers with gentle care:</p>
                    <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', color: 'var(--color-text-main)' }}>
                      <li>Cold hand wash with mild, pH-neutral soapnut detergent.</li>
                      <li>Dry in shaded air — avoid harsh direct noon sunlight.</li>
                      <li>Warm iron on reverse side.</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map((rev) => (
                        <div key={rev.id} style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                            <strong>{rev.userName} ({rev.userLocation})</strong>
                            <span>{rev.date}</span>
                          </div>
                          <p style={{ marginTop: '0.35rem', fontStyle: 'italic' }}>"{rev.comment}"</p>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                        This is a 1-of-1 archive artifact. Be the first custodian to record its modern chapter.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Pieces */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid var(--color-border)' }}>
            <div className="section-header section-header--split">
              <div>
                <span className="eyebrow">Complementary Artifacts</span>
                <h2 className="heading-1">More from the Archive</h2>
              </div>
              <Link to={ROUTES.shop} className="btn btn--text">
                Browse Full Catalog →
              </Link>
            </div>
            <div className="product-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
      />

      {/* Tape Measure Modal */}
      {sizeGuideOpen && (
        <div className="modal-overlay" onClick={() => setSizeGuideOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSizeGuideOpen(false)}
            >
              ✕
            </button>
            <h3 className="heading-2" style={{ marginBottom: '1rem' }}>
              Atelier Measurement Guide
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
              Every vintage and upcycled piece is individually hand-measured flat with a tailoring tape.
            </p>
            <table className="spec-table">
              <tbody>
                <tr>
                  <th>Chest / Bust</th>
                  <td>Pit to pit across the front (doubled)</td>
                </tr>
                <tr>
                  <th>Garment Length</th>
                  <td>Highest shoulder seam point to bottom hem</td>
                </tr>
                <tr>
                  <th>Sleeve Span</th>
                  <td>Center back neck across shoulder to cuff edge</td>
                </tr>
              </tbody>
            </table>
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => setSizeGuideOpen(false)}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
