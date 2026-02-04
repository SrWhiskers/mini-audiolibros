import { useMemo } from 'react';
import { AudiobooksContext } from './audiobooksContext';
import { useAudiobooks } from '../hooks/useAudiobooks';

export function AudiobooksProvider({ children }) {
  const { categories, loading, error } = useAudiobooks();

  const audiobooksMap = useMemo(() => {
    const map = {};
    categories.forEach(cat => {
      cat.audiobooks.forEach(book => {
        map[book.id] = book;
      });
    });
    return map;
  }, [categories]);

  const value = {
    categories,
    audiobooksMap,
    loading,
    error,
  };

  return (
    <AudiobooksContext.Provider value={value}>
      {children}
    </AudiobooksContext.Provider>
  );
}
