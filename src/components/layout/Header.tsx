import React, { useState } from 'react';

interface HeaderProps {
  cartItemsCount?: number;
  onCategorySelect?: (category: string) => void;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartItemsCount = 0, 
  onCategorySelect = () => {},
  onSearch = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'gorras', name: 'Gorras', href: '/productos/gorras' },
    { id: 'muñecos', name: 'Muñecos', href: '/productos/muñecos' },
    { id: 'sweaters', name: 'Sweaters', href: '/productos/sweaters' },
    { id: 'ponchos', name: 'Ponchos', href: '/productos/ponchos' },
    { id: 'pinturas', name: 'Pinturas', href: '/productos/pinturas' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-warm-50 shadow-sm border-b border-warm-200" role="banner">
      {/* Top bar - Solo desktop */}
      <div className="hidden md:block bg-earth-600 text-warm-50 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <p>📞 Contacto: +57 300 123 4567</p>
            <p>🚚 Envío gratis en compras superiores a $100.000</p>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <a 
              href="/" 
              className="flex items-center space-x-2 group"
              aria-label="HANDYMAN - Inicio"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-earth-500 rounded-full flex items-center justify-center group-hover:bg-earth-600 transition-colors duration-200">
                <span className="text-warm-50 font-bold text-lg md:text-xl">H</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold text-earth-700 tracking-tight">
                  HANDYMAN
                </h1>
                <p className="text-xs text-earth-500 -mt-1">Tejidos artesanales</p>
              </div>
            </a>
          </div>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full" role="search">
              <div className="relative">
                <label htmlFor="search" className="sr-only">
                  Buscar productos
                </label>
                <input
                  id="search"
                  type="search"
                  placeholder="Buscar productos artesanales..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-12 text-earth-700 bg-warm-100 border border-warm-300 rounded-full focus:outline-none focus:ring-2 focus:ring-earth-500 focus:border-transparent placeholder-earth-400"
                  aria-describedby="search-help"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-earth-500 hover:text-earth-700 focus:outline-none focus:text-earth-700"
                  aria-label="Buscar"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              <p id="search-help" className="sr-only">
                Escribe para buscar entre nuestros productos artesanales
              </p>
            </form>
          </div>

          {/* Cart and menu - Right side */}
          <div className="flex items-center space-x-4">
            
            {/* Cart button */}
            <a 
              href="/carrito"
              className="relative p-2 text-earth-600 hover:text-earth-700 focus:outline-none focus:ring-2 focus:ring-earth-500 rounded-lg transition-colors duration-200"
              aria-label={`Carrito de compras, ${cartItemsCount} productos`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-600 text-warm-50 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-earth-600 hover:text-earth-700 focus:outline-none focus:ring-2 focus:ring-earth-500 rounded-lg"
              aria-label="Abrir menú de navegación"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:block border-t border-warm-200 py-4" role="navigation" aria-label="Categorías principales">
          <ul className="flex space-x-8">
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href={category.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onCategorySelect(category.id);
                  }}
                  className="text-earth-600 hover:text-earth-800 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-earth-500 focus:ring-offset-2 rounded px-2 py-1"
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-warm-100 border-t border-warm-200" role="navigation" aria-label="Menú móvil">
          <div className="px-4 py-4 space-y-4">
            
            {/* Mobile search */}
            <form onSubmit={handleSearch} role="search">
              <div className="relative">
                <label htmlFor="mobile-search" className="sr-only">
                  Buscar productos
                </label>
                <input
                  id="mobile-search"
                  type="search"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-12 text-earth-700 bg-warm-50 border border-warm-300 rounded-full focus:outline-none focus:ring-2 focus:ring-earth-500"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-earth-500"
                  aria-label="Buscar"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Mobile navigation */}
            <nav>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a
                      href={category.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onCategorySelect(category.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block px-3 py-2 text-earth-700 font-medium hover:bg-warm-200 rounded-lg transition-colors duration-200 focus:outline-none focus:bg-warm-200"
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;