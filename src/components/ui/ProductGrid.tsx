import React from 'react';
import ProductCard from './ProductCard';

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

interface ProductGridProps {
  /** Array de productos a mostrar */
  products: Product[];
  /** Número de columnas por breakpoint */
  columns?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /** Espaciado entre productos */
  gap?: 'sm' | 'md' | 'lg';
  /** Tamaño de las tarjetas de producto */
  cardSize?: 'sm' | 'md' | 'lg';
  /** Si está cargando productos */
  loading?: boolean;
  /** Número de skeletons a mostrar durante carga */
  loadingCount?: number;
  /** Función callback al hacer clic en un producto */
  onProductClick?: (product: Product) => void;
  /** Función callback al agregar producto al carrito */
  onAddToCart?: (productId: string, quantity: number) => void;
  /** Clases CSS adicionales */
  className?: string;
  /** Mensaje cuando no hay productos */
  emptyMessage?: string;
  /** Si muestra el botón de favoritos en las tarjetas */
  showFavorites?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products = [],
  columns = {
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  gap = 'md',
  cardSize = 'md',
  loading = false,
  loadingCount = 8,
  onProductClick = () => {},
  onAddToCart = () => {},
  className = '',
  emptyMessage = 'No se encontraron productos',
  showFavorites = true,
}) => {
  
  // Estilos para gap
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  };

  // Generar clases de grid responsive
  const generateGridClasses = () => {
    const baseClass = `grid-cols-${columns.base || 1}`;
    const smClass = columns.sm ? `sm:grid-cols-${columns.sm}` : '';
    const mdClass = columns.md ? `md:grid-cols-${columns.md}` : '';
    const lgClass = columns.lg ? `lg:grid-cols-${columns.lg}` : '';
    const xlClass = columns.xl ? `xl:grid-cols-${columns.xl}` : '';
    
    return [baseClass, smClass, mdClass, lgClass, xlClass]
      .filter(Boolean)
      .join(' ');
  };

  // Componente Skeleton para carga
  const ProductSkeleton = () => (
    <div className="bg-warm-50 rounded-xl border border-warm-200 p-4 animate-pulse">
      {/* Imagen skeleton */}
      <div className="h-48 bg-warm-200 rounded-lg mb-3" />
      
      {/* Categoría skeleton */}
      <div className="h-3 bg-warm-200 rounded w-1/3 mb-2" />
      
      {/* Título skeleton */}
      <div className="space-y-2 mb-3">
        <div className="h-4 bg-warm-200 rounded w-full" />
        <div className="h-4 bg-warm-200 rounded w-3/4" />
      </div>
      
      {/* Precio skeleton */}
      <div className="h-5 bg-warm-200 rounded w-1/2 mb-4" />
      
      {/* Botón skeleton */}
      <div className="h-10 bg-warm-200 rounded-lg w-full" />
    </div>
  );

  // Componente para estado vacío
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center max-w-md">
        {/* Icono */}
        <div className="w-16 h-16 mx-auto mb-4 bg-warm-200 rounded-full flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-earth-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
            />
          </svg>
        </div>
        
        {/* Mensaje */}
        <h3 className="text-lg font-semibold text-earth-800 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-earth-500 text-sm">
          Intenta ajustar los filtros o revisar más tarde.
        </p>
      </div>
    </div>
  );

  return (
    <div className={`w-full ${className}`}>
      {/* Grid de productos */}
      <div 
        className={`
          grid ${generateGridClasses()} ${gapClasses[gap]}
          w-full
        `}
        role="grid"
        aria-label="Grid de productos"
      >
        {/* Estado de carga */}
        {loading && (
          <>
            {Array.from({ length: loadingCount }).map((_, index) => (
              <div key={`skeleton-${index}`} role="gridcell">
                <ProductSkeleton />
              </div>
            ))}
          </>
        )}

        {/* Productos */}
        {!loading && products.length > 0 && (
          <>
            {products.map((product) => (
              <div 
                key={product.id} 
                role="gridcell"
                className="flex"
              >
                <ProductCard
                  product={product}
                  size={cardSize}
                  showFavorite={showFavorites}
                  onClick={onProductClick}
                  onAddToCart={onAddToCart}
                  className="flex-1"
                />
              </div>
            ))}
          </>
        )}

        {/* Estado vacío */}
        {!loading && products.length === 0 && (
          <EmptyState />
        )}
      </div>

      {/* Información adicional del grid */}
      {!loading && products.length > 0 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-earth-500">
            Mostrando {products.length} {products.length === 1 ? 'producto' : 'productos'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;

// Datos de ejemplo para testing
export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Gorra Artesanal Bordada a Mano',
    price: 45000,
    originalPrice: 60000,
    image: '/LaNik-/img/gorras/gorro1.webp',
    imageAlt: 'Gorra artesanal con bordado tradicional',
    category: 'Gorras',
    inStock: true,
    stock: 3,
    badge: {
      text: '25% OFF',
      type: 'sale',
    },
  },
  {
    id: '2',
    name: 'Muñeco de Trapo Tradicional',
    price: 35000,
    image: '/LaNik-/img/muñecos/muneco1.webp',
    imageAlt: 'Muñeco de trapo hecho a mano con materiales naturales',
    category: 'Muñecos',
    inStock: true,
    stock: 8,
    badge: {
      text: 'NUEVO',
      type: 'new',
    },
  },
  {
    id: '3',
    name: 'Pintura Acrílica sobre Lienzo',
    price: 120000,
    image: '/LaNik-/img/pinturas/pintura1.webp',
    imageAlt: 'Pintura artística acrílica con paisaje montañoso',
    category: 'Pinturas',
    inStock: true,
    stock: 2,
    badge: {
      text: 'LIMITADO',
      type: 'limited',
    },
  },
  {
    id: '4',
    name: 'Poncho de Lana Tejido',
    price: 85000,
    image: '/LaNik-/img/ponchos/poncho1.webp',
    imageAlt: 'Poncho de lana tejido con patrones geométricos',
    category: 'Ponchos',
    inStock: false,
  },
  {
    id: '5',
    name: 'Sweater de Alpaca Premium',
    price: 150000,
    originalPrice: 180000,
    image: '/LaNik-/img/sweaters/sueter1.webp',
    imageAlt: 'Sweater de alpaca con diseño contemporáneo',
    category: 'Sweaters',
    inStock: true,
    stock: 12,
  },
  {
    id: '6',
    name: 'Gorra de Cuero Natural',
    price: 55000,
    image: '/LaNik-/img/gorras/gorro2.webp',
    imageAlt: 'Gorra de cuero curtido naturalmente',
    category: 'Gorras',
    inStock: true,
    stock: 6,
  },
];