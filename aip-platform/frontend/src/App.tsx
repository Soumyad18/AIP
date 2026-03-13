import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { ResultsPage } from './pages/ResultsPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AuthCallbackPage } from './pages/AuthCallbackPage';
import { MyRecordsPage } from './pages/MyRecordsPage';
import { ProfilePage } from './pages/ProfilePage';
import { ResumeTemplatesPage } from './pages/ResumeTemplatesPage';
import { SkillsPage } from './pages/SkillsPage';
import { UploadResumePage } from './pages/UploadResumePage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { AboutPage } from './pages/AboutPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './components/DashboardLayout';

import { TeamDashboardPage } from './pages/TeamDashboardPage';
import { TeamMembersPage } from './pages/TeamMembersPage';
import { TeamCandidatesPage } from './pages/TeamCandidatesPage';
import { TeamAnalyticsPage } from './pages/TeamAnalyticsPage';
import { TeamResumeBankPage } from './pages/TeamResumeBankPage';
import { TeamSettingsPage } from './pages/TeamSettingsPage';
import { TemplateBuilderPage } from './pages/TemplateBuilderPage';

export const App = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/auth/callback" element={<AuthCallbackPage />} />

    {/* Protected Dashboard routes */}
    <Route element={<ProtectedRoute />}>
      <Route element={<DashboardLayout />}>
        {/* Core Individual Features */}
        <Route path="/analyzer" element={<ResumeAnalyzerPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/records" element={<MyRecordsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/templates" element={<ResumeTemplatesPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/upload" element={<UploadResumePage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
                <Route path="/about" element={<AboutPage />} />

        {/* Enterprise Team Features */}
        <Route path="/team" element={<TeamDashboardPage />} />
        <Route path="/team/members" element={<TeamMembersPage />} />
        <Route path="/team/candidates" element={<TeamCandidatesPage />} />
        <Route path="/team/analytics" element={<TeamAnalyticsPage />} />
        <Route path="/team/resumes" element={<TeamResumeBankPage />} />
        <Route path="/team/settings" element={<TeamSettingsPage />} />
        <Route path="/team/template-builder" element={<TemplateBuilderPage />} />
      </Route>
    </Route>

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
