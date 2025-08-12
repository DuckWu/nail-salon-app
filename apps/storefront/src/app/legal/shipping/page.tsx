import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Information | Demo Brand',
  description: 'Learn about our shipping policies, delivery times, and shipping rates.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8">Shipping Information</h1>
          
          <div className="prose max-w-none">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-green-800 mb-2">Free Shipping</h2>
              <p className="text-green-700">
                Enjoy free standard shipping on all orders over $79. No promo code needed!
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Shipping Methods & Times</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Standard Shipping</h3>
                  <p className="text-light-text mb-2">5-7 business days</p>
                  <p className="font-medium">Free on orders $79+, otherwise $5.99</p>
                </div>
                
                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Express Shipping</h3>
                  <p className="text-light-text mb-2">2-3 business days</p>
                  <p className="font-medium">$12.99</p>
                </div>
                
                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Overnight Shipping</h3>
                  <p className="text-light-text mb-2">1 business day</p>
                  <p className="font-medium">$24.99</p>
                </div>
                
                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">International</h3>
                  <p className="text-light-text mb-2">7-14 business days</p>
                  <p className="font-medium">Starting at $15.99</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Processing Time</h2>
              <p className="text-light-text mb-4">
                All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.
              </p>
              <p className="text-light-text mb-4">
                If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Shipping Destinations</h2>
              <p className="text-light-text mb-4">
                We currently ship to all 50 US states, Puerto Rico, and select international destinations including:
              </p>
              <ul className="list-disc list-inside text-light-text mb-4 space-y-1">
                <li>Canada</li>
                <li>United Kingdom</li>
                <li>Australia</li>
                <li>European Union</li>
                <li>Japan</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Order Tracking</h2>
              <p className="text-light-text mb-4">
                Once your order has shipped, you will receive an email with tracking information. You can track your package using the provided tracking number.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Shipping Restrictions</h2>
              <ul className="list-disc list-inside text-light-text space-y-2">
                <li>We cannot ship to P.O. boxes</li>
                <li>Some products may have shipping restrictions to certain locations</li>
                <li>International orders may be subject to customs fees and duties</li>
                <li>We are not responsible for delays caused by customs</li>
              </ul>
            </section>

            <section className="bg-accent rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Questions?</h3>
              <p className="text-light-text">
                If you have any questions about shipping, please contact our customer service team at{' '}
                <a href="mailto:support@demobrand.com" className="text-primary hover:underline">
                  support@demobrand.com
                </a>{' '}
                or call us at (555) 123-4567.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}