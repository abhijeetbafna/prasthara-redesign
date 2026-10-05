import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../types/product'

interface WishlistContextValue {
  items: Product[]
  itemCount: number
  totalItems: number
  isInWishlist: (productId: string) => boolean
  toggleWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextValue | null>(null)
const WISHLIST_STORAGE_KEY = 'prasthara-wishlist'

function readStoredWishlist(): Product[] {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as Product[]
  } catch {
    return []
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => readStoredWishlist())

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const isInWishlist = useCallback(
    (productId: string) => items.some((item) => item.id === productId),
    [items],
  )

  const toggleWishlist = useCallback((product: Product) => {
    setItems((current) => {
      const exists = current.some((item) => item.id === product.id)
      if (exists) {
        return current.filter((item) => item.id !== product.id)
      }
      return [...current, product]
    })
  }, [])

  const removeFromWishlist = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.id !== productId))
  }, [])

  const clearWishlist = useCallback(() => setItems([]), [])

  const itemCount = items.length

  const value = useMemo(
    () => ({
      items,
      itemCount,
      totalItems: itemCount,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
    }),
    [items, itemCount, isInWishlist, toggleWishlist, removeFromWishlist, clearWishlist],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}
