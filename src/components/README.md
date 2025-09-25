# Carpeta Components

Esta carpeta contendrá todos los componentes reutilizables de React.

## Estructura recomendada:

```
components/
├── ui/              # Componentes básicos de UI
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   └── Card/
├── layout/          # Componentes de layout
│   ├── Header/
│   ├── Footer/
│   └── Sidebar/
└── product/         # Componentes específicos de productos
    ├── ProductCard/
    ├── ProductGrid/
    └── ProductDetail/
```

## Convenciones:
- Cada componente debe tener su propia carpeta
- Incluir archivo index.tsx para exportaciones
- Agregar archivos de tipos si es necesario (.types.ts)
- Documentar props con JSDoc cuando sea complejo