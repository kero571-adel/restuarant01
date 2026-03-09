"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { getTotalItems, cart } = useCart();
  const [itemCount, setItemCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setItemCount(getTotalItems());
  }, [cart, getTotalItems]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Offers", href: "/offers" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href) => {
    return pathname === href;
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md shadow-lg border-b border-red-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <motion.span
              className="text-2xl sm:text-3xl font-black text-red-600"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              🍗
            </motion.span>
            <span className="text-lg sm:text-2xl font-black text-white hidden sm:inline">
              Crunchy <span className="text-red-600">Bite</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-semibold text-sm lg:text-base transition-all duration-300 relative group ${
                  isActive(item.href)
                    ? "text-red-600"
                    : "text-white hover:text-red-600"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right Section - Cart & CTA */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart Icon */}
            <Link href="/cart">
              <motion.div
                className="relative cursor-pointer p-1.5 sm:p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 sm:w-6 h-5 sm:h-6 text-white hover:text-red-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m10 0l2 9m-11-9h10m-10 0l4-8"
                  />
                </svg>

                {/* Cart Badge */}
                {mounted && itemCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </motion.div>
                )}
              </motion.div>
            </Link>

            {/* Order Now Button */}
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block px-4 sm:px-6 py-2 bg-red-600 text-white font-bold text-sm sm:text-base rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg"
              >
                Order Now
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-1 hover:bg-red-600 rounded transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-black/95 border-t border-red-600/30 py-3 px-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 text-sm transition-colors rounded ${
                  isActive(item.href)
                    ? "text-red-600 font-bold bg-black"
                    : "text-white hover:text-red-600 hover:bg-black"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/menu">
              <button className="w-full px-3 py-2 mt-3 bg-red-600 text-white font-bold text-sm rounded-lg hover:bg-red-700 transition-all duration-300">
                Order Now
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
