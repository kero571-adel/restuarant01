"use client";

import { useState } from "react";
import Link from "next/link";
import FoodCard from "@/components/FoodCard";
import ImagePreviewModal from "@/components/ImagePreviewModal";
import { useImagePreview } from "@/hooks/useImagePreview";
import { menuData } from "@/data/menu";
import { motion } from "framer-motion";

export default function MenuClient() {
  const [activeCategory, setActiveCategory] = useState(0);
  const { isOpen, selectedImage, openPreview, closePreview } =
    useImagePreview();

  const currentCategory = menuData[activeCategory];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-600 to-red-500 text-white py-8 md:py-12 px-4 md:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2">
            🍗 Crunchy <span className="text-yellow-300">Bite</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90">
            Crispy. Delicious. Unforgettable.
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Sticky Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-14 sm:top-16 z-40 bg-white/95 backdrop-blur-md shadow-lg rounded-xl md:rounded-2xl p-3 md:p-4 mb-8 md:mb-12 transform transition-all duration-300 overflow-x-auto"
        >
          <div className="flex gap-2 md:gap-3 pb-1">
            {menuData.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-xs sm:text-sm md:text-base whitespace-nowrap transition-all duration-300 transform flex-shrink-0 ${
                  activeCategory === index
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {category.category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Category Header with Animation */}
        <motion.div
          key={`category-${activeCategory}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex items-center gap-4 mb-3 md:mb-4">
            <div className="h-1 w-10 md:w-12 bg-gradient-to-r from-red-600 to-red-400 rounded-full" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800">
              {currentCategory.category}
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Discover our delicious selection of{" "}
            <span className="text-red-600 font-bold">
              {currentCategory.category.toLowerCase()}
            </span>
          </p>
        </motion.div>

        {/* Food Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={`grid-${activeCategory}`}
        >
          {currentCategory.items.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <FoodCard
                item={item}
                onImageClick={() => openPreview(item.image, item.name)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-center bg-gradient-to-r from-red-50 to-yellow-50 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 border-2 border-red-200"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 mb-3 md:mb-4">
            Ready to Order?
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 md:mb-6">
            Add your favorite items and proceed to checkout
          </p>
          <Link href="/cart">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-sm md:text-lg hover:shadow-lg transition-all duration-300 shadow-lg"
            >
              View Cart →
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        isOpen={isOpen}
        imageUrl={selectedImage?.url}
        imageName={selectedImage?.name}
        onClose={closePreview}
      />

      <style jsx>{`
        ::-webkit-scrollbar {
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
      `}</style>
    </div>
  );
}
