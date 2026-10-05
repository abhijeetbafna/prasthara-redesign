import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'
import type { Category, ProductType, SortOption } from '../types/product'

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { products, loading } = useProducts()

  const activeCategory = (searchParams.get('category') as Category | 'all') || 'all'
  const activeType = (searchParams.get('type') as ProductType | 'all') || 'all'
  const activeSort = (searchParams.get('sort') as SortOption) || 'featured'
  const searchQuery = searchParams.get('search') || ''

  const [sort, setSort] = useState<SortOption>(activeSort)

  const handleCategoryChange = (category: Category | 'all') => {
    const nextParams = new URLSearchParams(searchParams)
    if (category === 'all') {
      nextParams.delete('category')
    } else {
      nextParams.set('category', category)
    }
    setSearchParams(nextParams)
  }

  const handleTypeChange = (type: ProductType | 'all') => {
    const nextParams = new URLSearchParams(searchParams)
    if (type === 'all') {
      nextParams.delete('type')
    } else {
      nextParams.set('type', type)
    }
    setSearchParams(nextParams)
  }

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort)
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('sort', newSort)
    setSearchParams(nextParams)
  }

  // Filter & Sort computation
  const filteredProducts = useMemo(() => {
    let list = [...products]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.story.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    }

    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory)
    }

    if (activeType !== 'all') {
      list = list.filter((p) => p.type === activeType)
    }

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'rating':
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        break
    }

    return list
  }, [products, activeCategory, activeType, sort, searchQuery])

  const categories: { label: string; value: Category | 'all' }[] = [
    { label: 'All Artifacts', value: 'all' },
    { label: 'Garments', value: 'clothing' },
    { label: 'Patch Aprons', value: 'apron' },
    { label: 'Utility Bags', value: 'bag' },
    { label: 'Pouches', value: 'pouch' },
    { label: 'Home Linen', value: 'home' },
  ]

  return (
    <div className="page-shop">
      <div className="container">
        {/* Shop Hero */}
        <div className="shop-hero">
          <span className="eyebrow">The Textile Vault</span>
          <h1 className="heading-1">Every Piece Has a Story &amp; a Second Life</h1>
          <p className="subhead" style={{ marginTop: '0.5rem' }}>
            Browse 1-of-1 reclaimed Indian textiles, vintage garments, and zero-waste patchwork artifacts.
          </p>
        </div>

        {/* Filter Strip */}
        <div className="shop-filter-bar">
          <div className="filter-pills">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                className={`filter-pill ${activeCategory === cat.value ? 'is-active' : ''}`}
                onClick={() => handleCategoryChange(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="filter-pills">
              <button
                type="button"
                className={`filter-pill ${activeType === 'all' ? 'is-active' : ''}`}
                onClick={() => handleTypeChange('all')}
              >
                All
              </button>
              <button
                type="button"
                className={`filter-pill ${activeType === 'upcycled' ? 'is-active' : ''}`}
                onClick={() => handleTypeChange('upcycled')}
              >
                Upcycled
              </button>
              <button
                type="button"
                className={`filter-pill ${activeType === 'thrift' ? 'is-active' : ''}`}
                onClick={() => handleTypeChange('thrift')}
              >
                Vintage
              </button>
            </div>

            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              style={{
                fontSize: '0.8125rem',
                border: '1px solid var(--color-border)',
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'var(--color-bg)',
                cursor: 'pointer',
              }}
            >
              <option value="featured">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Search Notice */}
        {searchQuery && (
          <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem' }}>
            <span>Showing results for: <strong>"{searchQuery}"</strong> ({filteredProducts.length} pieces found)</span>
            <button
              type="button"
              onClick={() => {
                const next = new URLSearchParams(searchParams)
                next.delete('search')
                setSearchParams(next)
              }}
              style={{ textDecoration: 'underline', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Product Grid */}
        {loading ? (
          <div style={{ padding: '6rem 0', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            Loading the archive...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ padding: '6rem 0', textAlign: 'center' }}>
            <h3 className="heading-2">No Artifacts Match Your Criteria</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
              Try broadening your category or craft filter.
            </p>
            <button
              type="button"
              className="btn btn--primary"
              style={{ marginTop: '1.5rem' }}
              onClick={() => setSearchParams(new URLSearchParams())}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="product-grid" style={{ paddingBottom: '6rem' }}>
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
