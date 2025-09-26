import React, { useEffect } from 'react';
import ProductGrid, { sampleProducts } from '../components/ui/ProductGrid';

interface CategoryCard {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  slug: string;
}

interface HomeProps {
  /** Datos para el SEO */
  seo?: {
    title?: string;
    description?: string;
  };
  /** Categorías destacadas */
  featuredCategories?: CategoryCard[];
  /** Productos destacados */
  featuredProducts?: typeof sampleProducts;
  /** Configuración del hero */
  hero?: {
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage?: string;
  };
}

const Home: React.FC<HomeProps> = ({
  seo = {
    title: 'Handyman - Artesanías Únicas Hechas a Mano',
    description: 'Descubre nuestra colección de productos artesanales únicos: gorras, muñecos, ponchos y sweaters. Calidad premium hecha a mano con amor.',
  },
  featuredCategories = defaultCategories,
  featuredProducts = sampleProducts.slice(0, 8),
  hero = {
    title: 'Artesanías Únicas\nHechas con Amor',
    subtitle: 'Descubre productos únicos creados por artesanos locales con materiales de la más alta calidad',
    ctaText: 'Explorar Colección',
    backgroundImage: '/LaNik-/img/gorras/gorro1.webp',
  },
}) => {
  
  // SEO dinámico
  useEffect(() => {
    // Actualizar título de página
    document.title = seo.title || 'Handyman - Artesanías Únicas';
    
    // Actualizar meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seo.description || '');

    // JSON-LD para la organización
    const organizationJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Handyman',
      description: 'Tienda de artesanías únicas hechas a mano',
      url: window.location.origin,
      logo: `${window.location.origin}/logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+57-300-123-4567',
        contactType: 'customer service',
        availableLanguage: 'Spanish'
      },
      sameAs: [
        'https://www.facebook.com/handyman',
        'https://www.instagram.com/handyman',
        'https://www.twitter.com/handyman'
      ]
    };

    // Website JSON-LD
    const websiteJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Handyman',
      url: window.location.origin,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${window.location.origin}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    };

    // Insertar JSON-LD
    const existingScript = document.querySelector('#home-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'home-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify([organizationJsonLd, websiteJsonLd]);
    document.head.appendChild(script);

    // Cleanup
    return () => {
      const scriptToRemove = document.querySelector('#home-jsonld');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [seo]);

  const handleCategoryClick = (category: CategoryCard) => {
    // Navegar a categoría - se implementará con router
    console.log('Navigate to category:', category.slug);
  };

  const handleProductClick = (product: any) => {
    // Navegar a producto - se implementará con router
    console.log('Navigate to product:', product.id);
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    // Agregar al carrito - se implementará con contexto
    console.log('Add to cart:', productId, quantity);
  };

  const scrollToProducts = () => {
    document.getElementById('featured-products')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-earth-800 via-earth-700 to-earth-600"
        role="banner"
        aria-label="Sección principal"
      >
        {/* Background Image */}
        {hero.backgroundImage && (
          <div className="absolute inset-0">
            <img
              src={hero.backgroundImage}
              alt="Artesanías handyman"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-earth-900/60 via-earth-800/40 to-earth-700/60" />
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-warm-50 mb-6 leading-tight">
            {hero.title.split('\n').map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h1>
          
          <p className="text-xl sm:text-2xl text-warm-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            {hero.subtitle}
          </p>

          <button
            onClick={scrollToProducts}
            className="inline-flex items-center px-8 py-4 bg-accent-500 hover:bg-accent-600 text-warm-50 font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-earth-800"
            aria-label={hero.ctaText}
          >
            {hero.ctaText}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-warm-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-warm-50" aria-label="Categorías destacadas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-earth-800 mb-4">
              Nuestras Categorías
            </h2>
            <p className="text-lg text-earth-600 max-w-2xl mx-auto">
              Explora nuestra amplia selección de productos artesanales únicos, cada uno creado con dedicación y técnicas tradicionales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="group relative bg-warm-100 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-earth-500 focus:ring-offset-2"
                tabIndex={0}
                role="button"
                aria-label={`Explorar categoría ${category.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCategoryClick(category);
                  }
                }}
              >
                <div className="aspect-w-16 aspect-h-10">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-warm-100 text-sm mb-2 line-clamp-2">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-warm-200 text-sm">
                      {category.productCount} productos
                    </span>
                    <svg 
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestras Prendas en Acción Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-earth-50 to-warm-50" aria-label="Nuestras prendas en acción">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-earth-800 mb-4">
              Nuestras Prendas en Acción
            </h2>
            <p className="text-lg text-earth-600 max-w-3xl mx-auto">
              Descubre cómo nuestras creaciones artesanales se lucen en la vida real. Cada prenda cuenta una historia única y refleja el amor por los detalles.
            </p>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Imagen Grande - Especial 1 */}
            <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
              <img
                src="/LaNik-/img/destacadas/especial1.webp"
                alt="Suéter artesanal de alta calidad"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Diseño Especial</h3>
                <p className="text-warm-100 text-sm">Prendas únicas que reflejan nuestra pasión artesanal</p>
              </div>
            </div>

            {/* Imagen Mediana - Gorra 1 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <img
                src="/LaNik-/img/destacadas/gorras1.webp"
                alt="Gorra tejida a mano"
                className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-semibold">Gorras Artesanales</h4>
              </div>
            </div>

            {/* Imagen Mediana - Poncho 1 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <img
                src="/LaNik-/img/destacadas/ponchos1.webp"
                alt="Poncho tradicional tejido"
                className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-semibold">Ponchos Tradicionales</h4>
              </div>
            </div>

            {/* Imagen Pequeña - Pulóver 3 */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <img
                src="/LaNik-/img/destacadas/pulover3.webp"
                alt="Pulóver de punto detallado"
                className="w-full h-32 md:h-40 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Imagen Mediana - Especial 2 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <img
                src="/LaNik-/img/destacadas/especial2.webp"
                alt="Conjunto artesanal premium"
                className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-semibold">Colección Premium</h4>
              </div>
            </div>

            {/* Imagen Grande Vertical - Poncho 2 */}
            <div className="row-span-2 group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <img
                src="/LaNik-/img/destacadas/ponchos2.webp"
                alt="Poncho colorido tradicional"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-bold mb-1">Ponchos Coloridos</h3>
                <p className="text-warm-100 text-sm">Tradición y color en cada hebra</p>
              </div>
            </div>

            {/* Imagen Mediana - Pulóver 1 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <img
                src="/LaNik-/img/destacadas/pulover1.webp"
                alt="Pulóver con patrón único"
                className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-semibold">Pulóveres Únicos</h4>
              </div>
            </div>

            {/* Imagen Pequeña - Gorra 2 */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <img
                src="/LaNik-/img/destacadas/gorras2.webp"
                alt="Gorra con bordado especial"
                className="w-full h-32 md:h-40 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Imagen Mediana - Pulóver 4 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <img
                src="/LaNik-/img/destacadas/pulover4.webp"
                alt="Pulóver de diseño contemporáneo"
                className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-semibold">Diseño Contemporáneo</h4>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 rounded-full mb-4">
              <svg className="w-8 h-8 text-warm-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-earth-800 mb-3">¿Te Gusta Lo Que Ves?</h3>
            <p className="text-earth-600 mb-6 max-w-md mx-auto">
              Cada prenda es única y está esperando por ti. Explora nuestra colección completa.
            </p>
            <button
              onClick={() => console.log('Navigate to gallery')}
              className="inline-flex items-center px-8 py-3 bg-accent-500 hover:bg-accent-600 text-warm-50 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2"
            >
              Ver Toda la Colección
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section 
        id="featured-products" 
        className="py-16 lg:py-24 bg-warm-100" 
        aria-label="Productos destacados"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-earth-800 mb-4">
              Productos Destacados
            </h2>
            <p className="text-lg text-earth-600 max-w-2xl mx-auto">
              Descubre algunos de nuestros productos más populares, cuidadosamente seleccionados por su calidad excepcional y diseño único.
            </p>
          </div>

          <ProductGrid
            products={featuredProducts}
            columns={{
              base: 1,
              sm: 2,
              md: 3,
              lg: 4,
            }}
            gap="lg"
            cardSize="md"
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            showFavorites={true}
          />

          {/* Ver todos los productos */}
          <div className="text-center mt-12">
            <button
              onClick={() => console.log('Navigate to all products')}
              className="inline-flex items-center px-8 py-3 bg-earth-600 hover:bg-earth-700 text-warm-50 font-semibold rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-earth-500 focus:ring-offset-2"
            >
              Ver Todos los Productos
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-earth-800" aria-label="Suscripción al newsletter">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-warm-50 mb-4">
            Mantente al Día
          </h2>
          <p className="text-warm-200 text-lg mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y sé el primero en conocer nuestros nuevos productos y ofertas especiales.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email" className="sr-only">Dirección de correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-3 rounded-lg border border-earth-600 bg-earth-700 text-warm-50 placeholder-warm-300 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              required
              aria-describedby="email-help"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-warm-50 font-semibold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-earth-800"
            >
              Suscribirse
            </button>
          </form>
          <p id="email-help" className="text-warm-300 text-sm mt-3">
            No compartimos tu información. Cancela cuando quieras.
          </p>
        </div>
      </section>
    </div>
  );
};

// Categorías por defecto
const defaultCategories: CategoryCard[] = [
  {
    id: '1',
    name: 'Gorras',
    description: 'Gorras artesanales bordadas a mano con diseños únicos y materiales de alta calidad.',
    image: '/LaNik-/img/gorras/gorro1.webp',
    productCount: 23,
    slug: 'gorras',
  },
  {
    id: '2',
    name: 'Muñecos',
    description: 'Muñecos de trapo tradicionales hechos con amor y materiales naturales.',
    image: '/LaNik-/img/muñecos/muneco1.webp',
    productCount: 18,
    slug: 'munecos',
  },

  {
    id: '4',
    name: 'Ponchos',
    description: 'Ponchos tejidos en telar con lana de alpaca y diseños geométricos.',
    image: '/LaNik-/img/ponchos/poncho1.webp',
    productCount: 15,
    slug: 'ponchos',
  },
  {
    id: '5',
    name: 'Sweaters',
    description: 'Sweaters de alpaca premium tejidos a mano con técnicas ancestrales.',
    image: '/LaNik-/img/sweaters/sueter1.webp',
    productCount: 20,
    slug: 'sweaters',
  },
];

export default Home;