import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';

// Páginas
import Home from './pages/Home';
import About from './pages/About';
import Art from './pages/Art';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-amber-50 flex flex-col">
          <Header />
          
          <main className="flex-1">
            <Routes>
              {/* Página principal */}
              <Route path="/" element={<Home />} />
              
              {/* Página sobre nosotros */}
              <Route path="/about" element={<About />} />
              
              {/* Rincón de Arte - Galería de pinturas */}
              <Route path="/art" element={<Art />} />
              
              {/* Página de contacto */}
              <Route path="/contact" element={<Contact />} />
              
              {/* Carrito de compras */}
              <Route path="/cart" element={<Cart />} />
              
              {/* Proceso de checkout */}
              <Route path="/checkout" element={<Checkout />} />
              
              {/* Página no encontrada */}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-amber-900 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-amber-800 mb-6">
                      Página no encontrada
                    </h2>
                    <a href="/" className="bg-amber-600 text-white px-6 py-3 rounded-lg">
                      Volver al inicio
                    </a>
                  </div>
                </div>
              } />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;