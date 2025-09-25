import React, { useState, FormEvent } from 'react';

/**
 * Interfaz para los datos del formulario de contacto
 */
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Interfaz para errores de validación
 */
interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

/**
 * Estado del formulario
 */
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Página de contacto con formulario accesible y validación
 */
const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  /**
   * Valida el formulario completo
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    // Validar teléfono (opcional pero si se ingresa debe ser válido)
    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,15}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = 'Por favor ingresa un teléfono válido';
      }
    }

    // Validar asunto
    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es obligatorio';
    }

    // Validar mensaje
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Maneja cambios en los inputs
   */
  const handleInputChange = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  /**
   * Simula el envío del formulario
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('submitting');

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Implementar integración real con servicio de email
      // Ejemplos de servicios a integrar:
      // - EmailJS para envío directo desde frontend
      // - Formspree para formularios sin backend
      // - SendGrid API para envío profesional
      // - Nodemailer con backend Express
      
      console.log('Formulario enviado:', formData);
      
      setStatus('success');
      setSubmitMessage('¡Gracias por contactarnos! Responderemos pronto a tu mensaje.');
      
      // Limpiar formulario después del éxito
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
    } catch (error) {
      console.error('Error enviando formulario:', error);
      setStatus('error');
      setSubmitMessage('Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.');
    }
  };

  /**
   * Reinicia el estado del formulario
   */
  const resetForm = () => {
    setStatus('idle');
    setSubmitMessage('');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">
              Contáctanos
            </h1>
            <p className="text-xl md:text-2xl text-amber-800 mb-8 leading-relaxed">
              Estamos aquí para ayudarte. Cuéntanos sobre tu proyecto o consulta
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-600 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-amber-900 mb-6">
                  Hablemos
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  Nos encanta conocer personas que valoran la artesanía auténtica. 
                  Si tienes alguna pregunta sobre nuestros productos, procesos o 
                  quieres hacer un pedido personalizado, no dudes en contactarnos.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900">Ubicación</h3>
                    <p className="text-gray-700">Bogotá, Colombia</p>
                    <p className="text-gray-600 text-sm">Atendemos pedidos a nivel nacional</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900">Teléfono</h3>
                    <p className="text-gray-700">+57 300 123 4567</p>
                    <p className="text-gray-600 text-sm">Lun - Vie: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900">Email</h3>
                    <p className="text-gray-700">info@artesaniahandyman.com</p>
                    <p className="text-gray-600 text-sm">Respuesta en 24 horas</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900">Horarios</h3>
                    <p className="text-gray-700">Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-700">Sábados: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">
                Envíanos un mensaje
              </h2>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">{submitMessage}</p>
                  <button
                    onClick={resetForm}
                    className="mt-2 text-sm text-green-600 hover:text-green-800 underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">{submitMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Nombre */}
                <div className="mb-6">
                  <label 
                    htmlFor="contact-name" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Tu nombre completo"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    required
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label 
                    htmlFor="contact-email" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="tu@email.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    required
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Teléfono */}
                <div className="mb-6">
                  <label 
                    htmlFor="contact-phone" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                      errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="+57 300 123 4567"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Asunto */}
                <div className="mb-6">
                  <label 
                    htmlFor="contact-subject" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Asunto *
                  </label>
                  <select
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                      errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    required
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="consulta-general">Consulta general</option>
                    <option value="pedido-personalizado">Pedido personalizado</option>
                    <option value="cuidado-productos">Cuidado de productos</option>
                    <option value="envios-devoluciones">Envíos y devoluciones</option>
                    <option value="colaboracion">Oportunidades de colaboración</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Mensaje */}
                <div className="mb-6">
                  <label 
                    htmlFor="contact-message" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-vertical ${
                      errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    required
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando mensaje...
                    </span>
                  ) : (
                    'Enviar mensaje'
                  )}
                </button>

                {/* Form Info */}
                <p className="mt-4 text-sm text-gray-600 text-center">
                  Los campos marcados con * son obligatorios. 
                  Respetamos tu privacidad y no compartimos tu información.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-6">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-gray-700">
              Respuestas rápidas a las consultas más comunes sobre nuestros productos y servicios.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-amber-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-3">
                ¿Cuánto tiempo toma hacer un pedido personalizado?
              </h3>
              <p className="text-gray-700">
                Los pedidos personalizados requieren entre 3-4 semanas de trabajo artesanal. 
                El tiempo puede variar según la complejidad del diseño y la disponibilidad de materiales.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-3">
                ¿Realizan envíos a toda Colombia?
              </h3>
              <p className="text-gray-700">
                Sí, enviamos a todo el territorio nacional. Los costos de envío se calculan según 
                el destino y el peso del paquete. Ofrecemos envío gratuito para pedidos superiores a $300.000.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-amber-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-3">
                ¿Cómo cuido mis prendas artesanales?
              </h3>
              <p className="text-gray-700">
                Cada prenda incluye instrucciones específicas de cuidado. En general, recomendamos 
                lavado a mano con jabón neutro y secado horizontal. Evita la exposición directa al sol.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-3">
                ¿Tienen política de cambios o devoluciones?
              </h3>
              <p className="text-gray-700">
                Aceptamos cambios dentro de los primeros 15 días posteriores a la entrega, 
                siempre que la prenda esté en perfecto estado. Los productos personalizados no aplican para cambios.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;