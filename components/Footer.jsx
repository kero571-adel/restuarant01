"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 lg:py-16">
        {/* Footer Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl sm:text-3xl">🍗</span>
              <h3 className="text-xl sm:text-2xl font-black">
                Crunchy <span className="text-red-600">Bite</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-6 text-xs sm:text-sm md:text-base leading-relaxed">
              The crispiest chicken in town, made with fresh ingredients and our
              secret recipe.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 sm:w-10 h-8 sm:h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer text-xs sm:text-base"
              >
                f
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 sm:w-10 h-8 sm:h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer text-xs sm:text-base"
              >
                📷
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-8 sm:w-10 h-8 sm:h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer text-xs sm:text-base"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-base sm:text-lg font-bold mb-3 md:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link
                  href="/menu"
                  className="text-gray-400 hover:text-red-600 transition-colors text-xs sm:text-sm md:text-base"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-red-600 transition-colors text-xs sm:text-sm md:text-base"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/offers"
                  className="text-gray-400 hover:text-red-600 transition-colors text-xs sm:text-sm md:text-base"
                >
                  Special Offers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-red-600 transition-colors text-xs sm:text-sm md:text-base"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="col-span-1">
            <h4 className="text-base sm:text-lg font-bold mb-3 md:mb-4">
              Info
            </h4>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-xs sm:text-sm md:text-base">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">📍</span>
                <span>123 Main Street, City</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">📞</span>
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">✉️</span>
                <span>hello@crunchybite.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">🕐</span>
                <span>Open Daily 11AM - 11PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h4 className="text-base sm:text-lg font-bold mb-3 md:mb-4">
              Newsletter
            </h4>
            <p className="text-gray-400 mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
              Subscribe to get updates on new offers
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 md:px-4 py-2 md:py-3 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 text-xs sm:text-sm md:text-base"
              />
              <button className="px-3 md:px-4 py-2 md:py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors cursor-pointer transform hover:scale-105 active:scale-95 text-xs sm:text-sm md:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 md:pt-8">
          {/* Bottom Info - Responsive Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              <p>© {currentYear} Crunchy Bite. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4 text-gray-400 text-xs sm:text-sm justify-center md:justify-end">
              <Link
                href="#privacy"
                className="hover:text-red-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#terms"
                className="hover:text-red-600 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-4 md:pt-6 border-t border-gray-800">
            <span className="text-gray-400 text-xs sm:text-sm">We accept:</span>
            <span className="text-sm sm:text-base">💳</span>
            <span className="text-sm sm:text-base">🏦</span>
            <span className="text-sm sm:text-base">📱</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
