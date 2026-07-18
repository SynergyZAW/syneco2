import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import { patientProfile } from '../../data/mockData';

export default function Profile() {
  const role = getRole('patient');
  return (
    <AppShell role={role} title="Profile" sub="Account & preferences">
      <div className="grid grid-2">
        <Card title="Personal details">
          <div className="field"><label>Full name</label><input defaultValue={patientProfile.name} /></div>
          <div className="field"><label>ID number</label><input defaultValue={patientProfile.idNumber} /></div>
          <div className="field"><label>Mobile number</label><input defaultValue="082 000 0000" /></div>
          <button className="btn btn-primary">Save changes</button>
        </Card>
        <Card title="Referral source">
          <p className="text-secondary">You were referred by <strong>{patientProfile.referralSource}</strong>. Referral attribution determines your branding and any voucher pricing.</p>
        </Card>
      </div>
    </AppShell>
  );
}
