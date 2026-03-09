import { useState } from "react";

export const useImagePreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openPreview = (imageUrl, imageName) => {
    setSelectedImage({ url: imageUrl, name: imageName });
    setIsOpen(true);
  };

  const closePreview = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  return {
    isOpen,
    selectedImage,
    openPreview,
    closePreview,
  };
};
