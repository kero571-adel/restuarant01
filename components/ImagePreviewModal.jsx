"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImagePreviewModal({
  isOpen,
  imageUrl,
  imageName,
  onClose,
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const touchStartDistance = useRef(0);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+") handleZoomIn();
      if (e.key === "-") handleZoomOut();
      if (e.key === "0") resetZoom();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, zoom]);

  // Handle wheel zoom (desktop)
  const handleWheel = (e) => {
    if (!imageRef.current || zoom <= 1) return;

    e.preventDefault();

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(1, Math.min(5, zoom + delta));

    if (newZoom !== zoom) {
      setZoom(newZoom);
    }
  };

  // Handle mouse drag
  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Calculate boundaries
    const maxX = (imageRef.current?.offsetWidth || 0) * (zoom - 1) * 0.5;
    const maxY = (imageRef.current?.offsetHeight || 0) * (zoom - 1) * 0.5;

    setPan({
      x: Math.max(-maxX, Math.min(maxX, newX)),
      y: Math.max(-maxY, Math.min(maxY, newY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch pinch zoom (mobile)
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      touchStartDistance.current = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      if (touchStartDistance.current > 0) {
        const ratio = currentDistance / touchStartDistance.current;
        const newZoom = Math.max(1, Math.min(5, zoom * ratio));
        setZoom(newZoom);
        touchStartDistance.current = currentDistance;
      }
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 1));
  };

  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={handleOverlayClick}
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {/* Dark overlay background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className="relative z-10 w-full h-full max-w-4xl max-h-[90vh] flex flex-col bg-black/40 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with title and close button */}
            <div className="flex items-center justify-between p-3 md:p-4 bg-black/60 backdrop-blur-sm border-b border-white/10">
              <h2 className="text-sm md:text-base lg:text-lg font-semibold text-white truncate pr-2">
                {imageName}
              </h2>
              <button
                onClick={onClose}
                className="shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-colors duration-200 active:scale-95"
                aria-label="Close preview"
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
            </div>

            {/* Image container */}
            <div className="flex-1 flex items-center justify-center overflow-hidden bg-linear-to-b from-black/20 to-black/40 relative">
              <div
                className={`relative w-full h-full flex items-center justify-center ${
                  zoom > 1
                    ? "cursor-grab active:cursor-grabbing"
                    : "cursor-default"
                }`}
              >
                <motion.img
                  ref={imageRef}
                  src={imageUrl}
                  alt={imageName}
                  draggable={false}
                  animate={{
                    scale: zoom,
                    x: pan.x,
                    y: pan.y,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 60 }}
                  className="max-w-[85vw] md:max-w-[80vw] max-h-[calc(90vh-120px)] md:max-h-[calc(90vh-140px)] object-contain select-none"
                  onMouseDown={handleMouseDown}
                />

                {/* Zoom info indicator */}
                {zoom > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs md:text-sm font-semibold"
                  >
                    {(zoom * 100).toFixed(0)}%
                  </motion.div>
                )}
              </div>
            </div>

            {/* Controls footer */}
            <div className="bg-black/60 backdrop-blur-sm border-t border-white/10 p-3 md:p-4">
              {/* Control buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
                {/* Zoom out button */}
                <button
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  className="w-9 md:w-10 h-9 md:h-10 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white flex items-center justify-center transition-colors duration-200 active:scale-95"
                  aria-label="Zoom out"
                  title="Zoom Out (- key)"
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                    />
                  </svg>
                </button>

                {/* Zoom level display */}
                <div className="text-white text-xs md:text-sm font-semibold px-3 py-2 bg-gray-800 rounded-lg min-w-15 text-center">
                  {(zoom * 100).toFixed(0)}%
                </div>

                {/* Zoom in button */}
                <button
                  onClick={handleZoomIn}
                  disabled={zoom >= 5}
                  className="w-9 md:w-10 h-9 md:h-10 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white flex items-center justify-center transition-colors duration-200 active:scale-95"
                  aria-label="Zoom in"
                  title="Zoom In (+ key)"
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                </button>

                {/* Reset button */}
                <button
                  onClick={resetZoom}
                  className="w-9 md:w-10 h-9 md:h-10 rounded-lg bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center transition-colors duration-200 active:scale-95"
                  aria-label="Reset zoom"
                  title="Reset Zoom (0 key)"
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>

                {/* Fit to screen button */}
                <button
                  onClick={resetZoom}
                  className="hidden md:flex px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-xs md:text-sm font-semibold transition-colors duration-200 active:scale-95 items-center gap-2"
                  aria-label="Fit to screen"
                  title="Fit to screen (0 key)"
                >
                  <svg
                    className="w-4 md:w-5 h-4 md:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 20v-4m0 4h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                    />
                  </svg>
                  Fit
                </button>
              </div>

              {/* Help text */}
              <div className="text-center text-gray-300 text-xs">
                {isMobile ? (
                  <p>Pinch to zoom • Drag to pan • Press ESC to close</p>
                ) : (
                  <p>
                    Scroll to zoom • Drag to pan • +/- keys to zoom • 0 to reset
                    • ESC to close
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
