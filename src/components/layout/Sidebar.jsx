import { NavLink } from 'react-router-dom';

export default function Sidebar({ role }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-mark" />
        <div>
          <div className="sidebar-brand-text">Synergy</div>
          <div className="sidebar-brand-sub">Ecosystem</div>
        </div>
      </div>

      <div className="sidebar-role-chip">
        <div className="sidebar-role-chip-label">Signed in as</div>
        <div className="sidebar-role-chip-name">{role.person}</div>
        <div className="sidebar-brand-sub" style={{ marginTop: 3 }}>{role.tagline}</div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">{role.label} Menu</div>
        {role.nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === role.base}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="dot" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-foot">
        <NavLink to="/" className="sidebar-switch-link">← Switch role / sign out</NavLink>
      </div>
    </aside>
  );
}
