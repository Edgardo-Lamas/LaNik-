import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'Sobre nosotros', href: '/sobre-nosotros' },
      { name: 'Nuestra historia', href: '/historia' },
      { name: 'Proceso artesanal', href: '/proceso' },
    ],
    services: [
      { name: 'Información de envíos', href: '/envios' },
      { name: 'Devoluciones', href: '/devoluciones' },
      { name: 'Cuidado de productos', href: '/cuidado' },
    ],
    support: [
      { name: 'Contacto', href: '/contacto' },
      { name: 'Preguntas frecuentes', href: '/faq' },
      { name: 'Soporte', href: '/soporte' },
    ]
  };

  return (
    <footer className={`bg-earth-800 text-warm-100 ${className}`} role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-earth-500 rounded-full flex items-center justify-center">
                <span className="text-warm-50 font-bold text-xl">H</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-warm-50">HANDYMAN</h2>
                <p className="text-sm text-warm-300">Tejidos artesanales</p>
              </div>
            </div>
            <p className="text-warm-300 text-sm mb-4 leading-relaxed">
              Creamos prendas únicas tejidas a mano con amor y dedicación. 
              Cada pieza cuenta una historia de tradición y calidad artesanal.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4" role="list" aria-label="Redes sociales">
              <a 
                href="https://instagram.com/handyman" 
                className="text-warm-300 hover:text-warm-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-warm-300 rounded"
                aria-label="Síguenos en Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.624 5.367 11.99 11.988 11.99s11.99-5.366 11.99-11.99C24.007 5.367 18.641.001 12.017.001zM8.449 20.25c-2.8 0-5.071-2.272-5.071-5.07 0-2.799 2.271-5.072 5.071-5.072 2.798 0 5.07 2.273 5.07 5.072 0 2.798-2.272 5.07-5.07 5.07zm7.44-10.896a1.23 1.23 0 110-2.46 1.23 1.23 0 010 2.46z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a 
                href="https://facebook.com/handyman" 
                className="text-warm-300 hover:text-warm-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-warm-300 rounded"
                aria-label="Síguenos en Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a 
                href="https://wa.me/573001234567" 
                className="text-warm-300 hover:text-warm-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-warm-300 rounded"
                aria-label="Contáctanos por WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-warm-50 font-semibold text-sm uppercase tracking-wider mb-4">
              Empresa
            </h3>
            <ul className="space-y-3" role="list">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-warm-300 hover:text-warm-50 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-warm-300 rounded"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3 className="text-warm-50 font-semibold text-sm uppercase tracking-wider mb-4">
              Servicios
            </h3>
            <ul className="space-y-3" role="list">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-warm-300 hover:text-warm-50 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-warm-300 rounded"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="text-warm-50 font-semibold text-sm uppercase tracking-wider mb-4">
              Soporte
            </h3>
            <ul className="space-y-3" role="list">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-warm-300 hover:text-warm-50 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-warm-300 rounded"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Contact info */}
            <div className="mt-6 pt-6 border-t border-earth-700">
              <p className="text-warm-300 text-sm mb-2">
                <span className="font-medium">📞 Teléfono:</span><br />
                +57 300 123 4567
              </p>
              <p className="text-warm-300 text-sm">
                <span className="font-medium">✉️ Email:</span><br />
                <a 
                  href="mailto:hola@handyman.co" 
                  className="hover:text-warm-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-warm-300 rounded"
                >
                  hola@handyman.co
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-earth-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-warm-300 text-sm text-center md:text-left">
              © {currentYear} HANDYMAN. Todos los derechos reservados. Hecho con ❤️ en Colombia.
            </p>
            
            <div className="flex space-x-6 text-sm">
              <a 
                href="/privacidad" 
                className="text-warm-300 hover:text-warm-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-warm-300 rounded"
              >
                Política de Privacidad
              </a>
              <a 
                href="/terminos" 
                className="text-warm-300 hover:text-warm-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-warm-300 rounded"
              >
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;