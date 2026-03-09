"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

export default function FoodCard({ item, onImageClick }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    addToCart(item);
    setIsAdded(true);
    setShowNotification(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);

    setTimeout(() => {
      setShowNotification(false);
    }, 2500);
  };

  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick();
    }
  };

  return (
    <motion.div
      className="group relative h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Card container with lift effect */}
      <div className="h-full bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 md:group-hover:-translate-y-3">
        {/* Image container with overlay */}
        <div
          className="relative h-48 sm:h-56 bg-gray-200 cursor-pointer"
          onClick={handleImageClick}
        >
          <img
            src={item.image}
            alt={`${item.name} - ${item.description}`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

          {/* Preview Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg">
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7h4"
                />
              </svg>
            </div>
          </motion.div>

          {/* Quick Add Badge */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-2 md:bottom-4 right-2 md:right-4 bg-red-600 hover:bg-red-700 text-white p-2 md:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label={`Add ${item.name} to cart`}
          >
            <svg
              className="w-4 md:w-6 h-4 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </motion.button>
        </div>

        {/* Content container */}
        <div className="p-4 md:p-5 flex flex-col h-[calc(100%-12rem)] sm:h-[calc(100%-14rem)]">
          {/* Name */}
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 grow line-clamp-2">
            {item.description}
          </p>

          {/* Footer with price and button */}
          <div className="flex items-center justify-between mt-auto pt-3 md:pt-4 border-t border-gray-200 gap-2">
            <span className="text-xl md:text-2xl font-bold text-red-600">
              ${item.price.toFixed(2)}
            </span>
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition-all duration-300 transform ${
                isAdded
                  ? "bg-green-500 text-white"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
              aria-label={`Add ${item.name} to cart`}
            >
              {isAdded ? "✓ Added" : "Add"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Floating Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: -60, scale: 1 }}
          exit={{ opacity: 0, y: -80, scale: 0.8 }}
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full font-bold text-xs md:text-sm whitespace-nowrap shadow-lg"
          role="status"
          aria-live="polite"
        >
          ✓ Added to cart!
        </motion.div>
      )}
    </motion.div>
  );
}
