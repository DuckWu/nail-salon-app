import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ShopifyCart, ShopifyCartLine } from '../types/shopify';
import { createCart, addToCart, removeFromCart, updateCart, getCart } from '../shopify';

interface CartState {
  cart: ShopifyCart | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  initializeCart: () => Promise<void>;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  clearError: () => void;
  
  // Getters
  getTotalItems: () => number;
  getSubtotal: () => string;
  checkoutUrl: () => string | null;
}

const FREE_SHIPPING_THRESHOLD = 79;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,
      error: null,

      initializeCart: async () => {
        const { cart } = get();
        
        // If we already have a cart, try to fetch its current state
        if (cart?.id) {
          try {
            set({ isLoading: true, error: null });
            const updatedCart = await getCart(cart.id);
            set({ cart: updatedCart || null, isLoading: false });
            return;
          } catch (error) {
            // If fetching fails, we'll create a new cart below
            console.warn('Failed to fetch existing cart, creating new one:', error);
          }
        }

        // Create a new cart if we don't have one or fetching failed
        try {
          set({ isLoading: true, error: null });
          const newCart = await createCart();
          set({ cart: newCart, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to create cart',
            isLoading: false 
          });
        }
      },

      addItem: async (merchandiseId: string, quantity = 1) => {
        const { cart } = get();
        
        try {
          set({ isLoading: true, error: null });
          
          if (!cart) {
            await get().initializeCart();
            const { cart: newCart } = get();
            if (!newCart) throw new Error('Failed to initialize cart');
            
            const updatedCart = await addToCart(newCart.id, [{ merchandiseId, quantity }]);
            set({ cart: updatedCart, isLoading: false });
          } else {
            const updatedCart = await addToCart(cart.id, [{ merchandiseId, quantity }]);
            set({ cart: updatedCart, isLoading: false });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to add item to cart',
            isLoading: false 
          });
        }
      },

      removeItem: async (lineId: string) => {
        const { cart } = get();
        if (!cart) return;

        try {
          set({ isLoading: true, error: null });
          const updatedCart = await removeFromCart(cart.id, [lineId]);
          set({ cart: updatedCart, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to remove item from cart',
            isLoading: false 
          });
        }
      },

      updateItem: async (lineId: string, quantity: number) => {
        const { cart } = get();
        if (!cart) return;

        // Find the cart line to get the merchandise ID
        const cartLine = cart.lines.find((line) => line.id === lineId);
        if (!cartLine) return;

        try {
          set({ isLoading: true, error: null });
          
          if (quantity <= 0) {
            // Remove the item if quantity is 0 or negative
            await get().removeItem(lineId);
          } else {
            const updatedCart = await updateCart(cart.id, [{
              id: lineId,
              merchandiseId: cartLine.merchandise.id,
              quantity,
            }]);
            set({ cart: updatedCart, isLoading: false });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update cart item',
            isLoading: false 
          });
        }
      },

      clearError: () => set({ error: null }),

      getTotalItems: () => {
        const { cart } = get();
        return cart?.totalQuantity || 0;
      },

      getSubtotal: () => {
        const { cart } = get();
        return cart?.cost?.subtotalAmount?.amount || '0.00';
      },

      checkoutUrl: () => {
        const { cart } = get();
        return cart?.checkoutUrl || null;
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

// Helper function to check if eligible for free shipping
export function isEligibleForFreeShipping(subtotal: string): boolean {
  return parseFloat(subtotal) >= FREE_SHIPPING_THRESHOLD;
}

// Helper function to calculate remaining amount for free shipping
export function getRemainingForFreeShipping(subtotal: string): number {
  const remaining = FREE_SHIPPING_THRESHOLD - parseFloat(subtotal);
  return Math.max(0, remaining);
}

// Helper function to format money
export function formatMoney(amount: string, currencyCode = 'USD'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  });
  return formatter.format(parseFloat(amount));
}