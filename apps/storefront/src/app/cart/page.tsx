'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCartStore, formatMoney, isEligibleForFreeShipping, getRemainingForFreeShipping } from '@/lib/stores/cart';
import type { Metadata } from 'next';

export default function CartPage() {
  const { 
    cart, 
    isLoading, 
    error, 
    removeItem, 
    updateItem, 
    getTotalItems, 
    getSubtotal, 
    checkoutUrl, 
    clearError 
  } = useCartStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (error) {
      clearError();
    }
  }, [error, clearError]);

  if (!mounted) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container">
          <div className="text-center">Loading cart...</div>
        </div>
      </div>
    );
  }

  const totalItems = getTotalItems();
  const subtotal = getSubtotal();
  const isEligible = isEligibleForFreeShipping(subtotal);
  const remainingForFreeShipping = getRemainingForFreeShipping(subtotal);

  if (totalItems === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-24 h-24 mx-auto mb-8 bg-accent rounded-full flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-light-text rounded-full" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-4">Your cart is empty</h1>
            <p className="text-light-text mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleQuantityChange = async (lineId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItem(lineId);
    } else {
      await updateItem(lineId, newQuantity);
    }
  };

  const handleCheckout = () => {
    const url = checkoutUrl();
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Shopping Cart</h1>
            <p className="text-light-text">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          {/* Free Shipping Progress */}
          {!isEligible && (
            <div className="bg-accent rounded-lg p-4 mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text">
                  Add {formatMoney(remainingForFreeShipping.toString())} more for FREE shipping!
                </span>
                <span className="text-sm text-light-text">
                  {formatMoney(subtotal)} / {formatMoney('79')}
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((parseFloat(subtotal) / 79) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart?.lines.map((line) => (
                  <div
                    key={line.id}
                    className="bg-white rounded-lg border border-border p-6"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-20 h-20 bg-accent rounded-lg overflow-hidden">
                        {line.merchandise.product.images[0] && (
                          <Image
                            src={line.merchandise.product.images[0].url}
                            alt={line.merchandise.product.images[0].altText || line.merchandise.product.title}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <Link
                          href={`/products/${line.merchandise.product.handle}`}
                          className="font-semibold text-primary hover:text-light-text transition-colors"
                        >
                          {line.merchandise.product.title}
                        </Link>
                        
                        {line.merchandise.selectedOptions.length > 0 && (
                          <div className="text-sm text-light-text mt-1">
                            {line.merchandise.selectedOptions.map((option, index) => (
                              <span key={option.name}>
                                {option.value}
                                {index < line.merchandise.selectedOptions.length - 1 && ', '}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(line.id, line.quantity - 1)}
                              disabled={isLoading}
                              className="p-1 rounded-full border border-border hover:bg-accent transition-colors disabled:opacity-50"
                            >
                              <MinusIcon className="w-4 h-4" />
                            </button>
                            
                            <span className="w-12 text-center font-medium">
                              {line.quantity}
                            </span>
                            
                            <button
                              onClick={() => handleQuantityChange(line.id, line.quantity + 1)}
                              disabled={isLoading}
                              className="p-1 rounded-full border border-border hover:bg-accent transition-colors disabled:opacity-50"
                            >
                              <PlusIcon className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price and Remove */}
                          <div className="flex items-center space-x-4">
                            <span className="font-bold text-primary">
                              {formatMoney(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                            </span>
                            
                            <button
                              onClick={() => removeItem(line.id)}
                              disabled={isLoading}
                              className="p-2 text-light-text hover:text-red-500 transition-colors disabled:opacity-50"
                              aria-label="Remove item"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-accent rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-primary mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-text">Subtotal ({totalItems} items)</span>
                    <span className="font-medium">{formatMoney(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-text">Shipping</span>
                    <span className="font-medium">
                      {isEligible ? 'Free' : 'Calculated at checkout'}
                    </span>
                  </div>
                  
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-primary">Total</span>
                      <span className="text-lg font-bold text-primary">
                        {formatMoney(cart?.cost.totalAmount.amount || subtotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isLoading || !checkoutUrl()}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                </button>

                <div className="mt-4 text-center">
                  <Link
                    href="/"
                    className="text-sm text-light-text hover:text-primary transition-colors"
                  >
                    ← Continue Shopping
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="mt-6 text-center text-xs text-light-text">
                  <div className="flex items-center justify-center space-x-1">
                    <span>🔒</span>
                    <span>Secure checkout powered by Shopify</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}