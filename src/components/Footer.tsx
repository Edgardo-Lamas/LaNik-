import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente Footer con información de contacto y enlaces
 * Incluye redes sociales, información legal y suscripción al newsletter
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-amber-900 to-orange-900 text-white">
      {/* Sección principal del footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información de la empresa */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <h3 className="text-2xl font-bold">HANDYMAN</h3>
            </div>
            
            <p className="text-amber-100 mb-6 max-w-md leading-relaxed">
              Preservamos tradiciones milenarias a través de prendas tejidas a mano. 
              Cada pieza cuenta una historia de amor, dedicación y arte ancestral.
            </p>
            
            {/* Redes sociales */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-amber-800 hover:bg-amber-700 p-3 rounded-lg transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a 
                href="#" 
                className="bg-amber-800 hover:bg-amber-700 p-3 rounded-lg transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.875 2.026-1.297 3.323-1.297s2.448.422 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297z"/>
                </svg>
              </a>
              
              <a 
                href="#" 
                className="bg-amber-800 hover:bg-amber-700 p-3 rounded-lg transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-200">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-amber-100 hover:text-white transition-colors duration-300"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-amber-100 hover:text-white transition-colors duration-300"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-amber-100 hover:text-white transition-colors duration-300"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link 
                  to="/cart" 
                  className="text-amber-100 hover:text-white transition-colors duration-300"
                >
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-200">Contacto</h4>
            <ul className="space-y-3 text-amber-100">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">Bogotá, Colombia</span>
              </li>
              
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a 
                  href="mailto:info@artesaniahandyman.com" 
                  className="text-sm hover:text-white transition-colors duration-300"
                >
                  info@artesaniahandyman.com
                </a>
              </li>
              
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                  href="tel:+573001234567" 
                  className="text-sm hover:text-white transition-colors duration-300"
                >
                  +57 300 123 4567
                </a>
              </li>
              
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Lun - Vie: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-amber-800 mt-8 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-3 text-amber-200">
              Suscríbete a nuestro Newsletter
            </h4>
            <p className="text-amber-100 text-sm mb-4">
              Recibe las últimas noticias sobre nuestros productos artesanales
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-2 rounded-lg bg-amber-800 border border-amber-700 text-white placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Suscribir
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Sección inferior con copyright y políticas */}
      <div className="bg-amber-950 border-t border-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-amber-200">
            <div className="mb-2 md:mb-0">
              <p>&copy; {currentYear} HANDYMAN. Todos los derechos reservados.</p>
            </div>
            
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="hover:text-white transition-colors duration-300"
              >
                Política de Privacidad
              </a>
              <a 
                href="#" 
                className="hover:text-white transition-colors duration-300"
              >
                Términos de Uso
              </a>
              <a 
                href="#" 
                className="hover:text-white transition-colors duration-300"
              >
                Política de Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;