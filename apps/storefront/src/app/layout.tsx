import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FreeShippingBar from "@/components/free-shipping-bar";

export const metadata: Metadata = {
  title: "Demo Brand - Premium Nail Salon",
  description: "Professional nail services with expert craftsmanship and lasting quality. Handcrafted designs that stay perfect for weeks.",
  keywords: ["nail salon", "manicure", "nail art", "professional nails", "nail care"],
  authors: [{ name: "Demo Brand" }],
  creator: "Demo Brand",
  publisher: "Demo Brand",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Demo Brand - Premium Nail Salon",
    description: "Professional nail services with expert craftsmanship and lasting quality.",
    url: "https://demo-brand.com",
    siteName: "Demo Brand",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Demo Brand - Premium Nail Salon",
    description: "Professional nail services with expert craftsmanship and lasting quality.",
    creator: "@demobrand",
  },
  metadataBase: new URL("https://demo-brand.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <FreeShippingBar />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
