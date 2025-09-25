import React, { useState, useRef, useEffect, useCallback } from 'react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  thumbnail?: string;
}

interface ProductGalleryProps {
  /** Array de imágenes para la galería */
  images: GalleryImage[];
  /** Imagen seleccionada inicialmente */
  initialImageIndex?: number;
  /** Tamaño de la galería */
  size?: 'sm' | 'md' | 'lg';
  /** Si muestra las miniaturas */
  showThumbnails?: boolean;
  /** Posición de las miniaturas */
  thumbnailPosition?: 'bottom' | 'right' | 'left';
  /** Si permite zoom en la imagen principal */
  enableZoom?: boolean;
  /** Función callback al cambiar imagen */
  onImageChange?: (index: number, image: GalleryImage) => void;
  /** Clases CSS adicionales */
  className?: string;
  /** Si muestra controles de navegación */
  showNavigation?: boolean;
  /** Si permite navegación por teclado */
  enableKeyboardNav?: boolean;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images = [],
  initialImageIndex = 0,
  size = 'md',
  showThumbnails = true,
  thumbnailPosition = 'bottom',
  enableZoom = true,
  onImageChange = () => {},
  className = '',
  showNavigation = true,
  enableKeyboardNav = true,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [imagesError, setImagesError] = useState<Record<string, boolean>>({});
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const mainImageRef = useRef<HTMLImageElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const currentImage = images[currentImageIndex];

  // Estilos por tamaño
  const sizeClasses = {
    sm: {
      main: 'h-64',
      thumbnail: 'h-16 w-16',
      thumbnailGap: 'gap-2',
    },
    md: {
      main: 'h-80 md:h-96',
      thumbnail: 'h-20 w-20',
      thumbnailGap: 'gap-3',
    },
    lg: {
      main: 'h-96 md:h-[500px]',
      thumbnail: 'h-24 w-24',
      thumbnailGap: 'gap-4',
    },
  };

  const currentSize = sizeClasses[size];

  // Navegación por teclado
  useEffect(() => {
    if (!enableKeyboardNav) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isModalOpen) {
        if (event.key === 'Escape') {
          setIsModalOpen(false);
        }
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleNext();
          break;
        case 'Enter':
        case ' ':
          if (document.activeElement === mainImageRef.current) {
            event.preventDefault();
            handleImageClick();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardNav, isModalOpen, currentImageIndex]);

  const handleImageLoad = useCallback((imageId: string) => {
    setImagesLoaded(prev => ({ ...prev, [imageId]: true }));
  }, []);

  const handleImageError = useCallback((imageId: string) => {
    setImagesError(prev => ({ ...prev, [imageId]: true }));
  }, []);

  const changeImage = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentImageIndex(index);
      onImageChange(index, images[index]);
      setIsZoomed(false);
    }
  }, [images, onImageChange]);

  const handleNext = useCallback(() => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    changeImage(nextIndex);
  }, [currentImageIndex, images.length, changeImage]);

  const handlePrevious = useCallback(() => {
    const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    changeImage(prevIndex);
  }, [currentImageIndex, images.length, changeImage]);

  const handleThumbnailClick = useCallback((index: number) => {
    changeImage(index);
  }, [changeImage]);

  const handleImageClick = useCallback(() => {
    if (enableZoom) {
      setIsModalOpen(true);
    }
  }, [enableZoom]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLImageElement>) => {
    if (!enableZoom || !isZoomed) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  }, [enableZoom, isZoomed]);

  // Layout de miniaturas
  const getThumbnailLayout = () => {
    const baseClasses = `flex ${currentSize.thumbnailGap}`;
    
    switch (thumbnailPosition) {
      case 'right':
      case 'left':
        return `${baseClasses} flex-col max-h-80 overflow-y-auto`;
      case 'bottom':
      default:
        return `${baseClasses} overflow-x-auto`;
    }
  };

  const getGalleryLayout = () => {
    const baseClasses = 'flex gap-4';
    
    switch (thumbnailPosition) {
      case 'right':
        return `${baseClasses} flex-row`;
      case 'left':
        return `${baseClasses} flex-row-reverse`;
      case 'bottom':
      default:
        return `${baseClasses} flex-col`;
    }
  };

  // Placeholder para imagen
  const ImagePlaceholder = ({ imageId }: { imageId: string }) => (
    <div className="absolute inset-0 flex items-center justify-center bg-warm-100">
      {imagesError[imageId] ? (
        <div className="text-center text-earth-400">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <span className="text-sm">Error al cargar</span>
        </div>
      ) : (
        <div className="w-8 h-8 border-2 border-earth-300 border-t-earth-600 rounded-full animate-spin" />
      )}
    </div>
  );

  // Modal de imagen ampliada
  const ImageModal = () => (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={() => setIsModalOpen(false)}
      role="dialog"
      aria-label="Imagen ampliada"
      aria-modal="true"
    >
      <div className="relative max-w-4xl max-h-full">
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="absolute -top-12 right-0 text-white hover:text-warm-200 p-2"
          aria-label="Cerrar imagen ampliada"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Imagen modal */}
        <img
          src={currentImage?.src}
          alt={currentImage?.alt}
          className="max-w-full max-h-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Navegación en modal */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-warm-200 p-2"
              aria-label="Imagen anterior"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-warm-200 p-2"
              aria-label="Siguiente imagen"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );

  if (!images.length) {
    return (
      <div className={`flex items-center justify-center ${currentSize.main} bg-warm-100 rounded-lg ${className}`}>
        <div className="text-center text-earth-400">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">No hay imágenes disponibles</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={galleryRef} className={`${className}`}>
      <div className={getGalleryLayout()}>
        {/* Imagen principal */}
        <div className="relative flex-1">
          <div 
            className={`
              relative ${currentSize.main} bg-warm-100 rounded-lg overflow-hidden
              ${enableZoom ? 'cursor-zoom-in' : 'cursor-pointer'}
              ${isZoomed ? 'cursor-zoom-out' : ''}
            `}
          >
            {/* Placeholder */}
            {(!imagesLoaded[currentImage?.id] || imagesError[currentImage?.id]) && (
              <ImagePlaceholder imageId={currentImage?.id} />
            )}

            {/* Imagen principal */}
            {currentImage && (
              <img
                ref={mainImageRef}
                src={currentImage.src}
                alt={currentImage.alt}
                className={`
                  w-full h-full object-cover transition-all duration-300
                  ${imagesLoaded[currentImage.id] ? 'opacity-100' : 'opacity-0'}
                  ${isZoomed ? 'scale-150' : 'scale-100'}
                `}
                style={isZoomed ? {
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                } : {}}
                onLoad={() => handleImageLoad(currentImage.id)}
                onError={() => handleImageError(currentImage.id)}
                onClick={handleImageClick}
                onMouseMove={handleMouseMove}
                tabIndex={0}
                role="button"
                aria-label={`Ver imagen ampliada: ${currentImage.alt}`}
              />
            )}

            {/* Controles de navegación */}
            {showNavigation && images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Imagen anterior"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Siguiente imagen"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Indicador de zoom */}
            {enableZoom && (
              <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {isZoomed ? 'Click para alejar' : 'Click para acercar'}
              </div>
            )}
          </div>

          {/* Contador de imágenes */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Miniaturas */}
        {showThumbnails && images.length > 1 && (
          <div className={getThumbnailLayout()}>
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => handleThumbnailClick(index)}
                className={`
                  ${currentSize.thumbnail} flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all
                  ${index === currentImageIndex 
                    ? 'border-earth-600 ring-2 ring-earth-600/30' 
                    : 'border-warm-200 hover:border-earth-400'
                  }
                `}
                aria-label={`Seleccionar imagen ${index + 1}: ${image.alt}`}
              >
                <img
                  src={image.thumbnail || image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal de imagen ampliada */}
      {isModalOpen && <ImageModal />}
    </div>
  );
};

export default ProductGallery;

// Datos de ejemplo para testing
export const sampleGalleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/LaNik-/img/gorras/gorro1.webp',
    alt: 'Gorra artesanal vista frontal',
  },
  {
    id: '2',
    src: '/LaNik-/img/gorras/gorro2.webp',
    alt: 'Gorra artesanal vista lateral',
  },
  {
    id: '3',
    src: '/LaNik-/img/gorras/WhatsApp Image 2025-09-18 at 12.23.23.webp',
    alt: 'Gorra artesanal vista posterior',
  },
  {
    id: '4',
    src: '/LaNik-/img/muñecos/muneco1.webp',
    alt: 'Muñeco artesanal detalle frontal',
  },
];