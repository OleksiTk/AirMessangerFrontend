// useImageModal.tsx
import { useState } from "react";
import "../style/hooks/ImageModal.css";
interface UseImageModalReturn {
  isOpen: boolean;
  imageSrc: string;
  openImage: (src: string) => void;
  closeImage: () => void;
  ImageModal: React.FC;
}

export const useImageModal = (): UseImageModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const openImage = (src: string) => {
    setImageSrc(src);
    setIsOpen(true);
  };

  const closeImage = () => {
    setIsOpen(false);
  };

  const ImageModal: React.FC = () => {
    if (!isOpen) return null;

    return (
      <div className="image-modal" onClick={closeImage}>
        <button className="image-modal__close" onClick={closeImage}>
          ×
        </button>
        <img
          src={imageSrc}
          alt="Fullscreen"
          className="image-modal__image"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    );
  };

  return {
    isOpen,
    imageSrc,
    openImage,
    closeImage,
    ImageModal,
  };
};
