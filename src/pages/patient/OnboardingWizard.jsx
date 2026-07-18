import { useState, useEffect } from 'react';
import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import { onboardingSteps, fetchPatientProfile, saveOnboardingStep } from '../../data/api';

// Fields collected per step. Keys are camelCase; api.js toSnake() maps them
// to the patients table columns (e.g. referralSource -> referral_source).
const STEP_FIELDS = {
  welcome: ['referralSource'],
  basic: ['name', 'idNumber', 'mobile', 'email'],
  identity: [],
  clinical: ['clinicalReason', 'clinicalDuration', 'clinicalCurrent', 'clinicalNotes'],
  consent: [],
  payment: ['voucherCode', 'paymentMethod'],
};

// Each step renders CONTROLLED inputs bound to shared form state so the
// values are actually captured and persisted on Continue.
const STEP_CONTENT = {
  welcome: (d, set) => (
    <div>
      <p className="text-secondary">A few things before we start: this application is for a Section 21 authorization to access unregistered medicine. It takes about 8 minutes, and you can save and return at any time.</p>
      <div className="field mt-8">
        <label>Referral code (optional)</label>
        <input placeholder="e.g. ECO-CANN-5" value={d.referralSource || ''} onChange={(e) => set('referralSource', e.target.value)} />
      </div>
    </div>
  ),
  basic: (d, set) => (
    <div className="field-row">
      <div className="field"><label>Full name</label><input placeholder="Chloe Pretorius" value={d.name || ''} onChange={(e) => set('name', e.target.value)} /></div>
      <div className="field"><label>ID number</label><input placeholder="9403215800083" value={d.idNumber || ''} onChange={(e) => set('idNumber', e.target.value)} /></div>
      <div className="field"><label>Mobile number</label><input placeholder="082 000 0000" value={d.mobile || ''} onChange={(e) => set('mobile', e.target.value)} /></div>
      <div className="field"><label>Email</label><input placeholder="chloe@email.com" value={d.email || ''} onChange={(e) => set('email', e.target.value)} /></div>
    </div>
  ),
  identity: () => (
    <div>
      <div className="field-row">
        <div className="field"><label>ID document</label><input type="file" /></div>
        <div className="field"><label>Selfie capture</label><input type="file" /></div>
      </div>
      <p className="field-hint">Your selfie will also appear on your digital patient card once approved.</p>
    </div>
  ),
  clinical: (d, set) => (
    <div>
      <div className="field"><label>What's the main reason for your application?</label>
        <select value={d.clinicalReason || 'Chronic pain'} onChange={(e) => set('clinicalReason', e.target.value)}>
          <option>Chronic pain</option><option>Anxiety</option><option>Sleep difficulty</option><option>Other</option>
        </select>
      </div>
      <div className="field-row">
        <div className="field"><label>How long have you experienced this?</label><input placeholder="3+ years" value={d.clinicalDuration || ''} onChange={(e) => set('clinicalDuration', e.target.value)} /></div>
        <div className="field"><label>Current treatment</label><input placeholder="Occasional NSAIDs" value={d.clinicalCurrent || ''} onChange={(e) => set('clinicalCurrent', e.target.value)} /></div>
      </div>
      <div className="field"><label>Any other conditions we should know about?</label><textarea rows={3} placeholder="Mild generalised anxiety, managed" value={d.clinicalNotes || ''} onChange={(e) => set('clinicalNotes', e.target.value)} /></div>
    </div>
  ),
  consent: () => (
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
  payment: (d, set) => (
    <div>
      <div className="card" style={{ background: 'var(--surface-sunken)', marginBottom: 16 }}>
        <div className="card-title">Application fee</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>R 750.00</div>
      </div>
      <div className="field"><label>Voucher code (optional)</label><input placeholder="Have a code?" value={d.voucherCode || ''} onChange={(e) => set('voucherCode', e.target.value)} /></div>
      <div className="field"><label>Payment method</label>
        <select value={d.paymentMethod || 'Card'} onChange={(e) => set('paymentMethod', e.target.value)}>
          <option>Card</option><option>Instant EFT</option>
        </select>
      </div>
    </div>
  ),
};

export default function OnboardingWizard() {
  const role = getRole('patient');
  const [stepIdx, setStepIdx] = useState(0);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const step = onboardingSteps[stepIdx];

  const setField = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  // Load live patient profile; prefill known fields and set current step.
  useEffect(() => {
    fetchPatientProfile()
      .then((p) => {
        setStepIdx(Math.max(0, (p.onboardingStep ?? 1) - 1));
        setFormData((prev) => ({
          ...prev,
          name: p.name ?? '',
          idNumber: p.idNumber ?? '',
          referralSource: p.referralSource ?? '',
        }));
      })
      .catch((err) => console.error('[onboarding] load failed', err));
  }, []);

  // WRITE PATH: persist ONLY the current step's fields, then advance.
  async function handleContinue() {
    setSaving(true);
    try {
      const keys = STEP_FIELDS[step.key] || [];
      const fields = {};
      for (const k of keys) {
        if (formData[k] !== undefined && formData[k] !== '') fields[k] = formData[k];
      }
      await saveOnboardingStep(step.key, fields);
      setStepIdx((i) => Math.min(onboardingSteps.length - 1, i + 1));
    } catch (err) {
      console.error('[onboarding] save failed', err);
    } finally {
      setSaving(false);
    }
  }

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
        {STEP_CONTENT[step.key](formData, setField)}
        <div className="divider" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn btn-ghost" disabled={stepIdx === 0} onClick={() => setStepIdx((i) => Math.max(0, i - 1))}>
            ← Back
          </button>
          <button className="btn btn-primary" onClick={handleContinue} disabled={saving}>
            {stepIdx === onboardingSteps.length - 1 ? 'Finish & submit' : 'Continue'} →
          </button>
        </div>
      </Card>
    </AppShell>
  );
}
