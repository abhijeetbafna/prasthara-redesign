import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { ROUTES } from '../constants'
import { useWishlist } from '../store/WishlistContext'

export function WishlistPage() {
  const { items, clearWishlist } = useWishlist()

  return (
    <div className="page-wishlist">
      <div className="container" style={{ padding: '4rem 1.5rem 6rem' }}>
        <div className="section-header section-header--split">
          <div>
            <span className="eyebrow">Saved Pieces</span>
            <h1 className="heading-1">Your Curated Archive ({items.length})</h1>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              className="btn btn--text"
              onClick={clearWishlist}
            >
              Clear All Saved Pieces
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--color-text-secondary)' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>
              No pieces saved yet
            </p>
            <p style={{ fontSize: '0.9375rem', marginBottom: '2rem' }}>
              Explore our 1-of-1 reclaimed Indian textiles and save your favorite pieces.
            </p>
            <Link to={ROUTES.shop} className="btn btn--primary">
              Explore Archive →
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
