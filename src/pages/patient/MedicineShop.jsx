import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import { shopProducts } from '../../data/mockData';
import { Link } from 'react-router-dom';

export default function MedicineShop() {
  const role = getRole('patient');
  return (
    <AppShell role={role} title="Medicine Shop" sub="Synergy Certified Dispensary Strain Menu">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Store</div>
          <h1 className="page-title">Medicine Shop</h1>
          <p className="page-desc">Over-the-counter items are visible to everyone. Scheduled products unlock once your Section 21 authorization is active.</p>
        </div>
      </div>
      <div className="grid grid-3">
        {shopProducts.map((p) => (
          <Card key={p.id} title={p.name} sub={p.type}>
            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
              <span>THC {p.thc}</span><span>CBD {p.cbd}</span>
            </div>
            <p className="text-secondary" style={{ fontSize: 12 }}>{p.cultivation}</p>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="chip">{p.cert}</span>
              <Link to={`/patient/shop/${p.id}`} className="btn btn-secondary btn-sm">
                {p.restricted ? 'Request dispensing' : 'View product'}
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
