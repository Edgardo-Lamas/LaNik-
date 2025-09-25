#!/bin/bash

# Script para convertir todas las imágenes JPEG a WebP
# Mantiene la estructura de carpetas y genera archivos optimizados

echo "🔄 Iniciando conversión de imágenes JPEG a WebP..."

# Contador de archivos procesados
count=0
total=$(find public/img -name "*.jpeg" -o -name "*.jpg" | wc -l | tr -d ' ')

echo "📊 Total de imágenes a convertir: $total"

# Encontrar todas las imágenes JPEG y convertirlas
find public/img -name "*.jpeg" -o -name "*.jpg" | while read -r file; do
    # Obtener el nombre sin extensión
    base="${file%.*}"
    # Crear nombre del archivo WebP
    webp_file="${base}.webp"
    
    # Incrementar contador
    count=$((count + 1))
    
    echo "[$count/$total] Convirtiendo: $file → $webp_file"
    
    # Convertir con calidad 85 (buen balance entre calidad y tamaño)
    cwebp -q 85 "$file" -o "$webp_file"
    
    if [ $? -eq 0 ]; then
        echo "✅ Convertido exitosamente"
    else
        echo "❌ Error al convertir $file"
    fi
done

echo "🎉 ¡Conversión completada!"

# Mostrar estadísticas de tamaño
echo "📈 Estadísticas de optimización:"
echo "Tamaño original (JPEG):"
du -sh public/img --include="*.jpeg" --include="*.jpg" 2>/dev/null || echo "No se pudo calcular"
echo "Tamaño nuevo (WebP):"
du -sh public/img --include="*.webp" 2>/dev/null || echo "No se pudo calcular"