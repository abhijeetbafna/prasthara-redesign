import { Link, useParams } from 'react-router-dom'
import { ROUTES } from '../constants'
import { mockJournalArticles } from '../data/mockJournal'

export function JournalArticlePage() {
  const { slug } = useParams()
  const article = mockJournalArticles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="section">
        <div className="section__inner text-center">
          <h2>Essay Not Found</h2>
          <p className="error-text">The requested article could not be located in our publication archives.</p>
          <Link to={ROUTES.journal} className="btn btn--primary">
            Return to Slow Cloth Gazette →
          </Link>
        </div>
      </div>
    )
  }

  const otherArticles = mockJournalArticles.filter((a) => a.id !== article.id)

  return (
    <article className="page-journal-article">
      <nav className="pdp-breadcrumbs" aria-label="Breadcrumb">
        <div className="section__inner pdp-breadcrumbs__inner">
          <Link to={ROUTES.home}>Home</Link>
          <span>/</span>
          <Link to={ROUTES.journal}>Journal</Link>
          <span>/</span>
          <span className="current">{article.title}</span>
        </div>
      </nav>

      <header className="article-header">
        <div className="section__inner article-header__inner">
          <div className="article-meta-top">
            <span className="pill-badge pill-badge--terracotta">{article.category}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="article-headline">{article.title}</h1>
          <p className="article-subtitle">{article.subtitle}</p>

          <div className="article-author-card">
            <img src={article.author.avatar} alt={article.author.name} className="article-author-avatar" />
            <div>
              <p className="article-author-name">Written by {article.author.name}</p>
              <p className="article-author-role">{article.author.role} • Prasthara Atelier</p>
            </div>
          </div>
        </div>
      </header>

      <div className="article-hero-media">
        <div className="section__inner">
          <img src={article.coverImage} alt={article.title} className="article-cover-img" />
        </div>
      </div>

      <div className="article-body-section">
        <div className="section__inner article-content-wrapper">
          <p className="article-lead-paragraph">{article.excerpt}</p>

          <div className="article-paragraphs">
            {article.content.map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="article-quote-callout">
            <p>
              "To choose a second-life garment is to participate in an unbroken lineage of Indian textile memory."
            </p>
          </div>

          <div className="article-share-row">
            <span>Share this publication:</span>
            <button
              type="button"
              className="btn btn--outline btn--compact"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href)
                alert('Article link copied to clipboard!')
              }}
            >
              📋 Copy Article Link
            </button>
            <Link to={ROUTES.shop} className="btn btn--primary btn--compact">
              Explore Available 1-of-1 Pieces →
            </Link>
          </div>
        </div>
      </div>

      {otherArticles.length > 0 && (
        <section className="section article-related-section">
          <div className="section__inner">
            <div className="section__header">
              <p className="eyebrow eyebrow--terracotta">Further Reading</p>
              <h2>More From the Atelier Gazette</h2>
            </div>
            <div className="journal-grid">
              {otherArticles.slice(0, 2).map((other) => (
                <div key={other.id} className="journal-card">
                  <Link to={ROUTES.journalArticle(other.slug)} className="journal-card__img-link">
                    <img src={other.coverImage} alt={other.title} className="journal-card__img" />
                    <span className="journal-card__category">{other.category}</span>
                  </Link>
                  <div className="journal-card__body">
                    <h3 className="journal-card__title">
                      <Link to={ROUTES.journalArticle(other.slug)}>{other.title}</Link>
                    </h3>
                    <p className="journal-card__excerpt">{other.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
