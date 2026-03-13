"use client";

import { useState, useEffect } from "react";
import {
  GallerySkeletonGrid,
  SmallCircularLoader,
} from "@/components/SkeletonLoader";

export default function GalleryClient() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("food");
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const galleryImages = {
    food: [
      {
        id: 1,
        url: "/gallery/Whisk_5bc49b46d2b01bca2884030114227169dr.jpeg",
        title: "Crispy Fried Chicken",
        span: "md:col-span-2 md:row-span-2",
      },
      {
        id: 2,
        url: "/gallery/Whisk_bb9496c552418e0970c40e06e09329dddr.jpeg",
        title: "Golden Chicken Platter",
        span: "md:col-span-1 md:row-span-1",
      },
      {
        id: 3,
        url: "/gallery/Whisk_f8af2e980eb18d68e5a4610371bcb0e8dr.jpeg",
        title: "Spicy Chicken Wings",
        span: "md:col-span-1 md:row-span-1",
      },
      {
        id: 4,
        url: "/gallery/Whisk_00c282724089aaa90b64f8d0df21d8b3dr.jpeg",
        title: "Delicious Chicken Burger",
        span: "md:col-span-1 md:row-span-1",
      },
      {
        id: 5,
        url: "/gallery/Whisk_b2092dcec8473dc83ab453faf14d4433dr.jpeg",
        title: "Crispy Tenders",
        span: "md:col-span-1 md:row-span-1",
      },
      {
        id: 6,
        url: "/gallery/Whisk_b1942f144398884855e4a1dcd768ea87dr.jpeg",
        title: "Fresh Chicken Salad",
        span: "md:col-span-2 md:row-span-1",
      },
    ],
    kitchen: [
      {
        id: 7,
        url: "/gallery/Whisk_d7a77e8481f4af0b0524ab5da064a0b4dr.jpeg",
        title: "Professional Kitchen",
        span: "md:col-span-2 md:row-span-2",
      },
      {
        id: 8,
        url: "/gallery/Whisk_8f573e682ed5b0c81c34f8d6c319f607dr.jpeg",
        title: "Chef at Work",
        span: "md:col-span-1 md:row-span-1",
      },
      {
        id: 9,
        url: "/gallery/Whisk_f11e7469c587fa2a5af4224244424cbbdr.jpeg",
        title: "Cooking Process",
        span: "md:col-span-1 md:row-span-1",
      },
      {
        id: 10,
        url: "/gallery/Whisk_43c546a5f28a8baafbd4d595a4a9f11cdr.jpeg",
        title: "Kitchen Equipment",
        span: "md:col-span-1 md:row-span-1",
      },
      {
        id: 11,
        url: "/gallery/Whisk_a13a341e86c839ca34448cee90561534dr.jpeg",
        title: "Quality Control",
        span: "md:col-span-1 md:row-span-1",
      },
      {
        id: 12,
        url: "/gallery/Whisk_4a4926065edb6f29146457fa02d5be83dr.jpeg",
        title: "Ready to Serve",
        span: "md:col-span-2 md:row-span-1",
      },
    ],
    interior: [
      {
        id: 13,
        url: "/gallery/Whisk_b01e493ee487ec7bcf94960b8af273fadr.jpeg",
        title: "Dining Area",
        span: "md:col-span-2 md:row-span-2",
      },
      {
        id: 14,
        url: "/gallery/Whisk_1bb338bf8471401a3bb45d4b4bdd1c40dr.jpeg",
        title: "Modern Interior",
        span: "md:col-span-1 md:row-span-1",
      },
      {
        id: 15,
        url: "/gallery/Whisk_16bb66d67479b55b91444676be82b1e4dr.jpeg",
        title: "Seating Area",
        span: "md:col-span-1 md:row-span-1",
      },
      {
        id: 16,
        url: "/gallery/Whisk_467cee4c8ecc92e962a44708ad54aed3dr.jpeg",
        title: "Restaurant Entrance",
        span: "md:col-span-1 md:row-span-1",
      },
      {
        id: 17,
        url: "/gallery/Whisk_87d94aa57c6125d9e07477e1c0e2cf4bdr.jpeg",
        title: "Counter Service",
        span: "md:col-span-1 md:row-span-1",
      },
    ],
  };

  const images = galleryImages[activeTab] || galleryImages.food;

  const handleImageLoad = (imageId) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [imageId]: true,
    }));
  };

  if (!mounted) {
    return (
      <div className="bg-white">
        <section className="relative w-full h-80 md:h-96 overflow-hidden bg-gray-300 flex items-center justify-center">
          <div className="animate-pulse text-gray-600">Loading gallery...</div>
        </section>
        <section className="py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <GallerySkeletonGrid count={6} />
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-80 md:h-96 overflow-hidden bg-black flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1626082927389-6cd097cdc46e?w=1600&h=900&fit=crop)",
            transform: `translateY(${isMobile ? 0 : scrollY * 0.4}px)`,
            backgroundAttachment: isMobile ? "scroll" : "fixed",
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1
            className="text-5xl md:text-6xl font-black mb-2 leading-tight"
            style={{
              animation: "fadeInUp 1s ease-out forwards",
            }}
          >
            Photo Gallery
          </h1>
          <p
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
            style={{
              animation: "fadeInUp 1s ease-out 0.2s forwards",
              opacity: 0,
            }}
          >
            Explore our mouth-watering dishes and premium dining experience
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8 md:py-12 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: "food", label: "🍗 Food" },
              { id: "kitchen", label: "👨‍🍳 Kitchen" },
              { id: "interior", label: "🏠 Restaurant Interior" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 md:px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 transform ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                } ${isMobile ? "" : "hover:scale-105"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-max">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer group h-64 sm:h-72 md:h-80 ${image.span}`}
              onClick={() => setSelectedImage(image)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              <div className="relative w-full h-full overflow-hidden bg-gray-300">
                {/* Image skeleton while loading */}
                {!imagesLoaded[image.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200/80 backdrop-blur-sm z-10">
                    <SmallCircularLoader />
                  </div>
                )}

                <img
                  src={image.url}
                  alt={image.title}
                  className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out ${
                    imagesLoaded[image.id] ? "fade-in" : "opacity-0"
                  }`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(image.id)}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300?text=Gallery+Image";
                    handleImageLoad(image.id);
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end justify-start p-4 md:p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-sm md:text-lg">
                      {image.title}
                    </h3>
                    <p className="text-gray-200 text-xs md:text-sm">
                      Click to view
                    </p>
                  </div>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-2 md:top-4 right-2 md:right-4 w-8 md:w-10 h-8 md:h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 shadow-lg">
                  <svg
                    className="w-4 md:w-5 h-4 md:h-5 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedImage(null)}
          style={{
            animation: "fadeIn 0.3s ease-out forwards",
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 md:top-6 right-4 md:right-6 w-10 md:w-12 h-10 md:h-12 bg-white rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-110 z-10 shadow-lg"
            aria-label="Close gallery"
          >
            <svg
              className="w-5 md:w-6 h-5 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-5xl w-full my-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "zoomIn 0.4s ease-out forwards",
            }}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto rounded-lg shadow-2xl"
              loading="lazy"
            />

            {/* Image Info */}
            <div className="mt-4 md:mt-6 text-center">
              <h2 className="text-xl md:text-3xl font-bold text-white mb-2">
                {selectedImage.title}
              </h2>
            </div>

            {/* Navigation Hints */}
            <p className="text-center text-gray-400 text-xs md:text-sm mt-3 md:mt-4">
              Click outside or press ESC to close
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
