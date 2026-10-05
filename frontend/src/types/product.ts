export type ProductType = 'thrift' | 'upcycled'

export type Category =
  | 'clothing'
  | 'apron'
  | 'bag'
  | 'pouch'
  | 'home'
  | 'custom'

export type Condition = 'excellent' | 'good' | 'fair'

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount' | 'name'

export interface SustainabilityMetrics {
  waterSavedLiters?: number
  wasteDivertedGrams?: number
  co2PreventedKg?: number
  circularityNote?: string
}

export interface ProductReview {
  id: string
  userName: string
  userLocation: string
  rating: number
  date: string
  title: string
  comment: string
  verifiedPurchase: boolean
}

export interface Product {
  id: string
  name: string
  slug: string
  type: ProductType
  category: Category
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  size?: string
  condition?: Condition
  story: string
  images: string[]
  tags: string[]
  isOneOfOne: boolean
  featured?: boolean
  inStock?: boolean
  badge?: string
  material?: string
  fabricType?: string
  weave?: string
  origin?: string
  artisanProcess?: string
  dimensions?: string
  careInstructions?: string[]
  sustainability?: SustainabilityMetrics
  reviews?: ProductReview[]
}

export interface ProductFilter {
  type?: ProductType | 'all'
  category?: Category | 'all'
  condition?: Condition | 'all'
  priceMin?: number
  priceMax?: number
  sort?: SortOption
  searchQuery?: string
  inStockOnly?: boolean
}

export interface ShopFilterState {
  type: ProductType | 'all'
  category: Category | 'all'
  condition: Condition | 'all'
  priceMin: number
  priceMax: number
  sort: SortOption
  searchQuery?: string
  inStockOnly?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface JournalArticle {
  id: string
  slug: string
  title: string
  subtitle: string
  date: string
  readTime: string
  category: string
  coverImage: string
  excerpt: string
  content: string[]
  author: {
    name: string
    role: string
    avatar: string
  }
}
