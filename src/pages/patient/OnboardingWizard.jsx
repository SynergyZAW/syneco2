import { useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import { onboardingSteps } from '../../data/mockData';

const STEP_CONTENT = {
  welcome: {
    body: (
      <div>
        <p className="text-secondary">A few things before we start: this application is for a Section 21
        authorization to access unregistered medicine. It takes about 8 minutes, and you can save and
        return at any time.</p>
        <div className="field mt-8">
          <label>Referral code (optional)</label>
          <input placeholder="e.g. ECO-CANN-5" />
        </div>
      </div>
    ),
  },
  basic: {
    body: (
      <div className="field-row">
        <div className="field"><label>Full name</label><input placeholder="Chloe Pretorius" /></div>
        <div className="field"><label>ID number</label><input placeholder="9403215800083" /></div>
        <div className="field"><label>Mobile number</label><input placeholder="082 000 0000" /></div>
        <div className="field"><label>Email</label><input placeholder="chloe@email.com" /></div>
      </div>
    ),
  },
  identity: {
    body: (
      <div>
        <div className="field-row">
          <div className="field"><label>ID document</label><input type="file" /></div>
          <div className="field"><label>Selfie capture</label><input type="file" /></div>
        </div>
        <p className="field-hint">Your selfie will also appear on your digital patient card once approved.</p>
      </div>
    ),
  },
  clinical: {
    body: (
      <div>
        <div className="field"><label>What's the main reason for your application?</label>
          <select><option>Chronic pain</option><option>Anxiety</option><option>Sleep difficulty</option><option>Other</option></select>
        </div>
        <div className="field-row">
          <div className="field"><label>How long have you experienced this?</label><input placeholder="3+ years" /></div>
          <div className="field"><label>Current treatment</label><input placeholder="Occasional NSAIDs" /></div>
        </div>
        <div className="field"><label>Any other conditions we should know about?</label><textarea rows={3} placeholder="Mild generalised anxiety, managed" /></div>
      </div>
    ),
  },
  consent: {
    body: (
      <div>
        <p className="text-secondary mt-4">Please review and accept the following before continuing:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
          {[
            'I understand this medicine is unregistered in South Africa.',
            'I understand SAHPRA approval is required before supply.',
            'I authorize Synergy to prepare and submit my Section 21 application.',
            'I consent to processing of my personal and special personal information.',
          ].map((t) => (
            <label key={t} style={{ display: 'flex', gap: 10, fontSize: 13, alignItems: 'flex-start' }}>
              <input type="checkbox" style={{ marginTop: 3 }} />{t}
            </label>
          ))}
        </div>
      </div>
    ),
  },
  payment: {
    body: (
      <div>
        <div className="card" style={{ background: 'var(--surface-sunken)', marginBottom: 16 }}>
          <div className="card-title">Application fee</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>R 750.00</div>
        </div>
        <div className="field"><label>Voucher code (optional)</label><input placeholder="Have a code?" /></div>
        <div className="field"><label>Payment method</label><select><option>Card</option><option>Instant EFT</option></select></div>
      </div>
    ),
  },
};

export default function OnboardingWizard() {
  const role = getRole('patient');
  const [stepIdx, setStepIdx] = useState(3); // matches patientProfile.onboardingStep - 1
  const step = onboardingSteps[stepIdx];

  return (
    <AppShell role={role} title="Onboarding" sub="6-step patient intake">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Application SYN-APP-10442</div>
          <h1 className="page-title">{step.label}</h1>
        </div>
      </div>

      <div className="wizard-rail">
        {onboardingSteps.map((s, i) => (
          <div key={s.key} className={`wizard-node-wrap ${i < stepIdx ? 'done' : i === stepIdx ? 'current' : ''}`}>
            {i > 0 && <div className="wizard-node-line" />}
            <div className="wizard-node">{i < stepIdx ? '✓' : i + 1}</div>
            <div className="wizard-node-label">{s.label}</div>
          </div>
        ))}
      </div>

      <Card>
        {STEP_CONTENT[step.key].body}
        <div className="divider" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn btn-ghost" disabled={stepIdx === 0} onClick={() => setStepIdx((i) => Math.max(0, i - 1))}>
            ← Back
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setStepIdx((i) => Math.min(onboardingSteps.length - 1, i + 1))}
          >
            {stepIdx === onboardingSteps.length - 1 ? 'Finish & submit' : 'Continue'} →
          </button>
        </div>
      </Card>
    </AppShell>
  );
}
