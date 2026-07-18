import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import DataTable from '../../components/ui/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import { referralSources } from '../../data/mockData';

export default function ReferralTenantManagement({ roleId = 'admin' }) {
  const role = getRole(roleId);
  const columns = [
    { key: 'name', label: 'Referral source' },
    { key: 'type', label: 'Type' },
    { key: 'patients', label: 'Attributed patients' },
    { key: 'status', label: 'Status' },
  ];
  return (
    <AppShell role={role} title="Referrals & Tenants" sub="Collection points, partners, pharmacies, resellers">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Network management</div>
          <h1 className="page-title">Referral sources & tenants</h1>
        </div>
        <div className="page-actions"><button className="btn btn-primary">Add referral source</button></div>
      </div>
      <div className="card card-flush">
        <DataTable columns={columns} rows={referralSources} renderCell={(key, row) => key === 'status' ? <StatusBadge status={row.status} /> : row[key]} />
      </div>
    </AppShell>
  );
}
