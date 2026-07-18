import { HashRouter, Routes, Route } from 'react-router-dom';

import RoleSelect from './pages/RoleSelect';

// Patient
import PatientDashboard from './pages/patient/PatientDashboard';
import OnboardingWizard from './pages/patient/OnboardingWizard';
import RegulatoryStatus from './pages/patient/RegulatoryStatus';
import DigitalCard from './pages/patient/DigitalCard';
import MedicineShop from './pages/patient/MedicineShop';
import ProductDetail from './pages/patient/ProductDetail';
import Support from './pages/patient/Support';
import Profile from './pages/patient/Profile';

// Doctor
import IntakeQueue from './pages/doctor/IntakeQueue';
import CaseDossier from './pages/doctor/CaseDossier';
import Planner from './pages/doctor/Planner';
import Messaging from './pages/doctor/Messaging';
import DoctorReports from './pages/doctor/Reports';

// Admin / Super Admin (shared components, parametrized by roleId)
import AdminOverview from './pages/admin/AdminOverview';
import DepartmentPage from './pages/admin/DepartmentPage';
import ReferralTenantManagement from './pages/admin/ReferralTenantManagement';
import UserAdmin from './pages/admin/UserAdmin';
import AuditLog from './pages/admin/AuditLog';

// Pharmacy
import DispensaryOrders from './pages/pharmacy/DispensaryOrders';
import ComplianceAnalytics from './pages/pharmacy/ComplianceAnalytics';
import FulfilmentReports from './pages/pharmacy/FulfilmentReports';

// Reseller
import Portfolio from './pages/reseller/Portfolio';
import Billing from './pages/reseller/Billing';
import ResellerReports from './pages/reseller/Reports';

// Partner
import Workspace from './pages/partner/Workspace';
import ReferralTools from './pages/partner/ReferralTools';

// Collection point
import Console from './pages/collectionpoint/Console';
import PatientDirectory from './pages/collectionpoint/PatientDirectory';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RoleSelect />} />

        {/* Patient */}
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient/onboarding" element={<OnboardingWizard />} />
        <Route path="/patient/status" element={<RegulatoryStatus />} />
        <Route path="/patient/card" element={<DigitalCard />} />
        <Route path="/patient/shop" element={<MedicineShop />} />
        <Route path="/patient/shop/:productId" element={<ProductDetail />} />
        <Route path="/patient/support" element={<Support />} />
        <Route path="/patient/profile" element={<Profile />} />

        {/* Doctor */}
        <Route path="/doctor" element={<IntakeQueue />} />
        <Route path="/doctor/case/:caseId" element={<CaseDossier />} />
        <Route path="/doctor/planner" element={<Planner />} />
        <Route path="/doctor/messaging" element={<Messaging />} />
        <Route path="/doctor/reports" element={<DoctorReports />} />

        {/* Admin (also used for Super Admin — same screens, role switcher tags it) */}
        <Route path="/admin" element={<AdminOverview roleId="admin" />} />
        <Route path="/admin/department/:deptId" element={<DepartmentPage roleId="admin" />} />
        <Route path="/admin/referrals" element={<ReferralTenantManagement roleId="admin" />} />
        <Route path="/admin/users" element={<UserAdmin roleId="admin" />} />
        <Route path="/admin/audit" element={<AuditLog roleId="admin" />} />

        {/* Super Admin — same screens as Admin, tagged with the super-admin identity */}
        <Route path="/super-admin" element={<AdminOverview roleId="superadmin" />} />
        <Route path="/super-admin/department/:deptId" element={<DepartmentPage roleId="superadmin" />} />
        <Route path="/super-admin/referrals" element={<ReferralTenantManagement roleId="superadmin" />} />
        <Route path="/super-admin/users" element={<UserAdmin roleId="superadmin" />} />
        <Route path="/super-admin/audit" element={<AuditLog roleId="superadmin" />} />

        {/* Pharmacy */}
        <Route path="/pharmacy" element={<DispensaryOrders />} />
        <Route path="/pharmacy/compliance" element={<ComplianceAnalytics />} />
        <Route path="/pharmacy/reports" element={<FulfilmentReports />} />

        {/* Reseller */}
        <Route path="/reseller" element={<Portfolio />} />
        <Route path="/reseller/billing" element={<Billing />} />
        <Route path="/reseller/reports" element={<ResellerReports />} />

        {/* Partner */}
        <Route path="/partner" element={<Workspace />} />
        <Route path="/partner/referrals" element={<ReferralTools />} />

        {/* Collection point */}
        <Route path="/collection-point" element={<Console />} />
        <Route path="/collection-point/patients" element={<PatientDirectory />} />

        <Route path="*" element={<RoleSelect />} />
      </Routes>
    </HashRouter>
  );
}
