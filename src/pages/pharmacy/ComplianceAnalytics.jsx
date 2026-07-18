import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import KpiCard from '../../components/ui/KpiCard';
import { pharmacyComplianceStats } from '../../data/mockData';

export default function ComplianceAnalytics() {
  const role = getRole('pharmacy');
  return (
    <AppShell role={role} title="Compliance Analytics" sub="Dispensing compliance overview">
      <div className="grid grid-4">
        {pharmacyComplianceStats.map((s) => <KpiCard key={s.label} label={s.label} value={s.value} />)}
      </div>
    </AppShell>
  );
}
