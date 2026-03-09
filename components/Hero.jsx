"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation sequence: foods appear and rotate, then content fades in
  const foodLeftVariants = {
    hidden: { x: -400, rotate: -180, opacity: 0 },
    visible: {
      x: -80,
      rotate: 360,
      opacity: 1,
      transition: {
        duration: 1.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 50,
      },
    },
  };

  const foodRightVariants = {
    hidden: { x: 400, rotate: 180, opacity: 0 },
    visible: {
      x: 80,
      rotate: -360,
      opacity: 1,
      transition: {
        duration: 1.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 50,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative w-full min-h-screen md:h-screen overflow-hidden bg-black flex items-center justify-center px-4">
      {/* Background Image with Parallax and Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-300"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1626082927389-6cd097cdc46e?w=1600&h=900&fit=crop)",
          transform: `translateY(${scrollY * 0.5}px)`,
          filter: "blur(4px)",
        }}
      >
        <div className="absolute inset-0 bg-black/60 md:bg-black/60" />
      </div>

      {/* Animated Food Item - Left (Burger) */}
      <motion.div
        className="absolute left-2 sm:left-4 md:left-8 lg:left-12 top-1/4 sm:top-1/3 z-20 hidden sm:block"
        variants={foodLeftVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl filter brightness-110"
        >
          🍔
        </motion.div>
      </motion.div>

      {/* Animated Food Item - Right (Wrap/Fajita) */}
      <motion.div
        className="absolute right-2 sm:right-4 md:right-8 lg:right-12 top-1/3 sm:top-2/5 z-20 hidden sm:block"
        variants={foodRightVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl filter brightness-110"
        >
          🌯
        </motion.div>
      </motion.div>

      {/* Content - Fades in after foods settle */}
      <motion.div
        className="relative z-10 text-center text-white max-w-4xl mx-auto"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 rounded-full text-xs sm:text-sm font-bold shadow-xl"
        >
          🔥 Premium Quality Fried Chicken
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-3 sm:mb-4 leading-tight"
        >
          The Crispiest <br className="hidden sm:block" />
          Chicken
          <br />
          <span className="text-red-600">In Town</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
        >
          Handcrafted with fresh ingredients and our secret recipe. Crispy on
          the outside, juicy on the inside.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
        >
          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white font-bold text-sm sm:text-lg rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg"
            >
              Order Now
            </motion.button>
          </Link>
          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold text-sm sm:text-lg rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              View Menu
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
