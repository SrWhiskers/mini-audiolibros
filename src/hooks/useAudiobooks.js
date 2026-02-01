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

        // Agrupar audiolibros por categoría y mapear campos snake_case a camelCase
        const categoriesWithBooks = cats.map(cat => ({
          id: cat.id,
          name: cat.name,
          audiobooks: books
            .filter(book => book.category_id === cat.id)
            .map(book => ({
              id: book.id,
              title: book.title,
              author: book.author,
              description: book.description,
              duration: book.duration,
              coverImage: book.cover_image,
              audioSrc: book.audio_src
            }))
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
