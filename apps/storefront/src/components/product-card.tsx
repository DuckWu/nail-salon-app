'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShopifyProduct } from '@/lib/types/shopify';
import { formatMoney } from '@/lib/stores/cart';

interface ProductCardProps {
  product: ShopifyProduct;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = product.images;
  const hasMultipleImages = images.length > 1;
  const currentImage = images[imageIndex] || images[0];
  const hoverImage = hasMultipleImages ? images[1] : currentImage;

  const displayImage = isHovered && hasMultipleImages ? hoverImage : currentImage;

  const minPrice = product.priceRange.minVariantPrice;
  const maxPrice = product.priceRange.maxVariantPrice;
  const compareAtMinPrice = product.compareAtPriceRange.minVariantPrice;
  
  const hasVariablePricing = minPrice.amount !== maxPrice.amount;
  const isOnSale = parseFloat(compareAtMinPrice.amount) > parseFloat(minPrice.amount);

  const priceDisplay = hasVariablePricing 
    ? `From ${formatMoney(minPrice.amount, minPrice.currencyCode)}`
    : formatMoney(minPrice.amount, minPrice.currencyCode);

  return (
    <div className="group">
      <Link href={`/products/${product.handle}`}>
        <div
          className="relative aspect-[4/3] bg-accent rounded-lg overflow-hidden mb-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {displayImage && (
            <Image
              src={displayImage.url}
              alt={displayImage.altText || product.title}
              fill
              className="object-cover transition-opacity duration-300"
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          )}
          
          {/* Sale Badge */}
          {isOnSale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
              Sale
            </div>
          )}

          {/* Out of Stock Overlay */}
          {!product.availableForSale && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}

          {/* Image Indicators */}
          {hasMultipleImages && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.slice(0, 4).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === imageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setImageIndex(index);
                  }}
                  onMouseEnter={() => setImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-1">
        <Link href={`/products/${product.handle}`}>
          <h3 className="font-semibold text-text group-hover:text-primary transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        {product.vendor && (
          <p className="text-sm text-light-text">{product.vendor}</p>
        )}

        <div className="flex items-center space-x-2">
          <span className="font-bold text-primary">
            {priceDisplay}
          </span>
          
          {isOnSale && (
            <span className="text-sm text-light-text line-through">
              {formatMoney(compareAtMinPrice.amount, compareAtMinPrice.currencyCode)}
            </span>
          )}
        </div>

        {/* Product Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-accent text-text px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}