"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function SpecialOffer() {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleOrderNow = () => {
    // Add the family bucket offer to cart
    addToCart({
      id: "family-bucket-offer",
      name: "Family Bucket Deal",
      price: 34.99,
      image:
        "https://images.unsplash.com/photo-1585238341710-4913ee1acf1f?w=500&h=500&fit=crop",
    });

    // Show confirmation feedback
    setIsAdded(true);

    // Reset button state after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <section className="py-20 px-4 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main Banner */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1585238341710-4913ee1acf1f?w=1200&h=600&fit=crop)",
            }}
          >
            <div className="absolute inset-0 bg-black/70" />
          </div>

          {/* Content */}
          <div className="relative z-10 py-16 md:py-24 px-8 md:px-16 text-center text-white">
            {/* Badge */}
            <div className="inline-block mb-6 px-4 py-2 bg-yellow-400 text-black rounded-full text-sm font-bold">
              ⏰ Limited Time Offer
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              20% OFF
            </h2>

            {/* Subtitle */}
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">
              Family Bucket Deal
            </h3>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Get a delicious 12-piece family bucket with sides and drinks at an
              incredible price. Perfect for family gatherings!
            </p>

            {/* Offer Details */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl font-black text-yellow-400">12</div>
                <div className="text-sm text-gray-300">Pieces</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl font-black text-yellow-400">2</div>
                <div className="text-sm text-gray-300">Sides</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl font-black text-yellow-400">2</div>
                <div className="text-sm text-gray-300">Drinks</div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleOrderNow}
              className={`px-12 py-4 font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg inline-block ${
                isAdded
                  ? "bg-green-500 text-white"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
              aria-label="Add Family Bucket Deal to cart"
            >
              {isAdded ? "✓ Added to Cart" : "Order Now - Only $34.99"}
            </button>

            {/* Expiry Text */}
            <p className="text-sm text-gray-400 mt-6">
              Valid until March 31, 2026 | Dine-in & Delivery
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-yellow {
          0%,
          100% {
            text-shadow: 0 0 10px rgba(250, 204, 21, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(250, 204, 21, 0.8);
          }
        }
      `}</style>
    </section>
  );
}
