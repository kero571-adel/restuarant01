"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // Detect mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Load video after 2 seconds to prevent blocking initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Reduce animations on mobile
  const foodLeftVariants = {
    hidden: { x: -400, rotate: -180, opacity: 0 },
    visible: {
      x: -80,
      rotate: 360,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.8 : 1.4,
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
        duration: isMobile ? 0.8 : 1.4,
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
        delay: isMobile ? 0.4 : 1.2,
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
      {/* Poster Image - Shows immediately */}
      <div
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          backgroundImage:
            "url(/menu/Buffalo_chicken_burger_with_sauce_011a251f9a.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: isMobile ? "scroll" : "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Background Video - Lazy loaded */}
      {videoLoaded && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover fade-in-video"
        >
          <source
            src={
              isMobile
                ? "/hero/Fried_chicken_burger_being_prepared_a8304639e8.mp4"
                : "/hero/Fried_chicken_burger_being_prepared_79f7d3c9b5.mp4"
            }
            type="video/mp4"
          />
        </video>
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      {/* Content - Fades in faster on mobile */}
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
              whileHover={isMobile ? {} : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white font-bold text-sm sm:text-lg rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg"
            >
              Order Now
            </motion.button>
          </Link>
          <Link href="/menu">
            <motion.button
              whileHover={isMobile ? {} : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold text-sm sm:text-lg rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              View Menu
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes fadeInVideo {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        :global(.fade-in-video) {
          animation: fadeInVideo 1s ease-in-out forwards;
        }
      `}</style>
    </section>
  );
}
