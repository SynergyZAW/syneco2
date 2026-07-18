import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import KpiCard from '../../components/ui/KpiCard';
import { collectionPointKpis } from '../../data/mockData';

export default function Console() {
  const role = getRole('collectionpoint');
  return (
    <AppShell role={role} title="Executive Console" sub="Eco-Cann Clinic · Strategic Network ID #5">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Collection point</div>
          <h1 className="page-title">Eco-Cann Clinic Executive Console</h1>
          <p className="page-desc">Referral performance, attribution, and depot readiness for your location.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">Preview entry portal</button>
          <button className="btn btn-primary">Copy branded entry link</button>
        </div>
      </div>
      <div className="grid grid-4" style={{ marginBottom: 20 }}>
        {collectionPointKpis.map((k) => <KpiCard key={k.label} label={k.label} value={k.value} />)}
      </div>
      <div className="grid grid-2">
        <Card title="Community Pharmacy Channel" sub="Status"><span className="status-badge status-success"><span className="dot" />Active</span></Card>
        <Card title="Pickup Depot" sub="Status"><span className="status-badge status-success"><span className="dot" />Active</span></Card>
      </div>
    </AppShell>
  );
}
