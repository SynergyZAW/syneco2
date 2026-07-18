import { useParams } from 'react-router-dom';
import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { adminDepartments } from '../../data/mockData';

export default function DepartmentPage({ roleId = 'admin' }) {
  const role = getRole(roleId);
  const { deptId } = useParams();
  const dept = adminDepartments.find((d) => d.id === deptId) || adminDepartments[0];

  return (
    <AppShell role={role} title={dept.label} sub="Department workspace">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Admin · {dept.label}</div>
          <h1 className="page-title">{dept.label} workspace</h1>
          <p className="page-desc">{dept.desc}</p>
        </div>
        <div className="page-actions"><button className="btn btn-secondary">Export report</button></div>
      </div>
      <div className="grid grid-3" style={{ marginBottom: 20 }}>
        <Card title="Open items" sub={dept.stat}><p className="text-secondary">Queue and exception detail for this department goes here.</p></Card>
        <Card title="Recent activity"><p className="text-secondary">Recent department events will list here.</p></Card>
        <Card title="Scoped permissions"><p className="text-secondary">Users with access to {dept.label} appear here.</p></Card>
      </div>
      <div className="card">
        <EmptyState
          title="This is a placeholder workspace"
          desc={`Wire up real ${dept.label.toLowerCase()} data, queues, and actions here — the routing, layout, and department switcher already work.`}
        />
      </div>
    </AppShell>
  );
}
