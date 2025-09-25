#!/bin/bash

# Script para renombrar imágenes de pinturas de WhatsApp a nombres simples
# Convierte: "WhatsApp Image 2025-09-20 at 10.42.19.webp" → "pintura1.webp"

echo "🎨 Iniciando renombrado de imágenes de pinturas..."

cd "public/img/pinturas/" || exit 1

# Contador para los nuevos nombres
counter=1

# Crear mapeo de nombres viejos a nuevos
echo "📋 Creando mapeo de nombres:"

# Procesar archivos en orden alfabético para consistencia
for file in "WhatsApp Image"*.webp; do
    if [ -f "$file" ]; then
        new_name="pintura${counter}.webp"
        echo "$counter: '$file' → '$new_name'"
        
        # Renombrar el archivo
        mv "$file" "$new_name"
        
        if [ $? -eq 0 ]; then
            echo "✅ Renombrado exitoso: $new_name"
        else
            echo "❌ Error al renombrar: $file"
        fi
        
        counter=$((counter + 1))
    fi
done

echo ""
echo "🎉 ¡Renombrado completado!"
echo "📊 Total de imágenes renombradas: $((counter - 1))"

# Volver al directorio original
cd - > /dev/null

echo "📁 Verificando archivos finales:"
ls -la "public/img/pinturas/"