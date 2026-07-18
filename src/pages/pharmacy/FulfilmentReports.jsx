import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';

export default function FulfilmentReports() {
  const role = getRole('pharmacy');
  return (
    <AppShell role={role} title="Fulfilment Reporting" sub="Branch-level performance">
      <div className="card"><EmptyState title="Reporting placeholder" desc="Charts for fulfilment time, order volume, and branch throughput go here." /></div>
    </AppShell>
  );
}
