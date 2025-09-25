# Carpeta Utils

Esta carpeta contiene funciones utilitarias y helpers reutilizables.

## Archivos sugeridos:

```
utils/
├── formatters.ts    # Funciones para formatear datos
├── validators.ts    # Funciones de validación
├── helpers.ts       # Funciones helper generales
├── constants.ts     # Constantes utilitarias
└── types.ts        # Tipos compartidos
```

## Ejemplos de utilidades:

```typescript
// formatters.ts
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(price)
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-CO').format(date)
}

// validators.ts
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]+$/
  return phoneRegex.test(phone)
}

// helpers.ts
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}
```