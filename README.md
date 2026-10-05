# Prasthara — Atelier & Circular Cloth

> **Giving textiles a second life.**  
> A contemporary Indian textile atelier giving pre-loved garments and tailoring offcuts an enduring second chapter through mindful curation and zero-waste upcycling.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)
[![License: MIT](https://img.shields.io/badge/License-MIT-sand.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0+-purple.svg)](https://vitejs.dev/)

---

## 🏛️ Brand & Product Vision

Born along the lush coastal weaving belts of **Kasaragod, Kerala**, Prasthara reimagines circular fashion through the lens of architectural tailoring and regional handloom preservation:

- **1-of-1 Vault Archive:** Hand-selected vintage kurtas, chore jackets, khadi shirts, and handwoven stoles with decades of life remaining.
- **Artisanal Studio Upcycling:** Discarded tailoring selvedges and heirloom remnants re-engineered into chef aprons, carry-all totes, and table runners using geometric mosaic quilting and double-needle topstitching.
- **Circularity Stewardship:** Transparent material provenance, quantified water/textile savings, and a dedicated parcel pledge platform for unworn clothes.

---

## ✨ Key Features & E-Commerce Architecture

### 1. Editorial Luxury Design System
- **Typography Hierarchy:** Editorial `Cormorant Garamond` & `Playfair Display` serif headlines paired with functional, high-contrast `Plus Jakarta Sans` for commercial clarity.
- **Tactile Material Palette:** Warm Linen (`#FBF9F5`), Deep Charcoal Ink (`#1C1917`), Terracotta (`#963D25`), and Sage (`#2E5936`).
- **Controlled Media Ratios:** Proportional 3:4 product cards and 16:10 editorial features that allow fabric textures and craftsmanship to lead.

### 2. High-Converting E-Commerce Workflow
- **Live PIN Code Serviceability:** Dedicated postal code validation with real-time delivery estimation dates, COD availability, and persistent `localStorage` memory.
- **Single-Source Free Shipping Engine:** Single source of truth in `constants/index.ts` (`₹1,499`) with an interactive progress bar inside the sliding cart drawer.
- **Interactive Product Detail Page (PDP):** Multi-angle photo gallery, condition grading, exact flat tailoring tape measurement guide, circularity metrics, and instant checkout.
- **Curated Wishlist:** Persistent heart saves synced with `localStorage`.

### 3. Circular Platform & Storytelling
- **Donate Clothes & Scraps:** Multi-step participation pathways, accepted natural fiber checklists, and instant parcel pickup pledge form.
- **The Slow Cloth Gazette:** Curated editorial essays on indigo fermentation, selvedge anatomy, and pitloom heritage with category filtering.
- **Bespoke Upcycling Consultation:** Direct atelier inquiry form with 2-column layout and WhatsApp studio desk integration.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Routing:** [React Router 6](https://reactrouter.com/) (with client-side SPA redirects)
- **State Management:** React Context (`CartContext`, `WishlistContext`, `ToastContext`) with `localStorage` synchronization
- **PWA:** `vite-plugin-pwa` with offline caching and manifest support
- **Hosting:** [Netlify](https://www.netlify.com/) (configured with `netlify.toml`) & [GitHub Pages](https://pages.github.com/) (configured with GitHub Actions)

---

## 📁 Repository Architecture

```text
prasthara/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Zero-config GitHub Pages CI/CD
├── netlify.toml                # Netlify build and SPA routing config
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.tsx      # Header with search, wishlist & cart badges
│   │   │   ├── ProductCard.tsx # 3:4 portrait card with hover flip & quick add
│   │   │   ├── CartDrawer.tsx  # Slide-over bag with free shipping progress bar
│   │   │   ├── PincodeChecker.tsx # PIN delivery serviceability checker
│   │   │   ├── CheckoutModal.tsx # Instant order checkout flow
│   │   │   └── Footer.tsx      # Comprehensive site map and archive links
│   │   ├── pages/              # Editorial & Commerce views
│   │   │   ├── HomePage.tsx    # Hero, 1-of-1 vault, craft philosophy, impact
│   │   │   ├── ShopPage.tsx    # Faceted catalog with category & type filters
│   │   │   ├── ProductDetailPage.tsx # PDP with specs, tape guide & reviews
│   │   │   ├── StoryPage.tsx   # Brand manifesto, dual pathways, photo essay
│   │   │   ├── DonatePage.tsx  # Fabric donation guidelines & pledge form
│   │   │   ├── JournalPage.tsx # The Slow Cloth Gazette publications
│   │   │   ├── JournalArticlePage.tsx # Typographic reading view
│   │   │   ├── WishlistPage.tsx# Saved artifacts archive
│   │   │   └── ContactPage.tsx # Studio inquiries & WhatsApp desk
│   │   ├── data/               # Mock products, categories & journal essays
│   │   ├── store/              # Cart, Wishlist, and Toast Context Providers
│   │   ├── types/              # Strict TypeScript definitions
│   │   ├── index.css           # Complete bespoke CSS design system
│   │   └── App.tsx             # Route manifest
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

---

## 🚀 Quickstart & Local Development

### 1. Clone & Install

```bash
git clone https://github.com/abhijeetbafna/prasthara-redesign.git
cd prasthara-redesign/frontend
npm install
```

### 2. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Production Build

```bash
npm run build
```

---

## 🌐 Deploy to Netlify

This repository includes [`netlify.toml`](./netlify.toml) pre-configured for instant deployment:

1. Go to [app.netlify.com](https://app.netlify.com/) and log in.
2. Click **Add new site** → **Import an existing project** → **GitHub**.
3. Select `abhijeetbafna/prasthara-redesign`.
4. Netlify will auto-detect:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy Site**.

---

## 🌿 Quantified Circular Impact

| Metric | Measured Impact | Provenance Note |
| :--- | :--- | :--- |
| **Freshwater Conserved** | `18,500 L` | By avoiding virgin cotton cultivation and chemical dye baths |
| **Textile Scraps Rescued** | `420 kg` | Diverted from Southern Indian tailoring room floors |
| **Zero Virgin Synthetics** | `100%` | Pure natural fibers only (Khadi, Linen, Silk, Cotton) |
| **Artisans Sustained** | `32+ Craftspeople` | Direct living wages paid across Kerala & Karnataka studios |

---

## 📜 License

Created with reverence by **Prasthara Atelier**. Open-sourced under the [MIT License](./LICENSE).
