import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import DataTable from '../../components/ui/DataTable';
import { auditLogEntries } from '../../data/mockData';

export default function AuditLog({ roleId = 'admin' }) {
  const role = getRole(roleId);
  const columns = [
    { key: 'time', label: 'Time' },
    { key: 'actor', label: 'Actor' },
    { key: 'action', label: 'Action' },
    { key: 'target', label: 'Target' },
  ];
  return (
    <AppShell role={role} title="Audit Log" sub="Full, immutable event history">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Compliance</div>
          <h1 className="page-title">Audit log</h1>
        </div>
        <div className="page-actions"><button className="btn btn-secondary">Export CSV</button></div>
      </div>
      <div className="card card-flush">
        <DataTable columns={columns} rows={auditLogEntries} renderCell={(key, row) => key === 'action' ? <span className="mono">{row.action}</span> : row[key]} />
      </div>
    </AppShell>
  );
}
