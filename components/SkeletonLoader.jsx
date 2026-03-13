"use client";

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
