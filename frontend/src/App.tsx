import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ROUTES } from './constants'
import { ContactPage } from './pages/ContactPage'
import { DonatePage } from './pages/DonatePage'
import { HomePage } from './pages/HomePage'
import { JournalArticlePage } from './pages/JournalArticlePage'
import { JournalPage } from './pages/JournalPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { ShopPage } from './pages/ShopPage'
import { StoryPage } from './pages/StoryPage'
import { CartProvider } from './store/CartContext'
import { ToastProvider } from './store/ToastContext'
import { WishlistProvider } from './store/WishlistContext'

import { WishlistPage } from './pages/WishlistPage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <ToastProvider>
        <WishlistProvider>
          <CartProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path={ROUTES.home} element={<HomePage />} />
                <Route path={ROUTES.shop} element={<ShopPage />} />
                <Route path="/shop/:slug" element={<ProductDetailPage />} />
                <Route path={ROUTES.story} element={<StoryPage />} />
                <Route path={ROUTES.journal} element={<JournalPage />} />
                <Route path="/journal/:slug" element={<JournalArticlePage />} />
                <Route path={ROUTES.donate} element={<DonatePage />} />
                <Route path={ROUTES.contact} element={<ContactPage />} />
                <Route path={ROUTES.wishlist} element={<WishlistPage />} />
                <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
              </Route>
            </Routes>
          </CartProvider>
        </WishlistProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
