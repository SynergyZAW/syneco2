import { Link } from 'react-router-dom';
import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import KpiCard from '../../components/ui/KpiCard';
import { adminDepartments, adminKpis } from '../../data/mockData';

export default function AdminOverview({ roleId = 'admin' }) {
  const role = getRole(roleId);
  return (
    <AppShell role={role} title="Group Overview" sub="All departments & entities">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Group operations</div>
          <h1 className="page-title">Welcome back, {role.person.split('—')[0].trim()}</h1>
          <p className="page-desc">Department-scoped workspaces for patient care, finance, IT, compliance, operations, assets, and executive reporting.</p>
        </div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 22 }}>
        {adminKpis.map((k) => <KpiCard key={k.label} label={k.label} value={k.value} delta={k.delta} />)}
      </div>

      <h2 style={{ fontSize: 16, marginBottom: 14 }}>Departments</h2>
      <div className="grid grid-3">
        {adminDepartments.map((d) => (
          <Link key={d.id} to={`/admin/department/${d.id}`} style={{ display: 'block' }}>
            <Card title={d.label} sub={d.stat}>
              <p className="text-secondary">{d.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
