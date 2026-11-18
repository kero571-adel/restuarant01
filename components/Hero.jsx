"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const VIDEO_DESKTOP = "/hero/Fried_chicken_burger_being_prepared_79f7d3c9b5.mp4";
const VIDEO_MOBILE = "/hero/Fried_chicken_burger_being_prepared_a8304639e8.mp4";

export default function Hero() {
  const [videoSrc, setVideoSrc] = useState(null);

  // اختار الفيديو مرة واحدة بس، من غير scroll/resize listeners
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    setVideoSrc(isMobile ? VIDEO_MOBILE : VIDEO_DESKTOP);
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-black flex items-center justify-center px-4">
      {/* الفيديو بيبدأ فورًا من غير تأخير ومن غير poster */}
      {videoSrc && (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          className="hero-video absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay واحد بس */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
        <div
          className="hero-item inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 rounded-full text-xs sm:text-sm font-bold shadow-xl"
          style={{ animationDelay: "0s" }}
        >
          Premium Quality Fried Chicken
        </div>

        <h1
          className="hero-item text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-3 sm:mb-4 leading-tight"
          style={{ animationDelay: "0.05s" }}
        >
          The Crispiest <br className="hidden sm:block" />
          Chicken
          <br />
          <span className="text-red-600">In Town</span>
        </h1>

        <p
          className="hero-item text-sm sm:text-base md:text-lg lg:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
          style={{ animationDelay: "0.1s" }}
        >
          Handcrafted with fresh ingredients and our secret recipe. Crispy on
          the outside, juicy on the inside.
        </p>

        <div
          className="hero-item flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
          style={{ animationDelay: "0.15s" }}
        >
          <Link
            href="/menu"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white font-bold text-sm sm:text-lg rounded-lg hover:bg-red-700 active:scale-95 md:hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            Order Now
          </Link>
          <Link
            href="/menu"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold text-sm sm:text-lg rounded-lg hover:bg-gray-100 active:scale-95 md:hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            View Menu
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .hero-item {
          opacity: 0;
          transform: translateY(12px);
          animation: heroIn 0.35s ease-out forwards;
        }
        .hero-video {
          animation: heroFade 0.4s ease-out forwards;
        }
        @keyframes heroIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-item,
          .hero-video {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}