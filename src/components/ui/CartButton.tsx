import React from 'react';

interface CartButtonProps {
  /** ID del producto a agregar */
  productId?: string;
  /** Cantidad a agregar al carrito */
  quantity?: number;
  /** Estado de carga del botón */
  loading?: boolean;
  /** Si el producto está disponible */
  available?: boolean;
  /** Tamaño del botón */
  size?: 'sm' | 'md' | 'lg';
  /** Variante del botón */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Texto personalizado del botón */
  children?: React.ReactNode;
  /** Función callback al hacer click */
  onClick?: (productId?: string, quantity?: number) => void;
  /** Clases CSS adicionales */
  className?: string;
  /** Si se muestra el ícono del carrito */
  showIcon?: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({
  productId,
  quantity = 1,
  loading = false,
  available = true,
  size = 'md',
  variant = 'primary',
  children,
  onClick = () => {},
  className = '',
  showIcon = true,
}) => {
  
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };
  
  const variantClasses = {
    primary: available 
      ? 'bg-earth-600 text-warm-50 hover:bg-earth-700 focus:ring-earth-500 shadow-sm hover:shadow-md' 
      : 'bg-gray-400 text-gray-600 cursor-not-allowed',
    secondary: available 
      ? 'bg-warm-200 text-earth-700 hover:bg-warm-300 focus:ring-earth-500' 
      : 'bg-gray-200 text-gray-500 cursor-not-allowed',
    outline: available 
      ? 'border-2 border-earth-600 text-earth-600 hover:bg-earth-600 hover:text-warm-50 focus:ring-earth-500' 
      : 'border-2 border-gray-300 text-gray-400 cursor-not-allowed',
  };

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
  };

  const handleClick = () => {
    if (!available || loading) return;
    onClick(productId, quantity);
  };

  const buttonText = children || (available ? 'Agregar al carrito' : 'No disponible');

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!available || loading}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      aria-label={
        available 
          ? `Agregar ${quantity} ${quantity === 1 ? 'unidad' : 'unidades'} al carrito${productId ? ` - Producto ${productId}` : ''}`
          : 'Producto no disponible'
      }
      aria-describedby={productId ? `product-${productId}-info` : undefined}
    >
      {loading ? (
        <>
          {/* Loading spinner */}
          <svg 
            className={`animate-spin ${iconSize[size]}`} 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Agregando...</span>
        </>
      ) : (
        <>
          {showIcon && available && (
            <svg 
              className={iconSize[size]} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" 
              />
            </svg>
          )}
          
          {!available && showIcon && (
            <svg 
              className={iconSize[size]} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" 
              />
            </svg>
          )}
          
          <span>{buttonText}</span>
        </>
      )}
    </button>
  );
};

export default CartButton;