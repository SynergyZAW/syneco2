import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Tabs from '../../components/ui/Tabs';
import DataTable from '../../components/ui/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import { doctorQueue, doctorQueueTabs } from '../../data/mockData';

export default function IntakeQueue() {
  const role = getRole('doctor');
  const [tab, setTab] = useState('All');
  const navigate = useNavigate();

  const rows = tab === 'All' ? doctorQueue : doctorQueue.filter((r) => r.status === tab);

  const columns = [
    { key: 'id', label: 'Case ref' },
    { key: 'patient', label: 'Patient' },
    { key: 'status', label: 'Status' },
    { key: 'payment', label: 'Payment' },
    { key: 'verification', label: 'Verification' },
    { key: 'pathway', label: 'Pathway' },
    { key: 'updated', label: 'Updated' },
  ];

  return (
    <AppShell role={role} title="Clinical Intake Queue" sub="Case review & decisions">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Doctor workspace</div>
          <h1 className="page-title">Clinical Intake Queue</h1>
          <p className="page-desc">Review incoming applications, request more information, or move a case to decision.</p>
        </div>
      </div>

      <Tabs tabs={doctorQueueTabs} active={tab} onChange={setTab} />

      <div className="card card-flush">
        <DataTable
          columns={columns}
          rows={rows}
          onRowClick={() => navigate('/doctor/case/SYN-APP-10442')}
          renderCell={(key, row) => {
            if (key === 'id') return <span className="mono">{row.id}</span>;
            if (key === 'status' || key === 'payment' || key === 'verification') return <StatusBadge status={row[key]} />;
            return row[key];
          }}
        />
      </div>
    </AppShell>
  );
}
