import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';

export default function Billing() {
  const role = getRole('reseller');
  return (
    <AppShell role={role} title="Billing & Fees" sub="Network access & sub-license billing">
      <div className="grid grid-2">
        <Card title="Network access fees" sub="Charged by Synergy per location, per month">
          <p className="text-secondary">R 500 ex VAT / location / month. Deducted automatically from your settlement account.</p>
        </Card>
        <Card title="Sub-license revenue" sub="Recommended retail price">
          <p className="text-secondary">R 5,000 ex VAT / month recommended per collection point sub-licensed to a location operator.</p>
        </Card>
      </div>
    </AppShell>
  );
}
