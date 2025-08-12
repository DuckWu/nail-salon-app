'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/lib/stores/cart';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Collections', href: '/collections' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { getTotalItems, initializeCart } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  return (
    <header className="fixed top-0 w-full bg-white z-50 shadow-custom">
      <nav className="flex justify-between items-center px-5 py-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="logo">
          <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            Demo Brand
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={clsx(
                  'text-text font-medium transition-colors hover:text-primary',
                  pathname === item.href && 'text-primary'
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Cart and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative p-2 text-text hover:text-primary transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingBagIcon className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-text hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-5 py-4">
            <ul className="space-y-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'block text-text font-medium transition-colors hover:text-primary',
                      pathname === item.href && 'text-primary'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}