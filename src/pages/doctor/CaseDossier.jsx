import { useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import StatusBadge from '../../components/ui/StatusBadge';
import { caseDossier } from '../../data/mockData';
import { Link } from 'react-router-dom';

export default function CaseDossier() {
  const role = getRole('doctor');
  const [confirming, setConfirming] = useState(null);

  return (
    <AppShell role={role} title={`Case ${caseDossier.id}`} sub={caseDossier.patient}>
      <Link to="/doctor" className="btn btn-ghost btn-sm" style={{ marginBottom: 16 }}>← Back to queue</Link>

      <div className="grid grid-2" style={{ alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card title="Patient summary" sub={`Age ${caseDossier.age} · ID ${caseDossier.idNumber} · Referred via ${caseDossier.referral}`}>
            <div className="field"><label>Presenting symptoms</label><p>{caseDossier.presentingSymptoms}</p></div>
            <div className="field"><label>Concomitant conditions</label><p>{caseDossier.concomitant}</p></div>
            <div className="field"><label>Triage classification</label><StatusBadge status={caseDossier.triage} tone="info" /></div>
          </Card>

          <Card title="Compliance checks">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-secondary">Consent</span><StatusBadge status={caseDossier.consentStatus} tone="success" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-secondary">Payment</span><StatusBadge status={caseDossier.paymentStatus} tone="success" />
              </div>
            </div>
          </Card>

          <Card title="Clinical notes">
            <textarea rows={4} placeholder="SOAP notes…" style={{ width: '100%', padding: 12, border: '1px solid var(--border-strong)', borderRadius: 8, fontFamily: 'inherit' }} />
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card title="Clinician Final Decision Terminal" sub="Requires internal remarks before confirming.">
            <div className="field"><label>Internal remarks</label><textarea rows={3} placeholder="Reason for decision…" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button className="btn btn-primary" onClick={() => setConfirming('Approve to Step 6 — License Issued')}>Approve to Step 6 — License Issued</button>
              <button className="btn btn-secondary" onClick={() => setConfirming('Request More Info')}>Request More Info</button>
              <button className="btn btn-secondary" onClick={() => setConfirming('Mandate Consult Gating')}>Mandate Consult Gating</button>
              <button className="btn btn-danger-outline" onClick={() => setConfirming('Decline')}>Decline</button>
            </div>
            {confirming && (
              <div className="card" style={{ background: 'var(--surface-sunken)', marginTop: 14 }}>
                <p style={{ fontSize: 12.5 }}>Confirm action: <strong>{confirming}</strong>? This is logged to the audit trail.</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <button className="btn btn-primary btn-sm" onClick={() => setConfirming(null)}>Confirm</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setConfirming(null)}>Cancel</button>
                </div>
              </div>
            )}
          </Card>

          <Card title="Audit trail" sub="Timestamped clinical events">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {caseDossier.auditTrail.map((e, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span className="mono">{e.event}</span>
                  <span className="text-secondary">{e.actor} · {e.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
