import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import { partnerTools } from '../../data/mockData';

export default function Workspace() {
  const role = getRole('partner');
  return (
    <AppShell role={role} title="Partner Workspace" sub="Operational tools">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Onboarding partner</div>
          <h1 className="page-title">Your workspace</h1>
        </div>
      </div>
      <div className="grid grid-2">
        {partnerTools.map((t) => (
          <Card key={t.title} title={t.title}><p className="text-secondary">{t.desc}</p></Card>
        ))}
      </div>
    </AppShell>
  );
}
