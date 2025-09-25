import React, { useState, useEffect } from 'react';
import ProductGrid, { sampleProducts } from '../components/ui/ProductGrid';

interface CategoryPageProps {
  /** Datos de la categoría */
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    image?: string;
    productCount: number;
  };
  /** Productos de la categoría */
  products?: typeof sampleProducts;
  /** Si está cargando */
  loading?: boolean;
}

type SortOption = 'name' | 'price-low' | 'price-high' | 'newest' | 'popular';
type ViewMode = 'grid' | 'list';

const Category: React.FC<CategoryPageProps> = ({
  category = {
    id: '1',
    name: 'Gorras',
    slug: 'gorras',
    description: 'Colección completa de gorras artesanales bordadas a mano con diseños únicos y materiales de alta calidad. Cada pieza es única y refleja la tradición artesanal de nuestros maestros.',
    productCount: 23,
    image: '/img/gorras/gorro1.jpeg',
  },
  products = sampleProducts.filter(p => p.category.toLowerCase() === 'gorras'),
  loading = false,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  // SEO dinámico
  useEffect(() => {
    const title = `${category.name} - Handyman Artesanías`;
    const description = `${category.description} Descubre nuestra colección de ${category.productCount} productos en ${category.name.toLowerCase()}.`;
    
    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // JSON-LD para la categoría
    const categoryJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: category.name,
      description: category.description,
      url: `${window.location.origin}/categoria/${category.slug}`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: category.productCount,
        itemListElement: products.slice(0, 10).map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: product.name,
            image: `${window.location.origin}${product.image}`,
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'COP',
              availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
            }
          }
        }))
      }
    };

    const existingScript = document.querySelector('#category-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'category-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(categoryJsonLd);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('#category-jsonld');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [category, products]);

  // Filtrar y ordenar productos
  useEffect(() => {
    let filtered = [...products];

    // Filtro por stock
    if (showOnlyInStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Filtro por rango de precio
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Ordenamiento
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Simulamos que productos con badge "new" son más nuevos
        filtered.sort((a, b) => {
          if (a.badge?.type === 'new' && b.badge?.type !== 'new') return -1;
          if (b.badge?.type === 'new' && a.badge?.type !== 'new') return 1;
          return 0;
        });
        break;
      case 'popular':
      default:
        // Simulamos popularidad con productos en stock primero
        filtered.sort((a, b) => {
          if (a.inStock && !b.inStock) return -1;
          if (b.inStock && !a.inStock) return 1;
          return 0;
        });
        break;
    }

    setFilteredProducts(filtered);
  }, [products, sortBy, priceRange, showOnlyInStock]);

  const handleProductClick = (product: any) => {
    console.log('Navigate to product:', product.id);
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    console.log('Add to cart:', productId, quantity);
  };

  const sortOptions = [
    { value: 'popular', label: 'Más Popular' },
    { value: 'name', label: 'Nombre A-Z' },
    { value: 'price-low', label: 'Menor Precio' },
    { value: 'price-high', label: 'Mayor Precio' },
    { value: 'newest', label: 'Más Recientes' },
  ];

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Breadcrumbs */}
      <div className="bg-warm-100 border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <button
                  onClick={() => console.log('Navigate to home')}
                  className="text-earth-600 hover:text-earth-800 transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-earth-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-earth-800 font-medium">{category.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <div className="relative bg-gradient-to-r from-earth-700 to-earth-600 py-16">
        {category.image && (
          <div className="absolute inset-0">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-earth-800/60 to-earth-700/60" />
          </div>
        )}
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-warm-50 mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-warm-100 max-w-3xl mx-auto leading-relaxed">
              {category.description}
            </p>
            <div className="mt-6 text-warm-200">
              {category.productCount} productos disponibles
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-warm-100 border-b border-warm-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side - Results count */}
            <div className="text-earth-700">
              Mostrando {filteredProducts.length} de {category.productCount} productos
            </div>

            {/* Right side - Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm font-medium text-earth-700">
                  Ordenar por:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-warm-50 border border-earth-300 rounded-lg px-3 py-2 text-earth-700 focus:outline-none focus:ring-2 focus:ring-earth-500 focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-earth-700 mr-2">Vista:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-earth-600 text-warm-50' 
                      : 'bg-warm-50 text-earth-600 hover:bg-earth-100'
                  }`}
                  aria-label="Vista de cuadrícula"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-earth-600 text-warm-50' 
                      : 'bg-warm-50 text-earth-600 hover:bg-earth-100'
                  }`}
                  aria-label="Vista de lista"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mt-4">
            <button
              onClick={() => {
                // Toggle mobile filters - se implementaría con estado
                console.log('Toggle mobile filters');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-earth-600 text-warm-50 rounded-lg hover:bg-earth-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              Filtros
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-warm-100 rounded-xl p-6 border border-warm-200">
              <h3 className="text-lg font-semibold text-earth-800 mb-4">Filtros</h3>
              
              {/* Stock Filter */}
              <div className="mb-6">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={showOnlyInStock}
                    onChange={(e) => setShowOnlyInStock(e.target.checked)}
                    className="rounded border-earth-300 text-earth-600 focus:ring-earth-500"
                  />
                  <span className="text-earth-700">Solo productos disponibles</span>
                </label>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-earth-800 mb-3">Rango de precio</h4>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="min-price" className="block text-sm text-earth-600 mb-1">
                      Mínimo
                    </label>
                    <input
                      type="number"
                      id="min-price"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="block text-sm text-earth-600 mb-1">
                      Máximo
                    </label>
                    <input
                      type="number"
                      id="max-price"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setPriceRange({ min: 0, max: 200000 });
                  setShowOnlyInStock(false);
                  setSortBy('popular');
                }}
                className="w-full px-4 py-2 text-earth-600 border border-earth-300 rounded-lg hover:bg-earth-50 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {filteredProducts.length === 0 && !loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-earth-200 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-earth-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-earth-800 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-earth-600 mb-4">
                  Intenta ajustar los filtros o revisar más tarde.
                </p>
                <button
                  onClick={() => {
                    setPriceRange({ min: 0, max: 200000 });
                    setShowOnlyInStock(false);
                  }}
                  className="px-6 py-2 bg-earth-600 text-warm-50 rounded-lg hover:bg-earth-700 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <ProductGrid
                products={filteredProducts}
                loading={loading}
                loadingCount={12}
                columns={{
                  base: 1,
                  sm: 2,
                  md: 2,
                  lg: 3,
                  xl: 4,
                }}
                gap="lg"
                cardSize="md"
                onProductClick={handleProductClick}
                onAddToCart={handleAddToCart}
                showFavorites={true}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Category;