import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ROUTES } from '../constants'
import { useCart } from '../store/CartContext'
import { useToast } from '../store/ToastContext'
import type { Product } from '../types/product'

interface QuickViewModalProps {
  product: Product | null
  onClose: () => void
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const { addItem } = useCart()
  const { showToast } = useToast()

  useEffect(() => {
    setActiveImageIdx(0)
    if (product) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [product])

  if (!product) return null

  const handleAdd = () => {
    addItem(product)
    showToast(`Added to Bag`, `${product.name} has been added to your order.`)
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="quickview-backdrop" role="dialog" aria-modal="true" aria-label={`Quick view ${product.name}`}>
        <motion.div
          className="quickview-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          className="quickview-modal"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <button type="button" className="quickview-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>

          <div className="quickview-grid">
            <div className="quickview-gallery">
              <div className="quickview-stage">
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  className="quickview-stage-img"
                />
                <span className="product-badge product-badge--top-left">{product.type}</span>
                {product.isOneOfOne && (
                  <span className="product-badge product-badge--top-right">1-of-1 Piece</span>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="quickview-thumbs">
                  {product.images.map((img, i) => (
                    <button
                      key={img + i}
                      type="button"
                      className={`quickview-thumb ${i === activeImageIdx ? 'is-active' : ''}`}
                      onClick={() => setActiveImageIdx(i)}
                    >
                      <img src={img} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="quickview-content">
              <div className="quickview-header">
                <p className="eyebrow eyebrow--terracotta">{product.category}</p>
                <h2 className="quickview-title">{product.name}</h2>
                <div className="quickview-price-row">
                  <span className="quickview-price">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice && (
                    <span className="quickview-original-price">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="quickview-tax-note">Inclusive of all taxes</span>
                </div>
              </div>

              <p className="quickview-story">{product.story}</p>

              <div className="quickview-spec-list">
                {product.material && (
                  <div className="quickview-spec-item">
                    <span className="quickview-spec-label">Material:</span>
                    <span className="quickview-spec-val">{product.material}</span>
                  </div>
                )}
                {product.weave && (
                  <div className="quickview-spec-item">
                    <span className="quickview-spec-label">Weave / Craft:</span>
                    <span className="quickview-spec-val">{product.weave}</span>
                  </div>
                )}
                {product.origin && (
                  <div className="quickview-spec-item">
                    <span className="quickview-spec-label">Origin:</span>
                    <span className="quickview-spec-val">{product.origin}</span>
                  </div>
                )}
                {product.size && (
                  <div className="quickview-spec-item">
                    <span className="quickview-spec-label">Size:</span>
                    <span className="quickview-spec-val">{product.size}</span>
                  </div>
                )}
                {product.condition && (
                  <div className="quickview-spec-item">
                    <span className="quickview-spec-label">Condition:</span>
                    <span className="quickview-spec-val capitalize">{product.condition}</span>
                  </div>
                )}
              </div>

              {product.sustainability && (
                <div className="quickview-sustainability-box">
                  <span className="quickview-leaf-icon">🌱</span>
                  <div>
                    <strong>Circular Impact:</strong> Saves ~{product.sustainability.waterSavedLiters?.toLocaleString()} L of fresh water & diverts {product.sustainability.wasteDivertedGrams}g of textile waste.
                  </div>
                </div>
              )}

              <div className="quickview-actions">
                <button type="button" className="btn btn--primary btn--full" onClick={handleAdd}>
                  Add to Bag • ₹{product.price.toLocaleString('en-IN')}
                </button>
                <Link
                  to={ROUTES.product(product.slug)}
                  className="btn btn--ghost btn--full"
                  onClick={onClose}
                >
                  View Full Editorial Page & Provenance →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
