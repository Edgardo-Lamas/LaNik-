import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

/**
 * Componente Header con navegación y carrito
 * Incluye menú responsive y contador de items del carrito
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { state } = useCart();
  const itemCount = state.totalItems;

  /**
   * Verifica si la ruta actual está activa
   */
  const isActiveRoute = (path: string): boolean => {
    return location.pathname === path;
  };

  /**
   * Clases CSS para enlaces activos
   */
  const getNavLinkClasses = (path: string): string => {
    const baseClasses = "font-medium transition-colors duration-300";
    const activeClasses = "text-amber-700 border-b-2 border-amber-600";
    const inactiveClasses = "text-amber-800 hover:text-amber-700 hover:border-b-2 hover:border-amber-400";
    
    return `${baseClasses} ${isActiveRoute(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div className="text-2xl font-bold text-amber-900">
                HANDYMAN
              </div>
            </Link>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={getNavLinkClasses('/')}
            >
              Inicio
            </Link>
            
            <Link 
              to="/about" 
              className={getNavLinkClasses('/about')}
            >
              Nosotros
            </Link>

            <Link 
              to="/art" 
              className={getNavLinkClasses('/art')}
            >
              Pinturas
            </Link>
            
            <Link 
              to="/contact" 
              className={getNavLinkClasses('/contact')}
            >
              Contacto
            </Link>
            
            {/* Carrito */}
            <Link 
              to="/cart" 
              className="relative flex items-center space-x-2 bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-lg transition-colors duration-300"
            >
              <svg 
                className="w-5 h-5 text-amber-700" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 110-4m8 4a2 2 0 110-4" 
                />
              </svg>
              <span className="font-medium text-amber-800">Carrito</span>
              
              {/* Contador de items */}
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Botón de menú móvil */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Carrito móvil */}
            <Link 
              to="/cart" 
              className="relative p-2"
            >
              <svg 
                className="w-6 h-6 text-amber-700" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-label="Carrito de compras"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 110-4m8 4a2 2 0 110-4" 
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Botón hamburguesa */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-amber-700 hover:text-amber-900 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-expanded={isMenuOpen}
              aria-label="Menú principal"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-amber-100">
            <Link 
              to="/" 
              className={`block px-4 py-3 text-base font-medium rounded-md ${
                isActiveRoute('/') 
                  ? 'text-amber-700 bg-amber-50' 
                  : 'text-amber-800 hover:text-amber-700 hover:bg-amber-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            
            <Link 
              to="/about" 
              className={`block px-4 py-3 text-base font-medium rounded-md ${
                isActiveRoute('/about') 
                  ? 'text-amber-700 bg-amber-50' 
                  : 'text-amber-800 hover:text-amber-700 hover:bg-amber-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Nosotros
            </Link>

            <Link 
              to="/art" 
              className={`block px-4 py-3 text-base font-medium rounded-md ${
                isActiveRoute('/art') 
                  ? 'text-amber-700 bg-amber-50' 
                  : 'text-amber-800 hover:text-amber-700 hover:bg-amber-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Pinturas
            </Link>
            
            <Link 
              to="/contact" 
              className={`block px-4 py-3 text-base font-medium rounded-md ${
                isActiveRoute('/contact') 
                  ? 'text-amber-700 bg-amber-50' 
                  : 'text-amber-800 hover:text-amber-700 hover:bg-amber-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
            
            {/* Separador */}
            <div className="border-t border-amber-200 my-2"></div>
            
            <div className="px-4 py-2">
              <Link 
                to="/cart" 
                className="flex items-center justify-between w-full bg-amber-600 text-white px-4 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="font-medium">Ver Carrito</span>
                {itemCount > 0 && (
                  <span className="bg-amber-800 text-amber-100 px-2 py-1 rounded-full text-sm font-bold">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;