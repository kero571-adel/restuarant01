"use client";

import { useEffect } from "react";
import Link from "next/link";

const VIDEO_DESKTOP = "/hero/Fried_chicken_burger_being_prepared_79f7d3c9b5.mp4";
const VIDEO_MOBILE = "/hero/Fried_chicken_burger_being_prepared_a8304639e8.mp4";

// الفيديو بيتكتب في الـ HTML نفسه (SSR)، فالمتصفح يبدأ تحميله وتشغيله
// قبل ما الـ JS بتاع React يتحمّل. الـ script بيختار الملف حسب حجم الشاشة.
const videoMarkup = `
<video
  id="hero-video"
  autoplay
  muted
  loop
  playsinline
  preload="auto"
  disablepictureinpicture
  aria-hidden="true"
  class="absolute inset-0 w-full h-full object-cover"
></video>
<script>
  (function () {
    var v = document.getElementById("hero-video");
    if (!v) return;
    v.muted = true;
    v.src = window.matchMedia("(max-width: 767px)").matches
      ? "${VIDEO_MOBILE}"
      : "${VIDEO_DESKTOP}";
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  })();
</script>
`;

export default function Hero() {
  // fallback: لو الـ script ماشتغلش لأي سبب، نشغّل الفيديو بعد الـ hydration
  useEffect(() => {
    const v = document.getElementById("hero-video");
    if (!v) return;
    v.muted = true;
    if (!v.getAttribute("src")) {
      v.src = window.matchMedia("(max-width: 767px)").matches
        ? VIDEO_MOBILE
        : VIDEO_DESKTOP;
    }
    if (v.paused) v.play().catch(() => {});
  }, []);

  return (
    <section className="relative w-full min-h-[calc(100svh-57px)] sm:min-h-[calc(100svh-65px)] mt-[57px] sm:mt-[65px] overflow-hidden bg-black flex items-center justify-center px-4">
      {/* الفيديو: من غير poster ومن غير تأخير */}
      <div
        className="absolute inset-0"
        dangerouslySetInnerHTML={{ __html: videoMarkup }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* المحتوى */}
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
        @keyframes heroIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-item {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}