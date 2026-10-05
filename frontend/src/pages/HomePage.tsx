import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { ROUTES } from '../constants'
import { useProducts } from '../hooks/useProducts'
import { mockJournalArticles } from '../data/mockJournal'

export function HomePage() {
  const { products, loading } = useProducts()

  const featuredProducts = products.filter((p) => p.featured || p.isOneOfOne).slice(0, 8)

  return (
    <div className="page-home">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="editorial-hero">
        <div className="container">
          <div className="editorial-hero__grid">
            <div className="editorial-hero__content">
              <span className="eyebrow">Atelier Kasaragod • Zero-Waste Archive</span>
              <h1 className="editorial-hero__quote">
                Textiles with a second life.
              </h1>
              <p className="editorial-hero__sub">
                Curating rare handloom cottons, artisanal upcycled quilts, and 1-of-1 vintage garments to preserve Indian textile heritage through circular design.
              </p>
              <div className="editorial-hero__actions">
                <Link to={ROUTES.shop} className="btn btn--primary">
                  Explore The Archive →
                </Link>
                <Link to={ROUTES.story} className="btn btn--outline">
                  Our Textile Philosophy
                </Link>
              </div>
            </div>

            <div className="editorial-hero__media">
              <img
                src="https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1200&q=85"
                alt="Master handloom weaver crafting heritage cotton in Kerala studio"
                className="editorial-hero__img"
                loading="eager"
              />
              <div className="editorial-hero__badge">
                <span className="editorial-hero__badge-text">100% Reclaimed &amp; Restored</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 1-OF-1 VAULT & NEW ARRIVALS */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--split">
            <div>
              <span className="eyebrow">Available Artifacts</span>
              <h2 className="heading-1">The 1-of-1 Vault Archive</h2>
            </div>
            <Link to={ROUTES.shop} className="btn btn--text">
              View All 16 Pieces →
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
              Loading the textile archive...
            </div>
          ) : (
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. CRAFT & TEXTILE PHILOSOPHY */}
      <section className="section craft-narrative">
        <div className="container">
          <div className="craft-narrative__grid">
            <div className="craft-narrative__media">
              <div className="craft-narrative__img-frame">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=85"
                  alt="Tailoring table with fabric rolls and patchwork offcuts"
                  className="craft-narrative__img"
                  loading="lazy"
                />
              </div>
              <p className="craft-narrative__caption">
                Kasaragod studio — Sorting pure cotton selvedges and tailoring discards.
              </p>
            </div>

            <div className="craft-narrative__content">
              <span className="eyebrow">Artisanal Reclamation</span>
              <h2 className="heading-1" style={{ margin: '0.75rem 0 1.25rem' }}>
                Why We Value the Patch, Selvedge &amp; Mended Seam
              </h2>
              <p className="story-text">
                Every year, metric tons of high-grade artisanal yardage and handloom discards end up in landfills. We partner with master tailors and weavers across Southern India to rescue offcuts and pre-loved heirlooms.
              </p>
              <p className="story-text">
                Each Prasthara creation is a study in geometry, reinforced stitching, and textural harmony — honoring the hands that first spun the cotton and the journey of the wearer.
              </p>
              <div style={{ marginTop: '1.75rem' }}>
                <Link to={ROUTES.story} className="btn btn--primary">
                  Read The Atelier Story →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CIRCULAR IMPACT METRICS */}
      <section className="impact-strip">
        <div className="container">
          <div className="section-header section-header--center" style={{ marginBottom: '3rem' }}>
            <span className="eyebrow" style={{ color: '#E8B888' }}>Quantified Circularity</span>
            <h2 className="heading-1" style={{ color: '#FFFFFF' }}>Our Collective Footprint Saved</h2>
          </div>

          <div className="impact-strip__grid">
            <div className="impact-metric">
              <span className="impact-metric__number">1,420L</span>
              <span className="impact-metric__label">Water Conserved</span>
              <span className="impact-metric__sub">By avoiding virgin cotton farming and harsh industrial chemical washes.</span>
            </div>
            <div className="impact-metric">
              <span className="impact-metric__number">84.5kg</span>
              <span className="impact-metric__label">Textile Diverted</span>
              <span className="impact-metric__sub">Tailoring offcuts and pre-loved garments rescued from landfills.</span>
            </div>
            <div className="impact-metric">
              <span className="impact-metric__number">100%</span>
              <span className="impact-metric__label">One-of-a-Kind</span>
              <span className="impact-metric__sub">Zero mass production; every piece possesses unique provenance.</span>
            </div>
            <div className="impact-metric">
              <span className="impact-metric__number">32+</span>
              <span className="impact-metric__label">Artisans Sustained</span>
              <span className="impact-metric__sub">Fair wages paid to regional craftspeople in Kerala &amp; Karnataka.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL GAZETTE / JOURNAL */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--split">
            <div>
              <span className="eyebrow">The Slow Cloth Gazette</span>
              <h2 className="heading-1">Essays on Craft &amp; Material Longevity</h2>
            </div>
            <Link to={ROUTES.journal} className="btn btn--text">
              Read All Essays →
            </Link>
          </div>

          <div className="journal-home-grid">
            {mockJournalArticles.slice(0, 2).map((article) => (
              <article key={article.id} className="journal-card">
                <Link to={ROUTES.journalArticle(article.slug)} className="journal-card__img-link">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="journal-card__img"
                    loading="lazy"
                  />
                  <span className="journal-card__category">{article.category}</span>
                </Link>
                <div className="journal-card__body">
                  <div className="journal-card__meta">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="journal-card__title">
                    <Link to={ROUTES.journalArticle(article.slug)}>{article.title}</Link>
                  </h3>
                  <p className="journal-card__excerpt">{article.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
