import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import { weeklyPlanner } from '../../data/mockData';

export default function Planner() {
  const role = getRole('doctor');
  return (
    <AppShell role={role} title="Weekly Planner" sub="Upcoming online consultations">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Scheduling</div>
          <h1 className="page-title">Weekly Planner</h1>
        </div>
      </div>
      <div className="grid grid-4">
        {weeklyPlanner.map((day) => (
          <Card key={day.day} title={day.day}>
            {day.slots.length === 0 ? (
              <p className="text-secondary" style={{ fontSize: 12 }}>No bookings</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {day.slots.map((s) => (
                  <div key={s.time} className="chip" style={{ display: 'block' }}>{s.time} — {s.patient}</div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
