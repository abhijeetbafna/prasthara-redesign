import { Link } from 'react-router-dom'
import { BRAND_STATS, ROUTES } from '../constants'

export function StoryPage() {
  return (
    <div className="page-story">
      {/* 1. EDITORIAL HERO HEADER */}
      <section className="story-editorial-hero">
        <div className="container">
          <div className="story-editorial-hero__inner">
            <span className="eyebrow">The Atelier Manifesto</span>
            <h1 className="heading-display" style={{ margin: '1rem 0 1.5rem' }}>
              "What is often cast aside still carries generations of soul."
            </h1>
            <p className="subhead" style={{ margin: '0 auto', textAlign: 'center' }}>
              Founded along the coastal weaving belts of Kasaragod, Kerala, Prasthara was born from a singular commitment: Indian textiles deserve a graceful second chapter, not a landfill.
            </p>
          </div>
        </div>
      </section>

      {/* 2. QUANTIFIED STUDIO IMPACT RIBBON */}
      <section className="story-metrics-ribbon">
        <div className="container">
          <div className="story-metrics-grid">
            {BRAND_STATS.map((stat) => (
              <div key={stat.label} className="story-metric-item">
                <span className="story-metric-val">{stat.value}</span>
                <span className="story-metric-label">{stat.label}</span>
                <span className="story-metric-sub">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NARRATIVE CHAPTER 01: THE TEXTILE PARADOX */}
      <section className="section story-chapter">
        <div className="container">
          <div className="story-chapter__grid">
            <div className="story-chapter__media">
              <div className="story-chapter__img-frame">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=85"
                  alt="Sorting artisan handloom scraps in Kasaragod studio"
                  loading="lazy"
                />
              </div>
              <p className="story-chapter__caption">
                Studio Archive 01 — Reclaiming tailoring offcuts in our Kasaragod atelier.
              </p>
            </div>

            <div className="story-chapter__content">
              <span className="eyebrow">Chapter I • The Crisis of Abandonment</span>
              <h2 className="heading-1" style={{ margin: '0.75rem 0 1.25rem' }}>
                The Unseen Lifecycle of Handloom Discards
              </h2>
              <p className="story-text">
                Across India’s bespoke tailoring workshops and boutiques, millions of meters of pure handspun cotton, wild tussar silk, and natural khadi are trimmed away and abandoned each day.
              </p>
              <p className="story-text">
                To discard an artisanal textile is to discard the agricultural water drawn by the farmer, the mineral alchemy of the vegetable dye vat, and the rhythmic manual hours of the pitloom weaver.
              </p>
              <div className="story-quote-block">
                <p>
                  "The Sanskrit word <em>Prasthara</em> signifies 'to spread, unfold, and lay a foundation.' Our purpose is to spread circular reverence for cloth across everyday homes."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DUAL ARCHITECTURE: HOW WE REANIMATE CLOTH */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="eyebrow">Dual Pathways</span>
            <h2 className="heading-1">How We Reanimate Heritage Cloth</h2>
            <p className="subhead" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              Two complementary methods designed for zero textile loss.
            </p>
          </div>

          <div className="story-pillars-grid">
            <div className="story-pillar-card">
              <div className="story-pillar-icon">🏷️</div>
              <span className="eyebrow">Pathway 01</span>
              <h3 className="heading-2" style={{ fontSize: '1.5rem', margin: '0.5rem 0 1rem' }}>
                Curated Vintage &amp; Pre-Loved Thrifting
              </h3>
              <p className="story-text">
                We hand-select vintage kurtas, chore jackets, khadi shirts, and handwoven stoles with decades of life remaining. Each piece undergoes botanical laundering, seam reinforcement, and rigorous grading.
              </p>
              <ul className="story-pillar-list">
                <li>✓ 100% natural, breathable fibers only</li>
                <li>✓ Authenticated condition rating with detailed sizing</li>
                <li>✓ Zero virgin manufacturing resources used</li>
              </ul>
              <div style={{ marginTop: '1.5rem' }}>
                <Link to={`${ROUTES.shop}?type=thrift`} className="btn btn--outline btn--compact">
                  Browse Vintage Garments →
                </Link>
              </div>
            </div>

            <div className="story-pillar-card">
              <div className="story-pillar-icon">✂️</div>
              <span className="eyebrow">Pathway 02</span>
              <h3 className="heading-2" style={{ fontSize: '1.5rem', margin: '0.5rem 0 1rem' }}>
                Artisanal Studio Upcycling &amp; Patchwork
              </h3>
              <p className="story-text">
                Fabrics with wear or awkward scrap dimensions are transformed into ergonomic chef aprons, carry-all totes, and table runners using geometric mosaic quilting and double-needle topstitching.
              </p>
              <ul className="story-pillar-list">
                <li>✓ Ergonomic patchwork aprons &amp; durable studio workwear</li>
                <li>✓ Heavy-duty reclaimed carry-all utility totes</li>
                <li>✓ Small remnants made into travel pouches and coasters</li>
              </ul>
              <div style={{ marginTop: '1.5rem' }}>
                <Link to={`${ROUTES.shop}?type=upcycled`} className="btn btn--primary btn--compact">
                  Explore Upcycled 1-of-1s →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VISUAL ESSAY: INSIDE THE KASARAGOD ATELIER */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--split">
            <div>
              <span className="eyebrow">Visual Provenance</span>
              <h2 className="heading-1">Inside the Kasaragod Atelier</h2>
            </div>
            <p className="subhead">Where forgotten remnants become everyday heirlooms.</p>
          </div>

          <div className="story-visual-grid">
            <div className="story-visual-item story-visual-item--lead">
              <img
                src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=900&q=85"
                alt="Indigo dyeing and fermentation vats"
                loading="lazy"
              />
              <span className="story-visual-tag">Indigo Alchemy &amp; Natural Dye Fermentation</span>
            </div>
            <div className="story-visual-item">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=85"
                alt="Sewing upcycled patchwork canvas"
                loading="lazy"
              />
              <span className="story-visual-tag">Double-needle Canvas Topstitching</span>
            </div>
            <div className="story-visual-item">
              <img
                src="https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=600&q=85"
                alt="Handloom pitloom weave inspection"
                loading="lazy"
              />
              <span className="story-visual-tag">Pitloom Khadi &amp; Tussar Preservation</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="section section--alt" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <span className="eyebrow">Join The Movement</span>
          <h2 className="heading-1" style={{ margin: '0.75rem 0 1rem' }}>
            Be Part of the Living Archive
          </h2>
          <p className="subhead" style={{ margin: '0 auto 2rem', textAlign: 'center' }}>
            Every piece you adopt from Prasthara sustains Indian artisan communities, eliminates plastic synthetics, and gives textiles the dignified longevity they deserve.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link to={ROUTES.shop} className="btn btn--primary">
              Explore Available 1-of-1s →
            </Link>
            <Link to={ROUTES.donate} className="btn btn--outline">
              Donate Unworn Clothes &amp; Scraps
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
