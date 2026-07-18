import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import DataTable from '../../components/ui/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import { collectionPointPatients } from '../../data/mockData';

export default function PatientDirectory() {
  const role = getRole('collectionpoint');
  const columns = [
    { key: 'name', label: 'Patient' },
    { key: 'status', label: 'Status' },
    { key: 'joined', label: 'Joined' },
  ];
  return (
    <AppShell role={role} title="Attributed Patients" sub="Referred through Eco-Cann Clinic">
      <div className="page-header">
        <div><div className="page-eyebrow">Directory</div><h1 className="page-title">Attributed patients</h1></div>
      </div>
      <div className="card card-flush">
        <DataTable columns={columns} rows={collectionPointPatients} renderCell={(key, row) => key === 'status' ? <StatusBadge status={row.status} /> : row[key]} />
      </div>
    </AppShell>
  );
}
