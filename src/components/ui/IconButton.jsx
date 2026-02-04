export default function IconButton({ onClick, className = "", children }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
