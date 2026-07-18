import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';

const CHANNELS = [
  { name: 'Patient Care Service Callback', last: 'Chloe Pretorius needs consultation rebooking.' },
  { name: 'System Administrator Notification', last: 'Weekly compliance digest ready.' },
  { name: 'Dispatch Partner Pharmacy Hub', last: 'Crowpharm: 2 orders awaiting clarification.' },
];

export default function Messaging() {
  const role = getRole('doctor');
  return (
    <AppShell role={role} title="Secure Communications Platform" sub="Role-scoped messaging">
      <div className="grid grid-3">
        {CHANNELS.map((c) => (
          <Card key={c.name} title={c.name}>
            <p className="text-secondary">{c.last}</p>
            <button className="btn btn-secondary btn-sm mt-4">Open thread</button>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
