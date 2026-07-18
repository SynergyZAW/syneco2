import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import { patientProfile } from '../../data/mockData';

export default function DigitalCard() {
  const role = getRole('patient');
  return (
    <AppShell role={role} title="Digital Card" sub={patientProfile.applicationRef}>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Patient identification</div>
          <h1 className="page-title">Digital Patient Card</h1>
          <p className="page-desc">Issued automatically once your Section 21 application is approved.</p>
        </div>
      </div>

      <div style={{ maxWidth: 420 }}>
        <div style={{
          borderRadius: 20, padding: 26, color: '#F4F1E4',
          background: 'linear-gradient(135deg, #16241C 0%, #0E1913 70%)',
          border: '1px solid #223326', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,147,61,.25), transparent 70%)' }} />
          <div style={{ fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: '#8A9587' }}>Synergy Wellness</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginTop: 20 }}>{patientProfile.name}</div>
          <div style={{ fontSize: 12, color: '#8A9587', marginTop: 4 }}>ID {patientProfile.idNumber}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 36 }}>
            <div>
              <div style={{ fontSize: 10, color: '#8A9587' }}>Application ref</div>
              <div className="mono" style={{ color: '#F4F1E4' }}>{patientProfile.applicationRef}</div>
            </div>
            <div style={{ fontSize: 10, color: '#B8934A' }}>Pending issuance</div>
          </div>
        </div>
        <p className="text-secondary mt-4" style={{ fontSize: 12 }}>
          Your card will unlock once a clinician approves your application. Physical card
          production and dispatch tracking will appear here too.
        </p>
      </div>
    </AppShell>
  );
}
