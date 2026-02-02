import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useAudiobooks() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Obtener categorías
        const { data: cats, error: catError } = await supabase
          .from('categories')
          .select('*');

        if (catError) throw catError;

        // Obtener audiolibros
        const { data: books, error: bookError } = await supabase
          .from('audiobooks')
          .select('*');

        if (bookError) throw bookError;

        // Obtener relaciones audiobook-categoría
        const { data: relations, error: relError } = await supabase
          .from('audiobook_categories')
          .select('*');

        if (relError) throw relError;

        // Mapear audiolibros a camelCase
        const booksMap = {};
        books.forEach(book => {
          booksMap[book.id] = {
            id: book.id,
            title: book.title,
            author: book.author,
            description: book.description,
            duration: book.duration,
            coverImage: book.cover_image,
            audioSrc: book.audio_src
          };
        });

        // Agrupar audiolibros por categoría usando la tabla de relaciones
        const categoriesWithBooks = cats.map(cat => ({
          id: cat.id,
          name: cat.name,
          audiobooks: relations
            .filter(rel => rel.category_id === cat.id)
            .map(rel => booksMap[rel.audiobook_id])
            .filter(Boolean)
        }));

        setCategories(categoriesWithBooks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { categories, loading, error };
}
