import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import DataTable from '../../components/ui/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import { pharmacyOrders } from '../../data/mockData';

export default function DispensaryOrders() {
  const role = getRole('pharmacy');
  const columns = [
    { key: 'ref', label: 'Order ref' },
    { key: 'patient', label: 'Patient' },
    { key: 'status', label: 'Status' },
    { key: 'branch', label: 'Branch' },
    { key: 'date', label: 'Date' },
  ];
  return (
    <AppShell role={role} title="Dispensary Orders" sub="Crowpharm Pharmacy">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Fulfilment</div>
          <h1 className="page-title">Dispensary orders</h1>
          <p className="page-desc">Orders routed from the patient Medicine Shop, grouped by branch.</p>
        </div>
      </div>
      <div className="card card-flush">
        <DataTable columns={columns} rows={pharmacyOrders} renderCell={(key, row) => key === 'ref' ? <span className="mono">{row.ref}</span> : key === 'status' ? <StatusBadge status={row.status} /> : row[key]} />
      </div>
    </AppShell>
  );
}
