"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { CardSkeletonGrid } from "@/components/SkeletonLoader";

export default function BestSellers() {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState({});
  const [mounted, setMounted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const bestSellers = [
    {
      id: 1,
      name: "6 Piece Combo",
      price: 18.99,
      image: "/pestSeller/Whisk_5d62b49abd263d2b6c742ab26a84da7adr.jpeg",
      tag: "Best Seller",
      description:
        "Six crispy fried chicken pieces with our signature seasoning",
    },
    {
      id: 2,
      name: "Spicy Wings (8 pcs)",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=500&fit=crop",
      tag: "Spicy",
      description: "Eight succulent wings with fiery spice blend",
    },
    {
      id: 3,
      name: "Crispy Tenders",
      price: 11.99,
      image: "/pestSeller/Whisk_22c767cf7848f8e82c340c4867d5e97fdr.jpeg",
      tag: "Family Favorite",
      description: "Golden crispy chicken strips perfect for sharing",
    },
    {
      id: 4,
      name: "Classic Burger",
      price: 10.99,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop",
      tag: "Premium",
      description: "Crispy fried chicken burger with fresh toppings",
    },
  ];

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });

    setJustAdded((prev) => ({
      ...prev,
      [item.id]: true,
    }));

    setTimeout(() => {
      setJustAdded((prev) => {
        const updated = { ...prev };
        delete updated[item.id];
        return updated;
      });
    }, 2000);
  };

  const handleImageLoad = (itemId) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [itemId]: true,
    }));
  };

  if (!mounted) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse" />
          </div>
          <CardSkeletonGrid count={4} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            Our <span className="text-red-600">Best Sellers</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Try our most loved menu items that keep customers coming back
          </p>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-6" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((item, index) => (
           <div
           key={item.id}
           className="group h-full card-animate"
           style={{
             animation: `slideIn 0.6s ease-out ${index * 0.15}s forwards`,
           }}
         >
              {/* Card Container */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  {/* Skeleton while loading */}
                  {!imagesLoaded[item.id] && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
                  )}
                  <img
                    src={item.image}
                    alt={`${item.name} - ${item.description}`}
                    loading="lazy"
                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                      imagesLoaded[item.id] ? "fade-in" : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(item.id)}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300?text=Food+Image";
                      handleImageLoad(item.id);
                    }}
                  />
                  {/* Tag Badge */}
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {item.tag}
                  </div>
                  {/* Dark Overlay on Hover */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>

                {/* Content Container */}
                <div className="p-5 flex flex-col grow">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 grow">
                    {item.description}
                  </p>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-2xl font-black text-red-600">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 transform ${
                        justAdded[item.id]
                          ? "bg-green-500 text-white scale-105"
                          : "bg-red-600 text-white hover:bg-red-700 active:scale-95"
                      } ${isMobile ? "" : "hover:scale-105"}`}
                      aria-label={`Add ${item.name} to cart`}
                    >
                      {justAdded[item.id] ? "✓ Added" : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
