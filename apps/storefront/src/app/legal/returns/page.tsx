import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns & Exchanges | Demo Brand',
  description: 'Learn about our return and exchange policy, including how to return items and get refunds.',
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8">Returns & Exchanges</h1>
          
          <div className="prose max-w-none">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">30-Day Return Policy</h2>
              <p className="text-blue-700">
                We offer a 30-day return policy on all unused items in original packaging.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Return Eligibility</h2>
              <p className="text-light-text mb-4">
                To be eligible for a return, your item must be:
              </p>
              <ul className="list-disc list-inside text-light-text space-y-2 mb-4">
                <li>Unused and in the same condition that you received it</li>
                <li>In the original packaging</li>
                <li>Returned within 30 days of purchase</li>
                <li>Accompanied by the original receipt or proof of purchase</li>
              </ul>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Please Note:</h3>
                <p className="text-yellow-700 text-sm">
                  For hygiene reasons, nail products that have been opened or used cannot be returned unless defective.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">How to Return an Item</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Contact Us</h3>
                    <p className="text-light-text">
                      Email us at returns@demobrand.com or call (555) 123-4567 to initiate your return.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Get Return Authorization</h3>
                    <p className="text-light-text">
                      We'll provide you with a Return Authorization (RA) number and return shipping label.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Package Your Return</h3>
                    <p className="text-light-text">
                      Securely package the item(s) with the RA number clearly marked on the outside.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Ship Your Return</h3>
                    <p className="text-light-text">
                      Drop off at any authorized shipping location using the provided return label.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Refunds</h2>
              <p className="text-light-text mb-4">
                Once we receive and inspect your return, we will send you an email to notify you of the approval or rejection of your refund.
              </p>
              <p className="text-light-text mb-4">
                If approved, your refund will be processed and a credit will automatically be applied to your original method of payment within 5-7 business days.
              </p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Refund Timeline:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Credit cards: 5-7 business days</li>
                  <li>• PayPal: 3-5 business days</li>
                  <li>• Store credit: Immediate</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Exchanges</h2>
              <p className="text-light-text mb-4">
                We only replace items if they are defective or damaged. If you need to exchange an item for the same product, please contact us at exchanges@demobrand.com.
              </p>
              <p className="text-light-text mb-4">
                For size or color changes, please return the original item and place a new order.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Return Shipping</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Defective/Wrong Item</h3>
                  <p className="text-sm text-light-text">We cover return shipping costs</p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Change of Mind</h3>
                  <p className="text-sm text-light-text">Customer covers return shipping costs</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Non-Returnable Items</h2>
              <ul className="list-disc list-inside text-light-text space-y-2">
                <li>Gift cards</li>
                <li>Downloadable software products</li>
                <li>Health and personal care items (unless defective)</li>
                <li>Items damaged by misuse</li>
              </ul>
            </section>

            <section className="bg-accent rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Need Help?</h3>
              <p className="text-light-text mb-3">
                Our customer service team is here to help make your return as easy as possible.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-light-text">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:returns@demobrand.com" className="text-primary hover:underline">
                    returns@demobrand.com
                  </a>
                </p>
                <p className="text-light-text">
                  <strong>Phone:</strong> (555) 123-4567
                </p>
                <p className="text-light-text">
                  <strong>Hours:</strong> Monday - Friday, 9AM - 6PM EST
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}