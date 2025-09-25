import React, { useState, useEffect } from 'react';
import { useCart, useFormatPrice } from '../contexts/CartContext';

interface CheckoutFormData {
  // Información personal
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Dirección de envío
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  addressNotes?: string;
  
  // Método de pago
  paymentMethod: 'credit_card' | 'pse' | 'cash_on_delivery';
  
  // Información de tarjeta (solo para simulación, NUNCA almacenar)
  cardNumber?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  cardName?: string;
  
  // PSE
  bankCode?: string;
  documentType?: string;
  documentNumber?: string;
  
  // Términos y condiciones
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  subscribeNewsletter: boolean;
}

interface CheckoutPageProps {
  /** Función para procesar el pedido */
  onProcessOrder?: (orderData: CheckoutFormData) => Promise<void>;
  /** Función para volver al carrito */
  onBackToCart?: () => void;
}

const Checkout: React.FC<CheckoutPageProps> = ({
  onProcessOrder = async (data) => {
    console.log('🛒 Processing order:', data);
    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));
  },
  onBackToCart = () => console.log('Back to cart'),
}) => {
  const { state, getCartSummary } = useCart();
  const { formatPrice } = useFormatPrice();
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Colombia',
    paymentMethod: 'credit_card',
    acceptTerms: false,
    acceptPrivacy: false,
    subscribeNewsletter: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const cartSummary = getCartSummary();

  // SEO dinámico
  useEffect(() => {
    document.title = 'Checkout - Finalizar Compra | Handyman';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', `Finaliza tu compra de ${state.totalItems} productos por ${formatPrice(cartSummary.total)}. Proceso seguro y rápido.`);
  }, [state.totalItems, cartSummary.total, formatPrice]);

  // Validación del formulario
  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (step === 1) {
      // Información personal
      if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
      if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
      if (!formData.email.trim()) newErrors.email = 'El email es requerido';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email inválido';
      if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
      
      // Dirección
      if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
      if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
      if (!formData.state.trim()) newErrors.state = 'El departamento es requerido';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'El código postal es requerido';
    }

    if (step === 2) {
      // Validación método de pago
      if (formData.paymentMethod === 'credit_card') {
        if (!formData.cardNumber?.trim()) newErrors.cardNumber = 'Número de tarjeta requerido';
        if (!formData.expiryMonth) newErrors.expiryMonth = 'Mes de vencimiento requerido';
        if (!formData.expiryYear) newErrors.expiryYear = 'Año de vencimiento requerido';
        if (!formData.cvv?.trim()) newErrors.cvv = 'CVV requerido';
        if (!formData.cardName?.trim()) newErrors.cardName = 'Nombre del titular requerido';
      }
      
      if (formData.paymentMethod === 'pse') {
        if (!formData.bankCode) newErrors.bankCode = 'Banco requerido';
        if (!formData.documentType) newErrors.documentType = 'Tipo de documento requerido';
        if (!formData.documentNumber?.trim()) newErrors.documentNumber = 'Número de documento requerido';
      }
    }

    if (step === 3) {
      // Términos y condiciones
      if (!formData.acceptTerms) newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
      if (!formData.acceptPrivacy) newErrors.acceptPrivacy = 'Debes aceptar la política de privacidad';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CheckoutFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo si existe
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    
    try {
      // 🔗 INTEGRACIÓN FUTURA: Aquí se integrarían las pasarelas de pago
      
      /* 
      STRIPE INTEGRATION:
      
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
            },
          }
        }
      );
      */

      /* 
      MERCADOPAGO INTEGRATION:
      
      const mp = new MercadoPago('YOUR_PUBLIC_KEY');
      const cardToken = await mp.createCardToken({
        cardNumber: formData.cardNumber,
        cardholderName: formData.cardName,
        cardExpirationMonth: formData.expiryMonth,
        cardExpirationYear: formData.expiryYear,
        securityCode: formData.cvv,
        identificationType: formData.documentType,
        identificationNumber: formData.documentNumber,
      });
      */

      /* 
      PSE INTEGRATION (Colombia):
      
      const psePayment = await fetch('/api/payments/pse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bank: formData.bankCode,
          documentType: formData.documentType,
          documentNumber: formData.documentNumber,
          amount: cartSummary.total,
          reference: `ORDER-${Date.now()}`,
        }),
      });
      */

      /* 
      SHOPIFY CHECKOUT API:
      
      const checkout = await ShopifyBuy.Client.buildClient({
        domain: 'your-shop-name.myshopify.com',
        storefrontAccessToken: 'your-storefront-access-token'
      }).checkout.create();
      */

      /* 
      WOOCOMMERCE INTEGRATION:
      
      const order = await fetch('/wp-json/wc/v3/orders', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa('consumer_key:consumer_secret'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method: formData.paymentMethod,
          billing: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            // ... más datos
          },
          line_items: state.items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
        }),
      });
      */

      // Simulación del procesamiento
      await onProcessOrder(formData);
      
      // Redireccionar a página de confirmación
      alert('¡Pedido procesado exitosamente! Serías redirigido a la página de confirmación.');
      
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Hubo un error al procesar tu pedido. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirigir si el carrito está vacío
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-warm-200 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-earth-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-earth-800 mb-2">Carrito Vacío</h1>
          <p className="text-earth-600 mb-6">No puedes proceder al checkout con un carrito vacío.</p>
          <button
            onClick={onBackToCart}
            className="px-6 py-3 bg-earth-600 text-warm-50 rounded-lg hover:bg-earth-700 transition-colors"
          >
            Volver al Carrito
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-earth-800 mb-2">Checkout</h1>
          <p className="text-earth-600">Finaliza tu compra de forma segura</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step === currentStep 
                    ? 'border-earth-600 bg-earth-600 text-warm-50' 
                    : step < currentStep 
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-earth-300 bg-warm-50 text-earth-400'
                }`}>
                  {step < currentStep ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{step}</span>
                  )}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-0.5 ${step < currentStep ? 'bg-green-500' : 'bg-earth-300'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-16 text-sm">
              <span className={currentStep >= 1 ? 'text-earth-800 font-medium' : 'text-earth-400'}>
                Información
              </span>
              <span className={currentStep >= 2 ? 'text-earth-800 font-medium' : 'text-earth-400'}>
                Pago
              </span>
              <span className={currentStep >= 3 ? 'text-earth-800 font-medium' : 'text-earth-400'}>
                Confirmar
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Paso 1: Información Personal y Dirección */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Información Personal */}
                  <div className="bg-warm-100 rounded-xl p-6 border border-warm-200">
                    <h2 className="text-xl font-semibold text-earth-800 mb-4">Información Personal</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-earth-700 mb-1">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 ${
                            errors.firstName ? 'border-red-500' : 'border-earth-300'
                          }`}
                          placeholder="Tu nombre"
                        />
                        {errors.firstName && (
                          <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-earth-700 mb-1">
                          Apellido *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 ${
                            errors.lastName ? 'border-red-500' : 'border-earth-300'
                          }`}
                          placeholder="Tu apellido"
                        />
                        {errors.lastName && (
                          <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-earth-700 mb-1">
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 ${
                            errors.email ? 'border-red-500' : 'border-earth-300'
                          }`}
                          placeholder="tu@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-earth-700 mb-1">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 ${
                            errors.phone ? 'border-red-500' : 'border-earth-300'
                          }`}
                          placeholder="+57 300 123 4567"
                        />
                        {errors.phone && (
                          <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dirección de Envío */}
                  <div className="bg-warm-100 rounded-xl p-6 border border-warm-200">
                    <h2 className="text-xl font-semibold text-earth-800 mb-4">Dirección de Envío</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-earth-700 mb-1">
                          Dirección *
                        </label>
                        <input
                          type="text"
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 ${
                            errors.address ? 'border-red-500' : 'border-earth-300'
                          }`}
                          placeholder="Calle 123 #45-67"
                        />
                        {errors.address && (
                          <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-earth-700 mb-1">
                            Ciudad *
                          </label>
                          <input
                            type="text"
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 ${
                              errors.city ? 'border-red-500' : 'border-earth-300'
                            }`}
                            placeholder="Bogotá"
                          />
                          {errors.city && (
                            <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-earth-700 mb-1">
                            Departamento *
                          </label>
                          <select
                            id="state"
                            value={formData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 ${
                              errors.state ? 'border-red-500' : 'border-earth-300'
                            }`}
                          >
                            <option value="">Seleccionar</option>
                            <option value="Cundinamarca">Cundinamarca</option>
                            <option value="Antioquia">Antioquia</option>
                            <option value="Valle del Cauca">Valle del Cauca</option>
                            {/* Más departamentos... */}
                          </select>
                          {errors.state && (
                            <p className="text-red-600 text-sm mt-1">{errors.state}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-earth-700 mb-1">
                            Código Postal *
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 ${
                              errors.zipCode ? 'border-red-500' : 'border-earth-300'
                            }`}
                            placeholder="110111"
                          />
                          {errors.zipCode && (
                            <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="addressNotes" className="block text-sm font-medium text-earth-700 mb-1">
                          Notas de Entrega (Opcional)
                        </label>
                        <textarea
                          id="addressNotes"
                          value={formData.addressNotes || ''}
                          onChange={(e) => handleInputChange('addressNotes', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500"
                          placeholder="Apartamento, edificio, referencias adicionales..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 2: Método de Pago */}
              {currentStep === 2 && (
                <div className="bg-warm-100 rounded-xl p-6 border border-warm-200">
                  <h2 className="text-xl font-semibold text-earth-800 mb-4">Método de Pago</h2>
                  
                  {/* Selector de método de pago */}
                  <div className="space-y-4 mb-6">
                    <label className="flex items-center p-4 border border-earth-300 rounded-lg cursor-pointer hover:bg-warm-200 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit_card"
                        checked={formData.paymentMethod === 'credit_card'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value as any)}
                        className="mr-3"
                      />
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-earth-800">Tarjeta de Crédito/Débito</span>
                        <div className="flex space-x-2">
                          <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                          <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border border-earth-300 rounded-lg cursor-pointer hover:bg-warm-200 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pse"
                        checked={formData.paymentMethod === 'pse'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value as any)}
                        className="mr-3"
                      />
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-earth-800">PSE - Débito a Cuenta Corriente/Ahorros</span>
                        <div className="w-8 h-5 bg-green-500 rounded text-white text-xs flex items-center justify-center font-bold">PSE</div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border border-earth-300 rounded-lg cursor-pointer hover:bg-warm-200 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash_on_delivery"
                        checked={formData.paymentMethod === 'cash_on_delivery'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value as any)}
                        className="mr-3"
                      />
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-earth-800">Pago Contraentrega</span>
                        <span className="text-sm text-earth-600">+$5.000 adicional</span>
                      </div>
                    </label>
                  </div>

                  {/* Formularios específicos por método de pago */}
                  {formData.paymentMethod === 'credit_card' && (
                    <div className="space-y-4 p-4 bg-warm-200 rounded-lg">
                      <h3 className="font-medium text-earth-800 mb-3">Información de la Tarjeta</h3>
                      <p className="text-sm text-earth-600 mb-4">
                        🔒 <strong>Nota:</strong> Esta es una simulación. En producción se integraría con Stripe, MercadoPago u otro procesador seguro.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-earth-700 mb-1">
                            Número de Tarjeta *
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            value={formData.cardNumber || ''}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 ${
                              errors.cardNumber ? 'border-red-500' : 'border-earth-300'
                            }`}
                            placeholder="1234 5678 9012 3456"
                          />
                          {errors.cardNumber && (
                            <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="expiryMonth" className="block text-sm font-medium text-earth-700 mb-1">
                            Mes *
                          </label>
                          <select
                            id="expiryMonth"
                            value={formData.expiryMonth || ''}
                            onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 ${
                              errors.expiryMonth ? 'border-red-500' : 'border-earth-300'
                            }`}
                          >
                            <option value="">MM</option>
                            {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                              <option key={month} value={month.toString().padStart(2, '0')}>
                                {month.toString().padStart(2, '0')}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="expiryYear" className="block text-sm font-medium text-earth-700 mb-1">
                            Año *
                          </label>
                          <select
                            id="expiryYear"
                            value={formData.expiryYear || ''}
                            onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 ${
                              errors.expiryYear ? 'border-red-500' : 'border-earth-300'
                            }`}
                          >
                            <option value="">YYYY</option>
                            {Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map(year => (
                              <option key={year} value={year.toString()}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-earth-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            value={formData.cvv || ''}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 ${
                              errors.cvv ? 'border-red-500' : 'border-earth-300'
                            }`}
                            placeholder="123"
                            maxLength={4}
                          />
                          {errors.cvv && (
                            <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="cardName" className="block text-sm font-medium text-earth-700 mb-1">
                            Nombre del Titular *
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            value={formData.cardName || ''}
                            onChange={(e) => handleInputChange('cardName', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 ${
                              errors.cardName ? 'border-red-500' : 'border-earth-300'
                            }`}
                            placeholder="Nombre como aparece en la tarjeta"
                          />
                          {errors.cardName && (
                            <p className="text-red-600 text-sm mt-1">{errors.cardName}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'pse' && (
                    <div className="space-y-4 p-4 bg-warm-200 rounded-lg">
                      <h3 className="font-medium text-earth-800 mb-3">Información PSE</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="bankCode" className="block text-sm font-medium text-earth-700 mb-1">
                            Banco *
                          </label>
                          <select
                            id="bankCode"
                            value={formData.bankCode || ''}
                            onChange={(e) => handleInputChange('bankCode', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 ${
                              errors.bankCode ? 'border-red-500' : 'border-earth-300'
                            }`}
                          >
                            <option value="">Seleccionar banco</option>
                            <option value="bancolombia">Bancolombia</option>
                            <option value="banco_bogota">Banco de Bogotá</option>
                            <option value="davivienda">Davivienda</option>
                            <option value="bbva">BBVA Colombia</option>
                          </select>
                          {errors.bankCode && (
                            <p className="text-red-600 text-sm mt-1">{errors.bankCode}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="documentType" className="block text-sm font-medium text-earth-700 mb-1">
                            Tipo de Documento *
                          </label>
                          <select
                            id="documentType"
                            value={formData.documentType || ''}
                            onChange={(e) => handleInputChange('documentType', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 ${
                              errors.documentType ? 'border-red-500' : 'border-earth-300'
                            }`}
                          >
                            <option value="">Seleccionar</option>
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="CE">Cédula de Extranjería</option>
                            <option value="NIT">NIT</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="documentNumber" className="block text-sm font-medium text-earth-700 mb-1">
                            Número de Documento *
                          </label>
                          <input
                            type="text"
                            id="documentNumber"
                            value={formData.documentNumber || ''}
                            onChange={(e) => handleInputChange('documentNumber', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 ${
                              errors.documentNumber ? 'border-red-500' : 'border-earth-300'
                            }`}
                            placeholder="12345678"
                          />
                          {errors.documentNumber && (
                            <p className="text-red-600 text-sm mt-1">{errors.documentNumber}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'cash_on_delivery' && (
                    <div className="p-4 bg-warm-200 rounded-lg">
                      <h3 className="font-medium text-earth-800 mb-2">Pago Contraentrega</h3>
                      <p className="text-sm text-earth-600">
                        Pagarás directamente al transportador cuando recibas tu pedido. 
                        Se aplicará un cargo adicional de $5.000 por este servicio.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Paso 3: Confirmación */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Resumen del pedido */}
                  <div className="bg-warm-100 rounded-xl p-6 border border-warm-200">
                    <h2 className="text-xl font-semibold text-earth-800 mb-4">Resumen del Pedido</h2>
                    
                    <div className="space-y-4 mb-6">
                      {state.items.map((item) => (
                        <div key={`${item.id}-${JSON.stringify(item.variants)}`} className="flex items-center gap-4 py-2 border-b border-warm-200">
                          <img src={item.image} alt={item.imageAlt} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-medium text-earth-800">{item.name}</h4>
                            <p className="text-sm text-earth-600">Cantidad: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-earth-800">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-4 border-t border-warm-300">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{formatPrice(cartSummary.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IVA:</span>
                        <span>{formatPrice(cartSummary.tax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Envío:</span>
                        <span>{cartSummary.shipping === 0 ? 'Gratis' : formatPrice(cartSummary.shipping)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>{formatPrice(cartSummary.total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Términos y condiciones */}
                  <div className="bg-warm-100 rounded-xl p-6 border border-warm-200">
                    <h2 className="text-xl font-semibold text-earth-800 mb-4">Términos y Condiciones</h2>
                    
                    <div className="space-y-4">
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={formData.acceptTerms}
                          onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                          className="mt-1"
                        />
                        <span className="text-sm text-earth-700">
                          Acepto los <button type="button" className="text-earth-600 underline hover:text-earth-800">términos y condiciones</button> de la tienda *
                        </span>
                      </label>
                      {errors.acceptTerms && (
                        <p className="text-red-600 text-sm">{errors.acceptTerms}</p>
                      )}

                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={formData.acceptPrivacy}
                          onChange={(e) => handleInputChange('acceptPrivacy', e.target.checked)}
                          className="mt-1"
                        />
                        <span className="text-sm text-earth-700">
                          Acepto la <button type="button" className="text-earth-600 underline hover:text-earth-800">política de privacidad</button> *
                        </span>
                      </label>
                      {errors.acceptPrivacy && (
                        <p className="text-red-600 text-sm">{errors.acceptPrivacy}</p>
                      )}

                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={formData.subscribeNewsletter}
                          onChange={(e) => handleInputChange('subscribeNewsletter', e.target.checked)}
                          className="mt-1"
                        />
                        <span className="text-sm text-earth-700">
                          Quiero recibir ofertas especiales y novedades por email
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={currentStep === 1 ? onBackToCart : handlePrevStep}
                  className="px-6 py-3 text-earth-600 border border-earth-300 rounded-lg hover:bg-earth-50 transition-colors focus:outline-none focus:ring-2 focus:ring-earth-500 focus:ring-offset-2"
                >
                  {currentStep === 1 ? '← Volver al Carrito' : '← Anterior'}
                </button>

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-earth-600 hover:bg-earth-700 text-warm-50 font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-earth-500 focus:ring-offset-2"
                  >
                    Siguiente →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Procesando...
                      </>
                    ) : (
                      '🔒 Confirmar Pedido'
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Resumen lateral */}
            <div className="lg:col-span-1">
              <div className="bg-warm-100 rounded-xl p-6 border border-warm-200 sticky top-8">
                <h3 className="text-lg font-semibold text-earth-800 mb-4">Tu Pedido</h3>
                
                <div className="space-y-3 mb-4">
                  {state.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.image} alt={item.imageAlt} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-earth-800 truncate">{item.name}</p>
                        <p className="text-xs text-earth-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-earth-800">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                  {state.items.length > 3 && (
                    <p className="text-sm text-earth-600 text-center py-2">
                      +{state.items.length - 3} productos más
                    </p>
                  )}
                </div>

                <div className="space-y-2 py-4 border-t border-warm-300">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{formatPrice(cartSummary.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Envío:</span>
                    <span>{cartSummary.shipping === 0 ? 'Gratis' : formatPrice(cartSummary.shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>IVA:</span>
                    <span>{formatPrice(cartSummary.tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-warm-300">
                    <span>Total:</span>
                    <span>{formatPrice(cartSummary.total)}</span>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="space-y-3 pt-4 border-t border-warm-300">
                  <div className="flex items-center gap-2 text-sm text-earth-600">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Pago 100% seguro</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-earth-600">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Garantía de satisfacción</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;