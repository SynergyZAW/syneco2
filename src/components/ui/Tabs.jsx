export default function Tabs({ tabs, active, onChange, counts }) {
  return (
    <div className="tabs">
      {tabs.map((t) => (
        <button
          key={t}
          className={`tab ${active === t ? 'active' : ''}`}
          onClick={() => onChange(t)}
        >
          {t}
          {counts && counts[t] !== undefined && <span className="count">{counts[t]}</span>}
        </button>
      ))}
    </div>
  );
}
