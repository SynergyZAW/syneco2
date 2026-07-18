import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import KpiCard from '../../components/ui/KpiCard';
import { doctorReports } from '../../data/mockData';

export default function Reports() {
  const role = getRole('doctor');
  return (
    <AppShell role={role} title="Workload Reports" sub="Doctor performance & throughput">
      <div className="grid grid-4">
        {doctorReports.map((r) => <KpiCard key={r.label} label={r.label} value={r.value} />)}
      </div>
    </AppShell>
  );
}
