export default function EmptyState({ title, desc, action }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{desc}</p>
      {action && <div style={{ marginTop: 18 }}>{action}</div>}
    </div>
  );
}
