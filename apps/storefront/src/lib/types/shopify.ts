export interface ShopifyImage {
  id: string;
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney;
  image?: ShopifyImage;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  totalInventory?: number;
  tags: string[];
  vendor: string;
  productType: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  images: ShopifyImage[];
  variants: ShopifyProductVariant[];
  options: {
    id: string;
    name: string;
    values: string[];
  }[];
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  seo: {
    title?: string;
    description?: string;
  };
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  image?: ShopifyImage;
  seo: {
    title?: string;
    description?: string;
  };
  updatedAt: string;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
    totalTaxAmount?: ShopifyMoney;
  };
  lines: ShopifyCartLine[];
  totalQuantity: number;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: ShopifyMoney;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Pick<ShopifyProduct, 'id' | 'handle' | 'title' | 'images'>;
  };
}

export interface ShopifyError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
}

export interface ShopifyResponse<T> {
  data?: T;
  errors?: ShopifyError[];
}

export interface ProductsQueryResponse {
  products: {
    edges: {
      node: ShopifyProduct;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string;
      endCursor?: string;
    };
  };
}

export interface CollectionsQueryResponse {
  collections: {
    edges: {
      node: ShopifyCollection;
    }[];
  };
}

export interface ProductQueryResponse {
  product?: ShopifyProduct;
}

export interface CollectionQueryResponse {
  collection?: ShopifyCollection & {
    products: {
      edges: {
        node: ShopifyProduct;
      }[];
      pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string;
        endCursor?: string;
      };
    };
  };
}

export interface CartQueryResponse {
  cart?: ShopifyCart;
}

export interface CartCreateResponse {
  cartCreate: {
    cart?: ShopifyCart;
    userErrors: Array<{
      field?: string[];
      message: string;
    }>;
  };
}

export interface CartLinesAddResponse {
  cartLinesAdd: {
    cart?: ShopifyCart;
    userErrors: Array<{
      field?: string[];
      message: string;
    }>;
  };
}

export interface CartLinesUpdateResponse {
  cartLinesUpdate: {
    cart?: ShopifyCart;
    userErrors: Array<{
      field?: string[];
      message: string;
    }>;
  };
}

export interface CartLinesRemoveResponse {
  cartLinesRemove: {
    cart?: ShopifyCart;
    userErrors: Array<{
      field?: string[];
      message: string;
    }>;
  };
}