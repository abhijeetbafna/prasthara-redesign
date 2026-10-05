import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FREE_SHIPPING_THRESHOLD, ROUTES } from '../constants'
import { useCart } from '../store/CartContext'
import { useWishlist } from '../store/WishlistContext'

export function Navbar() {
  const location = useLocation()
  const { totalItems, openCart } = useCart()
  const { totalItems: wishlistCount } = useWishlist()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `${ROUTES.shop}?search=${encodeURIComponent(searchQuery.trim())}`
      setSearchOpen(false)
    }
  }

  const navLinks = [
    { label: 'Shop Archive', href: ROUTES.shop },
    { label: '1-of-1 Vault', href: `${ROUTES.shop}?type=upcycled` },
    { label: 'Our Story', href: ROUTES.story },
    { label: 'The Gazette', href: ROUTES.journal },
    { label: 'Donate Clothes', href: ROUTES.donate },
    { label: 'Contact', href: ROUTES.contact },
  ]

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span>
          Complimentary courier delivery on orders over <strong>₹{FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')}</strong> across India • <strong>100% Zero-Waste Archive</strong>
        </span>
      </div>

      {/* Main Header */}
      <header className="site-header">
        <div className="container site-header__inner">
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Brand Logo */}
          <Link to={ROUTES.home} className="site-brand">
            <span className="site-brand__title">Prasthara</span>
            <span className="site-brand__tag">Atelier &amp; Circular Cloth</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="site-nav" aria-label="Primary Navigation">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.href ||
                (link.href.includes('?') && location.search.includes(link.href.split('?')[1]))
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`site-nav__link ${isActive ? 'is-active' : ''}`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Header Actions */}
          <div className="site-actions">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--color-text-main)', paddingBottom: '2px' }}>
                <input
                  type="text"
                  placeholder="Search pieces, weaves..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{ fontSize: '0.8125rem', width: '150px', padding: '0 4px' }}
                />
                <button type="button" onClick={() => setSearchOpen(false)} style={{ padding: '0 4px', fontSize: '0.75rem' }}>✕</button>
              </form>
            ) : (
              <button
                type="button"
                className="header-action-btn"
                onClick={() => setSearchOpen(true)}
                aria-label="Search Catalog"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            )}

            {/* Wishlist */}
            <Link to={ROUTES.wishlist} className="header-action-btn" aria-label="View Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && <span className="action-count-badge">{wishlistCount}</span>}
            </Link>

            {/* Cart Bag */}
            <button
              type="button"
              className="header-action-btn"
              onClick={openCart}
              aria-label="Open Shopping Bag"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalItems > 0 && <span className="action-count-badge">{totalItems}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="site-brand__title" style={{ fontSize: '1.4rem' }}>Prasthara</span>
            <button type="button" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.25rem' }}>✕</button>
          </div>
          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
          <p>Handcrafted in Kasaragod, Kerala</p>
          <p style={{ marginTop: '0.25rem' }}>Free express shipping above ₹{FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')}</p>
        </div>
      </div>
    </>
  )
}
