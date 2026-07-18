import { useNavigate } from 'react-router-dom';
import { ROLES } from '../data/roles';

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 15% 10%, #16241C 0%, #0E1913 55%, #0A130E 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px',
    }}>
      <div style={{ maxWidth: 880, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, margin: '0 auto 18px',
            background: 'linear-gradient(135deg, #4C8A63, #B8934A)',
          }} />
          <h1 style={{ color: '#F4F1E4', fontSize: 34 }}>Synergy Ecosystem</h1>
          <p style={{ color: '#8A9587', marginTop: 10, fontSize: 14 }}>
            Reference UI — select a role to preview its portal. No authentication is performed;
            this is a navigation-only build for continued development.
          </p>
        </div>

        <div className="grid grid-4" style={{ gap: 14 }}>
          {ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => navigate(role.base)}
              style={{
                textAlign: 'left', background: '#131F17', border: '1px solid #223326',
                borderRadius: 16, padding: '18px 16px', color: '#F4F1E4', cursor: 'pointer',
                transition: 'border-color .15s, transform .15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#B8934A'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#223326'; }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 17 }}>{role.label}</div>
              <div style={{ fontSize: 11.5, color: '#8A9587', marginTop: 5 }}>{role.person}</div>
              <div style={{ fontSize: 11, color: '#5E6B5D', marginTop: 10 }}>{role.tagline}</div>
              <div style={{ marginTop: 14, fontSize: 11.5, color: '#B8934A' }}>Enter portal →</div>
            </button>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#5E6B5D', fontSize: 11.5, marginTop: 36 }}>
          Every screen referenced in the RFQ exists as a real route here — sidebar navigation,
          topbar role switcher, and this landing screen all wire together. Swap in real auth
          and API calls whenever you're ready.
        </p>
      </div>
    </div>
  );
}
