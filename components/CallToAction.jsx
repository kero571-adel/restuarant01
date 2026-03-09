"use client";

import { useState } from "react";

export default function CallToAction() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 px-4 bg-black overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Main CTA Container */}
        <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-red-600 to-red-700 p-12 md:p-16">
          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500 rounded-full opacity-20" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-400 rounded-full opacity-20" />

          {/* Content */}
          <div className="relative z-10 text-center text-white">
            {/* Main Heading */}
            <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              Ready for the Best Chicken?
            </h2>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Order now and get your food delivered hot and fresh. Join
              thousands of happy customers!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="px-8 py-4 bg-white text-red-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
                Order on App
              </button>
              <button className="px-8 py-4 bg-yellow-400 text-black font-bold text-lg rounded-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
                Call (555) 123-4567
              </button>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-sm mb-4">Get exclusive deals and updates</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-2 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  type="submit"
                  className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 transform ${
                    subscribed
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 text-black hover:scale-105 active:scale-95"
                  }`}
                >
                  {subscribed ? "✓" : "Sign Up"}
                </button>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚚</span>
                <span>Free Delivery Over $25</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⏱️</span>
                <span>30 Min Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">💳</span>
                <span>All Payment Methods</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
