import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { ResultsPage } from './pages/ResultsPage';

export const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/analyzer" element={<ResumeAnalyzerPage />} />
    <Route path="/results" element={<ResultsPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
