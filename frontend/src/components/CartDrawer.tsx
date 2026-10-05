import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import { CheckoutModal } from './CheckoutModal'
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_FEE, ROUTES } from '../constants'

function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`
}

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalItems, subtotal } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : FLAT_SHIPPING_FEE
  const finalTotal = subtotal + shippingFee

  const handleCheckoutClick = () => {
    closeCart()
    setCheckoutOpen(true)
  }

  return (
    <>
      <div
        className={`cart-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />
      <aside
        className={`cart-drawer ${isOpen ? 'is-open' : ''}`}
        aria-label="Shopping Bag"
        aria-hidden={!isOpen}
      >
        {/* Drawer Header */}
        <div className="cart-drawer__head">
          <h2 className="cart-drawer__title">Shopping Bag ({totalItems})</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close Shopping Bag"
            style={{ fontSize: '1.25rem', padding: '0.25rem' }}
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Dynamic Progress Strip */}
        {items.length > 0 && (
          <div className="cart-shipping-banner">
            <div className="cart-shipping-banner__text">
              {isFreeShipping ? (
                <span>
                  <strong style={{ color: 'var(--color-sage)' }}>✓ Unlocked:</strong> Free Express Courier across India!
                </span>
              ) : (
                <span>
                  Add <strong>{formatPrice(amountToFreeShipping)}</strong> more to get <strong>Free Courier Delivery</strong>
                </span>
              )}
            </div>
            <div className="cart-shipping-bar-bg">
              <div
                className="cart-shipping-bar-fill"
                style={{
                  width: `${shippingProgress}%`,
                  backgroundColor: isFreeShipping ? 'var(--color-sage)' : 'var(--color-terracotta)',
                }}
              />
            </div>
          </div>
        )}

        {/* Drawer Body */}
        <div className="cart-drawer__items">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--color-text-secondary)' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>
                Your bag is empty
              </p>
              <p style={{ fontSize: '0.875rem', marginBottom: '2rem' }}>
                Discover our curated 1-of-1 archive and upcycled craft pieces.
              </p>
              <Link
                to={ROUTES.shop}
                onClick={closeCart}
                className="btn btn--primary"
              >
                Explore Archive →
              </Link>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="cart-item">
                <div className="cart-item__media">
                  <img src={product.images[0]} alt={product.name} />
                </div>
                <div className="cart-item__info">
                  <div>
                    <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>
                      {product.type === 'upcycled' ? '1-of-1 Upcycled' : 'Curated Vintage'}
                    </span>
                    <h3 className="cart-item__title">{product.name}</h3>
                    <p className="cart-item__price">{formatPrice(product.price * quantity)}</p>
                  </div>
                  <div className="cart-item__controls">
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xs)' }}>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        style={{ padding: '0.2rem 0.6rem', fontSize: '0.9rem' }}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span style={{ padding: '0 0.4rem', fontSize: '0.8125rem', fontWeight: 600 }}>
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        style={{ padding: '0.2rem 0.6rem', fontSize: '0.9rem' }}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textDecoration: 'underline' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="cart-drawer__foot">
            <div className="cart-drawer__summary-row">
              <span style={{ color: 'var(--color-text-secondary)' }}>Item Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="cart-drawer__summary-row">
              <span style={{ color: 'var(--color-text-secondary)' }}>Courier Shipping</span>
              <span>
                {isFreeShipping ? (
                  <strong style={{ color: 'var(--color-sage)' }}>FREE</strong>
                ) : (
                  <span>{formatPrice(FLAT_SHIPPING_FEE)}</span>
                )}
              </span>
            </div>
            <div className="cart-drawer__summary-row cart-drawer__summary-row--total">
              <span>Payable Total</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
              Includes all taxes, eco-packaging &amp; artisan support contribution.
            </p>
            <button
              type="button"
              className="btn btn--primary btn--full"
              style={{ marginTop: '1.25rem' }}
              onClick={handleCheckoutClick}
            >
              Proceed to Conscious Checkout →
            </button>
          </div>
        )}
      </aside>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  )
}
