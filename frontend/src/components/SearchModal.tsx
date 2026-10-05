import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ROUTES } from '../constants'
import { mockProducts } from '../data/mockProducts'
import type { Product } from '../types/product'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const POPULAR_SEARCHES = ['Indigo', 'Kantha', 'Linen Kurta', 'Aprons', 'Denim', 'Upcycled Bags', 'Mulmul']

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ''
      setQuery('')
      setResults([])
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      setResults([])
      return
    }
    const filtered = mockProducts.filter((product) => {
      const matchName = product.name.toLowerCase().includes(q)
      const matchTags = product.tags.some((t) => t.toLowerCase().includes(q))
      const matchCat = product.category.toLowerCase().includes(q)
      const matchMat = product.material?.toLowerCase().includes(q) ?? false
      const matchWeave = product.weave?.toLowerCase().includes(q) ?? false
      const matchStory = product.story.toLowerCase().includes(q)
      return matchName || matchTags || matchCat || matchMat || matchWeave || matchStory
    })
    setResults(filtered)
  }, [query])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="search-modal-backdrop" role="dialog" aria-modal="true" aria-label="Search Catalog">
          <motion.div
            className="search-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="search-modal"
            initial={{ opacity: 0, y: -25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="search-modal__header">
              <div className="search-modal__input-wrapper">
                <svg className="search-modal__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  ref={inputRef}
                  type="search"
                  className="search-modal__input"
                  placeholder="Search by weave, fabric, style (e.g. 'Indigo', 'Kantha', 'Denim', 'Apron')..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button type="button" className="search-modal__clear" onClick={() => setQuery('')} aria-label="Clear search">
                    ✕
                  </button>
                )}
              </div>
              <button type="button" className="search-modal__close-btn" onClick={onClose}>
                ESC
              </button>
            </div>

            <div className="search-modal__body">
              {!query ? (
                <div className="search-modal__suggested">
                  <p className="search-modal__label">Popular Curations & Fabrics</p>
                  <div className="search-modal__tags">
                    {POPULAR_SEARCHES.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="search-modal__tag"
                        onClick={() => setQuery(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  <div className="search-modal__curated-preview">
                    <p className="search-modal__label">Featured Atelier Pieces</p>
                    <div className="search-modal__preview-grid">
                      {mockProducts.filter((p) => p.featured).slice(0, 3).map((p) => (
                        <Link
                          key={p.id}
                          to={ROUTES.product(p.slug)}
                          className="search-modal__item"
                          onClick={onClose}
                        >
                          <img src={p.images[0]} alt={p.name} className="search-modal__item-img" />
                          <div className="search-modal__item-info">
                            <span className="search-modal__item-type">{p.type}</span>
                            <span className="search-modal__item-title">{p.name}</span>
                            <span className="search-modal__item-price">₹{p.price.toLocaleString('en-IN')}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="search-modal__results">
                  <p className="search-modal__count">
                    Found <strong>{results.length}</strong> {results.length === 1 ? 'piece' : 'pieces'} for "{query}"
                  </p>
                  <div className="search-modal__results-list">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        to={ROUTES.product(product.slug)}
                        className="search-modal__result-row"
                        onClick={onClose}
                      >
                        <img src={product.images[0]} alt={product.name} className="search-modal__result-img" />
                        <div className="search-modal__result-meta">
                          <div className="search-modal__result-tags">
                            <span className="pill-badge">{product.type}</span>
                            {product.material && <span className="pill-badge pill-badge--subtle">{product.material.split('&')[0]}</span>}
                          </div>
                          <p className="search-modal__result-name">{product.name}</p>
                          <p className="search-modal__result-story">{product.story}</p>
                        </div>
                        <div className="search-modal__result-pricing">
                          <span className="search-modal__result-price">₹{product.price.toLocaleString('en-IN')}</span>
                          <span className="search-modal__result-action">View Piece →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="search-modal__empty">
                  <p className="search-modal__empty-title">No textile matches for "{query}"</p>
                  <p className="search-modal__empty-desc">
                    Try searching for different weave patterns, fabrics like "linen", "cotton", "denim", or category names like "bags" and "aprons".
                  </p>
                  <Link to={ROUTES.shop} className="btn btn--outline" onClick={onClose}>
                    Explore All Available Archives
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
