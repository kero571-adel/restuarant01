"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function OffersClient() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const offers = [
    {
      id: 1,
      title: "Tuesday Chicken Deal",
      description:
        "Get a full chicken bucket with sides on every Tuesday at an unbeatable price",
      discount: "35% OFF",
      originalPrice: "$25.99",
      dealPrice: "$16.99",
      image: "/offer/Whisk_670d9f4cf1db7c1a9a34dc6847d1c76fdr.jpeg",
      validity: "Every Tuesday",
      color: "bg-gradient-to-br from-red-500 to-red-600",
      textColor: "text-red-600",
      badge: "🔥 HOT DEAL",
    },
    {
      id: 2,
      title: "Family Bucket Discount",
      description:
        "Perfect for families! Bucket of 12 pieces + 4 sides + drinks included",
      discount: "40% OFF",
      originalPrice: "$49.99",
      dealPrice: "$29.99",
      image: "/offer/Whisk_89dc16b9294db33930e4e9a05955e7f0dr.jpeg",
      validity: "Valid all week",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
      textColor: "text-yellow-600",
      badge: "👨‍👩‍👧‍👦 FAMILY SPECIAL",
    },
    {
      id: 3,
      title: "Buy 1 Get 1 Burger",
      description:
        "Buy any gourmet chicken burger and get a second one absolutely free!",
      discount: "50% OFF",
      originalPrice: "$18.99",
      dealPrice: "$9.50",
      image: "/offer/Whisk_478f77c45a6102594dc41983e954d18fdr.jpeg",
      validity: "Weekend only (Fri-Sun)",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      textColor: "text-orange-600",
      badge: "🍔 BOGO SPECIAL",
    },
    {
      id: 4,
      title: "Weekend Special Combo",
      description:
        "3-piece combo with sides, drink, and dessert - perfect weekend treat",
      discount: "30% OFF",
      originalPrice: "$22.99",
      dealPrice: "$16.09",
      image: "/offer/Whisk_4e0b169fbe4f859ac21439724c2b2668dr.jpeg",
      validity: "Saturday & Sunday",
      color: "bg-gradient-to-br from-red-600 to-pink-600",
      textColor: "text-red-600",
      badge: "⭐ WEEKEND VIBES",
    },
    {
      id: 5,
      title: "Lunch Special Platter",
      description:
        "Limited-time lunch offer: 2-piece with drink and fries for lunch rush",
      discount: "25% OFF",
      originalPrice: "$12.99",
      dealPrice: "$9.74",
      image: "/offer/Whisk_cc02258c1f91785a04a489bc442e4460dr.jpeg",
      validity: "11 AM - 2 PM Daily",
      color: "bg-gradient-to-br from-yellow-500 to-orange-500",
      textColor: "text-yellow-600",
      badge: "☀️ LUNCH RUSH",
    },
    {
      id: 6,
      title: "Happy Hour Wings",
      description:
        "Crispy wings basket at half price during evening happy hour",
      discount: "50% OFF",
      originalPrice: "$14.99",
      dealPrice: "$7.50",
      image: "/offer/Whisk_969befe553e375988714ded798b50ae9dr.jpeg",
      validity: "4 PM - 6 PM Weekdays",
      color: "bg-gradient-to-br from-red-500 to-rose-600",
      textColor: "text-red-600",
      badge: "🌅 HAPPY HOUR",
    },
  ];

  const handleClaimDeal = (offer) => {
    setSelectedOffer(offer);
  };

  const handleAddDealToCart = () => {
    if (!selectedOffer) return;

    const dealItem = {
      id: `deal-${selectedOffer.id}`,
      name: selectedOffer.title,
      description: selectedOffer.description,
      price: parseFloat(selectedOffer.dealPrice.replace("$", "")),
      image: selectedOffer.image,
      quantity: 1,
    };

    addToCart(dealItem);
    setNotificationMessage(`✓ ${selectedOffer.title} added to cart!`);
    setShowNotification(true);
    setSelectedOffer(null);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleOrderNow = () => {
    router.push("/checkout");
  };

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-black flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1626082927389-6cd097cdc46e?w=1600&h=900&fit=crop)",
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-2 md:mb-4 leading-tight"
            style={{
              animation: "fadeInUp 1s ease-out forwards",
            }}
          >
            🎉 Exclusive Offers
          </h1>
          <p
            className="text-xs sm:text-sm md:text-lg lg:text-2xl text-yellow-300 font-bold max-w-2xl mx-auto"
            style={{
              animation: "fadeInUp 1s ease-out 0.2s forwards",
              opacity: 0,
            }}
          >
            Crunch into savings with our limited-time deals!
          </p>
        </div>
      </section>

      {/* Offers Grid Section */}
      <section className="py-8 md:py-16 lg:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-16">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 md:mb-4"
              style={{
                animation: "fadeInUp 0.8s ease-out forwards",
              }}
            >
              Don't Miss These <span className="text-red-500">Hot Deals</span>
            </h2>
            <p
              className="text-gray-300 text-xs sm:text-sm md:text-lg max-w-2xl mx-auto px-2"
              style={{
                animation: "fadeInUp 0.8s ease-out 0.2s forwards",
                opacity: 0,
              }}
            >
              Limited time offers that will make your taste buds happy and your
              wallet happier!
            </p>
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {offers.map((offer, index) => (
              <div
                key={offer.id}
                className="group"
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.1}s forwards`,
                  opacity: 0,
                }}
              >
                {/* Card Container */}
                <div className="relative h-full bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1 md:group-hover:-translate-y-2 transform hover:scale-100 md:hover:scale-105 cursor-pointer">
                  {/* Image Container */}
                  <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-gray-300">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Badge */}
                    <div
                      className={`absolute top-2 md:top-4 right-2 md:right-4 ${offer.color} text-white px-2 md:px-4 py-1 md:py-2 rounded-full font-bold text-xs md:text-sm shadow-lg`}
                    >
                      {offer.badge}
                    </div>

                    {/* Discount Badge */}
                    <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-red-600 text-white px-2 md:px-4 py-1 md:py-2 rounded-full font-black text-xs md:text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      {offer.discount}
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-3 md:p-4 lg:p-6 flex flex-col h-[calc(100%-10rem)] sm:h-[calc(100%-12rem)] md:h-[calc(100%-14rem)]">
                    {/* Title */}
                    <h3
                      className={`text-base md:text-lg lg:text-2xl font-black mb-2 ${offer.textColor} group-hover:text-red-700 transition-colors line-clamp-2`}
                    >
                      {offer.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-4 flex-grow line-clamp-3">
                      {offer.description}
                    </p>

                    {/* Validity */}
                    <p className="text-xs text-gray-500 mb-3 md:mb-4 flex items-center gap-2">
                      <span>📅</span>
                      <span className="line-clamp-1">{offer.validity}</span>
                    </p>

                    {/* Price Section */}
                    <div className="border-t-2 border-gray-200 pt-2 md:pt-4 flex items-center justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-gray-500 line-through text-xs">
                          {offer.originalPrice}
                        </p>
                        <p className="text-lg md:text-2xl lg:text-3xl font-black text-red-600">
                          {offer.dealPrice}
                        </p>
                      </div>
                      <button
                        onClick={() => handleClaimDeal(offer)}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-2 md:px-4 py-1.5 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-sm shadow-lg transform group-hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer whitespace-nowrap"
                        aria-label={`Claim ${offer.title} deal`}
                      >
                        Claim
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Banner */}
      <section className="py-8 md:py-12 lg:py-16 px-4 md:px-8 bg-gradient-to-r from-red-700 to-red-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4">
            ⏰ Hurry! Limited Time Offers
          </h3>
          <p className="text-xs md:text-base lg:text-lg mb-4 md:mb-6 text-red-100 px-2">
            Valid while supplies last. Cannot be combined with other offers.
            Terms and conditions apply.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center px-2">
            <button
              onClick={handleOrderNow}
              className="px-4 md:px-8 py-2 md:py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg cursor-pointer text-xs md:text-base"
            >
              Order Now
            </button>
            <Link href="/menu">
              <button className="px-4 md:px-8 py-2 md:py-4 bg-red-900 text-white font-bold rounded-lg hover:bg-red-950 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg border-2 border-yellow-400 cursor-pointer text-xs md:text-base w-full sm:w-auto">
                View All Menu
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info Section - Responsive Grid */}
      <section className="py-8 md:py-12 lg:py-16 px-4 md:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div className="text-center text-white bg-red-600 rounded-lg md:rounded-xl p-4 md:p-6 lg:p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-4">
                🚀
              </div>
              <h4 className="text-base md:text-lg lg:text-xl font-bold mb-1 md:mb-2">
                Fast Delivery
              </h4>
              <p className="text-red-100 text-xs md:text-sm lg:text-base">
                Get your favorite deals delivered hot & fresh
              </p>
            </div>
            <div className="text-center text-white bg-yellow-600 rounded-lg md:rounded-xl p-4 md:p-6 lg:p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-4">
                💰
              </div>
              <h4 className="text-base md:text-lg lg:text-xl font-bold mb-1 md:mb-2">
                Best Prices
              </h4>
              <p className="text-yellow-100 text-xs md:text-sm lg:text-base">
                Unbeatable discounts on all our favorites
              </p>
            </div>
            <div className="text-center text-white bg-orange-600 rounded-lg md:rounded-xl p-4 md:p-6 lg:p-8 transform hover:scale-105 transition-transform duration-300 sm:col-span-2 lg:col-span-1">
              <div className="text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-4">
                ⭐
              </div>
              <h4 className="text-base md:text-lg lg:text-xl font-bold mb-1 md:mb-2">
                Quality Guaranteed
              </h4>
              <p className="text-orange-100 text-xs md:text-sm lg:text-base">
                Premium ingredients, always fresh & crispy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Offer Details */}
      {selectedOffer && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedOffer(null)}
          style={{
            animation: "fadeIn 0.3s ease-out forwards",
          }}
        >
          <div
            className="bg-white rounded-xl md:rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "slideUp 0.4s ease-out forwards",
            }}
          >
            {/* Modal Image */}
            <div className="relative h-40 md:h-48 overflow-hidden">
              <img
                src={selectedOffer.image}
                alt={selectedOffer.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedOffer(null)}
                className="absolute top-2 md:top-4 right-2 md:right-4 w-8 md:w-10 h-8 md:h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-all duration-300 shadow-lg cursor-pointer font-bold text-lg"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-start mb-3 md:mb-4 gap-2">
                <h3 className="text-lg md:text-2xl font-black text-black flex-1">
                  {selectedOffer.title}
                </h3>
                <div className="bg-red-600 text-white px-2 md:px-3 py-1 rounded-full font-bold text-xs md:text-sm whitespace-nowrap">
                  {selectedOffer.discount}
                </div>
              </div>

              <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">
                {selectedOffer.description}
              </p>

              <div className="bg-gray-100 p-3 md:p-4 rounded-lg mb-3 md:mb-4">
                <p className="text-gray-600 text-xs md:text-sm mb-1 md:mb-2">
                  Validity:
                </p>
                <p className="text-black font-bold text-xs md:text-base">
                  {selectedOffer.validity}
                </p>
              </div>

              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div>
                  <p className="text-gray-500 line-through text-xs md:text-sm">
                    {selectedOffer.originalPrice}
                  </p>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-black text-red-600">
                    {selectedOffer.dealPrice}
                  </p>
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl">
                  {selectedOffer.badge.split(" ")[0]}
                </div>
              </div>

              <button
                onClick={handleAddDealToCart}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 md:py-3 lg:py-4 rounded-lg font-bold text-xs md:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
                aria-label={`Add ${selectedOffer.title} to cart`}
              >
                Add to Cart - {selectedOffer.dealPrice}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {showNotification && (
        <div
          className="fixed bottom-4 right-4 bg-green-500 text-white px-4 md:px-6 py-2 md:py-4 rounded-lg shadow-lg max-w-sm z-40"
          style={{
            animation: "slideUp 0.3s ease-out forwards",
          }}
        >
          <p className="font-semibold text-xs md:text-sm lg:text-base">
            {notificationMessage}
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
