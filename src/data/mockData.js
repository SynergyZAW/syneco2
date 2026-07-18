// ============================================================
// MOCK DATA — replace with real API/query calls when wiring up
// backend functionality. Nothing here is fetched or persisted.
// ============================================================

export const patientProfile = {
  name: 'Chloe Pretorius',
  idNumber: '9403215800083',
  referralSource: 'Eco-Cann Clinic (Collection Point)',
  applicationRef: 'SYN-APP-10442',
  onboardingStep: 4,
  status: 'Consultation Required',
};

export const onboardingSteps = [
  { key: 'welcome', label: 'Welcome' },
  { key: 'basic', label: 'Basic Details' },
  { key: 'identity', label: 'Identity Verification' },
  { key: 'clinical', label: 'Clinical Intake' },
  { key: 'consent', label: 'Legal Consent' },
  { key: 'payment', label: 'Payment & Finalize' },
];

export const regulatoryStages = [
  { title: 'Onboarding submitted', meta: '12 Jun — self-service', done: true },
  { title: 'Payment received', meta: '12 Jun — R750 application fee', done: true },
  { title: 'Consent captured', meta: '12 Jun — v2.3 consent form', done: true },
  { title: 'Consultation required', meta: 'Awaiting booking', current: true },
  { title: 'Clinician decision', meta: 'Pending', done: false },
  { title: 'Section 21 submitted to SAHPRA', meta: 'Pending', done: false },
  { title: 'Outcome & card issuance', meta: 'Pending', done: false },
];

export const shopProducts = [
  {
    id: 'thera-breeze',
    name: 'Thera-Breeze Balanced',
    type: 'Balanced Hybrid',
    thc: '11%', cbd: '9%',
    cultivation: 'Indoor, GMP-certified',
    cert: 'Class C Spec',
    restricted: true,
  },
  {
    id: 'sativa-alleviate',
    name: 'Sativa Alleviate-21',
    type: 'Sativa-dominant',
    thc: '18%', cbd: '1%',
    cultivation: 'Greenhouse, GMP-certified',
    cert: 'Class C Spec',
    restricted: true,
  },
  {
    id: 'indiclone',
    name: 'IndiClone Muscle-Ease',
    type: 'Indica-dominant',
    thc: '15%', cbd: '4%',
    cultivation: 'Indoor, GMP-certified',
    cert: 'Class C Spec',
    restricted: true,
  },
  {
    id: 'wellness-balm',
    name: 'Synergy Wellness Topical Balm',
    type: 'Over-the-counter',
    thc: '0%', cbd: '2%',
    cultivation: 'Manufactured — iMbali Labs',
    cert: 'OTC',
    restricted: false,
  },
];

export const supportThreads = [
  { channel: 'Patient Care Service Callback', last: 'We\u2019ve received your intake — a care agent will confirm your consultation slot shortly.', time: '2h ago', unread: 1 },
  { channel: 'System Notifications', last: 'Your payment of R750 was received and allocated to application SYN-APP-10442.', time: '1d ago', unread: 0 },
];

export const doctorQueue = [
  { id: 'SYN-APP-10442', patient: 'Chloe Pretorius', status: 'Booked', payment: 'Paid', verification: 'Verified', pathway: 'Online Pathway', updated: '2h ago' },
  { id: 'SYN-APP-10431', patient: 'Jacob Zuma', status: 'Review', payment: 'Paid', verification: 'Verified', pathway: 'In-Person Required', updated: '5h ago' },
  { id: 'SYN-APP-10418', patient: 'Naledi Khumalo', status: 'Info Req', payment: 'Outstanding', verification: 'Pending', pathway: 'Online Pathway', updated: '1d ago' },
  { id: 'SYN-APP-10399', patient: 'Pieter van der Merwe', status: 'Decision', payment: 'Paid', verification: 'Verified', pathway: 'Online Pathway', updated: '1d ago' },
  { id: 'SYN-APP-10387', patient: 'Amahle Dube', status: 'Approved', payment: 'Paid', verification: 'Verified', pathway: 'Online Pathway', updated: '3d ago' },
  { id: 'SYN-APP-10375', patient: 'Riaan Botha', status: 'Onboarding Incomplete', payment: 'Outstanding', verification: 'Pending', pathway: '—', updated: '4d ago' },
];

export const doctorQueueTabs = ['All', 'Review', 'Booked', 'Decision', 'Info Req', 'Approved'];

export const caseDossier = {
  id: 'SYN-APP-10442',
  patient: 'Chloe Pretorius',
  age: 34,
  idNumber: '9403215800083',
  referral: 'Eco-Cann Clinic',
  presentingSymptoms: 'Chronic lower back pain, 3+ years, prior NSAID use with limited relief.',
  concomitant: 'Mild generalised anxiety — managed, no current medication.',
  triage: 'ONL_ELIGIBLE — Online Pathway',
  consentStatus: 'Signed — v2.3, 12 Jun 2026',
  paymentStatus: 'Paid — R750, ref PYMT-88213',
  auditTrail: [
    { event: 'OPEN_CASE', actor: 'Dr. Sarah Adams', time: '14 Jun, 09:12' },
    { event: 'CONSULT_BOOKED', actor: 'System', time: '13 Jun, 16:40' },
    { event: 'PAYMENT_CONFIRMED', actor: 'System', time: '12 Jun, 11:02' },
    { event: 'CONSENT_SIGNED', actor: 'Chloe Pretorius', time: '12 Jun, 10:58' },
    { event: 'ONBOARDING_SUBMITTED', actor: 'Chloe Pretorius', time: '12 Jun, 10:41' },
  ],
};

export const weeklyPlanner = [
  { day: 'Mon 20 Jul', slots: [{ time: '09:00', patient: 'Chloe Pretorius' }, { time: '11:30', patient: 'Naledi Khumalo' }] },
  { day: 'Tue 21 Jul', slots: [{ time: '10:00', patient: 'Pieter van der Merwe' }] },
  { day: 'Wed 22 Jul', slots: [] },
  { day: 'Thu 23 Jul', slots: [{ time: '09:30', patient: 'Riaan Botha' }, { time: '13:00', patient: 'Amahle Dube' }] },
  { day: 'Fri 24 Jul', slots: [{ time: '15:00', patient: 'Jacob Zuma' }] },
];

export const doctorReports = [
  { label: 'Open cases', value: '18' },
  { label: 'Pending decisions', value: '6' },
  { label: 'Avg. turnaround', value: '1.8 days' },
  { label: 'Consults this week', value: '9' },
];

export const adminDepartments = [
  { id: 'patient-care', label: 'Patient Care', desc: 'Case follow-ups, missing-info requests, patient communications.', stat: '24 open queues' },
  { id: 'finance', label: 'Finance', desc: 'Sales, payments, refunds, credits, forecasting & budgets.', stat: 'R 1.24m MTD' },
  { id: 'it', label: 'IT', desc: 'Access management, integrations, environment health.', stat: '3 open tickets' },
  { id: 'compliance', label: 'Compliance', desc: 'Consent audits, Section 21 tracking, POPIA oversight.', stat: '2 exceptions' },
  { id: 'operations', label: 'Operations', desc: 'Fulfilment, collection points, partner performance.', stat: '96% SLA' },
  { id: 'assets', label: 'Asset Management', desc: 'Fixed asset register across all sites.', stat: '312 assets' },
  { id: 'executive', label: 'Executive Reporting', desc: 'Group-wide KPIs and forecasts.', stat: '8 live dashboards' },
];

export const adminKpis = [
  { label: 'Active patients', value: '2,148', delta: '+4.2% wow' },
  { label: 'Applications in review', value: '86', delta: '-3 today' },
  { label: 'Approval rate (30d)', value: '91%', delta: '+1.5pp' },
  { label: 'Revenue MTD', value: 'R 1,238,400', delta: '+8.9%' },
];

export const auditLogEntries = [
  { time: '14 Jul 09:12', actor: 'Dr. Sarah Adams', action: 'OPEN_CASE', target: 'SYN-APP-10442' },
  { time: '14 Jul 08:55', actor: 'Jon (Admin)', action: 'USER_ROLE_UPDATED', target: 'reseller: Eco-Cann Network' },
  { time: '13 Jul 16:40', actor: 'System', action: 'CONSULT_BOOKED', target: 'SYN-APP-10442' },
  { time: '13 Jul 12:03', actor: 'Crowpharm Dispensary', action: 'ORDER_DISPATCHED', target: 'SYN-FO-103' },
  { time: '12 Jul 11:02', actor: 'System', action: 'PAYMENT_CONFIRMED', target: 'SYN-APP-10442' },
];

export const referralSources = [
  { name: 'Eco-Cann Clinic', type: 'Collection Point', patients: 214, status: 'Active' },
  { name: 'Synergy Wellness Direct', type: 'Direct', patients: 892, status: 'Active' },
  { name: 'Highveld Onboarding Partners', type: 'Onboarding Partner', patients: 118, status: 'Active' },
  { name: 'CarePoint Reseller Network', type: 'Agency / Reseller', patients: 341, status: 'Active' },
  { name: 'Lowveld Community Pharmacy', type: 'Community Pharmacy', patients: 26, status: 'Pending Vetting' },
];

export const userAdminList = [
  { name: 'Jon van Rensburg', role: 'Super Admin', dept: 'Executive', status: 'Active' },
  { name: 'Dr. Sarah Adams', role: 'Doctor', dept: 'Clinical', status: 'Active' },
  { name: 'Thandiwe Nkosi', role: 'Admin', dept: 'Patient Care', status: 'Active' },
  { name: 'Crowpharm Dispensary', role: 'Pharmacy', dept: 'Fulfilment', status: 'Active' },
  { name: 'Eco-Cann Clinic', role: 'Collection Point', dept: 'Referral Network', status: 'Active' },
  { name: 'CarePoint Reseller Network', role: 'Reseller', dept: 'Tenant', status: 'Active' },
];

export const pharmacyOrders = [
  { ref: 'SYN-FO-103', patient: 'Chloe Pretorius', status: 'Ready for Collection', branch: 'Johannesburg Dispensing Facility', date: '14 Jul' },
  { ref: 'SYN-FO-105', patient: 'Amahle Dube', status: 'Clarification Hold', branch: 'Cape Town Fulfillment Hub', date: '13 Jul' },
  { ref: 'SYN-FO-106', patient: 'Jacob Zuma', status: 'Completed', branch: 'Johannesburg Dispensing Facility', date: '11 Jul' },
  { ref: 'SYN-FO-101', patient: 'Naledi Khumalo', status: 'Completed', branch: 'Johannesburg Dispensing Facility', date: '9 Jul' },
];

export const pharmacyComplianceStats = [
  { label: 'Orders fulfilled (30d)', value: '412' },
  { label: 'Avg. dispatch time', value: '1.2 days' },
  { label: 'Clarification holds', value: '4' },
  { label: 'Compliance flags', value: '0' },
];

export const resellerLocations = [
  { name: 'Eco-Cann Clinic — Sandton', status: 'Active', fee: 'R 500 / mo', sublicense: 'R 5,000 / mo', compliance: 'Compliant' },
  { name: 'Eco-Cann Clinic — Midrand', status: 'Active', fee: 'R 500 / mo', sublicense: 'R 5,000 / mo', compliance: 'Compliant' },
  { name: 'Eco-Cann Clinic — Pretoria East', status: 'Active', fee: 'R 500 / mo', sublicense: 'R 5,000 / mo', compliance: 'Review Due' },
  { name: 'Eco-Cann Clinic — Centurion', status: 'Onboarding', fee: 'R 500 / mo', sublicense: 'R 5,000 / mo', compliance: 'Pending' },
];

export const collectionPointKpis = [
  { label: 'Total Referred Signups', value: '214' },
  { label: 'In Clinical Consultation', value: '18' },
  { label: 'Approved Cardholders', value: '162' },
  { label: 'Depot Somatic Pickups', value: '47' },
];

export const collectionPointPatients = [
  { name: 'Chloe Pretorius', status: 'Consultation Required', joined: '12 Jul' },
  { name: 'Sipho Ndlovu', status: 'Approved', joined: '9 Jul' },
  { name: 'Mia Coetzee', status: 'Onboarding', joined: '8 Jul' },
  { name: 'Thabo Mokoena', status: 'Card in Production', joined: '2 Jul' },
];

export const partnerTools = [
  { title: 'Branded Entry Link', desc: 'Generate and share your co-branded onboarding link.' },
  { title: 'Referral Attribution', desc: 'See which signups are attributed to your network.' },
  { title: 'Payment & Voucher Support', desc: 'Assist patients with in-store payment where applicable.' },
  { title: 'Chain-of-Custody Reporting', desc: 'Log and report on physical handoff events.' },
];
