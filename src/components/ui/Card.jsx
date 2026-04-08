export function Card({ children, className = '', topColor = '', hover = false }) {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden ${hover ? 'card-hover cursor-pointer' : ''} ${className}`}
      style={{
        boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        border: '1px solid #e8edf3',
        ...(topColor ? { borderTop: `4px solid ${topColor}` } : {}),
      }}
    >
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}
