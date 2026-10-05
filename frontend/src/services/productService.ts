import { mockProducts } from '../data/mockProducts'
import type { Product, ProductFilter, SortOption } from '../types/product'

const delay = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms))

function sortProducts(products: Product[], sort: SortOption = 'featured'): Product[] {
  const next = [...products]

  switch (sort) {
    case 'price-asc':
      return next.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return next.sort((a, b) => b.price - a.price)
    case 'rating':
      return next.sort((a, b) => b.rating - a.rating)
    case 'discount':
      return next.sort((a, b) => {
        const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0
        const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0
        return discB - discA
      })
    case 'name':
      return next.sort((a, b) => a.name.localeCompare(b.name))
    case 'featured':
    default:
      return next.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
  }
}

export const productService = {
  async getAll(): Promise<Product[]> {
    await delay()
    return [...mockProducts]
  },

  async getBySlug(slug: string): Promise<Product | undefined> {
    await delay()
    return mockProducts.find((product) => product.slug === slug)
  },

  async getFeatured(): Promise<Product[]> {
    await delay()
    return mockProducts.filter((product) => product.featured)
  },

  async getRelated(target: Product, limit = 4): Promise<Product[]> {
    await delay()
    return mockProducts
      .filter(
        (p) =>
          p.id !== target.id &&
          (p.category === target.category || p.type === target.type),
      )
      .slice(0, limit)
  },

  async search(query: string): Promise<Product[]> {
    await delay()
    const q = query.toLowerCase().trim()
    if (!q) return []
    return mockProducts.filter((product) => {
      const matchName = product.name.toLowerCase().includes(q)
      const matchTags = product.tags.some((t) => t.toLowerCase().includes(q))
      const matchMaterial = product.material?.toLowerCase().includes(q) ?? false
      const matchWeave = product.weave?.toLowerCase().includes(q) ?? false
      const matchStory = product.story.toLowerCase().includes(q)
      const matchCategory = product.category.toLowerCase().includes(q)
      return (
        matchName ||
        matchTags ||
        matchMaterial ||
        matchWeave ||
        matchStory ||
        matchCategory
      )
    })
  },

  async filter(filters: ProductFilter): Promise<Product[]> {
    await delay()

    const searchQ = filters.searchQuery?.toLowerCase().trim()

    const filtered = mockProducts.filter((product) => {
      const typeMatch =
        !filters.type || filters.type === 'all' || product.type === filters.type
      const categoryMatch =
        !filters.category ||
        filters.category === 'all' ||
        product.category === filters.category
      const conditionMatch =
        !filters.condition ||
        filters.condition === 'all' ||
        product.condition === filters.condition
      const minMatch =
        filters.priceMin === undefined || product.price >= filters.priceMin
      const maxMatch =
        filters.priceMax === undefined || product.price <= filters.priceMax
      const stockMatch = !filters.inStockOnly || product.inStock !== false

      let searchMatch = true
      if (searchQ) {
        const matchName = product.name.toLowerCase().includes(searchQ)
        const matchTags = product.tags.some((t) => t.toLowerCase().includes(searchQ))
        const matchMaterial = product.material?.toLowerCase().includes(searchQ) ?? false
        const matchWeave = product.weave?.toLowerCase().includes(searchQ) ?? false
        const matchStory = product.story.toLowerCase().includes(searchQ)
        searchMatch = matchName || matchTags || matchMaterial || matchWeave || matchStory
      }

      return (
        typeMatch &&
        categoryMatch &&
        conditionMatch &&
        minMatch &&
        maxMatch &&
        stockMatch &&
        searchMatch
      )
    })

    return sortProducts(filtered, filters.sort)
  },
}
