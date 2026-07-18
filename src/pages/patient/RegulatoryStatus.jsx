import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import ProgressRail from '../../components/ui/ProgressRail';
import { regulatoryStages, patientProfile } from '../../data/mockData';

export default function RegulatoryStatus() {
  const role = getRole('patient');
  return (
    <AppShell role={role} title="Regulatory Status" sub={patientProfile.applicationRef}>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Section 21 tracking</div>
          <h1 className="page-title">Your application journey</h1>
          <p className="page-desc">A single, auditable thread from intake through to authorization — every stage below is logged and timestamped internally.</p>
        </div>
      </div>
      <Card>
        <ProgressRail steps={regulatoryStages} />
      </Card>
    </AppShell>
  );
}
