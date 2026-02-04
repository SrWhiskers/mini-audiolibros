import { useState } from 'react';
import { BookIcon } from '../icons';

const sizeClasses = {
  sm: { container: 'w-12 h-12', icon: 'w-20 h-20', iconInner: 'w-6 h-6' },
  md: { container: 'w-20 h-20', icon: 'w-20 h-20', iconInner: 'w-10 h-10' },
  lg: { container: 'w-24 h-24', icon: 'w-24 h-24', iconInner: 'w-12 h-12' },
};

export default function AudiobookCover({
  coverImage,
  title,
  size = 'md',
  aspectRatio = 'square',
  className = ''
}) {
  const [imageError, setImageError] = useState(false);

  const aspectClasses = {
    square: 'aspect-square',
    wide: 'aspect-[2/1]',
  };

  const sizes = sizeClasses[size];

  if (coverImage && !imageError) {
    return (
      <div className={`bg-gradient-to-br from-purple-100 to-indigo-100 relative ${aspectClasses[aspectRatio]} ${className}`}>
        <img
          src={coverImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-purple-100 to-indigo-100 relative ${aspectClasses[aspectRatio]} ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`${sizes.icon} bg-purple-200 rounded-full flex items-center justify-center`}>
          <BookIcon className={`${sizes.iconInner} text-purple-600`} />
        </div>
      </div>
    </div>
  );
}
