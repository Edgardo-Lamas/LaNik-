import React, { useState, useEffect } from 'react';
import ProductGallery, { sampleGalleryImages } from '../components/ui/ProductGallery';
import CartButton from '../components/ui/CartButton';
import QuantitySelector from '../components/ui/QuantitySelector';

interface ProductVariant {
  id: string;
  name: string;
  value: string;
  available: boolean;
  price?: number;
}

interface ProductSpec {
  label: string;
  value: string;
}

interface ProductData {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  sku: string;
  description: string;
  shortDescription: string;
  category: string;
  subcategory?: string;
  brand: string;
  inStock: boolean;
  stock: number;
  images: typeof sampleGalleryImages;
  variants?: {
    colors?: ProductVariant[];
    sizes?: ProductVariant[];
    materials?: ProductVariant[];
  };
  specifications: ProductSpec[];
  materials: string[];
  care: string[];
  features: string[];
  badge?: {
    text: string;
    type: 'sale' | 'new' | 'limited';
  };
}

interface ProductPageProps {
  product?: ProductData;
  loading?: boolean;
  relatedProducts?: ProductData[];
}

const Product: React.FC<ProductPageProps> = ({
  product = sampleProduct,
  loading = false,
}) => {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  // SEO dinámico y JSON-LD
  useEffect(() => {
    if (!product) return;

    const title = `${product.name} - ${product.category} | Handyman`;
    const description = `${product.shortDescription} ${product.description.substring(0, 100)}...`;
    
    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // JSON-LD para el producto
    const productJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      sku: product.sku,
      brand: {
        '@type': 'Brand',
        name: product.brand
      },
      category: product.category,
      image: product.images.map(img => `${window.location.origin}${img.src}`),
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'COP',
        availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        condition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: 'Handyman'
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '24'
      }
    };

    const existingScript = document.querySelector('#product-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'product-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(productJsonLd);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('#product-jsonld');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [product]);

  const handleVariantChange = (type: string, value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    if (!product.inStock || addingToCart) return;
    
    setAddingToCart(true);
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Add to cart:', {
      productId: product.id,
      quantity,
      variants: selectedVariants
    });
    
    setAddingToCart(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getSelectedPrice = () => {
    let basePrice = product.price;
    
    // Aquí se calcularían variaciones de precio según variantes seleccionadas
    Object.entries(selectedVariants).forEach(([type, value]) => {
      const variant = product.variants?.[type as keyof typeof product.variants]?.find(v => v.value === value);
      if (variant?.price) {
        basePrice = variant.price;
      }
    });
    
    return basePrice;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-50 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-warm-200 rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-warm-200 rounded" />
              <div className="h-6 bg-warm-200 rounded w-3/4" />
              <div className="h-10 bg-warm-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-earth-800 mb-2">Producto no encontrado</h1>
          <p className="text-earth-600 mb-4">El producto que buscas no existe o ha sido eliminado.</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-earth-600 text-warm-50 rounded-lg hover:bg-earth-700 transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Breadcrumbs */}
      <div className="bg-warm-100 border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <button className="text-earth-600 hover:text-earth-800 transition-colors">
                  Inicio
                </button>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-earth-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <button className="text-earth-600 hover:text-earth-800 transition-colors">
                  {product.category}
                </button>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-earth-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-earth-800 font-medium truncate">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Gallery */}
          <div className="order-1">
            <ProductGallery
              images={product.images}
              initialImageIndex={selectedImageIndex}
              size="lg"
              showThumbnails={true}
              thumbnailPosition="bottom"
              enableZoom={true}
              onImageChange={(index) => setSelectedImageIndex(index)}
            />
          </div>

          {/* Product Info */}
          <div className="order-2 lg:sticky lg:top-8 lg:self-start">
            {/* Badge */}
            {product.badge && (
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                product.badge.type === 'sale' ? 'bg-accent-100 text-accent-800' :
                product.badge.type === 'new' ? 'bg-earth-100 text-earth-800' :
                'bg-warm-100 text-warm-800'
              }`}>
                {product.badge.text}
              </div>
            )}

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-earth-800 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Short Description */}
            <p className="text-lg text-earth-600 mb-6 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-earth-800">
                {formatPrice(getSelectedPrice())}
              </span>
              {product.originalPrice && product.originalPrice > getSelectedPrice() && (
                <span className="text-xl text-earth-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <div className="flex items-center gap-2 text-earth-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{product.stock > 5 ? 'En stock' : `Solo ${product.stock} disponibles`}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-accent-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Agotado</span>
                </div>
              )}
            </div>

            {/* Variants */}
            {product.variants && (
              <div className="space-y-6 mb-8">
                {/* Colors */}
                {product.variants.colors && (
                  <div>
                    <h3 className="text-lg font-semibold text-earth-800 mb-3">Color</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.variants.colors.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => handleVariantChange('colors', color.value)}
                          disabled={!color.available}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedVariants.colors === color.value
                              ? 'border-earth-600 bg-earth-600 text-warm-50'
                              : 'border-earth-300 text-earth-700 hover:border-earth-500'
                          } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                          aria-label={`Seleccionar color ${color.name}`}
                        >
                          {color.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {product.variants.sizes && (
                  <div>
                    <h3 className="text-lg font-semibold text-earth-800 mb-3">Talla</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.variants.sizes.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => handleVariantChange('sizes', size.value)}
                          disabled={!size.available}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedVariants.sizes === size.value
                              ? 'border-earth-600 bg-earth-600 text-warm-50'
                              : 'border-earth-300 text-earth-700 hover:border-earth-500'
                          } ${!size.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                          aria-label={`Seleccionar talla ${size.name}`}
                        >
                          {size.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4 mb-8">
              <QuantitySelector
                initialQuantity={quantity}
                maxQuantity={product.stock}
                stock={product.stock}
                onChange={handleQuantityChange}
                label="Cantidad"
                showStock={true}
                disabled={!product.inStock}
              />

              <CartButton
                productId={product.id}
                quantity={quantity}
                available={product.inStock}
                loading={addingToCart}
                size="lg"
                onClick={handleAddToCart}
                className="w-full"
              />
            </div>

            {/* Product Details */}
            <div className="border-t border-warm-200 pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-earth-500">SKU:</span>
                  <span className="ml-2 text-earth-800 font-medium">{product.sku}</span>
                </div>
                <div>
                  <span className="text-earth-500">Marca:</span>
                  <span className="ml-2 text-earth-800 font-medium">{product.brand}</span>
                </div>
                <div>
                  <span className="text-earth-500">Categoría:</span>
                  <span className="ml-2 text-earth-800 font-medium">{product.category}</span>
                </div>
                <div>
                  <span className="text-earth-500">Stock:</span>
                  <span className="ml-2 text-earth-800 font-medium">{product.stock} unidades</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="border-t border-warm-200 pt-16">
          <div className="max-w-4xl mx-auto">
            {/* Tabs Navigation */}
            <div className="flex flex-wrap border-b border-warm-200 mb-8">
              {['Descripción', 'Especificaciones', 'Materiales', 'Cuidados'].map((tab, index) => (
                <button
                  key={tab}
                  className={`px-6 py-3 font-medium transition-colors ${
                    index === 0 
                      ? 'text-earth-800 border-b-2 border-earth-600' 
                      : 'text-earth-500 hover:text-earth-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-earth-800 mb-4">Descripción</h3>
                <div className="prose prose-earth max-w-none">
                  <p className="text-earth-700 leading-relaxed">{product.description}</p>
                  
                  {product.features.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-earth-800 mb-3">Características destacadas:</h4>
                      <ul className="list-disc list-inside space-y-2 text-earth-700">
                        {product.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-xl font-semibold text-earth-800 mb-4">Especificaciones</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-warm-200">
                      <span className="text-earth-600 font-medium">{spec.label}:</span>
                      <span className="text-earth-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div>
                <h3 className="text-xl font-semibold text-earth-800 mb-4">Materiales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.materials.map((material, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-earth-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-earth-700">{material}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Care Instructions */}
              <div>
                <h3 className="text-xl font-semibold text-earth-800 mb-4">Cuidados</h3>
                <div className="space-y-3">
                  {product.care.map((instruction, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-earth-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-earth-700">{instruction}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Producto de ejemplo
const sampleProduct: ProductData = {
  id: '1',
  name: 'Gorra Artesanal Bordada Tradicional',
  price: 45000,
  originalPrice: 60000,
  sku: 'GOR-001-ART',
  description: 'Esta hermosa gorra artesanal es el resultado de técnicas tradicionales de bordado transmitidas de generación en generación. Cada pieza es única y refleja la riqueza cultural de nuestros artesanos locales. Elaborada con materiales de primera calidad, combina comodidad, durabilidad y un diseño distintivo que la convierte en una pieza especial para cualquier ocasión.',
  shortDescription: 'Gorra artesanal única con bordados tradicionales hechos a mano por maestros artesanos.',
  category: 'Gorras',
  subcategory: 'Bordadas',
  brand: 'Handyman',
  inStock: true,
  stock: 8,
  images: sampleGalleryImages,
  variants: {
    colors: [
      { id: '1', name: 'Tierra', value: 'tierra', available: true },
      { id: '2', name: 'Ocre', value: 'ocre', available: true },
      { id: '3', name: 'Marfil', value: 'marfil', available: false },
    ],
    sizes: [
      { id: '1', name: 'S (54-56 cm)', value: 'S', available: true },
      { id: '2', name: 'M (56-58 cm)', value: 'M', available: true },
      { id: '3', name: 'L (58-60 cm)', value: 'L', available: true },
      { id: '4', name: 'XL (60-62 cm)', value: 'XL', available: false },
    ],
  },
  specifications: [
    { label: 'Material principal', value: 'Algodón 100%' },
    { label: 'Tipo de bordado', value: 'A mano' },
    { label: 'Circunferencia', value: '54-60 cm' },
    { label: 'Altura', value: '12 cm' },
    { label: 'Peso', value: '120 gr' },
    { label: 'Origen', value: 'Colombia' },
  ],
  materials: [
    'Algodón orgánico certificado',
    'Hilo de algodón mercerizado',
    'Entretela natural',
    'Botones de madera',
  ],
  care: [
    'Lavar a mano con agua fría',
    'No usar blanqueador ni químicos fuertes',
    'Secar a la sombra en superficie plana',
    'Planchar a temperatura media del lado reverso',
    'Guardar en lugar seco y ventilado',
  ],
  features: [
    'Bordado tradicional hecho completamente a mano',
    'Materiales 100% naturales y sostenibles',
    'Ajuste cómodo y transpirable',
    'Diseño único e irrepetible',
    'Resistente al uso diario',
    'Apoyo a artesanos locales',
  ],
  badge: {
    text: '25% OFF',
    type: 'sale',
  },
};

export default Product;