import type { Category, Condition, ProductType, SortOption } from '../types/product'

export const PRODUCT_TYPES: { value: ProductType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Collections' },
  { value: 'thrift', label: 'Curated Thrift' },
  { value: 'upcycled', label: 'Studio Upcycled' },
]

export const CATEGORIES: { value: Category | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: 'All Categories', icon: '✦' },
  { value: 'clothing', label: 'Clothing & Kurtas', icon: '👔' },
  { value: 'apron', label: 'Chef & Studio Aprons', icon: '🎽' },
  { value: 'bag', label: 'Totes & Slings', icon: '👜' },
  { value: 'pouch', label: 'Zip Pouches & Organizers', icon: '👝' },
  { value: 'home', label: 'Living & Table Decor', icon: '🛋️' },
  { value: 'custom', label: 'Bespoke Commissions', icon: '✂️' },
]

export const CONDITIONS: { value: Condition | 'all'; label: string }[] = [
  { value: 'all', label: 'All Conditions' },
  { value: 'excellent', label: 'Mint / Like New' },
  { value: 'good', label: 'Gently Pre-loved' },
  { value: 'fair', label: 'Wabi-Sabi Patched' },
]

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured / Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating: High to Low' },
  { value: 'discount', label: 'Biggest Discounts' },
  { value: 'name', label: 'Alphabetical: A–Z' },
]

export const PRICE_BOUNDS = {
  min: 300,
  max: 2000,
  step: 50,
} as const
