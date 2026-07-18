import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';

export default function Reports() {
  const role = getRole('reseller');
  return (
    <AppShell role={role} title="Reporting" sub="By reseller, location, and billing status">
      <div className="card"><EmptyState title="Reporting placeholder" desc="Per-location performance, compliance, and billing-status charts go here." /></div>
    </AppShell>
  );
}
