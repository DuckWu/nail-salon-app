import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/cart',
        '/checkout',
        '/account',
        '/admin',
        '/api',
        '/_next',
        '/search',
      ],
    },
    sitemap: 'https://demo-brand.com/sitemap.xml',
  };
}