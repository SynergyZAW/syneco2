import { useState, useEffect } from 'react';
import AppShell from '../../components/layout/AppShell';
import { getRole } from '../../data/roles';
import Card from '../../components/ui/Card';
import { onboardingSteps, fetchPatientProfile, saveOnboardingStep } from '../../data/api';

// Fields collected per step. Keys are camelCase; api.js toSnake() maps them
// to the patients table columns (e.g. referralSource -> referral_source).
const STEP_FIELDS = {
  welcome: ['referralSource'],
  basic: ['idType', 'title', 'firstName', 'lastName', 'name', 'idNumber', 'dateOfBirth', 'sex', 'mobile', 'email'],
  identity: [],
  clinical: ['clinicalReason', 'clinicalDuration', 'clinicalCurrent', 'clinicalNotes'],
  consent: ['consentTreatment', 'consentPopia', 'consentTelehealth', 'consentCpaAck'],
  payment: ['voucherCode', 'paymentMethod'],
};

// Per-step validation. Returns an error string, or '' when the step is valid.
// Keeps users from advancing with an empty dossier while staying lightweight.
const STEP_VALIDATORS = {
  welcome: () => '',
  basic: (d) => {
    if (!d.firstName || !d.lastName) return 'Please enter your first and last name.';
    if (!d.idNumber) return 'Please enter your ID or passport number.';
    if (!d.mobile) return 'Please enter a mobile number so we can reach you.';
    if (!d.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) return 'Please enter a valid email address.';
    return '';
  },
  identity: () => '',
  clinical: (d) => (!d.clinicalReason ? 'Please tell us the main reason for your application.' : ''),
  consent: (d) => {
    if (!d.consentTreatment) return 'The SAHPRA Section 21 treatment consent is required to continue.';
    if (!d.consentPopia || !d.consentTelehealth || !d.consentCpaAck) return 'Please accept all consents to continue.';
    return '';
  },
  payment: (d) => (!d.paymentMethod ? 'Please choose a payment method.' : ''),
};

// Each step renders CONTROLLED inputs bound to shared form state so the
// values are actually captured and persisted on Continue.
const STEP_CONTENT = {
  welcome: (d, set) => (
<div>
<p className="text-secondary">A few things before we start: this application is for a Section 21 authorization to access unregistered medicine. It takes about 8 minutes, and you can save and return at any time.</p>
<div className="field mt-8">
<label htmlFor="referralSource">Referral code (optional)</label>
<input id="referralSource" placeholder="e.g. ECO-CANN-5" value={d.referralSource || ''} onChange={(e) => set('referralSource', e.target.value)} />
</div>
</div>
),
  basic: (d, set) => (
<div className="field-row">
<div className="field"><label>ID type</label><select value={d.idType || 'sa_id'} onChange={(e) => set('idType', e.target.value)}><option value="sa_id">South African ID</option><option value="passport">Passport</option></select></div>
<div className="field"><label>Title</label><select value={d.title || ''} onChange={(e) => set('title', e.target.value)}><option value="">Select</option><option>Mr</option><option>Ms</option><option>Mrs</option><option>Miss</option><option>Dr</option><option>Prof</option><option>Other</option></select></div>
<div className="field"><label>First name</label><input placeholder="Chloe" value={d.firstName || ''} onChange={(e) => set('firstName', e.target.value)} /></div>
<div className="field"><label>Last name</label><input placeholder="Pretorius" value={d.lastName || ''} onChange={(e) => set('lastName', e.target.value)} /></div>
<div className="field"><label>Date of birth</label><input type="date" value={d.dateOfBirth || ''} onChange={(e) => set('dateOfBirth', e.target.value)} /></div>
<div className="field"><label>Sex</label><select value={d.sex || ''} onChange={(e) => set('sex', e.target.value)}><option value="">Select</option><option value="female">Female</option><option value="male">Male</option></select></div>
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
  consent: (d, set) => {
const all = !!d.consentTreatment && !!d.consentPopia && !!d.consentTelehealth && !!d.consentCpaAck;
const setAll = (v) => { set('consentTreatment', v); set('consentPopia', v); set('consentTelehealth', v); set('consentCpaAck', v); };
return (
<div>
<p className="text-secondary mt-4">Tap each item to read the full wording. The treatment consent is the one SAHPRA requires for your Section 21 application.</p>
<label className="field" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 14 }}>
<input type="checkbox" checked={!!d.consentTreatment} onChange={(e) => set('consentTreatment', e.target.checked)} />
<span><strong>Treatment (SAHPRA Section 21).</strong> I agree to be treated with Medical Cannabis, an unregistered medicine, under a Section 21 application.</span>
</label>
<label className="field" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 10 }}>
<input type="checkbox" checked={!!d.consentPopia} onChange={(e) => set('consentPopia', e.target.checked)} />
<span><strong>POPIA.</strong> I consent to Synergy processing my personal and health information for the purpose of my care.</span>
</label>
<label className="field" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 10 }}>
<input type="checkbox" checked={!!d.consentTelehealth} onChange={(e) => set('consentTelehealth', e.target.checked)} />
<span><strong>Telehealth.</strong> I understand my consultation will take place remotely and I consent to telehealth care.</span>
</label>
<label className="field" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 10 }}>
<input type="checkbox" checked={!!d.consentCpaAck} onChange={(e) => set('consentCpaAck', e.target.checked)} />
<span><strong>CPA acknowledgement.</strong> I understand that prescription scheduled medicines are excluded from the Consumer Protection Act cooling-off / return rights for public-health reasons.</span>
</label>
<label className="field" style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 16, fontWeight: 600 }}>
<input type="checkbox" checked={all} onChange={(e) => setAll(e.target.checked)} />
<span>Agree to all of the above.</span>
</label>
</div>
);
},
  payment: (d, set) => {
const FEE = 750;
const covered = (d.voucherCode || '').trim().toLowerCase() === 'synergybux';
const due = covered ? 0 : FEE;
return (
<div>
<div className="card" style={{ background: 'var(--surface-sunken)', marginBottom: 16 }}>
<div className="card-title">Application fee</div>
<div style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>R {due.toFixed(2)}</div>
{covered && <div className="field-hint" style={{ color: 'var(--success, green)' }}>Voucher applied - fully covered (was R {FEE.toFixed(2)}).</div>}
</div>
<div className="field"><label>Voucher code (optional)</label><input placeholder="Have a code?" value={d.voucherCode || ''} onChange={(e) => set('voucherCode', e.target.value)} /></div>
<div className="field"><label>Payment method</label>
<select value={d.paymentMethod || 'Card'} onChange={(e) => set('paymentMethod', e.target.value)}>
<option>Card</option><option>Instant EFT</option>
</select>
</div>
</div>
);
},
};
