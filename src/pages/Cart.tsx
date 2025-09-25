import React, { useEffect } from 'react';
import { useCart, useFormatPrice, CartItem } from '../contexts/CartContext';
import QuantitySelector from '../components/ui/QuantitySelector';

interface CartPageProps {
  /** Función para navegar al checkout */
  onNavigateToCheckout?: () => void;
  /** Función para continuar comprando */
  onContinueShopping?: () => void;
  /** Función para navegar a un producto */
  onNavigateToProduct?: (productId: string) => void;
}

const Cart: React.FC<CartPageProps> = ({
  onNavigateToCheckout = () => console.log('Navigate to checkout'),
  onContinueShopping = () => console.log('Continue shopping'),
  onNavigateToProduct = (id) => console.log('Navigate to product:', id),
}) => {
  const { state, removeItem, updateQuantity, clearCart, getCartSummary } = useCart();
  const { formatPrice } = useFormatPrice();

  // SEO dinámico
  useEffect(() => {
    const title = `Carrito de Compras${state.totalItems > 0 ? ` (${state.totalItems})` : ''} - Handyman`;
    const description = state.totalItems > 0 
      ? `Tienes ${state.totalItems} productos en tu carrito por un total de ${formatPrice(state.totalPrice)}`
      : 'Tu carrito está vacío. Descubre nuestros productos artesanales únicos.';

    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }, [state.totalItems, state.totalPrice, formatPrice]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string, itemName: string) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${itemName}" del carrito?`)) {
      removeItem(itemId);
    }
  };

  const handleClearCart = () => {
    if (window.confirm(`¿Estás seguro de que quieres vaciar todo el carrito? Esta acción no se puede deshacer.`)) {
      clearCart();
    }
  };

  const cartSummary = getCartSummary();

  // Componente para item individual del carrito
  const CartItemComponent: React.FC<{ item: CartItem }> = ({ item }) => (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-warm-100 rounded-lg border border-warm-200">
      {/* Imagen del producto */}
      <div className="flex-shrink-0">
        <button
          onClick={() => onNavigateToProduct(item.id)}
          className="block w-24 h-24 sm:w-20 sm:h-20 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-earth-500 focus:ring-offset-2"
          aria-label={`Ver detalles de ${item.name}`}
        >
          <img
            src={item.image}
            alt={item.imageAlt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        </button>
      </div>

      {/* Información del producto */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div className="flex-1 min-w-0">
            <button
              onClick={() => onNavigateToProduct(item.id)}
              className="text-left group"
            >
              <h3 className="text-lg font-semibold text-earth-800 group-hover:text-earth-600 transition-colors line-clamp-2">
                {item.name}
              </h3>
            </button>
            
            <div className="text-sm text-earth-600 mt-1 space-y-1">
              <p>SKU: {item.sku}</p>
              <p>Categoría: {item.category}</p>
              
              {/* Variantes */}
              {item.variants && (
                <div className="flex flex-wrap gap-2">
                  {item.variants.color && (
                    <span className="inline-flex items-center px-2 py-1 bg-warm-200 text-earth-700 text-xs rounded">
                      Color: {item.variants.color}
                    </span>
                  )}
                  {item.variants.size && (
                    <span className="inline-flex items-center px-2 py-1 bg-warm-200 text-earth-700 text-xs rounded">
                      Talla: {item.variants.size}
                    </span>
                  )}
                  {item.variants.material && (
                    <span className="inline-flex items-center px-2 py-1 bg-warm-200 text-earth-700 text-xs rounded">
                      Material: {item.variants.material}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Precio unitario */}
          <div className="text-right">
            <div className="text-lg font-bold text-earth-800">
              {formatPrice(item.price)}
            </div>
            {item.originalPrice && item.originalPrice > item.price && (
              <div className="text-sm text-earth-400 line-through">
                {formatPrice(item.originalPrice)}
              </div>
            )}
          </div>
        </div>

        {/* Controles de cantidad y eliminar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
          <div className="flex items-center gap-4">
            <QuantitySelector
              initialQuantity={item.quantity}
              maxQuantity={item.stock}
              stock={item.stock}
              onChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
              label="Cantidad"
              showStock={false}
              size="sm"
            />
            
            {item.stock <= 5 && (
              <span className="text-sm text-accent-600">
                Solo {item.stock} disponibles
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Precio total del item */}
            <div className="text-right">
              <div className="text-lg font-bold text-earth-800">
                {formatPrice(item.price * item.quantity)}
              </div>
              <div className="text-xs text-earth-500">
                {item.quantity} × {formatPrice(item.price)}
              </div>
            </div>

            {/* Botón eliminar */}
            <button
              onClick={() => handleRemoveItem(item.id, item.name)}
              className="p-2 text-accent-600 hover:text-accent-800 hover:bg-accent-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
              aria-label={`Eliminar ${item.name} del carrito`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Carrito vacío
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-warm-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-earth-800 mb-2">Tu Carrito</h1>
            <p className="text-earth-600">Gestiona los productos que quieres comprar</p>
          </div>

          {/* Estado vacío */}
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-warm-200 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-earth-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-earth-800 mb-4">Tu carrito está vacío</h2>
            <p className="text-earth-600 mb-8 max-w-md mx-auto">
              Parece que aún no has agregado ningún producto. Descubre nuestras artesanías únicas y encuentra algo especial.
            </p>
            <button
              onClick={onContinueShopping}
              className="inline-flex items-center px-6 py-3 bg-earth-600 hover:bg-earth-700 text-warm-50 font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-earth-500 focus:ring-offset-2"
            >
              Explorar Productos
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-earth-800 mb-2">Tu Carrito</h1>
            <p className="text-earth-600">
              {state.totalItems} {state.totalItems === 1 ? 'producto' : 'productos'} en tu carrito
            </p>
          </div>
          
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button
              onClick={onContinueShopping}
              className="px-4 py-2 text-earth-600 border border-earth-300 rounded-lg hover:bg-earth-50 transition-colors focus:outline-none focus:ring-2 focus:ring-earth-500 focus:ring-offset-2"
            >
              Seguir Comprando
            </button>
            <button
              onClick={handleClearCart}
              className="px-4 py-2 text-accent-600 border border-accent-300 rounded-lg hover:bg-accent-50 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
            >
              Vaciar Carrito
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <CartItemComponent key={`${item.id}-${JSON.stringify(item.variants)}`} item={item} />
            ))}
          </div>

          {/* Resumen del carrito */}
          <div className="lg:col-span-1">
            <div className="bg-warm-100 rounded-xl p-6 border border-warm-200 sticky top-8">
              <h2 className="text-xl font-semibold text-earth-800 mb-4">Resumen del Pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-earth-700">
                  <span>Subtotal ({state.totalItems} productos)</span>
                  <span className="font-medium">{formatPrice(cartSummary.subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-earth-700">
                  <span>IVA (19%)</span>
                  <span className="font-medium">{formatPrice(cartSummary.tax)}</span>
                </div>
                
                <div className="flex justify-between text-earth-700">
                  <span className="flex items-center gap-1">
                    Envío
                    {cartSummary.shipping === 0 && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">GRATIS</span>
                    )}
                  </span>
                  <span className="font-medium">
                    {cartSummary.shipping === 0 ? 'Gratis' : formatPrice(cartSummary.shipping)}
                  </span>
                </div>
                
                <div className="border-t border-warm-300 pt-3">
                  <div className="flex justify-between text-lg font-bold text-earth-800">
                    <span>Total</span>
                    <span>{formatPrice(cartSummary.total)}</span>
                  </div>
                </div>
              </div>

              {/* Información de envío gratis */}
              {cartSummary.subtotal < 100000 && (
                <div className="mb-6 p-3 bg-earth-50 rounded-lg border border-earth-200">
                  <div className="text-sm text-earth-700">
                    <p className="font-medium mb-1">¡Envío gratis desde $100.000!</p>
                    <p>
                      Te faltan {formatPrice(100000 - cartSummary.subtotal)} para obtener envío gratuito.
                    </p>
                  </div>
                </div>
              )}

              {/* Botón de checkout */}
              <button
                onClick={onNavigateToCheckout}
                disabled={state.items.length === 0}
                className="w-full py-3 bg-earth-600 hover:bg-earth-700 disabled:bg-earth-300 disabled:cursor-not-allowed text-warm-50 font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-earth-500 focus:ring-offset-2"
              >
                Proceder al Checkout
              </button>

              {/* Métodos de pago aceptados */}
              <div className="mt-6 text-center">
                <p className="text-sm text-earth-600 mb-2">Métodos de pago aceptados:</p>
                <div className="flex justify-center items-center gap-3 text-earth-400">
                  {/* Iconos de métodos de pago - se podrían usar iconos reales */}
                  <div className="w-8 h-5 bg-earth-200 rounded flex items-center justify-center text-xs font-bold">VISA</div>
                  <div className="w-8 h-5 bg-earth-200 rounded flex items-center justify-center text-xs font-bold">MC</div>
                  <div className="w-8 h-5 bg-earth-200 rounded flex items-center justify-center text-xs font-bold">PSE</div>
                </div>
              </div>

              {/* Garantía y seguridad */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-earth-600">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Compra 100% segura</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-earth-600">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Garantía de calidad</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-earth-600">
                  <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Envío en 2-5 días hábiles</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Productos recomendados */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-earth-800 mb-6 text-center">
            También te puede interesar
          </h2>
          <div className="bg-warm-100 rounded-lg p-6 text-center text-earth-600">
            {/* Aquí se integrarían productos recomendados usando el ProductGrid */}
            <p>Sección de productos recomendados</p>
            <p className="text-sm mt-2">
              💡 Integración futura: Algoritmo de recomendaciones basado en items del carrito
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;