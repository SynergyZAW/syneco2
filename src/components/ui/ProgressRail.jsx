// Signature element: vertical "Provenance Rail" used anywhere a workflow
// status thread needs to be shown (patient regulatory status, doctor case
// audit trail, collection-point pipelines).
export default function ProgressRail({ steps }) {
  return (
    <div className="rail">
      {steps.map((s, i) => {
        const stateClass = s.current ? 'current' : s.done ? 'done' : '';
        const isLast = i === steps.length - 1;
        return (
          <div className={`rail-step ${stateClass}`} key={i}>
            <div className="rail-node-col">
              <div className="rail-node">{s.done ? '✓' : i + 1}</div>
              {!isLast && <div className="rail-line" />}
            </div>
            <div className="rail-content">
              <div className="rail-title">{s.title}</div>
              <div className="rail-meta">{s.meta}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
