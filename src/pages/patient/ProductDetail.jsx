import { useParams, Link } from 'react-router-dom';
import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import { shopProducts } from '../../data/mockData';

export default function ProductDetail() {
  const role = getRole('patient');
  const { productId } = useParams();
  const product = shopProducts.find((p) => p.id === productId) || shopProducts[0];

  return (
    <AppShell role={role} title={product.name} sub="Medicine Shop">
      <Link to="/patient/shop" className="btn btn-ghost btn-sm" style={{ marginBottom: 16 }}>← Back to shop</Link>
      <div className="grid grid-2">
        <Card title={product.name} sub={product.type}>
          <div className="grid grid-2" style={{ marginBottom: 14 }}>
            <div><div className="kpi-label">THC</div><div style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>{product.thc}</div></div>
            <div><div className="kpi-label">CBD</div><div style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>{product.cbd}</div></div>
          </div>
          <p className="text-secondary">{product.cultivation}. Certified {product.cert}.</p>
        </Card>
        <Card title="Request dispensing" sub="Routes to your nearest fulfilment pharmacy.">
          <div className="field"><label>Pharmacy branch</label>
            <select><option>Crowpharm — Johannesburg Dispensing Facility</option><option>Crowpharm — Cape Town Fulfillment Hub</option></select>
          </div>
          <div className="field"><label>Delivery instructions</label><textarea rows={3} placeholder="Optional notes for the pharmacist" /></div>
          <button className="btn btn-primary" style={{ width: '100%' }}>Confirm & route prescription</button>
        </Card>
      </div>
    </AppShell>
  );
}
