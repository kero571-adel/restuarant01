"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function CartClient() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading your cart...</div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-black mb-2">
            Your <span className="text-red-600">Cart</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {cart.length === 0
              ? "Your cart is empty"
              : `${cart.length} item(s) in your cart`}
          </p>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 md:py-16"
          >
            <div className="text-5xl md:text-6xl mb-4">🛒</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8 px-4">
              Add some delicious items to get started!
            </p>
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 md:px-8 py-3 md:py-4 bg-red-600 text-white font-bold text-sm md:text-lg rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg"
              >
                Browse Menu
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Cart Items */}
            <motion.section
              className="lg:col-span-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              aria-label="Shopping cart items"
            >
              <div className="space-y-3 md:space-y-4">
                {cart.map((item, index) => (
                  <motion.article
                    key={item.id}
                    variants={itemVariants}
                    className="bg-white rounded-lg md:rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 p-4 md:p-6">
                      {/* Image */}
                      <div className="w-full sm:w-24 sm:h-24 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                        <img
                          src={item.image}
                          alt={
                            item.description
                              ? `${item.name} - ${item.description}`
                              : item.name
                          }
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/96?text=No+Image";
                          }}
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <h3 className="text-base md:text-lg font-bold text-black mb-1">
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <p className="text-xl md:text-2xl font-bold text-red-600">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity & Remove */}
                      <div className="flex flex-col items-end justify-between gap-3 md:gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              updateQuantity(item.id, (item.quantity || 1) - 1)
                            }
                            className="w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            −
                          </motion.button>
                          <span className="w-8 text-center font-bold text-black text-sm">
                            {item.quantity || 1}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              updateQuantity(item.id, (item.quantity || 1) + 1)
                            }
                            className="w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </motion.button>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 font-bold text-xs md:text-sm transition-colors"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          Remove
                        </motion.button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="bg-gray-50 px-4 md:px-6 py-2 md:py-3 flex justify-between items-center border-t border-gray-200">
                      <span className="text-gray-600 font-semibold text-sm md:text-base">
                        Subtotal:
                      </span>
                      <span className="text-lg md:text-xl font-bold text-red-600">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.section>

            {/* Order Summary */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
              aria-label="Order summary"
            >
              <div className="sticky top-20 bg-white rounded-lg md:rounded-2xl shadow-lg md:shadow-xl p-6 md:p-8">
                <h2 className="text-lg md:text-2xl font-black text-black mb-4 md:mb-6">
                  Order Summary
                </h2>

                {/* Summary Items */}
                <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 pb-4 md:pb-6 border-b-2 border-gray-200">
                  <div className="flex justify-between text-gray-700 text-sm md:text-base">
                    <span>Subtotal</span>
                    <span className="font-bold">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700 text-sm md:text-base">
                    <span>Delivery Fee</span>
                    <span className="font-bold">$2.99</span>
                  </div>
                  <div className="flex justify-between text-gray-700 text-sm md:text-base">
                    <span>Tax</span>
                    <span className="font-bold">
                      ${((getTotalPrice() + 2.99) * 0.08).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <span className="text-base md:text-lg font-bold text-black">
                    Total
                  </span>
                  <span className="text-2xl md:text-3xl font-black text-red-600">
                    $
                    {(
                      getTotalPrice() +
                      2.99 +
                      (getTotalPrice() + 2.99) * 0.08
                    ).toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 md:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-sm md:text-lg rounded-lg transition-all duration-300 shadow-lg mb-3 md:mb-4"
                  >
                    Proceed to Checkout
                  </motion.button>
                </Link>

                {/* Continue Shopping */}
                <Link href="/menu">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 md:py-3 bg-gray-200 hover:bg-gray-300 text-black font-bold text-sm md:text-base rounded-lg transition-all duration-300 mb-3 md:mb-4"
                  >
                    Continue Shopping
                  </motion.button>
                </Link>

                {/* Clear Cart */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearCart}
                  className="w-full py-2 text-red-600 hover:text-red-700 font-semibold text-xs md:text-sm transition-colors"
                  aria-label="Clear all items from cart"
                >
                  Clear Cart
                </motion.button>
              </div>
            </motion.aside>
          </div>
        )}
      </div>
    </main>
  );
}
