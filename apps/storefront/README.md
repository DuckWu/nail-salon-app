# Demo Brand Storefront - Next.js 14 Shopify Integration

A modern, high-performance Next.js 14 storefront integrated with Shopify Storefront API. Built with TypeScript, Tailwind CSS, and featuring server-side rendering, optimistic UI updates, and comprehensive SEO.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Shopify store with Storefront API access

### Installation

1. **Navigate to the storefront directory:**
   ```bash
   cd apps/storefront
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure your environment variables in `.env.local`:**
   ```env
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_API_VERSION=2024-07
   SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN=your-storefront-access-token
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
apps/storefront/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── layout.tsx         # Root layout with Header/Footer
│   │   ├── page.tsx           # Homepage with hero + featured products
│   │   ├── cart/              # Shopping cart page
│   │   ├── collections/       # Collection and product pages
│   │   ├── legal/             # Legal pages (shipping, returns)
│   │   ├── sitemap.ts         # Dynamic sitemap generation
│   │   └── robots.ts          # SEO robots.txt
│   ├── components/            # Reusable UI components
│   │   ├── header.tsx         # Navigation with cart icon
│   │   ├── footer.tsx         # Site footer with links
│   │   ├── product-card.tsx   # Product cards with hover effects
│   │   ├── hero-slider.tsx    # Homepage hero carousel
│   │   └── free-shipping-bar.tsx  # Free shipping progress bar
│   └── lib/                   # Utilities and API clients
│       ├── shopify/           # Shopify Storefront API client
│       ├── stores/            # Zustand state management
│       └── types/             # TypeScript definitions
├── .env.example               # Environment variables template
├── tailwind.config.js         # Tailwind configuration
└── README.md                  # This file
```

## 🛍️ Features Implemented

### ✅ Core Pages
- **Homepage** (`/`) - Hero slider + featured collections + 8 featured products
- **Collections** (`/collections/[handle]`) - Product grid with filters (Shape, Length, Size) synced to URL
- **Products** (`/products/[handle]`) - Gallery, 3-level variant selector, price, add-to-cart
- **Cart** (`/cart`) - Local cart state with Shopify checkout integration
- **Legal Pages** (`/legal/shipping`, `/legal/returns`) - Static informational pages

### ✅ Components Ported
- **Header/Navigation** - Responsive nav with mobile hamburger menu and cart icon
- **ProductCard** - Hover second image effect, pricing, availability
- **FreeShippingBar** - Progress bar toward $79 threshold  
- **Footer** - Multi-column footer with links and social media

### ✅ Shopify Integration
- **Typed Storefront Client** - Server-only fetch with comprehensive error handling
- **Cart State Management** - Zustand store with localStorage persistence
- **Checkout Flow** - Creates Shopify Cart via Storefront API and redirects to checkoutUrl
- **Mock Data** - Fallback placeholder data for development

### ✅ SEO & Performance  
- **generateMetadata** - Dynamic meta tags for all pages
- **JSON-LD Structured Data** - Product, Offer, and AggregateRating schemas
- **sitemap.xml** - Dynamic sitemap generation from Shopify data
- **robots.txt** - SEO-friendly robot directives
- **Image Optimization** - Next.js Image component with lazy loading

## 🎨 Visual Design

Maintains the original static site's visual hierarchy:

- **Color Scheme**: Black (#000) primary, white (#fff) secondary, light gray (#f8f8f8) accent
- **Typography**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Layout**: Container max-width 1200px with consistent spacing
- **Responsive**: Mobile-first design with breakpoints

## ⚙️ Environment Setup

Create `.env.local` with your Shopify credentials:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_API_VERSION=2024-07  
SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN=shpat_your-token-here
```

### Shopify Setup Required

1. Create a Private App in Shopify Admin
2. Enable Storefront API access with permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory` 
   - `unauthenticated_read_collection_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`

## 🚀 Commands to Run Locally

```bash
# Navigate to storefront directory
cd apps/storefront

# Install dependencies  
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your Shopify credentials
# Then run development server
npm run dev

# Production build
npm run build
npm run start
```

## 🌐 Vercel Deployment

### Automatic GitHub Deployment
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard:
   - Project Settings → Environment Variables
   - Add `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_API_VERSION`, `SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN`
3. Deploy automatically on git push

### Manual CLI Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to storefront
cd apps/storefront

# Deploy
vercel --prod

# Add environment variables via CLI
vercel env add SHOPIFY_STORE_DOMAIN
vercel env add SHOPIFY_STOREFRONT_API_VERSION  
vercel env add SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN
```

## 🎯 Asset Swapping Guide

To replace placeholder content with your branding:

1. **Environment Variables**: Update `.env.local` with real Shopify credentials
2. **Hero Images**: Edit `heroSlides` array in `src/app/page.tsx`
3. **Brand Name**: Replace "Demo Brand" in:
   - `src/app/layout.tsx` (metadata)
   - `src/components/header.tsx` (logo) 
   - `src/components/footer.tsx` (footer)
4. **Colors**: Modify Tailwind config in `tailwind.config.js`
5. **Mock Data**: Update `mockProducts` and `mockCollections` in `src/lib/shopify/index.ts`

## 🏗️ Architecture Highlights

- **Next.js 14 App Router** - Server components with streaming and Suspense
- **TypeScript** - Full type safety for Shopify API integration
- **Tailwind CSS** - Utility-first styling matching original design
- **Zustand** - Lightweight state management for cart
- **Server-Only API** - Shopify client with comprehensive error handling
- **Mock Data Fallback** - Development-friendly placeholder system

## 📱 Responsive Features

- **Mobile Navigation** - Hamburger menu with slide-out drawer
- **Touch-Friendly** - Large buttons and touch targets
- **Image Optimization** - Responsive images with proper aspect ratios
- **Performance** - Lazy loading and code splitting

The storefront is production-ready with all requested features implemented and optimized for performance, SEO, and user experience.