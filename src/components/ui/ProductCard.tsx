import React, { useState, useRef, useEffect } from 'react';
import CartButton from './CartButton';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageAlt: string;
  category: string;
  inStock: boolean;
  stock?: number;
  badge?: {
    text: string;
    type: 'sale' | 'new' | 'limited';
  };
}

interface ProductCardProps {
  /** Datos del producto */
  product: Product;
  /** Tamaño de la tarjeta */
  size?: 'sm' | 'md' | 'lg';
  /** Si muestra el botón de favoritos */
  showFavorite?: boolean;
  /** Función callback al hacer clic en la tarjeta */
  onClick?: (product: Product) => void;
  /** Función callback al agregar al carrito */
  onAddToCart?: (productId: string, quantity: number) => void;
  /** Clases CSS adicionales */
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  size = 'md',
  showFavorite = true,
  onClick = () => {},
  onAddToCart = () => {},
  className = '',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Estilos por tamaño
  const sizeClasses = {
    sm: {
      card: 'p-3',
      image: 'h-40',
      title: 'text-sm font-medium',
      price: 'text-sm',
      button: 'sm',
    },
    md: {
      card: 'p-4',
      image: 'h-48',
      title: 'text-base font-semibold',
      price: 'text-base',
      button: 'md',
    },
    lg: {
      card: 'p-5',
      image: 'h-56',
      title: 'text-lg font-bold',
      price: 'text-lg',
      button: 'lg',
    },
  };

  const currentSize = sizeClasses[size];

  // Estilos para badges
  const badgeStyles = {
    sale: 'bg-accent-500 text-warm-50',
    new: 'bg-earth-600 text-warm-50',
    limited: 'bg-warm-600 text-warm-50',
  };

  const handleCardClick = () => {
    onClick(product);
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, 1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      ref={cardRef}
      className={`
        group relative bg-warm-50 rounded-xl border border-warm-200 
        hover:border-earth-300 hover:shadow-lg transition-all duration-300
        overflow-hidden ${currentSize.card} ${className}
      `}
    >
      {/* Badge */}
      {product.badge && (
        <div 
          className={`
            absolute top-3 left-3 z-10 px-2 py-1 rounded-full text-xs font-medium
            ${badgeStyles[product.badge.type]}
          `}
        >
          {product.badge.text}
        </div>
      )}

      {/* Botón de favoritos */}
      {showFavorite && (
        <button
          type="button"
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-warm-100/80 hover:bg-warm-200 transition-colors duration-200"
          aria-label={`Agregar ${product.name} a favoritos`}
        >
          <svg 
            className="w-4 h-4 text-earth-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
      )}

      {/* Imagen del producto */}
      <div 
        className={`relative ${currentSize.image} mb-3 bg-warm-100 rounded-lg overflow-hidden cursor-pointer`}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalles de ${product.name}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
      >
        {/* Placeholder mientras carga */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-warm-100">
            <div className="w-8 h-8 border-2 border-earth-300 border-t-earth-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Imagen de error */}
        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-warm-100 text-earth-400">
            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span className="text-xs">Sin imagen</span>
          </div>
        )}

        {/* Imagen principal */}
        {isIntersecting && (
          <img
            ref={imgRef}
            src={product.image}
            alt={product.imageAlt}
            className={`
              w-full h-full object-cover transition-all duration-500
              group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}

        {/* Overlay al hacer hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>

      {/* Información del producto */}
      <div className="space-y-2">
        {/* Categoría */}
        <p className="text-xs text-earth-500 uppercase tracking-wide">
          {product.category}
        </p>

        {/* Título */}
        <h3 
          className={`${currentSize.title} text-earth-800 line-clamp-2 cursor-pointer hover:text-earth-600 transition-colors`}
          onClick={handleCardClick}
        >
          {product.name}
        </h3>

        {/* Precios */}
        <div className="flex items-center gap-2">
          <span className={`${currentSize.price} font-bold text-earth-800`}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-earth-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock info */}
        {!product.inStock ? (
          <p className="text-sm text-accent-600 font-medium">Agotado</p>
        ) : product.stock && product.stock <= 5 ? (
          <p className="text-sm text-accent-600">
            Solo quedan {product.stock} unidades
          </p>
        ) : null}

        {/* Botón agregar al carrito */}
        <div className="pt-2">
          <CartButton
            productId={product.id}
            available={product.inStock}
            size={currentSize.button as 'sm' | 'md' | 'lg'}
            onClick={handleAddToCart}
            className="w-full"
            variant="primary"
          >
            Agregar al carrito
          </CartButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;