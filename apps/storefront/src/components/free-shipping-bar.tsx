'use client';

import { useCartStore, isEligibleForFreeShipping, getRemainingForFreeShipping, formatMoney } from '@/lib/stores/cart';

export default function FreeShippingBar() {
  const { getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const isEligible = isEligibleForFreeShipping(subtotal);
  const remaining = getRemainingForFreeShipping(subtotal);
  const progress = Math.min((parseFloat(subtotal) / 79) * 100, 100);

  if (isEligible) {
    return (
      <div className="bg-green-600 text-white py-2 text-center text-sm font-medium">
        🎉 You qualify for FREE shipping!
      </div>
    );
  }

  return (
    <div className="bg-accent border-b border-border py-3">
      <div className="container mx-auto px-5">
        <div className="text-center">
          <p className="text-sm text-text mb-2">
            Add <strong>{formatMoney(remaining.toString())}</strong> more for FREE shipping!
          </p>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}