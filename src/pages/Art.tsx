import React, { useState } from 'react';
import { Brush, Heart, Quote, Clock, Eye } from 'lucide-react';

/**
 * Interfaz para las pinturas
 */
interface Painting {
  id: number;
  filename: string;
  title: string;
  story: string;
  technique: string;
  year: string;
}

/**
 * Interfaz para elementos inspiradores intercalados
 */
interface InspirationElement {
  type: 'quote' | 'anecdote' | 'biography';
  content: string;
  author: string;
  context?: string;
}

/**
 * Página del Rincón de Arte - Experiencia contemplativa de galería
 */
const Art: React.FC = () => {
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);

  // Datos de las pinturas con descripciones artísticas
    // Galerías de pinturas con narrativas integradas
  const paintings: Painting[] = [
    {
      id: 1,
      filename: 'WhatsApp Image 2025-09-20 at 10.42.19.webp',
      title: 'Serenidad de la Montaña',
      story: 'En esta obra, el artista captura ese momento mágico donde el sol toca por primera vez las cumbres nevadas. La técnica realista contemporánea nos transporta a esos amaneceres donde el silencio de los Andes habla más fuerte que cualquier palabra. Cada pincelada es un homenaje a la majestuosidad que solo quien ha vivido entre montañas puede comprender.',
      technique: 'Óleo sobre lienzo',
      year: '2024'
    },
    {
      id: 2,
      filename: 'WhatsApp Image 2025-09-20 at 10.42.44.webp',
      title: 'Danza de los Ancestros',
      story: 'Los colores vibran con la energía de generaciones que danzan en el tiempo. Esta pieza nace de noches de ceremonias donde el pasado se hace presente, donde cada movimiento cuenta una historia que trasciende épocas. El expresionismo cultural se convierte aquí en un puente entre mundos.',
      technique: 'Acrílico sobre madera',
      year: '2024'
    },
    {
      id: 3,
      filename: 'WhatsApp Image 2025-09-20 at 10.43.06.webp',
      title: 'Espíritu del Bosque',
      story: 'La selva respira en formas abstractas que solo el corazón puede descifrar. Cada trazo orgánico es un susurro de hojas, cada color verde una nota en la sinfonía de vida que nunca cesa. Esta abstracción nace de caminar descalzo entre raíces milenarias.',
      technique: 'Mixta sobre papel',
      year: '2024'
    },
    {
      id: 4,
      filename: 'WhatsApp Image 2025-09-20 at 10.43.32.webp',
      title: 'Corazón de la Tierra',
      story: 'Pachamama late en cada símbolo, en cada pigmento extraído de su propio vientre. El neo-indigenismo encuentra aquí su voz más pura, donde la conexión ancestral no es nostalgia sino presente vivo. Los símbolos prehispánicos dialogan con sensibilidades contemporáneas.',
      technique: 'Pigmentos naturales sobre lienzo',
      year: '2024'
    },
    {
      id: 5,
      filename: 'WhatsApp Image 2025-09-20 at 10.51.42.webp',
      title: 'Geometrías Sagradas',
      story: 'Las matemáticas ancestrales cobran vida en patrones que trascienden el tiempo. Cada línea es un cálculo preciso de culturas que veían en la geometría el lenguaje de los dioses. Los diseños Nazca y Moche encuentran nueva vida en témpera contemporánea.',
      technique: 'Témpera sobre tabla',
      year: '2024'
    },
    {
      id: 6,
      filename: 'WhatsApp Image 2025-09-20 at 10.55.16.webp',
      title: 'Reflejos del Alma',
      story: 'El oro no adorna, revela. En este retrato simbólico, cada elemento es un espejo donde el observador encuentra fragmentos de su propia búsqueda. El simbolismo contemporáneo se vuelve introspección colectiva, donde emociones y sueños toman forma tangible.',
      technique: 'Óleo y oro sobre lienzo',
      year: '2024'
    },
    {
      id: 7,
      filename: 'WhatsApp Image 2025-09-20 at 10.55.55.webp',
      title: 'La Vida en la Ciudad',
      story: 'Lima respira en cada detalle hiperrealista. Las calles cuentan historias de contrastes donde la belleza surge del caos urbano. Esta obra documenta no solo lo visible sino lo invisible: las almas que transitan, sueñan y construyen ciudad cada día.',
      technique: 'Acrílico hiperrealista',
      year: '2024'
    },
    {
      id: 8,
      filename: 'WhatsApp Image 2025-09-20 at 10.56.28.webp',
      title: 'Amanecer en los Andes',
      story: 'Desde el Cusco hasta el Salar de Uyuni, la cordillera despierta con colores que solo el pastel puede capturar en su textura etérea. Cada amanecer andino es único, irrepetible, como esta obra que nace de la observación paciente de la luz que danza entre picos nevados.',
      technique: 'Pastel sobre papel texturado',
      year: '2024'
    },
    {
      id: 9,
      filename: 'WhatsApp Image 2025-09-20 at 10.57.04.webp',
      title: 'Ritual de la Lluvia',
      story: 'Las comunidades aymaras invocan el agua con movimientos que esta obra traduce en color puro. El expresionismo ritual encuentra aquí su máxima expresión: formas dinámicas que danzan como los cuerpos en ceremonia, colores intensos como la fe que mueve montañas.',
      technique: 'Acrílico y pigmentos sobre tela',
      year: '2024'
    },
    {
      id: 10,
      filename: 'WhatsApp Image 2025-09-20 at 10.58.06.webp',
      title: 'Texturas de la Memoria',
      story: 'Los muros de adobe guardan siglos de historias que esta obra hace tangibles. Cada textura es un recuerdo colectivo, cada relieve una cicatriz del tiempo que se vuelve belleza. La memoria colonial cobra vida en elementos texturales que invitan al tacto y la reflexión.',
      technique: 'Mixta con elementos texturales',
      year: '2024'
    },
    {
      id: 11,
      filename: 'WhatsApp Image 2025-09-20 at 10.58.35.webp',
      title: 'Círculo de la Vida',
      story: 'La chakana cobra vida en formato circular donde tiempo y espacio se unifican. El concepto andino del tiempo cíclico encuentra expresión visual en una composición que no tiene inicio ni fin, como la vida misma que se renueva eternamente en ciclos sagrados.',
      technique: 'Óleo en formato circular',
      year: '2024'
    },
    {
      id: 12,
      filename: 'WhatsApp Image 2025-09-20 at 10.59.02.webp',
      title: 'Melodías Visuales',
      story: 'Las zampoñas y quenas suenan en colores fluidos que danzan sobre el lienzo. Esta sinestesia visual permite ver la música ancestral, transformar sonido en forma, ritmo en color. Cada festividad andina encuentra aquí su equivalente cromático en abstracción pura.',
      technique: 'Acrílico fluido sobre lienzo',
      year: '2024'
    },
    {
      id: 13,
      filename: 'WhatsApp Image 2025-09-20 at 10.59.24.webp',
      title: 'Diversidad Cultural',
      story: 'El Perú multicultural habla en lenguajes visuales diversos que esta obra unifica sin homogeneizar. Cada grupo étnico aporta su paleta, su textura, su visión del mundo en un collage que celebra la diferencia como riqueza colectiva.',
      technique: 'Collage y pintura sobre madera',
      year: '2024'
    },
    {
      id: 14,
      filename: 'WhatsApp Image 2025-09-20 at 11.00.43.webp',
      title: 'Esencia Minimalista',
      story: 'La filosofía zen encuentra los Andes en trazos que dicen más callando que gritando. La tinta china abraza el papel de arroz para crear espacios de silencio donde la naturaleza andina revela su esencia más pura en la simplicidad más profunda.',
      technique: 'Tinta china sobre papel de arroz',
      year: '2024'
    },
    {
      id: 15,
      filename: 'WhatsApp Image 2025-09-20 at 11.05.07.webp',
      title: 'Realismo Mágico',
      story: 'García Márquez pinta con pinceles peruanos donde lo cotidiano se transfigura en extraordinario. El oro no es lujo sino luz que revela la magia escondida en cada esquina de nuestra realidad, donde lo imposible es solo otra forma de verdad.',
      technique: 'Óleo con detalles en hoja de oro',
      year: '2024'
    },
    {
      id: 16,
      filename: 'WhatsApp Image 2025-09-20 at 11.14.12.webp',
      title: 'Artesanía Onírica',
      story: 'Los sueños toman forma en arcilla como lo hacían los maestros alfareros precolombinos. El surrealismo abraza técnicas milenarias para crear objetos imposibles que solo el subconsciente puede concebir y las manos ancestrales materializar.',
      technique: 'Cerámica pintada y mixta',
      year: '2024'
    },
    {
      id: 17,
      filename: 'WhatsApp Image 2025-09-20 at 11.14.43.webp',
      title: 'Cosmos Andino',
      story: 'Tres mundos se unifican en pigmentos extraídos de la propia tierra: Hanan Pacha, Kay Pacha y Uray Pacha danzan en armonía sobre piedra milenaria. Los observatorios de Chankillo inspiran esta cosmología visual donde astronomía ancestral se vuelve arte contemporáneo.',
      technique: 'Pigmentos minerales sobre piedra',
      year: '2024'
    },
    {
      id: 18,
      filename: 'WhatsApp Image 2025-09-20 at 11.15.21.webp',
      title: 'Ecos del Pasado',
      story: 'Los huacos retratos mochicas conversan con el metal oxidado del presente. El grabado establece puentes temporales donde iconografía arqueológica encuentra nueva voz sin perder su esencia, creando diálogos entre civilizaciones separadas por siglos.',
      technique: 'Grabado y pigmentos sobre metal oxidado',
      year: '2024'
    },
    {
      id: 19,
      filename: 'WhatsApp Image 2025-09-20 at 11.16.23.webp',
      title: 'Transformación',
      story: 'El Perú moderno muta en capas pictóricas que documentan cambios sociales profundos. Cada capa cuenta una etapa de transformación donde lo personal se vuelve colectivo, donde evolución individual refleja metamorfosis nacional.',
      technique: 'Mixta evolutiva sobre múltiples capas',
      year: '2024'
    },
    {
      id: 20,
      filename: 'WhatsApp Image 2025-09-20 at 11.16.45.webp',
      title: 'Sinfonía de Colores',
      story: 'Los mercados tradicionales explotan en acrílicos de alta pigmentación donde cada color canta su propio himno. Las festividades cobran vida en tonalidades que compiten en intensidad pero dialogan en armonía, creando sinfonías visuales vibrantes.',
      technique: 'Acrílico de alta pigmentación',
      year: '2024'
    },
    {
      id: 21,
      filename: 'WhatsApp Image 2025-09-20 at 11.17.58.webp',
      title: 'Guardián Silencioso',
      story: 'Los apus velan desde incrustaciones de piedra natural que los mismos cerros donaron para esta obra. Guardianes milenarios que protegen el equilibrio cósmico encuentran expresión material en óleo que abraza fragmentos de las montañas que representan.',
      technique: 'Óleo con incrustaciones de piedras naturales',
      year: '2024'
    },
    {
      id: 22,
      filename: 'WhatsApp Image 2025-09-20 at 11.19.19.webp',
      title: 'Renacer',
      story: 'El Ayni se materializa en una obra que envejece y se renueva como los ciclos agrícolas andinos. Los elementos orgánicos degradables integrados en la mixta permiten que la pieza evolucione con el tiempo, convirtiendo el deterioro en parte de la obra misma.',
      technique: 'Mixta con elementos orgánicos degradables',
      year: '2024'
    }
  ];

  // Elementos inspiradores para intercalar en la galería
  const inspirationElements: InspirationElement[] = [
    {
      type: 'quote',
      content: '"El arte es el lenguaje universal que trasciende las barreras del tiempo y el espacio, conectando almas a través de colores, formas y emociones."',
      author: 'Reflexión Artística'
    },
    {
      type: 'anecdote',
      content: 'En las comunidades andinas, los pigmentos se extraen directamente de la tierra sagrada. Cada color tiene un significado espiritual que conecta la obra con la cosmología ancestral.',
      author: 'Tradición Oral Andina',
      context: 'El Color Sagrado'
    },
    {
      type: 'quote',
      content: '"Cada pincelada debe respirar, cada color debe cantar, cada forma debe danzar en armonía con el cosmos."',
      author: 'Maestro Artesano Cusqueño'
    },
    {
      type: 'biography',
      content: 'La inspiración llega en sueños donde los ancestros comparten visiones. Muchas obras nacen de estos encuentros nocturnos donde símbolos antiguos se revelan con nuevos significados.',
      author: 'Proceso Creativo',
      context: 'Sueños en Lienzo'
    },
    {
      type: 'anecdote',
      content: 'Los maestros artesanos enseñan que el arte verdadero no se puede apurar. Cada obra debe respirar con los ciclos naturales, sincronizándose con las estaciones y fases lunares.',
      author: 'Testimonio de Taller',
      context: 'La Técnica del Tiempo'
    }
  ];



  // Crear secuencia de galería con elementos intercalados
  const createGallerySequence = (): Array<{type: 'painting' | 'inspiration'; content: any}> => {
    const sequence: Array<{type: 'painting' | 'inspiration'; content: any}> = [];
    let inspirationIndex = 0;
    
    paintings.forEach((painting, index) => {
      // Agregar la obra
      sequence.push({
        type: 'painting',
        content: painting
      });
      
      // Cada 3 obras, insertar un elemento inspirador
      if ((index + 1) % 3 === 0 && inspirationIndex < inspirationElements.length) {
        sequence.push({
          type: 'inspiration',
          content: inspirationElements[inspirationIndex]
        });
        inspirationIndex++;
      }
    });
    
    return sequence;
  };

  const gallerySequence = createGallerySequence();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header poético de la galería */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-800 mb-8 tracking-wide">
            Rincón de Arte
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto font-light">
            Un viaje contemplativo a través de 22 obras que narran historias de tierra, 
            ancestros y sueños plasmados en color y forma.
          </p>
        </div>
      </div>

      {/* Galería narrativa espaciosa */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-32">
        {gallerySequence.map((item, index) => (
          <div key={index}>
            {item.type === 'painting' ? (
              /* Obra con narrativa integrada */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className={`space-y-8 ${index % 4 === 0 || index % 4 === 3 ? 'lg:order-2' : ''}`}>
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-800 leading-tight">
                      {item.content.title}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-amber-700">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {item.content.year}
                      </span>
                      <span className="flex items-center">
                        <Brush className="w-4 h-4 mr-2" />
                        {item.content.technique}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    {item.content.story}
                  </p>
                  
                  <button
                    onClick={() => setSelectedPainting(item.content)}
                    className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium transition-colors duration-200"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Contemplar obra completa
                  </button>
                </div>
                
                <div className={`${index % 4 === 0 || index % 4 === 3 ? 'lg:order-1' : ''}`}>
                  <div 
                    className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
                    onClick={() => setSelectedPainting(item.content)}
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src={`/LaNik-/img/pinturas/${encodeURIComponent(item.content.filename)}`}
                        alt={item.content.title}
                        loading="lazy"
                        className="w-full h-auto transform transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Elemento inspirador intercalado */
              <div className="text-center py-16">
                {item.content.type === 'quote' ? (
                  <div className="max-w-3xl mx-auto space-y-8">
                    <Quote className="w-12 h-12 text-amber-400 mx-auto" />
                    <blockquote className="text-2xl md:text-3xl font-light italic text-gray-700 leading-relaxed">
                      {item.content.content}
                    </blockquote>
                    <cite className="text-lg text-amber-600 font-medium">
                      — {item.content.author}
                    </cite>
                  </div>
                ) : (
                  <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
                    <div className="space-y-6">
                      {item.content.context && (
                        <h3 className="text-2xl font-light text-gray-800 mb-4">
                          {item.content.context}
                        </h3>
                      )}
                      <p className="text-lg text-gray-600 leading-relaxed font-light">
                        {item.content.content}
                      </p>
                      <div className="flex items-center justify-center text-amber-700">
                        <Heart className="w-5 h-5 mr-2" />
                        <span className="font-medium">{item.content.author}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cierre contemplativo */}
      <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-light text-gray-800">
              El Arte Como Espejo del Alma
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed font-light max-w-3xl mx-auto">
              Cada obra en esta colección es un fragmento de historia, una ventana al cosmos andino, 
              un puente entre el pasado ancestral y el presente creativo. El arte trasciende el tiempo 
              para hablar directamente al corazón de quien contempla.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Modal simplificado para contemplación completa */}
      {selectedPainting && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="relative">
              <button
                onClick={() => setSelectedPainting(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white transition-all duration-200"
              >
                ×
              </button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 space-y-8">
                  <div className="space-y-6">
                    <h2 className="text-4xl font-light text-gray-800 leading-tight">
                      {selectedPainting.title}
                    </h2>
                    <div className="flex items-center space-x-6 text-amber-700">
                      <span className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        {selectedPainting.year}
                      </span>
                      <span className="flex items-center">
                        <Brush className="w-5 h-5 mr-2" />
                        {selectedPainting.technique}
                      </span>
                    </div>
                  </div>
                  
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <p>{selectedPainting.story}</p>
                  </div>
                </div>
                
                <div className="relative">
                  <img
                    src={`/LaNik-/img/pinturas/${encodeURIComponent(selectedPainting.filename)}`}
                    alt={selectedPainting.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Art;