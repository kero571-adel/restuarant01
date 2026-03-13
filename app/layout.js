import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Crunchy Bite - Premium Fried Chicken Restaurant",
  description:
    "Discover the crispiest fried chicken in town. Fresh ingredients, secret recipe, and fast service. Order online today from Crunchy Bite!",
  keywords:
    "fried chicken, chicken restaurant, crispy chicken, fast food, chicken burgers, chicken wraps, delivery",
  openGraph: {
    title: "Crunchy Bite - Premium Fried Chicken Restaurant",
    description:
      "Experience the crispiest fried chicken made with fresh ingredients and our secret recipe.",
    url: "https://crunchybite.com",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1626082927389-6cd097cdc46e?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Crunchy Bite Fried Chicken",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crunchy Bite - Premium Fried Chicken",
    description: "The crispiest chicken in town",
    images: [
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc46e?w=1200&h=630&fit=crop",
    ],
  },
  viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://crunchybite.com" />
        {/* Performance: Preconnect to external domains */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Optimize font loading if using web fonts */}
        <link
          rel="preload"
          as="image"
          href="/menu/Buffalo_chicken_burger_with_sauce_011a251f9a.jpeg"
        />
      </head>
      <body>
        <CartProvider>
          <Navbar />
          <main className="pt-14 sm:pt-16">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
