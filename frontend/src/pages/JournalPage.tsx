import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants'
import { mockJournalArticles } from '../data/mockJournal'

export function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', 'Craft & Weave', 'Circular Living', 'Artisan Voices']

  const filteredArticles =
    selectedCategory === 'all'
      ? mockJournalArticles
      : mockJournalArticles.filter((a) => a.category === selectedCategory)

  const leadArticle = mockJournalArticles[0]
  const otherArticles =
    selectedCategory === 'all'
      ? mockJournalArticles.slice(1)
      : filteredArticles

  return (
    <div className="page-journal">
      {/* 1. EDITORIAL PUBLICATION HEADER */}
      <section className="journal-header">
        <div className="container">
          <div className="journal-header__content">
            <span className="eyebrow">Editorial Publication</span>
            <h1 className="heading-display" style={{ margin: '0.75rem 0 1rem' }}>
              The Slow Cloth Gazette
            </h1>
            <p className="subhead">
              Essays, archival research, artisan dialogues, and circular textile perspectives from our Kerala studio.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="journal-filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`journal-tab-btn ${selectedCategory === cat ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'all' ? 'All Publications' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. FEATURED LEAD ESSAY */}
      {selectedCategory === 'all' && leadArticle && (
        <section className="section" style={{ paddingTop: '3rem', paddingBottom: '3.5rem' }}>
          <div className="container">
            <article className="journal-lead-card">
              <Link to={ROUTES.journalArticle(leadArticle.slug)} className="journal-lead-card__media">
                <img
                  src={leadArticle.coverImage}
                  alt={leadArticle.title}
                  className="journal-lead-card__img"
                  loading="lazy"
                />
                <span className="journal-lead-card__badge">{leadArticle.category}</span>
              </Link>
              <div className="journal-lead-card__content">
                <div className="journal-card__meta">
                  <span>{leadArticle.date}</span>
                  <span>•</span>
                  <span>{leadArticle.readTime}</span>
                  <span>•</span>
                  <span style={{ color: 'var(--color-terracotta)', fontWeight: 600 }}>Featured Essay</span>
                </div>
                <h2 className="journal-lead-card__title">
                  <Link to={ROUTES.journalArticle(leadArticle.slug)}>{leadArticle.title}</Link>
                </h2>
                <p className="journal-lead-card__subtitle">{leadArticle.subtitle}</p>
                <p className="journal-lead-card__excerpt">{leadArticle.excerpt}</p>
                <div className="journal-lead-card__footer">
                  <div className="journal-card__author">
                    <img
                      src={leadArticle.author.avatar}
                      alt={leadArticle.author.name}
                      className="journal-card__avatar"
                    />
                    <div>
                      <p className="journal-card__author-name">{leadArticle.author.name}</p>
                      <p className="journal-card__author-role">{leadArticle.author.role}</p>
                    </div>
                  </div>
                  <Link to={ROUTES.journalArticle(leadArticle.slug)} className="btn btn--primary btn--compact">
                    Read Essay →
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* 3. ARTICLES GRID */}
      <section className="section" style={{ paddingTop: '1rem', paddingBottom: '6rem' }}>
        <div className="container">
          {otherArticles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
              No publications in this category yet.
            </div>
          ) : (
            <div className="journal-articles-grid">
              {otherArticles.map((article) => (
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
                    <div className="journal-card__author" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="journal-card__avatar"
                      />
                      <div>
                        <p className="journal-card__author-name">{article.author.name}</p>
                        <p className="journal-card__author-role">{article.author.role}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
