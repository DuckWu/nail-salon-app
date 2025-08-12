import { MetadataRoute } from 'next';
import { getProducts, getCollections, useMockData } from '@/lib/shopify';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://demo-brand.com';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal/shipping`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/legal/returns`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  try {
    const useMock = useMockData();
    
    if (useMock) {
      // Return static pages only in development
      return staticPages;
    }

    // Get dynamic pages from Shopify
    const [{ products }, collections] = await Promise.all([
      getProducts({ first: 250 }),
      getCollections(),
    ]);

    // Product pages
    const productPages = products.map((product) => ({
      url: `${baseUrl}/products/${product.handle}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Collection pages
    const collectionPages = collections.map((collection) => ({
      url: `${baseUrl}/collections/${collection.handle}`,
      lastModified: new Date(collection.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...productPages, ...collectionPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}