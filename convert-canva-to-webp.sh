#!/bin/bash

# Script para convertir imágenes de Canva (PNG) a WebP optimizado para productos textiles
# Optimizado para preservar texturas y detalles de tejidos

echo "🧶 Convertidor de imágenes de productos textiles PNG → WebP"
echo ""

# Verificar si hay archivos PNG en el directorio actual
png_files=$(ls *.png 2>/dev/null | wc -l)

if [ $png_files -eq 0 ]; then
    echo "❌ No se encontraron archivos PNG en este directorio."
    echo "💡 Coloca tus imágenes de Canva (.png) en este directorio y ejecuta el script nuevamente."
    exit 1
fi

echo "📁 Archivos PNG encontrados: $png_files"
echo ""

# Convertir cada archivo PNG a WebP
for png_file in *.png; do
    if [ -f "$png_file" ]; then
        # Obtener nombre sin extensión
        base_name="${png_file%.*}"
        webp_file="${base_name}.webp"
        
        echo "🔄 Convirtiendo: $png_file → $webp_file"
        
        # Convertir con calidad 90 (más alta para preservar texturas)
        cwebp -q 90 -m 6 -alpha_q 100 "$png_file" -o "$webp_file"
        
        if [ $? -eq 0 ]; then
            # Mostrar tamaños para comparación
            original_size=$(du -h "$png_file" | cut -f1)
            new_size=$(du -h "$webp_file" | cut -f1)
            echo "✅ Convertido: $original_size → $new_size"
        else
            echo "❌ Error al convertir $png_file"
        fi
        echo ""
    fi
done

echo "🎉 ¡Conversión completada!"
echo ""
echo "📊 Instrucciones:"
echo "1. Verifica la calidad de las imágenes WebP generadas"
echo "2. Copia los archivos .webp a tu carpeta public/img/"
echo "3. Actualiza las referencias en tu código si es necesario"