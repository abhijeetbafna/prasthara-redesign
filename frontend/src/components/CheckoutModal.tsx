import { useState, useEffect, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../store/CartContext'
import { useToast } from '../store/ToastContext'
import { FLAT_SHIPPING_FEE, FREE_SHIPPING_THRESHOLD, PINCODE_STORAGE_KEY } from '../constants'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, subtotal, clearCart } = useCart()
  const { showToast } = useToast()

  const [step, setStep] = useState<'details' | 'success'>('details')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Kerala',
    pincode: '',
    packaging: 'zero-waste',
    paymentMethod: 'upi',
    orderNote: '',
  })

  useEffect(() => {
    try {
      const savedPin = localStorage.getItem(PINCODE_STORAGE_KEY)
      if (savedPin) {
        setFormData((prev) => ({ ...prev, pincode: prev.pincode || savedPin }))
      }
    } catch {
      // ignore
    }
  }, [isOpen])

  const shippingCost = items.length === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE
  const packagingCost = 0 // complimentary zero waste
  const total = subtotal + shippingCost + packagingCost

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.address || !formData.pincode) {
      showToast('Incomplete details', 'Please fill in all required shipping fields.', 'alert')
      return
    }
    setStep('success')
    clearCart()
  }

  const handleClose = () => {
    setStep('details')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="checkout-backdrop" role="dialog" aria-modal="true">
          <motion.div
            className="checkout-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <motion.div
            className="checkout-modal"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="checkout-modal__header">
              <div className="checkout-modal__header-title">
                <span className="eyebrow eyebrow--terracotta">Prasthara Kerala Atelier</span>
                <h3>{step === 'details' ? 'Conscious Order Checkout' : 'Order Confirmed'}</h3>
              </div>
              <button type="button" className="checkout-modal__close" onClick={handleClose}>
                ✕
              </button>
            </div>

            {step === 'details' ? (
              <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="checkout-form__grid">
                  <div className="checkout-form__main">
                    <h4 className="checkout-form__section-heading">1. Shipping & Contact Details</h4>

                    <div className="form-row form-row--2">
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Siddharth Menon"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Contact Phone (WhatsApp) *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Email Address (for order receipts) *</label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Delivery Address *</label>
                      <textarea
                        rows={2}
                        required
                        placeholder="House / Apartment, Street, Landmark"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>

                    <div className="form-row form-row--3">
                      <div className="form-group">
                        <label>City *</label>
                        <input
                          type="text"
                          required
                          placeholder="Kasaragod / Kochi"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>State *</label>
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>PIN Code *</label>
                        <input
                          type="text"
                          required
                          placeholder="671121"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        />
                      </div>
                    </div>

                    <h4 className="checkout-form__section-heading mt-4">2. Sustainable Packaging Preference</h4>
                    <div className="packaging-options">
                      <label className="packaging-card">
                        <input
                          type="radio"
                          name="packaging"
                          checked={formData.packaging === 'zero-waste'}
                          onChange={() => setFormData({ ...formData, packaging: 'zero-waste' })}
                        />
                        <div className="packaging-card__info">
                          <strong>Zero-Waste Khadi Cloth Wrap (Recommended)</strong>
                          <p>Delivered wrapped in salvaged remnant muslin tied with jute twine. 100% plastic-free.</p>
                        </div>
                        <span className="packaging-card__badge">Free</span>
                      </label>
                    </div>

                    <h4 className="checkout-form__section-heading mt-4">3. Payment Mode</h4>
                    <div className="payment-options">
                      <label className={`payment-pill ${formData.paymentMethod === 'upi' ? 'is-active' : ''}`}>
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.paymentMethod === 'upi'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                        />
                        <span>⚡ Instant UPI / QR (GPay, PhonePe, Paytm)</span>
                      </label>
                      <label className={`payment-pill ${formData.paymentMethod === 'card' ? 'is-active' : ''}`}>
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.paymentMethod === 'card'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                        />
                        <span>💳 Credit / Debit Card (All Major Banks)</span>
                      </label>
                      <label className={`payment-pill ${formData.paymentMethod === 'cod' ? 'is-active' : ''}`}>
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        />
                        <span>📦 Cash on Delivery (Across India)</span>
                      </label>
                    </div>
                  </div>

                  <div className="checkout-form__sidebar">
                    <div className="checkout-summary-box">
                      <h4>Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})</h4>
                      <div className="checkout-summary-items">
                        {items.map((item) => (
                          <div key={item.product.id} className="checkout-item-row">
                            <img src={item.product.images[0]} alt={item.product.name} />
                            <div className="checkout-item-info">
                              <p className="checkout-item-name">{item.product.name}</p>
                              <p className="checkout-item-qty">Qty: {item.quantity}</p>
                            </div>
                            <span className="checkout-item-price">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="checkout-summary-lines">
                        <div className="summary-line">
                          <span>Subtotal</span>
                          <span>₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="summary-line">
                          <span>Carbon-Neutral Delivery</span>
                          <span>{shippingCost === 0 ? <strong className="text-forest">FREE</strong> : `₹${shippingCost}`}</span>
                        </div>
                        <div className="summary-line">
                          <span>Plastic-Free Packaging</span>
                          <span className="text-forest">Complimentary</span>
                        </div>
                        <div className="summary-line summary-line--total">
                          <strong>Grand Total</strong>
                          <strong>₹{total.toLocaleString('en-IN')}</strong>
                        </div>
                      </div>

                      <button type="submit" className="btn btn--primary btn--full btn--checkout">
                        Complete Order • ₹{total.toLocaleString('en-IN')}
                      </button>

                      <p className="checkout-guarantee">
                        🔒 Safe & Secure 256-Bit Encrypted Indian Textile Order. 7-Day Mindful Exchange Policy.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="checkout-success-view">
                <div className="checkout-success-icon">✨</div>
                <h2>Your textile journey continues!</h2>
                <p className="checkout-success-sub">
                  Order <strong>#PRA-{Math.floor(100000 + Math.random() * 900000)}</strong> has been received by our Kasaragod atelier.
                </p>
                <div className="checkout-success-details">
                  <p>
                    A confirmation email has been dispatched to <strong>{formData.email}</strong> with your tracking link and artisan dispatch schedule.
                  </p>
                  <p>
                    <strong>Delivering to:</strong> {formData.fullName}, {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                  </p>
                  <p className="text-forest">
                    🌱 Thank you for choosing circular textiles over fast fashion. Your order diverted textile scraps and conserved precious water.
                  </p>
                </div>
                <button type="button" className="btn btn--primary" onClick={handleClose}>
                  Continue Exploring Archive
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
