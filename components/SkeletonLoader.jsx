"use client";

// Circular loader spinner - Main version
export function CircularLoader() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-16 h-16">
        {/* Outer rotating circle */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-600 border-r-red-600 animate-spin"></div>

        {/* Middle pulsing circle */}
        <div className="absolute inset-2 rounded-full border-3 border-transparent border-b-red-400 animate-spin-slow"></div>

        {/* Inner circle - static */}
        <div className="absolute inset-4 rounded-full border-2 border-red-200 flex items-center justify-center">
          <div className="text-red-600 font-bold text-xs">⏳</div>
        </div>
      </div>
    </div>
  );
}

// Small circular loader spinner - for images
export function SmallCircularLoader() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-red-600 border-r-red-600 animate-spin"></div>
        <div className="absolute inset-1 rounded-full border-2 border-red-200"></div>
      </div>
    </div>
  );
}

// Image with loading spinner
export function ImageWithLoader({ src, alt, className = "", onLoadComplete }) {
  const [isLoading, setIsLoading] = React.useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
    if (onLoadComplete) onLoadComplete();
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <CircularLoader />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}

// Shimmer skeleton loader component
export function SkeletonLoader({ width = "w-full", height = "h-12" }) {
  return (
    <div className={`${width} ${height} bg-gray-200 rounded-lg animate-pulse`}>
      <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
    </div>
  );
}

// Image skeleton loader
export function ImageSkeleton() {
  return (
    <div className="w-full h-56 sm:h-72 md:h-80 bg-gray-200 rounded-lg animate-pulse">
      <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
    </div>
  );
}

// Card skeleton loader
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Image placeholder */}
      <div className="w-full h-56 bg-gray-200 animate-pulse">
        <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
      </div>
      {/* Content placeholder */}
      <div className="p-4 md:p-5">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
        </div>

        {/* Price and button */}
        <div className="flex justify-between items-center mt-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-20" />
          <div className="h-10 bg-gray-200 rounded animate-pulse w-20" />
        </div>
      </div>
    </div>
  );
}

// Multiple card skeleton grid
export function CardSkeletonGrid({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

// Text skeleton loader
export function TextSkeleton({ lines = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-gray-200 rounded animate-pulse ${
            i === lines - 1 ? "w-4/6" : "w-full"
          }`}
        />
      ))}
    </div>
  );
}

// Gallery grid skeleton
export function GallerySkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-max">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-lg shadow-lg bg-gray-200 h-64 sm:h-72 md:h-80 animate-pulse"
        >
          <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        </div>
      ))}
    </div>
  );
}
