export function Card({ children, className = '', topColor = '', hover = false }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden ${hover ? 'card-hover cursor-pointer' : ''} ${className}`}
      style={topColor ? { borderTop: `3px solid ${topColor}` } : {}}
    >
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return (
    <div className={`p-5 ${className}`}>
      {children}
    </div>
  );
}
