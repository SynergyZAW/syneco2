import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import DataTable from '../../components/ui/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import { userAdminList } from '../../data/mockData';

export default function UserAdmin({ roleId = 'admin' }) {
  const role = getRole(roleId);
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'dept', label: 'Department / tenant' },
    { key: 'status', label: 'Status' },
  ];
  return (
    <AppShell role={role} title="Users & Permissions" sub="Group-wide access control">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Identity & access</div>
          <h1 className="page-title">Users & permissions</h1>
        </div>
        <div className="page-actions"><button className="btn btn-primary">Invite user</button></div>
      </div>
      <div className="card card-flush">
        <DataTable columns={columns} rows={userAdminList} renderCell={(key, row) => key === 'status' ? <StatusBadge status={row.status} /> : row[key]} />
      </div>
    </AppShell>
  );
}
