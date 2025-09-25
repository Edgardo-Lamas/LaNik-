# Carpeta Contexts

Esta carpeta contiene los Context Providers de React para el estado global de la aplicación.

## Contexts sugeridos para e-commerce:

```
contexts/
├── CartContext.tsx      # Estado del carrito de compras
├── AuthContext.tsx      # Estado de autenticación
├── ThemeContext.tsx     # Estado del tema (light/dark)
└── ProductContext.tsx   # Estado de productos y filtros
```

## Estructura recomendada para cada contexto:

```typescript
// Ejemplo: CartContext.tsx
import { createContext, useContext, useReducer } from 'react'

// Tipos
interface CartState {
  items: CartItem[]
  total: number
}

// Context
const CartContext = createContext<CartContextType | null>(null)

// Provider
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // lógica del contexto
}

// Hook personalizado
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
```