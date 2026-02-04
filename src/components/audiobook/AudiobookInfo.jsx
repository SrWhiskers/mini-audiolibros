const variantClasses = {
  card: {
    title: 'font-semibold text-gray-900 mb-1 line-clamp-1',
    author: 'text-sm text-purple-600',
  },
  detail: {
    title: 'text-2xl font-bold text-gray-900 mb-1',
    author: 'text-lg text-purple-600',
  },
  player: {
    title: 'font-medium text-gray-900 truncate',
    author: 'text-sm text-gray-500 truncate',
  },
};

export default function AudiobookInfo({ title, author, variant = 'card', className = '' }) {
  const classes = variantClasses[variant];

  return (
    <div className={className}>
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.author}>{author}</p>
    </div>
  );
}
