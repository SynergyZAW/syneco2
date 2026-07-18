// Maps loose status strings to a semantic tone. Extend STATUS_MAP as new
// statuses are introduced rather than hardcoding tones at call sites.
const STATUS_MAP = {
  active: 'success', approved: 'success', completed: 'success', compliant: 'success', paid: 'success', verified: 'success',
  pending: 'warning', 'review due': 'warning', onboarding: 'warning', 'clarification hold': 'warning', 'info req': 'warning', outstanding: 'warning', booked: 'info',
  outstanding_: 'warning',
  declined: 'danger', outstanding__: 'danger',
  review: 'info', 'ready for collection': 'info', 'consultation required': 'info', 'card in production': 'info', decision: 'info',
  'onboarding incomplete': 'neutral', 'pending vetting': 'warning',
};

function toneFor(status) {
  const key = String(status).toLowerCase();
  return STATUS_MAP[key] || 'neutral';
}

export default function StatusBadge({ status, tone }) {
  const t = tone || toneFor(status);
  return (
    <span className={`status-badge status-${t}`}>
      <span className="dot" />
      {status}
    </span>
  );
}
