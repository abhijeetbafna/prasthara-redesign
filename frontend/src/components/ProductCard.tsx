import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants'
import { useCart } from '../store/CartContext'
import { useWishlist } from '../store/WishlistContext'
import { useToast } from '../store/ToastContext'
import type { Product } from '../types/product'

interface ProductCardProps {
  product: Product
  className?: string
}

function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addItem, openCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { showToast } = useToast()
  const [isAdding, setIsAdding] = useState(false)

  const isFavorited = isInWishlist(product.id)
  const primaryImage = product.images[0]
  const secondaryImage = product.images[1] || product.images[0]

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
    showToast(
      isFavorited ? 'Removed from Wishlist' : 'Saved to Wishlist',
      product.name,
      'info'
    )
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdding(true)
    addItem(product, 1)
    showToast('Added to Bag', `${product.name} is in your shopping bag.`, 'success')
    openCart()
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <article className={`product-card ${className}`}>
      {/* Media Wrapper */}
      <div className="product-card__media-wrapper">
        <Link to={ROUTES.productDetail(product.slug)} aria-label={product.name}>
          <img
            src={primaryImage}
            alt={product.name}
            className="product-card__img product-card__img--primary"
            loading="lazy"
          />
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              className="product-card__img product-card__img--secondary"
              loading="lazy"
            />
          )}
        </Link>

        {/* Badges */}
        {product.isOneOfOne ? (
          <span className="product-card__tag product-card__tag--highlight">1 of 1 Vault</span>
        ) : (
          <span className="product-card__tag">{product.category}</span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          className={`product-card__wishlist ${isFavorited ? 'is-active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Quick Add Button */}
        <button
          type="button"
          className="product-card__quick-add"
          onClick={handleQuickAdd}
          disabled={isAdding}
        >
          {isAdding ? 'Adding to Bag...' : '+ Add to Bag'}
        </button>
      </div>

      {/* Meta */}
      <div className="product-card__meta">
        <span className="product-card__category">{product.type === 'upcycled' ? 'Artisanal Upcycled' : 'Curated Vintage'}</span>
        <h3 className="product-card__title">
          <Link to={ROUTES.productDetail(product.slug)}>{product.name}</Link>
        </h3>
        <div className="product-card__price-row">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="product-card__price-original">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </article>
  )
}
