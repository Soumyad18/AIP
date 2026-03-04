import { Sidebar } from '../components/Sidebar.js';
import { ResumeAnalyzer } from '../components/ResumeAnalyzer.js';

export const AnalyzerPage = () => `
<div class="layout">
  ${Sidebar('/analyzer')}
  <main class="main">
    <h2>Resume Analyzer</h2>
    <p>Upload, analyze, optimize, and download ATS-friendly output.</p>
    ${ResumeAnalyzer()}
  </main>
</div>
`;
