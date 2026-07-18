export default function Card({ title, sub, children, actions, flush, className = '' }) {
  return (
    <div className={`card ${flush ? 'card-flush' : ''} ${className}`}>
      {(title || actions) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: flush ? '20px 20px 0' : 0 }}>
          <div>
            {title && <div className="card-title">{title}</div>}
            {sub && <div className="card-sub">{sub}</div>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}
