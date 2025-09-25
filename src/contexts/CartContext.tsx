import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Tipos para el carrito
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  imageAlt: string;
  category: string;
  sku: string;
  quantity: number;
  stock: number;
  variants?: {
    color?: string;
    size?: string;
    material?: string;
  };
  // Para calcular precios con descuentos
  originalPrice?: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

// Acciones del carrito
type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean };

// Estado inicial
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
};

// Funciones helper
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalItems, totalPrice };
};

const findItemIndex = (items: CartItem[], id: string, variants?: CartItem['variants']) => {
  return items.findIndex(item => {
    if (item.id !== id) return false;
    
    // Si no hay variantes, es el mismo producto
    if (!variants && !item.variants) return true;
    
    // Comparar variantes
    const itemVariants = item.variants || {};
    const newVariants = variants || {};
    
    return (
      itemVariants.color === newVariants.color &&
      itemVariants.size === newVariants.size &&
      itemVariants.material === newVariants.material
    );
  });
};

// Reducer del carrito
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = { ...action.payload, quantity: action.payload.quantity || 1 };
      const existingIndex = findItemIndex(state.items, newItem.id, newItem.variants);
      
      let updatedItems: CartItem[];
      
      if (existingIndex >= 0) {
        // El producto ya existe, aumentar cantidad
        updatedItems = [...state.items];
        const existingItem = updatedItems[existingIndex];
        const newQuantity = existingItem.quantity + newItem.quantity;
        
        // Verificar stock disponible
        if (newQuantity <= existingItem.stock) {
          updatedItems[existingIndex] = {
            ...existingItem,
            quantity: newQuantity
          };
        } else {
          // No se puede agregar más, mantener el máximo del stock
          updatedItems[existingIndex] = {
            ...existingItem,
            quantity: existingItem.stock
          };
        }
      } else {
        // Producto nuevo
        updatedItems = [...state.items, newItem as CartItem];
      }
      
      const totals = calculateTotals(updatedItems);
      
      return {
        ...state,
        items: updatedItems,
        ...totals,
      };
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => {
        // Para productos con variantes, necesitamos más lógica
        // Por ahora, removemos por ID simple
        return item.id !== action.payload;
      });
      
      const totals = calculateTotals(updatedItems);
      
      return {
        ...state,
        items: updatedItems,
        ...totals,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Si la cantidad es 0 o negativa, remover el item
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }
      
      const updatedItems = state.items.map(item => {
        if (item.id === id) {
          // Verificar stock disponible
          const newQuantity = Math.min(quantity, item.stock);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      
      const totals = calculateTotals(updatedItems);
      
      return {
        ...state,
        items: updatedItems,
        ...totals,
      };
    }
    
    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };
    }
    
    case 'LOAD_CART': {
      const totals = calculateTotals(action.payload);
      return {
        ...state,
        items: action.payload,
        ...totals,
        isLoading: false,
      };
    }
    
    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    
    default:
      return state;
  }
};

// Contexto
interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string, variants?: CartItem['variants']) => number;
  isItemInCart: (itemId: string, variants?: CartItem['variants']) => boolean;
  // Funciones adicionales útiles
  getTotalWeight: () => number;
  getCartSummary: () => {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider del contexto
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        const savedCart = localStorage.getItem('handyman-cart');
        if (savedCart) {
          const cartItems: CartItem[] = JSON.parse(savedCart);
          
          // Validar estructura de datos
          const validItems = cartItems.filter(item => 
            item.id && 
            item.name && 
            typeof item.price === 'number' &&
            typeof item.quantity === 'number' &&
            item.quantity > 0
          );
          
          dispatch({ type: 'LOAD_CART', payload: validItems });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadCartFromStorage();
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (!state.isLoading && state.items.length >= 0) {
      try {
        localStorage.setItem('handyman-cart', JSON.stringify(state.items));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [state.items, state.isLoading]);

  // Funciones del contexto
  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (itemId: string, variants?: CartItem['variants']): number => {
    const itemIndex = findItemIndex(state.items, itemId, variants);
    return itemIndex >= 0 ? state.items[itemIndex].quantity : 0;
  };

  const isItemInCart = (itemId: string, variants?: CartItem['variants']): boolean => {
    return getItemQuantity(itemId, variants) > 0;
  };

  const getTotalWeight = (): number => {
    // Simulamos un peso promedio de 200g por producto
    // En una implementación real, cada producto tendría su peso
    return state.items.reduce((total, item) => {
      const itemWeight = 0.2; // 200g en kg
      return total + (itemWeight * item.quantity);
    }, 0);
  };

  const getCartSummary = () => {
    const subtotal = state.totalPrice;
    const tax = subtotal * 0.19; // IVA 19% Colombia
    
    // Cálculo de envío basado en peso y valor
    let shipping = 0;
    const weight = getTotalWeight();
    
    if (subtotal > 0) {
      if (subtotal >= 100000) {
        // Envío gratis por compras mayores a $100,000
        shipping = 0;
      } else if (weight <= 1) {
        // Hasta 1kg
        shipping = 8000;
      } else if (weight <= 3) {
        // Hasta 3kg
        shipping = 12000;
      } else {
        // Más de 3kg
        shipping = 15000;
      }
    }
    
    const total = subtotal + tax + shipping;
    
    return { subtotal, tax, shipping, total };
  };

  const contextValue: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isItemInCart,
    getTotalWeight,
    getCartSummary,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el carrito
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Hook para formatear precios
export const useFormatPrice = () => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return { formatPrice };
};

// Funciones de utilidad para integración futura
export const cartUtils = {
  // Para integración con analytics (Google Analytics, Facebook Pixel)
  trackAddToCart: (item: CartItem) => {
    console.log('🔍 Analytics: Product added to cart', item);
    // Aquí se integraría con:
    // - Google Analytics 4: gtag('event', 'add_to_cart', {...})
    // - Facebook Pixel: fbq('track', 'AddToCart', {...})
    // - Mixpanel, Amplitude, etc.
  },

  trackRemoveFromCart: (item: CartItem) => {
    console.log('🔍 Analytics: Product removed from cart', item);
  },

  // Para integración con sistemas de inventario
  syncWithInventory: async (items: CartItem[]) => {
    console.log('📦 Inventory: Syncing cart items', items);
    // Aquí se integraría con:
    // - API de inventario para verificar stock en tiempo real
    // - Sistemas ERP (SAP, Oracle, etc.)
    // - Bases de datos de productos
    return items; // Retornar items actualizados
  },

  // Para integración con CMS
  enrichItemsWithCMS: async (items: CartItem[]) => {
    console.log('🌐 CMS: Enriching cart items with additional data', items);
    // Aquí se integraría con:
    // - Strapi, Contentful, Sanity
    // - WordPress REST API
    // - Shopify, WooCommerce
    return items;
  },

  // Para integración con sistemas de recomendación
  getRecommendations: async (cartItems: CartItem[]) => {
    console.log('🎯 Recommendations: Based on cart items', cartItems);
    // Aquí se integraría con:
    // - Algoritmos de ML propios
    // - Amazon Personalize
    // - Recommendation engines
    return [];
  },
};

export default CartContext;