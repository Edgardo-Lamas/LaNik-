import React, { useState, useCallback } from 'react';

interface QuantitySelectorProps {
  /** Cantidad inicial */
  initialQuantity?: number;
  /** Cantidad mínima permitida */
  minQuantity?: number;
  /** Cantidad máxima permitida */
  maxQuantity?: number;
  /** Stock disponible */
  stock?: number;
  /** Tamaño del componente */
  size?: 'sm' | 'md' | 'lg';
  /** Si está deshabilitado */
  disabled?: boolean;
  /** Función callback cuando cambia la cantidad */
  onChange?: (quantity: number) => void;
  /** Clases CSS adicionales */
  className?: string;
  /** Texto para el label (accesibilidad) */
  label?: string;
  /** Mostrar el stock disponible */
  showStock?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialQuantity = 1,
  minQuantity = 1,
  maxQuantity = 99,
  stock,
  size = 'md',
  disabled = false,
  onChange = () => {},
  className = '',
  label = 'Cantidad',
  showStock = false,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  // Determinar el máximo real considerando stock
  const actualMax = stock !== undefined ? Math.min(maxQuantity, stock) : maxQuantity;

  const handleDecrease = useCallback(() => {
    if (disabled || quantity <= minQuantity) return;
    
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  }, [quantity, minQuantity, disabled, onChange]);

  const handleIncrease = useCallback(() => {
    if (disabled || quantity >= actualMax) return;
    
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  }, [quantity, actualMax, disabled, onChange]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || minQuantity;
    const clampedValue = Math.min(Math.max(value, minQuantity), actualMax);
    
    if (clampedValue !== quantity) {
      setQuantity(clampedValue);
      onChange(clampedValue);
    }
  }, [minQuantity, actualMax, quantity, onChange]);

  // Estilos por tamaño
  const sizeClasses = {
    sm: {
      container: 'h-8',
      button: 'w-8 h-8 text-sm',
      input: 'h-8 w-12 text-sm px-2',
      stock: 'text-xs',
    },
    md: {
      container: 'h-10',
      button: 'w-10 h-10 text-base',
      input: 'h-10 w-14 text-base px-2',
      stock: 'text-sm',
    },
    lg: {
      container: 'h-12',
      button: 'w-12 h-12 text-lg',
      input: 'h-12 w-16 text-lg px-3',
      stock: 'text-base',
    },
  };

  const currentSize = sizeClasses[size];

  // Estados de los botones
  const canDecrease = !disabled && quantity > minQuantity;
  const canIncrease = !disabled && quantity < actualMax;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* Label y stock info */}
      <div className="flex items-center justify-between">
        <label 
          htmlFor={`quantity-${Math.random()}`}
          className="text-sm font-medium text-earth-700"
        >
          {label}
        </label>
        {showStock && stock !== undefined && (
          <span className={`text-earth-500 ${currentSize.stock}`}>
            Stock: {stock}
          </span>
        )}
      </div>

      {/* Selector de cantidad */}
      <div 
        className={`flex items-center border border-earth-300 rounded-lg bg-warm-50 ${currentSize.container}`}
        role="group"
        aria-label="Selector de cantidad"
      >
        {/* Botón decrementar */}
        <button
          type="button"
          onClick={handleDecrease}
          disabled={!canDecrease}
          className={`
            ${currentSize.button}
            flex items-center justify-center
            text-earth-600 hover:text-earth-800 hover:bg-warm-100
            disabled:text-earth-300 disabled:cursor-not-allowed disabled:hover:bg-transparent
            transition-colors duration-150 rounded-l-lg border-r border-earth-300
            focus:outline-none focus:ring-2 focus:ring-earth-500 focus:ring-inset
          `}
          aria-label="Disminuir cantidad"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20 12H4" 
            />
          </svg>
        </button>

        {/* Input de cantidad */}
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={minQuantity}
          max={actualMax}
          disabled={disabled}
          className={`
            ${currentSize.input}
            text-center border-0 bg-transparent text-earth-800 font-medium
            focus:outline-none focus:ring-2 focus:ring-earth-500 focus:ring-inset
            disabled:text-earth-400 disabled:cursor-not-allowed
            appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          `}
          aria-label={`Cantidad: ${quantity}`}
        />

        {/* Botón incrementar */}
        <button
          type="button"
          onClick={handleIncrease}
          disabled={!canIncrease}
          className={`
            ${currentSize.button}
            flex items-center justify-center
            text-earth-600 hover:text-earth-800 hover:bg-warm-100
            disabled:text-earth-300 disabled:cursor-not-allowed disabled:hover:bg-transparent
            transition-colors duration-150 rounded-r-lg border-l border-earth-300
            focus:outline-none focus:ring-2 focus:ring-earth-500 focus:ring-inset
          `}
          aria-label="Aumentar cantidad"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
        </button>
      </div>

      {/* Mensaje de límites */}
      {stock !== undefined && quantity >= stock && (
        <p className={`text-accent-600 ${currentSize.stock}`}>
          Máximo disponible: {stock}
        </p>
      )}
    </div>
  );
};

export default QuantitySelector;