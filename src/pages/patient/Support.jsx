import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import { supportThreads } from '../../data/mockData';

export default function Support() {
  const role = getRole('patient');
  return (
    <AppShell role={role} title="Support Center" sub="Authorized communication channels">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Messaging</div>
          <h1 className="page-title">Support Center</h1>
        </div>
      </div>
      <div className="grid grid-2">
        {supportThreads.map((t) => (
          <Card key={t.channel} title={t.channel} sub={t.time} actions={t.unread > 0 && <span className="chip">{t.unread} new</span>}>
            <p className="text-secondary">{t.last}</p>
          </Card>
        ))}
      </div>
      <Card title="Send a message" className="mt-8">
        <textarea rows={3} placeholder="Type a message to Patient Care…" style={{ width: '100%', padding: 12, border: '1px solid var(--border-strong)', borderRadius: 8, fontFamily: 'inherit' }} />
        <button className="btn btn-primary mt-4">Send</button>
      </Card>
    </AppShell>
  );
}
