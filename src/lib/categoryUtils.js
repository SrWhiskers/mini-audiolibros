// Definición de familias de categorías
export const CATEGORY_FAMILIES = {
  trad: { id: 'trad', name: 'Tradición cultural / civilizatoria' },
  tipo: { id: 'tipo', name: 'Tipo de obra' },
  tema: { id: 'tema', name: 'Eje temático fuerte' },
  pract: { id: 'pract', name: 'Etiquetas prácticas' },
};

// Obtener familia de una categoría por su ID (ej: 'trad:grecia' -> { id: 'trad', name: '...' })
export function getCategoryFamily(categoryId) {
  const prefix = categoryId?.split(':')[0];
  return CATEGORY_FAMILIES[prefix] || null;
}

// Filtrar categorías que tienen al menos 1 audiolibro
export function filterNonEmptyCategories(categories) {
  return categories.filter(cat => cat.audiobooks?.length > 0);
}
