import React from 'react';
import { Heart, Users, Award, Leaf, MapPin, Clock } from 'lucide-react';

/**
 * Página About - Información sobre la marca artesanal
 * Enfoque en artesanía, prendas tejidas a mano y tradición
 */
const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">
              Nuestra Historia
            </h1>
            <p className="text-xl md:text-2xl text-amber-800 mb-8 leading-relaxed">
              Preservando tradiciones milenarias a través de prendas tejidas a mano
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-600 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-900">
                Artesanía con Alma
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Desde hace más de tres generaciones, nuestra familia ha dedicado su vida 
                a preservar las técnicas ancestrales de tejido a mano. Cada prenda que 
                creamos lleva consigo la historia, el amor y la dedicación de nuestros 
                artesanos.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Trabajamos directamente con comunidades indígenas de Colombia, 
                especialmente con las tejedoras Wayuu y artesanos de los Andes, 
                garantizando que cada pieza sea auténtica y que el comercio sea justo 
                para todos los involucrados.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                  <Heart className="w-4 h-4 mr-2" />
                  Hecho con amor
                </span>
                <span className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                  <Award className="w-4 h-4 mr-2" />
                  Tradición familiar
                </span>
                <span className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                  <Leaf className="w-4 h-4 mr-2" />
                  100% Natural
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="/LaNik-/img/muñecos/muneco1.webp"
                  alt="Artesanía tradicional hecha a mano"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">
              Nuestros Valores
            </h2>
            <p className="text-lg text-gray-700">
              Cada pieza que creamos refleja nuestros valores fundamentales y 
              nuestro compromiso con la excelencia artesanal.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Valor 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">
                Comercio Justo
              </h3>
              <p className="text-gray-700">
                Trabajamos directamente con artesanos, garantizando salarios justos 
                y condiciones laborales dignas para todas las familias involucradas.
              </p>
            </div>

            {/* Valor 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">
                Sostenibilidad
              </h3>
              <p className="text-gray-700">
                Utilizamos únicamente fibras naturales y tintes ecológicos, 
                cuidando el medio ambiente y promoviendo prácticas sostenibles.
              </p>
            </div>

            {/* Valor 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">
                Calidad Excepcional
              </h3>
              <p className="text-gray-700">
                Cada prenda pasa por rigurosos controles de calidad, 
                asegurando que recibas productos duraderos y hermosos.
              </p>
            </div>

            {/* Valor 4 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">
                Tradición Cultural
              </h3>
              <p className="text-gray-700">
                Preservamos técnicas ancestrales transmitidas de generación en 
                generación, manteniendo viva la cultura artesanal.
              </p>
            </div>

            {/* Valor 5 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">
                Origen Auténtico
              </h3>
              <p className="text-gray-700">
                Cada prenda tiene su historia y origen específico, 
                conectándote con la cultura y tradición de su lugar de creación.
              </p>
            </div>

            {/* Valor 6 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">
                Tiempo y Dedicación
              </h3>
              <p className="text-gray-700">
                Cada pieza requiere semanas de trabajo meticuloso, 
                reflejando la paciencia y dedicación de nuestros artesanos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">
              Nuestro Proceso Artesanal
            </h2>
            <p className="text-lg text-gray-700">
              Desde la selección de fibras hasta el acabado final, cada paso 
              es realizado con cuidado y atención al detalle.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Paso 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">
                Selección de Fibras
              </h3>
              <p className="text-gray-700">
                Cuidadosa selección de fibras naturales de la más alta calidad: 
                alpaca, llama, mohair y algodón orgánico.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">
                Preparación e Hilado
              </h3>
              <p className="text-gray-700">
                Las fibras se limpian, cardan e hilan a mano usando técnicas 
                tradicionales transmitidas por generaciones.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">
                Tejido Artesanal
              </h3>
              <p className="text-gray-700">
                Nuestros maestros tejedores crean cada prenda punto por punto, 
                siguiendo patrones ancestrales únicos.
              </p>
            </div>

            {/* Paso 4 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">
                Control de Calidad
              </h3>
              <p className="text-gray-700">
                Rigurosa inspección final y acabados de lujo antes de que 
                la prenda llegue a tus manos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">
              Nuestros Artesanos
            </h2>
            <p className="text-lg text-gray-700">
              Conoce a las personas talentosas que dan vida a cada una de nuestras creaciones.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Artesano 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-square bg-gradient-to-br from-amber-200 to-orange-200">
                <img
                  src="/LaNik-/img/ponchos/poncho1.webp"
                  alt="Trabajo artesanal de María - Ponchos tradicionales"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">
                  María Uriana
                </h3>
                <p className="text-orange-600 font-medium mb-3">
                  Maestra Tejedora Wayuu
                </p>
                <p className="text-gray-700 text-sm">
                  Con más de 30 años de experiencia, María lidera nuestro equipo 
                  de artesanas Wayuu, creando ponchos únicos que narran historias ancestrales.
                </p>
              </div>
            </div>

            {/* Artesano 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-square bg-gradient-to-br from-amber-200 to-orange-200">
                <img
                  src="/LaNik-/img/muñecos/muneco2.webp"
                  alt="Trabajo artesanal de Carlos - Muñecos tradicionales"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">
                  Carlos Mamani
                </h3>
                <p className="text-orange-600 font-medium mb-3">
                  Especialista en Fibras Andinas
                </p>
                <p className="text-gray-700 text-sm">
                  Experto en el trabajo con alpaca y llama, Carlos asegura la calidad 
                  excepcional de nuestras prendas andinas tradicionales.
                </p>
              </div>
            </div>

            {/* Artesano 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-square bg-gradient-to-br from-amber-200 to-orange-200">
                <img
                  src="/LaNik-/img/sweaters/sueter1.webp"
                  alt="Trabajo artesanal de Elena - Diseños en sweaters"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">
                  Elena Rodríguez
                </h3>
                <p className="text-orange-600 font-medium mb-3">
                  Diseñadora Creativa
                </p>
                <p className="text-gray-700 text-sm">
                  Elena fusiona tradición y modernidad, creando diseños contemporáneos 
                  que respetan las técnicas ancestrales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Forma Parte de Nuestra Historia
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Al elegir nuestras prendas, no solo adquieres ropa de calidad excepcional, 
            sino que apoyas la preservación de tradiciones culturales milenarias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-colors duration-300">
              Ver Colección
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-amber-700 transition-colors duration-300">
              Contáctanos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;