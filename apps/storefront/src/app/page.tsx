import Link from 'next/link';
import { Suspense } from 'react';
import HeroSlider from '@/components/hero-slider';
import ProductCard from '@/components/product-card';
import { getProducts, getCollections, mockProducts, mockCollections, useMockData } from '@/lib/shopify';

// Mock hero slides data
const heroSlides = [
  {
    id: 'hero-1',
    title: 'Premium Nail Art',
    description: 'Professional nail services with luxurious handcrafted designs',
    buttonText: 'Shop Now',
    buttonHref: '/collections/all',
    image: {
      url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop',
      alt: 'Luxury nail art collection'
    }
  },
  {
    id: 'hero-2',
    title: 'Summer Collection',
    description: 'Bold, vibrant designs perfect for any occasion',
    buttonText: 'Explore Collection',
    buttonHref: '/collections/summer',
    image: {
      url: 'https://images.unsplash.com/photo-1599948113225-9b5d9c0b6de6?w=800&h=600&fit=crop',
      alt: 'Summer nail designs'
    }
  }
];

async function FeaturedProducts() {
  try {
    const useMock = useMockData();
    
    if (useMock) {
      // Use mock data in development
      return (
        <section className="section-padding bg-accent">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-light-text max-w-2xl mx-auto">
                Discover our most popular nail designs and collections
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockProducts.slice(0, 8).map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  priority={index < 4}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/collections/all" className="btn-primary">
                View All Products
              </Link>
            </div>
          </div>
        </section>
      );
    }

    // Use real Shopify data in production
    const { products } = await getProducts({ first: 8, sortKey: 'BEST_SELLING', reverse: true });

    return (
      <section className="section-padding bg-accent">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-light-text max-w-2xl mx-auto">
              Discover our most popular nail designs and collections
            </p>
          </div>
          
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    priority={index < 4}
                  />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link href="/collections/all" className="btn-primary">
                  View All Products
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-light-text">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return (
      <section className="section-padding bg-accent">
        <div className="container">
          <div className="text-center py-12">
            <p className="text-light-text">Unable to load products at this time.</p>
          </div>
        </div>
      </section>
    );
  }
}

async function FeaturedCollections() {
  try {
    const useMock = useMockData();
    
    if (useMock) {
      // Use mock data in development
      return (
        <section className="section-padding">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Shop by Collection
              </h2>
              <p className="text-lg text-light-text max-w-2xl mx-auto">
                Explore our curated collections for every style and occasion
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockCollections.map((collection) => (
                <Link 
                  key={collection.id} 
                  href={`/collections/${collection.handle}`}
                  className="group"
                >
                  <div className="card">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {collection.image && (
                        <img
                          src={collection.image.url}
                          alt={collection.image.altText || collection.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-light-text transition-colors">
                        {collection.title}
                      </h3>
                      <p className="text-light-text line-clamp-2">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // Use real Shopify data in production
    const collections = await getCollections();

    return (
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Shop by Collection
            </h2>
            <p className="text-lg text-light-text max-w-2xl mx-auto">
              Explore our curated collections for every style and occasion
            </p>
          </div>
          
          {collections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.slice(0, 6).map((collection) => (
                <Link 
                  key={collection.id} 
                  href={`/collections/${collection.handle}`}
                  className="group"
                >
                  <div className="card">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {collection.image && (
                        <img
                          src={collection.image.url}
                          alt={collection.image.altText || collection.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-light-text transition-colors">
                        {collection.title}
                      </h3>
                      <p className="text-light-text line-clamp-2">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-light-text">No collections available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching collections:', error);
    return (
      <section className="section-padding">
        <div className="container">
          <div className="text-center py-12">
            <p className="text-light-text">Unable to load collections at this time.</p>
          </div>
        </div>
      </section>
    );
  }
}

function AboutSection() {
  return (
    <section className="section-padding bg-accent">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              About Demo Brand
            </h2>
            <p className="text-lg text-light-text mb-8 leading-relaxed">
              At Demo Brand, we specialize in creating stunning, professional nail art that lasts. 
              Our experienced nail technicians combine artistry with precision to deliver salon-quality results.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0">
                  ✨
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-2">Expert Craftsmanship</h4>
                  <p className="text-light-text">Handcrafted by professional nail technicians</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0">
                  ⏱️
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-2">Long-lasting Quality</h4>
                  <p className="text-light-text">Designs that stay perfect for up to 4 weeks</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0">
                  🛡️
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-2">Zero Damage</h4>
                  <p className="text-light-text">Gentle techniques that protect your natural nails</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link href="/about" className="btn-primary">
                Learn More About Us
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=700&fit=crop"
              alt="Professional nail salon interior"
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSlider slides={heroSlides} />
      
      {/* Featured Collections */}
      <Suspense fallback={
        <section className="section-padding">
          <div className="container">
            <div className="text-center">Loading collections...</div>
          </div>
        </section>
      }>
        <FeaturedCollections />
      </Suspense>
      
      {/* Featured Products */}
      <Suspense fallback={
        <section className="section-padding bg-accent">
          <div className="container">
            <div className="text-center">Loading products...</div>
          </div>
        </section>
      }>
        <FeaturedProducts />
      </Suspense>
      
      {/* About Section */}
      <AboutSection />
    </>
  );
}