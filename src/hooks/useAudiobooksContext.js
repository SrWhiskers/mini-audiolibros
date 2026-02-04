import { useContext } from 'react';
import { AudiobooksContext } from '../context/audiobooksContext';

export function useAudiobooksContext() {
  const context = useContext(AudiobooksContext);
  if (!context) {
    throw new Error('useAudiobooksContext must be used within an AudiobooksProvider');
  }
  return context;
}
