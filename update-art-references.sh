#!/bin/bash

# Script para actualizar las referencias de nombres de archivos en Art.tsx
# Convierte las referencias de WhatsApp a pintura1.webp, pintura2.webp, etc.

echo "🎨 Actualizando referencias en Art.tsx..."

file="src/pages/Art.tsx"

# Crear mapeo de nombres viejos a nuevos (en el orden que aparecen en el array)
declare -A name_mapping=(
  ["WhatsApp Image 2025-09-20 at 10.42.19.webp"]="pintura1.webp"
  ["WhatsApp Image 2025-09-20 at 10.42.44.webp"]="pintura2.webp"
  ["WhatsApp Image 2025-09-20 at 10.43.06.webp"]="pintura3.webp"
  ["WhatsApp Image 2025-09-20 at 10.43.32.webp"]="pintura4.webp"
  ["WhatsApp Image 2025-09-20 at 10.51.42.webp"]="pintura5.webp"
  ["WhatsApp Image 2025-09-20 at 10.55.16.webp"]="pintura6.webp"
  ["WhatsApp Image 2025-09-20 at 10.55.55.webp"]="pintura7.webp"
  ["WhatsApp Image 2025-09-20 at 10.56.28.webp"]="pintura8.webp"
  ["WhatsApp Image 2025-09-20 at 10.57.04.webp"]="pintura9.webp"
  ["WhatsApp Image 2025-09-20 at 10.58.06.webp"]="pintura10.webp"
  ["WhatsApp Image 2025-09-20 at 10.58.35.webp"]="pintura11.webp"
  ["WhatsApp Image 2025-09-20 at 10.59.02.webp"]="pintura12.webp"
  ["WhatsApp Image 2025-09-20 at 10.59.24.webp"]="pintura13.webp"
  ["WhatsApp Image 2025-09-20 at 11.00.43.webp"]="pintura14.webp"
  ["WhatsApp Image 2025-09-20 at 11.05.07.webp"]="pintura15.webp"
  ["WhatsApp Image 2025-09-20 at 11.14.12.webp"]="pintura16.webp"
  ["WhatsApp Image 2025-09-20 at 11.14.43.webp"]="pintura17.webp"
  ["WhatsApp Image 2025-09-20 at 11.15.21.webp"]="pintura18.webp"
  ["WhatsApp Image 2025-09-20 at 11.16.23.webp"]="pintura19.webp"
  ["WhatsApp Image 2025-09-20 at 11.16.45.webp"]="pintura20.webp"
  ["WhatsApp Image 2025-09-20 at 11.17.58.webp"]="pintura21.webp"
  ["WhatsApp Image 2025-09-20 at 11.19.19.webp"]="pintura22.webp"
)

# Aplicar reemplazos uno por uno
for old_name in "${!name_mapping[@]}"; do
  new_name="${name_mapping[$old_name]}"
  echo "🔄 Reemplazando: '$old_name' → '$new_name'"
  
  # Usar sed para reemplazar en el archivo
  sed -i '' "s|filename: '$old_name'|filename: '$new_name'|g" "$file"
  
  if [ $? -eq 0 ]; then
    echo "✅ Reemplazo exitoso"
  else
    echo "❌ Error en reemplazo"
  fi
done

echo ""
echo "🎉 ¡Actualización de Art.tsx completada!"
echo "🔍 Verificando que no queden referencias de WhatsApp:"

if grep -q "WhatsApp Image" "$file"; then
  echo "⚠️  Aún hay referencias de WhatsApp en el archivo"
  grep -n "WhatsApp Image" "$file"
else
  echo "✅ Todas las referencias fueron actualizadas correctamente"
fi