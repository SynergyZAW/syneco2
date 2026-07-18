import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import DataTable from '../../components/ui/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import KpiCard from '../../components/ui/KpiCard';
import { resellerLocations } from '../../data/mockData';

export default function Portfolio() {
  const role = getRole('reseller');
  const columns = [
    { key: 'name', label: 'Location' },
    { key: 'status', label: 'Status' },
    { key: 'fee', label: 'Network access fee' },
    { key: 'sublicense', label: 'Sub-license RRP' },
    { key: 'compliance', label: 'Compliance' },
  ];
  return (
    <AppShell role={role} title="Portfolio" sub="Collection-point tenancy overview">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Agency management</div>
          <h1 className="page-title">Your collection-point portfolio</h1>
          <p className="page-desc">Tenant-style oversight of every location you manage under the Synergy network.</p>
        </div>
        <div className="page-actions"><button className="btn btn-primary">Add location</button></div>
      </div>
      <div className="grid grid-4" style={{ marginBottom: 20 }}>
        <KpiCard label="Managed locations" value="4" />
        <KpiCard label="Monthly network fees" value="R 2,000" />
        <KpiCard label="Monthly sub-license revenue" value="R 20,000" />
        <KpiCard label="Compliant locations" value="3 / 4" />
      </div>
      <div className="card card-flush">
        <DataTable columns={columns} rows={resellerLocations} renderCell={(key, row) => (key === 'status' || key === 'compliance') ? <StatusBadge status={row[key]} /> : row[key]} />
      </div>
    </AppShell>
  );
}
