import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';

export default function ReferralTools() {
  const role = getRole('partner');
  return (
    <AppShell role={role} title="Referral Tools" sub="Branding & attribution">
      <Card title="Your branded entry link">
        <div className="mono chip" style={{ display: 'inline-block' }}>synergy.app/r/highveld-partners</div>
        <div className="mt-4"><button className="btn btn-secondary btn-sm">Copy link</button></div>
      </Card>
    </AppShell>
  );
}
