import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import KpiCard from '../../components/ui/KpiCard';
import ProgressRail from '../../components/ui/ProgressRail';
import StatusBadge from '../../components/ui/StatusBadge';
import { patientProfile, regulatoryStages, onboardingSteps } from '../../data/mockData';
import { Link } from 'react-router-dom';

export default function PatientDashboard() {
  const role = getRole('patient');
  const pct = Math.round((patientProfile.onboardingStep / onboardingSteps.length) * 100);

  return (
    <AppShell role={role} title="Application Workspace" sub={`Ref ${patientProfile.applicationRef}`}>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Welcome back</div>
          <h1 className="page-title">Hi {patientProfile.name.split(' ')[0]}, here's where things stand</h1>
          <p className="page-desc">Referred via {patientProfile.referralSource}. Your journey is tracked end-to-end below.</p>
        </div>
        <div className="page-actions">
          <StatusBadge status={patientProfile.status} />
        </div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 18 }}>
        <KpiCard label="Onboarding progress" value={`${pct}%`} delta={`Step ${patientProfile.onboardingStep} of ${onboardingSteps.length}`} />
        <KpiCard label="Application fee" value="Paid" delta="R750 — ref PYMT-88213" />
        <KpiCard label="Consent" value="Signed" delta="v2.3, 12 Jun" />
        <KpiCard label="Card status" value="Not yet issued" delta="Awaiting approval" down />
      </div>

      <div className="grid grid-2">
        <Card title="Regulatory status" sub="Your Section 21 application, from intake to authorization.">
          <ProgressRail steps={regulatoryStages} />
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card title="Continue onboarding" sub="Pick up where you left off.">
            <p className="text-secondary" style={{ marginBottom: 14 }}>
              You're on step {patientProfile.onboardingStep} — Clinical Intake. A short consultation
              is required before your application can proceed.
            </p>
            <Link to="/patient/onboarding" className="btn btn-primary">Continue onboarding</Link>
          </Card>
          <Card title="Quick links">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link to="/patient/shop" className="btn btn-secondary">Browse Medicine Shop</Link>
              <Link to="/patient/card" className="btn btn-secondary">View Digital Card</Link>
              <Link to="/patient/support" className="btn btn-secondary">Message Patient Care</Link>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
