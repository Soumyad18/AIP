import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { ResultsPage } from './pages/ResultsPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AuthCallbackPage } from './pages/AuthCallbackPage';
import { ProtectedRoute } from './components/ProtectedRoute';

export const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/auth/callback" element={<AuthCallbackPage />} />
    <Route path="/analyzer" element={
      <ProtectedRoute>
        <ResumeAnalyzerPage />
      </ProtectedRoute>
    } />
    <Route path="/results" element={
      <ProtectedRoute>
        <ResultsPage />
      </ProtectedRoute>
    } />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
