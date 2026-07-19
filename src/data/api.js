// =============================================================
// DATA LAYER - live Supabase reads/writes.
// Replaces named exports from mockData.js one-for-one so pages
// swap `from '../data/mockData'` to `from '../data/api'`.
// Secrets come ONLY from Vite env vars (never hardcode keys).
// =============================================================
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
console.warn('[api] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---- Session / role resolution ------------------------------
export async function getSessionRole() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, role: null };
  const { data, error } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();
  if (error) throw error;
  return { user, role: data.role, name: data.full_name };
}

// ---- Patient onboarding (Phase A vertical) ------------------
export async function fetchPatientProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const { data, error } = await supabase
    .from('patients')
          .select('name, id_number, referral_source, application_ref, onboarding_step, status, id_type, title, first_name, last_name, date_of_birth, sex, mobile, email, consent_id_autoread, consent_id_autoread_at')
    .eq('user_id', user.id)
    .single();
  if (error) throw error;
  return {
    name: data.name,
    idNumber: data.id_number,
    referralSource: data.referral_source,
    applicationRef: data.application_ref,
    onboardingStep: data.onboarding_step,
    status: data.status,
    idType: data.id_type,
    title: data.title,
    firstName: data.first_name,
    lastName: data.last_name,
    dateOfBirth: data.date_of_birth,
    sex: data.sex,
    mobile: data.mobile,
    email: data.email,
    consentIdAutoread: data.consent_id_autoread,
    consentIdAutoreadAt: data.consent_id_autoread_at,
  };
}

// onboardingSteps are static config - safe to keep client-side.
export const onboardingSteps = [
  { key: 'welcome',  label: 'Welcome' },
  { key: 'basic',    label: 'Basic Details' },
  { key: 'identity', label: 'Identity Verification' },
  { key: 'clinical', label: 'Clinical Intake' },
  { key: 'consent',  label: 'Legal Consent' },
  { key: 'payment',  label: 'Payment & Finalize' },
];

// WRITE PATH - advance onboarding. RLS restricts to owner row.
export async function saveOnboardingStep(stepKey, fields = {}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const stepIndex = onboardingSteps.findIndex((s) => s.key === stepKey);
  const now = new Date().toISOString();
  const consentStamps = stepKey === 'consent' ? {
    consent_treatment_at: fields.consentTreatment ? now : null,
    consent_popia_at: fields.consentPopia ? now : null,
    consent_telehealth_at: fields.consentTelehealth ? now : null,
    consent_cpa_ack_at: fields.consentCpaAck ? now : null,
    } : {};
  const { data, error } = await supabase
    .from('patients')
    .update({ ...toSnake(fields), ...consentStamps, onboarding_step: stepIndex })
    .eq('user_id', user.id)
    .select()
    .single();
  if (error) throw error;
  await logAudit('onboarding.step_saved', `step:${stepKey}`);
  return data;
}

// ---- Append-only audit helper -------------------------------
async function logAudit(action, target) {
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.from('audit_log').insert({
    actor: user?.id ?? 'system',
    action,
    target,
  });
}

// ---- small utility ------------------------------------------
function toSnake(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k.replace(/[A-Z]/g, (m) => '_' + m.toLowerCase()),
      v,
    ])
  );
}
