# Carpeta Data

Esta carpeta contiene datos estáticos, mocks y configuraciones.

## Archivos sugeridos:

```
data/
├── products.ts      # Datos de productos (mock o estáticos)
├── categories.ts    # Categorías de productos
├── navigation.ts    # Enlaces de navegación
├── constants.ts     # Constantes de la aplicación
└── api/            # Configuración de APIs
    ├── endpoints.ts
    └── config.ts
```

## Ejemplo de estructura de productos:

```typescript
// products.ts
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  inStock: boolean
  featured?: boolean
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Gorra tejida artesanal',
    description: 'Gorra tejida a mano con lana de alta calidad',
    price: 25000,
    category: 'gorras',
    images: ['./img/gorras/...'],
    inStock: true,
    featured: true
  }
  // más productos...
]
```