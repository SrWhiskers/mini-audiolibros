import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAudiobooksContext } from '../hooks/useAudiobooksContext';
import { useAudioPlayerContext } from '../hooks/useAudioPlayerContext';
import { useAudioDuration, formatDuration } from '../hooks/useAudioDuration';
import { ClockIcon, PlayIcon, PauseIcon } from '../components/icons';
import { AudiobookCover, AudiobookInfo } from '../components/audiobook';

export default function AudiobookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { audiobooksMap, loading, error } = useAudiobooksContext();
  const { currentAudiobook, isPlaying, durationCache, playAudiobook, handleDurationLoaded } = useAudioPlayerContext();

  const audiobook = audiobooksMap[id];
  const isActive = currentAudiobook?.id === audiobook?.id;
  const { duration, isLoading: isDurationLoading } = useAudioDuration(
    audiobook?.audioSrc,
    audiobook ? durationCache[audiobook.audioSrc] : null,
    handleDurationLoaded
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold mb-2">Error al cargar</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!audiobook) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold mb-2 text-gray-800">Audiolibro no encontrado</p>
          <Link to="/" className="text-purple-600 hover:text-purple-700">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const handlePlay = () => {
    playAudiobook(audiobook);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <AudiobookCover
            coverImage={audiobook.coverImage}
            title={audiobook.title}
            size="lg"
            aspectRatio="wide"
          />

          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <AudiobookInfo
                title={audiobook.title}
                author={audiobook.author}
                variant="detail"
              />
              <div className={`flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full ${isDurationLoading ? 'animate-pulse' : ''}`}>
                <ClockIcon className="w-4 h-4 mr-1" />
                {formatDuration(duration, audiobook.duration)}
              </div>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">{audiobook.description}</p>

            <button
              onClick={handlePlay}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
            >
              {isPlaying && isActive ? (
                <>
                  <PauseIcon className="w-6 h-6" />
                  Pausar
                </>
              ) : (
                <>
                  <PlayIcon className="w-6 h-6" />
                  {isActive ? 'Continuar' : 'Reproducir'}
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
