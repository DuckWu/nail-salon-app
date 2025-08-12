import 'server-only';
import {
  ShopifyResponse,
  ProductsQueryResponse,
  ProductQueryResponse,
  CollectionsQueryResponse,
  CollectionQueryResponse,
  CartQueryResponse,
  CartCreateResponse,
  CartLinesAddResponse,
  CartLinesUpdateResponse,
  CartLinesRemoveResponse,
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCart,
} from '../types/shopify';
import {
  getProductsQuery,
  getProductQuery,
  getCollectionsQuery,
  getCollectionQuery,
  getCartQuery,
  createCartMutation,
  addToCartMutation,
  updateCartMutation,
  removeFromCartMutation,
} from './queries';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION;
const SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN = process.env.SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN;

if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_API_VERSION || !SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN) {
  throw new Error('Missing required Shopify environment variables');
}

const SHOPIFY_GRAPHQL_ENDPOINT = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`;

class ShopifyError extends Error {
  constructor(message: string, public errors?: any[]) {
    super(message);
    this.name = 'ShopifyError';
  }
}

async function shopifyFetch<T>({
  query,
  variables,
  headers,
  cache = 'force-cache',
}: {
  query: string;
  variables?: any;
  headers?: HeadersInit;
  cache?: RequestCache;
}): Promise<ShopifyResponse<T>> {
  try {
    const result = await fetch(SHOPIFY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      next: { revalidate: 900 }, // Revalidate every 15 minutes
    });

    const body = await result.json();

    if (body.errors) {
      throw new ShopifyError('GraphQL errors', body.errors);
    }

    return body;
  } catch (error) {
    if (error instanceof ShopifyError) {
      throw error;
    }
    throw new ShopifyError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function reshapeImages(images: any) {
  const flattened = images?.edges?.map((edge: any) => edge.node) || [];
  return flattened;
}

function reshapeProduct(product: any): ShopifyProduct {
  if (!product) {
    throw new Error('Product data is missing');
  }

  return {
    ...product,
    images: reshapeImages(product.images),
    variants: product.variants?.edges?.map((edge: any) => edge.node) || [],
  };
}

function reshapeProducts(products: any): ShopifyProduct[] {
  const reshapedProducts = [];
  
  for (const edge of products.edges || []) {
    const reshapedProduct = reshapeProduct(edge.node);
    if (reshapedProduct) {
      reshapedProducts.push(reshapedProduct);
    }
  }

  return reshapedProducts;
}

function reshapeCollection(collection: any): ShopifyCollection {
  if (!collection) {
    throw new Error('Collection data is missing');
  }

  return {
    ...collection,
    products: collection.products ? reshapeProducts(collection.products) : undefined,
  } as ShopifyCollection;
}

function reshapeCollections(collections: any): ShopifyCollection[] {
  const reshapedCollections = [];

  for (const edge of collections.edges || []) {
    const reshapedCollection = reshapeCollection(edge.node);
    if (reshapedCollection) {
      reshapedCollections.push(reshapedCollection);
    }
  }

  return reshapedCollections;
}

function reshapeCart(cart: any): ShopifyCart {
  if (!cart) {
    throw new Error('Cart data is missing');
  }

  return {
    ...cart,
    lines: cart.lines?.edges?.map((edge: any) => ({
      ...edge.node,
      merchandise: {
        ...edge.node.merchandise,
        product: {
          ...edge.node.merchandise.product,
          images: reshapeImages(edge.node.merchandise.product.images),
        },
      },
    })) || [],
  };
}

export async function getProduct(handle: string): Promise<ShopifyProduct | undefined> {
  const res = await shopifyFetch<ProductQueryResponse>({
    query: getProductQuery,
    variables: { handle },
  });

  return res.data?.product ? reshapeProduct(res.data.product) : undefined;
}

export async function getProducts({
  query,
  reverse = false,
  sortKey = 'CREATED_AT',
  first = 20,
  after,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  first?: number;
  after?: string;
} = {}): Promise<{ products: ShopifyProduct[]; hasNextPage: boolean; endCursor?: string }> {
  const res = await shopifyFetch<ProductsQueryResponse>({
    query: getProductsQuery,
    variables: {
      first,
      after,
      sortKey,
      reverse,
    },
  });

  const products = res.data?.products ? reshapeProducts(res.data.products) : [];
  
  return {
    products,
    hasNextPage: res.data?.products?.pageInfo?.hasNextPage || false,
    endCursor: res.data?.products?.pageInfo?.endCursor,
  };
}

export async function getCollections(): Promise<ShopifyCollection[]> {
  const res = await shopifyFetch<CollectionsQueryResponse>({
    query: getCollectionsQuery,
    variables: { first: 100 },
  });

  return res.data?.collections ? reshapeCollections(res.data.collections) : [];
}

export async function getCollection(handle: string, first: number = 20): Promise<ShopifyCollection | undefined> {
  const res = await shopifyFetch<CollectionQueryResponse>({
    query: getCollectionQuery,
    variables: { handle, first },
  });

  return res.data?.collection ? reshapeCollection(res.data.collection) : undefined;
}

export async function createCart(): Promise<ShopifyCart> {
  const res = await shopifyFetch<CartCreateResponse>({
    query: createCartMutation,
    cache: 'no-store',
  });

  if (res.data?.cartCreate?.userErrors?.length || !res.data?.cartCreate?.cart) {
    throw new ShopifyError('Error creating cart', res.data?.cartCreate?.userErrors);
  }

  return reshapeCart(res.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: Array<{
    merchandiseId: string;
    quantity: number;
  }>
): Promise<ShopifyCart> {
  const res = await shopifyFetch<CartLinesAddResponse>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines: lines.map((line) => ({
        merchandiseId: line.merchandiseId,
        quantity: line.quantity,
      })),
    },
    cache: 'no-store',
  });

  if (res.data?.cartLinesAdd?.userErrors?.length || !res.data?.cartLinesAdd?.cart) {
    throw new ShopifyError('Error adding to cart', res.data?.cartLinesAdd?.userErrors);
  }

  return reshapeCart(res.data.cartLinesAdd.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const res = await shopifyFetch<CartLinesRemoveResponse>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds,
    },
    cache: 'no-store',
  });

  if (res.data?.cartLinesRemove?.userErrors?.length || !res.data?.cartLinesRemove?.cart) {
    throw new ShopifyError('Error removing from cart', res.data?.cartLinesRemove?.userErrors);
  }

  return reshapeCart(res.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: Array<{
    id: string;
    merchandiseId: string;
    quantity: number;
  }>
): Promise<ShopifyCart> {
  const res = await shopifyFetch<CartLinesUpdateResponse>({
    query: updateCartMutation,
    variables: {
      cartId,
      lines: lines.map((line) => ({
        id: line.id,
        merchandiseId: line.merchandiseId,
        quantity: line.quantity,
      })),
    },
    cache: 'no-store',
  });

  if (res.data?.cartLinesUpdate?.userErrors?.length || !res.data?.cartLinesUpdate?.cart) {
    throw new ShopifyError('Error updating cart', res.data?.cartLinesUpdate?.userErrors);
  }

  return reshapeCart(res.data.cartLinesUpdate.cart);
}

export async function getCart(cartId: string): Promise<ShopifyCart | undefined> {
  const res = await shopifyFetch<CartQueryResponse>({
    query: getCartQuery,
    variables: { cartId },
    cache: 'no-store',
  });

  return res.data?.cart ? reshapeCart(res.data.cart) : undefined;
}

// Mock data for development when Shopify isn't available
export const mockProducts: ShopifyProduct[] = [
  {
    id: 'gid://shopify/Product/1',
    handle: 'classic-manicure',
    title: 'Classic Manicure Set',
    description: 'Professional nail care with classic polish application. Perfect for everyday elegance.',
    descriptionHtml: '<p>Professional nail care with classic polish application. Perfect for everyday elegance.</p>',
    availableForSale: true,
    totalInventory: 100,
    tags: ['manicure', 'classic', 'professional'],
    vendor: 'Demo Brand',
    productType: 'Nail Care',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop',
        altText: 'Classic manicure set',
        width: 800,
        height: 600,
      },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/1',
        title: 'Default Title',
        availableForSale: true,
        selectedOptions: [],
        price: { amount: '35.00', currencyCode: 'USD' },
      },
    ],
    options: [],
    priceRange: {
      minVariantPrice: { amount: '35.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '35.00', currencyCode: 'USD' },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '0.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '0.00', currencyCode: 'USD' },
    },
    seo: {
      title: 'Classic Manicure Set - Professional Nail Care',
      description: 'Professional nail care with classic polish application. Perfect for everyday elegance.',
    },
  },
  // Add more mock products here...
];

export const mockCollections: ShopifyCollection[] = [
  {
    id: 'gid://shopify/Collection/1',
    handle: 'featured-nails',
    title: 'Featured Nails',
    description: 'Our most popular nail designs and collections',
    descriptionHtml: '<p>Our most popular nail designs and collections</p>',
    image: {
      id: '1',
      url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop',
      altText: 'Featured nail collection',
    },
    seo: {
      title: 'Featured Nails Collection',
      description: 'Discover our most popular nail designs and collections',
    },
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Helper function to use mock data in development
export function useMockData() {
  return process.env.NODE_ENV === 'development' && !SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN.startsWith('shpat_');
}