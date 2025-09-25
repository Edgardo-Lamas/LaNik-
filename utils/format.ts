/**
 * Utilidades para formatear precios y moneda
 * Soporte para múltiples monedas y locales
 */

export interface CurrencyConfig {
  code: string;
  locale: string;
  symbol?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

// Configuración de monedas soportadas
export const CURRENCIES: Record<string, CurrencyConfig> = {
  COP: {
    code: 'COP',
    locale: 'es-CO',
    symbol: '$',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
  USD: {
    code: 'USD',
    locale: 'en-US',
    symbol: '$',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  EUR: {
    code: 'EUR',
    locale: 'es-ES',
    symbol: '€',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  MXN: {
    code: 'MXN',
    locale: 'es-MX',
    symbol: '$',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
};

/**
 * Formatea un precio según la moneda especificada
 * @param price - El precio a formatear (en la unidad menor de la moneda)
 * @param currency - Código de la moneda (COP, USD, EUR, etc.)
 * @param options - Opciones adicionales de formato
 * @returns Precio formateado como string
 */
export function formatPrice(
  price: number,
  currency: string = 'COP',
  options?: Partial<Intl.NumberFormatOptions>
): string {
  const currencyConfig = CURRENCIES[currency.toUpperCase()];
  
  if (!currencyConfig) {
    console.warn(`Moneda no soportada: ${currency}. Usando COP por defecto.`);
    return formatPrice(price, 'COP', options);
  }

  try {
    const formatter = new Intl.NumberFormat(currencyConfig.locale, {
      style: 'currency',
      currency: currencyConfig.code,
      minimumFractionDigits: currencyConfig.minimumFractionDigits,
      maximumFractionDigits: currencyConfig.maximumFractionDigits,
      ...options,
    });

    return formatter.format(price);
  } catch (error) {
    console.error('Error formateando precio:', error);
    // Fallback manual
    return `${currencyConfig.symbol}${price.toLocaleString(currencyConfig.locale)}`;
  }
}

/**
 * Formatea un precio de manera compacta (ej: 1.2K, 15M)
 * @param price - El precio a formatear
 * @param currency - Código de la moneda
 * @returns Precio formateado de manera compacta
 */
export function formatPriceCompact(
  price: number,
  currency: string = 'COP'
): string {
  const currencyConfig = CURRENCIES[currency.toUpperCase()];
  
  if (!currencyConfig) {
    return formatPriceCompact(price, 'COP');
  }

  try {
    const formatter = new Intl.NumberFormat(currencyConfig.locale, {
      style: 'currency',
      currency: currencyConfig.code,
      notation: 'compact',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    });

    return formatter.format(price);
  } catch (error) {
    console.error('Error formateando precio compacto:', error);
    return formatPrice(price, currency);
  }
}

/**
 * Formatea solo el número sin símbolo de moneda
 * @param price - El precio a formatear
 * @param currency - Código de la moneda (para determinar decimales)
 * @returns Número formateado como string
 */
export function formatNumber(
  price: number,
  currency: string = 'COP'
): string {
  const currencyConfig = CURRENCIES[currency.toUpperCase()];
  
  if (!currencyConfig) {
    return formatNumber(price, 'COP');
  }

  try {
    const formatter = new Intl.NumberFormat(currencyConfig.locale, {
      minimumFractionDigits: currencyConfig.minimumFractionDigits,
      maximumFractionDigits: currencyConfig.maximumFractionDigits,
    });

    return formatter.format(price);
  } catch (error) {
    console.error('Error formateando número:', error);
    return price.toString();
  }
}

/**
 * Convierte un precio entre monedas (requiere tasas de cambio)
 * @param price - Precio original
 * @param fromCurrency - Moneda origen
 * @param toCurrency - Moneda destino  
 * @param exchangeRate - Tasa de cambio
 * @returns Precio convertido
 */
export function convertPrice(
  price: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRate: number
): number {
  if (fromCurrency.toUpperCase() === toCurrency.toUpperCase()) {
    return price;
  }

  return Math.round(price * exchangeRate);
}

/**
 * Calcula descuentos y formatea el resultado
 * @param originalPrice - Precio original
 * @param discountPercent - Porcentaje de descuento (0-100)
 * @param currency - Código de moneda
 * @returns Objeto con precios y descuento formateados
 */
export function calculateDiscount(
  originalPrice: number,
  discountPercent: number,
  currency: string = 'COP'
) {
  const discountAmount = Math.round(originalPrice * (discountPercent / 100));
  const finalPrice = originalPrice - discountAmount;

  return {
    originalPrice: formatPrice(originalPrice, currency),
    finalPrice: formatPrice(finalPrice, currency),
    discountAmount: formatPrice(discountAmount, currency),
    discountPercent: `${discountPercent}%`,
    savings: discountAmount,
  };
}

/**
 * Formatea rangos de precios
 * @param minPrice - Precio mínimo
 * @param maxPrice - Precio máximo  
 * @param currency - Código de moneda
 * @returns Rango formateado
 */
export function formatPriceRange(
  minPrice: number,
  maxPrice: number,
  currency: string = 'COP'
): string {
  if (minPrice === maxPrice) {
    return formatPrice(minPrice, currency);
  }

  const min = formatPrice(minPrice, currency);
  const max = formatPrice(maxPrice, currency);
  
  return `${min} - ${max}`;
}

/**
 * Valida si un código de moneda es soportado
 * @param currency - Código de moneda a validar
 * @returns true si es soportado, false en caso contrario
 */
export function isCurrencySupported(currency: string): boolean {
  return currency.toUpperCase() in CURRENCIES;
}

/**
 * Obtiene el símbolo de una moneda
 * @param currency - Código de moneda
 * @returns Símbolo de la moneda
 */
export function getCurrencySymbol(currency: string): string {
  const currencyConfig = CURRENCIES[currency.toUpperCase()];
  return currencyConfig?.symbol || currency;
}

/**
 * Parsea un string de precio y extrae el valor numérico
 * @param priceString - String con el precio (ej: "$150,000")
 * @returns Valor numérico del precio
 */
export function parsePrice(priceString: string): number {
  // Remover todo excepto números, puntos y comas
  const cleanString = priceString.replace(/[^\d.,]/g, '');
  
  // Manejar formato colombiano (comas como separadores de miles)
  const numberString = cleanString.replace(/,/g, '');
  
  return parseFloat(numberString) || 0;
}

// Tipos de utilidad para TypeScript
export type SupportedCurrency = keyof typeof CURRENCIES;
export type FormattedPrice = string;

// Constantes útiles
export const DEFAULT_CURRENCY: SupportedCurrency = 'COP';
export const SUPPORTED_CURRENCIES = Object.keys(CURRENCIES) as SupportedCurrency[];