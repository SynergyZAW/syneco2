import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../data/roles';

export default function Topbar({ role, title, sub }) {
  const navigate = useNavigate();

  const initials = role.person.split(' ').map((p) => p[0]).slice(0, 2).join('');

  return (
    <header className="topbar">
      <div>
        <div className="topbar-title">{title}</div>
        {sub && <div className="topbar-sub">{sub}</div>}
      </div>
      <div className="topbar-right">
        <input className="topbar-search" placeholder="Search patients, orders, cases…" />
        <div className="role-switcher">
          <span style={{ color: 'var(--text-tertiary)', fontSize: 11 }}>Viewing as</span>
          <select
            value={role.id}
            onChange={(e) => {
              const next = ROLES.find((r) => r.id === e.target.value);
              navigate(next.base);
            }}
          >
            {ROLES.map((r) => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </div>
        <button className="icon-btn" aria-label="Notifications">
          🔔<span className="badge">3</span>
        </button>
        <div className="avatar">{initials}</div>
      </div>
    </header>
  );
}
