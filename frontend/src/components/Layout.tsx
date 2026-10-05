import { Outlet } from 'react-router-dom'
import { CartDrawer } from './CartDrawer'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollToTop } from './ScrollToTop'
import { SmoothScroll } from './SmoothScroll'

export function Layout() {
  return (
    <SmoothScroll>
      <ScrollToTop />
      <div className="app-shell">
        <Navbar />
        <main className="app-main">
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </SmoothScroll>
  )
}
